import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Award, Printer, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  completedStagesCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  stars,
  completedStagesCount
}) => {
  const [studentName, setStudentName] = useState('Estudante do 4º Ano');

  if (!isOpen) return null;

  const todayStr = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative print:border-4 print:border-amber-600 print:shadow-none print:max-w-none print:w-full">
        {/* Close button (hidden in print) */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Frame */}
        <div className="border-4 border-double border-amber-400 p-6 rounded-2xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/50 text-center relative overflow-hidden">
          {/* Top Stamp / Badge */}
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-amber-950 flex items-center justify-center shadow-lg border-2 border-white">
              <Award className="w-9 h-9" />
            </div>
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-200/60 px-3 py-1 rounded-full">
            Certificado de Honra ao Mérito
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-['Fredoka'] mt-2">
            Mestre dos Códigos & Economista Mirim
          </h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
            Ensino Fundamental - 4º Ano | Projeto Missão Recreio
          </p>

          <div className="my-5">
            <p className="text-xs text-slate-600">Certificamos com orgulho que</p>
            <div className="print:hidden my-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-center font-black text-xl sm:text-2xl text-indigo-900 border-b-2 border-indigo-400 focus:outline-none bg-transparent w-full max-w-md py-1 font-['Fredoka']"
                placeholder="DIGITE SEU NOME COMPLETO"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                (Clique acima para digitar o nome do aluno)
              </span>
            </div>
            <div className="hidden print:block text-2xl font-black text-indigo-900 my-2 font-['Fredoka']">
              {studentName}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              concluiu com êxito os desafios de pensamento computacional e educação financeira, demonstrando proficiência nas seguintes habilidades curriculares:
            </p>
          </div>

          {/* Acquired Skills Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left my-4">
            <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-200">
              <div className="flex items-center gap-1.5 text-xs font-black text-indigo-900">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>BNCC Computação - EF04CO04</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Codificação da informação através de símbolos, pixels em código binário (0 e 1), código Morse e criptografia.
              </p>
            </div>

            <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Educação Financeira (4º Ano)</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Resolução de situações-problema com Real (R$), cálculo de troco, consumo consciente e planejamento com cofrinhos.
              </p>
            </div>
          </div>

          {/* Score & Date */}
          <div className="flex items-center justify-between text-xs text-slate-600 border-t border-amber-200 pt-3 mt-4 px-2">
            <div>
              <span className="font-bold">⭐ Estrelas Conquistadas:</span> {stars} | <span className="font-bold">Fases:</span> {completedStagesCount}/6
            </div>
            <div>
              <span className="font-bold">Data:</span> {todayStr}
            </div>
          </div>
        </div>

        {/* Action Buttons (print:hidden) */}
        <div className="mt-5 flex items-center justify-between print:hidden">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-4 py-2"
          >
            Voltar ao Jogo
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-amber-950 font-black text-sm px-6 py-2.5 rounded-2xl shadow-lg transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Certificado</span>
          </button>
        </div>
      </div>
    </div>
  );
};
