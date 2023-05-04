import { useRollbarConfiguration } from './useRollbarConfiguration.js';
import './useRollbar.js';
import 'react';
import './provider-df81bf5c.js';
import './_rollupPluginBabelHelpers-b1794394.js';
import 'prop-types';
import 'rollbar';
import './tiny-invariant.esm-c1395f98.js';
import './constant.js';

function useRollbarPerson(person) {
  useRollbarConfiguration({
    payload: {
      person: person
    }
  });
}

export { useRollbarPerson };
//# sourceMappingURL=useRollbarPerson.js.map
