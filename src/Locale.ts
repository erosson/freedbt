// https://projectfluent.org/
//
// based on https://github.com/projectfluent/fluent.js/wiki/React-Bindings
import 'intl-polyfill'
import { negotiateLanguages } from '@fluent/langneg'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { ReactLocalization } from '@fluent/react'

// TODO this fails completely in tests
// eslint-disable-next-line import/no-webpack-loader-syntax
import enUS from '!!raw-loader!./locales/en-US/main.ftl'

// Store all translations as a simple object which is available
// synchronously and bundled with the rest of the code.
const RESOURCES: {[i:string]: FluentResource} = {
  'en-US': new FluentResource(enUS),
};

// A generator function responsible for building the sequence
// of FluentBundle instances in the order of user's language
// preferences.
function* generateBundles(userLocales: readonly string[]) {
  // Choose locales that are best for the user.
  const currentLocales = negotiateLanguages(
    userLocales,
    ['en-US'],
    { defaultLocale: 'en-US' }
  );

  for (const locale of currentLocales) {
    const bundle = new FluentBundle(locale);
    bundle.addResource(RESOURCES[locale]);
    yield bundle;
  }
}

// The ReactLocalization instance stores and caches the sequence of generated
// bundles. You can store it in your app's state.
export default new ReactLocalization(generateBundles(navigator.languages));
