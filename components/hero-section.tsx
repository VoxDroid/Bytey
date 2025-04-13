import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="py-12 md:py-24 lg:py-32 text-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
              <span className="font-medium text-primary">New Release v1.0</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Meet Your Coding Companion
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              CodePet grows as you code. Build better habits, track your progress, and have fun while coding.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row justify-center">
            <Button size="lg" className="gap-1">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
