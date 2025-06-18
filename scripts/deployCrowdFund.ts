import { toNano, Dictionary } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const crowdFund = provider.open(await CrowdFund.fromInit(
        0n, // count
        Dictionary.empty(), // campaigns
        Dictionary.empty(), // pledges
    ));

    await crowdFund.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        null,
    );

    await provider.waitForDeploy(crowdFund.address);

    // run methods on `crowdFund`
}
