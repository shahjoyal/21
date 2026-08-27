import React, { useState } from 'react';
import { X, ChefHat, Phone, Building, Send, CheckCircle2, MessageCircle, Users, Calendar, Sparkles } from 'lucide-react';

interface WorkshopInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'mr';
}

export const WorkshopInquiryModal: React.FC<WorkshopInquiryModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const isMarathi = language === 'mr';
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    phone: '',
    email: '',
    city: 'Pune / Mumbai',
    participantCount: '15-30 Participants',
    workshopType: 'Corporate Team-Building Masterclass',
    preferredFormat: 'In-Studio Kitchen (Pune / Mumbai)',
    eventDate: '',
    customNotes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSendWhatsAppQuote = () => {
    const text = `*👨‍🍳 21 Kalya Culinary Studio - Workshop Inquiry 👨‍🍳*\n\n*Company/Group:* ${formData.organizationName || 'Private Group'}\n*Contact Person:* ${formData.contactPerson}\n*Phone:* ${formData.phone}\n*Participants:* ${formData.participantCount}\n*Workshop Type:* ${formData.workshopType}\n*Format:* ${formData.preferredFormat}\n*Preferred Date:* ${formData.eventDate}\n*Notes:* ${formData.customNotes || 'N/A'}\n\nPlease share workshop curriculum, pricing, and available studio slots.`;
    window.open(`https://wa.me/917304472460?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#FAF7F2] w-full max-w-lg max-h-[92vh] flex flex-col rounded-3xl border border-[#E89A25]/40 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#134e48] text-white flex items-center justify-between border-b border-[#E89A25]/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#18564D] border border-[#E89A25]/50 flex items-center justify-center text-[#E89A25] shrink-0">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-devanagari text-base sm:text-xl font-bold text-[#F5EEDB] leading-tight">
                {isMarathi ? 'कॉर्पोरेट व खासगी कार्यशाळा नोंदणी' : 'Corporate & Private Workshop Booking'}
              </h3>
              <span className="text-[10px] text-[#E89A25] font-semibold block">
                {isMarathi ? '१० ते २००+ सदस्यांसाठी विशेष शेफ मास्टरक्लास' : 'Customized Sessions for 10 to 200+ Guests'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#134e48] text-[#E89A25] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-devanagari text-2xl font-black text-[#134e48]">
                {isMarathi ? 'कार्यशाळा चौकशी नोंदवली गेली!' : 'Workshop Inquiry Received!'}
              </h4>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                {isMarathi
                  ? 'आमचे मुख्य शेफ समन्वयक लवकरच आपल्याशी फोन किंवा व्हॉट्सॲपवर संपर्क करून संपूर्ण तपशील देतील.'
                  : 'Our culinary events coordinator will connect with you shortly with customized workshop brochures and available dates.'}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#134e48] text-white text-xs font-bold"
              >
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'कंपनी / संस्थेचे नाव' : 'Company / Group Name'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Infosys, TCS, or Private Family Group"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'संपर्क व्यक्तीचे नाव' : 'Contact Person'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neha Sharma"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'मोबाईल नंबर' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98221 21021"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'सदस्य संख्या (Participants)' : 'No. of Participants'} *
                  </label>
                  <select
                    value={formData.participantCount}
                    onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none font-semibold text-[#134e48]"
                  >
                    <option>10 - 20 Participants (Studio Intimate)</option>
                    <option>20 - 50 Participants (Team Building)</option>
                    <option>50 - 100 Participants (Corporate Mixer)</option>
                    <option>100+ Participants (Mega Workshop / DIY Kits)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'कार्यशाळेचा प्रकार' : 'Workshop Module'} *
                  </label>
                  <select
                    value={formData.workshopType}
                    onChange={(e) => setFormData({ ...formData, workshopType: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none text-[#134e48] font-semibold"
                  >
                    <option>The 21-Fold Classic Masterclass</option>
                    <option>Gourmet Fusion & Chocolate Modak Studio</option>
                    <option>Kids & Family Sculpting Art Session</option>
                    <option>Master Chef Intensive & Certification</option>
                    <option>Custom DIY Kit Distribution & Live Stream</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isMarathi ? 'पसंतीचे स्वरूप (Format)' : 'Preferred Venue Format'} *
                  </label>
                  <select
                    value={formData.preferredFormat}
                    onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none text-[#134e48] font-semibold"
                  >
                    <option>In-Studio Kitchen (Pune Heritage Hub)</option>
                    <option>In-Studio Kitchen (Mumbai Culinary Lab)</option>
                    <option>On-site At Your Office / Venue</option>
                    <option>Live Interactive Hybrid Zoom Webinar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {isMarathi ? 'अपेक्षित तारीख (Tentative Date)' : 'Tentative Date'} *
                </label>
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {isMarathi ? 'इतर काही विशेष आवश्यकता? (Custom Requirements)' : 'Special Requests / Dietary Preferences / Branding Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder="Need branded aprons for 30 attendees, sugar-free options..."
                  value={formData.customNotes}
                  onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-[#134e48] outline-none"
                />
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#134e48] hover:bg-[#0f3c36] text-[#FAF7F2] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4 text-[#E89A25]" />
                  <span>{isMarathi ? 'कार्यशाळा कोटेशन विनंती पाठवा' : 'Request Workshop Quote & Brochure'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsAppQuote}
                  className="w-full py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{isMarathi ? 'व्हॉट्सॲपवर शेफशी थेट बोला' : 'Chat on WhatsApp with Chef Coordinator'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
