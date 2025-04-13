"use client"

import { Button } from "@/components/ui/button"
import { Play, Coffee, Moon } from "lucide-react"

interface ActionButtonsProps {
  handleCodeSession: () => void
  handleBreak: () => void
  handleSleep: () => void
  isAnimating: boolean
}

export default function ActionButtons({
  handleCodeSession,
  handleBreak,
  handleSleep,
  isAnimating,
}: ActionButtonsProps) {
  return (
    <div className="flex space-x-4 mb-2 justify-center mt-6">
      <Button
        onClick={handleCodeSession}
        disabled={isAnimating}
        className="transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        variant="default"
      >
        <Play size={16} className="mr-1" /> Code
      </Button>
      <Button
        onClick={handleBreak}
        disabled={isAnimating}
        className="transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        variant="secondary"
      >
        <Coffee size={16} className="mr-1" /> Break
      </Button>
      <Button
        onClick={handleSleep}
        disabled={isAnimating}
        className="transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        variant="outline"
      >
        <Moon size={16} className="mr-1" /> Sleep
      </Button>
    </div>
  )
}
