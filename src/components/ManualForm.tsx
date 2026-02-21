import React from 'react';
import { CVData, Experience, Education } from '../types';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code } from 'lucide-react';

interface ManualFormProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
}

export const ManualForm: React.FC<ManualFormProps> = ({ data, onUpdate }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onUpdate({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      description: ''
    };
    onUpdate({ ...data, experiences: [newExp, ...data.experiences] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onUpdate({
      ...data,
      experiences: data.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({ ...data, experiences: data.experiences.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      year: ''
    };
    onUpdate({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const removeEducation = (id: string) => {
    onUpdate({ ...data, education: data.education.filter(edu => edu.id !== id) });
  };

  const updateSkills = (value: string) => {
    onUpdate({ ...data, skills: value.split(',').map(s => s.trim()).filter(s => s !== '') });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Personal Info */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <User className="w-5 h-5 text-indigo-600" />
          <h3>Informations Personnelles</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Nom Complet</label>
            <input 
              type="text" 
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Titre</label>
            <input 
              type="text" 
              value={data.personalInfo.title}
              onChange={(e) => updatePersonalInfo('title', e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Email</label>
            <input 
              type="email" 
              value={data.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase text-slate-400">Téléphone</label>
            <input 
              type="text" 
              value={data.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400">Résumé</label>
          <textarea 
            rows={3}
            value={data.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
          />
        </div>
      </section>

      {/* Experiences */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <h3>Expériences</h3>
          </div>
          <button onClick={addExperience} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
              <button 
                onClick={() => removeExperience(exp.id)}
                className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input 
                  placeholder="Entreprise"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                />
                <input 
                  placeholder="Poste"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
              <input 
                placeholder="Période (ex: 2020 - Présent)"
                value={exp.period}
                onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none mb-3"
              />
              <textarea 
                placeholder="Description des missions..."
                rows={2}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none resize-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h3>Formation</h3>
          </div>
          <button onClick={addEducation} className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group">
              <button 
                onClick={() => removeEducation(edu.id)}
                className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input 
                  placeholder="École / Université"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                />
                <input 
                  placeholder="Diplôme"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
                />
              </div>
              <input 
                placeholder="Année"
                value={edu.year}
                onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <Code className="w-5 h-5 text-indigo-600" />
          <h3>Compétences</h3>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400">Séparez par des virgules</label>
          <input 
            type="text" 
            placeholder="React, TypeScript, UI Design..."
            value={data.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none"
          />
        </div>
      </section>
    </div>
  );
};
