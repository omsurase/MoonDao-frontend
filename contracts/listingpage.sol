// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Strings.sol";

contract DataContract {
    string public name;
    string public description;
    string public createdAt;
    uint256 public priceWei;
    uint256 public purchases;
    string public keywords;
    string public size;
    address public owner;
    bool public active;
    string private dataUrl;

    uint256 public MIN_PURCHASES = 3;
    uint256 public MAX_FLAGS = 3;
    uint256 flags;
    mapping(address => bool) flaggedMap;

    event PurchaseCompleted(address indexed purchaseAddress);
    event PageFlagged(address indexed reporterAddress, string reason);

    constructor(
        string memory _name,
        string memory _description,
        string memory _dataUrl,
        uint256 _priceWei,
        string memory _createdAt,
        string memory _keywords,
        string memory _size
    ) {
        owner = msg.sender;
        name = _name;
        description = _description;
        dataUrl = _dataUrl;
        priceWei = _priceWei;
        createdAt = _createdAt;
        keywords = _keywords;
        size = _size;

        purchases = 0;
        active = true;
    }

    function purchaseData() public payable returns (string memory) {
        require(
            flags <= MAX_FLAGS,
            "DataContract has been flagged and is no longer valid"
        );
        require(
            msg.value == priceWei,
            "Incorrect amount on message for purchase"
        );

        if (purchases == MIN_PURCHASES) {
            payable(owner).transfer(address(this).balance);
        } else if (purchases > MIN_PURCHASES) {
            payable(owner).transfer(msg.value);
        }

        purchases += 1;
        emit PurchaseCompleted(msg.sender);
        return dataUrl;
    }

    function setPrice(uint256 _priceWei) public {
        require(
            msg.sender == owner,
            "Only the contract owner may call this function"
        );
        priceWei = _priceWei;
    }

    function flagDataset(string memory reason) public returns (uint256) {
        bool flagged = flaggedMap[msg.sender];
        require(!flagged, "You have already flagged this page");

        flaggedMap[msg.sender] = true;
        flags += 1;
        emit PageFlagged(msg.sender, reason);
        return flags;
    }

    function toggleActive() public {
        require(
            msg.sender == owner,
            "Only the contract owner may call this function"
        );
        active = !active;
    }

    function getDescription() public view returns (string memory) {
        return description;
    }

    function getMetadataString() public view returns (string memory) {
        return
            string.concat(
                name,
                "|",
                description,
                "|",
                Strings.toString(priceWei),
                "|",
                Strings.toString(purchases),
                "|",
                keywords,
                "|",
                size,
                "|",
                createdAt,
                "|",
                (active && flags <= MAX_FLAGS) ? "active" : "inactive"
            );
    }
}
