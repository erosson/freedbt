import React from 'react'
import Layout from './Layout'
import { Localized } from '@fluent/react';

function Loading(p: {phase: string}) {
  return (
    <Layout>
      <p title={p.phase}><Localized id="loading" /></p>
    </Layout>
  )
}
export default Loading
