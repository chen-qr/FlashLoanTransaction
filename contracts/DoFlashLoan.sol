// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import { FlashLoanSimpleReceiverBase } from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IERC20 } from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract DoFlashLoan is FlashLoanSimpleReceiverBase {

    address private owner;

    constructor(address _addressProvider, address initialOwner) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {
        require(initialOwner != address(0), "Owner address cannot be the zero address.");
        owner = initialOwner;
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        
        // 接受到贷款后，处理贷款的使用逻辑，用贷款赚钱
        
        // 贷款使用逻辑执行完后，执行还款逻辑
        uint256 totalAmount = amount + premium;
        IERC20(asset).approve(address(POOL), totalAmount);
        return true;
    }

    // 向闪电贷申请贷款
    function requireFlashLoan(address assetToken, uint256 amount) public {
        require(msg.sender == owner, "Only onwer can call!");
        
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            owner,  // 贷款到Owner地址中
            assetToken, 
            amount, 
            params, 
            referralCode 
        );
    }

    function getReservesList() external view returns (address[] memory) {
        return POOL.getReservesList();
    }

    receive() external payable {}
}