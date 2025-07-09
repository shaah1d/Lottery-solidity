-include .env

.PHONY: all test clean deploy fund help install snapshot format anvil zktest

# Update Dependencies
update:; forge update

build:; forge build

zkbuild :; forge build --zksync

test :; forge test

zktest :; foundryup-zksync && forge test --zksync && foundryup

snapshot :; forge snapshot

format :; forge fmt

anvil :; anvil -m 'test test test test test test test test test test test junk' --steps-tracing --block-time 1

zk-anvil :; npx zksync-cli dev start

# Push with a single command
push:
	git add .
	git commit -m "${msg}"
	git branch -M main
	git push -u origin main --force