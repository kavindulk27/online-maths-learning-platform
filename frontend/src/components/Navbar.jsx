import { useState, useEffect } from 'react';
import { Menu, X, Rocket, GraduationCap, Phone, User, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpeg';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', icon: <HomeIcon size={18} />, href: '#' },
        { name: 'Our Classes', icon: <GraduationCap size={18} />, href: '#classes' },
        { name: 'About', icon: <Rocket size={18} />, href: '#about' },
        { name: 'Contact', icon: <Phone size={18} />, href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center group">
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 group-hover:bg-secondary/30 transition-colors" />
                                <img 
                                    src={logo} 
                                    alt="My Maths Logo" 
                                    className="h-14 w-auto object-contain relative z-10 drop-shadow-2xl"
                                />
                            </motion.div>
                            <div className="ml-4 flex flex-col group-hover:translate-x-1 transition-transform">
                                <span className={`text-2xl font-black tracking-tight leading-none ${scrolled ? 'text-dark' : 'text-white'}`}>
                                    MYMATHS<span className="text-secondary drop-shadow-[0_0_8px_rgba(0,116,217,0.3)]">.LK</span>
                                </span>
                                <span className={`text-[11px] font-black uppercase tracking-normal mt-1 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)] ${scrolled ? 'text-secondary' : 'text-accent'}`}>
                                    ගණිතයට හරිම උත්තරේ
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`flex items-center space-x-1 font-medium transition-colors hover:text-secondary ${scrolled ? 'text-gray-600' : 'text-white'}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </a>
                        ))}
                        <Link
                            to="/login"
                            className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-secondary transition-all shadow-lg hover:shadow-primary/30"
                        >
                            <User size={18} />
                            <span>Login</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${scrolled ? 'text-dark' : 'text-white'} hover:text-primary transition-colors`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-secondary transition-all"
                                >
                                    {link.icon}
                                    <span className="font-semibold">{link.name}</span>
                                </a>
                            ))}
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center space-x-2 w-full bg-primary text-white px-4 py-4 rounded-xl font-bold shadow-lg"
                            >
                                <User size={20} />
                                <span>Login to Portal</span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
