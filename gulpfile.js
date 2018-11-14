const gulp = require('gulp'); 
const path = require('path');
const shell = require('shelljs');
const argv = require('yargs').argv;

gulp.task('lint', () => {
  const args = argv.watch ? '--watch' : '';
  shell.exec(`${path.normalize('node_modules\\.bin\\eslint')} . --ext .js" ${args}`);
});

gulp.task('babel', () => {
  const args = `${argv.watch ? '--watch' : ''} ${argv.sourceMaps ? '--source-maps' : ''}`;
  shell.exec(`node ${path.normalize('node_modules/babel-cli/bin/babel.js')} src --out-dir ${path.normalize('lib/src')} ${args}`);
});

gulp.task('compile', () => {
  const args = `${argv.watch ? '--watch' : ''} ${argv.sourceMaps ? '--source-maps' : ''}`;
  shell.exec(`yarn babel ${args}`, { async : true });
});

gulp.task('test', () => {
  let command = path.normalize('node_modules/.bin/jest');
  if(argv.watch) command = command + ' --watchAll';

  if(argv.debug) command = `node --inspect-brk ${path.normalize('node_modules/jest/bin/jest.js')} --runInBand`;

  const result = shell.exec(command + ' --color=always');

  shell.exit(result.code);
});

