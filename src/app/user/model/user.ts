import {FamilyDoctor} from "../../family-doctor/model/family-doctor";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public familyDoctor: FamilyDoctor
  ) {
  }
}
