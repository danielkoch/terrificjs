describe('Sandbox', function () {
	'use strict';

    it('should be instance of T.Sandbox', function () {
        var sandbox = new T.Sandbox();
        expect(sandbox instanceof T.Sandbox ).toBeTruthy();
    });

    it('getConfig should return the config object', function () {
        var initialConfig = { foo : 'bar', bar : 'foo', namespace: 'App.Components' };
        var sandbox = new T.Application(null, initialConfig)._sandbox;

        var config = sandbox.getConfig();
        expect(config).toBeDefined();
        expect(config).toEqual(initialConfig);
    });

    it('getConfigParam should return the appropriate config param', function () {
        var initialConfig = { foo : 'bar', bar : 'foo' };
        var sandbox = new T.Application(null, initialConfig)._sandbox;

        var foo = sandbox.getConfigParam('foo');
        expect(foo).toEqual(initialConfig.foo);

        var bar = sandbox.getConfigParam('bar');
        expect(bar).toEqual(initialConfig.bar);
    });

	it('getConfigParam("namespace") should return a default namespace', function () {
		var sandbox = new T.Application(null)._sandbox;

		var namespace = sandbox.getConfigParam('namespace');
		expect(namespace).toEqual(T.Module);
	});

	describe('.addModules(ctx)', function() {
        beforeEach(function () {
            this.application = jasmine.createSpyObj('application', ['registerModules', 'start']);
            this.sandbox = new T.Sandbox(this.application, {});
        });

        it('should delegate to the application when called with a Node', function () {
            this.sandbox.addModules(document.createElement('div'));

            expect(this.application.registerModules).toHaveBeenCalled();
            expect(this.application.start).toHaveBeenCalled();
        });

        it('should not delegate to the application when called with anything others than a Node', function () {
            this.sandbox.addModules({});
            this.sandbox.addModules('String');
            this.sandbox.addModules(1);

            expect(this.application.registerModules).not.toHaveBeenCalled();
            expect(this.application.registerModules).not.toHaveBeenCalledWith(this.ctx);
            expect(this.application.start).not.toHaveBeenCalled();
        });
    });

    describe('.removeModules(modules)', function() {
        beforeEach(function () {
            this.application = jasmine.createSpyObj('application', ['unregisterModules', 'stop']);
            this.sandbox = new T.Sandbox(this.application, {});
            this.ctx = document.createElement('div');
        });

        it('should delegate to the application when called with a Node', function () {
            this.sandbox.removeModules(this.ctx);

            expect(this.application.unregisterModules).toHaveBeenCalled();
            expect(this.application.stop).toHaveBeenCalled();
        });

        it('should delegate to the application when called with a module collection', function () {
            this.sandbox.removeModules({1 : true});

            expect(this.application.unregisterModules).toHaveBeenCalled();
            expect(this.application.stop).toHaveBeenCalled();
        });

        it('should not delegate to the application when called with anything else', function () {
			this.sandbox.removeModules([]);
			this.sandbox.removeModules('String');
            this.sandbox.removeModules(1);

            expect(this.application.unregisterModules).not.toHaveBeenCalled();
            expect(this.application.stop).not.toHaveBeenCalled();
        });
    });

    describe('.getModuleById(id)', function() {
        beforeEach(function () {
            this.application = jasmine.createSpyObj('application', ['getModuleById']);
            this.sandbox = new T.Sandbox(this.application, {});
        });

        it('should delegate to the application', function () {
            this.sandbox.getModuleById(1);

            expect(this.application.getModuleById).toHaveBeenCalled();
            expect(this.application.getModuleById).toHaveBeenCalledWith(1);
        });
    });
});

