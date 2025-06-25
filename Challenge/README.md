# Live Coding Session #2:  
---

## 🚀 Challenge: Show What You Learned!

1. **Write a Medium Article**
   - Summarize what you learned from the live session
   - Write an article explaining CrowdFunding in TON Ecosystem explaining concept,contract, how to write it, how it is different from Ethereum Ecosystem (Solidity)
   - Explain it like teaching it to a 5 year old 

2. **Fork the Repository & Submit a PR**
   - Fork this repository
   - Add your Medium article link and wallet address in a new file or in the PR description
   - Follow the PR template in `.github/PULL_REQUEST_TEMPLATE.md`

3. **Spread the Word on X (formerly Twitter)**
   - Share your article and tag:
     - [@ton_blockchain](https://twitter.com/ton_blockchain)
     - [@TONSSEA](https://twitter.com/TONSSEA)
     - [@sha_onchain](https://twitter.com/sha_onchain)
     - [@SakshamBhugra](https://twitter.com/SakshamBhugra)
     - [@itsNikku876](https://twitter.com/itsNikku876)

---

## Resources for devs

  - TON Blueprint - https://github.com/ton-org/blueprint
  - Tact langugage docs - https://docs.tact-lang.org/book/learn-tact-in-y-minutes
  - TON SDKs - https://docs.ton.org/v3/guidelines/dapps/apis-sdks/sdk
  - TON Docs - https://ton.org/docs

---

## Building a Crowdfund Contract in Solidity & Tact (TON)

Welcome to the summary and challenge for **Live Coding Session #2**! In this session, we explored how to build a decentralized crowdfunding smart contract—first in Solidity (for EVM chains like Ethereum), and then in Tact (for the TON blockchain). This README will walk you through the key learnings, compare the two languages, and present a challenge for you to complete.

---

## 🛠️ What We Built

We implemented a **Crowdfund** contract that allows users to:
- Launch fundraising campaigns with a goal and time window
- Pledge funds to active campaigns
- Claim funds if the campaign is successful
- Cancel campaigns before they start (if no pledges exist)

---

## 🔄 Solidity vs Tact: A Comparative Overview

### Solidity (EVM)
- **Language**: Main language for Ethereum and EVM-compatible chains
- **Syntax**: C-like, statically typed
- **Storage**: Uses mappings, structs, and events
- **Deployment**: Deployed on Ethereum, BSC, Polygon, etc.
- **Gas Model**: Gas is paid in ETH (or chain token), and every operation has a cost
- **Example Structure**:
  - `struct Campaign { ... }`
  - `mapping(uint => Campaign) public campaigns;`
  - `function launch(...) public { ... }`
  - `function pledge(...) public payable { ... }`
  - `function claim(...) public { ... }`

### Tact (TON)
- **Language**: Native smart contract language for TON blockchain
- **Syntax**: Inspired by functional and statically typed paradigms
- **Storage**: Uses maps, structs, and message-based architecture
- **Deployment**: Deployed on TON blockchain
- **Gas Model**: Gas is paid in TON, with a focus on message efficiency
- **Example Structure**:
  - `struct Campaign { ... }`
  - `campaigns: map<Int as uint256, Campaign>`
  - `receive(msg: Launch) { ... }`
  - `receive(msg: Pledge) { ... }`
  - `receive(msg: Claim) { ... }`

### Key Differences
| Feature                | Solidity (EVM)                | Tact (TON)                      |
|------------------------|-------------------------------|---------------------------------|
| Syntax                 | C-like                        | Functional-inspired              |
| Storage                | mapping, struct               | map, struct                     |
| Entry Points           | function                      | receive(message)                |
| Gas Model              | ETH, explicit gas             | TON, message-based, auto refund |
| Events                 | emit Event                    | Not native, use messages        |
| Time Handling          | block.timestamp               | now()                           |
| Deployment             | EVM chains                    | TON blockchain                  |

### Similarities
- Both support structs and mappings/maps for state
- Both enforce access control (e.g., only owner can claim/cancel)
- Both require careful gas management
- Both allow for modular, reusable code

---

## 📚 What You Should Have Learned
- How to structure a crowdfunding contract in both Solidity and Tact
- The differences in syntax, storage, and execution between EVM and TON
- How to handle pledges, claims, and campaign lifecycle in both environments
- The importance of gas optimization and security checks



Happy building and learning! 🚀
