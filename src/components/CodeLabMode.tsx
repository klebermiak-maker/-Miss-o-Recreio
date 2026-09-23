import React, { useState } from 'react';
import { BinaryGrid } from './BinaryGrid';
import { MorsePlayer } from './MorsePlayer';
import { PIXEL_PRESETS, MORSE_CODE_MAP, SYMBOL_CIPHER_MAP } from '../data/gameData';
import { sound } from '../utils/audio';
import { 
  Binary, Radio, Shuffle, Sparkles, KeyRound, 
  HelpCircle, CheckCircle2, Copy, Check 
} from 'lucide-react';

interface CodeLabModeProps {
  onEarnStars: (amount: number) => void;
}

export const CodeLabMode: React.FC<CodeLabModeProps> = ({ onEarnStars }) => {
  const [subTab, setSubTab] = useState<'pixel' | 'morse' | 'caesar' | 'symbols'>('pixel');

  // Pixel Art State
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(0);
  const [customGrid, setCustomGrid] = useState<number[][]>(PIXEL_PRESETS[0].grid);
  const [copiedBinary, setCopiedBinary] = useState(false);

  // Morse station state
  const [morseInput, setMorseInput] = useState('RECREIO');
  const [quizLetter, setQuizLetter] = useState<'S' | 'O' | 'S'>('S');
  const [quizScore, setQuizScore] = useState(0);

  // Caesar cipher state
  const [caesarShift, setCaesarShift] = useState(2);
  const [caesarInput, setCaesarInput] = useState('AMIGO');

  // Symbol encoder state
  const [symbolWord, setSymbolWord] = useState('ESCOLA');

  const handleSelectPreset = (idx: number) => {
    sound.playClick();
    setActivePresetIndex(idx);
    setCustomGrid(PIXEL_PRESETS[idx].grid);
  };

  const handleCopyBinary = () => {
    sound.playClick();
    const text = customGrid.map((row) => row.join(' ')).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedBinary(true);
    setTimeout(() => setCopiedBinary(false), 2000);
  };

  // Convert text to Caesar cipher
  const getCaesarCipher = (text: string, shift: number) => {
    return text
      .toUpperCase()
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join('');
  };

  // Convert text to Morse sequence
  const getMorseSequence = (text: string) => {
    return text
      .toUpperCase()
      .split('')
      .map((char) => MORSE_CODE_MAP[char] || char)
      .join(' ');
  };

  // Convert text to Symbols
  const getSymbolSequence = (text: string) => {
    return text
      .toUpperCase()
      .split('')
      .map((char) => SYMBOL_CIPHER_MAP[char] || char)
      .join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header explanation of BNCC EF04CO04 */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-700/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center font-black text-2xl border border-indigo-400/40">
            💻
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/30 text-indigo-200 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                Habilidade EF04CO04
              </span>
              <span className="text-xs text-indigo-300">Computação na Educação Básica</span>
            </div>
            <h2 className="text-2xl font-black font-['Fredoka'] mt-1 text-white">
              Laboratório Maker dos Códigos Secretos
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-2xl leading-relaxed">
              Explore como computadores e seres humanos usam <strong>símbolos, números e códigos</strong> para guardar fotos, sons e palavras secretas!
            </p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6 pt-5 border-t border-indigo-800">
          <button
            onClick={() => { sound.playClick(); setSubTab('pixel'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              subTab === 'pixel'
                ? 'bg-white text-indigo-950 shadow-md font-black'
                : 'bg-indigo-950/60 hover:bg-indigo-800/60 text-indigo-200'
            }`}
          >
            <Binary className="w-4 h-4 text-pink-500" />
            <span>Pixels Binários (0 e 1)</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setSubTab('morse'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              subTab === 'morse'
                ? 'bg-white text-indigo-950 shadow-md font-black'
                : 'bg-indigo-950/60 hover:bg-indigo-800/60 text-indigo-200'
            }`}
          >
            <Radio className="w-4 h-4 text-amber-500" />
            <span>Código Morse</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setSubTab('caesar'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              subTab === 'caesar'
                ? 'bg-white text-indigo-950 shadow-md font-black'
                : 'bg-indigo-950/60 hover:bg-indigo-800/60 text-indigo-200'
            }`}
          >
            <KeyRound className="w-4 h-4 text-emerald-500" />
            <span>Cifra de César</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setSubTab('symbols'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              subTab === 'symbols'
                ? 'bg-white text-indigo-950 shadow-md font-black'
                : 'bg-indigo-950/60 hover:bg-indigo-800/60 text-indigo-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Símbolos & Emojis</span>
          </button>
        </div>
      </div>

      {/* 1. PIXEL ART MAKER */}
      {subTab === 'pixel' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
                  Desenhe sua Imagem Binária
                </h3>
                <p className="text-xs text-slate-500">
                  Escolha um modelo ou crie seu próprio desenho de 5x5 pixels!
                </p>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2">
                {PIXEL_PRESETS.map((p, idx) => (
                  <button
                    key={p.name}
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      activePresetIndex === idx
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <BinaryGrid grid={customGrid} onChangeGrid={setCustomGrid} />

            {/* Educational takeaway box */}
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-600 max-w-lg">
                💡 <strong>Como funciona na vida real:</strong> O monitor da sua TV ou celular tem milhões desses quadradinhos (pixels). Cada cor é guardada na memória do computador como uma série de números binários!
              </div>
              <button
                onClick={handleCopyBinary}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                {copiedBinary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedBinary ? 'Código Copiado!' : 'Copiar Matriz Binária'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MORSE CODE STATION */}
      {subTab === 'morse' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-lg font-black text-slate-800 font-['Fredoka'] mb-2">
              Estação Telegráfica Interativa
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Digite qualquer palavra para gerar os sinais em código Morse e escute o telégrafo funcionando com luz e áudio!
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Palavra para Transmitir:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={morseInput}
                  maxLength={12}
                  onChange={(e) => setMorseInput(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ''))}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-300 font-black text-indigo-700 tracking-wider uppercase focus:outline-none focus:border-indigo-600"
                  placeholder="DIGITE AQUI..."
                />
                <button
                  onClick={() => {
                    const words = ['RECREIO', 'AMIZADE', 'ESCOLA', 'FUTURO', 'SABER'];
                    const rand = words[Math.floor(Math.random() * words.length)];
                    sound.playClick();
                    setMorseInput(rand);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Shuffle className="w-4 h-4" />
                  Sortear
                </button>
              </div>
            </div>

            <MorsePlayer sequence={getMorseSequence(morseInput || 'RECREIO')} />
          </div>
        </div>
      )}

      {/* 3. CAESAR CIPHER */}
      {subTab === 'caesar' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
              A Cifra de César (Deslocamento de Letras)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Júlio César usava esse truque há mais de 2.000 anos para mandar bilhetes secretos para seus soldados! Ele "pulava" as letras do alfabeto (por exemplo, se pular 1 casa, A vira B, B vira C).
            </p>
          </div>

          {/* Shift Slider */}
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-700 uppercase">Quantas casas pular no alfabeto?</span>
              <div className="text-2xl font-black text-indigo-950 font-['Fredoka']">
                +{caesarShift} {caesarShift === 1 ? 'casa' : 'casas'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((shift) => (
                <button
                  key={shift}
                  onClick={() => { sound.playClick(); setCaesarShift(shift); }}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition ${
                    caesarShift === shift
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'bg-white hover:bg-indigo-100 text-slate-700 border border-indigo-200'
                  }`}
                >
                  +{shift}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Alphabet Shift Guide */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs overflow-x-auto">
            <div className="text-slate-400 mb-1">Alfabeto Normal:</div>
            <div className="tracking-widest font-black text-slate-300">
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
            </div>
            <div className="text-amber-400 mt-2 mb-1">Alfabeto Cifrado (+{caesarShift}):</div>
            <div className="tracking-widest font-black text-amber-400">
              {getCaesarCipher('ABCDEFGHIJKLMNOPQRSTUVWXYZ', caesarShift).split('').join(' ')}
            </div>
          </div>

          {/* Live Translation Demo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Palavra Original:
              </label>
              <input
                type="text"
                value={caesarInput}
                maxLength={15}
                onChange={(e) => setCaesarInput(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-300 font-black text-slate-800 text-lg uppercase tracking-wider focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-indigo-600 mb-1">
                Palavra Criptografada:
              </label>
              <div className="w-full px-4 py-3 rounded-2xl bg-indigo-50 border-2 border-indigo-300 font-black text-indigo-700 text-lg uppercase tracking-wider shadow-inner">
                {getCaesarCipher(caesarInput, caesarShift)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SYMBOLS CIPHER */}
      {subTab === 'symbols' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
              Codificador de Símbolos & Emojis
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Substituir letras por símbolos gráficos é uma das maneiras mais antigas e divertidas de codificar informações!
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <label className="block text-xs font-bold uppercase text-amber-800 mb-1">
              Digite uma palavra para ver em símbolos:
            </label>
            <input
              type="text"
              value={symbolWord}
              maxLength={15}
              onChange={(e) => setSymbolWord(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-300 font-black text-amber-950 text-base uppercase focus:outline-none bg-white"
            />
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-3xl border border-purple-200 text-center shadow-inner">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Mensagem Secreta em Emojis:
            </span>
            <div className="flex justify-center gap-3 my-4 flex-wrap">
              {symbolWord.split('').map((char, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-2xl bg-white shadow-md border border-purple-200 flex flex-col items-center justify-center"
                >
                  <span className="text-2xl">{SYMBOL_CIPHER_MAP[char] || char}</span>
                  <span className="text-[10px] text-slate-400 font-black">{char}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
