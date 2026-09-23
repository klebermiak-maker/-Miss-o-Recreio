import React from 'react';
import { BRAZILIAN_CURRENCY } from '../data/gameData';
import { sound } from '../utils/audio';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';

interface CurrencyPickerProps {
  selectedItems: { id: string; value: number; count: number; label: string; type: 'bill' | 'coin'; color: string }[];
  onAdd: (currencyId: string) => void;
  onRemove: (currencyId: string) => void;
  onClear: () => void;
  targetAmount?: number;
}

export const CurrencyPicker: React.FC<CurrencyPickerProps> = ({
  selectedItems,
  onAdd,
  onRemove,
  onClear,
  targetAmount
}) => {
  const currentTotal = selectedItems.reduce((acc, item) => acc + item.value * item.count, 0);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-200">
      {/* Top Header: Total & Target info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total na sua bandeja:
          </span>
          <div className="text-3xl font-black text-indigo-700 font-['Fredoka']">
            {formatBRL(currentTotal)}
          </div>
        </div>

        {targetAmount !== undefined && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl px-4 py-2 text-right">
            <span className="text-xs font-bold uppercase text-amber-700">Valor Alvo (Troco):</span>
            <div className="text-2xl font-black text-amber-900 font-['Fredoka']">
              {formatBRL(targetAmount)}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            sound.playClick();
            onClear();
          }}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-40 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Limpar Bandeja
        </button>
      </div>

      {/* Selected Items Tray */}
      <div className="my-4 min-h-[90px] p-3.5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
        {selectedItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm font-semibold text-slate-400 py-4">
            👆 Toque nas cédulas e moedas abaixo para colocar na bandeja
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 items-center">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-xl shadow-sm hover:border-red-300 transition group"
              >
                <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                  item.type === 'bill' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-900'
                }`}>
                  {item.label}
                </span>
                <span className="text-xs font-bold text-slate-600">x{item.count}</span>
                <button
                  onClick={() => {
                    sound.playClick();
                    onRemove(item.id);
                  }}
                  title="Remover uma unidade"
                  className="w-5 h-5 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white text-slate-500 flex items-center justify-center text-xs font-bold transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Currency Selection Grid */}
      <div>
        {/* Bills Section */}
        <div className="mb-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            💵 Cédulas (Notas de Papel)
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {BRAZILIAN_CURRENCY.filter((c) => c.type === 'bill').map((curr) => (
              <button
                key={curr.id}
                onClick={() => {
                  sound.playCoin();
                  onAdd(curr.id);
                }}
                className={`relative py-3 px-2 rounded-xl font-black text-center border-b-4 transition transform active:scale-95 shadow-sm hover:shadow-md ${curr.color}`}
              >
                <div className="text-sm sm:text-base font-extrabold leading-tight">{curr.label}</div>
                <div className="text-[10px] opacity-80 mt-0.5 font-medium">{curr.accent}</div>
                <span className="absolute top-1 right-1 bg-black/20 rounded-full p-0.5">
                  <Plus className="w-3 h-3 text-white" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Coins Section */}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
            🪙 Moedas de Metal
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {BRAZILIAN_CURRENCY.filter((c) => c.type === 'coin').map((curr) => (
              <button
                key={curr.id}
                onClick={() => {
                  sound.playCoin();
                  onAdd(curr.id);
                }}
                className={`py-2 px-1 rounded-2xl font-black text-center border-2 border-b-4 transition transform active:scale-95 shadow-sm hover:shadow-md flex flex-col items-center justify-center ${curr.color}`}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shadow-inner">
                  {curr.label.replace('R$ ', '')}
                </div>
                <span className="text-[10px] font-semibold text-slate-600 mt-1">
                  {curr.accent}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
