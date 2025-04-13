"use client"

import { Code, Zap, Wand, Orbit } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PetVisualProps {
  mood: string
  level: number
  petForm: string
  isAnimating: boolean
  bounceEffect: boolean
  customizations: {
    color: string
    accessory: string
    background: string
  }
  animationType?: string
  maxSize?: number
}

export default function PetVisual({
  mood,
  level,
  petForm,
  isAnimating,
  bounceEffect,
  customizations,
  animationType,
  maxSize = 200,
}: PetVisualProps) {
  // Pet appearance changes based on level, mood, and form
  const getPetSize = () => {
    // Calculate base size with level scaling
    const baseSize = 120 + level * 5
    // Apply maximum size limit
    const limitedSize = Math.min(baseSize, maxSize)

    return {
      width: limitedSize,
      height: limitedSize,
    }
  }

  const getPetColor = () => {
    // Use custom color if set, otherwise use mood-based colors
    if (customizations.color && customizations.color !== "default") {
      return customizations.color
    }

    // Black and white theme
    const colors = {
      happy: "rgba(255, 255, 255, 0.9)",
      neutral: "rgba(255, 255, 255, 0.7)",
      tired: "rgba(255, 255, 255, 0.5)",
      excited: "rgba(255, 255, 255, 1)",
      curious: "rgba(255, 255, 255, 0.85)",
      playful: "rgba(255, 255, 255, 0.95)",
      sleepy: "rgba(255, 255, 255, 0.6)",
    }
    return colors[mood] || colors.happy
  }

  // Pet form rendering
  const renderPetForm = () => {
    switch (petForm) {
      case "fox":
        return (
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                style={{
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderBottom: `40px solid ${getPetColor()}`,
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  transform: "rotate(-30deg)",
                }}
              ></div>
              <div
                style={{
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderBottom: `40px solid ${getPetColor()}`,
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  transform: "rotate(30deg)",
                }}
              ></div>
            </div>
            <Code size={48} className="text-background" />
          </div>
        )
      case "robot":
        return (
          <div className="flex flex-col items-center">
            <div
              style={{
                width: "30px",
                height: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                position: "absolute",
                top: "-10px",
                borderRadius: "5px",
              }}
            ></div>
            <div className="flex">
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              ></div>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
            <Code size={48} className="text-background" />
          </div>
        )
      case "dragon":
        return (
          <div className="flex flex-col items-center">
            <div
              style={{
                borderLeft: "30px solid transparent",
                borderRight: "30px solid transparent",
                borderBottom: "40px solid rgba(255, 255, 255, 0.8)",
                position: "absolute",
                top: "-25px",
              }}
            ></div>
            <div className="flex">
              <div
                style={{
                  width: "20px",
                  height: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  position: "absolute",
                  left: "-25px",
                  top: "20px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "5px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  position: "absolute",
                  right: "-25px",
                  top: "20px",
                }}
              ></div>
            </div>
            <Zap size={48} className="text-background" />
          </div>
        )
      case "wizard":
        return (
          <div className="flex flex-col items-center">
            <div
              style={{
                borderLeft: "30px solid transparent",
                borderRight: "30px solid transparent",
                borderBottom: "40px solid rgba(255, 255, 255, 0.8)",
                position: "absolute",
                top: "-30px",
                transform: "rotate(5deg)",
              }}
            ></div>
            <div
              style={{
                width: "10px",
                height: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                position: "absolute",
                right: "-15px",
                top: "10px",
                transform: "rotate(45deg)",
              }}
            ></div>
            <Wand size={48} className="text-background" />
          </div>
        )
      case "alien":
        return (
          <div className="flex flex-col items-center">
            <div className="flex">
              <div
                style={{
                  width: "15px",
                  height: "25px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  position: "absolute",
                  left: "-20px",
                  top: "-20px",
                  borderRadius: "50% 50% 0 0",
                }}
              ></div>
              <div
                style={{
                  width: "15px",
                  height: "25px",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  position: "absolute",
                  right: "-20px",
                  top: "-20px",
                  borderRadius: "50% 50% 0 0",
                }}
              ></div>
            </div>
            <Orbit size={48} className="text-background" />
          </div>
        )
      default: // blob
        return <Code size={48} className="text-background" />
    }
  }

  // Render pet accessory if any
  const renderAccessory = () => {
    if (!customizations.accessory || customizations.accessory === "none") return null

    switch (customizations.accessory) {
      case "hat":
        return (
          <div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            style={{
              borderLeft: "15px solid transparent",
              borderRight: "15px solid transparent",
              borderBottom: "20px solid rgba(255, 255, 255, 0.9)",
              width: 0,
              height: 0,
            }}
          ></div>
        )
      case "glasses":
        return (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex">
            <div className="w-10 h-5 border-2 border-background rounded-full mr-1"></div>
            <div className="w-10 h-5 border-2 border-background rounded-full"></div>
          </div>
        )
      case "bowtie":
        return (
          <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-6 bg-background rounded-md"></div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className={cn(
        "relative p-4 flex items-center justify-center rounded-full transition-colors duration-500 cursor-pointer",
      )}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        width: getPetSize().width,
        height: getPetSize().height,
        boxShadow: `0 0 ${level * 5}px rgba(255, 255, 255, 0.3)`,
      }}
      animate={
        isAnimating
          ? {
              scale: [1, 1.05, 1],
              rotate: animationType === "spin" ? [0, 10, 0, -10, 0] : 0,
              y: animationType === "bounce" ? [0, -10, 0] : 0,
            }
          : bounceEffect
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
      }
      transition={{
        duration: animationType === "spin" ? 0.8 : 0.5,
        repeat: bounceEffect && !isAnimating ? Number.POSITIVE_INFINITY : isAnimating ? 2 : 0,
        repeatType: "reverse",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {renderPetForm()}
      {renderAccessory()}

      {/* Expression that changes with mood */}
      <div className="absolute bottom-4 flex">
        {mood === "happy" && <span className="text-2xl text-white">^ᴗ^</span>}
        {mood === "neutral" && <span className="text-2xl text-white">⊙ᴗ⊙</span>}
        {mood === "tired" && <span className="text-2xl text-white">-ᴗ-</span>}
        {mood === "excited" && <span className="text-2xl text-white">★ᴗ★</span>}
        {mood === "curious" && <span className="text-2xl text-white">⊙ᴗ⊙?</span>}
        {mood === "playful" && <span className="text-2xl text-white">^ᴗ~</span>}
        {mood === "sleepy" && <span className="text-2xl text-white">⊙ᴗ⊙zzz</span>}
      </div>

      {/* Level indicator */}
      <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md">
        {level}
      </div>

      {/* Mood indicator */}
      <motion.div
        className="absolute -top-2 -left-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md bg-white text-black"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {mood === "happy" && "H"}
        {mood === "neutral" && "N"}
        {mood === "tired" && "T"}
        {mood === "excited" && "E"}
        {mood === "curious" && "C"}
        {mood === "playful" && "P"}
        {mood === "sleepy" && "S"}
      </motion.div>
    </motion.div>
  )
}
