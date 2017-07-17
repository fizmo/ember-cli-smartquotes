/* eslint-env node */
'use strict';

const smartquotes = require('smartquotes');

class SmartquotesPlugin {
  constructor() {
    this.syntax = null; // set by HTMLBars
  }

  transform(ast) {
    const walker = new this.syntax.Walker();
    walker.visit(ast, (node) => {
      if (node.type === 'TextNode') {
      node.chars = smartquotes(node.chars);
    }
  });
    return ast;
  }
}

module.exports = {
  name: 'ember-cli-smartquotes',

  setupPreprocessorRegistry(type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'smartquotes',
      plugin: SmartquotesPlugin,
      baseDir: function() {
        return __dirname;
      }
    })
  },
};
