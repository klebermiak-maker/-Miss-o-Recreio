import React from 'react';
import { sound } from '../utils/audio';
import { BookOpen, X, CheckCircle, Lightbulb, Users, Sparkles } from 'lucide-react';

interface PedagogicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PedagogicalGuideModal: React.FC<PedagogicalGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-2xl">
            📖
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Guia Pedagógico para Educadores & Famílias
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Fredoka']">
              Alinhamento Curricular BNCC (4º Ano)
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Card 1: Informática EF04CO04 */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <div className="flex items-center gap-2 font-black text-indigo-900 text-sm mb-1">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <span>INFORMÁTICA: EF04CO04 (Computação na Educação Básica)</span>
            </div>
            <p className="text-slate-700 text-xs italic mb-2">
              "Reconhecer e utilizar diferentes formas de codificação da informação, compreendendo como informações podem ser representadas por símbolos, códigos, números e outros sistemas de representação."
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              <li><strong>Símbolos & Criptografia:</strong> Tradução de mensagens secretas com substituição iconográfica.</li>
              <li><strong>Matriz Binária (0 e 1):</strong> Como o computador constrói e armazena imagens gráficas através de pixels acesos/apagados.</li>
              <li><strong>Código Morse:</strong> Compreensão de sistemas de pulsos curtos e longos transmitidos por som e luz.</li>
            </ul>
          </div>

          {/* Card 2: Educação Financeira & Matemática */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="flex items-center gap-2 font-black text-emerald-900 text-sm mb-1">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>MATEMÁTICA & EDUCAÇÃO FINANCEIRA: Situações do Cotidiano</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              <li><strong>Resolução de Situações-Problema:</strong> Compra de itens na cantina, cálculo de troco com cédulas e moedas reais brasileiras (R$).</li>
              <li><strong>Consumo Consciente e Responsável:</strong> Reflexão sobre diferença entre necessidade e desejo, evitando desperdício de alimentos e materiais.</li>
              <li><strong>Organização e Planejamento:</strong> Introdução ao orçamento infantil com a técnica dos cofrinhos (Gastos do dia a dia, Poupança para sonhos e Solidariedade).</li>
            </ul>
          </div>

          {/* Card 3: Sugestão de Dinâmica de Sala de Aula */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div className="flex items-center gap-2 font-black text-amber-900 text-sm mb-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Sugestão de Atividade Prática em Sala de Aula:</span>
            </div>
            <p className="text-xs text-amber-900">
              Utilize a aba <strong>"Criador Secreto"</strong> para que cada aluno crie uma mensagem em código e imprima ou passe para o colega da carteira ao lado decifrar. Em seguida, organize um "Mercadinho Simulado" onde os alunos calculam o troco das compras em grupo!
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-6 py-2.5 rounded-xl transition shadow-md"
          >
            Entendido, Voltar ao Jogo
          </button>
        </div>
      </div>
    </div>
  );
};
