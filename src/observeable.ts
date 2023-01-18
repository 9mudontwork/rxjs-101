import { Observable } from 'rxjs'

/**
 * observable return multiple value, fucntion return single value
 */

const observable = new Observable((subscriber) => {
  console.log('1')
  console.log('2')
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
  }, 1000)
  console.log('5')
  subscriber.complete()
  console.log('6')
  subscriber.next(7)
})

;(() => {
  console.log('before')
  observable.subscribe((x) => {
    console.log(x)
  })
  console.log('after')

  console.log('======================================')

  observable.subscribe({
    next: (x) => {
      console.log(x)
    },
    error: (err) => {
      console.log(err)
    },
    complete: () => {
      console.log('done')
    },
  })
  console.log('after')
})()
