import traverse, { NodePath } from '@babel/traverse';
import { Codebase, FileContainer } from '@modular-rocks/workspace-node';
import generate from '.';
import parser from '../../../../../visitors/utils/parser';
import extractIdentifiers from '../../../../../visitors/utils/extract-identifiers';

const files: [string, string][] = [[`/path`, '']];
const opts: SlimFastOpts = {
  files,
  src: '/',
  extensions: [],
  ignoredFiles: [],
  ignoredImports: [],
  packageContents: {},
};
const codebase = new Codebase(opts);
const file = new FileContainer(`/path`, '', codebase);

describe('Generate JSX', () => {
  test('', async () => {
    const code = `
      () => {
        return (
          <div>
            <h1>Hello World!</h1>
          </div>
        )
      }
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      JSXElement(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const data = {};
      extractIdentifiers(rootPath, data);
      const el = generate('MyComponent', data);
      expect(file.astToCode(el)).toBe(`<MyComponent />`);
    }
  });
  test('', async () => {
    const code = `
      const name = 'Ronald Mcdonald';
      () => {
        return (
          <div>
            <h1>{name}!</h1>
          </div>
        )
      }
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      JSXElement(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const data = {};
      extractIdentifiers(rootPath, data);
      const el = generate('MyComponent', data);
      expect(file.astToCode(el)).toBe(`<MyComponent name={name} />`);
    }
  });
  // bug!
  //   test('', async () => {
  //     const code = `
  //       () => {
  //         return (
  //           <div>
  //             <h1>Hello {name}!</h1>
  //           </div>
  //         )
  //       }
  //     `;

  //     let rootPath: NodePath | null = null;
  //     const ast = parser(code);

  //     traverse(ast, {
  //       JSXElement(path) {
  //         rootPath = path;
  //         path.stop();
  //       },
  //     });

  //     if (rootPath !== null) {
  //       const data = {};
  //       extractIdentifiers(rootPath, data);
  //       const el = generate(rootPath, data);
  //       expect(file.astToCode(el)).toBe(`
  // export default function(props) {
  //     return (
  //         <div>
  //             <h1>Hello {name}!</h1>
  //         </div>
  //     )
  // };`);
  //     }
  //   });
});
