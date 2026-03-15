import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    BookOpen, 
    FileText, 
    PlayCircle, 
    CreditCard, 
    LogOut, 
    Video, 
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    Trophy,
    User,
    Lock,
    Mail,
    MapPin,
    School,
    GraduationCap,
    Phone,
    Menu,
    X
} from 'lucide-react';
import logo from '../assets/logo1.png';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('classes');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Student data state with localStorage persistence
    const [student, setStudent] = useState(() => {
        const saved = localStorage.getItem('current_student');
        if (saved) return JSON.parse(saved);
        
        return {
            name: "Kavindu Lakshitha",
            id: "STU-2026-001",
            grade: "Grade 11",
            school: "Royal College",
            email: "kavindu@example.com",
            studentPhone: "0771234567",
            parentPhone: "0712345678",
            district: "Colombo",
            paymentStatus: "Approved" // Approved, Pending, Unpaid
        };
    });

    // Sync from localStorage if updated by another tab (e.g. Admin)
    React.useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem('current_student');
            if (saved) setStudent(JSON.parse(saved));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const tabs = [
        { id: 'classes', label: 'My Classes', icon: Video },
        { id: 'homework', label: 'Homework', icon: BookOpen },
        { id: 'marks', label: 'Marks', icon: Trophy },
        { id: 'recordings', label: 'Recordings', icon: PlayCircle },
        { id: 'payment', label: 'Payment Status', icon: CreditCard },
        { id: 'profile', label: 'Edit Profile', icon: User },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'classes':
                return <ClassesSection student={student} />;
            case 'homework':
                return <HomeworkSection />;
            case 'marks':
                return <MarksSection />;
            case 'recordings':
                return <RecordingsSection />;
            case 'payment':
                return <PaymentSection status={student.paymentStatus} />;
            case 'profile':
                return <ProfileSection student={student} setStudent={setStudent} />;
            default:
                return <ClassesSection />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
            {/* Sidebar Overlay (Mobile) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 flex flex-col z-50 shadow-2xl transition-transform duration-300 md:relative md:translate-x-0 md:shadow-sm ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 flex flex-col items-center border-b border-gray-50">
                    <img src={logo} alt="My Maths" className="h-20 w-auto mb-4" />
                    <h2 className="text-sm font-black text-primary tracking-tighter">STUDENT PORTAL</h2>
                </div>

                <div className="flex-1 p-4 flex flex-col space-y-2 overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setIsMenuOpen(false);
                            }}
                            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                                activeTab === tab.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                            }`}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="p-6 border-t border-gray-50">
                    <button 
                        onClick={() => navigate('/login')}
                        className="flex items-center space-x-3 text-red-500 hover:text-red-600 transition-colors font-bold text-sm px-4"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-12 sticky top-0 z-30">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Toggle */}
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="p-2 bg-gray-50 text-gray-800 rounded-xl md:hidden hover:bg-gray-100 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        
                        <div className="flex flex-col">
                            <p className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest leading-none">{activeTab.replace('-', ' ')}</p>
                            <h1 className="text-lg md:text-xl font-black text-gray-800 tracking-tight capitalize">{activeTab} Page</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4 bg-gray-50 px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border border-gray-100">
                        <div className="flex flex-col text-right hidden sm:flex">
                            <p className="text-[10px] md:text-xs font-black text-gray-800 leading-none">{student.name}</p>
                            <p className="text-[9px] md:text-[10px] font-bold text-primary tracking-tighter">{student.id}</p>
                        </div>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm md:text-base">
                            {student.name ? student.name[0] : 'S'}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const ClassesSection = ({ student }) => {
    const defaultClasses = [
        { id: 1, grade: 'Grade 11', type: 'Theory', name: "Grade 11 - Theory", time: "Every Saturday 8:00 AM", zoom: "https://zoom.us/j/12345678", status: 'Offline' },
        { id: 2, grade: 'Grade 11', type: 'Revision', name: "Grade 11 - Revision", time: "Every Sunday 8:00 AM", zoom: "https://zoom.us/j/12345678", status: 'Offline' },
    ];

    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('class_schedules');
        if (saved) {
            const allSchedules = JSON.parse(saved);
            // Filter by student's grade
            return allSchedules.filter(c => c.grade === student.grade);
        }
        return defaultClasses.filter(c => c.grade === student.grade);
    });

    // Sync from localStorage if updated by Admin
    React.useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem('class_schedules');
            if (saved) {
                const allSchedules = JSON.parse(saved);
                setClasses(allSchedules.filter(c => c.grade === student.grade));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [student.grade]);

    const isApproved = student.paymentStatus === "Approved";

    return (
        <div className="space-y-6">
            {!isApproved && (
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-3xl p-8 flex flex-col items-center text-center">
                    <AlertCircle className="text-yellow-500 mb-4" size={48} />
                    <h3 className="text-xl font-black text-gray-800 mb-2">Monthly Fee Required</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                        Zoom links for **March classes** are currently locked. Please settle your monthly fee and send the receipt to the teacher for instant approval.
                    </p>
                    <button className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-yellow-200">
                        Check Payment Status
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classes.length > 0 ? (
                    classes.map(cls => (
                        <div key={cls.id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200 flex flex-col transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isApproved ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                    {isApproved ? <Video className="text-primary" size={28} /> : <Lock className="text-gray-400" size={28} />}
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                                    cls.status === 'Live' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {cls.status === 'Live' ? '🔴 Live now' : '⚪ Offline'}
                                </span>
                            </div>
                            <h3 className={`text-xl font-black mb-2 ${isApproved ? 'text-gray-800' : 'text-gray-400'}`}>{cls.grade} - {cls.type || 'Theory'}</h3>
                            <p className={`text-sm font-bold mb-1 ${isApproved ? 'text-primary' : 'text-gray-300'}`}>{cls.lesson}</p>
                            <p className="text-gray-400 text-sm flex items-center space-x-2 mb-8">
                                <Clock size={16} />
                                <span>{cls.time}</span>
                            </p>
                            
                            {isApproved ? (
                                <a 
                                    href={cls.zoom}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-3 pointer-events-auto ${
                                        cls.status === 'Live'
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary active:scale-[0.98]' 
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                                    }`}
                                    onClick={(e) => cls.status !== 'Live' && e.preventDefault()}
                                >
                                    <span>{cls.status === 'Live' ? 'Join Zoom Class' : 'Class Offline'}</span>
                                    <ExternalLink size={18} />
                                </a>
                            ) : (
                                <div className="w-full py-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center space-x-3 text-gray-400 font-black text-sm uppercase tracking-widest">
                                    <Lock size={18} />
                                    <span>Access Locked</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                        <Video className="text-gray-200 mx-auto mb-4" size={48} />
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No classes scheduled for your grade yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const HomeworkSection = () => {
    const homework = [
        { week: "Week 01", lesson: "Graphs & Functions", mark: "A", status: "Completed" },
        { week: "Week 02", lesson: "Trigonometry Basics", mark: "B", status: "Completed" },
        { week: "Week 03", lesson: "Vectors", mark: "-", status: "Pending" },
    ];

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Week</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Lesson</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Mark</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {homework.map((hw, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6 text-sm font-black text-gray-800">{hw.week}</td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-gray-700">{hw.lesson}</p>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`inline-block w-8 h-8 leading-8 rounded-lg font-black text-sm ${
                                        hw.mark === 'A' ? 'bg-green-100 text-green-600' : 
                                        hw.mark === 'B' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {hw.mark}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                        hw.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                                    }`}>
                                        {hw.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MarksSection = () => {
    const monthlyMarks = [
        { month: "January", mark: 85, rank: "Top 10" },
        { month: "February", mark: 92, rank: "Top 5" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyMarks.map((m, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">{m.month}</p>
                    <h3 className="text-4xl font-black text-gray-800 mb-6">{m.mark}%</h3>
                    <div className="flex items-center space-x-2 text-green-600">
                        <Trophy size={16} />
                        <span className="text-sm font-bold">{m.rank} in Class</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

const RecordingsSection = () => {
    const recordings = [
        { id: 1, title: "Lesson 01 - Basics of Graphs", date: "2024-03-01", duration: "1h 20m" },
        { id: 2, title: "Lesson 02 - Linear Equations", date: "2024-03-08", duration: "1h 45m" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recordings.map(rec => (
                <div key={rec.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                        <PlayCircle className="text-white/50 group-hover:text-white group-hover:scale-125 transition-all" size={48} />
                        <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase">
                            {rec.duration}
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="font-black text-gray-800 mb-2 line-clamp-1">{rec.title}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{rec.date}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PaymentSection = ({ status }) => {
    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">March 2026 Payment</h3>
                    <p className="text-gray-500 text-sm">Monthly tuition fee for Grade 11</p>
                </div>
                <div className={`px-6 py-3 rounded-2xl flex items-center space-x-3 border ${
                    status === 'Approved' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-yellow-50 border-yellow-100 text-yellow-600'
                }`}>
                    {status === 'Approved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                    <span className="font-black text-sm uppercase tracking-widest">{status}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex justify-between mb-4">
                        <span className="text-sm font-bold text-gray-500">Monthly Fee</span>
                        <span className="text-sm font-black text-gray-800">Rs. 2,000.00</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm font-bold text-gray-800">Total Due</span>
                        <span className="text-lg font-black text-primary">Rs. 2,000.00</span>
                    </div>
                </div>

                <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center">
                    <p className="text-sm font-bold text-gray-500 mb-6 leading-relaxed">
                        If you have already paid, please send a clear photo of your bank receipt to the teacher via WhatsApp for approval.
                    </p>
                    <a 
                        href="https://wa.me/94707268008" 
                        target="_blank" 
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-200 flex items-center justify-center space-x-3 transition-all active:scale-95"
                    >
                        <span>Send Receipt on WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

const ProfileSection = ({ student, setStudent }) => {
    const [editData, setEditData] = useState({ ...student });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        // Validation
        if (!editData.name || !editData.grade || !editData.school) {
            alert('කරුණාකර අනිවාර්ය තොරතුරු ඇතුළත් කරන්න (Please fill required fields)');
            return;
        }

        if (passwordData.new) {
            if (passwordData.new.length < 8) {
                alert('නව මුරපදය සඳහා අවම වශයෙන් අකුරු/ඉලක්කම් 8ක් ඇතුළත් කරන්න');
                return;
            }
            if (passwordData.new !== passwordData.confirm) {
                alert('මුරපදයන් එකිනෙකට නොගැලපේ (Passwords do not match)');
                return;
            }
        }

        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setStudent(editData);
            setIsSaving(false);
            if (passwordData.new) {
                setPasswordData({ current: '', new: '', confirm: '' });
                alert('Profile and Password updated successfully! / තොරතුරු සහ මුරපදය සාර්ථකව යාවත්කාලීන කළා!');
            } else {
                alert('Profile updated successfully! / පැතිකඩ යාවත්කාලීන කිරීම සාර්ථකයි!');
            }
        }, 1000);
    };

    return (
        <div className="max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-2xl font-black text-gray-800 mb-2">පැතිකඩ යාවත්කාලීන කිරීම</h3>
                <p className="text-gray-500 text-sm">Edit your personal information and preferences.</p>
            </div>

            <div className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <User size={12} />
                            <span>Name / නම</span>
                        </label>
                        <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <Mail size={12} />
                            <span>Email / විද්‍යුත් තැපෑල</span>
                        </label>
                        <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Grade */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <GraduationCap size={12} />
                            <span>Grade / ශ්‍රේණිය</span>
                        </label>
                        <input
                            type="text"
                            value={editData.grade}
                            onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* School */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <School size={12} />
                            <span>School / පාසල</span>
                        </label>
                        <input
                            type="text"
                            value={editData.school}
                            onChange={(e) => setEditData({ ...editData, school: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Phone Numbers */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <Phone size={12} />
                            <span>Student Phone / ඔබේ අංකය</span>
                        </label>
                        <input
                            type="tel"
                            value={editData.studentPhone}
                            onChange={(e) => setEditData({ ...editData, studentPhone: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <Phone size={12} />
                            <span>Parent Phone / මවුපියන්ගේ අංකය</span>
                        </label>
                        <input
                            type="tel"
                            value={editData.parentPhone}
                            onChange={(e) => setEditData({ ...editData, parentPhone: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* District */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <MapPin size={12} />
                            <span>District / දිස්ත්‍රික්කය</span>
                        </label>
                        <select
                            value={editData.district}
                            onChange={(e) => setEditData({ ...editData, district: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        >
                            {[
                                'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 
                                'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 
                                'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 
                                'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 
                                'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
                            ].map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Change Password Section */}
                <div className="pt-12 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Lock className="text-yellow-600" size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-gray-800 leading-tight">Change Password / මුරපදය වෙනස් කිරීම</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Security Settings</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>Current Password / පැරණි මුරපදය</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.current}
                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>New Password / නව මුරපදය</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.new}
                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                placeholder="Min 8 chars"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>Confirm Password / නැවත ඇතුළත් කරන්න</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirm}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row gap-4">
                    <button
                        disabled={isSaving}
                        onClick={handleSave}
                        className="flex-1 bg-primary hover:bg-secondary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <CheckCircle2 size={18} />
                                <span>Save Changes / තොරතුරු තහවුරු කරන්න</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setEditData({ ...student })}
                        className="px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
