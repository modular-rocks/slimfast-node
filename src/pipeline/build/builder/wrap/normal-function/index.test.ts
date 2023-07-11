import traverse, { NodePath } from '@babel/traverse';
import { Codebase, FileContainer } from '@modular-rocks/workspace-node';
import generate from '.';
import parser from '../../../../../visitors/lib/parser';
import extractIdentifiers from '../../../../../visitors/lib/extract-identifiers';

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
        return "Hello World!";
      };
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      StringLiteral(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const data = {};
      extractIdentifiers(rootPath, data);
      const el = generate(rootPath, data);
      expect(file.astToCode(el)).toBe(`export default function() {
    return "Hello World!";
}`);
    }
  });
  test('', async () => {
    const code = `
      const name = 'Ronald Mcdonald';
      () => {
        return name + name;
      };
    `;

    let rootPath: NodePath | null = null;
    const ast = parser(code);

    traverse(ast, {
      BinaryExpression(path) {
        rootPath = path;
        path.stop();
      },
    });

    if (rootPath !== null) {
      const data = {};
      extractIdentifiers(rootPath, data);
      const el = generate(rootPath, data);
      expect(file.astToCode(el)).toBe(`export default function(name) {
    return name + name;
}`);
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
