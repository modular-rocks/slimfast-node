import { NodePath } from '@babel/traverse';

const testJSX = (path: NodePath) => {
  let hasJSX = false;

  path.traverse({
    JSXElement() {
      hasJSX = true;
    },
  });

  return hasJSX;
};

export default function (num: number) {
  let lastNumber = num;
  return function (path: NodePath, data: RandomObject) {
    lastNumber += 1;
    const containsJSX = testJSX(path);
    const noun = containsJSX ? 'component' : 'function';
    const folder = containsJSX ? 'components' : 'functions';
    const name = `${noun}${lastNumber}`;
    data.name = name;
    data.folder = folder;
    return {
      name,
      folder,
    };
  };
}
