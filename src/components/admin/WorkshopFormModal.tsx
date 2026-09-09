import React, { useState, useEffect } from 'react';
import { WorkshopSession } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';

interface WorkshopFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workshop: Partial<WorkshopSession>) => void;
  initialWorkshop?: WorkshopSession | null;
}

export const WorkshopFormModal: React.FC<WorkshopFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialWorkshop,
}) => {
  const [title, setTitle] = useState('');
  const [marathiTitle, setMarathiTitle] = useState('');
  const [mode, setMode] = useState<'online' | 'offline' | 'type3'>('offline');
  const [level, setLevel] = useState<WorkshopSession['level']>('Beginner');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [instructor, setInstructor] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState(799);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [totalSeats, setTotalSeats] = useState(20);
  const [bookedSeats, setBookedSeats] = useState(0);
  const [description, setDescription] = useState('');
  const [highlightsText, setHighlightsText] = useState('');
  const [syllabusText, setSyllabusText] = useState('');
  const [includesKit, setIncludesKit] = useState(false);
  const [urgency, setUrgency] = useState<'high' | 'medium' | 'normal'>('normal');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (initialWorkshop) {
      setTitle(initialWorkshop.title);
      setMarathiTitle(initialWorkshop.marathiTitle || '');
      setMode(initialWorkshop.mode);
      setLevel(initialWorkshop.level);
      setDate(initialWorkshop.date || '');
      setDay(initialWorkshop.day || '');
      setTimeRange(initialWorkshop.timeRange || '');
      setDuration(initialWorkshop.duration || '');
      setLocation(initialWorkshop.location || '');
      setInstructor(initialWorkshop.instructor || '');
      setPricePerSeat(initialWorkshop.pricePerSeat);
      setOriginalPrice(initialWorkshop.originalPrice ?? '');
      setTotalSeats(initialWorkshop.totalSeats);
      setBookedSeats(initialWorkshop.bookedSeats);
      setDescription(initialWorkshop.description || '');
      setHighlightsText((initialWorkshop.highlights || []).join('\n'));
      setSyllabusText((initialWorkshop.syllabus || []).join('\n'));
      setIncludesKit(Boolean(initialWorkshop.includesKit));
      setUrgency(initialWorkshop.urgency || 'normal');
      setImage(initialWorkshop.image || '');
    } else {
      setTitle('');
      setMarathiTitle('');
      setMode('offline');
      setLevel('Beginner');
      setDate('Upcoming Saturday');
      setDay('Weekend');
      setTimeRange('10:00 AM – 12:30 PM');
      setDuration('2.5 Hours');
      setLocation('');
      setInstructor('');
      setPricePerSeat(799);
      setOriginalPrice('');
      setTotalSeats(20);
      setBookedSeats(0);
      setDescription('');
      setHighlightsText('');
      setSyllabusText('');
      setIncludesKit(false);
      setUrgency('normal');
      setImage('');
    }
  }, [initialWorkshop, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !pricePerSeat) return;

    onSave({
      id: initialWorkshop?.id,
      title,
      marathiTitle: marathiTitle || title,
      mode,
      level,
      date,
      day,
      timeRange,
      duration,
      location,
      instructor,
      pricePerSeat: Number(pricePerSeat),
      originalPrice: originalPrice === '' ? undefined : Number(originalPrice),
      totalSeats: Number(totalSeats) || 20,
      bookedSeats: Number(bookedSeats) || 0,
      description,
      highlights: highlightsText.split('\n').map((s) => s.trim()).filter(Boolean),
      syllabus: syllabusText.split('\n').map((s) => s.trim()).filter(Boolean),
      includesKit,
      urgency,
      image,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-200 shrink-0">
          <h2 className="text-lg font-black text-[#18564D]">
            {initialWorkshop ? 'Edit Workshop' : 'Add New Workshop'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-4">

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title (English)</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title (Marathi)</label>
              <input
                type="text" value={marathiTitle} onChange={(e) => setMarathiTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#18564D] text-sm"
              />
            </div>
          </div>

          {/* Image */}
          <ImageUploadField label="Workshop Photo" value={image} onChange={setImage} />

          {/* Mode / Level / Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Section / Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value as any)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white">
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="type3">Type 3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Level</label>
              <select value={level} onChange={(e) => setLevel(e.target.value as any)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white">
                <option value="Beginner">Beginner</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Chef Intensive">Chef Intensive</option>
                <option value="Family & Kids">Family & Kids</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Urgency Badge</label>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value as any)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white">
                <option value="normal">None</option>
                <option value="medium">Medium</option>
                <option value="high">Fast Filling</option>
              </select>
            </div>
          </div>

          {/* Date / Day / Time / Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Date Label</label>
              <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Upcoming Saturday & Sunday"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Day Label</label>
              <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Weekend Intensive"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Time Range</label>
              <input type="text" value={timeRange} onChange={(e) => setTimeRange(e.target.value)} placeholder="10:00 AM – 12:30 PM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Duration</label>
              <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="2.5 Hours"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
          </div>

          {/* Location / Instructor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Instructor</label>
              <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
          </div>

          {/* Pricing & Seats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Price (₹)</label>
              <input type="number" min={0} value={pricePerSeat} onChange={(e) => setPricePerSeat(Number(e.target.value))} required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Original Price</label>
              <input type="number" min={0} value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Total Seats</label>
              <input type="number" min={1} value={totalSeats} onChange={(e) => setTotalSeats(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Booked Seats</label>
              <input type="number" min={0} value={bookedSeats} onChange={(e) => setBookedSeats(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none" />
          </div>

          {/* Highlights & Syllabus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Highlights (one per line)
              </label>
              <textarea value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} rows={4}
                placeholder="Hands-on individual workstation&#10;Take-home gift box"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Syllabus (one per line)
              </label>
              <textarea value={syllabusText} onChange={(e) => setSyllabusText(e.target.value)} rows={4}
                placeholder="Dough Science&#10;21-Pleat Technique"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm resize-none" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-gray-700">
            <input type="checkbox" checked={includesKit} onChange={(e) => setIncludesKit(e.target.checked)} className="w-4 h-4 accent-[#18564D]" />
            Includes a take-home ingredient kit
          </label>

        </form>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 shrink-0">
          <button onClick={onClose} type="button" className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} type="button" className="px-6 py-2.5 rounded-xl bg-[#18564D] hover:bg-[#0f3c36] text-white text-sm font-bold shadow-sm transition-colors">
            {initialWorkshop ? 'Save Changes' : 'Add Workshop'}
          </button>
        </div>
      </div>
    </div>
  );
};
