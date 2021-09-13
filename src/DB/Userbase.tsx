import React from 'react'
import Loading from '../View/Loading'
import * as Router from 'react-router-dom'
import * as Model from '../Model'
import Userbase from 'userbase-js'
import {RouteSpec} from '../Routes'
import * as U from 'userbase-js/types'
import * as Util from '../Util'

export type Session = U.Session & {error?: string}
export const Context = React.createContext<Session>({})

function UserbaseSettings(p: {session: Session, children: React.ReactNode}) {
  const [settings, setSettings] = React.useState<Model.Settings | null>(null)
  React.useEffect(() => {
    if (p.session.user) {
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
  }, [p.session.user])

  return (
    <Util.SettingsContext.Provider value={settings}>
      {p.children}
    </Util.SettingsContext.Provider>
  )
}

export type Entry = Omit<U.Item, "item"> & {item: Omit<Model.Entry, "createdAt"|"updatedAt">}
export function toEntry(item: Entry): Model.Entry {
  return {...item.item,
    createdAt: new Date(item.createdBy.timestamp),
    updatedAt: new Date(item.updatedBy?.timestamp || item.createdBy.timestamp),
  } as Model.Entry
}
function Userbase_({routes}: {routes: Array<RouteSpec>}) {
  const [session, setSession] = React.useState<Session>({})
  const [init, setInit] = React.useState<boolean>(false)
  const [entries, setEntries] = React.useState<Array<Entry>>([])
  React.useEffect(() => {
    (async () => {
      try {
        const session = await Userbase.init({
          appId: 'a35017de-dc04-4d7f-9a6f-fe609afeac95',
          updateUserHandler: (session) => {
            setSession(session)
            // console.log('updateUserHandler', session)
          },
        })
        setSession(session)
      }
      catch (error) {
        setSession({error: error+''})
      }
      finally {
        setInit(true)
      }
      // console.log('init', session)
    })()
  }, [])
  React.useEffect(() => {
    if (session.user) {
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
  }, [session.user])
  const dispatch = Util.useSideEffect(async (action: Model.Action) => {
    switch(action.type) {
      case 'auth.register':
        try {
          setSession({user: await Userbase.signUp(action)})
        }
        catch (error) {
          setSession({error: error+''})
        }
        return null
      case 'auth.login':
        try {
          setSession({user: await Userbase.signIn(action)})
        }
        catch (error) {
          setSession({error: error+''})
        }
        return null
      case 'auth.logout':
        try {
          await Userbase.signOut()
          setSession({})
        }
        catch (error) {
          setSession({error: error+''})
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
  })
  if (!init) {
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
