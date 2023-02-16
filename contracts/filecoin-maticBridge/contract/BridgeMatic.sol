// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './BridgeBasic.sol';

contract BridgeBsc is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}