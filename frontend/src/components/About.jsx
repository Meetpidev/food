import React from 'react';
import '../styles/style.css'

function About() {
  return (
    <>
      <header>
        <h1>About Us</h1>
      </header>

      <main>
        <section className="intro">
          <div className="content-wrapper" style={{ textAlign: 'justify' }}>
            <img src="https://media.istockphoto.com/id/509553708/photo/tropical-modern-villa-exterior.jpg?s=612x612&w=0&k=20&c=rMmOmihiXHl6htuhYVzbfPdKAawYHFuNMhD32A0sWUg=" alt="Travel Experience" />
            <div className="text-content">
              <p style={{ maxWidth: '37rem', marginLeft: '2rem' }}>
                Welcome to <strong style={{ color: 'rgb(255, 68, 0)' }}>Wanderlust</strong>, where we believe in creating memorable travel experiences through unique accommodations...
              </p>
            </div>
          </div>
        </section>

        {/* Other sections remain unchanged */}

        <section className="join-us">
          <h2>Join Us</h2>
          <p>Whether you’re looking for your next adventure...</p>
          <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: 'larger' }}>
            Thank you for choosing <strong style={{ color: 'rgb(255, 68, 0)' }}>Wanderlust</strong>—we can’t wait to help you create unforgettable memories!
          </p>
        </section>
      </main>
    </>
  );
}

export default About;
