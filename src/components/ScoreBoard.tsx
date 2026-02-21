import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { CVData } from '../types';

interface ScoreBoardProps {
  data: CVData;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ data }) => {
  const calculateScore = () => {
    let score = 0;
    const tips = [];

    if (data.personalInfo.photo) {
      score += 15;
    } else {
      tips.push("Ajoutez une photo pour gagner 15 points.");
    }

    if (data.personalInfo.summary.length > 150) {
      score += 20;
    } else if (data.personalInfo.summary.length > 0) {
      score += 10;
      tips.push("Développez votre résumé (min 150 caractères) pour +10 points.");
    } else {
      tips.push("Rédigez un résumé pour gagner 20 points.");
    }

    if (data.skills.length >= 5) {
      score += 20;
    } else {
      tips.push("Listez au moins 5 compétences pour +20 points.");
    }

    if (data.experiences.length >= 2) {
      score += 25;
    } else {
      tips.push("Ajoutez au moins 2 expériences professionnelles.");
    }

    if (data.education.length >= 1) {
      score += 20;
    } else {
      tips.push("Ajoutez votre formation.");
    }

    return { score, tips };
  };

  const { score, tips } = calculateScore();

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Score du CV</h3>
        <span className={`text-2xl font-bold ${score > 70 ? 'text-emerald-500' : score > 40 ? 'text-amber-500' : 'text-rose-500'}`}>
          {score}%
        </span>
      </div>
      
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={`h-full transition-all duration-500 ${score > 70 ? 'bg-emerald-500' : score > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
        />
      </div>

      <div className="space-y-2">
        {tips.slice(0, 2).map((tip, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
            <span>{tip}</span>
          </div>
        ))}
        {tips.length === 0 && (
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Votre CV est excellent !</span>
          </div>
        )}
      </div>
    </div>
  );
};
