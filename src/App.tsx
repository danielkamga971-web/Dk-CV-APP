/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileText, MessageSquare, Settings, Sparkles, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { CVData } from './types';
import { CVPreview } from './components/CVPreview';
import { ChatInterface } from './components/ChatInterface';
import { ManualForm } from './components/ManualForm';
import { ScoreBoard } from './components/ScoreBoard';

const INITIAL_DATA: CVData = {
  personalInfo: {
    fullName: "Alexandre Dupont",
    title: "Product Designer Senior",
    email: "alex.dupont@email.com",
    phone: "06 12 34 56 78",
    location: "Paris, France",
    photo: "https://picsum.photos/seed/alex/400/400",
    summary: "Designer passionné par la création d'interfaces intuitives et esthétiques. Plus de 8 ans d'expérience dans la conception de produits SaaS innovants."
  },
  skills: ["UI/UX Design", "React.js", "Figma", "Tailwind CSS", "Product Strategy", "User Research"],
  experiences: [
    {
      id: "1",
      company: "TechFlow Solutions",
      position: "Senior UI Designer",
      period: "2021 - Présent",
      description: "Direction artistique de la plateforme principale. Amélioration du taux de conversion de 25% grâce à une refonte complète de l'onboarding."
    },
    {
      id: "2",
      company: "Creative Studio",
      position: "Product Designer",
      period: "2018 - 2021",
      description: "Conception d'applications mobiles pour des clients Fortune 500. Collaboration étroite avec les équipes engineering."
    }
  ],
  education: [
    {
      id: "1",
      school: "École de Design Nantes Atlantique",
      degree: "Master en Design d'Interaction",
      year: "2018"
    }
  ],
  theme: {
    primaryColor: "#4f46e5",
    fontFamily: "Inter"
  }
};

export default function App() {
  const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'chat' | 'manual'>('chat');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const cvRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleExportPNG = async () => {
    if (!cvRef.current) return;
    const canvas = await html2canvas(cvRef.current, { scale: 2, useCORS: true });
    const link = document.createElement('a');
    link.download = `CV_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      {/* Left Sidebar - Controls */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '450px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}
        className="relative flex flex-col border-r bg-white z-20"
      >
        <div className="flex flex-col h-full w-[450px]">
          {/* Sidebar Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Lumina <span className="text-indigo-600">CV</span></h1>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('chat')}
                className={`p-2 rounded-lg transition-all ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
                title="Assistant IA"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveTab('manual')}
                className={`p-2 rounded-lg transition-all ${activeTab === 'manual' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
                title="Saisie Manuelle"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <ScoreBoard data={cvData} />
            
            <AnimatePresence mode="wait">
              {activeTab === 'chat' ? (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-[calc(100vh-320px)]"
                >
                  <ChatInterface cvData={cvData} onUpdateCV={setCvData} />
                </motion.div>
              ) : (
                <motion.div 
                  key="manual"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <ManualForm data={cvData} onUpdate={setCvData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Footer - Export Buttons */}
          <div className="p-6 border-t bg-slate-50/50 grid grid-cols-2 gap-4">
            <button 
              onClick={handleExportPDF}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button 
              onClick={handleExportPNG}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm"
            >
              <ImageIcon className="w-4 h-4" />
              <span>PNG</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Toggle Sidebar Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute left-[435px] top-1/2 -translate-y-1/2 z-30 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-all"
        style={{ left: isSidebarOpen ? '435px' : '15px' }}
      >
        {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Content - Preview */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#F1F3F5] custom-scrollbar">
        <div className="max-w-[210mm] mx-auto">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800">Aperçu en temps réel</h2>
              <p className="text-slate-500 text-sm">Votre CV s'adapte instantanément à vos modifications.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
          </div>
          
          <div className="origin-top scale-[0.85] lg:scale-100 transition-transform">
            <CVPreview data={cvData} ref={cvRef} />
          </div>
        </div>
      </main>
    </div>
  );
}
