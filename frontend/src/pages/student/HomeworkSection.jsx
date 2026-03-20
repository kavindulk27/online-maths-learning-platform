import { useState } from 'react';
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

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

export default HomeworkSection;
