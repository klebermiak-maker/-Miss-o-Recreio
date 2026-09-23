import React, { useState } from 'react';
import { CANTEEN_PROBLEMS, CONSCIOUS_QUIZ_QUESTIONS, BRAZILIAN_CURRENCY } from '../data/gameData';
import { CurrencyPicker } from './CurrencyPicker';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Wallet, ShoppingBag, Lightbulb, CheckCircle2, 
  AlertCircle, ArrowRight, RotateCcw, HeartHandshake, PiggyBank 
} from 'lucide-react';

interface FinanceLabModeProps {
  onEarnStars: (amount: number) => void;
}

export const FinanceLabMode: React.FC<FinanceLabModeProps> = ({ onEarnStars }) => {
  const [activeTab, setActiveTab] = useState<'cashier' | 'conscious' | 'piggy'>('cashier');

  // Cashier problem state
  const [problemIndex, setProblemIndex] = useState(0);
  const problem = CANTEEN_PROBLEMS[problemIndex];
  const [tray, setTray] = useState<
    { id: string; value: number; count: number; label: string; type: 'bill' | 'coin'; color: string }[]
  >([]);
  const [cashierFeedback, setCashierFeedback] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  } | null>(null);

  // Conscious Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const quizQuestion = CONSCIOUS_QUIZ_QUESTIONS[quizIndex];
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // 3 Piggy bank state
  const [allowance, setAllowance] = useState(25);
  const [piggySpend, setPiggySpend] = useState(10);
  const [piggySave, setPiggySave] = useState(12);
  const [piggyDonate, setPiggyDonate] = useState(3);
  const [piggyFeedback, setPiggyFeedback] = useState<string | null>(null);

  // Cashier helpers
  const handleAddCurrency = (currId: string) => {
    const item = BRAZILIAN_CURRENCY.find((c) => c.id === currId);
    if (!item) return;
    setTray((prev) => {
      const existing = prev.find((p) => p.id === currId);
      if (existing) {
        return prev.map((p) => (p.id === currId ? { ...p, count: p.count + 1 } : p));
      }
      return [...prev, { id: item.id, value: item.value, count: 1, label: item.label, type: item.type, color: item.color }];
    });
  };

  const handleRemoveCurrency = (currId: string) => {
    setTray((prev) =>
      prev
        .map((p) => (p.id === currId ? { ...p, count: p.count - 1 } : p))
        .filter((p) => p.count > 0)
    );
  };

  const checkCashierChange = () => {
    const totalSelected = tray.reduce((acc, item) => acc + item.value * item.count, 0);
    if (Math.abs(totalSelected - problem.expectedChange) < 0.01) {
      sound.playSuccess();
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
      onEarnStars(2);
      setCashierFeedback({
        show: true,
        success: true,
        message: `Parabéns! O troco de R$ ${problem.expectedChange.toFixed(2)} foi entregue com perfeição!`
      });
    } else {
      sound.playError();
      const diff = totalSelected - problem.expectedChange;
      setCashierFeedback({
        show: true,
        success: false,
        message: diff > 0
          ? `Você entregou R$ ${totalSelected.toFixed(2)}. Passou do valor! O troco correto é R$ ${problem.expectedChange.toFixed(2)}.`
          : `Você entregou R$ ${totalSelected.toFixed(2)}. Ainda faltam R$ ${Math.abs(diff).toFixed(2)} para completar o troco correto.`
      });
    }
  };

  const nextCashierProblem = () => {
    sound.playClick();
    setTray([]);
    setCashierFeedback(null);
    setProblemIndex((prev) => (prev + 1) % CANTEEN_PROBLEMS.length);
  };

  // Conscious quiz answer
  const handleAnswerQuiz = (idx: number) => {
    setSelectedOptionIndex(idx);
    const option = quizQuestion.options[idx];
    if (option.correct) {
      sound.playSuccess();
      setQuizScore((prev) => prev + 1);
      onEarnStars(2);
    } else {
      sound.playError();
    }
  };

  const nextQuizQuestion = () => {
    sound.playClick();
    setSelectedOptionIndex(null);
    setQuizIndex((prev) => (prev + 1) % CONSCIOUS_QUIZ_QUESTIONS.length);
  };

  // 3 Piggy banks check
  const handleSavePiggy = () => {
    const sum = piggySpend + piggySave + piggyDonate;
    if (sum !== allowance) {
      sound.playError();
      setPiggyFeedback(`A soma dos cofrinhos (R$ ${sum},00) deve ser igual à sua mesada de R$ ${allowance},00.`);
      return;
    }
    if (piggySave < 5) {
      sound.playError();
      setPiggyFeedback('Recomendamos guardar pelo menos R$ 5,00 para criar o hábito saudável de poupar para seus sonhos futuros!');
      return;
    }
    sound.playSuccess();
    try {
      confetti({ particleCount: 60, spread: 65, origin: { y: 0.6 } });
    } catch {}
    onEarnStars(3);
    setPiggyFeedback('🎉 Excelente divisão orçamentária! Você garantiu seu lanche, economizou para o futuro e ainda guardou um dinheirinho para ajudar o próximo!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-700/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-black text-2xl border border-emerald-400/40">
            💰
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/30 text-emerald-200 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Educação Financeira no Cotidiano
              </span>
              <span className="text-xs text-emerald-300">Matemática do 4º Ano</span>
            </div>
            <h2 className="text-2xl font-black font-['Fredoka'] mt-1 text-white">
              Cantina Escolar & Finanças Conscientes
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl leading-relaxed">
              Aprenda a calcular troco, fazer escolhas sustentáveis no recreio e organizar o seu primeiro orçamento!
            </p>
          </div>
        </div>

        {/* Sub Nav */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-emerald-700/60">
          <button
            onClick={() => { sound.playClick(); setActiveTab('cashier'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              activeTab === 'cashier'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/60 text-emerald-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <span>Caixa da Cantina</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('conscious'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              activeTab === 'conscious'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/60 text-emerald-200'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Consumo Consciente</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setActiveTab('piggy'); }}
            className={`py-2.5 px-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition ${
              activeTab === 'piggy'
                ? 'bg-white text-emerald-950 shadow-md font-black'
                : 'bg-emerald-950/60 hover:bg-emerald-800/60 text-emerald-200'
            }`}
          >
            <PiggyBank className="w-4 h-4 text-pink-400" />
            <span>Regra dos 3 Cofrinhos</span>
          </button>
        </div>
      </div>

      {/* 1. CAIXA DA CANTINA */}
      {activeTab === 'cashier' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">
                  Situação-Problema #{problem.id} de {CANTEEN_PROBLEMS.length}
                </span>
                <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
                  {problem.situation}
                </h3>
              </div>
              <button
                onClick={nextCashierProblem}
                className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                <span>Próximo Cliente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Price and Paid details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase">Lanches:</span>
                <div className="mt-2 space-y-1">
                  {problem.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-sm font-semibold">
                      <span>{it.icon} {it.name}</span>
                      <span>R$ {it.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-800">
                    <span>Total a Pagar:</span>
                    <span>R$ {problem.totalToPay.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex flex-col justify-center">
                <span className="text-xs font-bold text-emerald-700 uppercase">O Cliente Pagou com:</span>
                <span className="text-2xl font-black text-emerald-950 font-['Fredoka'] mt-1">
                  R$ {problem.customerPaid.toFixed(2)}
                </span>
                <span className="text-xs text-emerald-700 mt-1">Nota entregue no caixa</span>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-col justify-center">
                <span className="text-xs font-bold text-amber-700 uppercase">Dica de Cálculo:</span>
                <span className="text-sm font-black text-amber-950 mt-1">
                  {problem.tip}
                </span>
                <span className="text-xs text-amber-700 mt-1">
                  Troco: R$ {problem.expectedChange.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Currency Picker Component */}
            <CurrencyPicker
              selectedItems={tray}
              onAdd={handleAddCurrency}
              onRemove={handleRemoveCurrency}
              onClear={() => setTray([])}
              targetAmount={problem.expectedChange}
            />

            {/* Feedback & Verify Button */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex-1">
                {cashierFeedback && (
                  <div
                    className={`p-4 rounded-2xl border flex items-center gap-3 ${
                      cashierFeedback.success
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-red-50 border-red-300 text-red-900'
                    }`}
                  >
                    {cashierFeedback.success ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                    <span className="text-sm font-bold">{cashierFeedback.message}</span>
                  </div>
                )}
              </div>

              <button
                onClick={checkCashierChange}
                disabled={tray.length === 0}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg transform active:scale-95 disabled:opacity-40 transition"
              >
                Conferir e Devolver Troco
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. QUIZ DO CONSUMO CONSCIENTE */}
      {activeTab === 'conscious' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              {quizQuestion.tag}
            </span>
            <span className="text-xs font-bold text-slate-500">
              Questão {quizIndex + 1} de {CONSCIOUS_QUIZ_QUESTIONS.length}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-800 font-['Fredoka'] leading-relaxed">
            {quizQuestion.question}
          </h3>

          <div className="space-y-3">
            {quizQuestion.options.map((opt, i) => {
              const isSelected = selectedOptionIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => handleAnswerQuiz(i)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition transform active:scale-[0.99] flex items-start gap-3 ${
                    isSelected
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-red-50 border-red-400 text-red-950'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 text-sm">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm sm:text-base leading-snug">{opt.text}</p>
                    {isSelected && (
                      <p className={`text-xs mt-2 font-bold ${opt.correct ? 'text-emerald-700' : 'text-red-600'}`}>
                        💡 {opt.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedOptionIndex !== null && (
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={nextQuizQuestion}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-6 py-2.5 rounded-xl shadow-md transition"
              >
                <span>Próxima Pergunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. SIMULADOR DOS 3 COFRINHOS */}
      {activeTab === 'piggy' && (
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-800 font-['Fredoka']">
              A Regra dos Três Cofrinhos (Planejamento Financeiro)
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Os maiores economistas ensinam que toda criança inteligente divide o dinheiro que ganha em três objetivos:
              <strong> 1. Gastos do dia a dia</strong>, <strong>2. Sonhos futuros</strong> e <strong>3. Solidariedade</strong>!
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Sua Mesada da Semana:</span>
              <div className="text-2xl font-black text-indigo-700 font-['Fredoka']">
                R$ {allowance},00
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Total Distribuído:</span>
              <div className={`text-2xl font-black font-['Fredoka'] ${
                piggySpend + piggySave + piggyDonate === allowance ? 'text-emerald-600' : 'text-red-500'
              }`}>
                R$ {piggySpend + piggySave + piggyDonate},00
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. GASTAR */}
            <div className="bg-amber-50 p-5 rounded-3xl border-2 border-amber-200 text-center">
              <div className="text-3xl mb-1">🥪</div>
              <h4 className="font-extrabold text-sm text-amber-900">1. Cofrinho de Gastar</h4>
              <p className="text-[11px] text-amber-700 mb-3">Lanche e material imediato</p>
              <div className="text-2xl font-black text-amber-950 font-['Fredoka'] mb-3">
                R$ {piggySpend},00
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setPiggySpend(Math.max(0, piggySpend - 1)); }}
                  className="w-9 h-9 rounded-xl bg-white border border-amber-300 font-black text-amber-900 hover:bg-amber-100"
                >
                  -
                </button>
                <button
                  onClick={() => { sound.playClick(); setPiggySpend(piggySpend + 1); }}
                  className="w-9 h-9 rounded-xl bg-amber-500 text-white font-black hover:bg-amber-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* 2. POUPAR */}
            <div className="bg-emerald-50 p-5 rounded-3xl border-2 border-emerald-200 text-center">
              <div className="text-3xl mb-1">🎯</div>
              <h4 className="font-extrabold text-sm text-emerald-900">2. Cofrinho do Sonho</h4>
              <p className="text-[11px] text-emerald-700 mb-3">Passeio, livro ou presente</p>
              <div className="text-2xl font-black text-emerald-950 font-['Fredoka'] mb-3">
                R$ {piggySave},00
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setPiggySave(Math.max(0, piggySave - 1)); }}
                  className="w-9 h-9 rounded-xl bg-white border border-emerald-300 font-black text-emerald-900 hover:bg-emerald-100"
                >
                  -
                </button>
                <button
                  onClick={() => { sound.playClick(); setPiggySave(piggySave + 1); }}
                  className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* 3. DOAR */}
            <div className="bg-purple-50 p-5 rounded-3xl border-2 border-purple-200 text-center">
              <div className="text-3xl mb-1">🤝</div>
              <h4 className="font-extrabold text-sm text-purple-900">3. Cofrinho de Ajudar</h4>
              <p className="text-[11px] text-purple-700 mb-3">Ajudar causas ou amigos</p>
              <div className="text-2xl font-black text-purple-950 font-['Fredoka'] mb-3">
                R$ {piggyDonate},00
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setPiggyDonate(Math.max(0, piggyDonate - 1)); }}
                  className="w-9 h-9 rounded-xl bg-white border border-purple-300 font-black text-purple-900 hover:bg-purple-100"
                >
                  -
                </button>
                <button
                  onClick={() => { sound.playClick(); setPiggyDonate(piggyDonate + 1); }}
                  className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black hover:bg-purple-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {piggyFeedback && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs sm:text-sm font-semibold text-indigo-900 leading-relaxed">
              {piggyFeedback}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSavePiggy}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3.5 rounded-2xl shadow-lg transform active:scale-95 transition"
            >
              Validar Meu Orçamento
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
