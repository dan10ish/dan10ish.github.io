import React from 'react';
import './Template.css';

/**
 * Template App Component
 * 
 * This is a template for creating new apps. Copy this folder and:
 * 1. Update app.manifest.json with your app details
 * 2. Rename Template.jsx and Template.css to your app name
 * 3. Implement your app logic
 * 4. Register the app in src/core/appRegistry.js
 * 5. Add an entry to src/data/appsConfig.json
 */
const Template = () => {
    return (
        <div className="template-app">
            <div className="template-content">
                <h2>Template App</h2>
                <p>Replace this content with your app implementation.</p>
            </div>
        </div>
    );
};

export default Template;
