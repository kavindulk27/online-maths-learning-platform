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
    ChevronRight,
    Search,
    CheckCircle2,
    XCircle,
    Plus,
    Clock,
    LogOut,
    Menu,
    X,
    Eye,
    Download,
    Image as ImageIcon,
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
    Lock, // Added
    Upload, // Added
    Printer, // Added
    ArrowLeft // Added
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo1.png';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [students, setStudents] = useState(() => {
        const saved = localStorage.getItem('all_students');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('all_students');
            if (saved) {
                // Normalize grades for existing data (e.g., "11" -> "Grade 11")
                const parsed = JSON.parse(saved);
                let changed = false;
                const normalized = parsed.map(s => {
                    if (s.grade && !s.grade.startsWith('Grade ')) {
                        changed = true;
                        return { ...s, grade: `Grade ${s.grade.trim()}` };
                    }
                    return s;
                });
                
                if (changed) {
                    localStorage.setItem('all_students', JSON.stringify(normalized));
                    setStudents(normalized);
                } else {
                    setStudents(parsed);
                }
            }
        };

        handleStorageChange(); // Initial normalization and load
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const downloadCSV = (data, filename) => {
        if (!data || data.length === 0) {
            alert('No data available to export / අපනයනය කිරීමට දත්ත නොමැත');
            return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => {
                const value = row[header] === null || row[header] === undefined ? '' : row[header];
                const stringValue = String(value).replace(/"/g, '""');
                return `"${stringValue}"`;
            }).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                            <h1 className="font-black text-xl leading-none">Admin</h1>
                            <p className="text-[11px] text-white/70 font-black uppercase tracking-widest mt-1">Portal</p>
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
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-7xl mx-auto"
                        >
                            {activeTab === 'dashboard' && <DashboardContent students={students} />}
                            {activeTab === 'students' && <StudentContent students={students} setStudents={setStudents} />}
                            {activeTab === 'payments' && <PaymentContent students={students} setStudents={setStudents} />}
                            {activeTab === 'classes' && <ClassContent />}
                            {activeTab === 'marks' && <MarksContent students={students} />}
                            {activeTab === 'homework' && <HomeworkContent students={students} />}
                            { activeTab === 'recordings' && <RecordingContent />}
                            { activeTab === 'home-videos' && <HomeVideoContent />}
                            { activeTab === 'reports' && <ReportContent students={students} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const ReportContent = ({ students }) => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');

    // Load marks once for efficient stats calculation
    const allExamMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');

    const filteredStudents = students.filter(s => {
        const matchesGrade = s.grade === selectedGrade || (s.grade && `Grade ${s.grade.trim()}` === selectedGrade);
        const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             s.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGrade && matchesSearch;
    });

    const getStudentStats = (studentId) => {
        const marks = allExamMarks.filter(m => m.studentId === studentId);
        if (marks.length === 0) return { avg: 0, count: 0 };
        const avg = Math.round(marks.reduce((acc, curr) => acc + curr.marks, 0) / marks.length);
        return { avg, count: marks.length };
    };

    const handleExportAttendance = () => {
        const data = students
            .filter(s => s.grade === selectedGrade || (s.grade && `Grade ${s.grade.trim()}` === selectedGrade))
            .map(s => ({
                'Student ID': s.id,
                'Name': s.name,
                'Grade': s.grade,
                'School': s.school,
                'Attendance Status': 'Present (System Active)', // Mock status as real log is pending
                'Last Login': new Date().toLocaleDateString()
            }));
        downloadCSV(data, `Attendance_Log_${selectedGrade.replace(' ', '_')}`);
    };

    const handleExportPayments = () => {
        const data = students
            .filter(s => s.grade === selectedGrade || (s.grade && `Grade ${s.grade.trim()}` === selectedGrade))
            .map(s => ({
                'ID': s.id,
                'Name': s.name,
                'Grade': s.grade,
                'Monthly Fee': 'Paid', // Assuming 1000 or logic based on status
                'Status': s.status,
                'Receipt': s.receiptImage ? 'Attached' : 'None'
            }));
        downloadCSV(data, `Payment_Summary_${selectedGrade.replace(' ', '_')}`);
    };

    if (selectedStudent) {
        return <StudentReportCard student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Academic Performance Reports</h3>
                        <p className="text-gray-500 font-bold">Search and filter to manage student progress in bulk.</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative group">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <select 
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="pl-12 pr-10 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all w-full md:w-64 text-sm font-black appearance-none cursor-pointer"
                            >
                                {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                            <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" size={16} />
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search name or ID..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-6 py-4 border border-gray-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white transition-all w-full md:w-80 text-sm font-bold"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStudents.map(stu => {
                        const stats = getStudentStats(stu.id);
                        return (
                            <button 
                                key={stu.id}
                                onClick={() => setSelectedStudent(stu)}
                                className="flex items-center space-x-4 p-5 rounded-[32px] bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group text-left border border-transparent hover:border-primary/20"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary font-black shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                    {stu.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-black text-gray-900 truncate mb-0.5">{stu.name}</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{stu.id}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${stats.avg >= 75 ? 'text-green-500' : stats.avg >= 40 ? 'text-primary' : 'text-gray-400'}`}>
                                            Avg: {stats.avg}%
                                        </span>
                                    </div>
                                </div>
                                <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={20} />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Users size={40} />
                        </div>
                        <h4 className="text-lg font-black text-gray-800">No students found</h4>
                        <p className="text-gray-500 font-bold">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>

            {/* Additional Reports (Export Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-green-100 rounded-[24px] flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-3 tracking-tight">Full Attendance Log</h3>
                    <p className="text-gray-500 font-bold mb-10 leading-relaxed">Export the complete attendance record for all students across all grades in CSV format.</p>
                    <button 
                        onClick={handleExportAttendance}
                        className="flex items-center justify-center space-x-3 w-full bg-gray-50 hover:bg-green-600 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                    >
                        <Download size={18} />
                        <span>Download CSV</span>
                    </button>
                </div>

                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 bg-orange-100 rounded-[24px] flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-xl font-black text-gray-800 mb-3 tracking-tight">Payment Summary</h3>
                    <p className="text-gray-500 font-bold mb-10 leading-relaxed">Generate a comprehensive financial summary including paid and pending tuition fees for the current grade.</p>
                    <button 
                        onClick={handleExportPayments}
                        className="flex items-center justify-center space-x-3 w-full bg-gray-50 hover:bg-orange-600 hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all"
                    >
                        <Download size={18} />
                        <span>Download Analysis</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudentReportCard = ({ student, onBack }) => {
    const examMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]').filter(m => m.studentId === student.id);
    const homeworkMarks = JSON.parse(localStorage.getItem('all_homework_marks') || '[]').filter(m => m.studentId === student.id);
    
    // Calculate Stats
    const totalExams = examMarks.length;
    const avgScore = totalExams > 0 ? Math.round(examMarks.reduce((acc, curr) => acc + curr.marks, 0) / totalExams) : 0;
    const bestScore = totalExams > 0 ? Math.max(...examMarks.map(m => m.marks)) : 0;
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            {/* Header / Actions */}
            <div className="flex items-center justify-between no-print">
                <button 
                    onClick={onBack}
                    className="flex items-center space-x-2 text-gray-500 hover:text-primary font-black text-xs uppercase tracking-widest transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Back to selection</span>
                </button>
                <button 
                    onClick={handlePrint}
                    className="flex items-center space-x-3 bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Printer size={18} />
                    <span>Print Report Card</span>
                </button>
            </div>

            {/* The Report Card */}
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 print:shadow-none print:border-none print:m-0">
                {/* Visual Header */}
                <div className="bg-gradient-to-br from-primary to-secondary p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center space-x-8">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black border border-white/20">
                                {student.name[0]}
                            </div>
                            <div>
                                <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.3em] mb-2 leading-none">Official Academic Report</p>
                                <h2 className="text-4xl font-black leading-tight tracking-tight mb-2">{student.name}</h2>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-sm">{student.id}</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-sm">{student.grade}</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-lg text-xs font-bold backdrop-blur-sm">{student.school}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col md:items-end gap-4">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 inline-block text-left min-w-[200px]">
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Cumulative Grade</p>
                                <div className="flex items-end space-x-2">
                                    <span className="text-4xl font-black leading-none">{avgScore}%</span>
                                    <span className="text-xs font-bold text-white/60 uppercase mb-1">Average</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="p-12 space-y-12">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Exam History</p>
                            <h4 className="text-2xl font-black text-gray-900">{totalExams} <span className="text-sm font-bold text-gray-400 ml-1">Exams Taken</span></h4>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Peak Performance</p>
                            <h4 className="text-2xl font-black text-primary">{bestScore}% <span className="text-sm font-bold text-gray-400 ml-1">Highest Score</span></h4>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Homework Status</p>
                            <h4 className="text-2xl font-black text-gray-900">{homeworkMarks.length} <span className="text-sm font-bold text-gray-400 ml-1">Submissions</span></h4>
                        </div>
                    </div>

                    {/* Detailed Marks Table */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-gray-800">Examination Details</h3>
                            <div className="h-px flex-1 bg-gray-100 mx-8"></div>
                        </div>
                        <div className="overflow-hidden bg-gray-50 rounded-3xl border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-white/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5">Month / මාසය</th>
                                        <th className="px-8 py-5 text-center">Score / ලකුණු</th>
                                        <th className="px-8 py-5 text-right">Progress</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {examMarks.length > 0 ? examMarks.sort((a,b) => b.timestamp - a.timestamp).map((m, i) => (
                                        <tr key={i} className="group hover:bg-white/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <span className="font-black text-gray-800">{m.month}</span>
                                            </td>
                                            <td className="px-8 py-6 text-center">
                                                <span className="text-lg font-black text-primary">{m.marks}%</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="w-full max-w-[150px] ml-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-primary" 
                                                        style={{ width: `${m.marks}%` }}
                                                    ></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="px-8 py-12 text-center text-gray-400 font-bold italic">No exam data available yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer / Authentication */}
                    <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-end gap-12">
                        <div className="max-w-md">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 leading-none">Teacher's Remarks</p>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                                "{avgScore >= 75 ? "Excellent progress. Keep maintaining this standard." : avgScore >= 40 ? "Steady performance. Consistent practice will help improve scores." : "Needs more focus on core concepts and regular practice."}"
                            </p>
                        </div>
                        <div className="text-center md:text-right">
                            <div className="mb-4">
                                <img src={logo} alt="Signature" className="h-16 w-auto opacity-30 grayscale inline-block" />
                            </div>
                            <div className="h-px w-48 bg-gray-300 mb-2"></div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Master Signature</p>
                            <p className="text-xs font-bold text-gray-800">Chandana Vidunuwan</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .print\\:shadow-none { box-shadow: none !important; }
                    .print\\:border-none { border: none !important; }
                    .print\\:m-0 { margin: 0 !important; }
                    aside { display: none !important; }
                    header { display: none !important; }
                    main { padding: 0 !important; margin: 0 !important; }
                }
            `}</style>
        </div>
    );
};


/* Content Components */

const DashboardContent = ({ students }) => {
    const totalStudents = students.length;
    const pendingPayments = students.filter(s => s.status === 'Pending').length;
    const approvedStudents = students.filter(s => s.status === 'Approved').length;

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: <Users size={24} />, color: 'bg-blue-500' },
                    { label: 'Approved Students', value: approvedStudents.toLocaleString(), icon: <CheckCircle2 size={24} />, color: 'bg-green-500' },
                    { label: 'Pending Approvals', value: pendingPayments.toLocaleString(), icon: <CreditCard size={24} />, color: 'bg-orange-500' },
                    { label: 'Today\'s Classes', value: '02', icon: <Video size={24} />, color: 'bg-purple-500' },
                ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                    <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <h4 className="text-xl font-black text-gray-900">{stat.value}</h4>
                    </div>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Summary / Today's Classes */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                    <div>
                        <h3 className="text-lg font-black text-gray-900">Today's Class Schedule</h3>
                        <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest mt-1">{new Date().toDateString()}</p>
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
};

const StudentContent = ({ students, setStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('Grade 6');

    const handleDeleteStudent = (id) => {
        if (window.confirm('පද්ධතියෙන් මෙම ශිෂ්‍යයා සම්පූර්ණයෙන්ම ඉවත් කිරීමට ඔබට විශ්වාසද? (Are you sure you want to delete this student?)')) {
            const updated = students.filter(s => s.id !== id);
            setStudents(updated);
            localStorage.setItem('all_students', JSON.stringify(updated));
        }
    };

    const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    const handleStatusToggle = (student) => {
        const newStatus = student.status === 'Approved' ? 'Unpaid' : 'Approved';
        const updatedStudents = students.map(s => 
            s.id === student.id ? { ...s, status: newStatus } : s
        );
        setStudents(updatedStudents);
        localStorage.setItem('all_students', JSON.stringify(updatedStudents));

        const currentStudent = JSON.parse(localStorage.getItem('current_student') || '{}');
        if (currentStudent.id === student.id) {
            localStorage.setItem('current_student', JSON.stringify({ ...currentStudent, paymentStatus: newStatus }));
            window.dispatchEvent(new Event('storage'));
        }
    };

    const filteredStudents = students.filter(s => 
        s.grade === selectedGrade && (
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            s.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 leading-none mb-1">Student Management</h3>
                    <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest">Manage your learner community by grade</p>
                </div>
                <div className="flex space-x-3 items-center">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search in this grade..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 border border-gray-100 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all w-64 text-sm font-bold"
                        />
                    </div>
                    <button className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Student</span>
                    </button>
                </div>
            </div>

            {/* Grade Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
                {grades.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                            selectedGrade === grade 
                            ? 'bg-white text-primary shadow-sm shadow-gray-200' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                        }`}
                    >
                        {grade}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">Student Info</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">School</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">Payment Status</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((stu, i) => (
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
                                            <p className="text-sm font-bold text-gray-700 leading-none">{stu.school}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                stu.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                                                stu.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {stu.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button 
                                                    onClick={() => alert(`Editing student: ${stu.name}\nFeature coming soon: profile details update.`)}
                                                    className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteStudent(stu.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <User className="text-gray-200 mb-4" size={48} />
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No students found in {selectedGrade}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
const PaymentContent = ({ students, setStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [viewingReceipt, setViewingReceipt] = useState(null);

    const handleStatusToggle = (student) => {
        const newStatus = student.status === 'Approved' ? 'Unpaid' : 'Approved';
        const updatedStudents = students.map(s => 
            s.id === student.id ? { ...s, status: newStatus } : s
        );
        setStudents(updatedStudents);
        localStorage.setItem('all_students', JSON.stringify(updatedStudents));

        const currentStudent = JSON.parse(localStorage.getItem('current_student') || '{}');
        if (currentStudent.id === student.id) {
            localStorage.setItem('current_student', JSON.stringify({ ...currentStudent, paymentStatus: newStatus }));
            window.dispatchEvent(new Event('storage'));
        }
    };

    const filteredStudents = students.filter(s => {
        const query = searchTerm.toLowerCase();
        const matchesSearch = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
        
        if (searchTerm) return matchesSearch;
        return s.status === 'Pending';
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 leading-none mb-1">Quick Search & Approve</h3>
                    <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest">Global student search for instant payment approval</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search Student ID or Name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3.5 border border-gray-100 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all w-80 text-sm font-bold shadow-sm"
                    />
                </div>
            </div>
            
            <div className="bg-white rounded-[40px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">Student Details</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">Class/Grade</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest text-right">Approve/Reject</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((stu, i) => (
                                    <tr key={stu.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-black text-xs">
                                                    {stu.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-800 leading-none mb-1">{stu.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {stu.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className="text-sm font-bold text-gray-700">{stu.grade}</span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                stu.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                                                stu.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {stu.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                {stu.receiptImage && (
                                                    <button 
                                                        onClick={() => setViewingReceipt(stu)}
                                                        className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm group"
                                                        title="View Payment Receipt"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleStatusToggle(stu)}
                                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center space-x-2 ${
                                                        stu.status === 'Approved' 
                                                        ? 'bg-red-500 text-white shadow-red-100' 
                                                        : 'bg-green-500 text-white shadow-green-100'
                                                    }`}
                                                >
                                                    {stu.status === 'Approved' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                                                    <span>{stu.status === 'Approved' ? 'Reject Access' : 'Approve Payment'}</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <CreditCard className="text-gray-200 mb-4" size={48} />
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No students found matching your search</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Receipt Viewer Modal */}
            <AnimatePresence>
                {viewingReceipt && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
                        onClick={() => setViewingReceipt(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-[40px] overflow-hidden max-w-2xl w-full shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                        <ImageIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-800 tracking-tight leading-none mb-1">Payment Receipt</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Student: {viewingReceipt.name} ({viewingReceipt.id})</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setViewingReceipt(null)}
                                    className="p-2 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8 bg-gray-50 flex items-center justify-center min-h-[400px]">
                                <img 
                                    src={viewingReceipt.receiptImage} 
                                    alt="Receipt" 
                                    className="max-h-[60vh] rounded-2xl shadow-2xl border-4 border-white"
                                />
                            </div>
                            <div className="p-8 border-t border-gray-50 flex justify-end space-x-4">
                                <button 
                                    onClick={() => setViewingReceipt(null)}
                                    className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all"
                                >
                                    Close
                                </button>
                                <button 
                                    onClick={() => {
                                        handleStatusToggle(viewingReceipt);
                                        setViewingReceipt(null);
                                    }}
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center space-x-2"
                                >
                                    <CheckCircle2 size={16} />
                                    <span>Approve This Payment</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ClassContent = () => {
    const defaultClasses = [
        { id: 1, grade: 'Grade 11', type: 'Theory', lesson: 'Quadratic Equations', time: 'Monday 08:00 AM', zoom: 'https://zoom.us/j/845213697', status: 'Offline' },
        { id: 2, grade: 'Grade 10', type: 'Revision', lesson: 'Trigonometry', time: 'Tuesday 02:30 PM', zoom: 'https://zoom.us/j/992147321', status: 'Offline' },
    ];

    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('class_schedules');
        return saved ? JSON.parse(saved) : defaultClasses;
    });

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newClass, setNewClass] = useState({ grade: 'Grade 11', type: 'Theory', lesson: '', time: '', zoom: '' });

    const saveClasses = (updated) => {
        setClasses(updated);
        localStorage.setItem('class_schedules', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const handleAdd = () => {
        const id = Date.now();
        saveClasses([...classes, { ...newClass, id, status: 'Offline' }]);
        setIsAdding(false);
        setNewClass({ grade: 'Grade 11', type: 'Theory', lesson: '', time: '', zoom: '' });
    };

    const handleDelete = (id) => {
        saveClasses(classes.filter(c => c.id !== id));
    };

    const handleToggleStatus = (id) => {
        saveClasses(classes.map(c => 
            c.id === id ? { ...c, status: c.status === 'Live' ? 'Offline' : 'Live' } : c
        ));
    };

    const handleUpdateZoom = (id, newZoom) => {
        saveClasses(classes.map(c => 
            c.id === id ? { ...c, zoom: newZoom } : c
        ));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Class Schedules</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage zoom links and lesson timings</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Add Schedule</span>
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-primary/20 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20" size={18} />
                                <select 
                                    value={newClass.grade}
                                    onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                                >
                                    {[6,7,8,9,10,11].map(g => <option key={g}>Grade {g}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                            <div className="relative">
                                <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20" size={18} />
                                <select 
                                    value={newClass.type}
                                    onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                                >
                                    <option>Theory</option>
                                    <option>Revision</option>
                                    <option>Paper Class</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time (e.g. Sat 8:00 AM)</label>
                            <input 
                                type="text"
                                value={newClass.time}
                                onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="Sat 8:00 AM"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lesson Name</label>
                            <input 
                                type="text"
                                value={newClass.lesson}
                                onChange={(e) => setNewClass({...newClass, lesson: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="Quadratic Equations"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zoom Link</label>
                            <input 
                                type="text"
                                value={newClass.zoom}
                                onChange={(e) => setNewClass({...newClass, zoom: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="https://zoom.us/j/..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all">Cancel</button>
                        <button onClick={handleAdd} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-secondary transition-all">Save Schedule</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block ${
                                        cls.status === 'Live' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {cls.status === 'Live' ? '🔴 Live now' : '⚪ Offline'}
                                    </span>
                                    <h4 className="text-xl font-black text-gray-800 tracking-tight leading-none mb-2">{cls.grade} - {cls.type}</h4>
                                    <p className="text-sm font-bold text-gray-400">{cls.lesson}</p>
                                </div>
                                <div className="bg-white shadow-2xl shadow-gray-200 border border-gray-100 p-5 rounded-3xl text-center min-w-[100px]">
                                    <Clock className="mx-auto mb-2 text-primary" size={20} />
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Time</p>
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
                                            onBlur={(e) => handleUpdateZoom(cls.id, e.target.value)}
                                        />
                                        <button className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:bg-secondary transition-all">
                                            <Save size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex space-x-3 pt-2">
                                    <button 
                                        onClick={() => handleToggleStatus(cls.id)}
                                        className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95 ${
                                        cls.status === 'Live' ? 'bg-red-500 text-white shadow-red-200 hover:bg-red-600' : 'bg-green-500 text-white shadow-green-200 hover:bg-green-600'
                                    }`}>
                                        {cls.status === 'Live' ? 'End Session' : 'Start Session'}
                                    </button>
                                    <button onClick={() => handleDelete(cls.id)} className="p-4 bg-gray-100 text-red-400 rounded-2xl hover:bg-red-50 transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MarksContent = ({ students }) => {
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchTerm, setSearchTerm] = useState('');
    const [tempMarks, setTempMarks] = useState({}); // { studentId: mark }
    const [isSaving, setIsSaving] = useState(false);
    const [marksStudents, setMarksStudents] = useState([]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        // Ensure students list is available and normalized
        const normalizedStudents = students.map(s => {
            if (s.grade && !s.grade.startsWith('Grade ')) {
                return { ...s, grade: `Grade ${s.grade.trim()}` };
            }
            return s;
        });

        const filtered = normalizedStudents.filter(s => s.grade === selectedGrade);
        setMarksStudents(filtered);
        
        const allMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');
        const existingMarks = {};
        allMarks.forEach(m => {
            if (m.month === selectedMonth && m.grade === selectedGrade) {
                // Keep as string for the input field, but handle 0 correctly
                existingMarks[m.studentId] = m.marks.toString();
            }
        });
        setTempMarks(existingMarks);
    }, [selectedGrade, selectedMonth, students]);

    const updateMark = (studentId, marks) => {
        setTempMarks(prev => ({
            ...prev,
            [studentId]: marks
        }));
    };

    const handleSaveAll = () => {
        setIsSaving(true);
        setTimeout(() => {
            const allMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');
            
            // Remove old entries for this specific month and grade
            let updatedMarks = allMarks.filter(m => !(m.month === selectedMonth && m.grade === selectedGrade));
            
            // Add new marks (only if a value exists)
            Object.keys(tempMarks).forEach(stuId => {
                if (tempMarks[stuId] !== '') {
                    updatedMarks.push({
                        studentId: stuId,
                        grade: selectedGrade,
                        month: selectedMonth,
                        marks: parseFloat(tempMarks[stuId]),
                        date: new Date().toLocaleDateString(),
                        timestamp: Date.now()
                    });
                }
            });

            localStorage.setItem('all_exam_marks', JSON.stringify(updatedMarks));
            window.dispatchEvent(new Event('storage'));
            setIsSaving(false);
            alert(`${selectedGrade} - ${selectedMonth} විභාග ලකුණු සාර්ථකව සුරැකුවා!`);
        }, 800);
    };

    const filteredStudents = marksStudents.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const lines = text.split('\n');
            const newMarks = { ...tempMarks };
            
            lines.forEach(line => {
                const [id, mark] = line.split(',').map(s => s.trim());
                if (id && mark && !isNaN(mark)) {
                    newMarks[id] = mark;
                }
            });
            
            setTempMarks(newMarks);
            alert('CSV Data Loaded! Please review and click Save All.');
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h3 className="text-2xl font-black text-gray-900 leading-none mb-1">Monthly Exam Marks</h3>
                    <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">Manage results for all grades in one place</p>
                </div>
                <div className="relative group w-full md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                    <input 
                        type="text" 
                        placeholder="Search student..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 relative group">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Grade</p>
                    <div className="relative">
                        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20 group-hover:scale-110 transition-transform" size={20} />
                        <select 
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-5 pl-14 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                        >
                            {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 relative group">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-1">Select Month</p>
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20 group-hover:scale-110 transition-transform" size={20} />
                        <select 
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full bg-gray-50 border-none rounded-2xl p-5 pl-14 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                        >
                            {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {marksStudents.length > 0 ? (
                <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <div>
                            <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{selectedGrade} - {selectedMonth} Exam</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Enter marks out of 100 for each student</p>
                        </div>
                        <div className="flex gap-4">
                             <label className="cursor-pointer px-5 py-3 border-2 border-primary/20 text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center space-x-2">
                                <Upload size={14} />
                                <span>Bulk Upload (CSV)</span>
                                <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
                             </label>
                             <button 
                                onClick={handleSaveAll}
                                disabled={isSaving}
                                className="bg-primary hover:bg-secondary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center space-x-2"
                            >
                                {isSaving ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        <span>Save All Marks</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100/50 border-b border-gray-100 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Student Info</th>
                                    <th className="px-8 py-5 w-48 text-center">Exam Marks (%)</th>
                                    <th className="px-8 py-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredStudents.map((stu) => (
                                    <tr key={stu.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-xs">
                                                    {stu.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 leading-none mb-1">{stu.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">{stu.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <input 
                                                type="number" 
                                                min="0"
                                                max="100"
                                                value={tempMarks[stu.id] === undefined ? '' : tempMarks[stu.id]}
                                                onChange={(e) => updateMark(stu.id, e.target.value)}
                                                placeholder="00"
                                                className="w-24 bg-gray-50 border-2 border-transparent rounded-2xl p-4 text-center text-sm font-black text-primary focus:border-primary/20 focus:bg-white outline-none transition-all"
                                            />
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {tempMarks[stu.id] !== undefined && tempMarks[stu.id] !== '' ? (
                                                <span className="flex items-center justify-end space-x-1 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 size={14} />
                                                    <span>Entered</span>
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest italic">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                    <Users className="text-gray-100 mx-auto mb-6" size={64} />
                    <h4 className="text-xl font-black text-gray-900 mb-2">No Students Registered</h4>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto">There are no students listed for {selectedGrade} yet.</p>
                </div>
            )}
        </div>
    );
};

const HomeworkContent = ({ students }) => {
    const [selectedWeek, setSelectedWeek] = useState('Week 01');
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');
    const [homeworkStudents, setHomeworkStudents] = useState([]);
    const [tempMarks, setTempMarks] = useState({}); // { studentId: mark }
    const [isSaving, setIsSaving] = useState(false);

    // Auto-load list when selection changes
    useEffect(() => {
        const filtered = students.filter(s => s.grade === selectedGrade);
        setHomeworkStudents(filtered);
        
        const allMarks = JSON.parse(localStorage.getItem('all_homework_marks') || '[]');
        const existingMarks = {};
        allMarks.forEach(m => {
            if (m.week === selectedWeek && m.grade === selectedGrade) {
                existingMarks[m.studentId] = m.mark;
            }
        });
        setTempMarks(existingMarks);
    }, [selectedGrade, selectedWeek, students]);

    const updateMark = (studentId, mark) => {
        setTempMarks(prev => ({
            ...prev,
            [studentId]: mark
        }));
    };

    const handleSaveAll = () => {
        setIsSaving(true);
        setTimeout(() => {
            const allMarks = JSON.parse(localStorage.getItem('all_homework_marks') || '[]');
            let updatedMarks = allMarks.filter(m => !(m.week === selectedWeek && m.grade === selectedGrade));
            
            Object.keys(tempMarks).forEach(stuId => {
                updatedMarks.push({
                    studentId: stuId,
                    grade: selectedGrade,
                    week: selectedWeek,
                    mark: tempMarks[stuId],
                    date: new Date().toLocaleDateString(),
                    timestamp: Date.now()
                });
            });

            localStorage.setItem('all_homework_marks', JSON.stringify(updatedMarks));
            window.dispatchEvent(new Event('storage'));
            setIsSaving(false);
            alert('සියලුම ලකුණු සාර්ථකව සුරැකුවා! (All marks saved successfully!)');
        }, 800);
    };

    const markedCount = Object.keys(tempMarks).length;

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-[30px] flex items-center justify-center mb-2">
                        <FileSpreadsheet className="text-primary" size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">Homework Management</h3>
                        <p className="text-gray-600 font-extrabold text-sm mt-2">Filter by grade and week to start marking.</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-2xl">
                        {/* Week Selection */}
                        <div className="relative w-full sm:w-1/2 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary z-20 group-hover:scale-110 transition-transform">
                                <Calendar size={18} />
                            </div>
                            <select 
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700"
                            >
                                {['Week 01', 'Week 02', 'Week 03', 'Week 04'].map(w => <option key={w} value={w}>{w}</option>)}
                            </select>
                        </div>

                        {/* Grade Selection */}
                        <div className="relative w-full sm:w-1/2 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary z-20 group-hover:scale-110 transition-transform">
                                <GraduationCap size={18} />
                            </div>
                            <select 
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700"
                            >
                                {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {homeworkStudents.length > 0 ? (
                <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <div>
                            <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight">{selectedGrade} - {selectedWeek}</h4>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Assign grades and click save at the bottom</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-[11px] font-black">
                                {markedCount}/{homeworkStudents.length} Marked
                            </span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100/50 border-b border-gray-100 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Student Details</th>
                                    <th className="px-8 py-5 text-center">Marking (A-W)</th>
                                    <th className="px-8 py-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {homeworkStudents.map((stu) => (
                                    <tr key={stu.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-gray-900 mb-1">{stu.name}</p>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{stu.id}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center gap-2">
                                                {['A','B','C','S','W'].map(grade => {
                                                    const isSelected = tempMarks[stu.id] === grade;
                                                    return (
                                                        <button 
                                                            key={grade} 
                                                            onClick={() => updateMark(stu.id, grade)}
                                                            className={`w-10 h-10 rounded-xl border font-black text-xs transition-all ${
                                                                isSelected 
                                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-110' 
                                                                : 'border-gray-100 text-gray-400 hover:border-primary/30 hover:text-primary'
                                                            }`}
                                                        >
                                                            {grade}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {tempMarks[stu.id] ? (
                                                <span className="flex items-center justify-end space-x-1 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                                    <CheckCircle2 size={14} />
                                                    <span>Marked</span>
                                                </span>
                                            ) : (
                                                <span className="text-gray-300 text-[10px] font-black uppercase tracking-widest italic">Pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-center">
                        <button 
                            disabled={isSaving}
                            onClick={handleSaveAll}
                            className="bg-primary hover:bg-secondary text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center space-x-3"
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Save All Marks</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                    <Users className="text-gray-100 mx-auto mb-6" size={64} />
                    <h4 className="text-xl font-black text-gray-900 mb-2">No Students Found</h4>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto">There are no students registered for {selectedGrade} yet.</p>
                </div>
            )}
        </div>
    );
};

const RecordingContent = () => {
    const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');
    const [recordings, setRecordings] = useState(() => {
        const saved = localStorage.getItem('class_recordings');
        return saved ? JSON.parse(saved) : [];
    });

    const [newRec, setNewRec] = useState({
        link: '',
        lessonNo: '',
        date: new Date().toISOString().split('T')[0],
        grade: 'Grade 11',
        title: '',
        type: 'Theory'
    });

    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleUpload = () => {
        if (!newRec.link || !newRec.title) {
            alert('කරුණාකර මාතෘකාව සහ YouTube ලිංක් එක ඇතුළත් කරන්න. (Please enter title and link)');
            return;
        }
        
        const videoId = extractVideoId(newRec.link);
        const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg';
        
        const updated = [{ ...newRec, id: Date.now(), thumbnail, videoId }, ...recordings];
        setRecordings(updated);
        localStorage.setItem('class_recordings', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        
        setNewRec({
            ...newRec,
            link: '',
            title: '',
            lessonNo: (parseInt(newRec.lessonNo) + 1).toString() || ''
        });
        alert('Recording එක සාර්ථකව ඇතුළත් කළා! (Recording uploaded successfully!)');
    };

    const handleDelete = (id) => {
        if (window.confirm('මෙම recording එක ඉවත් කිරීමට ඔබට විශ්වාසද?')) {
            const updated = recordings.filter(r => r.id !== id);
            setRecordings(updated);
            localStorage.setItem('class_recordings', JSON.stringify(updated));
            window.dispatchEvent(new Event('storage'));
        }
    };

    const filteredRecordings = recordings.filter(r => r.grade === selectedGrade);

    return (
        <div className="space-y-8">
            <div className="bg-primary rounded-[50px] p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full -mb-32 -mr-32 blur-3xl"></div>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex-1 max-w-md">
                        <div className="bg-white/20 p-3 rounded-2xl w-fit mb-6">
                            <Youtube className="text-white" size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-3 tracking-tighter">Add Recording</h3>
                        <p className="text-white/70 font-bold leading-relaxed">Publish lesson recordings by selecting the grade and class type.</p>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Title / Lesson Name</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Lesson 01 - Basics" 
                                    value={newRec.title}
                                    onChange={(e) => setNewRec({...newRec, title: e.target.value})}
                                    className="w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-6 py-4 text-sm font-bold text-white outline-none focus:bg-white/20"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">YouTube Link</label>
                                <input 
                                    type="text" 
                                    placeholder="Paste URL here..." 
                                    value={newRec.link}
                                    onChange={(e) => setNewRec({...newRec, link: e.target.value})}
                                    className="w-full bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 px-6 py-4 text-sm font-bold text-white outline-none focus:bg-white/20"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1 relative group">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Grade</label>
                                <div className="relative">
                                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors" size={16} />
                                    <select 
                                        value={newRec.grade}
                                        onChange={(e) => setNewRec({...newRec, grade: e.target.value})}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 pl-12 text-xs font-bold text-white outline-none focus:bg-white/20 appearance-none cursor-pointer [&>option]:text-gray-900"
                                    >
                                        {grades.map(g => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1 relative group">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Type</label>
                                <div className="relative">
                                    <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors" size={16} />
                                    <select 
                                        value={newRec.type}
                                        onChange={(e) => setNewRec({...newRec, type: e.target.value})}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 pl-12 text-xs font-bold text-white outline-none focus:bg-white/20 appearance-none cursor-pointer [&>option]:text-gray-900"
                                    >
                                        <option value="Theory">Theory</option>
                                        <option value="Revision">Revision</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Lesson No</label>
                                <input 
                                    type="number" 
                                    placeholder="01" 
                                    value={newRec.lessonNo}
                                    onChange={(e) => setNewRec({...newRec, lessonNo: e.target.value})}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:bg-white/20 appearance-none" 
                                />
                            </div>
                            <div className="space-y-1 flex flex-col">
                                <label className="text-[10px] font-black text-white/50 uppercase tracking-widest ml-1">Date</label>
                                <input 
                                    type="date" 
                                    value={newRec.date}
                                    onChange={(e) => setNewRec({...newRec, date: e.target.value})}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-xs font-bold text-white outline-none focus:bg-white/20 appearance-none" 
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleUpload}
                            className="w-full bg-white text-primary py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center space-x-2"
                        >
                            <PlayCircle size={18} />
                            <span>Upload Recording</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit mx-auto md:mx-0">
                {grades.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                            selectedGrade === grade 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-gray-600 hover:text-primary hover:bg-white/50'
                        }`}
                    >
                        {grade}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecordings.length > 0 ? filteredRecordings.map((rec) => (
                    <div key={rec.id} className="bg-white rounded-[40px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
                        <div className="aspect-video bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 backdrop-blur-[2px]">
                                <PlayCircle className="text-white" size={48} />
                            </div>
                            <img src={rec.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Thumbnail" />
                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                                <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg border border-primary/10 w-fit">
                                    Lesson {rec.lessonNo.padStart(2, '0')}
                                </span>
                                <span className="bg-secondary/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg w-fit">
                                    {rec.type}
                                </span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h4 className="font-black text-gray-900 text-lg transition-colors group-hover:text-primary tracking-tight mb-2 leading-snug">
                                {rec.title}
                            </h4>
                            <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest mb-6">
                                {rec.grade} • {rec.type}
                            </p>
                            <div className="flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] border-t border-gray-100 pt-6">
                                <span className="flex items-center space-x-2">
                                    <Clock size={12} />
                                    <span>{new Date(rec.date).toLocaleDateString()}</span>
                                </span>
                                <button 
                                    onClick={() => handleDelete(rec.id)}
                                    className="text-red-500 hover:text-red-600 font-black hover:underline transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                        <Video className="mx-auto mb-4 text-gray-200" size={48} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No recordings found for {selectedGrade}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

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
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">
                            {editingId ? 'Edit Video Highlight' : 'Add New Highlight'}
                        </h3>
                        <p className="text-gray-600 font-black text-[11px] uppercase tracking-widest mt-1">Manage content for the homepage "Free Lessons" section</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest ml-1">Video Title</label>
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
                        <label className="text-[11px] font-black text-gray-600 uppercase tracking-widest ml-1">YouTube Video Link</label>
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
                        <h4 className="font-black text-base text-gray-900 leading-tight mb-2">{newVideo.title || 'Untitled Lesson'}</h4>
                        <p className="text-xs font-black text-gray-600 leading-relaxed italic">{newVideo.description || 'No description provided'}</p>
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
                    <h4 className="text-xl font-black text-gray-900">Current Highlights ({videos.length})</h4>
                    <span className="text-[11px] text-gray-600 font-extrabold uppercase tracking-widest">Homepage Section</span>
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
