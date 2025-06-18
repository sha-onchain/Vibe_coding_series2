import { toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const crowdFund = provider.open(CrowdFund.fromAddress("EQD...your_contract_address_here..."));

    // Test Pledge function - Pledge to a campaign
    const campaignId = 1n; // Campaign ID to pledge to
    const pledgeAmount = toNano('2'); // 2 TON pledge

    console.log('Pledging to campaign...');
    console.log(`Campaign ID: ${campaignId}`);
    console.log(`Pledge amount: ${pledgeAmount} nanoTON`);

    await crowdFund.send(
        provider.sender(),
        {
            value: pledgeAmount + toNano('0.05'), // Pledge amount + gas
        },
        {
            $$type: 'Pledge',
            campaignId: campaignId,
        }
    );

    console.log('Pledge successful!');
} 