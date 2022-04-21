import { AminoMsg } from "@cosmjs/amino";
import { AminoHeight, omitDefault } from "../../../amino.helpers";
import { MsgCreateVestingAccount, MsgCreatePermanentLockedAccount, MsgCreatePeriodicVestingAccount, MsgCreateVestingAccountResponse, MsgCreatePermanentLockedAccountResponse, MsgCreatePeriodicVestingAccountResponse, Msg, Rpc } from "./tx";

/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Period } from "../../../cosmos/vesting/v1beta1/vesting";
import { Registry } from "@cosmjs/proto-signing";
export const registry = {
  "/cosmos.vesting.v1beta1.MsgCreateVestingAccount": MsgCreateVestingAccount,
  "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount": MsgCreatePermanentLockedAccount,
  "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount": MsgCreatePeriodicVestingAccount
};
export const load = (protoRegistry: Registry) => {
  Object.keys(registry).forEach(typeUrl => {
    protoRegistry.register(typeUrl, registry[typeUrl]);
  });
};