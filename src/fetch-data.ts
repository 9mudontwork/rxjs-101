import { catchError, switchMap, of, Subject, concatMap } from 'rxjs'
import { fromFetch } from 'rxjs/fetch'

export {}

type UsersT = Array<UserT>

type UserT = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

/**
 * ref: https://ncjamieson.com/understanding-fromfetch/
 * checked transfer encoding
 * มีประโยชน์เมื่อ client รับ response ขนาดใหญ่
 * บางทีอาจจะไม่รู้ว่า request นั้น เสร็จสมบูรณ์หรือยัง
 * header จะค่อย ๆ ส่ง chuck มา ช่วย client เช็คข้อมูลได้เร็วขึ้น
 */

/**
 * return promise มาจาก fetch
 * emit response และ resolve ตอน ได้ header ก่อนได้ body มา
 *
 * เมื่อ text() หรือ json() ถูกเรียก promise ที่ return ยังไม่ถูก resolve
 * จนกว่าจะได้ body
 *
 * unsubscribe ไม่สามารถ abort ได้
 *
 * fromfect จัดการ AbortController ให้อัตโนมัติ
 * ถ้า selector ผ่าน promise จะถูกคุมด้วย AbortController
 * ถ้า unsubscribe ก่อน ได้ header จะ abort ได้
 * promise จะ return rejct with AbortError
 */

const userSubject = new Subject()

userSubject.subscribe({
  next: (v) => {
    console.log(v)
  },
})

function getUser(username: string) {
  userSubject.next(username)
}

const users$ = fromFetch('https://api.github.com/users').pipe(
  switchMap((response) => {
    if (response.ok) {
      return response.json()
    } else {
      return of({ error: true, message: `Error ${response.status}` })
    }
  }),
  catchError((err) => {
    console.error(err)
    return of({ error: true, message: err.message })
  })
)

users$.subscribe({
  next: (users: UsersT) => {
    users = users.slice(0, 5)
    users.forEach((user) => {
      getUser(user.login)
    })
  },
})

// const data$ = fromFetch<UsersT>('https://api.github.com/users', {
//   selector: (response) => response.json(),
// })

// data$.subscribe({
//   next: (result) => console.log(result),
//   complete: () => console.log('done'),
// })
