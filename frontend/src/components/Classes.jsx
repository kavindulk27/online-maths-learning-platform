import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';

const classes = [
    { grade: '6', label: 'Grade 6', tagline: 'Foundation', color: 'from-blue-600 to-cyan-500', accent: '#0ea5e9', fee: 'Rs. 1,500' },
    { grade: '7', label: 'Grade 7', tagline: 'Fundamentals', color: 'from-fuchsia-600 to-purple-500', accent: '#a855f7', fee: 'Rs. 1,500' },
    { grade: '8', label: 'Grade 8', tagline: 'Core Concepts', color: 'from-orange-500 to-amber-400', accent: '#f59e0b', fee: 'Rs. 2,000' },
    { grade: '9', label: 'Grade 9', tagline: 'Advanced Topics', color: 'from-emerald-600 to-teal-400', accent: '#10b981', fee: 'Rs. 2,000' },
    { grade: '10', label: 'Grade 10', tagline: 'Exam Mastery', color: 'from-blue-700 to-indigo-500', accent: '#6366f1', fee: 'Rs. 2,500' },
    { grade: '11', label: 'Grade 11', tagline: 'O/L Excellence', color: 'from-rose-600 to-pink-500', accent: '#f43f5e', fee: 'Rs. 2,500' },
];

const ClassCard = ({ cls, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
    >
        {/* Colored Header Banner */}
        <div className={`relative bg-gradient-to-br ${cls.color} h-44 flex items-center justify-center overflow-hidden`}>
            {/* Graphic Design Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40 L20 0 L40 40 Z" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
                </svg>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />

            {/* Large Grade Number */}
            <div className="relative z-10 text-center select-none">
                <div className="text-white/20 font-black text-[100px] leading-none absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none drop-shadow-2xl" aria-hidden="true">
                    {cls.grade}
                </div>
                <div className="relative z-20">
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] mb-1">MyMaths</p>
                    <h3 className="text-white font-black text-4xl tracking-tight drop-shadow-md">{cls.label}</h3>
                    <span className="mt-2 inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {cls.tagline}
                    </span>
                </div>
            </div>

            {/* Decorative overlapping circles */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-xl animate-pulse" />
            <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-black/5 blur-lg" />
        </div>

        {/* Logo Area */}
        <div className="flex items-center justify-center py-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="MyMaths Logo" className="h-7 w-auto object-contain" />
                <span className="font-black text-base text-slate-800">
                    My<span style={{ color: cls.accent }}>Maths</span>
                </span>
            </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
            {/* Course Title */}
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Monthly Classes</p>
            <h4 className="font-black text-slate-800 text-lg mb-1">{cls.label} — Mathematics</h4>
            <div className="h-px w-12 mb-4" style={{ backgroundColor: cls.accent }} />

            {/* Students count */}
            <div className="flex items-center space-x-1.5 text-slate-400 text-sm mb-4">
                <Users size={14} />
                <span className="font-semibold">300+ Active Students</span>
            </div>

            {/* Fee */}
            <p className="text-2xl font-black mb-5" style={{ color: cls.accent }}>{cls.fee} <span className="text-sm text-slate-400 font-bold">/ month</span></p>

            {/* CTA */}
            <Link
                to="/login"
                className="mt-auto w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 hover:bg-secondary shadow-lg shadow-primary/20 group-hover:shadow-primary/30"
            >
                <span>Enroll Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

const Classes = () => {
    return (
        <section id="classes" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle background dots */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#0074D9 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4 border border-primary/20"
                    >
                        Academic Excellence
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter"
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Class</span>
                    </motion.h2>
                    <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
                        Expertly designed curriculum for each grade, focusing on concept clarity and exam performance.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {classes.map((cls, i) => <ClassCard key={cls.grade} cls={cls} index={i} />)}
                </div>
            </div>
        </section>
    );
};

export default Classes;
