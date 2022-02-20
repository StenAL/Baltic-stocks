import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

interface Translation {
    title: string;
    tagline: string;
    "2019 profit": string;
    "12 month index change": string;
    keyStats: string;
    financials: string;
    "financial data disclaimer": string;
    stocks: string;
    ticker: string;
    name: string;
    isin: string;
    priceEarningTtm: string;
    priceBook: string;
    priceSalesTtm: string;
    revenueGrowthThreeYearAvg: string;
    operatingMarginTtm: string;
    netMarginTtm: string;
    roeTtm: string;
    debtEquity: string;
    revenue: string;
    operatingIncome: string;
    netIncome: string;
    earningsPerShare: string;
    dilutedSharesOutstanding: string;
    currentAssets: string;
    nonCurrentAssets: string;
    totalAssets: string;
    currentLiabilities: string;
    totalLiabilities: string;
    totalEquity: string;
    operatingCashFlow: string;
    capitalExpenditure: string;
    freeCashFlow: string;
    EE: string;
    LV: string;
    LT: string;
    "data as of": string;
    "open-source": string;
}

const resources: Record<string, { translation: Translation }> = {
    en: {
        translation: {
            title: "Baltic Stocks",
            tagline: "More than 30 different shares, updated daily",
            "2019 profit": "cumulative profits of Baltic Main List companies in 2019",
            "12 month index change":
                "portfolio value today if you had bought 1000 € of Baltic Main List stocks one year ago",
            keyStats: "Key Stats",
            financials: "Financials",
            "financial data disclaimer": "All financial data except EPS in millions EUR",
            stocks: "Stocks",
            ticker: "Ticker",
            name: "Name",
            isin: "ISIN",
            priceEarningTtm: "12 month average P/E",
            priceBook: "P/B",
            priceSalesTtm: "12 month P/S",
            revenueGrowthThreeYearAvg: "3 year avg revenue growth",
            operatingMarginTtm: "12 month operating margin",
            netMarginTtm: "12 month net margin",
            roeTtm: "12 month ROE",
            debtEquity: "D/E",
            revenue: "Revenue",
            operatingIncome: "Operating Income",
            netIncome: "Net Income",
            earningsPerShare: "EPS",
            dilutedSharesOutstanding: "Diluted shares outstanding",
            currentAssets: "Current Assets",
            nonCurrentAssets: "Non-current assets",
            totalAssets: "Total Assets",
            currentLiabilities: "Current Liabilities",
            totalLiabilities: "Total Liabilities",
            totalEquity: "Total Equity",
            operatingCashFlow: "Operating Cash Flow",
            capitalExpenditure: "CapEx",
            freeCashFlow: "Free cash flow",
            EE: "Estonia",
            LV: "Latvia",
            LT: "Lithuania",
            "data as of": "Data as of",
            "open-source": 'This application is <a href="https://github.com/StenAL/baltic-stocks">open-source</a>',
        },
    },
    et: {
        translation: {
            title: "Balti Aktsiad",
            tagline: "Enam kui 30 erineva väärtpaberi alati värsked andmed",
            "2019 profit": "Balti põhinimekirja ettevõtete viimase kasum 2019. aastal",
            "12 month index change":
                "portfelli väärtus täna, kui oleksid ostnud aasta tagasi 1000 € eest Balti põhinimekirja aktsiaid",
            keyStats: "Üldnäitajad",
            financials: "Finantsnäitajad",
            "financial data disclaimer": "Kõik finantsnäitajad v.a EPS mln eurodes",
            stocks: "Aktsiad",
            ticker: "Tiksuja",
            name: "Nimi",
            isin: "ISIN",
            priceEarningTtm: "12 kuu P/E",
            priceBook: "P/B",
            priceSalesTtm: "12 kuu P/S",
            revenueGrowthThreeYearAvg: "3 aasta keskmise tulu kasv",
            operatingMarginTtm: "12 kuu tegevusmarginaal",
            netMarginTtm: "12 kuu puhasmarginaal",
            roeTtm: "12 kuu ROE",
            debtEquity: "D/E",
            revenue: "Tulu",
            operatingIncome: "Põhitegevustulu",
            netIncome: "Netotulu",
            earningsPerShare: "EPS",
            dilutedSharesOutstanding: "Käibelolevad aktsiad (lahjendatud)",
            currentAssets: "Käibevarad",
            nonCurrentAssets: "Põhivarad",
            totalAssets: "Koguvarad",
            currentLiabilities: "Lühiajalised kohustised",
            totalLiabilities: "Kogukohustised",
            totalEquity: "Omakapital",
            operatingCashFlow: "Äritegevuse rahavood",
            capitalExpenditure: "CapEx",
            freeCashFlow: "Vaba rahavoog",
            EE: "Eesti",
            LV: "Läti",
            LT: "Leedu",
            "data as of": "Andmed seisuga",
            "open-source": 'See rakendus on <a href="https://github.com/StenAL/baltic-stocks">avatud lähtekoodiga</a>',
        },
    },
};

// https://github.com/i18next/react-i18next/blob/master/example/react/src/i18n.js
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        debug: false,

        interpolation: {
            escapeValue: false, // not needed for React as it escapes by default
        },
    })
    .catch(console.log);

export default i18n;
