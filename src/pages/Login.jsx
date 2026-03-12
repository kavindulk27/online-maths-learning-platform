import { motion } from 'framer-motion';
import { User, Lock, Youtube, Facebook, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'; 
const Login = () => {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 md:p-8 relative">
            {/* Back button */}
            <Link 
                to="/" 
                className="absolute top-4 left-4 md:top-8 md:left-8 group flex items-center space-x-2 z-30"
            >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full text-white group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-lg">
                    <ArrowLeft size={18} />
                </div>
                <span className="text-white/90 font-bold text-sm tracking-wider uppercase group-hover:text-white transition-colors">Go Back</span>
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-6xl w-full"
            >
                {/* Left Column: Illustration */}
                <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 order-2 md:order-1">
                    <img 
                        src="/login-illustration.png" 
                        alt="Student Illustration" 
                        className="max-w-full h-auto object-contain"
                    />
                </div>

                {/* Right Column: Login Form */}
                <div className="md:w-1/2 p-8 md:p-16 flex flex-col items-center justify-center order-1 md:order-2 border-b md:border-b-0 md:border-l border-gray-100">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center mb-10">
                        <img 
                            src={logo} 
                            alt="My Maths Logo" 
                            className="h-48 w-auto object-contain"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-8 self-start">Sign In</h2>

                    <form className="w-full space-y-6">
                        <div className="relative">
                            <User className="absolute left-0 bottom-4 text-gray-400" size={20} />
                            <input
                                type="text"
                                className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors peer"
                                placeholder="Student ID"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-0 bottom-4 text-gray-400" size={20} />
                            <input
                                type="password"
                                className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors peer"
                                placeholder="Password"
                            />
                        </div>

                        <button className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-lg font-bold transition-all shadow-md active:scale-[0.98]">
                            Login
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col items-start w-full space-y-4">
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-secondary transition-colors underline underline-offset-4">
                            Forgot Your Password?
                        </a>
                        
                        <a href="#" className="w-full text-center py-2 px-4 border border-secondary text-secondary text-xs font-bold rounded-sm hover:bg-secondary/5 transition-colors">
                            NOT A STUDENT? REGISTER NOW!
                        </a>
                    </div>

                    {/* Footer Infos */}
                    <div className="mt-12 flex flex-col items-center space-y-4">
                        <div className="flex space-x-6">
                            <a 
                                href="https://youtube.com/@chamaravidunuvan?si=00GSZnzX6sSsMnSR" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                                    alt="YouTube" 
                                    className="h-7 w-auto"
                                />
                            </a>
                            <a 
                                href="https://www.facebook.com/share/v/1C1YFjyqeM/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                                    alt="Facebook" 
                                    className="h-7 w-auto"
                                />
                            </a>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-primary text-xs font-bold hover:underline cursor-pointer">How to subscribe?</p>
                            <p className="text-gray-500 text-xs mt-1 flex items-center justify-center space-x-1">
                                <span>Support Hotline :</span>
                                <span className="font-bold text-gray-700">0707268008</span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
