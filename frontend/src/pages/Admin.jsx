import { useState } from 'react';
import { 
    LayoutDashboard, 
    CreditCard, 
    GraduationCap, 
    FileSpreadsheet, 
    Video, 
    PlayCircle, 
    Users,
    ChevronRight,
    Search,
    CheckCircle2,
    XCircle,
    Plus,
    Clock,
    LogOut,
    Menu,
    X,
    BarChart3,
    Calendar,
    Settings,
    UserPlus,
    Trash2,
    Edit2,
    Save,
    Youtube,
    FileText,
    Bell, // Added
    BookOpen, // Added
    User, // Added
    Lock // Added
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                            <h1 className="font-black text-xl leading-none">Admin</h1>
                            <p className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-1">Portal</p>
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
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
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
                        onClick={() => navigate('/login')} 
                        className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-white/70 hover:bg-red-500 hover:text-white transition-all font-bold text-sm"
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
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] leading-none mb-1">System Administration</p>
                            <h2 className="text-xl md:text-2xl font-black text-gray-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-7xl mx-auto"
                        >
                            {activeTab === 'dashboard' && <DashboardContent />}
                            {activeTab === 'students' && <StudentContent />}
                            {activeTab === 'payments' && <PaymentContent />}
                            {activeTab === 'classes' && <ClassContent />}
                            {activeTab === 'marks' && <MarksContent />}
                            {activeTab === 'homework' && <HomeworkContent />}
                            { activeTab === 'recordings' && <RecordingContent />}
                            { activeTab === 'home-videos' && <HomeVideoContent />}
                            { activeTab === 'reports' && <ReportContent />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const ReportContent = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Student Progress Report */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <BarChart3 size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-2 tracking-tight">Student Progress</h3>
                <p className="text-sm text-gray-400 font-bold mb-8">Detailed analysis of student performance over time across all grades.</p>
                <button className="w-full bg-gray-50 hover:bg-blue-600 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">Generate Report</button>
            </div>

            {/* Attendance Report */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-2 tracking-tight">Attendance Log</h3>
                <p className="text-sm text-gray-400 font-bold mb-8">Track daily student participation in live classes and revision sessions.</p>
                <button className="w-full bg-gray-50 hover:bg-green-600 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">Download Log</button>
            </div>

            {/* Payment Report */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                </div>
                <h3 className="text-lg font-black text-gray-800 mb-2 tracking-tight">Financial Summary</h3>
                <p className="text-sm text-gray-400 font-bold mb-8">Monthly tuition fee collection reports and pending payment list.</p>
                <button className="w-full bg-gray-50 hover:bg-orange-600 hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">View Finances</button>
            </div>
        </div>

        {/* Recent System Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50">
                <h3 className="text-lg font-black text-gray-800">Recent System Activity</h3>
            </div>
            <div className="p-8">
                <div className="space-y-6">
                    {[
                        { activity: 'Bulk Marks Uploaded', user: 'Admin Chamarra', target: 'Grade 11 - Graphs', time: '2 hours ago', icon: <GraduationCap size={14} />, color: 'text-blue-500' },
                        { activity: 'Payment Approved', user: 'System Auto', target: 'STU-2026-085', time: '5 hours ago', icon: <CheckCircle2 size={14} />, color: 'text-green-500' },
                        { activity: 'Class Link Updated', user: 'Admin Assistant', target: 'Grade 10 Revision', time: 'Yesterday', icon: <Video size={14} />, color: 'text-purple-500' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div className="flex items-center space-x-4">
                                <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-800 leading-none mb-1">{item.activity}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.user} • {item.target}</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

/* Content Components */

const DashboardContent = () => (
    <div className="space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'Total Students', value: '1,248', icon: <Users size={24} />, color: 'bg-blue-500' },
                { label: 'Active Classes', value: '12', icon: <Video size={24} />, color: 'bg-green-500' },
                { label: 'Today\'s Earnings', value: 'Rs. 42,000', icon: <CreditCard size={24} />, color: 'bg-orange-500' },
                { label: 'Pending Homework', value: '85', icon: <FileSpreadsheet size={24} />, color: 'bg-purple-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <h4 className="text-xl font-black text-gray-800">{stat.value}</h4>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Summary / Today's Classes */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <div>
                        <h3 className="text-lg font-black text-gray-800">Today's Class Schedule</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{new Date().toDateString()}</p>
                    </div>
                    <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                </div>
                <div className="p-8 space-y-6">
                    {[
                        { time: '08:00 AM', label: 'Grade 11 Theory', lesson: 'Graphs & Functions', status: 'Live', pupils: 142 },
                        { time: '10:30 AM', label: 'Grade 10 Revision', lesson: 'Basics of Algebra', status: 'Upcoming', pupils: 98 },
                        { time: '02:00 PM', label: 'Grade 09 Theory', lesson: 'Geometry Intro', status: 'Upcoming', pupils: 115 },
                    ].map((cls, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="text-center min-w-[80px]">
                                    <p className="text-sm font-black text-gray-800">{cls.time}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">START</p>
                                </div>
                                <div className="h-10 w-[2px] bg-gray-100"></div>
                                <div>
                                    <h4 className="text-sm font-black text-gray-800 group-hover:text-primary transition-colors">{cls.label}</h4>
                                    <p className="text-xs text-gray-400 font-bold">{cls.lesson}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-black text-gray-800">{cls.pupils}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ENROLLED</p>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    cls.status === 'Live' ? 'bg-green-100 text-green-600 animate-pulse' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {cls.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6 text-xs font-black uppercase tracking-widest leading-none">
                <button className="w-full bg-primary hover:bg-secondary text-white p-6 rounded-3xl shadow-xl shadow-primary/20 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <UserPlus size={24} />
                        </div>
                        <span className="text-left py-2">Add New<br/><span className="text-sm">Student</span></span>
                    </div>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full bg-secondary hover:bg-primary text-white p-6 rounded-3xl shadow-xl shadow-secondary/20 transition-all flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <Video size={24} />
                        </div>
                        <span className="text-left py-2">Start Next<br/><span className="text-sm">Live Class</span></span>
                    </div>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pending Approvals</h5>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-black text-gray-800 tracking-tight leading-none">12 Payments</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-gray-800 tracking-tight leading-none">05 Results</span>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const StudentContent = () => (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Active Students</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage your learner community</p>
            </div>
            <div className="flex space-x-3">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Bulk Export</button>
                <button className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                    <Plus size={18} />
                    <span>Add Student</span>
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Student Info</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Class/Grade</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Payment Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Progress</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[
                            { id: 'STU-2026-001', name: 'Kavindu Lakshitha', grade: 'Grade 11', school: 'Royal College', status: 'Paid', progress: 85 },
                            { id: 'STU-2026-002', name: 'Nimali Perera', grade: 'Grade 11', school: 'Visakha Vidyalaya', status: 'Pending', progress: 72 },
                            { id: 'STU-2026-003', name: 'Amila Silva', grade: 'Grade 10', school: 'Ananda College', status: 'Unpaid', progress: 94 },
                        ].map((stu, i) => (
                            <tr key={stu.id} className="hover:bg-gray-50/30 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black text-xs">
                                            {stu.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-800 leading-none mb-1">{stu.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {stu.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-sm font-bold text-gray-700 leading-none mb-1">{stu.grade}</p>
                                    <p className="text-[10px] text-gray-400 font-bold leading-none">{stu.school}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                        stu.status === 'Paid' ? 'bg-green-100 text-green-600' : 
                                        stu.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {stu.status}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full rounded-full" style={{ width: `${stu.progress}%` }}></div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"><Edit2 size={16} /></button>
                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
const PaymentContent = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Payment Approvals</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Verify and approve student tuition receipts</p>
            </div>
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">4 New Requests</span>
        </div>
        
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Details</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Class</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Proof of Payment</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Submission Date</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {[
                            { name: 'Heshan Maduvantha', id: 'STU-2026-102', class: 'Grade 11 - Theory', date: 'Mar 15, 2026' },
                            { name: 'Dilshan Perera', id: 'STU-2026-045', class: 'Grade 10 - Revision', date: 'Mar 14, 2026' },
                            { name: 'Sanduni Malshani', id: 'STU-2026-213', class: 'Grade 09 - Theory', date: 'Mar 14, 2026' },
                        ].map((req, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black text-xs">
                                            {req.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-800 leading-none mb-1">{req.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {req.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <span className="text-sm font-bold text-gray-700">{req.class}</span>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap">
                                    <button className="text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">
                                        View Image
                                    </button>
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    {req.date}
                                </td>
                                <td className="px-8 py-6 whitespace-nowrap text-right space-x-3 text-[10px] font-black uppercase tracking-widest leading-none">
                                    <button className="px-4 py-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 shadow-md transition-all inline-flex items-center space-x-2">
                                        <CheckCircle2 size={14} />
                                        <span>Approve</span>
                                    </button>
                                    <button className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-md transition-all inline-flex items-center space-x-2">
                                        <XCircle size={14} />
                                        <span>Reject</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const ClassContent = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Class Schedules</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage zoom links and lesson timings</p>
            </div>
            <button className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                <Plus size={20} />
                <span>Add Schedule</span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
                { grade: 'Grade 11 - Theory', lesson: 'Quadratic Equations', time: 'Monday 08:00 AM', zoom: 'https://zoom.us/j/845213697', status: 'Live' },
                { grade: 'Grade 10 - Revision', lesson: 'Trigonometry', time: 'Tuesday 02:30 PM', zoom: 'https://zoom.us/j/992147321', status: 'Offline' },
            ].map((cls, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block ${
                                    cls.status === 'Live' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    {cls.status === 'Live' ? '🔴 Live Start' : '⚪ Offline'}
                                </span>
                                <h4 className="text-xl font-black text-gray-800 tracking-tight leading-none mb-2">{cls.grade}</h4>
                                <p className="text-sm font-bold text-gray-400">{cls.lesson}</p>
                            </div>
                            <div className="bg-white shadow-2xl shadow-gray-200 border border-gray-100 p-5 rounded-3xl text-center min-w-[100px]">
                                <Clock className="mx-auto mb-2 text-primary" size={20} />
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Starts At</p>
                                <p className="text-xs font-black text-gray-800 mt-1">{cls.time}</p>
                            </div>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-50 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zoom Meeting Link</label>
                                <div className="flex space-x-2">
                                    <input 
                                        type="text" 
                                        className="flex-1 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner"
                                        defaultValue={cls.zoom}
                                    />
                                    <button className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:bg-secondary transition-all">
                                        <Save size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md ${
                                    cls.status === 'Live' ? 'bg-red-500 text-white shadow-red-200 hover:bg-red-600' : 'bg-green-500 text-white shadow-green-200 hover:bg-green-600'
                                }`}>
                                    {cls.status === 'Live' ? 'End Session' : 'Start Session'}
                                </button>
                                <button className="p-4 bg-gray-100 text-gray-400 rounded-2xl hover:bg-gray-200 transition-all">
                                    <Edit2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const MarksContent = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Monthly Exam Marks</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Update results for grades 6 - 11</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Grade</p>
                <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none custom-scrollbar">
                    {[6,7,8,9,10,11].map(g => <option key={g} selected={g===11}>Grade {g}</option>)}
                </select>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Month</p>
                <select className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none">
                    {['January', 'February', 'March', 'April'].map(m => <option key={m} selected={m==='March'}>{m}</option>)}
                </select>
            </div>
            <div className="flex items-end">
                <button className="bg-primary hover:bg-secondary text-white w-full py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-3">
                    <Plus size={20} />
                    <span>Enter Marks</span>
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                 <h4 className="font-black text-gray-800 tracking-tight">Grade 11 - March Exam</h4>
                 <div className="flex space-x-3">
                     <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">Bulk Upload</button>
                     <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/10">Save All</button>
                 </div>
             </div>
             <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                    <tr>
                        <th className="px-8 py-5">Student ID</th>
                        <th className="px-8 py-5">Student Name</th>
                        <th className="px-8 py-5 w-40">Marks (%)</th>
                        <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {[
                        { id: 'STU-11-204', name: 'Ishara Sewwandi' },
                        { id: 'STU-11-205', name: 'Pathum Nissanka' },
                        { id: 'STU-11-206', name: 'Mahesh Thambuttu' },
                    ].map((stu, i) => (
                        <tr key={stu.id} className="group">
                            <td className="px-8 py-5 text-sm font-black text-gray-400">{stu.id}</td>
                            <td className="px-8 py-5 text-sm font-black text-gray-800">{stu.name}</td>
                            <td className="px-8 py-5">
                                <input type="number" className="w-24 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center text-sm font-black text-primary focus:ring-4 focus:ring-primary/5 outline-none" placeholder="00" />
                            </td>
                            <td className="px-8 py-5 text-right">
                                <button className="p-2 text-gray-300 hover:text-green-500 transition-colors"><Save size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    </div>
);

const HomeworkContent = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Weekly Homework Grades</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Assign A, B, C, S or W grades</p>
            </div>
        </div>

        <div className="bg-white p-12 rounded-[50px] shadow-xl shadow-gray-200/50 border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                    <FileSpreadsheet className="text-primary" size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Select Target Group</h3>
                    <p className="text-gray-400 font-bold text-sm mt-2">Pick the specific week and grade to start marking homework.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <select className="w-full sm:w-auto min-w-[180px] bg-gray-50 border border-gray-100 rounded-2xl p-5 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all">
                        {['Week 01', 'Week 02', 'Week 03', 'Week 04'].map(w => <option key={w}>{w}</option>)}
                    </select>
                    <select className="w-full sm:w-auto min-w-[180px] bg-gray-50 border border-gray-100 rounded-2xl p-5 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all">
                        {['Grade 11', 'Grade 10', 'Grade 09', 'Grade 08'].map(g => <option key={g}>{g}</option>)}
                    </select>
                    <button className="w-full sm:w-auto bg-primary hover:bg-secondary text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all active:scale-95">Load Student List</button>
                </div>

                <div className="grid grid-cols-5 gap-3 max-w-md mx-auto pt-6">
                    {['A','B','C','S','W'].map(g => (
                        <div key={g} className="bg-gray-50 p-4 rounded-2xl flex flex-col items-center border border-gray-100">
                            <span className="text-lg font-black text-gray-800 leading-none">{g}</span>
                            <span className="text-[8px] text-gray-400 font-bold uppercase mt-1">Grade</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const RecordingContent = () => (
    <div className="space-y-8">
        <div className="bg-primary rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mb-32 -mr-32 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                <div className="flex-1 max-w-md">
                    <div className="bg-white/20 p-3 rounded-2xl w-fit mb-6">
                        <Youtube className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl font-black mb-3 tracking-tighter">Class Recordings</h3>
                    <p className="text-white/70 font-bold leading-relaxed">Publish lesson recordings directly to the student portal via YouTube links.</p>
                </div>
                <div className="flex-1 w-full space-y-4">
                    <div className="bg-white/10 backdrop-blur-xl rounded-[30px] p-2 border border-white/20 flex shadow-inner">
                        <input 
                            type="text" 
                            placeholder="Drop YouTube Link here..." 
                            className="bg-transparent border-none text-white placeholder-white/40 flex-1 outline-none px-6 text-sm font-bold py-4"
                        />
                        <button className="bg-white text-primary px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-gray-50 transition-all active:scale-95">
                            Upload Link
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <input type="number" placeholder="Lesson No" className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:bg-white/10" />
                        <input type="date" className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:bg-white/10" />
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-[40px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[2px]">
                            <PlayCircle className="text-white" size={48} />
                        </div>
                        <img src={`https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Thumbnail" />
                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">Lesson 0{i}</span>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h4 className="font-black text-gray-800 text-lg transition-colors group-hover:text-primary tracking-tight">Advanced Trigonometry</h4>
                                 <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-widest">Grade 11 • Theory</p>
                             </div>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] border-t border-gray-50 pt-6">
                            <span>📅 Mar 10, 2026</span>
                            <button className="text-red-400 hover:text-red-500 hover:underline transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const HomeVideoContent = () => {
    const defaultVideos = [
        {
            id: '1',
            title: 'My Maths | ගණීතයට හොඳම විසඳුම',
            description: 'අපි පදුරු වලට විදින්නෙ නෑ, විදින්නේ හාවටම තමයි...',
            thumbnail: 'https://img.youtube.com/vi/Orf0Qy40AeE/maxresdefault.jpg',
            link: 'https://youtu.be/Orf0Qy40AeE?si=0nWlS7tnmVjM8rbs',
        },
        {
            id: '2',
            title: 'Revision',
            description: 'භාග ලේසියෙන් විසදමු.',
            thumbnail: 'https://img.youtube.com/vi/-vwlNhRY6Ik/maxresdefault.jpg',
            link: 'https://youtu.be/-vwlNhRY6Ik?si=niRSx_-geBquDDeI',
        },
        {
            id: '3',
            title: 'Maths | Revision',
            description: 'වීජීය භාග ලේසියෙන් විසදමු.',
            thumbnail: 'https://img.youtube.com/vi/NkKU9svBADA/maxresdefault.jpg',
            link: 'https://youtu.be/NkKU9svBADA?si=ArU-T4lK9jegWH0L',
        }
    ];

    const [videos, setVideos] = useState(() => {
        const saved = localStorage.getItem('home_videos');
        return saved ? JSON.parse(saved) : defaultVideos;
    });

    const [newVideo, setNewVideo] = useState({
        title: '',
        description: '',
        link: '',
        customThumbnail: ''
    });

    const [editingId, setEditingId] = useState(null);

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSave = () => {
        let updatedVideos;
        const videoId = extractVideoId(newVideo.link);
        const ytThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg';
        const thumbnail = newVideo.customThumbnail || ytThumbnail;

        if (editingId) {
            updatedVideos = videos.map(v => v.id === editingId ? { ...newVideo, id: editingId, thumbnail } : v);
            setEditingId(null);
        } else {
            updatedVideos = [...videos, { ...newVideo, id: Date.now().toString(), thumbnail }];
        }

        setVideos(updatedVideos);
        localStorage.setItem('home_videos', JSON.stringify(updatedVideos));
        setNewVideo({ title: '', description: '', link: '', customThumbnail: '' });
    };

    const handleDelete = (id) => {
        const updatedVideos = videos.filter(v => v.id !== id);
        setVideos(updatedVideos);
        localStorage.setItem('home_videos', JSON.stringify(updatedVideos));
    };

    const handleEdit = (video) => {
        setNewVideo({
            title: video.title || '',
            description: video.description || '',
            link: video.link || '',
            customThumbnail: video.customThumbnail || ''
        });
        setEditingId(video.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Editor Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1 w-full space-y-8">
                    <div>
                        <h3 className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-2">
                            {editingId ? 'Edit Video Highlight' : 'Add New Highlight'}
                        </h3>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Manage content for the homepage "Free Lessons" section</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video Title</label>
                            <input 
                                type="text" 
                                value={newVideo.title}
                                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                                placeholder="e.g. Grade 11 Theory" 
                                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner placeholder:text-gray-300 leading-relaxed" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">YouTube Video Link</label>
                        <input 
                            type="text" 
                            value={newVideo.link}
                            onChange={(e) => setNewVideo({...newVideo, link: e.target.value})}
                            placeholder="Paste YouTube URL here..." 
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner placeholder:text-gray-300 leading-relaxed" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Custom Thumbnail URL (Optional)</label>
                        <input 
                            type="text" 
                            value={newVideo.customThumbnail}
                            onChange={(e) => setNewVideo({...newVideo, customThumbnail: e.target.value})}
                            placeholder="https://example.com/image.jpg" 
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner placeholder:text-gray-300 leading-relaxed" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brief Description</label>
                        <textarea 
                            rows="3"
                            value={newVideo.description}
                            onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                            placeholder="What is this lesson about?" 
                            className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner placeholder:text-gray-300 leading-relaxed"
                        />
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button 
                            onClick={handleSave}
                            disabled={!newVideo.title || !newVideo.link}
                            className="flex-1 bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 transition-all flex items-center justify-center space-x-3 active:scale-95 disabled:opacity-50"
                        >
                            <Save size={18} />
                            <span>{editingId ? 'Update Video' : 'Publish Highlight'}</span>
                        </button>
                        {editingId && (
                            <button 
                                onClick={() => {
                                    setEditingId(null);
                                    setNewVideo({ title: '', description: '', link: '', customThumbnail: '' });
                                }}
                                className="px-8 bg-gray-100 text-gray-400 hover:bg-gray-200 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full md:w-80 space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Live Preview</p>
                    <div className="bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 shadow-inner group p-4">
                        <div className="aspect-video bg-gray-200 rounded-2xl mb-4 overflow-hidden relative">
                            {newVideo.customThumbnail ? (
                                <img src={newVideo.customThumbnail} className="w-full h-full object-cover" alt="Custom Preview" />
                            ) : newVideo.link && extractVideoId(newVideo.link) ? (
                                <img src={`https://img.youtube.com/vi/${extractVideoId(newVideo.link)}/mqdefault.jpg`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                                    <Video size={40} />
                                </div>
                            )}
                        </div>
                        <h4 className="font-black text-base text-gray-800 leading-tight mb-2">{newVideo.title || 'Untitled Lesson'}</h4>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed italic">{newVideo.description || 'No description provided'}</p>
                    </div>
                    <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 border-dashed">
                        <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest leading-loose">
                            💡 **TIP:** Paste any YouTube video URL. The system handles ID extraction and thumbnail generation automatically.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div>
                <div className="flex items-center justify-between mb-8 px-4">
                    <h4 className="text-xl font-black text-gray-800">Current Highlights ({videos.length})</h4>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Homepage Section</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, i) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={video.id} 
                            className="bg-white rounded-[40px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Thumbnail" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg border border-primary/10">#{i + 1}</span>
                                </div>
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h4 className="font-black text-gray-800 text-lg transition-colors group-hover:text-primary tracking-tight mb-3 leading-snug">
                                    {video.title}
                                </h4>
                                <p className="text-sm text-gray-400 font-bold leading-relaxed italic mb-6">
                                    {video.description}
                                </p>
                                <div className="mt-auto flex justify-between items-center pt-6 border-t border-gray-50">
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(video)}
                                            className="p-3 bg-gray-50 text-gray-400 hover:bg-primary hover:text-white rounded-2xl transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(video.id)}
                                            className="p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <a href={video.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
                                        <Youtube size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {videos.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                            <Video className="mx-auto mb-4 text-gray-200" size={48} />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No videos published on homepage yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
