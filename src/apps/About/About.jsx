import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useUserData } from "../../context/DataContext";
import "./About.css";

const profilePic = "/assets/about/profile.jpg";

const About = () => {
  const { profile, contact, socials } = useUserData();

  // Social platforms to display (in order)
  const socialPlatforms = ['x', 'github', 'instagram', 'linkedin', 'snapchat'];

  return (
    <div className="about-app">
      <div className="profile-section">
        <img src={profilePic} alt={profile.name} className="profile-image" />
        <h1 className="profile-name">{profile.name}</h1>
      </div>

      <div className="social-links">
        {socialPlatforms.map(platform => {
          const social = socials[platform];
          if (!social) return null;

          return (
            <div key={platform} className="social-item">
              <span className="social-label">{platform}</span>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                {social.handle}
                <ArrowUpRight className="social-icon" size={12} />
              </a>
            </div>
          );
        })}

        <div className="social-item">
          <span className="social-label">email</span>
          <a href={`mailto:${contact.email}`} className="social-link">
            {contact.email}
            <ArrowUpRight className="social-icon" size={12} />
          </a>
        </div>
      </div>

      <div className="about-section">
        <div className="about-item">
          <span className="about-label">about</span>
          <span className="about-text">{profile.title}</span>
        </div>

        <div className="about-item">
          <span className="about-label">interests</span>
          <span className="about-text">{profile.interests}</span>
        </div>
      </div>
    </div>
  );
};

export default About;
