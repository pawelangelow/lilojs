'use strict';

/* global describe, it, beforeEach, afterEach, before */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const modulePath = require('../../utilities').getTestedModulePath(__filename);

beforeEach(function () {
	this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
	this.sandbox.restore();
});

describe('Utilities', function(){
	const testedModule = require(modulePath);

	describe('getFilesFromDir', function () {
		const fs = require('fs');

		it('should load all files in the current directory', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['file1.js', 'file2.js']);

			testedModule.getFilesFromDir('some dir', (file) => {
				expect(file).to.be.oneOf(['file1', 'file2']);
			});
		});

		it('should load all files in the current directory without index.js', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['file1.js', 'file2.js', 'index.js']);

			testedModule.getFilesFromDir('some dir', (file) => {
				expect(file).to.be.oneOf(['file1', 'file2']);
			});
		});

		it('should not load files in the current directory if only index.js is there', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['index.js']);
			const spy = this.sandbox.spy();

			testedModule.getFilesFromDir('some dir', spy);

			expect(spy.called).to.not.equal(true);
		});

		it('should load file from the current directory if not only index.js is there', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['index.js', 'somefile.js']);
			const spy = this.sandbox.spy();

			testedModule.getFilesFromDir('some dir', spy);

			expect(spy.called).to.equal(true);
		});

		it('should not modify file name if it does not have dot in it', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['somefilejs']);

			testedModule.getFilesFromDir('some dir', (file) => {
				expect(file).to.equal('somefilejs');
			});
		});

		it('should modify file name if it has dot in it', function() {
			this.sandbox.stub(fs, 'readdirSync').value(() => ['somefile.js']);

			testedModule.getFilesFromDir('some dir', (file) => {
				expect(file).to.be.equal('somefile');
			});
		});
	});

	describe('getTestedModulePath', function (){
		const path = require('path');

		before(function (){
			// This makes tests unified for win and unix platforms.
			this.sandbox.stub(path, 'sep').value('/');
		});

		it('should cut /tests/ from given path', function() {
			const result = testedModule.getTestedModulePath('parent-dir/dir/tests/somewhere/deep');
			expect(result).to.be.equal('parent-dir/dir/somewhere/deep');
		});

		it('should not cut invalid folder (/tests-invalid/) from given path', function() {

			const result = testedModule.getTestedModulePath('parent-dir/dir/tests-invalid/somewhere/deep');
			expect(result).to.be.equal('parent-dir/dir/tests-invalid/somewhere/deep');
		});

		it('should not cut invalid folder (/some-tests-dir/) from given path', function() {

			const result = testedModule.getTestedModulePath('parent-dir/dir/some-tests-dir/somewhere/deep');
			expect(result).to.be.equal('parent-dir/dir/some-tests-dir/somewhere/deep');
		});
	});
});
