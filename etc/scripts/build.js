#!/usr/bin/env node

const { CppBuild } = require('@almadash/builder')
const { logger: { simpleLogger: logger } } = require('@almadash/shelf')

const { project } = require('./lib')

// ================================================
class Operation {
	async run() {
		try {
			project.ensureDirs()

			const { srcDir, buildDir, modulesDir } = project.paths

			const buildOp = new CppBuild({ baseDir: srcDir })
			await buildOp.build({
				output: `${buildDir}/server`,
				includes: modulesDir,
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
