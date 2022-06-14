// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {
    uint256 public numOfFunders;
    mapping(uint256 => address) public funders;

    constructor() {
        owner = msg.sender;
    }

    modifier limitWithdraw(uint256 amount) {
        require(
            amount <= 100000000000000000000000000000,
            "Cannot withdraw more than X ETH"
        );
        _; // execute le body de la méthode suivante
    }

    receive() external payable {}

    function emitLog() public pure override returns (bytes32) {
        return "hello";
    }

    function addFunds() external payable override {
        uint256 index = numOfFunders++;
        funders[index] = msg.sender;
    }

    function withdraw(uint256 amount) external override limitWithdraw(amount) {
        payable(msg.sender).transfer(amount);
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory _funders = new address[](numOfFunders);

        for (uint256 i = 0; i < numOfFunders; i++) {
            _funders[i] = funders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return funders[index];
    }

    // const instance = await Faucet.deployed()
    // instance.addFunds({from: accounts[0], value: "2"})
}
