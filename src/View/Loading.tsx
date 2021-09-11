import React from 'react'
import * as Model from '../Model'
import Layout from './Layout'
import { Localized } from '@fluent/react';

function Loading(p: {settings: Model.Settings, phase: string}) {
  return (
    <Layout settings={p.settings}>
      <p title={p.phase}><Localized id="loading" /></p>
    </Layout>
  )
}
export default Loading
