import { toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const crowdFund = provider.open(CrowdFund.fromAddress("EQD...your_contract_address_here..."));

    // Test Cancel function - Cancel a campaign before it starts
    const campaignId = 1n; // Campaign ID to cancel

    console.log('Canceling campaign...');
    console.log(`Campaign ID: ${campaignId}`);

    await crowdFund.send(
        provider.sender(),
        {
            value: toNano('0.05'), // Gas fee
        },
        {
            $$type: 'Cancel',
            campaignId: campaignId,
        }
    );

    console.log('Cancel transaction sent!');
} 