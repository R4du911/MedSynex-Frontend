export class CreateConsultationRequestDTO {
  constructor(
    public doctorUsername: string,
    public diagnosis: string,
    public remarks: string,
    public medications: string
  ) {
  }
}
