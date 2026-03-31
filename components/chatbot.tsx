"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, ExternalLink, Trash2 } from "lucide-react"
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

// Tech families: unknown tech → related techs present in portfolio
const TECH_FAMILIES: { input: string[]; related: string[]; label: string }[] = [
  {
    input: ["angular", "vue", "svelte", "ember", "backbone", "jquery"],
    related: ["react", "next", "typescript"],
    label: "Angular / Vue",
  },
  {
    input: ["python", "django", "flask", "fastapi"],
    related: ["node", "express", "nestjs", "c#", "net"],
    label: "Python",
  },
  {
    input: ["java", "spring", "springboot", "kotlin"],
    related: ["node", "express", "nestjs", "c#", "net"],
    label: "Java",
  },
  {
    input: ["php", "laravel", "symfony"],
    related: ["node", "express", "c#", "net"],
    label: "PHP",
  },
  {
    input: ["flutter", "swift", "kotlin", "xamarin"],
    related: ["react native", "expo"],
    label: "Flutter / Swift",
  },
  {
    input: ["postgresql", "postgres", "sqlite", "oracle", "sql server", "mariadb"],
    related: ["mysql", "postgresql", "mongodb"],
    label: "SQL",
  },
]

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

function tokenize(str: string): string[] {
  return normalize(str).split(/[\s.\-/+]+/).filter((t) => t.length >= 1)
}

function matchProjects(input: string, projects: Project[]): Project[] {
  const inputTokens = tokenize(input)
  const inputFull = normalize(input)
  if (inputTokens.length === 0) return []

  return projects.filter((project) => {
    const fields = [...project.technologies, project.category, project.title]

    for (const field of fields) {
      const fieldFull = normalize(field)
      const fieldTokens = tokenize(field)

      if (fieldFull.includes(inputFull) || inputFull.includes(fieldFull)) return true

      for (const iToken of inputTokens) {
        for (const fToken of fieldTokens) {
          if (fToken.includes(iToken) || iToken.includes(fToken)) return true
        }
      }
    }

    for (const alias of KEYWORD_ALIASES) {
      const inputMatches = alias.keywords.some((kw) =>
        inputFull.includes(normalize(kw)) || inputTokens.some((t) => normalize(kw).includes(t))
      )
      if (!inputMatches) continue
      const projectRelates = alias.tokens.some((token) =>
        fields.some((f) => normalize(f).includes(token))
      )
      if (projectRelates) return true
    }

    return false
  })
}

function findFamilyMatch(input: string, projects: Project[]): { projects: Project[]; label: string } | null {
  const inputTokens = tokenize(input)
  const inputFull = normalize(input)

  for (const family of TECH_FAMILIES) {
    const matched = family.input.some((name) => {
      const n = normalize(name)
      return inputFull.includes(n) || n.includes(inputFull) ||
        inputTokens.some((t) => n.includes(t) || t.includes(n))
    })
    if (!matched) continue

    const relatedProjects = projects.filter((project) =>
      family.related.some((rel) =>
        project.technologies.some((tech) => {
          const t = normalize(tech)
          const r = normalize(rel)
          return t.includes(r) || r.includes(t) ||
            tokenize(tech).some((tt) => tokenize(rel).some((rt) => tt.includes(rt) || rt.includes(tt)))
        })
      )
    )

    if (relatedProjects.length > 0) return { projects: relatedProjects, label: family.label }
  }
  return null
}

function typingDelay(text?: string, isCard?: boolean): number {
  if (isCard) return 800
  const len = text?.length ?? 40
  return Math.min(3000, Math.max(1500, len * 16))
}

interface Message {
  from: "bot" | "user"
  text?: string
  projects?: Project[]
}

interface ChatbotProps {
  projects: Project[]
}

// Animated typing indicator
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex justify-start"
    >
      <div className="bg-slate-800 border border-slate-700/50 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-foreground/40 block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Chatbot({ projects }: ChatbotProps) {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [pulse, setPulse] = useState(true)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isBotBusy, setIsBotBusy] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const sendBotMessages = useCallback((queue: Message[]) => {
    clearTimeouts()
    setIsBotBusy(true)

    const process = (index: number) => {
      if (index >= queue.length) {
        setIsTyping(false)
        setIsBotBusy(false)
        return
      }

      const msg = queue[index]
      const delay = typingDelay(msg.text, !msg.text && !!msg.projects)

      setIsTyping(true)

      const t1 = setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [...prev, msg])

        const t2 = setTimeout(() => process(index + 1), 300)
        timeoutsRef.current.push(t2)
      }, delay)

      timeoutsRef.current.push(t1)
    }

    process(0)
  }, [])

  // Init conversation when opened
  useEffect(() => {
    if (open && messages.length === 0) {
      sendBotMessages([
        { from: "bot", text: t.chatbot.greeting },
        { from: "bot", text: t.chatbot.question },
      ])
    }
  }, [open])

  // Re-init on language change
  useEffect(() => {
    if (messages.length > 0) {
      clearTimeouts()
      setIsTyping(false)
      setIsBotBusy(false)
      setMessages([])
      sendBotMessages([
        { from: "bot", text: t.chatbot.greeting },
        { from: "bot", text: t.chatbot.question },
      ])
    }
  }, [t])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    const timer = setTimeout(() => setPulse(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => () => clearTimeouts(), [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const handleClear = () => {
    clearTimeouts()
    setIsTyping(false)
    setIsBotBusy(false)
    setMessages([])
    sendBotMessages([
      { from: "bot", text: t.chatbot.greeting },
      { from: "bot", text: t.chatbot.question },
    ])
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isBotBusy) return

    const userMsg: Message = { from: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    const matched = matchProjects(trimmed, projects)
    const botMessages: Message[] = []

    if (matched.length > 0) {
      botMessages.push({ from: "bot", text: t.chatbot.match })
      matched.forEach((p) => botMessages.push({ from: "bot", projects: [p] }))
    } else {
      const family = findFamilyMatch(trimmed, projects)
      if (family) {
        botMessages.push({ from: "bot", text: t.chatbot.familyMatch.replace("{tech}", family.label) })
        family.projects.forEach((p) => botMessages.push({ from: "bot", projects: [p] }))
      } else {
        botMessages.push({ from: "bot", text: t.chatbot.noMatch })
      }
    }

    botMessages.push({ from: "bot", text: t.chatbot.askAgain })
    sendBotMessages(botMessages)
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
              <div className="bg-slate-800 border border-slate-700/60 shadow-lg text-xs text-foreground/80 px-3 py-2 rounded-2xl rounded-br-sm whitespace-nowrap">
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
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-24px))] bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ maxHeight: "min(480px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/60 bg-slate-800/80">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm flex-shrink-0">
                🤖
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Assistant Portfolio</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  En ligne
                </p>
              </div>
              <button
                onClick={handleClear}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                title="Vider la conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-slate-700/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
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

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Scrolling suggestions */}
            <div className="border-t border-slate-700/60 bg-slate-800/40 overflow-hidden">
              <style>{`
                @keyframes suggestions-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .suggestions-track {
                  animation: suggestions-scroll 22s linear infinite;
                }
                .suggestions-track:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="py-2 flex">
                <div className="suggestions-track flex gap-2 px-3 w-max">
                  {[...t.chatbot.suggestions, ...t.chatbot.suggestions].map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (isBotBusy) return
                        setInput("")
                        const userMsg: Message = { from: "user", text: s }
                        setMessages((prev) => [...prev, userMsg])
                        const matched = matchProjects(s, projects)
                        const botMessages: Message[] = []
                        if (matched.length > 0) {
                          botMessages.push({ from: "bot", text: t.chatbot.match })
                          matched.forEach((p) => botMessages.push({ from: "bot", projects: [p] }))
                        } else {
                          const family = findFamilyMatch(s, projects)
                          if (family) {
                            botMessages.push({ from: "bot", text: t.chatbot.familyMatch.replace("{tech}", family.label) })
                            family.projects.forEach((p) => botMessages.push({ from: "bot", projects: [p] }))
                          } else {
                            botMessages.push({ from: "bot", text: t.chatbot.noMatch })
                          }
                        }
                        botMessages.push({ from: "bot", text: t.chatbot.askAgain })
                        sendBotMessages(botMessages)
                      }}
                      className="flex-shrink-0 text-xs bg-slate-700/60 hover:bg-primary/20 hover:border-primary/40 border border-slate-600/40 text-foreground/70 hover:text-foreground px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend() }}
              className="flex items-center gap-2 p-3 bg-slate-800/60"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isBotBusy ? "..." : t.chatbot.inputPlaceholder}
                disabled={isBotBusy}
                className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isBotBusy}
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
