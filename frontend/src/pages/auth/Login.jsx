import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Youtube, Facebook, Phone, ArrowLeft, School, MapPin, GraduationCap, Heart, ChevronRight, Mail } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import axiosInstance from '../../api/axios';

const Login = () => {
    const navigate = useNavigate();
    const [authMode, setAuthMode] = useState('login'); // login, register, forgot-id, forgot-reset
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        studentId: '', // Used for username in backend
        grade: '',
        school: '',
        studentPhone: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isRegister) {
                const requiredFields = ['name', 'grade', 'school', 'district', 'email', 'password'];
                const emptyFields = requiredFields.filter(key => !formData[key]);

                if (emptyFields.length > 0) {
                    alert('කරුණාකර සියලුම තොරතුරු නිවැරදිව පූරණය කරන්න (Please fill all fields)');
                    setLoading(false);
                    return;
                }

                if (formData.password.length < 8) {
                    alert('මුරපදය සඳහා අවම වශයෙන් අකුරු/ඉලක්කම් 8ක් ඇතුළත් කරන්න');
                    setLoading(false);
                    return;
                }

                // Call backend registration
                const regData = {
                    first_name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password, // Passwords generally shouldn't be auto-trimmed
                    role: 'student',
                    phone: formData.studentPhone.trim(),
                    grade: formData.grade,
                    school: formData.school.trim(),
                    district: formData.district
                };

                const response = await axiosInstance.post('auth/register/', regData);
                setGeneratedId(response.data.username);
                setShowSuccess(true);
            } else if (isLogin) {
                // Determine if it's admin or student
                const loginData = {
                    username: formData.studentId.trim(),
                    password: formData.password.trim()
                };

                const response = await axiosInstance.post('auth/login/', loginData);
                const { access, refresh } = response.data;
                
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);
                
                // Decode token to get role
                const payload = JSON.parse(atob(access.split('.')[1]));
                const userRole = payload.role;
                
                if (userRole === 'admin') {
                    navigate('/admin');
                } else {
                    // Fetch profile for student
                    const profileRes = await axiosInstance.get('students/profiles/');
                    const profile = profileRes.data[0]; 
                    
                    if (!profile) {
                        alert('ඔබේ ශිෂ්‍ය ගිණුම සක්‍රිය නැත. කරුණාකර Admin සම්බන්ධ කරගන්න. (Student profile not found. Please contact admin.)');
                        setLoading(false);
                        return;
                    }

                    const studentData = {
                        name: profile.user?.first_name || profile.user?.username || 'Student',
                        id: profile.user?.username || '',
                        grade: profile.grade,
                        school: profile.school,
                        email: profile.user?.email || '',
                        studentPhone: profile.user?.phone || '',
                        district: profile.district || '',
                        paymentStatus: profile.payment_status || 'Unpaid' 
                    };

                    localStorage.setItem('current_student', JSON.stringify(studentData));
                    navigate('/student-dashboard');
                }
            } else {
                alert('This feature is currently being updated for the new system. (මෙම පහසුකම දැනට යාවත්කාලීන කරමින් පවතියි)');
            }
        } catch (error) {
            console.error('Auth Error:', error);
            let errorMsg = 'පද්ධතියේ දෝෂයකි. කරුණාකර නැවත උත්සාහ කරන්න. (Authentication failed. Please check your credentials.)';
            
            if (error.response) {
                // Server responded with an error
                if (error.response.data?.detail) {
                    errorMsg = error.response.data.detail;
                } else if (error.response.data) {
                    const firstKey = Object.keys(error.response.data)[0];
                    const firstVal = error.response.data[firstKey];
                    errorMsg = `${firstKey}: ${Array.isArray(firstVal) ? firstVal[0] : firstVal}`;
                }
            } else if (error.request) {
                // Request was made but no response received (Network Error)
                errorMsg = 'Backend එක සමඟ සම්බන්ධ වීමට නොහැක. කරුණාකර Backend එක Run වෙනවද කියා නැවත බලන්න. (Network Error: Cannot connect to backend)';
            }
            
            alert(errorMsg);
        } finally {
            setLoading(false);
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
                    <Link to="/" className="flex flex-col items-center mb-12 group">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 group-hover:bg-secondary/30 transition-colors" />
                            <img
                                src={logo}
                                alt="My Maths Logo"
                                className="h-24 w-auto object-contain relative z-10 drop-shadow-2xl transition-transform group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-black tracking-tight leading-none text-gray-800">
                                MYMATHS<span className="text-secondary drop-shadow-[0_0_8px_rgba(0,116,217,0.3)]">.LK</span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-normal mt-1 text-primary/60">
                                ගණිතයට හරිම උත්තරේ
                            </span>
                        </div>
                    </Link>

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
                                            value={formData.studentId}
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
                                            value={formData.password}
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
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student Name / සම්පූර්ණ නම"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-0 bottom-3 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                                        <select
                                            name="grade"
                                            required
                                            value={formData.grade}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 pr-8 text-sm text-gray-800 focus:border-secondary outline-none transition-colors bg-transparent appearance-none relative z-10"
                                        >
                                            <option value="" disabled>Grade / ශ්‍රේණිය</option>
                                            {['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11'].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                        <ChevronRight className="absolute right-0 bottom-3 text-gray-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                    <div className="relative md:col-span-2">
                                        <School className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="school"
                                            required
                                            value={formData.school}
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
                                            value={formData.studentPhone}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student Phone (Optional) / ඔබේ දුරකථනය"
                                        />
                                    </div>
                                    {/* Parent Phone removed as per request */}
                                    <div className="relative">
                                        <MapPin className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <select
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-2 pl-7 text-sm text-gray-800 focus:border-secondary outline-none transition-colors bg-transparent appearance-none"
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
                                        <Mail className="absolute left-0 bottom-3 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
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
                                            value={formData.password}
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
                                            value={formData.studentId}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Student ID / ශිෂ්‍ය අංකය"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-0 bottom-4 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full border-b border-gray-300 py-3 pl-8 text-gray-800 focus:border-secondary outline-none transition-colors"
                                            placeholder="Registered Email / ලියාපදිංචි විද්‍යුත් තැපෑල"
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
                                            value={formData.password}
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
                                            value={formData.confirmPassword}
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
