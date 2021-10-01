import 'fake-indexeddb/auto'
import React from 'react';
import { FluentBundle, FluentResource } from '@fluent/bundle'
import { LocalizationProvider, ReactLocalization, Localized } from '@fluent/react'
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom'
import { promises as fs } from 'fs'
import glob from 'glob'
import { promisify } from 'util'

import * as Locale from './Locale'
import * as App from './App';

let l10n: ReactLocalization
beforeAll(async () => {
  const bundle = new FluentBundle(['en-US'])
  const paths = await promisify(glob.glob)('./src/locales/en-US/**/*.ftl')
  const resources = await Promise.all(paths.map(async p => new FluentResource(await fs.readFile(p, { encoding: 'utf-8' }))))
  for (let r of resources) {
    bundle.addResource(r)
  }
  l10n = new ReactLocalization([bundle])
})

function Main(p: any) {
  return <Router {...p}><App.AppRoutes l10n={l10n} /></Router>
}

test('fluent renders', async () => {
  // https://github.com/projectfluent/fluent.js/blob/master/fluent-react/test/localized_render.test.js
  render(<LocalizationProvider l10n={l10n}><Localized id="title" /></LocalizationProvider>)
  expect(screen.getByText('FreeDBT')).toBeInTheDocument()
})

test('home', async () => {
  render(<Main />);
  await waitFor(() => screen.getByText(/FreeDBT/))
  await waitFor(() =>
    expect(screen.getAllByText(/Write a new/).length).toBe(2))
});

test('create journal', async () => {
  render(<Main initialEntries={['/entries/create/journal']} />)
  await waitFor(() => screen.getByText(/FreeDBT/))
  await waitFor(() =>
    expect(screen.getByText(/Write a new journal/)).toBeInTheDocument())
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
});

test('create cbt', async () => {
  render(<Main initialEntries={['/entries/create/cbt']} />)
  await waitFor(() => screen.getByText(/FreeDBT/))
  await waitFor(() =>
    expect(screen.getByText(/Write a new CBT/)).toBeInTheDocument())
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
});

test('create dbt-emotional-regulation-5', async () => {
  render(<Main initialEntries={['/entries/create/dbt-emotion-regulation-5']} />)
  await waitFor(() => screen.getByText(/FreeDBT/))
  await waitFor(() =>
    expect(screen.getByText(/Write new DBT/)).toBeInTheDocument())
  expect(screen.getByText(/Submit/)).toBeInTheDocument()
});
