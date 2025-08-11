"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Ticket, PlugZap, Wallet, Info, Star } from "lucide-react"
import { pressStart } from "@/lib/fonts"
import { shortAddress } from "@/lib/address"
import { GITHUB_REPO_URL } from "@/lib/env"

type Props = {
  account: string | null
  onConnect: () => void
  connecting?: boolean
}

export function BrandHeader({ account, onConnect, connecting }: Props) {
  return (
    <header className="mb-8 md:mb-12 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Ticket className="h-8 w-8 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(255,0,204,0.8)]" />
        <h1
          className={`${pressStart.className} text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-rose-400 to-lime-400 drop-shadow-[0_0_18px_rgba(255,0,204,0.6)]`}
        >
          Decentralized Raffle Arcade
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-cyan-300 text-cyan-200 hover:bg-cyan-300 hover:text-black font-bold tracking-widest bg-transparent shadow-[0_0_18px_rgba(34,211,238,0.35)]"
          title="How it works"
        >
          <Link href="/raffle/how-it-works">
            <Info className="mr-2 h-4 w-4" />
            How it works
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="rounded-none border-2 border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black font-bold tracking-widest bg-transparent shadow-[0_0_18px_rgba(253,224,71,0.35)]"
          title="Star the GitHub repo"
        >
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
            <Star className="mr-2 h-4 w-4" />
            Star on GitHub
          </a>
        </Button>

        {account ? (
          <Badge className="rounded-none border-2 border-lime-400/60 bg-black/60 text-lime-300 shadow-[0_0_14px_rgba(57,255,20,0.5)]">
            <PlugZap className="mr-2 h-4 w-4" />
            {shortAddress(account, 6, 4)}
          </Badge>
        ) : (
          <Button
            onClick={onConnect}
            disabled={connecting}
            className="rounded-none border-2 border-fuchsia-400 bg-fuchsia-600 text-black font-bold tracking-widest hover:bg-fuchsia-500 shadow-[0_0_20px_rgba(255,0,204,0.5)]"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect
          </Button>
        )}
      </div>
    </header>
  )
}
