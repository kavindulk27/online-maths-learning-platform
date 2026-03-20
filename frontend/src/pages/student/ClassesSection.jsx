import { useState } from 'react';
import React from 'react';
import { 
    Video, 
    ExternalLink, 
    Clock, 
    AlertCircle,
    Lock,
} from 'lucide-react';

const ClassesSection = ({ student }) => {
    const [classes, setClasses] = useState(() => {
        const saved = localStorage.getItem('class_schedules');
        if (saved) {
            const allSchedules = JSON.parse(saved);
            return allSchedules.filter(c => c.grade === student.grade);
        }
        return [];
    });

    // Sync from localStorage if updated by Admin
    React.useEffect(() => {
        const handleStorage = () => {
            const saved = localStorage.getItem('class_schedules');
            if (saved) {
                const allSchedules = JSON.parse(saved);
                setClasses(allSchedules.filter(c => c.grade === student.grade));
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [student.grade]);

    const isApproved = student.paymentStatus === "Approved";

    return (
        <div className="space-y-6">
            {!isApproved && (
                <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-3xl p-8 flex flex-col items-center text-center">
                    <AlertCircle className="text-yellow-500 mb-4" size={48} />
                    <h3 className="text-xl font-black text-gray-800 mb-2">Monthly Fee Required</h3>
                    <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                        Zoom links for **March classes** are currently locked. Please settle your monthly fee and send the receipt to the teacher for instant approval.
                    </p>
                    <button className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-yellow-200">
                        Check Payment Status
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {classes.length > 0 ? (
                    classes.map(cls => (
                        <div key={cls.id} className={`rounded-3xl p-8 shadow-sm border flex flex-col transition-all duration-500 ${
                                cls.status === 'Live'
                                ? 'bg-white border-red-200 shadow-red-100 shadow-xl ring-2 ring-red-400/20'
                                : 'bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200'
                            }`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isApproved ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                    {isApproved ? <Video className="text-primary" size={28} /> : <Lock className="text-gray-400" size={28} />}
                                </div>
                                {cls.status === 'Live' ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="relative flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                                        </span>
                                        <span className="text-lg font-black text-red-600 uppercase tracking-widest animate-pulse">
                                            🔴 Live Now
                                        </span>
                                    </div>
                                ) : (
                                    <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-gray-100 text-gray-400">
                                        ⚪ Offline
                                    </span>
                                )}
                            </div>
                            <h3 className={`text-xl font-black mb-2 ${isApproved ? 'text-gray-800' : 'text-gray-400'}`}>{cls.grade} - {cls.type || 'Theory'}</h3>
                            <p className={`text-sm font-bold mb-1 ${isApproved ? 'text-primary' : 'text-gray-300'}`}>{cls.lesson}</p>
                            <p className="text-gray-400 text-sm flex items-center space-x-2 mb-8">
                                <Clock size={16} />
                                <span>{cls.time}</span>
                            </p>
                            
                            {isApproved ? (
                                <a 
                                    href={cls.zoom}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center space-x-3 pointer-events-auto ${
                                        cls.status === 'Live'
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-secondary active:scale-[0.98]' 
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                                    }`}
                                    onClick={(e) => cls.status !== 'Live' && e.preventDefault()}
                                >
                                    <span>{cls.status === 'Live' ? 'Join Zoom Class' : 'Class Offline'}</span>
                                    <ExternalLink size={18} />
                                </a>
                            ) : (
                                <div className="w-full py-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center space-x-3 text-gray-400 font-black text-sm uppercase tracking-widest">
                                    <Lock size={18} />
                                    <span>Access Locked</span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="col-span-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                        <Video className="text-gray-200 mx-auto mb-4" size={48} />
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No classes scheduled for your grade yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassesSection;
