"use client"

import { useState, useEffect } from "react"
import { usePetStore } from "@/lib/pet-store"
import { useToast } from "@/hooks/use-toast"
import PetVisual from "./pet-visual"
import StatusBars from "./status-bars"
import ActionButtons from "./action-buttons"
import GameHeader from "./game-header"
import GameTabs from "./game-tabs"
import StatsPanel from "./panels/stats-panel"
import InventoryPanel from "./panels/inventory-panel"
import AchievementsPanel from "./panels/achievements-panel"
import SettingsPanel from "./panels/settings-panel"
import ShopPanel from "./panels/shop-panel"
import DailyTasksPanel from "./panels/daily-tasks-panel"
import PetEvolutionPanel from "./panels/pet-evolution-panel"
import TrophiesPanel from "./panels/trophies-panel"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Sparkles, Heart, Utensils, X, Coins, Maximize2, Minimize2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import CollectiblesPanel from "./panels/collectibles-panel"
import TradingPanel from "./panels/trading-panel"

export default function CodePetGame() {
  // UI states
  const [activeTab, setActiveTab] = useState("stats")
  const [showSettings, setShowSettings] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [notification, setNotification] = useState(null)
  const [showReward, setShowReward] = useState(false)
  const [rewardType, setRewardType] = useState("")
  const [rewardValue, setRewardValue] = useState(0)
  const [petInteractionMenu, setPetInteractionMenu] = useState(false)
  const [showFeedingAnimation, setShowFeedingAnimation] = useState(false)
  const [showSpendingAnimation, setShowSpendingAnimation] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

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
    happiness,
    setHappiness,
    intelligence,
    setIntelligence,
    lastLogin,
    setLastLogin,
    dailyTasksCompleted,
    setDailyTasksCompleted,
    completeDailyTask,
    resetDailyTasks,
    customizations,
    setCustomizations,
    applyCustomization,
    trophies,
    unlockTrophy,
  } = usePetStore()

  // Check for daily login and reset tasks if needed
  useEffect(() => {
    const now = new Date()
    const today = now.toDateString()

    if (lastLogin !== today) {
      // It's a new day, reset daily tasks
      resetDailyTasks()
      setLastLogin(today)

      // Give daily login reward
      const loginReward = 25 + streak * 5
      setCoins(coins + loginReward)
      showNotification(`Daily Login Reward: +${loginReward} coins!`)

      // Show reward animation
      setRewardType("coins")
      setRewardValue(loginReward)
      setShowReward(true)
      setTimeout(() => setShowReward(false), 3000)
    }
  }, [lastLogin, setLastLogin, resetDailyTasks, streak, setCoins, coins])

  // Time-based effects
  useEffect(() => {
    const timer = setInterval(() => {
      // Slowly decrease energy and happiness over time
      if (energy > 0) {
        setEnergy(Math.max(0, energy - 0.5))
      }

      if (happiness > 0) {
        setHappiness(Math.max(0, happiness - 0.3))
      }

      // Update mood based on energy and happiness
      updateMood()
    }, 30000) // Every 30 seconds

    return () => clearInterval(timer)
  }, [energy, happiness, setEnergy, setHappiness])

  // Update mood based on pet stats with more varied expressions
  const updateMood = () => {
    const randomExpression = Math.random()

    if (energy < 20 || happiness < 20) {
      if (mood !== "tired") {
        setMood("tired")
        showNotification("Your pet is getting tired or unhappy!")
      }
    } else if (energy > 80 && happiness > 80) {
      if (randomExpression > 0.7) {
        setMood("excited")
      } else {
        setMood("happy")
      }
    } else if (energy > 50 && happiness > 50) {
      if (randomExpression > 0.8) {
        setMood("curious")
      } else if (randomExpression > 0.6) {
        setMood("playful")
      } else {
        setMood("happy")
      }
    } else {
      if (randomExpression > 0.7) {
        setMood("sleepy")
      } else {
        setMood("neutral")
      }
    }
  }

  // Random idle animations
  useEffect(() => {
    if (!isAnimating) {
      const idleTimer = setInterval(() => {
        // 20% chance to trigger an idle animation
        if (Math.random() > 0.8) {
          setIsAnimating(true)

          // Random animation type
          const animationType = Math.random()
          if (animationType > 0.7) {
            // Bounce animation
            setTimeout(() => setIsAnimating(false), 1000)
          } else if (animationType > 0.4) {
            // Spin animation
            setTimeout(() => setIsAnimating(false), 800)
          } else {
            // Pulse animation
            setTimeout(() => setIsAnimating(false), 1200)
          }
        }
      }, 10000) // Every 10 seconds check for idle animation

      return () => clearInterval(idleTimer)
    }
  }, [isAnimating, setIsAnimating])

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
  const showNotification = (message, type = "info") => {
    setNotification({ message, type })
    toast({
      title: type === "error" ? "Error" : "CodePet",
      description: message,
      duration: 3000,
      variant: type === "error" ? "destructive" : type === "success" ? "default" : "default",
    })
    setTimeout(() => setNotification(null), 3000)
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Pet interactions
  const handleCodeSession = () => {
    if (energy < 10) {
      showNotification(`${petName} is too tired to code. Try resting first!`)
      return
    }

    setIsAnimating(true)

    // Random XP based on energy levels, intelligence and level
    const baseXp = Math.floor(Math.random() * 10) + 5
    const energyBonus = Math.floor(energy / 20)
    const intelligenceBonus = Math.floor(intelligence / 20)
    const levelBonus = Math.floor(level / 3)
    const sessionXp = baseXp + energyBonus + intelligenceBonus + levelBonus

    // Animation timing
    setTimeout(() => {
      const newExp = exp + sessionXp
      setExp(newExp)
      setStreak(streak + 1)
      setEnergy(Math.max(0, energy - 10)) // Coding uses energy
      setIntelligence(Math.min(100, intelligence + 2)) // Coding increases intelligence

      const coinReward = Math.floor(Math.random() * 5) + 1 + Math.floor(level / 2)
      setCoins(coins + coinReward)

      // Complete daily task if applicable
      if (!dailyTasksCompleted.includes("code")) {
        completeDailyTask("code")
        const taskBonus = 15
        setCoins(coins + coinReward + taskBonus)
        showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
      }

      // Chance to find an item while coding
      if (Math.random() > 0.7) {
        const possibleItems = [
          { name: "Mystery Code", effect: "random", value: 10 },
          { name: "Energy Drink", effect: "energy", value: 20 },
          { name: "Brain Boost", effect: "intelligence", value: 15 },
          { name: "Happy Sticker", effect: "happiness", value: 25 },
        ]

        const newItem = possibleItems[Math.floor(Math.random() * possibleItems.length)]

        // Add to existing item or create new
        const existingItemIndex = items.findIndex((i) => i.name === newItem.name)

        if (existingItemIndex >= 0) {
          const updatedItems = [...items]
          updatedItems[existingItemIndex].count += 1
          setItems(updatedItems)
        } else {
          setItems([
            ...items,
            {
              id: items.length + 1,
              name: newItem.name,
              icon: getIconForEffect(newItem.effect),
              count: 1,
              effect: newItem.effect,
              value: newItem.value,
            },
          ])
        }

        showNotification(`You found a ${newItem.name}!`)
      }

      // Level up logic with dynamic XP requirements
      const xpRequiredForNextLevel = level * 20 + Math.floor(level * level * 1.5)
      if (newExp >= xpRequiredForNextLevel) {
        const newLevel = level + 1
        setLevel(newLevel)
        setExp(0)
        showNotification(`${petName} leveled up to level ${newLevel}!`)

        // Change form at certain levels
        if (newLevel === 3) setPetForm("fox")
        if (newLevel === 6) setPetForm("robot")
        if (newLevel === 9) setPetForm("dragon")
        if (newLevel === 12) setPetForm("wizard")
        if (newLevel === 15) setPetForm("alien")

        // Level up reward with scaling
        const levelUpReward = newLevel * 10 + Math.floor(newLevel * 5)
        setCoins(coins + levelUpReward)

        // Stat bonuses on level up
        setHealth(Math.min(100, health + 10))
        setEnergy(Math.min(100, energy + 15))
        setIntelligence(Math.min(100, intelligence + 5))
        setHappiness(Math.min(100, happiness + 10))

        // Unlock trophy for leveling up
        if (newLevel === 5) unlockTrophy(1)
        if (newLevel === 10) unlockTrophy(2)
        if (newLevel === 15) unlockTrophy(3)

        // Show reward animation
        setRewardType("level")
        setRewardValue(newLevel)
        setShowReward(true)
        setTimeout(() => setShowReward(false), 3000)
      }

      // Update mood based on results
      updateMood()
      setIsAnimating(false)
    }, 1000)
  }

  const handleBreak = () => {
    setIsAnimating(true)

    setTimeout(() => {
      setMood("neutral")
      setEnergy(Math.min(100, energy + 15))
      setHappiness(Math.min(100, happiness + 10))
      showNotification(`${petName} is taking a relaxing break`)
      setIsAnimating(false)

      // Complete daily task if applicable
      if (!dailyTasksCompleted.includes("break")) {
        completeDailyTask("break")
        const taskBonus = 10
        setCoins(coins + taskBonus)
        showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
      }
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

      // Complete daily task if applicable
      if (!dailyTasksCompleted.includes("sleep")) {
        completeDailyTask("sleep")
        const taskBonus = 10
        setCoins(coins + taskBonus)
        showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
      }
    }, 800)
  }

  const handlePlay = () => {
    if (energy < 15) {
      showNotification(`${petName} is too tired to play. Try resting first!`)
      return
    }

    setIsAnimating(true)

    setTimeout(() => {
      setMood("excited")
      setEnergy(Math.max(0, energy - 15))
      setHappiness(Math.min(100, happiness + 25))
      showNotification(`${petName} had fun playing!`)
      setIsAnimating(false)

      // Complete daily task if applicable
      if (!dailyTasksCompleted.includes("play")) {
        completeDailyTask("play")
        const taskBonus = 15
        setCoins(coins + taskBonus)
        showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
      }
    }, 800)
  }

  const handleTrain = () => {
    if (energy < 20) {
      showNotification(`${petName} is too tired to train. Try resting first!`)
      return
    }

    setIsAnimating(true)

    setTimeout(() => {
      setMood("neutral")
      setEnergy(Math.max(0, energy - 20))
      setIntelligence(Math.min(100, intelligence + 15))
      showNotification(`${petName} learned new skills through training!`)
      setIsAnimating(false)

      // Complete daily task if applicable
      if (!dailyTasksCompleted.includes("train")) {
        completeDailyTask("train")
        const taskBonus = 20
        setCoins(coins + taskBonus)
        showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
      }
    }, 800)
  }

  // Pet direct interactions
  const handlePet = () => {
    setIsAnimating(true)
    setMood("happy")
    setHappiness(Math.min(100, happiness + 15))

    setTimeout(() => {
      showNotification(`${petName} feels loved!`)
      setIsAnimating(false)
    }, 800)
  }

  const handleFeed = () => {
    setIsAnimating(true)
    setShowFeedingAnimation(true)

    setTimeout(() => {
      setHealth(Math.min(100, health + 20))
      setEnergy(Math.min(100, energy + 10))
      setHappiness(Math.min(100, health + 20))
      setEnergy(Math.min(100, energy + 10))
      setHappiness(Math.min(100, happiness + 5))
      showNotification(`${petName} enjoyed the meal!`)
      setIsAnimating(false)
      setShowFeedingAnimation(false)
    }, 1500)
  }

  const handleTrick = () => {
    setIsAnimating(true)

    setTimeout(() => {
      const trickXp = 5 + Math.floor(intelligence / 10)
      setExp(exp + trickXp)
      setIntelligence(Math.min(100, intelligence + 5))
      setEnergy(Math.max(0, energy - 5))
      showNotification(`${petName} performed a trick! +${trickXp} XP`)
      setIsAnimating(false)
    }, 800)
  }

  // Enhanced buying function with animation
  const handleBuyItem = (item) => {
    if (coins < item.price) {
      showNotification(`Not enough coins! You need ${item.price - coins} more coins to buy this item.`, "error")
      return
    }

    // Show spending animation
    setShowSpendingAnimation(true)

    setTimeout(() => {
      // Purchase the item
      setCoins(coins - item.price)

      // Add to inventory
      const existingItemIndex = items.findIndex(
        (i) => i.name === item.name && i.effect === item.effect && i.value === item.value,
      )

      if (existingItemIndex >= 0) {
        const updatedItems = [...items]
        updatedItems[existingItemIndex].count += 1
        setItems(updatedItems)
      } else {
        setItems([
          ...items,
          {
            id: items.length + 1,
            name: item.name,
            icon: item.icon || getIconForEffect(item.effect),
            count: 1,
            effect: item.effect,
            value: item.value,
          },
        ])
      }

      showNotification(`Successfully purchased ${item.name} for ${item.price} coins!`, "success")
      setShowSpendingAnimation(false)
    }, 1000)
  }

  // Helper function to get icon based on effect
  const getIconForEffect = (effect) => {
    switch (effect) {
      case "energy":
        return "⚡"
      case "health":
        return "❤️"
      case "happiness":
        return "😊"
      case "intelligence":
        return "🧠"
      case "exp":
        return "✨"
      case "random":
        return "🎲"
      default:
        return "📦"
    }
  }

  // Enhanced useItem function with animation
  const useItem = (itemId) => {
    const item = items.find((i) => i.id === itemId)

    if (item && item.count > 0) {
      setIsAnimating(true)
      setShowFeedingAnimation(true)

      setTimeout(() => {
        // Apply item effect
        if (item.effect === "energy") {
          setEnergy(Math.min(100, energy + item.value))
          showNotification(`Energy increased by ${item.value}!`)
        } else if (item.effect === "health") {
          setHealth(Math.min(100, health + item.value))
          showNotification(`Health increased by ${item.value}!`)
        } else if (item.effect === "happiness") {
          setHappiness(Math.min(100, happiness + item.value))
          showNotification(`Happiness increased by ${item.value}!`)
        } else if (item.effect === "intelligence") {
          setIntelligence(Math.min(100, intelligence + item.value))
          showNotification(`Intelligence increased by ${item.value}!`)
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
          const effects = ["energy", "health", "happiness", "intelligence", "exp", "coins"]
          const randomEffect = effects[Math.floor(Math.random() * effects.length)]
          const randomValue = Math.floor(Math.random() * 20) + 10

          if (randomEffect === "energy") {
            setEnergy(Math.min(100, energy + randomValue))
          } else if (randomEffect === "health") {
            setHealth(Math.min(100, health + randomValue))
          } else if (randomEffect === "happiness") {
            setHappiness(Math.min(100, happiness + randomValue))
          } else if (randomEffect === "intelligence") {
            setIntelligence(Math.min(100, intelligence + randomValue))
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

        // Complete daily task if applicable
        if (!dailyTasksCompleted.includes("item")) {
          completeDailyTask("item")
          const taskBonus = 10
          setCoins(coins + taskBonus)
          showNotification(`Daily task completed! +${taskBonus} bonus coins!`)
        }

        setIsAnimating(false)
        setShowFeedingAnimation(false)
      }, 1500)
    }
  }

  const gameContent = (
    <div className="game-container relative">
      {/* Game background - black and white theme */}
      <div className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out bg-gradient-to-b from-background to-muted/30">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-foreground"
              style={{
                width: `${Math.random() * 30 + 5}px`,
                height: `${Math.random() * 30 + 5}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
                animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Fullscreen toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2 z-50 bg-black/60 text-white border-white/20 hover:bg-white/20"
        onClick={toggleFullscreen}
      >
        {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
      </Button>

      {/* Tablet layout with two columns */}
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Left column - Pet visualization and interactions */}
        <div className="md:col-span-2 border-r border-border">
          {/* Game header */}
          <GameHeader
            level={level}
            coins={coins}
            streak={streak}
            petName={petName}
            onSettingsClick={() => setShowSettings(!showSettings)}
          />

          {/* The pet visualization with animations */}
          <div
            className="flex justify-center items-center py-8 px-4 relative"
            onClick={() => setPetInteractionMenu(!petInteractionMenu)}
          >
            <PetVisual
              mood={mood}
              level={level}
              petForm={petForm}
              isAnimating={isAnimating}
              bounceEffect={exp >= level * 15} // Bounce when close to level up
              customizations={customizations}
              maxSize={180} // Maximum size for the pet
            />

            {/* Pet interaction menu */}
            <AnimatePresence>
              {petInteractionMenu && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-2 gap-3 p-4">
                    <motion.button
                      className="flex flex-col items-center justify-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePet()
                        setPetInteractionMenu(false)
                      }}
                    >
                      <Heart className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-white">Pet</span>
                    </motion.button>

                    <motion.button
                      className="flex flex-col items-center justify-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFeed()
                        setPetInteractionMenu(false)
                      }}
                    >
                      <Utensils className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-white">Feed</span>
                    </motion.button>

                    <motion.button
                      className="flex flex-col items-center justify-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTrick()
                        setPetInteractionMenu(false)
                      }}
                    >
                      <Sparkles className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-white">Trick</span>
                    </motion.button>

                    <motion.button
                      className="flex flex-col items-center justify-center p-3 bg-primary/10 rounded-lg hover:bg-primary/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setPetInteractionMenu(false)
                      }}
                    >
                      <X className="h-8 w-8 mb-2 text-primary" />
                      <span className="text-white">Close</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status bars */}
          <div className="px-4 pb-4">
            <StatusBars energy={energy} health={health} happiness={happiness} intelligence={intelligence} />
          </div>

          {/* Experience bar with animation */}
          <div className="px-4 pb-4">
            <div className="w-full bg-muted/50 rounded-full h-4 mb-2 overflow-hidden">
              {/* Calculate XP required with the same formula as in the level up logic */}
              {(() => {
                const xpRequiredForNextLevel = level * 20 + Math.floor(level * level * 1.5)
                return (
                  <div
                    className="bg-primary h-4 rounded-full transition-all duration-500 relative"
                    style={{ width: `${(exp / xpRequiredForNextLevel) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                    {/* XP increment markers */}
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-0 bottom-0 w-px bg-white/40"
                        style={{
                          left: `${(((i + 1) * xpRequiredForNextLevel) / 5 / xpRequiredForNextLevel) * 100}%`,
                        }}
                      />
                    ))}
                  </div>
                )
              })()}
              <div className="flex justify-between text-xs mt-1">
                <span className="text-white">
                  EXP: {exp}/{level * 20 + Math.floor(level * level * 1.5)}
                </span>
                <span className="text-white">Level {level}</span>
              </div>
            </div>
          </div>

          {/* Action buttons with animations */}
          <ActionButtons
            handleCodeSession={handleCodeSession}
            handleBreak={handleBreak}
            handleSleep={handleSleep}
            handlePlay={handlePlay}
            handleTrain={handleTrain}
            isAnimating={isAnimating}
          />
        </div>

        {/* Right column - Game tabs and panels */}
        <div className="md:col-span-3">
          {/* Stats summary */}
          <div className="flex justify-between px-4 py-2 bg-background/80 border-b">
            <div className="flex items-center">
              <Trophy size={16} className="mr-1 text-yellow-500" />
              <span className="font-medium text-white">Streak: {streak}d</span>
            </div>
            <div className="flex items-center">
              <Coins size={16} className="mr-1 text-amber-500" />
              <span className="font-medium text-white">{coins} coins</span>
            </div>
          </div>

          {/* Tabs navigation */}
          <GameTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Panels */}
          <div className="bg-card p-4 rounded-b-lg h-[calc(100vh-180px)] min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatsPanel />
                </motion.div>
              )}

              {activeTab === "inventory" && (
                <motion.div
                  key="inventory"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <InventoryPanel useItem={useItem} />
                </motion.div>
              )}

              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AchievementsPanel />
                </motion.div>
              )}

              {activeTab === "shop" && (
                <motion.div
                  key="shop"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShopPanel buyItem={handleBuyItem} />
                </motion.div>
              )}

              {activeTab === "tasks" && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DailyTasksPanel />
                </motion.div>
              )}

              {activeTab === "evolution" && (
                <motion.div
                  key="evolution"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PetEvolutionPanel />
                </motion.div>
              )}

              {activeTab === "trophies" && (
                <motion.div
                  key="trophies"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TrophiesPanel />
                </motion.div>
              )}

              {activeTab === "collectibles" && (
                <motion.div
                  key="collectibles"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CollectiblesPanel />
                </motion.div>
              )}

              {activeTab === "trading" && (
                <motion.div
                  key="trading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <TradingPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Notification system */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-16 left-0 right-0 mx-auto w-4/5 p-3 rounded-lg shadow-lg z-50 flex items-center justify-center ${
              notification.type === "error"
                ? "bg-red-900/90 border border-red-500/50"
                : notification.type === "success"
                  ? "bg-green-900/90 border border-green-500/50"
                  : "bg-background/90 border border-primary/50"
            }`}
          >
            {notification.type === "error" ? (
              <X size={16} className="text-red-400 mr-2" />
            ) : notification.type === "success" ? (
              <Check size={16} className="text-green-400 mr-2" />
            ) : (
              <Trophy size={16} className="text-primary mr-2" />
            )}
            <span className="text-white">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <div className="bg-background/80 p-6 rounded-xl shadow-2xl flex flex-col items-center">
              <Sparkles size={40} className="text-primary mb-2" />
              <h3 className="text-xl font-bold mb-1 text-white">
                {rewardType === "level" ? "Level Up!" : "Daily Reward!"}
              </h3>
              <div className="text-3xl font-bold text-primary mb-2">
                {rewardType === "level" ? `Level ${rewardValue}` : `+${rewardValue} coins`}
              </div>
              <div className="text-sm text-white">
                {rewardType === "level" ? "New abilities unlocked!" : "Keep up the streak!"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm z-30 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-6 rounded-lg shadow-xl w-full max-w-md"
            >
              <SettingsPanel onClose={() => setShowSettings(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation overlays for actions */}
      <AnimatePresence>
        {showFeedingAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Utensils size={60} className="text-primary" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 0] }}
                transition={{ duration: 1, repeat: 2 }}
                className="absolute inset-0 rounded-full border-2 border-primary"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSpendingAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            <div className="h-full w-full flex items-center justify-center">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, x: 0, opacity: 1 }}
                  animate={{
                    y: Math.random() * 200 - 100,
                    x: Math.random() * 200 - 100,
                    opacity: 0,
                  }}
                  transition={{ duration: 1 }}
                  className="absolute"
                >
                  <Coins size={24} className="text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div
      className={`w-full ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black flex items-center justify-center p-0 m-0 h-screen w-screen"
          : "max-w-5xl mx-auto"
      } relative`}
    >
      {isFullscreen ? (
        <div className="w-full h-full overflow-hidden">{gameContent}</div>
      ) : (
        <Card className="w-full overflow-hidden border-2 border-white/20 shadow-xl">
          <CardContent className="p-0">{gameContent}</CardContent>
        </Card>
      )}
    </div>
  )
}
