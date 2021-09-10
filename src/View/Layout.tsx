import React from 'react'
import {Link} from 'react-router-dom'
import { Localized } from '@fluent/react';

function Main(p: {children: React.ReactNode}) {
  return (
    <div className="App">
      <h1><Link to="/"><Localized id="title" /></Link></h1>
      {p.children}
    </div>
  )
}
export default Main
