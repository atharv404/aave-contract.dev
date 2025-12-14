// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IAavePool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
    function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf) external;
    function repay(address asset, uint256 amount, uint256 interestRateMode, address onBehalfOf) external returns (uint256);
    function getUserAccountData(address user)
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        );
}

interface IManualPriceOracle {
    function setPrice(address asset, uint256 price) external;
    function getPrice(address asset) external view returns (uint256);
}

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address a) external view returns (uint256);
}

contract TestAaveLiquidation {
    IAavePool public pool;
    IManualPriceOracle public oracle;
    address public collateralAsset;
    address public debtAsset;
    address public owner;

    struct HFRecord {
        uint256 blockNumber;
        uint256 timestamp;
        uint256 healthFactor;
    }

    HFRecord[] public healthHistory;

    event Supplied(address asset, uint256 amount);
    event Borrowed(address asset, uint256 amount, uint256 rateMode);
    event Withdrawn(address asset, uint256 amount);
    event Repaid(address asset, uint256 amount);
    event PriceUpdated(address asset, uint256 newPrice);
    event HealthFactorRecorded(uint256 blockNumber, uint256 timestamp, uint256 healthFactor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _pool, address _oracle, address _collateralAsset, address _debtAsset) {
        pool = IAavePool(_pool);
        oracle = IManualPriceOracle(_oracle);
        collateralAsset = _collateralAsset;
        debtAsset = _debtAsset;
        owner = msg.sender;
    }

    // FIX: Removed {value: amount} - Aave doesn't accept ETH directly
    // All assets must be ERC20 tokens
    function supply(address asset, uint256 amount) external {
        require(asset != address(0), "Native ETH not supported in Aave V3");
        
        // Transfer tokens FROM msg.sender TO this contract
        require(IERC20(asset).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        // Approve pool to spend tokens
        require(IERC20(asset).approve(address(pool), amount), "Approval failed");
        
        // Supply to Aave
        pool.supply(asset, amount, address(this), 0);
        
        emit Supplied(asset, amount);
        _recordHealthFactor();
    }

    function withdraw(address asset, uint256 amount) external onlyOwner {
        pool.withdraw(asset, amount, address(this));
        emit Withdrawn(asset, amount);
        _recordHealthFactor();
    }

    function borrow(address asset, uint256 amount, uint256 rateMode) external onlyOwner {
        pool.borrow(asset, amount, rateMode, 0, address(this));
        emit Borrowed(asset, amount, rateMode);
        _recordHealthFactor();
    }

    function setPriceFeedValue(address asset, uint256 newPrice) external onlyOwner {
        require(newPrice > 0, "price zero");
        oracle.setPrice(asset, newPrice);
        emit PriceUpdated(asset, newPrice);
        _recordHealthFactor();
    }

    function getHealthFactor() public view returns (uint256) {
        (, , , , , uint256 hf) = pool.getUserAccountData(address(this));
        return hf;
    }

    function getPrice(address asset) external view returns (uint256) {
        return oracle.getPrice(asset);
    }

    function getHealthHistoryLength() external view returns (uint256) {
        return healthHistory.length;
    }

    function getHealthHistory(uint256 index) external view returns (HFRecord memory) {
        require(index < healthHistory.length, "Index out of bounds");
        return healthHistory[index];
    }

    function _recordHealthFactor() internal {
        uint256 hf = getHealthFactor();
        healthHistory.push(HFRecord({
            blockNumber: block.number,
            timestamp: block.timestamp,
            healthFactor: hf
        }));
        emit HealthFactorRecorded(block.number, block.timestamp, hf);
    }

    receive() external payable {}
}
