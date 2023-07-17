import { NodePath, Node } from '@babel/traverse';

function isInsidePath(innerPath: NodePath, outerPath: NodePath | RandomObject): boolean {
  let currentPath: NodePath | null = innerPath;

  while (currentPath !== null) {
    if (currentPath === outerPath) {
      return true;
    }
    currentPath = currentPath.parentPath;
  }

  return false;
}

const isUsedInPath = (
  name: string,
  type: string,
  variablePath: NodePath | RandomObject,
  path: NodePath | RandomObject
): boolean => {
  if (type === 'Identifier') {
    const binding = variablePath.scope.getBinding(name);
    if (binding) {
      return binding.referencePaths.filter((ref: NodePath) => !isInsidePath(ref, path))[0];
    }
  }
  return false;
};

export default (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  let usedInOtherScopes = false;

  if (path.isAssignmentExpression()) {
    // most likely used in other scopes
    usedInOtherScopes = true;
  }

  path.traverse({
    AssignmentExpression(variablePath: NodePath | RandomObject) {
      const { left } = variablePath.node;

      if (isUsedInPath(left.name, left.type, variablePath, path)) {
        usedInOtherScopes = true;
      }

      if (left.type === 'ObjectPattern') {
        left.properties.forEach((property: any) => {
          if (isUsedInPath(property.value.name, property.value.type, variablePath, path)) {
            usedInOtherScopes = true;
          }
        });
      }
    },
  });

  return usedInOtherScopes;
};
