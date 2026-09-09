import React, { useEffect, useState } from 'react';
import { adminApi } from '../../api/adminApi';
import { groupContentSchemaByPage } from '../../data/siteContent';
import { FileText, Save, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';

export const ContentEditorTab: React.FC = () => {
  const grouped = groupContentSchemaByPage();
  const pages = Object.keys(grouped);

  const [activePage, setActivePage] = useState(pages[0]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const overrides = await adminApi.getContent();
        setValues(overrides);
      } catch {
        // fine — just start with an empty override set (all defaults shown)
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaveMessage('');
  };

  const handleResetField = (key: string) => {
    setValues((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      // Send every schema key currently in state (including empty strings
      // for reset fields, which the server treats as "clear the override").
      const updates: Record<string, string> = {};
      for (const field of grouped[activePage]) {
        updates[field.key] = values[field.key] ?? '';
      }
      const saved = await adminApi.updateContent(updates);
      setValues((prev) => ({ ...prev, ...saved }));
      setSaveMessage('Saved! Changes are now live on your site.');
    } catch (err: any) {
      setSaveMessage(err.message || 'Could not save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <h3 className="text-sm font-black text-[#18564D] flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-[#EDA124]" />
          Edit Page Text
        </h3>
        <p className="text-xs text-gray-500">
          Change any headline or description below and hit Save — it updates live on your site immediately, no code or redeploy needed.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => { setActivePage(page); setSaveMessage(''); }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              activePage === page ? 'bg-[#18564D] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="p-10 flex items-center justify-center text-gray-400 gap-2 text-sm bg-white rounded-3xl border border-gray-200">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading current text...
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-5 space-y-4">
          {grouped[activePage].map((field) => (
            <div key={field.key}>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">{field.label}</label>
                {values[field.key] !== undefined && values[field.key] !== '' && (
                  <button
                    type="button"
                    onClick={() => handleResetField(field.key)}
                    className="text-[10px] font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset to default
                  </button>
                )}
              </div>
              {field.type === 'textarea' ? (
                <textarea
                  value={values[field.key] ?? field.default}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none focus:outline-none focus:border-[#18564D]"
                />
              ) : (
                <input
                  type="text"
                  value={values[field.key] ?? field.default}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#18564D]"
                />
              )}
            </div>
          ))}

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-sm font-bold shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
            {saveMessage && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {saveMessage}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
