// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Escrow.sol";

contract EscrowFactory {
    Escrow[] public escrowClones;

    function createEscrow(
        address _payer,
        address payable _payee,
        uint _amount
    ) external returns (Escrow escrow_, uint256 length_) {
        escrow_ = new Escrow(_payer, _payee, _amount);

        escrowClones.push(escrow_);

        length_ = escrowClones.length;
    }

    function getEscrowClones() external view returns (Escrow[] memory) {
        return escrowClones;
    }
}
