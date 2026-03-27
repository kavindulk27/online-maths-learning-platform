import { useState } from 'react';
import { 
    CheckCircle2,
    Lock,
    User,
    Mail,
    MapPin,
    School,
    GraduationCap,
    Phone,
} from 'lucide-react';
import axiosInstance from '../../api/axios';

const ProfileSection = ({ student, setStudent }) => {
    const [editData, setEditData] = useState({ ...student });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        // Validation
        if (!editData.name || !editData.grade || !editData.school) {
            alert('කරුණාකර අනිවාර්ය තොරතුරු ඇතුළත් කරන්න (Please fill required fields)');
            return;
        }

        if (passwordData.new) {
            if (passwordData.new.length < 8) {
                alert('නව මුරපදය සඳහා අවම වශයෙන් අකුරු/ඉලක්කම් 8ක් ඇතුළත් කරන්න');
                return;
            }
            if (passwordData.new !== passwordData.confirm) {
                alert('මුරපදයන් එකිනෙකට නොගැලපේ (Passwords do not match)');
                return;
            }
        }

        setIsSaving(true);
        try {
            // Update profile via backend
            const profileRes = await axiosInstance.get('students/profiles/');
            const profileId = profileRes.data[0]?.id;

            if (profileId) {
                await axiosInstance.patch(`students/profiles/${profileId}/`, {
                    grade: editData.grade,
                    school: editData.school,
                    district: editData.district,
                });
            }

            // Update user fields (first_name, phone)
            await axiosInstance.patch('auth/profile/', {
                first_name: editData.name,
                phone: editData.studentPhone,
                email: editData.email,
            });

            // Change password if provided
            if (passwordData.new) {
                await axiosInstance.post('auth/change-password/', {
                    old_password: passwordData.current,
                    new_password: passwordData.new,
                });
                setPasswordData({ current: '', new: '', confirm: '' });
            }

            setStudent(editData);
            alert('Profile updated successfully! / පැතිකඩ යාවත්කාලීන කිරීම සාර්ථකයි!');
        } catch (error) {
            console.error('Error updating profile:', error);
            const msg = error.response?.data?.detail || error.response?.data?.old_password?.[0] || 'Profile update failed. Please try again.';
            alert(msg);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/30">
                <h3 className="text-2xl font-black text-gray-800 mb-2">පැතිකඩ යාවත්කාලීන කිරීම</h3>
                <p className="text-gray-500 text-sm">Edit your personal information and preferences.</p>
            </div>

            <div className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name - Read Only */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <User size={12} />
                            <span>Name / නම</span>
                            <span className="text-[9px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-black">READ ONLY</span>
                        </label>
                        <input
                            type="text"
                            value={editData.name}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-400 outline-none cursor-not-allowed"
                        />
                    </div>

                    {/* Student ID - Read Only */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <Mail size={12} />
                            <span>Student ID / ශිෂ්‍ය අංකය</span>
                            <span className="text-[9px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-black">READ ONLY</span>
                        </label>
                        <input
                            type="text"
                            value={student.id || ''}
                            readOnly
                            className="w-full bg-gray-100 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-400 outline-none cursor-not-allowed tracking-widest"
                        />
                    </div>

                    {/* Grade */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <GraduationCap size={12} />
                            <span>Grade / ශ්‍රේණිය</span>
                        </label>
                        <input
                            type="text"
                            value={editData.grade}
                            onChange={(e) => setEditData({ ...editData, grade: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* School */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <School size={12} />
                            <span>School / පාසල</span>
                        </label>
                        <input
                            type="text"
                            value={editData.school}
                            onChange={(e) => setEditData({ ...editData, school: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Student Phone */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <Phone size={12} />
                            <span>Student Phone / ඔබේ අංකය</span>
                        </label>
                        <input
                            type="tel"
                            value={editData.studentPhone}
                            onChange={(e) => setEditData({ ...editData, studentPhone: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Parent Phone removed as per request */}

                    {/* District */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                            <MapPin size={12} />
                            <span>District / දිස්ත්‍රික්කය</span>
                        </label>
                        <select
                            value={editData.district}
                            onChange={(e) => setEditData({ ...editData, district: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                        >
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
                </div>

                {/* Change Password Section */}
                <div className="pt-12 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Lock className="text-yellow-600" size={20} />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-gray-800 leading-tight">Change Password / මුරපදය වෙනස් කිරීම</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Security Settings</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>Current Password / පැරණි මුරපදය</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.current}
                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>New Password / නව මුරපදය</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.new}
                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                placeholder="Min 8 chars"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center space-x-2">
                                <Lock size={12} />
                                <span>Confirm Password / නැවත ඇතුළත් කරන්න</span>
                            </label>
                            <input
                                type="password"
                                value={passwordData.confirm}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row gap-4">
                    <button
                        disabled={isSaving}
                        onClick={handleSave}
                        className="flex-1 bg-primary hover:bg-secondary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <CheckCircle2 size={18} />
                                <span>Save Changes / තොරතුරු තහවුරු කරන්න</span>
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setEditData({ ...student })}
                        className="px-8 py-4 border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
