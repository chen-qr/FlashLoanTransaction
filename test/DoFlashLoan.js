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

        const testNum = await doFlashLoan.getTestNum();
        assert(testNum == 1,  "测试合约是否实例化");
        
        const reserves = await doFlashLoan.getReservesList();
        console.log(reserves);
        assert(reserves.length > 0,  "存在可借贷的资产");
    });
});