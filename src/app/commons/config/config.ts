import { isNonEmptyString } from 'ng-zorro-antd';

export enum PROFILE { DEV, TEST };

const HOSTNAME = '192.168.1.126';
const PORT = '8080';

const $ = {
  HOSTNAME,
  PORT,
  PROFILE: PROFILE.DEV
}

export function isTest() {
  return $.PROFILE === PROFILE.DEV;
}

export default $;