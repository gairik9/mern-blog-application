import "./Footer.styles.css";
import {
    InstagramIcon,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
} from "../../assets/images";

const Footer = () => {
  return <footer className="footer">
    <div className="footer__Container">
        <div className="footer__Left">
            <h1>MicroBlog</h1>
            <div className="footer__SocialMedia">
                <img src={InstagramIcon} alt="" />
                <img src={FacebookIcon} alt="" />
                <img src={WhatsappIcon} alt="" />
                <img src={TelegramIcon} alt="" />
            </div>
        </div>
        <div className="footer__Middle">
            <h4>Home</h4>
            <div/>
            <h4>Contact</h4>
            <div/>
            <h4>About us</h4>
            <div/>
            <h4>Discussions</h4>
        </div>
    </div>
  </footer>;
};

export default Footer;
