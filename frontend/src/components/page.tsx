"use client"
import { Press_Start_2P } from "next/font/google"
import { Badge } from "@/components/ui/badge"
import { Wallet, PlugZap } from "lucide-react"
import { BrandHeader } from "@/components/brand-header"
import { RaffleControls } from "@/components/raffle-controls"
import { PlayersPanel } from "@/components/players-panel"
import { StatusPanel } from "@/components/status-panel"
import { AdvancedPanel } from "@/components/advanced-panel"
import { useRaffle } from "@/hooks/use-raffle"

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
})

/**
 * Minimal ABI for functions used by this UI.
 */
const raffleAbi = [
  "function getEntranceFee() view returns (uint256)",
  "function enterRaffle() payable",
  "function getNumberOfPlayers() view returns (uint256)",
  "function getPlayer(uint256) view returns (address)",
  "function getRecentWinner() view returns (address)",
  "function performUpkeep(bytes calldata) external",
] as const

// Fallbacks if envs are not present
const DEFAULT_RPC =
  (process?.env?.NEXT_PUBLIC_SEPOLIA_RPC_URL as string | undefined) || "https://ethereum-sepolia.publicnode.com"
const DEFAULT_CONTRACT = (process?.env?.NEXT_PUBLIC_RAFFLE_ADDRESS as string | undefined) || ""
const GITHUB_REPO_URL =
  (process?.env?.NEXT_PUBLIC_GITHUB_REPO_URL as string | undefined) || "https://github.com/yourname/yourrepo"

function short(addr?: string | null, left = 6, right = 4) {
  if (!addr) return ""
  if (addr.length <= left + right) return addr
  return `${addr.slice(0, left)}…${addr.slice(-right)}`
}

export default function RafflePage() {
  const {
    account,
    status,
    players,
    winner,
    entranceFee,
    rpcUrl,
    contractAddress,
    pending,
    canTransact,
    setRpcUrl,
    setContractAddress,
    setPlayers,
    setWinner,
    connectWallet,
    fetchEntranceFee,
    enterRaffle,
    loadPlayers,
    getWinner,
    performUpkeep,
  } = useRaffle()

  return (
    <main className="relative min-h-[100dvh] bg-black text-white overflow-hidden">
      {/* Neon gradient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,153,0.15)_0%,rgba(0,0,0,0)_60%)]" />
      {/* Retro grid floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [background:repeating-linear-gradient(transparent,transparent_14px,rgba(255,0,204,0.15)_15px),linear-gradient(to_top,rgba(108,43,217,0.35),rgba(0,0,0,0))] [mask-image:linear-gradient(to_top,black,transparent)]" />
      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light [background:repeating-linear-gradient(0deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_1px,transparent_2px,transparent_4px)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-12">
        <BrandHeader account={account} onConnect={connectWallet} connecting={pending === "connect"} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <RaffleControls
            entranceFee={entranceFee}
            contractAddress={contractAddress}
            pending={pending}
            canTransact={canTransact}
            onEnter={enterRaffle}
            onLoadPlayers={loadPlayers}
            onGetWinner={getWinner}
            onPerformUpkeep={performUpkeep}
          />

          <PlayersPanel players={players} />

          <StatusPanel status={status} winner={winner} />

          <AdvancedPanel
            rpcUrl={rpcUrl}
            contractAddress={contractAddress}
            pending={pending}
            onChangeRpc={setRpcUrl}
            onChangeContract={setContractAddress}
            onRefreshFee={fetchEntranceFee}
            onClearPlayers={() => setPlayers([])}
            onClearWinner={() => setWinner(null)}
          />
        </div>

        <footer className="mt-10 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Badge className="rounded-none border-2 border-fuchsia-400/50 bg-black/50 text-fuchsia-200">
              <Wallet className="mr-2 h-3.5 w-3.5" />
              {account ? "Connected" : "Disconnected"}
            </Badge>
            <Badge className="rounded-none border-2 border-rose-400/50 bg-black/50 text-rose-200">
              <PlugZap className="mr-2 h-3.5 w-3.5" />
              Sepolia
            </Badge>
          </div>
          <div>
            <p className="font-mono">Be lucky. Be retro.</p>
            <p className="font-mono underline text-right"><a href="https://shaah1d.vercel.app/">@shaah1d</a></p>
          </div>
        </footer>
      </div>
    </main>
  )
}
