"use client"

import { Settings, Trophy, Coins, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameHeaderProps {
  level: number
  coins: number
  streak: number
  petName: string
  onSettingsClick: () => void
}

export default function GameHeader({ level, coins, streak, petName, onSettingsClick }: GameHeaderProps) {
  // Remove the boxes from the header text and simplify the styling
  return (
    <div className="flex items-center justify-between w-full p-4 bg-black border-b border-white/10 z-10 h-[72px]">
      <div className="flex items-center">
        <Trophy size={20} className="text-white mr-2" />
        <div className="flex flex-col">
          <span className="font-bold text-white text-lg leading-tight">Lv.{level}</span>
          <span className="text-xs text-white/70 leading-tight">Rank: Novice</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-white">{petName}</h1>
        <div className="flex items-center text-xs font-medium text-white/70 mt-0.5">
          <Star size={12} className="text-white mr-1" />
          <span>{streak} day streak</span>
        </div>
      </div>

      <div className="flex items-center">
        <Coins size={20} className="text-white mr-2" />
        <span className="text-lg font-bold text-white">{coins}</span>
      </div>

      <Button
        onClick={onSettingsClick}
        className="bg-white/5 border border-white/10 hover:bg-white/10 text-white h-10 w-10 p-0 rounded-lg ml-3"
      >
        <Settings size={20} />
      </Button>
    </div>
  )
}
