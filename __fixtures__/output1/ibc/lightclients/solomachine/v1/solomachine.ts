import { _m0 } from "protobuf/minimal";
import { Long, isSet, bytesFromBase64, base64FromBytes } from "@osmonauts/helpers";
import { Any } from "../../../../google/protobuf/any";
import { ConnectionEnd } from "../../../core/connection/v1/connection";
import { Channel } from "../../../core/channel/v1/channel";
export interface ClientState {
  sequence: Long;
  frozenSequence: Long;
  consensusState: ConsensusState;
  allowUpdateAfterProposal: boolean;
}

function createBaseClientState(): ClientState {
  return {
    sequence: Long.UZERO,
    frozenSequence: Long.UZERO,
    consensusState: undefined,
    allowUpdateAfterProposal: false
  };
}

export const ClientState = {
  encode(message: ClientState, writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sequence.isZero()) {
      writer.uint32(8).uint64(message.sequence);
    }

    if (!message.frozenSequence.isZero()) {
      writer.uint32(16).uint64(message.frozenSequence);
    }

    if (message.consensusState !== undefined) {
      ConsensusState.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
    }

    if (message.allowUpdateAfterProposal === true) {
      writer.uint32(32).bool(message.allowUpdateAfterProposal);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ClientState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sequence = (reader.uint64() as Long);
          break;

        case 2:
          message.frozenSequence = (reader.uint64() as Long);
          break;

        case 3:
          message.consensusState = ConsensusState.decode(reader, reader.uint32());
          break;

        case 4:
          message.allowUpdateAfterProposal = reader.bool();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ClientState {
    return {
      sequence: isSet(object.sequence) ? Long.fromString(object.sequence) : Long.UZERO,
      frozenSequence: isSet(object.frozenSequence) ? Long.fromString(object.frozenSequence) : Long.UZERO,
      consensusState: isSet(object.consensusState) ? ConsensusState.fromJSON(object.consensusState) : undefined,
      allowUpdateAfterProposal: isSet(object.allowUpdateAfterProposal) ? Boolean(object.allowUpdateAfterProposal) : false
    };
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    message.frozenSequence !== undefined && (obj.frozenSequence = (message.frozenSequence || Long.UZERO).toString());
    message.consensusState !== undefined && (obj.consensusState = message.consensusState ? ConsensusState.toJSON(message.consensusState) : undefined);
    message.allowUpdateAfterProposal !== undefined && (obj.allowUpdateAfterProposal = message.allowUpdateAfterProposal);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClientState>, I>>(object: I): ClientState {
    const message = createBaseClientState();
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.frozenSequence = object.frozenSequence !== undefined && object.frozenSequence !== null ? Long.fromValue(object.frozenSequence) : Long.UZERO;
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? ConsensusState.fromPartial(object.consensusState) : undefined;
    message.allowUpdateAfterProposal = object.allowUpdateAfterProposal ?? false;
    return message;
  }

};
export interface ConsensusState {
  publicKey: Any;
  diversifier: string;
  timestamp: Long;
}

function createBaseConsensusState(): ConsensusState {
  return {
    publicKey: undefined,
    diversifier: "",
    timestamp: Long.UZERO
  };
}

export const ConsensusState = {
  encode(message: ConsensusState, writer = _m0.Writer.create()): _m0.Writer {
    if (message.publicKey !== undefined) {
      Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
    }

    if (message.diversifier !== "") {
      writer.uint32(18).string(message.diversifier);
    }

    if (!message.timestamp.isZero()) {
      writer.uint32(24).uint64(message.timestamp);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ConsensusState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.publicKey = Any.decode(reader, reader.uint32());
          break;

        case 2:
          message.diversifier = reader.string();
          break;

        case 3:
          message.timestamp = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ConsensusState {
    return {
      publicKey: isSet(object.publicKey) ? Any.fromJSON(object.publicKey) : undefined,
      diversifier: isSet(object.diversifier) ? String(object.diversifier) : "",
      timestamp: isSet(object.timestamp) ? Long.fromString(object.timestamp) : Long.UZERO
    };
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    message.publicKey !== undefined && (obj.publicKey = message.publicKey ? Any.toJSON(message.publicKey) : undefined);
    message.diversifier !== undefined && (obj.diversifier = message.diversifier);
    message.timestamp !== undefined && (obj.timestamp = (message.timestamp || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusState>, I>>(object: I): ConsensusState {
    const message = createBaseConsensusState();
    message.publicKey = object.publicKey !== undefined && object.publicKey !== null ? Any.fromPartial(object.publicKey) : undefined;
    message.diversifier = object.diversifier ?? "";
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? Long.fromValue(object.timestamp) : Long.UZERO;
    return message;
  }

};
export interface Header {
  sequence: Long;
  timestamp: Long;
  signature: Uint8Array;
  newPublicKey: Any;
  newDiversifier: string;
}

function createBaseHeader(): Header {
  return {
    sequence: Long.UZERO,
    timestamp: Long.UZERO,
    signature: new Uint8Array(),
    newPublicKey: undefined,
    newDiversifier: ""
  };
}

export const Header = {
  encode(message: Header, writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sequence.isZero()) {
      writer.uint32(8).uint64(message.sequence);
    }

    if (!message.timestamp.isZero()) {
      writer.uint32(16).uint64(message.timestamp);
    }

    if (message.signature.length !== 0) {
      writer.uint32(26).bytes(message.signature);
    }

    if (message.newPublicKey !== undefined) {
      Any.encode(message.newPublicKey, writer.uint32(34).fork()).ldelim();
    }

    if (message.newDiversifier !== "") {
      writer.uint32(42).string(message.newDiversifier);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): Header {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeader();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sequence = (reader.uint64() as Long);
          break;

        case 2:
          message.timestamp = (reader.uint64() as Long);
          break;

        case 3:
          message.signature = reader.bytes();
          break;

        case 4:
          message.newPublicKey = Any.decode(reader, reader.uint32());
          break;

        case 5:
          message.newDiversifier = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): Header {
    return {
      sequence: isSet(object.sequence) ? Long.fromString(object.sequence) : Long.UZERO,
      timestamp: isSet(object.timestamp) ? Long.fromString(object.timestamp) : Long.UZERO,
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(),
      newPublicKey: isSet(object.newPublicKey) ? Any.fromJSON(object.newPublicKey) : undefined,
      newDiversifier: isSet(object.newDiversifier) ? String(object.newDiversifier) : ""
    };
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    message.timestamp !== undefined && (obj.timestamp = (message.timestamp || Long.UZERO).toString());
    message.signature !== undefined && (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
    message.newPublicKey !== undefined && (obj.newPublicKey = message.newPublicKey ? Any.toJSON(message.newPublicKey) : undefined);
    message.newDiversifier !== undefined && (obj.newDiversifier = message.newDiversifier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Header>, I>>(object: I): Header {
    const message = createBaseHeader();
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? Long.fromValue(object.timestamp) : Long.UZERO;
    message.signature = object.signature ?? new Uint8Array();
    message.newPublicKey = object.newPublicKey !== undefined && object.newPublicKey !== null ? Any.fromPartial(object.newPublicKey) : undefined;
    message.newDiversifier = object.newDiversifier ?? "";
    return message;
  }

};
export interface Misbehaviour {
  clientId: string;
  sequence: Long;
  signatureOne: SignatureAndData;
  signatureTwo: SignatureAndData;
}

function createBaseMisbehaviour(): Misbehaviour {
  return {
    clientId: "",
    sequence: Long.UZERO,
    signatureOne: undefined,
    signatureTwo: undefined
  };
}

export const Misbehaviour = {
  encode(message: Misbehaviour, writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }

    if (!message.sequence.isZero()) {
      writer.uint32(16).uint64(message.sequence);
    }

    if (message.signatureOne !== undefined) {
      SignatureAndData.encode(message.signatureOne, writer.uint32(26).fork()).ldelim();
    }

    if (message.signatureTwo !== undefined) {
      SignatureAndData.encode(message.signatureTwo, writer.uint32(34).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): Misbehaviour {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMisbehaviour();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;

        case 2:
          message.sequence = (reader.uint64() as Long);
          break;

        case 3:
          message.signatureOne = SignatureAndData.decode(reader, reader.uint32());
          break;

        case 4:
          message.signatureTwo = SignatureAndData.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): Misbehaviour {
    return {
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
      sequence: isSet(object.sequence) ? Long.fromString(object.sequence) : Long.UZERO,
      signatureOne: isSet(object.signatureOne) ? SignatureAndData.fromJSON(object.signatureOne) : undefined,
      signatureTwo: isSet(object.signatureTwo) ? SignatureAndData.fromJSON(object.signatureTwo) : undefined
    };
  },

  toJSON(message: Misbehaviour): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    message.signatureOne !== undefined && (obj.signatureOne = message.signatureOne ? SignatureAndData.toJSON(message.signatureOne) : undefined);
    message.signatureTwo !== undefined && (obj.signatureTwo = message.signatureTwo ? SignatureAndData.toJSON(message.signatureTwo) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Misbehaviour>, I>>(object: I): Misbehaviour {
    const message = createBaseMisbehaviour();
    message.clientId = object.clientId ?? "";
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.signatureOne = object.signatureOne !== undefined && object.signatureOne !== null ? SignatureAndData.fromPartial(object.signatureOne) : undefined;
    message.signatureTwo = object.signatureTwo !== undefined && object.signatureTwo !== null ? SignatureAndData.fromPartial(object.signatureTwo) : undefined;
    return message;
  }

};
export interface SignatureAndData {
  signature: Uint8Array;
  dataType: DataType;
  data: Uint8Array;
  timestamp: Long;
}

function createBaseSignatureAndData(): SignatureAndData {
  return {
    signature: new Uint8Array(),
    dataType: undefined,
    data: new Uint8Array(),
    timestamp: Long.UZERO
  };
}

export const SignatureAndData = {
  encode(message: SignatureAndData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.signature.length !== 0) {
      writer.uint32(10).bytes(message.signature);
    }

    if (message.dataType !== 0) {
      writer.uint32(16).int32(message.dataType);
    }

    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }

    if (!message.timestamp.isZero()) {
      writer.uint32(32).uint64(message.timestamp);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): SignatureAndData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignatureAndData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.signature = reader.bytes();
          break;

        case 2:
          message.dataType = (reader.int32() as any);
          break;

        case 3:
          message.data = reader.bytes();
          break;

        case 4:
          message.timestamp = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): SignatureAndData {
    return {
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(),
      dataType: isSet(object.dataType) ? dataTypeFromJSON(object.dataType) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      timestamp: isSet(object.timestamp) ? Long.fromString(object.timestamp) : Long.UZERO
    };
  },

  toJSON(message: SignatureAndData): unknown {
    const obj: any = {};
    message.signature !== undefined && (obj.signature = base64FromBytes(message.signature !== undefined ? message.signature : new Uint8Array()));
    message.dataType !== undefined && (obj.dataType = dataTypeToJSON(message.dataType));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.timestamp !== undefined && (obj.timestamp = (message.timestamp || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignatureAndData>, I>>(object: I): SignatureAndData {
    const message = createBaseSignatureAndData();
    message.signature = object.signature ?? new Uint8Array();
    message.dataType = object.dataType ?? 0;
    message.data = object.data ?? new Uint8Array();
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? Long.fromValue(object.timestamp) : Long.UZERO;
    return message;
  }

};
export interface TimestampedSignatureData {
  signatureData: Uint8Array;
  timestamp: Long;
}

function createBaseTimestampedSignatureData(): TimestampedSignatureData {
  return {
    signatureData: new Uint8Array(),
    timestamp: Long.UZERO
  };
}

export const TimestampedSignatureData = {
  encode(message: TimestampedSignatureData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.signatureData.length !== 0) {
      writer.uint32(10).bytes(message.signatureData);
    }

    if (!message.timestamp.isZero()) {
      writer.uint32(16).uint64(message.timestamp);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): TimestampedSignatureData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTimestampedSignatureData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.signatureData = reader.bytes();
          break;

        case 2:
          message.timestamp = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): TimestampedSignatureData {
    return {
      signatureData: isSet(object.signatureData) ? bytesFromBase64(object.signatureData) : new Uint8Array(),
      timestamp: isSet(object.timestamp) ? Long.fromString(object.timestamp) : Long.UZERO
    };
  },

  toJSON(message: TimestampedSignatureData): unknown {
    const obj: any = {};
    message.signatureData !== undefined && (obj.signatureData = base64FromBytes(message.signatureData !== undefined ? message.signatureData : new Uint8Array()));
    message.timestamp !== undefined && (obj.timestamp = (message.timestamp || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TimestampedSignatureData>, I>>(object: I): TimestampedSignatureData {
    const message = createBaseTimestampedSignatureData();
    message.signatureData = object.signatureData ?? new Uint8Array();
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? Long.fromValue(object.timestamp) : Long.UZERO;
    return message;
  }

};
export interface SignBytes {
  sequence: Long;
  timestamp: Long;
  diversifier: string;
  dataType: DataType;
  data: Uint8Array;
}

function createBaseSignBytes(): SignBytes {
  return {
    sequence: Long.UZERO,
    timestamp: Long.UZERO,
    diversifier: "",
    dataType: undefined,
    data: new Uint8Array()
  };
}

export const SignBytes = {
  encode(message: SignBytes, writer = _m0.Writer.create()): _m0.Writer {
    if (!message.sequence.isZero()) {
      writer.uint32(8).uint64(message.sequence);
    }

    if (!message.timestamp.isZero()) {
      writer.uint32(16).uint64(message.timestamp);
    }

    if (message.diversifier !== "") {
      writer.uint32(26).string(message.diversifier);
    }

    if (message.dataType !== 0) {
      writer.uint32(32).int32(message.dataType);
    }

    if (message.data.length !== 0) {
      writer.uint32(42).bytes(message.data);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): SignBytes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignBytes();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.sequence = (reader.uint64() as Long);
          break;

        case 2:
          message.timestamp = (reader.uint64() as Long);
          break;

        case 3:
          message.diversifier = reader.string();
          break;

        case 4:
          message.dataType = (reader.int32() as any);
          break;

        case 5:
          message.data = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): SignBytes {
    return {
      sequence: isSet(object.sequence) ? Long.fromString(object.sequence) : Long.UZERO,
      timestamp: isSet(object.timestamp) ? Long.fromString(object.timestamp) : Long.UZERO,
      diversifier: isSet(object.diversifier) ? String(object.diversifier) : "",
      dataType: isSet(object.dataType) ? dataTypeFromJSON(object.dataType) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array()
    };
  },

  toJSON(message: SignBytes): unknown {
    const obj: any = {};
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.UZERO).toString());
    message.timestamp !== undefined && (obj.timestamp = (message.timestamp || Long.UZERO).toString());
    message.diversifier !== undefined && (obj.diversifier = message.diversifier);
    message.dataType !== undefined && (obj.dataType = dataTypeToJSON(message.dataType));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SignBytes>, I>>(object: I): SignBytes {
    const message = createBaseSignBytes();
    message.sequence = object.sequence !== undefined && object.sequence !== null ? Long.fromValue(object.sequence) : Long.UZERO;
    message.timestamp = object.timestamp !== undefined && object.timestamp !== null ? Long.fromValue(object.timestamp) : Long.UZERO;
    message.diversifier = object.diversifier ?? "";
    message.dataType = object.dataType ?? 0;
    message.data = object.data ?? new Uint8Array();
    return message;
  }

};
export enum DataType {
  /*Default State*/
  DATA_TYPE_UNINITIALIZED_UNSPECIFIED = 0,

  /*Data type for client state verification*/
  DATA_TYPE_CLIENT_STATE = 1,

  /*Data type for consensus state verification*/
  DATA_TYPE_CONSENSUS_STATE = 2,

  /*Data type for connection state verification*/
  DATA_TYPE_CONNECTION_STATE = 3,

  /*Data type for channel state verification*/
  DATA_TYPE_CHANNEL_STATE = 4,

  /*Data type for packet commitment verification*/
  DATA_TYPE_PACKET_COMMITMENT = 5,

  /*Data type for packet acknowledgement verification*/
  DATA_TYPE_PACKET_ACKNOWLEDGEMENT = 6,

  /*Data type for packet receipt absence verification*/
  DATA_TYPE_PACKET_RECEIPT_ABSENCE = 7,

  /*Data type for next sequence recv verification*/
  DATA_TYPE_NEXT_SEQUENCE_RECV = 8,

  /*Data type for header verification*/
  DATA_TYPE_HEADER = 9,
  UNRECOGNIZED = -1,
}
export interface HeaderData {
  newPubKey: Any;
  newDiversifier: string;
}

function createBaseHeaderData(): HeaderData {
  return {
    newPubKey: undefined,
    newDiversifier: ""
  };
}

export const HeaderData = {
  encode(message: HeaderData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.newPubKey !== undefined) {
      Any.encode(message.newPubKey, writer.uint32(10).fork()).ldelim();
    }

    if (message.newDiversifier !== "") {
      writer.uint32(18).string(message.newDiversifier);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): HeaderData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeaderData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.newPubKey = Any.decode(reader, reader.uint32());
          break;

        case 2:
          message.newDiversifier = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): HeaderData {
    return {
      newPubKey: isSet(object.newPubKey) ? Any.fromJSON(object.newPubKey) : undefined,
      newDiversifier: isSet(object.newDiversifier) ? String(object.newDiversifier) : ""
    };
  },

  toJSON(message: HeaderData): unknown {
    const obj: any = {};
    message.newPubKey !== undefined && (obj.newPubKey = message.newPubKey ? Any.toJSON(message.newPubKey) : undefined);
    message.newDiversifier !== undefined && (obj.newDiversifier = message.newDiversifier);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HeaderData>, I>>(object: I): HeaderData {
    const message = createBaseHeaderData();
    message.newPubKey = object.newPubKey !== undefined && object.newPubKey !== null ? Any.fromPartial(object.newPubKey) : undefined;
    message.newDiversifier = object.newDiversifier ?? "";
    return message;
  }

};
export interface ClientStateData {
  path: Uint8Array;
  clientState: Any;
}

function createBaseClientStateData(): ClientStateData {
  return {
    path: new Uint8Array(),
    clientState: undefined
  };
}

export const ClientStateData = {
  encode(message: ClientStateData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ClientStateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClientStateData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.clientState = Any.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ClientStateData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined
    };
  },

  toJSON(message: ClientStateData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.clientState !== undefined && (obj.clientState = message.clientState ? Any.toJSON(message.clientState) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ClientStateData>, I>>(object: I): ClientStateData {
    const message = createBaseClientStateData();
    message.path = object.path ?? new Uint8Array();
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    return message;
  }

};
export interface ConsensusStateData {
  path: Uint8Array;
  consensusState: Any;
}

function createBaseConsensusStateData(): ConsensusStateData {
  return {
    path: new Uint8Array(),
    consensusState: undefined
  };
}

export const ConsensusStateData = {
  encode(message: ConsensusStateData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ConsensusStateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsensusStateData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.consensusState = Any.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ConsensusStateData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined
    };
  },

  toJSON(message: ConsensusStateData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.consensusState !== undefined && (obj.consensusState = message.consensusState ? Any.toJSON(message.consensusState) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsensusStateData>, I>>(object: I): ConsensusStateData {
    const message = createBaseConsensusStateData();
    message.path = object.path ?? new Uint8Array();
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? Any.fromPartial(object.consensusState) : undefined;
    return message;
  }

};
export interface ConnectionStateData {
  path: Uint8Array;
  connection: ConnectionEnd;
}

function createBaseConnectionStateData(): ConnectionStateData {
  return {
    path: new Uint8Array(),
    connection: undefined
  };
}

export const ConnectionStateData = {
  encode(message: ConnectionStateData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.connection !== undefined) {
      ConnectionEnd.encode(message.connection, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ConnectionStateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConnectionStateData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.connection = ConnectionEnd.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ConnectionStateData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      connection: isSet(object.connection) ? ConnectionEnd.fromJSON(object.connection) : undefined
    };
  },

  toJSON(message: ConnectionStateData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.connection !== undefined && (obj.connection = message.connection ? ConnectionEnd.toJSON(message.connection) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConnectionStateData>, I>>(object: I): ConnectionStateData {
    const message = createBaseConnectionStateData();
    message.path = object.path ?? new Uint8Array();
    message.connection = object.connection !== undefined && object.connection !== null ? ConnectionEnd.fromPartial(object.connection) : undefined;
    return message;
  }

};
export interface ChannelStateData {
  path: Uint8Array;
  channel: Channel;
}

function createBaseChannelStateData(): ChannelStateData {
  return {
    path: new Uint8Array(),
    channel: undefined
  };
}

export const ChannelStateData = {
  encode(message: ChannelStateData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): ChannelStateData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelStateData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.channel = Channel.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): ChannelStateData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined
    };
  },

  toJSON(message: ChannelStateData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.channel !== undefined && (obj.channel = message.channel ? Channel.toJSON(message.channel) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChannelStateData>, I>>(object: I): ChannelStateData {
    const message = createBaseChannelStateData();
    message.path = object.path ?? new Uint8Array();
    message.channel = object.channel !== undefined && object.channel !== null ? Channel.fromPartial(object.channel) : undefined;
    return message;
  }

};
export interface PacketCommitmentData {
  path: Uint8Array;
  commitment: Uint8Array;
}

function createBasePacketCommitmentData(): PacketCommitmentData {
  return {
    path: new Uint8Array(),
    commitment: new Uint8Array()
  };
}

export const PacketCommitmentData = {
  encode(message: PacketCommitmentData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.commitment.length !== 0) {
      writer.uint32(18).bytes(message.commitment);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): PacketCommitmentData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketCommitmentData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.commitment = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): PacketCommitmentData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      commitment: isSet(object.commitment) ? bytesFromBase64(object.commitment) : new Uint8Array()
    };
  },

  toJSON(message: PacketCommitmentData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.commitment !== undefined && (obj.commitment = base64FromBytes(message.commitment !== undefined ? message.commitment : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketCommitmentData>, I>>(object: I): PacketCommitmentData {
    const message = createBasePacketCommitmentData();
    message.path = object.path ?? new Uint8Array();
    message.commitment = object.commitment ?? new Uint8Array();
    return message;
  }

};
export interface PacketAcknowledgementData {
  path: Uint8Array;
  acknowledgement: Uint8Array;
}

function createBasePacketAcknowledgementData(): PacketAcknowledgementData {
  return {
    path: new Uint8Array(),
    acknowledgement: new Uint8Array()
  };
}

export const PacketAcknowledgementData = {
  encode(message: PacketAcknowledgementData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (message.acknowledgement.length !== 0) {
      writer.uint32(18).bytes(message.acknowledgement);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): PacketAcknowledgementData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketAcknowledgementData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.acknowledgement = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): PacketAcknowledgementData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      acknowledgement: isSet(object.acknowledgement) ? bytesFromBase64(object.acknowledgement) : new Uint8Array()
    };
  },

  toJSON(message: PacketAcknowledgementData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.acknowledgement !== undefined && (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined ? message.acknowledgement : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketAcknowledgementData>, I>>(object: I): PacketAcknowledgementData {
    const message = createBasePacketAcknowledgementData();
    message.path = object.path ?? new Uint8Array();
    message.acknowledgement = object.acknowledgement ?? new Uint8Array();
    return message;
  }

};
export interface PacketReceiptAbsenceData {
  path: Uint8Array;
}

function createBasePacketReceiptAbsenceData(): PacketReceiptAbsenceData {
  return {
    path: new Uint8Array()
  };
}

export const PacketReceiptAbsenceData = {
  encode(message: PacketReceiptAbsenceData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): PacketReceiptAbsenceData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePacketReceiptAbsenceData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): PacketReceiptAbsenceData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array()
    };
  },

  toJSON(message: PacketReceiptAbsenceData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PacketReceiptAbsenceData>, I>>(object: I): PacketReceiptAbsenceData {
    const message = createBasePacketReceiptAbsenceData();
    message.path = object.path ?? new Uint8Array();
    return message;
  }

};
export interface NextSequenceRecvData {
  path: Uint8Array;
  nextSeqRecv: Long;
}

function createBaseNextSequenceRecvData(): NextSequenceRecvData {
  return {
    path: new Uint8Array(),
    nextSeqRecv: Long.UZERO
  };
}

export const NextSequenceRecvData = {
  encode(message: NextSequenceRecvData, writer = _m0.Writer.create()): _m0.Writer {
    if (message.path.length !== 0) {
      writer.uint32(10).bytes(message.path);
    }

    if (!message.nextSeqRecv.isZero()) {
      writer.uint32(16).uint64(message.nextSeqRecv);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): NextSequenceRecvData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNextSequenceRecvData();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.path = reader.bytes();
          break;

        case 2:
          message.nextSeqRecv = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): NextSequenceRecvData {
    return {
      path: isSet(object.path) ? bytesFromBase64(object.path) : new Uint8Array(),
      nextSeqRecv: isSet(object.nextSeqRecv) ? Long.fromString(object.nextSeqRecv) : Long.UZERO
    };
  },

  toJSON(message: NextSequenceRecvData): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = base64FromBytes(message.path !== undefined ? message.path : new Uint8Array()));
    message.nextSeqRecv !== undefined && (obj.nextSeqRecv = (message.nextSeqRecv || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<NextSequenceRecvData>, I>>(object: I): NextSequenceRecvData {
    const message = createBaseNextSequenceRecvData();
    message.path = object.path ?? new Uint8Array();
    message.nextSeqRecv = object.nextSeqRecv !== undefined && object.nextSeqRecv !== null ? Long.fromValue(object.nextSeqRecv) : Long.UZERO;
    return message;
  }

};