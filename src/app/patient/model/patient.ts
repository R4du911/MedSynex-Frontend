import {FamilyDoctor} from "../../family-doctor/model/family-doctor";

export class Patient {
  constructor(
    public cnp: number,
    public familyDoctor: FamilyDoctor,
    public lastName?: string,
    public firstName?: string
  ) {
  }
}
