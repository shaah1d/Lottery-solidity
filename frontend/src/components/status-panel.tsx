"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Trophy } from "lucide-react"
import { pressStart } from "@/lib/fonts"
import { shortAddress } from "@/lib/address"

type Props = {
  status: string
  winner: string | null
}

export function StatusPanel({ status, winner }: Props) {
  return (
    <Card className="col-span-1 md:col-span-3 rounded-none border-2 border-lime-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_28px_rgba(57,255,20,0.3)]">
      <CardHeader className="border-b border-lime-500/30">
        <CardTitle className={`${pressStart.className} text-lime-300 text-base sm:text-lg`}>Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-lime-400 shadow-[0_0_10px_rgba(57,255,20,0.8)]" />
          <p className="text-sm text-white/90">{status}</p>
        </div>
        <div className="mt-4">
          {winner ? (
            <div className="inline-flex items-center rounded-none border-2 border-lime-400 bg-black/40 px-3 py-2 font-mono text-sm text-lime-200 shadow-[0_0_12px_rgba(57,255,20,0.5)]">
              <Trophy className="mr-2 h-4 w-4" />
              Recent Winner: {shortAddress(winner, 10, 10)}
              <Button
                size="sm"
                variant="ghost"
                className="ml-2 h-7 rounded-none text-lime-300 hover:bg-lime-500/20"
                onClick={() => navigator.clipboard.writeText(winner)}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-white/60">Winner not loaded.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
