"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ReactElement } from "react"

interface Item {
  id: number
  name: string
  icon: string
  count: number
  effect: string
  value: number
}

interface Achievement {
  id: number
  name: string
  desc: string
  unlocked: boolean
}

interface Trophy {
  id: number
  name: string
  description: string
  unlocked: boolean
  image: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

interface Collectible {
  id: number
  name: string
  description: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic"
  image: string
  owned: boolean
  tradable: boolean
  value: number
  category: "pet" | "accessory" | "background" | "icon" | "badge" | "special"
  obtainedDate?: string
}

interface TradeOffer {
  id: number
  fromUser: string
  offerItems: Collectible[]
  requestItems: Collectible[]
  status: "pending" | "accepted" | "rejected" | "expired"
  createdAt: string
  expiresAt: string
}

interface Skill {
  id: number
  name: string
  level: number
  unlocked: boolean
  icon: ReactElement | string
}

interface PetCustomizations {
  color: string
  accessory: string
  background: string
}

interface PetState {
  petName: string
  setPetName: (name: string) => void
  level: number
  setLevel: (level: number) => void
  exp: number
  setExp: (exp: number) => void
  streak: number
  setStreak: (streak: number) => void
  mood: string
  setMood: (mood: string) => void
  animationType: string
  setAnimationType: (type: string) => void
  energy: number
  setEnergy: (energy: number) => void
  health: number
  setHealth: (health: number) => void
  happiness: number
  setHappiness: (happiness: number) => void
  intelligence: number
  setIntelligence: (intelligence: number) => void
  coins: number
  setCoins: (coins: number) => void
  items: Item[]
  setItems: (items: Item[]) => void
  achievements: Achievement[]
  unlockAchievement: (id: number) => void
  trophies: Trophy[]
  unlockTrophy: (id: number) => void
  collectibles: Collectible[]
  addCollectible: (collectible: Collectible) => void
  tradeOffers: TradeOffer[]
  addTradeOffer: (offer: TradeOffer) => void
  updateTradeOfferStatus: (id: number, status: "accepted" | "rejected" | "expired") => void
  skills: Skill[]
  updateSkills: (level: number) => void
  petForm: string
  setPetForm: (form: string) => void
  lastLogin: string
  setLastLogin: (date: string) => void
  dailyTasksCompleted: string[]
  setDailyTasksCompleted: (tasks: string[]) => void
  completeDailyTask: (taskId: string) => void
  resetDailyTasks: () => void
  customizations: PetCustomizations
  setCustomizations: (customizations: PetCustomizations) => void
  applyCustomization: (type: string, value: string) => void
  resetPetProgress: () => void
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      // Core pet stats
      petName: "Bytey",
      setPetName: (name) => set({ petName: name }),
      level: 1,
      setLevel: (level) => set({ level }),
      exp: 0,
      setExp: (exp) => set({ exp }),
      streak: 3,
      setStreak: (streak) => set({ streak }),
      mood: "happy",
      setMood: (mood) => set({ mood }),
      animationType: "pulse",
      setAnimationType: (type) => set({ animationType: type }),
      energy: 80,
      setEnergy: (energy) => set({ energy }),
      health: 90,
      setHealth: (health) => set({ health }),
      happiness: 75,
      setHappiness: (happiness) => set({ happiness }),
      intelligence: 50,
      setIntelligence: (intelligence) => set({ intelligence }),
      coins: 150,
      setCoins: (coins) => set({ coins }),

      // Inventory
      items: [
        { id: 1, name: "Coffee Boost", icon: "☕", count: 2, effect: "energy", value: 30 },
        { id: 2, name: "Code Snack", icon: "🍕", count: 1, effect: "health", value: 25 },
        { id: 3, name: "Debug Potion", icon: "🧪", count: 1, effect: "exp", value: 15 },
      ],
      setItems: (items) => set({ items }),

      // Achievements
      achievements: [
        { id: 1, name: "First Line", desc: "Write your first line of code", unlocked: true },
        { id: 2, name: "Code Warrior", desc: "Code for 5 days in a row", unlocked: false },
        { id: 3, name: "Night Owl", desc: "Code after midnight", unlocked: true },
        { id: 4, name: "Bug Hunter", desc: "Fix 10 bugs", unlocked: false },
        { id: 5, name: "Level 10", desc: "Reach level 10 with your pet", unlocked: false },
        { id: 6, name: "Shopaholic", desc: "Buy 5 items from the shop", unlocked: false },
        { id: 7, name: "Task Master", desc: "Complete all daily tasks", unlocked: false },
        { id: 8, name: "Dragon Tamer", desc: "Evolve your pet to dragon form", unlocked: false },
      ],
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id ? { ...achievement, unlocked: true } : achievement,
          ),
        })),

      // Trophies
      trophies: [
        {
          id: 1,
          name: "Coding Novice",
          description: "Reached level 5 with your pet",
          unlocked: false,
          image: "🏆",
          rarity: "common",
        },
        {
          id: 2,
          name: "Coding Expert",
          description: "Reached level 10 with your pet",
          unlocked: false,
          image: "🏆",
          rarity: "uncommon",
        },
        {
          id: 3,
          name: "Coding Master",
          description: "Reached level 15 with your pet",
          unlocked: false,
          image: "🏆",
          rarity: "rare",
        },
        {
          id: 4,
          name: "Streak Champion",
          description: "Maintained a 10-day coding streak",
          unlocked: false,
          image: "🏆",
          rarity: "uncommon",
        },
        {
          id: 5,
          name: "Pet Whisperer",
          description: "Maxed out your pet's happiness",
          unlocked: false,
          image: "🏆",
          rarity: "rare",
        },
        {
          id: 6,
          name: "Collector",
          description: "Collected all pet forms",
          unlocked: false,
          image: "🏆",
          rarity: "epic",
        },
        {
          id: 7,
          name: "Legendary Coder",
          description: "Completed all achievements",
          unlocked: false,
          image: "🏆",
          rarity: "legendary",
        },
      ],
      unlockTrophy: (id) =>
        set((state) => ({
          trophies: state.trophies.map((trophy) => (trophy.id === id ? { ...trophy, unlocked: true } : trophy)),
        })),

      // Collectibles
      collectibles: [
        {
          id: 1,
          name: "Golden Code Block",
          description: "A rare golden code block that shimmers with digital energy",
          rarity: "rare",
          image: "codeBlock",
          owned: true,
          tradable: true,
          value: 500,
          category: "icon",
          obtainedDate: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Quantum Compiler",
          description: "A mythical compiler that can process quantum algorithms",
          rarity: "mythic",
          image: "compiler",
          owned: false,
          tradable: true,
          value: 2000,
          category: "special",
        },
        {
          id: 3,
          name: "Pixel Shades",
          description: "Cool pixelated sunglasses for your pet",
          rarity: "uncommon",
          image: "shades",
          owned: true,
          tradable: true,
          value: 150,
          category: "accessory",
          obtainedDate: new Date().toISOString(),
        },
        {
          id: 4,
          name: "Holographic Background",
          description: "A stunning holographic background for your pet",
          rarity: "epic",
          image: "holographic",
          owned: false,
          tradable: true,
          value: 800,
          category: "background",
        },
        {
          id: 5,
          name: "Legendary Coder Badge",
          description: "A badge awarded to only the most elite coders",
          rarity: "legendary",
          image: "badge",
          owned: false,
          tradable: false,
          value: 5000,
          category: "badge",
        },
        {
          id: 6,
          name: "Cybernetic Pet Upgrade",
          description: "Transform your pet with futuristic cybernetic enhancements",
          rarity: "epic",
          image: "cybernetic",
          owned: false,
          tradable: true,
          value: 1200,
          category: "pet",
        },
        {
          id: 7,
          name: "Vintage Terminal",
          description: "An ancient terminal from the early days of computing",
          rarity: "rare",
          image: "terminal",
          owned: true,
          tradable: true,
          value: 350,
          category: "icon",
          obtainedDate: new Date().toISOString(),
        },
        {
          id: 8,
          name: "Rainbow Aura",
          description: "A mesmerizing rainbow aura that surrounds your pet",
          rarity: "epic",
          image: "aura",
          owned: false,
          tradable: true,
          value: 900,
          category: "accessory",
        },
      ],
      addCollectible: (collectible) =>
        set((state) => ({
          collectibles: state.collectibles.map((c) =>
            c.id === collectible.id
              ? {
                  ...c,
                  owned: true,
                  obtainedDate: collectible.obtainedDate || new Date().toISOString(),
                }
              : c,
          ),
        })),

      // Trade offers
      tradeOffers: [
        {
          id: 1,
          fromUser: "CodeMaster42",
          offerItems: [
            {
              id: 101,
              name: "Neon Circuit Hat",
              description: "A hat made of glowing neon circuits",
              rarity: "rare",
              image: "neonHat",
              owned: true,
              tradable: true,
              value: 450,
              category: "accessory",
            },
          ],
          requestItems: [
            {
              id: 3,
              name: "Pixel Shades",
              description: "Cool pixelated sunglasses for your pet",
              rarity: "uncommon",
              image: "shades",
              owned: true,
              tradable: true,
              value: 150,
              category: "accessory",
            },
          ],
          status: "pending",
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
        },
        {
          id: 2,
          fromUser: "ByteBaron",
          offerItems: [
            {
              id: 102,
              name: "Quantum Keyboard",
              description: "A keyboard that types in multiple dimensions",
              rarity: "epic",
              image: "keyboard",
              owned: true,
              tradable: true,
              value: 850,
              category: "icon",
            },
          ],
          requestItems: [
            {
              id: 7,
              name: "Vintage Terminal",
              description: "An ancient terminal from the early days of computing",
              rarity: "rare",
              image: "terminal",
              owned: true,
              tradable: true,
              value: 350,
              category: "icon",
            },
          ],
          status: "pending",
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
        },
      ],
      addTradeOffer: (offer) =>
        set((state) => ({
          tradeOffers: [...state.tradeOffers, offer],
        })),
      updateTradeOfferStatus: (id, status) =>
        set((state) => ({
          tradeOffers: state.tradeOffers.map((offer) => (offer.id === id ? { ...offer, status } : offer)),
          // If accepted, update collectibles ownership
          collectibles:
            status === "accepted"
              ? state.collectibles.map((collectible) => {
                  const offer = state.tradeOffers.find((o) => o.id === id)
                  if (!offer) return collectible

                  // Check if this collectible is being offered to the user
                  const isOffered = offer.offerItems.some((item) => item.id === collectible.id)
                  if (isOffered) return { ...collectible, owned: true, obtainedDate: new Date().toISOString() }

                  // Check if this collectible is being requested from the user
                  const isRequested = offer.requestItems.some((item) => item.id === collectible.id)
                  if (isRequested) return { ...collectible, owned: false }

                  return collectible
                })
              : state.collectibles,
        })),

      // Skills - using strings for icons to fix the React child error
      skills: [
        { id: 1, name: "Auto-Debug", level: 3, unlocked: false, icon: "Shield" },
        { id: 2, name: "Code Generation", level: 5, unlocked: false, icon: "Zap" },
        { id: 3, name: "Data Analysis", level: 7, unlocked: false, icon: "BarChart" },
        { id: 4, name: "AI Assistant", level: 10, unlocked: false, icon: "Bot" },
        { id: 5, name: "Time Warp", level: 12, unlocked: false, icon: "Clock" },
      ],
      updateSkills: (level) =>
        set((state) => ({
          skills: state.skills.map((skill) => (level >= skill.level ? { ...skill, unlocked: true } : skill)),
        })),

      // Pet form
      petForm: "blob",
      setPetForm: (form) => set({ petForm: form }),

      // Daily login and tasks
      lastLogin: new Date().toDateString(),
      setLastLogin: (date) => set({ lastLogin: date }),
      dailyTasksCompleted: [],
      setDailyTasksCompleted: (tasks) => set({ dailyTasksCompleted: tasks }),
      completeDailyTask: (taskId) =>
        set((state) => ({
          dailyTasksCompleted: [...state.dailyTasksCompleted, taskId],
        })),
      resetDailyTasks: () => set({ dailyTasksCompleted: [] }),

      // Customizations
      customizations: {
        color: "default",
        accessory: "none",
        background: "default",
      },
      setCustomizations: (customizations) => set({ customizations }),
      applyCustomization: (type, value) =>
        set((state) => ({
          customizations: {
            ...state.customizations,
            [type]: value,
          },
        })),
      resetPetProgress: () =>
        set({
          petName: "Bytey",
          level: 1,
          exp: 0,
          streak: 0,
          mood: "neutral",
          energy: 80,
          health: 90,
          happiness: 75,
          intelligence: 50,
          coins: 50,
          items: [],
          petForm: "blob",
          dailyTasksCompleted: [],
          animationType: "pulse",
          customizations: {
            color: "default",
            accessory: "none",
            background: "default",
          },
        }),
    }),
    {
      name: "code-pet-storage",
    },
  ),
)
