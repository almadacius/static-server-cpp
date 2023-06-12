#!/usr/bin/env node

const { CppBuild, CppBuild2 } = require('@almadash/builder')
const {
	errorHandler: { NodeErrorHandler },
} = require('@almadash/shelf')

const { project } = require('./lib')

// ================================================
class Operation {
	async buildProjectLegacy() {
		const { srcDir, rootDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild({
			baseDir: rootDir,
			// baseDir: srcDir,
			version: 11,
			srcDir,
			output: `${buildDir}/server`,
			includes: [
				srcDir,
				modulesDir,
			],
			// modulesDir: `${rootDir}/temp/local_modules`,
		})
		await buildOp.build()
	}

	// ================================================
	async buildServer() {
		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild2({
			version: 11,
			entrypoint: `${srcDir}/main.cpp`,
			output: `${buildDir}/server`,

			baseDir: rootDir,
			srcDir,
			headerDir: srcDir,
			includes: [
				modulesDir,
			],
		})
		await buildOp.build()
	}

	async buildTestStr() {
		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild2({
			version: 11,
			entrypoint: `${srcDir}/testStr.cpp`,
			output: `${buildDir}/server`,

			baseDir: rootDir,
			srcDir,
			headerDir: srcDir,
			includes: [
				modulesDir,
			],
		})
		await buildOp.build()
	}

	// ================================================
	async run() {
		const errorHandler = new NodeErrorHandler({ rootDir: `${__dirname}/..` })
		errorHandler.register()

		project.ensureDirs()

		// await this.buildProjectLegacy()
		// await this.buildTestStr()
		await this.buildServer()

		process.exit(0)
	}
}

// ================================================
const op = new Operation()
op.run()
