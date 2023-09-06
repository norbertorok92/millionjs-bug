import { isEmpty } from 'ramda';

import { FeatureFlagKeys } from '../types/configCat';

import { useFeatureFlagsStore } from '../store/featureFlags.store';

export const useGetFeatureFlagValue = (settingKey: FeatureFlagKeys) => {
  const { featureFlags } = useFeatureFlagsStore();

  const returnValue = (settingKey: FeatureFlagKeys) => {
    if (Object.keys(featureFlags).includes(settingKey)) {
      return !!featureFlags[settingKey]; // return the flag value if exists
    }
    console.log(`${settingKey} flag doesn't exist, but it was used, we default to true!`);
    return true;
  };

  const flagValue = !isEmpty(featureFlags) && returnValue(settingKey);

  return flagValue;
};
