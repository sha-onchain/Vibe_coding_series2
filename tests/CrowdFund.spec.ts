import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CrowdFund } from '../build/CrowdFund/CrowdFund_CrowdFund';
import '@ton/test-utils';

describe('CrowdFund', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let crowdFund: SandboxContract<CrowdFund>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        crowdFund = blockchain.openContract(await CrowdFund.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await crowdFund.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: crowdFund.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and crowdFund are ready to use
    });
});
