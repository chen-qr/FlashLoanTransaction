const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe("测试DoFlashLoan合约逻辑", function() {

    async function deployTokenFixture() {
        const DoFlashLoan = await ethers.getContractFactory("DoFlashLoan");
        // const doFlashLoan = await DoFlashLoan.deploy(process.env.POOL_ADDR_PROVIDER, process.env.OWNER_ADDRESS);
        const doFlashLoan = await DoFlashLoan.deploy(process.env.POOL_ADDR_PROVIDER);

        return { DoFlashLoan, doFlashLoan};
    }

    it(`检查闪电贷资金池是否连接成功`, async function() {
        const { doFlashLoan } = await loadFixture(deployTokenFixture);
        
        const reserves = await doFlashLoan.getReservesList();
        
        assert(reserves.length > 0,  "可借贷资产数量不为0");
        assert(reserves[1].substring(0, 2) == "0x",  "可借贷资产内容是Token地址");
    });

    it(`测试贷款功能`, async function() {
        const { doFlashLoan } = await loadFixture(deployTokenFixture);
        
        const aToken = process.env.A_TOKEN;

        await doFlashLoan.requireFlashLoan(aToken, 100);
    });
});