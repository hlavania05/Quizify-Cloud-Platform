import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import "./Login.css";

export const Login = () => {
    const [user, setUser] = useState({
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
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert("Login successful");
                storeTokenInLS(responseData.token);
                setUser({ email: "", password: "" });
                localStorage.setItem("username", responseData.username);
                localStorage.setItem("isAdmin", responseData.isAdmin);
                localStorage.setItem("userId", responseData.userId);
                console.log(responseData.isAdmin)
                if(responseData.isAdmin === true){
                    navigate("/manage_users");
                }
                else{ navigate("/portal"); }
            } else {
                alert("Invalid Login Details!!");
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    return (
        <>
            <section className="login-section">
                <main className="login-main">
                    <div className="section-registration">
                        <div className="registration-image">
                            <img
                                src="/images/register.png"
                                alt="a nurse with a cute look"
                                className="registration-img"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className="form-heading">Login Form</h1>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInput}
                                        placeholder="Email"
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
                                        placeholder="Password"
                                        className="form-input"
                                    />
                                </div>
                                <button type="submit" className="btn btn-submit">
                                    Login Now
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};
