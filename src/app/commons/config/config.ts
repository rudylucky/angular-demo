import { isNonEmptyString } from 'ng-zorro-antd';

export enum PROFILE { DEV, TEST };

export const HOSTNAME = 'localhost';
export const PORT = '5000';

const $ = {
  HOSTNAME,
  PORT,
  PROFILE: PROFILE.DEV
}

export function isTest() {
  return $.PROFILE === PROFILE.DEV;
}

export default $;