import { strictObject, getDotPath } from 'valibot';

/**
 * Creates a strict object schema by validating the entries against the expected type.
 *
 * @template TExpected The expected type for the object schema.
 * @template TEntries The entries of the object schema.
 *
 * @see {@link strictObject}
 *
 * @param entries The entries schema.
 *
 * @returns A strict object schema.
 *
 * @example
 * ```ts
 * // Valid case
 * interface ValidExample {
 *     foo: string;
 * }
 *
 * const ValidExampleValidator = strictObjectByType<ValidExample>({
 *     foo: v.string(),
 * });
 *
 * // Invalid case
 * interface InvalidExample {
 *     foo: string;
 *     bar: number;
 * }
 *
 * const InvalidExampleValidator = strictObjectByType<InvalidExample>({
 *     foo: v.string(),
 *     baz: v.boolean(), // Error: Does not match the expected type
 *     // Error: Property 'bar' is missing
 * });
 * ```
 */ function strictObjectByType(entries) {
    return strictObject(entries);
}
/**
 * Recursively extracts message from Valibot issue.
 *
 * @param issue Valibot's {@link BaseIssue}.
 * @param nesting Nesting level prefix (e.g. `'1'`, `'1.1'`).
 *
 * @returns Message extracted from the issue and its sub-issues.
 */ function extractMessageFromValiIssue(issue, nesting) {
    const type = `Type: "${issue.type}"`;
    const message = `Message: "${issue.message}"`;
    const path = `Path: "${getDotPath(issue)}"`;
    const messages = [
        `${nesting}. ${type} | ${message} | ${path}`
    ];
    if (issue.issues && issue.issues.length > 0) {
        const nestedMessages = issue.issues.map((subIssue, i)=>extractMessageFromValiIssue(subIssue, `${nesting}.${i + 1}`));
        messages.push(...nestedMessages);
    }
    return messages.join('\n');
}
/**
 * Extracts message from Valibot error.
 *
 * @param error Valibot's {@link ValiError}.
 *
 * @returns Message extracted from the error issues and its sub-issues.
 */ function extractMessageFromValiError(error) {
    if (error.issues.length === 0) {
        return error.message;
    }
    return error.issues.map((issue, i)=>extractMessageFromValiIssue(issue, `${i + 1}`)).join('\n');
}

export { extractMessageFromValiError, strictObjectByType };
