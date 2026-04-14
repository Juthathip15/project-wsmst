-- categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category_id INTEGER,
  price REAL,
  provider TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- seed categories
INSERT INTO categories (name) VALUES
('General Checkup'),
('Blood Test'),
('Heart Screening');

-- seed services
INSERT INTO services (name, description, category_id, price, provider) VALUES
('General Health Check', 'Basic annual checkup package', 1, 3500, 'Bangkok Hospital'),
('Advanced Blood Test', 'Detailed blood chemistry and metabolic panel', 2, 2200, 'Samitivej Hospital'),
('Cardiac Risk Screening', 'Heart and blood vessel screening package', 3, 4900, 'BNH Hospital');