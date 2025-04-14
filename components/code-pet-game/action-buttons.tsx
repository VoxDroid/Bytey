"use client"

import { motion } from "framer-motion"
import { Play, Coffee, Moon, Gamepad2, Brain } from "lucide-react"

interface ActionButtonsProps {
  handleCodeSession: () => void
  handleBreak: () => void
  handleSleep: () => void
  handlePlay: () => void
  handleTrain: () => void
  isAnimating: boolean
}

export default function ActionButtons({
  handleCodeSession,
  handleBreak,
  handleSleep,
  handlePlay,
  handleTrain,
  isAnimating,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-5 gap-1 p-4 bg-black border-t border-white/10">
      <motion.button
        onClick={handleCodeSession}
        disabled={isAnimating}
        className="flex flex-col items-center justify-center py-3 px-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play size={20} className="text-white mb-1" />
        <span className="text-sm font-medium text-white">Code</span>
      </motion.button>

      <motion.button
        onClick={handleBreak}
        disabled={isAnimating}
        className="flex flex-col items-center justify-center py-3 px-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Coffee size={20} className="text-white mb-1" />
        <span className="text-sm font-medium text-white">Break</span>
      </motion.button>

      <motion.button
        onClick={handleSleep}
        disabled={isAnimating}
        className="flex flex-col items-center justify-center py-3 px-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Moon size={20} className="text-white mb-1" />
        <span className="text-sm font-medium text-white">Sleep</span>
      </motion.button>

      <motion.button
        onClick={handlePlay}
        disabled={isAnimating}
        className="flex flex-col items-center justify-center py-3 px-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Gamepad2 size={20} className="text-white mb-1" />
        <span className="text-sm font-medium text-white">Play</span>
      </motion.button>

      <motion.button
        onClick={handleTrain}
        disabled={isAnimating}
        className="flex flex-col items-center justify-center py-3 px-1 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Brain size={20} className="text-white mb-1" />
        <span className="text-sm font-medium text-white">Train</span>
      </motion.button>
    </div>
  )
}
