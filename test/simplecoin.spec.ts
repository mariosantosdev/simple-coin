import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleCoin } from "../typechain-types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe('SimpleCoin', async () => {
    let simpleCoin: SimpleCoin;
    let owner: SignerWithAddress
    let receiver: SignerWithAddress

    beforeEach(async () => {
        const SimpleCoin = await ethers.getContractFactory('SimpleCoin')
        simpleCoin = await SimpleCoin.deploy()

        const [signers] = await Promise.all([ethers.getSigners(), simpleCoin.deployed()])
        owner = signers[0]
        receiver = signers[1]
    })

    it('should get the name of the token', async () => {
        expect(await simpleCoin.name()).to.equal('SimpleCoin')
    })

    it('should get the symbol of the token', async () => {
        expect(await simpleCoin.symbol()).to.equal('SIC')
    })

    it('should get the total supply of the token', async () => {
        expect(await simpleCoin.totalSupply()).to.equal(100000)
    })

    it('should get the balance of the owner', async () => {
        expect(await simpleCoin.balanceOf(owner.address)).to.equal(100000)
    })

    it('should transfer tokens from owner to receiver', async () => {
        const receiverBalanceBefore = await simpleCoin.balanceOf(receiver.address)
        const amountToTransfer = 1000

        await simpleCoin.transfer(receiver.address, amountToTransfer)
        expect(await simpleCoin.balanceOf(receiver.address)).to.equal(receiverBalanceBefore.add(amountToTransfer))
    })

    it('should not transfer tokens from owner to receiver if the owner does not have enough tokens', async () => {
        const receiverBalanceBefore = await simpleCoin.balanceOf(receiver.address)
        
        const invalidTransfer = simpleCoin.transfer(receiver.address, 100000000)

        await expect(invalidTransfer).to.be.revertedWith('Insufficient balance')
        expect(await simpleCoin.balanceOf(receiver.address)).to.equal(receiverBalanceBefore)
    })

    it('should decrease the balance of the owner after a transfer', async () => {
        const ownerBalanceBefore = await simpleCoin.balanceOf(owner.address)
        const amountToTransfer = 1000

        await simpleCoin.transfer(receiver.address, amountToTransfer)
        expect(await simpleCoin.balanceOf(owner.address)).to.equal(ownerBalanceBefore.sub(amountToTransfer))
    })

    it('should not transfer tokens from owner to receiver if the receiver is the zero address', async () => {
        const invalidTransfer = simpleCoin.transfer('0x0', 1000);
        expect(invalidTransfer).to.be.revertedWith('Invalid address')
    })
})