import { GraduationCap, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <img 
                                src="/logo.png" 
                                alt="My Maths Logo" 
                                className="h-10 w-auto object-contain"
                            />
                            <div className="ml-3 flex flex-col">
                                <span className="text-xl font-bold tracking-tight leading-none">
                                    My<span className="text-secondary">Maths</span>
                                </span>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-secondary">
                                    Best Answer for Maths
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
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#" className="hover:text-secondary transition-colors">Home</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors">Our Classes</a></li>
                            <li><a href="#about" className="hover:text-secondary transition-colors">About Teacher</a></li>
                            <li><a href="#contact" className="hover:text-secondary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Grades</h4>
                        <ul className="space-y-4 text-gray-500">
                            <li><a href="#classes" className="hover:text-secondary transition-colors">Grade 6 - 8</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors">Grade 9 - 11</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors">A/L Statistics</a></li>
                            <li><a href="#classes" className="hover:text-secondary transition-colors">Paper Classes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-gray-500 mb-4">Subscribe to get updates on new batches.</p>
                        <div className="relative">
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-secondary text-sm" placeholder="Your Email" />
                            <button className="absolute right-1.5 top-1.5 bg-primary px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all">Subscribe</button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                    <p>© 2026 My Maths. All Rights Reserved.</p>
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
