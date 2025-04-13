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
  // Format numbers to show hundredths
  const formatNumber = (num: number) => {
    return num.toFixed(2)
  }

  return (
    <div className="w-full mb-4 space-y-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium">
          <Battery size={14} className="mr-1 text-amber-500" /> Energy
        </span>
        <span className="font-medium">{formatNumber(energy)}/100.00</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden border border-muted">
        <motion.div
          className="bg-amber-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${energy}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium">
          <Heart size={14} className="mr-1 text-red-500" /> Health
        </span>
        <span className="font-medium">{formatNumber(health)}/100.00</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden border border-muted">
        <motion.div
          className="bg-red-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${health}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium">
          <Smile size={14} className="mr-1 text-green-500" /> Happiness
        </span>
        <span className="font-medium">{formatNumber(happiness)}/100.00</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden border border-muted">
        <motion.div
          className="bg-green-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${happiness}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span className="flex items-center font-medium">
          <Brain size={14} className="mr-1 text-blue-500" /> Intelligence
        </span>
        <span className="font-medium">{formatNumber(intelligence)}/100.00</span>
      </div>
      <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden border border-muted">
        <motion.div
          className="bg-blue-500 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${intelligence}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  )
}
