'use strict';

/* global describe, it, beforeEach, afterEach */
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const modulePath = require('../../utilities').getTestedModulePath(__filename);

const fs = require('fs');

beforeEach(function () {
	this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
	this.sandbox.restore();
});

describe('Utilities', function(){
	const testedModule = require(modulePath);

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
});
