
export function Set() {
  let set = {}
  for (let i = 0; i < arguments.length; i++) {
    set[arguments[i]] = 1
  }
  return set
}


/* Efficient shallow comparison of two objects */

export function shallowEqual(objA, objB) {
  if (objA === objB) return true

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return

  // Test for A's keys different from B's.
  for (var i = 0; i < keysA.length; i++) {
    const valA = objA[keysA[i]]
    const valB = objB[keysA[i]]

    if (valA !== valB) {
      if (valA && valA.type === 'partiallyAppliedMessage') {
        // A partially applied message will always have a new reference,
        // so compare the references of the payloads instead.
        // It is assumed Messages are stable for a given key.
        if (valA.payload !== valB.payload) return false
      }
      else return false
    }
  }

  return true
}