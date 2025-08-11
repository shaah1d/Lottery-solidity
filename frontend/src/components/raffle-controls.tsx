"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Dice5, RefreshCw, Trophy, Users, LinkIcon } from "lucide-react"
import { InfoTile } from "./info-tile"
import { pressStart } from "@/lib/fonts"

type Props = {
  entranceFee: string | null
  contractAddress: string
  pending: string | null
  canTransact: boolean
  onEnter: () => void
  onLoadPlayers: () => void
  onGetWinner: () => void
  onPerformUpkeep: () => void
}

export function RaffleControls({
  entranceFee,
  contractAddress,
  pending,
  canTransact,
  onEnter,
  onLoadPlayers,
  onGetWinner,
  onPerformUpkeep,
}: Props) {
  return (
    <Card className="col-span-1 md:col-span-3 rounded-none border-2 border-fuchsia-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_28px_rgba(255,0,204,0.3)]">
      <CardHeader className="border-b border-fuchsia-500/30">
        <CardTitle className={`${pressStart.className} text-fuchsia-300 text-base sm:text-lg`}>
          Raffle Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            onClick={onEnter}
            disabled={!canTransact || !contractAddress || pending === "enter"}
            className="rounded-none border-2 border-rose-400 bg-rose-500 text-black font-bold tracking-widest hover:bg-rose-400 shadow-[0_0_20px_rgba(255,64,129,0.6)]"
          >
            <Coins className="mr-2 h-4 w-4" />
            Enter {entranceFee ? `(${Number(entranceFee).toFixed(4)} ETH)` : ""}
          </Button>

          <Button
            variant="outline"
            onClick={onLoadPlayers}
            disabled={!contractAddress || pending === "players"}
            className="rounded-none border-2 border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black font-bold tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.5)] bg-transparent"
          >
            <Users className="mr-2 h-4 w-4" />
            Get Players
          </Button>

          <Button
            variant="outline"
            onClick={onGetWinner}
            disabled={!contractAddress || pending === "winner"}
            className="rounded-none border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black font-bold tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.5)] bg-transparent"
          >
            <Trophy className="mr-2 h-4 w-4" />
            Get Winner
          </Button>

          <Button
            variant="outline"
            onClick={onPerformUpkeep}
            disabled={!canTransact || !contractAddress || pending === "upkeep"}
            className="rounded-none border-2 border-amber-300 text-amber-200 hover:bg-amber-300 hover:text-black font-bold tracking-widest shadow-[0_0_20px_rgba(252,211,77,0.5)] bg-transparent"
          >
            <Dice5 className="mr-2 h-4 w-4" />
            Pick Winner
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoTile
            icon={<RefreshCw className="h-4 w-4" />}
            label="Entrance Fee"
            value={entranceFee ? `${entranceFee} ETH` : "Loading..."}
            accent="from-fuchsia-500/40 to-fuchsia-700/30"
          />
          <InfoTile
            icon={<LinkIcon className="h-4 w-4" />}
            label="Contract"
            value={contractAddress ? `${contractAddress.slice(0, 10)}…${contractAddress.slice(-8)}` : "Not set"}
            copyValue={contractAddress}
            accent="from-rose-500/40 to-rose-700/30"
          />
        </div>
      </CardContent>
    </Card>
  )
}
