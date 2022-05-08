import { _m0 } from "protobuf/minimal";
import { bytesFromBase64, base64FromBytes, isSet } from "@osmonauts/helpers";
export interface MultiSignature {
  signatures: Uint8Array[];
}

function createBaseMultiSignature(): MultiSignature {
  return {
    signatures: []
  };
}

export const MultiSignature = {
  encode(message: MultiSignature, writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.signatures) {
      writer.uint32(10).bytes(v!);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): MultiSignature {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMultiSignature();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.signatures.push(reader.bytes());

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): MultiSignature {
    return {
      signatures: Array.isArray(object?.signatures) ? object.signatures.map((e: any) => bytesFromBase64(e)) : []
    };
  },

  toJSON(message: MultiSignature): unknown {
    const obj: any = {};

    if (message.signatures) {
      obj.signatures = message.signatures.map(e => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.signatures = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MultiSignature>, I>>(object: I): MultiSignature {
    const message = createBaseMultiSignature();
    message.signatures = object.signatures?.map(e => e) || [];
    return message;
  }

};
export interface CompactBitArray {
  extraBitsStored: number;
  elems: Uint8Array;
}

function createBaseCompactBitArray(): CompactBitArray {
  return {
    extraBitsStored: 0,
    elems: new Uint8Array()
  };
}

export const CompactBitArray = {
  encode(message: CompactBitArray, writer = _m0.Writer.create()): _m0.Writer {
    if (message.extraBitsStored !== 0) {
      writer.uint32(8).uint32(message.extraBitsStored);
    }

    if (message.elems.length !== 0) {
      writer.uint32(18).bytes(message.elems);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): CompactBitArray {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCompactBitArray();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.extraBitsStored = reader.uint32();
          break;

        case 2:
          message.elems = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): CompactBitArray {
    return {
      extraBitsStored: isSet(object.extraBitsStored) ? Number(object.extraBitsStored) : 0,
      elems: isSet(object.elems) ? bytesFromBase64(object.elems) : new Uint8Array()
    };
  },

  toJSON(message: CompactBitArray): unknown {
    const obj: any = {};
    message.extraBitsStored !== undefined && (obj.extraBitsStored = Math.round(message.extraBitsStored));
    message.elems !== undefined && (obj.elems = base64FromBytes(message.elems !== undefined ? message.elems : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CompactBitArray>, I>>(object: I): CompactBitArray {
    const message = createBaseCompactBitArray();
    message.extraBitsStored = object.extraBitsStored ?? 0;
    message.elems = object.elems ?? new Uint8Array();
    return message;
  }

};