import { http, createStorage, cookieStorage, createConfig } from 'wagmi'
import { sepolia, bscTestnet, blastSepolia } from 'wagmi/chains'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = '01f43ceb6cab6043daf5c7a457564c34';

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

const metadata = {
    name: 'Nextjs connector issue',
    description: 'Nextjs connector issue',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  };

export const config = getDefaultConfig({
   appName: 'NFTPresale',
   projectId,
   enableCoinbase: true,
  enableEIP6963: true,
  enableInjected: true,
  enableWalletConnect: true,
  metadata,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
    storage: cookieStorage,
   }),
  transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
 }); 