import { task } from "hardhat/config";
import { IPancakeRouter01__factory } from "../typechain-types/factories/IPancakeRouter.sol";
import "dotenv/config";
import { PepeFarmersToken__factory } from "../typechain-types/factories/PepeFarmersToken.sol";
import { IPancakeFactory__factory } from "../typechain-types/factories";

// npx hardhat add_liquidity --network testnetBSC --token 0x5118a67aA346561a39f982E17C8Aa1C634FBD3d7
task("add_liquidity", "Создаёт пул ликвидности и добавляет ликвидность")
  .addParam("token", "Адрес контракта токена")
  .setAction(async (taskArgs, { ethers }) => {
    const deployer = await ethers.getSigner(process.env.DEPLOYER_ADDRESS!);

    const token = await PepeFarmersToken__factory.connect(
      taskArgs.token,
      deployer
    );

    //выдаём аппрув на роутер
    const txApprove = await token.approve(
      process.env.PANCAKESWAP_ROUTER!,
      ethers.constants.MaxUint256
    );
    await txApprove.wait();

    const balanceInBNB = await deployer.getBalance();
    console.log(
      `BNB balance of ${deployer.address}: ${ethers.utils.formatEther(
        balanceInBNB
      )}`
    );

    const amountTokenDesired = await token.balanceOf(deployer.address);
    const amountBNBMin = ethers.utils.parseEther("0.1");
    const amountTokenMin = amountTokenDesired.mul(90).div(100);
    const deadline = Math.floor(Date.now() / 1000) + 20 * 60; // текущее время + 20 минут
    const router = IPancakeRouter01__factory.connect(
      process.env.PANCAKESWAP_ROUTER!,
      deployer
    );

    const txLiquidity = await router.addLiquidityETH(
      token.address,
      amountTokenDesired,
      amountTokenMin,
      amountBNBMin,
      deployer.address,
      deadline,
      {
        value: ethers.utils.parseEther(process.env.LIQUIDITY_IN_BNB!),
        gasLimit: 3000000,
      }
    );
    await txLiquidity.wait();

    const factory = await IPancakeFactory__factory.connect(
      await router.factory(),
      deployer
    );
    const WBNBAddress = await router.WETH();

    const txSetPair = await token.setPancakeSwapPair(
      await factory.getPair(token.address, WBNBAddress)
    );
    await txSetPair.wait()
    console.log(
      "Liquidity added. Pool address: " +
        (await factory.getPair(token.address, WBNBAddress))
    );
  });
