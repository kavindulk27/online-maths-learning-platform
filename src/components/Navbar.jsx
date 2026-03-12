import { useState, useEffect } from 'react';
import { Menu, X, Rocket, GraduationCap, Phone, User, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
                        <Link to="/" className="flex items-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                            >
                                <img 
                                    src="/logo.png" 
                                    alt="My Maths Logo" 
                                    className="h-12 w-auto object-contain"
                                />
                            </motion.div>
                            <div className="ml-3 flex flex-col">
                                <span className={`text-xl font-bold tracking-tight leading-none ${scrolled ? 'text-dark' : 'text-white'}`}>
                                    My<span className="text-secondary">Maths</span>
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${scrolled ? 'text-secondary' : 'text-secondary'}`}>
                                    Best Answer for Maths
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
