import 'fake-indexeddb/auto'
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import {MemoryRouter as Router} from 'react-router-dom'
import * as App from './App';

function Main(p) {
  return <Router {...p}><App.MainRoutes /></Router>
}

test('home', async () => {
  render(<Main />);
  await waitFor(() => screen.getByText(/FreeDBT/))
  expect(screen.getAllByText(/Write a new/).length).toBe(3);
});
test('create journal', async () => {
  render(<Main initialEntries={['/entries/create/journal']}/>);
  await waitFor(() => screen.getByText(/FreeDBT/))
  expect(screen.getByText(/Create/)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
});
test('create cbt', async () => {
  render(<Main initialEntries={['/entries/create/cbt']}/>);
  await waitFor(() => screen.getByText(/FreeDBT/))
  expect(screen.getByText(/Create/)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
});
test('create dbt-emotional-regulation-5', async () => {
  render(<Main initialEntries={['/entries/create/dbt-emotion-regulation-5']}/>);
  await waitFor(() => screen.getByText(/FreeDBT/))
  expect(screen.getByText(/Create/)).toBeInTheDocument();
  expect(screen.getByText(/Submit/)).toBeInTheDocument();
});
