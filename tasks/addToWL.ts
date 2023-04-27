import { task } from "hardhat/config";
import { PepeFarmersToken__factory } from "../typechain-types/factories/PepeFarmersToken.sol";
import "dotenv/config";

// npx hardhat add_address_to_whitelist --network testnetBSC --token 0x5118a67aA346561a39f982E17C8Aa1C634FBD3d7 --wallet 0x9efE3B3d2C516970B902364444411103d077160D
task(
  "add_address_to_whitelist",
  "Занесет адрес в белый список (комиссии на него не будут действовать)"
)
  .addParam("token", "Адрес контракта токена")
  .addParam("wallet", "Адрес для добавления в вайтлист")
  .setAction(async (taskArgs, { ethers }) => {
    const deployer = await ethers.getSigner(process.env.DEPLOYER_ADDRESS!);

    const token = await PepeFarmersToken__factory.connect(
      taskArgs.token,
      deployer
    );

    const txAddToWl = await token.setExcludeFromFee(taskArgs.wallet);
    await txAddToWl.wait();

    console.log(`Address added to WhiteList; ${taskArgs.wallet}`);
  });
