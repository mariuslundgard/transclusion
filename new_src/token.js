(function (exports) {
  exports.structure || (exports.structure = {});
  exports.structure.Token = {
    EOF: 'EOF',
    CHAR: 'CHAR',
    DOCTYPE: 'DOCTYPE',
    COMMENT: 'COMMENT',
    START_TAG: 'START_TAG',
    START_TAG_CLOSE: 'START_TAG_CLOSE',
    START_TAG_NAME: 'START_TAG_NAME',
    END_TAG: 'END_TAG',
    ATTR_KEY: 'ATTR_KEY',
    START_ATTR_VALUE: 'START_ATTR_VALUE',
    END_ATTR_VALUE: 'END_ATTR_VALUE',
    COMMENT: 'COMMENT',
    EXPR_OPEN: 'EXPR_OPEN',
    VARIABLE: 'VARIABLE',
    FUNC: 'FUNC',
    END_FUNC: 'END_FUNC',
    DOT: 'DOT',
    STR: 'STR',
    NUM: 'NUM',
    EXPR_CLOSE: 'EXPR_CLOSE',
    OPERATOR: 'OPERATOR',
    META: 'META',
    END_META: 'END_META',
    START_ARR: 'START_ARR',
    END_ARR: 'END_ARR',
    START_OBJ: 'START_OBJ',
    END_OBJ: 'END_OBJ'
  };
})(this);
