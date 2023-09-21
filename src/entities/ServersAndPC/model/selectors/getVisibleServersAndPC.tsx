import { createSelector } from '@reduxjs/toolkit';
import { ServersAndPCSchema } from '../types/serversAndPCShema';

export const getVisibleServersAndPCs = createSelector(
    [
        (serversAndPC, page, rowsPerPage): ServersAndPCSchema => serversAndPC,
        (serversAndPC, page, rowsPerPage): number => page,
        (serversAndPC, page, rowsPerPage): number => rowsPerPage,
    ],
    (serversAndPC, page, rowsPerPage) => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return serversAndPC.slice(startIndex, endIndex);
    }
);
