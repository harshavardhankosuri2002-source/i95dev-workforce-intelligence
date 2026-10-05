import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useWorkforce } from '../context/WorkforceContext';

export const Toast: React.FC = () => {
  const { toast } = useWorkforce();

  if (!toast) return null;

  const getStyle = () => {
    switch (toast.type) {
      case 'success':
        return {
          icon: CheckCircle2,
          bg: 'bg-slate-900 border-slate-700 text-white',
          iconColor: 'text-emerald-400'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          bg: 'bg-amber-950 border-amber-800 text-amber-50',
          iconColor: 'text-amber-400'
        };
      case 'info':
        return {
          icon: Info,
          bg: 'bg-slate-900 border-slate-700 text-white',
          iconColor: 'text-brand-400'
        };
      default:
        return {
          icon: Info,
          bg: 'bg-slate-900 border-slate-700 text-white',
          iconColor: 'text-white'
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-xs font-semibold ${style.bg}`}>
        <Icon className={`w-4 h-4 shrink-0 ${style.iconColor}`} />
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
