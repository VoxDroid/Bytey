"use client"

import { usePetStore } from "@/lib/pet-store"
import { Gem, Filter, Search, Plus, Star, ArrowUpDown, Coins } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CollectiblesPanel() {
  const { collectibles } = usePetStore()
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("rarity")

  // Filter collectibles based on current filters
  const filteredCollectibles = collectibles
    .filter((item) => {
      // Filter by ownership
      if (filter === "owned" && !item.owned) return false
      if (filter === "unowned" && item.owned) return false

      // Filter by search term
      if (
        search &&
        !item.name.toLowerCase().includes(search.toLowerCase()) &&
        !item.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "rarity") {
        const rarityOrder = { common: 1, uncommon: 2, rare: 3, epic: 4, legendary: 5, mythic: 6 }
        return rarityOrder[b.rarity] - rarityOrder[a.rarity]
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "value") {
        return b.value - a.value
      } else if (sortBy === "recent") {
        if (!a.obtainedDate || !b.obtainedDate) return 0
        return new Date(b.obtainedDate).getTime() - new Date(a.obtainedDate).getTime()
      }
      return 0
    })

  // Get rarity color class
  const getRarityColorClass = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "uncommon":
        return "bg-green-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      case "mythic":
        return "bg-cyan-500"
      default:
        return "bg-gray-500"
    }
  }

  // Get collectible SVG icon
  const getCollectibleIcon = (image) => {
    switch (image) {
      case "codeBlock":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-yellow-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9l-2 2 2 2M15 9l2 2-2 2" />
          </svg>
        )
      case "compiler":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-cyan-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
            <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
          </svg>
        )
      case "shades":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 10h20M4 10c0 1 1 3 4 3s4-2 4-3M16 10c0 1 1 3 4 3s4-2 4-3" />
          </svg>
        )
      case "holographic":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        )
      case "badge":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z" />
          </svg>
        )
      case "cybernetic":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          </svg>
        )
      case "terminal":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path d="M5 8l3 3-3 3M10 14h6" />
          </svg>
        )
      case "aura":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-pink-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            <path d="M7 12a5 5 0 0 1 5-5M12 17a5 5 0 0 1-5-5" strokeDasharray="2 2" />
          </svg>
        )
      case "neonHat":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-pink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M2 12l10-10 10 10M4 14v-2l8-8 8 8v2" />
            <path d="M8 14v-1l4-4 4 4v1" />
          </svg>
        )
      case "keyboard":
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M18 14h.01M6 18h12" />
          </svg>
        )
      default:
        return <Gem className="w-12 h-12 text-blue-500" />
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium flex items-center text-white text-xl">
          <Gem className="w-5 h-5 mr-2 text-blue-400" />
          Collectibles Gallery
        </h3>
        <Badge variant="outline" className="bg-blue-900/40 text-white border-blue-500/30 px-3 py-1">
          {collectibles.filter((c) => c.owned).length}/{collectibles.length} Collected
        </Badge>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          <Input
            placeholder="Search collectibles..."
            className="pl-10 py-5 bg-black/40 border-white/10 text-white rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] bg-black/40 border-white/10 text-white h-10">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-white/70" />
                <span>All Items</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="owned">Owned Only</SelectItem>
              <SelectItem value="unowned">Unowned Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] bg-black/40 border-white/10 text-white h-10">
              <div className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2 text-white/70" />
                <span>Rarity</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-white/20">
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Value</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Collectibles grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredCollectibles.map((collectible) => (
          <motion.div
            key={collectible.id}
            variants={item}
            className={`collectible-card relative p-0 rounded-lg overflow-hidden ${
              collectible.rarity === "mythic"
                ? "bg-gradient-to-b from-cyan-600 to-blue-900"
                : collectible.rarity === "legendary"
                  ? "bg-gradient-to-b from-yellow-600 to-amber-900"
                  : collectible.rarity === "epic"
                    ? "bg-gradient-to-b from-purple-600 to-pink-900"
                    : collectible.rarity === "rare"
                      ? "bg-gradient-to-b from-blue-600 to-indigo-900"
                      : "bg-gradient-to-b from-gray-700 to-gray-900"
            } ${!collectible.owned ? "opacity-70" : ""}`}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            {/* Rarity stars at the top */}
            <div className="absolute top-2 right-2 flex">
              {Array.from({
                length:
                  collectible.rarity === "common"
                    ? 1
                    : collectible.rarity === "uncommon"
                      ? 2
                      : collectible.rarity === "rare"
                        ? 3
                        : collectible.rarity === "epic"
                          ? 4
                          : collectible.rarity === "legendary"
                            ? 5
                            : 6,
              }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    collectible.rarity === "mythic"
                      ? "text-cyan-300"
                      : collectible.rarity === "legendary"
                        ? "text-yellow-300"
                        : collectible.rarity === "epic"
                          ? "text-purple-300"
                          : collectible.rarity === "rare"
                            ? "text-blue-300"
                            : collectible.rarity === "uncommon"
                              ? "text-green-300"
                              : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Icon centered at the top */}
            <div className="flex justify-center pt-6 pb-3">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-black/30">
                {getCollectibleIcon(collectible.image)}
              </div>
            </div>

            {/* Content section */}
            <div className="p-4 pt-2 text-center">
              <h4 className="font-bold text-white text-lg mb-1">{collectible.name}</h4>

              <div className="flex items-center justify-center mb-2">
                <Badge className="bg-black/30 text-white border-0 capitalize">{collectible.rarity}</Badge>
                {collectible.tradable && (
                  <Badge className="ml-2 bg-blue-900/40 text-white border-blue-500/30">Tradable</Badge>
                )}
              </div>

              <p className="text-xs text-white/80 mb-4 px-2">{collectible.description}</p>
            </div>

            {/* Bottom action section */}
            <div className="bg-black/40 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="h-5 w-5 mr-1 text-yellow-400" />
                <span className="text-white font-bold">{collectible.value}</span>
              </div>

              {collectible.owned ? (
                <Badge className="bg-green-900/40 text-green-400 border-green-500/30">Owned</Badge>
              ) : (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-1" /> Acquire
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCollectibles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-white/60">
          <Search className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No collectibles found</p>
          <p className="text-sm">Try adjusting your filters or search term</p>
        </div>
      )}
    </div>
  )
}
