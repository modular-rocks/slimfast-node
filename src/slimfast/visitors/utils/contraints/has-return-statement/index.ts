import { NodePath, Node } from '@babel/traverse';
import isAFunction from '../is-a-function';

export default (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  let problematic = false;

  if (path.isReturnStatement()) {
    problematic = true;
  }

  path.traverse({
    ReturnStatement(innerPath: NodePath) {
      let parent: NodePath | null = innerPath;
      let isWrapped = false;
      while (!isWrapped && parent) {
        if (isAFunction(path, data, opts, ast)) {
          isWrapped = true;
        }
        parent = parent === path ? null : parent.parentPath;
      }
      if (!problematic && !isWrapped) {
        problematic = true;
      }
    },
  });
  return problematic;
};
