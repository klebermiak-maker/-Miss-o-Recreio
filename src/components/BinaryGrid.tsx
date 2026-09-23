import React from 'react';
import { sound } from '../utils/audio';
import { RotateCcw, CheckCircle2 } from 'lucide-react';

interface BinaryGridProps {
  grid: number[][]; // 5x5 (0 or 1)
  onChangeGrid: (newGrid: number[][]) => void;
  targetGrid?: number[][];
  binaryRowGuide?: string[];
  readOnly?: boolean;
}

export const BinaryGrid: React.FC<BinaryGridProps> = ({
  grid,
  onChangeGrid,
  targetGrid,
  binaryRowGuide,
  readOnly = false
}) => {
  const toggleCell = (r: number, c: number) => {
    if (readOnly) return;
    sound.playClick();
    const newGrid = grid.map((row, ri) =>
      row.map((val, ci) => {
        if (ri === r && ci === c) {
          return val === 1 ? 0 : 1;
        }
        return val;
      })
    );
    onChangeGrid(newGrid);
  };

  const handleClear = () => {
    sound.playClick();
    const emptyGrid = grid.map((row) => row.map(() => 0));
    onChangeGrid(emptyGrid);
  };

  // Check if current matches target
  const isMatch = targetGrid
    ? grid.every((row, r) => row.every((val, c) => val === targetGrid[r][c]))
    : false;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl border-4 border-indigo-900/50">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-2">
        <div>
          <h4 className="font-bold text-base text-indigo-400 font-['Fredoka'] flex items-center gap-2">
            <span>👾 Matriz de Pixels Binários</span>
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
              5x5
            </span>
          </h4>
          <p className="text-xs text-slate-400">
            0 = Pixel Apagado (Branco) | 1 = Pixel Aceso (Colorido)
          </p>
        </div>

        {!readOnly && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* The Interactive Pixel Matrix */}
        <div className="flex flex-col items-center">
          <div className="bg-slate-950 p-3 rounded-2xl border-2 border-indigo-500/40 shadow-inner inline-block">
            <div className="grid grid-cols-5 gap-1.5">
              {grid.map((row, r) =>
                row.map((val, c) => (
                  <button
                    key={`${r}-${c}`}
                    disabled={readOnly}
                    onClick={() => toggleCell(r, c)}
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl font-mono text-sm font-black flex items-center justify-center transition-all transform active:scale-90 ${
                      val === 1
                        ? 'bg-gradient-to-tr from-pink-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.6)] scale-100'
                        : 'bg-slate-800 text-slate-500 hover:bg-slate-700/80 border border-slate-700'
                    }`}
                  >
                    {val}
                  </button>
                ))
              )}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-medium">
            Toque nos quadradinhos para alternar entre 0 e 1
          </span>
        </div>

        {/* Binary code guide & status */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-indigo-300 font-bold uppercase text-[11px] tracking-wider mb-2">
            Código Binário Linha por Linha:
          </div>

          {grid.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900 border border-slate-800"
            >
              <span className="text-slate-400">Linha {idx + 1}:</span>
              <span className="text-pink-400 font-black tracking-widest text-sm">
                {row.join(' ')}
              </span>
              {targetGrid && (
                <span className="text-[10px]">
                  {row.every((v, ci) => v === targetGrid[idx][ci]) ? (
                    <span className="text-emerald-400 font-bold">✓ Certo</span>
                  ) : (
                    <span className="text-amber-400 font-bold">Ajustar</span>
                  )}
                </span>
              )}
            </div>
          ))}

          {targetGrid && isMatch && (
            <div className="mt-3 p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2 font-sans font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Código perfeito! Desenho decodificado com sucesso!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
