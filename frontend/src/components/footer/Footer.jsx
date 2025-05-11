import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container ">
        <h2 className="footer_title">AlgoWars</h2>

        <div>
          <ul className="footer_list">
            <li>
              <a href="#about" className="footer_link">
                About
              </a>
            </li>

            <li>
              <a href="#portfolio" className="footer_link">
                FAQ
              </a>
            </li>

            <li>
              <a href="#contact" className="footer_link">
                Contact
              </a>
            </li>

            <li>
              <a href="#portfolio" className="footer_link">
                Support
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ul className="footer_list">
            <li>
              <a href="#about" className="footer_link">
                Top Interview Problems
              </a>
            </li>

            <li>
              <a href="#portfolio" className="footer_link">
                Top Google Problems
              </a>
            </li>

            <li>
              <a href="#contact" className="footer_link">
                Top Facebook Problems
              </a>
            </li>

            <li>
              <a href="#portfolio" className="footer_link">
                Top Amazon Problems
              </a>
            </li>
            <li>
              <a href="#portfolio" className="footer_link">
                Top Microsoft Problems
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul className="footer_list">
            <li>
              <a href="#portfolio" className="footer_link">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#contact" className="footer_link">
                Terms Of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <span className="footer_copy">
        &#169;2024 AlgoWars. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
