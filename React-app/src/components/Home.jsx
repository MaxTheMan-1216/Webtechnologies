import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";


function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/items/`).then((res) => res.json()).then((data) => {
            setItems(data.slice(0,4));
        })
        .catch(() => {});
    }, []);



    return (
        <div className="home">
            {/* HERO */}
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

            {/* MOST POPULAR */}
            <section className="popular">
                <div className="popular-container">
                    <p className="popular-subtitle"> EXPLORE AWESOME PRODUCTS</p>
                    <h2 className="popular-title">MOST POPULAR</h2>

                    <div className="popular-grid">
                        {items.map((item) => (
                            <div className="popular-card" key={item.id}>
                                <div className="popular-image">
                                    {/* Placeholder image */}
                                </div>

                                <p className="popular-name">{}item.name</p>
                                <span className="popular-price">€{item.price}</span>
                            </div>
                        ))}
                    </div>

                    <Link to="/shop" className="popular-button">
                    Explore Other Products
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;