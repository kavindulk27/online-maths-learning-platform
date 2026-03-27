import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search,
    CheckCircle2,
    XCircle,
    Eye,
    CreditCard,
    Image as ImageIcon,
    X,
    Loader2,
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const PaymentApprovals = ({ students, setStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('All Grades');
    const [viewingReceipt, setViewingReceipt] = useState(null);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const grades = ['All Grades', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('payments/');
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const handleStatusUpdate = async (paymentId, newStatus) => {
        try {
            await axiosInstance.patch(`payments/${paymentId}/`, { status: newStatus });
            
            // Update local payments list
            setPayments(prev => prev.map(p => p.id === paymentId ? { ...p, status: newStatus } : p));
            
            // Sync with students list in Admin.jsx
            const payment = payments.find(p => p.id === paymentId);
            if (payment && setStudents) {
                const studentUsername = payment.student_details?.username;
                const newDisplayStatus = newStatus === 'approved' ? 'Paid' : (newStatus === 'pending' ? 'Pending' : 'Unpaid');
                
                setStudents(prev => prev.map(s => 
                    s.id === studentUsername ? { ...s, status: newDisplayStatus } : s
                ));
            }
        } catch (error) {
            console.error('Error updating payment status:', error);
            alert('Error updating status.');
        }
    };

    const filteredPayments = payments.filter(p => {
        const query = searchTerm.toLowerCase();
        const student = p.student_details || {}; // I'll update serializer to include student_details
        const studentName = student.first_name || student.username || '';
        const studentId = student.username || '';
        
        const matchesSearch = studentName.toLowerCase().includes(query) || studentId.toLowerCase().includes(query);
        const matchesGrade = selectedGrade === 'All Grades' || p.grade === selectedGrade; 
        
        if (searchTerm) return matchesSearch && matchesGrade;
        return (p.status === 'pending' || p.status === 'Pending' || p.status === 'approved' || p.status === 'Approved') && matchesGrade;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 leading-none mb-1">Payment Approvals & Manual Search</h3>
                    <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest">Approve pending receipts from students</p>
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
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">Month</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-600 uppercase tracking-widest text-right">Approve/Reject</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((p, i) => {
                                    const student = p.student_details || {};
                                    const name = student.first_name || student.username || 'Unknown';
                                    const id = student.username || 'N/A';
                                    
                                    return (
                                        <tr key={p.id} className="hover:bg-gray-50/30 transition-colors group">
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center font-black text-xs">
                                                        {name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-800 leading-none mb-1">{name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-700">{p.grade}</span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className="text-sm font-bold text-gray-500">{p.month}</span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    p.status === 'approved' ? 'bg-green-100 text-green-600' : 
                                                    (p.status === 'pending' || p.status === 'Pending') ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end space-x-3">
                                                    {p.receipt_image && (
                                                        <button 
                                                            onClick={() => setViewingReceipt(p)}
                                                            className="p-2.5 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm group"
                                                            title="View Payment Receipt"
                                                        >
                                                            <Eye size={16} />
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => handleStatusUpdate(p.id, p.status === 'approved' ? 'rejected' : 'approved')}
                                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center space-x-2 ${
                                                            p.status === 'approved' 
                                                            ? 'bg-red-500 text-white shadow-red-100' 
                                                            : 'bg-green-500 text-white shadow-green-100'
                                                        }`}
                                                    >
                                                        {p.status === 'approved' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                                                        <span>{p.status === 'approved' ? 'Reject' : 'Approve'}</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <CreditCard className="text-gray-200 mb-4" size={48} />
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No pending payments found</p>
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
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Student: {viewingReceipt.student_details?.first_name || viewingReceipt.student_details?.username} ({viewingReceipt.student_details?.username})</p>
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
                                    src={viewingReceipt.receipt_image} 
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
                                        handleStatusUpdate(viewingReceipt.id, 'approved');
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
