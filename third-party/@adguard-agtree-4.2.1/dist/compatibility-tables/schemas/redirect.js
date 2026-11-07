/*
 * AGTree v4.2.1 (build date: Wed, 12 Aug 2026 01:31:02 GMT)
 * (c) 2026 Adguard Software Ltd.
 * Released under the MIT license
 * https://github.com/AdguardTeam/tsurlfilter/tree/master/packages/agtree#readme
 */
import zod from 'zod';
import { zodToCamelCase } from '../utils/zod-camelcase.js';
import { baseCompatibilityDataSchema, booleanSchema, baseRefineLogic } from './base.js';
import { resourceTypeSchema } from './resource-type.js';

/**
 * @file Schema for redirect data.
 */
/**
 * Zod schema for redirect data.
 */
zodToCamelCase(baseCompatibilityDataSchema.extend({
    /**
     * Whether the redirect is blocking.
     */
    is_blocking: booleanSchema.default(false),
    /**
     * Resource type(s) belonging to the redirect.
     *
     * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-ResourceType}
     */
    resource_types: zod.array(resourceTypeSchema).default([]),
}).superRefine(baseRefineLogic));
