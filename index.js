const recast = require("recast");
const babylon = require("babylon");
const Printer = require("./src/printer").Printer;
const flowParser = require("flow-parser");

var babylonOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: false,
  plugins: [
    'asyncFunctions',
    'asyncGenerators',
    'classConstructorCall',
    'classProperties',
    'decorators',
    'doExpressions',
    'exponentiationOperator',
    'exportExtensions',
    'flow',
    'functionSent',
    'functionBind',
    'jsx',
    'objectRestSpread',
    'trailingFunctionCommas'
  ]
};

module.exports = {
  format: function(text, opts={}) {
    let { tabWidth = 2, printWidth = 80 } = opts;

    // const ast = recast.parse(text, {
    //   parser: {
    //     parse: function(source) {
    //       return babylon.parse(source, babylonOptions);
    //     }
    //   }
    // });
    const ast = flowParser.parse(text);

    const printer = new Printer({ tabWidth, wrapColumn: printWidth });
    return printer.printGenerically(ast).code;
  }
};
