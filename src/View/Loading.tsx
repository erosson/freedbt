import React from 'react'
import Layout from './Layout'
import { main as L } from '../gen/localization'

function Loading(p: { phase: string }) {
  return (
    <Layout>
      <p title={p.phase}><L.Loading /></p>
    </Layout>
  )
}
export default Loading
