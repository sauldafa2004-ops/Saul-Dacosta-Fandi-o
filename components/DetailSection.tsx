
import React from 'react';
import { SportDetails, Sport } from '../types';
import { ChevronRight, ShieldCheck, Dumbbell, Apple, Target } from 'lucide-react';

interface DetailSectionProps {
  sport: Sport;
  details: SportDetails;
}

export const DetailSection: React.FC<DetailSectionProps> = ({ sport, details }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-8 pb-12">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-emerald-400" />
            <h4 className="text-xl font-bold text-white uppercase tracking-tight">Habilidades Clave</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {details.mainSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-400" />
            <h4 className="text-xl font-bold text-white uppercase tracking-tight">Prevención</h4>
          </div>
          <ul className="space-y-2">
            {details.injuryPrevention.map((tip, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Exercises */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Dumbbell className="text-orange-400 w-8 h-8" />
          <h4 className="text-3xl font-extrabold text-white">Ejercicios Recomendados</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.recommendations.map((ex, i) => (
            <div key={i} className="bg-slate-800 hover:bg-slate-750 transition-colors p-6 rounded-3xl border border-slate-700 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h5 className="text-lg font-bold text-emerald-400">{ex.name}</h5>
                <span className="px-2 py-1 bg-slate-700 rounded text-xs font-mono text-slate-300">{ex.reps}</span>
              </div>
              <p className="text-slate-300 text-sm mb-4 flex-grow italic">"{ex.description}"</p>
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Beneficio:</p>
                <p className="text-sm text-slate-200">{ex.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nutritional Banner */}
      <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 p-8 rounded-3xl border border-orange-500/30 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-orange-500 rounded-2xl shadow-lg shadow-orange-500/20">
          <Apple className="w-8 h-8 text-white" />
        </div>
        <div>
          <h5 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">Consejo de Nutrición Pro</h5>
          <p className="text-slate-200 leading-relaxed italic">{details.nutritionalTip}</p>
        </div>
      </div>
    </div>
  );
};
