import React, { useState, useEffect } from 'react';
import { GameTab } from './types/game';
import { Navbar } from './components/Navbar';
import { CampaignMode } from './components/CampaignMode';
import { CodeLabMode } from './components/CodeLabMode';
import { FinanceLabMode } from './components/FinanceLabMode';
import { SecretEncoderMode } from './components/SecretEncoderMode';
import { CertificateModal } from './components/CertificateModal';
import { PedagogicalGuideModal } from './components/PedagogicalGuideModal';
import { sound } from './utils/audio';
import { Sparkles, Trophy, BookOpen } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<GameTab>('campaign');
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('missao_recreio_stars');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [completedStages, setCompletedStages] = useState<number[]>(() => {
    const saved = localStorage.getItem('missao_recreio_stages');
    return saved ? JSON.parse(saved) : [];
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState<boolean>(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('missao_recreio_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('missao_recreio_stages', JSON.stringify(completedStages));
  }, [completedStages]);

  const handleEarnStars = (amount: number) => {
    setStars((prev) => prev + amount);
  };

  const handleCompleteStage = (stageId: number) => {
    setCompletedStages((prev) => {
      if (!prev.includes(stageId)) {
        return [...prev, stageId];
      }
      return prev;
    });
  };

  const handleToggleSound = () => {
    sound.soundEnabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Nunito',sans-serif]">
      {/* Navbar with main tabs, score and sound */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        stars={stars}
        onOpenTeacherGuide={() => setIsTeacherGuideOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {currentTab === 'campaign' && (
          <CampaignMode
            onEarnStars={handleEarnStars}
            completedStages={completedStages}
            onCompleteStage={handleCompleteStage}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'codelab' && (
          <CodeLabMode onEarnStars={handleEarnStars} />
        )}

        {currentTab === 'financelab' && (
          <FinanceLabMode onEarnStars={handleEarnStars} />
        )}

        {currentTab === 'encoder' && (
          <SecretEncoderMode />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎒</span>
            <span className="font-bold text-slate-700">Missão Recreio (4º Ano)</span>
            <span>—</span>
            <span>Codificação EF04CO04 & Educação Financeira</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                setIsTeacherGuideOpen(true);
              }}
              className="text-indigo-600 hover:text-indigo-800 font-bold transition flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>BNCC & Guia Pedagógico</span>
            </button>
            <span>•</span>
            <button
              onClick={() => {
                sound.playClick();
                setIsCertificateOpen(true);
              }}
              className="text-amber-600 hover:text-amber-800 font-bold transition flex items-center gap-1"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Certificado</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        stars={stars}
        completedStagesCount={completedStages.length}
      />

      <PedagogicalGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
      />
    </div>
  );
}
