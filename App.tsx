
import React, { useState, useEffect, useCallback } from 'react';
import { SPORTS_LIST } from './constants';
import { AppState, Sport } from './types';
import { SportCard } from './components/SportCard';
import { DetailSection } from './components/DetailSection';
import { getSportRecommendations } from './services/geminiService';
import { Activity, Search, AlertCircle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    selectedSport: null,
    details: null,
    isLoading: false,
    error: null
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSportSelect = useCallback(async (sport: Sport) => {
    setState(prev => ({ 
      ...prev, 
      selectedSport: sport, 
      isLoading: true, 
      error: null,
      details: null 
    }));

    try {
      const details = await getSportRecommendations(sport);
      setState(prev => ({ ...prev, details, isLoading: false }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Ocurrió un error inesperado' 
      }));
    }
  }, []);

  const filteredSports = SPORTS_LIST.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen text-slate-100 selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Navbar-ish Header */}
        <header className="mb-16 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 shadow-sm animate-bounce duration-[3000ms]">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Sport Recommender</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Domina tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Deporte</span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl">
            Selecciona una disciplina y deja que nuestra IA cree una rutina de entrenamiento personalizada basada en biomecánica y requerimientos específicos del deporte.
          </p>

          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar deporte (ej: Fútbol, Escalada...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </header>

        {/* Sports Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredSports.map(sport => (
              <SportCard
                key={sport.id}
                sport={sport}
                isSelected={state.selectedSport?.id === sport.id}
                onClick={handleSportSelect}
              />
            ))}
          </div>
          {filteredSports.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No encontramos deportes que coincidan con tu búsqueda.
            </div>
          )}
        </section>

        {/* Dynamic Content Area */}
        <main className="relative min-h-[400px]">
          {state.isLoading && (
            <div className="flex flex-col items-center justify-center py-24 space-y-6 animate-pulse">
              <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
              <div className="text-center">
                <p className="text-xl font-bold text-white uppercase tracking-tight">Consultando con el experto...</p>
                <p className="text-slate-400 text-sm">Analizando biometría y demandas de {state.selectedSport?.name}</p>
              </div>
            </div>
          )}

          {state.error && (
            <div className="max-w-xl mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-center gap-4 text-red-400">
              <AlertCircle className="shrink-0 w-8 h-8" />
              <p className="font-medium">{state.error}</p>
            </div>
          )}

          {!state.isLoading && !state.error && state.details && state.selectedSport && (
            <DetailSection sport={state.selectedSport} details={state.details} />
          )}

          {!state.selectedSport && !state.isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-slate-800 rounded-3xl">
              <div className="p-4 bg-slate-800 rounded-full text-slate-600">
                <Activity className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-500">Preparado para el siguiente nivel?</h3>
                <p className="text-slate-600">Elige un deporte arriba para ver el plan de entrenamiento personalizado.</p>
              </div>
            </div>
          )}
        </main>

        <footer className="mt-20 py-12 border-t border-slate-800/50 text-center text-slate-600 text-sm">
          <p>© 2024 SportTrain AI. Potenciado por Gemini 2.0. Entrena con inteligencia.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
