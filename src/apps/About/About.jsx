import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./About.css";
const profilePic = "/assets/about/profile.jpg"

const About = () => {
  return (
    <div className="about-app">
      <div className="profile-section">
        <img src={profilePic} alt="Danish" className="profile-image" />
        <h1 className="profile-name">Danish Ansari</h1>
      </div>

      <div className="social-links">
        <div className="social-item">
          <span className="social-label">x</span>
          <a href="https://x.com/dan10ish" target="_blank" rel="noopener noreferrer" className="social-link">
            dan10ish
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>

        <div className="social-item">
          <span className="social-label">github</span>
          <a href="https://github.com/dan10ish" target="_blank" rel="noopener noreferrer" className="social-link">
            dan10ish
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>

        <div className="social-item">
          <span className="social-label">instagram</span>
          <a href="https://instagram.com/dan10ish" target="_blank" rel="noopener noreferrer" className="social-link">
            dan10ish
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>

        <div className="social-item">
          <span className="social-label">linkedin</span>
          <a href="https://linkedin.com/in/dan10ish" target="_blank" rel="noopener noreferrer" className="social-link">
            dan10ish
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>

        <div className="social-item">
          <span className="social-label">snapchat</span>
          <a href="https://snapchat.com/add/dan10ish" target="_blank" rel="noopener noreferrer" className="social-link">
            dan10ish
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>

        <div className="social-item">
          <span className="social-label">email</span>
          <a href="mailto:aansaridan@gmail.com" className="social-link">
            aansaridan@gmail.com
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>
      </div>

      <div className="about-section">
        <div className="about-item">
          <span className="about-label">about</span>
          <span className="about-text">Building solutions at the intersection of hardware and software.</span>
        </div>

        <div className="about-item">
          <span className="about-label">interests</span>
          <span className="about-text">Machine Learning | Robotics | Finance</span>
        </div>
      </div>


    </div>
  );
};
export default About;
