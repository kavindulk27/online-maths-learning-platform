import { useState, useEffect } from 'react';
import { 
    GraduationCap,
    Calendar,
    FileSpreadsheet,
    Save,
    CheckCircle2,
    Users,
    ChevronDown,
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const HomeworkMarks = ({ students }) => {
    const [selectedWeek, setSelectedWeek] = useState('Week 01');
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');
    const [homeworkStudents, setHomeworkStudents] = useState([]);
    const [tempMarks, setTempMarks] = useState({}); // { studentId: mark }
    const [isSaving, setIsSaving] = useState(false);

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

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const gradeScore = { 'A': 90, 'B': 75, 'C': 60, 'S': 45, 'W': 30 };
            const promises = Object.keys(tempMarks).map(stuId => {
                const stu = homeworkStudents.find(s => s.id === stuId);
                if (!stu) return null;
                return axiosInstance.post('academic/marks/', {
                    student: stu.userId || stuId,
                    type: 'homework',
                    subject: selectedWeek,
                    score: gradeScore[tempMarks[stuId]] || 0,
                    total_possible: 100,
                    date: today,
                    remarks: tempMarks[stuId],
                });
            }).filter(Boolean);

            await Promise.all(promises);
            alert('සියලුම ලකුණු සාර්ථකව සුරැකුවා! (All marks saved successfully!)');
        } catch (error) {
            console.error('Error saving homework:', error);
            alert('Error saving homework marks.');
        } finally {
            setIsSaving(false);
        }
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
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 pr-12 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700"
                            >
                                {['Week 01', 'Week 02', 'Week 03', 'Week 04'].map(w => <option key={w} value={w}>{w}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-primary z-30 pointer-events-none" size={16} />
                        </div>

                        {/* Grade Selection */}
                        <div className="relative w-full sm:w-1/2 group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary z-20 group-hover:scale-110 transition-transform">
                                <GraduationCap size={18} />
                            </div>
                            <select 
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 pr-12 font-black text-xs uppercase tracking-widest outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all appearance-none cursor-pointer text-gray-700"
                            >
                                {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-primary z-30 pointer-events-none" size={16} />
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

export default HomeworkMarks;
