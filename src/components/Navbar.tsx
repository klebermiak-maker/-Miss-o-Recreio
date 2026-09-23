import React from 'react';
import { GameTab } from '../types/game';
import { Sparkles, Binary, Wallet, KeyRound, Award, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  currentTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  stars: number;
  onOpenTeacherGuide: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  stars,
  onOpenTeacherGuide,
  onOpenCertificate
}) => {
  return (
    <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-2xl shadow-md transform -rotate-3 hover:rotate-0 transition">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-tight font-['Fredoka']">
                Missão Recreio
              </h1>
              <span className="bg-amber-300 text-amber-950 text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                4º Ano
              </span>
            </div>
            <p className="text-xs text-indigo-100 hidden sm:block">
              Códigos Digitais (EF04CO04) & Educação Financeira
            </p>
          </div>
        </div>

        {/* Right tools: Stars, Teacher guide, Certificate, Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-inner">
            <span className="text-yellow-300 text-lg animate-bounce">⭐</span>
            <span className="font-black text-sm text-yellow-200">{stars}</span>
            <span className="text-xs text-indigo-100 hidden md:inline">estrelas</span>
          </div>

          {/* Certificate button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCertificate();
            }}
            title="Ver Certificado de Mestre"
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs px-3 py-1.5 rounded-full shadow-md transition active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span className="hidden md:inline">Certificado</span>
          </button>

          {/* Pedagogical guide */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTeacherGuide();
            }}
            title="Guia Pedagógico BNCC (Professor)"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Sound toggle */}
          <button
            onClick={() => {
              sound.playClick();
              onToggleSound();
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
            title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-300" />}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-black/20 border-t border-white/10 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex gap-2 py-1.5 min-w-max">
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('campaign');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentTab === 'campaign'
                ? 'bg-white text-indigo-900 shadow-md transform -translate-y-0.5'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Aventura do Recreio</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('codelab');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentTab === 'codelab'
                ? 'bg-white text-indigo-900 shadow-md transform -translate-y-0.5'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Binary className="w-4 h-4 text-emerald-500" />
            <span>Laboratório de Códigos (EF04CO04)</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('financelab');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentTab === 'financelab'
                ? 'bg-white text-indigo-900 shadow-md transform -translate-y-0.5'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <Wallet className="w-4 h-4 text-amber-500" />
            <span>Cantina & Cofrinho</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('encoder');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentTab === 'encoder'
                ? 'bg-white text-indigo-900 shadow-md transform -translate-y-0.5'
                : 'text-white/90 hover:bg-white/10'
            }`}
          >
            <KeyRound className="w-4 h-4 text-pink-400" />
            <span>Criador Secreto</span>
          </button>
        </div>
      </div>
    </header>
  );
};
