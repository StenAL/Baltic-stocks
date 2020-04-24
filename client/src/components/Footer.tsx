import React from "react";
import "../style/Footer.css";
import {withTranslation} from "react-i18next";

class Footer extends React.Component<any, object> {
    render() {
        const { t } = this.props;
        return (
            <footer>
                {/*TODO: Use language-localized footer image*/}
                <img src={process.env.PUBLIC_URL + "/footer.png"} className="footer" alt="text" />
                <p dangerouslySetInnerHTML={{__html: t('open-source', {interpolation: {escapeValue: false}})}}/>
          </footer>
        );
    }
}

export default withTranslation()(Footer);

