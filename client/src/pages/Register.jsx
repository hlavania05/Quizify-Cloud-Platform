import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "../pages/Register.css";

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert("Registration successful");
                storeTokenInLS(responseData.token);
                setUser({ username: "", email: "", password: "" });
                navigate("/login");
            } else {
                alert("Invalid Registration Details");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <section className="register-section">
            <main className="register-main">
                <div className="register-container">
                    <div className="register-image">
                        <img
                            src="/images/register.png"
                            alt="Illustration of registration"
                            className="register-img"
                        />
                    </div>
                    <div className="register-form-container">
                        <h1 className="register-heading">Registration Form</h1>
                        <form onSubmit={handleSubmit} className="register-form">
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    onChange={handleInput}
                                    placeholder="Enter your username"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInput}
                                    placeholder="Enter your email"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleInput}
                                    placeholder="Enter your password"
                                    className="form-input"
                                />
                            </div>

                            <button type="submit" className="btn-submit">
                                Register Now
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
