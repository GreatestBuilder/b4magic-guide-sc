import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("GodOfDecisionNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const nft = await hre.viem.deployContract("GodOfDecisionNFT");

    const publicClient = await hre.viem.getPublicClient();

    return {
      nft,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should have the correct name and symbol", async function () {
      const { nft } = await loadFixture(deployNFTFixture);

      expect(await nft.read.name()).to.equal("God of Decision NFT");
      expect(await nft.read.symbol()).to.equal("GODNFT");
    });
  });

  describe("Minting", function () {
    it("Should mint an NFT and set the correct token URI", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      const CID = "QmTw2TnaGPJWjfVWizrJZLiZY6xmdGCHqsptJrePtiUUxD"; // Example CID
      await nft.write.mintNFT([CID]);

      const tokenId = 0; // First token ID
      const tokenURI = `https://ipfs.io/ipfs/${CID}`;

      expect(await nft.read.tokenURI([tokenId])).to.equal(tokenURI);
    });
  });
});
