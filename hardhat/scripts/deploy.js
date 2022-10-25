const { ethers } = require("hardhat");

async function main() {
  const CeloNFTFactory = await ethers.getContractFactory("CeloNFT");
  const celoNftContract = await CeloNFTFactory.deploy()
  await celoNftContract.deployed();

  console.log("Celo NFT deployed to:", celoNftContract.address)

  const NFTMarketplaceFactory = await ethers.getContractFactory(
    "NFTMarketplace"
  )

  const nftMarketplaceContract = await NFTMarketplaceFactory.deploy();
  await nftMarketplaceContract.deployed();

  console.log("NFT Marketplace deployed to:", nftMarketplaceContract.address);

}

main().then(() => process.exit(0))
.catch((err)=>{
  console.error(err);
  process.exit(1)
})