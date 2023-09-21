import { configureStore } from '@reduxjs/toolkit';
import { serversAndPCReducer } from 'entities/ServersAndPC';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            serversAndPC: serversAndPCReducer,
        },
        preloadedState: initialState,
    });
}
