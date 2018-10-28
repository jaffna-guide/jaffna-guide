module.exports = {
  script: './scripts/vaultcar.sh',
  exec_interpreter: 'bash',
  args:
    process.env.NODE_ENV === 'production'
      ? ['node', 'build/index.js']
      : ['babel-node', 'src/index.js'],
  name: 'jaffna.guide',
  watch: process.env.NODE_ENV === 'production' ? false : ['./src/index.js'],
  // : ['./src/index.js', '../client/webpack.config.js'],
  env: {
    FACEBOOK_APP_ID: 'secret/soosap/jaffna-guide/FACEBOOK_APP_ID',
    FACEBOOK_APP_SECRET: 'secret/soosap/jaffna-guide/FACEBOOK_APP_SECRET',
  },
};
