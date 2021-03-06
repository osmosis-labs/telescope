import { ProtoResolver, ProtoStore } from '../src/index'
const store = new ProtoStore([__dirname + '/../../../__fixtures__/chain1']);
const resolver = new ProtoResolver(store.getDeps());

it('cosmos/tx/signing/v1beta1/signing.proto', () => {
    expect(resolver.resolve('cosmos/tx/signing/v1beta1/signing.proto')).toMatchSnapshot();
});

it('osmosis/gamm/v1beta1/tx.proto', () => {
    expect(resolver.resolve('osmosis/gamm/v1beta1/tx.proto')).toMatchSnapshot();
});

it('all', () => {
    expect(resolver.resolveAll()).toMatchSnapshot();
});