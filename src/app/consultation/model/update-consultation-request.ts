export class UpdateConsultationRequestDTO {
  constructor(
    public id: number,
    public diagnosis: string,
    public remarks: string,
    public medications: string
  ) {
  }
}
