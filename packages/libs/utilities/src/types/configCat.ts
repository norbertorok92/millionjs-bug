export enum FeatureFlagKeys {
  DUMMY_FF = 'DUMMY_FF',
}

export interface ConfigCatFlag {
  settingKey: string;
  settingValue: boolean;
}

export interface IUser {
  identifier: string;
  email?: string;
}

export interface TargetedUser extends IUser {
  custom?: {
    organisationId?: string;
    entity?: string;
  };
}

export interface ConfigCatUserObject {
  id: string;
  email: string;
  organisationId?: string;
  entity?: string;
}
