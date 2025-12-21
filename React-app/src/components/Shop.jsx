import { useEffect, useState } from "react";
import "./Shop.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function Shop() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/items/`).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch items");
            }
            return response.json();
        })
        .then((data) => {
            setItems(data);
            setLoading(false);
        })
        .catch(() => {
            setError("Could not load items");
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading shop items...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="shop-container"> 
            <h1 className="shop-title">Shop</h1>

            {items.length === 0 && (<p className="shop-empty">No items for sale</p>)}

            <div className="shop-grid">
                {items.map((item) => (
                    <div className="shop-card" key={item.id}>
                        <div className="popular-image">
                            {item.image && (
                                <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt={item.name}
                                />
                            )}
                        </div>
                        
                        <div>
                            <h3>{item.name}</h3>
                            <p className="shop-description">{item.description}</p>
                        </div>

                        <div>
                            <p className="shop-price">€{item.price}</p>
                            <p className="shop-meta">
                                Seller: {item.seller}
                                <br />
                                Added: {new Date(item.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>  
        </div>
    );
}

export default Shop;