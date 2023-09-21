import { createSelector } from '@reduxjs/toolkit';
import { ServersAndPCSchema } from '../types/serversAndPCShema';

export const getFilteredServersAndPCsByName = createSelector(
    [
        (serversAndPCs, searchQuery): ServersAndPCSchema => serversAndPCs,
        (serversAndPCs, searchQuery): string => searchQuery,
    ],
    (serversAndPCs, searchQuery) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        const result =
            searchQuery != ''
                ? serversAndPCs.filter((serverOrPC) => {
                      let str = serverOrPC.name.toLowerCase();

                      return str.indexOf(lowerCaseSearchQuery) != -1;
                  })
                : serversAndPCs;

        return result;
    }
);
