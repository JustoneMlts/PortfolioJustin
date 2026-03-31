"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  comingSoon?: boolean
}

interface ProjectsProps {
  projects?: Project[]
}

const GAP = 24

export default function Projects({ projects = [] }: ProjectsProps) {
  const { t } = useLanguage()
  const n = projects.length
  const viewportRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(380)
  const [carousel, setCarousel] = useState({ index: n, instant: false })
  const [paused, setPaused] = useState(false)

  if (n === 0) return null

  // Compute card width based on container size
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const update = () => {
      const w = el.clientWidth
      setCardWidth(Math.min(380, w - 0)) // full width on small screens
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Reset to middle copy when projects list changes (language switch)
  useEffect(() => {
    setCarousel({ index: n, instant: true })
  }, [n])

  const tripled = [...projects, ...projects, ...projects]

  const next = useCallback(() => setCarousel((s) => ({ index: s.index + 1, instant: false })), [])
  const prev = useCallback(() => setCarousel((s) => ({ index: s.index - 1, instant: false })), [])

  const handleAnimationComplete = useCallback(() => {
    setCarousel((s) => {
      if (s.index >= n * 2) return { index: s.index - n, instant: true }
      if (s.index < n) return { index: s.index + n, instant: true }
      return s
    })
  }, [n])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [paused, next])

  const offset = carousel.index * (cardWidth + GAP)
  const activeInMiddle = ((carousel.index % n) + n) % n

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.3 } },
    },
  }

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-cyan-400/30 rotate-45 pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-violet-400/30 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={{
              hidden: { y: -50, opacity: 0, scale: 0.5 },
              visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, type: "spring" } },
            }}
            className="text-3xl font-bold mb-4 neon-glow"
          >
            {t.projects.title}
          </motion.h2>
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
            </svg>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="flex items-center gap-2 sm:gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Prev arrow */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-700/50 bg-slate-900/80 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Viewport */}
          <div ref={viewportRef} className="flex-1 overflow-hidden rounded-xl py-6">
            <motion.div
              className="flex"
              style={{ gap: GAP }}
              animate={{ x: -offset }}
              transition={
                carousel.instant
                  ? { duration: 0 }
                  : { type: "tween", ease: "easeInOut", duration: 0.5 }
              }
              onAnimationComplete={handleAnimationComplete}
            >
              {tripled.map((project, i) => (
                <div key={`${project.id}-${i}`} style={{ width: cardWidth, flexShrink: 0 }}>
                  <ProjectCard
                    project={project}
                    viewLabel={t.projects.view}
                    viewProjectLabel={t.projects.viewProject}
                    codeLabel={t.projects.code}
                    comingSoonLabel={t.projects.comingSoon}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-700/50 bg-slate-900/80 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - activeInMiddle
                setCarousel((s) => ({ index: s.index + diff, instant: false }))
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeInMiddle ? "w-6 bg-primary" : "w-1.5 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  viewLabel,
  viewProjectLabel,
  codeLabel,
  comingSoonLabel,
}: {
  project: Project
  viewLabel: string
  viewProjectLabel: string
  codeLabel: string
  comingSoonLabel: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-800">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
        <span className="absolute top-3 right-3 text-xs font-mono bg-slate-900/80 border border-slate-600/50 text-foreground/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
            {project.icon}
          </div>
          <h3 className="text-base font-semibold text-foreground truncate">{project.title}</h3>
        </div>

        <p className="text-sm text-foreground/70 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs neon-badge">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="secondary" className="text-xs neon-badge cursor-default">
                    +{project.technologies.length - 3}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1">
                  {project.technologies.slice(3).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex gap-2 mt-1">
          {project.comingSoon ? (
            <Button size="sm" variant="outline" disabled className="flex-1 text-xs opacity-50 cursor-not-allowed">
              <ExternalLink className="mr-1 h-3 w-3" />
              {comingSoonLabel}
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild className="flex-1 neon-button-outline text-xs">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                {viewLabel}
              </a>
            </Button>
          )}
          <Button size="sm" variant="outline" asChild className="neon-button-outline">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
