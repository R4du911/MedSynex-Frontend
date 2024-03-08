import {FamilyDoctor} from "../../family-doctor/model/family-doctor";

export class RegisterAsPatientRequest {
  constructor(
    public cnp: number,
    public familyDoctor: FamilyDoctor
  ) {
  }
}
