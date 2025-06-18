import { Address, toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    let contractAddress = Address.parse("kQD8rSmb_n8FmA0GbjX3XgVrXq9R7a4x_iLQO5eagl5Hs2Bc");
    const crowdFund = provider.open(CrowdFund.fromAddress(contractAddress));

    // Test getter function - Get campaign details
    const campaignId = 1n; // Campaign ID to query

    console.log('Getting campaign details...');
    console.log(`Campaign ID: ${campaignId}`);

    try {
        const campaignDetails = await crowdFund.getCampaignDetails(campaignId);
        
        console.log('Campaign Details:');
        console.log(`Owner: ${campaignDetails.owner}`);
        console.log(`Goal: ${campaignDetails.goal} nanoTON`);
        console.log(`Pledged: ${campaignDetails.pledged} nanoTON`);
        console.log(`Start Time: ${new Date(Number(campaignDetails.startAt) * 1000).toISOString()}`);
        console.log(`End Time: ${new Date(Number(campaignDetails.endAt) * 1000).toISOString()}`);
        console.log(`Claimed: ${campaignDetails.claimed}`);
        
        // Calculate progress
        const progress = (Number(campaignDetails.pledged) / Number(campaignDetails.goal)) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
        
    } catch (error) {
        console.error('Error getting campaign details:', error);
    }
} 