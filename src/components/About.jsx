import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Heart } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-slate-900 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 w-full aspect-[4/5] flex items-center justify-center">
                                <BookOpen size={100} className="text-primary/10" />
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[2rem] z-20 hidden lg:block border-blue-500/20 bg-white">
                            <p className="text-5xl font-extrabold text-primary mb-1">10+</p>
                            <p className="text-slate-600 font-bold uppercase tracking-widest text-[10px]">Years Experience</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
