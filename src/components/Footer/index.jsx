import "./Footer.scss"
import { ReactComponent as GhIcon } from "../../assets/svg/github-icon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/svg/instagram-icon.svg";
import { ReactComponent as TelegramIcon } from "../../assets/svg/telegram-icon.svg";
import { ReactComponent as TWitterIcon } from "../../assets/svg/twitter-icon.svg";

function Footer(){
    return(
        <footer className="blurred app-transition">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column footer-socials">
                        <a className="footer-socials-item" href="https://github.com/MaksimKosyanchuk" target="_blank">
                            <GhIcon/>
                        </a>
                        <a className="footer-socials-item" href="https://www.instagram.com/maks_kos/" target="_blank">
                            <InstagramIcon/>
                        </a>
                        <a className="footer-socials-item" href="https://t.me/maks_k0s" target="_blank">
                            <TelegramIcon/>
                        </a>
                        <a className="footer-socials-item" href="https://twitter.com/maks_k0s" target="_blank">
                            <TWitterIcon/>
                        </a>
                    </div>
                    <div className="footer-column">
                        <p>
                        Current news
                        </p>
                    </div>
                    <div className="footer-column footer-copyright">
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