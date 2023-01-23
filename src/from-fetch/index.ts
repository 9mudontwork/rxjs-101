import { map, switchMap, zip } from 'rxjs'
import { zipAll, mergeMap } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'

// rx ยิง api
// array 5 ตัวแรก
// get url
// ดึงข้อมูลแต่ละหน้า อีกครั้ง 5 ตัว
// https://api.github.com/users

export {}
;(() => {
  // fromFetch('https://dummyjson.com/users')
  //   .pipe(
  //     switchMap((response) => {
  //       return response.json()
  //     }),
  //     map((users) => {
  //       return (users.users as any[]).slice(0, 5)
  //     }),
  //     mergeMap((users) => {
  //       const obs = users.map((user) => {
  //         return fromFetch(`https://dummyjson.com/users/${user.id}`)
  //       })
  //       return zip(obs)
  //     }),
  //     mergeMap((items) => {
  //       return items.map((res) => {
  //         return res.json()
  //       })
  //     }),
  //     zipAll()
  //   )
  //   .subscribe({
  //     next: (response) => {
  //       console.log(response)
  //     },
  //   })

  ;(async () => {
    const res = await fetch('https://dummyjson.com/users')
    const json = await res.json()
    const result = []

    for (let i = 0; i < json.users.length; i++) {
      const item: any = await fetch(
        `https://dummyjson.com/users/${json.users[i].id}`
      )
      const jsonObj = await item.json()
      result.push(jsonObj)
    }
    console.log(result)
  })()
})()
