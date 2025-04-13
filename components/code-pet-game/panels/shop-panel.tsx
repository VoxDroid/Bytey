"use client"

import { usePetStore } from "@/lib/pet-store"
import { Button } from "@/components/ui/button"
import { ShoppingBag, AlertCircle, Battery, Heart, Smile, Brain, Zap, Dices } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShopPanelProps {
  buyItem: (item: any) => void
}

export default function ShopPanel({ buyItem }: ShopPanelProps) {
  const { coins } = usePetStore()
  const { toast } = useToast()

  const itemsForSale = [
    { id: 1, name: "Energy Drink", effect: "energy", value: 30, price: 50 },
    { id: 2, name: "Health Potion", effect: "health", value: 40, price: 60 },
    { id: 3, name: "Happy Treat", effect: "happiness", value: 35, price: 45 },
    { id: 4, name: "Brain Book", effect: "intelligence", value: 25, price: 70 },
    { id: 5, name: "XP Boost", effect: "exp", value: 50, price: 100 },
    { id: 6, name: "Mystery Box", effect: "random", value: 20, price: 80 },
  ]

  const customizations = [
    { id: 101, name: "White Color", type: "color", value: "#ffffff" },
    { id: 102, name: "Light Gray", type: "color", value: "#cccccc" },
    { id: 103, name: "Dark Gray", type: "color", value: "#666666" },
    { id: 104, name: "Black Color", type: "color", value: "#000000" },
    { id: 105, name: "Party Hat", type: "accessory", value: "hat", price: 200 },
    { id: 106, name: "Cool Glasses", type: "accessory", value: "glasses", price: 150 },
    { id: 107, name: "Bow Tie", type: "accessory", value: "bowtie", price: 180 },
  ]

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
          <ShoppingBag className="w-4 h-4 mr-2" />
          Shop
        </h3>
        <span className="text-sm font-medium bg-primary/20 px-2 py-1 rounded-full">{coins} coins</span>
      </div>

      <Tabs defaultValue="items">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="items">Items</TabsTrigger>
          <TabsTrigger value="customizations">Customizations</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <motion.div className="grid grid-cols-2 gap-2 mt-4" variants={container} initial="hidden" animate="show">
            {itemsForSale.map((shopItem) => (
              <motion.div
                key={shopItem.id}
                variants={item}
                className="flex flex-col p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <span className="bg-background/30 w-8 h-8 flex items-center justify-center rounded-full">
                    {shopItem.effect === "energy" && <Battery className="h-4 w-4" />}
                    {shopItem.effect === "health" && <Heart className="h-4 w-4" />}
                    {shopItem.effect === "happiness" && <Smile className="h-4 w-4" />}
                    {shopItem.effect === "intelligence" && <Brain className="h-4 w-4" />}
                    {shopItem.effect === "exp" && <Zap className="h-4 w-4" />}
                    {shopItem.effect === "random" && <Dices className="h-4 w-4" />}
                  </span>
                  <div className="flex-1 overflow-hidden ml-2">
                    <div className="font-medium text-sm truncate">{shopItem.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {shopItem.effect === "energy" && `+${shopItem.value} Energy`}
                      {shopItem.effect === "health" && `+${shopItem.value} Health`}
                      {shopItem.effect === "happiness" && `+${shopItem.value} Happiness`}
                      {shopItem.effect === "intelligence" && `+${shopItem.value} Intelligence`}
                      {shopItem.effect === "exp" && `+${shopItem.value} XP`}
                      {shopItem.effect === "random" && "Random effect"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium">{shopItem.price} coins</span>
                  <Button
                    onClick={() => buyItem(shopItem)}
                    size="sm"
                    variant="secondary"
                    disabled={coins < shopItem.price}
                  >
                    Buy
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="customizations">
          <motion.div className="grid grid-cols-2 gap-2 mt-4" variants={container} initial="hidden" animate="show">
            {customizations.map((customItem) => (
              <motion.div
                key={customItem.id}
                variants={item}
                className="flex flex-col p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <span
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: customItem.type === "color" ? customItem.value : "rgba(255, 255, 255, 0.2)",
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {customItem.type === "accessory" &&
                      (customItem.value === "hat"
                        ? "H"
                        : customItem.value === "glasses"
                          ? "G"
                          : customItem.value === "bowtie"
                            ? "B"
                            : "")}
                  </span>
                  <div className="flex-1 overflow-hidden ml-2">
                    <div className="font-medium text-sm truncate">{customItem.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {customItem.type === "color" && "Pet color"}
                      {customItem.type === "accessory" && "Pet accessory"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  {customItem.price ? (
                    <>
                      <span className="text-sm font-medium">{customItem.price} coins</span>
                      <Button
                        onClick={() => buyItem(customItem)}
                        size="sm"
                        variant="secondary"
                        disabled={coins < (customItem.price || 0)}
                      >
                        Buy
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="text-sm font-medium">Free</span>
                      <Button onClick={() => buyItem(customItem)} size="sm" variant="secondary">
                        Apply
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>

      {coins < 50 && (
        <div className="flex items-center p-3 bg-primary/10 rounded-lg mt-4">
          <AlertCircle className="w-5 h-5 mr-2" />
          <p className="text-sm">Complete daily tasks to earn more coins!</p>
        </div>
      )}
    </div>
  )
}
