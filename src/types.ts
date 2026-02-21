export interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    photo: string;
    summary: string;
  };
  skills: string[];
  experiences: Experience[];
  education: Education[];
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
