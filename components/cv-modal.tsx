"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface CvModalProps {
  open: boolean
  onClose: () => void
}

export default function CvModal({ open, onClose }: CvModalProps) {
  // Fermer avec Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Bloquer le scroll quand la modal est ouverte
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-4xl h-[90vh] bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/50 bg-slate-800/60 flex-shrink-0">
              <span className="font-semibold text-foreground">
                Justin<span className="text-primary">Maltese</span>
                <span className="ml-2 text-foreground/60 font-normal text-sm">— Curriculum Vitæ</span>
              </span>

              <div className="flex items-center gap-2">
                <Button size="sm" className="neon-button gap-1.5" asChild>
                  <a href="/Justin_Maltese_Resume.pdf" download="Justin_Maltese_CV.pdf">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </a>
                </Button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-slate-700/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF viewer */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src="/Justin_Maltese_Resume.pdf"
                className="w-full h-full border-0"
                title="CV Justin Maltese"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
