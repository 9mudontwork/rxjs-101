import { fromEvent, debounce, interval } from 'rxjs'
import { emitKeypressEvents } from 'readline'

emitKeypressEvents(process.stdin)

const keypresses = fromEvent(process.stdin, 'keypress')

const debouncedKeypresses = keypresses.pipe(debounce(() => interval(350)))

debouncedKeypresses.subscribe((obj: any) => {
  console.log('press')
})

console.log('press enter key')
