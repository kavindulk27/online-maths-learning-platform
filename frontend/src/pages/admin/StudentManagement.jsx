import { useState } from 'react';
import { 
    Search,
    Plus,
    Edit2,
    CheckCircle2,
    XCircle,
    User,
} from 'lucide-react';

const StudentManagement = ({ students, setStudents }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('Grade 6');

    const handleDeleteStudent = (id) => {
        if (window.confirm('පද්ධතියෙන් මෙම ශිෂ්‍යයා සම්පූර්ණයෙන්ම ඉවත් කිරීමට ඔබට විශ්වාසද? (Are you sure you want to delete this student?)')) {
            const updated = students.filter(s => s.id !== id);
            setStudents(updated);
            localStorage.setItem('all_students', JSON.stringify(updated));
        }
    };

    const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

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

    const filteredStudents = students.filter(s => 
        s.grade === selectedGrade && (
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            s.id.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 leading-none mb-1">Student Management</h3>
                    <p className="text-xs text-gray-600 font-extrabold uppercase tracking-widest">Manage your learner community by grade</p>
                </div>
                <div className="flex space-x-3 items-center">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search in this grade..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 pr-6 py-3 border border-gray-100 rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all w-64 text-sm font-bold"
                        />
                    </div>
                    <button className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Student</span>
                    </button>
                </div>
            </div>

            {/* Grade Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
                {grades.map(grade => (
                    <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                            selectedGrade === grade 
                            ? 'bg-white text-primary shadow-sm shadow-gray-200' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                        }`}
                    >
                        {grade}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">Student Info</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">School</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600">Payment Status</th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((stu, i) => (
                                    <tr key={stu.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black text-xs">
                                                    {stu.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-800 leading-none mb-1">{stu.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {stu.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-gray-700 leading-none">{stu.school}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                stu.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                                                stu.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {stu.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button 
                                                    onClick={() => handleStatusToggle(stu)}
                                                    className={`p-2 rounded-xl transition-all shadow-sm flex items-center space-x-2 ${
                                                        stu.status === 'Approved' 
                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                                                    }`}
                                                    title={stu.status === 'Approved' ? 'Mark as Unpaid' : 'Quick Approve Payment'}
                                                >
                                                    {stu.status === 'Approved' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                                                </button>
                                                <button 
                                                    onClick={() => alert(`Editing student: ${stu.name}\nFeature coming soon: profile details update.`)}
                                                    className="p-2 text-gray-400 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteStudent(stu.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-12 text-center">
                                        <div className="flex flex-col items-center">
                                            <User className="text-gray-200 mb-4" size={48} />
                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No students found in {selectedGrade}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
