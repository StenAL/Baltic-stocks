import { FunctionComponent } from "react";
import "../style/Footer.css";
import footer from "../assets/footer.png";
import { useTranslation } from "react-i18next";

export const Footer: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <img src={footer} className="footer" alt="Skyline view of Tallinn" />
            <p>
                {t("this app is")} <a href="https://github.com/StenAL/baltic-stocks">{t("open-source")}</a>
            </p>
        </footer>
    );
};
