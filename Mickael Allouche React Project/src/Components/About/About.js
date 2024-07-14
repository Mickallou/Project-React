import React from 'react';
import { useThemeMode } from '../../Context/ThemeMode'
import './About.css';

const About = () => {
    const {darkMode } = useThemeMode()

    return (
        <div className={darkMode ? "bg-secondary page about-container" : "bg-primary-subtle page about-container"}>
            <h1>About Us</h1>
            <p>Welcome to our corporate card presentation site!</p>
            <p>
                Our mission is to provide an interactive platform to discover and share information about various companies through their cards. We believe that every company has a unique story to tell, and our site aims to highlight these stories.
            </p>
            <h2>What Makes Us Unique?</h2>
            <p>
                We offer an intuitive interface and detailed cards, accompanied by expert comments and analyses. We select companies based on their impact, unique stories, and community recommendations.
            </p>
            <h2>Why Create an Account?</h2>
            <p>
                By creating an account, users can save their favorite cards, participate in discussions, and receive personalized updates.
            </p>
            <h2>Types of Cards Available</h2>
            <p>
                We offer cards of local, national, and international companies, covering various sectors.
            </p>
            <h2>Information Accuracy</h2>
            <p>
                Our experts verify every piece of information, and we encourage our community to report any errors for quick review.
            </p>
            <h2>Future Features</h2>
            <p>
                We are working on adding augmented reality features and virtual tours of the featured companies.
            </p>
            <h2>How Our Site Helps Users</h2>
            <p>
                Thanks to our site, users can share what their company has to offer and help non-professional users find what they are looking for. Our platform allows better visibility of company strengths and facilitates information search for everyone.
            </p>
            <h2>Additional Information</h2>
            <p>
                Our site was created by a junior developer looking to grow in the programming world. By using our site, professionals can find more clients, and non-professionals can search for what they desire from everything that professional clients have published.
            </p>
            <h2>Contact for Partnerships</h2>
            <p>
                For any partnership or collaboration requests, please contact us at <a href="mailto:allouchemicka@gmail.com">allouchemicka@gmail.com</a>.
            </p>
        </div>
    );
}

export default About;
