"use client"

import { usePetStore } from "@/lib/pet-store"
import { Award, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function TrophiesPanel() {
  const { trophies } = usePetStore()

  // Calculate completion percentage
  const unlockedCount = trophies.filter((t) => t.unlocked).length
  const totalCount = trophies.length
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

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

  // Get color based on rarity
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium flex items-center text-white">
          <Award className="w-4 h-4 mr-2 text-yellow-500" />
          Trophies Collection
        </h3>
        <span className="text-sm text-white">
          {unlockedCount}/{totalCount} unlocked
        </span>
      </div>

      <div className="space-y-1">
        <Progress value={completionPercentage} className="h-2" />
        <div className="text-xs text-right text-white">{completionPercentage}% complete</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {trophies.map((trophy) => (
          <motion.div
            key={trophy.id}
            variants={item}
            className={`p-3 rounded-lg flex items-center ${
              trophy.unlocked ? "bg-primary/20 border border-primary/30" : "bg-muted/20 border border-muted/30"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`mr-3 rounded-full p-2 ${trophy.unlocked ? getRarityColor(trophy.rarity) : "bg-muted/30"}`}>
              {trophy.unlocked ? (
                <span className="text-xl">{trophy.image}</span>
              ) : (
                <Lock size={16} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-white">{trophy.name}</div>
              <div className="text-xs text-white/70">{trophy.description}</div>
              <div className="text-xs mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full ${
                    trophy.unlocked ? getRarityColor(trophy.rarity) + " text-white" : "bg-muted/20 text-white/50"
                  }`}
                >
                  {trophy.rarity.charAt(0).toUpperCase() + trophy.rarity.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
