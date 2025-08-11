"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Copy } from "lucide-react"
import { pressStart } from "@/lib/fonts"
import { shortAddress } from "@/lib/address"

type Props = {
  players: string[]
}

export function PlayersPanel({ players }: Props) {
  return (
    <Card className="col-span-1 md:col-span-2 rounded-none border-2 border-purple-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_28px_rgba(168,85,247,0.3)]">
      <CardHeader className="border-b border-purple-500/30">
        <CardTitle className={`${pressStart.className} text-purple-300 text-base sm:text-lg`}>Players</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {players.length === 0 ? (
          <p className="text-sm text-white/70">No players loaded.</p>
        ) : (
          <ScrollArea className="h-56 w-full rounded-none border border-purple-500/20">
            <ol className="divide-y divide-purple-500/10">
              {players.map((p, key) => (
                <li key={key} className="flex items-center justify-between px-3 py-2">
                  <span className="font-mono text-white text-xs md:text-sm">{shortAddress(p, 10, 8)}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 rounded-none text-purple-300 hover:bg-purple-500/20"
                    onClick={() => navigator.clipboard.writeText(p)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </li>
              ))}
            </ol>
          </ScrollArea>
        )}
        <div className="mt-4 flex items-center gap-2">
          <Badge className="rounded-none border-2 border-purple-400/50 bg-black/50 text-purple-200">
            <Users className="mr-2 h-3.5 w-3.5" />
            {players.length} player{players.length === 1 ? "" : "s"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
