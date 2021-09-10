import React from 'react'
import Layout from './Layout'
import { Localized } from '@fluent/react';

function Main() {
  return (
    <Layout>
      <p><Localized id="loading" /></p>
    </Layout>
  )
}
export default Main
