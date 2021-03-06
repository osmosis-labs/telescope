import cases from 'jest-in-case';
import { getPluginValue } from './plugins';

const options = {
    includeAminos: false,
    includeLCDClients: false,
    timestampFormat: false,

    aminoEncoding: {
        enabled: true
    },

    packages: {
        cosmos: {
            timestampFormat: true
        },
        'cosmos.v1beta1.tx': {
            includeAminos: false,
            timestampFormat: false
        },
        'cosmos.v1beta1': {
            includeAminos: true,
        },
        osmosis: {
            aminoCasing: 'camel'
        },
        akash: {
            aminoEncoding: {
                enabled: false
            }
        },
        nebula: {
            some: {
                pkg: {
                    aminoEncoding: {
                        enabled: false
                    }
                }
            }
        }
    }
};


cases('timestampFormat', opts => {
    const val = getPluginValue(opts.prop, opts.name, options);
    expect(val).toMatchSnapshot();

}, [
    { name: 'cosmos.v1beta1.tx', prop: 'timestampFormat' },
    { name: 'cosmos.v1beta1', prop: 'timestampFormat' },
    { name: 'cosmos.v1beta1.other', prop: 'timestampFormat' },
    { name: 'cosmos', prop: 'timestampFormat' },
]);

cases('aminoEncoding', opts => {
    const val = getPluginValue(opts.prop, opts.name, options);
    expect(val).toMatchSnapshot();

}, [
    { name: 'cosmos.v1beta1', prop: 'aminoEncoding' },
    { name: 'cosmos', prop: 'aminoEncoding' },
    { name: 'akash', prop: 'aminoEncoding' },
    { name: 'nebula', prop: 'aminoEncoding' },
    { name: 'nebula.some', prop: 'aminoEncoding' },
    { name: 'nebula.some.pkg', prop: 'aminoEncoding' },
]);

cases('aminoEncoding.enabled', opts => {
    const val = getPluginValue(opts.prop, opts.name, options);
    expect(val).toMatchSnapshot();

}, [
    { name: 'cosmos.v1beta1', prop: 'aminoEncoding.enabled' },
    { name: 'cosmos', prop: 'aminoEncoding.enabled' },
    { name: 'akash', prop: 'aminoEncoding.enabled' },
    { name: 'nebula', prop: 'aminoEncoding.enabled' },
    { name: 'nebula.some', prop: 'aminoEncoding.enabled' },
    { name: 'nebula.some.pkg', prop: 'aminoEncoding.enabled' },
]);