import { ProtoType, ProtoField } from '@osmonauts/types';
import { pascal } from 'case';

export const SCALAR_TYPES = [
    'string',
    'double',
    'float',
    'int32',
    'uint32',
    'sint32',
    'fixed32',
    'sfixed32',
    'int64',
    'uint64',
    'sint64',
    'fixed64',
    'sfixed64',
    'bytes',
    'bool'
];

export const NATIVE_TYPES = [
    ...SCALAR_TYPES,

    // yes, they're not "native", but in many ways, they are...
    'google.protobuf.Timestamp',
    'google.protobuf.Duration',
    'google.protobuf.Any'
];

// https://github.com/protobufjs/protobuf.js/blob/master/src/types.js#L38-L54
export const types = {
    basic: {
        double: 1,
        float: 5,
        int32: 0,
        uint32: 0,
        sint32: 0,
        fixed32: 5,
        sfixed32: 5,
        int64: 0,
        uint64: 0,
        sint64: 0,
        fixed64: 1,
        sfixed64: 1,
        bool: 0,
        string: 2,
        bytes: 2
    },
    defaults: {
        double: 0,
        float: 0,
        int32: 0,
        uint32: 0,
        sint32: 0,
        fixed32: 0,
        sfixed32: 0,
        int64: 0,
        uint64: 0,
        sint64: 0,
        fixed64: 0,
        sfixed64: 0,
        bool: false,
        string: '',
        bytes: [],
        undefined: null
    },
    long: { int64: 0, uint64: 0, sint64: 0, fixed64: 1, sfixed64: 1 },
    mapKey: {
        int32: 0,
        uint32: 0,
        sint32: 0,
        fixed32: 5,
        sfixed32: 5,
        int64: 0,
        uint64: 0,
        sint64: 0,
        fixed64: 1,
        sfixed64: 1,
        bool: 0,
        string: 2
    },
    packed: {
        double: 1,
        float: 5,
        int32: 0,
        uint32: 0,
        sint32: 0,
        fixed32: 5,
        sfixed32: 5,
        int64: 0,
        uint64: 0,
        sint64: 0,
        fixed64: 1,
        sfixed64: 1,
        bool: 0
    }
};
export const getWireNumber = (type) => {
    if (types.basic.hasOwnProperty(type)) {
        return types.basic[type];
    }
    return 2;
};

export const getPackedWireNumber = (type) => {
    if (types.packed.hasOwnProperty(type)) {
        return types.packed[type];
    }
    return 2;
};

export const getTagNumber = (field: ProtoField) => {
    let wire = getWireNumber(field.type);
    if (field.parsedType.type === 'Enum') {
        wire = 0;
    }
    if (field.rule === 'repeated') {
        wire = 2;
    }
    return ((field.id << 3) | wire) >>> 0;
};

const lowerFirst = (str: string) => {
    return str.charAt(0).toLowerCase() + str.substring(1);
};
const upperFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.substring(1);
};

export const getEnumToJsonName = (name) => {
    return lowerFirst(name) + 'ToJSON';
};

export const getEnumFromJsonName = (name) => {
    return lowerFirst(name) + 'FromJSON';
};

export const getFieldsTypeName = (field: ProtoField) => {
    if (field?.scope.length <= 1) return field.parsedType.name;
    const [_pkg, ...scopes] = field.scope;
    return [...scopes, field.parsedType.name].join('_');
};

export const getKeyTypeEntryName = (typeName: string, prop: string) => {
    return `${typeName}_${pascal(prop)}Entry`;
};

export const getBaseCreateTypeFuncName = (name) => {
    return `createBase${upperFirst(name)}`;
};

export const getOneOfs = (type: ProtoType) => {
    const keys = Object.keys(type.oneofs ?? {});
    if (!keys.length) return [];
    if (keys.length !== 1) throw new Error('getOneOfs() oneofs cardinality not known!');
    return type.oneofs[keys[0]].oneof;
};

export const getFieldOptionality = (field: ProtoField, isOneOf: boolean) => {
    return isOneOf || field?.options?.['(gogoproto.nullable)'];
};

export const getObjectNameOld = (name: string, scope: string[] = []) => {
    if (!scope.length || scope.length === 1) return name;
    const [_pkg, ...scopes] = scope;
    return [...scopes, name].join('_')
};

