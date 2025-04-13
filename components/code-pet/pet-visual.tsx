import { Code } from "lucide-react"
import { cn } from "@/lib/utils"

interface PetVisualProps {
  mood: string
  level: number
  petForm: string
  isAnimating: boolean
  bounceEffect: boolean
}

export default function PetVisual({ mood, level, petForm, isAnimating, bounceEffect }: PetVisualProps) {
  // Pet appearance changes based on level, mood, and form
  const getPetSize = () => {
    return {
      width: 120 + level * 10,
      height: 120 + level * 10,
    }
  }

  const getPetColor = () => {
    const colors = {
      happy: "hsl(var(--primary))",
      neutral: "hsl(var(--primary) / 0.8)",
      tired: "hsl(var(--primary) / 0.6)",
      excited: "hsl(var(--primary) / 1)",
    }
    return colors[mood] || colors.happy
  }

  // Pet form rendering
  const renderPetForm = () => {
    switch (petForm) {
      case "fox":
        return (
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                style={{
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderBottom: `40px solid ${getPetColor()}`,
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  transform: "rotate(-30deg)",
                }}
              ></div>
              <div
                style={{
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderBottom: `40px solid ${getPetColor()}`,
                  position: "absolute",
                  top: "-20px",
                  right: "-20px",
                  transform: "rotate(30deg)",
                }}
              ></div>
            </div>
            <Code size={48} className="text-primary-foreground" />
          </div>
        )
      case "robot":
        return (
          <div className="flex flex-col items-center">
            <div
              style={{
                width: "30px",
                height: "15px",
                backgroundColor: "hsl(var(--secondary))",
                position: "absolute",
                top: "-10px",
                borderRadius: "5px",
              }}
            ></div>
            <div className="flex">
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "hsl(var(--destructive))",
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              ></div>
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: "hsl(var(--destructive))",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
            <Code size={48} className="text-primary-foreground" />
          </div>
        )
      case "dragon":
        return (
          <div className="flex flex-col items-center">
            <div
              style={{
                borderLeft: "30px solid transparent",
                borderRight: "30px solid transparent",
                borderBottom: "40px solid hsl(var(--secondary))",
                position: "absolute",
                top: "-25px",
              }}
            ></div>
            <div className="flex">
              <div
                style={{
                  width: "20px",
                  height: "5px",
                  backgroundColor: "hsl(var(--secondary))",
                  position: "absolute",
                  left: "-25px",
                  top: "20px",
                }}
              ></div>
              <div
                style={{
                  width: "20px",
                  height: "5px",
                  backgroundColor: "hsl(var(--secondary))",
                  position: "absolute",
                  right: "-25px",
                  top: "20px",
                }}
              ></div>
            </div>
            <Code size={48} className="text-primary-foreground" />
          </div>
        )
      default: // blob
        return <Code size={48} className="text-primary-foreground" />
    }
  }

  return (
    <div
      className={cn(
        "relative p-4 mb-6 flex items-center justify-center rounded-full transition-all duration-500",
        isAnimating && "animate-pulse",
        bounceEffect && "animate-bounce",
      )}
      style={{
        backgroundColor: getPetColor(),
        width: getPetSize().width,
        height: getPetSize().height,
        boxShadow: `0 0 ${level * 5}px ${getPetColor()}`,
      }}
    >
      {renderPetForm()}

      {/* Expression that changes with mood */}
      <div className="absolute bottom-4 flex">
        {mood === "happy" && <span className="text-2xl text-primary-foreground">^ᴗ^</span>}
        {mood === "neutral" && <span className="text-2xl text-primary-foreground">⊙ᴗ⊙</span>}
        {mood === "tired" && <span className="text-2xl text-primary-foreground">-ᴗ-</span>}
        {mood === "excited" && <span className="text-2xl text-primary-foreground">★ᴗ★</span>}
      </div>

      {/* Level indicator */}
      <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center shadow-md">
        {level}
      </div>
    </div>
  )
}
