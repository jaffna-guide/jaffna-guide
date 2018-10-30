import chalk from 'chalk';
import webpack from 'webpack';
import config from '../webpack.config';

console.log(
  chalk.magenta(
    '[webpack]: Generating bundle for production. This will take a moment...',
  ),
);

webpack(config('production')).run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();
  if (Array.isArray(jsonStats.errors) && jsonStats.errors.length) {
    jsonStats.errors.map(error =>
      console.log(chalk.red(`[webpack]: ${error}`)),
    );
    return 1;
  }

  if (jsonStats.warnings) {
    jsonStats.warnings.map(warning =>
      console.log(chalk.yellow(`[webpack]: ${warning}`)),
    );
  }

  console.log(`[webpack]: ${stats}`);
  console.log(chalk.green('[webpack]: Successfully compiled!'));

  console.log();
  console.log(
    `[webpack]: The ${chalk.cyan('dist')} dir is ready to be deployed.`,
  );
  console.log();

  return 0;
});
