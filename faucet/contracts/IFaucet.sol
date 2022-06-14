// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// They cannot inherite from other smart contracts.
// They can only inherite from others interfaces
// They cannot declare a constructor
// They cannot declare state variables
// All functions have to be external

interface IFaucet {
    function addFunds() external payable;

    function withdraw(uint256 amount) external;
}
