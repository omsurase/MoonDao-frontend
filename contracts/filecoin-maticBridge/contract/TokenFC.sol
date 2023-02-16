// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenBasic.sol';

contract TokenEth is TokenBase {
  constructor() TokenBase('DecaOrg', 'DCOG') {}
}