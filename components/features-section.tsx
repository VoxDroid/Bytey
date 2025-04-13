import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Zap, Trophy, Clock, Shield, Database } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Everything you need to make coding more enjoyable and productive
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card>
            <CardHeader className="pb-2">
              <Code className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Coding Companion</CardTitle>
              <CardDescription>Your pet grows as you code, motivating you to code more regularly</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your coding sessions, build streaks, and watch your pet evolve with your progress.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Skill System</CardTitle>
              <CardDescription>Unlock special abilities as your pet levels up</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                From auto-debugging to code generation, your pet gains new skills to help you code better.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Trophy className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Complete challenges and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Unlock achievements by hitting coding milestones and completing special tasks.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Clock className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Habit Tracking</CardTitle>
              <CardDescription>Build consistent coding habits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your coding streaks and get reminders to maintain your momentum.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>Connect with your GitHub account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Automatically track your commits and contributions to level up your pet.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Database className="h-6 w-6 mb-2 text-primary" />
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>Visualize your coding journey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get insights into your coding patterns and productivity with detailed analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
