import { Schema, model } from 'mongoose';
import { IRoles } from '../Interface/Roles';

const rolesSchema = new Schema<IRoles>({
  is_Admin: {
    type: Boolean,
    required: true,
  },
  is_user: {
    type: Boolean,
    required: true,
  },
});

const Roles = model<IRoles>('Roles', rolesSchema);
export default Roles;
