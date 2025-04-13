import { usePetStore } from "@/lib/pet-store"
import { Trophy, Lock } from "lucide-react"

export default function AchievementsPanel() {
  const { achievements } = usePetStore()

  return (
    <div className="w-full mb-4 p-3 bg-card rounded shadow-sm animate-fadeIn">
      <h3 className="font-bold mb-2">Achievements</h3>

      <div className="space-y-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-2 rounded flex items-center ${
              achievement.unlocked ? "bg-primary/10" : "bg-muted/50 opacity-70"
            }`}
          >
            <div className={`mr-3 rounded-full p-1 ${achievement.unlocked ? "bg-primary" : "bg-muted-foreground"}`}>
              {achievement.unlocked ? (
                <Trophy size={16} className="text-primary-foreground" />
              ) : (
                <Lock size={16} className="text-muted" />
              )}
            </div>
            <div>
              <div className="font-medium">{achievement.name}</div>
              <div className="text-xs text-muted-foreground">{achievement.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
