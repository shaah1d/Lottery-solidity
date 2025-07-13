// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {VRFCoordinatorV2_5Mock} from "@chainlink/contracts/src/v0.8/vrf/mocks/VRFCoordinatorV2_5Mock.sol";
import {LinkToken} from "test/mocks/LinkToken.sol";

abstract contract codeContracts {
    // vrf valus //
    uint96 public MOCK_BASE_FEE = 0.25 ether;
    uint96 public MOCK_GAS_PRICE_LINK = 1e9;
    int256 public MOCK_WEI_PER_UNIT_LINK = 1e9;

    uint256 public constant ETH_SEPOLIA = 11155111;
    uint256 public constant LOCAL_CHAIN = 31337;

    error HelperConfig__InvalidChainId();
}

contract HelperConfig is codeContracts, Script {
    struct NetworkConfig {
      
        address vrfCoordinatorV2;
        uint256 entranceFee;
        uint256 interval;
        bytes32 keyHash;
        uint64 subscriptionId;
        uint32 callbackGasLimit;
        address link;
    }

    NetworkConfig public localNetworkConfig;
    mapping(uint256 chainId => NetworkConfig) public networkConfigs;

    constructor() {
        networkConfigs[ETH_SEPOLIA] = getSepholiaEthConfig();
    }

    function getConfigBYChainId(
        uint256 chainid
    ) public returns (NetworkConfig memory) {
        if (networkConfigs[chainid].vrfCoordinatorV2 != address(0)) {
            return networkConfigs[chainid];
        } else if (chainid == LOCAL_CHAIN) {
            return getOrCreateAnvilEthConfig();
        } else {
            revert HelperConfig__InvalidChainId();
        }
    }
    function getConfig() public returns (NetworkConfig memory){
        return getConfigBYChainId(block.chainid);
    }

    function getSepholiaEthConfig() public pure returns (NetworkConfig memory) {
        return
            NetworkConfig({
               
                vrfCoordinatorV2: 0xABcdEFABcdEFabcdEfAbCdefabcdeFABcDEFabCD,
                entranceFee: 0.01 ether,
                interval: 30, // use seconds as uint without the `seconds` keyword
                keyHash: 0x000000000000000000000000abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde,
                subscriptionId: 0,
                callbackGasLimit: 500000,
                link: 0x779877A7B0D9E8603169DdbD7836e478b4624789
            });
    }

    function getOrCreateAnvilEthConfig() public returns (NetworkConfig memory) {
        if (localNetworkConfig.vrfCoordinatorV2 != address(0)) {
            return localNetworkConfig;
        }

        vm.startBroadcast();
        VRFCoordinatorV2_5Mock vrfCoordinatorV2 = new VRFCoordinatorV2_5Mock(
            MOCK_BASE_FEE,
            MOCK_GAS_PRICE_LINK,
            MOCK_WEI_PER_UNIT_LINK
        );
        LinkToken link = new LinkToken();
        vm.stopBroadcast();

        localNetworkConfig = NetworkConfig({
           // Raffle contract address will be set later
            vrfCoordinatorV2: address(vrfCoordinatorV2),
            entranceFee: 0.01 ether,
            interval: 30,
            keyHash: 0x000000000000000000000000abcdeabcdeabcdeabcdeabcdeabcdeabcdeabcde,
            subscriptionId: 0,
            callbackGasLimit: 500000,
            link: address(link)
        });
         return localNetworkConfig;
    }
}
