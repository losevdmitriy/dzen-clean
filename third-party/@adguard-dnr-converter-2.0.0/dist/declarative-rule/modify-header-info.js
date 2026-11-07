import * as v from 'valibot';
import { strictObjectByType } from '../utils/valibot.js';

/**
 * Enum that represents the possible operations for a header modification.
 *
 * @see {@link https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#type-HeaderOperation}
 *
 * @since Chrome 86
 */ var HeaderOperation = /*#__PURE__*/ function(HeaderOperation) {
    /**
     * Adds a new entry for the specified header.
     * This operation is not supported for request headers.
     */ HeaderOperation["Append"] = "append";
    /**
     * Sets a new value for the specified header, removing any existing headers with the same name.
     */ HeaderOperation["Set"] = "set";
    /**
     * Removes all entries for the specified header.
     */ HeaderOperation["Remove"] = "remove";
    return HeaderOperation;
}({});
/**
 * Validator for {@link ModifyHeaderInfo}.
 */ const ModifyHeaderInfoValidator = strictObjectByType({
    header: v.string(),
    operation: v.enum(HeaderOperation),
    value: v.optional(v.string())
});

export { HeaderOperation, ModifyHeaderInfoValidator };
