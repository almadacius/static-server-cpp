#!/usr/bin/env node

const { CppBuild } = require('@almadash/builder')
const { logger: { simpleLogger: logger } } = require('@almadash/shelf')

const { project } = require('./lib')

// ================================================
class Operation {
	async run() {
		try {
			project.ensureDirs()

			const { rootDir, srcDir, buildDir, modulesDir } = project.paths

			const buildOp = new CppBuild({
				baseDir: rootDir,
				version: 20,
			})
			await buildOp.build({
				srcDir,
				output: `${buildDir}/server`,
				includes: modulesDir,
				// modulesDir: `${rootDir}/temp/local_modules`,
			})
		}
		catch (err) {
			logger.logError(err)
			process.exit(1)
		}
	}
}

// ================================================
const op = new Operation()
op.run()
