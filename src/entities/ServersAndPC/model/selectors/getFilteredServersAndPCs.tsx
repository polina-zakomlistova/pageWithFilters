import { createSelector } from '@reduxjs/toolkit';
import { IServerAndPC, ServersAndPCSchema } from '../types/serversAndPCShema';

export const getFilteredServersAndPCs = createSelector(
    [
        (
            serversAndPC: ServersAndPCSchema,
            filters: Record<keyof IServerAndPC, string[]>
        ): ServersAndPCSchema => serversAndPC, // Принимаем serversAndPC
        (
            serversAndPC: ServersAndPCSchema,
            filters: Record<keyof IServerAndPC, string[]>
        ): Record<keyof IServerAndPC, string[]> => filters, // Принимаем filters
    ],
    (serversAndPC, filters) => {
        const result = !isEmptyArrays(filters) // не пустой
            ? serversAndPC.filter((serverOrPC) => {
                  let isMatch = true;
                  for (const field in filters) {
                      let fieldInit = serverOrPC[field];
                      let filterForCheck = filters[field];
                      let fieldForCheck: string[]; //приводим все к массиву строк

                      if (filterForCheck.length) {
                          if (
                              typeof fieldInit === 'string' ||
                              typeof fieldInit === 'number'
                          ) {
                              fieldForCheck = [fieldInit.toString()];
                          } else if (Array.isArray(fieldInit)) {
                              fieldForCheck = fieldInit as string[];
                          }

                          const commonValues = fieldForCheck.filter(
                              (filterValue) =>
                                  filterForCheck.includes(filterValue)
                          );

                          if (commonValues.length === 0) {
                              isMatch = false;
                              break;
                          }
                      }
                  }
                  return isMatch;
              })
            : serversAndPC;

        return result;
    }
);

function isEmptyArrays(obj: Record<keyof IServerAndPC, string[]>) {
    if (Object.keys(obj).length === 0) {
        return true; // Объект пустой
    }

    for (const key in obj) {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            continue; // Свойство является пустым массивом
        } else {
            return false;
        }
    }

    return true; // Все свойства являются пустыми массивами
}
