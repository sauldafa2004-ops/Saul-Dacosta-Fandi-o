
import React from 'react';
import { 
  Dribbble, 
  Activity, 
  Waves, 
  Trophy, 
  Zap, 
  Heart, 
  Target, 
  Users,
  Wind,
  Mountain
} from 'lucide-react';
import { Sport, SportCategory } from './types';

export const SPORTS_LIST: Sport[] = [
  {
    id: 'football',
    name: 'Fútbol',
    icon: '⚽',
    category: SportCategory.TEAM,
    description: 'Deporte de alta intensidad que requiere explosividad y resistencia.',
    color: 'bg-emerald-500'
  },
  {
    id: 'basketball',
    name: 'Baloncesto',
    icon: '🏀',
    category: SportCategory.TEAM,
    description: 'Salto vertical, agilidad lateral y coordinación mano-ojo.',
    color: 'bg-orange-500'
  },
  {
    id: 'tennis',
    name: 'Tenis',
    icon: '🎾',
    category: SportCategory.INDIVIDUAL,
    description: 'Movimientos rápidos, potencia de core y estabilidad en hombros.',
    color: 'bg-lime-500'
  },
  {
    id: 'swimming',
    name: 'Natación',
    icon: '🏊',
    category: SportCategory.WATER,
    description: 'Entrenamiento de cuerpo completo con bajo impacto articular.',
    color: 'bg-blue-500'
  },
  {
    id: 'running',
    name: 'Running',
    icon: '🏃',
    category: SportCategory.INDIVIDUAL,
    description: 'Resistencia cardiovascular y fuerza en cadena posterior.',
    color: 'bg-red-500'
  },
  {
    id: 'boxing',
    name: 'Boxeo',
    icon: '🥊',
    category: SportCategory.COMBAT,
    description: 'Coordinación, explosividad y alta demanda metabólica.',
    color: 'bg-slate-700'
  },
  {
    id: 'cycling',
    name: 'Ciclismo',
    icon: '🚲',
    category: SportCategory.OUTDOOR,
    description: 'Potencia en piernas y resistencia de larga duración.',
    color: 'bg-indigo-500'
  },
  {
    id: 'climbing',
    name: 'Escalada',
    icon: '🧗',
    category: SportCategory.OUTDOOR,
    description: 'Fuerza de agarre, flexibilidad y control corporal total.',
    color: 'bg-amber-600'
  }
];

export const getLucideIcon = (id: string) => {
  const iconProps = { className: "w-6 h-6", strokeWidth: 2 };
  switch (id) {
    case 'football': return <Dribbble {...iconProps} />;
    case 'basketball': return <Target {...iconProps} />;
    case 'tennis': return <Zap {...iconProps} />;
    case 'swimming': return <Waves {...iconProps} />;
    case 'running': return <Activity {...iconProps} />;
    case 'boxing': return <Heart {...iconProps} />;
    case 'cycling': return <Wind {...iconProps} />;
    case 'climbing': return <Mountain {...iconProps} />;
    default: return <Trophy {...iconProps} />;
  }
};
