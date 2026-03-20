import { useState, useEffect } from 'react';
import { 
    Search,
    GraduationCap,
    Calendar,
    Save,
    CheckCircle2,
    Users,
    Upload,
} from 'lucide-react';

const ExamMarks = ({ students }) => {
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
            
            let updatedMarks = allMarks.filter(m => !(m.month === selectedMonth && m.grade === selectedGrade));
            
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

export default ExamMarks;
