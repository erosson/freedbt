import React from 'react'
import { Link } from 'react-router-dom'
import { Localized } from '@fluent/react';
import * as Model from '../Model'
import * as Util from '../Util'

function Layout(p: { children: React.ReactNode }) {
  const settings: Model.Settings = React.useContext<Model.Settings | null>(Util.SettingsContext) || Model.initSettings()
  const isDarkDefault = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = settings.darkMode === 'dark' || (settings.darkMode === 'default' && isDarkDefault)
  // in tailwind, `class="dark"` affects all child elements.
  // `.app-root` doesn't always have full height though, so append to `<html>`
  if (isDark) {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <div className="app-root">
      <h1><Link to="/"><Localized id="title" /></Link></h1>
      {p.children}
    </div>
  )
}
export default Layout
