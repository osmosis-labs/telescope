import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { TokenPair } from "./erc20";
import { Params } from "./genesis";
import { Rpc } from "@osmonauts/helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryTokenPairsRequest, QueryTokenPairsResponse, QueryTokenPairRequest, QueryTokenPairResponse, QueryParamsRequest, QueryParamsResponse } from "./query";

/** Query defines the RPC service */
export interface Query {
  tokenPairs(request: QueryTokenPairsRequest): Promise<QueryTokenPairsResponse>;
  /*TokenPairs retrieves registered token pairs*/

  tokenPair(request: QueryTokenPairRequest): Promise<QueryTokenPairResponse>;
  /*TokenPair retrieves a registered token pair*/

  params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /*Params retrieves the erc20 module params*/

}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.tokenPairs = this.tokenPairs.bind(this);
    this.tokenPair = this.tokenPair.bind(this);
    this.params = this.params.bind(this);
  }

  tokenPairs(request: QueryTokenPairsRequest): Promise<QueryTokenPairsResponse> {
    const data = QueryTokenPairsRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.erc20.v1.Query", "TokenPairs", data);
    return promise.then(data => QueryTokenPairsResponse.decode(new _m0.Reader(data)));
  }

  tokenPair(request: QueryTokenPairRequest): Promise<QueryTokenPairResponse> {
    const data = QueryTokenPairRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.erc20.v1.Query", "TokenPair", data);
    return promise.then(data => QueryTokenPairResponse.decode(new _m0.Reader(data)));
  }

  params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("evmos.erc20.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

}