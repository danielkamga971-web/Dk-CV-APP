import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  const { personalInfo, skills, experiences, education, theme } = data;

  return (
    <div 
      ref={ref}
      className="bg-white w-[210mm] min-h-[297mm] mx-auto p-12 cv-shadow flex flex-col gap-8"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <header className="flex justify-between items-start border-b pb-8" style={{ borderColor: `${theme.primaryColor}20` }}>
        <div className="flex-1">
          <h1 className="text-5xl font-serif font-bold tracking-tight mb-2" style={{ color: theme.primaryColor }}>
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="text-xl text-slate-500 font-medium tracking-wide uppercase">
            {personalInfo.title || "Votre Titre Professionnel"}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" style={{ color: theme.primaryColor }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {personalInfo.photo && (
          <div className="relative">
            <div 
              className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg rotate-3"
              style={{ borderColor: theme.primaryColor }}
            >
              <img 
                src={personalInfo.photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-12 gap-12 flex-1">
        {/* Left Column */}
        <div className="col-span-8 space-y-10">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Profil</h2>
              <p className="text-slate-700 leading-relaxed text-lg italic font-serif">
                "{personalInfo.summary}"
              </p>
            </section>
          )}

          {/* Experience */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Expérience</h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: `${theme.primaryColor}30` }}>
                  <div 
                    className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900">{exp.position}</h3>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <p className="text-sm font-medium mb-2" style={{ color: theme.primaryColor }}>{exp.company}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                </div>
              ))}
              {experiences.length === 0 && <p className="text-slate-400 italic text-sm">Aucune expérience ajoutée.</p>}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Formation</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                    <span className="text-xs font-mono text-slate-400">{edu.year}</span>
                  </div>
                  <p className="text-sm text-slate-500">{edu.school}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-10">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Compétences</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{ 
                    backgroundColor: `${theme.primaryColor}08`,
                    borderColor: `${theme.primaryColor}20`,
                    color: theme.primaryColor
                  }}
                >
                  {skill}
                </span>
              ))}
              {skills.length === 0 && <p className="text-slate-400 italic text-sm">Aucune compétence.</p>}
            </div>
          </section>

          {/* Languages or other info could go here */}
          <section className="p-6 rounded-2xl" style={{ backgroundColor: `${theme.primaryColor}05` }}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Contact</h2>
            <div className="space-y-3 text-xs text-slate-600">
              <p className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>linkedin.com/in/profil</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-auto pt-8 border-t text-[10px] text-slate-400 flex justify-between items-center">
        <p>© {new Date().getFullYear()} {personalInfo.fullName}</p>
        <p className="italic font-serif">Généré avec Lumina AI</p>
      </footer>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
