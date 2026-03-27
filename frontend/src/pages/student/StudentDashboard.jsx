import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, 
    PlayCircle, 
    CreditCard, 
    LogOut, 
    Video, 
    Trophy,
    User,
    Menu,
    X,
} from 'lucide-react';
import logo from '../../assets/logo.jpeg';

// Import separated tab components
import ClassesSection from './ClassesSection';
import HomeworkSection from './HomeworkSection';
import MarksSection from './MarksSection';
import RecordingsSection from './RecordingsSection';
import PaymentSection from './PaymentSection';
import ProfileSection from './ProfileSection';

import axiosInstance from '../../api/axios';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('classes');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Student data state
    const [student, setStudent] = useState({
        name: "",
        id: "",
        grade: "",
        school: "",
        email: "",
        studentPhone: "",
        parentPhone: "",
        district: "",
        paymentStatus: "Unpaid"
    });

    const fetchStudentProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('students/profiles/');
            const profile = response.data[0]; // Logic for individual student
            
            if (profile) {
                setStudent({
                    name: profile.user.first_name || profile.user.username,
                    id: profile.user.username, // Student ID (2026-0001) is stored as username
                    grade: profile.grade,
                    school: profile.school,
                    email: profile.user.email,
                    studentPhone: profile.user.phone || '',
                    parentPhone: profile.parent_phone || '',
                    district: profile.district || '',
                    paymentStatus: 'Unpaid' // Placeholder for now
                });
            }
        } catch (error) {
            console.error('Error fetching student profile:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchStudentProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_student');
        navigate('/login');
    };

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
            case 'classes':    return <ClassesSection student={student} />;
            case 'homework':   return <HomeworkSection student={student} />;
            case 'marks':      return <MarksSection student={student} />;
            case 'recordings': return <RecordingsSection student={student} />;
            case 'payment':    return <PaymentSection student={student} setStudent={setStudent} />;
            case 'profile':    return <ProfileSection student={student} setStudent={setStudent} />;
            default:           return <ClassesSection student={student} />;
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
                    <div className="relative mb-3">
                        <div className="absolute inset-0 bg-primary/10 blur-lg rounded-full scale-125" />
                        <img src={logo} alt="My Maths" className="h-16 w-auto object-contain relative z-10" />
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-black tracking-tight leading-none text-gray-800">
                            MYMATHS<span className="text-secondary">.LK</span>
                        </h2>
                        <p className="text-[9px] font-black text-primary/50 uppercase tracking-[0.2em] mt-1">Student Portal</p>
                    </div>
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
                        onClick={handleLogout}
                        className="flex items-center space-x-3 text-red-500 hover:text-red-600 transition-colors font-bold text-sm px-4"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
