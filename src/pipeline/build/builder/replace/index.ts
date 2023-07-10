import unique from 'array-unique';
import { NodePath, Node } from '@babel/traverse';
import { callExpression, identifier } from '@babel/types';

const generateCalleeFunction = (name: string, data: RandomObject) => {
  const toInject = unique(data.toInject);
  const calleeFunction = identifier(name);
  const args = toInject.map((x: RandomObject) => identifier(x.identifier.name));
  return callExpression(calleeFunction, args);
};

export default (name: string, path: NodePath, data: RandomObject) => {
  // if (!data.replaceCode) {
  //   return false
  // }
  const calleeFunction = generateCalleeFunction(name, data);
  path.replaceWith(calleeFunction);
};
