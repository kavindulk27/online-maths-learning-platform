import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Star, Clock, CheckCircle } from 'lucide-react';

const Classes = () => {
    const classes = [
        { grade: 'Grade 6', color: 'from-blue-500 to-cyan-500' },
        { grade: 'Grade 7', color: 'from-purple-500 to-indigo-500' },
        { grade: 'Grade 8', color: 'from-amber-500 to-orange-500' },
        { grade: 'Grade 9', color: 'from-emerald-500 to-green-500' },
        { grade: 'Grade 10', color: 'from-blue-600 to-sky-400' },
        { grade: 'Grade 11', color: 'from-primary to-secondary' },
    ];

    return (
        <section id="classes" className="py-24 bg-bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-dark mb-4"
                    >
                        Find Your <span className="text-primary">Perfect Class</span>
                    </motion.h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        We provide specialized mathematics education tailored for each grade level, ensuring concepts are mastered before moving to the next level.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {classes.map((cls, index) => (
                        <motion.div
                            key={cls.grade}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-3xl p-1 transition-all hover:scale-[1.02] hover:shadow-2xl shadow-sm overflow-hidden border border-slate-100"
                        >
                            <div className={`bg-gradient-to-br ${cls.color} h-32 rounded-2xl flex items-center justify-center mb-6`}>
                                <GraduationCap className="text-white/40 absolute scale-[3]" size={48} />
                                <h3 className="text-white text-3xl font-bold relative z-10">{cls.grade}</h3>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="flex text-accent">
                                        {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">(250+ Students)</span>
                                </div>

                                <h4 className="text-xl font-bold text-dark mb-2">Mathematics Mastery</h4>
                                <p className="text-slate-500 mb-6 line-clamp-2">Comprehensive syllabus coverage with weekly exams and paper discussions.</p>

                                <div className="space-y-3 mb-8">
                                    {[
                                        { icon: <Clock size={16} />, text: 'Weekly 4-Hour Session' },
                                        { icon: <CheckCircle size={16} />, text: 'Detailed Printed Modules' },
                                        { icon: <CheckCircle size={16} />, text: 'MCQ & Theory Discussions' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                                            <span className="text-primary">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all group-hover:bg-primary group-hover:text-white bg-slate-50 text-dark shadow-sm`}>
                                    <span>View Class Schedule</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Classes;
