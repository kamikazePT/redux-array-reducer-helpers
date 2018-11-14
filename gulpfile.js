const gulp = require('gulp'); 
const shell = require('shelljs');
const argv = require('yargs').argv;

gulp.task('compile', () => {
  const args = `${argv.watch ? '--watch' : ''} ${argv.sourceMaps ? '--source-maps' : ''}`;
  shell.exec(`yarn babel ${args}`, { async : true });
});

gulp.task('test', () => {
  let command = 'node_modules\\.bin\\jest';
  if(argv.watch) command = command + ' --watchAll';

  if(argv.debug) command = 'node --inspect-brk node_modules\\jest\\bin\\jest.js --runInBand';

  const result = shell.exec(command + ' --color=always');

  shell.exit(result.code);
});

