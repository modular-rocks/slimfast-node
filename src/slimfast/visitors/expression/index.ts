import Visitor from '../visitor';

import tooSmall from '../utils/contraints/too-small';
import identifiersNotInRange from '../utils/contraints/identifiers-not-within-range';
import hasReturnStatement from '../utils/contraints/has-return-statement';
import hasAssignmentExpression from '../utils/contraints/has-assignment-expression';
import hasVariableDeclarations from '../utils/contraints/contains-identifiers-in-other-scopes';
import hasVariableDeclarator from '../utils/contraints/has-variable-declarator';
import hasBlocklistedIdentifiers from '../utils/contraints/has-blocklisted-identifiers';
import shouldIgnore from '../utils/contraints/should-ignore';
import removesTooMuch from '../utils/contraints/removes-too-much';

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
