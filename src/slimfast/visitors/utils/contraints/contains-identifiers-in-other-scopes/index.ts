import { NodePath, Node } from '@babel/traverse';

function isInsidePath(innerPath: NodePath, outerPath: NodePath): boolean {
  let currentPath: NodePath | null = innerPath;

  while (currentPath !== null) {
    if (currentPath === outerPath) {
      return true;
    }
    currentPath = currentPath.parentPath;
  }

  return false;
}

export default (path: NodePath, data: RandomObject, opts: RandomObject, ast: Node) => {
  let usedInOtherScopes = false;

  if (path.isVariableDeclaration()) {
    // most likely used in other scopes
    usedInOtherScopes = true;
  }

  path.traverse({
    VariableDeclaration(variableDeclarationPath: NodePath | RandomObject) {
      variableDeclarationPath.node.declarations.forEach((declarator: any) => {
        const binding = variableDeclarationPath.scope.getBinding(declarator.id.name);
        if (binding && binding.referencePaths.filter((ref: NodePath) => !isInsidePath(ref, path))[0]) {
          usedInOtherScopes = true;
        }
      });
    },
  });

  return usedInOtherScopes;
};
