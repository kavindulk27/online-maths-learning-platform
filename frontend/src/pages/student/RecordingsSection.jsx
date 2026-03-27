import { useState, useEffect } from 'react';
import { PlayCircle, Clock, ExternalLink, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axios';

const getThumbnail = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` : null;
};

const RecordingsSection = ({ student }) => {
    const [recordings, setRecordings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('materials/');
                const recs = response.data.filter(r => 
                    r.type === 'recording' && r.grade === student.grade
                );
                setRecordings(recs);
            } catch (error) {
                console.error('Error fetching recordings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecordings();
    }, [student.grade]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="col-span-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                    <Loader2 className="animate-spin text-primary mx-auto" size={48} />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {recordings.length > 0 ? recordings.map(rec => (
                <div key={rec.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                         <img src={getThumbnail(rec.video_url)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Thumbnail" />
                         <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="text-white/80 group-hover:text-white group-hover:scale-125 transition-all" size={48} />
                         </div>
                         <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-primary shadow-lg border border-primary/10 w-fit">
                                {rec.grade}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h4 className="font-black text-gray-800 mb-2 line-clamp-1">{rec.title}</h4>
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center space-x-1">
                                <Clock size={12} />
                                <span>{new Date(rec.uploaded_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
                            </span>
                            {rec.video_url && (
                                <a 
                                    href={rec.video_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-primary hover:underline flex items-center space-x-1"
                                >
                                    <span>Watch</span>
                                    <ExternalLink size={12} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center">
                    <PlayCircle className="text-gray-200 mx-auto mb-4" size={48} />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No recordings available for {student.grade} yet.</p>
                </div>
            )}
        </div>
    );
};

export default RecordingsSection;
