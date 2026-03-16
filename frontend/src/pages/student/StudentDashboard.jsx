import React, { useState, useEffect } from 'react';
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
    X,
    Image as ImageIcon,
    Upload,
    Users
} from 'lucide-react';
import logo from '../../assets/logo1.png';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('classes');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Student data state with localStorage persistence
    const [student, setStudent] = useState(() => {
        const saved = localStorage.getItem('current_student');
        if (saved) return JSON.parse(saved);
        return {
            name: "",
            id: "",
            grade: "",
            school: "",
            email: "",
            studentPhone: "",
            parentPhone: "",
            district: "",
            paymentStatus: "Unpaid"
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
                return <HomeworkSection student={student} />;
            case 'marks':
                return <MarksSection student={student} />;
            case 'recordings':
                return <RecordingsSection student={student} />;
            case 'payment':
                return <PaymentSection student={student} setStudent={setStudent} />;
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
    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('class_schedules');
        if (saved) {
            const allSchedules = JSON.parse(saved);
            return allSchedules.filter(c => c.grade === student.grade);
        }
        return [];
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

const HomeworkSection = ({ student }) => {
    const [homework, setHomework] = useState(() => {
        const saved = localStorage.getItem('all_homework_marks');
        if (saved) {
            const allMarks = JSON.parse(saved);
            return allMarks.filter(m => m.studentId === student.id);
        }
        return [];
    });

    React.useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem('all_homework_marks');
            if (saved) {
                const allMarks = JSON.parse(saved);
                setHomework(allMarks.filter(m => m.studentId === student.id));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [student.id]);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                        <tr>
                            <th className="px-8 py-5">Week / සතිය</th>
                            <th className="px-8 py-5 text-center">Grade / ලකුණ</th>
                            <th className="px-8 py-5 text-right">Date / දිනය</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {homework.length > 0 ? homework.sort((a,b) => b.timestamp - a.timestamp).map((hw, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6 text-sm font-black text-gray-800 uppercase">{hw.week}</td>
                                <td className="px-8 py-6 text-center">
                                    <span className={`inline-block w-10 h-10 leading-10 rounded-xl font-black text-sm shadow-sm ${
                                        hw.mark === 'A' ? 'bg-green-100 text-green-600' : 
                                        hw.mark === 'B' ? 'bg-blue-100 text-blue-600' : 
                                        hw.mark === 'C' ? 'bg-yellow-100 text-yellow-600' : 
                                        'bg-gray-100 text-gray-500'
                                    }`}>
                                        {hw.mark}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <span className="text-[11px] font-bold text-gray-400">{hw.date}</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <FileSpreadsheet className="text-gray-100 mb-4" size={48} />
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No homework marks found for your account.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MarksSection = ({ student }) => {
    const [performance, setPerformance] = useState([]);
    
    useEffect(() => {
        const calculateStats = () => {
            const allMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');
            
            // Normalize current student grade
            const normalizedStudentGrade = student.grade?.startsWith('Grade ') ? student.grade : `Grade ${student.grade?.trim()}`;
            
            // Group all marks by month for ranking within the same grade
            const monthlyStats = {};
            allMarks.forEach(m => {
                const normalizedMarkGrade = m.grade?.startsWith('Grade ') ? m.grade : `Grade ${m.grade?.trim()}`;
                
                if (normalizedMarkGrade === normalizedStudentGrade) {
                    if (!monthlyStats[m.month]) monthlyStats[m.month] = [];
                    monthlyStats[m.month].push(m);
                }
            });

            // Calculate student-specific stats for each month
            const result = Object.keys(monthlyStats).map(month => {
                const monthMarks = monthlyStats[month].sort((a, b) => b.marks - a.marks);
                const studentEntry = monthMarks.find(m => m.studentId === student.id);
                
                if (!studentEntry) return null;

                const rank = monthMarks.findIndex(m => m.studentId === student.id) + 1;
                const totalInClass = monthMarks.length;
                const average = monthMarks.reduce((acc, curr) => acc + curr.marks, 0) / totalInClass;
                const topMark = monthMarks[0].marks;

                return {
                    month,
                    myMark: studentEntry.marks,
                    rank,
                    totalInClass,
                    average: Math.round(average),
                    topMark,
                    status: rank <= 3 ? 'Top Performer' : rank <= 10 ? 'Excellent' : studentEntry.marks >= 75 ? 'Very Good' : 'Improving'
                };
            }).filter(r => r !== null);

            setPerformance(result.sort((a, b) => {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return months.indexOf(b.month) - months.indexOf(a.month);
            }));
        };

        calculateStats();
        window.addEventListener('storage', calculateStats);
        return () => window.removeEventListener('storage', calculateStats);
    }, [student.id, student.grade]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {performance.length > 0 ? (
                <>
                    {/* Hero Stats Card */}
                    <div className="bg-gradient-to-br from-primary to-secondary rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="space-y-2">
                                <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em]">Current Standing</p>
                                <h3 className="text-5xl font-black">Rank #{performance[0].rank}</h3>
                                <p className="text-white/80 font-bold">in {student.grade} - {performance[0].month}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Trophy size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Efficiency</p>
                                        <p className="text-lg font-black">{performance[0].myMark}% Score</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:justify-end">
                                <div className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 ${
                                    performance[0].rank <= 3 ? 'bg-yellow-400 text-gray-900 border-yellow-300' : 'bg-white/10 text-white border-white/20'
                                } shadow-xl`}>
                                    {performance[0].status}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {performance.map((m, i) => (
                            <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Trophy size={24} />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.month} Exam</span>
                                </div>
                                
                                <div className="space-y-1 mb-8">
                                    <h4 className="text-4xl font-black text-gray-800">{m.myMark}<span className="text-lg text-gray-300 ml-1">%</span></h4>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                                        m.myMark >= m.average ? 'text-green-500' : 'text-red-400'
                                    }`}>
                                        {m.myMark >= m.average ? 'Above' : 'Below'} Class Average ({m.average}%)
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-gray-500 font-bold text-sm">
                                        <Users size={16} className="text-gray-300" />
                                        <span>Rank: <span className="font-black text-gray-800">#{m.rank}</span></span>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                        of {m.totalInClass} Students
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                    <Trophy className="text-gray-100 mx-auto mb-6" size={64} />
                    <h4 className="text-xl font-black text-gray-900 mb-2">No Exam Marks Recorded</h4>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto">Your monthly exam results will appear here once they are released by the teacher.</p>
                </div>
            )}
        </div>
    );
};

const RecordingsSection = ({ student }) => {
    const [recordings, setRecordings] = useState(() => {
        const saved = localStorage.getItem('class_recordings');
        if (saved) {
            const allRecs = JSON.parse(saved);
            return allRecs.filter(r => r.grade === student.grade);
        }
        return [];
    });

    React.useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem('class_recordings');
            if (saved) {
                const allRecs = JSON.parse(saved);
                setRecordings(allRecs.filter(r => r.grade === student.grade));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [student.grade]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recordings.length > 0 ? recordings.map(rec => (
                <div key={rec.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                         <img src={rec.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Thumbnail" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="text-white/80 group-hover:text-white group-hover:scale-125 transition-all" size={48} />
                         </div>
                         <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary shadow-lg border border-primary/10 w-fit">
                                Lesson {rec.lessonNo?.padStart(2, '0') || '00'}
                            </span>
                            <span className="bg-secondary/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-lg w-fit">
                                {rec.type}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="font-black text-gray-800 mb-2 line-clamp-1">{rec.title}</h4>
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{rec.date}</span>
                            </span>
                            <a 
                                href={rec.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary hover:underline flex items-center space-x-1"
                            >
                                <span>Watch</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                    <PlayCircle className="text-gray-200 mx-auto mb-4" size={48} />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No recordings available for {student.grade} yet.</p>
                </div>
            )}
        </div>
    );
};

const PaymentSection = ({ student, setStudent }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                
                // Update local state
                const updatedStudent = { 
                    ...student, 
                    paymentStatus: 'Pending',
                    receiptImage: base64String 
                };
                setStudent(updatedStudent);
                
                // Save to current_student
                localStorage.setItem('current_student', JSON.stringify(updatedStudent));
                
                // Update in all_students list
                const allStudents = JSON.parse(localStorage.getItem('all_students') || '[]');
                const updatedAllStudents = allStudents.map(s => 
                    s.id === student.id ? { ...s, status: 'Pending', receiptImage: base64String } : s
                );
                localStorage.setItem('all_students', JSON.stringify(updatedAllStudents));
                
                // Trigger storage event for cross-tab sync
                window.dispatchEvent(new Event('storage'));
                
                alert('රිසිට්පත සාර්ථකව යොමු කළා! කරුණාකර Admin අනුමැතිය ලැබෙන තෙක් රැඳී සිටින්න. (Receipt uploaded successfully! Please wait for Admin approval.)');
            };
            reader.readAsDataURL(file);
        }
    };

    const status = student.paymentStatus;

    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">March 2026 Payment</h3>
                    <p className="text-gray-500 text-sm">Monthly tuition fee for {student.grade}</p>
                </div>
                <div className={`px-6 py-3 rounded-2xl flex items-center space-x-3 border ${
                    status === 'Approved' ? 'bg-green-50 border-green-100 text-green-600' : 
                    status === 'Pending' ? 'bg-yellow-50 border-yellow-100 text-yellow-600' :
                    'bg-red-50 border-red-100 text-red-600'
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

                <div className="space-y-4">
                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center bg-gray-50/50">
                        {student.receiptImage ? (
                            <div className="space-y-4">
                                <div className="relative inline-block">
                                    <img 
                                        src={student.receiptImage} 
                                        alt="Receipt" 
                                        className="max-h-40 rounded-xl shadow-md border border-white mx-auto"
                                    />
                                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                                        <CheckCircle2 size={16} />
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-gray-800">රිසිට්පත ලැබී ඇත (Receipt Received)</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Admin will review shortly</p>
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                    <ImageIcon className="text-gray-300" size={32} />
                                </div>
                                <p className="text-sm font-bold text-gray-500 mb-6 leading-relaxed">
                                    ගෙවීම් සිදුකළ පසු, බැංකු රිසිට්පතේ පැහැදිලි ඡායාරූපයක් මෙතැනින් උඩුගත කරන්න.
                                    <br />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 block">(Upload your bank receipt here)</span>
                                </p>
                                <label className="cursor-pointer bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center space-x-3 transition-all active:scale-95 mx-auto w-fit">
                                    <Upload size={18} />
                                    <span>Upload Receipt</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                </label>
                            </>
                        )}
                    </div>

                    <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 flex items-center justify-between">
                        <p className="text-[11px] font-bold text-green-700 leading-tight">
                            ඔබට රිසිට්පත WhatsApp කිරීමට අවශ්‍ය නම්:
                        </p>
                        <a 
                            href="https://wa.me/94707268008" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 font-black text-[11px] uppercase tracking-widest hover:underline"
                        >
                            WhatsApp Help
                        </a>
                    </div>
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
