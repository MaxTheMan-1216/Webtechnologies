import { useEffect, useState } from "react";

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
        <div>
            <h1>Shop</h1>

            {items.length === 0 && <p>No items for sale</p>}

            <ul style={{listStyle: "none", padding: 0}}>
                {items.map((item) =>(
                    <li
                    key={item.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "1rem",
                        marginBottom: "1rem",
                    }}
                    >
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>
                            <strong>Price:</strong> €{item.price}
                        </p>
                        <p>
                            <strong>Seller:</strong> {item.seller}
                        </p>
                        <small>
                            Added: {new Date(item.created_at).toLocaleString()}
                        </small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Shop;