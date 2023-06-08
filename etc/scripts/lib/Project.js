const nodePath = require('path')

const { obj } = require('@almadash/shelf')
const { fsShelf } = require('@almadash/shelf-node')

// ================================================
class Project {
	constructor() {
		const paths = obj.incrementObj(
			() => ({
				rootDir: nodePath.resolve(`${__dirname}/../../..`),
			}),
			paths => ({
				srcDir: `${paths.rootDir}/src`,
				modulesDir: `${paths.rootDir}/c_modules`,
				buildDir: `${paths.rootDir}/build`,
			}),
			paths => ({
				tempDir: `${paths.modulesDir}/.temp`,
			}),
		)

		Object.assign(this, {
			paths,
		})
	}

	ensureDirs() {
		const { modulesDir, buildDir, tempDir } = this.paths

		fsShelf.ensureDir(modulesDir)
		fsShelf.ensureDir(buildDir)
		fsShelf.ensureDir(tempDir)
	}
}

// ================================================
const project = new Project()
module.exports = { project, Project }
