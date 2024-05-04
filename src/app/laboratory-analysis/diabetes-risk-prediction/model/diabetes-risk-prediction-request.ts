export class DiabetesRiskPredictionRequestDTO {
  constructor(
    public laboratoryAnalysisResultID: number,
    public pregnancies: number,
    public glucose: number,
    public bloodPressure: number,
    public skinThickness: number,
    public insulin: number,
    public height: number,
    public weight: number,
    public firstDegreeDiabetesCount: number,
    public secondDegreeDiabetesCount: number,
    public age: number
  ) {
  }
}
