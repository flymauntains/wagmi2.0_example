"use client";
import Image from "next/image";
import { ConnectBtn } from "./components/connectButton";
import Profile from "./components/profile";
import GradientButton from "./components/GradientButton";
import PresaleABI from "../assets/abi/presale.json";
import { estimateGas, writeContract, waitForTransactionReceipt, getAccount } from "@wagmi/core"
import { encodeFunctionData, parseUnits } from 'viem'
import {config} from "../lib/config";
import { useAccount, useSimulateContract } from "wagmi";
import { createConfig, http, getConnectorClient  } from '@wagmi/core';
import { bscTestnet } from '@wagmi/core/chains';
import { createClient } from "viem";
import { metaMask,  } from 'wagmi/connectors'


export default function Home() {
 
  // const handleBuyBtn = () => {
  //         console.log("fly")
  //         alert('buytoken');
  //     };
  const { chain } = useAccount();
  
  // const config1 = createConfig({
  //   chains: [bscTestnet],
  //   client({ chain }) {
  //     return createClient({ chain, transport: http() })
  //   },
  //   connectors: [
  //     metaMask(),
  //   ],
  // });
  
  // const client =  getConnectorClient(config1, {
  //   chainId :bscTestnet.id
  // })

  // console.log("fly_client", client)
  const {address} = getAccount(config);
  const handleBuyBtn = async () => {
    console.log("fly_account", address)
    try{
      // console.log("fly_config", config1);
      let data = {
        // chainId: chain?.id,
        address : "0xEE63B693B98d39ac5786903306acBb5D39E08cfc",
        abi : PresaleABI,
        functionName : "mintPresale",
        args: ["100"],
        // value : "0.001",
        value : "1000000000000000000",
      }
      console.log("fly_data", data);
      const encodedData = encodeFunctionData(data);
      console.log("fly_encoded_data", encodedData);
      await estimateGas(config, {
        // chainId :"1",
        ...address,
        // ..."0x0858EACE1906612aD2C050DD65D892660027e5b7",
        data: encodedData,
        to: data.address,
      })
      const txHash = await writeContract(config, {
        ...address,
        ...data,
    })
    console.log("fly_hash", txHash)

    } catch (error) {
      console.error("fly_error:", error)
    }
    }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <ConnectBtn />
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <GradientButton name="Buy Token" onClick={handleBuyBtn} />

      <Profile />
    </main>
  );
}