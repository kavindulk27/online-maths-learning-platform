import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Videos from '../components/Videos';
import Classes from '../components/Classes';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="relative">
            <Navbar />
            <Hero />
            <Videos />
            <div id="classes">
                <Classes />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
