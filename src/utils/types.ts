export type Not<T> = {[key in keyof T ]?: never};
export type XOR<A, B> = (A & Not<B>) | (Not<A> & B);