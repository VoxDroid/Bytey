import Link from "next/link"
import { Code, Github, Twitter, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1 rounded-md">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">CodePet</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your virtual coding companion that grows as you code and helps you build better habits.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} CodePet. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <div className="text-xs text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by CodePet Team
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
