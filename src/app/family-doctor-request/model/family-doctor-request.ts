import {FamilyDoctor} from "../../family-doctor/model/family-doctor";
import {Patient} from "../../patient/model/patient";

export class FamilyDoctorRequest {
  constructor(
    public familyDoctor: FamilyDoctor,
    public patient: Patient
  ) {
  }
}
