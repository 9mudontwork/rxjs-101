import { Subject } from 'rxjs'

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

  public emit<T>(topic: string, value: T) {
    this.subjects.next({ topic, value })
  }

  public subscribe<T>(topic: string, callback: (value: T) => void) {
    this.subjects.subscribe({
      next: callback,
      error: (err) => {
        console.log({ [topic]: err })
      },
    })
  }
}

type CustomT = string | Record<string, string>

class A {
  emit(topic: string, value: CustomT) {
    BoardcastSubject.getInstance().emit<CustomT>(topic, value)
  }
}

class B {
  subscribe(topic: string) {
    BoardcastSubject.getInstance().subscribe<CustomT>(topic, (value) => {
      console.log(value)
    })
  }
}

;(() => {
  const a = new A()
  const b = new B()
  b.subscribe('topic')
  b.subscribe('topic')

  a.emit('topic', 'aasdasd')
  a.emit('topic', { a: '123' })
})()

export {}
