# FlashLoanUsage

## 闪电贷

闪电贷是通过智能合约的**原子性**，来实现的**无抵押**借贷业务。

原子性和无抵押：

- 原子性是通过**事务**来保证的。事务包含的所有操作，例如转账、状态更新等，必须完整执行，如果任何一个步骤失败，整个事务会被回滚到初始状态。

- 闪电贷的贷款、还款行为，是在同一个事务中完成。如果还款操作失败，那么事务就会被回滚，相当于贷款操作也没有发生。

- 用原子性来保证了闪电贷的借贷安全，从而实现无抵押借贷。

## 合约事务机制

### 建立事务机制的原因

#### 数据一致性

每个智能合约都维护一个状态数据，包含变量值、账户余额等信息。

事务机制能确保在合约执行过程中，如果出现任何异常，系统可以回滚到执行前状态，确保数据一致性。

在传统数据库，例如MySQL，也是通过事务机制，来保证数据的一致性。

#### 程序安全性

事务机制增加了智能合约的安全性。通过严格的状态检查和回滚机制，能够防止恶意用户利用合约的漏洞进行攻击。例如，避免**重入攻击**等常见智能合约攻击手段。

<!-- 重入攻击：
1. 合约A调用外部合约B的某个函数。
2. 合约B在其函数中调用合约A的回调函数。
3. 合约A的回调函数在状态更新之前，再次调用合约B的函数。
4. 由于合约A的状态尚未更新，攻击者可以重复执行某些操作，导致不正确的状态变化。 -->

##### 支撑Gas机制

以太坊的每个交易在执行时都会消耗一定的gas，这是为了防止恶意和错误的代码导致资源被恶意消耗。

每笔交易都会有Gas Limit 和 Gas Price，Gas Limit是交易中能消耗的最大Gas量，Gas Price是每单位Gas的价格，为Wei为单位。

如果交易在执行过程中耗尽了Gas，EVM会停止执行，并回滚到交易的初始状态，但已消耗的Gas仍需要支付。