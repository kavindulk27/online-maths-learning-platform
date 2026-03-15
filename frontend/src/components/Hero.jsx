import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, GraduationCap, Rocket, Star, Clock, BookOpen, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-illustration.png';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#050b1d]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-full">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-secondary/10 blur-[100px] rounded-full" />
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full blur-[1px]" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary/30 rounded-full blur-[2px]" />
                <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-accent/20 rounded-full blur-[1px]" />
            </div>

            {/* Floating Math Symbols or Dots */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                 <div className="grid grid-cols-6 h-full w-full">
                     {[...Array(24)].map((_, i) => (
                         <motion.div
                            key={i}
                            animate={{ 
                                y: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 2
                            }}
                            className="flex items-center justify-center p-8"
                         >
                            <span className="text-white/30 font-serif text-2xl select-none">
                                {['+', '−', '×', '÷', 'π', '√', 'Σ', '∞'][i % 8]}
                            </span>
                         </motion.div>
                     ))}
                 </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 mb-8 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
                        >
                            <Sparkles size={16} className="text-accent ring-accent/30 animate-pulse" />
                            <span className="text-xs font-black tracking-[0.2em] text-white uppercase">
                                Grade 6 - 11 Mathematics classes
                            </span>
                        </motion.div>
                        
                        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.6] md:leading-[1.2] mb-6 md:mb-8 tracking-normal md:tracking-tighter">
                            Smart ලෙස <span className="text-accent underline decoration-primary/50 md:decoration-6 decoration-4 underline-offset-8">ගණිතය</span> <br className="sm:hidden" /> ඉගෙන ගන්න — <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-secondary drop-shadow-sm whitespace-nowrap">My Maths</span>
                        </h1>
                        
                        <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
                            Join over <span className="text-white font-bold">500+ students</span> who are transforming their mathematical skills with our proven teaching methods.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                to="/pricing"
                                className="group relative flex items-center justify-center space-x-3 bg-primary hover:bg-secondary text-white px-10 py-5 rounded-2xl font-black transition-all shadow-[0_20px_40px_-15px_rgba(15,76,129,0.4)] active:scale-[0.98] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="relative z-10">Join Class Now</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a 
                                href="https://youtube.com/@chamaravidunuvan?si=00GSZnzX6sSsMnSR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-black transition-all backdrop-blur-xl border border-white/20 hover:border-white/40 shadow-xl group"
                            >
                                <div className="p-1.5 bg-accent rounded-full text-dark group-hover:scale-110 transition-transform shadow-lg shadow-accent/20">
                                    <Play size={14} fill="currentColor" />
                                </div>
                                <span>Watch Preview</span>
                            </a>
                        </div>

                        <div className="mt-8 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 py-6 md:py-8 border-t border-white/5">
                            {[
                                { label: 'Active Students', value: '1K+', icon: <Users size={16} className="text-primary" /> },
                                { label: 'Average Grade', value: 'A+', icon: <Star size={16} className="text-accent" /> },
                                { label: 'Lessons Done', value: '500+', icon: <BookOpen size={16} className="text-secondary" /> }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col space-y-1">
                                    <div className="flex items-center space-x-2">
                                        {stat.icon}
                                        <span className="text-white font-black text-2xl">{stat.value}</span>
                                    </div>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="relative mt-8 lg:mt-0 px-8 lg:px-0"
                    >
                        <div className="relative z-10">
                            <motion.div
                                animate={{ 
                                    y: [0, -15, 0],
                                }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 6,
                                    ease: "easeInOut"
                                }}
                                className="relative z-20"
                            >
                                <img 
                                    src={heroImg} 
                                    alt="Professional Math Teacher" 
                                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(37,99,235,0.25)] filter contrast-[1.05]"
                                />
                            </motion.div>
                            
                            {/* Decorative Orbit Circles */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full z-0 pointer-events-none" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full z-0 pointer-events-none dashed" />
                        </div>

                        {/* Interactive floating elements */}
                        <motion.div
                            animate={{ 
                                rotate: [0, 360],
                            }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none"
                        >
                             <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary rounded-full blur-sm" />
                             <div className="absolute bottom-0 right-1/4 w-3 h-3 bg-accent rounded-full blur-sm" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-4 -right-4 glass-card p-3 md:p-5 rounded-2xl md:rounded-3xl hidden sm:flex items-center space-x-3 md:space-x-4 bg-white/10 border-white/20 backdrop-blur-2xl shadow-2xl z-30"
                        >
                            <div className="bg-green-500/20 p-2.5 rounded-xl border border-green-500/30">
                                <CheckCircle size={24} className="text-green-400" />
                            </div>
                            <div>
                                <p className="font-black text-white text-sm">New Batch</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Enrolling Now for 2026</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                            className="absolute bottom-12 -left-8 glass-card p-3 md:p-5 rounded-2xl md:rounded-3xl hidden sm:flex items-center space-x-3 md:space-x-4 bg-white/10 border-white/20 backdrop-blur-2xl shadow-2xl z-30"
                        >
                            <div className="bg-accent/20 p-2.5 rounded-xl border border-accent/30 text-accent">
                                <Star size={24} fill="currentColor" />
                            </div>
                            <div>
                                <p className="font-black text-white text-sm">Best Results</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">98% A+ Achievement</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
