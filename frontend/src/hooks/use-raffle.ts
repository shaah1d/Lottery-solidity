"use client"

import { useEffect, useMemo, useState } from "react"
import { ethers } from "ethers"
import { RAFFLE_ABI } from "@/lib/raffle-abi"
import { DEFAULT_CONTRACT, DEFAULT_RPC } from "@/lib/env"

export type PendingKind = "connect" | "enter" | "players" | "winner" | "upkeep" | "fee" | null

export function useRaffle() {
  const [account, setAccount] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("Ready.")
  const [players, setPlayers] = useState<string[]>([])
  const [winner, setWinner] = useState<string | null>(null)
  const [entranceFee, setEntranceFee] = useState<string | null>(null)
  const [rpcUrl, setRpcUrl] = useState<string>(DEFAULT_RPC)
  const [contractAddress, setContractAddress] = useState<string>(DEFAULT_CONTRACT)
  const [pending, setPending] = useState<PendingKind>(null)
  const [hasProvider, setHasProvider] = useState<boolean>(false)

  const readProvider = useMemo(() => {
    try {
      return new ethers.JsonRpcProvider(rpcUrl)
    } catch {
      return null
    }
  }, [rpcUrl])

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const handler = (accounts: string[]) => setAccount(accounts?.[0] ?? null)
      ;(window as any).ethereum.on("accountsChanged", handler)
      return () => {
        try {
          ;(window as any).ethereum.removeListener("accountsChanged", handler)
        } catch {
          // no-op
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const check = () => {
      if ((window as any).ethereum) {
        setHasProvider(true)
        return true
      }
      return false
    }

    // Immediate check
    if (check()) return

    // Listen for MetaMask's initialization event
    const onInitialized = () => {
      check()
    }
    window.addEventListener("ethereum#initialized", onInitialized, { once: true } as any)

    // Poll as a fallback for wallets that don't emit the event
    const interval = setInterval(() => {
      if (check()) {
        clearInterval(interval)
        window.removeEventListener("ethereum#initialized", onInitialized as any)
      }
    }, 300)

    // Stop polling after 8 seconds to avoid leaks
    const timeout = setTimeout(() => {
      clearInterval(interval)
      window.removeEventListener("ethereum#initialized", onInitialized as any)
    }, 8000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      window.removeEventListener("ethereum#initialized", onInitialized as any)
    }
  }, [])

  useEffect(() => {
    void fetchEntranceFee()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractAddress, rpcUrl])

  function getContract(providerOrSigner: any) {
    if (!contractAddress) throw new Error("Contract address not set.")
    return new ethers.Contract(contractAddress, RAFFLE_ABI as any, providerOrSigner)
  }

  async function connectWallet() {
    try {
      setPending("connect")
      setStatus("Requesting wallet...")
      if ((window as any).ethereum) {
        setHasProvider(true)
      }
      if (!(window as any).ethereum) {
        setStatus("MetaMask not found")
        alert("MetaMask not found")
        return
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setAccount(addr)
      setStatus("Wallet connected.")
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  async function fetchEntranceFee() {
    if (!readProvider || !contractAddress) {
      setEntranceFee(null)
      return
    }
    try {
      setPending("fee")
      setStatus("Fetching entrance fee...")
      const contract = getContract(readProvider)
      const fee: bigint = await contract.getEntranceFee()
      const ether = ethers.formatEther(fee)
      setEntranceFee(ether)
      setStatus("Entrance fee loaded.")
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  async function enterRaffle() {
    try {
      setPending("enter")
      setStatus("Requesting wallet...")
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const contract = getContract(signer)
      const fee: bigint = await contract.getEntranceFee()
      setStatus("Sending transaction...")
      const tx = await contract.enterRaffle({ value: fee })
      setStatus(`Tx sent: ${tx.hash}`)
      await tx.wait()
      setStatus("Entered raffle — tx mined.")
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  async function loadPlayers() {
    try {
      setPending("players")
      setStatus("Loading players...")
      if (!readProvider) throw new Error("Invalid RPC URL.")
      const contract = getContract(readProvider)
      const n: number = Number(await contract.getNumberOfPlayers())
      const ps: string[] = []
      for (let i = 0; i < n; i++) {
        const p: string = await contract.getPlayer(i)
        ps.push(p)
      }
      setPlayers(ps)
      setStatus(`Players loaded (${n}).`)
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  async function getWinner() {
    try {
      setPending("winner")
      setStatus("Loading winner...")
      if (!readProvider) throw new Error("Invalid RPC URL.")
      const contract = getContract(readProvider)
      const w: string = await contract.getRecentWinner()
      setWinner(w)
      setStatus("Winner loaded.")
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  async function performUpkeep() {
    try {
      setPending("upkeep")
      setStatus("Preparing upkeep tx...")
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const contract = getContract(signer)
      const tx = await contract.performUpkeep("0x")
      setStatus(`Upkeep tx sent: ${tx.hash}`)
      await tx.wait()
      setStatus("performUpkeep mined.")
    } catch (err: any) {
      console.error(err)
      setStatus(err?.message ?? String(err))
    } finally {
      setPending(null)
    }
  }

  const canTransact = hasProvider

  return {
    // state
    account,
    status,
    players,
    winner,
    entranceFee,
    rpcUrl,
    contractAddress,
    pending,
    canTransact,

    // setters
    setRpcUrl,
    setContractAddress,
    setPlayers,
    setWinner,

    // actions
    connectWallet,
    fetchEntranceFee,
    enterRaffle,
    loadPlayers,
    getWinner,
    performUpkeep,
  }
}
