"use client"

import { motion } from "framer-motion"
import { BarChart, ShoppingBag, Trophy, Package, Calendar, Sparkles, Award, Gem, ArrowLeftRight } from "lucide-react"

interface GameTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function GameTabs({ activeTab, setActiveTab }: GameTabsProps) {
  const tabs = [
    { id: "stats", icon: <BarChart size={20} />, label: "Stats" },
    { id: "inventory", icon: <Package size={20} />, label: "Items" },
    { id: "achievements", icon: <Trophy size={20} />, label: "Achieve" },
    { id: "shop", icon: <ShoppingBag size={20} />, label: "Shop" },
    { id: "tasks", icon: <Calendar size={20} />, label: "Tasks" },
    { id: "evolution", icon: <Sparkles size={20} />, label: "Evolve" },
    { id: "trophies", icon: <Award size={20} />, label: "Trophy" },
    { id: "collectibles", icon: <Gem size={20} />, label: "Collect" },
    { id: "trading", icon: <ArrowLeftRight size={20} />, label: "Trade" },
  ]

  return (
    <div className="grid grid-cols-9 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-t border-b border-white/20">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative py-3 flex flex-col items-center justify-center transition-colors ${
            activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white/90"
          }`}
        >
          <div className={`${activeTab === tab.id ? "text-primary" : ""}`}>{tab.icon}</div>
          <span className="text-xs mt-1">{tab.label}</span>

          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}

          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-blue-500/20 -z-10"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
