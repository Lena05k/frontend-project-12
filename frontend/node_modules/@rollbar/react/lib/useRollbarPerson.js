'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var useRollbarConfiguration = require('./useRollbarConfiguration.js');
require('./useRollbar.js');
require('react');
require('./provider-2573078d.js');
require('./_rollupPluginBabelHelpers-41b6ce9e.js');
require('prop-types');
require('rollbar');
require('./tiny-invariant.esm-50f7ea43.js');
require('./constant.js');

function useRollbarPerson(person) {
  useRollbarConfiguration.useRollbarConfiguration({
    payload: {
      person: person
    }
  });
}

exports.useRollbarPerson = useRollbarPerson;
//# sourceMappingURL=useRollbarPerson.js.map
