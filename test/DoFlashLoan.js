const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
const { parseUnits } = require("@ethersproject/units")

describe("测试DoFlashLoan合约逻辑", function() {

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

    it(`测试贷款功能`, async function() {
        const { doFlashLoan } = await loadFixture(deployTokenFixture);
        
        const aToken = process.env.A_TOKEN;

        const [owner] = await ethers.getSigners();
        
        // 合约的初始金额为0
        expect(await doFlashLoan.getBalance()).to.equal(0);
        console.log(doFlashLoan.address);

        // 向合约转账
        await owner.sendTransaction({
            to: doFlashLoan.address,
            value: 100000000000
        });
        
        // await doFlashLoan.connect(owner).requireFlashLoan(aToken, 100, 
        //     { 
        //         gasLimit: 200000, 
        //         gasPrice: 125000000000 
        //     }
        // );
    });
});