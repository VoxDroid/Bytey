import { Clock, Github, Award } from "lucide-react"
import { usePetStore } from "@/lib/pet-store"

export default function StatsPanel() {
  const { streak, level, exp, skills } = usePetStore()

  return (
    <div className="w-full mb-4 p-3 bg-card rounded shadow-sm animate-fadeIn">
      <div className="flex justify-between mb-2">
        <span className="flex items-center">
          <Clock size={16} className="mr-1" /> Coding streak:
        </span>
        <span className="font-semibold">{streak} days</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="flex items-center">
          <Github size={16} className="mr-1" /> Last coding:
        </span>
        <span className="font-semibold">Today</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="flex items-center">
          <Award size={16} className="mr-1" /> Next level at:
        </span>
        <span className="font-semibold">
          {exp}/{level * 20} XP
        </span>
      </div>

      {/* Skills section */}
      <div className="mt-4 border-t pt-2">
        <h3 className="font-bold mb-2">Skills</h3>
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              {skill.icon}
              <span className="ml-1">{skill.name}</span>
            </div>
            {skill.unlocked ? (
              <span className="text-green-500 text-sm">Unlocked</span>
            ) : (
              <span className="text-muted-foreground text-sm">Unlocks at level {skill.level}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
