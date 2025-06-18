import { toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const crowdFund = provider.open(CrowdFund.fromAddress("EQD...your_contract_address_here..."));

    // Test Claim function - Claim funds from a successful campaign
    const campaignId = 1n; // Campaign ID to claim

    console.log('Claiming campaign funds...');
    console.log(`Campaign ID: ${campaignId}`);

    await crowdFund.send(
        provider.sender(),
        {
            value: toNano('0.05'), // Gas fee
        },
        {
            $$type: 'Claim',
            campaignId: campaignId,
        }
    );

    console.log('Claim transaction sent!');
} 