import { Attribute } from "../../base/v1beta2/attribute";
import { Rpc } from "@osmonauts/helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgSignProviderAttributes, MsgSignProviderAttributesResponse, MsgDeleteProviderAttributes, MsgDeleteProviderAttributesResponse } from "./audit";

/** Msg defines the RPC service */
export interface Msg {
  signProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse>;
  /*SignProviderAttributes defines a method that signs provider attributes*/

  deleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse>;
  /*DeleteProviderAttributes defines a method that deletes provider attributes*/

}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.signProviderAttributes = this.signProviderAttributes.bind(this);
    this.deleteProviderAttributes = this.deleteProviderAttributes.bind(this);
  }

  signProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse> {
    const data = MsgSignProviderAttributes.encode(request).finish();
    const promise = this.rpc.request("akash.audit.v1beta2.Msg", "SignProviderAttributes", data);
    return promise.then(data => MsgSignProviderAttributesResponse.decode(new _m0.Reader(data)));
  }

  deleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse> {
    const data = MsgDeleteProviderAttributes.encode(request).finish();
    const promise = this.rpc.request("akash.audit.v1beta2.Msg", "DeleteProviderAttributes", data);
    return promise.then(data => MsgDeleteProviderAttributesResponse.decode(new _m0.Reader(data)));
  }

}