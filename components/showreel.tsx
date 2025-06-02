"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

export default function Showreel() {
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
    <section id="showreel" className="py-20 bg-slate-900/30 relative">
      {/* Neon accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl font-bold mb-4 neon-glow"
          >
            Chat IA
          </motion.h2>

          {/* Animated underline */}
          <div className="flex justify-center">
            <svg width="80" height="4" viewBox="0 0 80 4">
              <motion.path
                d="M 0 2 Q 40 0 80 2"
                stroke="rgb(139, 92, 246)"
                strokeWidth="2"
                fill="none"
                variants={drawLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-foreground/70 mt-4"
          >
            Découvrez l'intégration d'intelligence artificielle dans mes projets
          </motion.p>
        </motion.div>

        <ChatDemo />
      </div>
    </section>
  )
}

function ChatDemo() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis un assistant IA. Comment puis-je vous aider aujourd'hui ?" },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const responses = [
      "C'est une excellente question ! En tant que démo, je peux vous dire que Justin maîtrise parfaitement l'intégration d'IA dans ses applications.",
      "Intéressant ! Justin utilise les dernières technologies comme React, Next.js et TypeScript pour créer des interfaces modernes.",
      "Absolument ! L'expérience utilisateur est au cœur de chaque projet de Justin. Il privilégie toujours la simplicité et l'efficacité.",
      "Parfait ! Justin peut vous aider à concrétiser vos idées avec des solutions techniques innovantes et performantes.",
      "Excellente remarque ! Justin a une expertise particulière dans l'intégration d'APIs d'IA comme OpenAI, Claude ou Gemini.",
      "Tout à fait ! Justin développe des chatbots intelligents et des interfaces conversationnelles pour améliorer l'expérience utilisateur.",
      "Bonne question ! Justin maîtrise l'architecture full-stack nécessaire pour déployer des solutions IA robustes et scalables.",
      "Précisément ! Justin combine design moderne et intelligence artificielle pour créer des applications vraiment innovantes.",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    const newMessages = [...messages, { role: "user", content: input }, { role: "assistant", content: randomResponse }]

    setMessages(newMessages)
    setInput("")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 max-w-3xl mx-auto neon-card"
    >
      <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-3 max-w-md ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "user"
                    ? "bg-primary/20 border border-primary/30"
                    : "bg-cyan-500/20 border border-cyan-500/30"
                }`}
              >
                {message.role === "user" ? (
                  <User size={18} className="text-primary" />
                ) : (
                  <Bot size={18} className="text-cyan-400" />
                )}
              </div>
              <div
                className={`p-4 rounded-lg shadow-sm ${
                  message.role === "user"
                    ? "bg-primary/20 text-primary-foreground border border-primary/30"
                    : "bg-slate-700/50 border border-slate-600/50"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-3 items-end">
        <div className="flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez-moi une question sur Justin ou ses compétences..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="bg-slate-700/50 border-slate-600 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleSend} className="neon-button px-4 py-2" disabled={!input.trim()}>
            <Send size={18} />
          </Button>
        </motion.div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-foreground/50">
          💡 Essayez de me demander des informations sur les compétences de Justin, ses projets ou ses technologies
          préférées
        </p>
      </div>
    </motion.div>
  )
}
