import React from 'react'
import Layout from './Layout'

function Fatal(p: {message: string | string[]}) {
  const messages: string[] = typeof p.message === 'string' ? [p.message] : p.message
  return (
    <Layout>
      <ul style={{color: 'red'}}>
        {messages.map(m => <li><pre>{m}</pre></li>)}
      </ul>
    </Layout>
  )
}
export default Fatal
