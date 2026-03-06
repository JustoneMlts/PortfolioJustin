import type { Metadata } from "next"
import HomeClient from "@/components/home-client"

export const metadata: Metadata = {
  title: "Justin Maltese | Développeur Full Stack",
  description:
    "Portfolio de Justin Maltese, développeur Full Stack passionné par la création d'applications web modernes et performantes.",
}

export default function Home() {
  return <HomeClient />
}
