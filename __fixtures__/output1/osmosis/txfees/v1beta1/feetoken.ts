import { _m0 } from "protobuf/minimal";
import { Long, isSet } from "@osmonauts/helpers";
export interface FeeToken {
  denom: string;
  poolID: Long;
}

function createBaseFeeToken(): FeeToken {
  return {
    denom: "",
    poolID: Long.UZERO
  };
}

export const FeeToken = {
  encode(message: FeeToken, writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }

    if (!message.poolID.isZero()) {
      writer.uint32(16).uint64(message.poolID);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): FeeToken {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFeeToken();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;

        case 2:
          message.poolID = (reader.uint64() as Long);
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): FeeToken {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      poolID: isSet(object.poolID) ? Long.fromString(object.poolID) : Long.UZERO
    };
  },

  toJSON(message: FeeToken): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.poolID !== undefined && (obj.poolID = (message.poolID || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FeeToken>, I>>(object: I): FeeToken {
    const message = createBaseFeeToken();
    message.denom = object.denom ?? "";
    message.poolID = object.poolID !== undefined && object.poolID !== null ? Long.fromValue(object.poolID) : Long.UZERO;
    return message;
  }

};