import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './Videos';
import Classes from './Classes';
import Videos from './About';
import Contact from './Contact';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <About />
            <Classes />
            <Videos />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
