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

export interface SignatureVerifierMuxerInterface extends utils.Interface {
  functions: {
    "setDomainVerifier(bytes32,address)": FunctionFragment;
    "setFallbackHandler(address)": FunctionFragment;
    "domainVerifiers(address,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "setDomainVerifier"
      | "setFallbackHandler"
      | "domainVerifiers"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "setDomainVerifier",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFallbackHandler",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "domainVerifiers",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "setDomainVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFallbackHandler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "domainVerifiers",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SignatureVerifierMuxer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SignatureVerifierMuxerInterface;

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
    setDomainVerifier(
      domainSeparator: PromiseOrValue<BytesLike>,
      newVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFallbackHandler(
      handler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    domainVerifiers(
      safe: PromiseOrValue<string>,
      domainSeparator: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  setDomainVerifier(
    domainSeparator: PromiseOrValue<BytesLike>,
    newVerifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFallbackHandler(
    handler: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  domainVerifiers(
    safe: PromiseOrValue<string>,
    domainSeparator: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    setDomainVerifier(
      domainSeparator: PromiseOrValue<BytesLike>,
      newVerifier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFallbackHandler(
      handler: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    domainVerifiers(
      safe: PromiseOrValue<string>,
      domainSeparator: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    setDomainVerifier(
      domainSeparator: PromiseOrValue<BytesLike>,
      newVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFallbackHandler(
      handler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    domainVerifiers(
      safe: PromiseOrValue<string>,
      domainSeparator: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    setDomainVerifier(
      domainSeparator: PromiseOrValue<BytesLike>,
      newVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFallbackHandler(
      handler: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    domainVerifiers(
      safe: PromiseOrValue<string>,
      domainSeparator: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
