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
    LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('payments');

    const menuItems = [
        { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
        { id: 'marks', label: 'Student Marks', icon: <GraduationCap size={20} /> },
        { id: 'homework', label: 'Homework', icon: <FileSpreadsheet size={20} /> },
        { id: 'classes', label: 'Zoom Links', icon: <Video size={20} /> },
        { id: 'recordings', label: 'Recordings', icon: <PlayCircle size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col shadow-2xl z-20">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white p-1 rounded-lg shadow-lg shadow-black/20">
                            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Admin</h1>
                            <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Dashboard</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-white text-primary shadow-lg font-bold' 
                                : 'text-white/80 hover:bg-white/10'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10">
                    <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 transition-all font-medium">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center shadow-sm relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
                        <p className="text-gray-500 text-sm">Welcome back, Math Teacher Admin!</p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search student..." 
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all w-64 text-sm"
                            />
                        </div>
                        <div className="flex items-center space-x-3 border-l pl-6 border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800 leading-none">Admin Teacher</p>
                                <p className="text-[10px] text-secondary font-bold uppercase mt-1">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary">
                                <Users size={20} className="text-primary" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'payments' && <PaymentContent />}
                            {activeTab === 'marks' && <MarksContent />}
                            {activeTab === 'homework' && <HomeworkContent />}
                            {activeTab === 'classes' && <ClassContent />}
                            {activeTab === 'recordings' && <RecordingContent />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

/* Content Components */

const PaymentContent = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Pending Approvals</h3>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">4 New Requests</span>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student Details</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Receipt</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">John Doe</p>
                                        <p className="text-xs text-gray-500">ID: STU-2024-00{i}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-600 font-medium">Grade 11 - Batch A</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-secondary text-xs font-bold flex items-center space-x-1 hover:underline">
                                    <span>View Image</span>
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Mar 12, 2024
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right space-x-2 text-xs font-bold uppercase tracking-widest leading-none">
                                <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-sm transition-all inline-flex items-center space-x-1">
                                    <CheckCircle2 size={14} />
                                    <span>Approve</span>
                                </button>
                                <button className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-sm transition-all inline-flex items-center space-x-1">
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
);

const MarksContent = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Grade</p>
                <select className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 outline-none">
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option selected>Grade 11</option>
                </select>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Month</p>
                <select className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 outline-none">
                    <option>January</option>
                    <option>February</option>
                    <option selected>March</option>
                </select>
            </div>
            <div className="md:col-span-2 flex items-end">
                <button className="bg-primary text-white w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]">
                    <Plus size={20} />
                    <span>Bulk Upload Marks</span>
                </button>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             {/* List of students to enter marks */}
             <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                 <h4 className="font-bold text-gray-800">Enter Individual Marks</h4>
                 <div className="flex space-x-2">
                     <button className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-secondary transition-colors">Export Template</button>
                     <button className="px-4 py-2 bg-white border border-secondary text-secondary rounded-lg text-xs font-bold">Save All Changes</button>
                 </div>
             </div>
             <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Student ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">Marks (%)</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 text-sm font-mono font-bold text-gray-500">STU-11-00{i}</td>
                            <td className="px-6 py-4 text-sm font-bold text-gray-800">Amila Perera</td>
                            <td className="px-6 py-4">
                                <input type="number" className="w-20 bg-gray-50 border border-gray-200 rounded-lg p-2 text-center text-sm font-bold text-secondary focus:border-secondary outline-none" placeholder="00" />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2"></span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>
    </div>
);

const HomeworkContent = () => (
    <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="text-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Weekly Homework Grades</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-md mx-auto">Select the week and grade to input homework results. Grades allowed: A, B, C, S, W.</p>
            
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
                <select className="bg-gray-50 border-gray-100 rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                    <option>Week 01</option>
                    <option>Week 02</option>
                    <option>Week 03</option>
                    <option>Week 04</option>
                </select>
                <select className="bg-gray-50 border-gray-100 rounded-xl p-4 font-bold text-sm outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary">
                    <option>Grade 11</option>
                    <option>Grade 10</option>
                </select>
                <button className="bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">Load Data</button>
            </div>
        </div>
    </div>
);

const ClassContent = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Live Class Management</h3>
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg active:scale-95 transition-all">
                <Plus size={20} />
                <span>Schedule New Class</span>
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map(i => (
                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="relative z-10 flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-3">Live Now</span>
                                <h4 className="text-lg font-bold text-gray-800">Grade 11 - Pure Mathematics</h4>
                                <p className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
                                    <Clock size={14} />
                                    <span>Starts at 8:00 PM (Every Monday)</span>
                                </p>
                            </div>
                            <div className="bg-white shadow-xl p-4 rounded-2xl border border-gray-100 text-center min-w-24">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Students</p>
                                <p className="text-2xl font-black text-secondary">142</p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-50">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Zoom Meeting Link</label>
                            <div className="flex space-x-2">
                                <input 
                                    type="text" 
                                    className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-3 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                                    defaultValue="https://zoom.us/j/123456789"
                                />
                                <button className="bg-primary text-white px-4 py-3 rounded-xl font-bold shadow-md hover:bg-secondary transition-colors">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const RecordingContent = () => (
    <div className="space-y-6">
        <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Upload Lesson Recording</h3>
                    <p className="text-white/80">Add YouTube links for previous class recordings to the student portal.</p>
                </div>
                <div className="flex-1 w-full md:w-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex space-x-2">
                        <input 
                            type="text" 
                            placeholder="Paste YouTube Link here..." 
                            className="bg-transparent border-none text-white placeholder-white/50 flex-1 outline-none px-2 font-medium"
                        />
                        <button className="bg-white text-secondary px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors active:scale-95">
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="text-white" size={48} />
                        </div>
                        <img src={`https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-gray-800 transition-colors group-hover:text-secondary">Lesson 0{i}: Advanced Geometry</h4>
                             <span className="bg-gray-100 text-gray-500 text-[10px] font-black p-1 rounded uppercase">Grade 11</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                            <span>Uploaded: Mar 10, 2024</span>
                            <button className="text-red-500 hover:underline">Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Admin;
