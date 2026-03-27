import { 
    Users,
    CheckCircle2,
    CreditCard,
    Video,
    ChevronRight,
    UserPlus,
} from 'lucide-react';

const Dashboard = ({ stats }) => {
    const totalStudents = stats?.total_students || 0;
    const pendingPayments = stats?.pending_payments || 0;
    const totalRevenue = stats?.total_revenue || 0;
    const newStudents = stats?.new_students_this_month || 0;

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: <Users size={24} />, color: 'bg-blue-500' },
                    { label: 'New This Month', value: newStudents.toLocaleString(), icon: <UserPlus size={24} />, color: 'bg-green-500' },
                    { label: 'Pending Approvals', value: pendingPayments.toLocaleString(), icon: <CreditCard size={24} />, color: 'bg-orange-500' },
                    { label: 'Total Revenue', value: `Rs. ${totalRevenue.toLocaleString()}`, icon: <CheckCircle2 size={24} />, color: 'bg-purple-500' },
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
                                {cls.status === 'Live' ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                        <span className="text-sm font-black text-red-600 uppercase tracking-widest animate-pulse">
                                            Live Now
                                        </span>
                                    </div>
                                ) : (
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-400">
                                        {cls.status}
                                    </span>
                                )}
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

export default Dashboard;
