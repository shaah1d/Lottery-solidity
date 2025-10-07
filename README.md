<h1 align="center">Lottery - A Decentralized Raffle System</h1>



<p align="center">

<img src ="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black">
<img src ="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src ="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white">
<img src ="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white">
<img src="https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white">
<img src="https://img.shields.io/badge/Foundry-%23000000.svg?style=for-the-badge&logo=foundry&logoColor=white">
<img src="https://img.shields.io/badge/Chainlink%20VRF-%23327AE4.svg?style=for-the-badge&logo=chainlink&logoColor=white">

</p>

[<img width="1920" height="1080" alt="lotterygithubbanner" src="https://github.com/user-attachments/assets/bcd9e82f-1660-49fc-8045-3a09664d040d" />](https://rafflesolidity.vercel.app)
# Decentralized Raffle System

Decentralized Raffle is a smart contract for a provably fair lottery system on Ethereum. Users enter by paying an entrance fee, and a winner is selected automatically using Chainlink VRF for random number generation and Chainlink Automation for execution. The contract handles entry, state management, randomness requests, and prize distribution. A Next.js frontend provides an interface for connecting wallets, entering raffles, viewing players, and triggering upkeep.

## Features

- Entrance with ETH payment and player tracking.
- Time-based raffle intervals with automated winner selection.
- Cryptographic randomness via Chainlink VRF v2.5.
- Prize transfer to winner with error handling.
- View functions for fee, players, and recent winner.
- Frontend with wallet integration, transaction handling, and real-time status updates.
- Support for Sepolia testnet and local anvil network.
- Mock contracts for local testing.

## Setup

### Contracts (Foundry)

1. Navigate to the contracts directory:
   ```
   cd contracts
   ```

2. Install dependencies:
   ```
   forge install
   ```

3. Create a `.env` file in the contracts directory and add the following variables:
   ```
   SEPOLIA_RPC_URL=your_sepolia_rpc_url
   ETHERSCAN_API_KEY=your_etherscan_api_key
   PRIVATE_KEY=your_private_key
   ```

4. Compile the contract:
   ```
   forge build
   ```

5. Run tests:
   ```
   forge test
   ```

6. Deploy to Sepolia:
   ```
   make deploy-sepolia
   ```

7. Create and fund VRF subscription:
   ```
   make createSubscription
   make fundSubscription
   ```

8. Add consumer:
   ```
   make addConsumer
   ```

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the frontend directory and add the following variables:
   ```
   NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_rpc_url
   NEXT_PUBLIC_RAFFLE_ADDRESS=your_deployed_raffle_address
   NEXT_PUBLIC_GITHUB_REPO_URL=your_github_repo_url
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

For production builds:
```
npm run build
npm start
```

## File Structure

```
shaah1d-lottery-solidity/
├── contracts/
│   ├── README.md
│   ├── foundry.toml
│   ├── Makefile
│   ├── script/
│   │   ├── DeployRaffle.s.sol
│   │   ├── HelperConfig.s.sol
│   │   └── Interactions.s.sol
│   ├── src/
│   │   └── Raffle.sol
│   ├── test/
│   │   ├── mocks/
│   │   │   └── LinkToken.sol
│   │   └── unit/
│   │       └── RaffleTest.t.sol
│   └── .github/
│       └── workflows/
│           └── test.yml
└── frontend/
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── abi/
    │   └── Raffle.json
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── raffle/
        │       └── how-it-works/
        │           └── page.tsx
        ├── components/
        │   ├── advanced-panel.tsx
        │   ├── brand-header.tsx
        │   ├── info-tile.tsx
        │   ├── page.tsx
        │   ├── players-panel.tsx
        │   ├── raffle-controls.tsx
        │   ├── status-panel.tsx
        │   └── ui/
        │       ├── badge.tsx
        │       ├── button.tsx
        │       ├── card.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       └── scroll-area.tsx
        ├── hooks/
        │   └── use-raffle.ts
        └── lib/
            ├── address.ts
            ├── env.ts
            ├── fonts.ts
            ├── raffle-abi.ts
            └── utils.ts
```

## Tech Stack

- Solidity 0.8.19
- Foundry for testing and deployment
- Chainlink VRF v2.5 and Automation
- Next.js 14
- TypeScript
- Tailwind CSS
- Ethers.js for wallet and contract interactions
- shadcn/ui components
