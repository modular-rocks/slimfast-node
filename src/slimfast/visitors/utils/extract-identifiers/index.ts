import unique from 'array-unique';
import { NodePath, Node, Binding } from '@babel/traverse';

const importTypes = ['ImportDefaultSpecifier', 'ImportSpecifier'];
const isImportStatement = (x: Binding) => importTypes.includes(x.path.type) || x.kind === 'module';

const variableTypes = ['VariableDeclarator'];
const isVariableDeclaration = (x: Binding) => variableTypes.includes(x.path.type) || x.kind === 'param';

const buildBinding = (name: string, binding: Binding): Binding => {
  // need to only return binding
  return binding;
  // return {
  //   name,
  //   kind: binding.kind,
  //   identifier: binding.identifier,
  //   parentType: binding.path.type,
  //   parentPath: binding.path,
  // }
};

export default (path: NodePath, data: RandomObject, opts?: RandomObject, ast?: Node) => {
  const identifiers: Binding[] = [];

  path.traverse({
    Identifier(innerPath: RandomObject) {
      const binding: Binding = innerPath.scope.getBinding(innerPath.node.name);
      if (binding) {
        identifiers.push(binding);
      }
      // binding && identifiers.push(buildBinding(path.node.name, binding))
    },
  });

  const toImport: Binding[] = identifiers.filter(isImportStatement);
  const toInject: Binding[] = identifiers.filter(isVariableDeclaration);

  data.toImport = unique(toImport);
  data.toInject = unique(toInject);

  return null;
};
