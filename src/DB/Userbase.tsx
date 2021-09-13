import React from 'react'
import Loading from '../View/Loading'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import Userbase from 'userbase-js'
import {RouteSpec} from '../Routes'
import * as U from 'userbase-js/types'
import * as Util from '../Util'

export type Session
  = {status: 'loading'}
  | {status: 'error', error: string}
  | {status: 'ready', user: U.UserResult}
  | {status: 'logged-out'}

export const Context = React.createContext<Session>({status: 'loading'})

function UserbaseSettings(p: {session: Session, children: React.ReactNode}) {
  const [settings, setSettings] = React.useState<Model.Settings | null>(null)
  React.useEffect(() => {
    if (p.session.status === 'ready') {
      Userbase.openDatabase({
        databaseName: 'settings',
        changeHandler(items: Array<U.Item>) {
          setSettings(items[0]?.item || Model.initSettings)
        },
      })
    }
    else {
      // remove settings after logout
      setSettings(null)
    }
  }, [p.session.status])

  return (
    <Util.SettingsContext.Provider value={settings}>
      {p.children}
    </Util.SettingsContext.Provider>
  )
}
export async function init(setSession: (s:Session) => void) {
  try {
    const session = await Userbase.init({
      appId: 'a35017de-dc04-4d7f-9a6f-fe609afeac95',
      updateUserHandler: (session) => {
        setSession(session.user ? {status: 'ready', user: session.user} : {status: 'logged-out'})
        // console.log('updateUserHandler', session)
      },
    })
    setSession(session.user ? {status: 'ready', user: session.user} : {status: 'logged-out'})
  }
  catch (error) {
    setSession({status: 'error', error: error+''})
  }
  // console.log('init', session)
}
export async function update(setSession: (s:Session) => void, action: Model.Action): Promise<null> {
  switch(action.type) {
    case 'auth.register':
      setSession({status: 'loading'})
      try {
        setSession({status: 'ready', user: await Userbase.signUp(action)})
      }
      catch (error) {
        setSession({status: 'error', error: error+''})
      }
      return null
    case 'auth.login':
      setSession({status: 'loading'})
      try {
        setSession({status: 'ready', user: await Userbase.signIn(action)})
      }
      catch (error) {
        setSession({status: 'error', error: error+''})
      }
      return null
    case 'auth.logout':
      try {
        await Userbase.signOut()
        setSession({status: 'logged-out'})
      }
      catch (error) {
        setSession({status: 'error', error: error+''})
      }
      return null
    case 'reset':
      // TODO
      return null
    case 'settings.update':
      try {
        await Userbase.updateItem({databaseName: 'settings', itemId: '1', item: action.value})
      }
      catch (e) {
        await Userbase.insertItem({databaseName: 'settings', itemId: '1', item: action.value})
      }
      return null
    case 'entry.create':
      await Userbase.insertItem({databaseName: 'entries', item: action.data})
      return null
    case 'entry.update':
      await Userbase.updateItem({databaseName: 'entries', itemId: action.id, item: action.data})
      return null
    case 'entry.delete':
      await Userbase.deleteItem({databaseName: 'entries', itemId: action.id})
      return null
  }
}

export type Entry = Omit<U.Item, "item"> & {item: Omit<Model.Entry, "createdAt"|"updatedAt">}
export function toEntry(item: Entry): Model.Entry {
  return {...item.item,
    createdAt: new Date(item.createdBy.timestamp),
    updatedAt: new Date(item.updatedBy?.timestamp || item.createdBy.timestamp),
  } as Model.Entry
}
export function Wall(p: {loading: string, loggedOut: boolean, children: JSX.Element}): JSX.Element {
  const session = React.useContext<Session>(Context)
  switch(session.status) {
    case 'ready':
      return p.children
    case 'logged-out':
      return p.loggedOut ? <Router.Redirect to="/userbase" /> : p.children
    case 'loading':
      return p.loading ? <Loading phase={p.loading} /> : p.children
    case 'error':
      // TODO
      return <code>{session.error}</code>
  }
}
function Userbase_({routes}: {routes: Array<RouteSpec>}) {
  const [session, setSession] = React.useState<Session>({status: 'loading'})
  const [isInit, setIsInit] = React.useState<boolean>(false)
  const [entries, setEntries] = React.useState<Array<Entry>>([])

  React.useEffect(() => {
    init(setSession)
    setIsInit(true)
  }, [])
  const dispatch = Util.useSideEffect<Model.Action>(a => update(setSession, a))

  React.useEffect(() => {
    if (session.status === 'ready') {
      Userbase.openDatabase({
        databaseName: 'entries',
        changeHandler(items: Array<U.Item>) {
          setEntries(items)
        },
      })
    }
    else {
      setEntries([])
    }
  }, [session.status])
  if (!isInit) {
    return <Loading phase="userbase.init" />
  }
  return (
    <UserbaseSettings session={session}>
      <Context.Provider value={session}>
        <Router.Switch>
          {routes.map((route, index) => (
            <Router.Route key={index} exact={route.exact} path={route.path}>
              <route.component.UserbaseComponent entries={entries} dispatch={dispatch} />
            </Router.Route>
          ))}
        </Router.Switch>
      </Context.Provider>
    </UserbaseSettings>
  )
}
export default Userbase_
