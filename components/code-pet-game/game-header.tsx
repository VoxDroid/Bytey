"use client"

import { Settings, Trophy, Coins, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface GameHeaderProps {
  level: number
  coins: number
  streak: number
  petName: string
  onSettingsClick: () => void
}

export default function GameHeader({ level, coins, streak, petName, onSettingsClick }: GameHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-blue-900/80 to-purple-900/80 border-b border-white/30">
      <motion.div
        className="flex items-center bg-black/40 px-3 py-2 rounded-lg border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-600 w-8 h-8 rounded-full mr-2">
          <Trophy size={16} className="text-black" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-lg leading-tight">Lv.{level}</span>
          <span className="text-xs text-white/80 leading-tight">Rank: Novice</span>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center bg-black/40 px-4 py-2 rounded-lg border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <h1 className="text-xl font-bold text-white">{petName}</h1>
        <div className="flex items-center text-xs font-medium text-white/80 mt-0.5">
          <Star size={12} className="text-yellow-500 mr-1" />
          <span>{streak} day streak</span>
        </div>
      </motion.div>

      <div className="flex items-center space-x-3">
        <motion.div
          className="flex items-center bg-black/40 px-3 py-2 rounded-lg border border-white/20 hover:bg-black/60 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-amber-500 w-8 h-8 rounded-full mr-2">
            <Coins size={16} className="text-black" />
          </div>
          <span className="text-lg font-bold text-white">{coins}</span>
        </motion.div>

        <Button
          onClick={onSettingsClick}
          className="bg-black/40 border border-white/20 hover:bg-black/60 text-white h-10 w-10 p-0 rounded-lg"
        >
          <Settings size={20} />
        </Button>
      </div>
    </div>
  )
}
