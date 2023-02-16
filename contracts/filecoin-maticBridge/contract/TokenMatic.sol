// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenBasic.sol';

contract TokenBsc is TokenBase {
  constructor() TokenBase('DecaOrg', 'DCOG') {}
}