'use strict';

// This is the main module of the plugin where you define
// add, remove, move method to manage elements.

const path = require('path');
const _ = require('lodash');

module.exports = function(rekitCore) {
  const utils = rekitCore.utils;
  const refactor = rekitCore.refactor;
  const vio = rekitCore.vio;
  const template = rekitCore.template;

  function add(feature, name) {
    // ensure the folder
    const prjRoot = utils.getProjectRoot();
    const selectorsDir = utils.mapFeatureFile(feature, 'selectors');
    if (vio.dirNotExists(selectorsDir)) vio.mkdir(selectorsDir);

    let targetPath;
    // Create the selector file
    targetPath = utils.mapFeatureFile(feature, `selectors/${_.camelCase(name)}.js`);
    template.generate(targetPath, {
      templateFile: path.join(__dirname, 'templates/selector.js'),
      context: { feature, name },
    });

    // Create the selector test file
    targetPath = utils.mapTestFile(feature, `selectors/${_.camelCase(name)}.test.js`);
    template.generate(targetPath, {
      templateFile: path.join(__dirname, 'templates/selector.test.js'),
      context: { feature, name },
    });
  }

  function remove(feature, name) {
    let targetPath;
    // Delete the selector file
    targetPath = utils.mapFeatureFile(feature, `selectors/${_.camelCase(name)}.js`);
    vio.del(targetPath);

    // Delete the selector test file
    targetPath = utils.mapTestFile(feature, `selectors/${_.camelCase(name)}.test.js`);
    vio.del(targetPath);
  }

  function move(source, target) {
    let oldPath;
    let newPath;
    // Move the selector file
    oldPath = utils.mapFeatureFile(source.feature, `selectors/${_.camelCase(source.name)}.js`);
    newPath = utils.mapFeatureFile(target.feature, `selectors/${_.camelCase(target.name)}.js`);
    vio.move(oldPath, newPath);

    // Move the selector test file
    oldPath = utils.mapTestFile(source.feature, `selectors/${_.camelCase(source.name)}.test.js`);
    newPath = utils.mapTestFile(target.feature, `selectors/${_.camelCase(target.name)}.test.js`);
    vio.move(oldPath, newPath);
  }
  return {
    add,
    remove,
    move,
  };
}
