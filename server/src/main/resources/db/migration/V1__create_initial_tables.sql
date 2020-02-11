CREATE TABLE key_stats (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    price_earning_ttm FLOAT,
    price_book FLOAT,
    price_sales_ttm FLOAT,
    revenue_growth_three_year_avg FLOAT,
    eps_growth_three_year_avg INTEGER ,
    operating_margin_ttm FLOAT,
    net_margin_ttm FLOAT,
    roe_ttm FLOAT,
    debt_equity FLOAT
);

CREATE TABLE stock (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    key_stats_id INTEGER,
    name VARCHAR(255),
    ticker VARCHAR(255),
    isin VARCHAR(16),
    FOREIGN KEY (key_stats_id) REFERENCES key_stats(id)
);

CREATE TABLE financial_data(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stock_id INTEGER,
    year INTEGER,
    revenue FLOAT,
    operating_income FLOAT,
    net_income FLOAT,
    earnings_per_share FLOAT,
    diluted_shares_outstanding INTEGER ,
    current_assets FLOAT,
    non_current_assets FLOAT,
    total_assets FLOAT,
    current_liabilities FLOAT,
    total_liabilities FLOAT,
    total_equity FLOAT,
    operating_cash_flow FLOAT,
    capital_expenditure FLOAT,
    free_cash_flow FLOAT,
    FOREIGN KEY (stock_id) REFERENCES stock(id)
);

CREATE TABLE dividend(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stock_id INTEGER,
    declared_date DATE,
    ex_div DATE,
    paid DATE,
    amount FLOAT,
    FOREIGN KEY (stock_id) REFERENCES stock(id)
);