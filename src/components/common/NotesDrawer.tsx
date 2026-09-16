import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Check } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface NotesDrawerProps {
  slug: string;
  topicTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NotesDrawer: React.FC<NotesDrawerProps> = ({
  slug,
  topicTitle,
  isOpen,
  onClose,
}) => {
  const { getNote, saveNote } = useProgress();
  const [content, setContent] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    if (slug) {
      setContent(getNote(slug));
    }
  }, [slug]);

  const handleSave = () => {
    saveNote(slug, content);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white dark:bg-[#0e1017] border-l border-[#e5e5e5] dark:border-[#222] w-full max-w-md h-full p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#e5e5e5] dark:border-[#222] mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm text-black dark:text-white">Personal Study Notes</h3>
              <p className="text-xs text-[#666] dark:text-[#888] font-mono">{topicTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#888] hover:text-[#333] dark:hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 flex flex-col mb-4">
          <label className="text-xs text-[#555] dark:text-[#888] mb-2 font-medium">
            Write markdown notes, mental reminders, or gotchas for this topic:
          </label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="e.g., Remember to always use functional state setter `setCount(prev => ...)` when next state depends on current state!"
            className="flex-1 p-3 bg-[#fafafa] dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#222] rounded-lg text-xs font-mono text-black dark:text-[#ededed] resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#e5e5e5] dark:border-[#222]">
          <span className="text-xs text-[#666]">
            {savedMessage ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" /> Saved to local notebook
              </span>
            ) : (
              'Auto-persisted locally'
            )}
          </span>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-sm shadow-emerald-500/20"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};
