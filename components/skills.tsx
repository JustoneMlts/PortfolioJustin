"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef } from "react"

interface Skill {
  name: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface SkillsProps {
  categories: SkillCategory[]
}

export default function Skills({ categories }: SkillsProps) {
  const [activeTab, setActiveTab] = useState(categories[0].name)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"])
  const floatingY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const skillVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotateY: 90,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.8, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    },
  }

  return (
    <section ref={ref} id="skills" className="py-20 bg-slate-900/30 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        style={{ x: backgroundX }}
        className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <motion.div
        style={{ y: floatingY }}
        className="absolute top-20 right-10 w-32 h-32 border border-cyan-400/20 rounded-full"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]) }}
        className="absolute bottom-20 left-0 w-24 h-2 bg-gradient-to-r from-violet-400/30 to-blue-400/30"
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
              hidden: { y: -30, opacity: 0, scale: 0.8 },
              visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, type: "spring" },
              },
            }}
            className="text-3xl font-bold mb-4"
          >
            Mes Compétences
          </motion.h2>

          {/* Complex animated underline */}
          <div className="flex justify-center">
            <svg width="120" height="8" viewBox="0 0 120 8">
              <motion.path
                d="M 0 4 Q 30 0 60 4 Q 90 8 120 4"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                fill="none"
                variants={drawLine}
              />
              <motion.path
                d="M 10 4 Q 40 2 70 4 Q 100 6 110 4"
                stroke="rgb(34, 211, 238)"
                strokeWidth="1"
                fill="none"
                variants={{
                  ...drawLine,
                  visible: {
                    ...drawLine.visible,
                    transition: {
                      pathLength: { duration: 1.8, ease: "easeInOut", delay: 0.5 },
                      opacity: { duration: 0.3, delay: 0.5 },
                    },
                  },
                }}
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <Tabs defaultValue={categories[0].name} className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
            <motion.div
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            >
              <TabsList className="flex justify-between items-center px-10 py-4 mb-12 bg-slate-800/50 border border-slate-700/50">
                {categories.map((category, index) => (
                  <motion.div key={category.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <TabsTrigger
                      value={category.name}
                      className="text-base data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-300"
                    >
                      {category.name}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </motion.div>

            {categories.map((category) => (
              <TabsContent key={category.name} value={category.name} className="mt-0">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                >
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      whileHover={{
                        scale: 1.08,
                        rotateY: 5,
                        z: 50,
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group perspective-1000"
                    >
                      <div className="p-6 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-primary/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center relative overflow-hidden transform-gpu">
                        {/* Background animation on hover */}
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 0.1 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-br from-primary to-cyan-400 rounded-lg"
                        />

                        {/* Floating particles */}
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.2,
                          }}
                          className="absolute top-2 right-2 w-2 h-2 bg-primary/50 rounded-full"
                        />

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative z-10"
                        >
                          <span className="text-xl font-bold text-primary">{skill.name.charAt(0)}</span>
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                          className="font-medium text-lg group-hover:text-primary transition-colors relative z-10"
                        >
                          {skill.name}
                        </motion.h3>

                        {/* Accent gradient en bas - simplifié */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            delay: index * 0.1 + 0.8,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-violet-400 rounded-b-lg"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            variants={{
              hidden: { y: 50, opacity: 0, scale: 0.9 },
              visible: {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { delay: 0.8, duration: 0.8 },
              },
            }}
            className="mt-16 p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg shadow-md max-w-4xl mx-auto relative overflow-hidden"
          >
            {/* Background wave animation */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />

            <h3 className="text-xl font-semibold mb-6 text-center relative z-10">Autres compétences</h3>
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="flex flex-wrap justify-center gap-3 relative z-10"
            >
              {[
                "Git",
                "Docker",
                "CI/CD",
                "RESTful API",
                "GraphQL",
                "Responsive Design",
                "UI/UX",
                "Agile/Scrum",
                "Testing",
                "Performance Optimization",
                "SEO",
                "Accessibility",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={{
                    hidden: {
                      scale: 0,
                      opacity: 0,
                      y: 20,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-slate-800/80 rounded-full border border-slate-700/50 hover:border-primary/50 hover:text-primary transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Gradient accent au survol */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 rounded-full"
                  />
                  <span className="relative z-10">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
