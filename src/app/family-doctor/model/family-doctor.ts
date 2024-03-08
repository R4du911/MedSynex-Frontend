import {Dispensary} from "../../dispensary/model/dispensary";

export class FamilyDoctor{
  constructor(
    public id: number,
    public dispensary: Dispensary,
    public nrPatients: number,
    public lastName?: string,
    public firstName?: string
  ) {
  }
}
