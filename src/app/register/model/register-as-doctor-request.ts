import {Hospital} from "../../hospital/model/hospital";
import {Specialization} from "../../specialization/model/specialization";

export class RegisterAsDoctorRequest {
  constructor(
    public hospital: Hospital,
    public specialization: Specialization
  ) {
  }
}
