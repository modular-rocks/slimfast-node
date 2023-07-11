import { NodePath } from '@babel/traverse';

import generateJsxFunction from './jsx-function';
import generateNormalFunction from './normal-function';

export default (path: NodePath, data: RandomObject) => {
  return path.isJSXElement() ? generateJsxFunction(path, data) : generateNormalFunction(path, data);
};
