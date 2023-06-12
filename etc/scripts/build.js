#!/usr/bin/env node

const { CppBuild, CppBuild2 } = require('@almadash/builder')
const {
	errorHandler: { NodeErrorHandler },
} = require('@almadash/shelf')

const { project } = require('./lib')

// ================================================
class Operation {
	async buildProjectLegacy() {
		const { cppVersion } = project
		const { srcDir, rootDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild({
			baseDir: rootDir,
			// baseDir: srcDir,
			version: cppVersion,
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
	getBaseConfig() {
		const { cppVersion } = project
		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		return {
			version: cppVersion,
			entrypoint: `${srcDir}/main.cpp`,
			output: `${buildDir}/server`,

			baseDir: rootDir,
			srcDir,
			headerDir: srcDir,
			includes: [
				modulesDir,
			],
		}
	}

	// ================================================
	async buildServer() {
		const { cppVersion } = project
		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild2({
			version: cppVersion,
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

	// ================================================
	async buildTestStr() {
		const { cppVersion } = project
		const { rootDir, srcDir, buildDir, modulesDir } = project.paths

		const buildOp = new CppBuild2({
			version: cppVersion,
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

	async buildTestFs() {
		const { srcDir } = project.paths

		const config = this.getBaseConfig()

		const buildOp = new CppBuild2({
			...config,
			entrypoint: `${srcDir}/testFs.cpp`,
		})
		await buildOp.build()
	}

	// ================================================
	async run() {
		const errorHandler = new NodeErrorHandler({ rootDir: `${__dirname}/..` })
		errorHandler.register()

		project.ensureDirs()

		const useTest = true

		if (useTest) {
			// await this.buildProjectLegacy()
			// await this.buildTestStr()
			await this.buildTestFs()
		}
		else {
			await this.buildServer()
		}

		process.exit(0)
	}
}

// ================================================
const op = new Operation()
op.run()
