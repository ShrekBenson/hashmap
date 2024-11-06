import HashNode from "./node.mjs";

export default class HashMap {

  #buckets
  #loadFactor = .75;
  #vacancy = 0;

  constructor() {
    this.#buckets = new Array(16);
  }

  #hash(key) {
    let hashCode = 0;

    for (let i = 0; i < key.length; i ++) {
      hashCode = 31 * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.#buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const keyHash = this.#hash(key);
    let bucket = this.#buckets[keyHash];    

    if (bucket) {
      while (bucket) {
        if (bucket.key === key) {
          bucket.value = value;
          return;
        } 
        if (bucket.next === null) {
          const newPair = new HashNode(key, value);
          bucket.next = newPair;
          return;
        }
        bucket = bucket.next;
      }      
    } else {
      this.#buckets[keyHash] = new HashNode(key, value);
      this.#vacancy ++;
      console.log(this.#vacancy);

      if (this.#vacancy >= this.#buckets.length * this.#loadFactor) {
       let moreBuckets = new Array(this.#buckets.length * 2);
       moreBuckets = [...this.#buckets];
       this.#buckets = moreBuckets;
       console.log(this.#buckets.length);
      }
    }    
  }

  get(key) {
    const keyHash = this.#hash(key);
    let bucket = this.#buckets[keyHash];
    
    while (bucket) {
      if (bucket.key === key) {
        return bucket.value;
      }
      bucket = bucket.next;
    }
    return 'Key not found';
  }

  has(key) {
    const keyHash = this.#hash(key);
    let bucket = this.#buckets[keyHash];    

    while (bucket) {
      if (bucket.key === key) {
        return true;
      }
      bucket = bucket.next;
    }
    return false;
  }

  remove(key) {
    const keyHash = this.#hash(key);
    let bucket = this.#buckets[keyHash];
    let count = 1;

    while (bucket) {
      if (bucket.key === key && count === 1 && bucket.next) {
        this.#buckets[keyHash] = bucket.next;        
        return true;
      }
      if (bucket.key === key && count === 1) {
        this.#buckets[keyHash] = undefined;
        return true;
      }
      if (bucket.next.key === key) {
        bucket.next = bucket.next.next;
        bucket.next.next = null;
        return true;
      }

      bucket = bucket.next;
      count ++;
    }

    return false;
  }

  length() {
    let count = 0;

    for (let value of this.#buckets) {
      let current = value;
      while (current) {
        count ++;
        current = current.next;
      }
    }
    return count;
  }

  clear() {    
    for (let value of this.#buckets) {
      if (value) value = undefined;
    }
  }

  keys() {
    const keys = [];

    for (let value of this.#buckets) {
      let current = value;
      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    }
    return keys;
  }

  values() {
    const values = [];

    for (let value of this.#buckets) {
      let current = value;
      while (current) {
        values.push(current.value);
        current = current.next;
      }
    }
    return values;
  }

  entries() {
    const pairs = [];    

    for (let value of this.#buckets) {
      let current = value;
      while (current) {
        const pair = new Array(2);
        pair[0] = current.key;
        pair[1] = current.value;
        pairs.push(pair);
        current = current.next;
      }
    }
    return pairs;
  }

  get buckets() {
    return this.#buckets;
  }

}