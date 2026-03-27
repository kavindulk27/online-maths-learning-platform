import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    CreditCard, 
    GraduationCap, 
    FileSpreadsheet, 
    Video, 
    PlayCircle, 
    Users,
    Search,
    LogOut,
    Menu,
    X,
    BarChart3,
    Calendar,
    Youtube,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';

// Import separated tab components
import Dashboard from './Dashboard';
import StudentManagement from './StudentManagement';
import PaymentApprovals from './PaymentApprovals';
import ClassManagement from './ClassManagement';
import ExamMarks from './ExamMarks';
import HomeworkMarks from './HomeworkMarks';
import ClassRecordings from './ClassRecordings';
import HomepageHighlights from './HomepageHighlights';
import SystemReports from './SystemReports';
import ErrorBoundary from '../../components/ErrorBoundary';

import axiosInstance from '../../api/axios';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [studentsRes, statsRes] = await Promise.all([
                axiosInstance.get('students/profiles/'),
                axiosInstance.get('dashboard/stats/')
            ]);

            // Normalize students
            const normalizedStudents = studentsRes.data.map(profile => ({
                id: profile.user.username,
                userId: profile.user.id,           // DB primary key for API calls
                name: profile.user.first_name || profile.user.username,
                grade: profile.grade,
                school: profile.school,
                email: profile.user.email,
                studentPhone: profile.user.phone || '',
                district: profile.district || '',
                status: profile.payment_status || 'Unpaid', 
                progress: 0,
                joinedAt: profile.joined_at
            }));

            setStudents(normalizedStudents);
            setDashboardStats(statsRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_student');
        navigate('/login');
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'students', label: 'Student Management', icon: <Users size={20} /> },
        { id: 'payments', label: 'Payment Approvals', icon: <CreditCard size={20} /> },
        { id: 'classes', label: 'Class Management', icon: <Calendar size={20} /> },
        { id: 'marks', label: 'Exam Marks', icon: <GraduationCap size={20} /> },
        { id: 'homework', label: 'Homework Marks', icon: <FileSpreadsheet size={20} /> },
        { id: 'recordings', label: 'Class Recordings', icon: <PlayCircle size={20} /> },
        { id: 'home-videos', label: 'Homepage Highlights', icon: <Youtube size={20} /> },
        { id: 'reports', label: 'System Reports', icon: <BarChart3 size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-primary text-white flex flex-col shadow-2xl z-50 transition-transform duration-300 md:relative md:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="font-black text-xl leading-none tracking-tight">MYMATHS<span className="text-secondary">.LK</span></h1>
                            <p className="text-[10px] text-white/70 font-black uppercase tracking-[0.2em] mt-1">Admin Portal</p>
                        </div>
                    </div>
                    <button onClick={() => setIsMenuOpen(false)} className="md:hidden p-2 hover:bg-white/10 rounded-lg">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMenuOpen(false);
                            }}
                            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm ${
                                activeTab === item.id 
                                ? 'bg-white text-primary shadow-xl shadow-black/10' 
                                : 'text-white/90 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            <span className={activeTab === item.id ? 'text-primary' : 'text-white/60'}>
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center space-x-4 px-5 py-2.5 rounded-2xl text-white/70 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
                {/* Header */}
                <header className="bg-white h-24 border-b border-gray-100 flex items-center justify-between px-6 md:px-12 sticky top-0 z-30 shadow-sm shadow-gray-100/50">
                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className="p-3 bg-gray-50 text-gray-800 rounded-2xl md:hidden hover:bg-gray-100 transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <p className="text-[11px] font-black text-secondary uppercase tracking-[0.2em] leading-none mb-1">System Administration</p>
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <div className="relative group hidden lg:block">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search everything..." 
                                className="pl-12 pr-6 py-3 border border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all w-80 text-sm font-bold"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-gray-800 leading-none">Chamara </p>
                                <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Super Admin</p>
                            </div>
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-4 border-gray-50 shadow-lg shadow-primary/20 text-white font-black">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-gray-50/30 custom-scrollbar">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="max-w-7xl mx-auto"
                            >
                                <ErrorBoundary key={activeTab}>
                                    {activeTab === 'dashboard' && <Dashboard stats={dashboardStats} />}
                                    {activeTab === 'students' && <StudentManagement students={students} setStudents={setStudents} />}
                                    {activeTab === 'payments' && <PaymentApprovals students={students} setStudents={setStudents} />}
                                    {activeTab === 'classes' && <ClassManagement />}
                                    {activeTab === 'marks' && <ExamMarks students={students} />}
                                    {activeTab === 'homework' && <HomeworkMarks students={students} />}
                                    {activeTab === 'recordings' && <ClassRecordings />}
                                    {activeTab === 'home-videos' && <HomepageHighlights />}
                                    {activeTab === 'reports' && <SystemReports students={students} />}
                                </ErrorBoundary>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Admin;
