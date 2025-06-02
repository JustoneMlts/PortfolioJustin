"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Twitter, Code, Zap, Star, GraduationCap, X } from "lucide-react"
import { useState, useEffect } from "react"

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handlePhotoInteraction = () => {
    if (isMobile) {
      setIsHovered(!isHovered)
    }
  }

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
    }
  }

  const handleCloseDetails = () => {
    setIsHovered(false)
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col relative overflow-hidden pt-20 pb-20">
      {/* Background simplifié */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-900" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Orbes subtils */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-xl text-primary font-medium neon-text">Bonjour, je suis</h2>
              <h1 className="text-4xl md:text-6xl font-bold neon-glow">Justin Maltese</h1>
              <h2 className="text-2xl md:text-3xl text-foreground/80">Développeur Full Stack</h2>
            </div>

            <p className="text-foreground/70 text-lg max-w-md">
              Je crée des applications web modernes, performantes et accessibles avec les dernières technologies.
            </p>

            <div className="flex space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="neon-button">
                  <a href="#projects">Voir mes projets</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" asChild className="neon-button-outline">
                  <a href="#contact">Me contacter</a>
                </Button>
              </motion.div>
            </div>

            <div className="flex space-x-4 pt-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button text-foreground/70 hover:text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button text-foreground/70 hover:text-primary"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button text-foreground/70 hover:text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div
              className={`relative w-full aspect-square max-w-xs md:max-w-md mx-auto px-4 ${isMobile ? "cursor-pointer" : "cursor-pointer"}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handlePhotoInteraction}
            >
              {/* Cercles rotatifs en arrière-plan */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              >
                <div className="absolute inset-0 rounded-full border border-primary/10 border-dashed"></div>
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-4 rounded-full"
              >
                <div className="absolute inset-0 rounded-full border border-cyan-400/10 border-dotted"></div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-8 rounded-full"
              >
                <div className="absolute inset-0 rounded-full border border-violet-400/10 border-dashed"></div>
              </motion.div>

              {/* Cercle extérieur avec anneau lumineux amélioré */}
              <div className="absolute inset-0 rounded-full">
                {/* Anneau lumineux principal */}
                <motion.div
                  animate={{
                    boxShadow: isHovered
                      ? "0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(139,92,246,0.3)"
                      : "0 0 20px rgba(139,92,246,0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                ></motion.div>

                {/* Anneau secondaire pour plus de profondeur */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0.5,
                    boxShadow: isHovered ? "0 0 20px rgba(34,211,238,0.4)" : "0 0 15px rgba(34,211,238,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-2 rounded-full border border-cyan-400/20"
                ></motion.div>

                {/* Cercle de fond avec dégradé optimisé */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-600/30 shadow-inner"></div>

                {/* Lignes décoratives repositionnées */}
                <div className="absolute inset-0 rounded-full">
                  {/* Points cardinaux avec dégradés */}
                  <motion.div
                    animate={{ height: isHovered ? "32px" : "24px", opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary to-transparent"
                  ></motion.div>
                  <motion.div
                    animate={{ height: isHovered ? "32px" : "24px", opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-t from-primary to-transparent"
                  ></motion.div>
                  <motion.div
                    animate={{ width: isHovered ? "32px" : "24px", opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-r from-primary to-transparent"
                  ></motion.div>
                  <motion.div
                    animate={{ width: isHovered ? "32px" : "24px", opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gradient-to-l from-primary to-transparent"
                  ></motion.div>
                </div>
              </div>

              {/* Image circulaire avec effets optimisés */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.05 : 1,
                  boxShadow: isHovered ? "0 0 40px rgba(0,0,0,0.7)" : "0 0 25px rgba(0,0,0,0.5)",
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-8 rounded-full overflow-hidden border-2 border-slate-600/40"
              >
                <img src="/JustinMaltese.png" alt="Justin Maltese" className="w-full h-full object-cover scale-110" />

                {/* Overlay optimisé pour mettre en valeur la photo */}
                <motion.div
                  animate={{ opacity: isHovered ? 0.3 : 0.1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-cyan-400/5 mix-blend-soft-light"
                ></motion.div>

                {/* Vignette subtile pour créer de la profondeur */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-900/20"></div>

                {/* Highlight sur le côté gauche pour simuler un éclairage */}
                <motion.div
                  animate={{ opacity: isHovered ? 0.1 : 0.05 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-transparent"
                ></motion.div>

                {/* Effet de scan au hover/click */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovered ? "100%" : "-100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-1/3"
                ></motion.div>
              </motion.div>

              {/* Badges de compétences qui apparaissent au hover/click - REPOSITIONNÉS POUR MOBILE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-slate-800/90 border border-primary/30 rounded-lg px-2 py-1 md:px-3 md:py-2 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                  <Code className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-primary font-medium">Full Stack</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-slate-800/90 border border-cyan-400/30 rounded-lg px-2 py-1 md:px-3 md:py-2 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                  <Zap className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-medium">3 ans</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="absolute -top-2 -left-2 md:-top-4 md:-left-4 bg-slate-800/90 border border-violet-400/30 rounded-lg px-2 py-1 md:px-3 md:py-2 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-violet-400" />
                  <span className="text-violet-400 font-medium">Expert</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-slate-800/90 border border-blue-400/30 rounded-lg px-2 py-1 md:px-3 md:py-2 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">Bac + 5</span>
                </div>
              </motion.div>

              {/* Éléments décoratifs repositionnés et améliorés */}
              <div className="absolute inset-0 rounded-full pointer-events-none">
                {/* Cercles décoratifs avec animation */}
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.5, 1] : [1, 1.2, 1],
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute top-1/4 right-2 w-3 h-3 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                ></motion.div>
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                    opacity: isHovered ? 1 : 0.7,
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 left-2 w-2 h-2 rounded-full bg-cyan-400/70 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                ></motion.div>

                {/* Arcs décoratifs avec meilleur contraste */}
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-full border-t-2 border-l-2 border-transparent border-r-primary/30 border-b-cyan-400/30 transform rotate-45"
                ></motion.div>
                <motion.div
                  animate={{ opacity: isHovered ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-4 rounded-full border-b-2 border-r-2 border-transparent border-l-violet-400/20 border-t-blue-400/20 transform -rotate-45"
                ></motion.div>
              </div>

              {/* Effet de lueur externe */}
              <motion.div
                animate={{
                  opacity: isHovered ? 0.3 : 0.1,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full bg-gradient-radial from-transparent via-transparent to-primary/5 blur-sm"
              ></motion.div>

              {/* Particules qui apparaissent au hover/click */}
              {isHovered && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                  ></motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="absolute top-2/3 right-1/3 w-1 h-1 bg-violet-400 rounded-full animate-ping"
                  ></motion.div>
                </>
              )}

              {/* Indicateur de statut - REPOSITIONNÉ POUR MOBILE */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 md:-translate-y-8 bg-slate-800/90 border border-green-400/30 rounded-full px-3 py-1 md:px-4 md:py-2 backdrop-blur-sm"
              >
                <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Disponible</span>
                </div>
              </motion.div>

              {/* Bouton de fermeture des détails - NOUVEAU */}
              {isHovered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={handleCloseDetails}
                  className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-8 h-8 bg-slate-800/90 border border-red-400/50 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/20 hover:border-red-400 transition-all duration-200 z-50"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}

              {/* Indicateur de tap pour mobile - REPOSITIONNÉ SOUS LA PHOTO */}
              {isMobile && !isHovered && (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-slate-800/90 border border-primary/30 rounded-full px-3 py-1 backdrop-blur-sm"
                >
                  <span className="text-xs text-primary font-medium">Tap pour plus d'infos</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bouton "Découvrir mon profil" - SÉPARÉ ET CENTRÉ EN BAS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="flex justify-center pb-8"
      >
        <a href="#about" className="flex flex-col items-center text-foreground/50 hover:text-primary transition-colors">
          <span className="text-sm mb-2">Découvrir mon profil</span>
          <ArrowDown className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
