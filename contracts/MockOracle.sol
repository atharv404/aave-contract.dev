// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MockOracle
 * @notice Mock price oracle for testing price manipulation scenarios
 * @dev Implements IManualPriceOracle interface for compatibility with TestAaveLiquidation
 */
contract MockOracle {
    address public owner;
    
    // Mapping of asset address to price (in USD with 8 decimals like Chainlink)
    mapping(address => uint256) private prices;
    
    event PriceSet(address indexed asset, uint256 price);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can set prices");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        
        // Initialize with reasonable default prices (8 decimals for USD price)
        // WETH: ~$2400 USD -> 2400 * 10^8 = 240000000000
        // DAI: ~$1 USD -> 1 * 10^8 = 100000000
        // These will be overridden by actual addresses in tests
    }
    
    /**
     * @notice Set the price for a specific asset
     * @param asset The address of the asset
     * @param price The price in USD with 8 decimals (Chainlink format)
     */
    function setPrice(address asset, uint256 price) external onlyOwner {
        require(asset != address(0), "Invalid asset address");
        require(price > 0, "Price must be greater than 0");
        
        prices[asset] = price;
        emit PriceSet(asset, price);
    }
    
    /**
     * @notice Get the price for a specific asset
     * @param asset The address of the asset
     * @return The price in USD with 8 decimals
     */
    function getPrice(address asset) external view returns (uint256) {
        uint256 price = prices[asset];
        require(price > 0, "Price not set for this asset");
        return price;
    }
    
    /**
     * @notice Transfer ownership to a new address
     * @param newOwner The address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner address");
        owner = newOwner;
    }
}
