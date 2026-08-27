import React, { useState } from 'react';
import { StoreSettings } from '../../types';
import { Save, Check, RotateCcw, Download, Upload, Phone, Bell, MapPin, CreditCard, Sparkles } from 'lucide-react';

interface StoreSettingsTabProps {
  settings: StoreSettings;
  onSaveSettings: (settings: Partial<StoreSettings>) => void;
  onResetDefaults: () => void;
}

export const StoreSettingsTab: React.FC<StoreSettingsTabProps> = ({
  settings,
  onSaveSettings,
  onResetDefaults
}) => {
  const [formData, setFormData] = useState<StoreSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [rawJson, setRawJson] = useState('');
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  const handleChange = (field: keyof StoreSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBannerChange = (field: 'enabled' | 'textEn' | 'textMr', value: any) => {
    setFormData(prev => ({
      ...prev,
      announcementBanner: {
        ...prev.announcementBanner,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `21kalya_store_settings_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      setFormData(parsed);
      onSaveSettings(parsed);
      setShowJsonEditor(false);
      alert('Settings successfully imported from JSON!');
    } catch {
      alert('Invalid JSON format. Please check and try again.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#18564D] text-[#F8EDE0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#EDA124]/40 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EDA124] block">Storefront Customizer</span>
          <h3 className="text-lg font-bold text-white mt-0.5">२१ कळ्या ब्रँड व संपर्क सेटिंग्ज</h3>
          <p className="text-xs text-white/80 mt-1">
            Customize your customer WhatsApp ordering number, banner ticker, Sanskrit tagline, and delivery rates.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-[#F8EDE0] rounded-xl text-xs font-bold transition-all border border-white/20"
          >
            <Download className="w-3.5 h-3.5" /> Export JSON
          </button>
          <button
            type="button"
            onClick={onResetDefaults}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-xl text-xs font-bold transition-all border border-red-400/30"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Contact & WhatsApp */}
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">WhatsApp & Devotee Support</h4>
              <p className="text-xs text-gray-500">Orders and pre-booking inquiries will route directly to this WhatsApp number.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                WhatsApp Business Number *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={e => handleChange('whatsappNumber', e.target.value)}
                placeholder="+919822121021"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-mono"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">Include country code with + (e.g. +919822121021)</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store Phone (Display)
              </label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={e => handleChange('supportPhone', e.target.value)}
                placeholder="+91 98221 21021"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={e => handleChange('supportEmail', e.target.value)}
                placeholder="orders@21kalyamodak.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Brand & Sanskrit Motto */}
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-amber-50 text-[#EDA124]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">Brand Identity & Taglines</h4>
              <p className="text-xs text-gray-500">Sacred headings and Sanskrit motto displayed in headers and packaging.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store Title (English)
              </label>
              <input
                type="text"
                value={formData.storeName}
                onChange={e => handleChange('storeName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-devanagari">
                दुकान नाव (Marathi Brand Title)
              </label>
              <input
                type="text"
                value={formData.marathiStoreName}
                onChange={e => handleChange('marathiStoreName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-devanagari font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                English Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-devanagari">
                संस्कृत ध्येयवाक्य (Sacred Tagline)
              </label>
              <input
                type="text"
                value={formData.marathiTagline}
                onChange={e => handleChange('marathiTagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-devanagari font-bold text-[#18564D]"
              />
            </div>
          </div>
        </div>

        {/* Announcement Ticker Banner */}
        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Top Announcement Banner</h4>
                <p className="text-xs text-gray-500">Shown at the very top of the website for festive alerts & bookings.</p>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.announcementBanner.enabled}
                onChange={e => handleBannerChange('enabled', e.target.checked)}
                className="w-4 h-4 rounded text-[#18564D] focus:ring-[#18564D]"
              />
              <span className="text-xs font-bold text-gray-700">Enable Ticker</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                English Banner Text
              </label>
              <input
                type="text"
                value={formData.announcementBanner.textEn}
                onChange={e => handleBannerChange('textEn', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 font-devanagari">
                मराठी बॅनर मजकूर (Marathi Ticker)
              </label>
              <input
                type="text"
                value={formData.announcementBanner.textMr}
                onChange={e => handleBannerChange('textMr', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm font-devanagari"
              />
            </div>
          </div>
        </div>

        {/* Location, UPI & Delivery Rates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Physical Store Location</h4>
                <p className="text-xs text-gray-500">Printed on invoices and pickup maps.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Store Address
              </label>
              <textarea
                rows={2}
                value={formData.storeAddress}
                onChange={e => handleChange('storeAddress', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm resize-none"
              />
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">UPI & Delivery Pricing</h4>
                <p className="text-xs text-gray-500">Payment ID and automatic free shipping thresholds.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  UPI ID (VPA)
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={e => handleChange('upiId', e.target.value)}
                  placeholder="21kalya@icici"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={formData.deliveryCharge}
                  onChange={e => handleChange('deliveryCharge', Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-between p-4 bg-[#18564D] rounded-2xl shadow-xl border border-[#EDA124]/40 text-white">
          <div className="flex items-center gap-2">
            {savedSuccess ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#EDA124]">
                <Check className="w-4 h-4" /> Settings Saved to Backend!
              </span>
            ) : (
              <span className="text-xs text-white/80">
                Changes will take effect immediately on your customer storefront.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#EDA124] text-gray-950 text-sm font-extrabold shadow-md hover:bg-[#ffb03a] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Store Settings
          </button>
        </div>

      </form>

      {/* Advanced Raw JSON Editor */}
      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Developer / Raw JSON Configuration</h4>
            <p className="text-xs text-gray-500">Directly inspect or import custom store payload configuration.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRawJson(JSON.stringify(formData, null, 2));
              setShowJsonEditor(!showJsonEditor);
            }}
            className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {showJsonEditor ? 'Hide JSON Editor' : 'Open JSON Editor'}
          </button>
        </div>

        {showJsonEditor && (
          <div className="mt-4 space-y-3">
            <textarea
              rows={8}
              value={rawJson}
              onChange={e => setRawJson(e.target.value)}
              className="w-full p-3 font-mono text-xs bg-gray-900 text-emerald-400 rounded-xl border border-gray-700 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleImportJson}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18564D] text-[#F8EDE0] text-xs font-bold rounded-xl hover:bg-[#13443d]"
              >
                <Upload className="w-3.5 h-3.5" /> Apply JSON Import
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
