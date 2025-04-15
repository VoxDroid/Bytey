"use client"

import { usePetStore } from "@/lib/pet-store"
import { Gem, Filter, Search, Plus, ArrowUpDown, Coins, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CollectiblesPanel() {
  const { collectibles, coins } = usePetStore()
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

  // Get collectible SVG icon
  const getCollectibleIcon = (image) => {
    switch (image) {
      case "codeBlock":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9l-2 2 2 2M15 9l2 2-2 2" />
          </svg>
        )
      case "compiler":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
            <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" />
          </svg>
        )
      case "shades":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 10h20M4 10c0 1 1 3 4 3s4-2 4-3M16 10c0 1 1 3 4 3s4-2 4-3" />
          </svg>
        )
      case "holographic":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
          </svg>
        )
      case "badge":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z" />
          </svg>
        )
      case "cybernetic":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
          </svg>
        )
      case "terminal":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <path d="M5 8l3 3-3 3M10 14h6" />
          </svg>
        )
      case "aura":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            <path d="M7 12a5 5 0 0 1 5-5M12 17a5 5 0 0 1-5-5" strokeDasharray="2 2" />
          </svg>
        )
      case "neonHat":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12l10-10 10 10M4 14v-2l8-8 8 8v2" />
            <path d="M8 14v-1l4-4 4 4v1" />
          </svg>
        )
      case "keyboard":
        return (
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h.01M14 14h.01M18 14h.01M6 18h12" />
          </svg>
        )
      default:
        return <Gem className="w-12 h-12 text-white" />
    }
  }

  // Buy collectible function
  const handleBuyCollectible = (collectible) => {
    // Pass this collectible to the parent component which has the buyItem function
    window.dispatchEvent(
      new CustomEvent("buyCollectible", {
        detail: {
          id: collectible.id,
          name: collectible.name,
          price: collectible.value,
          type: "collectible",
          effect: "collectible",
          value: 0,
          collectibleData: collectible,
        },
      }),
    )
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

  // Function to render rarity stars
  const renderRarityStars = (rarity) => {
    const starCount =
      rarity === "common"
        ? 1
        : rarity === "uncommon"
          ? 2
          : rarity === "rare"
            ? 3
            : rarity === "epic"
              ? 4
              : rarity === "legendary"
                ? 5
                : 6 // mythic

    // Get star color based on rarity
    const getStarColor = () => {
      switch (rarity) {
        case "common":
          return "text-green-500"
        case "uncommon":
          return "text-blue-500"
        case "rare":
          return "text-yellow-500"
        case "epic":
          return "text-red-500"
        case "legendary":
          return "text-purple-500"
        case "mythic":
          return "rainbow-star" // Special class for rainbow animation
        default:
          return "text-gray-500"
      }
    }

    return (
      <div className="flex">
        {Array.from({ length: starCount }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 ${rarity === "mythic" ? "rainbow-star" : getStarColor()}`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium flex items-center text-white text-xl">
          <Gem className="w-5 h-5 mr-2 text-white" />
          Collectibles Gallery
        </h3>
        <Badge variant="outline" className="bg-black border border-white/20 text-white px-3 py-1">
          {collectibles.filter((c) => c.owned).length}/{collectibles.length} Collected
        </Badge>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          <Input
            placeholder="Search collectibles..."
            className="pl-10 py-5 bg-black border-white/10 text-white rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px] bg-black border-white/10 text-white h-10">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-white/70" />
                <span>All Items</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="owned">Owned Only</SelectItem>
              <SelectItem value="unowned">Unowned Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] bg-black border-white/10 text-white h-10">
              <div className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2 text-white/70" />
                <span>Rarity</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
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
            className="collectible-card border border-white/10 rounded-lg overflow-hidden bg-black"
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => {
              if (collectible.owned) {
                // Trigger view item modal
                window.dispatchEvent(
                  new CustomEvent("viewItem", {
                    detail: {
                      type: "collectible",
                      item: collectible,
                    },
                  }),
                )
              }
            }}
          >
            {/* Card content with fixed height structure */}
            <div className="collectible-card-content">
              {/* Icon centered at the top */}
              <div className="collectible-card-image p-4 relative">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white/5 mx-auto">
                  {getCollectibleIcon(collectible.image)}
                </div>

                {/* Rarity stars positioned absolutely */}
                <div className="absolute top-2 right-2">{renderRarityStars(collectible.rarity)}</div>
              </div>

              {/* Content section */}
              <div className="collectible-card-details p-4 pt-0 text-center">
                <h4 className="font-bold text-white text-lg mb-1 line-clamp-1">{collectible.name}</h4>

                <div className="flex items-center justify-center mb-2">
                  <Badge className="bg-white/5 text-white border-0 capitalize">{collectible.rarity}</Badge>
                  {collectible.tradable && (
                    <Badge className="ml-2 bg-white/5 text-white border-white/10">Tradable</Badge>
                  )}
                </div>

                <p className="text-xs text-white/70 mb-4 px-2 line-clamp-3 h-12">{collectible.description}</p>
              </div>
            </div>

            {/* Bottom action section */}
            <div className="collectible-card-footer bg-white/5 p-3 flex items-center justify-between">
              <div className="flex items-center">
                <Coins className="h-5 w-5 mr-1 text-white" />
                <span className="text-white font-bold">{collectible.value}</span>
              </div>

              {collectible.owned ? (
                <Badge className="bg-white/10 text-white border-white/20">Owned</Badge>
              ) : (
                <Button
                  size="sm"
                  className={`${
                    coins >= collectible.value ? "bg-white/10 hover:bg-white/20" : "bg-white/5 cursor-not-allowed"
                  } text-white border border-white/10 w-9 h-9 p-0`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBuyCollectible(collectible)
                  }}
                  disabled={coins < collectible.value}
                >
                  {coins >= collectible.value ? <Plus className="h-4 w-4" /> : <X className="h-4 w-4" />}
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
