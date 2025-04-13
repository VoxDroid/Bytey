"use client"

import { usePetStore } from "@/lib/pet-store"
import { Trophy, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function AchievementsPanel() {
  const { achievements } = usePetStore()

  // Calculate completion percentage
  const completedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

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
          <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
          Achievements
        </h3>
        <span className="text-sm">
          {completedCount}/{totalCount} completed
        </span>
      </div>

      <div className="space-y-1">
        <Progress value={completionPercentage} className="h-2" />
        <div className="text-xs text-right text-muted-foreground">{completionPercentage}% complete</div>
      </div>

      <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            variants={item}
            className={`p-3 rounded-lg flex items-center ${achievement.unlocked ? "bg-primary/20" : "bg-muted/20"}`}
            whileHover={{ scale: 1.02 }}
          >
            <div className={`mr-3 rounded-full p-2 ${achievement.unlocked ? "bg-primary/30" : "bg-muted/30"}`}>
              {achievement.unlocked ? (
                <Trophy size={16} className="text-yellow-500" />
              ) : (
                <Lock size={16} className="text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="font-medium">{achievement.name}</div>
              <div className="text-xs text-muted-foreground">{achievement.desc}</div>
            </div>

            {achievement.unlocked && (
              <motion.div
                className="ml-auto bg-primary/30 text-xs px-2 py-1 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                Unlocked
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
