import { _m0 } from "protobuf/minimal";
import { Any } from "../../../google/protobuf/any";
export interface GenesisState {
  evidence: Any[];
}

function createBaseGenesisState(): GenesisState {
  return {
    evidence: []
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.evidence) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.evidence.push(Any.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      evidence: Array.isArray(object?.evidence) ? object.evidence.map((e: any) => Any.fromJSON(e)) : []
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};

    if (message.evidence) {
      obj.evidence = message.evidence.map(e => e ? Any.toJSON(e) : undefined);
    } else {
      obj.evidence = [];
    }

    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.evidence = object.evidence?.map(e => Any.fromPartial(e)) || [];
    return message;
  }

};