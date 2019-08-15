
export class Timeout {
    constructor(fn, interval) {
        var id = setTimeout(fn, interval);
        this.cleared = false;
        this.clear = () => {
            this.cleared = true;
            clearTimeout(id);
        };
    }
}

/** getReducedArray - get array with removed elements of second array
 * array: []
 * toRemve: []
 * return: []
 */
export function getReducedArray(array, toRemve) {
    let reduced = [...array];
    for (let i = reduced.length - 1; i >= 0; i--) {
        for (let j = 0; j < toRemve.length; j++) {
            if (reduced[i] && (reduced[i].id === toRemve[j].id)) {
                reduced.splice(i, 1);
            }
        }
    }
    return reduced;
}

/** positionInArray - get indefx of element in array by specific property name
 * arr: [],
 * prop: number | string
 * name: string
 * return: position: number
 *  */ 
export function positionInArray (arr, prop, name) {
    
    if (arr.length > 0) {
        if (typeof arr[0] == 'object') {
            const index = name ? name : 'id';
            return arr.map(x => x[index]).indexOf(prop);
        }
        else {
            return arr.indexOf(prop);
        }
    }
    return -1;
}
