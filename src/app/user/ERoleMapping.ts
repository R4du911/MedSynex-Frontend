import { ERole } from './ERole';

export const ERoleMapping: Record<ERole, string> = {
  [ERole.Patient]: 'Patient',
  [ERole.FamilyDoctor]: 'Family Doctor',
  [ERole.Doctor]: 'Doctor',
  [ERole.Laboratory]: 'Laboratory',
};
