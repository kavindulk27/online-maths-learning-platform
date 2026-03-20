import { useState } from 'react';
import { 
    GraduationCap,
    BarChart3,
    Plus,
    Clock,
    Save,
    Trash2,
} from 'lucide-react';

const ClassManagement = () => {
    const defaultClasses = [
        { id: 1, grade: 'Grade 11', type: 'Theory', lesson: 'Quadratic Equations', time: 'Monday 08:00 AM', zoom: 'https://zoom.us/j/845213697', status: 'Offline' },
        { id: 2, grade: 'Grade 10', type: 'Revision', lesson: 'Trigonometry', time: 'Tuesday 02:30 PM', zoom: 'https://zoom.us/j/992147321', status: 'Offline' },
    ];

    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('class_schedules');
        return saved ? JSON.parse(saved) : defaultClasses;
    });

    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newClass, setNewClass] = useState({ grade: 'Grade 11', type: 'Theory', lesson: '', time: '', zoom: '' });

    const saveClasses = (updated) => {
        setClasses(updated);
        localStorage.setItem('class_schedules', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const handleAdd = () => {
        const id = Date.now();
        saveClasses([...classes, { ...newClass, id, status: 'Offline' }]);
        setIsAdding(false);
        setNewClass({ grade: 'Grade 11', type: 'Theory', lesson: '', time: '', zoom: '' });
    };

    const handleDelete = (id) => {
        saveClasses(classes.filter(c => c.id !== id));
    };

    const handleToggleStatus = (id) => {
        saveClasses(classes.map(c => 
            c.id === id ? { ...c, status: c.status === 'Live' ? 'Offline' : 'Live' } : c
        ));
    };

    const handleUpdateZoom = (id, newZoom) => {
        saveClasses(classes.map(c => 
            c.id === id ? { ...c, zoom: newZoom } : c
        ));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black text-gray-800 leading-none mb-1">Class Schedules</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage zoom links and lesson timings</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
                >
                    <Plus size={20} />
                    <span>Add Schedule</span>
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[40px] shadow-xl border border-primary/20 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20" size={18} />
                                <select 
                                    value={newClass.grade}
                                    onChange={(e) => setNewClass({...newClass, grade: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                                >
                                    {[6,7,8,9,10,11].map(g => <option key={g}>Grade {g}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                            <div className="relative">
                                <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-20" size={18} />
                                <select 
                                    value={newClass.type}
                                    onChange={(e) => setNewClass({...newClass, type: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl p-4 pl-12 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none appearance-none cursor-pointer"
                                >
                                    <option>Theory</option>
                                    <option>Revision</option>
                                    <option>Paper Class</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Time (e.g. Sat 8:00 AM)</label>
                            <input 
                                type="text"
                                value={newClass.time}
                                onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="Sat 8:00 AM"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lesson Name</label>
                            <input 
                                type="text"
                                value={newClass.lesson}
                                onChange={(e) => setNewClass({...newClass, lesson: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="Quadratic Equations"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zoom Link</label>
                            <input 
                                type="text"
                                value={newClass.zoom}
                                onChange={(e) => setNewClass({...newClass, zoom: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-black text-gray-700 focus:ring-4 focus:ring-primary/5 outline-none"
                                placeholder="https://zoom.us/j/..."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-all">Cancel</button>
                        <button onClick={handleAdd} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-secondary transition-all">Save Schedule</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {classes.map((cls) => (
                    <div key={cls.id} className={`bg-white p-8 rounded-[40px] shadow-sm border relative group overflow-hidden transition-all duration-500 ${
                            cls.status === 'Live'
                            ? 'border-red-200 shadow-red-100 shadow-xl ring-2 ring-red-400/20'
                            : 'border-gray-100'
                        }`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    {cls.status === 'Live' ? (
                                        <div className="flex items-center space-x-2 mb-4">
                                            {/* Pulsing ring animation */}
                                            <span className="relative flex h-4 w-4">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                            </span>
                                            <span className="text-lg font-black text-red-600 uppercase tracking-widest animate-pulse">
                                                Live Now
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block bg-gray-100 text-gray-400">
                                            ⚪ Offline
                                        </span>
                                    )}
                                    <h4 className="text-xl font-black text-gray-800 tracking-tight leading-none mb-2">{cls.grade} - {cls.type}</h4>
                                    <p className="text-sm font-bold text-gray-400">{cls.lesson}</p>
                                </div>
                                <div className="bg-white shadow-2xl shadow-gray-200 border border-gray-100 p-5 rounded-3xl text-center min-w-[100px]">
                                    <Clock className="mx-auto mb-2 text-primary" size={20} />
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Time</p>
                                    <p className="text-xs font-black text-gray-800 mt-1">{cls.time}</p>
                                </div>
                            </div>
                            
                            <div className="pt-6 border-t border-gray-50 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zoom Meeting Link</label>
                                    <div className="flex space-x-2">
                                        <input 
                                            type="text" 
                                            className="flex-1 bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-xs font-bold text-gray-700 outline-none focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all shadow-inner"
                                            defaultValue={cls.zoom}
                                            onBlur={(e) => handleUpdateZoom(cls.id, e.target.value)}
                                        />
                                        <button className="bg-primary text-white p-4 rounded-2xl shadow-lg hover:bg-secondary transition-all">
                                            <Save size={20} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex space-x-3 pt-2">
                                    <button 
                                        onClick={() => handleToggleStatus(cls.id)}
                                        className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95 ${
                                        cls.status === 'Live' ? 'bg-red-500 text-white shadow-red-200 hover:bg-red-600' : 'bg-green-500 text-white shadow-green-200 hover:bg-green-600'
                                    }`}>
                                        {cls.status === 'Live' ? 'End Session' : 'Start Session'}
                                    </button>
                                    <button onClick={() => handleDelete(cls.id)} className="p-4 bg-gray-100 text-red-400 rounded-2xl hover:bg-red-50 transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassManagement;
