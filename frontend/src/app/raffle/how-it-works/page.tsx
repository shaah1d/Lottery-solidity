"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, ShieldCheck, Coins, Users, Trophy, Ticket } from "lucide-react"
import { pressStart } from "@/lib/fonts"
import { GITHUB_REPO_URL } from "@/lib/env"

export default function HowItWorksPage() {
  return (
    <main className="relative min-h-[100dvh] bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,153,0.15)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [background:repeating-linear-gradient(transparent,transparent_14px,rgba(255,0,204,0.15)_15px),linear-gradient(to_top,rgba(108,43,217,0.35),rgba(0,0,0,0))] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 md:py-12">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="h-7 w-7 text-fuchsia-400 drop-shadow-[0_0_10px_rgba(255,0,204,0.8)]" />
            <h1
              className={`${pressStart.className} text-2xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-rose-400 to-lime-400`}
            >
              How it works
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="rounded-none border-2 border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black font-bold tracking-widest bg-transparent"
              title="Star the GitHub repo"
            >
              <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Star className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
            <Button
              asChild
              className="rounded-none border-2 border-fuchsia-400 bg-fuchsia-600 text-black font-bold tracking-widest hover:bg-fuchsia-500"
            >
              <Link href="/raffle">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Raffle
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="rounded-none border-2 border-fuchsia-500/60 bg-black/60 shadow-[0_0_28px_rgba(255,0,204,0.3)]">
            <CardHeader className="border-b border-fuchsia-500/30">
              <CardTitle className={`${pressStart.className} text-fuchsia-300 text-base`}>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-white/85">
              <p className="mb-2">
                Enter a decentralized raffle. Pay the entrance fee, get added to the players list, and when upkeep runs,
                one player is selected as the winner by the smart contract.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge className="rounded-none border-2 border-rose-400/60 bg-black/50 text-rose-200">
                  <Coins className="mr-2 h-3.5 w-3.5" />
                  Pay fee
                </Badge>
                <Badge className="rounded-none border-2 border-purple-400/60 bg-black/50 text-purple-200">
                  <Users className="mr-2 h-3.5 w-3.5" />
                  Join players
                </Badge>
                <Badge className="rounded-none border-2 border-lime-400/60 bg-black/50 text-lime-200">
                  <Trophy className="mr-2 h-3.5 w-3.5" />
                  Win randomly
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none border-2 border-purple-500/60 bg-black/60 shadow-[0_0_28px_rgba(168,85,247,0.3)]">
            <CardHeader className="border-b border-purple-500/30">
              <CardTitle className={`${pressStart.className} text-purple-300 text-base`}>Steps</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-white/85 space-y-2">
              <p>1. Connect your wallet.</p>
              <p>2. Check the Entrance Fee and click Enter.</p>
              <p>3. View entrants under Players.</p>
              <p>4. When upkeep is executed, a winner is picked and shown in Status.</p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-2 border-lime-500/60 bg-black/60 shadow-[0_0_28px_rgba(57,255,20,0.3)]">
            <CardHeader className="border-b border-lime-500/30">
              <CardTitle className={`${pressStart.className} text-lime-300 text-base`}>Safety</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-white/85 space-y-2">
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-lime-300" />
                Verify the contract address and chain before sending funds.
              </p>
              <p className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-lime-300" />
                Transactions require gas; ensure you have ETH on Sepolia.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-2 border-rose-500/60 bg-black/60 shadow-[0_0_28px_rgba(255,0,128,0.3)]">
            <CardHeader className="border-b border-rose-500/30">
              <CardTitle className={`${pressStart.className} text-rose-300 text-base`}>Support</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-white/85 space-y-2">
              <p>Questions or improvements? Open an issue or star the repo to support development.</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-none border-2 border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-black font-bold tracking-widest bg-transparent"
                >
                  <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
                    <Star className="mr-2 h-4 w-4" />
                    Star on GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  className="rounded-none border-2 border-fuchsia-400 bg-fuchsia-600 text-black font-bold tracking-widest hover:bg-fuchsia-500"
                >
                  <Link href="/raffle">Back to Raffle</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
