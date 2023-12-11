import { studentRecord } from "./record";
import { Resident } from "./resident";

export interface RecordPenalty {
    recordId?:number;
    status?:String;
    penaltyDate?:number;
    description?:String; 
}

