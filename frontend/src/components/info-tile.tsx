"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

type Props = {
  icon?: React.ReactNode
  label?: string
  value?: string
  copyValue?: string
  accent?: string
}

export function InfoTile({
  icon,
  label = "Label",
  value = "-",
  copyValue,
  accent = "from-fuchsia-500/30 to-fuchsia-700/20",
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-none border-2 border-white/10 bg-black/50 p-3">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-20`} />
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-white/70">{icon}</span>
          <span className="text-xs uppercase tracking-widest text-white/60">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-white/90">{value}</span>
          {copyValue ? (
            <Button
              size="sm"
              variant="ghost"
              className="h-7 rounded-none text-white/80 hover:bg-white/10"
              onClick={() => navigator.clipboard.writeText(copyValue)}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">Copy</span>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
