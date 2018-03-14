// for this to work, you need to have @types/webpack-env installed
const testsContext = require.context(".", true, /spec.ts$/);

testsContext.keys().forEach(testsContext);
