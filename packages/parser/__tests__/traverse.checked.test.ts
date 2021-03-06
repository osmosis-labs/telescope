import { ProtoStore } from '../src/index'
import { importLookup, protoImportLookup, traverse } from '../src/';
const store = new ProtoStore([__dirname + '/../../../__fixtures__/chain1']);

it('google/api/expr/v1alpha1/checked', () => {
    const ref = store.findProto('google/api/expr/v1alpha1/checked.proto');
    const res = traverse(store, ref);
    expect(res).toMatchSnapshot();

    const Empty = protoImportLookup(store, ref, 'google.protobuf.Empty');
    expect(Empty).toMatchSnapshot();
    const Constant = importLookup(store, ref, 'Constant');
    expect(Constant).toMatchSnapshot();
});

