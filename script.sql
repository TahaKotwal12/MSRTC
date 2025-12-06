-- ============================================================
-- MSRTC OPERATIONS AUTOMATION - POSTGRES SCHEMA
-- ============================================================
-- Target: PostgreSQL 13+
-- ============================================================

-- Optional but recommended extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. BASIC ENUM-LIKE CONSTRAINTS (via CHECK)
-- ============================================================

-- We'll use TEXT + CHECK instead of ENUM types (easier to change later).

-- ============================================================
-- 2. CORE MASTER TABLES
-- ============================================================

-- 2.1 Depots
CREATE TABLE depots (
    id              BIGSERIAL PRIMARY KEY,
    code            TEXT UNIQUE NOT NULL,              -- e.g. "PUNE_DEPOT_01"
    name            TEXT NOT NULL,
    region          TEXT,
    city            TEXT,
    district        TEXT,
    state           TEXT NOT NULL DEFAULT 'Maharashtra',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 Stops (bus stops / stations)
CREATE TABLE stops (
    id              BIGSERIAL PRIMARY KEY,
    code            TEXT UNIQUE,                       -- optional stop code
    name            TEXT NOT NULL,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    city            TEXT,
    district        TEXT,
    state           TEXT NOT NULL DEFAULT 'Maharashtra',
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.3 Routes
CREATE TABLE routes (
    id                      BIGSERIAL PRIMARY KEY,
    depot_id                BIGINT REFERENCES depots(id) ON DELETE RESTRICT,
    route_code              TEXT NOT NULL UNIQUE,      -- e.g. "PUNE-MUM-001"
    name                    TEXT NOT NULL,             -- e.g. "Pune - Mumbai Non-Stop"
    origin_stop_id          BIGINT REFERENCES stops(id),
    destination_stop_id     BIGINT REFERENCES stops(id),
    distance_km             NUMERIC(7,2),
    is_active               BOOLEAN NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.4 Route Stops (sequence of stops per route)
CREATE TABLE route_stops (
    id                      BIGSERIAL PRIMARY KEY,
    route_id                BIGINT NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id                 BIGINT NOT NULL REFERENCES stops(id) ON DELETE RESTRICT,
    sequence_no             INT NOT NULL,
    distance_from_start_km  NUMERIC(7,2),
    scheduled_arrival       TIME,
    scheduled_departure     TIME,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT route_stops_route_seq_unique
        UNIQUE (route_id, sequence_no),
    CONSTRAINT route_stops_route_stop_unique
        UNIQUE (route_id, stop_id)
);

-- Index to quickly fetch route path
CREATE INDEX idx_route_stops_route_seq ON route_stops(route_id, sequence_no);


-- 2.5 Vehicles
CREATE TABLE vehicles (
    id                  BIGSERIAL PRIMARY KEY,
    depot_id            BIGINT REFERENCES depots(id) ON DELETE SET NULL,
    reg_no              TEXT NOT NULL UNIQUE,      -- registration number
    fleet_number        TEXT,                      -- internal fleet ID
    vehicle_type        TEXT,                      -- e.g. "AC-SLEEPER", "SEMI-LUXURY"
    capacity            INT,
    manufacture_year    INT,
    status              TEXT NOT NULL DEFAULT 'ACTIVE', 
    -- ACTIVE / IN_MAINTENANCE / SCRAPPED / INACTIVE
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT vehicles_status_check
        CHECK (status IN ('ACTIVE','IN_MAINTENANCE','SCRAPPED','INACTIVE'))
);

CREATE INDEX idx_vehicles_depot ON vehicles(depot_id);


-- 2.6 Staff (drivers, conductors, managers, etc.)
CREATE TABLE staff (
    id                  BIGSERIAL PRIMARY KEY,
    depot_id            BIGINT REFERENCES depots(id) ON DELETE SET NULL,
    employee_code       TEXT UNIQUE,               -- official employee ID
    full_name           TEXT NOT NULL,
    role                TEXT NOT NULL,             -- DRIVER / CONDUCTOR / MANAGER / CLERK / INSPECTOR / ADMIN / OTHER
    license_no          TEXT,                      -- for drivers
    license_valid_till  DATE,
    phone               TEXT,
    email               TEXT,
    aadhaar_hash        TEXT,                      -- store hash/last-4, never raw Aadhaar
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    date_joined         DATE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT staff_role_check
        CHECK (role IN ('DRIVER','CONDUCTOR','MANAGER','CLERK','INSPECTOR','ADMIN','OTHER'))
);

CREATE INDEX idx_staff_depot_role ON staff(depot_id, role);


-- 2.7 Users (application login accounts, linked to staff)
CREATE TABLE app_users (
    id                  BIGSERIAL PRIMARY KEY,
    staff_id            BIGINT UNIQUE REFERENCES staff(id) ON DELETE SET NULL,
    username            TEXT NOT NULL UNIQUE,
    password_hash       TEXT NOT NULL,
    app_role            TEXT NOT NULL,           
    -- 'ADMIN','DEPOT_MANAGER','DISPATCHER','DRIVER','CONDUCTOR','INSPECTOR','ANALYST'
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at       TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT app_users_role_check
        CHECK (app_role IN ('ADMIN','DEPOT_MANAGER','DISPATCHER','DRIVER',
                            'CONDUCTOR','INSPECTOR','ANALYST'))
);

CREATE INDEX idx_app_users_role ON app_users(app_role);

-- ============================================================
-- 3. OPERATIONS: TRIPS, ASSIGNMENTS, RESERVATIONS
-- ============================================================

-- 3.1 Trips (scheduled runs)
CREATE TABLE trips (
    id                  BIGSERIAL PRIMARY KEY,
    route_id            BIGINT NOT NULL REFERENCES routes(id) ON DELETE RESTRICT,
    depot_id            BIGINT NOT NULL REFERENCES depots(id) ON DELETE RESTRICT,
    service_number      TEXT,                      -- trip/service ID used by MSRTC
    trip_date           DATE NOT NULL,
    scheduled_start_at  TIMESTAMPTZ,
    scheduled_end_at    TIMESTAMPTZ,
    actual_start_at     TIMESTAMPTZ,
    actual_end_at       TIMESTAMPTZ,
    status              TEXT NOT NULL DEFAULT 'SCHEDULED',
    -- SCHEDULED / IN_PROGRESS / COMPLETED / CANCELLED
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT trips_status_check
        CHECK (status IN ('SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED'))
);

CREATE INDEX idx_trips_depot_date ON trips(depot_id, trip_date);
CREATE INDEX idx_trips_route_date ON trips(route_id, trip_date);


-- 3.2 Trip Assignments (vehicle + crew for each trip)
CREATE TABLE trip_assignments (
    id                      BIGSERIAL PRIMARY KEY,
    trip_id                 BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    vehicle_id              BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    primary_driver_id       BIGINT REFERENCES staff(id) ON DELETE RESTRICT,
    secondary_driver_id     BIGINT REFERENCES staff(id) ON DELETE RESTRICT,
    conductor_id            BIGINT REFERENCES staff(id) ON DELETE RESTRICT,
    assigned_by_user_id     BIGINT REFERENCES app_users(id) ON DELETE SET NULL,
    assigned_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved_by_user_id     BIGINT REFERENCES app_users(id) ON DELETE SET NULL,
    approved_at             TIMESTAMPTZ,
    status                  TEXT NOT NULL DEFAULT 'DRAFT',
    -- DRAFT / APPROVED / CANCELLED
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT trip_assignments_status_check
        CHECK (status IN ('DRAFT','APPROVED','CANCELLED')),
    CONSTRAINT trip_assignments_trip_unique
        UNIQUE (trip_id)
);

CREATE INDEX idx_trip_assignments_vehicle ON trip_assignments(vehicle_id);
CREATE INDEX idx_trip_assignments_driver ON trip_assignments(primary_driver_id);
CREATE INDEX idx_trip_assignments_conductor ON trip_assignments(conductor_id);


-- 3.3 Reservations (mirror from central reservation system)
CREATE TABLE reservations (
    id                  BIGSERIAL PRIMARY KEY,
    trip_id             BIGINT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    ticket_id           TEXT NOT NULL,             -- ticket number / ID
    pnr                 TEXT,                      -- PNR/reference
    passenger_name      TEXT,
    passenger_phone     TEXT,
    boarding_stop_id    BIGINT REFERENCES stops(id),
    seat_no             TEXT,
    fare_amount         NUMERIC(10,2),
    currency            TEXT NOT NULL DEFAULT 'INR',
    status              TEXT NOT NULL DEFAULT 'CONFIRMED',
    -- CONFIRMED / CANCELLED / NO_SHOW / BOARDED
    source_system       TEXT,                      -- 'MSRTC_PORTAL','COUNTER','AGENT','API'
    booked_at           TIMESTAMPTZ,
    last_updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT reservations_status_check
        CHECK (status IN ('CONFIRMED','CANCELLED','NO_SHOW','BOARDED'))
);

CREATE INDEX idx_reservations_trip ON reservations(trip_id);
CREATE INDEX idx_reservations_ticket ON reservations(ticket_id);
CREATE INDEX idx_reservations_trip_seat ON reservations(trip_id, seat_no);

-- ============================================================
-- 4. ATTENDANCE
-- ============================================================

CREATE TABLE attendance (
    id                  BIGSERIAL PRIMARY KEY,
    staff_id            BIGINT NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    punch_type          TEXT NOT NULL,             -- IN / OUT
    method              TEXT NOT NULL,             -- WEB / MOBILE / BIOMETRIC / OTHER
    device_id           TEXT,
    latitude            DOUBLE PRECISION,
    longitude           DOUBLE PRECISION,
    punched_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by_user_id  BIGINT REFERENCES app_users(id) ON DELETE SET NULL,
    remarks             TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT attendance_punch_type_check
        CHECK (punch_type IN ('IN','OUT')),
    CONSTRAINT attendance_method_check
        CHECK (method IN ('WEB','MOBILE','BIOMETRIC','OTHER'))
);

CREATE INDEX idx_attendance_staff_time ON attendance(staff_id, punched_at);

-- ============================================================
-- 5. GPS / TELEMATICS EVENTS
-- ============================================================

CREATE TABLE gps_events (
    id                  BIGSERIAL PRIMARY KEY,
    vehicle_id          BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    trip_id             BIGINT REFERENCES trips(id) ON DELETE SET NULL,
    recorded_at         TIMESTAMPTZ NOT NULL,
    latitude            DOUBLE PRECISION NOT NULL,
    longitude           DOUBLE PRECISION NOT NULL,
    speed_kmph          NUMERIC(6,2),
    heading_deg         NUMERIC(6,2),
    raw_payload         JSONB,                     -- original JSON from GPS provider
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gps_events_vehicle_time ON gps_events(vehicle_id, recorded_at);
CREATE INDEX idx_gps_events_trip_time ON gps_events(trip_id, recorded_at);

-- ============================================================
-- 6. INCIDENT REPORTING
-- ============================================================

CREATE TABLE incidents (
    id                      BIGSERIAL PRIMARY KEY,
    trip_id                 BIGINT REFERENCES trips(id) ON DELETE SET NULL,
    depot_id                BIGINT REFERENCES depots(id) ON DELETE SET NULL,
    reported_by_staff_id    BIGINT REFERENCES staff(id) ON DELETE SET NULL,
    category                TEXT NOT NULL,
    -- BREAKDOWN / DELAY / ACCIDENT / SECURITY / PASSENGER / OTHER
    severity                TEXT NOT NULL DEFAULT 'MEDIUM',
    -- LOW / MEDIUM / HIGH / CRITICAL
    description             TEXT,
    latitude                DOUBLE PRECISION,
    longitude               DOUBLE PRECISION,
    reported_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at             TIMESTAMPTZ,
    status                  TEXT NOT NULL DEFAULT 'OPEN',
    -- OPEN / IN_PROGRESS / RESOLVED / DISMISSED
    resolution_notes        TEXT,
    attachments             JSONB,                 -- for file metadata
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT incidents_category_check
        CHECK (category IN ('BREAKDOWN','DELAY','ACCIDENT','SECURITY','PASSENGER','OTHER')),
    CONSTRAINT incidents_severity_check
        CHECK (severity IN ('LOW','MEDIUM','HIGH','CRITICAL')),
    CONSTRAINT incidents_status_check
        CHECK (status IN ('OPEN','IN_PROGRESS','RESOLVED','DISMISSED'))
);

CREATE INDEX idx_incidents_trip ON incidents(trip_id);
CREATE INDEX idx_incidents_depot ON incidents(depot_id);
CREATE INDEX idx_incidents_status ON incidents(status);

-- ============================================================
-- 7. NOTIFICATIONS (for staff / users)
-- ============================================================

CREATE TABLE notifications (
    id                      BIGSERIAL PRIMARY KEY,
    recipient_user_id       BIGINT REFERENCES app_users(id) ON DELETE CASCADE,
    recipient_staff_id      BIGINT REFERENCES staff(id) ON DELETE SET NULL,
    type                    TEXT NOT NULL,         -- ASSIGNMENT, ALERT, INCIDENT, SYSTEM
    title                   TEXT NOT NULL,
    body                    TEXT NOT NULL,
    is_read                 BOOLEAN NOT NULL DEFAULT FALSE,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read_at                 TIMESTAMPTZ
);

CREATE INDEX idx_notifications_recipient_time ON notifications(recipient_user_id, created_at);
CREATE INDEX idx_notifications_staff_time ON notifications(recipient_staff_id, created_at);

-- ============================================================
-- 8. AUDIT LOG
-- ============================================================

CREATE TABLE audit_log (
    id                  BIGSERIAL PRIMARY KEY,
    actor_user_id       BIGINT REFERENCES app_users(id) ON DELETE SET NULL,
    event_type          TEXT NOT NULL,             -- CREATE / UPDATE / DELETE / LOGIN / OTHER
    entity_name         TEXT NOT NULL,             -- e.g. 'trip_assignments'
    entity_id           TEXT NOT NULL,             -- store pk as text (flexible)
    old_data            JSONB,
    new_data            JSONB,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address          INET,
    user_agent          TEXT
);

CREATE INDEX idx_audit_entity ON audit_log(entity_name, entity_id);
CREATE INDEX idx_audit_time ON audit_log(created_at);

-- ============================================================
-- 9. SIMPLE CONFIG TABLE (OPTIONAL)
-- ============================================================

CREATE TABLE app_config (
    key                 TEXT PRIMARY KEY,
    value               TEXT NOT NULL,
    description         TEXT,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 10. TRIGGERS (OPTIONAL: AUTO-UPDATE updated_at)
-- ============================================================

-- Example trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to tables that have updated_at
CREATE TRIGGER trg_depots_set_updated_at
BEFORE UPDATE ON depots
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_stops_set_updated_at
BEFORE UPDATE ON stops
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_routes_set_updated_at
BEFORE UPDATE ON routes
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_route_stops_set_updated_at
BEFORE UPDATE ON route_stops
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_vehicles_set_updated_at
BEFORE UPDATE ON vehicles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_staff_set_updated_at
BEFORE UPDATE ON staff
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_app_users_set_updated_at
BEFORE UPDATE ON app_users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_trips_set_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_trip_assignments_set_updated_at
BEFORE UPDATE ON trip_assignments
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_incidents_set_updated_at
BEFORE UPDATE ON incidents
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- END OF SCHEMA
-- ============================================================
