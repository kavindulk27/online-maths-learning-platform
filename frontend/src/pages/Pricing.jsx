import { motion } from 'framer-motion';
import { ArrowRight, Users, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const classes = [
    {
        grade: '6', label: 'Grade 6', tagline: 'Foundation',
        color: 'from-blue-600 to-cyan-500', accent: '#0ea5e9',
        fee: 'Rs. 1,500', feeNote: 'per month',
        features: ['Weekly 4-Hour Sessions', 'Printed Study Modules', 'MCQ & Theory Practice'],
    },
    {
        grade: '7', label: 'Grade 7', tagline: 'Fundamentals',
        color: 'from-fuchsia-600 to-purple-500', accent: '#a855f7',
        fee: 'Rs. 1,500', feeNote: 'per month',
        features: ['Weekly 4-Hour Sessions', 'Printed Study Modules', 'MCQ & Theory Practice'],
    },
    {
        grade: '8', label: 'Grade 8', tagline: 'Core Concepts',
        color: 'from-orange-500 to-amber-400', accent: '#f59e0b',
        fee: 'Rs. 2,000', feeNote: 'per month',
        features: ['Weekly 4-Hour Sessions', 'Premium Study Modules', 'Past Paper Discussions'],
    },
    {
        grade: '9', label: 'Grade 9', tagline: 'Advanced Topics',
        color: 'from-emerald-600 to-teal-400', accent: '#10b981',
        fee: 'Rs. 2,000', feeNote: 'per month',
        features: ['Weekly 4-Hour Sessions', 'Premium Study Modules', 'Past Paper Discussions'],
    },
    {
        grade: '10', label: 'Grade 10', tagline: 'Exam Mastery',
        color: 'from-blue-700 to-indigo-500', accent: '#6366f1',
        fee: 'Rs. 2,500', feeNote: 'per month',
        features: ['Weekly 5-Hour Sessions', 'Exam-focused Modules', 'Mock Exams & Revision'],
    },
    {
        grade: '11', label: 'Grade 11', tagline: 'O/L Excellence',
        color: 'from-rose-600 to-pink-500', accent: '#f43f5e',
        fee: 'Rs. 2,500', feeNote: 'per month',
        features: ['Weekly 5-Hour Sessions', 'O/L Target Questions', 'Individual Attention'],
    },
];

const PricingCard = ({ cls, index }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.45 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col"
        >
            {/* Colored Header */}
            <div className={`relative bg-gradient-to-br ${cls.color} h-44 flex items-center justify-center overflow-hidden`}>
                <div className="text-white/15 font-black text-[110px] leading-none absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none select-none" aria-hidden="true">
                    {cls.grade}
                </div>
                <div className="relative z-10 text-center">
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.4em] mb-1">MyMaths · 2026</p>
                    <h3 className="text-white font-black text-4xl tracking-tight drop-shadow-md">{cls.label}</h3>
                    <span className="mt-2 inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {cls.tagline}
                    </span>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-black/10" />
            </div>

            {/* Logo Row */}
            <div className="flex items-center justify-center py-4 border-b border-slate-100">
                <img src={logo} alt="MyMaths" className="h-7 w-auto object-contain mr-2" />
                <span className="font-black text-slate-800 text-base">
                    My<span style={{ color: cls.accent }}>Maths</span>
                </span>
            </div>

            {/* Content */}
            <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
                <h4 className="font-black text-slate-800 text-lg">{cls.label} — Mathematics</h4>
                <div className="h-0.5 w-10 rounded-full my-3" style={{ backgroundColor: cls.accent }} />

                <ul className="space-y-2.5 mb-5">
                    {cls.features.map((f, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-slate-500 font-medium">
                            <CheckCircle size={15} style={{ color: cls.accent }} className="flex-shrink-0" />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-baseline space-x-2 mb-5">
                    <p className="text-2xl font-black" style={{ color: cls.accent }}>{cls.fee}</p>
                    <span className="text-xs text-slate-400 font-semibold">/ {cls.feeNote}</span>
                </div>

                <button
                    onClick={() => navigate('/login')}
                    className="mt-auto w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 hover:bg-secondary shadow-lg shadow-primary/20 group-hover:shadow-primary/30"
                >
                    <span>Enroll Now</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

const Pricing = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Page Hero */}
            <section className="pt-32 pb-14 bg-gradient-to-br from-[#050b1d] via-slate-900 to-[#0d1a3a] text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60%] h-[200%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-3xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-5 text-blue-200"
                    >
                        Class Fees & Enrollment
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 tracking-tighter"
                    >
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Grade</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto"
                    >
                        Select your grade, review the monthly fee, and click <strong className="text-white">Enroll Now</strong> to register.
                    </motion.p>
                </div>
            </section>

            {/* Cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {classes.map((cls, i) => <PricingCard key={cls.grade} cls={cls} index={i} />)}
                </div>

                {/* Info note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-14 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center max-w-2xl mx-auto"
                >
                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">
                        📘 After enrollment, payment confirmation is done via <strong>WhatsApp</strong>. Classes begin once the admin approves your payment.
                    </p>
                    <Link to="/login" className="inline-flex items-center space-x-2 mt-4 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-blue-700 transition-colors">
                        <span>Login / Register Now</span>
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default Pricing;
