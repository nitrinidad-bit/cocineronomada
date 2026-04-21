-- ============================================================
-- COCINERO NOMADA — Analytics D1 schema
-- Run: wrangler d1 execute cocinero_analytics --file=schema.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ts         INTEGER NOT NULL,
  session_id TEXT NOT NULL,
  visitor    TEXT NOT NULL,
  event      TEXT NOT NULL,
  path       TEXT,
  referrer   TEXT,
  country    TEXT,
  device     TEXT,
  data       TEXT
);

CREATE INDEX IF NOT EXISTS idx_events_ts      ON events(ts);
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_event   ON events(event);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor);

CREATE TABLE IF NOT EXISTS sessions (
  session_id   TEXT PRIMARY KEY,
  visitor      TEXT NOT NULL,
  started_at   INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL,
  country      TEXT,
  device       TEXT,
  entry_path   TEXT,
  pageviews    INTEGER DEFAULT 0,
  max_chapter  INTEGER DEFAULT 0,
  cities_seen  INTEGER DEFAULT 0,
  converted    INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sessions_last ON sessions(last_seen_at);

-- Lightweight per-minute counters for rate-limiting & spike detection.
CREATE TABLE IF NOT EXISTS rate_counters (
  bucket_key TEXT PRIMARY KEY,
  count      INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_expires ON rate_counters(expires_at);

-- Last-seen timestamps for debouncing real-time alerts.
CREATE TABLE IF NOT EXISTS alert_state (
  key     TEXT PRIMARY KEY,
  last_at INTEGER NOT NULL
);
