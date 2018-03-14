/**
 * Represents a tuple with generic types.
 * For more info see https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#3.3.3
 *
 * Usage example: var x: IKeyValuePair<number, string> = [10, "ten"];
 */
export interface IKeyValuePair<K, V> extends Array<K | V> {
    0: K;
    1: V;
}
