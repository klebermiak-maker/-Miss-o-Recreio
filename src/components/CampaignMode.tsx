import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CAMPAIGN_STAGES, SYMBOL_CIPHER_MAP, BRAZILIAN_CURRENCY } from '../data/gameData';
import { CampaignStage } from '../types/game';
import { CurrencyPicker } from './CurrencyPicker';
import { BinaryGrid } from './BinaryGrid';
import { MorsePlayer } from './MorsePlayer';
import { sound } from '../utils/audio';
import { 
  CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  Sparkles, Award, RotateCcw, HelpCircle, Lightbulb 
} from 'lucide-react';

interface CampaignModeProps {
  onEarnStars: (amount: number) => void;
  completedStages: number[];
  onCompleteStage: (stageId: number) => void;
  onOpenCertificate: () => void;
}

export const CampaignMode: React.FC<CampaignModeProps> = ({
  onEarnStars,
  completedStages,
  onCompleteStage,
  onOpenCertificate
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const stage = CAMPAIGN_STAGES[currentStageIndex];

  // Stage 1 State: Symbol Cipher
  const [stage1SelectedOption, setStage1SelectedOption] = useState<string | null>(null);

  // Stage 2 State: Canteen Cash
  const [stage2Tray, setStage2Tray] = useState<
    { id: string; value: number; count: number; label: string; type: 'bill' | 'coin'; color: string }[]
  >([]);

  // Stage 3 State: Binary Grid
  const [stage3Grid, setStage3Grid] = useState<number[][]>([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  // Stage 4 State: Conscious Consumption
  const [stage4SelectedChoice, setStage4SelectedChoice] = useState<string | null>(null);

  // Stage 5 State: Morse Code
  const [stage5SelectedOption, setStage5SelectedOption] = useState<string | null>(null);

  // Stage 6 State: Piggy Budget
  const [stage6Essential, setStage6Essential] = useState<number>(10);
  const [stage6Dream, setStage6Dream] = useState<number>(12);
  const [stage6Fun, setStage6Fun] = useState<number>(8);

  // Feedback states
  const [feedback, setFeedback] = useState<{
    show: boolean;
    success: boolean;
    title: string;
    message: string;
  } | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  };

  // Stage 1 Check
  const checkStage1 = (chosen: string) => {
    setStage1SelectedOption(chosen);
    if (chosen === stage.data.secretWord) {
      sound.playSuccess();
      triggerConfetti();
      onEarnStars(3);
      onCompleteStage(stage.id);
      setFeedback({
        show: true,
        success: true,
        title: 'Sensacional! Código decifrado!',
        message: stage.data.explanation
      });
    } else {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Quase lá!',
        message: 'Observe a tabela de símbolos e confira cada letra com calma. Tente novamente!'
      });
    }
  };

  // Stage 2 Check (Troco)
  const addCurrencyStage2 = (currId: string) => {
    const item = BRAZILIAN_CURRENCY.find((c) => c.id === currId);
    if (!item) return;
    setStage2Tray((prev) => {
      const existing = prev.find((p) => p.id === currId);
      if (existing) {
        return prev.map((p) => (p.id === currId ? { ...p, count: p.count + 1 } : p));
      }
      return [...prev, { id: item.id, value: item.value, count: 1, label: item.label, type: item.type, color: item.color }];
    });
  };

  const removeCurrencyStage2 = (currId: string) => {
    setStage2Tray((prev) =>
      prev
        .map((p) => (p.id === currId ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );
  };

  const checkStage2 = () => {
    const totalSelected = stage2Tray.reduce((acc, item) => acc + item.value * item.count, 0);
    // Allow slight float tolerance
    if (Math.abs(totalSelected - stage.data.requiredChange) < 0.01) {
      sound.playSuccess();
      triggerConfetti();
      onEarnStars(3);
      onCompleteStage(stage.id);
      setFeedback({
        show: true,
        success: true,
        title: 'Troco Perfeito!',
        message: stage.data.explanation
      });
    } else {
      sound.playError();
      const diff = totalSelected - stage.data.requiredChange;
      setFeedback({
        show: true,
        success: false,
        title: 'Valor diferente do troco!',
        message: diff > 0
          ? `Você colocou R$ ${totalSelected.toFixed(2)} na bandeja. Passou do valor! Precisa dar exatamente R$ ${stage.data.requiredChange.toFixed(2)}.`
          : `Você colocou R$ ${totalSelected.toFixed(2)}. Ainda faltam R$ ${Math.abs(diff).toFixed(2)} para completar o troco!`
      });
    }
  };

  // Stage 3 Check (Pixel Art)
  const checkStage3 = () => {
    const isMatch = stage3Grid.every((row, r) =>
      row.every((val, c) => val === stage.data.targetGrid[r][c])
    );

    if (isMatch) {
      sound.playSuccess();
      triggerConfetti();
      onEarnStars(3);
      onCompleteStage(stage.id);
      setFeedback({
        show: true,
        success: true,
        title: 'Robô Ativado! Imagem Decodificada!',
        message: stage.data.explanation
      });
    } else {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Pixel fora do lugar!',
        message: 'Confira as linhas do código binário. Lembre-se: 1 é aceso (colorido) e 0 é apagado.'
      });
    }
  };

  // Stage 4 Check (Consumo Consciente)
  const checkStage4 = (choiceId: string) => {
    setStage4SelectedChoice(choiceId);
    const chosen = stage.data.choices.find((c: any) => c.id === choiceId);
    if (chosen?.isCorrect) {
      sound.playSuccess();
      triggerConfetti();
      onEarnStars(3);
      onCompleteStage(stage.id);
      setFeedback({
        show: true,
        success: true,
        title: 'Excelente Escolha Consciente!',
        message: `${chosen.feedback} ${stage.data.concept}`
      });
    } else {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Pense bem sobre essa atitude...',
        message: chosen?.feedback || 'Essa não é a melhor decisão financeira e ambiental. Tente outra opção!'
      });
    }
  };

  // Stage 5 Check (Morse)
  const checkStage5 = (chosen: string) => {
    setStage5SelectedOption(chosen);
    if (chosen === stage.data.secretWord) {
      sound.playSuccess();
      triggerConfetti();
      onEarnStars(3);
      onCompleteStage(stage.id);
      setFeedback({
        show: true,
        success: true,
        title: 'Sinal Telegráfico Decodificado!',
        message: stage.data.explanation
      });
    } else {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Código diferente!',
        message: 'Consulte a tabela de Morse. A palavra começa com "-..." que é a letra B! Tente novamente.'
      });
    }
  };

  // Stage 6 Check (Planejamento do Cofrinho)
  const checkStage6 = () => {
    const total = stage6Essential + stage6Dream + stage6Fun;
    if (total !== 30) {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Soma diferente de R$ 30!',
        message: `A soma dos 3 cofrinhos deve dar exatamente os R$ 30,00 da mesada. Atualmente a soma é R$ ${total},00.`
      });
      return;
    }

    if (stage6Essential < 10) {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'Cuidado com a necessidade básica!',
        message: 'Você precisa de pelo menos R$ 10,00 para garantir os lanches saudáveis da semana.'
      });
      return;
    }

    if (stage6Dream < 12) {
      sound.playError();
      setFeedback({
        show: true,
        success: false,
        title: 'A meta do piquenique!',
        message: 'Para garantir a participação no Piquenique da turma, é preciso poupar no mínimo R$ 12,00.'
      });
      return;
    }

    sound.playFanfare();
    triggerConfetti();
    onEarnStars(5);
    onCompleteStage(stage.id);
    setFeedback({
      show: true,
      success: true,
      title: '🏆 MISSÃO CUMPRIDA COM HONRA!',
      message: `${stage.data.explanation} Você completou toda a Aventura do Recreio!`
    });
  };

  const nextStage = () => {
    sound.playClick();
    setFeedback(null);
    if (currentStageIndex < CAMPAIGN_STAGES.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const prevStage = () => {
    sound.playClick();
    setFeedback(null);
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const isCurrentStageCompleted = completedStages.includes(stage.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stage Progress Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Progresso da Aventura ({completedStages.length} de {CAMPAIGN_STAGES.length} Fases)
          </span>
          <span className="text-xs font-black text-indigo-600">
            Fase {stage.id} de {CAMPAIGN_STAGES.length}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {CAMPAIGN_STAGES.map((s, idx) => {
            const isDone = completedStages.includes(s.id);
            const isCurrent = idx === currentStageIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  setCurrentStageIndex(idx);
                  setFeedback(null);
                }}
                className={`py-2 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-2 shadow-md'
                    : isDone
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                <span>Fase {s.id}</span>
                <span className="text-[10px]">
                  {isDone ? '⭐ Concluída' : s.category === 'informatica' ? '💻 Código' : '💰 Finanças'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Mission Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                stage.category === 'informatica'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}
            >
              {stage.category === 'informatica' ? '💻 Informática (BNCC)' : '💰 Educação Financeira'}
            </span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              {stage.skillCode}
            </span>
          </div>

          {isCurrentStageCompleted && (
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Fase Concluída! ⭐</span>
            </div>
          )}
        </div>

        {/* Title & Story */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-['Fredoka']">
            {stage.title}: {stage.subtitle}
          </h2>
          <div className="mt-3 p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-slate-700 text-sm sm:text-base leading-relaxed flex items-start gap-3">
            <span className="text-2xl">🎒</span>
            <div>
              <p className="font-medium">{stage.story}</p>
              <p className="font-bold text-indigo-900 mt-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Missão: {stage.instruction}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Stage Body */}

        {/* 1. SYMBOL CIPHER */}
        {stage.type === 'symbol_cipher' && (
          <div className="space-y-6">
            {/* The encrypted symbols display */}
            <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 p-6 rounded-3xl border-2 border-amber-300 text-center shadow-inner">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Mensagem Criptografada no Quadro:
              </span>
              <div className="flex items-center justify-center gap-3 my-4 flex-wrap">
                {stage.data.symbols.map((sym: string, i: number) => (
                  <div
                    key={i}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md border-2 border-amber-200 flex flex-col items-center justify-center text-2xl sm:text-3xl hover:scale-105 transition"
                  >
                    <span>{sym}</span>
                    <span className="text-[10px] text-slate-400 font-mono">#{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-amber-900">
                💡 Dica: {stage.data.clue}
              </p>
            </div>

            {/* Reference Alphabet table */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Tabela de Decodificação (Símbolo = Letra):
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {['P', 'I', 'O', 'C', 'A', 'B'].map((letter) => (
                  <div
                    key={letter}
                    className="bg-white p-2 rounded-xl border border-slate-200 text-center shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">{SYMBOL_CIPHER_MAP[letter]}</span>
                    <span className="font-black text-indigo-700 text-base">= {letter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Options choices */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Qual é a palavra decodificada?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stage.data.options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => checkStage1(opt)}
                    className={`py-3 px-4 rounded-2xl font-black text-base transition transform active:scale-95 shadow-sm border-2 ${
                      stage1SelectedOption === opt
                        ? opt === stage.data.secretWord
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-red-500 text-white border-red-600'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. CANTEEN CASH */}
        {stage.type === 'canteen_cash' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Itens Comprados:</span>
                <div className="mt-2 space-y-1.5">
                  {stage.data.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-sm font-semibold">
                      <span>{item.icon} {item.name}</span>
                      <span className="font-bold text-slate-700">R$ {item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-indigo-700">
                    <span>Total da Compra:</span>
                    <span>R$ {stage.data.totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                <span className="text-xs font-bold text-emerald-700 uppercase">Valor Pago:</span>
                <span className="text-2xl font-black text-emerald-900 mt-1 font-['Fredoka']">
                  💵 R$ {stage.data.paidAmount.toFixed(2)}
                </span>
                <span className="text-xs text-emerald-700 mt-1">Nota entregue ao caixa</span>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col justify-center">
                <span className="text-xs font-bold text-amber-700 uppercase">Cálculo do Troco:</span>
                <span className="text-xs text-amber-800 font-semibold mt-1">
                  R$ {stage.data.paidAmount.toFixed(2)} - R$ {stage.data.totalCost.toFixed(2)} =
                </span>
                <span className="text-xl font-black text-amber-950 font-['Fredoka']">
                  R$ {stage.data.requiredChange.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Currency picker */}
            <CurrencyPicker
              selectedItems={stage2Tray}
              onAdd={addCurrencyStage2}
              onRemove={removeCurrencyStage2}
              onClear={() => setStage2Tray([])}
              targetAmount={stage.data.requiredChange}
            />

            <div className="flex justify-end">
              <button
                onClick={checkStage2}
                disabled={stage2Tray.length === 0}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-lg transform active:scale-95 disabled:opacity-40 transition"
              >
                Conferir e Entregar o Troco
              </button>
            </div>
          </div>
        )}

        {/* 3. BINARY PIXEL ART */}
        {stage.type === 'binary_pixel' && (
          <div className="space-y-6">
            <div className="bg-indigo-950 text-white p-4 rounded-2xl border border-indigo-800">
              <span className="text-xs font-bold uppercase text-indigo-300">Instruções Binárias:</span>
              <p className="text-xs text-indigo-200 mt-1">
                Ative os quadradinhos onde tiver o número <strong>1</strong>. Deixe apagado onde tiver o número <strong>0</strong>.
              </p>
            </div>

            <BinaryGrid
              grid={stage3Grid}
              onChangeGrid={setStage3Grid}
              targetGrid={stage.data.targetGrid}
            />

            <div className="flex justify-end">
              <button
                onClick={checkStage3}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-lg transform active:scale-95 transition"
              >
                Verificar Imagem Binária
              </button>
            </div>
          </div>
        )}

        {/* 4. CONSCIOUS CONSUMPTION */}
        {stage.type === 'conscious_consumption' && (
          <div className="space-y-4">
            <p className="text-base font-bold text-slate-800">
              {stage.data.question}
            </p>

            <div className="space-y-3">
              {stage.data.choices.map((choice: any) => {
                const isSelected = stage4SelectedChoice === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => checkStage4(choice.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition transform active:scale-[0.99] flex items-start gap-3 shadow-sm ${
                      isSelected
                        ? choice.isCorrect
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-red-50 border-red-400 text-red-950'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-900 font-black flex items-center justify-center shrink-0">
                      {choice.id}
                    </span>
                    <span className="text-sm sm:text-base font-medium leading-snug pt-1">
                      {choice.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. MORSE CODE */}
        {stage.type === 'morse_code' && (
          <div className="space-y-6">
            <MorsePlayer sequence={stage.data.morseSequence} secretWord={stage.data.secretWord} />

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
                Dicas das letras em Morse:
              </span>
              <div className="flex gap-4 flex-wrap">
                {stage.data.letters.map((l: any, i: number) => (
                  <div key={i} className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-mono text-sm">
                    <span className="font-bold text-indigo-700">{l.char}</span> = <span className="text-amber-600 font-bold">{l.morse}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Qual foi a palavra transmitida?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stage.data.options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => checkStage5(opt)}
                    className={`py-3 px-4 rounded-2xl font-black text-base transition transform active:scale-95 shadow-sm border-2 ${
                      stage5SelectedOption === opt
                        ? opt === stage.data.secretWord
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : 'bg-red-500 text-white border-red-600'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. PIGGY BUDGET */}
        {stage.type === 'piggy_budget' && (
          <div className="space-y-6">
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">Orçamento Semanal:</span>
                <div className="text-2xl font-black text-amber-950 font-['Fredoka']">
                  R$ 30,00
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500 uppercase">Soma Atual dos Cofrinhos:</span>
                <div className={`text-2xl font-black font-['Fredoka'] ${
                  stage6Essential + stage6Dream + stage6Fun === 30 ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  R$ {stage6Essential + stage6Dream + stage6Fun},00
                </div>
              </div>
            </div>

            {/* 3 Piggy Jars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Essential */}
              <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 text-center">
                <div className="text-3xl mb-1">🥪</div>
                <h4 className="font-extrabold text-sm text-slate-800">Lanches Essenciais</h4>
                <p className="text-[11px] text-slate-500 mb-3">Necessidade (Mínimo R$ 10)</p>
                <div className="text-2xl font-black text-indigo-700 font-['Fredoka'] mb-3">
                  R$ {stage6Essential},00
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => { sound.playClick(); setStage6Essential(Math.max(0, stage6Essential - 1)); }}
                    className="w-9 h-9 rounded-xl bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setStage6Essential(stage6Essential + 1); }}
                    className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-black hover:bg-indigo-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dream / Piquenique */}
              <div className="bg-emerald-50 p-5 rounded-3xl border-2 border-emerald-300 text-center">
                <div className="text-3xl mb-1">🧺</div>
                <h4 className="font-extrabold text-sm text-emerald-900">Meta do Piquenique</h4>
                <p className="text-[11px] text-emerald-700 mb-3">Poupança (Mínimo R$ 12)</p>
                <div className="text-2xl font-black text-emerald-800 font-['Fredoka'] mb-3">
                  R$ {stage6Dream},00
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => { sound.playClick(); setStage6Dream(Math.max(0, stage6Dream - 1)); }}
                    className="w-9 h-9 rounded-xl bg-white border border-emerald-300 font-black text-emerald-800 hover:bg-emerald-100"
                  >
                    -
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setStage6Dream(stage6Dream + 1); }}
                    className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Fun / Lazer */}
              <div className="bg-pink-50 p-5 rounded-3xl border-2 border-pink-300 text-center">
                <div className="text-3xl mb-1">🎮</div>
                <h4 className="font-extrabold text-sm text-pink-900">Pequeno Lazer</h4>
                <p className="text-[11px] text-pink-700 mb-3">Vontades & Figurinhas</p>
                <div className="text-2xl font-black text-pink-800 font-['Fredoka'] mb-3">
                  R$ {stage6Fun},00
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => { sound.playClick(); setStage6Fun(Math.max(0, stage6Fun - 1)); }}
                    className="w-9 h-9 rounded-xl bg-white border border-pink-300 font-black text-pink-800 hover:bg-pink-100"
                  >
                    -
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setStage6Fun(stage6Fun + 1); }}
                    className="w-9 h-9 rounded-xl bg-pink-600 text-white font-black hover:bg-pink-700"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={checkStage6}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base px-8 py-3.5 rounded-2xl shadow-lg transform active:scale-95 transition"
              >
                Finalizar Planejamento Semanal
              </button>
            </div>
          </div>
        )}

        {/* Feedback message dialog */}
        {feedback && (
          <div
            className={`mt-6 p-5 rounded-3xl border-2 transition ${
              feedback.success
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {feedback.success ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <h4 className="font-black text-lg font-['Fredoka']">{feedback.title}</h4>
                <p className="text-sm font-medium mt-1 leading-relaxed">{feedback.message}</p>
              </div>
            </div>

            {feedback.success && (
              <div className="mt-4 flex justify-end gap-3">
                {currentStageIndex < CAMPAIGN_STAGES.length - 1 ? (
                  <button
                    onClick={nextStage}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition"
                  >
                    <span>Ir para a Próxima Fase</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenCertificate}
                    className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition"
                  >
                    <Award className="w-4 h-4" />
                    <span>Ver Meu Certificado Oficial</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={prevStage}
            disabled={currentStageIndex === 0}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition px-3 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Fase Anterior</span>
          </button>

          <span className="text-xs font-bold text-slate-400">
            {stage.title}
          </span>

          <button
            onClick={nextStage}
            disabled={currentStageIndex === CAMPAIGN_STAGES.length - 1}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-30 transition px-3 py-2 rounded-xl"
          >
            <span>Próxima Fase</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
