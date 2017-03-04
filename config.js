'use strict';

module.exports = {
  accept: ['reselect'],
  defineArgs(addCmd, mvCmd, rmCmd) {
    // Rekit uses argparse for command line args parsing: https://www.npmjs.com/package/argparse
    // Since your plugin uses below commands, defineArgs method allows to define args to the command.
    //   addCmd: rekit add reselect <feature>/<name> [-args]
    //   mvCmd: rekit mv reselect <feature>/<name> [-args]
    //   rmCmd: rekit rm reselect <feature>/<name> [-args]
    // Example  Add "--arg" to the command:
    //   addCmd.addArgument(['--arg'], {
    //     help: 'Description of arg.',
    //   });
    // Then you can use below command to pass the arg:
    //   rekit add reselect home/myElementName --arg argValue
    // Then you can use the arg in reselect.js
  },
};
