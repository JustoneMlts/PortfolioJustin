"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

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

  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  const slideFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
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
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  return (
    <section ref={ref} id="about" className="py-20 bg-slate-900/50 relative overflow-hidden">
      {/* Background animated elements */}
      <motion.div
        style={{ x, opacity }}
        className="absolute top-10 left-0 w-32 h-32 border-2 border-primary/20 rotate-45"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]), opacity }}
        className="absolute bottom-20 right-0 w-24 h-24 border-2 border-cyan-400/20 rounded-full"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 50]), opacity }}
        className="absolute top-1/2 right-10 w-16 h-16 border border-violet-400/20 transform rotate-12"
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={slideFromLeft} className="text-3xl font-bold mb-4">
            À propos de moi
          </motion.h2>

          {/* Animated underline */}
          <div className="flex justify-center mb-2">
            <svg width="80" height="4" viewBox="0 0 80 4">
              <motion.path
                d="M 0 2 Q 40 0 80 2"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                fill="none"
                variants={drawLine}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={slideFromLeft} className="relative">
            {/* Cadre décoratif statique - ANIMATION SUPPRIMÉE */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/30 rounded-lg" />

            {/* Point décoratif statique - ANIMATION SUPPRIMÉE */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rounded-full blur-sm opacity-50" />

            <img
              src="/developer-coding.png"
              alt="Justin Maltese au travail"
              className="rounded-lg w-full h-auto relative z-10"
            />
          </motion.div>

          <motion.div variants={slideFromRight} className="space-y-6">
            <motion.h3
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.6 },
                },
              }}
              className="text-2xl font-semibold"
            >
              Développeur Full Stack passionné
            </motion.h3>

            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.6 },
                },
              }}
              className="text-foreground/80"
            >
              Avec plus de 3 ans d'expérience dans le développement web, je me spécialise dans la création
              d'applications web modernes et performantes. Ma passion pour les nouvelles technologies me pousse à
              constamment apprendre et à me perfectionner.
            </motion.p>

            <motion.p
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.5, duration: 0.6 },
                },
              }}
              className="text-foreground/80"
            >
              Je m'efforce de créer des expériences utilisateur exceptionnelles en combinant un design attrayant avec
              des fonctionnalités robustes et une architecture solide.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delay: 0.6,
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {[
                "Développement Front-end",
                "Développement Back-end",
                "Architecture logicielle",
                "UI/UX Design",
                "Optimisation des performances",
                "Responsive Design",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    visible: {
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  >
                    <CheckCircle className="text-primary h-5 w-5" />
                  </motion.div>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
