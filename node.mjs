export default class HashNode {
  #key = null;
  #value = null;
  #next;

  constructor(key, value) {
    this.#key = key;
    this.#value = value;
    this.#next = null
  }

  get key() {
    return this.#key;
  }

  get value() {
    return this.#value;
  }

  get next() {
    return this.#next;
  }

  set key(val) {
    this.#key = val;
  }

  set value(val) {
    this.#value = val;
  }

  set next(node) {
    this.#next = node;
  }

}