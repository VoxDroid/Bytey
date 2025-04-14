"use client"

import { Clock, Award, Zap, Heart, Brain, Shield, BarChart, Bot } from "lucide-react"
import { usePetStore } from "@/lib/pet-store"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export default function StatsPanel() {
  const { streak, level, exp, skills, health, energy, happiness, intelligence } = usePetStore()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-4 w-full h-full">
      <motion.div variants={item} className="grid grid-cols-2 gap-4">
        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
          <div className="flex items-center mb-2">
            <Award className="w-4 h-4 mr-2 text-primary" />
            <h3 className="font-medium">Level Progress</h3>
          </div>
          <div className="text-2xl font-bold">{level}</div>
          <div className="text-xs">
            {exp}/{level * 20 + Math.floor(level * level * 1.5)} XP to next level
          </div>
        </div>

        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <h3 className="font-medium">Coding Streak</h3>
          </div>
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-xs">days in a row</div>
        </div>
      </motion.div>

      <motion.div variants={item} className="space-y-3 flex-1">
        <h3 className="font-medium">Pet Stats</h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              <span>Health</span>
            </div>
            <span>{health}/100</span>
          </div>
          <Progress value={health} className="h-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-amber-500" />
              <span>Energy</span>
            </div>
            <span>{energy}/100</span>
          </div>
          <Progress value={energy} className="h-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-2 text-green-500" />
              <span>Happiness</span>
            </div>
            <span>{happiness}/100</span>
          </div>
          <Progress value={happiness} className="h-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="w-4 h-4 mr-2 text-blue-500" />
              <span>Intelligence</span>
            </div>
            <span>{intelligence}/100</span>
          </div>
          <Progress value={intelligence} className="h-2" />
        </div>
      </motion.div>

      {/* Skills section */}
      <motion.div variants={item} className="space-y-3">
        <h3 className="font-medium">Skills</h3>
        <div className="grid grid-cols-1 gap-2">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className={`flex items-center justify-between p-2 rounded-lg ${
                skill.unlocked ? "bg-primary/20" : "bg-muted/20"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {skill.icon === "Shield" && <Shield className="h-4 w-4" />}
                  {skill.icon === "Zap" && <Zap className="h-4 w-4" />}
                  {skill.icon === "BarChart" && <BarChart className="h-4 w-4" />}
                  {skill.icon === "Bot" && <Bot className="h-4 w-4" />}
                  {skill.icon === "Clock" && <Clock className="h-4 w-4" />}
                </span>
                <span>{skill.name}</span>
              </div>
              {skill.unlocked ? (
                <span className="text-green-500 text-xs">Unlocked</span>
              ) : (
                <span className="text-muted-foreground text-xs">Lv. {skill.level}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
