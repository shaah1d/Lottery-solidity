"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"
import { pressStart } from "@/lib/fonts"
import { useState } from "react"



type Props = {
  rpcUrl: string
  contractAddress: string
  pending: string | null
  onToggle?: () => void
  onChangeRpc: (v: string) => void
  onChangeContract: (v: string) => void
  onRefreshFee: () => void
  onClearPlayers: () => void
  onClearWinner: () => void
}

export function AdvancedPanel({
  rpcUrl,
  contractAddress,
  pending,
  onChangeRpc,
  onChangeContract,
  onRefreshFee,
  onClearPlayers,
  onClearWinner,
}: Props) {
   const [showAdvanced, setShowAdvanced] = useState(false)
  return (
   <Card className="col-span-1 md:col-span-2 rounded-none border-2 border-rose-500/60 bg-black/60 backdrop-blur-md shadow-[0_0_28px_rgba(255,0,128,0.3)]">
            <CardHeader className="border-b border-rose-500/30">
              <CardTitle className={`${pressStart.className} text-rose-300 text-base sm:text-lg`}>Advanced</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAdvanced((s) => !s)}
                  className="rounded-none border-2 border-rose-400 text-rose-300 hover:bg-rose-400 bg-black hover:text-black font-bold tracking-widest"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {showAdvanced ? "Hide" : "Show"} Controls
                </Button>
              </div>
              {showAdvanced && (
             
        <div className="space-y-3">
          <div className="grid gap-1.5">
            <Label className="text-xs text-white/80">RPC URL</Label>
            <Input
              value={rpcUrl}
              onChange={(e) => onChangeRpc(e.target.value)}
              placeholder="https://ethereum-sepolia.publicnode.com"
              className="rounded-none border-2 border-rose-400 bg-black/60 text-white placeholder:text-white/40"
            />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs text-white/80">Contract Address</Label>
            <Input
              value={contractAddress}
              onChange={(e) => onChangeContract(e.target.value)}
              placeholder="0x..."
              className="rounded-none border-2 border-rose-400 bg-black/60 text-white placeholder:text-white/40"
            />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              onClick={onRefreshFee}
              disabled={!contractAddress || pending === "fee"}
              className="rounded-none border-2 border-fuchsia-400 text-fuchsia-300 hover:bg-fuchsia-400 hover:text-black font-bold tracking-widest bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Fee
            </Button>
            <Button
              variant="outline"
              onClick={onClearPlayers}
              className="rounded-none border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-black font-bold tracking-widest bg-transparent"
            >
              Clear Players
            </Button>
            <Button
              variant="outline"
              onClick={onClearWinner}
              className="rounded-none border-2 border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black font-bold tracking-widest bg-transparent"
            >
              Clear Winner
            </Button>
          </div>
        </div>
     
              )}
            </CardContent>
          </Card>
      

  )
}
