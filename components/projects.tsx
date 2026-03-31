"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

// 3 visible cards: side cards are SIDE_SCALE of center
const GAP = 16
const SIDE_SCALE = 0.88

export default function Projects({ projects = [] }: ProjectsProps) {
  const { t } = useLanguage()
  const n = projects.length
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [vpWidth, setVpWidth] = useState(0)
  const [carousel, setCarousel] = useState({ index: n, instant: false })
  const [paused, setPaused] = useState(false)

  if (n === 0) return null

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const update = () => setVpWidth(el.clientWidth)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

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

  // All cards have same DOM width → 3 fit exactly in viewport
  // Scale effect on center is purely visual (no layout impact)
  const cardW = vpWidth > 0 ? (vpWidth - 2 * GAP) / 3 : 280

  // Center card = carousel.index + 1 (card at index is the left one)
  // Offset: slide so that card[index] starts at x=0
  const offset = carousel.index * (cardW + GAP)

  const activeInMiddle = ((carousel.index % n) + n) % n

  const IMAGE_H = 192
  const EXPANDED_H = IMAGE_H + CONTENT_HEIGHT
  // Card moves UP by CONTENT_HEIGHT/2 on expand → need that much extra top space
  const TOP_PAD = Math.ceil(CONTENT_HEIGHT / 2) + 16

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 2, ease: "easeInOut" }, opacity: { duration: 0.3 } },
    },
  }

  return (
    <section id="projects" className="py-20 relative overflow-visible">
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
              <motion.path d="M 0 5 Q 35 0 70 5 Q 105 10 140 5" stroke="rgb(139, 92, 246)" strokeWidth="2" fill="none" variants={drawLine} />
              <motion.path
                d="M 20 5 Q 55 2 90 5 Q 125 8 120 5"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1.5"
                fill="none"
                variants={{ ...drawLine, visible: { ...drawLine.visible, transition: { pathLength: { duration: 2, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } } } }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Carousel wrapper — height accounts for upward expand + collapsed card */}
        <div
          className="relative max-w-5xl mx-auto"
          style={{ height: TOP_PAD + IMAGE_H + CONTENT_HEIGHT + 24 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Prev arrow — centered on the image zone */}
          <button
            onClick={prev}
            style={{ top: TOP_PAD + IMAGE_H / 2, transform: "translateY(-50%)" }}
            className="absolute left-0 -translate-x-10 w-9 h-9 rounded-full border border-slate-700/50 bg-slate-900/90 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={next}
            style={{ top: TOP_PAD + IMAGE_H / 2, transform: "translateY(-50%)" }}
            className="absolute right-0 translate-x-10 w-9 h-9 rounded-full border border-slate-700/50 bg-slate-900/90 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Viewport: fully visible — side cards fade via opacity */}
          <div
            ref={wrapperRef}
            className="absolute"
            style={{ top: TOP_PAD, left: 16, right: 16, bottom: 0, overflow: "visible" }}
          >
            <motion.div
              className="flex items-start"
              style={{ gap: GAP }}
              animate={{ x: -offset }}
              transition={carousel.instant ? { duration: 0 } : { type: "tween", ease: "easeInOut", duration: 0.5 }}
              onAnimationComplete={handleAnimationComplete}
            >
              {tripled.map((project, i) => {
                const isCenter = i === carousel.index + 1
                const isSide = i === carousel.index || i === carousel.index + 2
                const isVisible = isCenter || isSide
                return (
                  <motion.div
                    key={`${project.id}-${i}`}
                    style={{ width: cardW, flexShrink: 0, transformOrigin: "top center", zIndex: isCenter ? 10 : 1 }}
                    animate={{ scale: isCenter ? 1 : SIDE_SCALE, opacity: isVisible ? (isCenter ? 1 : 0.65) : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <ProjectCard
                      project={project}
                      viewLabel={t.projects.view}
                      viewProjectLabel={t.projects.viewProject}
                      codeLabel={t.projects.code}
                      comingSoonLabel={t.projects.comingSoon}
                    />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
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

// Height of the content section (title + desc + badges + buttons + padding)
const CONTENT_HEIGHT = 240

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
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -(CONTENT_HEIGHT / 2) : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-slate-800">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
        <span className="absolute top-3 right-3 text-xs font-mono bg-slate-900/80 border border-slate-600/50 text-foreground/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content — slides in from below */}
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, overflow: "hidden" }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
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
        )}
      </AnimatePresence>
    </motion.div>
  )
}
