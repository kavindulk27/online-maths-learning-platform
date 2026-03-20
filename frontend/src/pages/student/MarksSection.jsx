import { useState, useEffect } from 'react';
import { Trophy, Users } from 'lucide-react';

const MarksSection = ({ student }) => {
    const [performance, setPerformance] = useState([]);
    
    useEffect(() => {
        const calculateStats = () => {
            const allMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');
            
            // Normalize current student grade
            const normalizedStudentGrade = student.grade?.startsWith('Grade ') ? student.grade : `Grade ${student.grade?.trim()}`;
            
            // Group all marks by month for ranking within the same grade
            const monthlyStats = {};
            allMarks.forEach(m => {
                const normalizedMarkGrade = m.grade?.startsWith('Grade ') ? m.grade : `Grade ${m.grade?.trim()}`;
                
                if (normalizedMarkGrade === normalizedStudentGrade) {
                    if (!monthlyStats[m.month]) monthlyStats[m.month] = [];
                    monthlyStats[m.month].push(m);
                }
            });

            // Calculate student-specific stats for each month
            const result = Object.keys(monthlyStats).map(month => {
                const monthMarks = monthlyStats[month].sort((a, b) => b.marks - a.marks);
                const studentEntry = monthMarks.find(m => m.studentId === student.id);
                
                if (!studentEntry) return null;

                const rank = monthMarks.findIndex(m => m.studentId === student.id) + 1;
                const totalInClass = monthMarks.length;
                const average = monthMarks.reduce((acc, curr) => acc + curr.marks, 0) / totalInClass;
                const topMark = monthMarks[0].marks;

                return {
                    month,
                    myMark: studentEntry.marks,
                    rank,
                    totalInClass,
                    average: Math.round(average),
                    topMark,
                    status: rank <= 3 ? 'Top Performer' : rank <= 10 ? 'Excellent' : studentEntry.marks >= 75 ? 'Very Good' : 'Improving'
                };
            }).filter(r => r !== null);

            setPerformance(result.sort((a, b) => {
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                return months.indexOf(b.month) - months.indexOf(a.month);
            }));
        };

        calculateStats();
        window.addEventListener('storage', calculateStats);
        return () => window.removeEventListener('storage', calculateStats);
    }, [student.id, student.grade]);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {performance.length > 0 ? (
                <>
                    {/* Hero Stats Card */}
                    <div className="bg-gradient-to-br from-primary to-secondary rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div className="space-y-2">
                                <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.2em]">Current Standing</p>
                                <h3 className="text-5xl font-black">Rank #{performance[0].rank}</h3>
                                <p className="text-white/80 font-bold">in {student.grade} - {performance[0].month}</p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                        <Trophy size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Efficiency</p>
                                        <p className="text-lg font-black">{performance[0].myMark}% Score</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:justify-end">
                                <div className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest border-2 ${
                                    performance[0].rank <= 3 ? 'bg-yellow-400 text-gray-900 border-yellow-300' : 'bg-white/10 text-white border-white/20'
                                } shadow-xl`}>
                                    {performance[0].status}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* History Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {performance.map((m, i) => (
                            <div key={i} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Trophy size={24} />
                                    </div>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.month} Exam</span>
                                </div>
                                
                                <div className="space-y-1 mb-8">
                                    <h4 className="text-4xl font-black text-gray-800">{m.myMark}<span className="text-lg text-gray-300 ml-1">%</span></h4>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                                        m.myMark >= m.average ? 'text-green-500' : 'text-red-400'
                                    }`}>
                                        {m.myMark >= m.average ? 'Above' : 'Below'} Class Average ({m.average}%)
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center space-x-2 text-gray-500 font-bold text-sm">
                                        <Users size={16} className="text-gray-300" />
                                        <span>Rank: <span className="font-black text-gray-800">#{m.rank}</span></span>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                                        of {m.totalInClass} Students
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-white rounded-[40px] p-20 text-center border border-gray-100 shadow-sm">
                    <Trophy className="text-gray-100 mx-auto mb-6" size={64} />
                    <h4 className="text-xl font-black text-gray-900 mb-2">No Exam Marks Recorded</h4>
                    <p className="text-gray-500 font-bold max-w-sm mx-auto">Your monthly exam results will appear here once they are released by the teacher.</p>
                </div>
            )}
        </div>
    );
};

export default MarksSection;
