import unique from 'array-unique';
import {
  jsxIdentifier,
  jsxOpeningElement,
  jsxElement,
  jsxAttribute,
  jsxExpressionContainer,
  identifier,
  jsxClosingElement,
} from '@babel/types';

export default (name: string, data: RandomObject) => {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  const toInject = unique(data.toInject);
  const props = toInject.map((x: RandomObject) =>
    jsxAttribute(
      jsxIdentifier(x.identifier.name),
      jsxExpressionContainer(identifier(x.identifier.name)) // Use identifier instead of jsxIdentifier
    )
  );

  const jsxId = jsxIdentifier(name);
  const openingElement = jsxOpeningElement(jsxId, props, true);
  const closingElement = jsxClosingElement(jsxId);
  return jsxElement(openingElement, null, [], true);
};
