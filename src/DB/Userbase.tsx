import React from 'react'
// import Dexie from 'dexie'
import 'dexie-observable'
import 'dexie-syncable' // required for uuid primary keys (`$$`)
import * as Model from '../Model'
import Loading from '../View/Loading'
import './Dexie/UserbaseSyncProtocol'
import Userbase from 'userbase-js'
import * as U from 'userbase-js/types'

export type Session = U.Session & {error?: string}

class Update {
  setSession: (s:Session) => void

  constructor(setSession: (s:Session) => void) {
    this.setSession = setSession
  }
  async _wrap(fn: () => Promise<Session>) {
    try {
      const session = await fn()
      this.setSession(session)
    }
    catch (error) {
      this.setSession({error: error+''})
    }
  }
  async register(p: {username: string, password: string, email?: string, profile?: U.UserProfile, rememberMe: U.RememberMeOption}) {
    return this._wrap(async () => ({
      user: await Userbase.signUp(p),
    }))
  }
  async login(p: {username: string, password: string, rememberMe: U.RememberMeOption}) {
    return this._wrap(async () => ({
      user: await Userbase.signIn(p),
    }))
  }
  async logout(p: {}) {
    return this._wrap(async () => {
      await Userbase.signOut()
      return {}
    })
  }
}

export const Context = React.createContext<Session>({})
export const UpdateContext = React.createContext<Update>(new Update(function(){}))

function Userbase_(p: {children: React.ReactNode}) {
  const [session, setSession] = React.useState<Session>({})
  const [init, setInit] = React.useState<boolean>(false)
  const update = React.useRef<Update>(new Update(setSession))
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
  if (!init) {
    return <Loading settings={Model.initSettings} phase="userbase.init" />
  }
  return (
    <UpdateContext.Provider value={update.current}>
      <Context.Provider value={session}>
        {p.children}
      </Context.Provider>
    </UpdateContext.Provider>
  )
}
export default Userbase_
