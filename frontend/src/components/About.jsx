import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Heart } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';

const About = () => {
    return (
        <section id="about" className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white/10 shadow-[0_0_50px_-12px_rgba(37,99,235,0.3)] group">
                            <img 
                                src={profileImg} 
                                alt="Teacher Profile" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ imageRendering: 'auto' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <div className="absolute -bottom-8 -right-8 md:-bottom-10 md:-right-10 glass-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] z-20 hidden lg:block border-blue-500/20 bg-white">
                            <p className="text-5xl font-extrabold text-primary mb-1">10+</p>
                            <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Years Experience</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                            About the <span className="text-primary">Teacher</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            Dedicated to simplifying complex mathematical concepts for students. With over a decade of teaching experience, I have developed unique methodologies that help students not only score 'A's but also develop a genuine love for Mathematics.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {[
                                { icon: <Award className="text-primary" />, title: 'Expert Pedagogy', desc: 'Proven teaching methods' },
                                { icon: <Users className="text-primary" />, title: '500+ Students', desc: 'Active yearly enrollment' },
                                { icon: <BookOpen className="text-primary" />, title: 'Custom Materials', desc: 'Targeted study modules' },
                                { icon: <Heart className="text-primary" />, title: 'Student Success', desc: 'Consistent top ranks' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col space-y-2 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                                    {item.icon}
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <p className="text-xs text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary italic text-slate-300">
                            "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding. My goal is to bridge that gap for every student."
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
