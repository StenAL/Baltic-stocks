import { FunctionComponent } from "react";
import "../style/Footer.css";
import { useTranslation } from "react-i18next";

export const Footer: FunctionComponent = () => {
    const { t } = useTranslation();
    return (
        <footer>
            <img src={`${process.env.PUBLIC_URL}/footer.png`} className="footer" alt="Skyline view of Tallinn" />
            <p
                dangerouslySetInnerHTML={{
                    __html: t("open-source", {
                        interpolation: { escapeValue: false },
                    }),
                }}
            />
        </footer>
    );
};
