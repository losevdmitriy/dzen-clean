import { RuleParser, defaultParserOptions } from "@adguard/agtree/parser";

import { RuleGenerator } from "@adguard/agtree/generator";

var getRuleNode = function getRuleNode(rule) {
  return typeof rule === "string" ? RuleParser.parse(rule, Object.assign({}, defaultParserOptions, {
    includeRaws: false,
    isLocIncluded: false
  })) : rule;
};

var getRuleText = function getRuleText(rule) {
  return typeof rule === "string" ? rule : RuleGenerator.generate(rule);
};

export { getRuleText as a, getRuleNode as g };
