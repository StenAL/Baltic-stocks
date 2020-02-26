CREATE TABLE `index` (
                       id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                       start DATE,
                       end DATE,
                       ticker VARCHAR(16),
                       name VARCHAR(16),
                       change_percent FLOAT,
                       time_fetched DATETIME
);