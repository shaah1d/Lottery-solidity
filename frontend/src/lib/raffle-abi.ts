export const RAFFLE_ABI = [
  "function getEntranceFee() view returns (uint256)",
  "function enterRaffle() payable",
  "function getNumberOfPlayers() view returns (uint256)",
  "function getPlayer(uint256) view returns (address)",
  "function getRecentWinner() view returns (address)",
  "function performUpkeep(bytes calldata) external",
] as const
