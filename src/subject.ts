import {
  AsyncSubject,
  BehaviorSubject,
  connectable,
  from,
  multicast,
  ReplaySubject,
  Subject,
} from 'rxjs'

/**
 * observable (watch ได้)
 * observer (ตัว watch)
 * subject เป็น observable สามารถมีหลาย observer มี listener ได้หลายตัว
 * ทุก subject เป็น observer
 * แต่ทำงานทีละอย่างในแต่ละ subscribe ให้ครบก่อน จึงวนค่าถัดไป
 *
 * reactive programming = push style
 * ต้องมีตัวส่งข้อมูลมา ตัว subscribe รันข้อมูลอัตโนมัติ
 *
 * อื่น ๆ
 * generator function. pull style ดึงข้อมูลที่อยากได้
 * function* yield
 *
 */

console.log('subject =============================================')

const subject = new Subject<number>()

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
})
subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
})

subject.next(1)
subject.next(2)
subject.next(3)

console.log('observable =============================================')

const observable = from([4, 5, 6])
observable.subscribe(subject)

/**
 * multicast is deprecate
 * ref: https://rxjs.dev/deprecations/multicasting#multicast
 */

console.log('multicast =============================================')

const source = from([7, 8, 9])
const multicasted = connectable(source, {
  connector: () => new Subject(),
})
// const multicasted = source.pipe(multicast(subject))

multicasted.subscribe({
  next: (v) => console.log(`A: ${v}`),
})
multicasted.subscribe({
  next: (v) => console.log(`B: ${v}`),
})

// same as source.subscribe(subject)
multicasted.connect()

console.log('behavior subject =============================================')

const behaviorSubject = new BehaviorSubject(10)

behaviorSubject.subscribe({
  next: (v) => console.log(`A: ${v}`),
})

behaviorSubject.next(11)

console.log('replay subject =============================================')

const replaySubject = new ReplaySubject(3) // replay 3 ค่าสุดท้าย

replaySubject.subscribe({
  next: (v) => console.log(`first: ${v}`),
})

replaySubject.next(1)
replaySubject.next(2)
replaySubject.next(3)
replaySubject.next(4)

replaySubject.subscribe({
  next: (v) => console.log(`second: ${v}`),
})

replaySubject.next(5)

console.log('async subject =============================================')

/**
 * แสดงค่าสุดท้าย แต่จะทำงานเมื่อ complete เท่านั้น
 */

const asyncSubject = new AsyncSubject()

asyncSubject.subscribe({
  next: (v) => console.log(`first: ${v}`),
})

asyncSubject.next(1)
asyncSubject.next(2)
asyncSubject.next(3)
asyncSubject.next(4)

asyncSubject.subscribe({
  next: (v) => console.log(`second: ${v}`),
})

asyncSubject.next(5)
asyncSubject.complete()

console.log('void subject =============================================')

const voidSubject = new Subject<void>() // Shorthand for Subject<void>

voidSubject.subscribe({
  next: () => console.log('One second has passed'),
})

setTimeout(() => voidSubject.next(), 1000)
