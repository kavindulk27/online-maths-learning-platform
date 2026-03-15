import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Youtube, ExternalLink } from 'lucide-react';

const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const Videos = () => {
    const defaultVideos = [
        {
            id: '1',
            title: 'My Maths | ගණීතයට හොඳම විසඳුම  ',
            description: 'අපි පදුරු වලට විදින්නෙ නෑ,ව්දින්නේ හාවටම තමයි...',
            link: 'https://youtu.be/Orf0Qy40AeE?si=0nWlS7tnmVjM8rbs',
        },
        {
            id: '2',
            title: ' Revision ',
            description: 'භාග ලේසියෙන් විසදමු.',
            //thumbnail: 'https://img.youtube.com/vi/w-6CqE_S_wI/maxresdefault.jpg',
            link: 'https://youtu.be/-vwlNhRY6Ik?si=niRSx_-geBquDDeI',
        },
        {
            id: '3',
            title: ' Maths | Revision',
            description: 'වීජීය භාග ලේසියෙන් විසදමු.',
            //thumbnail: 'https://img.youtube.com/vi/s3Z-6w0uU_c/maxresdefault.jpg',
            link: 'https://youtu.be/NkKU9svBADA?si=ArU-T4lK9jegWH0L',
        }
    ];

    const [videos, setVideos] = useState(() => {
        const saved = localStorage.getItem('home_videos');
        return saved ? JSON.parse(saved) : defaultVideos;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('home_videos');
            if (saved) setVideos(JSON.parse(saved));
        };

        window.addEventListener('storage', handleStorageChange);
        const interval = setInterval(handleStorageChange, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6 border border-primary/20"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span>Interactive Learning</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter"
                    >
                        Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Lesson</span> Highlights
                    </motion.h2>

                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg font-medium italic">
                        "Get a sneak peek into our teaching style with these curated video highlights from our regular class sessions."
                    </p>
                </div>

                {/* Grid */}
                {videos.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {videos.map((video, i) => (
                            <VideoCard key={video.id} video={video} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">More lessons coming soon!</p>
                    </div>
                )}

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <a
                        href="https://youtube.com/@chamaravidunuvan?si=00GSZnzX6sSsMnSR"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-4 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl active:scale-95 group"
                    >
                        <Youtube className="text-red-500 fill-current" />
                        <span>Visit YouTube Channel</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const VideoCard = ({ video, index }) => {
    const videoId = extractVideoId(video.link);
    const thumbnail = video.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
        >
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                        <Play className="text-white fill-current translate-x-1" size={32} />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                        <Youtube className="text-red-600" size={18} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Featured Lesson</span>
                </div>

                <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-primary transition-colors leading-tight">
                    {video.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                    {video.description}
                </p>

                <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 text-primary font-black text-xs uppercase tracking-[0.2em] group/btn"
                >
                    <span>Watch on YouTube</span>
                    <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                        <ExternalLink size={14} />
                    </div>
                </a>
            </div>
        </motion.div>
    );
};

export default Videos;
