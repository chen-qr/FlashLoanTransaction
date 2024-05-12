const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe("Test DoFlashLoan", function() {

    async function deployTokenFixture() {
        const DoFlashLoan = await ethers.getContractFactory("DoFlashLoan");
        const doFlashLoan = await DoFlashLoan.deploy(process.env.POOL_ADDR_PROVIDER);

        return { DoFlashLoan, doFlashLoan};
    }

    it(`检查闪电贷资金池是否连接成功`, async function() {
        const { doFlashLoan } = await loadFixture(deployTokenFixture);
        
        const reserves = await doFlashLoan.getReservesList();
        
        assert(reserves.length > 0,  "可借贷资产数量不为0");
        assert(reserves[1].substring(0, 2) == "0x",  "可借贷资产内容是Token地址");
    });
});