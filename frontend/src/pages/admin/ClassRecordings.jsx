import { useState, useEffect } from 'react';
import { 
    GraduationCap,
    Link as LinkIcon,
    Plus,
    Trash2,
    Video,
    Calendar,
} from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const ClassRecordings = () => {
    const getYouTubeThumbnail = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
        }
        return null;
    };

    const [recordings, setRecordings] = useState(() => {
        try {
            const saved = localStorage.getItem('class_recordings');
            if (saved) {
                const parsed = JSON.parse(saved);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) {
            console.error('Error loading recordings:', e);
        }
        return [
            {
                id: 1,
                grade: 'Grade 11',
                classType: 'Theory',
                lessonNo: 14,
                topic: 'Quadratic Equations & Graphs',
                date: '2025-03-15',
                youtubeLink: 'https://www.youtube.com/watch?v=s0MnpJWy-MY'
            }
        ];
    });

    const [isAdding, setIsAdding] = useState(false);
    const [filterGrade, setFilterGrade] = useState('All');
    const [newRec, setNewRec] = useState({ 
        grade: 'Grade 11', 
        classType: 'Theory', 
        lessonNo: '', 
        topic: '', 
        date: new Date().toISOString().split('T')[0], 
        youtubeLink: '' 
    });

    const saveRecordings = (updated) => {
        setRecordings(updated);
        localStorage.setItem('class_recordings', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const handleAdd = () => {
        if (!newRec.youtubeLink || !newRec.topic) return;
        saveRecordings([...recordings, { ...newRec, lessonNo: parseInt(newRec.lessonNo) || recordings.length + 1, id: Date.now() }]);
        setIsAdding(false);
        setNewRec({ grade: 'Grade 11', classType: 'Theory', lessonNo: '', topic: '', date: new Date().toISOString().split('T')[0], youtubeLink: '' });
    };

    const filteredRecordings = filterGrade === 'All' ? recordings : recordings.filter(r => r.grade === filterGrade);
    const grades = ['All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900">Class Recordings</h3>
                    <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">All lessons recorded & archived</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="self-start bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
                >
                    <Plus size={18} />
                    <span>Upload Recording</span>
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[40px] border border-primary/20 shadow-xl space-y-6">
                    <h4 className="font-black text-gray-900">New Recording Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                <select value={newRec.grade} onChange={e => setNewRec({...newRec, grade: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 text-sm font-black text-gray-700 outline-none appearance-none cursor-pointer">
                                    {['Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11'].map(g => <option key={g}>{g}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Class Type</label>
                            <select value={newRec.classType} onChange={e => setNewRec({...newRec, classType: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-gray-700 outline-none appearance-none cursor-pointer">
                                <option>Theory</option>
                                <option>Revision</option>
                                <option>Paper Class</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lesson Number</label>
                            <input type="number" value={newRec.lessonNo} onChange={e => setNewRec({...newRec, lessonNo: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-gray-700 outline-none"
                                placeholder="e.g. 14" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Class Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                <input type="date" value={newRec.date} onChange={e => setNewRec({...newRec, date: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 text-sm font-black text-gray-700 outline-none" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Topic Name</label>
                            <input type="text" value={newRec.topic} onChange={e => setNewRec({...newRec, topic: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-gray-700 outline-none"
                                placeholder="e.g. Quadratic Equations" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">YouTube Link</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                <input type="url" value={newRec.youtubeLink} onChange={e => setNewRec({...newRec, youtubeLink: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 text-sm font-black text-gray-700 outline-none"
                                    placeholder="https://youtu.be/..." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setIsAdding(false)} className="px-6 py-3 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-gray-600 transition-all">Cancel</button>
                        <button onClick={handleAdd} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-secondary transition-all">Save Recording</button>
                    </div>
                </div>
            )}

            {/* Grade Filter */}
            <div className="flex flex-wrap gap-2">
                {grades.map(g => (
                    <button key={g} onClick={() => setFilterGrade(g)}
                        className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                            filterGrade === g ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}>
                        {g}
                    </button>
                ))}
            </div>

            {filteredRecordings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRecordings.map(rec => {
                        const thumbnail = getYouTubeThumbnail(rec.youtubeLink);
                        return (
                            <div key={rec.id} className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-gray-100 transition-all">
                                <div className="relative overflow-hidden bg-gray-100">
                                    {thumbnail ? (
                                        <img src={thumbnail} alt={rec.topic} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                            <Video className="text-gray-300" size={48} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">{rec.classType}</span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">{rec.grade}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                                                Lesson {rec.lessonNo} · {rec.date && !isNaN(new Date(rec.date).getTime()) 
                                                    ? new Date(rec.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) 
                                                    : 'No Date'}
                                            </p>
                                            <h4 className="font-black text-gray-900 text-sm leading-tight">{rec.topic}</h4>
                                        </div>
                                        <button onClick={() => saveRecordings(recordings.filter(r => r.id !== rec.id))} className="text-gray-300 hover:text-red-400 transition-colors p-1 ml-2 flex-shrink-0">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <a href={rec.youtubeLink} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center space-x-2 text-primary text-[11px] font-black uppercase tracking-widest hover:text-secondary transition-colors">
                                        <Video size={14} />
                                        <span>Watch Recording</span>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Video className="text-gray-100 mx-auto mb-4" size={64} />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No recordings found for this grade</p>
                </div>
            )}
        </div>
    );
};

export default ClassRecordings;
