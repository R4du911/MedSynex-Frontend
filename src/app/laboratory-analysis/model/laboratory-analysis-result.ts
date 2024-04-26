import {Patient} from "../../patient/model/patient";

export class LaboratoryAnalysisResult{
  constructor(
    public id: number,
    public patient: Patient,
    public createDate: Date,
    public updateDate: Date,
    public glucose: number,
    public insulin: number,
    public cholesterol: number,
    public triglyceride: number,
    public haemoglobin: number,
    public leukocyteCount: number,
    public plateletCount: number,
    public totalCalcium: number,
    public totalMagnesium: number,
    public serumIron: number,
    public serumSodium: number,
    public serumPotassium: number,
    public laboratoryName: string,
    public diabetesRisk: boolean,
    public remarks: string
  ) {
  }
}
