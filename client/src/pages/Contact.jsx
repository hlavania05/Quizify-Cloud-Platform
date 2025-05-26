import { useState } from "react";
import "./Contact.css";

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState(""); 

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/auth/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (response.ok) {
                setStatus("Your message has been sent successfully!");
                setContact({ username: "", email: "", message: "" }); 
            } 
            else {
                const result = await response.json();
                setStatus(result.error || "An error occurred. Please try again.");
            }
        } 
        catch(error){
            console.error("Error submitting contact form:", error);
        }
    };

    return (
        <>
            <section className="contact-section">
                <div className="contact-header container">
                    <h1 className="contact-heading">Contact Us</h1>
                </div>
                <div className="contact-container container grid grid-two-cols">
                    <div className="contact-image">
                        <img src="/images/support.png" alt="We are here to help" width="500" height="500" />
                    </div>

                    <div className="contact-form-section">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    cols="30"
                                    rows="6"
                                    className="form-textarea"
                                ></textarea>
                            </div>

                            <div className="form-submit">
                                <button type="submit" className="submit-button">Submit</button>
                            </div>

                            {status && <p className="status-message">{status}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
