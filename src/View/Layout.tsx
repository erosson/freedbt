import React from 'react'
import {Link} from 'react-router-dom'
import { Localized } from '@fluent/react';
import * as Model from '../Model'

function Layout(p: {settings: Model.Settings, children: React.ReactNode}) {
  const isDarkDefault = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = p.settings.darkMode === 'dark' || (p.settings.darkMode === 'default' && isDarkDefault)
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
