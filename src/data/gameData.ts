import { MoneyValue, CampaignStage } from '../types/game';

// Cédulas e moedas brasileiras (Real - R$)
export const BRAZILIAN_CURRENCY: MoneyValue[] = [
  { id: 'bill-100', label: 'R$ 100', value: 100, type: 'bill', color: 'bg-cyan-600 text-white border-cyan-800', accent: 'Garoupa' },
  { id: 'bill-50', label: 'R$ 50', value: 50, type: 'bill', color: 'bg-amber-600 text-white border-amber-800', accent: 'Onça-Pintada' },
  { id: 'bill-20', label: 'R$ 20', value: 20, type: 'bill', color: 'bg-yellow-500 text-slate-900 border-yellow-700', accent: 'Mico-Leão' },
  { id: 'bill-10', label: 'R$ 10', value: 10, type: 'bill', color: 'bg-red-500 text-white border-red-700', accent: 'Arara' },
  { id: 'bill-5', label: 'R$ 5', value: 5, type: 'bill', color: 'bg-purple-600 text-white border-purple-800', accent: 'Garça' },
  { id: 'bill-2', label: 'R$ 2', value: 2, type: 'bill', color: 'bg-teal-600 text-white border-teal-800', accent: 'Tartaruga' },
  { id: 'coin-1', label: 'R$ 1,00', value: 1.0, type: 'coin', color: 'bg-gradient-to-br from-amber-300 via-amber-100 to-amber-400 text-amber-950 border-amber-500 ring-2 ring-slate-300', accent: 'Bicolor' },
  { id: 'coin-050', label: 'R$ 0,50', value: 0.5, type: 'coin', color: 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-slate-800 border-slate-400', accent: 'Prateada' },
  { id: 'coin-025', label: 'R$ 0,25', value: 0.25, type: 'coin', color: 'bg-gradient-to-br from-amber-400 via-amber-200 to-amber-500 text-amber-950 border-amber-600', accent: 'Dourada' },
  { id: 'coin-010', label: 'R$ 0,10', value: 0.1, type: 'coin', color: 'bg-gradient-to-br from-amber-500 via-amber-300 to-amber-600 text-amber-950 border-amber-700', accent: 'Bronze' },
  { id: 'coin-005', label: 'R$ 0,05', value: 0.05, type: 'coin', color: 'bg-gradient-to-br from-orange-400 via-orange-200 to-orange-500 text-orange-950 border-orange-600', accent: 'Cobre' },
];

// Alfabeto Morse Oficial
export const MORSE_CODE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': '/',
};

// Símbolos para Criptografia de Substituição infantil
export const SYMBOL_CIPHER_MAP: Record<string, string> = {
  A: '🍎', B: '🎈', C: '🚀', D: '🎲', E: '⭐', F: '🌸',
  G: '🎸', H: '🏠', I: '🍦', J: '🕹️', K: '🥝', L: '🦁',
  M: '🌙', N: '☁️', O: '🍊', P: '🍕', Q: '👑', R: '🤖',
  S: '☀️', T: '🎾', U: '🍇', V: '⛵', W: '🌊', X: '❌',
  Y: '💎', Z: '⚡',
};

// Fases da Campanha "Missão Recreio"
export const CAMPAIGN_STAGES: CampaignStage[] = [
  {
    id: 1,
    title: 'Fase 1: O Cardápio Secreto',
    subtitle: 'Decodificação por Símbolos',
    category: 'informatica',
    skillCode: 'EF04CO04',
    story: 'O Recreio começou e a cantina preparou uma surpresa! Para descobrir o lanche especial de hoje, decifre os símbolos deixados no mural do laboratório de informática.',
    instruction: 'Use a tabela de correspondência para substituir cada símbolo pela letra correta e descubra a palavra secreta.',
    type: 'symbol_cipher',
    data: {
      secretWord: 'PIPOCA',
      symbols: ['🍕', '🍦', '🍕', '🍊', '🚀', '🍎'],
      clue: 'Lanche crocante que estoura na panela!',
      options: ['PIPOCA', 'BANANA', 'PICOLÉ', 'PAÇOCA'],
      explanation: 'Parabéns! Na computação e na criptografia, símbolos substituem letras ou números para transmitir mensagens seguras!'
    }
  },
  {
    id: 2,
    title: 'Fase 2: O Troco Certo da Cantina',
    subtitle: 'Problema com Dinheiro (R$)',
    category: 'financas',
    skillCode: 'Matemática Financeira',
    story: 'Você foi comprar um lanche saudável na cantina escolar: um sanduíche natural (R$ 6,50) e um suco de laranja (R$ 3,50). O total deu R$ 10,00. Você pagou com uma nota de R$ 20,00!',
    instruction: 'Calcule o troco e selecione as cédulas e moedas necessárias para entregar o valor exato.',
    type: 'canteen_cash',
    data: {
      items: [
        { name: 'Sanduíche Natural', price: 6.50, icon: '🥪' },
        { name: 'Suco de Laranja', price: 3.50, icon: '🍊' }
      ],
      totalCost: 10.00,
      paidAmount: 20.00,
      requiredChange: 10.00,
      explanation: 'Excelente! R$ 20,00 - R$ 10,00 = R$ 10,00 de troco! Saber calcular o troco ajuda a cuidar bem do seu dinheiro.'
    }
  },
  {
    id: 3,
    title: 'Fase 3: O Robô em Pixel Art Binária',
    subtitle: 'Representação Digital (0 e 1)',
    category: 'informatica',
    skillCode: 'EF04CO04',
    story: 'Você sabia que na tela do computador tudo é formado por pequenos pontinhos chamados pixels? O computador usa o número 0 para "pixel apagado" e 1 para "pixel aceso".',
    instruction: 'Pinte a grade 5x5 seguindo o código binário de cada linha para revelar o desenho secreto do Clube do Recreio!',
    type: 'binary_pixel',
    data: {
      gridSize: 5,
      targetName: 'Coração',
      targetGrid: [
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
      ],
      binaryRows: [
        'Linha 1: 0 - 1 - 0 - 1 - 0',
        'Linha 2: 1 - 1 - 1 - 1 - 1',
        'Linha 3: 1 - 1 - 1 - 1 - 1',
        'Linha 4: 0 - 1 - 1 - 1 - 0',
        'Linha 5: 0 - 0 - 1 - 0 - 0',
      ],
      explanation: 'Sensacional! Os computadores guardam imagens como matrizes de 0s e 1s (código binário). Cada número representa a cor ou intensidade de um pixel!'
    }
  },
  {
    id: 4,
    title: 'Fase 4: Consumo Consciente no Recreio',
    subtitle: 'Necessidade vs. Vontade e Sustentabilidade',
    category: 'financas',
    skillCode: 'Educação Financeira',
    story: 'A turma recebeu R$ 15,00 para o recreio. Chegando ao pátio, surgiram 3 opções diferentes. Qual demonstra o consumo mais consciente e inteligente?',
    instruction: 'Leia as opções com atenção e escolha a que demonstra planejamento, saúde e sem desperdício.',
    type: 'conscious_consumption',
    data: {
      question: 'Qual atitude representa o consumo mais consciente com seus R$ 15,00?',
      choices: [
        {
          id: 'A',
          title: 'Gastar todos os R$ 15,00 em 10 balas e brinquedos plásticos descartáveis que quebram hoje.',
          isCorrect: false,
          feedback: 'Cuidado! Comprar por impulso brinquedos descartáveis gera lixo e desperdício de dinheiro.'
        },
        {
          id: 'B',
          title: 'Comprar um lanche nutritivo (R$ 7,00) e guardar R$ 8,00 no cofrinho para a excursão da turma.',
          isCorrect: true,
          feedback: 'Perfeito! Você atendeu à sua necessidade (alimentação saudável) e poupou para um objetivo futuro importante!'
        },
        {
          id: 'C',
          title: 'Comprar 3 salgados a mais do que consegue comer e jogar o resto no lixo.',
          isCorrect: false,
          feedback: 'Atenção! Desperdiçar comida é ruim para a natureza e para as suas finanças.'
        }
      ],
      concept: 'Consumo Consciente: Pensar antes de comprar, diferenciar "o que eu preciso" de "o que é só um impulso", e evitar desperdícios.'
    }
  },
  {
    id: 5,
    title: 'Fase 5: O Telégrafo Sonoro (Código Morse)',
    subtitle: 'Códigos com Sinais Sonoros e Visuais',
    category: 'informatica',
    skillCode: 'EF04CO04',
    story: 'No rádio da sala de informática começou a tocar uma sequência de bips curtos (ponto .) e bips longos (traço -). É a senha para abrir a sala de jogos no recreio!',
    instruction: 'Ouça o áudio, consulte a tabela de Morse e decifre a palavra enviada.',
    type: 'morse_code',
    data: {
      secretWord: 'BOM',
      morseSequence: '-... / --- / --',
      letters: [
        { char: 'B', morse: '-...' },
        { char: 'O', morse: '---' },
        { char: 'M', morse: '--' }
      ],
      options: ['BOM', 'SOL', 'LUA', 'PAZ'],
      explanation: 'Incrível! Samuel Morse inventou o código Morse em 1837. Ele usa pulsos elétricos curtos e longos para representar letras e números à distância!'
    }
  },
  {
    id: 6,
    title: 'Fase 6: O Grande Planejamento do Cofrinho',
    subtitle: 'Orçamento e Metas Financeiras',
    category: 'financas',
    skillCode: 'Planejamento Financeiro',
    story: 'A sua turma quer fazer um Piquenique Coletivo no parque no final do mês. Você tem uma mesada de R$ 30,00 e precisa organizar seu dinheiro com a Regra dos Três Cofrinhos.',
    instruction: 'Distribua os R$ 30,00 entre: "Lanches Essenciais" (mínimo R$ 10), "Meta do Piquenique" (mínimo R$ 12) e "Lazer Livre" (R$ 8).',
    type: 'piggy_budget',
    data: {
      totalBudget: 30,
      targets: {
        essential: { min: 10, max: 15, label: 'Lanche Essencial' },
        dream: { min: 12, max: 15, label: 'Meta do Piquenique (Poupança)' },
        fun: { min: 5, max: 8, label: 'Pequeno Lazer' }
      },
      explanation: 'Parabéns, Economista Mirim! Dividir seu dinheiro entre o que você precisa hoje e o que sonha conquistar no futuro é o segredo do sucesso financeiro!'
    }
  }
];

// Minijogos extras para a Cantina (Educação Financeira)
export interface CanteenProblem {
  id: number;
  situation: string;
  items: { name: string; price: number; icon: string }[];
  totalToPay: number;
  customerPaid: number;
  expectedChange: number;
  tip: string;
}

export const CANTEEN_PROBLEMS: CanteenProblem[] = [
  {
    id: 1,
    situation: 'Pedrinho comprou um pão de queijo quentinho e uma água de coco.',
    items: [
      { name: 'Pão de Queijo', price: 4.50, icon: '🧀' },
      { name: 'Água de Coco', price: 3.50, icon: '🥥' }
    ],
    totalToPay: 8.00,
    customerPaid: 10.00,
    expectedChange: 2.00,
    tip: 'R$ 10,00 - R$ 8,00 = ?'
  },
  {
    id: 2,
    situation: 'Aninha comprou uma salada de frutas com iogurte e uma maçã.',
    items: [
      { name: 'Salada de Frutas', price: 5.50, icon: '🍓' },
      { name: 'Maçã Fresca', price: 2.25, icon: '🍎' }
    ],
    totalToPay: 7.75,
    customerPaid: 10.00,
    expectedChange: 2.25,
    tip: 'R$ 10,00 - R$ 7,75 = R$ 2,25. Use moedas de 25 centavos!'
  },
  {
    id: 3,
    situation: 'A turma comprou 2 sucos naturais e 2 sanduíches para o lanche comunitário.',
    items: [
      { name: '2x Suco Natural', price: 8.00, icon: '🧃' },
      { name: '2x Sanduíche', price: 14.00, icon: '🥪' }
    ],
    totalToPay: 22.00,
    customerPaid: 50.00,
    expectedChange: 28.00,
    tip: 'R$ 50,00 - R$ 22,00 = R$ 28,00. Uma nota de 20, uma de 5, uma de 2 e uma moeda de 1!'
  },
  {
    id: 4,
    situation: 'Lucas comprou uma barrinha de cereais e uma vitamina.',
    items: [
      { name: 'Barra de Cereais', price: 2.50, icon: '🌾' },
      { name: 'Vitamina de Morango', price: 4.50, icon: '🥤' }
    ],
    totalToPay: 7.00,
    customerPaid: 20.00,
    expectedChange: 13.00,
    tip: 'R$ 20,00 - R$ 7,00 = R$ 13,00.'
  }
];

// Perguntas do Quiz de Consumo Consciente
export interface ConsciousQuizQuestion {
  id: number;
  question: string;
  options: { text: string; correct: boolean; explanation: string }[];
  tag: string;
}

export const CONSCIOUS_QUIZ_QUESTIONS: ConsciousQuizQuestion[] = [
  {
    id: 1,
    question: 'Seu estojo de lápis de cor do ano passado ainda está com quase todos os lápis inteiros, mas saiu um novo com desenho de super-herói na TV. O que fazer?',
    options: [
      { text: 'Pedir para comprar o novo imediatamente e jogar o antigo fora.', correct: false, explanation: 'Isso gera desperdício e gasto sem necessidade.' },
      { text: 'Apontar os lápis que já tem, cuidar bem deles e economizar esse dinheiro.', correct: true, explanation: 'Excelente! Consumo responsável é valorizar e reutilizar o que ainda funciona perfeitamente!' },
      { text: 'Quebrar os lápis velhos para obrigar a compra do novo.', correct: false, explanation: 'Destruir materiais causa prejuízo financeiro e desrespeito ao esforço da família.' }
    ],
    tag: 'Reutilização e Cuidado'
  },
  {
    id: 2,
    question: 'No supermercado você vê a promoção: "Leve 5 caixas de biscoito por R$ 20,00 ou 1 caixa por R$ 4,00". Mas a validade vence amanhã! O que é mais inteligente?',
    options: [
      { text: 'Comprar as 5 caixas porque acha que está economizando.', correct: false, explanation: 'Se vencer amanhã, você não vai conseguir comer tudo e vai ter que jogar fora.' },
      { text: 'Comprar apenas 1 se for consumir hoje, evitando desperdício de comida e de dinheiro.', correct: true, explanation: 'Muito bem! Uma promoção só é boa se não gerar desperdício.' },
      { text: 'Comprar 10 caixas para estocar.', correct: false, explanation: 'Elas vão estragar e você perderá todo o dinheiro investido.' }
    ],
    tag: 'Promoções e Validade'
  },
  {
    id: 3,
    question: 'Qual é a diferença entre "Desejo" e "Necessidade"?',
    options: [
      { text: 'Necessidade é algo essencial para viver e estudar; Desejo é algo que queremos, mas podemos esperar.', correct: true, explanation: 'Perfeito! Água, comida saudável e material escolar são necessidades. Brinquedos caros da moda são desejos.' },
      { text: 'Necessidade é tudo que vemos em comerciais de televisão.', correct: false, explanation: 'Comerciais criam desejos para fazer as pessoas comprarem mais.' },
      { text: 'São exatamente a mesma coisa.', correct: false, explanation: 'Não são! Reconhecer essa diferença é o passo mais importante para não se endividar.' }
    ],
    tag: 'Educação Financeira Básica'
  },
  {
    id: 4,
    question: 'Quando você recebe uma moedinha ou mesada, qual é o melhor hábito?',
    options: [
      { text: 'Gastar tudo no mesmo minuto para não sobrar nada.', correct: false, explanation: 'Gastar tudo sem pensar impede você de realizar objetivos maiores no futuro.' },
      { text: 'Separar uma parte no cofrinho para um objetivo futuro e gastar com sabedoria o restante.', correct: true, explanation: 'Sensacional! Esse é o hábito dos grandes economistas: poupar primeiro, gastar com inteligência depois.' },
      { text: 'Esconder o dinheiro e nunca contar para ninguém da família.', correct: false, explanation: 'Conversar com a família sobre dinheiro ajuda você a aprender mais.' }
    ],
    tag: 'Poupança e Metas'
  }
];

// Matrizes binárias pré-definidas para o Ateliê de Pixels
export interface PixelPreset {
  name: string;
  icon: string;
  grid: number[][]; // 5x5
}

export const PIXEL_PRESETS: PixelPreset[] = [
  {
    name: 'Coração',
    icon: '❤️',
    grid: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ]
  },
  {
    name: 'Sorriso',
    icon: '😊',
    grid: [
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ]
  },
  {
    name: 'Chave',
    icon: '🔑',
    grid: [
      [0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ]
  },
  {
    name: 'Árvore',
    icon: '🌳',
    grid: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ]
  },
  {
    name: 'Estrela',
    icon: '⭐',
    grid: [
      [0, 0, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ]
  }
];
