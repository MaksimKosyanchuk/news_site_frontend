import "./Footer.scss"
import { ReactComponent as GhIcon } from "../../assets/svg/github-icon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/instagram-icon.svg";
import { ReactComponent as TelegramIcon } from "../../assets/svg/telegram-icon.svg";
import { ReactComponent as TWitterIcon } from "../../assets/svg/twitter-icon.svg";

function Footer(){
    return(
        <footer className="blurred app-transition">
            <div className="container">
                <div className="footer_content">
                    <div className="footer_column footer_socials">
                        <a className="footer_socials_item" href="https://github.com/MaksimKosyanchuk" target="_blank">
                            <GhIcon className="app-transition"/>
                        </a>
                        <a className="footer_socials_item" href="https://www.instagram.com/maks_kos/" target="_blank">
                            <InstagramIcon className="app-transition"/>
                        </a>
                        <a className="footer_socials_item" href="https://t.me/maks_k0s" target="_blank">
                            <TelegramIcon className="app-transition"/>
                        </a>
                        <a className="footer_socials_item" href="https://twitter.com/maks_k0s" target="_blank">
                            <TWitterIcon className="app-transition"/>
                        </a>
                    </div>
                    <div className="footer_column footer_site_title">
                        <p>
                        Daily Buzz
                        </p>
                    </div>
                    <div className="footer_column footer_copyright">
                        <p>
                        © All rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;