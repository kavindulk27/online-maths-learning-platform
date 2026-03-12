import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, GraduationCap, Rocket, Star, Clock } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent z-0" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-accent uppercase bg-accent/10 rounded-full border border-accent/20">
                            Expert Mathematics Coaching
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                            Master Maths with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                Expert Guidance
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-lg">
                            Unlock your full potential in Mathematics. Grade 6 to 11 classes designed to make learning fun, easy, and effective.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center space-x-2 bg-accent hover:bg-yellow-500 text-dark px-8 py-4 rounded-full font-bold transition-all shadow-xl shadow-accent/20 hover:scale-105">
                                <span>Join Our Class</span>
                                <ArrowRight size={20} />
                            </button>
                            <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all backdrop-blur-sm border border-white/10">
                                <div className="p-1 bg-primary rounded-full text-white">
                                    <Play size={16} fill="currentColor" />
                                </div>
                                <span>Free Trial Lessons</span>
                            </button>
                        </div>

                        <div className="mt-12 flex items-center space-x-8 border-t border-white/10 pt-8">
                            {[
                                { label: 'Classes Start', value: 'Grade 6' },
                                { label: 'Expert Tutor', value: '10+ Years' },
                                { label: 'Success Rate', value: '99%' }
                            ].map((stat, i) => (
                                <div key={i} className="text-left">
                                    <p className="text-slate-400 text-sm">{stat.label}</p>
                                    <p className="text-white font-bold text-xl">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                            {/* Using a placeholder for teacher image */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 w-full aspect-[4/5] flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-48 h-48 bg-slate-700/50 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-primary/30">
                                        <GraduationCap size={80} className="text-primary" />
                                    </div>
                                    <p className="text-2xl font-bold text-white">Mathematics Specialist</p>
                                    <p className="text-slate-400 italic">"Transforming Numbers into Logic"</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl flex items-center space-x-3 bg-white"
                        >
                            <div className="bg-green-500 p-2 rounded-full">
                                <CheckCircle size={20} className="text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-dark text-sm">Active Enrollment</p>
                                <p className="text-xs text-slate-500">2026 Batch Started</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                            className="absolute bottom-10 -left-10 glass-card p-4 rounded-2xl flex items-center space-x-3 bg-white"
                        >
                            <div className="bg-accent p-2 rounded-full text-dark">
                                <Rocket size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-dark text-sm">Best Results</p>
                                <p className="text-xs text-slate-500">Highest A+ Record</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
