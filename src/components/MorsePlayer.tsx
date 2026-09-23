import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { MORSE_CODE_MAP } from '../data/gameData';
import { Play, Volume2, Lightbulb, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface MorsePlayerProps {
  sequence: string; // e.g. "-... / --- / --"
  secretWord?: string;
  showWordHint?: boolean;
}

export const MorsePlayer: React.FC<MorsePlayerProps> = ({
  sequence,
  secretWord,
  showWordHint = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handlePlayMorse = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    await sound.playMorseCode(sequence, (lit) => {
      setIsLit(lit);
    });
    setIsPlaying(false);
    setIsLit(false);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl border-4 border-slate-800">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            📡
          </div>
          <div>
            <h4 className="font-bold text-sm text-amber-400 font-['Fredoka']">
              Estação de Transmissão Morse
            </h4>
            <p className="text-xs text-slate-400">Pontos (.) curtos e Traços (-) longos</p>
          </div>
        </div>

        <button
          onClick={() => setShowTable(!showTable)}
          className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 transition"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {showTable ? 'Ocultar Tabela' : 'Ver Alfabeto Morse'}
        </button>
      </div>

      {/* Main interactive area: Light bulb + Play button + Visual display */}
      <div className="py-6 flex flex-col items-center justify-center gap-4">
        {/* Glowing Lamp / Transmitter Light */}
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-100 ${
              isLit
                ? 'bg-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.9)] scale-110'
                : 'bg-slate-800 border-2 border-slate-700 shadow-inner'
            }`}
          >
            <Lightbulb
              className={`w-10 h-10 transition-colors ${
                isLit ? 'text-amber-950 stroke-[2.5]' : 'text-slate-600'
              }`}
            />
          </div>
          {isLit && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-300 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              BIP!
            </div>
          )}
        </div>

        {/* Code display */}
        <div className="bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800 font-mono text-2xl tracking-widest text-amber-400 shadow-inner text-center">
          {sequence}
        </div>

        {/* Action Button */}
        <button
          onClick={handlePlayMorse}
          disabled={isPlaying}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-black px-6 py-3 rounded-2xl shadow-lg transform active:scale-95 disabled:opacity-50 transition"
        >
          <Play className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          <span>{isPlaying ? 'Transmitindo Sinais...' : 'Ouvir e Ver Código Morse'}</span>
        </button>

        {showWordHint && secretWord && (
          <div className="text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <span>Dica do Professor: palavra com {secretWord.length} letras.</span>
          </div>
        )}
      </div>

      {/* Morse Alphabet Reference Table Modal/Drawer */}
      {showTable && (
        <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950/90 rounded-2xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
            Tabela de Consulta (Alfabeto Internacional):
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-48 overflow-y-auto pr-1">
            {Object.entries(MORSE_CODE_MAP)
              .filter(([k]) => /^[A-Z0-9]$/.test(k))
              .map(([letter, code]) => (
                <div
                  key={letter}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-center flex flex-col items-center justify-center hover:border-amber-400/50 transition cursor-pointer"
                  onClick={() => sound.playMorseCode(code)}
                  title={`Ouvir letra ${letter}`}
                >
                  <span className="text-sm font-black text-white">{letter}</span>
                  <span className="text-[11px] font-mono text-amber-400">{code}</span>
                </div>
              ))}
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            💡 Dica: Clique em qualquer letra para ouvir o som dela!
          </p>
        </div>
      )}
    </div>
  );
};
