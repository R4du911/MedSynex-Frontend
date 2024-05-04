export class DiabetesRiskPredictionSavedData {
  constructor(
    public pregnancies: number,
    public skinThickness: number,
    public firstDegreeDiabetesCount: number,
    public secondDegreeDiabetesCount: number,
    public age: number
  ) {
  }
}
