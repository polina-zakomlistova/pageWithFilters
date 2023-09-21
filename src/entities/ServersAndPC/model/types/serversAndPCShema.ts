// enums

export enum PCEnum {
    type1 = 'type1',
    type2 = 'type2',
    type3 = 'type3',
}

export enum TagEnum {
    redTag = 'redTag',
    greenTag = 'greenTag',
    blueTag = 'blueTag',
}

// interface for server and PC
export interface IServerAndPC {
    name: string;
    type: PCEnum;
    location: string;
    organizationUnit: string;
    inventoryNumber: string | number;
    tags: TagEnum[];
    dateCreation: string;
    dateUpdate: string;
    dateAudit: string;
    [key: string]: string | number | TagEnum[];
}

export type ServersAndPCSchema = IServerAndPC[];
