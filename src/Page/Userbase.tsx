import React from 'react'
import * as Model from '../Model'
import * as DBMemory from '../DB/Memory'
import * as DBUserbase from '../DB/Userbase'
import Dexie from 'dexie'
// import { Localized } from '@fluent/react';
import Layout from '../View/Layout'

// https://userbase.com/docs/quickstart/
function Register(p: {dispatch: Model.Dispatch}) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const session = React.useContext(DBUserbase.Context)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    p.dispatch({type: 'auth.register', username, password, rememberMe: 'local'})
  }
  return (
    <div id="auth-view">
      <h1>Create an account</h1>
      <form id="signup-form" onSubmit={onSubmit}>
        <input id="signup-username" type="text" required placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <input id="signup-password" autoComplete="new-password" type="password" required placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <input type="submit" value="Create an account" />
      </form>
      <div id="signup-error">{session.error || ''}</div>
    </div>
  )
}
function Login(p: {dispatch: Model.Dispatch}) {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const session = React.useContext(DBUserbase.Context)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    p.dispatch({type: 'auth.login', username, password, rememberMe: 'local'})
  }
  return (
    <div id="auth-view">
      <h1>Log in</h1>
      <form id="login-form" onSubmit={onSubmit}>
        <input id="login-username" type="text" required placeholder="Username" value={username} onChange={event => setUsername(event.target.value)} />
        <input id="login-password" autoComplete="current-password" type="password" required placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
        <input type="submit" value="Login" />
      </form>
      <div id="signup-error">{session.error || ''}</div>
    </div>
  )
}
function Logout(p: {dispatch: Model.Dispatch}) {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    p.dispatch({type: 'auth.logout'})
  }
  return <button onClick={onSubmit}>Log out</button>
}
export function Page(p: {dispatch: Model.Dispatch}) {
  const session = React.useContext<DBUserbase.Session>(DBUserbase.Context)
  const body = session.user
    ? (
      <div>
        <p>Welcome, {session.user.username}</p>
        <Logout dispatch={p.dispatch} />
      </div>
    )
    : (
      <div>
        <Register dispatch={p.dispatch} />
        <Login dispatch={p.dispatch} />
      </div>
    )
  return (
    <Layout>
      {body}
    </Layout>
  );
}

export function MemoryComponent({state, dispatch}: {state: DBMemory.State, dispatch: Model.Dispatch}) {
  return <Page dispatch={dispatch} />
}
export function DexieComponent({db, dispatch}: {db: Dexie, dispatch: Model.Dispatch}) {
  return <Page dispatch={dispatch} />
}
export function UserbaseComponent({entries, dispatch}: {entries: Array<DBUserbase.Entry>, dispatch: Model.Dispatch}) {
  return <Page dispatch={dispatch} />
}
export default Page
