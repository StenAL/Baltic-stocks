import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "title": "Baltic Stocks",
            "tagline": "Tagline goes here",
            "12 month profit": "cumulative profits of Baltic Main List companies in the last 12 months",
            "12 month index change": "portfolio value today if you had bought 1000 € of Baltic Main List stocks one year ago",
            "keyStats": "Key Stats",
            "financials": "Financials",
            "financial data disclaimer": "All financial data excepts EPS in millions EUR",
            "stocks": "Stocks",
            "ticker": "Ticker",
            "name": "Name",
            "isin": "ISIN",
            "priceEarningTtm": "12 month average P/E",
            "priceBook": "P/B",
            "priceSalesTtm": "12 month P/S",
            "revenueGrowthThreeYearAvg": "3 year avg revenue growth",
            "operatingMarginTtm": "12 month operating margin",
            "netMarginTtm": "12 month net margin",
            "roeTtm": "12 month ROE",
            "debtEquity": "D/E",
            "revenue": "Revenue",
            "operatingIncome": "Operating Income",
            "netIncome": "Net Income",
            "earningsPerShare": "EPS",
            "dilutedSharesOutstanding": "Diluted shares outstanding",
            "currentAssets": "Current Assets",
            "nonCurrentAssets": "Non-current assets",
            "totalAssets": "Total Assets",
            "currentLiabilities": "Current Liabilities",
            "totalLiabilities": "Total Liabilities",
            "totalEquity": "Total Equity",
            "operatingCashFlow": "Operating Cash Flow",
            "capitalExpenditure": "CapEx",
            "freeCashFlow": "Free cash flow",
            "EE": "Estonia",
            "LV": "Latvia",
            "LT": "Lithuania",
            "data as of": "Data as of",
        }
    },
    et: {
        translation: {
            "title": "Balti Aktsiad",
            "tagline": "Siia läheb mingi loosung",
            "12 month profit": "Balti põhinimekirja ettevõtete viimase 12 kuu kasum",
            "12 month index change": "portfelli väärtus täna, kui oleksid ostnud aasta tagasi 1000 € eest Balti põhinimekirja aktsiaid",
            "keyStats": "Üldnäitajad",
            "financials": "Finantsnäitajad",
            "financial data disclaimer": "Kõik finantsnäitajad v.a EPS mln eurodes",
            "stocks": "Aktsiad",
            "ticker": "Tiksuja",
            "name": "Nimi",
            "isin": "ISIN",
            "priceEarningTtm": "12 kuu P/E",
            "priceBook": "P/B",
            "priceSalesTtm": "12 kuu P/S",
            "revenueGrowthThreeYearAvg": "3 aasta keskmise tulu kasv",
            "operatingMarginTtm": "12 kuu tegevusmarginaal",
            "netMarginTtm": "12 kuu puhasmarginaal",
            "roeTtm": "12 month ROE",
            "debtEquity": "D/E",
            "revenue": "Tulu",
            "operatingIncome": "Põhitegevustulu",
            "netIncome": "Netotulu",
            "earningsPerShare": "EPS",
            "dilutedSharesOutstanding": "Käibelolevad aktsiad (lahjendatud)",
            "currentAssets": "Käibevarad",
            "nonCurrentAssets": "Põhivarad",
            "totalAssets": "Koguvarad",
            "currentLiabilities": "Lühiajalised kohustised",
            "totalLiabilities": "Kogukohustised",
            "totalEquity": "Omakapital",
            "operatingCashFlow": "Äritegevuse rahavood",
            "capitalExpenditure": "CapEx",
            "freeCashFlow": "Vaba rahavoog",
            "EE": "Eesti",
            "LV": "Läti",
            "LT": "Leedu",
            "data as of": "Andmed seisuga",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;