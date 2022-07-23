import {
    getUrlTemplateString,
    makeAggregatedLCDClient,
    createLCDClient,
    makeTemplateTag
} from './lcd';
import { ProtoStore, traverse, getNestedProto } from '@osmonauts/proto-parser'
import { defaultTelescopeOptions, ProtoService } from '@osmonauts/types';
import generate from '@babel/generator';
import { GenericParseContext } from '../../encoding';
const store = new ProtoStore([__dirname + '/../../../../../__fixtures__/chain1']);
store.traverseAll();

const expectCode = (ast) => {
    expect(
        generate(ast).code
    ).toMatchSnapshot();
}
const printCode = (ast) => {
    console.log(
        generate(ast).code
    );
}

it('service info template', () => {
    expect(getUrlTemplateString('/osmosis/{gamm}/v1beta1/estimate/swap_exact_amount_in')).toMatchSnapshot();
    expect(getUrlTemplateString('/osmosis/{gamm}/v1beta1/{estimate}/swap_exact_amount_in')).toMatchSnapshot();
    expect(getUrlTemplateString('/osmosis/{gamm}/{v1beta1}/{estimate}/{swap_exact_amount_in}')).toMatchSnapshot();
    expect(getUrlTemplateString('/osmosis/gamm/v1beta1/estimate/{swap_exact_amount_in}')).toMatchSnapshot();
    expect(getUrlTemplateString('/cosmos/feegrant/v1beta1/allowance/{granter}/{grantee}')).toMatchSnapshot();
});

it('template tags', () => {
    const info = {
        url: '/{cosmos}/feegrant/v1beta1/{allowance}/{granter}/{grantee}',
        pathParams: [
            'cosmos',
            'allowance',
            'granter',
            'grantee'
        ]
    };
    expectCode(makeTemplateTag(info));
})

it('osmosis LCDClient', () => {
    const ref = store.findProto('osmosis/gamm/v1beta1/query.proto');
    const res = traverse(store, ref);
    const service: ProtoService = getNestedProto(res).Query;
    const context = new GenericParseContext(ref, store, defaultTelescopeOptions);
    const ast = createLCDClient(context, service);
    expectCode(ast);
});
it('cosmos LCDClient', () => {
    const ref = store.findProto('cosmos/bank/v1beta1/query.proto');
    const res = traverse(store, ref);
    const service: ProtoService = getNestedProto(res).Query;
    const context = new GenericParseContext(ref, store, defaultTelescopeOptions);
    const ast = createLCDClient(context, service);
    expectCode(ast);
});
it('cosmos fee LCDClient', () => {
    const ref = store.findProto('cosmos/feegrant/v1beta1/query.proto');
    const res = traverse(store, ref);
    const service: ProtoService = getNestedProto(res).Query;
    const context = new GenericParseContext(ref, store, defaultTelescopeOptions);
    const ast = createLCDClient(context, service);
    expectCode(ast);
});
it('cosmos/app/v1alpha1/query.proto', () => {
    const ref = store.findProto('cosmos/app/v1alpha1/query.proto');
    const res = traverse(store, ref);
    const service: ProtoService = getNestedProto(res).Query;
    const context = new GenericParseContext(ref, store, defaultTelescopeOptions);
    const ast = createLCDClient(context, service);
    expectCode(ast);
});
it('AggregatedLCDClient', () => {
    const ref1 = store.findProto('cosmos/bank/v1beta1/query.proto');
    const ref2 = store.findProto('osmosis/gamm/v1beta1/query.proto');
    const res1 = traverse(store, ref1);
    const res2 = traverse(store, ref2);
    const service1: ProtoService = getNestedProto(res1).Query;
    const service2: ProtoService = getNestedProto(res2).Query;
    const context = new GenericParseContext(ref1, store, defaultTelescopeOptions);
    const ast = makeAggregatedLCDClient(context, [service1, service2], 'QueryClient');
    expectCode(ast);
});