import React, { useEffect, useState } from 'react';
import { WorkshopSession } from '../../types';
import { adminApi } from '../../api/adminApi';
import { WorkshopFormModal } from './WorkshopFormModal';
import { Plus, Edit2, Trash2, Loader2, Users, MapPin, IndianRupee } from 'lucide-react';

export const WorkshopsTab: React.FC = () => {
  const [workshops, setWorkshops] = useState<WorkshopSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<WorkshopSession | null>(null);

  const loadWorkshops = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await adminApi.getWorkshops();
      setWorkshops(data);
    } catch (err: any) {
      setLoadError(err.message || 'Could not load workshops.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleOpenAdd = () => {
    setEditingWorkshop(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (w: WorkshopSession) => {
    setEditingWorkshop(w);
    setIsModalOpen(true);
  };

  const handleSave = async (workshop: Partial<WorkshopSession>) => {
    try {
      if (editingWorkshop) {
        const updated = await adminApi.updateWorkshop(editingWorkshop.id, workshop);
        setWorkshops((prev) => prev.map((w) => (w.id === updated.id ? updated : w)));
      } else {
        const created = await adminApi.createWorkshop(workshop);
        setWorkshops((prev) => [...prev, created]);
      }
    } catch (err: any) {
      alert(err.message || 'Could not save workshop.');
    }
  };

  const handleDelete = async (w: WorkshopSession) => {
    if (!confirm(`Delete workshop "${w.title}"? This can't be undone.`)) return;
    try {
      await adminApi.deleteWorkshop(w.id);
      setWorkshops((prev) => prev.filter((x) => x.id !== w.id));
    } catch (err: any) {
      alert(err.message || 'Could not delete workshop.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#18564D]">Workshops ({workshops.length})</h3>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Workshop
        </button>
      </div>

      {isLoading ? (
        <div className="p-10 flex items-center justify-center text-gray-400 gap-2 text-sm bg-white rounded-3xl border border-gray-200">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading workshops...
        </div>
      ) : loadError ? (
        <div className="p-10 text-center text-sm text-red-600 font-semibold bg-white rounded-3xl border border-gray-200">{loadError}</div>
      ) : workshops.length === 0 ? (
        <div className="p-10 text-center text-sm text-gray-400 bg-white rounded-3xl border border-dashed border-gray-300">
          No workshops in the database yet. Note: the site is currently showing the bundled sample sessions —
          add your real workshops here and they'll replace those automatically.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workshops.map((w) => (
            <div key={w.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="h-32 bg-gray-100 relative">
                {w.image ? (
                  <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-bold">No Image</div>
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#134e48] text-white text-[9px] font-black uppercase">
                  {w.level}
                </span>
              </div>
              <div className="p-3.5 flex flex-col gap-2 flex-1">
                <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-2">{w.title}</h4>
                <div className="flex items-center gap-3 text-[10px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{w.pricePerSeat}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{w.bookedSeats}/{w.totalSeats}</span>
                </div>
                {w.location && (
                  <span className="flex items-center gap-1 text-[10px] text-gray-500 truncate">
                    <MapPin className="w-3 h-3 shrink-0" /> <span className="truncate">{w.location}</span>
                  </span>
                )}
                <div className="mt-auto pt-2 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(w)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold transition-colors"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(w)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    aria-label={`Delete ${w.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <WorkshopFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialWorkshop={editingWorkshop}
      />
    </div>
  );
};
