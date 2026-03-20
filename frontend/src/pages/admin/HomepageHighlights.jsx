import { useState } from 'react';
import { 
    Plus,
    Trash2,
    Edit3,
    CheckCircle2,
    X,
    Star,
    Link as LinkIcon,
    Tv,
} from 'lucide-react';

const HomepageHighlights = () => {
    const [videos, setVideos] = useState(() => {
        const saved = localStorage.getItem('homepage_videos');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Grade 11 Theory - Week 14 Highlights', description: 'Full recap of quadratic equations and their graph properties.', youtubeLink: 'https://www.youtube.com/watch?v=s0MnpJWy-MY', featured: true },
            { id: 2, title: 'Best Student Answers - Paper Class', description: 'Top solutions from our weekly paper class competition.', youtubeLink: 'https://www.youtube.com/watch?v=s0MnpJWy-MY', featured: false },
        ];
    });
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', youtubeLink: '', featured: false });

    const saveVideos = (updated) => {
        setVideos(updated);
        localStorage.setItem('homepage_videos', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleSave = () => {
        if (!form.title || !form.youtubeLink) return;
        if (editingId) {
            saveVideos(videos.map(v => v.id === editingId ? { ...v, ...form } : v));
        } else {
            saveVideos([...videos, { ...form, id: Date.now() }]);
        }
        setIsAdding(false);
        setEditingId(null);
        setForm({ title: '', description: '', youtubeLink: '', featured: false });
    };

    const openEdit = (video) => {
        setEditingId(video.id);
        setForm({ title: video.title, description: video.description, youtubeLink: video.youtubeLink, featured: video.featured });
        setIsAdding(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black text-gray-900">Homepage Video Highlights</h3>
                    <p className="text-xs text-gray-400 font-extrabold uppercase tracking-widest">Manage videos shown on the public homepage</p>
                </div>
                <button 
                    onClick={() => { setIsAdding(true); setEditingId(null); setForm({ title: '', description: '', youtubeLink: '', featured: false }); }}
                    className="bg-primary hover:bg-secondary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center space-x-2"
                >
                    <Plus size={18} />
                    <span>Add Video</span>
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[40px] border border-primary/20 shadow-xl space-y-5">
                    <h4 className="font-black text-gray-900">{editingId ? 'Edit Video' : 'Add New Video Highlight'}</h4>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video Title</label>
                            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-gray-700 outline-none"
                                placeholder="e.g. Grade 11 - Highlights of Week 14" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Description</label>
                            <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-700 outline-none resize-none h-24"
                                placeholder="Describe what's covered in this video..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">YouTube Link</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                <input type="url" value={form.youtubeLink} onChange={e => setForm({...form, youtubeLink: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 text-sm font-bold text-gray-700 outline-none"
                                    placeholder="https://youtu.be/..." />
                            </div>
                        </div>
                        <label className="flex items-center space-x-3 cursor-pointer p-4 bg-yellow-50 rounded-2xl">
                            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})}
                                className="w-5 h-5 accent-yellow-500" />
                            <div>
                                <p className="text-sm font-black text-gray-800">Mark as Featured</p>
                                <p className="text-[10px] text-gray-500 font-bold">Featured videos appear at the top of the homepage</p>
                            </div>
                        </label>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="px-6 py-3 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-gray-600 transition-all">Cancel</button>
                        <button onClick={handleSave} className="bg-primary text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all shadow-lg shadow-primary/20">Save Video</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map(video => {
                    const ytId = getYouTubeId(video.youtubeLink);
                    const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;
                    return (
                        <div key={video.id} className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all">
                            <div className="relative overflow-hidden h-40 bg-gray-100">
                                {thumbnail ? (
                                    <img src={thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center"><Tv className="text-gray-300" size={48} /></div>
                                )}
                                {video.featured && (
                                    <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
                                        <Star size={10} fill="currentColor" />
                                        <span>Featured</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h4 className="font-black text-gray-900 text-sm mb-2 leading-tight">{video.title}</h4>
                                <p className="text-xs text-gray-500 font-bold leading-relaxed mb-4">{video.description}</p>
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => openEdit(video)} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                        <Edit3 size={16} />
                                    </button>
                                    <button onClick={() => saveVideos(videos.filter(v => v.id !== video.id))} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomepageHighlights;
