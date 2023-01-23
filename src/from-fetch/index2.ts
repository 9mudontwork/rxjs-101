import { map, switchMap, zip } from 'rxjs'
import { zipAll } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'

// rx ยิง api
// array 5 ตัวแรก
// get url
// ดึงข้อมูลแต่ละหน้า อีกครั้ง 5 ตัว
// https://api.github.com/users

export {}
;(() => {
  fromFetch('https://dummyjson.com/users')
    .pipe(
      switchMap((response) => {
        return response.json()
      }),
      map((users) => {
        return (users.users as any[]).slice(0, 1) // dummy
      }),
      map((users) => {
        const obs = users.map((user) => {
          return fromFetch(`https://dummyjson.com/users/${user.id}`)

          return fromFetch(`https://dummyjson.com/users/${user.id}`).pipe(
            switchMap((response) => {
              return response.json()
            })
          )
        })

        // return zip(obs).pipe(
        //   switchMap(([a]: any[]) => {
        //     console.log(a)
        //   })
        // )
      }),

      zipAll()
    )
    .subscribe({
      next: (response) => {
        console.log(response)
      },
    })
})()
