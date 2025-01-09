import React from 'react';
import "../styles/Home.css";

function Footer() {
  return (
      <>
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>
              The basic concept of this project, Food Waste Management, is to collect the excess/leftover food from donors such as hotels, restaurants, marriage halls, etc., and distribute it to needy people.
            </p>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <p>(+00) 0000 000 000</p>
            <p>Email: Fooddonate@gmail.com</p>
          </div>

          <div className="footer-column">
            <h3>Navigation</h3>
            <p>Food Donate | Home | About | Services | Contact</p>
          </div>
        </div>
        
        <p className="footer-bottom">&copy; 2023 Food Donate. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Footer