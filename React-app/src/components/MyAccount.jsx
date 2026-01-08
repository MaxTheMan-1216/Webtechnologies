import { useState } from "react";
import "./MyAccount.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

function MyAccount() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const [regEmail, setRegEmail] = useState("");
    const [regUser, setRegUser] = useState("");
    const [regPassword, setRegPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_BASE_URL}/auth/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: loginUser,
                password: loginPassword,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            alert("Login successful!");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: regUser,
                email: regEmail,
                password: regPassword,
            }),
        });

        if (res.ok) {
            alert("Registration successful! You can now log in.");
        } else {
            alert("Registration failed. Please try again.");
        }  
    };

    return (
        <div className="account-container">
            <h1>My Account</h1>

            <div className="account-grid">
                {/* LOGIN */}
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <label>Username or email address *</label>
                        <input value={loginUser} onChange={(e) => setLoginUser(e.target.value)}/>
                        
                        <label>Password *</label>
                        <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>

                        <div className="remember">
                            <input type="checkbox"/> Remember me
                        </div>

                        <button className="button-read">Log in</button>
                        <p className="link">Lost your password?</p>
                    </form>
                </div>

                {/* REGISTER */}
                <div>
                    <h2>Register</h2>
                    <form onSubmit={handleRegister}>
                        <label>Email address *</label>
                        <input value={regEmail} onChange={(e) => setRegEmail(e.target.value)}/>
                        
                        <label>Username *</label>
                        <input value={regUser} onChange={(e) => setRegUser(e.target.value)}/>
                        
                        <label>Password *</label>
                        <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}/>

                        <p className="small-text">
                            A link to set a new password will be sent to your email address.
                        </p>

                        <button className="button-read">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyAccount;