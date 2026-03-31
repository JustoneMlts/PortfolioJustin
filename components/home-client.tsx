"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Chatbot from "@/components/chatbot"
import WelcomeModal from "@/components/welcome-modal"

const projectMeta: {
  id: string
  image: string
  technologies: string[]
  link: string
  github: string
  icon: React.ReactNode
  category: string
  comingSoon?: boolean
}[] = [
  {
    id: "geneailogy",
    image: "/GeneCard.png",
    technologies: ["Next.js", "React", "Node.js"],
    link: "https://geneailogy.vercel.app",
    github: "https://github.com/JustoneMlts/geneailogy",
    icon: <span>💬</span>,
    category: "Website",
  },
  {
    id: "italingo",
    image: "/ItalingoCard.png",
    technologies: ["React Native", "TypeScript", "Firebase", "Expo"],
    link: "https://italingo-nu.vercel.app/",
    github: "https://github.com/JustoneMlts/Italingo",
    icon: <span>🌍</span>,
    category: "Web App",
  },
  {
    id: "pfg",
    image: "/pfgCard.png",
    technologies: ["C#", ".NET", "React", "MySQL"],
    link: "https://pfg-liard.vercel.app/",
    github: "#",
    icon: <span>📄</span>,
    category: "Web App",
  },
  {
    id: "Lexia",
    image: "/LexiaCard.png",
    technologies: ["React Native", "TypeScript", "Firebase", "Expo", "OpenAI API"],
    link: "#",
    github: "https://github.com/JustoneMlts/Lexia",
    icon: <span>💼</span>,
    category: "Mobile App",
    comingSoon: true,
  },
  {
    id: "tiip",
    image: "/tiipCard.png",
    technologies: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"],
    link: "https://tiip-justonemlts-projects.vercel.app/",
    github: "#",
    icon: <span>🛡️</span>,
    category: "Web App",
  },
]

const skillsMeta = [
  {
    skills: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "CSS/SCSS" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "C#" },
      { name: "Java" },
      { name: "Python" },
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
    ],
  },
  {
    skills: [
      { name: "Git" },
      { name: "Docker" },
      { name: "AWS" },
      { name: "CI/CD" },
      { name: "Agile/Scrum" },
    ],
  },
]

export default function HomeClient() {
  const { t } = useLanguage()
  const [chatbotPulse, setChatbotPulse] = useState(false)

  const projects = t.projects.items.map((item, i) => ({
    ...projectMeta[i],
    title: item.title,
    description: item.description,
  }))

  const skillCategories = t.skills.categoryNames.map((name, i) => ({
    name,
    skills: skillsMeta[i].skills,
  }))

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse delay-2000" />
      </div>

      <Header />

      <main className="px-4 md:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects projects={projects} />
        <Experience experiences={t.experience.items} />
        <Skills categories={skillCategories} />
        {/* <Showreel /> */}
        <Contact />
      </main>

      <Footer />
      <Chatbot projects={projects} startPulse={chatbotPulse} />
      <WelcomeModal onClose={() => setChatbotPulse(true)} />
    </div>
  )
}
