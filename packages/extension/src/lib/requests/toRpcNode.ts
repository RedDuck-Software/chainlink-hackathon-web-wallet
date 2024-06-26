import { ethers } from 'ethers';
import { getCustomError } from '../errors';
import { BackgroundOnMessageCallback } from '../message-bridge/bridge';
import {
  RuntimePostMessagePayload,
  RuntimePostMessagePayloadType,
} from '../message-bridge/types';
import { EthereumRequest, JsonRpcRequest } from '../providers/types';
import Storage, { StorageNamespaces } from '../storage';

import eth from '../../assets/img/network_eth.svg';
import poly from '../../assets/img/network_polygon.svg';
import avax from '../../assets/img/network_avax.svg';

export const makeRpcRequest: BackgroundOnMessageCallback<
  unknown,
  EthereumRequest
> = async (request) => {
  const req = request.msg;

  if (!req) {
    throw getCustomError('ethRequestAccounts: invalid data');
  }

  const curNetwork = await getCurrentNetwork();
  const res = await curNetwork.rpcProvider.send(req.method, req.params ?? []);
  console.log('rpc req result', res);
  return res;
};

export const getCurrentNetwork = async () => {
  const storageCommon = new Storage(StorageNamespaces.COMMON);
  let selectedNetwork = await storageCommon.get<string>('selectedNetwork');

  if (!selectedNetwork) {
    const defaultNetwork = getDefaultNetwork();
    selectedNetwork = defaultNetwork.name;
    await storageCommon.set('selectedNetwork', defaultNetwork.name);
  }

  return getSupportedNetworks().find((v) => v.name === selectedNetwork)!;
};

export const getDefaultNetwork = () => {
  return getNetwork('Sepolia')!;
};
export const getNetwork = (name: string) => {
  return getSupportedNetworks().find((v) => v.name === name);
};
export const getNetworkByChainId = (id: string) => {
  return getSupportedNetworks().find((v) => v.chainId === parseInt(id, 16));
};
export const getSupportedNetworks = () => {
  // todo: take this from local storage
  const networkConfig = [
    {
      jsonRpcUrl:
        'https://sepolia.infura.io/v3/44aadb4903f8450dba123bf5d29a8587',
      explorer: 'https://sepolia.etherscan.io',
      chainId: 11155111,
      name: 'Sepolia',
      nativeName: 'Sepolia Ether',
      nativeSymbol: 'SEP ETH',
      image: eth,
      coingeckoId: 'ethereum',
    },
    {
      jsonRpcUrl:
        'https://mainnet.infura.io/v3/44aadb4903f8450dba123bf5d29a8587',
      explorer: 'https://etherscan.io',
      chainId: 1,
      name: 'Ethereum',
      nativeName: 'Ether',
      nativeSymbol: 'ETH',
      image: eth,
      coingeckoId: 'ethereum',
    },
    {
      jsonRpcUrl:
        'https://polygon-mainnet.infura.io/v3/44aadb4903f8450dba123bf5d29a8587',
      explorer: 'https://polygonscan.com',
      chainId: 137,
      name: 'Polygon',
      nativeName: 'Matic',
      nativeSymbol: 'MATIC',
      image: poly,
      coingeckoId: 'polygon', // FIXME
    },
    {
      jsonRpcUrl:
        'https://avalanche-mainnet.infura.io/v3/44aadb4903f8450dba123bf5d29a8587',
      explorer: 'https://snowtrace.io',
      chainId: 43114,
      name: 'Avalanche',
      nativeName: 'AVAX',
      nativeSymbol: 'AVAX',
      image: poly,
      coingeckoId: 'avax', // FIXME
    },
  ];
  return networkConfig.map((v) => ({
    ...v,
    rpcProvider: new ethers.providers.JsonRpcProvider(v.jsonRpcUrl, v.chainId),
  }));
};
