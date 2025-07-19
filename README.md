# Decentralized Raffle Smart Contract

A provably fair lottery system built on Ethereum using Chainlink VRF for verifiable random number generation and automated winner selection.

## Overview

This project implements a decentralized raffle (lottery) system where participants can enter by paying an entrance fee, and a winner is automatically selected using Chainlink's Verifiable Random Function (VRF). The contract ensures fairness through cryptographic randomness and transparency through blockchain technology.

## Key Features

### 🎲 Provably Fair Randomness
- Utilizes **Chainlink VRF v2** for cryptographically secure random number generation
- Eliminates any possibility of manipulation in winner selection
- Provides verifiable proof of randomness on-chain

### ⚡ Automated Operations
- **Chainlink Automation** (Keepers) integration for automatic raffle execution
- Time-based triggers ensure raffles conclude at predetermined intervals
- No manual intervention required for winner selection

### 🔒 Secure State Management
- Two-state system: `OPEN` (accepting entries) and `CALCULATING` (selecting winner)
- Prevents entries during winner calculation period
- Ensures atomic operations for prize distribution

### 💰 Transparent Prize Pool
- All entrance fees accumulate in the contract
- Winner receives the entire prize pool
- Failed transfers are handled with proper error reporting

## Technical Architecture

### Test Coverage 

| File                             | % Lines           | % Statements      | % Branches       | % Functions       |
|----------------------------------|-------------------|-------------------|------------------|-------------------|
| `script/DeployRaffle.s.sol`      | **90.00%** (18/20) | **95.83%** (23/24) | **100.00%** (1/1) | **50.00%** (1/2)   |
| `script/HelperConfig.s.sol`      | **82.61%** (19/23) | **90.48%** (19/21) | **40.00%** (2/5)  | **66.67%** (4/6)   |
| `script/Interactions.s.sol`      | **35.00%** (14/40) | **32.43%** (12/37) | **50.00%** (1/2)  | **33.33%** (3/9)   |
| `src/Raffle.sol`                 | **64.00%** (32/50) | **65.96%** (31/47) | **60.00%** (3/5)  | **60.00%** (6/10)  |
| `test/mocks/LinkToken.sol`       | **11.76%** (2/17)  | **7.69%** (1/13)   | **0.00%** (0/1)   | **20.00%** (1/5)   |
| **Total**                        | **56.67%** (85/150)| **60.56%** (86/142)| **50.00%** (7/14) | **46.88%** (15/32) |


### Smart Contract Components

**Core Functionality:**
- `enterRaffle()`: Allows participants to enter by paying the entrance fee
- `checkUpkeep()`: Validates if conditions are met for winner selection
- `performUpkeep()`: Initiates the random number request process
- `fulfillRandomWords()`: Callback function that selects and pays the winner

**State Variables:**
- `i_entranceFee`: Minimum payment required to enter
- `i_interval`: Time duration between raffle rounds
- `s_players`: Dynamic array storing participant addresses
- `s_raffleState`: Current state of the raffle (OPEN/CALCULATING)

### Chainlink Integration

**VRF (Verifiable Random Function):**
- Provides cryptographically secure randomness
- Requires subscription to Chainlink VRF service
- Configurable gas limits and confirmation requirements

**Automation (Keepers):**
- Monitors contract state for automation triggers
- Executes `performUpkeep()` when conditions are met
- Ensures timely raffle execution without manual intervention

## Prerequisites

- **Chainlink VRF Subscription**: Required for random number generation
- **Chainlink Automation Registration**: Needed for automated raffle execution
- **LINK Tokens**: For funding VRF requests and automation

## Configuration Parameters

When deploying, you'll need to configure:

- `vrfCoordinatorV2`: Address of Chainlink VRF Coordinator
- `entranceFee`: Minimum entry fee in wei
- `interval`: Duration between raffles in seconds
- `keyHash`: Gas lane key hash for VRF requests
- `subscriptionId`: Your Chainlink VRF subscription ID
- `callbackGasLimit`: Gas limit for VRF callback function

## Contract Events

- `RaffleEntered(address indexed player)`: Emitted when someone enters the raffle
- `WinnerPicked(address indexed winner)`: Emitted when a winner is selected

## Security Features

- **Reentrancy Protection**: State changes before external calls
- **Access Control**: Only VRF Coordinator can fulfill random words
- **Error Handling**: Custom errors for different failure scenarios
- **Gas Optimization**: Efficient storage patterns and immutable variables

## Development Stack

- **Solidity ^0.8.18**: Smart contract language
- **Foundry**: Development framework for testing and deployment
- **Chainlink VRF v2**: Verifiable random number generation
- **Chainlink Automation**: Automated smart contract execution

## How It Works

1. **Entry Phase**: Users call `enterRaffle()` with the required entrance fee
2. **Monitoring**: Chainlink Automation continuously monitors the contract
3. **Trigger**: When time interval passes and conditions are met, `performUpkeep()` is called
4. **Random Request**: Contract requests a random number from Chainlink VRF
5. **Winner Selection**: VRF callback selects a winner and transfers the prize
6. **Reset**: Contract resets for the next raffle round

This implementation ensures a completely trustless, transparent, and fair lottery system powered by Chainlink's decentralized oracle infrastructure.