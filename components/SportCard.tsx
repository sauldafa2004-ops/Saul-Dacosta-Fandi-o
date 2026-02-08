
import React from 'react';
import { Sport } from '../types';
import { getLucideIcon } from '../constants';

interface SportCardProps {
  sport: Sport;
  isSelected: boolean;
  onClick: (sport: Sport) => void;
}

export const SportCard: React.FC<SportCardProps> = ({ sport, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(sport)}
      className={`relative group p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center space-y-4 overflow-hidden
        ${isSelected 
          ? 'bg-slate-800 ring-2 ring-emerald-400 ring-offset-4 ring-offset-slate-900 shadow-xl shadow-emerald-900/20' 
          : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700 shadow-md'
        }`}
    >
      <div className={`p-4 rounded-full ${sport.color} text-white shadow-lg transition-transform group-hover:rotate-12`}>
        <div className="text-3xl mb-1">{sport.icon}</div>
      </div>
      
      <div>
        <h3 className={`text-lg font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-100'}`}>
          {sport.name}
        </h3>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
          {sport.category}
        </p>
      </div>

      <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500`}>
        {getLucideIcon(sport.id)}
      </div>
    </button>
  );
};
