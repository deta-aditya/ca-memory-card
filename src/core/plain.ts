export type Plain = string | number | boolean | null | Plain[] | { [x: string]: Plain }

export interface Plainable {
  plain(): Plain;
}

export const Plain = {
  isObject(plain: Plain): plain is { [x: string]: Plain } {
    return typeof plain === 'object' && plain !== null && !Array.isArray(plain)
  },

  hasKey(plainObject: { [x: string]: Plain }, key: string) {
    return (key in plainObject) 
  },

  isString(plain: Plain): plain is string {
    return typeof plain === 'string';
  },

  isOneOf<T>(plain: T, validValues: T[]) {
    return validValues.includes(plain);
  },

  isNumber(plain: Plain): plain is number {
    return typeof plain !== 'number'
  },

  isArray(plain: Plain): plain is Plain[] {
    return Array.isArray(plain);
  }
}