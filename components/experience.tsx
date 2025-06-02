"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon } from "lucide-react"
import { useRef } from "react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

interface ExperienceProps {
  experiences: ExperienceItem[]
}

export default function Experience({ experiences }: ExperienceProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const timelineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  return (
    <section ref={ref} id="experience" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-2 h-32 bg-primary transform rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-2 h-24 bg-cyan-400 transform -rotate-12" />
        <div className="absolute top-1/2 left-1/3 w-16 h-2 bg-violet-400" />
      </motion.div>

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
              hidden: { y: -50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, type: "spring" },
              },
            }}
            className="text-3xl font-bold mb-4"
          >
            Mon Parcours
          </motion.h2>

          {/* Animated underline with curve */}
          <div className="flex justify-center">
            <svg width="100" height="6" viewBox="0 0 100 6">
              <motion.path
                d="M 0 3 Q 25 0 50 3 Q 75 6 100 3"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                fill="none"
                variants={drawLine}
              />
              <motion.circle
                cx="50"
                cy="3"
                r="2"
                fill="rgb(139, 92, 246)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Container principal avec timeline */}
        <div className="relative">
          {/* Timeline container avec largeur fixe */}
          <div className="absolute inset-0 flex justify-center">
            <div className="relative w-1">
              {/* Timeline background */}
              <div className="absolute inset-0 bg-border/30"></div>
              {/* Timeline animated */}
              <motion.div
                style={{ height: timelineHeight }}
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-primary via-cyan-400 to-violet-400"
              />
            </div>
          </div>

          {/* Experiences */}
          <div className="relative max-w-6xl mx-auto">
            {experiences.map((exp, index) => {
              // Fonction pour calculer l'animation de chaque badge selon sa position
              const totalExperiences = experiences.length
              const badgePosition = index / (totalExperiences - 1) // Position relative (0 à 1)

              // Point d'activation : quand la timeline atteint ce badge
              const activationPoint = Math.min(0.75, badgePosition * 0.8)

              // Animation qui reste active une fois déclenchée
              // const badgeScale = useTransform(
              //   scrollYProgress,
              //   [0, activationPoint, 1],
              //   [1, 1.3, 1.3], // Reste à 1.3 après activation
              // )

              // const badgeOpacity = useTransform(
              //   scrollYProgress,
              //   [0, Math.max(0.05, activationPoint - 0.05), activationPoint, 1],
              //   [0, 0.7, 1, 1], // Reste à 1 après activation
              // )

              // const badgeGlow = useTransform(
              //   scrollYProgress,
              //   [0, activationPoint, Math.min(1, activationPoint + 0.1), 1],
              //   [0, 1, 0.8, 0.8], // Reste partiellement actif après le pic
              // )

              // Couleur de l'icône qui reste blanche après activation
              // const iconColor = useTransform(
              //   scrollYProgress,
              //   [0, activationPoint, 1],
              //   ["rgb(139, 92, 246)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
              // )

              // Couleur de la bordure qui reste active
              // const borderColor = useTransform(
              //   scrollYProgress,
              //   [0, activationPoint, 1],
              //   ["rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 1)", "rgba(139, 92, 246, 0.8)"],
              // )

              // Box shadow qui reste partiellement active
              // const boxShadow = useTransform(
              //   scrollYProgress,
              //   [0, activationPoint, Math.min(1, activationPoint + 0.1), 1],
              //   [
              //     "0 0 0px rgba(139, 92, 246, 0.3)",
              //     "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
              //     "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)",
              //     "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)",
              //   ],
              // )

              // const badgeAnimation = { badgeScale, badgeOpacity, badgeGlow, iconColor, borderColor, boxShadow }

              return (
                <div key={index} className="relative mb-24">
                  {/* Container pour centrer le badge - MASQUÉ SUR MOBILE */}
                  <div className="absolute inset-0 justify-center items-center pointer-events-none hidden md:flex">
                    <ExperienceBadge scrollYProgress={scrollYProgress} activationPoint={activationPoint} />
                  </div>

                  {/* Grid pour les cartes - ADAPTÉ POUR MOBILE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[200px]">
                    {/* Card à gauche pour les index pairs */}
                    {index % 2 === 0 && (
                      <>
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          variants={{
                            hidden: {
                              opacity: 0,
                              x: 100,
                              scale: 0.8,
                            },
                            visible: {
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              transition: {
                                duration: 0.8,
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100,
                                damping: 12,
                              },
                            },
                          }}
                          whileHover={{
                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
                            y: -5,
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-full p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg shadow-md backdrop-blur-sm relative overflow-hidden z-10 justify-self-end md:mr-8"
                        >
                          {/* Card content */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                          />

                          <div className="mb-4 relative z-10">
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-foreground/70">
                              <span className="font-medium">{exp.company}</span>
                              <span className="hidden md:inline">•</span>
                              <span>{exp.period}</span>
                            </div>
                          </div>

                          <p className="mb-4 text-foreground/80 relative z-10">{exp.description}</p>

                          <div className="flex flex-wrap gap-2 relative z-10">
                            {exp.technologies.map((tech) => (
                              <motion.div
                                key={tech}
                                whileHover={{
                                  scale: 1.1,
                                  boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
                                }}
                              >
                                <Badge variant="outline" className="font-normal cursor-pointer">
                                  {tech}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                        <div className="hidden md:block"></div> {/* Colonne vide sur desktop seulement */}
                      </>
                    )}

                    {/* Card à droite pour les index impairs */}
                    {index % 2 === 1 && (
                      <>
                        <div className="hidden md:block"></div> {/* Colonne vide sur desktop seulement */}
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-50px" }}
                          variants={{
                            hidden: {
                              opacity: 0,
                              x: -100,
                              scale: 0.8,
                            },
                            visible: {
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              transition: {
                                duration: 0.8,
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100,
                                damping: 12,
                              },
                            },
                          }}
                          whileHover={{
                            boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)",
                            y: -5,
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-full p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg shadow-md backdrop-blur-sm relative overflow-hidden z-10 justify-self-start md:ml-8"
                        >
                          {/* Card content */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                          />

                          <div className="mb-4 relative z-10">
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-foreground/70">
                              <span className="font-medium">{exp.company}</span>
                              <span className="hidden md:inline">•</span>
                              <span>{exp.period}</span>
                            </div>
                          </div>

                          <p className="mb-4 text-foreground/80 relative z-10">{exp.description}</p>

                          <div className="flex flex-wrap gap-2 relative z-10">
                            {exp.technologies.map((tech) => (
                              <motion.div
                                className="relative overflow-hidden rounded-full"
                                key={tech}
                                whileHover={{
                                  scale: 1.1,
                                }}
                              >
                                <Badge
                                  variant="outline"
                                  className="font-normal cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-primary/70 hover:text-primary hover:bg-primary/10"
                                >
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 0.2 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                                  />
                                  <span className="relative z-10">{tech}</span>
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ExperienceBadgeProps {
  scrollYProgress: any
  activationPoint: number
}

const ExperienceBadge = ({ scrollYProgress, activationPoint }: ExperienceBadgeProps) => {
  const badgeScale = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, 1],
    [1, 1, 1.3, 1.3], // Reste à 1.3 après activation
  )

  const badgeOpacity = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, 1],
    [0, 0.7, 1, 1], // Reste à 1 après activation
  )

  const badgeGlow = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, Math.min(1, activationPoint + 0.1), 1],
    [0, 0, 1, 0.8, 0.8], // Se déclenche au contact et reste partiellement actif
  )

  // Couleur de l'icône qui change au premier contact
  const iconColor = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, 1],
    ["rgb(139, 92, 246)", "rgb(139, 92, 246)", "rgb(255, 255, 255)", "rgb(255, 255, 255)"],
  )

  // Couleur de la bordure qui s'active au contact
  const borderColor = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, 1],
    ["rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 0.5)", "rgba(139, 92, 246, 1)", "rgba(139, 92, 246, 0.8)"],
  )

  // Box shadow qui se déclenche au premier contact
  const boxShadow = useTransform(
    scrollYProgress,
    [0, Math.max(0, activationPoint - 0.1), activationPoint, Math.min(1, activationPoint + 0.1), 1],
    [
      "0 0 0px rgba(139, 92, 246, 0.3)",
      "0 0 0px rgba(139, 92, 246, 0.3)",
      "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)",
      "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)",
      "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.3)",
    ],
  )

  return (
    <motion.div
      style={{
        opacity: badgeOpacity,
        scale: badgeScale,
      }}
      className="relative w-16 h-16 rounded-full flex items-center justify-center border-2 backdrop-blur-sm pointer-events-auto z-30"
    >
      {/* Background avec gradient qui change selon l'activation */}
      <motion.div
        style={{
          opacity: badgeGlow,
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/50 to-cyan-400/50"
      />

      {/* Border qui s'illumine et reste active */}
      <motion.div
        style={{
          boxShadow: boxShadow,
          borderColor: borderColor,
        }}
        className="absolute inset-0 rounded-full border-2"
      />

      {/* Background par défaut */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-cyan-400/30" />

      {/* Icône avec couleur persistante */}
      <motion.div
        style={{
          color: iconColor,
        }}
        className="relative z-10"
      >
        <BriefcaseIcon className="w-8 h-8" />
      </motion.div>
    </motion.div>
  )
}
