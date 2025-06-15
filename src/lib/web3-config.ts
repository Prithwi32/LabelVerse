
import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const projectId = 'your-project-id' // Replace with your WalletConnect project ID

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

export { sepolia }
