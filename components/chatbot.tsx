"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  id: string
  title: string
  description: string
  link: string
  technologies: string[]
  category: string
  comingSoon?: boolean
}

// Extra keyword aliases → normalized tokens (language-agnostic)
const KEYWORD_ALIASES: { tokens: string[]; keywords: string[] }[] = [
  { tokens: ["mobile", "app"], keywords: ["mobile", "app", "application", "ios", "android"] },
  { tokens: ["ia", "ai"], keywords: ["ia", "ai", "intelligence artificielle", "artificial intelligence", "inteligencia artificial", "intelligenza artificiale", "gpt", "openai"] },
  { tokens: ["web", "website"], keywords: ["web", "website", "site"] },
  { tokens: ["gestion", "management"], keywords: ["gestion", "management", "gestión", "gestione", "comptabilité", "accounting"] },
  { tokens: ["facture", "invoice"], keywords: ["facture", "invoice", "factura", "fattura", "paiement", "payment", "pago", "pagamento"] },
  { tokens: ["famille", "genealogy"], keywords: ["famille", "family", "familia", "famiglia", "genealogie", "genealogy", "arbre", "ancêtre", "ancestor"] },
  { tokens: ["langue", "language"], keywords: ["langue", "language", "apprendre", "learn", "aprender", "imparare", "lexique", "dictionnaire"] },
  { tokens: ["backend"], keywords: ["backend", "api", "server", "serveur"] },
]

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function matchProjects(input: string, projects: Project[]): Project[] {
  // Split input into meaningful words (min 2 chars)
  const words = normalize(input).split(/\s+/).filter((w) => w.length >= 2)
  if (words.length === 0) return []

  return projects.filter((project) => {
    const searchable = [
      ...project.technologies,
      project.category,
      project.title,
    ].map(normalize)

    // 1. Any input word is a substring of any searchable field, or vice versa
    const directMatch = words.some((word) =>
      searchable.some((field) => field.includes(word) || word.includes(field))
    )
    if (directMatch) return true

    // 2. Alias-based matching
    const fullInput = words.join(" ")
    for (const alias of KEYWORD_ALIASES) {
      const inputMatches = alias.keywords.some((kw) => fullInput.includes(normalize(kw)))
      if (!inputMatches) continue
      const projectRelates = alias.tokens.some((token) =>
        searchable.some((field) => field.includes(token))
      )
      if (projectRelates) return true
    }

    return false
  })
}

interface Message {
  from: "bot" | "user"
  text?: string
  projects?: Project[]
}

interface ChatbotProps {
  projects: Project[]
}

export default function Chatbot({ projects }: ChatbotProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [pulse, setPulse] = useState(true)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Init conversation when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { from: "bot", text: t.chatbot.greeting },
        { from: "bot", text: t.chatbot.question },
      ])
    }
  }, [open])

  // Re-init messages on language change
  useEffect(() => {
    if (messages.length > 0) {
      setMessages([
        { from: "bot", text: t.chatbot.greeting },
        { from: "bot", text: t.chatbot.question },
      ])
    }
  }, [t])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Stop pulsing after 6s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000)
    return () => clearTimeout(t)
  }, [])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: Message = { from: "user", text: trimmed }
    const matched = matchProjects(trimmed, projects)

    const botReply: Message =
      matched.length > 0
        ? { from: "bot", text: t.chatbot.match, projects: matched }
        : { from: "bot", text: t.chatbot.noMatch }

    const followUp: Message = { from: "bot", text: t.chatbot.askAgain }

    setMessages((prev) => [...prev, userMsg, botReply, followUp])
    setInput("")
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && !bubbleDismissed && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="absolute bottom-16 right-0 flex items-start gap-1"
            >
              <div className="bg-slate-800 border border-slate-700/60 shadow-lg text-xs text-foreground/80 px-3 py-2 rounded-2xl rounded-br-sm max-w-[200px] leading-snug">
                {t.chatbot.bubble}
              </div>
              <button
                onClick={() => setBubbleDismissed(true)}
                className="mt-0.5 w-4 h-4 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-foreground/50 flex-shrink-0 transition-colors"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setOpen((o) => !o); setBubbleDismissed(true); setPulse(false) }}
          className="w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white relative"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
          {pulse && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30 pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-24px))] bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ maxHeight: "min(480px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/60 bg-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">
                🤖
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Assistant Portfolio</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  En ligne
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "bot" && (
                    <div className="space-y-2 max-w-[85%]">
                      {msg.text && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-800 border border-slate-700/50 text-foreground/90 px-3 py-2 rounded-2xl rounded-tl-sm"
                        >
                          {msg.text}
                        </motion.div>
                      )}
                      {msg.projects && msg.projects.map((p) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-primary/10 border border-primary/30 rounded-2xl rounded-tl-sm px-3 py-2 space-y-1"
                        >
                          <p className="font-semibold text-foreground">{p.title}</p>
                          <p className="text-xs text-foreground/60 line-clamp-2">{p.description}</p>
                          {!p.comingSoon && p.link && p.link !== "#" && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              {t.chatbot.viewProject}
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {msg.from === "user" && msg.text && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-primary text-white px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%]"
                    >
                      {msg.text}
                    </motion.div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="flex items-center gap-2 p-3 border-t border-slate-700/60 bg-slate-800/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.inputPlaceholder}
                className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-40 transition-opacity flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
