export const DEFAULT_RPC: string =
  (process?.env?.NEXT_PUBLIC_SEPOLIA_RPC_URL as string | undefined) || "https://ethereum-sepolia.publicnode.com"

export const DEFAULT_CONTRACT: string = (process?.env?.NEXT_PUBLIC_RAFFLE_ADDRESS as string | undefined) || ""

export const GITHUB_REPO_URL: string =
  (process?.env?.NEXT_PUBLIC_GITHUB_REPO_URL as string | undefined) || "https://github.com/shaah1d/Lottery-solidity"
