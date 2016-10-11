/*! 
 * objectfactory - v1.0.0 (https://github.com/greenish/js-objectfactory)
 * 
 * Copyright (c) 2013 Philipp Adrian (www.philippadrian.com)
 *
 * The MIT Licence (http://opensource.org/licenses/MIT)
 */
////////////////////////////////////////////////////////////////////////////////
(function(undefined){
"use strict";

////////////////////////////////////////////////////////////////////////////////
var superTest = /xyz/.test(function(){xyz;}) ? /\bthis\._super\b/ : /.*/;
var abstractTest = /xyz/.test(function(){xyz;}) ? /\bFunction\b/ : /.*/;
var instance = function(){};
var defaultOptions = {
	deep : false,
	abstract : false,
	super : false
}
////////////////////////////////////////////////////////////////////////////////
// isArray fallback for ie<9
var strArray = Array.toString();
var isArray = Array.isArray || function (obj) {
	return 
		(typeof obj == "object" 
		&& Object.prototype.toString.call(obj) === "[object Array]")
		|| ("constructor" in obj && String(obj.constructor) === strArray);
}
////////////////////////////////////////////////////////////////////////////////
var exception = function(type, value) {
	var exceptions = {
		unexpected : "Unexpected '"+value+"'! Only 'functions' and 'objects' can be used with the objectfactory.",
		unexpectedArray : "Unexpected 'array'! Arrays are only allowed as first parameter to set options and must only contain strings. ['deep', 'super', 'abstract']",
		abstract : "Abstract method '"+value+"' needs to be defined."
	};
	throw("objectfactory: "+exceptions[type]);
}
////////////////////////////////////////////////////////////////////////////////
var attachSuper = function(fn, _super) {
	if(typeof fn !== "function" || !superTest.test(fn)) {
		return fn;
	}

	return function() {
		var tmp = this._super;
		this._super = _super;
		var ret = fn.apply(this, arguments); 
		this._super = tmp;
		return ret;
	}
}
////////////////////////////////////////////////////////////////////////////////
var checkAbstractMethods = function(instance, abstractMethods){
	var test, path, fn;
	for(var i=0; i<abstractMethods.length; i++){
		try{
			test = instance;
			path = abstractMethods[i].split(".");
			for(var k =0; k<path.length-1; k++) test = test[path[k]];
			fn = test[path[path.length-1]];
			if(typeof fn !== "function" || fn === Function) throw("");		
		} 
		catch(e){
			exception("abstract", abstractMethods[i]+"()");
		}
	}
}
////////////////////////////////////////////////////////////////////////////////
var extend = function(target, source, module, abstractMethods, keys, path) {
	module = module || defaultOptions;

	if(typeof keys === "object") {
		for(var k in keys) {
			extendProperty(target, source, keys[k], module, abstractMethods, path);
		}
	}
	else {
		for(var k in source) {
			extendProperty(target, source, k, module, abstractMethods, path);
		}
	}
	return target;
}
////////////////////////////////////////////////////////////////////////////////
var extendProperty = function(target, source, k, module, abstractMethods, path) {
	var newTarget;
	path = path || "";
	if(module.deep && typeof source[k] === "object") {
		newTarget = isArray(source[k]) ? [] : {};
		target[k] = extend(newTarget, source[k], module, abstractMethods, undefined, path+k+".");
	}
	// test if abstract method
	else if(module.abstract && source[k] === Function) {
		abstractMethods.push(path+k);
		if(typeof target[k] !== "function") target[k] = source[k];
	}
	// test if _super has to be attached
	else if(module.super && source[k] !== target[k])
		target[k] = attachSuper(source[k], target[k]);
	else
		target[k] = source[k];
}
////////////////////////////////////////////////////////////////////////////////
var instantiate = function(fn, args){
	var f;
	if(typeof fn === "function") {
		if(Factory.debug && typeof Function.prototype.bind === "function") {
			// Slightly slower but keeps names intact for the inspector.
            Array.prototype.unshift.call(args, null);
            f = new (Function.prototype.bind.apply(fn, args));
		}
		else {
			instance.prototype = fn.prototype;
			instance.prototype.constructor = fn;
			f = new instance();
			fn.apply(f, args);
		}
	}
	else {
		instance.prototype = fn;
		f = new instance();
	}
	return f;	
}
////////////////////////////////////////////////////////////////////////////////
var instantiateFunction = function(Class, module, args, abstractMethods){
	var proto = module.obj.prototype;
	var _super = module.super && superTest.test(module.obj);
	var abstract = module.abstract && abstractTest.test(module.obj);
	var instance, keys;

	Class = extend(Class, proto, module, abstractMethods);

	if(!Factory.debug && !_super && !abstract && !module.deep) {
		module.obj.apply(Class, args);
		return Class;
	}

	module.obj.prototype = Class;
	module.obj.prototype.constructor = module.obj;
	instance = instantiate(module.obj, args);
	module.obj.prototype = proto;
	module.obj.prototype.constructor = module.obj;

	if(_super || abstract || module.deep) {
		if(Factory.debug) Class = instantiate(Class);
		keys = typeof Object.getOwnPropertyNames === "function" ?
			Object.getOwnPropertyNames(instance):
			undefined;
		instance = extend(Class, instance, module, abstractMethods, keys);
	}
	return instance;
}
////////////////////////////////////////////////////////////////////////////////
var build = function(Class, modules, args, abstractMethods){
	var isFunction, module;

	for(var i=0; i<modules.length; i++) {
		module = modules[i];
		isFunction = typeof module.obj === "function";
		if(isFunction && module.strObj === strExecutable) {
			Class=module.obj.call(Factory, Class, args, abstractMethods, module);
		}
		else {
			if(Factory.debug) Class = instantiate(Class);
			Class = isFunction ? 
				instantiateFunction(Class, module, args, abstractMethods):
				extend(Class, module.obj, module, abstractMethods);
		}
	}
	return Class;
}
////////////////////////////////////////////////////////////////////////////////
var Factory = function(){
	var options = instantiate(defaultOptions);
	var modules = [];
	var type=typeof arguments[0];
	var i=1;

	////////////////////////////////////////////////////////////////////////////
	var Executable = function Executable(Class, args, abstractMethods, module){

		// If we're in the building process
		if(this === Factory) {
			// Define instanceof function for every Executable that gets build.
			module.instanceof = _instanceof;
			return build(Class, modules, args, abstractMethods);
		} 

		// Start building process
		var abstractMethods = [];
		var newObject = {instanceof : _instanceof};
		var instance = build(newObject, modules, arguments, abstractMethods);
		var construct, returnType, obj, name;

		// Check if all abstract Methods are implemented
		checkAbstractMethods(instance, abstractMethods);

		// Call construct if available
		if(instance.construct) 
			construct = instance.construct.apply(instance, arguments);

		returnType = typeof construct;

		// return instance or if construct() returned function or object, return that. (standard instantiation behavior in JS)
		return returnType === "object" || returnType === "function" ?
			construct : instance;
	}
	////////////////////////////////////////////////////////////////////////////
	var _instanceof = function(fn){
		if(typeof fn === "function" && this instanceof fn) return true;
		if(Executable === fn) return true;

		for(var i=0; i<modules.length; i++) {
			if(modules[i].strObj === strExecutable && modules[i].instanceof(fn)) 
				return true;
			else if(modules[i].obj === fn) 
				return true;
		}
		return false;
	}
	////////////////////////////////////////////////////////////////////////////

	// extract options
	if(isArray(arguments[0])) {
		for(var k=0; k < arguments[0].length; k++) {
			if(typeof arguments[0][k] === "string") {
				if(typeof options[arguments[0][k]] === "boolean"){
					options[arguments[0][k]] = true;
				}
			}
			else exception("unexpectedArray");
		}
	}
	else if(type === "string" && typeof options[arguments[0]] === "boolean") {
		options[arguments[0]] = true;
	}
	else if(type === "boolean") {
		options["deep"] = arguments[0];
	}
	else i=0;

	//setup modules
	for(; i < arguments.length; i++) {
		type = typeof arguments[i];
		
		if(type === "object" || type === "function") {
			if(!isArray(arguments[i])){
				modules.push(extend(instantiate(options), { 
					obj : arguments[i],
					strObj : type === "function" ? ""+arguments[i] : "",
					instanceof : instance
				}));

				if(type === "function") {
					extend(Executable, arguments[i], {
						deep:options.deep,
						super:options.super,
						abstract : false
					});
				}
			}
			else exception("unexpectedArray");
		} 
		else exception("unexpected", type);
	}	
	return Executable;
}
////////////////////////////////////////////////////////////////////////////////
Factory.debug = false;

var strExecutable = ""+Factory();

if(typeof module === "object") module.exports = Factory;
else window.objectfactory = Factory;

////////////////////////////////////////////////////////////////////////////////
})();