"use client"

import { useState, useEffect } from "react"
import PetVisual from "./pet-visual"
import StatusBars from "./status-bars"
import ActionButtons from "./action-buttons"
import PetTabs from "./pet-tabs"
import StatsPanel from "./panels/stats-panel"
import InventoryPanel from "./panels/inventory-panel"
import AchievementsPanel from "./panels/achievements-panel"
import SettingsPanel from "./panels/settings-panel"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { Settings } from "lucide-react"
import { usePetStore } from "@/lib/pet-store"

export default function CodePet() {
  // UI states
  const [showStats, setShowStats] = useState(true)
  const [showInventory, setShowInventory] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [notification, setNotification] = useState(null)

  const { toast } = useToast()

  // Get pet state from global store
  const {
    petName,
    setPetName,
    level,
    setLevel,
    exp,
    setExp,
    streak,
    setStreak,
    mood,
    setMood,
    energy,
    setEnergy,
    health,
    setHealth,
    coins,
    setCoins,
    items,
    setItems,
    achievements,
    unlockAchievement,
    skills,
    updateSkills,
    petForm,
    setPetForm,
  } = usePetStore()

  // Time-based effects
  useEffect(() => {
    const timer = setInterval(() => {
      // Slowly decrease energy over time
      if (energy > 0) {
        setEnergy(Math.max(0, energy - 1))
      }

      // Update mood based on energy
      if (energy < 20 && mood !== "tired") {
        setMood("tired")
        showNotification("Your pet is getting tired!")
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(timer)
  }, [energy, mood, setEnergy, setMood])

  // Check for level-up skills
  useEffect(() => {
    updateSkills(level)

    // Unlock achievements
    if (level >= 10) {
      unlockAchievement(5)
    }

    if (streak >= 5) {
      unlockAchievement(2)
    }
  }, [level, streak, unlockAchievement, updateSkills])

  // Notification system
  const showNotification = (message) => {
    setNotification(message)
    toast({
      title: "CodePet",
      description: message,
      duration: 3000,
    })
    setTimeout(() => setNotification(null), 3000)
  }

  // Pet interactions
  const handleCodeSession = () => {
    setIsAnimating(true)

    // Random XP based on energy levels
    const baseXp = Math.floor(Math.random() * 10) + 5
    const energyBonus = Math.floor(energy / 20)
    const sessionXp = baseXp + energyBonus

    // Animation timing
    setTimeout(() => {
      const newExp = exp + sessionXp
      setExp(newExp)
      setStreak(streak + 1)
      setEnergy(Math.max(0, energy - 10)) // Coding uses energy
      setCoins(coins + Math.floor(Math.random() * 5) + 1)

      // Chance to find an item while coding
      if (Math.random() > 0.7) {
        const newItem = {
          id: items.length + 1,
          name: "Mystery Code",
          icon: "📦",
          count: 1,
          effect: "random",
          value: 10,
        }

        setItems([...items, newItem])
        showNotification("You found a Mystery Code box!")
      }

      // Level up logic
      if (newExp >= level * 20) {
        setLevel(level + 1)
        setExp(0)
        showNotification(`${petName} leveled up to level ${level + 1}!`)

        // Change form at certain levels
        if (level + 1 === 3) setPetForm("fox")
        if (level + 1 === 6) setPetForm("robot")
        if (level + 1 === 9) setPetForm("dragon")
      }

      // Update mood based on results
      if (energy < 30) {
        setMood("tired")
      } else {
        setMood("excited")
        setTimeout(() => setMood("happy"), 3000)
      }

      setIsAnimating(false)
    }, 1000)
  }

  const handleBreak = () => {
    setIsAnimating(true)

    setTimeout(() => {
      setMood("neutral")
      setEnergy(Math.min(100, energy + 15))
      showNotification(`${petName} is taking a relaxing break`)
      setIsAnimating(false)
    }, 800)
  }

  const handleSleep = () => {
    setIsAnimating(true)

    setTimeout(() => {
      setMood("tired")
      setEnergy(100)
      setHealth(Math.min(100, health + 10))
      showNotification(`${petName} is sleeping. Energy fully restored!`)
      setIsAnimating(false)
    }, 800)
  }

  const useItem = (itemId) => {
    const item = items.find((i) => i.id === itemId)

    if (item && item.count > 0) {
      // Apply item effect
      if (item.effect === "energy") {
        setEnergy(Math.min(100, energy + item.value))
        showNotification(`Energy increased by ${item.value}!`)
      } else if (item.effect === "health") {
        setHealth(Math.min(100, health + item.value))
        showNotification(`Health increased by ${item.value}!`)
      } else if (item.effect === "exp") {
        const newExp = exp + item.value
        setExp(newExp)
        showNotification(`Experience increased by ${item.value}!`)

        // Check for level up
        if (newExp >= level * 20) {
          setLevel(level + 1)
          setExp(0)
          showNotification(`${petName} leveled up to level ${level + 1}!`)
        }
      } else if (item.effect === "random") {
        // Random positive effect
        const effects = ["energy", "health", "exp", "coins"]
        const randomEffect = effects[Math.floor(Math.random() * effects.length)]
        const randomValue = Math.floor(Math.random() * 20) + 10

        if (randomEffect === "energy") {
          setEnergy(Math.min(100, energy + randomValue))
        } else if (randomEffect === "health") {
          setHealth(Math.min(100, health + randomValue))
        } else if (randomEffect === "exp") {
          setExp(exp + randomValue)
        } else if (randomEffect === "coins") {
          setCoins(coins + randomValue)
        }

        showNotification(`Mystery box gave you ${randomValue} ${randomEffect}!`)
      }

      // Update inventory
      const updatedItems = items
        .map((i) => {
          if (i.id === itemId) {
            return { ...i, count: i.count - 1 }
          }
          return i
        })
        .filter((i) => i.count > 0) // Remove items with zero count

      setItems(updatedItems)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center">
            <Trophy size={20} className="text-primary mr-1" />
            <span className="font-bold">Level {level}</span>
          </div>
          <h1 className="text-2xl font-bold">CodePet</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Pet name with edit option */}
        <div className="flex items-center mb-4 justify-center">
          <input
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="text-xl font-semibold text-center bg-transparent border-b border-input focus:outline-none focus:border-primary transition-colors duration-300 w-40"
          />
        </div>

        {/* Notification system */}
        {notification && (
          <div className="absolute top-2 left-0 right-0 mx-auto w-4/5 bg-background p-2 rounded-lg shadow-lg z-10 flex items-center justify-center animate-bounce border">
            <Trophy size={16} className="text-primary mr-2" />
            <span>{notification}</span>
          </div>
        )}

        {/* Status bars */}
        <StatusBars energy={energy} health={health} />

        {/* The pet visualization with animations */}
        <PetVisual
          mood={mood}
          level={level}
          petForm={petForm}
          isAnimating={isAnimating}
          bounceEffect={exp >= level * 15} // Bounce when close to level up
        />

        {/* Experience bar with animation */}
        <div className="w-full bg-muted rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-primary h-4 rounded-full transition-all duration-500 relative"
            style={{ width: `${(exp / (level * 20)) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Tabs navigation */}
        <PetTabs
          showStats={showStats}
          showInventory={showInventory}
          showAchievements={showAchievements}
          setShowStats={setShowStats}
          setShowInventory={setShowInventory}
          setShowAchievements={setShowAchievements}
        />

        {/* Panels */}
        {showStats && <StatsPanel />}
        {showInventory && <InventoryPanel useItem={useItem} />}
        {showAchievements && <AchievementsPanel />}
        {showSettings && <SettingsPanel />}

        {/* Action buttons with animations */}
        <ActionButtons
          handleCodeSession={handleCodeSession}
          handleBreak={handleBreak}
          handleSleep={handleSleep}
          isAnimating={isAnimating}
        />

        <p className="text-sm text-muted-foreground text-center mt-4">
          Keep coding regularly to help {petName} grow and evolve!
        </p>
      </CardContent>
    </Card>
  )
}
