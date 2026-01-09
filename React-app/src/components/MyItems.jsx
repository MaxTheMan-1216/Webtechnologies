import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

function Section({ title, items }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h2>{title}</h2>
            {items.length === 0 && <p>No items found.</p>}
            {items.map((item) => (
                <div key={item.id} style={{ padding: '0.5rem 0'}}>
                    <strong>{item.name}</strong> - €{item.price}
                </div>
            ))}
        </div>
    );
}

function MyItems() {
    const [data , setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access");
        fetch(`${API_BASE_URL}/my-items/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => response.json())
        .then(setData);
    }, []);

    if (!data) return <p>Loading your items...</p>;

    return (
        <div className="container">
            <h1>My Items</h1>
            <Section title="On sale" items={data.on_sale} />
            <Section title="Sold" items={data.sold} />
            <Section title="Purchased" items={data.purchased} />
        </div>
    );
}

export default MyItems;