import { Penalties } from "./penalties";
import { RECORD } from "./record";

export interface RecordPenaltys {
    recordPenaltyId?:number;
    penalty?:Penalties;
    record?:RECORD;
    status?:string;
    penaltyDate?: number;
    description?: string;
}
