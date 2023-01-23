import {
  catchError,
  map,
  of,
  Subject,
  switchMap,
  take,
  zip,
  mergeMap,
  from,
  merge,
} from 'rxjs'
import { zipAll, mergeAll } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import type { UsersT, UserT } from './types'

// rx ยิง api
// array 5 ตัวแรก
// get url
// ดึงข้อมูลแต่ละหน้า อีกครั้ง 5 ตัว
// https://api.github.com/users

class BoardcastSubject {
  private static instance: BoardcastSubject
  private subjects: Subject<any>

  private constructor() {
    this.subjects = new Subject()
  }

  public static getInstance(): BoardcastSubject {
    if (!this.instance) {
      this.instance = new BoardcastSubject()
    }

    return this.instance
  }

  public emit<T>(key: string, value: T) {
    this.subjects.next({ key, value })
  }

  public subscribe<T>(key: string, callback: (value: T) => void) {
    this.subjects.subscribe({
      next: callback,
      error: (err) => {
        console.log({ [key]: err })
      },
    })
  }
}

type CustomT = string | Record<string, string>

class Event {
  emit(key: string, value: CustomT) {
    BoardcastSubject.getInstance().emit<CustomT>(key, value)
  }

  on(key: string, callback: (value: any) => void) {
    BoardcastSubject.getInstance().subscribe<CustomT>(key, callback)
  }
}

enum UserEvent {
  GET_USER = 'getUser',
}

class User extends Event {
  // users: Array<Partial<UserT>>

  subscribeUser() {
    this.on(UserEvent.GET_USER, (data: { key: string; value: string }) => {
      const { value: user } = data
      this.getUserByUsername(user)
    })
  }

  getUserByUsername(username: string) {
    const data$ = fromFetch<UserT>(`https://api.github.com/users/${username}`, {
      selector: (response) => response.json(),
    })

    data$.subscribe({
      next: (result) => {
        const { id, login } = result
        console.log(id, login)
      },
    })
  }
}

;(() => {
  const _user = new User()
  _user.subscribeUser()

  const users$ = fromFetch('https://api.github.com/users').pipe(
    switchMap((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        return of({ error: true, message: `Error ${response.status}` })
      }
    }),
    // map((val) => {
    //   console.log(val)
    //   return val
    // }),
    // take(5),
    catchError((err) => {
      console.error(err)
      return of({ error: true, message: err.message })
    })
  )

  users$.subscribe({
    next: (users: UsersT) => {
      if ('error' in users) return

      users = users.slice(0, 5)
      users.forEach((user) => {
        _user.emit(UserEvent.GET_USER, user.login)
      })
    },
    error: (err) => {
      console.log(err)
    },
    complete: () => {
      console.log('done')
    },
  })
})()

// export {}
// ;(() => {
//   fromFetch('https://api.github.com/users')
//     .pipe(
//       switchMap((response) => {
//         return response.json()
//       }),
//       map((users) => {
//         return (users as any[]).slice(0, 5)
//       }),
//       map((users) => {
//         const obs = users.map((user) => {
//           return fromFetch(user.url)
//         })
//         return zip(obs).pipe())
//       }),
//       map(items => {}),
//       // zipAll(),
//       // map((val) => {
//       //   console.log(val)
//       //   return val
//       // }),
//       // take(5),
//       catchError((err) => {
//         console.error(err)
//         return of({ error: true, message: err.message })
//       })
//     )
//     .subscribe({
//       next: (res) => {
//         console.log('res: ', res)
//       },
//     })
// })()
