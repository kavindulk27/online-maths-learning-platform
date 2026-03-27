import { useState, useEffect } from 'react';
import { FileSpreadsheet, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axios';

const HomeworkSection = ({ student }) => {
    const [homework, setHomework] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomework = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('academic/marks/');
                const hwMarks = response.data.filter(m => m.type === 'homework');
                setHomework(hwMarks);
            } catch (error) {
                console.error('Error fetching homework:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHomework();
    }, [student.id]);

    if (loading) {
        return (
            <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
                <Loader2 className="animate-spin text-primary mx-auto" size={48} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 uppercase tracking-widest text-[10px] font-black text-gray-400">
                        <tr>
                            <th className="px-8 py-5">Subject / විෂය</th>
                            <th className="px-8 py-5 text-center">Score / ලකුණු</th>
                            <th className="px-8 py-5">Remarks / සටහන</th>
                            <th className="px-8 py-5 text-right">Date / දිනය</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {homework.length > 0 ? [...homework].sort((a,b) => new Date(b.date) - new Date(a.date)).map((hw, idx) => {
                            const pct = Math.round((hw.score / hw.total_possible) * 100);
                            return (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-6 text-sm font-black text-gray-800 uppercase">{hw.subject}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`inline-flex items-center justify-center w-12 h-10 rounded-xl font-black text-sm shadow-sm ${
                                            pct >= 75 ? 'bg-green-100 text-green-600' : 
                                            pct >= 50 ? 'bg-blue-100 text-blue-600' : 
                                            pct >= 35 ? 'bg-yellow-100 text-yellow-600' : 
                                            'bg-gray-100 text-gray-500'
                                        }`}>
                                            {hw.score}/{hw.total_possible}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[11px] font-bold text-gray-500">{hw.remarks || '—'}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="text-[11px] font-bold text-gray-400">{new Date(hw.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="4" className="px-8 py-20 text-center">
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

export default HomeworkSection;
