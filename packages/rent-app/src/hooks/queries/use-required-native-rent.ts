import { timeout } from '@/helpers/timeout';
import { useQuery } from '@tanstack/react-query';
import { hotNfts } from '@/mocks/nfts';
import { Address, Hex, parseUnits } from 'viem';
import { MoralisResult } from '@/pages/api/get-nfts';
import { useAccount, useReadContract, useSimulateContract } from 'wagmi';
import { uniswapV3Quoter } from '@/abi/UniswapV3Quoter';
import { useRequestUserAccountsProxyWallet } from '../use-request-user-accounts-proxy-wallet';

type Info = {
  nativeToLinkPath: Hex;
  uniV3Quoter: Hex;
  linkFee: bigint;
};

const swapInfoPerNetwork: Record<number, Info> = {
  11155111: {
    nativeToLinkPath:
      '0x779877a7b0d9e8603169ddbd7836e478b4624789000bb8fff9976782d46cc05630d1f6ebab18b2324d6b14',
    uniV3Quoter: '0xEd1f6473345F45b75F8179591dd5bA1888cf2FB3',
    linkFee: parseUnits('7', 18),
  },
  137: {
    nativeToLinkPath:
      '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39000bb80d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    uniV3Quoter: '0x61fFE014bA17989E743c5F6cB21bF9697530B21e',
    linkFee: parseUnits('2', 18),
  },
};

export const useRequiredNativeRent = () => {
  const { chainId } = useRequestUserAccountsProxyWallet();

  // if(!chainId) return BigInt(0);
  const info = chainId ? swapInfoPerNetwork[chainId!] : undefined;
  // if (!info) return BigInt(0);

  const { data } = useSimulateContract({
    address: info?.uniV3Quoter!,
    abi: uniswapV3Quoter,
    functionName: 'quoteExactOutput',
    args: [info?.nativeToLinkPath!, info?.linkFee!],
  });

  console.log({ data: data?.result });

  if (!data || !data.result) return BigInt(0);

  return data.result[0] + data.result[0] / BigInt(10);
};
