"use client"

import { usePetStore } from "@/lib/pet-store"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function SettingsPanel() {
  const { petName, setPetName } = usePetStore()

  return (
    <div className="w-full mb-4 p-3 bg-card rounded shadow-sm animate-fadeIn">
      <h3 className="font-bold mb-2">Settings</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pet-name">Pet Name</Label>
          <Input id="pet-name" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="cursor-pointer">
            Notification Sounds
          </Label>
          <Switch id="notifications" defaultChecked />
        </div>

        <div className="space-y-2">
          <Label>GitHub Integration</Label>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Github size={16} />
            Connect GitHub
          </Button>
        </div>

        <div className="pt-3 border-t mt-3">
          <Button variant="destructive" size="sm" className="w-full">
            Reset Pet Progress
          </Button>
        </div>
      </div>
    </div>
  )
}
