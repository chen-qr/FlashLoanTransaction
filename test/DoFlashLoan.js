const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");

describe("Test DoFlashLoan", function() {

    async function deployTokenFixture() {
        const DoFlashLoan = await ethers.getContractFactory("DoFlashLoan");
        const doFlashLoan = await DoFlashLoan(process.env.POOL_ADDR_PROVIDER).deploy();

        return { DoFlashLoan, doFlashLoan};
    }

    it(`检查闪电贷资金池是否连接成功`, async function() {
        const { doFlashLoan } = await loadFixture(deployTokenFixture);

        const reserves = await doFlashLoan.getReservesList();
        console.log(reserves);
        assert(reserves.length > 0,  "存在可借贷的资产");
    });
});