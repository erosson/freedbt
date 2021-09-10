import React from 'react'
import * as Model from '../Model'
import Layout from './Layout'
import { Localized } from '@fluent/react';

function Main(p: {settings: Model.Settings}) {
  return (
    <Layout settings={p.settings}>
      <p><Localized id="loading" /></p>
    </Layout>
  )
}
export default Main
