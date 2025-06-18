import { toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const crowdFund = provider.open(CrowdFund.fromAddress("EQD...your_contract_address_here..."));

    // Test Launch function - Create a new campaign
    const now = Math.floor(Date.now() / 1000);
    const startAt = now + 60; // Start in 1 minute
    const endAt = now + 86400; // End in 24 hours
    const goal = toNano('10'); // 10 TON goal

    console.log('Launching new campaign...');
    console.log(`Goal: ${goal} nanoTON`);
    console.log(`Start time: ${new Date(startAt * 1000).toISOString()}`);
    console.log(`End time: ${new Date(endAt * 1000).toISOString()}`);

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

    console.log('Campaign launched successfully!');
} 