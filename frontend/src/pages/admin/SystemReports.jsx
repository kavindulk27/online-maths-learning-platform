import { useState } from 'react';
import { 
    GraduationCap,
    BarChart3,
    Users,
    TrendingUp,
    Download,
    Award,
    Target,
} from 'lucide-react';

// Helper sub-component for report card
const StudentReportCard = ({ student, examMarks, homeworkMarks }) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    const weeks = ['Week 01', 'Week 02', 'Week 03', 'Week 04'];

    const stuExamMarks = examMarks.filter(m => m.studentId === student.id);
    const stuHomeworkMarks = homeworkMarks.filter(m => m.studentId === student.id);

    const avgMark = stuExamMarks.length > 0
        ? (stuExamMarks.reduce((sum, m) => sum + (parseFloat(m.marks) || 0), 0) / stuExamMarks.length).toFixed(1)
        : 'N/A';

    const getGradeColor = (mark) => {
        if (mark >= 75) return 'text-green-600 bg-green-100';
        if (mark >= 60) return 'text-blue-600 bg-blue-100';
        if (mark >= 40) return 'text-yellow-600 bg-yellow-100';
        return 'text-red-600 bg-red-100';
    };

    const gradeColorClass = avgMark !== 'N/A' ? getGradeColor(parseFloat(avgMark)) : 'text-gray-400 bg-gray-100';

    return (
        <div className="bg-white rounded-[30px] border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-sm">
                        {student.name[0]}
                    </div>
                    <div>
                        <h4 className="font-black text-gray-900 text-sm leading-none mb-1">{student.name}</h4>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{student.id}</p>
                    </div>
                </div>
                <div className={`text-center px-4 py-2 rounded-xl ${gradeColorClass}`}>
                    <p className="text-xs font-black">{avgMark === 'N/A' ? 'N/A' : `${avgMark}%`}</p>
                    <p className="text-[8px] font-black uppercase tracking-widest">Avg</p>
                </div>
            </div>

            <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Exam Marks by Month</p>
                <div className="flex flex-wrap gap-2">
                    {months.map(month => {
                        const mark = stuExamMarks.find(m => m.month === month);
                        return (
                            <div key={month} className="text-center">
                                <div className={`w-10 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                                    mark ? getGradeColor(parseFloat(mark.marks)) : 'bg-gray-50 text-gray-300'
                                }`}>
                                    {mark ? mark.marks : '-'}
                                </div>
                                <p className="text-[8px] text-gray-400 font-bold mt-1">{month.slice(0, 3)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Homework Grades by Week</p>
                <div className="flex gap-2">
                    {weeks.map(week => {
                        const mark = stuHomeworkMarks.find(m => m.week === week);
                        return (
                            <div key={week} className="text-center">
                                <div className={`w-10 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                                    mark ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-300'
                                }`}>
                                    {mark ? mark.mark : '-'}
                                </div>
                                <p className="text-[8px] text-gray-400 font-bold mt-1">{week.slice(-2)}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const SystemReports = ({ students }) => {
    const [selectedGrade, setSelectedGrade] = useState('Grade 11');

    const examMarks = JSON.parse(localStorage.getItem('all_exam_marks') || '[]');
    const homeworkMarks = JSON.parse(localStorage.getItem('all_homework_marks') || '[]');
    const classSchedules = JSON.parse(localStorage.getItem('class_schedules') || '[]');

    const gradeStudents = students.filter(s => s.grade === selectedGrade);
    const approvedStudents = students.filter(s => s.status === 'Approved');

    const totalRevenue = approvedStudents.reduce((sum, s) => {
        const gradeNum = parseInt(s.grade?.replace(/\D/g, '') || '0');
        return sum + (gradeNum <= 9 ? 800 : 1000);
    }, 0);

    // Generate and download attendance report CSV
    const handleExportAttendance = () => {
        const rows = [['Student ID', 'Name', 'Grade', 'Payment Status']];
        students.forEach(s => {
            rows.push([s.id, s.name, s.grade, s.status]);
        });
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'student_report.csv';
        a.click();
    };

    // Generate and download marks report CSV  
    const handleExportMarks = () => {
        const rows = [['Student ID', 'Name', 'Grade', 'Month', 'Exam Marks']];
        examMarks.forEach(m => {
            const stu = students.find(s => s.id === m.studentId);
            if (stu) rows.push([stu.id, stu.name, stu.grade, m.month, m.marks]);
        });
        const csv = rows.map(r => r.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'exam_marks_report.csv';
        a.click();
    };

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-black text-gray-900">Academic Performance Reports</h3>
                <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">Analytics and performance insights</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Students', value: students.length, icon: <Users size={20} />, color: 'bg-blue-500' },
                    { label: 'Approved', value: approvedStudents.length, icon: <Award size={20} />, color: 'bg-green-500' },
                    { label: 'Marks Entered', value: examMarks.length, icon: <Target size={20} />, color: 'bg-purple-500' },
                    { label: 'Classes Active', value: classSchedules.filter(c => c.status === 'Live').length, icon: <TrendingUp size={20} />, color: 'bg-orange-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
                        <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg flex-shrink-0`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-xl font-black text-gray-900">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            {/* Export Buttons */}
            <div className="flex flex-wrap gap-4">
                <button 
                    onClick={handleExportAttendance}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
                >
                    <Download size={16} />
                    <span>Export Student Report</span>
                </button>
                <button 
                    onClick={handleExportMarks}
                    className="bg-secondary hover:bg-primary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-secondary/20 flex items-center space-x-2"
                >
                    <Download size={16} />
                    <span>Export Marks Report</span>
                </button>
            </div>

            {/* Grade selector + report cards */}
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">View Reports for:</label>
                    <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={16} />
                        <select value={selectedGrade} onChange={e => setSelectedGrade(e.target.value)}
                            className="bg-white border border-gray-100 rounded-2xl py-3 pl-10 pr-6 text-sm font-black text-gray-700 outline-none appearance-none cursor-pointer shadow-sm">
                            {['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{gradeStudents.length} students</span>
                </div>

                {gradeStudents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {gradeStudents.map(stu => (
                            <StudentReportCard 
                                key={stu.id} 
                                student={stu}
                                examMarks={examMarks}
                                homeworkMarks={homeworkMarks}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] p-16 text-center border border-gray-100 shadow-sm">
                        <BarChart3 className="text-gray-100 mx-auto mb-4" size={64} />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No students for {selectedGrade}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SystemReports;
