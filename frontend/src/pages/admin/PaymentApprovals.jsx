import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search,
    CheckCircle2,
    XCircle,
    Eye,
    CreditCard,
    Image as ImageIcon,
    X,
} from 'lucide-react';

const PaymentApprovals = ({ students, setStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All Grades');
    const [viewingReceipt, setViewingReceipt] = useState(null);

    const grades = ['All Grades', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

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
        const matchesGrade = selectedGrade === 'All Grades' || s.grade === selectedGrade;
        
        if (searchTerm) return matchesSearch && matchesGrade;
        return s.status === 'Pending' && matchesGrade;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 leading-none mb-1">Payment Approvals & Manual Search</h3>
                    <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest">Approve pending receipts or search any student for manual activation</p>
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
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">
                                    <div className="flex items-center space-x-2">
                                        <span>Class/Grade</span>
                                        <select 
                                            value={selectedGrade}
                                            onChange={(e) => setSelectedGrade(e.target.value)}
                                            className="bg-transparent border-none text-[10px] font-black text-primary uppercase focus:ring-0 cursor-pointer hover:underline"
                                        >
                                            {grades.map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                </th>
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

export default PaymentApprovals;
