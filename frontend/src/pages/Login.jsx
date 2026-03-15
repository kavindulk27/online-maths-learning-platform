import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Youtube, Facebook, Phone, ArrowLeft, School, MapPin, GraduationCap, Heart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Login = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('login'); // login, register, forgot-id, forgot-reset
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        grade: '',
        school: '',
        studentPhone: '',
        parentPhone: '',
        district: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const isLogin = authMode === 'login';
    const isRegister = authMode === 'register';
    const isForgotId = authMode === 'forgot-id';
    const isForgotReset = authMode === 'forgot-reset';

    const [showSuccess, setShowSuccess] = useState(false);
    const [generatedId, setGeneratedId] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateStudentId = () => {
        const year = new Date().getFullYear();
        const lastId = localStorage.getItem('last_student_number') || '0';
        const nextNumber = parseInt(lastId) + 1;
        localStorage.setItem('last_student_number', nextNumber.toString());
        
        // Pad with zeros to ensure 3 digits (e.g., 001, 002)
        const paddedNumber = nextNumber.toString().padStart(3, '0');
        return `STU-${year}-${paddedNumber}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isRegister) {
            const { studentPhone, ...requiredData } = formData;
            const emptyFields = Object.keys(requiredData).filter(key => !requiredData[key]);
            if (emptyFields.length > 0) {
                alert('කරුණාකර සියලුම තොරතුරු නිවැරදිව පූරණය කරන්න (Please fill all fields)');
                return;
            }

            if (formData.password.length < 8) {
                alert('මුරපදය සඳහා අවම වශයෙන් අකුරු/ඉලක්කම් 8ක් ඇතුළත් කරන්න (Password must be at least 8 characters long)');
                return;
            }

            const newId = generateStudentId();
            setGeneratedId(newId);
            setShowSuccess(true);
        } else if (isForgotId) {
            // Identity verification logic
            if (!formData.studentId || !formData.parentPhone) {
                alert('කරුණාකර ශිෂ්‍ය අංකය සහ මවුපියන්ගේ අංකය ඇතුළත් කරන්න');
                return;
            }
            // Transition to reset step
            setAuthMode('forgot-reset');
        } else if (isForgotReset) {
            // Reset logic
            if (formData.password.length < 8) {
                alert('මුරපදය සඳහා අවම වශයෙන් අකුරු/ඉලක්කම් 8ක් ඇතුළත් කරන්න');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('මුරපදයන් එකිනෙකට නොගැලපේ (Passwords do not match)');
                return;
            }
            alert('මුරපදය සාර්ථකව වෙනස් කළා! (Password Reset Successful)');
            setAuthMode('login');
        } else {
            // Handle login logic
            const isAdmin = formData.studentId === 'admin@mymaths.com' && formData.password === 'admin123';
            
            if (isAdmin) {
                navigate('/admin');
            } else {
                console.log('Logging in student:', formData);
                navigate('/student-dashboard');
            }
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4 md:p-8 relative">
            {/* Back button */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-10 md:left-10 group flex items-center space-x-3 z-30 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl border border-white/50 hover:bg-white transition-all active:scale-95"
            >
                <ArrowLeft size={20} className="text-black group-hover:-translate-x-1 transition-transform" />
                <span className="text-black font-black text-sm tracking-widest uppercase">Go Back</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-6xl w-full"
            >
                {/* Left Column: Illustration */}
                <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 order-2 md:order-1">
                    <img
                        src="/login-illustration.png"
                        alt="Student Illustration"
                        className="max-w-full h-auto object-contain"
                    />
                </div>

                {/* Right Column: Login Form */}
                <div className="md:w-1/2 p-8 md:p-16 flex flex-col items-center justify-center order-1 md:order-2 border-b md:border-b-0 md:border-l border-gray-100">
                    {/* Brand Header */}
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src={logo}
                            alt="My Maths Logo"
                            className="h-48 w-auto object-contain"
                        />
                    </div>

                    <h2 className="text-3xl font-black text-gray-800 mb-8 self-start">
                        {isLogin ? 'Sign In / ඇතුල් වන්න' : 
                         isRegister ? 'අලුතින් ලියාපදිංචි වන්න' : 
                         isForgotId ? 'Reset Password' : 'Set New Password'}
                    </h2>

                    <form className="w-full space-y-5" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="login-fields"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="relative">
                                        <User className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="studentId"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors peer"
                                            placeholder="Student ID or Email"
                                        />
                                    </div>

                                    <div className="relative">
                                        <Lock className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors peer"
                                            placeholder="Password / මුරපදය"
                                        />
                                    </div>
                                </motion.div>
                            ) : isRegister ? (
                                <motion.div
                                    key="register-fields"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
                                >
                                    <div className="relative">
                                        <User className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student Name / සම්පූර්ණ නම"
                                        />
                                    </div>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="grade"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Grade / ශ්‍රේණිය"
                                        />
                                    </div>
                                    <div className="relative md:col-span-2">
                                        <School className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="school"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="School / පාසල"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            name="studentPhone"
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student Phone (Optional) / ඔබේ දුරකථනය"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Heart className="absolute left-0 bottom-3 text-secondary" size={18} />
                                        <input
                                            type="tel"
                                            name="parentPhone"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors font-bold"
                                            placeholder="Parent Phone / මවුපියන්ගේ අංකය *"
                                        />
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <select
                                            name="district"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors bg-transparent appearance-none"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>District / දිස්ත්‍රික්කය</option>
                                            {[
                                                'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 
                                                'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 
                                                'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 
                                                'Matale', 'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 
                                                'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
                                            ].map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Email / විද්‍යුත් තැපෑල"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            minLength={8}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Password (Min 8 chars) / මුරපදය"
                                        />
                                    </div>
                                </motion.div>
                            ) : isForgotId ? (
                                <motion.div
                                    key="forgot-id-fields"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <p className="text-sm text-gray-500 mb-4">Identity Verification / අනන්‍යතාවය තහවුරු කරන්න</p>
                                    <div className="relative">
                                        <User className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="studentId"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student ID / ශිෂ්‍ය අංකය"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Heart className="absolute left-0 bottom-4 text-secondary" size={20} />
                                        <input
                                            type="tel"
                                            name="parentPhone"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Parent Phone / මවුපියන්ගේ අංකය"
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="forgot-reset-fields"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <p className="text-sm text-gray-500 mb-4">Set New Password / නව මුරපදයක් ඇතුළත් කරන්න</p>
                                    <div className="relative">
                                        <Lock className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="New Password / නව මුරපදය"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Confirm Password / නැවත ඇතුළත් කරන්න"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button 
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] mt-4"
                        >
                            {isLogin ? 'Login / ඇතුල් වන්න' : 
                             isRegister ? 'Register / ලියාපදිංචි වන්න' : 
                             isForgotId ? 'Verify Identity' : 'Reset & Save'}
                        </button>
                    </form>

                    <div className="mt-8 flex flex-col items-center w-full space-y-4">
                        {isLogin ? (
                            <button 
                                onClick={() => setAuthMode('register')}
                                className="w-full text-center py-3 px-4 border-2 border-primary text-primary text-xs font-black rounded-xl hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                            >
                                Not a Student? Register Now!
                            </button>
                        ) : (
                            <button 
                                onClick={() => setAuthMode('login')}
                                className="text-sm font-bold text-gray-600 hover:text-primary transition-colors flex items-center space-x-2"
                            >
                                <ArrowLeft size={16} />
                                <span>Back to Login / නැවත Login වෙත</span>
                            </button>
                        )}
                        
                        {isLogin && (
                            <button 
                                onClick={() => setAuthMode('forgot-id')}
                                className="text-sm font-medium text-gray-400 hover:text-secondary transition-colors underline underline-offset-4"
                            >
                                Forgot Your Password?
                            </button>
                        )}
                    </div>

                    {/* Footer Infos */}
                    <div className="mt-12 flex flex-col items-center space-y-4">
                        <div className="flex space-x-6">
                            <a
                                href="https://youtube.com/@chamaravidunuvan?si=00GSZnzX6sSsMnSR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                                    alt="YouTube"
                                    className="h-7 w-auto"
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/share/v/1C1YFjyqeM/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:scale-110 transition-transform"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
                                    alt="Facebook"
                                    className="h-7 w-auto"
                                />
                            </a>
                        </div>

                        <div className="text-center">
                            <p className="text-primary text-xs font-bold hover:underline cursor-pointer">Follow Us</p>
                            <p className="text-gray-500 text-xs mt-1 flex items-center justify-center space-x-1">
                                <span>Support Hotline :</span>
                                <span className="font-bold text-gray-700">0707268008</span>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
                            
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <User className="text-green-600" size={40} />
                            </div>
                            
                            <h3 className="text-2xl font-black text-gray-800 mb-2">ලියාපදිංචිය සාර්ථකයි!</h3>
                            <p className="text-gray-500 text-sm mb-6">Registration Successful!</p>
                            
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 mb-8">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">ඔබේ ශිෂ්‍ය අංකය (Student ID)</p>
                                <p className="text-3xl font-black text-primary tracking-tighter">{generatedId}</p>
                            </div>
                            
                            <p className="text-xs text-gray-400 mb-8 leading-relaxed">
                                කරුණාකර මෙම අංකය මතක තබා ගන්න හෝ සුරැකිකව තබා ගන්න. පන්ති සඳහා පිවිසීමට මෙය අවශ්‍ය වේ.
                            </p>
                            
                            <button
                                onClick={() => {
                                    setShowSuccess(false);
                                    setAuthMode('login');
                                }}
                                className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
                            >
                                ඇතුල් වන්න (Go to Login)
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
