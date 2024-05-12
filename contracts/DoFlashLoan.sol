// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import { FlashLoanSimpleReceiverBase } from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import { IERC20 } from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract DoFlashLoan is FlashLoanSimpleReceiverBase {

    constructor(address _addressProvider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {

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
}