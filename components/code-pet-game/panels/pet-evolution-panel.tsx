"use client"

import { usePetStore } from "@/lib/pet-store"
import { Sparkles, Lock, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Circle, Flame, Cpu, Zap, Wand, Orbit } from "lucide-react"

export default function PetEvolutionPanel() {
  const { level, petForm } = usePetStore()

  const evolutions = [
    { id: "blob", name: "Blob", description: "The basic form", level: 1, icon: "🔵" },
    { id: "fox", name: "Fox", description: "Quick and clever", level: 3, icon: "🦊" },
    { id: "robot", name: "Robot", description: "Logical and efficient", level: 6, icon: "🤖" },
    { id: "dragon", name: "Dragon", description: "Powerful and wise", level: 9, icon: "🐉" },
    { id: "wizard", name: "Wizard", description: "Magical and mysterious", level: 12, icon: "🧙" },
    { id: "alien", name: "Alien", description: "Out of this world", level: 15, icon: "👽" },
  ]

  // Find current evolution index
  const currentIndex = evolutions.findIndex((e) => e.id === petForm)
  const nextEvolution = evolutions[currentIndex + 1]

  // Calculate progress to next evolution
  const calculateProgress = () => {
    if (!nextEvolution) return 100

    const currentLevelRequirement = evolutions[currentIndex].level
    const nextLevelRequirement = nextEvolution.level
    const levelRange = nextLevelRequirement - currentLevelRequirement
    const currentProgress = level - currentLevelRequirement

    return Math.min(100, Math.round((currentProgress / levelRange) * 100))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
          Pet Evolution
        </h3>
        <span className="text-sm">Current Level: {level}</span>
      </div>

      {nextEvolution && (
        <div className="bg-primary/20 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="mr-2 bg-background/20 p-2 rounded-full">
                {evolutions[currentIndex].id === "blob" && <Circle className="h-5 w-5" />}
                {evolutions[currentIndex].id === "fox" && <Flame className="h-5 w-5" />}
                {evolutions[currentIndex].id === "robot" && <Cpu className="h-5 w-5" />}
                {evolutions[currentIndex].id === "dragon" && <Zap className="h-5 w-5" />}
                {evolutions[currentIndex].id === "wizard" && <Wand className="h-5 w-5" />}
                {evolutions[currentIndex].id === "alien" && <Orbit className="h-5 w-5" />}
              </div>
              <span className="font-medium">{evolutions[currentIndex].name}</span>
            </div>
            <ArrowRight className="mx-2" />
            <div className="flex items-center">
              <div className="mr-2 bg-background/20 p-2 rounded-full">
                {nextEvolution.id === "blob" && <Circle className="h-5 w-5" />}
                {nextEvolution.id === "fox" && <Flame className="h-5 w-5" />}
                {nextEvolution.id === "robot" && <Cpu className="h-5 w-5" />}
                {nextEvolution.id === "dragon" && <Zap className="h-5 w-5" />}
                {nextEvolution.id === "wizard" && <Wand className="h-5 w-5" />}
                {nextEvolution.id === "alien" && <Orbit className="h-5 w-5" />}
              </div>
              <span className="font-medium">{nextEvolution.name}</span>
            </div>
          </div>

          <div className="space-y-1">
            <Progress value={calculateProgress()} className="h-2" />
            <div className="flex justify-between text-xs">
              <span>Level {level}</span>
              <span>Level {nextEvolution.level} required</span>
            </div>
          </div>

          <p className="text-sm mt-3">{nextEvolution.description}</p>
        </div>
      )}

      <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
        {evolutions.map((evolution) => {
          const isUnlocked = level >= evolution.level
          const isCurrent = evolution.id === petForm

          return (
            <motion.div
              key={evolution.id}
              variants={item}
              className={`p-3 rounded-lg flex items-center ${
                isCurrent ? "bg-primary/20 border border-primary" : isUnlocked ? "bg-primary/10" : "bg-muted/20"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mr-2 bg-background/20 p-2 rounded-full">
                {evolution.id === "blob" && <Circle className="h-5 w-5" />}
                {evolution.id === "fox" && <Flame className="h-5 w-5" />}
                {evolution.id === "robot" && <Cpu className="h-5 w-5" />}
                {evolution.id === "dragon" && <Zap className="h-5 w-5" />}
                {evolution.id === "wizard" && <Wand className="h-5 w-5" />}
                {evolution.id === "alien" && <Orbit className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="font-medium">{evolution.name}</div>
                <div className="text-xs text-muted-foreground">{evolution.description}</div>
              </div>
              <div className="flex items-center">
                {isUnlocked ? (
                  <div className="text-sm bg-background/30 px-2 py-1 rounded-full">Level {evolution.level}</div>
                ) : (
                  <div className="flex items-center text-muted-foreground">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>Level {evolution.level}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
