import { NodePath } from '@babel/traverse';

import generateJSXFunction from './jsx-function';
import generateCalleeFunction from './normal-function';

export default (name: string, path: NodePath, data: RandomObject, options: SlimFastOpts) => {
  const calleeFunction = path.isJSXElement()
    ? (options.jsxReplacer || generateJSXFunction)(name, data)
    : (options.functionReplacer || generateCalleeFunction)(name, data);
  path.replaceWith(calleeFunction);
  return calleeFunction;
};
