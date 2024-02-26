// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

error AMOUNT_CANT_BE_ZERO();
error SENDER_MUST_BE_PAYEE();
error AMOUNT_CANT_BE_MORE_THAN_ESCROW_AMOUNT();
error CANNOT_RELEASE_FUNDS_BEFORE_FULL_AMOUNT_IS_SENT();
error ONLY_LAWYER_CAN_RELEASE_FUNDS();

contract Escrow {
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;

    constructor(address _payer, address payable _payee, uint _amount) {
        payer = _payer;
        payee = _payee;
        lawyer = msg.sender;
        amount = _amount;
    }

    function deposit() external payable {
        if (msg.value <= 0) revert AMOUNT_CANT_BE_ZERO();

        if (msg.sender == payer) revert SENDER_MUST_BE_PAYEE();

        if (msg.value > amount) revert AMOUNT_CANT_BE_MORE_THAN_ESCROW_AMOUNT();
    }

    function release() external {
        if (address(this).balance != amount)
            revert CANNOT_RELEASE_FUNDS_BEFORE_FULL_AMOUNT_IS_SENT();

        if (msg.sender != lawyer) revert ONLY_LAWYER_CAN_RELEASE_FUNDS();

        payee.transfer(amount);
    }

    function balanceOf() external view returns (uint) {
        return address(this).balance;
    }
}
