import type { Metadata } from "next"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Showreel from "@/components/showreel"
import About from "@/components/about"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Justin Maltese | Développeur Full Stack",
  description:
    "Portfolio de Justin Maltese, développeur Full Stack passionné par la création d'applications web modernes et performantes.",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header sans padding - pleine largeur */}
      <Header />

      {/* Main content avec padding global */}
      <main className="px-4 md:px-6 lg:px-8">
        <Hero />
        <About />
        <Projects
          projects={[
            {
              id: "geneailogy",
              title: "GeneAiLogy",
              description: "Renouez avec votre histoire familiale avec une touche d'IA.",
              image: "/GeneCard.png",
              technologies: ["Next.js", "Framer Motion", "GSAP", "Sanity CMS"],
              link: "https://geneailogy.vercel.app",
              github: "https://github.com/JustoneMlts/geneailogy",
              icon: <span>💬</span>,
              category: "Website",
            },
            {
              id: "italingo",
              title: "Italingo",
              description: "Apprenez facilement l'italien avec une app interactive.",
              image: "/ItalingoCard.png",
              technologies: ["React Native", "TypeScript", "Firebase", "Expo"],
              link: "https://italingo-nu.vercel.app/",
              github: "https://github.com/JustoneMlts/Italingo",
              icon: <span>🌍</span>,
              category: "Mobile App",
            },
            {
              id: "project-manager",
              title: "TaskFlow Pro",
              description: "Une app de gestion de projet type Monday pour optimiser votre productivité.",
              image: "/CommCard.png",
              technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
              link: "#",
              github: "https://github.com/JustoneMlts/Italingo",
              icon: <span>💼</span>,
              category: "Web App",
            },
            
          ]}
        />
        <Experience
          experiences={[
            {
              title: "Développeur Full Stack",
              company: "Indépendant",
              period: "2023 - Aujourd'hui",
              description:
                "Travail en freelance sur des projets personnels. Montée en compétences en UX/UI (maquettage), DevOps, intégration continue, nouvelles technologies et bonnes pratiques de développement pour devenir un profil polyvalent.",
              technologies: ["React", "Node.js", "Firebase", "Docker","Figma"],
            },
            {
              title: "Développeur Full Stack",
              company: "SmartEvo",
              period: "2021 - 2023",
              description:
                "Développement complet de la plateforme Smartevo, un outil de gestion de projets audiovisuels. Participation à l’architecture, l’implémentation de fonctionnalités clés et à l'amélioration continue de l’interface et des performances.",
              technologies: ["React", "Node.js", "Postgre", "Docker"],
            },
            {
              title: "Développeur Junior",
              company: "Digidom",
              period: "2020 - 2021",
              description:
                "Refonte complète du site web et mise à jour de l’API principale. Développement de nouvelles fonctionnalités majeures pour améliorer l’expérience utilisateur et la performance globale du service.",
              technologies: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
            },
             {
              title: "Obtention de mon bac+5 en informatique.",
              company: "Institut G4",
              period: "2020 - 2023",
              description:
                "Obtention d’un Master en Informatique avec une spécialisation en développement web. Réalisation de projets pour de véritables clients : gestion de projet, développement d’applications web, travail en équipe, et respect des délais. Solide expérience acquise en conditions professionnelles.",
              technologies: [],
            },
          ]}
        />
        <Skills
          categories={[
            {
              name: "Front-end",
              skills: [
                { name: "React" },
                { name: "TypeScript" },
                { name: "Next.js" },
                { name: "CSS/SCSS" },
                { name: "Tailwind CSS" },
              ],
            },
            {
              name: "Back-end",
              skills: [
                { name: "Node.js" },
                { name: "Express" },
                { name: "MongoDB" },
                { name: "PostgreSQL" },
                { name: "GraphQL" },
              ],
            },
            {
              name: "Outils & Autres",
              skills: [
                { name: "Git" },
                { name: "Docker" },
                { name: "AWS" },
                { name: "CI/CD" },
                { name: "Agile/Scrum" },
              ],
            },
          ]}
        />
        <Showreel />
        <Contact />
      </main>

      {/* Footer sans padding - pleine largeur */}
      <Footer />
    </div>
  )
}
