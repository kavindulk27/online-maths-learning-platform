import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-dark mb-4">Get in <span className="text-primary">Touch</span></h2>
                        <p className="text-slate-500 mb-10 text-lg">Have questions about our classes or enrollment? Send us a message and we'll get back to you shortly.</p>

                        <div className="space-y-6">
                            {[
                                { icon: <Phone className="text-white" size={20} />, label: 'Phone', value: '+94 71 234 5678', color: 'bg-primary' },
                                { icon: <Mail className="text-white" size={20} />, label: 'Email', value: 'info@onlinemaths.lk', color: 'bg-blue-600' },
                                { icon: <MapPin className="text-white" size={20} />, label: 'Location', value: 'Nugegoda, Sri Lanka', color: 'bg-slate-800' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className={`${item.color} p-3 rounded-xl shadow-lg shadow-blue-500/10`}>{item.icon}</div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{item.label}</p>
                                        <p className="font-bold text-dark">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 shadow-xl shadow-emerald-500/5">
                            <div className="flex items-center space-x-5 mb-6">
                                <div className="bg-[#25D366] p-4 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
                                    <MessageCircle size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-dark text-xl leading-none mb-1">Chat on WhatsApp</h4>
                                    <p className="text-sm text-slate-500">Get instant support for your inquiries.</p>
                                </div>
                            </div>
                            <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center space-x-2 text-lg active:scale-95">
                                <span>Message on WhatsApp</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, opacity: 0 }}
                        whileInView={{ opacity: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-slate-100"
                    >
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Your Name</label>
                                    <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none border border-slate-200" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Grade</label>
                                    <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary outline-none border border-slate-200">
                                        <option>Grade 6</option>
                                        <option>Grade 7</option>
                                        <option>Grade 8</option>
                                        <option>Grade 9</option>
                                        <option>Grade 10</option>
                                        <option>Grade 11</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                                <input type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary outline-none border border-slate-200" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                <textarea rows="4" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary outline-none resize-none border border-slate-200" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-2 group active:scale-[0.98]">
                                <span>Send Message</span>
                                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export default Contact;
