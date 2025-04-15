"use client"

import { usePetStore } from "@/lib/pet-store"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Search,
  Filter,
  ArrowUpDown,
  Gem,
  Shirt,
  Wand,
  Palette,
  Sparkles,
  Coins,
  Gift,
  Zap,
  Heart,
  Brain,
  Battery,
  Smile,
  Dices,
  Star,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function InventoryPanel() {
  const {
    items,
    collectibles,
    coins,
    customizations,
    applyCustomization,
    energy,
    health,
    happiness,
    intelligence,
    setEnergy,
    setHealth,
    setHappiness,
    setIntelligence,
    exp,
    setExp,
    setCoins,
  } = usePetStore()

  // UI state
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewingItem, setViewingItem] = useState(null)
  const [itemType, setItemType] = useState("")
  const [showItemModal, setShowItemModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  // Listen for viewItem events
  useEffect(() => {
    const handleViewItem = (event) => {
      setItemType(event.detail.type)
      setViewingItem(event.detail.item)
      setShowItemModal(true)
    }

    window.addEventListener("viewItem", handleViewItem)
    return () => window.removeEventListener("viewItem", handleViewItem)
  }, [])

  // Combine all inventory items
  const allInventoryItems = [
    ...items.map((item) => ({
      ...item,
      type: "consumable",
      rarity: getRarityFromValue(item.value),
    })),
    ...collectibles
      .filter((c) => c.owned)
      .map((collectible) => ({
        ...collectible,
        type: "collectible",
      })),
    // Add customizations as inventory items
    {
      id: "custom-color",
      name: "Pet Color",
      description: "Change your pet's color",
      type: "customization",
      subtype: "color",
      value: 0,
      rarity: "rare",
      currentValue: customizations.color,
      options: [
        { id: "default", name: "Default", value: "default" },
        { id: "white", name: "White", value: "#ffffff" },
        { id: "black", name: "Black", value: "#000000" },
        { id: "red", name: "Red", value: "#ff0000" },
        { id: "blue", name: "Blue", value: "#0000ff" },
        { id: "green", name: "Green", value: "#00ff00" },
        { id: "purple", name: "Purple", value: "#800080" },
        { id: "yellow", name: "Yellow", value: "#ffff00" },
        { id: "cyan", name: "Cyan", value: "#00ffff" },
      ],
    },
    {
      id: "custom-accessory",
      name: "Pet Accessory",
      description: "Equip your pet with accessories",
      type: "customization",
      subtype: "accessory",
      value: 0,
      rarity: "epic",
      currentValue: customizations.accessory,
      options: [
        { id: "none", name: "None", value: "none" },
        { id: "hat", name: "Party Hat", value: "hat" },
        { id: "glasses", name: "Cool Glasses", value: "glasses" },
        { id: "bowtie", name: "Bow Tie", value: "bowtie" },
      ],
    },
    {
      id: "custom-background",
      name: "Pet Background",
      description: "Change your pet's background",
      type: "customization",
      subtype: "background",
      value: 0,
      rarity: "legendary",
      currentValue: customizations.background,
      options: [
        { id: "default", name: "Default", value: "default" },
        { id: "space", name: "Space", value: "space" },
        { id: "forest", name: "Forest", value: "forest" },
        { id: "cyber", name: "Cyberpunk", value: "cyber" },
      ],
    },
  ]

  // Filter inventory items based on current filters
  const filteredItems = allInventoryItems
    .filter((item) => {
      // Filter by tab
      if (activeTab !== "all" && item.type !== activeTab) {
        return false
      }

      // Filter by search term
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }

      // Filter by rarity if applicable
      if (filter !== "all" && item.rarity !== filter) {
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
        // For simplicity, we'll use ID as a proxy for recency
        return b.id - a.id
      }
      return 0
    })

  // Helper function to determine rarity based on item value
  function getRarityFromValue(value) {
    if (value >= 50) return "legendary"
    if (value >= 30) return "epic"
    if (value >= 20) return "rare"
    if (value >= 10) return "uncommon"
    return "common"
  }

  // Get icon for item type
  const getItemIcon = (item) => {
    if (item.type === "collectible") {
      return <Gem className="h-6 w-6 text-white" />
    } else if (item.type === "customization") {
      if (item.subtype === "color") return <Palette className="h-6 w-6 text-white" />
      if (item.subtype === "accessory") return <Shirt className="h-6 w-6 text-white" />
      if (item.subtype === "background") return <Sparkles className="h-6 w-6 text-white" />
      return <Wand className="h-6 w-6 text-white" />
    } else if (item.type === "consumable") {
      if (item.effect === "energy") return <Battery className="h-6 w-6 text-white" />
      if (item.effect === "health") return <Heart className="h-6 w-6 text-white" />
      if (item.effect === "happiness") return <Smile className="h-6 w-6 text-white" />
      if (item.effect === "intelligence") return <Brain className="h-6 w-6 text-white" />
      if (item.effect === "exp") return <Zap className="h-6 w-6 text-white" />
      if (item.effect === "random") return <Dices className="h-6 w-6 text-white" />
      return <Package className="h-6 w-6 text-white" />
    }
    return <Package className="h-6 w-6 text-white" />
  }

  // Get color class based on rarity
  const getRarityColorClass = (rarity) => {
    switch (rarity) {
      case "common":
        return "border-green-500/30 bg-green-500/10"
      case "uncommon":
        return "border-blue-500/30 bg-blue-500/10"
      case "rare":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "epic":
        return "border-red-500/30 bg-red-500/10"
      case "legendary":
        return "border-purple-500/30 bg-purple-500/10"
      case "mythic":
        return "border-white/30 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20"
      default:
        return "border-white/20 bg-white/5"
    }
  }

  const renderRarityStars = (rarity) => {
    const starCount =
      {
        common: 1,
        uncommon: 2,
        rare: 3,
        epic: 4,
        legendary: 5,
        mythic: 5,
      }[rarity] || 0

    const starColor = {
      common: "text-green-500",
      uncommon: "text-blue-500",
      rare: "text-yellow-500",
      epic: "text-red-500",
      legendary: "text-purple-500",
      mythic: "rainbow-star",
    }[rarity]

    return (
      <div className="rarity-stars absolute top-2 right-2 flex">
        {Array.from({ length: starCount }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${starColor}`} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
    )
  }

  // Handle using an item
  const handleUseItem = (item) => {
    if (item.type === "consumable") {
      // Set up confirmation for consumable items
      setConfirmAction({
        title: `Use ${item.name}?`,
        description: getItemEffectDescription(item),
        confirmText: "Use",
        cancelText: "Cancel",
        onConfirm: () => {
          // Trigger the useItem event
          window.dispatchEvent(
            new CustomEvent("useItem", {
              detail: {
                id: item.id,
              },
            }),
          )
          setShowConfirmModal(false)
          setShowItemModal(false)
        },
      })
      setShowConfirmModal(true)
    } else if (item.type === "customization") {
      // For customizations, apply the selected option
      const selectedOption = item.options.find((opt) => opt.value === viewingItem.selectedOption)
      if (selectedOption) {
        applyCustomization(item.subtype, selectedOption.value)
        setShowItemModal(false)
      }
    }
  }

  // Get description of item effect
  const getItemEffectDescription = (item) => {
    if (item.type !== "consumable") return ""

    switch (item.effect) {
      case "energy":
        return `Increases energy by ${item.value} points.`
      case "health":
        return `Increases health by ${item.value} points.`
      case "happiness":
        return `Increases happiness by ${item.value} points.`
      case "intelligence":
        return `Increases intelligence by ${item.value} points.`
      case "exp":
        return `Increases experience by ${item.value} points.`
      case "random":
        return `Has a random effect with a value around ${item.value} points.`
      default:
        return "Has an unknown effect."
    }
  }

  // Handle gift item to another player (placeholder functionality)
  const handleGiftItem = (item) => {
    setConfirmAction({
      title: `Gift ${item.name}?`,
      description: "This feature is coming soon! You'll be able to gift items to other players.",
      confirmText: "OK",
      cancelText: "Cancel",
      onConfirm: () => {
        setShowConfirmModal(false)
      },
    })
    setShowConfirmModal(true)
  }

  // Handle selling an item
  const handleSellItem = (item) => {
    const sellValue = Math.floor(item.value / 2) // Sell for half the value

    setConfirmAction({
      title: `Sell ${item.name}?`,
      description: `You will receive ${sellValue} coins. This action cannot be undone.`,
      confirmText: "Sell",
      cancelText: "Cancel",
      onConfirm: () => {
        // Add coins
        setCoins(coins + sellValue)

        // Remove the item (this would need to be implemented in the store)
        if (item.type === "consumable") {
          window.dispatchEvent(
            new CustomEvent("sellItem", {
              detail: {
                id: item.id,
                type: "consumable",
              },
            }),
          )
        } else if (item.type === "collectible") {
          window.dispatchEvent(
            new CustomEvent("sellItem", {
              detail: {
                id: item.id,
                type: "collectible",
              },
            }),
          )
        }

        setShowConfirmModal(false)
        setShowItemModal(false)
      },
    })
    setShowConfirmModal(true)
  }

  // Animation variants
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
          <Package className="w-5 h-5 mr-2 text-white" />
          Inventory
        </h3>
        <Badge variant="outline" className="bg-black border border-white/20 text-white px-3 py-1">
          <Coins className="w-4 h-4 mr-1" /> {coins} coins
        </Badge>
      </div>

      {/* Tabs for inventory categories */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-black/40">
          <TabsTrigger value="all" className="data-[state=active]:bg-white/10">
            All
          </TabsTrigger>
          <TabsTrigger value="consumable" className="data-[state=active]:bg-white/10">
            Items
          </TabsTrigger>
          <TabsTrigger value="collectible" className="data-[state=active]:bg-white/10">
            Collectibles
          </TabsTrigger>
          <TabsTrigger value="customization" className="data-[state=active]:bg-white/10">
            Customizations
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
          <Input
            placeholder="Search inventory..."
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
                <span>All Rarities</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="uncommon">Uncommon</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
              <SelectItem value="mythic">Mythic</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] bg-black border-white/10 text-white h-10">
              <div className="flex items-center">
                <ArrowUpDown className="h-4 w-4 mr-2 text-white/70" />
                <span>Recent</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black border-white/20">
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="rarity">Rarity</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="value">Value</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Inventory grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredItems.map((inventoryItem) => (
          <motion.div
            key={`${inventoryItem.type}-${inventoryItem.id}`}
            variants={item}
            className={`inventory-item border rounded-lg overflow-hidden bg-black ${getRarityColorClass(
              inventoryItem.rarity,
            )} h-[120px] flex flex-col relative`}
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => {
              // Set the viewing item with a default selected option for customizations
              if (inventoryItem.type === "customization") {
                setViewingItem({
                  ...inventoryItem,
                  selectedOption: inventoryItem.currentValue,
                })
              } else {
                setViewingItem(inventoryItem)
              }
              setItemType(inventoryItem.type)
              setShowItemModal(true)
            }}
          >
            {renderRarityStars(inventoryItem.rarity)}
            <div className="p-4 flex items-center h-full">
              <div className="bg-black/30 p-3 rounded-full mr-3 flex-shrink-0">{getItemIcon(inventoryItem)}</div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-white text-lg truncate">{inventoryItem.name}</h4>
                <div className="flex items-center flex-wrap gap-1 mt-1">
                  <Badge className="bg-white/10 text-white border-0 capitalize text-xs">{inventoryItem.rarity}</Badge>
                  <Badge className="bg-white/10 text-white border-0 capitalize text-xs">
                    {inventoryItem.type === "consumable"
                      ? `x${inventoryItem.count}`
                      : inventoryItem.type.charAt(0).toUpperCase() + inventoryItem.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-white/60">
          <Package className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Item detail modal */}
      <Dialog open={showItemModal} onOpenChange={setShowItemModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-md">
          {viewingItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  {getItemIcon(viewingItem)}
                  <span className="ml-2">{viewingItem.name}</span>
                </DialogTitle>
                <DialogDescription className="text-white/70">
                  {viewingItem.type === "consumable" ? getItemEffectDescription(viewingItem) : viewingItem.description}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`${getRarityColorClass(viewingItem.rarity)} text-white`}>
                    {viewingItem.rarity.charAt(0).toUpperCase() + viewingItem.rarity.slice(1)}
                  </Badge>
                  {viewingItem.type === "consumable" && (
                    <Badge className="bg-white/10 text-white">Quantity: {viewingItem.count}</Badge>
                  )}
                </div>

                {/* Customization options */}
                {viewingItem.type === "customization" && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-white">Options</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {viewingItem.options.map((option) => (
                        <Button
                          key={option.id}
                          variant="outline"
                          className={`border-white/20 ${
                            viewingItem.selectedOption === option.value
                              ? "bg-white/20 text-white"
                              : "bg-black/50 text-white/70"
                          }`}
                          onClick={() => {
                            setViewingItem({
                              ...viewingItem,
                              selectedOption: option.value,
                            })
                          }}
                        >
                          {option.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Item details */}
                <div className="mt-4 space-y-2 bg-white/5 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-white/70">Type:</span>
                    <span className="text-white">
                      {viewingItem.type.charAt(0).toUpperCase() + viewingItem.type.slice(1)}
                    </span>
                  </div>
                  {viewingItem.type === "consumable" && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Effect:</span>
                      <span className="text-white">
                        {viewingItem.effect.charAt(0).toUpperCase() + viewingItem.effect.slice(1)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-white/70">Value:</span>
                    <span className="text-white">{viewingItem.value} coins</span>
                  </div>
                  {viewingItem.obtainedDate && (
                    <div className="flex justify-between">
                      <span className="text-white/70">Obtained:</span>
                      <span className="text-white">{new Date(viewingItem.obtainedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                {viewingItem.type === "consumable" && (
                  <Button
                    onClick={() => handleUseItem(viewingItem)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Use
                  </Button>
                )}
                {viewingItem.type === "customization" && (
                  <Button
                    onClick={() => handleUseItem(viewingItem)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    <Wand className="h-4 w-4 mr-2" />
                    Apply
                  </Button>
                )}
                {(viewingItem.type === "consumable" || viewingItem.type === "collectible") && (
                  <Button
                    onClick={() => handleGiftItem(viewingItem)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Gift
                  </Button>
                )}
                {(viewingItem.type === "consumable" || viewingItem.type === "collectible") && (
                  <Button
                    onClick={() => handleSellItem(viewingItem)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Sell
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-sm">
          {confirmAction && (
            <>
              <DialogHeader>
                <DialogTitle>{confirmAction.title}</DialogTitle>
                <DialogDescription className="text-white/70">{confirmAction.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmModal(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {confirmAction.cancelText}
                </Button>
                <Button
                  onClick={confirmAction.onConfirm}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  {confirmAction.confirmText}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
