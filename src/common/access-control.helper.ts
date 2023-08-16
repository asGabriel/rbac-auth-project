import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('user')
  .readOwn('profile', ['id, title'])
  .updateOwn('profile')
  .read('anycontent')

ac.grant('admin')
  .extend('user')
  .readAny('profile')
  .updateAny('profile')
  .deleteAny('profile');

export default ac;