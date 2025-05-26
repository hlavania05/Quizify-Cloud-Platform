import { NavLink } from "react-router-dom";
import "./About.css";

export const About = () => {
  return (
    <>
      <main>
        <section className="about-hero-section">
          <div className="about-container about-flex-row">
            <div className="about-content">
              <h1 className="about-heading">Why Choose Quizify?</h1>
              <p className="about-paragraph">
                <strong>Engaging Experience:</strong> At Quizify, we believe
                learning should be exciting. Our interactive quizzes are
                designed to engage users, making it easier to retain information
                and develop new insights in an enjoyable way.
              </p>
              <p className="about-paragraph">
                <strong>Variety of Quizzes:</strong> From science to general
                knowledge, Quizify provides a diverse selection of quizzes
                across various subjects and skill levels. This diversity ensures
                every user can find content aligned with their interests.
              </p>
              <p className="about-paragraph">
                <strong>User-Friendly Interface:</strong> Our platform’s clean,
                intuitive design allows seamless navigation, even for beginners.
                Quizify is optimized for all devices, making it easy to access
                quizzes and track progress from anywhere.
              </p>
              <p className="about-paragraph">
                <strong>Instant Feedback:</strong> Quizify offers real-time
                feedback on your quiz responses, so you can immediately
                understand correct answers and improve. This rapid feedback loop
                enhances the learning process and encourages continual growth.
              </p>
              <p className="about-paragraph">
                <strong>Secure & Reliable:</strong> Security and reliability are
                at the core of Quizify’s infrastructure. Your data remains
                protected, and the platform is available 24/7, allowing you to
                focus solely on learning and progress.
              </p>
              <div className="about-btn-group">
                <NavLink to="/contact">
                  <button className="about-btn">Connect Now</button>
                </NavLink>
              </div>
            </div>
            <div className="about-image">
              <img
                src="/images/about.png"
                alt="coding buddies"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
