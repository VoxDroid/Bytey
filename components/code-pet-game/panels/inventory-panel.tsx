"use client"

import { usePetStore } from "@/lib/pet-store"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Package, Search, Battery, Heart, Smile, Brain, Zap, Dices } from "lucide-react"

interface InventoryPanelProps {
  useItem: (itemId: number) => void
}

export default function InventoryPanel({ useItem }: InventoryPanelProps) {
  const { items, coins } = usePetStore()

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
        <h3 className="font-medium flex items-center">
          <Package className="w-4 h-4 mr-2" />
          Your Items
        </h3>
        <span className="text-sm text-muted-foreground">{coins} coins</span>
      </div>

      {items.length > 0 ? (
        <motion.div className="space-y-2" variants={container} initial="hidden" animate="show">
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={item}
              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <span className="bg-background/30 w-10 h-10 flex items-center justify-center rounded-full">
                  {item.effect === "energy" && <Battery className="h-5 w-5" />}
                  {item.effect === "health" && <Heart className="h-5 w-5" />}
                  {item.effect === "happiness" && <Smile className="h-5 w-5" />}
                  {item.effect === "intelligence" && <Brain className="h-5 w-5" />}
                  {item.effect === "exp" && <Zap className="h-5 w-5" />}
                  {item.effect === "random" && <Dices className="h-5 w-5" />}
                </span>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.effect === "energy" && `+${item.value} Energy`}
                    {item.effect === "health" && `+${item.value} Health`}
                    {item.effect === "happiness" && `+${item.value} Happiness`}
                    {item.effect === "intelligence" && `+${item.value} Intelligence`}
                    {item.effect === "exp" && `+${item.value} XP`}
                    {item.effect === "random" && "Random effect"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-sm bg-background/30 px-2 py-1 rounded-full">x{item.count}</span>
                <Button onClick={() => useItem(item.id)} size="sm" variant="secondary">
                  Use
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          <Search className="w-12 h-12 mb-2 opacity-50" />
          <p>No items in inventory</p>
          <p className="text-xs mt-1">Visit the shop to buy items!</p>
        </div>
      )}
    </div>
  )
}
