import "./Header.css";

function Header() {
    return(
        <header className="header">
            {/* TOP ROW */}
            <div className="header-top">
                <div className="header-top-inner">

                    <div className="header-left">
                        <img src="/src/assets/Åa_logo.svg" alt="Åbo Akademi" />
                        <span className="shop-title">Åbo Akademi University Web Shop</span>
                    </div>

                    <div className="header-search">
                        <input type="text" placeholder="Search For Products" />
                        <button>🔍</button>
                    </div>

                    <div className="header-icons">
                        <span>👤</span>
                        <span>🛒</span>
                        <span>🌐 English</span>
                    </div>
                </div>
            </div>

            {/* NAV ROW */}
            <div className="header-nav">
                <div className="header-nav-inner">
                    <nav className="nav-links">
                        <a>PR products</a>
                        <a>Library</a>
                        <a>Books and publications</a>
                        <a>Conferral</a>
                        <a>Certificates</a>
                        <a>ICT Services Fees</a>
                        <a>ÅAU Sports</a>
                    </nav>
                    
                    <button className="categories-btn">
                        ☰ All Categories
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;