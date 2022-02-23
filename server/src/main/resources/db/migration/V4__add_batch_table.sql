CREATE TABLE batch
(
    id        INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME
);

ALTER TABLE stock
    DROP COLUMN time_fetched,
    ADD COLUMN batch_id INTEGER,
    ADD FOREIGN KEY stock_batch (batch_id) REFERENCES batch (id) ON DELETE RESTRICT;

ALTER TABLE `index`
    DROP COLUMN time_fetched,
    ADD COLUMN batch_id INTEGER,
    ADD FOREIGN KEY index_batch (batch_id) REFERENCES batch (id) ON DELETE RESTRICT;

INSERT INTO batch(timestamp) VALUE ('2022-01-01 12:00:00');
SET @dummy_batch_id = LAST_INSERT_ID();

UPDATE stock SET batch_id = @dummy_batch_id WHERE true;
UPDATE `index` SET batch_id = @dummy_batch_id WHERE true;

ALTER TABLE stock
    MODIFY batch_id INTEGER NOT NULL;
ALTER TABLE `index`
    MODIFY batch_id INTEGER NOT NULL;
