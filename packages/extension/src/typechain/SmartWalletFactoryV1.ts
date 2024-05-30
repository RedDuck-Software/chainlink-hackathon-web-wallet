/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace SmartWalletFactoryV1 {
  export type CommonDeployParamsStruct = {
    linkToken: PromiseOrValue<string>;
    clRegistrar: PromiseOrValue<string>;
    clRegistry: PromiseOrValue<string>;
    uniswapV3Router: PromiseOrValue<string>;
    wethToken: PromiseOrValue<string>;
    wethToLinkSwapPath: PromiseOrValue<BytesLike>;
  };

  export type CommonDeployParamsStructOutput = [
    string,
    string,
    string,
    string,
    string,
    string
  ] & {
    linkToken: string;
    clRegistrar: string;
    clRegistry: string;
    uniswapV3Router: string;
    wethToken: string;
    wethToLinkSwapPath: string;
  };
}

export interface SmartWalletFactoryV1Interface extends utils.Interface {
  functions: {
    "commonDeployParams()": FunctionFragment;
    "counter()": FunctionFragment;
    "create2Wallet(address,address,bytes32)": FunctionFragment;
    "createWallet(address,address)": FunctionFragment;
    "deployedSalts(address)": FunctionFragment;
    "getSalt(address,bytes32)": FunctionFragment;
    "implementation()": FunctionFragment;
    "predictCreate2Wallet(address,bytes32)": FunctionFragment;
    "validateWallet(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "commonDeployParams"
      | "counter"
      | "create2Wallet"
      | "createWallet"
      | "deployedSalts"
      | "getSalt"
      | "implementation"
      | "predictCreate2Wallet"
      | "validateWallet"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "commonDeployParams",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "counter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "create2Wallet",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createWallet",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "deployedSalts",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getSalt",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "implementation",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "predictCreate2Wallet",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "validateWallet",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "commonDeployParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "counter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "create2Wallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deployedSalts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSalt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "implementation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "predictCreate2Wallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "validateWallet",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SmartWalletFactoryV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SmartWalletFactoryV1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    commonDeployParams(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string] & {
        linkToken: string;
        clRegistrar: string;
        clRegistry: string;
        uniswapV3Router: string;
        wethToken: string;
        wethToLinkSwapPath: string;
      }
    >;

    counter(overrides?: CallOverrides): Promise<[BigNumber]>;

    create2Wallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createWallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deployedSalts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getSalt(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    implementation(overrides?: CallOverrides): Promise<[string]>;

    predictCreate2Wallet(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    validateWallet(
      wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  commonDeployParams(
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, string, string, string] & {
      linkToken: string;
      clRegistrar: string;
      clRegistry: string;
      uniswapV3Router: string;
      wethToken: string;
      wethToLinkSwapPath: string;
    }
  >;

  counter(overrides?: CallOverrides): Promise<BigNumber>;

  create2Wallet(
    owner: PromiseOrValue<string>,
    allowlistOperator: PromiseOrValue<string>,
    baseSalt: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createWallet(
    owner: PromiseOrValue<string>,
    allowlistOperator: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deployedSalts(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getSalt(
    sender: PromiseOrValue<string>,
    baseSalt: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  implementation(overrides?: CallOverrides): Promise<string>;

  predictCreate2Wallet(
    sender: PromiseOrValue<string>,
    baseSalt: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  validateWallet(
    wallet: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    commonDeployParams(
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, string, string, string] & {
        linkToken: string;
        clRegistrar: string;
        clRegistry: string;
        uniswapV3Router: string;
        wethToken: string;
        wethToLinkSwapPath: string;
      }
    >;

    counter(overrides?: CallOverrides): Promise<BigNumber>;

    create2Wallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    createWallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    deployedSalts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getSalt(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    implementation(overrides?: CallOverrides): Promise<string>;

    predictCreate2Wallet(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    validateWallet(
      wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    commonDeployParams(overrides?: CallOverrides): Promise<BigNumber>;

    counter(overrides?: CallOverrides): Promise<BigNumber>;

    create2Wallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createWallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deployedSalts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSalt(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    implementation(overrides?: CallOverrides): Promise<BigNumber>;

    predictCreate2Wallet(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    validateWallet(
      wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    commonDeployParams(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    counter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    create2Wallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createWallet(
      owner: PromiseOrValue<string>,
      allowlistOperator: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deployedSalts(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSalt(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    implementation(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    predictCreate2Wallet(
      sender: PromiseOrValue<string>,
      baseSalt: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    validateWallet(
      wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}