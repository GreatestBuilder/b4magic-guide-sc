import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const NFTModule = buildModule("NFTModule", (m) => {
  // Parameters for the NFT contract
  const baseURI = m.getParameter("baseURI", "https://ipfs.io/ipfs/");

  // Deploy the NFT contract
  const nft = m.contract("GodOfDecisionNFT", [baseURI]);

  return { nft };
});

export default NFTModule;
