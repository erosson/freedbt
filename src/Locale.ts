// https://projectfluent.org/
//
// based on https://github.com/projectfluent/fluent.js/wiki/React-Bindings
import 'intl-polyfill'
import { negotiateLanguages } from '@fluent/langneg'
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { ReactLocalization } from '@fluent/react'

// TODO this fails completely in tests
// TODO this will get very ugly once we support multiple languages
/* eslint import/no-webpack-loader-syntax: off */
import enUSMain from '!!raw-loader!./locales/en-US/main.ftl'
import enUSCbt from '!!raw-loader!./locales/en-US/cbt.ftl'
import enUSJournal from '!!raw-loader!./locales/en-US/journal.ftl'
import enUSDbtEmotionRegulation5 from '!!raw-loader!./locales/en-US/dbt-emotion-regulation-5.ftl'

// Store all translations as a simple object which is available
// synchronously and bundled with the rest of the code.
const RESOURCES: { [i: string]: FluentResource[] } = {
  'en-US': [enUSMain, enUSCbt, enUSJournal, enUSDbtEmotionRegulation5].map(r => new FluentResource(r)),
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
    for (let r of RESOURCES[locale]) {
      bundle.addResource(r);
    }
    yield bundle;
  }
}

// The ReactLocalization instance stores and caches the sequence of generated
// bundles. You can store it in your app's state.
export default new ReactLocalization(generateBundles(navigator.languages));
