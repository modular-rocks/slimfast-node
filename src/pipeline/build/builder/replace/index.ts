import { NodePath } from '@babel/traverse';

import generateJSXFunction from './jsx-function';
import generateCalleeFunction from './normal-function';

export default (name: string, path: NodePath, data: RandomObject) => {
  const calleeFunction = path.isJSXElement() ? generateJSXFunction(name, data) : generateCalleeFunction(name, data);
  path.replaceWith(calleeFunction);
};
