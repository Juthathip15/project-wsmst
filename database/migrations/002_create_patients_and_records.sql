CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    province TEXT NOT NULL,
    lifestyle TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS health_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    record_date TEXT NOT NULL,
    note TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE IF NOT EXISTS health_record_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    health_record_id INTEGER NOT NULL,
    item_type TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (health_record_id) REFERENCES health_records(id)
);