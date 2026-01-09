import {use, useEffect, useState} from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

function Cart() {
    const [Items, setItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access");
        fetch(`${API_BASE_URL}/cart/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then(setItems);
    }, []);

    const removeItem = async (Id) => {
        const token = localStorage.getItem("access");
        await fetch(`${API_BASE_URL}/cart/remove/${Id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setItems(Items.filter((item) => item.id !== Id));
    };

    return (
        <div className='container'>
            <h1>Cart</h1>
            {Items.length === 0 && <p>Your cart is empty</p>}

            {Items.map((cartItem) => (
                <div key={cartItem.id}>
                    <strong>{cartItem.item.name}</strong> - €{cartItem.item.price}
                    <button onClick={() => removeItem(cartItem.id)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Cart;