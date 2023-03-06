import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lock } from "../../types";
import { Lock__factory } from "../../types";

task("deploy:Lock")
    .addParam("lock","lock contract for timelock")
    .setAction(async function (taskArgs:TaskArguments,{ethers}) {
        const signers: SignerWithAddress[] = await ethers.getSigners();
        const lockFactory: Lock__factory = <Lock__factory>await ethers.getContractFactory("Lock");
        const lock: Lock = <Lock>await lockFactory.connect(signers[0])
                .deploy(taskArgs.unlocktime); //contract contructor params
        await lock.deployed();
        console.log("Lock deployed to: ", lock.address);
    })
