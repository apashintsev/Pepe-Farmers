import { task } from "hardhat/config";
import { PepeFarmersToken__factory } from "../typechain-types/factories/PepeFarmersToken.sol";
import "dotenv/config";

// npx hardhat set_fee --network testnetBSC --token 0x5118a67aA346561a39f982E17C8Aa1C634FBD3d7 --fee 1.2
task(
  "set_fee",
  "Занесет адрес в белый список (комиссии на него не будут действовать)"
)
  .addParam("token", "Адрес контракта токена")
  .addParam("fee", "Адрес для добавления в вайтлист")
  .setAction(async (taskArgs, { ethers }) => {
    const deployer = await ethers.getSigner(process.env.DEPLOYER_ADDRESS!);

    const token = await PepeFarmersToken__factory.connect(
      taskArgs.token,
      deployer
    );

    const txSetFee = await token.setFee(ethers.utils.parseEther(taskArgs.fee));
    await txSetFee.wait();

    console.log(`Fee setted to ; ${taskArgs.fee}`);
  });
