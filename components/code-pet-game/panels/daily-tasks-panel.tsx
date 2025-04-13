"use client"

import { usePetStore } from "@/lib/pet-store"
import { Calendar, CheckCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Code, Coffee, Moon, Gamepad2, Brain, Package } from "lucide-react"

export default function DailyTasksPanel() {
  const { dailyTasksCompleted, lastLogin } = usePetStore()

  const dailyTasks = [
    { id: "code", name: "Code Session", description: "Complete a coding session", reward: 15, icon: "💻" },
    { id: "break", name: "Take a Break", description: "Give your pet a break", reward: 10, icon: "☕" },
    { id: "sleep", name: "Full Rest", description: "Let your pet sleep", reward: 10, icon: "😴" },
    { id: "play", name: "Playtime", description: "Play with your pet", reward: 15, icon: "🎮" },
    { id: "train", name: "Training", description: "Train your pet's intelligence", reward: 20, icon: "🧠" },
    { id: "item", name: "Use an Item", description: "Use any item from your inventory", reward: 10, icon: "📦" },
  ]

  // Calculate completion percentage
  const completedCount = dailyTasksCompleted.length
  const totalCount = dailyTasks.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)

  // Format the last login date
  const formatDate = (dateString) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
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
          <Calendar className="w-4 h-4 mr-2" />
          Daily Tasks
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          <span>Last login: {formatDate(lastLogin)}</span>
        </div>
      </div>

      <div className="space-y-1">
        <Progress value={completionPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            {completedCount}/{totalCount} completed
          </span>
          <span>{completionPercentage}% complete</span>
        </div>
      </div>

      <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
        {dailyTasks.map((task) => {
          const isCompleted = dailyTasksCompleted.includes(task.id)

          return (
            <motion.div
              key={task.id}
              variants={item}
              className={`p-3 rounded-lg flex items-center ${isCompleted ? "bg-primary/20" : "bg-muted/20"}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mr-3 bg-background/20 p-2 rounded-full">
                {task.id === "code" && <Code className="h-5 w-5" />}
                {task.id === "break" && <Coffee className="h-5 w-5" />}
                {task.id === "sleep" && <Moon className="h-5 w-5" />}
                {task.id === "play" && <Gamepad2 className="h-5 w-5" />}
                {task.id === "train" && <Brain className="h-5 w-5" />}
                {task.id === "item" && <Package className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="font-medium">{task.name}</div>
                <div className="text-xs text-muted-foreground">{task.description}</div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-sm bg-background/30 px-2 py-1 rounded-full">+{task.reward} 💰</div>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/50"></div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {completedCount === totalCount && (
        <div className="bg-green-500/20 p-3 rounded-lg text-center">
          <p className="font-medium">All tasks completed! 🎉</p>
          <p className="text-sm">Come back tomorrow for more rewards!</p>
        </div>
      )}
    </div>
  )
}
