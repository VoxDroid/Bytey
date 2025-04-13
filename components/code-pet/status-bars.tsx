interface StatusBarsProps {
  energy: number
  health: number
}

export default function StatusBars({ energy, health }: StatusBarsProps) {
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between text-xs mb-1">
        <span>Energy</span>
        <span>{energy}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-2">
        <div
          className="bg-amber-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${energy}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs mb-1">
        <span>Health</span>
        <span>{health}/100</span>
      </div>
      <div className="w-full bg-muted rounded-full h-3 mb-2">
        <div
          className="bg-destructive h-3 rounded-full transition-all duration-500"
          style={{ width: `${health}%` }}
        ></div>
      </div>
    </div>
  )
}
