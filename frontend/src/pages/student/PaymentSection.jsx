import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import axiosInstance from '../../api/axios';

const PaymentSection = ({ student, setStudent }) => {
    const [uploading, setUploading] = useState(false);
    const [payment, setPayment] = useState(null);
    const [fetching, setFetching] = useState(true);

    const currentMonth = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }); // Dynamic: e.g. "March 2026"

    const fetchPaymentStatus = async () => {
        try {
            setFetching(true);
            const response = await axiosInstance.get('payments/');
            // Find payment for current month
            const currentPayment = response.data.find(p => p.month === currentMonth);
            if (currentPayment) {
                setPayment(currentPayment);
                // Sync status with parent state if needed
                setStudent(prev => ({ ...prev, paymentStatus: currentPayment.status.charAt(0).toUpperCase() + currentPayment.status.slice(1) }));
            }
        } catch (error) {
            console.error('Error fetching payment status:', error);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchPaymentStatus();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('receipt_image', file);
            formData.append('amount', parseInt(student.grade?.replace(/\D/g, '') || '0') <= 9 ? '800.00' : '1000.00');
            formData.append('month', currentMonth);
            formData.append('status', 'pending');

            const response = await axiosInstance.post('payments/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setPayment(response.data);
            setStudent(prev => ({ ...prev, paymentStatus: 'Pending' }));
            
            alert('රිසිට්පත සාර්ථකව යොමු කළා! කරුණාකර Admin අනුමැතිය ලැබෙන තෙක් රැඳී සිටින්න. (Receipt uploaded successfully! Please wait for Admin approval.)');
        } catch (error) {
            console.error('Error uploading receipt:', error);
            alert('රිසිට්පත උඩුගත කිරීමේදී දෝෂයක් ඇති විය. (Error uploading receipt.)');
        } finally {
            setUploading(false);
        }
    };

    if (fetching) {
        return (
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    const status = student.paymentStatus;
    const feeValue = parseInt(student.grade?.replace(/\D/g, '') || '0') <= 9 ? '800.00' : '1,000.00';

    return (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">{currentMonth} Payment</h3>
                    <p className="text-gray-500 text-sm">Monthly tuition fee for {student.grade}</p>
                </div>
                <div className={`px-6 py-3 rounded-2xl flex items-center space-x-3 border ${
                    status === 'Approved' ? 'bg-green-50 border-green-100 text-green-600' : 
                    status === 'Pending' ? 'bg-yellow-50 border-yellow-100 text-yellow-600' :
                    'bg-red-50 border-red-100 text-red-600'
                }`}>
                    {status === 'Approved' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                    <span className="font-black text-sm uppercase tracking-widest">{status}</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex justify-between mb-4">
                        <span className="text-sm font-bold text-gray-500">Monthly Fee</span>
                        <span className="text-sm font-black text-gray-800">Rs. {feeValue}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm font-bold text-gray-800">Total Due</span>
                        <span className="text-lg font-black text-primary">Rs. {feeValue}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl text-center bg-gray-50/50">
                        {payment ? (
                            <div className="space-y-4">
                                <div className="relative inline-block">
                                    <img 
                                        src={payment.receipt_image} 
                                        alt="Receipt" 
                                        className="max-h-40 rounded-xl shadow-md border border-white mx-auto"
                                    />
                                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                                        <CheckCircle2 size={16} />
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-gray-800">රිසිට්පත ලැබී ඇත (Receipt Received)</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Admin will review shortly</p>
                                {status !== 'Approved' && (
                                    <label className={`cursor-pointer text-primary hover:text-secondary text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {uploading ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
                                        <span>{uploading ? 'Uploading...' : 'Change Receipt'}</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                    </label>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                                    <ImageIcon className="text-gray-300" size={32} />
                                </div>
                                <p className="text-sm font-bold text-gray-500 mb-6 leading-relaxed">
                                    ගෙවීම් සිදුකළ පසු, බැංකු රිසිට්පතේ පැහැදිලි ඡායාරූපයක් මෙතැනින් උඩුගත කරන්න.
                                    <br />
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1 block">(Upload your bank receipt here)</span>
                                </p>
                                <label className={`cursor-pointer bg-primary hover:bg-secondary text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center space-x-3 transition-all active:scale-95 mx-auto w-fit ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                                    <span>{uploading ? 'Uploading...' : 'Upload Receipt'}</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                                </label>
                            </>
                        )}
                    </div>

                    <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 flex items-center justify-between">
                        <p className="text-[11px] font-bold text-green-700 leading-tight">
                            ඔබට රිසිට්පත WhatsApp කිරීමට අවශ්‍ය නම්:
                        </p>
                        <a 
                            href="https://wa.me/94707268008" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-green-600 font-black text-[11px] uppercase tracking-widest hover:underline"
                        >
                            WhatsApp Help
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSection;
