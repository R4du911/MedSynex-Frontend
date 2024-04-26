export class CreateLaboratoryAnalysisResultRequestDTO{
  constructor(
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
    public laboratoryStaffUsername: string
  ) {
  }
}
