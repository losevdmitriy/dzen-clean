/*
 * AGTree v4.3.0 (build date: Wed, 14 Oct 2026 18:35:24 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
/**
 * @file Error messages for CSS token stream and balancer.
 */
const END_OF_INPUT = 'end of input';
const ERROR_MESSAGES = {
    EXPECTED_ANY_TOKEN_BUT_GOT: "Expected a token, but got '%s'",
    EXPECTED_TOKEN_BUT_GOT: "Expected '%s', but got '%s'",
    EXPECTED_TOKEN_WITH_BALANCE_BUT_GOT: "Expected '%s' with balance '%d', but got '%d'",
    EXPECTED_TOKEN_WITH_VALUE_BUT_GOT: "Expected '%s' with value '%s', but got '%s'",
};

export { END_OF_INPUT, ERROR_MESSAGES };
