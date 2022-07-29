import { expectCode } from '../../../../test-utils'

import {
    lcdRecursiveObjectProps,
    createScopedLCDFactory
} from './scoped';

it('lcdRecursiveObjectProps', async () => {
    expectCode(lcdRecursiveObjectProps(['cosmos', 'bank', 'v1beta1']))
});

it('createScopedLCDFactory', async () => {
    expectCode(createScopedLCDFactory({
        cosmos: {
            bank: {
                v1beta1: "./proto/cosmos/bank/v1beta1/query.lcd"
            },
            gov: {
                v1beta1: "./proto/cosmos/bank/v1beta1/query.lcd"
            },
        },
        osmosis: {
            gamm: {
                v1beta1: "./proto/cosmos/bank/v1beta1/query.lcd"
            }
        }
    },
        'lcd',
        'LCDQueryClient'
    ))
});

