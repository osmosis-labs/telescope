import { _m0 } from "protobuf/minimal";
import { isSet, toTimestamp, fromTimestamp, fromJsonTimestamp, Long } from "@osmonauts/helpers";
import { Timestamp } from "../../../protobuf/timestamp";
import { LogSeverity } from "../../../logging/type/log_severity";
import { HttpRequest } from "./http_request";
import { Any } from "../../../protobuf/any";
import { Struct } from "../../../protobuf/struct";
export interface LogEntry_StringMapEntry {
  key: string;
  value: string;
}

function createBaseLogEntry_StringMapEntry(): LogEntry_StringMapEntry {
  return {
    key: "",
    value: ""
  };
}

export const LogEntry_StringMapEntry = {
  encode(message: LogEntry_StringMapEntry, writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }

    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): LogEntry_StringMapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogEntry_StringMapEntry();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;

        case 2:
          message.value = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): LogEntry_StringMapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : ""
    };
  },

  toJSON(message: LogEntry_StringMapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogEntry_StringMapEntry>, I>>(object: I): LogEntry_StringMapEntry {
    const message = createBaseLogEntry_StringMapEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  }

};
export interface LogEntry {
  name: string;
  timestamp: Date;
  severity: LogSeverity;
  httpRequest: HttpRequest;
  trace: string;
  insertId: string;
  labels: {
    [key: string]: string;
  };
  protoPayload?: Any;
  textPayload?: string;
  structPayload?: Struct;
  operation: LogEntryOperation;
  sourceLocation: LogEntrySourceLocation;
}

function createBaseLogEntry(): LogEntry {
  return {
    name: "",
    timestamp: undefined,
    severity: undefined,
    httpRequest: undefined,
    trace: "",
    insertId: "",
    labels: "",
    protoPayload: undefined,
    textPayload: "",
    structPayload: undefined,
    operation: undefined,
    sourceLocation: undefined
  };
}

export const LogEntry = {
  encode(message: LogEntry, writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(82).string(message.name);
    }

    if (message.timestamp !== undefined) Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(90).fork()).ldelim();

    if (message.severity !== 0) {
      writer.uint32(96).int32(message.severity);
    }

    if (message.httpRequest !== undefined) {
      HttpRequest.encode(message.httpRequest, writer.uint32(114).fork()).ldelim();
    }

    if (message.trace !== "") {
      writer.uint32(122).string(message.trace);
    }

    if (message.insertId !== "") {
      writer.uint32(34).string(message.insertId);
    }

    Object.entries(message.labels).forEach(([key, value]) => {
      LogEntry_LabelsMapEntry.encode({
        key: (key as any),
        value
      }, writer.uint32(106).fork()).ldelim();
    });

    if (message.protoPayload !== undefined) {
      Any.encode(message.protoPayload, writer.uint32(18).fork()).ldelim();
    }

    if (message.textPayload !== "") {
      writer.uint32(26).string(message.textPayload);
    }

    if (message.structPayload !== undefined) {
      Struct.encode(message.structPayload, writer.uint32(50).fork()).ldelim();
    }

    if (message.operation !== undefined) {
      LogEntryOperation.encode(message.operation, writer.uint32(130).fork()).ldelim();
    }

    if (message.sourceLocation !== undefined) {
      LogEntrySourceLocation.encode(message.sourceLocation, writer.uint32(138).fork()).ldelim();
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): LogEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogEntry();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 10:
          message.name = reader.string();
          break;

        case 11:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;

        case 12:
          message.severity = (reader.int32() as any);
          break;

        case 14:
          message.httpRequest = HttpRequest.decode(reader, reader.uint32());
          break;

        case 15:
          message.trace = reader.string();
          break;

        case 4:
          message.insertId = reader.string();
          break;

        case 13:
          const entry13 = LogEntry_LabelsMapEntry.decode(reader, reader.uint32());

          if (entry13.value !== undefined) {
            message.labels[entry13.key] = entry13.value;
          }

          break;

        case 2:
          message.protoPayload = Any.decode(reader, reader.uint32());
          break;

        case 3:
          message.textPayload = reader.string();
          break;

        case 6:
          message.structPayload = Struct.decode(reader, reader.uint32());
          break;

        case 16:
          message.operation = LogEntryOperation.decode(reader, reader.uint32());
          break;

        case 17:
          message.sourceLocation = LogEntrySourceLocation.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): LogEntry {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      severity: isSet(object.severity) ? logSeverityFromJSON(object.severity) : 0,
      httpRequest: isSet(object.httpRequest) ? HttpRequest.fromJSON(object.httpRequest) : undefined,
      trace: isSet(object.trace) ? String(object.trace) : "",
      insertId: isSet(object.insertId) ? String(object.insertId) : "",
      labels: isObject(object.labels) ? Object.entries(object.labels).reduce<{
        [key: string]: string;
      }>((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {}) : {},
      protoPayload: isSet(object.protoPayload) ? Any.fromJSON(object.protoPayload) : undefined,
      textPayload: isSet(object.textPayload) ? String(object.textPayload) : "",
      structPayload: isSet(object.structPayload) ? Struct.fromJSON(object.structPayload) : undefined,
      operation: isSet(object.operation) ? LogEntryOperation.fromJSON(object.operation) : undefined,
      sourceLocation: isSet(object.sourceLocation) ? LogEntrySourceLocation.fromJSON(object.sourceLocation) : undefined
    };
  },

  toJSON(message: LogEntry): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    message.severity !== undefined && (obj.severity = logSeverityToJSON(message.severity));
    message.httpRequest !== undefined && (obj.httpRequest = message.httpRequest ? HttpRequest.toJSON(message.httpRequest) : undefined);
    message.trace !== undefined && (obj.trace = message.trace);
    message.insertId !== undefined && (obj.insertId = message.insertId);
    obj.labels = {};

    if (message.labels) {
      Object.entries(message.labels).forEach(([k, v]) => {
        obj.labels[k] = v;
      });
    }

    message.protoPayload !== undefined && (obj.protoPayload = message.protoPayload ? Any.toJSON(message.protoPayload) : undefined);
    message.textPayload !== undefined && (obj.textPayload = message.textPayload);
    message.structPayload !== undefined && (obj.structPayload = message.structPayload ? Struct.toJSON(message.structPayload) : undefined);
    message.operation !== undefined && (obj.operation = message.operation ? LogEntryOperation.toJSON(message.operation) : undefined);
    message.sourceLocation !== undefined && (obj.sourceLocation = message.sourceLocation ? LogEntrySourceLocation.toJSON(message.sourceLocation) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogEntry>, I>>(object: I): LogEntry {
    const message = createBaseLogEntry();
    message.name = object.name ?? "";
    message.timestamp = object.timestamp ?? undefined;
    message.severity = object.severity ?? 0;
    message.httpRequest = object.httpRequest !== undefined && object.httpRequest !== null ? HttpRequest.fromPartial(object.httpRequest) : undefined;
    message.trace = object.trace ?? "";
    message.insertId = object.insertId ?? "";
    message.labels = Object.entries(object.labels ?? {}).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }

      return acc;
    }, {});
    message.protoPayload = object.protoPayload !== undefined && object.protoPayload !== null ? Any.fromPartial(object.protoPayload) : undefined;
    message.textPayload = object.textPayload ?? "";
    message.structPayload = object.structPayload !== undefined && object.structPayload !== null ? Struct.fromPartial(object.structPayload) : undefined;
    message.operation = object.operation !== undefined && object.operation !== null ? LogEntryOperation.fromPartial(object.operation) : undefined;
    message.sourceLocation = object.sourceLocation !== undefined && object.sourceLocation !== null ? LogEntrySourceLocation.fromPartial(object.sourceLocation) : undefined;
    return message;
  }

};
export interface LogEntryOperation {
  id: string;
  producer: string;
  first: boolean;
  last: boolean;
}

function createBaseLogEntryOperation(): LogEntryOperation {
  return {
    id: "",
    producer: "",
    first: false,
    last: false
  };
}

export const LogEntryOperation = {
  encode(message: LogEntryOperation, writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }

    if (message.producer !== "") {
      writer.uint32(18).string(message.producer);
    }

    if (message.first === true) {
      writer.uint32(24).bool(message.first);
    }

    if (message.last === true) {
      writer.uint32(32).bool(message.last);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): LogEntryOperation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogEntryOperation();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;

        case 2:
          message.producer = reader.string();
          break;

        case 3:
          message.first = reader.bool();
          break;

        case 4:
          message.last = reader.bool();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): LogEntryOperation {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      producer: isSet(object.producer) ? String(object.producer) : "",
      first: isSet(object.first) ? Boolean(object.first) : false,
      last: isSet(object.last) ? Boolean(object.last) : false
    };
  },

  toJSON(message: LogEntryOperation): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.producer !== undefined && (obj.producer = message.producer);
    message.first !== undefined && (obj.first = message.first);
    message.last !== undefined && (obj.last = message.last);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogEntryOperation>, I>>(object: I): LogEntryOperation {
    const message = createBaseLogEntryOperation();
    message.id = object.id ?? "";
    message.producer = object.producer ?? "";
    message.first = object.first ?? false;
    message.last = object.last ?? false;
    return message;
  }

};
export interface LogEntrySourceLocation {
  file: string;
  line: Long;
  function: string;
}

function createBaseLogEntrySourceLocation(): LogEntrySourceLocation {
  return {
    file: "",
    line: Long.UZERO,
    function: ""
  };
}

export const LogEntrySourceLocation = {
  encode(message: LogEntrySourceLocation, writer = _m0.Writer.create()): _m0.Writer {
    if (message.file !== "") {
      writer.uint32(10).string(message.file);
    }

    if (!message.line.isZero()) {
      writer.uint32(16).int64(message.line);
    }

    if (message.function !== "") {
      writer.uint32(26).string(message.function);
    }

    return writer;
  },

  decode(input: _m0.Reader | Uint8Array): LogEntrySourceLocation {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLogEntrySourceLocation();

    while (reader.pos < end) {
      const tag = reader.uint32();

      switch (tag >>> 3) {
        case 1:
          message.file = reader.string();
          break;

        case 2:
          message.line = (reader.int64() as Long);
          break;

        case 3:
          message.function = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  },

  fromJSON(object: any): LogEntrySourceLocation {
    return {
      file: isSet(object.file) ? String(object.file) : "",
      line: isSet(object.line) ? Long.fromString(object.line) : Long.ZERO,
      function: isSet(object.function) ? String(object.function) : ""
    };
  },

  toJSON(message: LogEntrySourceLocation): unknown {
    const obj: any = {};
    message.file !== undefined && (obj.file = message.file);
    message.line !== undefined && (obj.line = (message.line || Long.ZERO).toString());
    message.function !== undefined && (obj.function = message.function);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LogEntrySourceLocation>, I>>(object: I): LogEntrySourceLocation {
    const message = createBaseLogEntrySourceLocation();
    message.file = object.file ?? "";
    message.line = object.line !== undefined && object.line !== null ? Long.fromValue(object.line) : Long.ZERO;
    message.function = object.function ?? "";
    return message;
  }

};