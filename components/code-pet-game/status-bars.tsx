"use client"

import { motion } from "framer-motion"
import { Battery, Heart, Smile, Brain } from "lucide-react"

interface StatusBarsProps {
  energy: number
  health: number
  happiness: number
  intelligence: number
}

export default function StatusBars({ energy, health, happiness, intelligence }: StatusBarsProps) {
  // Format numbers to show exactly 2 decimal places
  const formatNumber = (num: number) => {
    return num.toFixed(2)
  }

  return (
    <div className="w-full mb-4 space-y-3 bg-black/40 p-4 rounded-lg border border-white/10">
      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium text-white">
          <Battery size={14} className="mr-1 text-white" /> Energy
        </span>
        <span className="font-medium text-white">{formatNumber(energy)}/100.00</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
        <motion.div
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${energy}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium text-white">
          <Heart size={14} className="mr-1 text-white" /> Health
        </span>
        <span className="font-medium text-white">{formatNumber(health)}/100.00</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
        <motion.div
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${health}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium text-white">
          <Smile size={14} className="mr-1 text-white" /> Happiness
        </span>
        <span className="font-medium text-white">{formatNumber(happiness)}/100.00</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
        <motion.div
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${happiness}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium text-white">
          <Brain size={14} className="mr-1 text-white" /> Intelligence
        </span>
        <span className="font-medium text-white">{formatNumber(intelligence)}/100.00</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
        <motion.div
          className="bg-white h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${intelligence}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
