import { of, mergeMap, interval, map, mergeAll, zip } from 'rxjs'

// const age = of(1, 2, 3)

// const agePipe = age.pipe(map((age) => ({ age })))

// agePipe.subscribe((x) => console.log(x))

// =================================================

const age = of(1, 2, 3)

const agePipe = age.pipe(mergeMap((age) => of(age)))

agePipe.subscribe((x) => console.log(x))

// =================================================

// const age = of(1, 2, 3)

// const agePipe = age.pipe(
//   map((age) => of(age)),
//   mergeAll()
// )

// agePipe.subscribe((x) => console.log(x))

// =================================================

// const letters = of('a', 'b', 'c')
// const result = letters.pipe(
//   mergeMap((firstLetter, i) => {
//     // return firstLetter
//     return of(firstLetter + (i + 1))
//   })
// )

// result.subscribe((x) => console.log(x))

// =================================================

// const letters = of('a', 'b', 'c')
// const result = letters.pipe(
//   mergeMap((firstLetter, i) => {
//     return of(firstLetter + (i + 1))
//   })
// )

// result.subscribe((x) => console.log(x))

// =================================================

// const letters = of('a', 'b', 'c')
// const result = mergeMap((firstLetter: string, i: number) => {
//   return of(firstLetter + (i + 1))
// })(letters)

// result.subscribe((x) => {
//   if (x === 'b2') {
//     console.log(`this is ${x}`)
//     return
//   }

//   console.log(x)
// })
