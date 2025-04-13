"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PetTabsProps {
  showStats: boolean
  showInventory: boolean
  showAchievements: boolean
  setShowStats: (value: boolean) => void
  setShowInventory: (value: boolean) => void
  setShowAchievements: (value: boolean) => void
}

export default function PetTabs({
  showStats,
  showInventory,
  showAchievements,
  setShowStats,
  setShowInventory,
  setShowAchievements,
}: PetTabsProps) {
  const handleTabChange = (value: string) => {
    setShowStats(value === "stats")
    setShowInventory(value === "inventory")
    setShowAchievements(value === "achievements")
  }

  const getCurrentTab = () => {
    if (showStats) return "stats"
    if (showInventory) return "inventory"
    if (showAchievements) return "achievements"
    return "stats"
  }

  return (
    <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="w-full mb-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="stats">Stats</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
