import { of, switchMap } from 'rxjs'

/**
 * ลูปค่า param จาก array
 */

const switched = of(1, 2, 3).pipe(switchMap((x) => of(x, x * 2, 2)))
switched.subscribe((x) => console.log(x))
