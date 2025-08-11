-include .env

ifneq (,$(wildcard .env))
	include .env
	export
endif

.PHONY: all test clean deploy fund help install snapshot format anvil zktest

# Update Dependencies
update:; forge update

build:; forge build

zkbuild :; forge build --zksync

test :; forge test --match-test ${test} -vvvv
# test :; forge test

zktest :; foundryup-zksync && forge test --zksync && foundryup

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

zk-anvil :; npx zksync-cli dev start

coverage :; forge coverage --report debug > coverage.txt

# Push with a single command
push:
	git add .
	git commit -m "${msg}"
	git branch -M main
	git push -u origin main 

deploy:
	@forge script script/DeployRaffle.s.sol:DeployRaffle $(NETWORK_ARGS)

createSubscription:
	@forge script script/Interactions.s.sol:CreateSubscription $(NETWORK_ARGS)

addConsumer:
	@forge script script/Interactions.s.sol:AddConsumer $(NETWORK_ARGS)

fundSubscription:
	@forge script script/Interactions.s.sol:FundSubscription $(NETWORK_ARGS)

deploy-sepolia:
	@forge script script/DeployRaffle.s.sol:DeployRaffle \
		--rpc-url $(SEPOLIA_RPC_URL) \
		--broadcast \
		--account default \
		--verify \
		--etherscan-api-key $(ETHERSCAN_API_KEY) \
