// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployRaffle is Script {
    function deployRaffle() public returns (Raffle, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();
vm.startBroadcast();
Raffle raffle = new Raffle(
            config.vrfCoordinatorV2,
            config.entranceFee,
            config.interval,
            config.keyHash,
            config.subscriptionId,
            config.callbackGasLimit
        );
        vm.stopBroadcast();
        return (raffle, helperConfig);
    }

    function run() public {}
}
