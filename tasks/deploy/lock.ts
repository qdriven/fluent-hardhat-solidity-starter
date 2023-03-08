import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Lock } from "../../types";
import { Lock__factory } from "../../types";

task("deploy:Lock")
    .addParam("unlockTime","unlock time")
    .setAction(async function (taskArgs:TaskArguments,{ethers}) {
        if(taskArgs.unlockTime === null){
          taskArgs.unlockTime=1678270500
        }
        const signers: SignerWithAddress[] = await ethers.getSigners();
        const lockFactory: Lock__factory = <Lock__factory>await ethers.getContractFactory("Lock");
        const lock: Lock = <Lock>await lockFactory.connect(signers[0])
                .deploy(); //contract contructor params
        await lock.deployed();
        console.log("Lock deployed to: ", lock.address);
    });
