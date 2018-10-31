module.exports = {
	script: './scripts/vaultcar.sh',
	exec_interpreter: 'bash',
	args: process.env.NODE_ENV === 'development' ? [ 'babel-node', 'src/index.js' ] : [ 'node', 'build/index.js' ],
	name: 'jaffna.guide',
	watch: process.env.NODE_ENV === 'development' ? [ 'src' ] : false,
	env: {
		FACEBOOK_APP_ID: 'secret/soosap/jaffna-guide/FACEBOOK_APP_ID',
		FACEBOOK_APP_SECRET: 'secret/soosap/jaffna-guide/FACEBOOK_APP_SECRET',
		JAFFNA_GUIDE_MONGO_USER: 'secret/soosap/jaffna-guide/JAFFNA_GUIDE_MONGO_USER',
		JAFFNA_GUIDE_MONGO_PASSWORD: 'secret/soosap/jaffna-guide/JAFFNA_GUIDE_MONGO_PASSWORD',
		JWT_SECRET: 'secret/soosap/jaffna-guide/JWT_SECRET',
	},
};
