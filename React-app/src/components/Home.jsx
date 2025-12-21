import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>
                        Welcome to the Åbo <br /> Akademi University <br /> web shop!
                    </h1>

                    <div className="hero-buttons">
                        <Link to="/shop" className="btn btn-primary">
                        See All Products
                        </Link>
                        <Link to="/users" className="btn btn-secondary">
                        Register To Webshop
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;