import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/profile.jpeg';

const Hero = () => {
    return (
        <section className="relative min-h-screen bg-[#020617] flex items-center overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid */}
                <div 
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ 
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px' 
                    }} 
                />
                
                {/* Large Soft Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-primary/20 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-blue-500/10 blur-[150px] rounded-full opacity-30" />
                
                {/* Animated Light Streaks */}
                <motion.div 
                    animate={{ x: [-500, 1500] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute top-1/4 left-0 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-[35deg] pointer-events-none"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-left space-y-8 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-3 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase">
                                Sri Lanka's Premier Mathematics Tuition
                            </span>
                        </motion.div>

                        <div className="space-y-2">
                            <motion.p 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-primary font-black tracking-[0.4em] text-xs uppercase"
                            >
                                Chamara Vidunuvan
                            </motion.p>
                            <motion.h1 
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none"
                            >
                                MYMATHS<span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">.LK</span>
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl md:text-2xl font-bold text-gray-400 tracking-tight"
                            >
                                Smart ලෙස ගණිතය ඉගෙන ගන්න — Learn from the Best.
                            </motion.p>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-500 text-lg leading-relaxed font-medium"
                        >
                            Join over <span className="text-white">1,000+ students</span> who trust Chamara Vidunuvan's expert methodologies. Achieving consistent A+ results for Grade 6-11 through specialized study modules and individual attention.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                to="/login"
                                className="group bg-primary hover:bg-white text-white hover:text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-2xl shadow-primary/20 flex items-center justify-center space-x-3"
                            >
                                <span>Get Started Now</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            
                            <a
                                href="https://wa.me/94707268008"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/[0.05] hover:bg-white/[0.1] text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border border-white/10 hover:border-white/20 flex items-center justify-center space-x-3 backdrop-blur-md"
                            >
                                <MessageCircle size={20} className="text-[#25D366]" fill="currentColor" />
                                <span>WhatsApp Me</span>
                            </a>
                        </motion.div>

                        {/* Quick Trust Stats */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="pt-10 flex items-center gap-10 md:gap-16 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        >
                            <div className="flex flex-col">
                                <span className="text-white text-2xl font-black">10+</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Years Experience</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-2xl font-black">98%</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">A+ Pass Rate</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-2xl font-black">Online</span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">& Physical</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative z-10 w-full max-w-[450px] lg:max-w-[550px] ml-auto">
                            {/* Background Decorative Shape */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[4rem] rotate-6 scale-95 blur-2xl -z-10" />
                            
                            <div className="relative rounded-[3rem] lg:rounded-[5rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-[#111214]">
                                <img 
                                    src={profileImg} 
                                    alt="Chamara Vidunuvan" 
                                    className="w-full h-auto object-cover filter contrast-[1.05] saturate-[1.1]"
                                />
                                {/* Bottom Fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
