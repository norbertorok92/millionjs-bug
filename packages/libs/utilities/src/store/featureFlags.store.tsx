import { createContext, useContext } from 'react';

import * as configcat from 'configcat-js';
import { action, autorun, computed, observable, when } from 'mobx';
import { isEmpty, mergeAll } from 'ramda';

import { ConfigCatUserObject, FeatureFlagKeys, TargetedUser } from '../types/configCat';

import { SettingKeyValue } from 'configcat-common/lib/ConfigCatClient';

const configCatClient = configcat.createClientWithAutoPoll('dummyKEY', {
  pollIntervalSeconds: 60,
  configChanged: () => window.location.reload(),
  // logger: configcat.createConsoleLogger(3),
});

class FeatureFlagsStore {
  @observable featureFlags: Partial<Record<FeatureFlagKeys, boolean>> = {};
  @observable configCatUserObj: TargetedUser = { identifier: '', email: '', custom: {} };

  @action.bound
  async fetchConfigCat() {
    const fetchedFlags = await configCatClient.getAllValuesAsync(this.configCatUserObj); // Fetching all the flags from configCat
    const flags = [] as SettingKeyValue[];

    Object.keys(FeatureFlagKeys).map((neededFlag) => {
      // mapping through the needed flags
      const flag = fetchedFlags.find((flag) => flag.settingKey === neededFlag); // finding the needed flag key:vlue pair
      if (flag) {
        flags.push(flag);
      } else {
        console.log(`${neededFlag} flag doesn't exist!`);
      }
    });

    this.setFeatureFlags(flags); // we will return ONLY the needed flags not all the flags from configCat
  }

  @action.bound
  setFeatureFlags(flags: SettingKeyValue[]) {
    this.featureFlags = mergeAll(
      flags.map((flag) => {
        return { [flag.settingKey]: flag.settingValue };
      })
    );
  }

  @action.bound
  setConfigCatUserObj(user: ConfigCatUserObject) {
    this.configCatUserObj = {
      identifier: user.id,
      email: user.email,
      custom: {
        organisationId: user?.organisationId || '',
        entity: user?.entity || '',
      },
    };
  }

  @computed
  get isConfigCatLoaded() {
    return !isEmpty(this.configCatUserObj) && !isEmpty(this.featureFlags);
  }
}

const featureFlagsStore = new FeatureFlagsStore();

autorun(() => {
  featureFlagsStore.fetchConfigCat();
});

when(
  () => !!featureFlagsStore.configCatUserObj.identifier,
  () => featureFlagsStore.fetchConfigCat()
);

const FeatureFlagsStoreContext = createContext<FeatureFlagsStore>(featureFlagsStore);

const useFeatureFlagsStore = () => {
  return useContext(FeatureFlagsStoreContext);
};

export { useFeatureFlagsStore, featureFlagsStore };
