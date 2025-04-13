"use client"

import { usePetStore } from "@/lib/pet-store"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Github, X, Volume2, Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

interface SettingsPanelProps {
  onClose: () => void
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { petName, setPetName, resetPetProgress } = usePetStore()
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pet-name">Pet Name</Label>
          <Input id="pet-name" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full" />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sound-effects" className="flex items-center cursor-pointer">
            <Volume2 size={16} className="mr-2" />
            Sound Effects
          </Label>
          <Switch id="sound-effects" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="flex items-center cursor-pointer">
            <Bell size={16} className="mr-2" />
            Notifications
          </Label>
          <Switch id="notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <Label className="flex items-center">
            {theme === "dark" ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
            Theme
          </Label>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant={theme === "light" ? "default" : "outline"} onClick={() => setTheme("light")}>
              Light
            </Button>
            <Button size="sm" variant={theme === "dark" ? "default" : "outline"} onClick={() => setTheme("dark")}>
              Dark
            </Button>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label>GitHub Integration</Label>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <Github size={16} />
            Connect GitHub
          </Button>
          <p className="text-xs text-muted-foreground">Connect your GitHub account to earn XP from your commits</p>
        </div>

        <div className="pt-3 border-t mt-3">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => {
              if (confirm("Are you sure you want to reset your pet's progress? This cannot be undone.")) {
                resetPetProgress()
                onClose()
              }
            }}
          >
            Reset Pet Progress
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
