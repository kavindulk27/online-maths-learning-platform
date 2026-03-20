import { motion } from 'framer-motion';
import { ArrowRight, Users, CheckCircle } from 'lucide-react';
import logo from '../assets/logo.jpeg';
import { Link } from 'react-router-dom';

const classes = [
    {
        grade: '6', label: '6 ශ්‍රේණිය', tagline: 'අඩිතාලම',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 800', feeNote: 'මසකට',
        features: ['සතිපතා පැය 4ක පන්ති', 'මුද්‍රිත නිබන්ධන කට්ටල', 'බහුවරණ සහ සිද්ධාන්ත පුහුණුව'],
    },
    {
        grade: '7', label: '7 ශ්‍රේණිය', tagline: 'මුලධර්ම',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 800', feeNote: 'මසකට',
        features: ['සතිපතා පැය 4ක පන්ති', 'මුද්‍රිත නිබන්ධන කට්ටල', 'බහුවරණ සහ සිද්ධාන්ත පුහුණුව'],
    },
    {
        grade: '8', label: '8 ශ්‍රේණිය', tagline: 'ප්‍රධාන සංකල්ප',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 800', feeNote: 'මසකට',
        features: ['සතිපතා පැය 4ක පන්ති', 'විශේෂිත අනුමාන නිබන්ධන', 'පසුගිය ප්‍රශ්න පත්‍ර සාකච්ඡා'],
    },
    {
        grade: '9', label: '9 ශ්‍රේණිය', tagline: 'උසස් සංකල්ප',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 800', feeNote: 'මසකට',
        features: ['සතිපතා පැය 4ක පන්ති', 'විශේෂිත අනුමාන නිබන්ධන', 'පසුගිය ප්‍රශ්න පත්‍ර සාකච්ඡා'],
    },
    {
        grade: '10', label: '10 ශ්‍රේණිය', tagline: 'විභාග ජයග්‍රහණය',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 1,000', feeNote: 'මසකට',
        features: ['සතිපතා පැය 5ක පන්ති', 'විභාග ඉලක්කගත නිබන්ධන', 'පුහුණු පරීක්ෂණ සහ පුනරීක්ෂණ'],
    },
    {
        grade: '11', label: '11 ශ්‍රේණිය', tagline: 'සාමාන්්‍ය පෙළ විශිෂ්ටත්වය',
        color: 'from-[#0f4c81] to-[#0074d9]', accent: '#0f4c81',
        fee: 'Rs. 1,000', feeNote: 'මසකට',
        features: ['සතිපතා පැය 5ක පන්ති', 'සාමාන්්‍ය පෙළ ඉලක්කගත ප්‍රශ්න', 'තනි තනිව අවධානය යොමු කිරීම'],
    },
];

const ClassCard = ({ cls, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 group flex flex-col h-full"
    >
        {/* Premium Header Container */}
        <div className="relative h-48 flex items-center justify-center overflow-hidden bg-[#020617]">
            {/* Subtle Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c81]/20 via-transparent to-[#0074d9]/10 opacity-50" />
            
            {/* Fine Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

            {/* Large Professional Grade Stroke */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[160px] font-black leading-none text-white/[0.03] translate-y-4">
                    {cls.grade}
                </span>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-6">
                <div className="flex flex-col items-center">
                    <span className="text-[#0074d9] text-[9px] font-black uppercase tracking-[0.5em] mb-2 drop-shadow-sm">
                        MYMATHS.LK
                    </span>
                    <h3 className="text-white font-black text-4xl tracking-tight mb-3">
                        {cls.label}
                    </h3>
                    
                    <div className="flex items-center space-x-3">
                        <span className="bg-white/5 backdrop-blur-md text-white/80 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10">
                            {cls.tagline}
                        </span>
                        
                        {/* Refined Live Indicator */}
                        <div className="flex items-center space-x-2 bg-red-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-red-400 text-[10px] font-black uppercase tracking-widest">Live</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Right Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0f4c81]/20 blur-[60px] rounded-full -mr-16 -mt-16" />
        </div>

        {/* Logo Area */}
        <div className="flex items-center justify-center py-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
                <img src={logo} alt="MyMaths Logo" className="h-7 w-auto object-contain" />
                <span className="font-black text-base text-slate-800 tracking-tight">
                    MYMATHS<span style={{ color: cls.accent }}>.LK</span>
                </span>
            </div>
        </div>

        {/* Card Content */}
        <div className="px-6 pt-5 pb-6 flex flex-col flex-1">
            {/* Course Title */}
            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">මාසික පන්ති</p>
            <h4 className="font-black text-slate-800 text-lg mb-1">{cls.label} — ගණිතය</h4>
            <div className="h-px w-12 mb-4" style={{ backgroundColor: cls.accent }} />

            {/* Students count & Features */}
            {/*<div className="flex items-center space-x-1.5 text-slate-400 text-sm mb-4">
                <Users size={14} />
                <span className="font-semibold">සිසුන් 500+ කට වඩා සහභාගී වේ</span>
            </div>*/}

            <ul className="space-y-2 mb-5">
                {cls.features.map((f, i) => (
                    <li key={i} className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                        <CheckCircle size={14} style={{ color: cls.accent }} className="flex-shrink-0" />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>

            {/* Fee */}
            <div className="mt-auto">
                <p className="text-2xl font-black mb-1" style={{ color: cls.accent }}>{cls.fee}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-5">මසකට / සියලුම නිබන්ධන ඇතුළුව</p>
            </div>

            {/* CTA */}
            <Link
                to="/login"
                className="mt-auto w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-primary text-white font-black text-sm uppercase tracking-widest transition-all active:scale-95 hover:bg-secondary shadow-lg shadow-primary/20 group-hover:shadow-primary/30"
            >
                <span>දැන්ම ලියාපදිංචි වන්න</span>
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
                        පරිපූර්ණ අධ්‍යාපනය
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter"
                    >
                        පන්තියක් <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">තෝරාගන්න</span>
                    </motion.h2>
                    <p className="text-slate-500 max-w-xl mx-auto leading-relaxed font-medium italic">
                        "සෑම ශ්‍රේණියකටම ගැලපෙන පරිදි සැකසූ, විභාග ඉලක්කගත ඉගැන්වීම් රටාව."
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
