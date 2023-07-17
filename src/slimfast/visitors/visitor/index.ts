import traverse, { NodePath, Node } from '@babel/traverse';

import rejectParentsWithTypes from '../utils/reject-parents-with-types';
import notInExtracted from '../utils/not-in-extracted';

interface Data {
  [property: string]: any;
}

export default class Visitor {
  extracted: Map<NodePath, any>;

  ast: Node | undefined;

  opts: RandomObject;

  state: State;

  constructor(ast: Node | undefined, opts: RandomObject, state: State, extracted: Map<NodePath, any>) {
    this.ast = ast;
    this.extracted = extracted;
    this.state = state;
    this.opts = opts;
    this.traverse();
  }

  constraints(): Function[] {
    return [];
  }

  blocklistedParents(): string[] {
    return this.opts.blocklistedParents || ['ImportDeclaration', 'TypeParameterDeclaration'];
  }

  passesContraints(path: NodePath, data: RandomObject): Boolean {
    if (this.constraints().some((constraint: Function) => constraint(path, data, this.opts, this.ast))) {
      return false;
    }

    return true;
  }

  notEligible(path: NodePath): Boolean | null {
    const eligible =
      path.parentPath &&
      notInExtracted(path, this.extracted) &&
      rejectParentsWithTypes(path, this.blocklistedParents());
    return !eligible;
  }

  test(path: NodePath): void {
    if (this.notEligible(path)) return;

    let parent: NodePath | null = path;

    while (parent) {
      const data: Data = {};
      if (this.passesContraints(parent, data)) {
        this.extracted.set(parent, data);
        return;
      }
      parent = parent.parentPath;
    }
  }

  visit(): RandomObject {
    console.warn('Override this method, this is just an example');
    return {};
    // const test = this.test
    // return {
    //   Expression(path: NodePath) {
    //     test(path)
    //   }
    // }
  }

  traverse(): void {
    if (!this.ast) return;
    traverse(this.ast, this.visit());
  }

  extract() {
    return Array.from(this.extracted);
  }
}
