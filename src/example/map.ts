import { map, of } from 'rxjs'
// https://rxjs.dev/api/index/function/zip

const age = of(1, 2, 3)

const agePipe = age.pipe(map((age) => ({ age })))

agePipe.subscribe((x) => console.log(x))
