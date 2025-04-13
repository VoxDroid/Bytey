"use client"

import { usePetStore } from "@/lib/pet-store"
import { Button } from "@/components/ui/button"

interface InventoryPanelProps {
  onUseItem: (itemId: number) => void
}

export default function InventoryPanel({ onUseItem }: InventoryPanelProps) {
  const { items, coins } = usePetStore()

  return (
    <div className="w-full mb-4 p-3 bg-card rounded shadow-sm animate-fadeIn">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Your Items</h3>
        <span className="text-sm text-muted-foreground">{coins} coins</span>
      </div>

      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-muted/50 rounded hover:bg-muted transition-colors"
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">{item.icon}</span>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.effect === "energy" && `+${item.value} Energy`}
                    {item.effect === "health" && `+${item.value} Health`}
                    {item.effect === "exp" && `+${item.value} XP`}
                    {item.effect === "random" && "Random effect"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-sm">x{item.count}</span>
                <Button onClick={() => onUseItem(item.id)} size="sm" variant="secondary">
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-4">No items in inventory</div>
      )}

      <div className="mt-4 pt-2 border-t">
        <h3 className="font-bold mb-2">Shop (Coming Soon)</h3>
        <div className="text-sm text-muted-foreground">Earn coins by coding to buy items for your pet!</div>
      </div>
    </div>
  )
}
