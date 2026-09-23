import React, { useState } from 'react';
import { MORSE_CODE_MAP, SYMBOL_CIPHER_MAP } from '../data/gameData';
import { sound } from '../utils/audio';
import { 
  KeyRound, Copy, Check, Printer, Sparkles, 
  HelpCircle, Binary, Radio, ShieldCheck 
} from 'lucide-react';

export const SecretEncoderMode: React.FC = () => {
  const [inputText, setInputText] = useState('HORA DO RECREIO');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Sanitized uppercase string without accents for strict code mapping
  const cleanText = inputText
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();

  // Morse
  const morseResult = cleanText
    .split('')
    .map((c) => MORSE_CODE_MAP[c] || c)
    .join(' ');

  // Binary (8 bits per character)
  const binaryResult = cleanText
    .split('')
    .map((c) => {
      if (c === ' ') return '/';
      return c.charCodeAt(0).toString(2).padStart(8, '0');
    })
    .join(' ');

  // Symbols
  const symbolsResult = cleanText
    .split('')
    .map((c) => (c === ' ' ? '   ' : SYMBOL_CIPHER_MAP[c] || c))
    .join(' ');

  // Caesar (+3)
  const caesarResult = cleanText
    .split('')
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + 3) % 26) + 65);
      }
      return c;
    })
    .join('');

  const copyToClipboard = (text: string, type: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 text-white p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner">
            🔐
          </div>
          <div>
            <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Oficina Maker de Criptografia
            </span>
            <h2 className="text-2xl font-black font-['Fredoka'] mt-1">
              Criador de Mensagens Secretas
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 mt-1 max-w-2xl">
              Digite uma mensagem secreta para seus amigos da turma e veja como ela fica codificada em 4 linguagens diferentes!
            </p>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Digite a sua mensagem secreta:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            maxLength={30}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-300 font-black text-slate-800 text-lg uppercase tracking-wider focus:outline-none focus:border-pink-500"
            placeholder="EX: VAMOS AO RECREIO..."
          />
          <button
            onClick={handlePrint}
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-2xl flex items-center gap-1.5 transition print:hidden"
            title="Imprimir cartão para brincar na sala de aula"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir Desafio</span>
          </button>
        </div>
      </div>

      {/* 4 Encoded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Código Morse */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  1. Código Morse (Pontos e Traços)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(morseResult, 'morse')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedType === 'morse' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'morse' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-950 rounded-xl font-mono text-amber-300 text-sm tracking-widest break-words min-h-[60px] flex items-center">
              {morseResult || 'DIGITE UMA FRASE'}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            💡 Usado em transmissões de rádio e socorro marítimo.
          </p>
        </div>

        {/* 2. Código Binário */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-black text-pink-400 uppercase tracking-wider">
                  2. Código Binário (0 e 1 - 8 Bits)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(binaryResult, 'binary')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedType === 'binary' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'binary' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-950 rounded-xl font-mono text-pink-400 text-xs tracking-wider break-words min-h-[60px] flex items-center">
              {binaryResult || 'DIGITE UMA FRASE'}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            💡 A linguagem que os processadores de computadores entendem.
          </p>
        </div>

        {/* 3. Criptograma de Símbolos */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-black text-yellow-400 uppercase tracking-wider">
                  3. Criptograma de Emojis
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(symbolsResult, 'symbols')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedType === 'symbols' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'symbols' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-950 rounded-xl text-xl tracking-widest break-words min-h-[60px] flex items-center">
              {symbolsResult || 'DIGITE UMA FRASE'}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            💡 Cada letra é representada por um desenho icônico.
          </p>
        </div>

        {/* 4. Cifra de César */}
        <div className="bg-slate-900 text-white rounded-3xl p-5 border-2 border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                  4. Cifra de César (+3 Casas)
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(caesarResult, 'caesar')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedType === 'caesar' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'caesar' ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
            <div className="mt-3 p-3 bg-slate-950 rounded-xl font-mono text-emerald-400 text-base tracking-widest break-words min-h-[60px] flex items-center font-bold">
              {caesarResult || 'DIGITE UMA FRASE'}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            💡 Letras deslocadas no alfabeto para ninguém espiar seu bilhete!
          </p>
        </div>
      </div>
    </div>
  );
};
