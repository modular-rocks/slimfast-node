import unique from 'array-unique';
import { identifier, callExpression } from '@babel/types';

export default (name: string, data: RandomObject) => {
  const toInject = unique(data.toInject);
  const calleeFunction = identifier(name);
  const args = toInject.map((x: RandomObject) => identifier(x.identifier.name));
  return callExpression(calleeFunction, args);
};
