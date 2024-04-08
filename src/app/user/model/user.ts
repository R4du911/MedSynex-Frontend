import {FamilyDoctor} from "../../family-doctor/model/family-doctor";
import {Patient} from "../../patient/model/patient";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public patient: Patient,
    public familyDoctor: FamilyDoctor
  ) {
  }
}
