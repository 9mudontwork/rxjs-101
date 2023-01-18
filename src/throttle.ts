import { fromEvent, throttle, interval } from 'rxjs'
import { emitKeypressEvents } from 'readline'

emitKeypressEvents(process.stdin)

const keypresses = fromEvent(process.stdin, 'keypress')

const debouncedKeypresses = keypresses.pipe(throttle(() => interval(1000)))

debouncedKeypresses.subscribe((obj: any) => {
  console.log('press')
})

console.log('press enter key')
