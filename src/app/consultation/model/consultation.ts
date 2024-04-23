import {Patient} from "../../patient/model/patient";

export class Consultation {
  constructor(
    public id: number,
    public patient: Patient,
    public createDate: Date,
    public updateDate: Date,
    public doctorFirstName: string,
    public doctorLastName: string,
    public doctorUsername: string,
    public diagnosis: string,
    public remarks: string,
    public medications: string
  ) {
  }
}
