import "./Home.css";

export const Home = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome to the Ultimate Quiz Platform</p>
              <h1>Welcome to Quizify!</h1>
              <p>
                Are you ready to challenge yourself and expand your knowledge
                with engaging quizzes? At Quizify, we bring you a variety of
                interactive quizzes tailored to match your interests and skill
                level.
              </p>
              <p>
                From science and history to pop culture and current events, our
                platform provides a user-friendly and immersive quiz experience.
                Whether you’re preparing for a test or just looking for a fun
                way to learn, Quizify is the perfect place to enhance your
                knowledge and skills.
              </p>
              <div className="btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <section className="section-hero">
        <div className="container grid grid-two-cols">
          {/* hero images  */}
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>We are here to empower your learning journey</p>
            <h1>Get Started Today</h1>
            <p>
              Ready to take the first step towards expanding your knowledge and
              enhancing your skills? Sign up today for free access to Quizify,
              and let’s explore how we can make learning fun and engaging for
              you!
            </p>
            <div className="btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
