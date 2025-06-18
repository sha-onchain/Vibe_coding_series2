import { toNano, Address } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';
import { FetchUrlFeeDataNetworkPlugin } from 'ethers';

export async function run(provider: NetworkProvider) {
    // Replace with your deployed contract address
    const contractAddress = Address.parse("kQDBhmirAh4aUWpDca2QU23_j-TrDeq6LfQk97nWK0kXhUuP");
    const crowdFund = provider.open(CrowdFund.fromAddress(contractAddress));

    console.log('=== CrowdFund Contract Testing ===\n');

    // Test 1: Launch a new campaign (2 minutes duration)
    console.log('1. Testing Launch function...');
    const now = Math.floor(Date.now() / 1000);
    const startAt = now + 30; // Start in 30 seconds
    const endAt = now + 150; // End in 2.5 minutes (150 seconds)
    const goal = toNano('0.1'); // 1 TON goal (lower goal for easier testing)

    try {
        await crowdFund.send(
            provider.sender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Launch',
                goal: goal,
                startAt: BigInt(startAt),
                endAt: BigInt(endAt),
            }
        );
        console.log('✅ Campaign launched successfully!');
        console.log(`   Goal: ${goal} nanoTON`);
        console.log(`   Start time: ${new Date(startAt * 1000).toISOString()}`);
        console.log(`   End time: ${new Date(endAt * 1000).toISOString()}`);
        console.log(`   Duration: 2 minutes\n`);
    } catch (error) {
        console.log('❌ Launch failed:', error);
        return;
    }

    // Wait for the transaction to be processed
    await new Promise(resolve => setTimeout(resolve, 9000));

    // Test 2: Get campaign details
    console.log('2. Testing Get Campaign Details...');
    const finalCampaignId = await crowdFund.getTotalCampaigns();
    console.log("Final campaign id: ", finalCampaignId);
    try {
        const campaignDetails = await crowdFund.getCampaignDetails(finalCampaignId);
        console.log('✅ Campaign details retrieved:');
        console.log(`   Owner: ${campaignDetails.owner}`);
        console.log(`   Goal: ${campaignDetails.goal} nanoTON`);
        console.log(`   Pledged: ${campaignDetails.pledged} nanoTON`);
        console.log(`   Progress: ${((Number(campaignDetails.pledged) / Number(campaignDetails.goal)) * 100).toFixed(2)}%\n`);
    } catch (error) {
        console.log('❌ Get campaign details failed:', error);
    }

    // Test 3: Wait for campaign to start, then pledge
    console.log('3. Testing Pledge function...');
    console.log('   Waiting for campaign to start (30 seconds)...');
    await new Promise(resolve => setTimeout(resolve, 35000)); // Wait 35 seconds

    try {
        const pledgeAmount = toNano('0.1');
        await crowdFund.send(
            provider.sender(),
            {
                value: pledgeAmount,
            },
            {
                $$type: 'Pledge',
                campaignId: finalCampaignId,
            }
        );
        console.log('✅ Pledge successful!');
        console.log(`   Amount: ${pledgeAmount} nanoTON\n`);
    } catch (error) {
        console.log('❌ Pledge failed:', error);
    }

    // Wait for transaction to be processed
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Test 4: Get updated campaign details
    console.log('4. Testing Get Updated Campaign Details...');
    try {
        const updatedDetails = await crowdFund.getCampaignDetails(1n);
        console.log('✅ Updated campaign details:');
        console.log(`   Pledged: ${updatedDetails.pledged} nanoTON`);
        console.log(`   Progress: ${((Number(updatedDetails.pledged) / Number(updatedDetails.goal)) * 100).toFixed(2)}%\n`);
    } catch (error) {
        console.log('❌ Get updated details failed:', error);
    }

    // Test 5: Wait for campaign to end, then test claim
    console.log('5. Testing Claim function...');
    console.log('   Waiting for campaign to end (2 minutes)...');
    await new Promise(resolve => setTimeout(resolve, 120000)); // Wait 2 minutes

    try {
        await crowdFund.send(
            provider.sender(),
            {
                value: toNano('0.05'), // Gas fee
            },
            {
                $$type: 'Claim',
                campaignId: finalCampaignId,
            }
        );
        console.log('✅ Claim transaction sent successfully!\n');
    } catch (error) {
        console.log('❌ Claim failed:', error);
        console.log('   This might be because:');
        console.log('   - Campaign goal not reached');
        console.log('   - Campaign already claimed');
        console.log('   - You are not the campaign owner\n');
    }
    
    // Test 6: Get final campaign details
    console.log('6. Testing Get Final Campaign Details...');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds

    try {
        const finalDetails = await crowdFund.getCampaignDetails(1n);
        console.log('✅ Final campaign details:');
        console.log(`   Pledged: ${finalDetails.pledged} nanoTON`);
        console.log(`   Goal: ${finalDetails.goal} nanoTON`);
        console.log(`   Claimed: ${finalDetails.claimed}`);
        console.log(`   Progress: ${((Number(finalDetails.pledged) / Number(finalDetails.goal)) * 100).toFixed(2)}%\n`);
    } catch (error) {
        console.log('❌ Get final details failed:', error);
    }

    console.log('=== Testing Complete ===');
    console.log('All functions have been tested: Launch, Pledge, Claim, and Get Details');
} 
