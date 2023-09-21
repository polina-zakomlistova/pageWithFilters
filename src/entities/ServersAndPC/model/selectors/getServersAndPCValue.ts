import { createSelector } from '@reduxjs/toolkit';
import { getServersAndPC } from './getServersAndPC';
import { ServersAndPCSchema } from '../types/serversAndPCShema';

export const getServersAndPCValue = createSelector(
    getServersAndPC,
    (serversAndPC: ServersAndPCSchema) => serversAndPC
);
