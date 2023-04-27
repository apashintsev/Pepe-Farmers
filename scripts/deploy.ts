import hre, { ethers } from "hardhat";
import { PepeFarmersToken } from "../typechain-types/PepeFarmersToken.sol";
import "dotenv/config";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  //Деплой токена
  //деплой скриптом npx hardhat run --network testnetBSC  .\scripts\deploy.ts
  const totalSupply = ethers.utils.parseEther(process.env.TOKEN_TOTAL_SUPPLY!);
  const accounts = await ethers.getSigners();
  const deployer = accounts.find(
    (x) => x.address == process.env.DEPLOYER_ADDRESS
  );

  console.log("Deploying contracts with the account:", deployer?.address);

  const contractFactory = await ethers.getContractFactory("PepeFarmersToken");
  const token: PepeFarmersToken = (await contractFactory.deploy(
    totalSupply,
    process.env.ADDRESS_MARKETING!
  )) as PepeFarmersToken;

  await token.deployed();
  console.log("PepeFarmers Token deployed to:", token.address);

  await sleep(5 * 1000);

  try {
    await hre.run("verify:verify", {
      address: token.address,
      contract: "contracts/PepeFarmersToken.sol:PepeFarmersToken",
      constructorArguments: [totalSupply, process.env.ADDRESS_MARKETING!],
    });
  } catch (e) {
    //console.log(e);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
