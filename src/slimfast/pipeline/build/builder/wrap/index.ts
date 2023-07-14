import { NodePath } from '@babel/traverse';

import generateJsxFunction from './jsx-function';
import generateNormalFunction from './normal-function';

export default (path: NodePath, data: RandomObject, options: SlimFastOpts) => {
  return path.isJSXElement()
    ? (options.jsxWrapper || generateJsxFunction)(path, data)
    : (options.functionWrapper || generateNormalFunction)(path, data);
};
