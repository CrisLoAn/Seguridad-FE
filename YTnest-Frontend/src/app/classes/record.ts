import { RecordPenalty } from "./record-penalty";
import { Student } from "./student";

export class studentRecord {
  recordId?: number;
  student_id?: number;
  recordDescription?: string;
  score?: number;
  status?: string;
  recordPenalty?: RecordPenalty | null;
}

export class RECORD{
  recordId?: number;
  recordDescription?: string;
  status?: string;
  score?: number;
  recordPenalty?: RecordPenalty | null;
  student?: Student;
}
