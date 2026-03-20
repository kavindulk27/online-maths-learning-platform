import { GraduationCap, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import logo from '../assets/logo.jpeg';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-16 md:pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 mb-12 md:mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6 group cursor-pointer">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full scale-150 group-hover:bg-secondary/30 transition-colors" />
                                <img 
                                    src={logo} 
                                    alt="My Maths Logo" 
                                    className="h-14 w-auto object-contain relative z-10 drop-shadow-2xl"
                                />
                            </div>
                            <div className="ml-4 flex flex-col group-hover:translate-x-1 transition-transform">
                                <span className="text-2xl font-black tracking-tight leading-none">
                                    MYMATHS<span className="text-secondary drop-shadow-[0_0_8px_rgba(0,116,217,0.3)]">.LK</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-normal mt-1 text-accent drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                                    ගණිතයට හරිම උත්තරේ
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-500 mb-6 italic">
                            "Building mathematical foundations for the leaders of tomorrow."
                        </p>
                        <div className="flex space-x-4">
                            <a 
                                href="https://www.facebook.com/share/v/1C1YFjyqeM/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                                    alt="Facebook" 
                                    className="h-6 w-auto"
                                />
                            </a>
                            <a 
                                href="https://youtube.com/@chamaravidunuvan?si=00GSZnzX6sSsMnSR" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                                    alt="YouTube" 
                                    className="h-6 w-auto"
                                />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-tight">Quick Links</h4>
                        <ul className="space-y-4 text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Home</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Our Classes</a></li>
                            <li><a href="#about" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">About Teacher</a></li>
                            <li><a href="#contact" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6 tracking-tight">Grades</h4>
                        <ul className="grid grid-cols-2 gap-4 text-gray-500 font-medium">
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 6</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 7</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 8</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 9</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 10</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">Grade 11</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <p>© 2026 MYMATHS.LK. All Rights Reserved.</p>
                        <span className="hidden md:inline text-gray-800">|</span>
                        <p className="text-gray-500 font-medium mt-1 md:mt-0">Developed by <span className="text-secondary font-bold">K&S Developers</span></p>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
