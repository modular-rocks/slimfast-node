import { NodePath } from '@babel/traverse';

import Visitor from '../visitor';

import tooSmall from '../lib/contraints/too-small';
import identifiersNotInRange from '../lib/contraints/identifiers-not-within-range';
import hasReturnStatement from '../lib/contraints/has-return-statement';
import hasAssignmentExpression from '../lib/contraints/has-assignment-expression';
import hasVariableDeclarations from '../lib/contraints/contains-identifiers-in-other-scopes';
import hasVariableDeclarator from '../lib/contraints/has-variable-declarator';
import hasBlocklistedIdentifiers from '../lib/contraints/has-blocklisted-identifiers';
import shouldIgnore from '../lib/contraints/should-ignore';
import removesTooMuch from '../lib/contraints/removes-too-much';

export default class ExpressionVisitor extends Visitor {
  constraints(): Function[] {
    return [
      removesTooMuch(2),
      shouldIgnore,
      hasBlocklistedIdentifiers([]),
      identifiersNotInRange(2, 4),
      tooSmall(50, 1.5, true),
      hasReturnStatement,
      hasVariableDeclarator,
      hasVariableDeclarations,
      hasAssignmentExpression,
    ];
  }

  visit(): RandomObject {
    const test = this.test.bind(this);
    return {
      Expression(path: any) {
        let containsExpressions = false;
        path.traverse({
          Expression() {
            containsExpressions = true;
          },
        });
        if (!containsExpressions) {
          test(path);
        }
      },
    };
  }
}
