'use strict';

// This is the main module of the plugin where you define
// add, remove, move method to manage elements.

// rekitCore is the one that dependent by the project using the plugin.
// You may need it to perform common tasks such as use refactor to rename variables in a module.
const path = require('path');
const _ = require('lodash');
const rekitCore = require('rekit-core');
const utils = rekitCore.utils;
const refactor = rekitCore.refactor;
const vio = rekitCore.vio;
const template = rekitCore.template;

function add(feature, name) {
  // ensure the folder
  const prjRoot = utils.getProjectRoot();
  const selectorsDir = utils.mapFeatureFile(feature, 'selectors');
  if (vio.dirNotExists(selectorsDir)) vio.mkdir(selectorsDir);

  const targetPath = utils.mapFeatureFile(feature, `selectors/${_.camelCase(name)}.js`);
  template.generate(targetPath, {
    templateFile: path.join(__dirname, 'templates/selector.js'),
    context: { feature, name },
  });
  console.log('adding done.', targetPath);
}

function remove(feature, name) {
  console.log('Removing reselect.');
}

function move(source, target) {
  console.log('Moving reselect.');
}

function install() {
  // Called when using 'rekit install plugin-name' to install the plugin.
  // Should check repeated installation.
  console.log('Installing reselect');
}
function uninstall() {
  // Called when using 'rekit uninstall plugin-name' to install the plugin.
  // Should check repeated uninstallation.
  console.log('Uninstalling reselect');
}

module.exports = {
  install,
  uninstall,
  add,
  remove,
  move,
};
