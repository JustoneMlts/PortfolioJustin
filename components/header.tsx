"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import type { Lang } from "@/lib/translations"

const LANGS: Lang[] = ["fr", "en", "es", "it"]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, lang, setLang } = useLanguage()

  const navItems = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.skills, href: "#skills" },
    // { name: t.nav.aiChat, href: "#showreel" },
    { name: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold"
        >
          Justin<span className="text-primary">Maltese</span>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={item.href} className="text-foreground/80 hover:text-primary transition-colors">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Language selector */}
          <div className="flex items-center gap-1">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors uppercase ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="neon-button-outline">
              CV
            </Button>
          </motion.div>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile language selector */}
            <div className="flex items-center gap-2 pt-2">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs font-semibold px-2 py-1 rounded transition-colors uppercase ${
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full neon-button-outline">
                CV
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </header>
  )
}
