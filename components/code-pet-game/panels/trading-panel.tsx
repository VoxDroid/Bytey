"use client"

import { usePetStore } from "@/lib/pet-store"
import { ArrowLeftRight, Clock, Check, X, AlertCircle, Plus, Search, Filter, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TradingPanel() {
  const { tradeOffers, collectibles, updateTradeOfferStatus, addTradeOffer } = usePetStore()
  const [activeTab, setActiveTab] = useState("offers")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [showCreateOffer, setShowCreateOffer] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedCollectibles, setSelectedCollectibles] = useState([])
  const [requestedCollectibles, setRequestedCollectibles] = useState([])

  // Filter trade offers based on current filters
  const filteredOffers = tradeOffers
    .filter((offer) => {
      // Filter by status
      if (filter === "pending" && offer.status !== "pending") return false
      if (filter === "completed" && offer.status === "pending") return false

      // Filter by search term
      if (search && !offer.fromUser.toLowerCase().includes(search.toLowerCase())) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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

  // Format date to relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHour = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHour / 24)

    if (diffSec < 60) return `${diffSec} seconds ago`
    if (diffMin < 60) return `${diffMin} minutes ago`
    if (diffHour < 24) return `${diffHour} hours ago`
    return `${diffDay} days ago`
  }

  // Format expiry time
  const formatExpiryTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()

    if (diffMs <= 0) return "Expired"

    const diffSec = Math.round(diffMs / 1000)
    const diffMin = Math.round(diffSec / 60)
    const diffHour = Math.round(diffMin / 60)
    const diffDay = Math.round(diffHour / 24)

    if (diffSec < 60) return `${diffSec} seconds left`
    if (diffMin < 60) return `${diffMin} minutes left`
    if (diffHour < 24) return `${diffHour} hours left`
    return `${diffDay} days left`
  }

  // Handle trade offer response
  const handleTradeResponse = (offerId, status) => {
    updateTradeOfferStatus(offerId, status)
  }

  // Toggle collectible selection for creating offers
  const toggleCollectibleSelection = (collectible, isRequest = false) => {
    if (isRequest) {
      if (requestedCollectibles.some((c) => c.id === collectible.id)) {
        setRequestedCollectibles(requestedCollectibles.filter((c) => c.id !== collectible.id))
      } else {
        setRequestedCollectibles([...requestedCollectibles, collectible])
      }
    } else {
      if (selectedCollectibles.some((c) => c.id === collectible.id)) {
        setSelectedCollectibles(selectedCollectibles.filter((c) => c.id !== collectible.id))
      } else {
        setSelectedCollectibles([...selectedCollectibles, collectible])
      }
    }
  }

  // Create new trade offer
  const createTradeOffer = () => {
    if (selectedCollectibles.length === 0 || requestedCollectibles.length === 0) {
      return
    }

    const newOffer = {
      id: Date.now(),
      fromUser: "You",
      offerItems: selectedCollectibles,
      requestItems: requestedCollectibles,
      status: "pending",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
    }

    addTradeOffer(newOffer)
    setSelectedCollectibles([])
    setRequestedCollectibles([])
    setShowCreateOffer(false)
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
      <div className="flex justify-between items-center">
        <h3 className="font-medium flex items-center text-white">
          <ArrowLeftRight className="w-4 h-4 mr-2 text-blue-400" />
          Trading Hub
        </h3>
        <Button size="sm" onClick={() => setShowCreateOffer(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-1" /> New Trade
        </Button>
      </div>

      <Tabs defaultValue="offers" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 bg-black/40">
          <TabsTrigger value="offers" className="data-[state=active]:bg-blue-900/50">
            Trade Offers
          </TabsTrigger>
          <TabsTrigger value="your" className="data-[state=active]:bg-blue-900/50">
            Your Trades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="offers" className="mt-4 space-y-4">
          {/* Filters and search */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search traders..."
                className="pl-8 bg-black/20 border-white/10 text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[130px] bg-black/20 border-white/10 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offers</SelectItem>
                <SelectItem value="pending">Pending Only</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Trade offers list */}
          <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
            {filteredOffers
              .filter((offer) => offer.fromUser !== "You")
              .map((offer) => (
                <motion.div
                  key={offer.id}
                  variants={item}
                  className={`trade-offer p-4 rounded-lg border ${
                    offer.status === "pending"
                      ? "border-blue-500/30 bg-blue-900/20"
                      : offer.status === "accepted"
                        ? "border-green-500/30 bg-green-900/20"
                        : "border-red-500/30 bg-red-900/20"
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-white">{offer.fromUser}</h4>
                        <Badge
                          className={`ml-2 ${
                            offer.status === "pending"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : offer.status === "accepted"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-white/60 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatRelativeTime(offer.createdAt)}</span>
                        {/*  />
                      <span>{formatRelativeTime(offer.createdAt)}</span> */}
                        {offer.status === "pending" && (
                          <span className="ml-2 text-yellow-400">{formatExpiryTime(offer.expiresAt)}</span>
                        )}
                      </div>
                    </div>

                    {offer.status === "pending" && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 bg-green-900/20 border-green-500/30 hover:bg-green-900/40 text-green-400"
                          onClick={() => handleTradeResponse(offer.id, "accepted")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 bg-red-900/20 border-red-500/30 hover:bg-red-900/40 text-red-400"
                          onClick={() => handleTradeResponse(offer.id, "rejected")}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-white/80 mb-2">They Offer:</h5>
                      <div className="space-y-2">
                        {offer.offerItems.map((item) => (
                          <div key={item.id} className="flex items-center bg-black/30 p-2 rounded">
                            <div className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(item.rarity)}`}></div>
                            <span className="text-sm text-white">{item.name}</span>
                            <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                              {item.rarity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/20 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-white/80 mb-2">They Want:</h5>
                      <div className="space-y-2">
                        {offer.requestItems.map((item) => (
                          <div key={item.id} className="flex items-center bg-black/30 p-2 rounded">
                            <div className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(item.rarity)}`}></div>
                            <span className="text-sm text-white">{item.name}</span>
                            <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                              {item.rarity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-6 w-6 text-blue-400 trade-arrow" />
                  </div>
                </motion.div>
              ))}

            {filteredOffers.filter((offer) => offer.fromUser !== "You").length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-white/60">
                <AlertCircle className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-lg font-medium">No trade offers found</p>
                <p className="text-sm">Check back later or create your own trade</p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="your" className="mt-4 space-y-4">
          <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
            {tradeOffers
              .filter((offer) => offer.fromUser === "You")
              .map((offer) => (
                <motion.div
                  key={offer.id}
                  variants={item}
                  className={`trade-offer p-4 rounded-lg border ${
                    offer.status === "pending"
                      ? "border-blue-500/30 bg-blue-900/20"
                      : offer.status === "accepted"
                        ? "border-green-500/30 bg-green-900/20"
                        : "border-red-500/30 bg-red-900/20"
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-bold text-white">Your Offer</h4>
                        <Badge
                          className={`ml-2 ${
                            offer.status === "pending"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : offer.status === "accepted"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-white/60 mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatRelativeTime(offer.createdAt)}</span>
                        {offer.status === "pending" && (
                          <span className="ml-2 text-yellow-400">{formatExpiryTime(offer.expiresAt)}</span>
                        )}
                      </div>
                    </div>

                    {offer.status === "pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 p-1 bg-red-900/20 border-red-500/30 hover:bg-red-900/40 text-red-400"
                        onClick={() => handleTradeResponse(offer.id, "expired")}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-white/80 mb-2">You Offer:</h5>
                      <div className="space-y-2">
                        {offer.offerItems.map((item) => (
                          <div key={item.id} className="flex items-center bg-black/30 p-2 rounded">
                            <div className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(item.rarity)}`}></div>
                            <span className="text-sm text-white">{item.name}</span>
                            <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                              {item.rarity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/20 p-3 rounded-lg">
                      <h5 className="text-sm font-medium text-white/80 mb-2">You Want:</h5>
                      <div className="space-y-2">
                        {offer.requestItems.map((item) => (
                          <div key={item.id} className="flex items-center bg-black/30 p-2 rounded">
                            <div className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(item.rarity)}`}></div>
                            <span className="text-sm text-white">{item.name}</span>
                            <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                              {item.rarity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <ArrowRight className="h-6 w-6 text-blue-400 trade-arrow" />
                  </div>
                </motion.div>
              ))}

            {tradeOffers.filter((offer) => offer.fromUser === "You").length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-white/60">
                <AlertCircle className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-lg font-medium">You haven't created any trades</p>
                <p className="text-sm">Click the "New Trade" button to get started</p>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Create trade offer dialog */}
      <Dialog open={showCreateOffer} onOpenChange={setShowCreateOffer}>
        <DialogContent className="bg-black/90 border-white/20 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Trade Offer</DialogTitle>
            <DialogDescription className="text-white/70">
              Select items you want to offer and items you want in return
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">Your Offer:</h4>
              <div className="bg-black/40 p-3 rounded-lg border border-white/10 h-[300px] overflow-y-auto custom-scrollbar">
                {collectibles.filter((c) => c.owned && c.tradable).length > 0 ? (
                  <div className="space-y-2">
                    {collectibles
                      .filter((c) => c.owned && c.tradable)
                      .map((collectible) => (
                        <div
                          key={collectible.id}
                          className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                            selectedCollectibles.some((c) => c.id === collectible.id)
                              ? "bg-blue-900/40 border border-blue-500/50"
                              : "bg-black/30 border border-white/10 hover:bg-black/50"
                          }`}
                          onClick={() => toggleCollectibleSelection(collectible)}
                        >
                          <div
                            className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(collectible.rarity)}`}
                          ></div>
                          <span className="text-sm text-white">{collectible.name}</span>
                          <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                            {collectible.rarity}
                          </Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/60">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No tradable items in your collection</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-900/20 p-2 rounded-lg border border-blue-500/30">
                <h5 className="text-sm font-medium text-white mb-2">Selected ({selectedCollectibles.length}):</h5>
                {selectedCollectibles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCollectibles.map((item) => (
                      <Badge
                        key={item.id}
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-white cursor-pointer"
                        onClick={() => toggleCollectibleSelection(item)}
                      >
                        {item.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/60">Select items to offer</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-white">You Want:</h4>
              <div className="bg-black/40 p-3 rounded-lg border border-white/10 h-[300px] overflow-y-auto custom-scrollbar">
                {collectibles.filter((c) => !c.owned && c.tradable).length > 0 ? (
                  <div className="space-y-2">
                    {collectibles
                      .filter((c) => !c.owned && c.tradable)
                      .map((collectible) => (
                        <div
                          key={collectible.id}
                          className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                            requestedCollectibles.some((c) => c.id === collectible.id)
                              ? "bg-green-900/40 border border-green-500/50"
                              : "bg-black/30 border border-white/10 hover:bg-black/50"
                          }`}
                          onClick={() => toggleCollectibleSelection(collectible, true)}
                        >
                          <div
                            className={`h-2 w-2 rounded-full mr-1.5 ${getRarityColorClass(collectible.rarity)}`}
                          ></div>
                          <span className="text-sm text-white">{collectible.name}</span>
                          <Badge className="ml-auto text-xs py-0 h-4 bg-white/10 text-white/70 capitalize">
                            {collectible.rarity}
                          </Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/60">
                    <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No tradable items available</p>
                  </div>
                )}
              </div>

              <div className="bg-green-900/20 p-2 rounded-lg border border-green-500/30">
                <h5 className="text-sm font-medium text-white mb-2">Requested ({requestedCollectibles.length}):</h5>
                {requestedCollectibles.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {requestedCollectibles.map((item) => (
                      <Badge
                        key={item.id}
                        className="bg-green-500/20 hover:bg-green-500/30 text-white cursor-pointer"
                        onClick={() => toggleCollectibleSelection(item, true)}
                      >
                        {item.name} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/60">Select items you want</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreateOffer(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={createTradeOffer}
              disabled={selectedCollectibles.length === 0 || requestedCollectibles.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Trade Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
