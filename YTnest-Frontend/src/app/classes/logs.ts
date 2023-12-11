export class Logs{

    logId?:number;
    logDate?:Date;
    logUser?:string;
    logTerminal?:string;
    logObservations?:string;
    logProcedureName?:string;
    schemeTable?:SchemeTable;
}

export class SchemeTable{
    tableId?:number;
    tableName?:string;
    tableDescription?:string;
    status?:string;
}