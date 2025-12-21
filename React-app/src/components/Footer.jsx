import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div>
                    <h3>Åbo Akademi</h3>
                    <p>#åakärlek❤️</p>
                </div>

                <div>
                    <h4>Information</h4>
                    <a href="#">Terms and conditions</a>
                    <a href="#">About us</a>
                    <a href="#">Register Description</a>
                    <a href="#">Sitemap</a>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p>shop@abo.fi</p>
                    <p>Turku & Vaasa</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;