#!/usr/bin/env node

const { CppBuild } = require('@almadash/builder')

const { project } = require('./lib')

// ================================================
class Operation {
	async run() {
		project.ensureDirs()

		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild({ baseDir: rootDir })
		await buildOp.build({
			entrypoint: `${srcDir}/server.cpp`,
			output: `${buildDir}/server`,
			includes: `${modulesDir}`,
		})
	}
}

// ================================================
const op = new Operation()
op.run()
