"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function WelcomeModal() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Open after a short delay on mount
  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(timer)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/60 p-8 flex flex-col items-center text-center gap-5"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-foreground/40 hover:text-foreground hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Waving hand */}
            <motion.span
              className="text-5xl select-none"
              animate={{ rotate: [0, 20, -10, 20, -5, 0] }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
            >
              👋
            </motion.span>

            {/* Text content */}
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {t.welcome.greeting}{" "}
                <span className="text-primary">{t.welcome.name}</span>
              </p>
              <p className="text-sm font-medium text-foreground/50 tracking-wide uppercase">
                {t.welcome.role}
              </p>
            </div>

            <p className="text-sm text-foreground/70 leading-relaxed">
              {t.welcome.body}
            </p>

            <div className="w-full bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-3 text-sm text-foreground/60 text-left">
              {t.welcome.chatbotHint}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOpen(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl transition-colors shadow-lg shadow-primary/20"
            >
              {t.welcome.cta}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
