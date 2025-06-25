# CrowdFund Smart Contract

A decentralized crowdfunding platform built on TON blockchain using Tact programming language. This contract allows users to create campaigns, pledge funds, and claim raised amounts when goals are met.

## 🚀 Features

### Core Functionality
- **Campaign Creation**: Users can launch crowdfunding campaigns with custom goals and timeframes
- **Pledging**: Anyone can contribute TON to active campaigns
- **Fund Claiming**: Campaign owners can claim funds when goals are reached
- **Campaign Cancellation**: Owners can cancel campaigns before they start (if no pledges exist)
- **Real-time Tracking**: View campaign details, progress, and status

### Smart Contract Features
- **Time-based Campaigns**: Each campaign has start and end times
- **Goal-based Funding**: Campaigns succeed only when pledged amount ≥ goal
- **Owner-only Actions**: Only campaign creators can cancel or claim funds
- **Automatic Fund Distribution**: Successful campaigns automatically send funds to owners
- **Gas-efficient**: Optimized for minimal transaction costs

## 📋 Contract Structure

### Data Structures
```tact
struct Campaign {
    owner: Address;        // Campaign creator
    goal: Int;            // Funding goal in nanoTON
    pledged: Int;         // Total pledged amount
    startAt: Int;         // Campaign start timestamp
    endAt: Int;           // Campaign end timestamp
    claimed: Bool;        // Whether funds were claimed
}

struct PledgeDetails {
    pledger: Address;     // Pledger's address
    amount: Int;          // Pledge amount
}
```

### Contract State
- `count`: Total number of campaigns created
- `campaigns`: Map of campaign ID to Campaign details
- `pledges`: Map of campaign ID to pledge information

## 🔧 Functions

### 1. Launch Campaign
```tact
message Launch {
    goal: Int;      // Funding goal
    startAt: Int;   // Start timestamp
    endAt: Int;     // End timestamp
}
```
- Creates a new crowdfunding campaign
- Requires: start time ≥ current time, end time > start time, goal > 0

### 2. Pledge to Campaign
```tact
message Pledge {
    campaignId: Int;  // Campaign to pledge to
}
```
- Contribute TON to an active campaign
- Requires: Campaign exists, is active, and goal not exceeded

### 3. Claim Funds
```tact
message Claim {
    campaignId: Int;  // Campaign to claim from
}
```
- Claim raised funds from successful campaigns
- Requires: Campaign ended, goal reached, not already claimed

### 4. Cancel Campaign
```tact
message Cancel {
    campaignId: Int;  // Campaign to cancel
}
```
- Cancel campaign before it starts
- Requires: Owner only, no pledges, campaign not started

### 5. Get Campaign Details
```tact
get fun campaignDetails(campaignId: Int): Campaign
```
- Retrieve complete campaign information
- Returns: Campaign struct with all details

### 6. Get Total Campaigns
```tact
get fun totalCampaigns(): Int
```
- Get total number of campaigns created
- Returns: Campaign count

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TON wallet with testnet/mainnet TON

### 1. Clone and Install
```bash
git clone <repository-url>
cd CrowdFund
npm install
```

### 2. Build the Contract
```bash
npx blueprint build
```

## 🚀 Deployment & Testing

### Quick Start (Recommended)
1. **Deploy the contract**:
   ```bash
   npx blueprint run deployCrowdFund
   ```
   - This deploys the contract to the network
   - Note the deployed contract address

2. **Update contract address** in `scripts/testAllFunctions.ts`:
   ```typescript
   const contractAddress = Address.parse("YOUR_DEPLOYED_CONTRACT_ADDRESS");
   ```

3. **Run comprehensive test**:
   ```bash
   npx blueprint run testAllFunctions
   ```

### What the Test Does
The `testAllFunctions.ts` script performs a complete end-to-end test:

1. **Creates a 2-minute campaign** with 0.1 TON goal
2. **Waits for campaign to start** (30 seconds)
3. **Makes a pledge** of 0.1 TON (100% of goal)
4. **Waits for campaign to end** (2 minutes)
5. **Tests claim function** to withdraw funds
6. **Shows final campaign status**

### Expected Output
```
=== CrowdFund Contract Testing ===

1. Testing Launch function...
✅ Campaign launched successfully!
   Goal: 100000000 nanoTON
   Start time: 2024-01-15T10:30:30.000Z
   End time: 2024-01-15T10:32:30.000Z
   Duration: 2 minutes

2. Testing Get Campaign Details...
✅ Campaign details retrieved:
   Owner: EQD...
   Goal: 100000000 nanoTON
   Pledged: 0 nanoTON
   Progress: 0.00%

3. Testing Pledge function...
   Waiting for campaign to start (30 seconds)...
✅ Pledge successful!
   Amount: 100000000 nanoTON

4. Testing Get Updated Campaign Details...
✅ Updated campaign details:
   Pledged: 100000000 nanoTON
   Progress: 100.00%

5. Testing Claim function...
   Waiting for campaign to end (2 minutes)...
✅ Claim transaction sent successfully!

6. Testing Get Final Campaign Details...
✅ Final campaign details:
   Pledged: 100000000 nanoTON
   Goal: 100000000 nanoTON
   Claimed: true
   Progress: 100.00%

=== Testing Complete ===
All functions have been tested: Launch, Pledge, Claim, and Get Details
```

## 📝 Individual Test Scripts

For testing specific functions, use these individual scripts:

```bash
# Test campaign creation
npx blueprint run testLaunch

# Test pledging to a campaign
npx blueprint run testPledge

# Test claiming funds
npx blueprint run testClaim

# Test canceling a campaign
npx blueprint run testCancel

# Test getting campaign details
npx blueprint run testGetCampaignDetails
```

## 🔍 Contract Logic

### Campaign Lifecycle
1. **Creation**: Owner launches campaign with goal and timeframe
2. **Active Period**: Campaign accepts pledges during start ≤ now ≤ end
3. **End**: Campaign stops accepting pledges
4. **Success/Failure**: 
   - If pledged ≥ goal: Campaign succeeds, owner can claim
   - If pledged < goal: Campaign fails, no funds distributed

### Security Features
- **Owner Verification**: Only campaign creators can cancel/claim
- **Time Validation**: Campaigns respect start/end times
- **Goal Enforcement**: Claims only work when goal is reached
- **Single Claim**: Each campaign can only be claimed once
- **No Overfunding**: Pledges cannot exceed campaign goal

### Gas Optimization
- Efficient data structures using maps
- Minimal state changes
- Optimized message handling
- Automatic gas refunds for failed operations


