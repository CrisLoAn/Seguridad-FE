import { Cost } from "./cost";

// residence.interface.ts
export interface Residence {
  residenceId?: number;
  residenceCode?: string;
  residenceCapacity?: number;
  residenceGender?: string;
  residenceLocation?: string;
  residenceAvailability?: string;
  residenceArea?: number;
  status?: string;
  cost_id?: Cost;
  residenceType?: ResidenceType;
  socioeconomicGroupResidences?:SocioeconomicGroupResidences[];
}

export interface ResidenceType {
  residence_type_id?: number;
  residenceTypeName?: string;
  residenceTypeShortName?: string;
  status?: string;
}

export interface SocioeconomicGroupResidences
{
  socioeconomicGroupResidenceId?: number;
  status?: string;
}