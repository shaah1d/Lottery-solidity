// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {Raffle} from "../src/Raffle.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {CreateSubscription, FundSubscription, AddConsumer} from "./Interactions.s.sol";

contract DeployRaffle is Script {
    function deployContract() public returns (Raffle, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        if (config.subscriptionId == 0) {
            CreateSubscription createSubscription = new CreateSubscription();

            (
                uint256 returnedSubscriptionId,
                address vrfCoordinatorV2
            ) = createSubscription.createSubscription(config.vrfCoordinatorV2);

            config.vrfCoordinatorV2 = vrfCoordinatorV2;
            config.subscriptionId = uint64(returnedSubscriptionId);
        }

        //Fund 
        FundSubscription fundSubscription = new FundSubscription();
        fundSubscription.fundSubscription(
            config.vrfCoordinatorV2,
            config.subscriptionId,
            config.link
        );
        


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

        AddConsumer addConsumer = new AddConsumer();
        addConsumer.addConsumer(address(raffle), config.vrfCoordinatorV2, config.subscriptionId);
        return (raffle, helperConfig);
    }

    function run() public {
        deployContract();
    }
}
