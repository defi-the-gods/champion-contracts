const { default: BigNumber } = require('bignumber.js');
const { expect, assert,emit } = require('chai');
var chai = require('chai');
const { ethers } = require("hardhat");
//use default BigNumber
chai.use(require('chai-bignumber')());

// Start test block
describe('Token', function () {
  let owner;
  let addr1;
  let addr2;
  let addr3;
  const provider = ethers.provider

  beforeEach(async function () {
    hToken = await ethers.getContractFactory("Champion");
    
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    Token = await upgrades.deployProxy(hToken, {kind: 'uups'});
    await Token.deployed();
    await Token.setMintActivity(true)
  });

  // Test case
  describe("Deployment", function() {

    it("Should set the right owner" , async function () {
        expect(await Token.owner()).to.equal(owner.address);
      });
    it("Owner should not have any tokens", async function () {
        expect(await Token.balanceOf(owner.address)).not.null
    });
    it("Name should be Champion", async function () {
      expect(await Token.name()).to.equal("champion")
    });
    it("Minting should be active", async function () {
      expect(await Token.mintActive()).to.be.true
      console.log(await Token.cap())
      
    });
    // it("Change owner to addr3", async function() {
    //   await Token.transferOwnership(addr3.address)
    //   expect(await Token.owner()).to.equal(addr3.address)
    //   console.log(await provider.getBalance(addr3.address))
    //   console.log(await provider.getBalance(addr2.address))
    // });    
  });

  describe("Transactions", function() {

  
    it("Mint OGs", async function() {
      for (let i = 1; i < 31; i++) {
        await Token.preMintOG(addr1.address)
      }
      const newAddr1Balance = await Token.balanceOf(addr1.address);
      expect(newAddr1Balance.toString()).to.equal('5');
      for (let i = 1; i < 6; i++) {
        expect(await Token.ownerOf(i)).to.be.equal(addr1.address)
      }
      console.log(await Token.totalSupply())
      console.log(await Token.tokenURI(5000))
    });
      
    it('Mint token', async function() {
      for (let i = 1; i < 2; i++)
      await Token.safeMint(addr1.address,{value:ethers.utils.parseEther("750")})
      
    });
  });
});