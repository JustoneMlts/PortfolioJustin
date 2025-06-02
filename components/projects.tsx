"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Globe, Briefcase, MessageSquare, Eye } from "lucide-react"
import { useRef } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
  github: string
  icon: React.ReactNode
  category: string
}

interface ProjectsProps {
  projects?: Project[]
}

const defaultProjects: Project[] = [
  {
    id: "italingo",
    title: "Italingo",
    description: "Apprenez facilement l'italien avec une app interactive.",
    image: "/italingo.PNG",
    technologies: ["React Native", "TypeScript", "Firebase", "Expo"],
    link: "#",
    github: "",
    icon: <Globe className="w-6 h-6" />,
    category: "Web App",
  },
  {
    id: "project-manager",
    title: "TaskFlow Pro",
    description: "Une app de gestion de projet type Monday pour optimiser votre productivité.",
    image: "/project-management-app.png",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    link: "#",
    github: '',
    icon: <Briefcase className="w-6 h-6" />,
    category: "Web App",
  },
  {
    id: "communication-site",
    title: "ComStudio",
    description: "Site vitrine d'une entreprise de communication moderne et créative.",
    image: "/communication-company-website.png",
    technologies: ["Next.js", "Framer Motion", "GSAP", "Sanity CMS"],
    link: "#",
    github: "",
    icon: <MessageSquare className="w-6 h-6" />,
    category: "Website",
  },
]

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      rotateX: 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  const handleProjectClick = (projectId: string) => {
    if (isMobile) {
      setActiveProject(activeProject === projectId ? null : projectId)
    }
  }

  const handleMouseEnter = (projectId: string) => {
    if (!isMobile) {
      setActiveProject(projectId)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveProject(null)
    }
  }

  return (
    <section ref={ref} id="projects" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ rotate: backgroundRotate }}
        className="absolute top-10 right-10 w-20 h-20 border-2 border-cyan-400/30 neon-border"
      />
      <motion.div
        style={{ y: floatingY }}
        className="absolute bottom-20 left-10 w-16 h-16 border-2 border-violet-400/30 neon-border"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]) }}
        className="absolute top-1/2 left-0 w-32 h-1 bg-gradient-to-r from-primary/50 to-cyan-400/50"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={{
              hidden: { y: -50, opacity: 0, scale: 0.5 },
              visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, type: "spring" },
              },
            }}
            className="text-3xl font-bold mb-4 neon-glow"
          >
            Mes Projets
          </motion.h2>

          {/* Animated underline with multiple paths */}
          <div className="flex justify-center">
            <svg width="140" height="10" viewBox="0 0 140 10">
              <motion.path
                d="M 0 5 Q 35 0 70 5 Q 105 10 140 5"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                fill="none"
                variants={drawLine}
              />
              <motion.path
                d="M 20 5 Q 55 2 90 5 Q 125 8 120 5"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1.5"
                fill="none"
                variants={{
                  ...drawLine,
                  visible: {
                    ...drawLine.visible,
                    transition: {
                      pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 },
                      opacity: { duration: 0.3, delay: 0.5 },
                    },
                  },
                }}
              />
              <motion.circle
                cx="70"
                cy="5"
                r="3"
                fill="rgb(139, 92, 246)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="relative group perspective-1000"
            >
              {/* Vignette principale */}
              <motion.div
                className="relative bg-slate-900/80 border border-slate-700/50 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 neon-card transform-gpu"
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProjectClick(project.id)}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background glow animation on hover */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 0.1, scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-400 rounded-lg blur-xl"
                />

                {/* Contours partiels alternés avec animation */}
                <div className="absolute inset-0 pointer-events-none">
                  {index % 3 === 0 && (
                    <>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="absolute top-0 left-0 w-8 h-1 bg-primary neon-border origin-left"
                      />
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                        className="absolute top-0 left-0 w-1 h-8 bg-primary neon-border origin-top"
                      />
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                        className="absolute top-0 left-8 w-16 h-[1px] bg-primary opacity-50 origin-left"
                      />
                    </>
                  )}
                  {index % 3 === 1 && (
                    <>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="absolute top-0 right-0 w-8 h-1 bg-cyan-400 neon-border-cyan origin-right"
                      />
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                        className="absolute top-0 right-0 w-1 h-8 bg-cyan-400 neon-border-cyan origin-top"
                      />
                    </>
                  )}
                  {index % 3 === 2 && (
                    <>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="absolute bottom-0 left-0 w-8 h-1 bg-violet-400 neon-border-violet origin-left"
                      />
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                        className="absolute bottom-0 left-0 w-1 h-8 bg-violet-400 neon-border-violet origin-bottom"
                      />
                    </>
                  )}
                </div>

                {/* Header avec logo et infos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  className="flex items-start space-x-4 mb-4 relative z-10"
                >
                  {/* Logo avec animation */}
                  <motion.div
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      index % 3 === 0
                        ? "bg-primary/20 text-primary"
                        : index % 3 === 1
                          ? "bg-cyan-400/20 text-cyan-400"
                          : "bg-violet-400/20 text-violet-400"
                    }`}
                  >
                    {project.icon}
                  </motion.div>

                  {/* Infos du projet */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-foreground truncate">{project.title}</h3>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.4 }}
                        className="text-xs text-foreground/60 font-mono"
                      >
                        {project.category}
                      </motion.span>
                    </div>
                    <p className="text-sm text-foreground/70 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>

                {/* Technologies avec animation staggered */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.6,
                    staggerChildren: 0.1,
                  }}
                  className="flex flex-wrap gap-1 mb-4 relative z-10"
                >
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <motion.div
                      key={tech}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: techIndex * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Badge variant="secondary" className="text-xs neon-badge">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                  {project.technologies.length > 3 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Badge variant="secondary" className="text-xs neon-badge">
                        +{project.technologies.length - 3}
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>

                {/* Actions avec animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.6 }}
                  className="flex space-x-2 relative z-10"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" variant="outline" asChild className="flex-1 neon-button-outline text-xs">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Voir
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    <Button size="sm" variant="outline" asChild className="neon-button-outline">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3" />
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Indicateur d'interaction animé */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-2 right-2"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-cyan-400" : "bg-violet-400"
                    }`}
                  ></div>
                </motion.div>

                {/* Indicateur de click pour mobile */}
                {isMobile && (
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute bottom-2 right-2 bg-slate-800/90 border border-primary/30 rounded-full px-2 py-1 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary font-medium">Tap</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Overlay avec image au survol/clic - CORRIGÉ */}
              <AnimatePresence mode="wait">
                {activeProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-sm rounded-lg border border-primary/50 overflow-hidden"
                    onMouseEnter={() => {
                      // Empêche la fermeture au hover sur l'overlay
                      if (!isMobile) {
                        setActiveProject(project.id)
                      }
                    }}
                    onMouseLeave={() => {
                      // Ferme seulement si on quitte complètement la zone
                      if (!isMobile) {
                        setActiveProject(null)
                      }
                    }}
                  >
                    {/* Image du projet */}
                    <div className="relative h-full">
                      <motion.img
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay avec infos */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/50"
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                          <p className="text-sm text-white/80 mb-3">{project.description}</p>
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" asChild className="neon-button">
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Voir le projet
                                </a>
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05, rotate: 10 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" asChild className="neon-button-outline">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" />
                                  Code
                                </a>
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Bouton de fermeture sur mobile */}
                      {isMobile && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6, type: "spring" }}
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveProject(null)
                          }}
                          className="absolute top-4 right-4 w-8 h-8 bg-slate-900/80 rounded-full flex items-center justify-center text-white hover:bg-slate-800 z-30"
                        >
                          ×
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
