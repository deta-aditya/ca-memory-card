export type OutputPort<T> = (response: T) => void

export type InputPort<T, U> = (request: T, next: OutputPort<U>) => void;
