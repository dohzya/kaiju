/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	var abyssa_1 = __webpack_require__(19);
	var dompteuse_1 = __webpack_require__(2);
	var app_1 = __webpack_require__(29);
	var action_1 = __webpack_require__(30);
	var store_1 = __webpack_require__(40);
	var router = abyssa_1.Router({
	    app: abyssa_1.State('', {}, {
	        index: abyssa_1.State('', {}),
	        blue: abyssa_1.State('blue/:id', {}, {
	            green: abyssa_1.State('green', {}),
	            red: abyssa_1.State('red', {})
	        })
	    })
	})
	    .on('ended', action_1.routeChanged)
	    .configure({ urlSync: 'hash' })
	    .init();
	dompteuse_1.startApp({ app: app_1.default, store: store_1.default, elm: document.body });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dompteuse_1 = __webpack_require__(2);
	var fluxx_1 = __webpack_require__(10);
	fluxx_1.Store.log = true;
	dompteuse_1.Render.log = true;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.h = exports.Render = exports.startApp = exports.component = undefined;
	
	var _snabbdom = __webpack_require__(3);
	
	var _h = __webpack_require__(7);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _render = __webpack_require__(8);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _component = __webpack_require__(9);
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function startApp(_ref) {
	  var app = _ref.app;
	  var elm = _ref.elm;
	
	  var patch = (0, _snabbdom.init)([__webpack_require__(14), __webpack_require__(15), __webpack_require__(16), __webpack_require__(17), __webpack_require__(18)]);
	
	  _render2.default.patch = patch;
	
	  // Non destructive patching inside the passed element
	  var elmToReplace = document.createElement('div');
	  var newVnode = patch(elmToReplace, app);
	
	  elm.appendChild(newVnode.elm);
	}
	
	exports.component = _component2.default;
	exports.startApp = startApp;
	exports.Render = _render2.default;
	exports.h = _h2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// jshint newcap: false
	/* global require, module, document, Node */
	'use strict';
	
	var VNode = __webpack_require__(4);
	var is = __webpack_require__(5);
	var domApi = __webpack_require__(6);
	
	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }
	
	var emptyNode = VNode('', {}, [], undefined, undefined);
	
	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i, map = {}, key;
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}
	
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	
	function init(modules, api) {
	  var i, j, cbs = {};
	
	  if (isUndef(api)) api = domApi;
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }
	
	  function emptyNodeAt(elm) {
	    return VNode(api.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }
	
	  function createRmCb(childElm, listeners) {
	    return function() {
	      if (--listeners === 0) {
	        var parent = api.parentNode(childElm);
	        api.removeChild(parent, childElm);
	      }
	    };
	  }
	
	  function createElm(vnode, insertedVnodeQueue) {
	    var i, thunk, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = data.vnode)) {
	          thunk = vnode;
	          vnode = i;
	      }
	    }
	    var elm, children = vnode.children, sel = vnode.sel;
	    if (isDef(sel)) {
	      // Parse selector
	      var hashIdx = sel.indexOf('#');
	      var dotIdx = sel.indexOf('.', hashIdx);
	      var hash = hashIdx > 0 ? hashIdx : sel.length;
	      var dot = dotIdx > 0 ? dotIdx : sel.length;
	      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                                                          : api.createElement(tag);
	      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
	      if (dotIdx > 0) elm.className = sel.slice(dot+1).replace(/\./g, ' ');
	      if (is.array(children)) {
	        for (i = 0; i < children.length; ++i) {
	          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if (is.primitive(vnode.text)) {
	        api.appendChild(elm, api.createTextNode(vnode.text));
	      }
	      for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
	      i = vnode.data.hook; // Reuse variable
	      if (isDef(i)) {
	        if (i.create) i.create(emptyNode, vnode);
	        if (i.insert) insertedVnodeQueue.push(vnode);
	      }
	    } else {
	      elm = vnode.elm = api.createTextNode(vnode.text);
	    }
	    if (isDef(thunk)) thunk.elm = vnode.elm;
	    return vnode.elm;
	  }
	
	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook(vnode) {
	    var i, j, data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
	      if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	      if (isDef(i = data.vnode)) invokeDestroyHook(i);
	    }
	  }
	
	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var i, listeners, rm, ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.sel)) {
	          invokeDestroyHook(ch);
	          listeners = cbs.remove.length + 1;
	          rm = createRmCb(ch.elm, listeners);
	          for (i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
	          if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
	            i(ch, rm);
	          } else {
	            rm();
	          }
	        } else { // Text node
	          api.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }
	
	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0, newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	        idxInOld = oldKeyToIdx[newStartVnode.key];
	        if (isUndef(idxInOld)) { // New element
	          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	          oldCh[idxInOld] = undefined;
	          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx+1]) ? null : newCh[newEndIdx+1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i, hook;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    if (isDef(i = oldVnode.data) && isDef(i = i.vnode)) oldVnode = i;
	    if (isDef(i = vnode.data) && isDef(i = i.vnode)) {
	      patchVnode(oldVnode, i, insertedVnodeQueue);
	      vnode.elm = i.elm;
	      return;
	    }
	    var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = api.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      api.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
	      i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        api.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      api.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }
	
	  return function(oldVnode, vnode) {
	    var i, elm, parent;
	    var insertedVnodeQueue = [];
	    for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();
	
	    if (isUndef(oldVnode.sel)) {
	      oldVnode = emptyNodeAt(oldVnode);
	    }
	
	    if (sameVnode(oldVnode, vnode)) {
	      patchVnode(oldVnode, vnode, insertedVnodeQueue);
	    } else {
	      elm = oldVnode.elm;
	      parent = api.parentNode(elm);
	
	      createElm(vnode, insertedVnodeQueue);
	
	      if (parent !== null) {
	        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	        removeVnodes(parent, [oldVnode], 0, 0);
	      }
	    }
	
	    for (i = 0; i < insertedVnodeQueue.length; ++i) {
	      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	    }
	    for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
	    return vnode;
	  };
	}
	
	module.exports = {init: init};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(sel, data, children, text, elm) {
	  var key = data === undefined ? undefined : data.key;
	  return {sel: sel, data: data, children: children,
	          text: text, elm: elm, key: key};
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	  array: Array.isArray,
	  primitive: function(s) { return typeof s === 'string' || typeof s === 'number'; },
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	function createElement(tagName){
	  return document.createElement(tagName);
	}
	
	function createElementNS(namespaceURI, qualifiedName){
	  return document.createElementNS(namespaceURI, qualifiedName);
	}
	
	function createTextNode(text){
	  return document.createTextNode(text);
	}
	
	
	function insertBefore(parentNode, newNode, referenceNode){
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	
	function removeChild(node, child){
	  node.removeChild(child);
	}
	
	function appendChild(node, child){
	  node.appendChild(child);
	}
	
	function parentNode(node){
	  return node.parentElement;
	}
	
	function nextSibling(node){
	  return node.nextSibling;
	}
	
	function tagName(node){
	  return node.tagName;
	}
	
	function setTextContent(node, text){
	  node.textContent = text;
	}
	
	module.exports = {
	  createElement: createElement,
	  createElementNS: createElementNS,
	  createTextNode: createTextNode,
	  appendChild: appendChild,
	  removeChild: removeChild,
	  insertBefore: insertBefore,
	  parentNode: parentNode,
	  nextSibling: nextSibling,
	  tagName: tagName,
	  setTextContent: setTextContent
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var VNode = __webpack_require__(4);
	var is = __webpack_require__(5);
	
	function addNS(data, children) {
	  data.ns = 'http://www.w3.org/2000/svg';
	  if (children !== undefined) {
	    for (var i = 0; i < children.length; ++i) {
	      addNS(children[i].data, children[i].children);
	    }
	  }
	}
	
	module.exports = function h(sel, b, c) {
	  var data = {}, children, text, i;
	  if (arguments.length === 3) {
	    data = b;
	    if (is.array(c)) { children = c; }
	    else if (is.primitive(c)) { text = c; }
	  } else if (arguments.length === 2) {
	    if (is.array(b)) { children = b; }
	    else if (is.primitive(b)) { text = b; }
	    else { data = b; }
	  }
	  if (is.array(children)) {
	    for (i = 0; i < children.length; ++i) {
	      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
	    }
	  }
	  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
	    addNS(data, children);
	  }
	  return VNode(sel, data, children, text, undefined);
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.renderComponent = renderComponent;
	exports.renderComponentNow = renderComponentNow;
	
	var _h = __webpack_require__(7);
	
	var _h2 = _interopRequireDefault(_h);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var componentsToRender = [];
	var rendering = false;
	var nextRender = void 0;
	
	var Render = { patch: undefined, log: false };
	exports.default = Render;
	function renderComponent(component) {
	  if (rendering) {
	    console.warn('A component tried to re-render while a rendering was already ongoing', component.elm);
	    return;
	  }
	
	  // This component is already scheduled for the next redraw.
	  // For instance, this can easily happen while the app's tab is inactive.
	  // Avoids doing more work than necessary when re-activating it.
	  if (componentsToRender.indexOf(component) !== -1) return;
	
	  componentsToRender.push(component);
	
	  if (!nextRender) nextRender = requestAnimationFrame(renderNow);
	};
	
	function renderComponentNow(component) {
	  var id = component.id;
	  var localState = component.localState;
	  var actions = component.actions;
	  var props = component.props;
	  var state = component.state;
	  var elm = component.elm;
	  var render = component.render;
	  var vnode = component.vnode;
	  var destroyed = component.destroyed;
	
	  // Bail if the component is already destroyed.
	  // This can happen if the parent renders first and decide a child component should be removed.
	
	  if (destroyed) return;
	
	  var patch = Render.patch;
	  var log = Render.log;
	
	
	  var beforeRender = void 0;
	
	  if (log) beforeRender = performance.now();
	  var newVnode = render({ props: props, state: state, localState: localState, actions: actions });
	
	  patch(vnode || elm, newVnode);
	
	  if (log) console.log('Render component \'' + component.key + '\'', performance.now() - beforeRender + ' ms', component);
	
	  component.onRender(component, newVnode);
	}
	
	function renderNow() {
	  rendering = true;
	
	  var components = componentsToRender;
	
	  nextRender = undefined;
	  componentsToRender = [];
	
	  if (Render.log) console.log('%cNew rendering frame', 'color: orange');
	
	  // Render components in a top-down fashion.
	  // This ensures the rendering order is predictive and props & states are consistent.
	  components.sort(function (compA, compB) {
	    return compA.depth - compB.depth;
	  });
	  components.forEach(renderComponentNow);
	
	  rendering = false;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = component;
	
	var _h = __webpack_require__(7);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _fluxx = __webpack_require__(10);
	
	var _render = __webpack_require__(8);
	
	var _shallowEqual = __webpack_require__(13);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var empty = {};
	
	function component(options) {
	  var key = options.key;
	  var _options$props = options.props;
	  var props = _options$props === undefined ? empty : _options$props;
	  var pullState = options.pullState;
	  var localStore = options.localStore;
	  var render = options.render;
	  var hook = options.hook;
	
	
	  var compProps = {
	    key: key,
	    hook: { create: create, insert: insert, postpatch: postpatch, destroy: destroy },
	    component: { props: props, pullState: pullState, localStoreFn: localStore, render: render, key: key }
	  };
	
	  return (0, _h2.default)('div', compProps);
	};
	
	function create(_, vnode) {
	  var component = vnode.data.component;
	  var props = component.props;
	  var pullState = component.pullState;
	  var localStoreFn = component.localStoreFn;
	
	  // This component pulls state from the global store
	
	  if (pullState) {
	    var store = (0, _fluxx.globalStore)();
	    component.unsubFromStores = store.subscribe(function (state) {
	      return onGlobalStoreChange(component, state);
	    });
	    component.state = pullState(store.state);
	  }
	
	  // This component maintains local state
	  if (localStoreFn) {
	    (function () {
	      var localStore = localStoreFn(props);
	      var store = localStore.store;
	      var actions = localStore.actions;
	
	
	      Object.keys(actions).forEach(function (name) {
	        return actions[name]._store = store;
	      });
	
	      var unsubFromGlobalStore = component.unsubFromStores;
	      var unsubFromLocalStore = store.subscribe(function (state) {
	        return onLocalStoreChange(component, state);
	      });
	
	      component.unsubFromStores = function () {
	        unsubFromLocalStore();
	        if (unsubFromGlobalStore) unsubFromGlobalStore();
	      };
	
	      component.actions = actions;
	      component.localState = store.state;
	    })();
	  }
	
	  component.elm = vnode.elm;
	  component.onRender = onRender;
	  component.placeholder = vnode;
	
	  // Create and insert the component's content
	  // while its parent is still unattached for better perfs.
	  (0, _render.renderComponentNow)(component);
	
	  // Swap the fake/cheap div placeholder's elm with the proper elm that has just been created.
	  component.placeholder.elm = component.vnode.elm;
	}
	
	// Store the component depth once it's attached to the DOM so we can render
	// component hierarchies in a predictive manner.
	function insert(vnode) {
	  vnode.data.component.depth = vnode.elm.__depth__ = getDepth(vnode.elm);
	}
	
	// Called on every re-render, this is where the props passed by the component's parent may have changed.
	function postpatch(oldVnode, vnode) {
	  var oldData = oldVnode.data;
	  var newData = vnode.data;
	
	  // Pass on the component instance everytime a new Vnode instance is created,
	  // but update any important property that can change over time.
	  var component = oldData.component;
	  component.props = newData.component.props;
	  component.render = newData.component.render;
	  component.placeholder = vnode;
	  newData.component = component;
	
	  // if the props changed, schedule a re-render
	  if (!(0, _shallowEqual2.default)(newData.props, oldData.props)) (0, _render.renderComponent)(component);
	}
	
	function onRender(component, newVnode) {
	  var i = void 0;
	
	  // Store the new vnode inside the component so we can diff it next render
	  component.vnode = newVnode;
	
	  // Lift any 'remove' hook to our placeholder vnode for it to be called
	  // as the placeholder is all our parent vnode knows about.
	  if ((i = newVnode.data.hook) && (i = i.remove)) component.placeholder.data.hook.remove = i;
	}
	
	function destroy(vnode) {
	  var comp = vnode.data.component;
	  comp.unsubFromStores();
	  destroyVnode(comp.vnode);
	  comp.destroyed = true;
	}
	
	function destroyVnode(vnode) {
	  var data = vnode.data;
	
	  if (!data) return;
	  if (data.hook && data.hook.destroy) data.hook.destroy(vnode);
	  // Can't invoke modules' destroy hook as they're hidden in snabbdom's closure
	  if (vnode.children) vnode.children.forEach(destroyVnode);
	  if (data.vnode) destroyVnode(data.vnode);
	}
	
	function onGlobalStoreChange(component, newState) {
	  var oldStateSlice = component.state;
	  var newStateSlice = component.pullState(newState);
	
	  component.state = newStateSlice;
	
	  if (!(0, _shallowEqual2.default)(newStateSlice, oldStateSlice)) (0, _render.renderComponent)(component);
	}
	
	function onLocalStoreChange(component, newState) {
	  component.localState = newState;
	  (0, _render.renderComponent)(component);
	}
	
	function getDepth(elm) {
	  var parent = elm.parentElement;
	
	  while (parent) {
	    if (parent.__depth__ !== undefined) return parent.__depth__ + 1;
	    parent = parent.parentElement;
	  }
	
	  return 0;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.Action = exports.LocalStore = exports.globalStore = exports.GlobalStore = exports.Store = undefined;
	
	var _Action2 = __webpack_require__(11);
	
	var _Action3 = _interopRequireDefault(_Action2);
	
	var _Store2 = __webpack_require__(12);
	
	var _Store3 = _interopRequireDefault(_Store2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Store = exports.Store = _Store3.default;
	var GlobalStore = exports.GlobalStore = _Store2.GlobalStore;
	var globalStore = exports.globalStore = _Store2.globalStore;
	var LocalStore = exports.LocalStore = _Store2.LocalStore;
	var Action = exports.Action = _Action3.default;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = Action;
	
	var _Store = __webpack_require__(12);
	
	var _Store2 = _interopRequireDefault(_Store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Unique Action ids.
	// This removes the need to provide unique names across the whole application.
	var id = 1;
	
	/**
	* Creates an unique action for a name.
	* The name is only useful for debugging purposes; different actions can have the same name.
	* The returned action function can then be used to dispatch one or more payloads.
	*
	* Ex:
	* var clickThread = Action('clickThread'); // Create the action once
	* clickThread(id); // Dispatch a payload any number of times
	*/
	function Action(name) {
	
	  // The actual action dispatch function
	  function action() {
	    var payloads = [].slice.call(arguments);
	
	    var isGlobalAction = action._store === undefined;
	
	    // Dispatch to our local store if we were given one or default to the global store.
	    var store = isGlobalAction ? (0, _Store.globalStore)() : action._store;
	
	    if (!store) throw new Error('Tried to dispatch an action (' + action._name + ') without an instanciated store');
	
	    if (_Store2.default.log) {
	      var payload = payloads.length > 1 ? payloads : payloads[0];
	      console.log('%c' + action._name, 'color: #F51DE3', 'dispatched with payload ', payload);
	    }
	
	    store._handleAction(action, payloads);
	
	    // Give a chance to all local Stores to react to this global Action
	    if (isGlobalAction) {
	      Object.keys(_Store.localStores).forEach(function (id) {
	        return _Store.localStores[id]._handleAction(action, payloads);
	      });
	    }
	  }
	
	  action._id = id++;
	  action._name = name;
	
	  // Allows Actions to be used as Object keys with the correct behavior
	  action.toString = function () {
	    return action._id;
	  };
	
	  return action;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.globalStore = globalStore;
	exports.GlobalStore = GlobalStore;
	exports.LocalStore = LocalStore;
	exports.default = Store;
	
	var _globalStore = undefined;
	function globalStore() {
	  return _globalStore;
	}
	
	var localStoreId = 1;
	var localStores = exports.localStores = {};
	
	function GlobalStore(optionsOrInitialState, registerHandlers) {
	  _globalStore = Store(optionsOrInitialState, registerHandlers, true);
	  return _globalStore;
	}
	
	function LocalStore(optionsOrInitialState, registerHandlers) {
	  return Store(optionsOrInitialState, registerHandlers);
	}
	
	function Store(optionsOrInitialState, registerHandlers, isGlobal) {
	  var _ref = registerHandlers ? {} : optionsOrInitialState;
	
	  var handlers = _ref.handlers;
	
	  var initialState = registerHandlers ? optionsOrInitialState : optionsOrInitialState.state;
	  var onHandlers = {};
	
	  var dispatching = false;
	  var callbacks = [];
	
	  var instance = { state: initialState, log: Store.log };
	
	  if (!isGlobal) {
	    instance.id = localStoreId++;
	    localStores[instance.id] = instance;
	  }
	
	  // on(action, callback) registration style
	  if (registerHandlers) {
	    var on = function on(action, fn) {
	      onHandlers[action] = fn;
	    };
	    registerHandlers(on);
	  }
	
	  if (instance.log) console.log('%cInitial state:', 'color: green', initialState);
	
	  instance._handleAction = function (action, payloads) {
	    if (dispatching) throw new Error('Cannot dispatch an Action in the middle of another Action\'s dispatch');
	
	    // Bail fast if this store isn't interested.
	    var handler = handlers ? handlers[action._id] : onHandlers[action._id];
	    if (!handler) return;
	
	    dispatching = true;
	
	    var previousState = instance.state;
	
	    try {
	      instance.state = handlers ? handler.apply(null, [instance.state].concat(payloads)) : handler(instance.state, payloads[0]);
	    } finally {
	      if (instance.log) {
	        var storeKind = isGlobal ? 'global' : 'local';
	        console.log('%cNew ' + storeKind + ' state:', 'color: blue', instance.state);
	      }
	
	      dispatching = false;
	    }
	
	    if (previousState !== instance.state) callbacks.forEach(function (callback) {
	      return callback(instance.state);
	    });
	  };
	
	  instance.subscribe = function (callback) {
	    callbacks.push(callback);
	
	    return function unsubscribe() {
	      callbacks = callbacks.filter(function (_callback) {
	        return _callback !== callback;
	      });
	      if (!isGlobal && callbacks.length === 0) delete localStores[instance.id];
	    };
	  };
	
	  return instance;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.default = shallowEqual;
	
	/* Efficient shallow comparison of two objects */
	
	function shallowEqual(objA, objB) {
	  if (objA === objB) return true;
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  // Test for A's keys different from B's.
	  for (var i = 0; i < keysA.length; i++) {
	    if (objA[keysA[i]] !== objB[keysA[i]]) return false;
	  }
	
	  // Test for B's keys different from A's.
	  // Handles the case where B has a property that A doesn't.
	  for (var i = 0; i < keysB.length; i++) {
	    if (objA[keysB[i]] !== objB[keysB[i]]) return false;
	  }
	
	  return true;
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	function updateClass(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldClass = oldVnode.data.class || {},
	      klass = vnode.data.class || {};
	  for (name in oldClass) {
	    if (!klass[name]) {
	      elm.classList.remove(name);
	    }
	  }
	  for (name in klass) {
	    cur = klass[name];
	    if (cur !== oldClass[name]) {
	      elm.classList[cur ? 'add' : 'remove'](name);
	    }
	  }
	}
	
	module.exports = {create: updateClass, update: updateClass};


/***/ },
/* 15 */
/***/ function(module, exports) {

	function updateProps(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldProps = oldVnode.data.props || {}, props = vnode.data.props || {};
	  for (key in oldProps) {
	    if (!props[key]) {
	      delete elm[key];
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	      elm[key] = cur;
	    }
	  }
	}
	
	module.exports = {create: updateProps, update: updateProps};


/***/ },
/* 16 */
/***/ function(module, exports) {

	var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", 
	                "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", 
	                "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", 
	                "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", 
	                "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", 
	                "truespeed", "typemustmatch", "visible"];
	    
	var booleanAttrsDict = {};
	for(var i=0, len = booleanAttrs.length; i < len; i++) {
	  booleanAttrsDict[booleanAttrs[i]] = true;
	}
	    
	function updateAttrs(oldVnode, vnode) {
	  var key, cur, old, elm = vnode.elm,
	      oldAttrs = oldVnode.data.attrs || {}, attrs = vnode.data.attrs || {};
	  
	  // update modified attributes, add new attributes
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      // TODO: add support to namespaced attributes (setAttributeNS)
	      if(!cur && booleanAttrsDict[key])
	        elm.removeAttribute(key);
	      else
	        elm.setAttribute(key, cur);
	    }
	  }
	  //remove removed attributes
	  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	  // the other option is to remove all attributes with value == undefined
	  for (key in oldAttrs) {
	    if (!(key in attrs)) {
	      elm.removeAttribute(key);
	    }
	  }
	}
	
	module.exports = {create: updateAttrs, update: updateAttrs};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(5);
	
	function arrInvoker(arr) {
	  return function() {
	    // Special case when length is two, for performance
	    arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
	  };
	}
	
	function fnInvoker(o) {
	  return function(ev) { o.fn(ev); };
	}
	
	function updateEventListeners(oldVnode, vnode) {
	  var name, cur, old, elm = vnode.elm,
	      oldOn = oldVnode.data.on || {}, on = vnode.data.on;
	  if (!on) return;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      if (is.array(cur)) {
	        elm.addEventListener(name, arrInvoker(cur));
	      } else {
	        cur = {fn: cur};
	        on[name] = cur;
	        elm.addEventListener(name, fnInvoker(cur));
	      }
	    } else if (is.array(old)) {
	      // Deliberately modify old array since it's captured in closure created with `arrInvoker`
	      old.length = cur.length;
	      for (var i = 0; i < old.length; ++i) old[i] = cur[i];
	      on[name]  = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}
	
	module.exports = {create: updateEventListeners, update: updateEventListeners};


/***/ },
/* 18 */
/***/ function(module, exports) {

	var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
	var nextFrame = function(fn) { raf(function() { raf(fn); }); };
	
	function setNextFrame(obj, prop, val) {
	  nextFrame(function() { obj[prop] = val; });
	}
	
	function updateStyle(oldVnode, vnode) {
	  var cur, name, elm = vnode.elm,
	      oldStyle = oldVnode.data.style || {},
	      style = vnode.data.style || {},
	      oldHasDel = 'delayed' in oldStyle;
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.style[name] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (name === 'delayed') {
	      for (name in style.delayed) {
	        cur = style.delayed[name];
	        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
	          setNextFrame(elm.style, name, cur);
	        }
	      }
	    } else if (name !== 'remove' && cur !== oldStyle[name]) {
	      elm.style[name] = cur;
	    }
	  }
	}
	
	function applyDestroyStyle(vnode) {
	  var style, name, elm = vnode.elm, s = vnode.data.style;
	  if (!s || !(style = s.destroy)) return;
	  for (name in style) {
	    elm.style[name] = style[name];
	  }
	}
	
	function applyRemoveStyle(vnode, rm) {
	  var s = vnode.data.style;
	  if (!s || !s.remove) {
	    rm();
	    return;
	  }
	  var name, elm = vnode.elm, idx, i = 0, maxDur = 0,
	      compStyle, style = s.remove, amount = 0, applied = [];
	  for (name in style) {
	    applied.push(name);
	    elm.style[name] = style[name];
	  }
	  compStyle = getComputedStyle(elm);
	  var props = compStyle['transition-property'].split(', ');
	  for (; i < props.length; ++i) {
	    if(applied.indexOf(props[i]) !== -1) amount++;
	  }
	  elm.addEventListener('transitionend', function(ev) {
	    if (ev.target === elm) --amount;
	    if (amount === 0) rm();
	  });
	}
	
	module.exports = {create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var util = __webpack_require__(20);
	
	var Abyssa = {
	  Router: __webpack_require__(21),
	  api: __webpack_require__(27),
	  async: __webpack_require__(28),
	  State: util.stateShorthand,
	
	  _util: util
	};
	
	module.exports = Abyssa;

/***/ },
/* 20 */
/***/ function(module, exports) {

	
	'use strict';
	
	var util = {};
	
	util.noop = function () {};
	
	util.arrayToObject = function (array) {
	  return array.reduce(function (obj, item) {
	    obj[item] = 1;
	    return obj;
	  }, {});
	};
	
	util.objectToArray = function (obj) {
	  var array = [];
	  for (var key in obj) {
	    array.push(obj[key]);
	  }return array;
	};
	
	util.copyObject = function (obj) {
	  var copy = {};
	  for (var key in obj) {
	    copy[key] = obj[key];
	  }return copy;
	};
	
	util.mergeObjects = function (to, from) {
	  for (var key in from) {
	    to[key] = from[key];
	  }return to;
	};
	
	util.mapValues = function (obj, fn) {
	  var result = {};
	  for (var key in obj) {
	    result[key] = fn(obj[key]);
	  }
	  return result;
	};
	
	/*
	* Return the set of all the keys that changed (either added, removed or modified).
	*/
	util.objectDiff = function (obj1, obj2) {
	  var update = {},
	      enter = {},
	      exit = {},
	      all = {},
	      name,
	      obj1 = obj1 || {};
	
	  for (name in obj1) {
	    if (!(name in obj2)) exit[name] = all[name] = true;else if (obj1[name] != obj2[name]) update[name] = all[name] = true;
	  }
	
	  for (name in obj2) {
	    if (!(name in obj1)) enter[name] = all[name] = true;
	  }
	
	  return { all: all, update: update, enter: enter, exit: exit };
	};
	
	util.makeMessage = function () {
	  var message = arguments[0],
	      tokens = Array.prototype.slice.call(arguments, 1);
	
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    message = message.replace('{' + i + '}', tokens[i]);
	  }return message;
	};
	
	util.parsePaths = function (path) {
	  return path.split('/').filter(function (str) {
	    return str.length;
	  }).map(function (str) {
	    return decodeURIComponent(str);
	  });
	};
	
	util.parseQueryParams = function (query) {
	  return query ? query.split('&').reduce(function (res, paramValue) {
	    var pv = paramValue.split('=');
	    res[pv[0]] = decodeURIComponent(pv[1]);
	    return res;
	  }, {}) : {};
	};
	
	var LEADING_SLASHES = /^\/+/;
	var TRAILING_SLASHES = /^([^?]*?)\/+$/;
	var TRAILING_SLASHES_BEFORE_QUERY = /\/+\?/;
	util.normalizePathQuery = function (pathQuery) {
	  return '/' + pathQuery.replace(LEADING_SLASHES, '').replace(TRAILING_SLASHES, '$1').replace(TRAILING_SLASHES_BEFORE_QUERY, '?');
	};
	
	util.stateShorthand = function (uri, options, children) {
	  return util.mergeObjects({ uri: uri, children: children || {} }, options);
	};
	
	module.exports = util;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var EventEmitter = __webpack_require__(22),
	    interceptAnchors = __webpack_require__(23),
	    StateWithParams = __webpack_require__(24),
	    Transition = __webpack_require__(25),
	    util = __webpack_require__(20),
	    State = __webpack_require__(26),
	    api = __webpack_require__(27);
	
	/*
	* Create a new Router instance, passing any state defined declaratively.
	* More states can be added using addState().
	*
	* Because a router manages global state (the URL), only one instance of Router
	* should be used inside an application.
	*/
	function Router(declarativeStates) {
	  var router = {},
	      states = stateTrees(declarativeStates),
	      firstTransition = true,
	      options = {
	    enableLogs: false,
	    interceptAnchors: true,
	    notFound: null,
	    urlSync: 'history',
	    hashPrefix: ''
	  },
	      ignoreNextURLChange = false,
	      currentPathQuery,
	      currentParamsDiff = {},
	      currentState,
	      previousState,
	      transition,
	      leafStates,
	      urlChanged,
	      initialized,
	      hashSlashString;
	
	  /*
	  * Setting a new state will start a transition from the current state to the target state.
	  * A successful transition will result in the URL being changed.
	  * A failed transition will leave the router in its current state.
	  */
	  function setState(state, params, acc) {
	    var fromState = transition ? StateWithParams(transition.currentState, transition.toParams) : currentState;
	
	    var toState = StateWithParams(state, params);
	    var diff = util.objectDiff(fromState && fromState.params, params);
	
	    if (preventTransition(fromState, toState, diff)) {
	      if (transition && transition.exiting) cancelTransition();
	      return;
	    }
	
	    if (transition) cancelTransition();
	
	    // While the transition is running, any code asking the router about the previous/current state should
	    // get the end result state.
	    previousState = currentState;
	    currentState = toState;
	    currentParamsDiff = diff;
	
	    transition = Transition(fromState, toState, diff, acc, router, logger);
	
	    startingTransition(fromState, toState);
	
	    // In case of a redirect() called from 'startingTransition', the transition already ended.
	    if (transition) transition.run();
	
	    // In case of a redirect() called from the transition itself, the transition already ended
	    if (transition) {
	      if (transition.cancelled) currentState = fromState;else endingTransition(fromState, toState);
	    }
	
	    transition = null;
	  }
	
	  function cancelTransition() {
	    logger.log('Cancelling existing transition from {0} to {1}', transition.from, transition.to);
	
	    transition.cancel();
	
	    firstTransition = false;
	  }
	
	  function startingTransition(fromState, toState) {
	    logger.log('Starting transition from {0} to {1}', fromState, toState);
	
	    var from = fromState ? fromState.asPublic : null;
	    var to = toState.asPublic;
	
	    router.transition.emit('started', to, from);
	  }
	
	  function endingTransition(fromState, toState) {
	    if (!urlChanged && !firstTransition) {
	      logger.log('Updating URL: {0}', currentPathQuery);
	      updateURLFromState(currentPathQuery, document.title, currentPathQuery);
	    }
	
	    firstTransition = false;
	
	    logger.log('Transition from {0} to {1} ended', fromState, toState);
	
	    toState.state.lastParams = toState.params;
	
	    var from = fromState ? fromState.asPublic : null;
	    var to = toState.asPublic;
	    router.transition.emit('ended', to, from);
	  }
	
	  function updateURLFromState(state, title, url) {
	    if (isHashMode()) {
	      ignoreNextURLChange = true;
	      location.hash = options.hashPrefix + url;
	    } else history.pushState(state, title, url);
	  }
	
	  /*
	  * Return whether the passed state is the same as the current one;
	  * in which case the router can ignore the change.
	  */
	  function preventTransition(current, newState, diff) {
	    if (!current) return false;
	
	    return newState.state == current.state && Object.keys(diff.all).length == 0;
	  }
	
	  /*
	  * The state wasn't found;
	  * Transition to the 'notFound' state if the developer specified it or else throw an error.
	  */
	  function notFound(state) {
	    logger.log('State not found: {0}', state);
	
	    if (options.notFound) return setState(leafStates[options.notFound], {});else throw new Error('State "' + state + '" could not be found');
	  }
	
	  /*
	  * Configure the router before its initialization.
	  * The available options are:
	  *   enableLogs: Whether (debug and error) console logs should be enabled. Defaults to false.
	  *   interceptAnchors: Whether anchor mousedown/clicks should be intercepted and trigger a state change. Defaults to true.
	  *   notFound: The State to enter when no state matching the current path query or name could be found. Defaults to null.
	  *   urlSync: How should the router maintain the current state and the url in sync. Defaults to true (history API).
	  *   hashPrefix: Customize the hash separator. Set to '!' in order to have a hashbang like '/#!/'. Defaults to empty string.
	  */
	  function configure(withOptions) {
	    util.mergeObjects(options, withOptions);
	    return router;
	  }
	
	  /*
	  * Initialize the router.
	  * The router will immediately initiate a transition to, in order of priority:
	  * 1) The init state passed as an argument
	  * 2) The state captured by the current URL
	  */
	  function init(initState, initParams) {
	    if (options.enableLogs) Router.enableLogs();
	
	    if (options.interceptAnchors) interceptAnchors(router);
	
	    hashSlashString = '#' + options.hashPrefix + '/';
	
	    logger.log('Router init');
	
	    initStates();
	    logStateTree();
	
	    initState = initState !== undefined ? initState : urlPathQuery();
	
	    logger.log('Initializing to state {0}', initState || '""');
	    transitionTo(initState, initParams);
	
	    listenToURLChanges();
	
	    initialized = true;
	    return router;
	  }
	
	  /*
	  * Remove any possibility of side effect this router instance might cause.
	  * Used for testing purposes.
	  */
	  function terminate() {
	    window.onhashchange = null;
	    window.onpopstate = null;
	  }
	
	  function listenToURLChanges() {
	
	    function onURLChange(evt) {
	      if (ignoreNextURLChange) {
	        ignoreNextURLChange = false;
	        return;
	      }
	
	      var newState = evt.state || urlPathQuery();
	
	      logger.log('URL changed: {0}', newState);
	      urlChanged = true;
	      setStateForPathQuery(newState);
	    }
	
	    window[isHashMode() ? 'onhashchange' : 'onpopstate'] = onURLChange;
	  }
	
	  function initStates() {
	    var stateArray = util.objectToArray(states);
	
	    addDefaultStates(stateArray);
	
	    eachRootState(function (name, state) {
	      state.init(router, name);
	    });
	
	    assertPathUniqueness(stateArray);
	
	    leafStates = registerLeafStates(stateArray, {});
	
	    assertNoAmbiguousPaths();
	  }
	
	  function assertPathUniqueness(states) {
	    var paths = {};
	
	    states.forEach(function (state) {
	      if (paths[state.path]) {
	        var fullPaths = states.map(function (s) {
	          return s.fullPath() || 'empty';
	        });
	        throw new Error('Two sibling states have the same path (' + fullPaths + ')');
	      }
	
	      paths[state.path] = 1;
	      assertPathUniqueness(state.children);
	    });
	  }
	
	  function assertNoAmbiguousPaths() {
	    var paths = {};
	
	    for (var name in leafStates) {
	      var path = util.normalizePathQuery(leafStates[name].fullPath());
	      if (paths[path]) throw new Error('Ambiguous state paths: ' + path);
	      paths[path] = 1;
	    }
	  }
	
	  function addDefaultStates(states) {
	    states.forEach(function (state) {
	      var children = util.objectToArray(state.states);
	
	      // This is a parent state: Add a default state to it if there isn't already one
	      if (children.length) {
	        addDefaultStates(children);
	
	        var hasDefaultState = children.reduce(function (result, state) {
	          return state.path == '' || result;
	        }, false);
	
	        if (hasDefaultState) return;
	
	        var defaultState = State({ uri: '' });
	        state.states._default_ = defaultState;
	      }
	    });
	  }
	
	  function eachRootState(callback) {
	    for (var name in states) {
	      callback(name, states[name]);
	    }
	  }
	
	  function registerLeafStates(states, leafStates) {
	    return states.reduce(function (leafStates, state) {
	      if (state.children.length) return registerLeafStates(state.children, leafStates);else {
	        leafStates[state.fullName] = state;
	        state.paths = util.parsePaths(state.fullPath());
	        return leafStates;
	      }
	    }, leafStates);
	  }
	
	  /*
	  * Request a programmatic state change.
	  *
	  * Two notations are supported:
	  * transitionTo('my.target.state', {id: 33, filter: 'desc'})
	  * transitionTo('target/33?filter=desc')
	  */
	  function transitionTo(pathQueryOrName) {
	    var name = leafStates[pathQueryOrName];
	    var params = (name ? arguments[1] : null) || {};
	    var acc = name ? arguments[2] : arguments[1];
	
	    logger.log('Changing state to {0}', pathQueryOrName || '""');
	
	    urlChanged = false;
	
	    if (name) setStateByName(name, params, acc);else setStateForPathQuery(pathQueryOrName, acc);
	  }
	
	  /*
	  * Attempt to navigate to 'stateName' with its previous params or
	  * fallback to the defaultParams parameter if the state was never entered.
	  */
	  function backTo(stateName, defaultParams, acc) {
	    var params = leafStates[stateName].lastParams || defaultParams;
	    transitionTo(stateName, params, acc);
	  }
	
	  function setStateForPathQuery(pathQuery, acc) {
	    var state, params, _state, _params;
	
	    currentPathQuery = util.normalizePathQuery(pathQuery);
	
	    var pq = currentPathQuery.split('?');
	    var path = pq[0];
	    var query = pq[1];
	    var paths = util.parsePaths(path);
	    var queryParams = util.parseQueryParams(query);
	
	    for (var name in leafStates) {
	      _state = leafStates[name];
	      _params = _state.matches(paths);
	
	      if (_params) {
	        state = _state;
	        params = util.mergeObjects(_params, queryParams);
	        break;
	      }
	    }
	
	    if (state) setState(state, params, acc);else notFound(currentPathQuery);
	  }
	
	  function setStateByName(name, params, acc) {
	    var state = leafStates[name];
	
	    if (!state) return notFound(name);
	
	    var pathQuery = interpolate(state, params);
	    setStateForPathQuery(pathQuery, acc);
	  }
	
	  /*
	  * Add a new root state to the router.
	  * The name must be unique among root states.
	  */
	  function addState(name, state) {
	    if (states[name]) throw new Error('A state already exist in the router with the name ' + name);
	
	    state = stateTree(state);
	
	    states[name] = state;
	
	    if (initialized) {
	      state.init(router, name);
	      registerLeafStates({ _: state });
	    }
	
	    return router;
	  }
	
	  /*
	  * Read the path/query from the URL.
	  */
	  function urlPathQuery() {
	    var hashSlash = location.href.indexOf(hashSlashString);
	    var pathQuery;
	
	    if (hashSlash > -1) pathQuery = location.href.slice(hashSlash + hashSlashString.length);else if (isHashMode()) pathQuery = '/';else pathQuery = (location.pathname + location.search).slice(1);
	
	    return util.normalizePathQuery(pathQuery);
	  }
	
	  function isHashMode() {
	    return options.urlSync == 'hash';
	  }
	
	  /*
	  * Compute a link that can be used in anchors' href attributes
	  * from a state name and a list of params, a.k.a reverse routing.
	  */
	  function link(stateName, params) {
	    var state = leafStates[stateName];
	    if (!state) throw new Error('Cannot find state ' + stateName);
	
	    var interpolated = interpolate(state, params);
	    var uri = util.normalizePathQuery(interpolated);
	
	    return isHashMode() ? '#' + options.hashPrefix + uri : uri;
	  }
	
	  function interpolate(state, params) {
	    var encodedParams = {};
	
	    for (var key in params) {
	      encodedParams[key] = encodeURIComponent(params[key]);
	    }
	
	    return state.interpolate(encodedParams);
	  }
	
	  /*
	  * Returns an object representing the current state of the router.
	  */
	  function getCurrent() {
	    return currentState && currentState.asPublic;
	  }
	
	  /*
	  * Returns an object representing the previous state of the router
	  * or null if the router is still in its initial state.
	  */
	  function getPrevious() {
	    return previousState && previousState.asPublic;
	  }
	
	  /*
	  * Returns the diff between the current params and the previous ones.
	  */
	  function getParamsDiff() {
	    return currentParamsDiff;
	  }
	
	  function allStatesRec(states, acc) {
	    acc.push.apply(acc, states);
	    states.forEach(function (state) {
	      return allStatesRec(state.children, acc);
	    });
	    return acc;
	  }
	
	  function allStates() {
	    return allStatesRec(util.objectToArray(states), []);
	  }
	
	  /*
	  * Returns the state object that was built with the given options object or that has the given fullName.
	  * Returns undefined if the state doesn't exist.
	  */
	  function findState(by) {
	    var filterFn = (typeof by === 'undefined' ? 'undefined' : _typeof(by)) === 'object' ? function (state) {
	      return by === state.options;
	    } : function (state) {
	      return by === state.fullName;
	    };
	
	    var state = allStates().filter(filterFn)[0];
	    return state && state.asPublic;
	  }
	
	  /*
	  * Returns whether the router is executing its first transition.
	  */
	  function isFirstTransition() {
	    return previousState == null;
	  }
	
	  /* Fluent API alias */
	  function on() {
	    router.transition.on.apply(router.transition, arguments);
	    return router;
	  }
	
	  function stateTrees(states) {
	    return util.mapValues(states, stateTree);
	  }
	
	  /*
	  * Creates an internal State object from a specification POJO.
	  */
	  function stateTree(state) {
	    if (state.children) state.children = stateTrees(state.children);
	    return State(state);
	  }
	
	  function logStateTree() {
	    if (!logger.enabled) return;
	
	    var indent = function indent(level) {
	      if (level == 0) return '';
	      return new Array(2 + (level - 1) * 4).join(' ') + '── ';
	    };
	
	    var stateTree = function stateTree(state) {
	      var path = util.normalizePathQuery(state.fullPath());
	      var pathStr = state.children.length == 0 ? ' (@ path)'.replace('path', path) : '';
	      var str = indent(state.parents.length) + state.name + pathStr + '\n';
	      return str + state.children.map(stateTree).join('');
	    };
	
	    var msg = '\nState tree\n\n';
	    msg += util.objectToArray(states).map(stateTree).join('');
	    msg += '\n';
	
	    logger.log(msg);
	  }
	
	  // Public methods
	
	  router.configure = configure;
	  router.init = init;
	  router.transitionTo = transitionTo;
	  router.backTo = backTo;
	  router.addState = addState;
	  router.link = link;
	  router.current = getCurrent;
	  router.previous = getPrevious;
	  router.findState = findState;
	  router.isFirstTransition = isFirstTransition;
	  router.paramsDiff = getParamsDiff;
	  router.options = options;
	
	  router.transition = new EventEmitter();
	  router.on = on;
	
	  // Used for testing purposes only
	  router.urlPathQuery = urlPathQuery;
	  router.terminate = terminate;
	
	  util.mergeObjects(api, router);
	
	  return router;
	}
	
	// Logging
	
	var logger = {
	  log: util.noop,
	  error: util.noop,
	  enabled: false
	};
	
	Router.enableLogs = function () {
	  logger.enabled = true;
	
	  logger.log = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var message = util.makeMessage.apply(null, args);
	    console.log(message);
	  };
	
	  logger.error = function () {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    var message = util.makeMessage.apply(null, args);
	    console.error(message);
	  };
	};
	
	module.exports = Router;

/***/ },
/* 22 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];
	
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	
	'use strict';
	
	var router;
	
	function onMouseDown(evt) {
	  var href = hrefForEvent(evt);
	
	  if (href !== undefined) router.transitionTo(href);
	}
	
	function onMouseClick(evt) {
	  var href = hrefForEvent(evt);
	
	  if (href !== undefined) {
	    evt.preventDefault();
	
	    router.transitionTo(href);
	  }
	}
	
	function hrefForEvent(evt) {
	  if (evt.defaultPrevented || evt.metaKey || evt.ctrlKey || !isLeftButton(evt)) return;
	
	  var target = evt.target;
	  var anchor = anchorTarget(target);
	  if (!anchor) return;
	
	  var dataNav = anchor.getAttribute('data-nav');
	
	  if (dataNav == 'ignore') return;
	  if (evt.type == 'mousedown' && dataNav != 'mousedown') return;
	
	  var href = anchor.getAttribute('href');
	
	  if (!href) return;
	  if (href.charAt(0) == '#') {
	    if (router.options.urlSync != 'hash') return;
	    href = href.slice(1);
	  }
	  if (anchor.getAttribute('target') == '_blank') return;
	  if (!isLocalLink(anchor)) return;
	
	  // At this point, we have a valid href to follow.
	  // Did the navigation already occur on mousedown though?
	  if (evt.type == 'click' && dataNav == 'mousedown') {
	    evt.preventDefault();
	    return;
	  }
	
	  return href;
	}
	
	function isLeftButton(evt) {
	  return evt.which == 1;
	}
	
	function anchorTarget(target) {
	  while (target) {
	    if (target.nodeName == 'A') return target;
	    target = target.parentNode;
	  }
	}
	
	function isLocalLink(anchor) {
	  var hostname = anchor.hostname;
	  var port = anchor.port;
	
	  // IE10 can lose the hostname/port property when setting a relative href from JS
	  if (!hostname) {
	    var tempAnchor = document.createElement("a");
	    tempAnchor.href = anchor.href;
	    hostname = tempAnchor.hostname;
	    port = tempAnchor.port;
	  }
	
	  var sameHostname = hostname == location.hostname;
	  var samePort = (port || '80') == (location.port || '80');
	
	  return sameHostname && samePort;
	}
	
	module.exports = function interceptAnchors(forRouter) {
	  router = forRouter;
	
	  document.addEventListener('mousedown', onMouseDown);
	  document.addEventListener('click', onMouseClick);
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	
	'use strict';
	
	/*
	* Creates a new StateWithParams instance.
	*
	* StateWithParams is the merge between a State object (created and added to the router before init)
	* and params (both path and query params, extracted from the URL after init)
	*
	* This is an internal model; The public model is the asPublic property.
	*/
	
	function StateWithParams(state, params, pathQuery) {
	  return {
	    state: state,
	    params: params,
	    toString: toString,
	    asPublic: makePublicAPI(state, params, pathQuery)
	  };
	}
	
	function makePublicAPI(state, params, pathQuery) {
	
	  /*
	  * Returns whether this state or any of its parents has the given fullName.
	  */
	  function isIn(fullStateName) {
	    var current = state;
	    while (current) {
	      if (current.fullName == fullStateName) return true;
	      current = current.parent;
	    }
	    return false;
	  }
	
	  return {
	    uri: pathQuery,
	    params: params,
	    name: state ? state.name : '',
	    fullName: state ? state.fullName : '',
	    data: state ? state.data : null,
	    isIn: isIn
	  };
	}
	
	function toString() {
	  var name = this.state && this.state.fullName;
	  return name + ':' + JSON.stringify(this.params);
	}
	
	module.exports = StateWithParams;

/***/ },
/* 25 */
/***/ function(module, exports) {

	
	'use strict';
	
	/*
	* Create a new Transition instance.
	*/
	
	function Transition(fromStateWithParams, toStateWithParams, paramsDiff, acc, router, logger) {
	  var root, enters, exits;
	
	  var fromState = fromStateWithParams && fromStateWithParams.state;
	  var toState = toStateWithParams.state;
	  var params = toStateWithParams.params;
	  var isUpdate = fromState == toState;
	
	  var transition = {
	    from: fromState,
	    to: toState,
	    toParams: params,
	    cancel: cancel,
	    cancelled: false,
	    currentState: fromState,
	    run: run
	  };
	
	  // The first transition has no fromState.
	  if (fromState) root = transitionRoot(fromState, toState, isUpdate, paramsDiff);
	
	  var inclusive = !root || isUpdate;
	  exits = fromState ? transitionStates(fromState, root, inclusive) : [];
	  enters = transitionStates(toState, root, inclusive).reverse();
	
	  function run() {
	    startTransition(enters, exits, params, transition, isUpdate, acc, router, logger);
	  }
	
	  function cancel() {
	    transition.cancelled = true;
	  }
	
	  return transition;
	}
	
	function startTransition(enters, exits, params, transition, isUpdate, acc, router, logger) {
	  acc = acc || {};
	
	  transition.exiting = true;
	  exits.forEach(function (state) {
	    if (isUpdate && state.update) return;
	    runStep(state, 'exit', params, transition, acc, router, logger);
	  });
	  transition.exiting = false;
	
	  enters.forEach(function (state) {
	    var fn = isUpdate && state.update ? 'update' : 'enter';
	    runStep(state, fn, params, transition, acc, router, logger);
	  });
	}
	
	function runStep(state, stepFn, params, transition, acc, router, logger) {
	  if (transition.cancelled) return;
	
	  if (logger.enabled) {
	    var capitalizedStep = stepFn[0].toUpperCase() + stepFn.slice(1);
	    logger.log(capitalizedStep + ' ' + state.fullName);
	  }
	
	  var result = state[stepFn](params, acc, router);
	
	  if (transition.cancelled) return;
	
	  transition.currentState = stepFn == 'exit' ? state.parent : state;
	
	  return result;
	}
	
	/*
	* The top-most current state's parent that must be exited.
	*/
	function transitionRoot(fromState, toState, isUpdate, paramsDiff) {
	  var root, parent, param;
	
	  // For a param-only change, the root is the top-most state owning the param(s),
	  if (isUpdate) {
	    [fromState].concat(fromState.parents).reverse().forEach(function (parent) {
	      if (root) return;
	
	      for (param in paramsDiff.all) {
	        if (parent.params[param] || parent.queryParams[param]) {
	          root = parent;
	          break;
	        }
	      }
	    });
	  }
	  // Else, the root is the closest common parent of the two states.
	  else {
	      for (var i = 0; i < fromState.parents.length; i++) {
	        parent = fromState.parents[i];
	        if (toState.parents.indexOf(parent) > -1) {
	          root = parent;
	          break;
	        }
	      }
	    }
	
	  return root;
	}
	
	function transitionStates(state, root, inclusive) {
	  root = root || state.root;
	
	  var p = state.parents,
	      end = Math.min(p.length, p.indexOf(root) + (inclusive ? 1 : 0));
	
	  return [state].concat(p.slice(0, end));
	}
	
	module.exports = Transition;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var util = __webpack_require__(20);
	
	var PARAMS = /:[^\\?\/]*/g;
	
	/*
	* Creates a new State instance from a {uri, enter, exit, update, data, children} object.
	* This is the internal representation of a state used by the router.
	*/
	function State(options) {
	  var state = { options: options },
	      states = options.children;
	
	  state.path = pathFromURI(options.uri);
	  state.params = paramsFromURI(options.uri);
	  state.queryParams = queryParamsFromURI(options.uri);
	  state.states = states;
	
	  state.enter = options.enter || util.noop;
	  state.update = options.update;
	  state.exit = options.exit || util.noop;
	
	  state.ownData = options.data || {};
	
	  /*
	  * Initialize and freeze this state.
	  */
	  function init(router, name, parent) {
	    state.router = router;
	    state.name = name;
	    state.isDefault = name == '_default_';
	    state.parent = parent;
	    state.parents = getParents();
	    state.root = state.parent ? state.parents[state.parents.length - 1] : state;
	    state.children = util.objectToArray(states);
	    state.fullName = getFullName();
	    state.asPublic = makePublicAPI();
	
	    eachChildState(function (name, childState) {
	      childState.init(router, name, state);
	    });
	  }
	
	  /*
	  * The full path, composed of all the individual paths of this state and its parents.
	  */
	  function fullPath() {
	    var result = state.path,
	        stateParent = state.parent;
	
	    while (stateParent) {
	      if (stateParent.path) result = stateParent.path + '/' + result;
	      stateParent = stateParent.parent;
	    }
	
	    return result;
	  }
	
	  /*
	  * The list of all parents, starting from the closest ones.
	  */
	  function getParents() {
	    var parents = [],
	        parent = state.parent;
	
	    while (parent) {
	      parents.push(parent);
	      parent = parent.parent;
	    }
	
	    return parents;
	  }
	
	  /*
	  * The fully qualified name of this state.
	  * e.g granparentName.parentName.name
	  */
	  function getFullName() {
	    var result = state.parents.reduceRight(function (acc, parent) {
	      return acc + parent.name + '.';
	    }, '') + state.name;
	
	    return state.isDefault ? result.replace('._default_', '') : result;
	  }
	
	  function allQueryParams() {
	    return state.parents.reduce(function (acc, parent) {
	      return util.mergeObjects(acc, parent.queryParams);
	    }, util.copyObject(state.queryParams));
	  }
	
	  /*
	  * Get or Set some arbitrary data by key on this state.
	  * child states have access to their parents' data.
	  *
	  * This can be useful when using external models/services
	  * as a mean to communicate between states is not desired.
	  */
	  function data(key, value) {
	    if (value !== undefined) {
	      state.ownData[key] = value;
	      return state;
	    }
	
	    var currentState = state;
	
	    while (currentState.ownData[key] === undefined && currentState.parent) {
	      currentState = currentState.parent;
	    }return currentState.ownData[key];
	  }
	
	  function makePublicAPI() {
	    return {
	      name: state.name,
	      fullName: state.fullName,
	      parent: state.parent && state.parent.asPublic,
	      data: data
	    };
	  }
	
	  function eachChildState(callback) {
	    for (var name in states) {
	      callback(name, states[name]);
	    }
	  }
	
	  /*
	  * Returns whether this state matches the passed path Array.
	  * In case of a match, the actual param values are returned.
	  */
	  function matches(paths) {
	    var params = {};
	    var nonRestStatePaths = state.paths.filter(function (p) {
	      return p[p.length - 1] != '*';
	    });
	
	    /* This state has more paths than the passed paths, it cannot be a match */
	    if (nonRestStatePaths.length > paths.length) return false;
	
	    /* Checks if the paths match one by one */
	    for (var i = 0; i < paths.length; i++) {
	      var path = paths[i];
	      var thatPath = state.paths[i];
	
	      /* This state has less paths than the passed paths, it cannot be a match */
	      if (!thatPath) return false;
	
	      var isRest = thatPath[thatPath.length - 1] == '*';
	      if (isRest) {
	        var name = paramName(thatPath);
	        params[name] = paths.slice(i).join('/');
	        return params;
	      }
	
	      var isDynamic = thatPath[0] == ':';
	      if (isDynamic) {
	        var name = paramName(thatPath);
	        params[name] = path;
	      } else if (thatPath != path) return false;
	    }
	
	    return params;
	  }
	
	  /*
	  * Returns a URI built from this state and the passed params.
	  */
	  function interpolate(params) {
	    var path = state.fullPath().replace(PARAMS, function (p) {
	      return params[paramName(p)] || '';
	    });
	
	    var queryParams = allQueryParams();
	    var passedQueryParams = Object.keys(params).filter(function (p) {
	      return queryParams[p];
	    });
	
	    var query = passedQueryParams.map(function (p) {
	      return p + '=' + params[p];
	    }).join('&');
	
	    return path + (query.length ? '?' + query : '');
	  }
	
	  function toString() {
	    return state.fullName;
	  }
	
	  state.init = init;
	  state.fullPath = fullPath;
	  state.allQueryParams = allQueryParams;
	  state.matches = matches;
	  state.interpolate = interpolate;
	  state.data = data;
	  state.toString = toString;
	
	  return state;
	}
	
	function paramName(param) {
	  return param[param.length - 1] == '*' ? param.substr(1).slice(0, -1) : param.substr(1);
	}
	
	function pathFromURI(uri) {
	  return (uri || '').split('?')[0];
	}
	
	function paramsFromURI(uri) {
	  var matches = PARAMS.exec(uri);
	  return matches ? util.arrayToObject(matches.map(paramName)) : {};
	}
	
	function queryParamsFromURI(uri) {
	  var query = (uri || '').split('?')[1];
	  return query ? util.arrayToObject(query.split('&')) : {};
	}
	
	module.exports = State;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	/* Represents the public API of the last instanciated router; Useful to break circular dependencies between router and its states */
	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var api = __webpack_require__(27);
	
	/* Wraps a thennable/promise and only resolve it if the router didn't transition to another state in the meantime */
	function async(wrapped) {
	  var PromiseImpl = async.Promise || Promise;
	  var fire = true;
	
	  api.transition.once('started', function () {
	    fire = false;
	  });
	
	  var promise = new PromiseImpl(function (resolve, reject) {
	    wrapped.then(function (value) {
	      if (fire) resolve(value);
	    }, function (err) {
	      if (fire) reject(err);
	    });
	  });
	
	  return promise;
	};
	
	module.exports = async;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var abyssa_1 = __webpack_require__(19);
	var dompteuse_1 = __webpack_require__(2);
	var action_1 = __webpack_require__(30);
	var index_1 = __webpack_require__(31);
	var blue_1 = __webpack_require__(36);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = dompteuse_1.component({
	    key: 'app',
	    pullState: pullState,
	    render: render
	});
	function pullState(state) {
	    return {
	        count: state.blue.count,
	        route: state.route.fullName
	    };
	}
	function render(options) {
	    var state = options.state;
	    return dompteuse_1.h('div', [
	        dompteuse_1.h('header', [
	            dompteuse_1.h('a', { attrs: { href: abyssa_1.api.link('app.index'), 'data-nav': 'mousedown' } }, 'Index'),
	            dompteuse_1.h('a', { attrs: { href: abyssa_1.api.link('app.blue', { id: 33 }), 'data-nav': 'mousedown' } }, 'Blue'),
	            String(state.count)
	        ]),
	        dompteuse_1.h('main', getChildren(state.route))
	    ]);
	}
	function getChildren(route) {
	    if (route === 'app.index')
	        return [index_1.default()];
	    if (route.indexOf('app.blue') === 0)
	        return [blue_1.default()];
	}
	setInterval(action_1.incrementBlue, 2500);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fluxx_1 = __webpack_require__(10);
	exports.incrementBlue = fluxx_1.Action('incrementBlue');
	exports.routeChanged = fluxx_1.Action('routeChanged');


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dompteuse_1 = __webpack_require__(2);
	var animation_1 = __webpack_require__(32);
	function default_1() {
	    return dompteuse_1.h('h1', { hook: animation_1.contentAnimation }, 'Index');
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var gsap_1 = __webpack_require__(33);
	var abyssa_1 = __webpack_require__(19);
	exports.contentAnimation = {
	    create: function (_, vnode) {
	        if (!vnode.elm || abyssa_1.api.isFirstTransition())
	            return;
	        vnode.elm.style.display = 'none';
	        gsap_1.TweenLite.fromTo(vnode.elm, 0.2, { css: { opacity: 0 } }, { css: { opacity: 1 }, delay: 0.22 }).eventCallback('onStart', function () { return vnode.elm.style.removeProperty('display'); });
	    },
	    remove: function (vnode, cb) {
	        if (!vnode.elm)
	            cb();
	        gsap_1.TweenLite.fromTo(vnode.elm, 0.2, { css: { opacity: 1 } }, { css: { opacity: 0 } }).eventCallback('onComplete', cb);
	    }
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*** IMPORTS FROM imports-loader ***/
	var define = false;
	__webpack_require__(34);
	__webpack_require__(35);
	exports.TweenLite = window.TweenLite;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	var define = false;
	
	/*!
	 * VERSION: 1.18.2
	 * DATE: 2015-12-22
	 * UPDATES AND DOCS AT: http://greensock.com
	 *
	 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
	 * This work is subject to the terms at http://greensock.com/standard-license or for
	 * Club GreenSock members, the software agreement that was issued with your membership.
	 * 
	 * @author: Jack Doyle, jack@greensock.com
	 */
	var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
	(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
	
		"use strict";
	
		_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin","TweenLite"], function(TweenPlugin, TweenLite) {
	
			/** @constructor **/
			var CSSPlugin = function() {
					TweenPlugin.call(this, "css");
					this._overwriteProps.length = 0;
					this.setRatio = CSSPlugin.prototype.setRatio; //speed optimization (avoid prototype lookup on this "hot" method)
				},
				_globals = _gsScope._gsDefine.globals,
				_hasPriority, //turns true whenever a CSSPropTween instance is created that has a priority other than 0. This helps us discern whether or not we should spend the time organizing the linked list or not after a CSSPlugin's _onInitTween() method is called.
				_suffixMap, //we set this in _onInitTween() each time as a way to have a persistent variable we can use in other methods like _parse() without having to pass it around as a parameter and we keep _parse() decoupled from a particular CSSPlugin instance
				_cs, //computed style (we store this in a shared variable to conserve memory and make minification tighter
				_overwriteProps, //alias to the currently instantiating CSSPlugin's _overwriteProps array. We use this closure in order to avoid having to pass a reference around from method to method and aid in minification.
				_specialProps = {},
				p = CSSPlugin.prototype = new TweenPlugin("css");
	
			p.constructor = CSSPlugin;
			CSSPlugin.version = "1.18.2";
			CSSPlugin.API = 2;
			CSSPlugin.defaultTransformPerspective = 0;
			CSSPlugin.defaultSkewType = "compensated";
			CSSPlugin.defaultSmoothOrigin = true;
			p = "px"; //we'll reuse the "p" variable to keep file size down
			CSSPlugin.suffixMap = {top:p, right:p, bottom:p, left:p, width:p, height:p, fontSize:p, padding:p, margin:p, perspective:p, lineHeight:""};
	
	
			var _numExp = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
				_relNumExp = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
				_valuesExp = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, //finds all the values that begin with numbers or += or -= and then a number. Includes suffixes. We use this to split complex values apart like "1px 5px 20px rgb(255,102,51)"
				_NaNExp = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, //also allows scientific notation and doesn't kill the leading -/+ in -= and +=
				_suffixExp = /(?:\d|\-|\+|=|#|\.)*/g,
				_opacityExp = /opacity *= *([^)]*)/i,
				_opacityValExp = /opacity:([^;]*)/i,
				_alphaFilterExp = /alpha\(opacity *=.+?\)/i,
				_rgbhslExp = /^(rgb|hsl)/,
				_capsExp = /([A-Z])/g,
				_camelExp = /-([a-z])/gi,
				_urlExp = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, //for pulling out urls from url(...) or url("...") strings (some browsers wrap urls in quotes, some don't when reporting things like backgroundImage)
				_camelFunc = function(s, g) { return g.toUpperCase(); },
				_horizExp = /(?:Left|Right|Width)/i,
				_ieGetMatrixExp = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
				_ieSetMatrixExp = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
				_commasOutsideParenExp = /,(?=[^\)]*(?:\(|$))/gi, //finds any commas that are not within parenthesis
				_DEG2RAD = Math.PI / 180,
				_RAD2DEG = 180 / Math.PI,
				_forcePT = {},
				_doc = document,
				_createElement = function(type) {
					return _doc.createElementNS ? _doc.createElementNS("http://www.w3.org/1999/xhtml", type) : _doc.createElement(type);
				},
				_tempDiv = _createElement("div"),
				_tempImg = _createElement("img"),
				_internals = CSSPlugin._internals = {_specialProps:_specialProps}, //provides a hook to a few internal methods that we need to access from inside other plugins
				_agent = navigator.userAgent,
				_autoRound,
				_reqSafariFix, //we won't apply the Safari transform fix until we actually come across a tween that affects a transform property (to maintain best performance).
	
				_isSafari,
				_isFirefox, //Firefox has a bug that causes 3D transformed elements to randomly disappear unless a repaint is forced after each update on each element.
				_isSafariLT6, //Safari (and Android 4 which uses a flavor of Safari) has a bug that prevents changes to "top" and "left" properties from rendering properly if changed on the same frame as a transform UNLESS we set the element's WebkitBackfaceVisibility to hidden (weird, I know). Doing this for Android 3 and earlier seems to actually cause other problems, though (fun!)
				_ieVers,
				_supportsOpacity = (function() { //we set _isSafari, _ieVers, _isFirefox, and _supportsOpacity all in one function here to reduce file size slightly, especially in the minified version.
					var i = _agent.indexOf("Android"),
						a = _createElement("a");
					_isSafari = (_agent.indexOf("Safari") !== -1 && _agent.indexOf("Chrome") === -1 && (i === -1 || Number(_agent.substr(i+8, 1)) > 3));
					_isSafariLT6 = (_isSafari && (Number(_agent.substr(_agent.indexOf("Version/")+8, 1)) < 6));
					_isFirefox = (_agent.indexOf("Firefox") !== -1);
					if ((/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(_agent) || (/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/).exec(_agent)) {
						_ieVers = parseFloat( RegExp.$1 );
					}
					if (!a) {
						return false;
					}
					a.style.cssText = "top:1px;opacity:.55;";
					return /^0.55/.test(a.style.opacity);
				}()),
				_getIEOpacity = function(v) {
					return (_opacityExp.test( ((typeof(v) === "string") ? v : (v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ) ? ( parseFloat( RegExp.$1 ) / 100 ) : 1);
				},
				_log = function(s) {//for logging messages, but in a way that won't throw errors in old versions of IE.
					if (window.console) {
						console.log(s);
					}
				},
	
				_prefixCSS = "", //the non-camelCase vendor prefix like "-o-", "-moz-", "-ms-", or "-webkit-"
				_prefix = "", //camelCase vendor prefix like "O", "ms", "Webkit", or "Moz".
	
				// @private feed in a camelCase property name like "transform" and it will check to see if it is valid as-is or if it needs a vendor prefix. It returns the corrected camelCase property name (i.e. "WebkitTransform" or "MozTransform" or "transform" or null if no such property is found, like if the browser is IE8 or before, "transform" won't be found at all)
				_checkPropPrefix = function(p, e) {
					e = e || _tempDiv;
					var s = e.style,
						a, i;
					if (s[p] !== undefined) {
						return p;
					}
					p = p.charAt(0).toUpperCase() + p.substr(1);
					a = ["O","Moz","ms","Ms","Webkit"];
					i = 5;
					while (--i > -1 && s[a[i]+p] === undefined) { }
					if (i >= 0) {
						_prefix = (i === 3) ? "ms" : a[i];
						_prefixCSS = "-" + _prefix.toLowerCase() + "-";
						return _prefix + p;
					}
					return null;
				},
	
				_getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function() {},
	
				/**
				 * @private Returns the css style for a particular property of an element. For example, to get whatever the current "left" css value for an element with an ID of "myElement", you could do:
				 * var currentLeft = CSSPlugin.getStyle( document.getElementById("myElement"), "left");
				 *
				 * @param {!Object} t Target element whose style property you want to query
				 * @param {!string} p Property name (like "left" or "top" or "marginTop", etc.)
				 * @param {Object=} cs Computed style object. This just provides a way to speed processing if you're going to get several properties on the same element in quick succession - you can reuse the result of the getComputedStyle() call.
				 * @param {boolean=} calc If true, the value will not be read directly from the element's "style" property (if it exists there), but instead the getComputedStyle() result will be used. This can be useful when you want to ensure that the browser itself is interpreting the value.
				 * @param {string=} dflt Default value that should be returned in the place of null, "none", "auto" or "auto auto".
				 * @return {?string} The current property value
				 */
				_getStyle = CSSPlugin.getStyle = function(t, p, cs, calc, dflt) {
					var rv;
					if (!_supportsOpacity) if (p === "opacity") { //several versions of IE don't use the standard "opacity" property - they use things like filter:alpha(opacity=50), so we parse that here.
						return _getIEOpacity(t);
					}
					if (!calc && t.style[p]) {
						rv = t.style[p];
					} else if ((cs = cs || _getComputedStyle(t))) {
						rv = cs[p] || cs.getPropertyValue(p) || cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
					} else if (t.currentStyle) {
						rv = t.currentStyle[p];
					}
					return (dflt != null && (!rv || rv === "none" || rv === "auto" || rv === "auto auto")) ? dflt : rv;
				},
	
				/**
				 * @private Pass the target element, the property name, the numeric value, and the suffix (like "%", "em", "px", etc.) and it will spit back the equivalent pixel number.
				 * @param {!Object} t Target element
				 * @param {!string} p Property name (like "left", "top", "marginLeft", etc.)
				 * @param {!number} v Value
				 * @param {string=} sfx Suffix (like "px" or "%" or "em")
				 * @param {boolean=} recurse If true, the call is a recursive one. In some browsers (like IE7/8), occasionally the value isn't accurately reported initially, but if we run the function again it will take effect.
				 * @return {number} value in pixels
				 */
				_convertToPixels = _internals.convertToPixels = function(t, p, v, sfx, recurse) {
					if (sfx === "px" || !sfx) { return v; }
					if (sfx === "auto" || !v) { return 0; }
					var horiz = _horizExp.test(p),
						node = t,
						style = _tempDiv.style,
						neg = (v < 0),
						pix, cache, time;
					if (neg) {
						v = -v;
					}
					if (sfx === "%" && p.indexOf("border") !== -1) {
						pix = (v / 100) * (horiz ? t.clientWidth : t.clientHeight);
					} else {
						style.cssText = "border:0 solid red;position:" + _getStyle(t, "position") + ";line-height:0;";
						if (sfx === "%" || !node.appendChild || sfx.charAt(0) === "v" || sfx === "rem") {
							node = t.parentNode || _doc.body;
							cache = node._gsCache;
							time = TweenLite.ticker.frame;
							if (cache && horiz && cache.time === time) { //performance optimization: we record the width of elements along with the ticker frame so that we can quickly get it again on the same tick (seems relatively safe to assume it wouldn't change on the same tick)
								return cache.width * v / 100;
							}
							style[(horiz ? "width" : "height")] = v + sfx;
						} else {
							style[(horiz ? "borderLeftWidth" : "borderTopWidth")] = v + sfx;
						}
						node.appendChild(_tempDiv);
						pix = parseFloat(_tempDiv[(horiz ? "offsetWidth" : "offsetHeight")]);
						node.removeChild(_tempDiv);
						if (horiz && sfx === "%" && CSSPlugin.cacheWidths !== false) {
							cache = node._gsCache = node._gsCache || {};
							cache.time = time;
							cache.width = pix / v * 100;
						}
						if (pix === 0 && !recurse) {
							pix = _convertToPixels(t, p, v, sfx, true);
						}
					}
					return neg ? -pix : pix;
				},
				_calculateOffset = _internals.calculateOffset = function(t, p, cs) { //for figuring out "top" or "left" in px when it's "auto". We need to factor in margin with the offsetLeft/offsetTop
					if (_getStyle(t, "position", cs) !== "absolute") { return 0; }
					var dim = ((p === "left") ? "Left" : "Top"),
						v = _getStyle(t, "margin" + dim, cs);
					return t["offset" + dim] - (_convertToPixels(t, p, parseFloat(v), v.replace(_suffixExp, "")) || 0);
				},
	
				// @private returns at object containing ALL of the style properties in camelCase and their associated values.
				_getAllStyles = function(t, cs) {
					var s = {},
						i, tr, p;
					if ((cs = cs || _getComputedStyle(t, null))) {
						if ((i = cs.length)) {
							while (--i > -1) {
								p = cs[i];
								if (p.indexOf("-transform") === -1 || _transformPropCSS === p) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
									s[p.replace(_camelExp, _camelFunc)] = cs.getPropertyValue(p);
								}
							}
						} else { //some browsers behave differently - cs.length is always 0, so we must do a for...in loop.
							for (i in cs) {
								if (i.indexOf("Transform") === -1 || _transformProp === i) { //Some webkit browsers duplicate transform values, one non-prefixed and one prefixed ("transform" and "WebkitTransform"), so we must weed out the extra one here.
									s[i] = cs[i];
								}
							}
						}
					} else if ((cs = t.currentStyle || t.style)) {
						for (i in cs) {
							if (typeof(i) === "string" && s[i] === undefined) {
								s[i.replace(_camelExp, _camelFunc)] = cs[i];
							}
						}
					}
					if (!_supportsOpacity) {
						s.opacity = _getIEOpacity(t);
					}
					tr = _getTransform(t, cs, false);
					s.rotation = tr.rotation;
					s.skewX = tr.skewX;
					s.scaleX = tr.scaleX;
					s.scaleY = tr.scaleY;
					s.x = tr.x;
					s.y = tr.y;
					if (_supports3D) {
						s.z = tr.z;
						s.rotationX = tr.rotationX;
						s.rotationY = tr.rotationY;
						s.scaleZ = tr.scaleZ;
					}
					if (s.filters) {
						delete s.filters;
					}
					return s;
				},
	
				// @private analyzes two style objects (as returned by _getAllStyles()) and only looks for differences between them that contain tweenable values (like a number or color). It returns an object with a "difs" property which refers to an object containing only those isolated properties and values for tweening, and a "firstMPT" property which refers to the first MiniPropTween instance in a linked list that recorded all the starting values of the different properties so that we can revert to them at the end or beginning of the tween - we don't want the cascading to get messed up. The forceLookup parameter is an optional generic object with properties that should be forced into the results - this is necessary for className tweens that are overwriting others because imagine a scenario where a rollover/rollout adds/removes a class and the user swipes the mouse over the target SUPER fast, thus nothing actually changed yet and the subsequent comparison of the properties would indicate they match (especially when px rounding is taken into consideration), thus no tweening is necessary even though it SHOULD tween and remove those properties after the tween (otherwise the inline styles will contaminate things). See the className SpecialProp code for details.
				_cssDif = function(t, s1, s2, vars, forceLookup) {
					var difs = {},
						style = t.style,
						val, p, mpt;
					for (p in s2) {
						if (p !== "cssText") if (p !== "length") if (isNaN(p)) if (s1[p] !== (val = s2[p]) || (forceLookup && forceLookup[p])) if (p.indexOf("Origin") === -1) if (typeof(val) === "number" || typeof(val) === "string") {
							difs[p] = (val === "auto" && (p === "left" || p === "top")) ? _calculateOffset(t, p) : ((val === "" || val === "auto" || val === "none") && typeof(s1[p]) === "string" && s1[p].replace(_NaNExp, "") !== "") ? 0 : val; //if the ending value is defaulting ("" or "auto"), we check the starting value and if it can be parsed into a number (a string which could have a suffix too, like 700px), then we swap in 0 for "" or "auto" so that things actually tween.
							if (style[p] !== undefined) { //for className tweens, we must remember which properties already existed inline - the ones that didn't should be removed when the tween isn't in progress because they were only introduced to facilitate the transition between classes.
								mpt = new MiniPropTween(style, p, style[p], mpt);
							}
						}
					}
					if (vars) {
						for (p in vars) { //copy properties (except className)
							if (p !== "className") {
								difs[p] = vars[p];
							}
						}
					}
					return {difs:difs, firstMPT:mpt};
				},
				_dimensions = {width:["Left","Right"], height:["Top","Bottom"]},
				_margins = ["marginLeft","marginRight","marginTop","marginBottom"],
	
				/**
				 * @private Gets the width or height of an element
				 * @param {!Object} t Target element
				 * @param {!string} p Property name ("width" or "height")
				 * @param {Object=} cs Computed style object (if one exists). Just a speed optimization.
				 * @return {number} Dimension (in pixels)
				 */
				_getDimension = function(t, p, cs) {
					var v = parseFloat((p === "width") ? t.offsetWidth : t.offsetHeight),
						a = _dimensions[p],
						i = a.length;
					cs = cs || _getComputedStyle(t, null);
					while (--i > -1) {
						v -= parseFloat( _getStyle(t, "padding" + a[i], cs, true) ) || 0;
						v -= parseFloat( _getStyle(t, "border" + a[i] + "Width", cs, true) ) || 0;
					}
					return v;
				},
	
				// @private Parses position-related complex strings like "top left" or "50px 10px" or "70% 20%", etc. which are used for things like transformOrigin or backgroundPosition. Optionally decorates a supplied object (recObj) with the following properties: "ox" (offsetX), "oy" (offsetY), "oxp" (if true, "ox" is a percentage not a pixel value), and "oxy" (if true, "oy" is a percentage not a pixel value)
				_parsePosition = function(v, recObj) {
					if (v === "contain" || v === "auto" || v === "auto auto") {
						return v + " ";
					}
					if (v == null || v === "") { //note: Firefox uses "auto auto" as default whereas Chrome uses "auto".
						v = "0 0";
					}
					var a = v.split(" "),
						x = (v.indexOf("left") !== -1) ? "0%" : (v.indexOf("right") !== -1) ? "100%" : a[0],
						y = (v.indexOf("top") !== -1) ? "0%" : (v.indexOf("bottom") !== -1) ? "100%" : a[1];
					if (y == null) {
						y = (x === "center") ? "50%" : "0";
					} else if (y === "center") {
						y = "50%";
					}
					if (x === "center" || (isNaN(parseFloat(x)) && (x + "").indexOf("=") === -1)) { //remember, the user could flip-flop the values and say "bottom center" or "center bottom", etc. "center" is ambiguous because it could be used to describe horizontal or vertical, hence the isNaN(). If there's an "=" sign in the value, it's relative.
						x = "50%";
					}
					v = x + " " + y + ((a.length > 2) ? " " + a[2] : "");
					if (recObj) {
						recObj.oxp = (x.indexOf("%") !== -1);
						recObj.oyp = (y.indexOf("%") !== -1);
						recObj.oxr = (x.charAt(1) === "=");
						recObj.oyr = (y.charAt(1) === "=");
						recObj.ox = parseFloat(x.replace(_NaNExp, ""));
						recObj.oy = parseFloat(y.replace(_NaNExp, ""));
						recObj.v = v;
					}
					return recObj || v;
				},
	
				/**
				 * @private Takes an ending value (typically a string, but can be a number) and a starting value and returns the change between the two, looking for relative value indicators like += and -= and it also ignores suffixes (but make sure the ending value starts with a number or +=/-= and that the starting value is a NUMBER!)
				 * @param {(number|string)} e End value which is typically a string, but could be a number
				 * @param {(number|string)} b Beginning value which is typically a string but could be a number
				 * @return {number} Amount of change between the beginning and ending values (relative values that have a "+=" or "-=" are recognized)
				 */
				_parseChange = function(e, b) {
					return (typeof(e) === "string" && e.charAt(1) === "=") ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(b);
				},
	
				/**
				 * @private Takes a value and a default number, checks if the value is relative, null, or numeric and spits back a normalized number accordingly. Primarily used in the _parseTransform() function.
				 * @param {Object} v Value to be parsed
				 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
				 * @return {number} Parsed value
				 */
				_parseVal = function(v, d) {
					return (v == null) ? d : (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * parseFloat(v.substr(2)) + d : parseFloat(v);
				},
	
				/**
				 * @private Translates strings like "40deg" or "40" or 40rad" or "+=40deg" or "270_short" or "-90_cw" or "+=45_ccw" to a numeric radian angle. Of course a starting/default value must be fed in too so that relative values can be calculated properly.
				 * @param {Object} v Value to be parsed
				 * @param {!number} d Default value (which is also used for relative calculations if "+=" or "-=" is found in the first parameter)
				 * @param {string=} p property name for directionalEnd (optional - only used when the parsed value is directional ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation). Property name would be "rotation", "rotationX", or "rotationY"
				 * @param {Object=} directionalEnd An object that will store the raw end values for directional angles ("_short", "_cw", or "_ccw" suffix). We need a way to store the uncompensated value so that at the end of the tween, we set it to exactly what was requested with no directional compensation.
				 * @return {number} parsed angle in radians
				 */
				_parseAngle = function(v, d, p, directionalEnd) {
					var min = 0.000001,
						cap, split, dif, result, isRelative;
					if (v == null) {
						result = d;
					} else if (typeof(v) === "number") {
						result = v;
					} else {
						cap = 360;
						split = v.split("_");
						isRelative = (v.charAt(1) === "=");
						dif = (isRelative ? parseInt(v.charAt(0) + "1", 10) * parseFloat(split[0].substr(2)) : parseFloat(split[0])) * ((v.indexOf("rad") === -1) ? 1 : _RAD2DEG) - (isRelative ? 0 : d);
						if (split.length) {
							if (directionalEnd) {
								directionalEnd[p] = d + dif;
							}
							if (v.indexOf("short") !== -1) {
								dif = dif % cap;
								if (dif !== dif % (cap / 2)) {
									dif = (dif < 0) ? dif + cap : dif - cap;
								}
							}
							if (v.indexOf("_cw") !== -1 && dif < 0) {
								dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
							} else if (v.indexOf("ccw") !== -1 && dif > 0) {
								dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;
							}
						}
						result = d + dif;
					}
					if (result < min && result > -min) {
						result = 0;
					}
					return result;
				},
	
				_colorLookup = {aqua:[0,255,255],
					lime:[0,255,0],
					silver:[192,192,192],
					black:[0,0,0],
					maroon:[128,0,0],
					teal:[0,128,128],
					blue:[0,0,255],
					navy:[0,0,128],
					white:[255,255,255],
					fuchsia:[255,0,255],
					olive:[128,128,0],
					yellow:[255,255,0],
					orange:[255,165,0],
					gray:[128,128,128],
					purple:[128,0,128],
					green:[0,128,0],
					red:[255,0,0],
					pink:[255,192,203],
					cyan:[0,255,255],
					transparent:[255,255,255,0]},
	
				_hue = function(h, m1, m2) {
					h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;
					return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
				},
	
				/**
				 * @private Parses a color (like #9F0, #FF9900, rgb(255,51,153) or hsl(108, 50%, 10%)) into an array with 3 elements for red, green, and blue or if toHSL parameter is true, it will populate the array with hue, saturation, and lightness values. If a relative value is found in an hsl() or hsla() string, it will preserve those relative prefixes and all the values in the array will be strings instead of numbers (in all other cases it will be populated with numbers).
				 * @param {(string|number)} v The value the should be parsed which could be a string like #9F0 or rgb(255,102,51) or rgba(255,0,0,0.5) or it could be a number like 0xFF00CC or even a named color like red, blue, purple, etc.
				 * @param {(boolean)} toHSL If true, an hsl() or hsla() value will be returned instead of rgb() or rgba()
				 * @return {Array.<number>} An array containing red, green, and blue (and optionally alpha) in that order, or if the toHSL parameter was true, the array will contain hue, saturation and lightness (and optionally alpha) in that order. Always numbers unless there's a relative prefix found in an hsl() or hsla() string and toHSL is true.
				 */
				_parseColor = CSSPlugin.parseColor = function(v, toHSL) {
					var a, r, g, b, h, s, l, max, min, d, wasHSL;
					if (!v) {
						a = _colorLookup.black;
					} else if (typeof(v) === "number") {
						a = [v >> 16, (v >> 8) & 255, v & 255];
					} else {
						if (v.charAt(v.length - 1) === ",") { //sometimes a trailing comma is included and we should chop it off (typically from a comma-delimited list of values like a textShadow:"2px 2px 2px blue, 5px 5px 5px rgb(255,0,0)" - in this example "blue," has a trailing comma. We could strip it out inside parseComplex() but we'd need to do it to the beginning and ending values plus it wouldn't provide protection from other potential scenarios like if the user passes in a similar value.
							v = v.substr(0, v.length - 1);
						}
						if (_colorLookup[v]) {
							a = _colorLookup[v];
						} else if (v.charAt(0) === "#") {
							if (v.length === 4) { //for shorthand like #9F0
								r = v.charAt(1);
								g = v.charAt(2);
								b = v.charAt(3);
								v = "#" + r + r + g + g + b + b;
							}
							v = parseInt(v.substr(1), 16);
							a = [v >> 16, (v >> 8) & 255, v & 255];
						} else if (v.substr(0, 3) === "hsl") {
							a = wasHSL = v.match(_numExp);
							if (!toHSL) {
								h = (Number(a[0]) % 360) / 360;
								s = Number(a[1]) / 100;
								l = Number(a[2]) / 100;
								g = (l <= 0.5) ? l * (s + 1) : l + s - l * s;
								r = l * 2 - g;
								if (a.length > 3) {
									a[3] = Number(v[3]);
								}
								a[0] = _hue(h + 1 / 3, r, g);
								a[1] = _hue(h, r, g);
								a[2] = _hue(h - 1 / 3, r, g);
							} else if (v.indexOf("=") !== -1) { //if relative values are found, just return the raw strings with the relative prefixes in place.
								return v.match(_relNumExp);
							}
						} else {
							a = v.match(_numExp) || _colorLookup.transparent;
						}
						a[0] = Number(a[0]);
						a[1] = Number(a[1]);
						a[2] = Number(a[2]);
						if (a.length > 3) {
							a[3] = Number(a[3]);
						}
					}
					if (toHSL && !wasHSL) {
						r = a[0] / 255;
						g = a[1] / 255;
						b = a[2] / 255;
						max = Math.max(r, g, b);
						min = Math.min(r, g, b);
						l = (max + min) / 2;
						if (max === min) {
							h = s = 0;
						} else {
							d = max - min;
							s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
							h = (max === r) ? (g - b) / d + (g < b ? 6 : 0) : (max === g) ? (b - r) / d + 2 : (r - g) / d + 4;
							h *= 60;
						}
						a[0] = (h + 0.5) | 0;
						a[1] = (s * 100 + 0.5) | 0;
						a[2] = (l * 100 + 0.5) | 0;
					}
					return a;
				},
				_formatColors = function(s, toHSL) {
					var colors = s.match(_colorExp) || [],
						charIndex = 0,
						parsed = colors.length ? "" : s,
						i, color, temp;
					for (i = 0; i < colors.length; i++) {
						color = colors[i];
						temp = s.substr(charIndex, s.indexOf(color, charIndex)-charIndex);
						charIndex += temp.length + color.length;
						color = _parseColor(color, toHSL);
						if (color.length === 3) {
							color.push(1);
						}
						parsed += temp + (toHSL ? "hsla(" + color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : "rgba(" + color.join(",")) + ")";
					}
					return parsed;
				},
				_colorExp = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b"; //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.
	
			for (p in _colorLookup) {
				_colorExp += "|" + p + "\\b";
			}
			_colorExp = new RegExp(_colorExp+")", "gi");
	
			CSSPlugin.colorStringFilter = function(a) {
				var combined = a[0] + a[1],
					toHSL;
				_colorExp.lastIndex = 0;
				if (_colorExp.test(combined)) {
					toHSL = (combined.indexOf("hsl(") !== -1 || combined.indexOf("hsla(") !== -1);
					a[0] = _formatColors(a[0], toHSL);
					a[1] = _formatColors(a[1], toHSL);
				}
			};
	
			if (!TweenLite.defaultStringFilter) {
				TweenLite.defaultStringFilter = CSSPlugin.colorStringFilter;
			}
	
			/**
			 * @private Returns a formatter function that handles taking a string (or number in some cases) and returning a consistently formatted one in terms of delimiters, quantity of values, etc. For example, we may get boxShadow values defined as "0px red" or "0px 0px 10px rgb(255,0,0)" or "0px 0px 20px 20px #F00" and we need to ensure that what we get back is described with 4 numbers and a color. This allows us to feed it into the _parseComplex() method and split the values up appropriately. The neat thing about this _getFormatter() function is that the dflt defines a pattern as well as a default, so for example, _getFormatter("0px 0px 0px 0px #777", true) not only sets the default as 0px for all distances and #777 for the color, but also sets the pattern such that 4 numbers and a color will always get returned.
			 * @param {!string} dflt The default value and pattern to follow. So "0px 0px 0px 0px #777" will ensure that 4 numbers and a color will always get returned.
			 * @param {boolean=} clr If true, the values should be searched for color-related data. For example, boxShadow values typically contain a color whereas borderRadius don't.
			 * @param {boolean=} collapsible If true, the value is a top/left/right/bottom style one that acts like margin or padding, where if only one value is received, it's used for all 4; if 2 are received, the first is duplicated for 3rd (bottom) and the 2nd is duplicated for the 4th spot (left), etc.
			 * @return {Function} formatter function
			 */
			var _getFormatter = function(dflt, clr, collapsible, multi) {
					if (dflt == null) {
						return function(v) {return v;};
					}
					var dColor = clr ? (dflt.match(_colorExp) || [""])[0] : "",
						dVals = dflt.split(dColor).join("").match(_valuesExp) || [],
						pfx = dflt.substr(0, dflt.indexOf(dVals[0])),
						sfx = (dflt.charAt(dflt.length - 1) === ")") ? ")" : "",
						delim = (dflt.indexOf(" ") !== -1) ? " " : ",",
						numVals = dVals.length,
						dSfx = (numVals > 0) ? dVals[0].replace(_numExp, "") : "",
						formatter;
					if (!numVals) {
						return function(v) {return v;};
					}
					if (clr) {
						formatter = function(v) {
							var color, vals, i, a;
							if (typeof(v) === "number") {
								v += dSfx;
							} else if (multi && _commasOutsideParenExp.test(v)) {
								a = v.replace(_commasOutsideParenExp, "|").split("|");
								for (i = 0; i < a.length; i++) {
									a[i] = formatter(a[i]);
								}
								return a.join(",");
							}
							color = (v.match(_colorExp) || [dColor])[0];
							vals = v.split(color).join("").match(_valuesExp) || [];
							i = vals.length;
							if (numVals > i--) {
								while (++i < numVals) {
									vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
								}
							}
							return pfx + vals.join(delim) + delim + color + sfx + (v.indexOf("inset") !== -1 ? " inset" : "");
						};
						return formatter;
	
					}
					formatter = function(v) {
						var vals, a, i;
						if (typeof(v) === "number") {
							v += dSfx;
						} else if (multi && _commasOutsideParenExp.test(v)) {
							a = v.replace(_commasOutsideParenExp, "|").split("|");
							for (i = 0; i < a.length; i++) {
								a[i] = formatter(a[i]);
							}
							return a.join(",");
						}
						vals = v.match(_valuesExp) || [];
						i = vals.length;
						if (numVals > i--) {
							while (++i < numVals) {
								vals[i] = collapsible ? vals[(((i - 1) / 2) | 0)] : dVals[i];
							}
						}
						return pfx + vals.join(delim) + sfx;
					};
					return formatter;
				},
	
				/**
				 * @private returns a formatter function that's used for edge-related values like marginTop, marginLeft, paddingBottom, paddingRight, etc. Just pass a comma-delimited list of property names related to the edges.
				 * @param {!string} props a comma-delimited list of property names in order from top to left, like "marginTop,marginRight,marginBottom,marginLeft"
				 * @return {Function} a formatter function
				 */
				_getEdgeParser = function(props) {
					props = props.split(",");
					return function(t, e, p, cssp, pt, plugin, vars) {
						var a = (e + "").split(" "),
							i;
						vars = {};
						for (i = 0; i < 4; i++) {
							vars[props[i]] = a[i] = a[i] || a[(((i - 1) / 2) >> 0)];
						}
						return cssp.parse(t, vars, pt, plugin);
					};
				},
	
				// @private used when other plugins must tween values first, like BezierPlugin or ThrowPropsPlugin, etc. That plugin's setRatio() gets called first so that the values are updated, and then we loop through the MiniPropTweens  which handle copying the values into their appropriate slots so that they can then be applied correctly in the main CSSPlugin setRatio() method. Remember, we typically create a proxy object that has a bunch of uniquely-named properties that we feed to the sub-plugin and it does its magic normally, and then we must interpret those values and apply them to the css because often numbers must get combined/concatenated, suffixes added, etc. to work with css, like boxShadow could have 4 values plus a color.
				_setPluginRatio = _internals._setPluginRatio = function(v) {
					this.plugin.setRatio(v);
					var d = this.data,
						proxy = d.proxy,
						mpt = d.firstMPT,
						min = 0.000001,
						val, pt, i, str, p;
					while (mpt) {
						val = proxy[mpt.v];
						if (mpt.r) {
							val = Math.round(val);
						} else if (val < min && val > -min) {
							val = 0;
						}
						mpt.t[mpt.p] = val;
						mpt = mpt._next;
					}
					if (d.autoRotate) {
						d.autoRotate.rotation = proxy.rotation;
					}
					//at the end, we must set the CSSPropTween's "e" (end) value dynamically here because that's what is used in the final setRatio() method. Same for "b" at the beginning.
					if (v === 1 || v === 0) {
						mpt = d.firstMPT;
						p = (v === 1) ? "e" : "b";
						while (mpt) {
							pt = mpt.t;
							if (!pt.type) {
								pt[p] = pt.s + pt.xs0;
							} else if (pt.type === 1) {
								str = pt.xs0 + pt.s + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt[p] = str;
							}
							mpt = mpt._next;
						}
					}
				},
	
				/**
				 * @private @constructor Used by a few SpecialProps to hold important values for proxies. For example, _parseToProxy() creates a MiniPropTween instance for each property that must get tweened on the proxy, and we record the original property name as well as the unique one we create for the proxy, plus whether or not the value needs to be rounded plus the original value.
				 * @param {!Object} t target object whose property we're tweening (often a CSSPropTween)
				 * @param {!string} p property name
				 * @param {(number|string|object)} v value
				 * @param {MiniPropTween=} next next MiniPropTween in the linked list
				 * @param {boolean=} r if true, the tweened value should be rounded to the nearest integer
				 */
				MiniPropTween = function(t, p, v, next, r) {
					this.t = t;
					this.p = p;
					this.v = v;
					this.r = r;
					if (next) {
						next._prev = this;
						this._next = next;
					}
				},
	
				/**
				 * @private Most other plugins (like BezierPlugin and ThrowPropsPlugin and others) can only tween numeric values, but CSSPlugin must accommodate special values that have a bunch of extra data (like a suffix or strings between numeric values, etc.). For example, boxShadow has values like "10px 10px 20px 30px rgb(255,0,0)" which would utterly confuse other plugins. This method allows us to split that data apart and grab only the numeric data and attach it to uniquely-named properties of a generic proxy object ({}) so that we can feed that to virtually any plugin to have the numbers tweened. However, we must also keep track of which properties from the proxy go with which CSSPropTween values and instances. So we create a linked list of MiniPropTweens. Each one records a target (the original CSSPropTween), property (like "s" or "xn1" or "xn2") that we're tweening and the unique property name that was used for the proxy (like "boxShadow_xn1" and "boxShadow_xn2") and whether or not they need to be rounded. That way, in the _setPluginRatio() method we can simply copy the values over from the proxy to the CSSPropTween instance(s). Then, when the main CSSPlugin setRatio() method runs and applies the CSSPropTween values accordingly, they're updated nicely. So the external plugin tweens the numbers, _setPluginRatio() copies them over, and setRatio() acts normally, applying css-specific values to the element.
				 * This method returns an object that has the following properties:
				 *  - proxy: a generic object containing the starting values for all the properties that will be tweened by the external plugin.  This is what we feed to the external _onInitTween() as the target
				 *  - end: a generic object containing the ending values for all the properties that will be tweened by the external plugin. This is what we feed to the external plugin's _onInitTween() as the destination values
				 *  - firstMPT: the first MiniPropTween in the linked list
				 *  - pt: the first CSSPropTween in the linked list that was created when parsing. If shallow is true, this linked list will NOT attach to the one passed into the _parseToProxy() as the "pt" (4th) parameter.
				 * @param {!Object} t target object to be tweened
				 * @param {!(Object|string)} vars the object containing the information about the tweening values (typically the end/destination values) that should be parsed
				 * @param {!CSSPlugin} cssp The CSSPlugin instance
				 * @param {CSSPropTween=} pt the next CSSPropTween in the linked list
				 * @param {TweenPlugin=} plugin the external TweenPlugin instance that will be handling tweening the numeric values
				 * @param {boolean=} shallow if true, the resulting linked list from the parse will NOT be attached to the CSSPropTween that was passed in as the "pt" (4th) parameter.
				 * @return An object containing the following properties: proxy, end, firstMPT, and pt (see above for descriptions)
				 */
				_parseToProxy = _internals._parseToProxy = function(t, vars, cssp, pt, plugin, shallow) {
					var bpt = pt,
						start = {},
						end = {},
						transform = cssp._transform,
						oldForce = _forcePT,
						i, p, xp, mpt, firstPT;
					cssp._transform = null;
					_forcePT = vars;
					pt = firstPT = cssp.parse(t, vars, pt, plugin);
					_forcePT = oldForce;
					//break off from the linked list so the new ones are isolated.
					if (shallow) {
						cssp._transform = transform;
						if (bpt) {
							bpt._prev = null;
							if (bpt._prev) {
								bpt._prev._next = null;
							}
						}
					}
					while (pt && pt !== bpt) {
						if (pt.type <= 1) {
							p = pt.p;
							end[p] = pt.s + pt.c;
							start[p] = pt.s;
							if (!shallow) {
								mpt = new MiniPropTween(pt, "s", p, mpt, pt.r);
								pt.c = 0;
							}
							if (pt.type === 1) {
								i = pt.l;
								while (--i > 0) {
									xp = "xn" + i;
									p = pt.p + "_" + xp;
									end[p] = pt.data[xp];
									start[p] = pt[xp];
									if (!shallow) {
										mpt = new MiniPropTween(pt, xp, p, mpt, pt.rxp[xp]);
									}
								}
							}
						}
						pt = pt._next;
					}
					return {proxy:start, end:end, firstMPT:mpt, pt:firstPT};
				},
	
	
	
				/**
				 * @constructor Each property that is tweened has at least one CSSPropTween associated with it. These instances store important information like the target, property, starting value, amount of change, etc. They can also optionally have a number of "extra" strings and numeric values named xs1, xn1, xs2, xn2, xs3, xn3, etc. where "s" indicates string and "n" indicates number. These can be pieced together in a complex-value tween (type:1) that has alternating types of data like a string, number, string, number, etc. For example, boxShadow could be "5px 5px 8px rgb(102, 102, 51)". In that value, there are 6 numbers that may need to tween and then pieced back together into a string again with spaces, suffixes, etc. xs0 is special in that it stores the suffix for standard (type:0) tweens, -OR- the first string (prefix) in a complex-value (type:1) CSSPropTween -OR- it can be the non-tweening value in a type:-1 CSSPropTween. We do this to conserve memory.
				 * CSSPropTweens have the following optional properties as well (not defined through the constructor):
				 *  - l: Length in terms of the number of extra properties that the CSSPropTween has (default: 0). For example, for a boxShadow we may need to tween 5 numbers in which case l would be 5; Keep in mind that the start/end values for the first number that's tweened are always stored in the s and c properties to conserve memory. All additional values thereafter are stored in xn1, xn2, etc.
				 *  - xfirst: The first instance of any sub-CSSPropTweens that are tweening properties of this instance. For example, we may split up a boxShadow tween so that there's a main CSSPropTween of type:1 that has various xs* and xn* values associated with the h-shadow, v-shadow, blur, color, etc. Then we spawn a CSSPropTween for each of those that has a higher priority and runs BEFORE the main CSSPropTween so that the values are all set by the time it needs to re-assemble them. The xfirst gives us an easy way to identify the first one in that chain which typically ends at the main one (because they're all prepende to the linked list)
				 *  - plugin: The TweenPlugin instance that will handle the tweening of any complex values. For example, sometimes we don't want to use normal subtweens (like xfirst refers to) to tween the values - we might want ThrowPropsPlugin or BezierPlugin some other plugin to do the actual tweening, so we create a plugin instance and store a reference here. We need this reference so that if we get a request to round values or disable a tween, we can pass along that request.
				 *  - data: Arbitrary data that needs to be stored with the CSSPropTween. Typically if we're going to have a plugin handle the tweening of a complex-value tween, we create a generic object that stores the END values that we're tweening to and the CSSPropTween's xs1, xs2, etc. have the starting values. We store that object as data. That way, we can simply pass that object to the plugin and use the CSSPropTween as the target.
				 *  - setRatio: Only used for type:2 tweens that require custom functionality. In this case, we call the CSSPropTween's setRatio() method and pass the ratio each time the tween updates. This isn't quite as efficient as doing things directly in the CSSPlugin's setRatio() method, but it's very convenient and flexible.
				 * @param {!Object} t Target object whose property will be tweened. Often a DOM element, but not always. It could be anything.
				 * @param {string} p Property to tween (name). For example, to tween element.width, p would be "width".
				 * @param {number} s Starting numeric value
				 * @param {number} c Change in numeric value over the course of the entire tween. For example, if element.width starts at 5 and should end at 100, c would be 95.
				 * @param {CSSPropTween=} next The next CSSPropTween in the linked list. If one is defined, we will define its _prev as the new instance, and the new instance's _next will be pointed at it.
				 * @param {number=} type The type of CSSPropTween where -1 = a non-tweening value, 0 = a standard simple tween, 1 = a complex value (like one that has multiple numbers in a comma- or space-delimited string like border:"1px solid red"), and 2 = one that uses a custom setRatio function that does all of the work of applying the values on each update.
				 * @param {string=} n Name of the property that should be used for overwriting purposes which is typically the same as p but not always. For example, we may need to create a subtween for the 2nd part of a "clip:rect(...)" tween in which case "p" might be xs1 but "n" is still "clip"
				 * @param {boolean=} r If true, the value(s) should be rounded
				 * @param {number=} pr Priority in the linked list order. Higher priority CSSPropTweens will be updated before lower priority ones. The default priority is 0.
				 * @param {string=} b Beginning value. We store this to ensure that it is EXACTLY what it was when the tween began without any risk of interpretation issues.
				 * @param {string=} e Ending value. We store this to ensure that it is EXACTLY what the user defined at the end of the tween without any risk of interpretation issues.
				 */
				CSSPropTween = _internals.CSSPropTween = function(t, p, s, c, next, type, n, r, pr, b, e) {
					this.t = t; //target
					this.p = p; //property
					this.s = s; //starting value
					this.c = c; //change value
					this.n = n || p; //name that this CSSPropTween should be associated to (usually the same as p, but not always - n is what overwriting looks at)
					if (!(t instanceof CSSPropTween)) {
						_overwriteProps.push(this.n);
					}
					this.r = r; //round (boolean)
					this.type = type || 0; //0 = normal tween, -1 = non-tweening (in which case xs0 will be applied to the target's property, like tp.t[tp.p] = tp.xs0), 1 = complex-value SpecialProp, 2 = custom setRatio() that does all the work
					if (pr) {
						this.pr = pr;
						_hasPriority = true;
					}
					this.b = (b === undefined) ? s : b;
					this.e = (e === undefined) ? s + c : e;
					if (next) {
						this._next = next;
						next._prev = this;
					}
				},
	
				_addNonTweeningNumericPT = function(target, prop, start, end, next, overwriteProp) { //cleans up some code redundancies and helps minification. Just a fast way to add a NUMERIC non-tweening CSSPropTween
					var pt = new CSSPropTween(target, prop, start, end - start, next, -1, overwriteProp);
					pt.b = start;
					pt.e = pt.xs0 = end;
					return pt;
				},
	
				/**
				 * Takes a target, the beginning value and ending value (as strings) and parses them into a CSSPropTween (possibly with child CSSPropTweens) that accommodates multiple numbers, colors, comma-delimited values, etc. For example:
				 * sp.parseComplex(element, "boxShadow", "5px 10px 20px rgb(255,102,51)", "0px 0px 0px red", true, "0px 0px 0px rgb(0,0,0,0)", pt);
				 * It will walk through the beginning and ending values (which should be in the same format with the same number and type of values) and figure out which parts are numbers, what strings separate the numeric/tweenable values, and then create the CSSPropTweens accordingly. If a plugin is defined, no child CSSPropTweens will be created. Instead, the ending values will be stored in the "data" property of the returned CSSPropTween like: {s:-5, xn1:-10, xn2:-20, xn3:255, xn4:0, xn5:0} so that it can be fed to any other plugin and it'll be plain numeric tweens but the recomposition of the complex value will be handled inside CSSPlugin's setRatio().
				 * If a setRatio is defined, the type of the CSSPropTween will be set to 2 and recomposition of the values will be the responsibility of that method.
				 *
				 * @param {!Object} t Target whose property will be tweened
				 * @param {!string} p Property that will be tweened (its name, like "left" or "backgroundColor" or "boxShadow")
				 * @param {string} b Beginning value
				 * @param {string} e Ending value
				 * @param {boolean} clrs If true, the value could contain a color value like "rgb(255,0,0)" or "#F00" or "red". The default is false, so no colors will be recognized (a performance optimization)
				 * @param {(string|number|Object)} dflt The default beginning value that should be used if no valid beginning value is defined or if the number of values inside the complex beginning and ending values don't match
				 * @param {?CSSPropTween} pt CSSPropTween instance that is the current head of the linked list (we'll prepend to this).
				 * @param {number=} pr Priority in the linked list order. Higher priority properties will be updated before lower priority ones. The default priority is 0.
				 * @param {TweenPlugin=} plugin If a plugin should handle the tweening of extra properties, pass the plugin instance here. If one is defined, then NO subtweens will be created for any extra properties (the properties will be created - just not additional CSSPropTween instances to tween them) because the plugin is expected to do so. However, the end values WILL be populated in the "data" property, like {s:100, xn1:50, xn2:300}
				 * @param {function(number)=} setRatio If values should be set in a custom function instead of being pieced together in a type:1 (complex-value) CSSPropTween, define that custom function here.
				 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parseComplex() call.
				 */
				_parseComplex = CSSPlugin.parseComplex = function(t, p, b, e, clrs, dflt, pt, pr, plugin, setRatio) {
					//DEBUG: _log("parseComplex: "+p+", b: "+b+", e: "+e);
					b = b || dflt || "";
					pt = new CSSPropTween(t, p, 0, 0, pt, (setRatio ? 2 : 1), null, false, pr, b, e);
					e += ""; //ensures it's a string
					var ba = b.split(", ").join(",").split(" "), //beginning array
						ea = e.split(", ").join(",").split(" "), //ending array
						l = ba.length,
						autoRound = (_autoRound !== false),
						i, xi, ni, bv, ev, bnums, enums, bn, hasAlpha, temp, cv, str, useHSL;
					if (e.indexOf(",") !== -1 || b.indexOf(",") !== -1) {
						ba = ba.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						ea = ea.join(" ").replace(_commasOutsideParenExp, ", ").split(" ");
						l = ba.length;
					}
					if (l !== ea.length) {
						//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
						ba = (dflt || "").split(" ");
						l = ba.length;
					}
					pt.plugin = plugin;
					pt.setRatio = setRatio;
					_colorExp.lastIndex = 0;
					for (i = 0; i < l; i++) {
						bv = ba[i];
						ev = ea[i];
						bn = parseFloat(bv);
						//if the value begins with a number (most common). It's fine if it has a suffix like px
						if (bn || bn === 0) {
							pt.appendXtra("", bn, _parseChange(ev, bn), ev.replace(_relNumExp, ""), (autoRound && ev.indexOf("px") !== -1), true);
	
						//if the value is a color
						} else if (clrs && _colorExp.test(bv)) {
							str = ev.charAt(ev.length - 1) === "," ? ")," : ")"; //if there's a comma at the end, retain it.
							useHSL = (ev.indexOf("hsl") !== -1 && _supportsOpacity);
							bv = _parseColor(bv, useHSL);
							ev = _parseColor(ev, useHSL);
							hasAlpha = (bv.length + ev.length > 6);
							if (hasAlpha && !_supportsOpacity && ev[3] === 0) { //older versions of IE don't support rgba(), so if the destination alpha is 0, just use "transparent" for the end color
								pt["xs" + pt.l] += pt.l ? " transparent" : "transparent";
								pt.e = pt.e.split(ea[i]).join("transparent");
							} else {
								if (!_supportsOpacity) { //old versions of IE don't support rgba().
									hasAlpha = false;
								}
								if (useHSL) {
									pt.appendXtra((hasAlpha ? "hsla(" : "hsl("), bv[0], _parseChange(ev[0], bv[0]), ",", false, true)
										.appendXtra("", bv[1], _parseChange(ev[1], bv[1]), "%,", false)
										.appendXtra("", bv[2], _parseChange(ev[2], bv[2]), (hasAlpha ? "%," : "%" + str), false);
								} else {
									pt.appendXtra((hasAlpha ? "rgba(" : "rgb("), bv[0], ev[0] - bv[0], ",", true, true)
										.appendXtra("", bv[1], ev[1] - bv[1], ",", true)
										.appendXtra("", bv[2], ev[2] - bv[2], (hasAlpha ? "," : str), true);
								}
	
								if (hasAlpha) {
									bv = (bv.length < 4) ? 1 : bv[3];
									pt.appendXtra("", bv, ((ev.length < 4) ? 1 : ev[3]) - bv, str, false);
								}
							}
							_colorExp.lastIndex = 0; //otherwise the test() on the RegExp could move the lastIndex and taint future results.
	
						} else {
							bnums = bv.match(_numExp); //gets each group of numbers in the beginning value string and drops them into an array
	
							//if no number is found, treat it as a non-tweening value and just append the string to the current xs.
							if (!bnums) {
								pt["xs" + pt.l] += pt.l ? " " + ev : ev;
	
							//loop through all the numbers that are found and construct the extra values on the pt.
							} else {
								enums = ev.match(_relNumExp); //get each group of numbers in the end value string and drop them into an array. We allow relative values too, like +=50 or -=.5
								if (!enums || enums.length !== bnums.length) {
									//DEBUG: _log("mismatched formatting detected on " + p + " (" + b + " vs " + e + ")");
									return pt;
								}
								ni = 0;
								for (xi = 0; xi < bnums.length; xi++) {
									cv = bnums[xi];
									temp = bv.indexOf(cv, ni);
									pt.appendXtra(bv.substr(ni, temp - ni), Number(cv), _parseChange(enums[xi], cv), "", (autoRound && bv.substr(temp + cv.length, 2) === "px"), (xi === 0));
									ni = temp + cv.length;
								}
								pt["xs" + pt.l] += bv.substr(ni);
							}
						}
					}
					//if there are relative values ("+=" or "-=" prefix), we need to adjust the ending value to eliminate the prefixes and combine the values properly.
					if (e.indexOf("=") !== -1) if (pt.data) {
						str = pt.xs0 + pt.data.s;
						for (i = 1; i < pt.l; i++) {
							str += pt["xs" + i] + pt.data["xn" + i];
						}
						pt.e = str + pt["xs" + i];
					}
					if (!pt.l) {
						pt.type = -1;
						pt.xs0 = pt.e;
					}
					return pt.xfirst || pt;
				},
				i = 9;
	
	
			p = CSSPropTween.prototype;
			p.l = p.pr = 0; //length (number of extra properties like xn1, xn2, xn3, etc.
			while (--i > 0) {
				p["xn" + i] = 0;
				p["xs" + i] = "";
			}
			p.xs0 = "";
			p._next = p._prev = p.xfirst = p.data = p.plugin = p.setRatio = p.rxp = null;
	
	
			/**
			 * Appends and extra tweening value to a CSSPropTween and automatically manages any prefix and suffix strings. The first extra value is stored in the s and c of the main CSSPropTween instance, but thereafter any extras are stored in the xn1, xn2, xn3, etc. The prefixes and suffixes are stored in the xs0, xs1, xs2, etc. properties. For example, if I walk through a clip value like "rect(10px, 5px, 0px, 20px)", the values would be stored like this:
			 * xs0:"rect(", s:10, xs1:"px, ", xn1:5, xs2:"px, ", xn2:0, xs3:"px, ", xn3:20, xn4:"px)"
			 * And they'd all get joined together when the CSSPlugin renders (in the setRatio() method).
			 * @param {string=} pfx Prefix (if any)
			 * @param {!number} s Starting value
			 * @param {!number} c Change in numeric value over the course of the entire tween. For example, if the start is 5 and the end is 100, the change would be 95.
			 * @param {string=} sfx Suffix (if any)
			 * @param {boolean=} r Round (if true).
			 * @param {boolean=} pad If true, this extra value should be separated by the previous one by a space. If there is no previous extra and pad is true, it will automatically drop the space.
			 * @return {CSSPropTween} returns itself so that multiple methods can be chained together.
			 */
			p.appendXtra = function(pfx, s, c, sfx, r, pad) {
				var pt = this,
					l = pt.l;
				pt["xs" + l] += (pad && l) ? " " + pfx : pfx || "";
				if (!c) if (l !== 0 && !pt.plugin) { //typically we'll combine non-changing values right into the xs to optimize performance, but we don't combine them when there's a plugin that will be tweening the values because it may depend on the values being split apart, like for a bezier, if a value doesn't change between the first and second iteration but then it does on the 3rd, we'll run into trouble because there's no xn slot for that value!
					pt["xs" + l] += s + (sfx || "");
					return pt;
				}
				pt.l++;
				pt.type = pt.setRatio ? 2 : 1;
				pt["xs" + pt.l] = sfx || "";
				if (l > 0) {
					pt.data["xn" + l] = s + c;
					pt.rxp["xn" + l] = r; //round extra property (we need to tap into this in the _parseToProxy() method)
					pt["xn" + l] = s;
					if (!pt.plugin) {
						pt.xfirst = new CSSPropTween(pt, "xn" + l, s, c, pt.xfirst || pt, 0, pt.n, r, pt.pr);
						pt.xfirst.xs0 = 0; //just to ensure that the property stays numeric which helps modern browsers speed up processing. Remember, in the setRatio() method, we do pt.t[pt.p] = val + pt.xs0 so if pt.xs0 is "" (the default), it'll cast the end value as a string. When a property is a number sometimes and a string sometimes, it prevents the compiler from locking in the data type, slowing things down slightly.
					}
					return pt;
				}
				pt.data = {s:s + c};
				pt.rxp = {};
				pt.s = s;
				pt.c = c;
				pt.r = r;
				return pt;
			};
	
			/**
			 * @constructor A SpecialProp is basically a css property that needs to be treated in a non-standard way, like if it may contain a complex value like boxShadow:"5px 10px 15px rgb(255, 102, 51)" or if it is associated with another plugin like ThrowPropsPlugin or BezierPlugin. Every SpecialProp is associated with a particular property name like "boxShadow" or "throwProps" or "bezier" and it will intercept those values in the vars object that's passed to the CSSPlugin and handle them accordingly.
			 * @param {!string} p Property name (like "boxShadow" or "throwProps")
			 * @param {Object=} options An object containing any of the following configuration options:
			 *                      - defaultValue: the default value
			 *                      - parser: A function that should be called when the associated property name is found in the vars. This function should return a CSSPropTween instance and it should ensure that it is properly inserted into the linked list. It will receive 4 paramters: 1) The target, 2) The value defined in the vars, 3) The CSSPlugin instance (whose _firstPT should be used for the linked list), and 4) A computed style object if one was calculated (this is a speed optimization that allows retrieval of starting values quicker)
			 *                      - formatter: a function that formats any value received for this special property (for example, boxShadow could take "5px 5px red" and format it to "5px 5px 0px 0px red" so that both the beginning and ending values have a common order and quantity of values.)
			 *                      - prefix: if true, we'll determine whether or not this property requires a vendor prefix (like Webkit or Moz or ms or O)
			 *                      - color: set this to true if the value for this SpecialProp may contain color-related values like rgb(), rgba(), etc.
			 *                      - priority: priority in the linked list order. Higher priority SpecialProps will be updated before lower priority ones. The default priority is 0.
			 *                      - multi: if true, the formatter should accommodate a comma-delimited list of values, like boxShadow could have multiple boxShadows listed out.
			 *                      - collapsible: if true, the formatter should treat the value like it's a top/right/bottom/left value that could be collapsed, like "5px" would apply to all, "5px, 10px" would use 5px for top/bottom and 10px for right/left, etc.
			 *                      - keyword: a special keyword that can [optionally] be found inside the value (like "inset" for boxShadow). This allows us to validate beginning/ending values to make sure they match (if the keyword is found in one, it'll be added to the other for consistency by default).
			 */
			var SpecialProp = function(p, options) {
					options = options || {};
					this.p = options.prefix ? _checkPropPrefix(p) || p : p;
					_specialProps[p] = _specialProps[this.p] = this;
					this.format = options.formatter || _getFormatter(options.defaultValue, options.color, options.collapsible, options.multi);
					if (options.parser) {
						this.parse = options.parser;
					}
					this.clrs = options.color;
					this.multi = options.multi;
					this.keyword = options.keyword;
					this.dflt = options.defaultValue;
					this.pr = options.priority || 0;
				},
	
				//shortcut for creating a new SpecialProp that can accept multiple properties as a comma-delimited list (helps minification). dflt can be an array for multiple values (we don't do a comma-delimited list because the default value may contain commas, like rect(0px,0px,0px,0px)). We attach this method to the SpecialProp class/object instead of using a private _createSpecialProp() method so that we can tap into it externally if necessary, like from another plugin.
				_registerComplexSpecialProp = _internals._registerComplexSpecialProp = function(p, options, defaults) {
					if (typeof(options) !== "object") {
						options = {parser:defaults}; //to make backwards compatible with older versions of BezierPlugin and ThrowPropsPlugin
					}
					var a = p.split(","),
						d = options.defaultValue,
						i, temp;
					defaults = defaults || [d];
					for (i = 0; i < a.length; i++) {
						options.prefix = (i === 0 && options.prefix);
						options.defaultValue = defaults[i] || d;
						temp = new SpecialProp(a[i], options);
					}
				},
	
				//creates a placeholder special prop for a plugin so that the property gets caught the first time a tween of it is attempted, and at that time it makes the plugin register itself, thus taking over for all future tweens of that property. This allows us to not mandate that things load in a particular order and it also allows us to log() an error that informs the user when they attempt to tween an external plugin-related property without loading its .js file.
				_registerPluginProp = function(p) {
					if (!_specialProps[p]) {
						var pluginName = p.charAt(0).toUpperCase() + p.substr(1) + "Plugin";
						_registerComplexSpecialProp(p, {parser:function(t, e, p, cssp, pt, plugin, vars) {
							var pluginClass = _globals.com.greensock.plugins[pluginName];
							if (!pluginClass) {
								_log("Error: " + pluginName + " js file not loaded.");
								return pt;
							}
							pluginClass._cssRegister();
							return _specialProps[p].parse(t, e, p, cssp, pt, plugin, vars);
						}});
					}
				};
	
	
			p = SpecialProp.prototype;
	
			/**
			 * Alias for _parseComplex() that automatically plugs in certain values for this SpecialProp, like its property name, whether or not colors should be sensed, the default value, and priority. It also looks for any keyword that the SpecialProp defines (like "inset" for boxShadow) and ensures that the beginning and ending values have the same number of values for SpecialProps where multi is true (like boxShadow and textShadow can have a comma-delimited list)
			 * @param {!Object} t target element
			 * @param {(string|number|object)} b beginning value
			 * @param {(string|number|object)} e ending (destination) value
			 * @param {CSSPropTween=} pt next CSSPropTween in the linked list
			 * @param {TweenPlugin=} plugin If another plugin will be tweening the complex value, that TweenPlugin instance goes here.
			 * @param {function=} setRatio If a custom setRatio() method should be used to handle this complex value, that goes here.
			 * @return {CSSPropTween=} First CSSPropTween in the linked list
			 */
			p.parseComplex = function(t, b, e, pt, plugin, setRatio) {
				var kwd = this.keyword,
					i, ba, ea, l, bi, ei;
				//if this SpecialProp's value can contain a comma-delimited list of values (like boxShadow or textShadow), we must parse them in a special way, and look for a keyword (like "inset" for boxShadow) and ensure that the beginning and ending BOTH have it if the end defines it as such. We also must ensure that there are an equal number of values specified (we can't tween 1 boxShadow to 3 for example)
				if (this.multi) if (_commasOutsideParenExp.test(e) || _commasOutsideParenExp.test(b)) {
					ba = b.replace(_commasOutsideParenExp, "|").split("|");
					ea = e.replace(_commasOutsideParenExp, "|").split("|");
				} else if (kwd) {
					ba = [b];
					ea = [e];
				}
				if (ea) {
					l = (ea.length > ba.length) ? ea.length : ba.length;
					for (i = 0; i < l; i++) {
						b = ba[i] = ba[i] || this.dflt;
						e = ea[i] = ea[i] || this.dflt;
						if (kwd) {
							bi = b.indexOf(kwd);
							ei = e.indexOf(kwd);
							if (bi !== ei) {
								if (ei === -1) { //if the keyword isn't in the end value, remove it from the beginning one.
									ba[i] = ba[i].split(kwd).join("");
								} else if (bi === -1) { //if the keyword isn't in the beginning, add it.
									ba[i] += " " + kwd;
								}
							}
						}
					}
					b = ba.join(", ");
					e = ea.join(", ");
				}
				return _parseComplex(t, this.p, b, e, this.clrs, this.dflt, pt, this.pr, plugin, setRatio);
			};
	
			/**
			 * Accepts a target and end value and spits back a CSSPropTween that has been inserted into the CSSPlugin's linked list and conforms with all the conventions we use internally, like type:-1, 0, 1, or 2, setting up any extra property tweens, priority, etc. For example, if we have a boxShadow SpecialProp and call:
			 * this._firstPT = sp.parse(element, "5px 10px 20px rgb(2550,102,51)", "boxShadow", this);
			 * It should figure out the starting value of the element's boxShadow, compare it to the provided end value and create all the necessary CSSPropTweens of the appropriate types to tween the boxShadow. The CSSPropTween that gets spit back should already be inserted into the linked list (the 4th parameter is the current head, so prepend to that).
			 * @param {!Object} t Target object whose property is being tweened
			 * @param {Object} e End value as provided in the vars object (typically a string, but not always - like a throwProps would be an object).
			 * @param {!string} p Property name
			 * @param {!CSSPlugin} cssp The CSSPlugin instance that should be associated with this tween.
			 * @param {?CSSPropTween} pt The CSSPropTween that is the current head of the linked list (we'll prepend to it)
			 * @param {TweenPlugin=} plugin If a plugin will be used to tween the parsed value, this is the plugin instance.
			 * @param {Object=} vars Original vars object that contains the data for parsing.
			 * @return {CSSPropTween} The first CSSPropTween in the linked list which includes the new one(s) added by the parse() call.
			 */
			p.parse = function(t, e, p, cssp, pt, plugin, vars) {
				return this.parseComplex(t.style, this.format(_getStyle(t, this.p, _cs, false, this.dflt)), this.format(e), pt, plugin);
			};
	
			/**
			 * Registers a special property that should be intercepted from any "css" objects defined in tweens. This allows you to handle them however you want without CSSPlugin doing it for you. The 2nd parameter should be a function that accepts 3 parameters:
			 *  1) Target object whose property should be tweened (typically a DOM element)
			 *  2) The end/destination value (could be a string, number, object, or whatever you want)
			 *  3) The tween instance (you probably don't need to worry about this, but it can be useful for looking up information like the duration)
			 *
			 * Then, your function should return a function which will be called each time the tween gets rendered, passing a numeric "ratio" parameter to your function that indicates the change factor (usually between 0 and 1). For example:
			 *
			 * CSSPlugin.registerSpecialProp("myCustomProp", function(target, value, tween) {
			 *      var start = target.style.width;
			 *      return function(ratio) {
			 *              target.style.width = (start + value * ratio) + "px";
			 *              console.log("set width to " + target.style.width);
			 *          }
			 * }, 0);
			 *
			 * Then, when I do this tween, it will trigger my special property:
			 *
			 * TweenLite.to(element, 1, {css:{myCustomProp:100}});
			 *
			 * In the example, of course, we're just changing the width, but you can do anything you want.
			 *
			 * @param {!string} name Property name (or comma-delimited list of property names) that should be intercepted and handled by your function. For example, if I define "myCustomProp", then it would handle that portion of the following tween: TweenLite.to(element, 1, {css:{myCustomProp:100}})
			 * @param {!function(Object, Object, Object, string):function(number)} onInitTween The function that will be called when a tween of this special property is performed. The function will receive 4 parameters: 1) Target object that should be tweened, 2) Value that was passed to the tween, 3) The tween instance itself (rarely used), and 4) The property name that's being tweened. Your function should return a function that should be called on every update of the tween. That function will receive a single parameter that is a "change factor" value (typically between 0 and 1) indicating the amount of change as a ratio. You can use this to determine how to set the values appropriately in your function.
			 * @param {number=} priority Priority that helps the engine determine the order in which to set the properties (default: 0). Higher priority properties will be updated before lower priority ones.
			 */
			CSSPlugin.registerSpecialProp = function(name, onInitTween, priority) {
				_registerComplexSpecialProp(name, {parser:function(t, e, p, cssp, pt, plugin, vars) {
					var rv = new CSSPropTween(t, p, 0, 0, pt, 2, p, false, priority);
					rv.plugin = plugin;
					rv.setRatio = onInitTween(t, e, cssp._tween, p);
					return rv;
				}, priority:priority});
			};
	
	
	
	
	
	
			//transform-related methods and properties
			CSSPlugin.useSVGTransformAttr = _isSafari || _isFirefox; //Safari and Firefox both have some rendering bugs when applying CSS transforms to SVG elements, so default to using the "transform" attribute instead (users can override this).
			var _transformProps = ("scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent").split(","),
				_transformProp = _checkPropPrefix("transform"), //the Javascript (camelCase) transform property, like msTransform, WebkitTransform, MozTransform, or OTransform.
				_transformPropCSS = _prefixCSS + "transform",
				_transformOriginProp = _checkPropPrefix("transformOrigin"),
				_supports3D = (_checkPropPrefix("perspective") !== null),
				Transform = _internals.Transform = function() {
					this.perspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0;
					this.force3D = (CSSPlugin.defaultForce3D === false || !_supports3D) ? false : CSSPlugin.defaultForce3D || "auto";
				},
				_SVGElement = window.SVGElement,
				_useSVGTransformAttr,
				//Some browsers (like Firefox and IE) don't honor transform-origin properly in SVG elements, so we need to manually adjust the matrix accordingly. We feature detect here rather than always doing the conversion for certain browsers because they may fix the problem at some point in the future.
	
				_createSVG = function(type, container, attributes) {
					var element = _doc.createElementNS("http://www.w3.org/2000/svg", type),
						reg = /([a-z])([A-Z])/g,
						p;
					for (p in attributes) {
						element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
					}
					container.appendChild(element);
					return element;
				},
				_docElement = _doc.documentElement,
				_forceSVGTransformAttr = (function() {
					//IE and Android stock don't support CSS transforms on SVG elements, so we must write them to the "transform" attribute. We populate this variable in the _parseTransform() method, and only if/when we come across an SVG element
					var force = _ieVers || (/Android/i.test(_agent) && !window.chrome),
						svg, rect, width;
					if (_doc.createElementNS && !force) { //IE8 and earlier doesn't support SVG anyway
						svg = _createSVG("svg", _docElement);
						rect = _createSVG("rect", svg, {width:100, height:50, x:100});
						width = rect.getBoundingClientRect().width;
						rect.style[_transformOriginProp] = "50% 50%";
						rect.style[_transformProp] = "scaleX(0.5)";
						force = (width === rect.getBoundingClientRect().width && !(_isFirefox && _supports3D)); //note: Firefox fails the test even though it does support CSS transforms in 3D. Since we can't push 3D stuff into the transform attribute, we force Firefox to pass the test here (as long as it does truly support 3D).
						_docElement.removeChild(svg);
					}
					return force;
				})(),
				_parseSVGOrigin = function(e, local, decoratee, absolute, smoothOrigin) {
					var tm = e._gsTransform,
						m = _getMatrix(e, true),
						v, x, y, xOrigin, yOrigin, a, b, c, d, tx, ty, determinant, xOriginOld, yOriginOld;
					if (tm) {
						xOriginOld = tm.xOrigin; //record the original values before we alter them.
						yOriginOld = tm.yOrigin;
					}
					if (!absolute || (v = absolute.split(" ")).length < 2) {
						b = e.getBBox();
						local = _parsePosition(local).split(" ");
						v = [(local[0].indexOf("%") !== -1 ? parseFloat(local[0]) / 100 * b.width : parseFloat(local[0])) + b.x,
							 (local[1].indexOf("%") !== -1 ? parseFloat(local[1]) / 100 * b.height : parseFloat(local[1])) + b.y];
					}
					decoratee.xOrigin = xOrigin = parseFloat(v[0]);
					decoratee.yOrigin = yOrigin = parseFloat(v[1]);
					if (absolute && m !== _identity2DMatrix) { //if svgOrigin is being set, we must invert the matrix and determine where the absolute point is, factoring in the current transforms. Otherwise, the svgOrigin would be based on the element's non-transformed position on the canvas.
						a = m[0];
						b = m[1];
						c = m[2];
						d = m[3];
						tx = m[4];
						ty = m[5];
						determinant = (a * d - b * c);
						x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + ((c * ty - d * tx) / determinant);
						y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - ((a * ty - b * tx) / determinant);
						xOrigin = decoratee.xOrigin = v[0] = x;
						yOrigin = decoratee.yOrigin = v[1] = y;
					}
					if (tm) { //avoid jump when transformOrigin is changed - adjust the x/y values accordingly
						if (smoothOrigin || (smoothOrigin !== false && CSSPlugin.defaultSmoothOrigin !== false)) {
							x = xOrigin - xOriginOld;
							y = yOrigin - yOriginOld;
							//originally, we simply adjusted the x and y values, but that would cause problems if, for example, you created a rotational tween part-way through an x/y tween. Managing the offset in a separate variable gives us ultimate flexibility.
							//tm.x -= x - (x * m[0] + y * m[2]);
							//tm.y -= y - (x * m[1] + y * m[3]);
							tm.xOffset += (x * m[0] + y * m[2]) - x;
							tm.yOffset += (x * m[1] + y * m[3]) - y;
						} else {
							tm.xOffset = tm.yOffset = 0;
						}
					}
					e.setAttribute("data-svg-origin", v.join(" "));
				},
				_isSVG = function(e) {
					return !!(_SVGElement && typeof(e.getBBox) === "function" && e.getCTM && (!e.parentNode || (e.parentNode.getBBox && e.parentNode.getCTM)));
				},
				_identity2DMatrix = [1,0,0,1,0,0],
				_getMatrix = function(e, force2D) {
					var tm = e._gsTransform || new Transform(),
						rnd = 100000,
						isDefault, s, m, n, dec;
					if (_transformProp) {
						s = _getStyle(e, _transformPropCSS, null, true);
					} else if (e.currentStyle) {
						//for older versions of IE, we need to interpret the filter portion that is in the format: progid:DXImageTransform.Microsoft.Matrix(M11=6.123233995736766e-17, M12=-1, M21=1, M22=6.123233995736766e-17, sizingMethod='auto expand') Notice that we need to swap b and c compared to a normal matrix.
						s = e.currentStyle.filter.match(_ieGetMatrixExp);
						s = (s && s.length === 4) ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), (tm.x || 0), (tm.y || 0)].join(",") : "";
					}
					isDefault = (!s || s === "none" || s === "matrix(1, 0, 0, 1, 0, 0)");
					if (tm.svg || (e.getBBox && _isSVG(e))) {
						if (isDefault && (e.style[_transformProp] + "").indexOf("matrix") !== -1) { //some browsers (like Chrome 40) don't correctly report transforms that are applied inline on an SVG element (they don't get included in the computed style), so we double-check here and accept matrix values
							s = e.style[_transformProp];
							isDefault = 0;
						}
						m = e.getAttribute("transform");
						if (isDefault && m) {
							if (m.indexOf("matrix") !== -1) { //just in case there's a "transform" value specified as an attribute instead of CSS style. Accept either a matrix() or simple translate() value though.
								s = m;
								isDefault = 0;
							} else if (m.indexOf("translate") !== -1) {
								s = "matrix(1,0,0,1," + m.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")";
								isDefault = 0;
							}
						}
					}
					if (isDefault) {
						return _identity2DMatrix;
					}
					//split the matrix values out into an array (m for matrix)
					m = (s || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
					i = m.length;
					while (--i > -1) {
						n = Number(m[i]);
						m[i] = (dec = n - (n |= 0)) ? ((dec * rnd + (dec < 0 ? -0.5 : 0.5)) | 0) / rnd + n : n; //convert strings to Numbers and round to 5 decimal places to avoid issues with tiny numbers. Roughly 20x faster than Number.toFixed(). We also must make sure to round before dividing so that values like 0.9999999999 become 1 to avoid glitches in browser rendering and interpretation of flipped/rotated 3D matrices. And don't just multiply the number by rnd, floor it, and then divide by rnd because the bitwise operations max out at a 32-bit signed integer, thus it could get clipped at a relatively low value (like 22,000.00000 for example).
					}
					return (force2D && m.length > 6) ? [m[0], m[1], m[4], m[5], m[12], m[13]] : m;
				},
	
				/**
				 * Parses the transform values for an element, returning an object with x, y, z, scaleX, scaleY, scaleZ, rotation, rotationX, rotationY, skewX, and skewY properties. Note: by default (for performance reasons), all skewing is combined into skewX and rotation but skewY still has a place in the transform object so that we can record how much of the skew is attributed to skewX vs skewY. Remember, a skewY of 10 looks the same as a rotation of 10 and skewX of -10.
				 * @param {!Object} t target element
				 * @param {Object=} cs computed style object (optional)
				 * @param {boolean=} rec if true, the transform values will be recorded to the target element's _gsTransform object, like target._gsTransform = {x:0, y:0, z:0, scaleX:1...}
				 * @param {boolean=} parse if true, we'll ignore any _gsTransform values that already exist on the element, and force a reparsing of the css (calculated style)
				 * @return {object} object containing all of the transform properties/values like {x:0, y:0, z:0, scaleX:1...}
				 */
				_getTransform = _internals.getTransform = function(t, cs, rec, parse) {
					if (t._gsTransform && rec && !parse) {
						return t._gsTransform; //if the element already has a _gsTransform, use that. Note: some browsers don't accurately return the calculated style for the transform (particularly for SVG), so it's almost always safest to just use the values we've already applied rather than re-parsing things.
					}
					var tm = rec ? t._gsTransform || new Transform() : new Transform(),
						invX = (tm.scaleX < 0), //in order to interpret things properly, we need to know if the user applied a negative scaleX previously so that we can adjust the rotation and skewX accordingly. Otherwise, if we always interpret a flipped matrix as affecting scaleY and the user only wants to tween the scaleX on multiple sequential tweens, it would keep the negative scaleY without that being the user's intent.
						min = 0.00002,
						rnd = 100000,
						zOrigin = _supports3D ? parseFloat(_getStyle(t, _transformOriginProp, cs, false, "0 0 0").split(" ")[2]) || tm.zOrigin  || 0 : 0,
						defaultTransformPerspective = parseFloat(CSSPlugin.defaultTransformPerspective) || 0,
						m, i, scaleX, scaleY, rotation, skewX;
	
					tm.svg = !!(t.getBBox && _isSVG(t));
					if (tm.svg) {
						_parseSVGOrigin(t, _getStyle(t, _transformOriginProp, _cs, false, "50% 50%") + "", tm, t.getAttribute("data-svg-origin"));
						_useSVGTransformAttr = CSSPlugin.useSVGTransformAttr || _forceSVGTransformAttr;
					}
					m = _getMatrix(t);
					if (m !== _identity2DMatrix) {
	
						if (m.length === 16) {
							//we'll only look at these position-related 6 variables first because if x/y/z all match, it's relatively safe to assume we don't need to re-parse everything which risks losing important rotational information (like rotationX:180 plus rotationY:180 would look the same as rotation:180 - there's no way to know for sure which direction was taken based solely on the matrix3d() values)
							var a11 = m[0], a21 = m[1], a31 = m[2], a41 = m[3],
								a12 = m[4], a22 = m[5], a32 = m[6], a42 = m[7],
								a13 = m[8], a23 = m[9], a33 = m[10],
								a14 = m[12], a24 = m[13], a34 = m[14],
								a43 = m[11],
								angle = Math.atan2(a32, a33),
								t1, t2, t3, t4, cos, sin;
	
							//we manually compensate for non-zero z component of transformOrigin to work around bugs in Safari
							if (tm.zOrigin) {
								a34 = -tm.zOrigin;
								a14 = a13*a34-m[12];
								a24 = a23*a34-m[13];
								a34 = a33*a34+tm.zOrigin-m[14];
							}
							tm.rotationX = angle * _RAD2DEG;
							//rotationX
							if (angle) {
								cos = Math.cos(-angle);
								sin = Math.sin(-angle);
								t1 = a12*cos+a13*sin;
								t2 = a22*cos+a23*sin;
								t3 = a32*cos+a33*sin;
								a13 = a12*-sin+a13*cos;
								a23 = a22*-sin+a23*cos;
								a33 = a32*-sin+a33*cos;
								a43 = a42*-sin+a43*cos;
								a12 = t1;
								a22 = t2;
								a32 = t3;
							}
							//rotationY
							angle = Math.atan2(-a31, a33);
							tm.rotationY = angle * _RAD2DEG;
							if (angle) {
								cos = Math.cos(-angle);
								sin = Math.sin(-angle);
								t1 = a11*cos-a13*sin;
								t2 = a21*cos-a23*sin;
								t3 = a31*cos-a33*sin;
								a23 = a21*sin+a23*cos;
								a33 = a31*sin+a33*cos;
								a43 = a41*sin+a43*cos;
								a11 = t1;
								a21 = t2;
								a31 = t3;
							}
							//rotationZ
							angle = Math.atan2(a21, a11);
							tm.rotation = angle * _RAD2DEG;
							if (angle) {
								cos = Math.cos(-angle);
								sin = Math.sin(-angle);
								a11 = a11*cos+a12*sin;
								t2 = a21*cos+a22*sin;
								a22 = a21*-sin+a22*cos;
								a32 = a31*-sin+a32*cos;
								a21 = t2;
							}
	
							if (tm.rotationX && Math.abs(tm.rotationX) + Math.abs(tm.rotation) > 359.9) { //when rotationY is set, it will often be parsed as 180 degrees different than it should be, and rotationX and rotation both being 180 (it looks the same), so we adjust for that here.
								tm.rotationX = tm.rotation = 0;
								tm.rotationY = 180 - tm.rotationY;
							}
	
							tm.scaleX = ((Math.sqrt(a11 * a11 + a21 * a21) * rnd + 0.5) | 0) / rnd;
							tm.scaleY = ((Math.sqrt(a22 * a22 + a23 * a23) * rnd + 0.5) | 0) / rnd;
							tm.scaleZ = ((Math.sqrt(a32 * a32 + a33 * a33) * rnd + 0.5) | 0) / rnd;
							tm.skewX = 0;
							tm.perspective = a43 ? 1 / ((a43 < 0) ? -a43 : a43) : 0;
							tm.x = a14;
							tm.y = a24;
							tm.z = a34;
							if (tm.svg) {
								tm.x -= tm.xOrigin - (tm.xOrigin * a11 - tm.yOrigin * a12);
								tm.y -= tm.yOrigin - (tm.yOrigin * a21 - tm.xOrigin * a22);
							}
	
						} else if ((!_supports3D || parse || !m.length || tm.x !== m[4] || tm.y !== m[5] || (!tm.rotationX && !tm.rotationY)) && !(tm.x !== undefined && _getStyle(t, "display", cs) === "none")) { //sometimes a 6-element matrix is returned even when we performed 3D transforms, like if rotationX and rotationY are 180. In cases like this, we still need to honor the 3D transforms. If we just rely on the 2D info, it could affect how the data is interpreted, like scaleY might get set to -1 or rotation could get offset by 180 degrees. For example, do a TweenLite.to(element, 1, {css:{rotationX:180, rotationY:180}}) and then later, TweenLite.to(element, 1, {css:{rotationX:0}}) and without this conditional logic in place, it'd jump to a state of being unrotated when the 2nd tween starts. Then again, we need to honor the fact that the user COULD alter the transforms outside of CSSPlugin, like by manually applying new css, so we try to sense that by looking at x and y because if those changed, we know the changes were made outside CSSPlugin and we force a reinterpretation of the matrix values. Also, in Webkit browsers, if the element's "display" is "none", its calculated style value will always return empty, so if we've already recorded the values in the _gsTransform object, we'll just rely on those.
							var k = (m.length >= 6),
								a = k ? m[0] : 1,
								b = m[1] || 0,
								c = m[2] || 0,
								d = k ? m[3] : 1;
							tm.x = m[4] || 0;
							tm.y = m[5] || 0;
							scaleX = Math.sqrt(a * a + b * b);
							scaleY = Math.sqrt(d * d + c * c);
							rotation = (a || b) ? Math.atan2(b, a) * _RAD2DEG : tm.rotation || 0; //note: if scaleX is 0, we cannot accurately measure rotation. Same for skewX with a scaleY of 0. Therefore, we default to the previously recorded value (or zero if that doesn't exist).
							skewX = (c || d) ? Math.atan2(c, d) * _RAD2DEG + rotation : tm.skewX || 0;
							if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
								if (invX) {
									scaleX *= -1;
									skewX += (rotation <= 0) ? 180 : -180;
									rotation += (rotation <= 0) ? 180 : -180;
								} else {
									scaleY *= -1;
									skewX += (skewX <= 0) ? 180 : -180;
								}
							}
							tm.scaleX = scaleX;
							tm.scaleY = scaleY;
							tm.rotation = rotation;
							tm.skewX = skewX;
							if (_supports3D) {
								tm.rotationX = tm.rotationY = tm.z = 0;
								tm.perspective = defaultTransformPerspective;
								tm.scaleZ = 1;
							}
							if (tm.svg) {
								tm.x -= tm.xOrigin - (tm.xOrigin * a + tm.yOrigin * c);
								tm.y -= tm.yOrigin - (tm.xOrigin * b + tm.yOrigin * d);
							}
						}
						tm.zOrigin = zOrigin;
						//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 0 in these cases. The conditional logic here is faster than calling Math.abs(). Also, browsers tend to render a SLIGHTLY rotated object in a fuzzy way, so we need to snap to exactly 0 when appropriate.
						for (i in tm) {
							if (tm[i] < min) if (tm[i] > -min) {
								tm[i] = 0;
							}
						}
					}
					//DEBUG: _log("parsed rotation of " + t.getAttribute("id")+": "+(tm.rotationX)+", "+(tm.rotationY)+", "+(tm.rotation)+", scale: "+tm.scaleX+", "+tm.scaleY+", "+tm.scaleZ+", position: "+tm.x+", "+tm.y+", "+tm.z+", perspective: "+tm.perspective+ ", origin: "+ tm.xOrigin+ ","+ tm.yOrigin);
					if (rec) {
						t._gsTransform = tm; //record to the object's _gsTransform which we use so that tweens can control individual properties independently (we need all the properties to accurately recompose the matrix in the setRatio() method)
						if (tm.svg) { //if we're supposed to apply transforms to the SVG element's "transform" attribute, make sure there aren't any CSS transforms applied or they'll override the attribute ones. Also clear the transform attribute if we're using CSS, just to be clean.
							if (_useSVGTransformAttr && t.style[_transformProp]) {
								TweenLite.delayedCall(0.001, function(){ //if we apply this right away (before anything has rendered), we risk there being no transforms for a brief moment and it also interferes with adjusting the transformOrigin in a tween with immediateRender:true (it'd try reading the matrix and it wouldn't have the appropriate data in place because we just removed it).
									_removeProp(t.style, _transformProp);
								});
							} else if (!_useSVGTransformAttr && t.getAttribute("transform")) {
								TweenLite.delayedCall(0.001, function(){
									t.removeAttribute("transform");
								});
							}
						}
					}
					return tm;
				},
	
				//for setting 2D transforms in IE6, IE7, and IE8 (must use a "filter" to emulate the behavior of modern day browser transforms)
				_setIETransformRatio = function(v) {
					var t = this.data, //refers to the element's _gsTransform object
						ang = -t.rotation * _DEG2RAD,
						skew = ang + t.skewX * _DEG2RAD,
						rnd = 100000,
						a = ((Math.cos(ang) * t.scaleX * rnd) | 0) / rnd,
						b = ((Math.sin(ang) * t.scaleX * rnd) | 0) / rnd,
						c = ((Math.sin(skew) * -t.scaleY * rnd) | 0) / rnd,
						d = ((Math.cos(skew) * t.scaleY * rnd) | 0) / rnd,
						style = this.t.style,
						cs = this.t.currentStyle,
						filters, val;
					if (!cs) {
						return;
					}
					val = b; //just for swapping the variables an inverting them (reused "val" to avoid creating another variable in memory). IE's filter matrix uses a non-standard matrix configuration (angle goes the opposite way, and b and c are reversed and inverted)
					b = -c;
					c = -val;
					filters = cs.filter;
					style.filter = ""; //remove filters so that we can accurately measure offsetWidth/offsetHeight
					var w = this.t.offsetWidth,
						h = this.t.offsetHeight,
						clip = (cs.position !== "absolute"),
						m = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + b + ", M21=" + c + ", M22=" + d,
						ox = t.x + (w * t.xPercent / 100),
						oy = t.y + (h * t.yPercent / 100),
						dx, dy;
	
					//if transformOrigin is being used, adjust the offset x and y
					if (t.ox != null) {
						dx = ((t.oxp) ? w * t.ox * 0.01 : t.ox) - w / 2;
						dy = ((t.oyp) ? h * t.oy * 0.01 : t.oy) - h / 2;
						ox += dx - (dx * a + dy * b);
						oy += dy - (dx * c + dy * d);
					}
	
					if (!clip) {
						m += ", sizingMethod='auto expand')";
					} else {
						dx = (w / 2);
						dy = (h / 2);
						//translate to ensure that transformations occur around the correct origin (default is center).
						m += ", Dx=" + (dx - (dx * a + dy * b) + ox) + ", Dy=" + (dy - (dx * c + dy * d) + oy) + ")";
					}
					if (filters.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1) {
						style.filter = filters.replace(_ieSetMatrixExp, m);
					} else {
						style.filter = m + " " + filters; //we must always put the transform/matrix FIRST (before alpha(opacity=xx)) to avoid an IE bug that slices part of the object when rotation is applied with alpha.
					}
	
					//at the end or beginning of the tween, if the matrix is normal (1, 0, 0, 1) and opacity is 100 (or doesn't exist), remove the filter to improve browser performance.
					if (v === 0 || v === 1) if (a === 1) if (b === 0) if (c === 0) if (d === 1) if (!clip || m.indexOf("Dx=0, Dy=0") !== -1) if (!_opacityExp.test(filters) || parseFloat(RegExp.$1) === 100) if (filters.indexOf("gradient(" && filters.indexOf("Alpha")) === -1) {
						style.removeAttribute("filter");
					}
	
					//we must set the margins AFTER applying the filter in order to avoid some bugs in IE8 that could (in rare scenarios) cause them to be ignored intermittently (vibration).
					if (!clip) {
						var mult = (_ieVers < 8) ? 1 : -1, //in Internet Explorer 7 and before, the box model is broken, causing the browser to treat the width/height of the actual rotated filtered image as the width/height of the box itself, but Microsoft corrected that in IE8. We must use a negative offset in IE8 on the right/bottom
							marg, prop, dif;
						dx = t.ieOffsetX || 0;
						dy = t.ieOffsetY || 0;
						t.ieOffsetX = Math.round((w - ((a < 0 ? -a : a) * w + (b < 0 ? -b : b) * h)) / 2 + ox);
						t.ieOffsetY = Math.round((h - ((d < 0 ? -d : d) * h + (c < 0 ? -c : c) * w)) / 2 + oy);
						for (i = 0; i < 4; i++) {
							prop = _margins[i];
							marg = cs[prop];
							//we need to get the current margin in case it is being tweened separately (we want to respect that tween's changes)
							val = (marg.indexOf("px") !== -1) ? parseFloat(marg) : _convertToPixels(this.t, prop, parseFloat(marg), marg.replace(_suffixExp, "")) || 0;
							if (val !== t[prop]) {
								dif = (i < 2) ? -t.ieOffsetX : -t.ieOffsetY; //if another tween is controlling a margin, we cannot only apply the difference in the ieOffsets, so we essentially zero-out the dx and dy here in that case. We record the margin(s) later so that we can keep comparing them, making this code very flexible.
							} else {
								dif = (i < 2) ? dx - t.ieOffsetX : dy - t.ieOffsetY;
							}
							style[prop] = (t[prop] = Math.round( val - dif * ((i === 0 || i === 2) ? 1 : mult) )) + "px";
						}
					}
				},
	
				/* translates a super small decimal to a string WITHOUT scientific notation
				_safeDecimal = function(n) {
					var s = (n < 0 ? -n : n) + "",
						a = s.split("e-");
					return (n < 0 ? "-0." : "0.") + new Array(parseInt(a[1], 10) || 0).join("0") + a[0].split(".").join("");
				},
				*/
	
				_setTransformRatio = _internals.set3DTransformRatio = _internals.setTransformRatio = function(v) {
					var t = this.data, //refers to the element's _gsTransform object
						style = this.t.style,
						angle = t.rotation,
						rotationX = t.rotationX,
						rotationY = t.rotationY,
						sx = t.scaleX,
						sy = t.scaleY,
						sz = t.scaleZ,
						x = t.x,
						y = t.y,
						z = t.z,
						isSVG = t.svg,
						perspective = t.perspective,
						force3D = t.force3D,
						a11, a12, a13, a21, a22, a23, a31, a32, a33, a41, a42, a43,
						zOrigin, min, cos, sin, t1, t2, transform, comma, zero, skew, rnd;
					//check to see if we should render as 2D (and SVGs must use 2D when _useSVGTransformAttr is true)
					if (((((v === 1 || v === 0) && force3D === "auto" && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime)) || !force3D) && !z && !perspective && !rotationY && !rotationX && sz === 1) || (_useSVGTransformAttr && isSVG) || !_supports3D) { //on the final render (which could be 0 for a from tween), if there are no 3D aspects, render in 2D to free up memory and improve performance especially on mobile devices. Check the tween's totalTime/totalDuration too in order to make sure it doesn't happen between repeats if it's a repeating tween.
	
						//2D
						if (angle || t.skewX || isSVG) {
							angle *= _DEG2RAD;
							skew = t.skewX * _DEG2RAD;
							rnd = 100000;
							a11 = Math.cos(angle) * sx;
							a21 = Math.sin(angle) * sx;
							a12 = Math.sin(angle - skew) * -sy;
							a22 = Math.cos(angle - skew) * sy;
							if (skew && t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
								t1 = Math.tan(skew);
								t1 = Math.sqrt(1 + t1 * t1);
								a12 *= t1;
								a22 *= t1;
								if (t.skewY) {
									a11 *= t1;
									a21 *= t1;
								}
							}
							if (isSVG) {
								x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
								y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
								if (_useSVGTransformAttr && (t.xPercent || t.yPercent)) { //The SVG spec doesn't support percentage-based translation in the "transform" attribute, so we merge it into the matrix to simulate it.
									min = this.t.getBBox();
									x += t.xPercent * 0.01 * min.width;
									y += t.yPercent * 0.01 * min.height;
								}
								min = 0.000001;
								if (x < min) if (x > -min) {
									x = 0;
								}
								if (y < min) if (y > -min) {
									y = 0;
								}
							}
							transform = (((a11 * rnd) | 0) / rnd) + "," + (((a21 * rnd) | 0) / rnd) + "," + (((a12 * rnd) | 0) / rnd) + "," + (((a22 * rnd) | 0) / rnd) + "," + x + "," + y + ")";
							if (isSVG && _useSVGTransformAttr) {
								this.t.setAttribute("transform", "matrix(" + transform);
							} else {
								//some browsers have a hard time with very small values like 2.4492935982947064e-16 (notice the "e-" towards the end) and would render the object slightly off. So we round to 5 decimal places.
								style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + transform;
							}
						} else {
							style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix(" : "matrix(") + sx + ",0,0," + sy + "," + x + "," + y + ")";
						}
						return;
	
					}
					if (_isFirefox) { //Firefox has a bug (at least in v25) that causes it to render the transparent part of 32-bit PNG images as black when displayed inside an iframe and the 3D scale is very small and doesn't change sufficiently enough between renders (like if you use a Power4.easeInOut to scale from 0 to 1 where the beginning values only change a tiny amount to begin the tween before accelerating). In this case, we force the scale to be 0.00002 instead which is visually the same but works around the Firefox issue.
						min = 0.0001;
						if (sx < min && sx > -min) {
							sx = sz = 0.00002;
						}
						if (sy < min && sy > -min) {
							sy = sz = 0.00002;
						}
						if (perspective && !t.z && !t.rotationX && !t.rotationY) { //Firefox has a bug that causes elements to have an odd super-thin, broken/dotted black border on elements that have a perspective set but aren't utilizing 3D space (no rotationX, rotationY, or z).
							perspective = 0;
						}
					}
					if (angle || t.skewX) {
						angle *= _DEG2RAD;
						cos = a11 = Math.cos(angle);
						sin = a21 = Math.sin(angle);
						if (t.skewX) {
							angle -= t.skewX * _DEG2RAD;
							cos = Math.cos(angle);
							sin = Math.sin(angle);
							if (t.skewType === "simple") { //by default, we compensate skewing on the other axis to make it look more natural, but you can set the skewType to "simple" to use the uncompensated skewing that CSS does
								t1 = Math.tan(t.skewX * _DEG2RAD);
								t1 = Math.sqrt(1 + t1 * t1);
								cos *= t1;
								sin *= t1;
								if (t.skewY) {
									a11 *= t1;
									a21 *= t1;
								}
							}
						}
						a12 = -sin;
						a22 = cos;
	
					} else if (!rotationY && !rotationX && sz === 1 && !perspective && !isSVG) { //if we're only translating and/or 2D scaling, this is faster...
						style[_transformProp] = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) translate3d(" : "translate3d(") + x + "px," + y + "px," + z +"px)" + ((sx !== 1 || sy !== 1) ? " scale(" + sx + "," + sy + ")" : "");
						return;
					} else {
						a11 = a22 = 1;
						a12 = a21 = 0;
					}
					// KEY  INDEX   AFFECTS
					// a11  0       rotation, rotationY, scaleX
					// a21  1       rotation, rotationY, scaleX
					// a31  2       rotationY, scaleX
					// a41  3       rotationY, scaleX
					// a12  4       rotation, skewX, rotationX, scaleY
					// a22  5       rotation, skewX, rotationX, scaleY
					// a32  6       rotationX, scaleY
					// a42  7       rotationX, scaleY
					// a13  8       rotationY, rotationX, scaleZ
					// a23  9       rotationY, rotationX, scaleZ
					// a33  10      rotationY, rotationX, scaleZ
					// a43  11      rotationY, rotationX, perspective, scaleZ
					// a14  12      x, zOrigin, svgOrigin
					// a24  13      y, zOrigin, svgOrigin
					// a34  14      z, zOrigin
					// a44  15
					// rotation: Math.atan2(a21, a11)
					// rotationY: Math.atan2(a13, a33) (or Math.atan2(a13, a11))
					// rotationX: Math.atan2(a32, a33)
					a33 = 1;
					a13 = a23 = a31 = a32 = a41 = a42 = 0;
					a43 = (perspective) ? -1 / perspective : 0;
					zOrigin = t.zOrigin;
					min = 0.000001; //threshold below which browsers use scientific notation which won't work.
					comma = ",";
					zero = "0";
					angle = rotationY * _DEG2RAD;
					if (angle) {
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						a31 = -sin;
						a41 = a43*-sin;
						a13 = a11*sin;
						a23 = a21*sin;
						a33 = cos;
						a43 *= cos;
						a11 *= cos;
						a21 *= cos;
					}
					angle = rotationX * _DEG2RAD;
					if (angle) {
						cos = Math.cos(angle);
						sin = Math.sin(angle);
						t1 = a12*cos+a13*sin;
						t2 = a22*cos+a23*sin;
						a32 = a33*sin;
						a42 = a43*sin;
						a13 = a12*-sin+a13*cos;
						a23 = a22*-sin+a23*cos;
						a33 = a33*cos;
						a43 = a43*cos;
						a12 = t1;
						a22 = t2;
					}
					if (sz !== 1) {
						a13*=sz;
						a23*=sz;
						a33*=sz;
						a43*=sz;
					}
					if (sy !== 1) {
						a12*=sy;
						a22*=sy;
						a32*=sy;
						a42*=sy;
					}
					if (sx !== 1) {
						a11*=sx;
						a21*=sx;
						a31*=sx;
						a41*=sx;
					}
	
					if (zOrigin || isSVG) {
						if (zOrigin) {
							x += a13*-zOrigin;
							y += a23*-zOrigin;
							z += a33*-zOrigin+zOrigin;
						}
						if (isSVG) { //due to bugs in some browsers, we need to manage the transform-origin of SVG manually
							x += t.xOrigin - (t.xOrigin * a11 + t.yOrigin * a12) + t.xOffset;
							y += t.yOrigin - (t.xOrigin * a21 + t.yOrigin * a22) + t.yOffset;
						}
						if (x < min && x > -min) {
							x = zero;
						}
						if (y < min && y > -min) {
							y = zero;
						}
						if (z < min && z > -min) {
							z = 0; //don't use string because we calculate perspective later and need the number.
						}
					}
	
					//optimized way of concatenating all the values into a string. If we do it all in one shot, it's slower because of the way browsers have to create temp strings and the way it affects memory. If we do it piece-by-piece with +=, it's a bit slower too. We found that doing it in these sized chunks works best overall:
					transform = ((t.xPercent || t.yPercent) ? "translate(" + t.xPercent + "%," + t.yPercent + "%) matrix3d(" : "matrix3d(");
					transform += ((a11 < min && a11 > -min) ? zero : a11) + comma + ((a21 < min && a21 > -min) ? zero : a21) + comma + ((a31 < min && a31 > -min) ? zero : a31);
					transform += comma + ((a41 < min && a41 > -min) ? zero : a41) + comma + ((a12 < min && a12 > -min) ? zero : a12) + comma + ((a22 < min && a22 > -min) ? zero : a22);
					if (rotationX || rotationY || sz !== 1) { //performance optimization (often there's no rotationX or rotationY, so we can skip these calculations)
						transform += comma + ((a32 < min && a32 > -min) ? zero : a32) + comma + ((a42 < min && a42 > -min) ? zero : a42) + comma + ((a13 < min && a13 > -min) ? zero : a13);
						transform += comma + ((a23 < min && a23 > -min) ? zero : a23) + comma + ((a33 < min && a33 > -min) ? zero : a33) + comma + ((a43 < min && a43 > -min) ? zero : a43) + comma;
					} else {
						transform += ",0,0,0,0,1,0,";
					}
					transform += x + comma + y + comma + z + comma + (perspective ? (1 + (-z / perspective)) : 1) + ")";
	
					style[_transformProp] = transform;
				};
	
			p = Transform.prototype;
			p.x = p.y = p.z = p.skewX = p.skewY = p.rotation = p.rotationX = p.rotationY = p.zOrigin = p.xPercent = p.yPercent = p.xOffset = p.yOffset = 0;
			p.scaleX = p.scaleY = p.scaleZ = 1;
	
			_registerComplexSpecialProp("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {parser:function(t, e, p, cssp, pt, plugin, vars) {
				if (cssp._lastParsedTransform === vars) { return pt; } //only need to parse the transform once, and only if the browser supports it.
				cssp._lastParsedTransform = vars;
				var originalGSTransform = t._gsTransform,
					style = t.style,
					min = 0.000001,
					i = _transformProps.length,
					v = vars,
					endRotations = {},
					transformOriginString = "transformOrigin",
					m1, m2, skewY, copy, orig, has3D, hasChange, dr, x, y;
				if (vars.display) { //if the user is setting display during this tween, it may not be instantiated yet but we must force it here in order to get accurate readings. If display is "none", some browsers refuse to report the transform properties correctly.
					copy = _getStyle(t, "display");
					style.display = "block";
					m1 = _getTransform(t, _cs, true, vars.parseTransform);
					style.display = copy;
				} else {
					m1 = _getTransform(t, _cs, true, vars.parseTransform);
				}
				cssp._transform = m1;
				if (typeof(v.transform) === "string" && _transformProp) { //for values like transform:"rotate(60deg) scale(0.5, 0.8)"
					copy = _tempDiv.style; //don't use the original target because it might be SVG in which case some browsers don't report computed style correctly.
					copy[_transformProp] = v.transform;
					copy.display = "block"; //if display is "none", the browser often refuses to report the transform properties correctly.
					copy.position = "absolute";
					_doc.body.appendChild(_tempDiv);
					m2 = _getTransform(_tempDiv, null, false);
					_doc.body.removeChild(_tempDiv);
					if (!m2.perspective) {
						m2.perspective = m1.perspective; //tweening to no perspective gives very unintuitive results - just keep the same perspective in that case.
					}
					if (v.xPercent != null) {
						m2.xPercent = _parseVal(v.xPercent, m1.xPercent);
					}
					if (v.yPercent != null) {
						m2.yPercent = _parseVal(v.yPercent, m1.yPercent);
					}
				} else if (typeof(v) === "object") { //for values like scaleX, scaleY, rotation, x, y, skewX, and skewY or transform:{...} (object)
					m2 = {scaleX:_parseVal((v.scaleX != null) ? v.scaleX : v.scale, m1.scaleX),
						scaleY:_parseVal((v.scaleY != null) ? v.scaleY : v.scale, m1.scaleY),
						scaleZ:_parseVal(v.scaleZ, m1.scaleZ),
						x:_parseVal(v.x, m1.x),
						y:_parseVal(v.y, m1.y),
						z:_parseVal(v.z, m1.z),
						xPercent:_parseVal(v.xPercent, m1.xPercent),
						yPercent:_parseVal(v.yPercent, m1.yPercent),
						perspective:_parseVal(v.transformPerspective, m1.perspective)};
					dr = v.directionalRotation;
					if (dr != null) {
						if (typeof(dr) === "object") {
							for (copy in dr) {
								v[copy] = dr[copy];
							}
						} else {
							v.rotation = dr;
						}
					}
					if (typeof(v.x) === "string" && v.x.indexOf("%") !== -1) {
						m2.x = 0;
						m2.xPercent = _parseVal(v.x, m1.xPercent);
					}
					if (typeof(v.y) === "string" && v.y.indexOf("%") !== -1) {
						m2.y = 0;
						m2.yPercent = _parseVal(v.y, m1.yPercent);
					}
	
					m2.rotation = _parseAngle(("rotation" in v) ? v.rotation : ("shortRotation" in v) ? v.shortRotation + "_short" : ("rotationZ" in v) ? v.rotationZ : m1.rotation, m1.rotation, "rotation", endRotations);
					if (_supports3D) {
						m2.rotationX = _parseAngle(("rotationX" in v) ? v.rotationX : ("shortRotationX" in v) ? v.shortRotationX + "_short" : m1.rotationX || 0, m1.rotationX, "rotationX", endRotations);
						m2.rotationY = _parseAngle(("rotationY" in v) ? v.rotationY : ("shortRotationY" in v) ? v.shortRotationY + "_short" : m1.rotationY || 0, m1.rotationY, "rotationY", endRotations);
					}
					m2.skewX = (v.skewX == null) ? m1.skewX : _parseAngle(v.skewX, m1.skewX);
	
					//note: for performance reasons, we combine all skewing into the skewX and rotation values, ignoring skewY but we must still record it so that we can discern how much of the overall skew is attributed to skewX vs. skewY. Otherwise, if the skewY would always act relative (tween skewY to 10deg, for example, multiple times and if we always combine things into skewX, we can't remember that skewY was 10 from last time). Remember, a skewY of 10 degrees looks the same as a rotation of 10 degrees plus a skewX of -10 degrees.
					m2.skewY = (v.skewY == null) ? m1.skewY : _parseAngle(v.skewY, m1.skewY);
					if ((skewY = m2.skewY - m1.skewY)) {
						m2.skewX += skewY;
						m2.rotation += skewY;
					}
				}
				if (_supports3D && v.force3D != null) {
					m1.force3D = v.force3D;
					hasChange = true;
				}
	
				m1.skewType = v.skewType || m1.skewType || CSSPlugin.defaultSkewType;
	
				has3D = (m1.force3D || m1.z || m1.rotationX || m1.rotationY || m2.z || m2.rotationX || m2.rotationY || m2.perspective);
				if (!has3D && v.scale != null) {
					m2.scaleZ = 1; //no need to tween scaleZ.
				}
	
				while (--i > -1) {
					p = _transformProps[i];
					orig = m2[p] - m1[p];
					if (orig > min || orig < -min || v[p] != null || _forcePT[p] != null) {
						hasChange = true;
						pt = new CSSPropTween(m1, p, m1[p], orig, pt);
						if (p in endRotations) {
							pt.e = endRotations[p]; //directional rotations typically have compensated values during the tween, but we need to make sure they end at exactly what the user requested
						}
						pt.xs0 = 0; //ensures the value stays numeric in setRatio()
						pt.plugin = plugin;
						cssp._overwriteProps.push(pt.n);
					}
				}
	
				orig = v.transformOrigin;
				if (m1.svg && (orig || v.svgOrigin)) {
					x = m1.xOffset; //when we change the origin, in order to prevent things from jumping we adjust the x/y so we must record those here so that we can create PropTweens for them and flip them at the same time as the origin
					y = m1.yOffset;
					_parseSVGOrigin(t, _parsePosition(orig), m2, v.svgOrigin, v.smoothOrigin);
					pt = _addNonTweeningNumericPT(m1, "xOrigin", (originalGSTransform ? m1 : m2).xOrigin, m2.xOrigin, pt, transformOriginString); //note: if there wasn't a transformOrigin defined yet, just start with the destination one; it's wasteful otherwise, and it causes problems with fromTo() tweens. For example, TweenLite.to("#wheel", 3, {rotation:180, transformOrigin:"50% 50%", delay:1}); TweenLite.fromTo("#wheel", 3, {scale:0.5, transformOrigin:"50% 50%"}, {scale:1, delay:2}); would cause a jump when the from values revert at the beginning of the 2nd tween.
					pt = _addNonTweeningNumericPT(m1, "yOrigin", (originalGSTransform ? m1 : m2).yOrigin, m2.yOrigin, pt, transformOriginString);
					if (x !== m1.xOffset || y !== m1.yOffset) {
						pt = _addNonTweeningNumericPT(m1, "xOffset", (originalGSTransform ? x : m1.xOffset), m1.xOffset, pt, transformOriginString);
						pt = _addNonTweeningNumericPT(m1, "yOffset", (originalGSTransform ? y : m1.yOffset), m1.yOffset, pt, transformOriginString);
					}
					orig = _useSVGTransformAttr ? null : "0px 0px"; //certain browsers (like firefox) completely botch transform-origin, so we must remove it to prevent it from contaminating transforms. We manage it ourselves with xOrigin and yOrigin
				}
				if (orig || (_supports3D && has3D && m1.zOrigin)) { //if anything 3D is happening and there's a transformOrigin with a z component that's non-zero, we must ensure that the transformOrigin's z-component is set to 0 so that we can manually do those calculations to get around Safari bugs. Even if the user didn't specifically define a "transformOrigin" in this particular tween (maybe they did it via css directly).
					if (_transformProp) {
						hasChange = true;
						p = _transformOriginProp;
						orig = (orig || _getStyle(t, p, _cs, false, "50% 50%")) + ""; //cast as string to avoid errors
						pt = new CSSPropTween(style, p, 0, 0, pt, -1, transformOriginString);
						pt.b = style[p];
						pt.plugin = plugin;
						if (_supports3D) {
							copy = m1.zOrigin;
							orig = orig.split(" ");
							m1.zOrigin = ((orig.length > 2 && !(copy !== 0 && orig[2] === "0px")) ? parseFloat(orig[2]) : copy) || 0; //Safari doesn't handle the z part of transformOrigin correctly, so we'll manually handle it in the _set3DTransformRatio() method.
							pt.xs0 = pt.e = orig[0] + " " + (orig[1] || "50%") + " 0px"; //we must define a z value of 0px specifically otherwise iOS 5 Safari will stick with the old one (if one was defined)!
							pt = new CSSPropTween(m1, "zOrigin", 0, 0, pt, -1, pt.n); //we must create a CSSPropTween for the _gsTransform.zOrigin so that it gets reset properly at the beginning if the tween runs backward (as opposed to just setting m1.zOrigin here)
							pt.b = copy;
							pt.xs0 = pt.e = m1.zOrigin;
						} else {
							pt.xs0 = pt.e = orig;
						}
	
						//for older versions of IE (6-8), we need to manually calculate things inside the setRatio() function. We record origin x and y (ox and oy) and whether or not the values are percentages (oxp and oyp).
					} else {
						_parsePosition(orig + "", m1);
					}
				}
				if (hasChange) {
					cssp._transformType = (!(m1.svg && _useSVGTransformAttr) && (has3D || this._transformType === 3)) ? 3 : 2; //quicker than calling cssp._enableTransforms();
				}
				return pt;
			}, prefix:true});
	
			_registerComplexSpecialProp("boxShadow", {defaultValue:"0px 0px 0px 0px #999", prefix:true, color:true, multi:true, keyword:"inset"});
	
			_registerComplexSpecialProp("borderRadius", {defaultValue:"0px", parser:function(t, e, p, cssp, pt, plugin) {
				e = this.format(e);
				var props = ["borderTopLeftRadius","borderTopRightRadius","borderBottomRightRadius","borderBottomLeftRadius"],
					style = t.style,
					ea1, i, es2, bs2, bs, es, bn, en, w, h, esfx, bsfx, rel, hn, vn, em;
				w = parseFloat(t.offsetWidth);
				h = parseFloat(t.offsetHeight);
				ea1 = e.split(" ");
				for (i = 0; i < props.length; i++) { //if we're dealing with percentages, we must convert things separately for the horizontal and vertical axis!
					if (this.p.indexOf("border")) { //older browsers used a prefix
						props[i] = _checkPropPrefix(props[i]);
					}
					bs = bs2 = _getStyle(t, props[i], _cs, false, "0px");
					if (bs.indexOf(" ") !== -1) {
						bs2 = bs.split(" ");
						bs = bs2[0];
						bs2 = bs2[1];
					}
					es = es2 = ea1[i];
					bn = parseFloat(bs);
					bsfx = bs.substr((bn + "").length);
					rel = (es.charAt(1) === "=");
					if (rel) {
						en = parseInt(es.charAt(0)+"1", 10);
						es = es.substr(2);
						en *= parseFloat(es);
						esfx = es.substr((en + "").length - (en < 0 ? 1 : 0)) || "";
					} else {
						en = parseFloat(es);
						esfx = es.substr((en + "").length);
					}
					if (esfx === "") {
						esfx = _suffixMap[p] || bsfx;
					}
					if (esfx !== bsfx) {
						hn = _convertToPixels(t, "borderLeft", bn, bsfx); //horizontal number (we use a bogus "borderLeft" property just because the _convertToPixels() method searches for the keywords "Left", "Right", "Top", and "Bottom" to determine of it's a horizontal or vertical property, and we need "border" in the name so that it knows it should measure relative to the element itself, not its parent.
						vn = _convertToPixels(t, "borderTop", bn, bsfx); //vertical number
						if (esfx === "%") {
							bs = (hn / w * 100) + "%";
							bs2 = (vn / h * 100) + "%";
						} else if (esfx === "em") {
							em = _convertToPixels(t, "borderLeft", 1, "em");
							bs = (hn / em) + "em";
							bs2 = (vn / em) + "em";
						} else {
							bs = hn + "px";
							bs2 = vn + "px";
						}
						if (rel) {
							es = (parseFloat(bs) + en) + esfx;
							es2 = (parseFloat(bs2) + en) + esfx;
						}
					}
					pt = _parseComplex(style, props[i], bs + " " + bs2, es + " " + es2, false, "0px", pt);
				}
				return pt;
			}, prefix:true, formatter:_getFormatter("0px 0px 0px 0px", false, true)});
			_registerComplexSpecialProp("backgroundPosition", {defaultValue:"0 0", parser:function(t, e, p, cssp, pt, plugin) {
				var bp = "background-position",
					cs = (_cs || _getComputedStyle(t, null)),
					bs = this.format( ((cs) ? _ieVers ? cs.getPropertyValue(bp + "-x") + " " + cs.getPropertyValue(bp + "-y") : cs.getPropertyValue(bp) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), //Internet Explorer doesn't report background-position correctly - we must query background-position-x and background-position-y and combine them (even in IE10). Before IE9, we must do the same with the currentStyle object and use camelCase
					es = this.format(e),
					ba, ea, i, pct, overlap, src;
				if ((bs.indexOf("%") !== -1) !== (es.indexOf("%") !== -1)) {
					src = _getStyle(t, "backgroundImage").replace(_urlExp, "");
					if (src && src !== "none") {
						ba = bs.split(" ");
						ea = es.split(" ");
						_tempImg.setAttribute("src", src); //set the temp IMG's src to the background-image so that we can measure its width/height
						i = 2;
						while (--i > -1) {
							bs = ba[i];
							pct = (bs.indexOf("%") !== -1);
							if (pct !== (ea[i].indexOf("%") !== -1)) {
								overlap = (i === 0) ? t.offsetWidth - _tempImg.width : t.offsetHeight - _tempImg.height;
								ba[i] = pct ? (parseFloat(bs) / 100 * overlap) + "px" : (parseFloat(bs) / overlap * 100) + "%";
							}
						}
						bs = ba.join(" ");
					}
				}
				return this.parseComplex(t.style, bs, es, pt, plugin);
			}, formatter:_parsePosition});
			_registerComplexSpecialProp("backgroundSize", {defaultValue:"0 0", formatter:_parsePosition});
			_registerComplexSpecialProp("perspective", {defaultValue:"0px", prefix:true});
			_registerComplexSpecialProp("perspectiveOrigin", {defaultValue:"50% 50%", prefix:true});
			_registerComplexSpecialProp("transformStyle", {prefix:true});
			_registerComplexSpecialProp("backfaceVisibility", {prefix:true});
			_registerComplexSpecialProp("userSelect", {prefix:true});
			_registerComplexSpecialProp("margin", {parser:_getEdgeParser("marginTop,marginRight,marginBottom,marginLeft")});
			_registerComplexSpecialProp("padding", {parser:_getEdgeParser("paddingTop,paddingRight,paddingBottom,paddingLeft")});
			_registerComplexSpecialProp("clip", {defaultValue:"rect(0px,0px,0px,0px)", parser:function(t, e, p, cssp, pt, plugin){
				var b, cs, delim;
				if (_ieVers < 9) { //IE8 and earlier don't report a "clip" value in the currentStyle - instead, the values are split apart into clipTop, clipRight, clipBottom, and clipLeft. Also, in IE7 and earlier, the values inside rect() are space-delimited, not comma-delimited.
					cs = t.currentStyle;
					delim = _ieVers < 8 ? " " : ",";
					b = "rect(" + cs.clipTop + delim + cs.clipRight + delim + cs.clipBottom + delim + cs.clipLeft + ")";
					e = this.format(e).split(",").join(delim);
				} else {
					b = this.format(_getStyle(t, this.p, _cs, false, this.dflt));
					e = this.format(e);
				}
				return this.parseComplex(t.style, b, e, pt, plugin);
			}});
			_registerComplexSpecialProp("textShadow", {defaultValue:"0px 0px 0px #999", color:true, multi:true});
			_registerComplexSpecialProp("autoRound,strictUnits", {parser:function(t, e, p, cssp, pt) {return pt;}}); //just so that we can ignore these properties (not tween them)
			_registerComplexSpecialProp("border", {defaultValue:"0px solid #000", parser:function(t, e, p, cssp, pt, plugin) {
					return this.parseComplex(t.style, this.format(_getStyle(t, "borderTopWidth", _cs, false, "0px") + " " + _getStyle(t, "borderTopStyle", _cs, false, "solid") + " " + _getStyle(t, "borderTopColor", _cs, false, "#000")), this.format(e), pt, plugin);
				}, color:true, formatter:function(v) {
					var a = v.split(" ");
					return a[0] + " " + (a[1] || "solid") + " " + (v.match(_colorExp) || ["#000"])[0];
				}});
			_registerComplexSpecialProp("borderWidth", {parser:_getEdgeParser("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}); //Firefox doesn't pick up on borderWidth set in style sheets (only inline).
			_registerComplexSpecialProp("float,cssFloat,styleFloat", {parser:function(t, e, p, cssp, pt, plugin) {
				var s = t.style,
					prop = ("cssFloat" in s) ? "cssFloat" : "styleFloat";
				return new CSSPropTween(s, prop, 0, 0, pt, -1, p, false, 0, s[prop], e);
			}});
	
			//opacity-related
			var _setIEOpacityRatio = function(v) {
					var t = this.t, //refers to the element's style property
						filters = t.filter || _getStyle(this.data, "filter") || "",
						val = (this.s + this.c * v) | 0,
						skip;
					if (val === 100) { //for older versions of IE that need to use a filter to apply opacity, we should remove the filter if opacity hits 1 in order to improve performance, but make sure there isn't a transform (matrix) or gradient in the filters.
						if (filters.indexOf("atrix(") === -1 && filters.indexOf("radient(") === -1 && filters.indexOf("oader(") === -1) {
							t.removeAttribute("filter");
							skip = (!_getStyle(this.data, "filter")); //if a class is applied that has an alpha filter, it will take effect (we don't want that), so re-apply our alpha filter in that case. We must first remove it and then check.
						} else {
							t.filter = filters.replace(_alphaFilterExp, "");
							skip = true;
						}
					}
					if (!skip) {
						if (this.xn1) {
							t.filter = filters = filters || ("alpha(opacity=" + val + ")"); //works around bug in IE7/8 that prevents changes to "visibility" from being applied properly if the filter is changed to a different alpha on the same frame.
						}
						if (filters.indexOf("pacity") === -1) { //only used if browser doesn't support the standard opacity style property (IE 7 and 8). We omit the "O" to avoid case-sensitivity issues
							if (val !== 0 || !this.xn1) { //bugs in IE7/8 won't render the filter properly if opacity is ADDED on the same frame/render as "visibility" changes (this.xn1 is 1 if this tween is an "autoAlpha" tween)
								t.filter = filters + " alpha(opacity=" + val + ")"; //we round the value because otherwise, bugs in IE7/8 can prevent "visibility" changes from being applied properly.
							}
						} else {
							t.filter = filters.replace(_opacityExp, "opacity=" + val);
						}
					}
				};
			_registerComplexSpecialProp("opacity,alpha,autoAlpha", {defaultValue:"1", parser:function(t, e, p, cssp, pt, plugin) {
				var b = parseFloat(_getStyle(t, "opacity", _cs, false, "1")),
					style = t.style,
					isAutoAlpha = (p === "autoAlpha");
				if (typeof(e) === "string" && e.charAt(1) === "=") {
					e = ((e.charAt(0) === "-") ? -1 : 1) * parseFloat(e.substr(2)) + b;
				}
				if (isAutoAlpha && b === 1 && _getStyle(t, "visibility", _cs) === "hidden" && e !== 0) { //if visibility is initially set to "hidden", we should interpret that as intent to make opacity 0 (a convenience)
					b = 0;
				}
				if (_supportsOpacity) {
					pt = new CSSPropTween(style, "opacity", b, e - b, pt);
				} else {
					pt = new CSSPropTween(style, "opacity", b * 100, (e - b) * 100, pt);
					pt.xn1 = isAutoAlpha ? 1 : 0; //we need to record whether or not this is an autoAlpha so that in the setRatio(), we know to duplicate the setting of the alpha in order to work around a bug in IE7 and IE8 that prevents changes to "visibility" from taking effect if the filter is changed to a different alpha(opacity) at the same time. Setting it to the SAME value first, then the new value works around the IE7/8 bug.
					style.zoom = 1; //helps correct an IE issue.
					pt.type = 2;
					pt.b = "alpha(opacity=" + pt.s + ")";
					pt.e = "alpha(opacity=" + (pt.s + pt.c) + ")";
					pt.data = t;
					pt.plugin = plugin;
					pt.setRatio = _setIEOpacityRatio;
				}
				if (isAutoAlpha) { //we have to create the "visibility" PropTween after the opacity one in the linked list so that they run in the order that works properly in IE8 and earlier
					pt = new CSSPropTween(style, "visibility", 0, 0, pt, -1, null, false, 0, ((b !== 0) ? "inherit" : "hidden"), ((e === 0) ? "hidden" : "inherit"));
					pt.xs0 = "inherit";
					cssp._overwriteProps.push(pt.n);
					cssp._overwriteProps.push(p);
				}
				return pt;
			}});
	
	
			var _removeProp = function(s, p) {
					if (p) {
						if (s.removeProperty) {
							if (p.substr(0,2) === "ms" || p.substr(0,6) === "webkit") { //Microsoft and some Webkit browsers don't conform to the standard of capitalizing the first prefix character, so we adjust so that when we prefix the caps with a dash, it's correct (otherwise it'd be "ms-transform" instead of "-ms-transform" for IE9, for example)
								p = "-" + p;
							}
							s.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
						} else { //note: old versions of IE use "removeAttribute()" instead of "removeProperty()"
							s.removeAttribute(p);
						}
					}
				},
				_setClassNameRatio = function(v) {
					this.t._gsClassPT = this;
					if (v === 1 || v === 0) {
						this.t.setAttribute("class", (v === 0) ? this.b : this.e);
						var mpt = this.data, //first MiniPropTween
							s = this.t.style;
						while (mpt) {
							if (!mpt.v) {
								_removeProp(s, mpt.p);
							} else {
								s[mpt.p] = mpt.v;
							}
							mpt = mpt._next;
						}
						if (v === 1 && this.t._gsClassPT === this) {
							this.t._gsClassPT = null;
						}
					} else if (this.t.getAttribute("class") !== this.e) {
						this.t.setAttribute("class", this.e);
					}
				};
			_registerComplexSpecialProp("className", {parser:function(t, e, p, cssp, pt, plugin, vars) {
				var b = t.getAttribute("class") || "", //don't use t.className because it doesn't work consistently on SVG elements; getAttribute("class") and setAttribute("class", value") is more reliable.
					cssText = t.style.cssText,
					difData, bs, cnpt, cnptLookup, mpt;
				pt = cssp._classNamePT = new CSSPropTween(t, p, 0, 0, pt, 2);
				pt.setRatio = _setClassNameRatio;
				pt.pr = -11;
				_hasPriority = true;
				pt.b = b;
				bs = _getAllStyles(t, _cs);
				//if there's a className tween already operating on the target, force it to its end so that the necessary inline styles are removed and the class name is applied before we determine the end state (we don't want inline styles interfering that were there just for class-specific values)
				cnpt = t._gsClassPT;
				if (cnpt) {
					cnptLookup = {};
					mpt = cnpt.data; //first MiniPropTween which stores the inline styles - we need to force these so that the inline styles don't contaminate things. Otherwise, there's a small chance that a tween could start and the inline values match the destination values and they never get cleaned.
					while (mpt) {
						cnptLookup[mpt.p] = 1;
						mpt = mpt._next;
					}
					cnpt.setRatio(1);
				}
				t._gsClassPT = pt;
				pt.e = (e.charAt(1) !== "=") ? e : b.replace(new RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ((e.charAt(0) === "+") ? " " + e.substr(2) : "");
				t.setAttribute("class", pt.e);
				difData = _cssDif(t, bs, _getAllStyles(t), vars, cnptLookup);
				t.setAttribute("class", b);
				pt.data = difData.firstMPT;
				t.style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
				pt = pt.xfirst = cssp.parse(t, difData.difs, pt, plugin); //we record the CSSPropTween as the xfirst so that we can handle overwriting propertly (if "className" gets overwritten, we must kill all the properties associated with the className part of the tween, so we can loop through from xfirst to the pt itself)
				return pt;
			}});
	
	
			var _setClearPropsRatio = function(v) {
				if (v === 1 || v === 0) if (this.data._totalTime === this.data._totalDuration && this.data.data !== "isFromStart") { //this.data refers to the tween. Only clear at the END of the tween (remember, from() tweens make the ratio go from 1 to 0, so we can't just check that and if the tween is the zero-duration one that's created internally to render the starting values in a from() tween, ignore that because otherwise, for example, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in).
					var s = this.t.style,
						transformParse = _specialProps.transform.parse,
						a, p, i, clearTransform, transform;
					if (this.e === "all") {
						s.cssText = "";
						clearTransform = true;
					} else {
						a = this.e.split(" ").join("").split(",");
						i = a.length;
						while (--i > -1) {
							p = a[i];
							if (_specialProps[p]) {
								if (_specialProps[p].parse === transformParse) {
									clearTransform = true;
								} else {
									p = (p === "transformOrigin") ? _transformOriginProp : _specialProps[p].p; //ensures that special properties use the proper browser-specific property name, like "scaleX" might be "-webkit-transform" or "boxShadow" might be "-moz-box-shadow"
								}
							}
							_removeProp(s, p);
						}
					}
					if (clearTransform) {
						_removeProp(s, _transformProp);
						transform = this.t._gsTransform;
						if (transform) {
							if (transform.svg) {
								this.t.removeAttribute("data-svg-origin");
								this.t.removeAttribute("transform");
							}
							delete this.t._gsTransform;
						}
					}
	
				}
			};
			_registerComplexSpecialProp("clearProps", {parser:function(t, e, p, cssp, pt) {
				pt = new CSSPropTween(t, p, 0, 0, pt, 2);
				pt.setRatio = _setClearPropsRatio;
				pt.e = e;
				pt.pr = -10;
				pt.data = cssp._tween;
				_hasPriority = true;
				return pt;
			}});
	
			p = "bezier,throwProps,physicsProps,physics2D".split(",");
			i = p.length;
			while (i--) {
				_registerPluginProp(p[i]);
			}
	
	
	
	
	
	
	
	
			p = CSSPlugin.prototype;
			p._firstPT = p._lastParsedTransform = p._transform = null;
	
			//gets called when the tween renders for the first time. This kicks everything off, recording start/end values, etc.
			p._onInitTween = function(target, vars, tween) {
				if (!target.nodeType) { //css is only for dom elements
					return false;
				}
				this._target = target;
				this._tween = tween;
				this._vars = vars;
				_autoRound = vars.autoRound;
				_hasPriority = false;
				_suffixMap = vars.suffixMap || CSSPlugin.suffixMap;
				_cs = _getComputedStyle(target, "");
				_overwriteProps = this._overwriteProps;
				var style = target.style,
					v, pt, pt2, first, last, next, zIndex, tpt, threeD;
				if (_reqSafariFix) if (style.zIndex === "") {
					v = _getStyle(target, "zIndex", _cs);
					if (v === "auto" || v === "") {
						//corrects a bug in [non-Android] Safari that prevents it from repainting elements in their new positions if they don't have a zIndex set. We also can't just apply this inside _parseTransform() because anything that's moved in any way (like using "left" or "top" instead of transforms like "x" and "y") can be affected, so it is best to ensure that anything that's tweening has a z-index. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly. Plus zIndex is less memory-intensive.
						this._addLazySet(style, "zIndex", 0);
					}
				}
	
				if (typeof(vars) === "string") {
					first = style.cssText;
					v = _getAllStyles(target, _cs);
					style.cssText = first + ";" + vars;
					v = _cssDif(target, v, _getAllStyles(target)).difs;
					if (!_supportsOpacity && _opacityValExp.test(vars)) {
						v.opacity = parseFloat( RegExp.$1 );
					}
					vars = v;
					style.cssText = first;
				}
	
				if (vars.className) { //className tweens will combine any differences they find in the css with the vars that are passed in, so {className:"myClass", scale:0.5, left:20} would work.
					this._firstPT = pt = _specialProps.className.parse(target, vars.className, "className", this, null, null, vars);
				} else {
					this._firstPT = pt = this.parse(target, vars, null);
				}
	
				if (this._transformType) {
					threeD = (this._transformType === 3);
					if (!_transformProp) {
						style.zoom = 1; //helps correct an IE issue.
					} else if (_isSafari) {
						_reqSafariFix = true;
						//if zIndex isn't set, iOS Safari doesn't repaint things correctly sometimes (seemingly at random).
						if (style.zIndex === "") {
							zIndex = _getStyle(target, "zIndex", _cs);
							if (zIndex === "auto" || zIndex === "") {
								this._addLazySet(style, "zIndex", 0);
							}
						}
						//Setting WebkitBackfaceVisibility corrects 3 bugs:
						// 1) [non-Android] Safari skips rendering changes to "top" and "left" that are made on the same frame/render as a transform update.
						// 2) iOS Safari sometimes neglects to repaint elements in their new positions. Setting "WebkitPerspective" to a non-zero value worked too except that on iOS Safari things would flicker randomly.
						// 3) Safari sometimes displayed odd artifacts when tweening the transform (or WebkitTransform) property, like ghosts of the edges of the element remained. Definitely a browser bug.
						//Note: we allow the user to override the auto-setting by defining WebkitBackfaceVisibility in the vars of the tween.
						if (_isSafariLT6) {
							this._addLazySet(style, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (threeD ? "visible" : "hidden"));
						}
					}
					pt2 = pt;
					while (pt2 && pt2._next) {
						pt2 = pt2._next;
					}
					tpt = new CSSPropTween(target, "transform", 0, 0, null, 2);
					this._linkCSSP(tpt, null, pt2);
					tpt.setRatio = _transformProp ? _setTransformRatio : _setIETransformRatio;
					tpt.data = this._transform || _getTransform(target, _cs, true);
					tpt.tween = tween;
					tpt.pr = -1; //ensures that the transforms get applied after the components are updated.
					_overwriteProps.pop(); //we don't want to force the overwrite of all "transform" tweens of the target - we only care about individual transform properties like scaleX, rotation, etc. The CSSPropTween constructor automatically adds the property to _overwriteProps which is why we need to pop() here.
				}
	
				if (_hasPriority) {
					//reorders the linked list in order of pr (priority)
					while (pt) {
						next = pt._next;
						pt2 = first;
						while (pt2 && pt2.pr > pt.pr) {
							pt2 = pt2._next;
						}
						if ((pt._prev = pt2 ? pt2._prev : last)) {
							pt._prev._next = pt;
						} else {
							first = pt;
						}
						if ((pt._next = pt2)) {
							pt2._prev = pt;
						} else {
							last = pt;
						}
						pt = next;
					}
					this._firstPT = first;
				}
				return true;
			};
	
	
			p.parse = function(target, vars, pt, plugin) {
				var style = target.style,
					p, sp, bn, en, bs, es, bsfx, esfx, isStr, rel;
				for (p in vars) {
					es = vars[p]; //ending value string
					sp = _specialProps[p]; //SpecialProp lookup.
					if (sp) {
						pt = sp.parse(target, es, p, this, pt, plugin, vars);
	
					} else {
						bs = _getStyle(target, p, _cs) + "";
						isStr = (typeof(es) === "string");
						if (p === "color" || p === "fill" || p === "stroke" || p.indexOf("Color") !== -1 || (isStr && _rgbhslExp.test(es))) { //Opera uses background: to define color sometimes in addition to backgroundColor:
							if (!isStr) {
								es = _parseColor(es);
								es = ((es.length > 3) ? "rgba(" : "rgb(") + es.join(",") + ")";
							}
							pt = _parseComplex(style, p, bs, es, true, "transparent", pt, 0, plugin);
	
						} else if (isStr && (es.indexOf(" ") !== -1 || es.indexOf(",") !== -1)) {
							pt = _parseComplex(style, p, bs, es, true, null, pt, 0, plugin);
	
						} else {
							bn = parseFloat(bs);
							bsfx = (bn || bn === 0) ? bs.substr((bn + "").length) : ""; //remember, bs could be non-numeric like "normal" for fontWeight, so we should default to a blank suffix in that case.
	
							if (bs === "" || bs === "auto") {
								if (p === "width" || p === "height") {
									bn = _getDimension(target, p, _cs);
									bsfx = "px";
								} else if (p === "left" || p === "top") {
									bn = _calculateOffset(target, p, _cs);
									bsfx = "px";
								} else {
									bn = (p !== "opacity") ? 0 : 1;
									bsfx = "";
								}
							}
	
							rel = (isStr && es.charAt(1) === "=");
							if (rel) {
								en = parseInt(es.charAt(0) + "1", 10);
								es = es.substr(2);
								en *= parseFloat(es);
								esfx = es.replace(_suffixExp, "");
							} else {
								en = parseFloat(es);
								esfx = isStr ? es.replace(_suffixExp, "") : "";
							}
	
							if (esfx === "") {
								esfx = (p in _suffixMap) ? _suffixMap[p] : bsfx; //populate the end suffix, prioritizing the map, then if none is found, use the beginning suffix.
							}
	
							es = (en || en === 0) ? (rel ? en + bn : en) + esfx : vars[p]; //ensures that any += or -= prefixes are taken care of. Record the end value before normalizing the suffix because we always want to end the tween on exactly what they intended even if it doesn't match the beginning value's suffix.
	
							//if the beginning/ending suffixes don't match, normalize them...
							if (bsfx !== esfx) if (esfx !== "") if (en || en === 0) if (bn) { //note: if the beginning value (bn) is 0, we don't need to convert units!
								bn = _convertToPixels(target, p, bn, bsfx);
								if (esfx === "%") {
									bn /= _convertToPixels(target, p, 100, "%") / 100;
									if (vars.strictUnits !== true) { //some browsers report only "px" values instead of allowing "%" with getComputedStyle(), so we assume that if we're tweening to a %, we should start there too unless strictUnits:true is defined. This approach is particularly useful for responsive designs that use from() tweens.
										bs = bn + "%";
									}
	
								} else if (esfx === "em" || esfx === "rem" || esfx === "vw" || esfx === "vh") {
									bn /= _convertToPixels(target, p, 1, esfx);
	
								//otherwise convert to pixels.
								} else if (esfx !== "px") {
									en = _convertToPixels(target, p, en, esfx);
									esfx = "px"; //we don't use bsfx after this, so we don't need to set it to px too.
								}
								if (rel) if (en || en === 0) {
									es = (en + bn) + esfx; //the changes we made affect relative calculations, so adjust the end value here.
								}
							}
	
							if (rel) {
								en += bn;
							}
	
							if ((bn || bn === 0) && (en || en === 0)) { //faster than isNaN(). Also, previously we required en !== bn but that doesn't really gain much performance and it prevents _parseToProxy() from working properly if beginning and ending values match but need to get tweened by an external plugin anyway. For example, a bezier tween where the target starts at left:0 and has these points: [{left:50},{left:0}] wouldn't work properly because when parsing the last point, it'd match the first (current) one and a non-tweening CSSPropTween would be recorded when we actually need a normal tween (type:0) so that things get updated during the tween properly.
								pt = new CSSPropTween(style, p, bn, en - bn, pt, 0, p, (_autoRound !== false && (esfx === "px" || p === "zIndex")), 0, bs, es);
								pt.xs0 = esfx;
								//DEBUG: _log("tween "+p+" from "+pt.b+" ("+bn+esfx+") to "+pt.e+" with suffix: "+pt.xs0);
							} else if (style[p] === undefined || !es && (es + "" === "NaN" || es == null)) {
								_log("invalid " + p + " tween value: " + vars[p]);
							} else {
								pt = new CSSPropTween(style, p, en || bn || 0, 0, pt, -1, p, false, 0, bs, es);
								pt.xs0 = (es === "none" && (p === "display" || p.indexOf("Style") !== -1)) ? bs : es; //intermediate value should typically be set immediately (end value) except for "display" or things like borderTopStyle, borderBottomStyle, etc. which should use the beginning value during the tween.
								//DEBUG: _log("non-tweening value "+p+": "+pt.xs0);
							}
						}
					}
					if (plugin) if (pt && !pt.plugin) {
						pt.plugin = plugin;
					}
				}
				return pt;
			};
	
	
			//gets called every time the tween updates, passing the new ratio (typically a value between 0 and 1, but not always (for example, if an Elastic.easeOut is used, the value can jump above 1 mid-tween). It will always start and 0 and end at 1.
			p.setRatio = function(v) {
				var pt = this._firstPT,
					min = 0.000001,
					val, str, i;
				//at the end of the tween, we set the values to exactly what we received in order to make sure non-tweening values (like "position" or "float" or whatever) are set and so that if the beginning/ending suffixes (units) didn't match and we normalized to px, the value that the user passed in is used here. We check to see if the tween is at its beginning in case it's a from() tween in which case the ratio will actually go from 1 to 0 over the course of the tween (backwards).
				if (v === 1 && (this._tween._time === this._tween._duration || this._tween._time === 0)) {
					while (pt) {
						if (pt.type !== 2) {
							if (pt.r && pt.type !== -1) {
								val = Math.round(pt.s + pt.c);
								if (!pt.type) {
									pt.t[pt.p] = val + pt.xs0;
								} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
									i = pt.l;
									str = pt.xs0 + val + pt.xs1;
									for (i = 1; i < pt.l; i++) {
										str += pt["xn"+i] + pt["xs"+(i+1)];
									}
									pt.t[pt.p] = str;
								}
							} else {
								pt.t[pt.p] = pt.e;
							}
						} else {
							pt.setRatio(v);
						}
						pt = pt._next;
					}
	
				} else if (v || !(this._tween._time === this._tween._duration || this._tween._time === 0) || this._tween._rawPrevTime === -0.000001) {
					while (pt) {
						val = pt.c * v + pt.s;
						if (pt.r) {
							val = Math.round(val);
						} else if (val < min) if (val > -min) {
							val = 0;
						}
						if (!pt.type) {
							pt.t[pt.p] = val + pt.xs0;
						} else if (pt.type === 1) { //complex value (one that typically has multiple numbers inside a string, like "rect(5px,10px,20px,25px)"
							i = pt.l;
							if (i === 2) {
								pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2;
							} else if (i === 3) {
								pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3;
							} else if (i === 4) {
								pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4;
							} else if (i === 5) {
								pt.t[pt.p] = pt.xs0 + val + pt.xs1 + pt.xn1 + pt.xs2 + pt.xn2 + pt.xs3 + pt.xn3 + pt.xs4 + pt.xn4 + pt.xs5;
							} else {
								str = pt.xs0 + val + pt.xs1;
								for (i = 1; i < pt.l; i++) {
									str += pt["xn"+i] + pt["xs"+(i+1)];
								}
								pt.t[pt.p] = str;
							}
	
						} else if (pt.type === -1) { //non-tweening value
							pt.t[pt.p] = pt.xs0;
	
						} else if (pt.setRatio) { //custom setRatio() for things like SpecialProps, external plugins, etc.
							pt.setRatio(v);
						}
						pt = pt._next;
					}
	
				//if the tween is reversed all the way back to the beginning, we need to restore the original values which may have different units (like % instead of px or em or whatever).
				} else {
					while (pt) {
						if (pt.type !== 2) {
							pt.t[pt.p] = pt.b;
						} else {
							pt.setRatio(v);
						}
						pt = pt._next;
					}
				}
			};
	
			/**
			 * @private
			 * Forces rendering of the target's transforms (rotation, scale, etc.) whenever the CSSPlugin's setRatio() is called.
			 * Basically, this tells the CSSPlugin to create a CSSPropTween (type 2) after instantiation that runs last in the linked
			 * list and calls the appropriate (3D or 2D) rendering function. We separate this into its own method so that we can call
			 * it from other plugins like BezierPlugin if, for example, it needs to apply an autoRotation and this CSSPlugin
			 * doesn't have any transform-related properties of its own. You can call this method as many times as you
			 * want and it won't create duplicate CSSPropTweens.
			 *
			 * @param {boolean} threeD if true, it should apply 3D tweens (otherwise, just 2D ones are fine and typically faster)
			 */
			p._enableTransforms = function(threeD) {
				this._transform = this._transform || _getTransform(this._target, _cs, true); //ensures that the element has a _gsTransform property with the appropriate values.
				this._transformType = (!(this._transform.svg && _useSVGTransformAttr) && (threeD || this._transformType === 3)) ? 3 : 2;
			};
	
			var lazySet = function(v) {
				this.t[this.p] = this.e;
				this.data._linkCSSP(this, this._next, null, true); //we purposefully keep this._next even though it'd make sense to null it, but this is a performance optimization, as this happens during the while (pt) {} loop in setRatio() at the bottom of which it sets pt = pt._next, so if we null it, the linked list will be broken in that loop.
			};
			/** @private Gives us a way to set a value on the first render (and only the first render). **/
			p._addLazySet = function(t, p, v) {
				var pt = this._firstPT = new CSSPropTween(t, p, 0, 0, this._firstPT, 2);
				pt.e = v;
				pt.setRatio = lazySet;
				pt.data = this;
			};
	
			/** @private **/
			p._linkCSSP = function(pt, next, prev, remove) {
				if (pt) {
					if (next) {
						next._prev = pt;
					}
					if (pt._next) {
						pt._next._prev = pt._prev;
					}
					if (pt._prev) {
						pt._prev._next = pt._next;
					} else if (this._firstPT === pt) {
						this._firstPT = pt._next;
						remove = true; //just to prevent resetting this._firstPT 5 lines down in case pt._next is null. (optimized for speed)
					}
					if (prev) {
						prev._next = pt;
					} else if (!remove && this._firstPT === null) {
						this._firstPT = pt;
					}
					pt._next = next;
					pt._prev = prev;
				}
				return pt;
			};
	
			//we need to make sure that if alpha or autoAlpha is killed, opacity is too. And autoAlpha affects the "visibility" property.
			p._kill = function(lookup) {
				var copy = lookup,
					pt, p, xfirst;
				if (lookup.autoAlpha || lookup.alpha) {
					copy = {};
					for (p in lookup) { //copy the lookup so that we're not changing the original which may be passed elsewhere.
						copy[p] = lookup[p];
					}
					copy.opacity = 1;
					if (copy.autoAlpha) {
						copy.visibility = 1;
					}
				}
				if (lookup.className && (pt = this._classNamePT)) { //for className tweens, we need to kill any associated CSSPropTweens too; a linked list starts at the className's "xfirst".
					xfirst = pt.xfirst;
					if (xfirst && xfirst._prev) {
						this._linkCSSP(xfirst._prev, pt._next, xfirst._prev._prev); //break off the prev
					} else if (xfirst === this._firstPT) {
						this._firstPT = pt._next;
					}
					if (pt._next) {
						this._linkCSSP(pt._next, pt._next._next, xfirst._prev);
					}
					this._classNamePT = null;
				}
				return TweenPlugin.prototype._kill.call(this, copy);
			};
	
	
	
			//used by cascadeTo() for gathering all the style properties of each child element into an array for comparison.
			var _getChildStyles = function(e, props, targets) {
					var children, i, child, type;
					if (e.slice) {
						i = e.length;
						while (--i > -1) {
							_getChildStyles(e[i], props, targets);
						}
						return;
					}
					children = e.childNodes;
					i = children.length;
					while (--i > -1) {
						child = children[i];
						type = child.type;
						if (child.style) {
							props.push(_getAllStyles(child));
							if (targets) {
								targets.push(child);
							}
						}
						if ((type === 1 || type === 9 || type === 11) && child.childNodes.length) {
							_getChildStyles(child, props, targets);
						}
					}
				};
	
			/**
			 * Typically only useful for className tweens that may affect child elements, this method creates a TweenLite
			 * and then compares the style properties of all the target's child elements at the tween's start and end, and
			 * if any are different, it also creates tweens for those and returns an array containing ALL of the resulting
			 * tweens (so that you can easily add() them to a TimelineLite, for example). The reason this functionality is
			 * wrapped into a separate static method of CSSPlugin instead of being integrated into all regular className tweens
			 * is because it creates entirely new tweens that may have completely different targets than the original tween,
			 * so if they were all lumped into the original tween instance, it would be inconsistent with the rest of the API
			 * and it would create other problems. For example:
			 *  - If I create a tween of elementA, that tween instance may suddenly change its target to include 50 other elements (unintuitive if I specifically defined the target I wanted)
			 *  - We can't just create new independent tweens because otherwise, what happens if the original/parent tween is reversed or pause or dropped into a TimelineLite for tight control? You'd expect that tween's behavior to affect all the others.
			 *  - Analyzing every style property of every child before and after the tween is an expensive operation when there are many children, so this behavior shouldn't be imposed on all className tweens by default, especially since it's probably rare that this extra functionality is needed.
			 *
			 * @param {Object} target object to be tweened
			 * @param {number} Duration in seconds (or frames for frames-based tweens)
			 * @param {Object} Object containing the end values, like {className:"newClass", ease:Linear.easeNone}
			 * @return {Array} An array of TweenLite instances
			 */
			CSSPlugin.cascadeTo = function(target, duration, vars) {
				var tween = TweenLite.to(target, duration, vars),
					results = [tween],
					b = [],
					e = [],
					targets = [],
					_reservedProps = TweenLite._internals.reservedProps,
					i, difs, p, from;
				target = tween._targets || tween.target;
				_getChildStyles(target, b, targets);
				tween.render(duration, true, true);
				_getChildStyles(target, e);
				tween.render(0, true, true);
				tween._enabled(true);
				i = targets.length;
				while (--i > -1) {
					difs = _cssDif(targets[i], b[i], e[i]);
					if (difs.firstMPT) {
						difs = difs.difs;
						for (p in vars) {
							if (_reservedProps[p]) {
								difs[p] = vars[p];
							}
						}
						from = {};
						for (p in difs) {
							from[p] = b[i][p];
						}
						results.push(TweenLite.fromTo(targets[i], duration, from, difs));
					}
				}
				return results;
			};
	
			TweenPlugin.activate([CSSPlugin]);
			return CSSPlugin;
	
		}, true);
		
	}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }
	
	//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
	(function(name) {
		"use strict";
		var getGlobal = function() {
			return (_gsScope.GreenSockGlobals || _gsScope)[name];
		};
		if (typeof(define) === "function" && define.amd) { //AMD
			define(["TweenLite"], getGlobal);
		} else if (typeof(module) !== "undefined" && module.exports) { //node
			__webpack_require__(35);
			module.exports = getGlobal();
		}
	}("CSSPlugin"));
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 35 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*** IMPORTS FROM imports-loader ***/
	var define = false;
	
	/*!
	 * VERSION: 1.18.2
	 * DATE: 2015-12-22
	 * UPDATES AND DOCS AT: http://greensock.com
	 *
	 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
	 * This work is subject to the terms at http://greensock.com/standard-license or for
	 * Club GreenSock members, the software agreement that was issued with your membership.
	 * 
	 * @author: Jack Doyle, jack@greensock.com
	 */
	(function(window, moduleName) {
	
			"use strict";
			var _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;
			if (_globals.TweenLite) {
				return; //in case the core set of classes is already loaded, don't instantiate twice.
			}
			var _namespace = function(ns) {
					var a = ns.split("."),
						p = _globals, i;
					for (i = 0; i < a.length; i++) {
						p[a[i]] = p = p[a[i]] || {};
					}
					return p;
				},
				gs = _namespace("com.greensock"),
				_tinyNum = 0.0000000001,
				_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					var b = [],
						l = a.length,
						i;
					for (i = 0; i !== l; b.push(a[i++])) {}
					return b;
				},
				_emptyFunc = function() {},
				_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
					var toString = Object.prototype.toString,
						array = toString.call([]);
					return function(obj) {
						return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
					};
				}()),
				a, i, p, _ticker, _tickerActive,
				_defLookup = {},
	
				/**
				 * @constructor
				 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
				 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
				 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
				 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.
				 *
				 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
				 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
				 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
				 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
				 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
				 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
				 * sandbox the banner one like:
				 *
				 * <script>
				 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
				 * </script>
				 * <script src="js/greensock/v1.7/TweenMax.js"></script>
				 * <script>
				 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
				 * </script>
				 * <script src="js/greensock/v1.6/TweenMax.js"></script>
				 * <script>
				 *     gs.TweenLite.to(...); //would use v1.7
				 *     TweenLite.to(...); //would use v1.6
				 * </script>
				 *
				 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
				 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
				 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
				 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
				 */
				Definition = function(ns, dependencies, func, global) {
					this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses
					_defLookup[ns] = this;
					this.gsClass = null;
					this.func = func;
					var _classes = [];
					this.check = function(init) {
						var i = dependencies.length,
							missing = i,
							cur, a, n, cl, hasModule;
						while (--i > -1) {
							if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {
								_classes[i] = cur.gsClass;
								missing--;
							} else if (init) {
								cur.sc.push(this);
							}
						}
						if (missing === 0 && func) {
							a = ("com.greensock." + ns).split(".");
							n = a.pop();
							cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);
	
							//exports to multiple environments
							if (global) {
								_globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
								hasModule = (typeof(module) !== "undefined" && module.exports);
								if (!hasModule && typeof(define) === "function" && define.amd){ //AMD
									define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
								} else if (ns === moduleName && hasModule){ //node
									module.exports = cl;
								}
							}
							for (i = 0; i < this.sc.length; i++) {
								this.sc[i].check();
							}
						}
					};
					this.check(true);
				},
	
				//used to create Definition instances (which basically registers a class that has dependencies).
				_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {
					return new Definition(ns, dependencies, func, global);
				},
	
				//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
				_class = gs._class = function(ns, func, global) {
					func = func || function() {};
					_gsDefine(ns, [], function(){ return func; }, global);
					return func;
				};
	
			_gsDefine.globals = _globals;
	
	
	
	/*
	 * ----------------------------------------------------------------
	 * Ease
	 * ----------------------------------------------------------------
	 */
			var _baseParams = [0, 0, 1, 1],
				_blankArray = [],
				Ease = _class("easing.Ease", function(func, extraParams, type, power) {
					this._func = func;
					this._type = type || 0;
					this._power = power || 0;
					this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;
				}, true),
				_easeMap = Ease.map = {},
				_easeReg = Ease.register = function(ease, names, types, create) {
					var na = names.split(","),
						i = na.length,
						ta = (types || "easeIn,easeOut,easeInOut").split(","),
						e, name, j, type;
					while (--i > -1) {
						name = na[i];
						e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};
						j = ta.length;
						while (--j > -1) {
							type = ta[j];
							_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease();
						}
					}
				};
	
			p = Ease.prototype;
			p._calcEnd = false;
			p.getRatio = function(p) {
				if (this._func) {
					this._params[0] = p;
					return this._func.apply(null, this._params);
				}
				var t = this._type,
					pw = this._power,
					r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;
				if (pw === 1) {
					r *= r;
				} else if (pw === 2) {
					r *= r * r;
				} else if (pw === 3) {
					r *= r * r * r;
				} else if (pw === 4) {
					r *= r * r * r * r;
				}
				return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);
			};
	
			//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
			a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];
			i = a.length;
			while (--i > -1) {
				p = a[i]+",Power"+i;
				_easeReg(new Ease(null,null,1,i), p, "easeOut", true);
				_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));
				_easeReg(new Ease(null,null,3,i), p, "easeInOut");
			}
			_easeMap.linear = gs.easing.Linear.easeIn;
			_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks
	
	
	/*
	 * ----------------------------------------------------------------
	 * EventDispatcher
	 * ----------------------------------------------------------------
	 */
			var EventDispatcher = _class("events.EventDispatcher", function(target) {
				this._listeners = {};
				this._eventTarget = target || this;
			});
			p = EventDispatcher.prototype;
	
			p.addEventListener = function(type, callback, scope, useParam, priority) {
				priority = priority || 0;
				var list = this._listeners[type],
					index = 0,
					listener, i;
				if (list == null) {
					this._listeners[type] = list = [];
				}
				i = list.length;
				while (--i > -1) {
					listener = list[i];
					if (listener.c === callback && listener.s === scope) {
						list.splice(i, 1);
					} else if (index === 0 && listener.pr < priority) {
						index = i + 1;
					}
				}
				list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});
				if (this === _ticker && !_tickerActive) {
					_ticker.wake();
				}
			};
	
			p.removeEventListener = function(type, callback) {
				var list = this._listeners[type], i;
				if (list) {
					i = list.length;
					while (--i > -1) {
						if (list[i].c === callback) {
							list.splice(i, 1);
							return;
						}
					}
				}
			};
	
			p.dispatchEvent = function(type) {
				var list = this._listeners[type],
					i, t, listener;
				if (list) {
					i = list.length;
					t = this._eventTarget;
					while (--i > -1) {
						listener = list[i];
						if (listener) {
							if (listener.up) {
								listener.c.call(listener.s || t, {type:type, target:t});
							} else {
								listener.c.call(listener.s || t);
							}
						}
					}
				}
			};
	
	
	/*
	 * ----------------------------------------------------------------
	 * Ticker
	 * ----------------------------------------------------------------
	 */
	 		var _reqAnimFrame = window.requestAnimationFrame,
				_cancelAnimFrame = window.cancelAnimationFrame,
				_getTime = Date.now || function() {return new Date().getTime();},
				_lastUpdate = _getTime();
	
			//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
			a = ["ms","moz","webkit","o"];
			i = a.length;
			while (--i > -1 && !_reqAnimFrame) {
				_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];
				_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];
			}
	
			_class("Ticker", function(fps, useRAF) {
				var _self = this,
					_startTime = _getTime(),
					_useRAF = (useRAF !== false && _reqAnimFrame) ? "auto" : false,
					_lagThreshold = 500,
					_adjustedLag = 33,
					_tickWord = "tick", //helps reduce gc burden
					_fps, _req, _id, _gap, _nextTime,
					_tick = function(manual) {
						var elapsed = _getTime() - _lastUpdate,
							overlap, dispatch;
						if (elapsed > _lagThreshold) {
							_startTime += elapsed - _adjustedLag;
						}
						_lastUpdate += elapsed;
						_self.time = (_lastUpdate - _startTime) / 1000;
						overlap = _self.time - _nextTime;
						if (!_fps || overlap > 0 || manual === true) {
							_self.frame++;
							_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);
							dispatch = true;
						}
						if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
							_id = _req(_tick);
						}
						if (dispatch) {
							_self.dispatchEvent(_tickWord);
						}
					};
	
				EventDispatcher.call(_self);
				_self.time = _self.frame = 0;
				_self.tick = function() {
					_tick(true);
				};
	
				_self.lagSmoothing = function(threshold, adjustedLag) {
					_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited
					_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);
				};
	
				_self.sleep = function() {
					if (_id == null) {
						return;
					}
					if (!_useRAF || !_cancelAnimFrame) {
						clearTimeout(_id);
					} else {
						_cancelAnimFrame(_id);
					}
					_req = _emptyFunc;
					_id = null;
					if (_self === _ticker) {
						_tickerActive = false;
					}
				};
	
				_self.wake = function(seamless) {
					if (_id !== null) {
						_self.sleep();
					} else if (seamless) {
						_startTime += -_lastUpdate + (_lastUpdate = _getTime());
					} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
						_lastUpdate = _getTime() - _lagThreshold + 5;
					}
					_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
					if (_self === _ticker) {
						_tickerActive = true;
					}
					_tick(2);
				};
	
				_self.fps = function(value) {
					if (!arguments.length) {
						return _fps;
					}
					_fps = value;
					_gap = 1 / (_fps || 60);
					_nextTime = this.time + _gap;
					_self.wake();
				};
	
				_self.useRAF = function(value) {
					if (!arguments.length) {
						return _useRAF;
					}
					_self.sleep();
					_useRAF = value;
					_self.fps(_fps);
				};
				_self.fps(fps);
	
				//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
				setTimeout(function() {
					if (_useRAF === "auto" && _self.frame < 5 && document.visibilityState !== "hidden") {
						_self.useRAF(false);
					}
				}, 1500);
			});
	
			p = gs.Ticker.prototype = new gs.events.EventDispatcher();
			p.constructor = gs.Ticker;
	
	
	/*
	 * ----------------------------------------------------------------
	 * Animation
	 * ----------------------------------------------------------------
	 */
			var Animation = _class("core.Animation", function(duration, vars) {
					this.vars = vars = vars || {};
					this._duration = this._totalDuration = duration || 0;
					this._delay = Number(vars.delay) || 0;
					this._timeScale = 1;
					this._active = (vars.immediateRender === true);
					this.data = vars.data;
					this._reversed = (vars.reversed === true);
	
					if (!_rootTimeline) {
						return;
					}
					if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
						_ticker.wake();
					}
	
					var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;
					tl.add(this, tl._time);
	
					if (this.vars.paused) {
						this.paused(true);
					}
				});
	
			_ticker = Animation.ticker = new gs.Ticker();
			p = Animation.prototype;
			p._dirty = p._gc = p._initted = p._paused = false;
			p._totalTime = p._time = 0;
			p._rawPrevTime = -1;
			p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;
			p._paused = false;
	
	
			//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
			var _checkTimeout = function() {
					if (_tickerActive && _getTime() - _lastUpdate > 2000) {
						_ticker.wake();
					}
					setTimeout(_checkTimeout, 2000);
				};
			_checkTimeout();
	
	
			p.play = function(from, suppressEvents) {
				if (from != null) {
					this.seek(from, suppressEvents);
				}
				return this.reversed(false).paused(false);
			};
	
			p.pause = function(atTime, suppressEvents) {
				if (atTime != null) {
					this.seek(atTime, suppressEvents);
				}
				return this.paused(true);
			};
	
			p.resume = function(from, suppressEvents) {
				if (from != null) {
					this.seek(from, suppressEvents);
				}
				return this.paused(false);
			};
	
			p.seek = function(time, suppressEvents) {
				return this.totalTime(Number(time), suppressEvents !== false);
			};
	
			p.restart = function(includeDelay, suppressEvents) {
				return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
			};
	
			p.reverse = function(from, suppressEvents) {
				if (from != null) {
					this.seek((from || this.totalDuration()), suppressEvents);
				}
				return this.reversed(true).paused(false);
			};
	
			p.render = function(time, suppressEvents, force) {
				//stub - we override this method in subclasses.
			};
	
			p.invalidate = function() {
				this._time = this._totalTime = 0;
				this._initted = this._gc = false;
				this._rawPrevTime = -1;
				if (this._gc || !this.timeline) {
					this._enabled(true);
				}
				return this;
			};
	
			p.isActive = function() {
				var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.
					startTime = this._startTime,
					rawTime;
				return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale));
			};
	
			p._enabled = function (enabled, ignoreTimeline) {
				if (!_tickerActive) {
					_ticker.wake();
				}
				this._gc = !enabled;
				this._active = this.isActive();
				if (ignoreTimeline !== true) {
					if (enabled && !this.timeline) {
						this._timeline.add(this, this._startTime - this._delay);
					} else if (!enabled && this.timeline) {
						this._timeline._remove(this, true);
					}
				}
				return false;
			};
	
	
			p._kill = function(vars, target) {
				return this._enabled(false, false);
			};
	
			p.kill = function(vars, target) {
				this._kill(vars, target);
				return this;
			};
	
			p._uncache = function(includeSelf) {
				var tween = includeSelf ? this : this.timeline;
				while (tween) {
					tween._dirty = true;
					tween = tween.timeline;
				}
				return this;
			};
	
			p._swapSelfInParams = function(params) {
				var i = params.length,
					copy = params.concat();
				while (--i > -1) {
					if (params[i] === "{self}") {
						copy[i] = this;
					}
				}
				return copy;
			};
	
			p._callback = function(type) {
				var v = this.vars;
				v[type].apply(v[type + "Scope"] || v.callbackScope || this, v[type + "Params"] || _blankArray);
			};
	
	//----Animation getters/setters --------------------------------------------------------
	
			p.eventCallback = function(type, callback, params, scope) {
				if ((type || "").substr(0,2) === "on") {
					var v = this.vars;
					if (arguments.length === 1) {
						return v[type];
					}
					if (callback == null) {
						delete v[type];
					} else {
						v[type] = callback;
						v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
						v[type + "Scope"] = scope;
					}
					if (type === "onUpdate") {
						this._onUpdate = callback;
					}
				}
				return this;
			};
	
			p.delay = function(value) {
				if (!arguments.length) {
					return this._delay;
				}
				if (this._timeline.smoothChildTiming) {
					this.startTime( this._startTime + value - this._delay );
				}
				this._delay = value;
				return this;
			};
	
			p.duration = function(value) {
				if (!arguments.length) {
					this._dirty = false;
					return this._duration;
				}
				this._duration = this._totalDuration = value;
				this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
				if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {
					this.totalTime(this._totalTime * (value / this._duration), true);
				}
				return this;
			};
	
			p.totalDuration = function(value) {
				this._dirty = false;
				return (!arguments.length) ? this._totalDuration : this.duration(value);
			};
	
			p.time = function(value, suppressEvents) {
				if (!arguments.length) {
					return this._time;
				}
				if (this._dirty) {
					this.totalDuration();
				}
				return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);
			};
	
			p.totalTime = function(time, suppressEvents, uncapped) {
				if (!_tickerActive) {
					_ticker.wake();
				}
				if (!arguments.length) {
					return this._totalTime;
				}
				if (this._timeline) {
					if (time < 0 && !uncapped) {
						time += this.totalDuration();
					}
					if (this._timeline.smoothChildTiming) {
						if (this._dirty) {
							this.totalDuration();
						}
						var totalDuration = this._totalDuration,
							tl = this._timeline;
						if (time > totalDuration && !uncapped) {
							time = totalDuration;
						}
						this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
						if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
							this._uncache(false);
						}
						//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
						if (tl._timeline) {
							while (tl._timeline) {
								if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {
									tl.totalTime(tl._totalTime, true);
								}
								tl = tl._timeline;
							}
						}
					}
					if (this._gc) {
						this._enabled(true, false);
					}
					if (this._totalTime !== time || this._duration === 0) {
						if (_lazyTweens.length) {
							_lazyRender();
						}
						this.render(time, suppressEvents, false);
						if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
							_lazyRender();
						}
					}
				}
				return this;
			};
	
			p.progress = p.totalProgress = function(value, suppressEvents) {
				var duration = this.duration();
				return (!arguments.length) ? (duration ? this._time / duration : this.ratio) : this.totalTime(duration * value, suppressEvents);
			};
	
			p.startTime = function(value) {
				if (!arguments.length) {
					return this._startTime;
				}
				if (value !== this._startTime) {
					this._startTime = value;
					if (this.timeline) if (this.timeline._sortChildren) {
						this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
					}
				}
				return this;
			};
	
			p.endTime = function(includeRepeats) {
				return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;
			};
	
			p.timeScale = function(value) {
				if (!arguments.length) {
					return this._timeScale;
				}
				value = value || _tinyNum; //can't allow zero because it'll throw the math off
				if (this._timeline && this._timeline.smoothChildTiming) {
					var pauseTime = this._pauseTime,
						t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();
					this._startTime = t - ((t - this._startTime) * this._timeScale / value);
				}
				this._timeScale = value;
				return this._uncache(false);
			};
	
			p.reversed = function(value) {
				if (!arguments.length) {
					return this._reversed;
				}
				if (value != this._reversed) {
					this._reversed = value;
					this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
				}
				return this;
			};
	
			p.paused = function(value) {
				if (!arguments.length) {
					return this._paused;
				}
				var tl = this._timeline,
					raw, elapsed;
				if (value != this._paused) if (tl) {
					if (!_tickerActive && !value) {
						_ticker.wake();
					}
					raw = tl.rawTime();
					elapsed = raw - this._pauseTime;
					if (!value && tl.smoothChildTiming) {
						this._startTime += elapsed;
						this._uncache(false);
					}
					this._pauseTime = value ? raw : null;
					this._paused = value;
					this._active = this.isActive();
					if (!value && elapsed !== 0 && this._initted && this.duration()) {
						raw = tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale;
						this.render(raw, (raw === this._totalTime), true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
					}
				}
				if (this._gc && !value) {
					this._enabled(true, false);
				}
				return this;
			};
	
	
	/*
	 * ----------------------------------------------------------------
	 * SimpleTimeline
	 * ----------------------------------------------------------------
	 */
			var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {
				Animation.call(this, 0, vars);
				this.autoRemoveChildren = this.smoothChildTiming = true;
			});
	
			p = SimpleTimeline.prototype = new Animation();
			p.constructor = SimpleTimeline;
			p.kill()._gc = false;
			p._first = p._last = p._recent = null;
			p._sortChildren = false;
	
			p.add = p.insert = function(child, position, align, stagger) {
				var prevTween, st;
				child._startTime = Number(position || 0) + child._delay;
				if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
					child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);
				}
				if (child.timeline) {
					child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
				}
				child.timeline = child._timeline = this;
				if (child._gc) {
					child._enabled(true, true);
				}
				prevTween = this._last;
				if (this._sortChildren) {
					st = child._startTime;
					while (prevTween && prevTween._startTime > st) {
						prevTween = prevTween._prev;
					}
				}
				if (prevTween) {
					child._next = prevTween._next;
					prevTween._next = child;
				} else {
					child._next = this._first;
					this._first = child;
				}
				if (child._next) {
					child._next._prev = child;
				} else {
					this._last = child;
				}
				child._prev = prevTween;
				this._recent = child;
				if (this._timeline) {
					this._uncache(true);
				}
				return this;
			};
	
			p._remove = function(tween, skipDisable) {
				if (tween.timeline === this) {
					if (!skipDisable) {
						tween._enabled(false, true);
					}
	
					if (tween._prev) {
						tween._prev._next = tween._next;
					} else if (this._first === tween) {
						this._first = tween._next;
					}
					if (tween._next) {
						tween._next._prev = tween._prev;
					} else if (this._last === tween) {
						this._last = tween._prev;
					}
					tween._next = tween._prev = tween.timeline = null;
					if (tween === this._recent) {
						this._recent = this._last;
					}
	
					if (this._timeline) {
						this._uncache(true);
					}
				}
				return this;
			};
	
			p.render = function(time, suppressEvents, force) {
				var tween = this._first,
					next;
				this._totalTime = this._time = this._rawPrevTime = time;
				while (tween) {
					next = tween._next; //record it here because the value could change after rendering...
					if (tween._active || (time >= tween._startTime && !tween._paused)) {
						if (!tween._reversed) {
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);
						} else {
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}
					}
					tween = next;
				}
			};
	
			p.rawTime = function() {
				if (!_tickerActive) {
					_ticker.wake();
				}
				return this._totalTime;
			};
	
	/*
	 * ----------------------------------------------------------------
	 * TweenLite
	 * ----------------------------------------------------------------
	 */
			var TweenLite = _class("TweenLite", function(target, duration, vars) {
					Animation.call(this, duration, vars);
					this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)
	
					if (target == null) {
						throw "Cannot tween a null target.";
					}
	
					this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
	
					var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
						overwrite = this.vars.overwrite,
						i, targ, targets;
	
					this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];
	
					if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
						this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
						this._propLookup = [];
						this._siblings = [];
						for (i = 0; i < targets.length; i++) {
							targ = targets[i];
							if (!targ) {
								targets.splice(i--, 1);
								continue;
							} else if (typeof(targ) === "string") {
								targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings
								if (typeof(targ) === "string") {
									targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
								}
								continue;
							} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
								targets.splice(i--, 1);
								this._targets = targets = targets.concat(_slice(targ));
								continue;
							}
							this._siblings[i] = _register(targ, this, false);
							if (overwrite === 1) if (this._siblings[i].length > 1) {
								_applyOverwrite(targ, this, null, 1, this._siblings[i]);
							}
						}
	
					} else {
						this._propLookup = {};
						this._siblings = _register(target, this, false);
						if (overwrite === 1) if (this._siblings.length > 1) {
							_applyOverwrite(target, this, null, 1, this._siblings);
						}
					}
					if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {
						this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
						this.render(-this._delay);
					}
				}, true),
				_isSelector = function(v) {
					return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
				},
				_autoCSS = function(vars, target) {
					var css = {},
						p;
					for (p in vars) {
						if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
							css[p] = vars[p];
							delete vars[p];
						}
					}
					vars.css = css;
				};
	
			p = TweenLite.prototype = new Animation();
			p.constructor = TweenLite;
			p.kill()._gc = false;
	
	//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------
	
			p.ratio = 0;
			p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;
			p._notifyPluginsOfEnabled = p._lazy = false;
	
			TweenLite.version = "1.18.2";
			TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);
			TweenLite.defaultOverwrite = "auto";
			TweenLite.ticker = _ticker;
			TweenLite.autoSleep = 120;
			TweenLite.lagSmoothing = function(threshold, adjustedLag) {
				_ticker.lagSmoothing(threshold, adjustedLag);
			};
	
			TweenLite.selector = window.$ || window.jQuery || function(e) {
				var selector = window.$ || window.jQuery;
				if (selector) {
					TweenLite.selector = selector;
					return selector(e);
				}
				return (typeof(document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
			};
	
			var _lazyTweens = [],
				_lazyLookup = {},
				_numbersExp = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,
				//_nonNumbersExp = /(?:([\-+](?!(\d|=)))|[^\d\-+=e]|(e(?![\-+][\d])))+/ig,
				_setRatio = function(v) {
					var pt = this._firstPT,
						min = 0.000001,
						val;
					while (pt) {
						val = !pt.blob ? pt.c * v + pt.s : v ? this.join("") : this.start;
						if (pt.r) {
							val = Math.round(val);
						} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
							val = 0;
						}
						if (!pt.f) {
							pt.t[pt.p] = val;
						} else if (pt.fp) {
							pt.t[pt.p](pt.fp, val);
						} else {
							pt.t[pt.p](val);
						}
						pt = pt._next;
					}
				},
				//compares two strings (start/end), finds the numbers that are different and spits back an array representing the whole value but with the changing values isolated as elements. For example, "rgb(0,0,0)" and "rgb(100,50,0)" would become ["rgb(", 0, ",", 50, ",0)"]. Notice it merges the parts that are identical (performance optimization). The array also has a linked list of PropTweens attached starting with _firstPT that contain the tweening data (t, p, s, c, f, etc.). It also stores the starting value as a "start" property so that we can revert to it if/when necessary, like when a tween rewinds fully. If the quantity of numbers differs between the start and end, it will always prioritize the end value(s). The pt parameter is optional - it's for a PropTween that will be appended to the end of the linked list and is typically for actually setting the value after all of the elements have been updated (with array.join("")).
				_blobDif = function(start, end, filter, pt) {
					var a = [start, end],
						charIndex = 0,
						s = "",
						color = 0,
						startNums, endNums, num, i, l, nonNumbers, currentNum;
					a.start = start;
					if (filter) {
						filter(a); //pass an array with the starting and ending values and let the filter do whatever it needs to the values.
						start = a[0];
						end = a[1];
					}
					a.length = 0;
					startNums = start.match(_numbersExp) || [];
					endNums = end.match(_numbersExp) || [];
					if (pt) {
						pt._next = null;
						pt.blob = 1;
						a._firstPT = pt; //apply last in the linked list (which means inserting it first)
					}
					l = endNums.length;
					for (i = 0; i < l; i++) {
						currentNum = endNums[i];
						nonNumbers = end.substr(charIndex, end.indexOf(currentNum, charIndex)-charIndex);
						s += (nonNumbers || !i) ? nonNumbers : ","; //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
						charIndex += nonNumbers.length;
						if (color) { //sense rgba() values and round them.
							color = (color + 1) % 5;
						} else if (nonNumbers.substr(-5) === "rgba(") {
							color = 1;
						}
						if (currentNum === startNums[i] || startNums.length <= i) {
							s += currentNum;
						} else {
							if (s) {
								a.push(s);
								s = "";
							}
							num = parseFloat(startNums[i]);
							a.push(num);
							a._firstPT = {_next: a._firstPT, t:a, p: a.length-1, s:num, c:((currentNum.charAt(1) === "=") ? parseInt(currentNum.charAt(0) + "1", 10) * parseFloat(currentNum.substr(2)) : (parseFloat(currentNum) - num)) || 0, f:0, r:(color && color < 4)};
							//note: we don't set _prev because we'll never need to remove individual PropTweens from this list.
						}
						charIndex += currentNum.length;
					}
					s += end.substr(charIndex);
					if (s) {
						a.push(s);
					}
					a.setRatio = _setRatio;
					return a;
				},
				//note: "funcParam" is only necessary for function-based getters/setters that require an extra parameter like getAttribute("width") and setAttribute("width", value). In this example, funcParam would be "width". Used by AttrPlugin for example.
				_addPropTween = function(target, prop, start, end, overwriteProp, round, funcParam, stringFilter) {
					var s = (start === "get") ? target[prop] : start,
						type = typeof(target[prop]),
						isRelative = (typeof(end) === "string" && end.charAt(1) === "="),
						pt = {t:target, p:prop, s:s, f:(type === "function"), pg:0, n:overwriteProp || prop, r:round, pr:0, c:isRelative ? parseInt(end.charAt(0) + "1", 10) * parseFloat(end.substr(2)) : (parseFloat(end) - s) || 0},
						blob, getterName;
					if (type !== "number") {
						if (type === "function" && start === "get") {
							getterName = ((prop.indexOf("set") || typeof(target["get" + prop.substr(3)]) !== "function") ? prop : "get" + prop.substr(3));
							pt.s = s = funcParam ? target[getterName](funcParam) : target[getterName]();
						}
						if (typeof(s) === "string" && (funcParam || isNaN(s))) {
							//a blob (string that has multiple numbers in it)
							pt.fp = funcParam;
							blob = _blobDif(s, end, stringFilter || TweenLite.defaultStringFilter, pt);
							pt = {t:blob, p:"setRatio", s:0, c:1, f:2, pg:0, n:overwriteProp || prop, pr:0}; //"2" indicates it's a Blob property tween. Needed for RoundPropsPlugin for example.
						} else if (!isRelative) {
							pt.s = parseFloat(s);
							pt.c = (parseFloat(end) - pt.s) || 0;
						}
					}
					if (pt.c) { //only add it to the linked list if there's a change.
						if ((pt._next = this._firstPT)) {
							pt._next._prev = pt;
						}
						this._firstPT = pt;
						return pt;
					}
				},
				_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens, blobDif:_blobDif}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
				_plugins = TweenLite._plugins = {},
				_tweenLookup = _internals.tweenLookup = {},
				_tweenLookupNum = 0,
				_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1, callbackScope:1, stringFilter:1},
				_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},
				_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),
				_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),
				_nextGCFrame = 30,
				_lazyRender = _internals.lazyRender = function() {
					var i = _lazyTweens.length,
						tween;
					_lazyLookup = {};
					while (--i > -1) {
						tween = _lazyTweens[i];
						if (tween && tween._lazy !== false) {
							tween.render(tween._lazy[0], tween._lazy[1], true);
							tween._lazy = false;
						}
					}
					_lazyTweens.length = 0;
				};
	
			_rootTimeline._startTime = _ticker.time;
			_rootFramesTimeline._startTime = _ticker.frame;
			_rootTimeline._active = _rootFramesTimeline._active = true;
			setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".
	
			Animation._updateRoot = TweenLite.render = function() {
					var i, a, p;
					if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
						_lazyRender();
					}
					_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);
					_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
					if (_lazyTweens.length) {
						_lazyRender();
					}
					if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
						_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);
						for (p in _tweenLookup) {
							a = _tweenLookup[p].tweens;
							i = a.length;
							while (--i > -1) {
								if (a[i]._gc) {
									a.splice(i, 1);
								}
							}
							if (a.length === 0) {
								delete _tweenLookup[p];
							}
						}
						//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
						p = _rootTimeline._first;
						if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
							while (p && p._paused) {
								p = p._next;
							}
							if (!p) {
								_ticker.sleep();
							}
						}
					}
				};
	
			_ticker.addEventListener("tick", Animation._updateRoot);
	
			var _register = function(target, tween, scrub) {
					var id = target._gsTweenID, a, i;
					if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {
						_tweenLookup[id] = {target:target, tweens:[]};
					}
					if (tween) {
						a = _tweenLookup[id].tweens;
						a[(i = a.length)] = tween;
						if (scrub) {
							while (--i > -1) {
								if (a[i] === tween) {
									a.splice(i, 1);
								}
							}
						}
					}
					return _tweenLookup[id].tweens;
				},
				_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {
					var func = overwrittenTween.vars.onOverwrite, r1, r2;
					if (func) {
						r1 = func(overwrittenTween, overwritingTween, target, killedProps);
					}
					func = TweenLite.onOverwrite;
					if (func) {
						r2 = func(overwrittenTween, overwritingTween, target, killedProps);
					}
					return (r1 !== false && r2 !== false);
				},
				_applyOverwrite = function(target, tween, props, mode, siblings) {
					var i, changed, curTween, l;
					if (mode === 1 || mode >= 4) {
						l = siblings.length;
						for (i = 0; i < l; i++) {
							if ((curTween = siblings[i]) !== tween) {
								if (!curTween._gc) {
									if (curTween._kill(null, target, tween)) {
										changed = true;
									}
								}
							} else if (mode === 5) {
								break;
							}
						}
						return changed;
					}
					//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
					var startTime = tween._startTime + _tinyNum,
						overlaps = [],
						oCount = 0,
						zeroDur = (tween._duration === 0),
						globalStart;
					i = siblings.length;
					while (--i > -1) {
						if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {
							//ignore
						} else if (curTween._timeline !== tween._timeline) {
							globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);
							if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {
								overlaps[oCount++] = curTween;
							}
						} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
							overlaps[oCount++] = curTween;
						}
					}
	
					i = oCount;
					while (--i > -1) {
						curTween = overlaps[i];
						if (mode === 2) if (curTween._kill(props, target, tween)) {
							changed = true;
						}
						if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {
							if (mode !== 2 && !_onOverwrite(curTween, tween)) {
								continue;
							}
							if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.
								changed = true;
							}
						}
					}
					return changed;
				},
				_checkOverlap = function(tween, reference, zeroDur) {
					var tl = tween._timeline,
						ts = tl._timeScale,
						t = tween._startTime;
					while (tl._timeline) {
						t += tl._startTime;
						ts *= tl._timeScale;
						if (tl._paused) {
							return -100;
						}
						tl = tl._timeline;
					}
					t /= ts;
					return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
				};
	
	
	//---- TweenLite instance methods -----------------------------------------------------------------------------
	
			p._init = function() {
				var v = this.vars,
					op = this._overwrittenProps,
					dur = this._duration,
					immediate = !!v.immediateRender,
					ease = v.ease,
					i, initPlugins, pt, p, startVars;
				if (v.startAt) {
					if (this._startAt) {
						this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
						this._startAt.kill();
					}
					startVars = {};
					for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
						startVars[p] = v.startAt[p];
					}
					startVars.overwrite = false;
					startVars.immediateRender = true;
					startVars.lazy = (immediate && v.lazy !== false);
					startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
					this._startAt = TweenLite.to(this.target, 0, startVars);
					if (immediate) {
						if (this._time > 0) {
							this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
						} else if (dur !== 0) {
							return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
						}
					}
				} else if (v.runBackwards && dur !== 0) {
					//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
					if (this._startAt) {
						this._startAt.render(-1, true);
						this._startAt.kill();
						this._startAt = null;
					} else {
						if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
							immediate = false;
						}
						pt = {};
						for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
							if (!_reservedProps[p] || p === "autoCSS") {
								pt[p] = v[p];
							}
						}
						pt.overwrite = 0;
						pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
						pt.lazy = (immediate && v.lazy !== false);
						pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
						this._startAt = TweenLite.to(this.target, 0, pt);
						if (!immediate) {
							this._startAt._init(); //ensures that the initial values are recorded
							this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
							if (this.vars.immediateRender) {
								this._startAt = null;
							}
						} else if (this._time === 0) {
							return;
						}
					}
				}
				this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
				if (v.easeParams instanceof Array && ease.config) {
					this._ease = ease.config.apply(ease, v.easeParams);
				}
				this._easeType = this._ease._type;
				this._easePower = this._ease._power;
				this._firstPT = null;
	
				if (this._targets) {
					i = this._targets.length;
					while (--i > -1) {
						if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {
							initPlugins = true;
						}
					}
				} else {
					initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);
				}
	
				if (initPlugins) {
					TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
				}
				if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
					this._enabled(false, false);
				}
				if (v.runBackwards) {
					pt = this._firstPT;
					while (pt) {
						pt.s += pt.c;
						pt.c = -pt.c;
						pt = pt._next;
					}
				}
				this._onUpdate = v.onUpdate;
				this._initted = true;
			};
	
			p._initProps = function(target, propLookup, siblings, overwrittenProps) {
				var p, i, initPlugins, plugin, pt, v;
				if (target == null) {
					return false;
				}
	
				if (_lazyLookup[target._gsTweenID]) {
					_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
				}
	
				if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
					_autoCSS(this.vars, target);
				}
				for (p in this.vars) {
					v = this.vars[p];
					if (_reservedProps[p]) {
						if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {
							this.vars[p] = v = this._swapSelfInParams(v, this);
						}
	
					} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {
	
						//t - target 		[object]
						//p - property 		[string]
						//s - start			[number]
						//c - change		[number]
						//f - isFunction	[boolean]
						//n - name			[string]
						//pg - isPlugin 	[boolean]
						//pr - priority		[number]
						this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:1, n:p, pg:1, pr:plugin._priority};
						i = plugin._overwriteProps.length;
						while (--i > -1) {
							propLookup[plugin._overwriteProps[i]] = this._firstPT;
						}
						if (plugin._priority || plugin._onInitAllProps) {
							initPlugins = true;
						}
						if (plugin._onDisable || plugin._onEnable) {
							this._notifyPluginsOfEnabled = true;
						}
						if (pt._next) {
							pt._next._prev = pt;
						}
	
					} else {
						propLookup[p] = _addPropTween.call(this, target, p, "get", v, p, 0, null, this.vars.stringFilter);
					}
				}
	
				if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
					return this._initProps(target, propLookup, siblings, overwrittenProps);
				}
				if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
					this._kill(propLookup, target);
					return this._initProps(target, propLookup, siblings, overwrittenProps);
				}
				if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
					_lazyLookup[target._gsTweenID] = true;
				}
				return initPlugins;
			};
	
			p.render = function(time, suppressEvents, force) {
				var prevTime = this._time,
					duration = this._duration,
					prevRawPrevTime = this._rawPrevTime,
					isComplete, callback, pt, rawPrevTime;
				if (time >= duration - 0.0000001) { //to work around occasional floating point math artifacts.
					this._totalTime = this._time = duration;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;
					if (!this._reversed ) {
						isComplete = true;
						callback = "onComplete";
						force = (force || this._timeline.autoRemoveChildren); //otherwise, if the animation is unpaused/activated after it's already finished, it doesn't get removed from the parent timeline.
					}
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
							time = 0;
						}
						if (prevRawPrevTime < 0 || (time <= 0 && time >= -0.0000001) || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
							force = true;
							if (prevRawPrevTime > _tinyNum) {
								callback = "onReverseComplete";
							}
						}
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}
	
				} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
					this._totalTime = this._time = 0;
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
					if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {
						callback = "onReverseComplete";
						isComplete = this._reversed;
					}
					if (time < 0) {
						this._active = false;
						if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
							if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {
								force = true;
							}
							this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
						}
					}
					if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
						force = true;
					}
				} else {
					this._totalTime = this._time = time;
	
					if (this._easeType) {
						var r = time / duration, type = this._easeType, pow = this._easePower;
						if (type === 1 || (type === 3 && r >= 0.5)) {
							r = 1 - r;
						}
						if (type === 3) {
							r *= 2;
						}
						if (pow === 1) {
							r *= r;
						} else if (pow === 2) {
							r *= r * r;
						} else if (pow === 3) {
							r *= r * r * r;
						} else if (pow === 4) {
							r *= r * r * r * r;
						}
	
						if (type === 1) {
							this.ratio = 1 - r;
						} else if (type === 2) {
							this.ratio = r;
						} else if (time / duration < 0.5) {
							this.ratio = r / 2;
						} else {
							this.ratio = 1 - (r / 2);
						}
	
					} else {
						this.ratio = this._ease.getRatio(time / duration);
					}
				}
	
				if (this._time === prevTime && !force) {
					return;
				} else if (!this._initted) {
					this._init();
					if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
						return;
					} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
						this._time = this._totalTime = prevTime;
						this._rawPrevTime = prevRawPrevTime;
						_lazyTweens.push(this);
						this._lazy = [time, suppressEvents];
						return;
					}
					//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
					if (this._time && !isComplete) {
						this.ratio = this._ease.getRatio(this._time / duration);
					} else if (isComplete && this._ease._calcEnd) {
						this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);
					}
				}
				if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
					this._lazy = false;
				}
				if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {
					this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
				}
				if (prevTime === 0) {
					if (this._startAt) {
						if (time >= 0) {
							this._startAt.render(time, suppressEvents, force);
						} else if (!callback) {
							callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
						}
					}
					if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {
						this._callback("onStart");
					}
				}
				pt = this._firstPT;
				while (pt) {
					if (pt.f) {
						pt.t[pt.p](pt.c * this.ratio + pt.s);
					} else {
						pt.t[pt.p] = pt.c * this.ratio + pt.s;
					}
					pt = pt._next;
				}
	
				if (this._onUpdate) {
					if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
						this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
					}
					if (!suppressEvents) if (this._time !== prevTime || isComplete) {
						this._callback("onUpdate");
					}
				}
				if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
					if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
						this._startAt.render(time, suppressEvents, force);
					}
					if (isComplete) {
						if (this._timeline.autoRemoveChildren) {
							this._enabled(false, false);
						}
						this._active = false;
					}
					if (!suppressEvents && this.vars[callback]) {
						this._callback(callback);
					}
					if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
						this._rawPrevTime = 0;
					}
				}
			};
	
			p._kill = function(vars, target, overwritingTween) {
				if (vars === "all") {
					vars = null;
				}
				if (vars == null) if (target == null || target === this.target) {
					this._lazy = false;
					return this._enabled(false, false);
				}
				target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
				var simultaneousOverwrite = (overwritingTween && this._time && overwritingTween._startTime === this._startTime && this._timeline === overwritingTween._timeline),
					i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;
				if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
					i = target.length;
					while (--i > -1) {
						if (this._kill(vars, target[i], overwritingTween)) {
							changed = true;
						}
					}
				} else {
					if (this._targets) {
						i = this._targets.length;
						while (--i > -1) {
							if (target === this._targets[i]) {
								propLookup = this._propLookup[i] || {};
								this._overwrittenProps = this._overwrittenProps || [];
								overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";
								break;
							}
						}
					} else if (target !== this.target) {
						return false;
					} else {
						propLookup = this._propLookup;
						overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";
					}
	
					if (propLookup) {
						killProps = vars || propLookup;
						record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
						if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {
							for (p in killProps) {
								if (propLookup[p]) {
									if (!killed) {
										killed = [];
									}
									killed.push(p);
								}
							}
							if ((killed || !vars) && !_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
								return false;
							}
						}
	
						for (p in killProps) {
							if ((pt = propLookup[p])) {
								if (simultaneousOverwrite) { //if another tween overwrites this one and they both start at exactly the same time, yet this tween has already rendered once (for example, at 0.001) because it's first in the queue, we should revert the values to where they were at 0 so that the starting values aren't contaminated on the overwriting tween.
									if (pt.f) {
										pt.t[pt.p](pt.s);
									} else {
										pt.t[pt.p] = pt.s;
									}
									changed = true;
								}
								if (pt.pg && pt.t._kill(killProps)) {
									changed = true; //some plugins need to be notified so they can perform cleanup tasks first
								}
								if (!pt.pg || pt.t._overwriteProps.length === 0) {
									if (pt._prev) {
										pt._prev._next = pt._next;
									} else if (pt === this._firstPT) {
										this._firstPT = pt._next;
									}
									if (pt._next) {
										pt._next._prev = pt._prev;
									}
									pt._next = pt._prev = null;
								}
								delete propLookup[p];
							}
							if (record) {
								overwrittenProps[p] = 1;
							}
						}
						if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
							this._enabled(false, false);
						}
					}
				}
				return changed;
			};
	
			p.invalidate = function() {
				if (this._notifyPluginsOfEnabled) {
					TweenLite._onPluginEvent("_onDisable", this);
				}
				this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;
				this._notifyPluginsOfEnabled = this._active = this._lazy = false;
				this._propLookup = (this._targets) ? {} : [];
				Animation.prototype.invalidate.call(this);
				if (this.vars.immediateRender) {
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(-this._delay);
				}
				return this;
			};
	
			p._enabled = function(enabled, ignoreTimeline) {
				if (!_tickerActive) {
					_ticker.wake();
				}
				if (enabled && this._gc) {
					var targets = this._targets,
						i;
					if (targets) {
						i = targets.length;
						while (--i > -1) {
							this._siblings[i] = _register(targets[i], this, true);
						}
					} else {
						this._siblings = _register(this.target, this, true);
					}
				}
				Animation.prototype._enabled.call(this, enabled, ignoreTimeline);
				if (this._notifyPluginsOfEnabled) if (this._firstPT) {
					return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);
				}
				return false;
			};
	
	
	//----TweenLite static methods -----------------------------------------------------
	
			TweenLite.to = function(target, duration, vars) {
				return new TweenLite(target, duration, vars);
			};
	
			TweenLite.from = function(target, duration, vars) {
				vars.runBackwards = true;
				vars.immediateRender = (vars.immediateRender != false);
				return new TweenLite(target, duration, vars);
			};
	
			TweenLite.fromTo = function(target, duration, fromVars, toVars) {
				toVars.startAt = fromVars;
				toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);
				return new TweenLite(target, duration, toVars);
			};
	
			TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {
				return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, callbackScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
			};
	
			TweenLite.set = function(target, vars) {
				return new TweenLite(target, 0, vars);
			};
	
			TweenLite.getTweensOf = function(target, onlyActive) {
				if (target == null) { return []; }
				target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;
				var i, a, j, t;
				if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {
					i = target.length;
					a = [];
					while (--i > -1) {
						a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));
					}
					i = a.length;
					//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)
					while (--i > -1) {
						t = a[i];
						j = i;
						while (--j > -1) {
							if (t === a[j]) {
								a.splice(i, 1);
							}
						}
					}
				} else {
					a = _register(target).concat();
					i = a.length;
					while (--i > -1) {
						if (a[i]._gc || (onlyActive && !a[i].isActive())) {
							a.splice(i, 1);
						}
					}
				}
				return a;
			};
	
			TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {
				if (typeof(onlyActive) === "object") {
					vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)
					onlyActive = false;
				}
				var a = TweenLite.getTweensOf(target, onlyActive),
					i = a.length;
				while (--i > -1) {
					a[i]._kill(vars, target);
				}
			};
	
	
	
	/*
	 * ----------------------------------------------------------------
	 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
	 * ----------------------------------------------------------------
	 */
			var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {
						this._overwriteProps = (props || "").split(",");
						this._propName = this._overwriteProps[0];
						this._priority = priority || 0;
						this._super = TweenPlugin.prototype;
					}, true);
	
			p = TweenPlugin.prototype;
			TweenPlugin.version = "1.18.0";
			TweenPlugin.API = 2;
			p._firstPT = null;
			p._addTween = _addPropTween;
			p.setRatio = _setRatio;
	
			p._kill = function(lookup) {
				var a = this._overwriteProps,
					pt = this._firstPT,
					i;
				if (lookup[this._propName] != null) {
					this._overwriteProps = [];
				} else {
					i = a.length;
					while (--i > -1) {
						if (lookup[a[i]] != null) {
							a.splice(i, 1);
						}
					}
				}
				while (pt) {
					if (lookup[pt.n] != null) {
						if (pt._next) {
							pt._next._prev = pt._prev;
						}
						if (pt._prev) {
							pt._prev._next = pt._next;
							pt._prev = null;
						} else if (this._firstPT === pt) {
							this._firstPT = pt._next;
						}
					}
					pt = pt._next;
				}
				return false;
			};
	
			p._roundProps = function(lookup, value) {
				var pt = this._firstPT;
				while (pt) {
					if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
						pt.r = value;
					}
					pt = pt._next;
				}
			};
	
			TweenLite._onPluginEvent = function(type, tween) {
				var pt = tween._firstPT,
					changed, pt2, first, last, next;
				if (type === "_onInitAllProps") {
					//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
					while (pt) {
						next = pt._next;
						pt2 = first;
						while (pt2 && pt2.pr > pt.pr) {
							pt2 = pt2._next;
						}
						if ((pt._prev = pt2 ? pt2._prev : last)) {
							pt._prev._next = pt;
						} else {
							first = pt;
						}
						if ((pt._next = pt2)) {
							pt2._prev = pt;
						} else {
							last = pt;
						}
						pt = next;
					}
					pt = tween._firstPT = first;
				}
				while (pt) {
					if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {
						changed = true;
					}
					pt = pt._next;
				}
				return changed;
			};
	
			TweenPlugin.activate = function(plugins) {
				var i = plugins.length;
				while (--i > -1) {
					if (plugins[i].API === TweenPlugin.API) {
						_plugins[(new plugins[i]())._propName] = plugins[i];
					}
				}
				return true;
			};
	
			//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
			_gsDefine.plugin = function(config) {
				if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }
				var propName = config.propName,
					priority = config.priority || 0,
					overwriteProps = config.overwriteProps,
					map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},
					Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",
						function() {
							TweenPlugin.call(this, propName, priority);
							this._overwriteProps = overwriteProps || [];
						}, (config.global === true)),
					p = Plugin.prototype = new TweenPlugin(propName),
					prop;
				p.constructor = Plugin;
				Plugin.API = config.API;
				for (prop in map) {
					if (typeof(config[prop]) === "function") {
						p[map[prop]] = config[prop];
					}
				}
				Plugin.version = config.version;
				TweenPlugin.activate([Plugin]);
				return Plugin;
			};
	
	
			//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
			a = window._gsQueue;
			if (a) {
				for (i = 0; i < a.length; i++) {
					a[i]();
				}
				for (p in _defLookup) {
					if (!_defLookup[p].func) {
						window.console.log("GSAP encountered missing dependency: com.greensock." + p);
					}
				}
			}
	
			_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated
	
	})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenLite");
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var abyssa_1 = __webpack_require__(19);
	var dompteuse_1 = __webpack_require__(2);
	var animation_1 = __webpack_require__(32);
	var green_1 = __webpack_require__(37);
	var red_1 = __webpack_require__(38);
	var action_1 = __webpack_require__(30);
	function default_1() {
	    return dompteuse_1.component({
	        key: 'blue',
	        pullState: pullState,
	        render: render
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	;
	function pullState(state) {
	    return {
	        count: state.blue.count,
	        redCount: state.blue.red.count,
	        route: state.route.fullName,
	        id: state.route.params['id']
	    };
	}
	function render(options) {
	    var state = options.state;
	    var id = state.id, route = state.route;
	    return dompteuse_1.h('div#blue', { hook: animation_1.contentAnimation }, [
	        dompteuse_1.h('h1', 'Blue screen'),
	        dompteuse_1.h('a', { attrs: { href: abyssa_1.api.link('app.blue.green', { id: id }), 'data-nav': 'mousedown' } }, 'Green'),
	        dompteuse_1.h('a', { attrs: { href: abyssa_1.api.link('app.blue.red', { id: id }), 'data-nav': 'mousedown' } }, 'Red'),
	        dompteuse_1.h('div.increment', [
	            'Count: ' + state.count,
	            dompteuse_1.h('button', { on: { click: action_1.incrementBlue } }, 'Increment')
	        ]),
	        dompteuse_1.h('section', getChildren(state))
	    ]);
	}
	function getChildren(state) {
	    var route = state.route, redCount = state.redCount;
	    if (route === 'app.blue')
	        return [dompteuse_1.h('span', { hook: animation_1.contentAnimation }, 'I am blue')];
	    if (route === 'app.blue.green')
	        return [green_1.default()];
	    if (route === 'app.blue.red')
	        return [red_1.default({ openedByDefault: true }), red_1.default()];
	}


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dompteuse_1 = __webpack_require__(2);
	var animation_1 = __webpack_require__(32);
	function default_1() {
	    return dompteuse_1.component({
	        key: 'green',
	        pullState: pullState,
	        render: render
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	;
	function pullState(state) {
	    return {
	        id: state.route.params['id']
	    };
	}
	function render(options) {
	    var id = options.state.id;
	    return dompteuse_1.h('div#green', { hook: animation_1.contentAnimation }, "Green (route id = " + id + ")");
	}


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var immupdate_1 = __webpack_require__(39);
	var fluxx_1 = __webpack_require__(10);
	var dompteuse_1 = __webpack_require__(2);
	var animation_1 = __webpack_require__(32);
	function default_1(props) {
	    return dompteuse_1.component({
	        key: 'red',
	        localStore: localStore,
	        props: props,
	        render: render
	    });
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = default_1;
	;
	function localStore(_a) {
	    var openedByDefault = _a.openedByDefault;
	    var initialState = { opened: openedByDefault };
	    var actions = {
	        toggle: fluxx_1.Action('toggle')
	    };
	    var store = fluxx_1.LocalStore(initialState, function (on) {
	        on(actions.toggle, function (state) { return immupdate_1.default(state, { opened: !state.opened }); });
	    });
	    return { store: store, actions: actions };
	}
	function render(options) {
	    var opened = options.localState.opened, actions = options.actions;
	    return dompteuse_1.h('div.red', { hook: animation_1.contentAnimation, class: { opened: opened } }, [
	        dompteuse_1.h('button', { on: { click: onClick(actions) } }, 'Toggle')
	    ]);
	}
	function onClick(actions) {
	    return function () { return actions.toggle(); };
	}


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.__esModule = true;
	exports.default = update;
	exports.updateKey = updateKey;
	exports.replace = replace;
	function update(host, spec) {
	  // If any of the branches of an object changed, then than object changed too: clone it.
	  // The type of the copy is inferred.
	  var copy = host ? Array.isArray(host) ? host.slice() : clone(host) : Array.isArray(spec) ? [] : {};
	
	  for (var key in spec) {
	    var specValue = spec[key];
	
	    if (specValue === DELETE) {
	      Array.isArray(copy) ? copy.splice(key, 1) : delete copy[key];
	    }
	    // The spec continues deeper
	    else if (isObject(specValue)) {
	        copy[key] = update(copy[key], specValue);
	      }
	      // Leaf update
	      else {
	          var newValue = typeof specValue === 'function' ? specValue(copy[key]) : specValue;
	
	          copy[key] = newValue;
	        }
	  }
	
	  return copy;
	}
	
	// Single path string update like: update(obj, 'path1.path2.name', 'John');
	function updateKey(host, keyPath, value) {
	  var paths = keyPath.split('.');
	  var spec = {};
	  var currentObj = spec;
	
	  paths.forEach(function (path, index) {
	    if (index === paths.length - 1) currentObj[path] = value;else currentObj[path] = currentObj = {};
	  });
	
	  return update(host, spec);
	}
	
	function clone(obj) {
	  var result = {};
	  Object.keys(obj).forEach(function (key) {
	    result[key] = obj[key];
	  });
	  return result;
	}
	
	function isObject(x) {
	  return x && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && !Array.isArray(x);
	}
	
	var DELETE = exports.DELETE = {};
	
	function replace(value) {
	  return function () {
	    return value;
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fluxx_1 = __webpack_require__(10);
	var immupdate_1 = __webpack_require__(39);
	var action_1 = __webpack_require__(30);
	;
	var initialState = {
	    blue: { count: 0, red: { count: 0 } }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = fluxx_1.GlobalStore(initialState, function (on) {
	    on(action_1.incrementBlue, function (state) {
	        return immupdate_1.default(state, { blue: { count: function (c) { return c + 1; } } });
	    });
	    on(action_1.routeChanged, function (state, route) {
	        return immupdate_1.default(state, { route: route });
	    });
	});


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjNjZTNlNzYzM2E3ZmZlYTk2MDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9+L2RvbXB0ZXVzZS9saWIvZG9tcHRldXNlLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vc25hYmJkb20uanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS92bm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NuYWJiZG9tL2lzLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vaHRtbGRvbWFwaS5qcyIsIndlYnBhY2s6Ly8vLi9+L3NuYWJiZG9tL2guanMiLCJ3ZWJwYWNrOi8vLy4vfi9kb21wdGV1c2UvbGliL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2RvbXB0ZXVzZS9saWIvY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL34vZmx1eHgvbGliL2ZsdXh4LmpzIiwid2VicGFjazovLy8uL34vZmx1eHgvbGliL0FjdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2ZsdXh4L2xpYi9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2RvbXB0ZXVzZS9saWIvc2hhbGxvd0VxdWFsLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3NuYWJiZG9tL21vZHVsZXMvcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zbmFiYmRvbS9tb2R1bGVzL2V2ZW50bGlzdGVuZXJzLmpzIiwid2VicGFjazovLy8uL34vc25hYmJkb20vbW9kdWxlcy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvUm91dGVyLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL34vZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvYW5jaG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvU3RhdGVXaXRoUGFyYW1zLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9UcmFuc2l0aW9uLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9TdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2FieXNzYS9saWIvYXBpLmpzIiwid2VicGFjazovLy8uL34vYWJ5c3NhL2xpYi9hc3luYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hbmltYXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dzYXAudHMiLCJ3ZWJwYWNrOi8vLy4vfi9nc2FwL3NyYy91bmNvbXByZXNzZWQvcGx1Z2lucy9DU1NQbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9nc2FwL3NyYy91bmNvbXByZXNzZWQvVHdlZW5MaXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9ibHVlLnRzIiwid2VicGFjazovLy8uL3NyYy9ncmVlbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkLnRzIiwid2VicGFjazovLy8uL34vaW1tdXBkYXRlL2xpYi9pbW11cGRhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEI7QUFDOUIscUNBQW9DO0FBQ3BDLDRDQUEyQztBQUMzQyw4Q0FBNkM7QUFDN0MsMENBQXlDO0FBQ3pDLFVBQVM7QUFDVCxNQUFLO0FBQ0wsRUFBQztBQUNEO0FBQ0EsaUJBQWdCLGtCQUFrQjtBQUNsQztBQUNBLHVCQUFzQixpRUFBaUU7Ozs7Ozs7QUNuQnZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUI7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFxQix3QkFBd0I7QUFDN0Msb0JBQW1CLHdCQUF3Qjs7QUFFM0MsNkJBQTRCOztBQUU1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUI7QUFDakIscUJBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLGNBQWEsa0JBQWtCO0FBQy9CO0FBQ0EsZ0JBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9EQUFtRDtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVSxvQkFBb0I7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLHdCQUF3QjtBQUN6QztBQUNBLG9CQUFtQiwyQkFBMkI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVSxvQkFBb0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhDQUE2QztBQUM3QyxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU8sa0RBQWtEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTyxrREFBa0Q7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsb0JBQW9COztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWUsK0JBQStCO0FBQzlDO0FBQ0E7QUFDQSxnQkFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBOztBQUVBLG1CQUFrQjs7Ozs7OztBQzFRbEI7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBLDJCQUEwQix1REFBdUQsRUFBRTtBQUNuRjs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixxQkFBcUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQSx1QkFBc0IsY0FBYztBQUNwQyxnQ0FBK0IsVUFBVTtBQUN6QyxJQUFHO0FBQ0gsdUJBQXNCLGNBQWM7QUFDcEMsZ0NBQStCLFVBQVU7QUFDekMsV0FBVSxVQUFVO0FBQ3BCO0FBQ0E7QUFDQSxnQkFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLDBCQUF5Qix1RUFBdUU7O0FBRWhHOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0EsRTs7Ozs7O0FDcEZBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFXLHlFQUF5RTtBQUNwRixpQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDektBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0Q7Ozs7OztBQ25CQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUMsbUJBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7O0FBRWxDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7OztBQzVGQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGtCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDekJBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7O0FDakJsQjtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFrQjs7Ozs7OztBQ2pCbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXVDLFNBQVM7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7O0FDdENsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBdUIsVUFBVTtBQUNqQzs7QUFFQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxzQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQWtCOzs7Ozs7O0FDeENsQjtBQUNBLCtCQUE4QixpQkFBaUIsU0FBUyxFQUFFLEVBQUU7O0FBRTVEO0FBQ0EseUJBQXdCLGlCQUFpQixFQUFFO0FBQzNDOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUMscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUSxrQkFBa0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQSxtQkFBa0I7Ozs7Ozs7O0FDOURsQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUI7Ozs7Ozs7QUNiQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsSUFBSTtBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixpQkFBZ0I7QUFDaEIsZ0JBQWU7QUFDZixlQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBb0MsT0FBTztBQUMzQyxpQ0FBZ0MsVUFBVTtBQUMxQyxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLElBQUk7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNEIsbUNBQW1DLEVBQUU7QUFDakU7O0FBRUEsdUI7Ozs7Ozs7QUNuR0E7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQixrR0FBa0c7O0FBRTlPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsNkJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNEQUFxRCxFQUFFLEtBQUssRUFBRTs7QUFFOUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJDQUEwQyxFQUFFLEtBQUssRUFBRTs7QUFFbkQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBaUMsRUFBRTtBQUNuQztBQUNBOztBQUVBOztBQUVBLGtDQUFpQyxFQUFFLEtBQUssRUFBRTs7QUFFMUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxFQUFFOztBQUVwQywyRUFBMEUsRUFBRTtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsd0NBQXVDLEVBQUU7QUFDekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxpQ0FBZ0MsRUFBRTtBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBLG1EQUFrRDs7QUFFbEQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUOztBQUVBLG1DQUFrQyxVQUFVO0FBQzVDO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0ZBQXVGO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLHVCQUF1QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW1DLEVBQUU7O0FBRXJDOztBQUVBLGlEQUFnRDtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE0QztBQUM1Qzs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJCQUEwQixXQUFXO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZGQUE0Rix1Q0FBdUM7O0FBRW5JO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9FQUFtRSxhQUFhO0FBQ2hGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUVBQXNFLGVBQWU7QUFDckY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDcGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHO0FBQ0gscUJBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQzNTQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0UUFBMlE7O0FBRTNRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZ0U7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBK0Q7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSywyRUFBMkU7QUFDaEY7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3QixLQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLDBFQUF5RSxLQUFLO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXFEO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBOztBQUVBOztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQztBQUMxQztBQUNBO0FBQ0EsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBc0MsZ05BQWdOO0FBQ3RQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF3QixXQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsaUJBQWlCLFdBQVc7QUFDdkM7QUFDQSwrQ0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0EsNENBQTJDLFFBQVEsc0JBQXNCLGNBQWMsRUFBRSxFQUFFLEVBQUU7QUFDN0YsTUFBSztBQUNMO0FBQ0EsNENBQTJDLGVBQWU7QUFDMUQsTUFBSztBQUNMLEVBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjNjZTNlNzYzM2E3ZmZlYTk2MDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnJlcXVpcmUoJy4vbG9nZ2VyJyk7XG52YXIgYWJ5c3NhXzEgPSByZXF1aXJlKCdhYnlzc2EnKTtcbnZhciBkb21wdGV1c2VfMSA9IHJlcXVpcmUoJ2RvbXB0ZXVzZScpO1xudmFyIGFwcF8xID0gcmVxdWlyZSgnLi9hcHAnKTtcbnZhciBhY3Rpb25fMSA9IHJlcXVpcmUoJy4vYWN0aW9uJyk7XG52YXIgc3RvcmVfMSA9IHJlcXVpcmUoJy4vc3RvcmUnKTtcbnZhciByb3V0ZXIgPSBhYnlzc2FfMS5Sb3V0ZXIoe1xuICAgIGFwcDogYWJ5c3NhXzEuU3RhdGUoJycsIHt9LCB7XG4gICAgICAgIGluZGV4OiBhYnlzc2FfMS5TdGF0ZSgnJywge30pLFxuICAgICAgICBibHVlOiBhYnlzc2FfMS5TdGF0ZSgnYmx1ZS86aWQnLCB7fSwge1xuICAgICAgICAgICAgZ3JlZW46IGFieXNzYV8xLlN0YXRlKCdncmVlbicsIHt9KSxcbiAgICAgICAgICAgIHJlZDogYWJ5c3NhXzEuU3RhdGUoJ3JlZCcsIHt9KVxuICAgICAgICB9KVxuICAgIH0pXG59KVxuICAgIC5vbignZW5kZWQnLCBhY3Rpb25fMS5yb3V0ZUNoYW5nZWQpXG4gICAgLmNvbmZpZ3VyZSh7IHVybFN5bmM6ICdoYXNoJyB9KVxuICAgIC5pbml0KCk7XG5kb21wdGV1c2VfMS5zdGFydEFwcCh7IGFwcDogYXBwXzEuZGVmYXVsdCwgc3RvcmU6IHN0b3JlXzEuZGVmYXVsdCwgZWxtOiBkb2N1bWVudC5ib2R5IH0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9tYWluLnRzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZG9tcHRldXNlXzEgPSByZXF1aXJlKCdkb21wdGV1c2UnKTtcbnZhciBmbHV4eF8xID0gcmVxdWlyZSgnZmx1eHgnKTtcbmZsdXh4XzEuU3RvcmUubG9nID0gdHJ1ZTtcbmRvbXB0ZXVzZV8xLlJlbmRlci5sb2cgPSB0cnVlO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9sb2dnZXIudHNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmggPSBleHBvcnRzLlJlbmRlciA9IGV4cG9ydHMuc3RhcnRBcHAgPSBleHBvcnRzLmNvbXBvbmVudCA9IHVuZGVmaW5lZDtcblxudmFyIF9zbmFiYmRvbSA9IHJlcXVpcmUoJ3NuYWJiZG9tJyk7XG5cbnZhciBfaCA9IHJlcXVpcmUoJ3NuYWJiZG9tL2gnKTtcblxudmFyIF9oMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2gpO1xuXG52YXIgX3JlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG5cbnZhciBfcmVuZGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlbmRlcik7XG5cbnZhciBfY29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcblxudmFyIF9jb21wb25lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9uZW50KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RhcnRBcHAoX3JlZikge1xuICB2YXIgYXBwID0gX3JlZi5hcHA7XG4gIHZhciBlbG0gPSBfcmVmLmVsbTtcblxuICB2YXIgcGF0Y2ggPSAoMCwgX3NuYWJiZG9tLmluaXQpKFtyZXF1aXJlKCdzbmFiYmRvbS9tb2R1bGVzL2NsYXNzJyksIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvcHJvcHMnKSwgcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9hdHRyaWJ1dGVzJyksIHJlcXVpcmUoJ3NuYWJiZG9tL21vZHVsZXMvZXZlbnRsaXN0ZW5lcnMnKSwgcmVxdWlyZSgnc25hYmJkb20vbW9kdWxlcy9zdHlsZScpXSk7XG5cbiAgX3JlbmRlcjIuZGVmYXVsdC5wYXRjaCA9IHBhdGNoO1xuXG4gIC8vIE5vbiBkZXN0cnVjdGl2ZSBwYXRjaGluZyBpbnNpZGUgdGhlIHBhc3NlZCBlbGVtZW50XG4gIHZhciBlbG1Ub1JlcGxhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdmFyIG5ld1Zub2RlID0gcGF0Y2goZWxtVG9SZXBsYWNlLCBhcHApO1xuXG4gIGVsbS5hcHBlbmRDaGlsZChuZXdWbm9kZS5lbG0pO1xufVxuXG5leHBvcnRzLmNvbXBvbmVudCA9IF9jb21wb25lbnQyLmRlZmF1bHQ7XG5leHBvcnRzLnN0YXJ0QXBwID0gc3RhcnRBcHA7XG5leHBvcnRzLlJlbmRlciA9IF9yZW5kZXIyLmRlZmF1bHQ7XG5leHBvcnRzLmggPSBfaDIuZGVmYXVsdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kb21wdGV1c2UvbGliL2RvbXB0ZXVzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIGpzaGludCBuZXdjYXA6IGZhbHNlXG4vKiBnbG9iYWwgcmVxdWlyZSwgbW9kdWxlLCBkb2N1bWVudCwgTm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVk5vZGUgPSByZXF1aXJlKCcuL3Zub2RlJyk7XG52YXIgaXMgPSByZXF1aXJlKCcuL2lzJyk7XG52YXIgZG9tQXBpID0gcmVxdWlyZSgnLi9odG1sZG9tYXBpLmpzJyk7XG5cbmZ1bmN0aW9uIGlzVW5kZWYocykgeyByZXR1cm4gcyA9PT0gdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc0RlZihzKSB7IHJldHVybiBzICE9PSB1bmRlZmluZWQ7IH1cblxudmFyIGVtcHR5Tm9kZSA9IFZOb2RlKCcnLCB7fSwgW10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcblxuZnVuY3Rpb24gc2FtZVZub2RlKHZub2RlMSwgdm5vZGUyKSB7XG4gIHJldHVybiB2bm9kZTEua2V5ID09PSB2bm9kZTIua2V5ICYmIHZub2RlMS5zZWwgPT09IHZub2RlMi5zZWw7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUtleVRvT2xkSWR4KGNoaWxkcmVuLCBiZWdpbklkeCwgZW5kSWR4KSB7XG4gIHZhciBpLCBtYXAgPSB7fSwga2V5O1xuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgIGtleSA9IGNoaWxkcmVuW2ldLmtleTtcbiAgICBpZiAoaXNEZWYoa2V5KSkgbWFwW2tleV0gPSBpO1xuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbnZhciBob29rcyA9IFsnY3JlYXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveScsICdwcmUnLCAncG9zdCddO1xuXG5mdW5jdGlvbiBpbml0KG1vZHVsZXMsIGFwaSkge1xuICB2YXIgaSwgaiwgY2JzID0ge307XG5cbiAgaWYgKGlzVW5kZWYoYXBpKSkgYXBpID0gZG9tQXBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBob29rcy5sZW5ndGg7ICsraSkge1xuICAgIGNic1tob29rc1tpXV0gPSBbXTtcbiAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgaWYgKG1vZHVsZXNbal1baG9va3NbaV1dICE9PSB1bmRlZmluZWQpIGNic1tob29rc1tpXV0ucHVzaChtb2R1bGVzW2pdW2hvb2tzW2ldXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW1wdHlOb2RlQXQoZWxtKSB7XG4gICAgcmV0dXJuIFZOb2RlKGFwaS50YWdOYW1lKGVsbSkudG9Mb3dlckNhc2UoKSwge30sIFtdLCB1bmRlZmluZWQsIGVsbSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVSbUNiKGNoaWxkRWxtLCBsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS1saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IGFwaS5wYXJlbnROb2RlKGNoaWxkRWxtKTtcbiAgICAgICAgYXBpLnJlbW92ZUNoaWxkKHBhcmVudCwgY2hpbGRFbG0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbG0odm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIHZhciBpLCB0aHVuaywgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuaW5pdCkpIGkodm5vZGUpO1xuICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLnZub2RlKSkge1xuICAgICAgICAgIHRodW5rID0gdm5vZGU7XG4gICAgICAgICAgdm5vZGUgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgZWxtLCBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuLCBzZWwgPSB2bm9kZS5zZWw7XG4gICAgaWYgKGlzRGVmKHNlbCkpIHtcbiAgICAgIC8vIFBhcnNlIHNlbGVjdG9yXG4gICAgICB2YXIgaGFzaElkeCA9IHNlbC5pbmRleE9mKCcjJyk7XG4gICAgICB2YXIgZG90SWR4ID0gc2VsLmluZGV4T2YoJy4nLCBoYXNoSWR4KTtcbiAgICAgIHZhciBoYXNoID0gaGFzaElkeCA+IDAgPyBoYXNoSWR4IDogc2VsLmxlbmd0aDtcbiAgICAgIHZhciBkb3QgPSBkb3RJZHggPiAwID8gZG90SWR4IDogc2VsLmxlbmd0aDtcbiAgICAgIHZhciB0YWcgPSBoYXNoSWR4ICE9PSAtMSB8fCBkb3RJZHggIT09IC0xID8gc2VsLnNsaWNlKDAsIE1hdGgubWluKGhhc2gsIGRvdCkpIDogc2VsO1xuICAgICAgZWxtID0gdm5vZGUuZWxtID0gaXNEZWYoZGF0YSkgJiYgaXNEZWYoaSA9IGRhdGEubnMpID8gYXBpLmNyZWF0ZUVsZW1lbnROUyhpLCB0YWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhcGkuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgICAgaWYgKGhhc2ggPCBkb3QpIGVsbS5pZCA9IHNlbC5zbGljZShoYXNoICsgMSwgZG90KTtcbiAgICAgIGlmIChkb3RJZHggPiAwKSBlbG0uY2xhc3NOYW1lID0gc2VsLnNsaWNlKGRvdCsxKS5yZXBsYWNlKC9cXC4vZywgJyAnKTtcbiAgICAgIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgY3JlYXRlRWxtKGNoaWxkcmVuW2ldLCBpbnNlcnRlZFZub2RlUXVldWUpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpcy5wcmltaXRpdmUodm5vZGUudGV4dCkpIHtcbiAgICAgICAgYXBpLmFwcGVuZENoaWxkKGVsbSwgYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpKTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMuY3JlYXRlLmxlbmd0aDsgKytpKSBjYnMuY3JlYXRlW2ldKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgaSA9IHZub2RlLmRhdGEuaG9vazsgLy8gUmV1c2UgdmFyaWFibGVcbiAgICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgICBpZiAoaS5jcmVhdGUpIGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgICAgICBpZiAoaS5pbnNlcnQpIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoKHZub2RlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxtID0gdm5vZGUuZWxtID0gYXBpLmNyZWF0ZVRleHROb2RlKHZub2RlLnRleHQpO1xuICAgIH1cbiAgICBpZiAoaXNEZWYodGh1bmspKSB0aHVuay5lbG0gPSB2bm9kZS5lbG07XG4gICAgcmV0dXJuIHZub2RlLmVsbTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgY3JlYXRlRWxtKHZub2Rlc1tzdGFydElkeF0sIGluc2VydGVkVm5vZGVRdWV1ZSksIGJlZm9yZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sodm5vZGUpIHtcbiAgICB2YXIgaSwgaiwgZGF0YSA9IHZub2RlLmRhdGE7XG4gICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkuZGVzdHJveSkpIGkodm5vZGUpO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNicy5kZXN0cm95Lmxlbmd0aDsgKytpKSBjYnMuZGVzdHJveVtpXSh2bm9kZSk7XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNoaWxkcmVuKSkge1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICBpbnZva2VEZXN0cm95SG9vayh2bm9kZS5jaGlsZHJlbltqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS52bm9kZSkpIGludm9rZURlc3Ryb3lIb29rKGkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIHZub2Rlcywgc3RhcnRJZHgsIGVuZElkeCkge1xuICAgIGZvciAoOyBzdGFydElkeCA8PSBlbmRJZHg7ICsrc3RhcnRJZHgpIHtcbiAgICAgIHZhciBpLCBsaXN0ZW5lcnMsIHJtLCBjaCA9IHZub2Rlc1tzdGFydElkeF07XG4gICAgICBpZiAoaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChpc0RlZihjaC5zZWwpKSB7XG4gICAgICAgICAgaW52b2tlRGVzdHJveUhvb2soY2gpO1xuICAgICAgICAgIGxpc3RlbmVycyA9IGNicy5yZW1vdmUubGVuZ3RoICsgMTtcbiAgICAgICAgICBybSA9IGNyZWF0ZVJtQ2IoY2guZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMucmVtb3ZlLmxlbmd0aDsgKytpKSBjYnMucmVtb3ZlW2ldKGNoLCBybSk7XG4gICAgICAgICAgaWYgKGlzRGVmKGkgPSBjaC5kYXRhKSAmJiBpc0RlZihpID0gaS5ob29rKSAmJiBpc0RlZihpID0gaS5yZW1vdmUpKSB7XG4gICAgICAgICAgICBpKGNoLCBybSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJtKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBUZXh0IG5vZGVcbiAgICAgICAgICBhcGkucmVtb3ZlQ2hpbGQocGFyZW50RWxtLCBjaC5lbG0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4ocGFyZW50RWxtLCBvbGRDaCwgbmV3Q2gsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIHZhciBvbGRTdGFydElkeCA9IDAsIG5ld1N0YXJ0SWR4ID0gMDtcbiAgICB2YXIgb2xkRW5kSWR4ID0gb2xkQ2gubGVuZ3RoIC0gMTtcbiAgICB2YXIgb2xkU3RhcnRWbm9kZSA9IG9sZENoWzBdO1xuICAgIHZhciBvbGRFbmRWbm9kZSA9IG9sZENoW29sZEVuZElkeF07XG4gICAgdmFyIG5ld0VuZElkeCA9IG5ld0NoLmxlbmd0aCAtIDE7XG4gICAgdmFyIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFswXTtcbiAgICB2YXIgbmV3RW5kVm5vZGUgPSBuZXdDaFtuZXdFbmRJZHhdO1xuICAgIHZhciBvbGRLZXlUb0lkeCwgaWR4SW5PbGQsIGVsbVRvTW92ZSwgYmVmb3JlO1xuXG4gICAgd2hpbGUgKG9sZFN0YXJ0SWR4IDw9IG9sZEVuZElkeCAmJiBuZXdTdGFydElkeCA8PSBuZXdFbmRJZHgpIHtcbiAgICAgIGlmIChpc1VuZGVmKG9sZFN0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTsgLy8gVm5vZGUgaGFzIGJlZW4gbW92ZWQgbGVmdFxuICAgICAgfSBlbHNlIGlmIChpc1VuZGVmKG9sZEVuZFZub2RlKSkge1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUpKSB7XG4gICAgICAgIHBhdGNoVm5vZGUob2xkRW5kVm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBvbGRFbmRWbm9kZSA9IG9sZENoWy0tb2xkRW5kSWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgcmlnaHRcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdFbmRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtLCBhcGkubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxuICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBhcGkuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNVbmRlZihvbGRLZXlUb0lkeCkpIG9sZEtleVRvSWR4ID0gY3JlYXRlS2V5VG9PbGRJZHgob2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgICAgICBpZHhJbk9sZCA9IG9sZEtleVRvSWR4W25ld1N0YXJ0Vm5vZGUua2V5XTtcbiAgICAgICAgaWYgKGlzVW5kZWYoaWR4SW5PbGQpKSB7IC8vIE5ldyBlbGVtZW50XG4gICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGNyZWF0ZUVsbShuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsbVRvTW92ZSA9IG9sZENoW2lkeEluT2xkXTtcbiAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICBvbGRDaFtpZHhJbk9sZF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbVRvTW92ZS5lbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICBiZWZvcmUgPSBpc1VuZGVmKG5ld0NoW25ld0VuZElkeCsxXSkgPyBudWxsIDogbmV3Q2hbbmV3RW5kSWR4KzFdLmVsbTtcbiAgICAgIGFkZFZub2RlcyhwYXJlbnRFbG0sIGJlZm9yZSwgbmV3Q2gsIG5ld1N0YXJ0SWR4LCBuZXdFbmRJZHgsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgfSBlbHNlIGlmIChuZXdTdGFydElkeCA+IG5ld0VuZElkeCkge1xuICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSwgb2xkQ2gsIG9sZFN0YXJ0SWR4LCBvbGRFbmRJZHgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdGNoVm5vZGUob2xkVm5vZGUsIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICB2YXIgaSwgaG9vaztcbiAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEpICYmIGlzRGVmKGhvb2sgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBob29rLnByZXBhdGNoKSkge1xuICAgICAgaShvbGRWbm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICBpZiAoaXNEZWYoaSA9IG9sZFZub2RlLmRhdGEpICYmIGlzRGVmKGkgPSBpLnZub2RlKSkgb2xkVm5vZGUgPSBpO1xuICAgIGlmIChpc0RlZihpID0gdm5vZGUuZGF0YSkgJiYgaXNEZWYoaSA9IGkudm5vZGUpKSB7XG4gICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCBpLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgdm5vZGUuZWxtID0gaS5lbG07XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG0sIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW4sIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgaWYgKG9sZFZub2RlID09PSB2bm9kZSkgcmV0dXJuO1xuICAgIGlmICghc2FtZVZub2RlKG9sZFZub2RlLCB2bm9kZSkpIHtcbiAgICAgIHZhciBwYXJlbnRFbG0gPSBhcGkucGFyZW50Tm9kZShvbGRWbm9kZS5lbG0pO1xuICAgICAgZWxtID0gY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgYXBpLmluc2VydEJlZm9yZShwYXJlbnRFbG0sIGVsbSwgb2xkVm5vZGUuZWxtKTtcbiAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIFtvbGRWbm9kZV0sIDAsIDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNEZWYodm5vZGUuZGF0YSkpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjYnMudXBkYXRlLmxlbmd0aDsgKytpKSBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgICBpID0gdm5vZGUuZGF0YS5ob29rO1xuICAgICAgaWYgKGlzRGVmKGkpICYmIGlzRGVmKGkgPSBpLnVwZGF0ZSkpIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICB9XG4gICAgaWYgKGlzVW5kZWYodm5vZGUudGV4dCkpIHtcbiAgICAgIGlmIChpc0RlZihvbGRDaCkgJiYgaXNEZWYoY2gpKSB7XG4gICAgICAgIGlmIChvbGRDaCAhPT0gY2gpIHVwZGF0ZUNoaWxkcmVuKGVsbSwgb2xkQ2gsIGNoLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICAgIGFkZFZub2RlcyhlbG0sIG51bGwsIGNoLCAwLCBjaC5sZW5ndGggLSAxLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRDaCkpIHtcbiAgICAgICAgcmVtb3ZlVm5vZGVzKGVsbSwgb2xkQ2gsIDAsIG9sZENoLmxlbmd0aCAtIDEpO1xuICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50ZXh0KSkge1xuICAgICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBhcGkuc2V0VGV4dENvbnRlbnQoZWxtLCB2bm9kZS50ZXh0KTtcbiAgICB9XG4gICAgaWYgKGlzRGVmKGhvb2spICYmIGlzRGVmKGkgPSBob29rLnBvc3RwYXRjaCkpIHtcbiAgICAgIGkob2xkVm5vZGUsIHZub2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24ob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgdmFyIGksIGVsbSwgcGFyZW50O1xuICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnByZS5sZW5ndGg7ICsraSkgY2JzLnByZVtpXSgpO1xuXG4gICAgaWYgKGlzVW5kZWYob2xkVm5vZGUuc2VsKSkge1xuICAgICAgb2xkVm5vZGUgPSBlbXB0eU5vZGVBdChvbGRWbm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgcGFyZW50ID0gYXBpLnBhcmVudE5vZGUoZWxtKTtcblxuICAgICAgY3JlYXRlRWxtKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuXG4gICAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGFwaS5pbnNlcnRCZWZvcmUocGFyZW50LCB2bm9kZS5lbG0sIGFwaS5uZXh0U2libGluZyhlbG0pKTtcbiAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudCwgW29sZFZub2RlXSwgMCwgMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGluc2VydGVkVm5vZGVRdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQoaW5zZXJ0ZWRWbm9kZVF1ZXVlW2ldKTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGNicy5wb3N0Lmxlbmd0aDsgKytpKSBjYnMucG9zdFtpXSgpO1xuICAgIHJldHVybiB2bm9kZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7aW5pdDogaW5pdH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zbmFiYmRvbS9zbmFiYmRvbS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VsLCBkYXRhLCBjaGlsZHJlbiwgdGV4dCwgZWxtKSB7XG4gIHZhciBrZXkgPSBkYXRhID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBkYXRhLmtleTtcbiAgcmV0dXJuIHtzZWw6IHNlbCwgZGF0YTogZGF0YSwgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgICAgICAgIHRleHQ6IHRleHQsIGVsbTogZWxtLCBrZXk6IGtleX07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc25hYmJkb20vdm5vZGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgYXJyYXk6IEFycmF5LmlzQXJyYXksXG4gIHByaW1pdGl2ZTogZnVuY3Rpb24ocykgeyByZXR1cm4gdHlwZW9mIHMgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBzID09PSAnbnVtYmVyJzsgfSxcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zbmFiYmRvbS9pcy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnTmFtZSl7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKXtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZSh0ZXh0KXtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xufVxuXG5cbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJlbnROb2RlLCBuZXdOb2RlLCByZWZlcmVuY2VOb2RlKXtcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSk7XG59XG5cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQobm9kZSwgY2hpbGQpe1xuICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kQ2hpbGQobm9kZSwgY2hpbGQpe1xuICBub2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbn1cblxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKXtcbiAgcmV0dXJuIG5vZGUucGFyZW50RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gbmV4dFNpYmxpbmcobm9kZSl7XG4gIHJldHVybiBub2RlLm5leHRTaWJsaW5nO1xufVxuXG5mdW5jdGlvbiB0YWdOYW1lKG5vZGUpe1xuICByZXR1cm4gbm9kZS50YWdOYW1lO1xufVxuXG5mdW5jdGlvbiBzZXRUZXh0Q29udGVudChub2RlLCB0ZXh0KXtcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50LFxuICBjcmVhdGVFbGVtZW50TlM6IGNyZWF0ZUVsZW1lbnROUyxcbiAgY3JlYXRlVGV4dE5vZGU6IGNyZWF0ZVRleHROb2RlLFxuICBhcHBlbmRDaGlsZDogYXBwZW5kQ2hpbGQsXG4gIHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcbiAgaW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG4gIHBhcmVudE5vZGU6IHBhcmVudE5vZGUsXG4gIG5leHRTaWJsaW5nOiBuZXh0U2libGluZyxcbiAgdGFnTmFtZTogdGFnTmFtZSxcbiAgc2V0VGV4dENvbnRlbnQ6IHNldFRleHRDb250ZW50XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc25hYmJkb20vaHRtbGRvbWFwaS5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBWTm9kZSA9IHJlcXVpcmUoJy4vdm5vZGUnKTtcbnZhciBpcyA9IHJlcXVpcmUoJy4vaXMnKTtcblxuZnVuY3Rpb24gYWRkTlMoZGF0YSwgY2hpbGRyZW4pIHtcbiAgZGF0YS5ucyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIGlmIChjaGlsZHJlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgYWRkTlMoY2hpbGRyZW5baV0uZGF0YSwgY2hpbGRyZW5baV0uY2hpbGRyZW4pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGgoc2VsLCBiLCBjKSB7XG4gIHZhciBkYXRhID0ge30sIGNoaWxkcmVuLCB0ZXh0LCBpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRhdGEgPSBiO1xuICAgIGlmIChpcy5hcnJheShjKSkgeyBjaGlsZHJlbiA9IGM7IH1cbiAgICBlbHNlIGlmIChpcy5wcmltaXRpdmUoYykpIHsgdGV4dCA9IGM7IH1cbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgaWYgKGlzLmFycmF5KGIpKSB7IGNoaWxkcmVuID0gYjsgfVxuICAgIGVsc2UgaWYgKGlzLnByaW1pdGl2ZShiKSkgeyB0ZXh0ID0gYjsgfVxuICAgIGVsc2UgeyBkYXRhID0gYjsgfVxuICB9XG4gIGlmIChpcy5hcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChpcy5wcmltaXRpdmUoY2hpbGRyZW5baV0pKSBjaGlsZHJlbltpXSA9IFZOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNlbFswXSA9PT0gJ3MnICYmIHNlbFsxXSA9PT0gJ3YnICYmIHNlbFsyXSA9PT0gJ2cnKSB7XG4gICAgYWRkTlMoZGF0YSwgY2hpbGRyZW4pO1xuICB9XG4gIHJldHVybiBWTm9kZShzZWwsIGRhdGEsIGNoaWxkcmVuLCB0ZXh0LCB1bmRlZmluZWQpO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3NuYWJiZG9tL2guanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLnJlbmRlckNvbXBvbmVudCA9IHJlbmRlckNvbXBvbmVudDtcbmV4cG9ydHMucmVuZGVyQ29tcG9uZW50Tm93ID0gcmVuZGVyQ29tcG9uZW50Tm93O1xuXG52YXIgX2ggPSByZXF1aXJlKCdzbmFiYmRvbS9oJyk7XG5cbnZhciBfaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9oKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNvbXBvbmVudHNUb1JlbmRlciA9IFtdO1xudmFyIHJlbmRlcmluZyA9IGZhbHNlO1xudmFyIG5leHRSZW5kZXIgPSB2b2lkIDA7XG5cbnZhciBSZW5kZXIgPSB7IHBhdGNoOiB1bmRlZmluZWQsIGxvZzogZmFsc2UgfTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJlbmRlcjtcbmZ1bmN0aW9uIHJlbmRlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgaWYgKHJlbmRlcmluZykge1xuICAgIGNvbnNvbGUud2FybignQSBjb21wb25lbnQgdHJpZWQgdG8gcmUtcmVuZGVyIHdoaWxlIGEgcmVuZGVyaW5nIHdhcyBhbHJlYWR5IG9uZ29pbmcnLCBjb21wb25lbnQuZWxtKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGlzIGNvbXBvbmVudCBpcyBhbHJlYWR5IHNjaGVkdWxlZCBmb3IgdGhlIG5leHQgcmVkcmF3LlxuICAvLyBGb3IgaW5zdGFuY2UsIHRoaXMgY2FuIGVhc2lseSBoYXBwZW4gd2hpbGUgdGhlIGFwcCdzIHRhYiBpcyBpbmFjdGl2ZS5cbiAgLy8gQXZvaWRzIGRvaW5nIG1vcmUgd29yayB0aGFuIG5lY2Vzc2FyeSB3aGVuIHJlLWFjdGl2YXRpbmcgaXQuXG4gIGlmIChjb21wb25lbnRzVG9SZW5kZXIuaW5kZXhPZihjb21wb25lbnQpICE9PSAtMSkgcmV0dXJuO1xuXG4gIGNvbXBvbmVudHNUb1JlbmRlci5wdXNoKGNvbXBvbmVudCk7XG5cbiAgaWYgKCFuZXh0UmVuZGVyKSBuZXh0UmVuZGVyID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlck5vdyk7XG59O1xuXG5mdW5jdGlvbiByZW5kZXJDb21wb25lbnROb3coY29tcG9uZW50KSB7XG4gIHZhciBpZCA9IGNvbXBvbmVudC5pZDtcbiAgdmFyIGxvY2FsU3RhdGUgPSBjb21wb25lbnQubG9jYWxTdGF0ZTtcbiAgdmFyIGFjdGlvbnMgPSBjb21wb25lbnQuYWN0aW9ucztcbiAgdmFyIHByb3BzID0gY29tcG9uZW50LnByb3BzO1xuICB2YXIgc3RhdGUgPSBjb21wb25lbnQuc3RhdGU7XG4gIHZhciBlbG0gPSBjb21wb25lbnQuZWxtO1xuICB2YXIgcmVuZGVyID0gY29tcG9uZW50LnJlbmRlcjtcbiAgdmFyIHZub2RlID0gY29tcG9uZW50LnZub2RlO1xuICB2YXIgZGVzdHJveWVkID0gY29tcG9uZW50LmRlc3Ryb3llZDtcblxuICAvLyBCYWlsIGlmIHRoZSBjb21wb25lbnQgaXMgYWxyZWFkeSBkZXN0cm95ZWQuXG4gIC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgcGFyZW50IHJlbmRlcnMgZmlyc3QgYW5kIGRlY2lkZSBhIGNoaWxkIGNvbXBvbmVudCBzaG91bGQgYmUgcmVtb3ZlZC5cblxuICBpZiAoZGVzdHJveWVkKSByZXR1cm47XG5cbiAgdmFyIHBhdGNoID0gUmVuZGVyLnBhdGNoO1xuICB2YXIgbG9nID0gUmVuZGVyLmxvZztcblxuXG4gIHZhciBiZWZvcmVSZW5kZXIgPSB2b2lkIDA7XG5cbiAgaWYgKGxvZykgYmVmb3JlUmVuZGVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIHZhciBuZXdWbm9kZSA9IHJlbmRlcih7IHByb3BzOiBwcm9wcywgc3RhdGU6IHN0YXRlLCBsb2NhbFN0YXRlOiBsb2NhbFN0YXRlLCBhY3Rpb25zOiBhY3Rpb25zIH0pO1xuXG4gIHBhdGNoKHZub2RlIHx8IGVsbSwgbmV3Vm5vZGUpO1xuXG4gIGlmIChsb2cpIGNvbnNvbGUubG9nKCdSZW5kZXIgY29tcG9uZW50IFxcJycgKyBjb21wb25lbnQua2V5ICsgJ1xcJycsIHBlcmZvcm1hbmNlLm5vdygpIC0gYmVmb3JlUmVuZGVyICsgJyBtcycsIGNvbXBvbmVudCk7XG5cbiAgY29tcG9uZW50Lm9uUmVuZGVyKGNvbXBvbmVudCwgbmV3Vm5vZGUpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJOb3coKSB7XG4gIHJlbmRlcmluZyA9IHRydWU7XG5cbiAgdmFyIGNvbXBvbmVudHMgPSBjb21wb25lbnRzVG9SZW5kZXI7XG5cbiAgbmV4dFJlbmRlciA9IHVuZGVmaW5lZDtcbiAgY29tcG9uZW50c1RvUmVuZGVyID0gW107XG5cbiAgaWYgKFJlbmRlci5sb2cpIGNvbnNvbGUubG9nKCclY05ldyByZW5kZXJpbmcgZnJhbWUnLCAnY29sb3I6IG9yYW5nZScpO1xuXG4gIC8vIFJlbmRlciBjb21wb25lbnRzIGluIGEgdG9wLWRvd24gZmFzaGlvbi5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoZSByZW5kZXJpbmcgb3JkZXIgaXMgcHJlZGljdGl2ZSBhbmQgcHJvcHMgJiBzdGF0ZXMgYXJlIGNvbnNpc3RlbnQuXG4gIGNvbXBvbmVudHMuc29ydChmdW5jdGlvbiAoY29tcEEsIGNvbXBCKSB7XG4gICAgcmV0dXJuIGNvbXBBLmRlcHRoIC0gY29tcEIuZGVwdGg7XG4gIH0pO1xuICBjb21wb25lbnRzLmZvckVhY2gocmVuZGVyQ29tcG9uZW50Tm93KTtcblxuICByZW5kZXJpbmcgPSBmYWxzZTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kb21wdGV1c2UvbGliL3JlbmRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbXBvbmVudDtcblxudmFyIF9oID0gcmVxdWlyZSgnc25hYmJkb20vaCcpO1xuXG52YXIgX2gyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaCk7XG5cbnZhciBfZmx1eHggPSByZXF1aXJlKCdmbHV4eCcpO1xuXG52YXIgX3JlbmRlciA9IHJlcXVpcmUoJy4vcmVuZGVyJyk7XG5cbnZhciBfc2hhbGxvd0VxdWFsID0gcmVxdWlyZSgnLi9zaGFsbG93RXF1YWwnKTtcblxudmFyIF9zaGFsbG93RXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2hhbGxvd0VxdWFsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGVtcHR5ID0ge307XG5cbmZ1bmN0aW9uIGNvbXBvbmVudChvcHRpb25zKSB7XG4gIHZhciBrZXkgPSBvcHRpb25zLmtleTtcbiAgdmFyIF9vcHRpb25zJHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgdmFyIHByb3BzID0gX29wdGlvbnMkcHJvcHMgPT09IHVuZGVmaW5lZCA/IGVtcHR5IDogX29wdGlvbnMkcHJvcHM7XG4gIHZhciBwdWxsU3RhdGUgPSBvcHRpb25zLnB1bGxTdGF0ZTtcbiAgdmFyIGxvY2FsU3RvcmUgPSBvcHRpb25zLmxvY2FsU3RvcmU7XG4gIHZhciByZW5kZXIgPSBvcHRpb25zLnJlbmRlcjtcbiAgdmFyIGhvb2sgPSBvcHRpb25zLmhvb2s7XG5cblxuICB2YXIgY29tcFByb3BzID0ge1xuICAgIGtleToga2V5LFxuICAgIGhvb2s6IHsgY3JlYXRlOiBjcmVhdGUsIGluc2VydDogaW5zZXJ0LCBwb3N0cGF0Y2g6IHBvc3RwYXRjaCwgZGVzdHJveTogZGVzdHJveSB9LFxuICAgIGNvbXBvbmVudDogeyBwcm9wczogcHJvcHMsIHB1bGxTdGF0ZTogcHVsbFN0YXRlLCBsb2NhbFN0b3JlRm46IGxvY2FsU3RvcmUsIHJlbmRlcjogcmVuZGVyLCBrZXk6IGtleSB9XG4gIH07XG5cbiAgcmV0dXJuICgwLCBfaDIuZGVmYXVsdCkoJ2RpdicsIGNvbXBQcm9wcyk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGUoXywgdm5vZGUpIHtcbiAgdmFyIGNvbXBvbmVudCA9IHZub2RlLmRhdGEuY29tcG9uZW50O1xuICB2YXIgcHJvcHMgPSBjb21wb25lbnQucHJvcHM7XG4gIHZhciBwdWxsU3RhdGUgPSBjb21wb25lbnQucHVsbFN0YXRlO1xuICB2YXIgbG9jYWxTdG9yZUZuID0gY29tcG9uZW50LmxvY2FsU3RvcmVGbjtcblxuICAvLyBUaGlzIGNvbXBvbmVudCBwdWxscyBzdGF0ZSBmcm9tIHRoZSBnbG9iYWwgc3RvcmVcblxuICBpZiAocHVsbFN0YXRlKSB7XG4gICAgdmFyIHN0b3JlID0gKDAsIF9mbHV4eC5nbG9iYWxTdG9yZSkoKTtcbiAgICBjb21wb25lbnQudW5zdWJGcm9tU3RvcmVzID0gc3RvcmUuc3Vic2NyaWJlKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIG9uR2xvYmFsU3RvcmVDaGFuZ2UoY29tcG9uZW50LCBzdGF0ZSk7XG4gICAgfSk7XG4gICAgY29tcG9uZW50LnN0YXRlID0gcHVsbFN0YXRlKHN0b3JlLnN0YXRlKTtcbiAgfVxuXG4gIC8vIFRoaXMgY29tcG9uZW50IG1haW50YWlucyBsb2NhbCBzdGF0ZVxuICBpZiAobG9jYWxTdG9yZUZuKSB7XG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBsb2NhbFN0b3JlID0gbG9jYWxTdG9yZUZuKHByb3BzKTtcbiAgICAgIHZhciBzdG9yZSA9IGxvY2FsU3RvcmUuc3RvcmU7XG4gICAgICB2YXIgYWN0aW9ucyA9IGxvY2FsU3RvcmUuYWN0aW9ucztcblxuXG4gICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiBhY3Rpb25zW25hbWVdLl9zdG9yZSA9IHN0b3JlO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciB1bnN1YkZyb21HbG9iYWxTdG9yZSA9IGNvbXBvbmVudC51bnN1YkZyb21TdG9yZXM7XG4gICAgICB2YXIgdW5zdWJGcm9tTG9jYWxTdG9yZSA9IHN0b3JlLnN1YnNjcmliZShmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG9uTG9jYWxTdG9yZUNoYW5nZShjb21wb25lbnQsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb21wb25lbnQudW5zdWJGcm9tU3RvcmVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB1bnN1YkZyb21Mb2NhbFN0b3JlKCk7XG4gICAgICAgIGlmICh1bnN1YkZyb21HbG9iYWxTdG9yZSkgdW5zdWJGcm9tR2xvYmFsU3RvcmUoKTtcbiAgICAgIH07XG5cbiAgICAgIGNvbXBvbmVudC5hY3Rpb25zID0gYWN0aW9ucztcbiAgICAgIGNvbXBvbmVudC5sb2NhbFN0YXRlID0gc3RvcmUuc3RhdGU7XG4gICAgfSkoKTtcbiAgfVxuXG4gIGNvbXBvbmVudC5lbG0gPSB2bm9kZS5lbG07XG4gIGNvbXBvbmVudC5vblJlbmRlciA9IG9uUmVuZGVyO1xuICBjb21wb25lbnQucGxhY2Vob2xkZXIgPSB2bm9kZTtcblxuICAvLyBDcmVhdGUgYW5kIGluc2VydCB0aGUgY29tcG9uZW50J3MgY29udGVudFxuICAvLyB3aGlsZSBpdHMgcGFyZW50IGlzIHN0aWxsIHVuYXR0YWNoZWQgZm9yIGJldHRlciBwZXJmcy5cbiAgKDAsIF9yZW5kZXIucmVuZGVyQ29tcG9uZW50Tm93KShjb21wb25lbnQpO1xuXG4gIC8vIFN3YXAgdGhlIGZha2UvY2hlYXAgZGl2IHBsYWNlaG9sZGVyJ3MgZWxtIHdpdGggdGhlIHByb3BlciBlbG0gdGhhdCBoYXMganVzdCBiZWVuIGNyZWF0ZWQuXG4gIGNvbXBvbmVudC5wbGFjZWhvbGRlci5lbG0gPSBjb21wb25lbnQudm5vZGUuZWxtO1xufVxuXG4vLyBTdG9yZSB0aGUgY29tcG9uZW50IGRlcHRoIG9uY2UgaXQncyBhdHRhY2hlZCB0byB0aGUgRE9NIHNvIHdlIGNhbiByZW5kZXJcbi8vIGNvbXBvbmVudCBoaWVyYXJjaGllcyBpbiBhIHByZWRpY3RpdmUgbWFubmVyLlxuZnVuY3Rpb24gaW5zZXJ0KHZub2RlKSB7XG4gIHZub2RlLmRhdGEuY29tcG9uZW50LmRlcHRoID0gdm5vZGUuZWxtLl9fZGVwdGhfXyA9IGdldERlcHRoKHZub2RlLmVsbSk7XG59XG5cbi8vIENhbGxlZCBvbiBldmVyeSByZS1yZW5kZXIsIHRoaXMgaXMgd2hlcmUgdGhlIHByb3BzIHBhc3NlZCBieSB0aGUgY29tcG9uZW50J3MgcGFyZW50IG1heSBoYXZlIGNoYW5nZWQuXG5mdW5jdGlvbiBwb3N0cGF0Y2gob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBvbGREYXRhID0gb2xkVm5vZGUuZGF0YTtcbiAgdmFyIG5ld0RhdGEgPSB2bm9kZS5kYXRhO1xuXG4gIC8vIFBhc3Mgb24gdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBldmVyeXRpbWUgYSBuZXcgVm5vZGUgaW5zdGFuY2UgaXMgY3JlYXRlZCxcbiAgLy8gYnV0IHVwZGF0ZSBhbnkgaW1wb3J0YW50IHByb3BlcnR5IHRoYXQgY2FuIGNoYW5nZSBvdmVyIHRpbWUuXG4gIHZhciBjb21wb25lbnQgPSBvbGREYXRhLmNvbXBvbmVudDtcbiAgY29tcG9uZW50LnByb3BzID0gbmV3RGF0YS5jb21wb25lbnQucHJvcHM7XG4gIGNvbXBvbmVudC5yZW5kZXIgPSBuZXdEYXRhLmNvbXBvbmVudC5yZW5kZXI7XG4gIGNvbXBvbmVudC5wbGFjZWhvbGRlciA9IHZub2RlO1xuICBuZXdEYXRhLmNvbXBvbmVudCA9IGNvbXBvbmVudDtcblxuICAvLyBpZiB0aGUgcHJvcHMgY2hhbmdlZCwgc2NoZWR1bGUgYSByZS1yZW5kZXJcbiAgaWYgKCEoMCwgX3NoYWxsb3dFcXVhbDIuZGVmYXVsdCkobmV3RGF0YS5wcm9wcywgb2xkRGF0YS5wcm9wcykpICgwLCBfcmVuZGVyLnJlbmRlckNvbXBvbmVudCkoY29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gb25SZW5kZXIoY29tcG9uZW50LCBuZXdWbm9kZSkge1xuICB2YXIgaSA9IHZvaWQgMDtcblxuICAvLyBTdG9yZSB0aGUgbmV3IHZub2RlIGluc2lkZSB0aGUgY29tcG9uZW50IHNvIHdlIGNhbiBkaWZmIGl0IG5leHQgcmVuZGVyXG4gIGNvbXBvbmVudC52bm9kZSA9IG5ld1Zub2RlO1xuXG4gIC8vIExpZnQgYW55ICdyZW1vdmUnIGhvb2sgdG8gb3VyIHBsYWNlaG9sZGVyIHZub2RlIGZvciBpdCB0byBiZSBjYWxsZWRcbiAgLy8gYXMgdGhlIHBsYWNlaG9sZGVyIGlzIGFsbCBvdXIgcGFyZW50IHZub2RlIGtub3dzIGFib3V0LlxuICBpZiAoKGkgPSBuZXdWbm9kZS5kYXRhLmhvb2spICYmIChpID0gaS5yZW1vdmUpKSBjb21wb25lbnQucGxhY2Vob2xkZXIuZGF0YS5ob29rLnJlbW92ZSA9IGk7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kodm5vZGUpIHtcbiAgdmFyIGNvbXAgPSB2bm9kZS5kYXRhLmNvbXBvbmVudDtcbiAgY29tcC51bnN1YkZyb21TdG9yZXMoKTtcbiAgZGVzdHJveVZub2RlKGNvbXAudm5vZGUpO1xuICBjb21wLmRlc3Ryb3llZCA9IHRydWU7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lWbm9kZSh2bm9kZSkge1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG5cbiAgaWYgKCFkYXRhKSByZXR1cm47XG4gIGlmIChkYXRhLmhvb2sgJiYgZGF0YS5ob29rLmRlc3Ryb3kpIGRhdGEuaG9vay5kZXN0cm95KHZub2RlKTtcbiAgLy8gQ2FuJ3QgaW52b2tlIG1vZHVsZXMnIGRlc3Ryb3kgaG9vayBhcyB0aGV5J3JlIGhpZGRlbiBpbiBzbmFiYmRvbSdzIGNsb3N1cmVcbiAgaWYgKHZub2RlLmNoaWxkcmVuKSB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKGRlc3Ryb3lWbm9kZSk7XG4gIGlmIChkYXRhLnZub2RlKSBkZXN0cm95Vm5vZGUoZGF0YS52bm9kZSk7XG59XG5cbmZ1bmN0aW9uIG9uR2xvYmFsU3RvcmVDaGFuZ2UoY29tcG9uZW50LCBuZXdTdGF0ZSkge1xuICB2YXIgb2xkU3RhdGVTbGljZSA9IGNvbXBvbmVudC5zdGF0ZTtcbiAgdmFyIG5ld1N0YXRlU2xpY2UgPSBjb21wb25lbnQucHVsbFN0YXRlKG5ld1N0YXRlKTtcblxuICBjb21wb25lbnQuc3RhdGUgPSBuZXdTdGF0ZVNsaWNlO1xuXG4gIGlmICghKDAsIF9zaGFsbG93RXF1YWwyLmRlZmF1bHQpKG5ld1N0YXRlU2xpY2UsIG9sZFN0YXRlU2xpY2UpKSAoMCwgX3JlbmRlci5yZW5kZXJDb21wb25lbnQpKGNvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIG9uTG9jYWxTdG9yZUNoYW5nZShjb21wb25lbnQsIG5ld1N0YXRlKSB7XG4gIGNvbXBvbmVudC5sb2NhbFN0YXRlID0gbmV3U3RhdGU7XG4gICgwLCBfcmVuZGVyLnJlbmRlckNvbXBvbmVudCkoY29tcG9uZW50KTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVwdGgoZWxtKSB7XG4gIHZhciBwYXJlbnQgPSBlbG0ucGFyZW50RWxlbWVudDtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgaWYgKHBhcmVudC5fX2RlcHRoX18gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHBhcmVudC5fX2RlcHRoX18gKyAxO1xuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZG9tcHRldXNlL2xpYi9jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFjdGlvbiA9IGV4cG9ydHMuTG9jYWxTdG9yZSA9IGV4cG9ydHMuZ2xvYmFsU3RvcmUgPSBleHBvcnRzLkdsb2JhbFN0b3JlID0gZXhwb3J0cy5TdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9BY3Rpb24yID0gcmVxdWlyZSgnLi9BY3Rpb24nKTtcblxudmFyIF9BY3Rpb24zID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0aW9uMik7XG5cbnZhciBfU3RvcmUyID0gcmVxdWlyZSgnLi9TdG9yZScpO1xuXG52YXIgX1N0b3JlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0b3JlMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdG9yZSA9IGV4cG9ydHMuU3RvcmUgPSBfU3RvcmUzLmRlZmF1bHQ7XG52YXIgR2xvYmFsU3RvcmUgPSBleHBvcnRzLkdsb2JhbFN0b3JlID0gX1N0b3JlMi5HbG9iYWxTdG9yZTtcbnZhciBnbG9iYWxTdG9yZSA9IGV4cG9ydHMuZ2xvYmFsU3RvcmUgPSBfU3RvcmUyLmdsb2JhbFN0b3JlO1xudmFyIExvY2FsU3RvcmUgPSBleHBvcnRzLkxvY2FsU3RvcmUgPSBfU3RvcmUyLkxvY2FsU3RvcmU7XG52YXIgQWN0aW9uID0gZXhwb3J0cy5BY3Rpb24gPSBfQWN0aW9uMy5kZWZhdWx0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ZsdXh4L2xpYi9mbHV4eC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmRlZmF1bHQgPSBBY3Rpb247XG5cbnZhciBfU3RvcmUgPSByZXF1aXJlKCcuL1N0b3JlJyk7XG5cbnZhciBfU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RvcmUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyBVbmlxdWUgQWN0aW9uIGlkcy5cbi8vIFRoaXMgcmVtb3ZlcyB0aGUgbmVlZCB0byBwcm92aWRlIHVuaXF1ZSBuYW1lcyBhY3Jvc3MgdGhlIHdob2xlIGFwcGxpY2F0aW9uLlxudmFyIGlkID0gMTtcblxuLyoqXG4qIENyZWF0ZXMgYW4gdW5pcXVlIGFjdGlvbiBmb3IgYSBuYW1lLlxuKiBUaGUgbmFtZSBpcyBvbmx5IHVzZWZ1bCBmb3IgZGVidWdnaW5nIHB1cnBvc2VzOyBkaWZmZXJlbnQgYWN0aW9ucyBjYW4gaGF2ZSB0aGUgc2FtZSBuYW1lLlxuKiBUaGUgcmV0dXJuZWQgYWN0aW9uIGZ1bmN0aW9uIGNhbiB0aGVuIGJlIHVzZWQgdG8gZGlzcGF0Y2ggb25lIG9yIG1vcmUgcGF5bG9hZHMuXG4qXG4qIEV4OlxuKiB2YXIgY2xpY2tUaHJlYWQgPSBBY3Rpb24oJ2NsaWNrVGhyZWFkJyk7IC8vIENyZWF0ZSB0aGUgYWN0aW9uIG9uY2VcbiogY2xpY2tUaHJlYWQoaWQpOyAvLyBEaXNwYXRjaCBhIHBheWxvYWQgYW55IG51bWJlciBvZiB0aW1lc1xuKi9cbmZ1bmN0aW9uIEFjdGlvbihuYW1lKSB7XG5cbiAgLy8gVGhlIGFjdHVhbCBhY3Rpb24gZGlzcGF0Y2ggZnVuY3Rpb25cbiAgZnVuY3Rpb24gYWN0aW9uKCkge1xuICAgIHZhciBwYXlsb2FkcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgIHZhciBpc0dsb2JhbEFjdGlvbiA9IGFjdGlvbi5fc3RvcmUgPT09IHVuZGVmaW5lZDtcblxuICAgIC8vIERpc3BhdGNoIHRvIG91ciBsb2NhbCBzdG9yZSBpZiB3ZSB3ZXJlIGdpdmVuIG9uZSBvciBkZWZhdWx0IHRvIHRoZSBnbG9iYWwgc3RvcmUuXG4gICAgdmFyIHN0b3JlID0gaXNHbG9iYWxBY3Rpb24gPyAoMCwgX1N0b3JlLmdsb2JhbFN0b3JlKSgpIDogYWN0aW9uLl9zdG9yZTtcblxuICAgIGlmICghc3RvcmUpIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gZGlzcGF0Y2ggYW4gYWN0aW9uICgnICsgYWN0aW9uLl9uYW1lICsgJykgd2l0aG91dCBhbiBpbnN0YW5jaWF0ZWQgc3RvcmUnKTtcblxuICAgIGlmIChfU3RvcmUyLmRlZmF1bHQubG9nKSB7XG4gICAgICB2YXIgcGF5bG9hZCA9IHBheWxvYWRzLmxlbmd0aCA+IDEgPyBwYXlsb2FkcyA6IHBheWxvYWRzWzBdO1xuICAgICAgY29uc29sZS5sb2coJyVjJyArIGFjdGlvbi5fbmFtZSwgJ2NvbG9yOiAjRjUxREUzJywgJ2Rpc3BhdGNoZWQgd2l0aCBwYXlsb2FkICcsIHBheWxvYWQpO1xuICAgIH1cblxuICAgIHN0b3JlLl9oYW5kbGVBY3Rpb24oYWN0aW9uLCBwYXlsb2Fkcyk7XG5cbiAgICAvLyBHaXZlIGEgY2hhbmNlIHRvIGFsbCBsb2NhbCBTdG9yZXMgdG8gcmVhY3QgdG8gdGhpcyBnbG9iYWwgQWN0aW9uXG4gICAgaWYgKGlzR2xvYmFsQWN0aW9uKSB7XG4gICAgICBPYmplY3Qua2V5cyhfU3RvcmUubG9jYWxTdG9yZXMpLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBfU3RvcmUubG9jYWxTdG9yZXNbaWRdLl9oYW5kbGVBY3Rpb24oYWN0aW9uLCBwYXlsb2Fkcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb24uX2lkID0gaWQrKztcbiAgYWN0aW9uLl9uYW1lID0gbmFtZTtcblxuICAvLyBBbGxvd3MgQWN0aW9ucyB0byBiZSB1c2VkIGFzIE9iamVjdCBrZXlzIHdpdGggdGhlIGNvcnJlY3QgYmVoYXZpb3JcbiAgYWN0aW9uLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhY3Rpb24uX2lkO1xuICB9O1xuXG4gIHJldHVybiBhY3Rpb247XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eHgvbGliL0FjdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmdsb2JhbFN0b3JlID0gZ2xvYmFsU3RvcmU7XG5leHBvcnRzLkdsb2JhbFN0b3JlID0gR2xvYmFsU3RvcmU7XG5leHBvcnRzLkxvY2FsU3RvcmUgPSBMb2NhbFN0b3JlO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3RvcmU7XG5cbnZhciBfZ2xvYmFsU3RvcmUgPSB1bmRlZmluZWQ7XG5mdW5jdGlvbiBnbG9iYWxTdG9yZSgpIHtcbiAgcmV0dXJuIF9nbG9iYWxTdG9yZTtcbn1cblxudmFyIGxvY2FsU3RvcmVJZCA9IDE7XG52YXIgbG9jYWxTdG9yZXMgPSBleHBvcnRzLmxvY2FsU3RvcmVzID0ge307XG5cbmZ1bmN0aW9uIEdsb2JhbFN0b3JlKG9wdGlvbnNPckluaXRpYWxTdGF0ZSwgcmVnaXN0ZXJIYW5kbGVycykge1xuICBfZ2xvYmFsU3RvcmUgPSBTdG9yZShvcHRpb25zT3JJbml0aWFsU3RhdGUsIHJlZ2lzdGVySGFuZGxlcnMsIHRydWUpO1xuICByZXR1cm4gX2dsb2JhbFN0b3JlO1xufVxuXG5mdW5jdGlvbiBMb2NhbFN0b3JlKG9wdGlvbnNPckluaXRpYWxTdGF0ZSwgcmVnaXN0ZXJIYW5kbGVycykge1xuICByZXR1cm4gU3RvcmUob3B0aW9uc09ySW5pdGlhbFN0YXRlLCByZWdpc3RlckhhbmRsZXJzKTtcbn1cblxuZnVuY3Rpb24gU3RvcmUob3B0aW9uc09ySW5pdGlhbFN0YXRlLCByZWdpc3RlckhhbmRsZXJzLCBpc0dsb2JhbCkge1xuICB2YXIgX3JlZiA9IHJlZ2lzdGVySGFuZGxlcnMgPyB7fSA6IG9wdGlvbnNPckluaXRpYWxTdGF0ZTtcblxuICB2YXIgaGFuZGxlcnMgPSBfcmVmLmhhbmRsZXJzO1xuXG4gIHZhciBpbml0aWFsU3RhdGUgPSByZWdpc3RlckhhbmRsZXJzID8gb3B0aW9uc09ySW5pdGlhbFN0YXRlIDogb3B0aW9uc09ySW5pdGlhbFN0YXRlLnN0YXRlO1xuICB2YXIgb25IYW5kbGVycyA9IHt9O1xuXG4gIHZhciBkaXNwYXRjaGluZyA9IGZhbHNlO1xuICB2YXIgY2FsbGJhY2tzID0gW107XG5cbiAgdmFyIGluc3RhbmNlID0geyBzdGF0ZTogaW5pdGlhbFN0YXRlLCBsb2c6IFN0b3JlLmxvZyB9O1xuXG4gIGlmICghaXNHbG9iYWwpIHtcbiAgICBpbnN0YW5jZS5pZCA9IGxvY2FsU3RvcmVJZCsrO1xuICAgIGxvY2FsU3RvcmVzW2luc3RhbmNlLmlkXSA9IGluc3RhbmNlO1xuICB9XG5cbiAgLy8gb24oYWN0aW9uLCBjYWxsYmFjaykgcmVnaXN0cmF0aW9uIHN0eWxlXG4gIGlmIChyZWdpc3RlckhhbmRsZXJzKSB7XG4gICAgdmFyIG9uID0gZnVuY3Rpb24gb24oYWN0aW9uLCBmbikge1xuICAgICAgb25IYW5kbGVyc1thY3Rpb25dID0gZm47XG4gICAgfTtcbiAgICByZWdpc3RlckhhbmRsZXJzKG9uKTtcbiAgfVxuXG4gIGlmIChpbnN0YW5jZS5sb2cpIGNvbnNvbGUubG9nKCclY0luaXRpYWwgc3RhdGU6JywgJ2NvbG9yOiBncmVlbicsIGluaXRpYWxTdGF0ZSk7XG5cbiAgaW5zdGFuY2UuX2hhbmRsZUFjdGlvbiA9IGZ1bmN0aW9uIChhY3Rpb24sIHBheWxvYWRzKSB7XG4gICAgaWYgKGRpc3BhdGNoaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBkaXNwYXRjaCBhbiBBY3Rpb24gaW4gdGhlIG1pZGRsZSBvZiBhbm90aGVyIEFjdGlvblxcJ3MgZGlzcGF0Y2gnKTtcblxuICAgIC8vIEJhaWwgZmFzdCBpZiB0aGlzIHN0b3JlIGlzbid0IGludGVyZXN0ZWQuXG4gICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVycyA/IGhhbmRsZXJzW2FjdGlvbi5faWRdIDogb25IYW5kbGVyc1thY3Rpb24uX2lkXTtcbiAgICBpZiAoIWhhbmRsZXIpIHJldHVybjtcblxuICAgIGRpc3BhdGNoaW5nID0gdHJ1ZTtcblxuICAgIHZhciBwcmV2aW91c1N0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XG5cbiAgICB0cnkge1xuICAgICAgaW5zdGFuY2Uuc3RhdGUgPSBoYW5kbGVycyA/IGhhbmRsZXIuYXBwbHkobnVsbCwgW2luc3RhbmNlLnN0YXRlXS5jb25jYXQocGF5bG9hZHMpKSA6IGhhbmRsZXIoaW5zdGFuY2Uuc3RhdGUsIHBheWxvYWRzWzBdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGluc3RhbmNlLmxvZykge1xuICAgICAgICB2YXIgc3RvcmVLaW5kID0gaXNHbG9iYWwgPyAnZ2xvYmFsJyA6ICdsb2NhbCc7XG4gICAgICAgIGNvbnNvbGUubG9nKCclY05ldyAnICsgc3RvcmVLaW5kICsgJyBzdGF0ZTonLCAnY29sb3I6IGJsdWUnLCBpbnN0YW5jZS5zdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIGRpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzU3RhdGUgIT09IGluc3RhbmNlLnN0YXRlKSBjYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhpbnN0YW5jZS5zdGF0ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgaW5zdGFuY2Uuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLmZpbHRlcihmdW5jdGlvbiAoX2NhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBfY2FsbGJhY2sgIT09IGNhbGxiYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoIWlzR2xvYmFsICYmIGNhbGxiYWNrcy5sZW5ndGggPT09IDApIGRlbGV0ZSBsb2NhbFN0b3Jlc1tpbnN0YW5jZS5pZF07XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZmx1eHgvbGliL1N0b3JlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gc2hhbGxvd0VxdWFsO1xuXG4vKiBFZmZpY2llbnQgc2hhbGxvdyBjb21wYXJpc29uIG9mIHR3byBvYmplY3RzICovXG5cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChvYmpBID09PSBvYmpCKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQidzLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG9iakFba2V5c0FbaV1dICE9PSBvYmpCW2tleXNBW2ldXSkgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQidzIGtleXMgZGlmZmVyZW50IGZyb20gQSdzLlxuICAvLyBIYW5kbGVzIHRoZSBjYXNlIHdoZXJlIEIgaGFzIGEgcHJvcGVydHkgdGhhdCBBIGRvZXNuJ3QuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0IubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAob2JqQVtrZXlzQltpXV0gIT09IG9iakJba2V5c0JbaV1dKSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9kb21wdGV1c2UvbGliL3NoYWxsb3dFcXVhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiB1cGRhdGVDbGFzcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGN1ciwgbmFtZSwgZWxtID0gdm5vZGUuZWxtLFxuICAgICAgb2xkQ2xhc3MgPSBvbGRWbm9kZS5kYXRhLmNsYXNzIHx8IHt9LFxuICAgICAga2xhc3MgPSB2bm9kZS5kYXRhLmNsYXNzIHx8IHt9O1xuICBmb3IgKG5hbWUgaW4gb2xkQ2xhc3MpIHtcbiAgICBpZiAoIWtsYXNzW25hbWVdKSB7XG4gICAgICBlbG0uY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICB9XG4gIH1cbiAgZm9yIChuYW1lIGluIGtsYXNzKSB7XG4gICAgY3VyID0ga2xhc3NbbmFtZV07XG4gICAgaWYgKGN1ciAhPT0gb2xkQ2xhc3NbbmFtZV0pIHtcbiAgICAgIGVsbS5jbGFzc0xpc3RbY3VyID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge2NyZWF0ZTogdXBkYXRlQ2xhc3MsIHVwZGF0ZTogdXBkYXRlQ2xhc3N9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc25hYmJkb20vbW9kdWxlcy9jbGFzcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJmdW5jdGlvbiB1cGRhdGVQcm9wcyhvbGRWbm9kZSwgdm5vZGUpIHtcbiAgdmFyIGtleSwgY3VyLCBvbGQsIGVsbSA9IHZub2RlLmVsbSxcbiAgICAgIG9sZFByb3BzID0gb2xkVm5vZGUuZGF0YS5wcm9wcyB8fCB7fSwgcHJvcHMgPSB2bm9kZS5kYXRhLnByb3BzIHx8IHt9O1xuICBmb3IgKGtleSBpbiBvbGRQcm9wcykge1xuICAgIGlmICghcHJvcHNba2V5XSkge1xuICAgICAgZGVsZXRlIGVsbVtrZXldO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgb2xkID0gb2xkUHJvcHNba2V5XTtcbiAgICBpZiAob2xkICE9PSBjdXIgJiYgKGtleSAhPT0gJ3ZhbHVlJyB8fCBlbG1ba2V5XSAhPT0gY3VyKSkge1xuICAgICAgZWxtW2tleV0gPSBjdXI7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge2NyZWF0ZTogdXBkYXRlUHJvcHMsIHVwZGF0ZTogdXBkYXRlUHJvcHN9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc25hYmJkb20vbW9kdWxlcy9wcm9wcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYm9vbGVhbkF0dHJzID0gW1wiYWxsb3dmdWxsc2NyZWVuXCIsIFwiYXN5bmNcIiwgXCJhdXRvZm9jdXNcIiwgXCJhdXRvcGxheVwiLCBcImNoZWNrZWRcIiwgXCJjb21wYWN0XCIsIFwiY29udHJvbHNcIiwgXCJkZWNsYXJlXCIsIFxuICAgICAgICAgICAgICAgIFwiZGVmYXVsdFwiLCBcImRlZmF1bHRjaGVja2VkXCIsIFwiZGVmYXVsdG11dGVkXCIsIFwiZGVmYXVsdHNlbGVjdGVkXCIsIFwiZGVmZXJcIiwgXCJkaXNhYmxlZFwiLCBcImRyYWdnYWJsZVwiLCBcbiAgICAgICAgICAgICAgICBcImVuYWJsZWRcIiwgXCJmb3Jtbm92YWxpZGF0ZVwiLCBcImhpZGRlblwiLCBcImluZGV0ZXJtaW5hdGVcIiwgXCJpbmVydFwiLCBcImlzbWFwXCIsIFwiaXRlbXNjb3BlXCIsIFwibG9vcFwiLCBcIm11bHRpcGxlXCIsIFxuICAgICAgICAgICAgICAgIFwibXV0ZWRcIiwgXCJub2hyZWZcIiwgXCJub3Jlc2l6ZVwiLCBcIm5vc2hhZGVcIiwgXCJub3ZhbGlkYXRlXCIsIFwibm93cmFwXCIsIFwib3BlblwiLCBcInBhdXNlb25leGl0XCIsIFwicmVhZG9ubHlcIiwgXG4gICAgICAgICAgICAgICAgXCJyZXF1aXJlZFwiLCBcInJldmVyc2VkXCIsIFwic2NvcGVkXCIsIFwic2VhbWxlc3NcIiwgXCJzZWxlY3RlZFwiLCBcInNvcnRhYmxlXCIsIFwic3BlbGxjaGVja1wiLCBcInRyYW5zbGF0ZVwiLCBcbiAgICAgICAgICAgICAgICBcInRydWVzcGVlZFwiLCBcInR5cGVtdXN0bWF0Y2hcIiwgXCJ2aXNpYmxlXCJdO1xuICAgIFxudmFyIGJvb2xlYW5BdHRyc0RpY3QgPSB7fTtcbmZvcih2YXIgaT0wLCBsZW4gPSBib29sZWFuQXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgYm9vbGVhbkF0dHJzRGljdFtib29sZWFuQXR0cnNbaV1dID0gdHJ1ZTtcbn1cbiAgICBcbmZ1bmN0aW9uIHVwZGF0ZUF0dHJzKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIga2V5LCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLFxuICAgICAgb2xkQXR0cnMgPSBvbGRWbm9kZS5kYXRhLmF0dHJzIHx8IHt9LCBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgfHwge307XG4gIFxuICAvLyB1cGRhdGUgbW9kaWZpZWQgYXR0cmlidXRlcywgYWRkIG5ldyBhdHRyaWJ1dGVzXG4gIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgY3VyID0gYXR0cnNba2V5XTtcbiAgICBvbGQgPSBvbGRBdHRyc1trZXldO1xuICAgIGlmIChvbGQgIT09IGN1cikge1xuICAgICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgdG8gbmFtZXNwYWNlZCBhdHRyaWJ1dGVzIChzZXRBdHRyaWJ1dGVOUylcbiAgICAgIGlmKCFjdXIgJiYgYm9vbGVhbkF0dHJzRGljdFtrZXldKVxuICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICBlbHNlXG4gICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoa2V5LCBjdXIpO1xuICAgIH1cbiAgfVxuICAvL3JlbW92ZSByZW1vdmVkIGF0dHJpYnV0ZXNcbiAgLy8gdXNlIGBpbmAgb3BlcmF0b3Igc2luY2UgdGhlIHByZXZpb3VzIGBmb3JgIGl0ZXJhdGlvbiB1c2VzIGl0ICguaS5lLiBhZGQgZXZlbiBhdHRyaWJ1dGVzIHdpdGggdW5kZWZpbmVkIHZhbHVlKVxuICAvLyB0aGUgb3RoZXIgb3B0aW9uIGlzIHRvIHJlbW92ZSBhbGwgYXR0cmlidXRlcyB3aXRoIHZhbHVlID09IHVuZGVmaW5lZFxuICBmb3IgKGtleSBpbiBvbGRBdHRycykge1xuICAgIGlmICghKGtleSBpbiBhdHRycykpIHtcbiAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7Y3JlYXRlOiB1cGRhdGVBdHRycywgdXBkYXRlOiB1cGRhdGVBdHRyc307XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zbmFiYmRvbS9tb2R1bGVzL2F0dHJpYnV0ZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzID0gcmVxdWlyZSgnLi4vaXMnKTtcblxuZnVuY3Rpb24gYXJySW52b2tlcihhcnIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIC8vIFNwZWNpYWwgY2FzZSB3aGVuIGxlbmd0aCBpcyB0d28sIGZvciBwZXJmb3JtYW5jZVxuICAgIGFyci5sZW5ndGggPT09IDIgPyBhcnJbMF0oYXJyWzFdKSA6IGFyclswXS5hcHBseSh1bmRlZmluZWQsIGFyci5zbGljZSgxKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZuSW52b2tlcihvKSB7XG4gIHJldHVybiBmdW5jdGlvbihldikgeyBvLmZuKGV2KTsgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRXZlbnRMaXN0ZW5lcnMob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBuYW1lLCBjdXIsIG9sZCwgZWxtID0gdm5vZGUuZWxtLFxuICAgICAgb2xkT24gPSBvbGRWbm9kZS5kYXRhLm9uIHx8IHt9LCBvbiA9IHZub2RlLmRhdGEub247XG4gIGlmICghb24pIHJldHVybjtcbiAgZm9yIChuYW1lIGluIG9uKSB7XG4gICAgY3VyID0gb25bbmFtZV07XG4gICAgb2xkID0gb2xkT25bbmFtZV07XG4gICAgaWYgKG9sZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoaXMuYXJyYXkoY3VyKSkge1xuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBhcnJJbnZva2VyKGN1cikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VyID0ge2ZuOiBjdXJ9O1xuICAgICAgICBvbltuYW1lXSA9IGN1cjtcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm5JbnZva2VyKGN1cikpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXMuYXJyYXkob2xkKSkge1xuICAgICAgLy8gRGVsaWJlcmF0ZWx5IG1vZGlmeSBvbGQgYXJyYXkgc2luY2UgaXQncyBjYXB0dXJlZCBpbiBjbG9zdXJlIGNyZWF0ZWQgd2l0aCBgYXJySW52b2tlcmBcbiAgICAgIG9sZC5sZW5ndGggPSBjdXIubGVuZ3RoO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGQubGVuZ3RoOyArK2kpIG9sZFtpXSA9IGN1cltpXTtcbiAgICAgIG9uW25hbWVdICA9IG9sZDtcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkLmZuID0gY3VyO1xuICAgICAgb25bbmFtZV0gPSBvbGQ7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge2NyZWF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnMsIHVwZGF0ZTogdXBkYXRlRXZlbnRMaXN0ZW5lcnN9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc25hYmJkb20vbW9kdWxlcy9ldmVudGxpc3RlbmVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgcmFmID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHx8IHNldFRpbWVvdXQ7XG52YXIgbmV4dEZyYW1lID0gZnVuY3Rpb24oZm4pIHsgcmFmKGZ1bmN0aW9uKCkgeyByYWYoZm4pOyB9KTsgfTtcblxuZnVuY3Rpb24gc2V0TmV4dEZyYW1lKG9iaiwgcHJvcCwgdmFsKSB7XG4gIG5leHRGcmFtZShmdW5jdGlvbigpIHsgb2JqW3Byb3BdID0gdmFsOyB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3R5bGUob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBjdXIsIG5hbWUsIGVsbSA9IHZub2RlLmVsbSxcbiAgICAgIG9sZFN0eWxlID0gb2xkVm5vZGUuZGF0YS5zdHlsZSB8fCB7fSxcbiAgICAgIHN0eWxlID0gdm5vZGUuZGF0YS5zdHlsZSB8fCB7fSxcbiAgICAgIG9sZEhhc0RlbCA9ICdkZWxheWVkJyBpbiBvbGRTdHlsZTtcbiAgZm9yIChuYW1lIGluIG9sZFN0eWxlKSB7XG4gICAgaWYgKCFzdHlsZVtuYW1lXSkge1xuICAgICAgZWxtLnN0eWxlW25hbWVdID0gJyc7XG4gICAgfVxuICB9XG4gIGZvciAobmFtZSBpbiBzdHlsZSkge1xuICAgIGN1ciA9IHN0eWxlW25hbWVdO1xuICAgIGlmIChuYW1lID09PSAnZGVsYXllZCcpIHtcbiAgICAgIGZvciAobmFtZSBpbiBzdHlsZS5kZWxheWVkKSB7XG4gICAgICAgIGN1ciA9IHN0eWxlLmRlbGF5ZWRbbmFtZV07XG4gICAgICAgIGlmICghb2xkSGFzRGVsIHx8IGN1ciAhPT0gb2xkU3R5bGUuZGVsYXllZFtuYW1lXSkge1xuICAgICAgICAgIHNldE5leHRGcmFtZShlbG0uc3R5bGUsIG5hbWUsIGN1cik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5hbWUgIT09ICdyZW1vdmUnICYmIGN1ciAhPT0gb2xkU3R5bGVbbmFtZV0pIHtcbiAgICAgIGVsbS5zdHlsZVtuYW1lXSA9IGN1cjtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlEZXN0cm95U3R5bGUodm5vZGUpIHtcbiAgdmFyIHN0eWxlLCBuYW1lLCBlbG0gPSB2bm9kZS5lbG0sIHMgPSB2bm9kZS5kYXRhLnN0eWxlO1xuICBpZiAoIXMgfHwgIShzdHlsZSA9IHMuZGVzdHJveSkpIHJldHVybjtcbiAgZm9yIChuYW1lIGluIHN0eWxlKSB7XG4gICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlSZW1vdmVTdHlsZSh2bm9kZSwgcm0pIHtcbiAgdmFyIHMgPSB2bm9kZS5kYXRhLnN0eWxlO1xuICBpZiAoIXMgfHwgIXMucmVtb3ZlKSB7XG4gICAgcm0oKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUsIGVsbSA9IHZub2RlLmVsbSwgaWR4LCBpID0gMCwgbWF4RHVyID0gMCxcbiAgICAgIGNvbXBTdHlsZSwgc3R5bGUgPSBzLnJlbW92ZSwgYW1vdW50ID0gMCwgYXBwbGllZCA9IFtdO1xuICBmb3IgKG5hbWUgaW4gc3R5bGUpIHtcbiAgICBhcHBsaWVkLnB1c2gobmFtZSk7XG4gICAgZWxtLnN0eWxlW25hbWVdID0gc3R5bGVbbmFtZV07XG4gIH1cbiAgY29tcFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbG0pO1xuICB2YXIgcHJvcHMgPSBjb21wU3R5bGVbJ3RyYW5zaXRpb24tcHJvcGVydHknXS5zcGxpdCgnLCAnKTtcbiAgZm9yICg7IGkgPCBwcm9wcy5sZW5ndGg7ICsraSkge1xuICAgIGlmKGFwcGxpZWQuaW5kZXhPZihwcm9wc1tpXSkgIT09IC0xKSBhbW91bnQrKztcbiAgfVxuICBlbG0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKGV2LnRhcmdldCA9PT0gZWxtKSAtLWFtb3VudDtcbiAgICBpZiAoYW1vdW50ID09PSAwKSBybSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7Y3JlYXRlOiB1cGRhdGVTdHlsZSwgdXBkYXRlOiB1cGRhdGVTdHlsZSwgZGVzdHJveTogYXBwbHlEZXN0cm95U3R5bGUsIHJlbW92ZTogYXBwbHlSZW1vdmVTdHlsZX07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zbmFiYmRvbS9tb2R1bGVzL3N0eWxlLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG52YXIgQWJ5c3NhID0ge1xuICBSb3V0ZXI6IHJlcXVpcmUoJy4vUm91dGVyJyksXG4gIGFwaTogcmVxdWlyZSgnLi9hcGknKSxcbiAgYXN5bmM6IHJlcXVpcmUoJy4vYXN5bmMnKSxcbiAgU3RhdGU6IHV0aWwuc3RhdGVTaG9ydGhhbmQsXG5cbiAgX3V0aWw6IHV0aWxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWJ5c3NhO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FieXNzYS9saWIvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWwgPSB7fTtcblxudXRpbC5ub29wID0gZnVuY3Rpb24gKCkge307XG5cbnV0aWwuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIChhcnJheSkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uIChvYmosIGl0ZW0pIHtcbiAgICBvYmpbaXRlbV0gPSAxO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbnV0aWwub2JqZWN0VG9BcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGFycmF5ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBhcnJheS5wdXNoKG9ialtrZXldKTtcbiAgfXJldHVybiBhcnJheTtcbn07XG5cbnV0aWwuY29weU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIGNvcHkgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGNvcHlba2V5XSA9IG9ialtrZXldO1xuICB9cmV0dXJuIGNvcHk7XG59O1xuXG51dGlsLm1lcmdlT2JqZWN0cyA9IGZ1bmN0aW9uICh0bywgZnJvbSkge1xuICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gIH1yZXR1cm4gdG87XG59O1xuXG51dGlsLm1hcFZhbHVlcyA9IGZ1bmN0aW9uIChvYmosIGZuKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHJlc3VsdFtrZXldID0gZm4ob2JqW2tleV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKlxuKiBSZXR1cm4gdGhlIHNldCBvZiBhbGwgdGhlIGtleXMgdGhhdCBjaGFuZ2VkIChlaXRoZXIgYWRkZWQsIHJlbW92ZWQgb3IgbW9kaWZpZWQpLlxuKi9cbnV0aWwub2JqZWN0RGlmZiA9IGZ1bmN0aW9uIChvYmoxLCBvYmoyKSB7XG4gIHZhciB1cGRhdGUgPSB7fSxcbiAgICAgIGVudGVyID0ge30sXG4gICAgICBleGl0ID0ge30sXG4gICAgICBhbGwgPSB7fSxcbiAgICAgIG5hbWUsXG4gICAgICBvYmoxID0gb2JqMSB8fCB7fTtcblxuICBmb3IgKG5hbWUgaW4gb2JqMSkge1xuICAgIGlmICghKG5hbWUgaW4gb2JqMikpIGV4aXRbbmFtZV0gPSBhbGxbbmFtZV0gPSB0cnVlO2Vsc2UgaWYgKG9iajFbbmFtZV0gIT0gb2JqMltuYW1lXSkgdXBkYXRlW25hbWVdID0gYWxsW25hbWVdID0gdHJ1ZTtcbiAgfVxuXG4gIGZvciAobmFtZSBpbiBvYmoyKSB7XG4gICAgaWYgKCEobmFtZSBpbiBvYmoxKSkgZW50ZXJbbmFtZV0gPSBhbGxbbmFtZV0gPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHsgYWxsOiBhbGwsIHVwZGF0ZTogdXBkYXRlLCBlbnRlcjogZW50ZXIsIGV4aXQ6IGV4aXQgfTtcbn07XG5cbnV0aWwubWFrZU1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtZXNzYWdlID0gYXJndW1lbnRzWzBdLFxuICAgICAgdG9rZW5zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHRva2Vucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZS5yZXBsYWNlKCd7JyArIGkgKyAnfScsIHRva2Vuc1tpXSk7XG4gIH1yZXR1cm4gbWVzc2FnZTtcbn07XG5cbnV0aWwucGFyc2VQYXRocyA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIHJldHVybiBwYXRoLnNwbGl0KCcvJykuZmlsdGVyKGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLmxlbmd0aDtcbiAgfSkubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gIH0pO1xufTtcblxudXRpbC5wYXJzZVF1ZXJ5UGFyYW1zID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gIHJldHVybiBxdWVyeSA/IHF1ZXJ5LnNwbGl0KCcmJykucmVkdWNlKGZ1bmN0aW9uIChyZXMsIHBhcmFtVmFsdWUpIHtcbiAgICB2YXIgcHYgPSBwYXJhbVZhbHVlLnNwbGl0KCc9Jyk7XG4gICAgcmVzW3B2WzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwdlsxXSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSwge30pIDoge307XG59O1xuXG52YXIgTEVBRElOR19TTEFTSEVTID0gL15cXC8rLztcbnZhciBUUkFJTElOR19TTEFTSEVTID0gL14oW14/XSo/KVxcLyskLztcbnZhciBUUkFJTElOR19TTEFTSEVTX0JFRk9SRV9RVUVSWSA9IC9cXC8rXFw/LztcbnV0aWwubm9ybWFsaXplUGF0aFF1ZXJ5ID0gZnVuY3Rpb24gKHBhdGhRdWVyeSkge1xuICByZXR1cm4gJy8nICsgcGF0aFF1ZXJ5LnJlcGxhY2UoTEVBRElOR19TTEFTSEVTLCAnJykucmVwbGFjZShUUkFJTElOR19TTEFTSEVTLCAnJDEnKS5yZXBsYWNlKFRSQUlMSU5HX1NMQVNIRVNfQkVGT1JFX1FVRVJZLCAnPycpO1xufTtcblxudXRpbC5zdGF0ZVNob3J0aGFuZCA9IGZ1bmN0aW9uICh1cmksIG9wdGlvbnMsIGNoaWxkcmVuKSB7XG4gIHJldHVybiB1dGlsLm1lcmdlT2JqZWN0cyh7IHVyaTogdXJpLCBjaGlsZHJlbjogY2hpbGRyZW4gfHwge30gfSwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYWJ5c3NhL2xpYi91dGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLFxuICAgIGludGVyY2VwdEFuY2hvcnMgPSByZXF1aXJlKCcuL2FuY2hvcnMnKSxcbiAgICBTdGF0ZVdpdGhQYXJhbXMgPSByZXF1aXJlKCcuL1N0YXRlV2l0aFBhcmFtcycpLFxuICAgIFRyYW5zaXRpb24gPSByZXF1aXJlKCcuL1RyYW5zaXRpb24nKSxcbiAgICB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgU3RhdGUgPSByZXF1aXJlKCcuL1N0YXRlJyksXG4gICAgYXBpID0gcmVxdWlyZSgnLi9hcGknKTtcblxuLypcbiogQ3JlYXRlIGEgbmV3IFJvdXRlciBpbnN0YW5jZSwgcGFzc2luZyBhbnkgc3RhdGUgZGVmaW5lZCBkZWNsYXJhdGl2ZWx5LlxuKiBNb3JlIHN0YXRlcyBjYW4gYmUgYWRkZWQgdXNpbmcgYWRkU3RhdGUoKS5cbipcbiogQmVjYXVzZSBhIHJvdXRlciBtYW5hZ2VzIGdsb2JhbCBzdGF0ZSAodGhlIFVSTCksIG9ubHkgb25lIGluc3RhbmNlIG9mIFJvdXRlclxuKiBzaG91bGQgYmUgdXNlZCBpbnNpZGUgYW4gYXBwbGljYXRpb24uXG4qL1xuZnVuY3Rpb24gUm91dGVyKGRlY2xhcmF0aXZlU3RhdGVzKSB7XG4gIHZhciByb3V0ZXIgPSB7fSxcbiAgICAgIHN0YXRlcyA9IHN0YXRlVHJlZXMoZGVjbGFyYXRpdmVTdGF0ZXMpLFxuICAgICAgZmlyc3RUcmFuc2l0aW9uID0gdHJ1ZSxcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgZW5hYmxlTG9nczogZmFsc2UsXG4gICAgaW50ZXJjZXB0QW5jaG9yczogdHJ1ZSxcbiAgICBub3RGb3VuZDogbnVsbCxcbiAgICB1cmxTeW5jOiAnaGlzdG9yeScsXG4gICAgaGFzaFByZWZpeDogJydcbiAgfSxcbiAgICAgIGlnbm9yZU5leHRVUkxDaGFuZ2UgPSBmYWxzZSxcbiAgICAgIGN1cnJlbnRQYXRoUXVlcnksXG4gICAgICBjdXJyZW50UGFyYW1zRGlmZiA9IHt9LFxuICAgICAgY3VycmVudFN0YXRlLFxuICAgICAgcHJldmlvdXNTdGF0ZSxcbiAgICAgIHRyYW5zaXRpb24sXG4gICAgICBsZWFmU3RhdGVzLFxuICAgICAgdXJsQ2hhbmdlZCxcbiAgICAgIGluaXRpYWxpemVkLFxuICAgICAgaGFzaFNsYXNoU3RyaW5nO1xuXG4gIC8qXG4gICogU2V0dGluZyBhIG5ldyBzdGF0ZSB3aWxsIHN0YXJ0IGEgdHJhbnNpdGlvbiBmcm9tIHRoZSBjdXJyZW50IHN0YXRlIHRvIHRoZSB0YXJnZXQgc3RhdGUuXG4gICogQSBzdWNjZXNzZnVsIHRyYW5zaXRpb24gd2lsbCByZXN1bHQgaW4gdGhlIFVSTCBiZWluZyBjaGFuZ2VkLlxuICAqIEEgZmFpbGVkIHRyYW5zaXRpb24gd2lsbCBsZWF2ZSB0aGUgcm91dGVyIGluIGl0cyBjdXJyZW50IHN0YXRlLlxuICAqL1xuICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSwgcGFyYW1zLCBhY2MpIHtcbiAgICB2YXIgZnJvbVN0YXRlID0gdHJhbnNpdGlvbiA/IFN0YXRlV2l0aFBhcmFtcyh0cmFuc2l0aW9uLmN1cnJlbnRTdGF0ZSwgdHJhbnNpdGlvbi50b1BhcmFtcykgOiBjdXJyZW50U3RhdGU7XG5cbiAgICB2YXIgdG9TdGF0ZSA9IFN0YXRlV2l0aFBhcmFtcyhzdGF0ZSwgcGFyYW1zKTtcbiAgICB2YXIgZGlmZiA9IHV0aWwub2JqZWN0RGlmZihmcm9tU3RhdGUgJiYgZnJvbVN0YXRlLnBhcmFtcywgcGFyYW1zKTtcblxuICAgIGlmIChwcmV2ZW50VHJhbnNpdGlvbihmcm9tU3RhdGUsIHRvU3RhdGUsIGRpZmYpKSB7XG4gICAgICBpZiAodHJhbnNpdGlvbiAmJiB0cmFuc2l0aW9uLmV4aXRpbmcpIGNhbmNlbFRyYW5zaXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodHJhbnNpdGlvbikgY2FuY2VsVHJhbnNpdGlvbigpO1xuXG4gICAgLy8gV2hpbGUgdGhlIHRyYW5zaXRpb24gaXMgcnVubmluZywgYW55IGNvZGUgYXNraW5nIHRoZSByb3V0ZXIgYWJvdXQgdGhlIHByZXZpb3VzL2N1cnJlbnQgc3RhdGUgc2hvdWxkXG4gICAgLy8gZ2V0IHRoZSBlbmQgcmVzdWx0IHN0YXRlLlxuICAgIHByZXZpb3VzU3RhdGUgPSBjdXJyZW50U3RhdGU7XG4gICAgY3VycmVudFN0YXRlID0gdG9TdGF0ZTtcbiAgICBjdXJyZW50UGFyYW1zRGlmZiA9IGRpZmY7XG5cbiAgICB0cmFuc2l0aW9uID0gVHJhbnNpdGlvbihmcm9tU3RhdGUsIHRvU3RhdGUsIGRpZmYsIGFjYywgcm91dGVyLCBsb2dnZXIpO1xuXG4gICAgc3RhcnRpbmdUcmFuc2l0aW9uKGZyb21TdGF0ZSwgdG9TdGF0ZSk7XG5cbiAgICAvLyBJbiBjYXNlIG9mIGEgcmVkaXJlY3QoKSBjYWxsZWQgZnJvbSAnc3RhcnRpbmdUcmFuc2l0aW9uJywgdGhlIHRyYW5zaXRpb24gYWxyZWFkeSBlbmRlZC5cbiAgICBpZiAodHJhbnNpdGlvbikgdHJhbnNpdGlvbi5ydW4oKTtcblxuICAgIC8vIEluIGNhc2Ugb2YgYSByZWRpcmVjdCgpIGNhbGxlZCBmcm9tIHRoZSB0cmFuc2l0aW9uIGl0c2VsZiwgdGhlIHRyYW5zaXRpb24gYWxyZWFkeSBlbmRlZFxuICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICBpZiAodHJhbnNpdGlvbi5jYW5jZWxsZWQpIGN1cnJlbnRTdGF0ZSA9IGZyb21TdGF0ZTtlbHNlIGVuZGluZ1RyYW5zaXRpb24oZnJvbVN0YXRlLCB0b1N0YXRlKTtcbiAgICB9XG5cbiAgICB0cmFuc2l0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbFRyYW5zaXRpb24oKSB7XG4gICAgbG9nZ2VyLmxvZygnQ2FuY2VsbGluZyBleGlzdGluZyB0cmFuc2l0aW9uIGZyb20gezB9IHRvIHsxfScsIHRyYW5zaXRpb24uZnJvbSwgdHJhbnNpdGlvbi50byk7XG5cbiAgICB0cmFuc2l0aW9uLmNhbmNlbCgpO1xuXG4gICAgZmlyc3RUcmFuc2l0aW9uID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydGluZ1RyYW5zaXRpb24oZnJvbVN0YXRlLCB0b1N0YXRlKSB7XG4gICAgbG9nZ2VyLmxvZygnU3RhcnRpbmcgdHJhbnNpdGlvbiBmcm9tIHswfSB0byB7MX0nLCBmcm9tU3RhdGUsIHRvU3RhdGUpO1xuXG4gICAgdmFyIGZyb20gPSBmcm9tU3RhdGUgPyBmcm9tU3RhdGUuYXNQdWJsaWMgOiBudWxsO1xuICAgIHZhciB0byA9IHRvU3RhdGUuYXNQdWJsaWM7XG5cbiAgICByb3V0ZXIudHJhbnNpdGlvbi5lbWl0KCdzdGFydGVkJywgdG8sIGZyb20pO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5kaW5nVHJhbnNpdGlvbihmcm9tU3RhdGUsIHRvU3RhdGUpIHtcbiAgICBpZiAoIXVybENoYW5nZWQgJiYgIWZpcnN0VHJhbnNpdGlvbikge1xuICAgICAgbG9nZ2VyLmxvZygnVXBkYXRpbmcgVVJMOiB7MH0nLCBjdXJyZW50UGF0aFF1ZXJ5KTtcbiAgICAgIHVwZGF0ZVVSTEZyb21TdGF0ZShjdXJyZW50UGF0aFF1ZXJ5LCBkb2N1bWVudC50aXRsZSwgY3VycmVudFBhdGhRdWVyeSk7XG4gICAgfVxuXG4gICAgZmlyc3RUcmFuc2l0aW9uID0gZmFsc2U7XG5cbiAgICBsb2dnZXIubG9nKCdUcmFuc2l0aW9uIGZyb20gezB9IHRvIHsxfSBlbmRlZCcsIGZyb21TdGF0ZSwgdG9TdGF0ZSk7XG5cbiAgICB0b1N0YXRlLnN0YXRlLmxhc3RQYXJhbXMgPSB0b1N0YXRlLnBhcmFtcztcblxuICAgIHZhciBmcm9tID0gZnJvbVN0YXRlID8gZnJvbVN0YXRlLmFzUHVibGljIDogbnVsbDtcbiAgICB2YXIgdG8gPSB0b1N0YXRlLmFzUHVibGljO1xuICAgIHJvdXRlci50cmFuc2l0aW9uLmVtaXQoJ2VuZGVkJywgdG8sIGZyb20pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlVVJMRnJvbVN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKSB7XG4gICAgaWYgKGlzSGFzaE1vZGUoKSkge1xuICAgICAgaWdub3JlTmV4dFVSTENoYW5nZSA9IHRydWU7XG4gICAgICBsb2NhdGlvbi5oYXNoID0gb3B0aW9ucy5oYXNoUHJlZml4ICsgdXJsO1xuICAgIH0gZWxzZSBoaXN0b3J5LnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCk7XG4gIH1cblxuICAvKlxuICAqIFJldHVybiB3aGV0aGVyIHRoZSBwYXNzZWQgc3RhdGUgaXMgdGhlIHNhbWUgYXMgdGhlIGN1cnJlbnQgb25lO1xuICAqIGluIHdoaWNoIGNhc2UgdGhlIHJvdXRlciBjYW4gaWdub3JlIHRoZSBjaGFuZ2UuXG4gICovXG4gIGZ1bmN0aW9uIHByZXZlbnRUcmFuc2l0aW9uKGN1cnJlbnQsIG5ld1N0YXRlLCBkaWZmKSB7XG4gICAgaWYgKCFjdXJyZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gbmV3U3RhdGUuc3RhdGUgPT0gY3VycmVudC5zdGF0ZSAmJiBPYmplY3Qua2V5cyhkaWZmLmFsbCkubGVuZ3RoID09IDA7XG4gIH1cblxuICAvKlxuICAqIFRoZSBzdGF0ZSB3YXNuJ3QgZm91bmQ7XG4gICogVHJhbnNpdGlvbiB0byB0aGUgJ25vdEZvdW5kJyBzdGF0ZSBpZiB0aGUgZGV2ZWxvcGVyIHNwZWNpZmllZCBpdCBvciBlbHNlIHRocm93IGFuIGVycm9yLlxuICAqL1xuICBmdW5jdGlvbiBub3RGb3VuZChzdGF0ZSkge1xuICAgIGxvZ2dlci5sb2coJ1N0YXRlIG5vdCBmb3VuZDogezB9Jywgc3RhdGUpO1xuXG4gICAgaWYgKG9wdGlvbnMubm90Rm91bmQpIHJldHVybiBzZXRTdGF0ZShsZWFmU3RhdGVzW29wdGlvbnMubm90Rm91bmRdLCB7fSk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ1N0YXRlIFwiJyArIHN0YXRlICsgJ1wiIGNvdWxkIG5vdCBiZSBmb3VuZCcpO1xuICB9XG5cbiAgLypcbiAgKiBDb25maWd1cmUgdGhlIHJvdXRlciBiZWZvcmUgaXRzIGluaXRpYWxpemF0aW9uLlxuICAqIFRoZSBhdmFpbGFibGUgb3B0aW9ucyBhcmU6XG4gICogICBlbmFibGVMb2dzOiBXaGV0aGVyIChkZWJ1ZyBhbmQgZXJyb3IpIGNvbnNvbGUgbG9ncyBzaG91bGQgYmUgZW5hYmxlZC4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICogICBpbnRlcmNlcHRBbmNob3JzOiBXaGV0aGVyIGFuY2hvciBtb3VzZWRvd24vY2xpY2tzIHNob3VsZCBiZSBpbnRlcmNlcHRlZCBhbmQgdHJpZ2dlciBhIHN0YXRlIGNoYW5nZS4gRGVmYXVsdHMgdG8gdHJ1ZS5cbiAgKiAgIG5vdEZvdW5kOiBUaGUgU3RhdGUgdG8gZW50ZXIgd2hlbiBubyBzdGF0ZSBtYXRjaGluZyB0aGUgY3VycmVudCBwYXRoIHF1ZXJ5IG9yIG5hbWUgY291bGQgYmUgZm91bmQuIERlZmF1bHRzIHRvIG51bGwuXG4gICogICB1cmxTeW5jOiBIb3cgc2hvdWxkIHRoZSByb3V0ZXIgbWFpbnRhaW4gdGhlIGN1cnJlbnQgc3RhdGUgYW5kIHRoZSB1cmwgaW4gc3luYy4gRGVmYXVsdHMgdG8gdHJ1ZSAoaGlzdG9yeSBBUEkpLlxuICAqICAgaGFzaFByZWZpeDogQ3VzdG9taXplIHRoZSBoYXNoIHNlcGFyYXRvci4gU2V0IHRvICchJyBpbiBvcmRlciB0byBoYXZlIGEgaGFzaGJhbmcgbGlrZSAnLyMhLycuIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZy5cbiAgKi9cbiAgZnVuY3Rpb24gY29uZmlndXJlKHdpdGhPcHRpb25zKSB7XG4gICAgdXRpbC5tZXJnZU9iamVjdHMob3B0aW9ucywgd2l0aE9wdGlvbnMpO1xuICAgIHJldHVybiByb3V0ZXI7XG4gIH1cblxuICAvKlxuICAqIEluaXRpYWxpemUgdGhlIHJvdXRlci5cbiAgKiBUaGUgcm91dGVyIHdpbGwgaW1tZWRpYXRlbHkgaW5pdGlhdGUgYSB0cmFuc2l0aW9uIHRvLCBpbiBvcmRlciBvZiBwcmlvcml0eTpcbiAgKiAxKSBUaGUgaW5pdCBzdGF0ZSBwYXNzZWQgYXMgYW4gYXJndW1lbnRcbiAgKiAyKSBUaGUgc3RhdGUgY2FwdHVyZWQgYnkgdGhlIGN1cnJlbnQgVVJMXG4gICovXG4gIGZ1bmN0aW9uIGluaXQoaW5pdFN0YXRlLCBpbml0UGFyYW1zKSB7XG4gICAgaWYgKG9wdGlvbnMuZW5hYmxlTG9ncykgUm91dGVyLmVuYWJsZUxvZ3MoKTtcblxuICAgIGlmIChvcHRpb25zLmludGVyY2VwdEFuY2hvcnMpIGludGVyY2VwdEFuY2hvcnMocm91dGVyKTtcblxuICAgIGhhc2hTbGFzaFN0cmluZyA9ICcjJyArIG9wdGlvbnMuaGFzaFByZWZpeCArICcvJztcblxuICAgIGxvZ2dlci5sb2coJ1JvdXRlciBpbml0Jyk7XG5cbiAgICBpbml0U3RhdGVzKCk7XG4gICAgbG9nU3RhdGVUcmVlKCk7XG5cbiAgICBpbml0U3RhdGUgPSBpbml0U3RhdGUgIT09IHVuZGVmaW5lZCA/IGluaXRTdGF0ZSA6IHVybFBhdGhRdWVyeSgpO1xuXG4gICAgbG9nZ2VyLmxvZygnSW5pdGlhbGl6aW5nIHRvIHN0YXRlIHswfScsIGluaXRTdGF0ZSB8fCAnXCJcIicpO1xuICAgIHRyYW5zaXRpb25Ubyhpbml0U3RhdGUsIGluaXRQYXJhbXMpO1xuXG4gICAgbGlzdGVuVG9VUkxDaGFuZ2VzKCk7XG5cbiAgICBpbml0aWFsaXplZCA9IHRydWU7XG4gICAgcmV0dXJuIHJvdXRlcjtcbiAgfVxuXG4gIC8qXG4gICogUmVtb3ZlIGFueSBwb3NzaWJpbGl0eSBvZiBzaWRlIGVmZmVjdCB0aGlzIHJvdXRlciBpbnN0YW5jZSBtaWdodCBjYXVzZS5cbiAgKiBVc2VkIGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAqL1xuICBmdW5jdGlvbiB0ZXJtaW5hdGUoKSB7XG4gICAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IG51bGw7XG4gICAgd2luZG93Lm9ucG9wc3RhdGUgPSBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuVG9VUkxDaGFuZ2VzKCkge1xuXG4gICAgZnVuY3Rpb24gb25VUkxDaGFuZ2UoZXZ0KSB7XG4gICAgICBpZiAoaWdub3JlTmV4dFVSTENoYW5nZSkge1xuICAgICAgICBpZ25vcmVOZXh0VVJMQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG5ld1N0YXRlID0gZXZ0LnN0YXRlIHx8IHVybFBhdGhRdWVyeSgpO1xuXG4gICAgICBsb2dnZXIubG9nKCdVUkwgY2hhbmdlZDogezB9JywgbmV3U3RhdGUpO1xuICAgICAgdXJsQ2hhbmdlZCA9IHRydWU7XG4gICAgICBzZXRTdGF0ZUZvclBhdGhRdWVyeShuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgd2luZG93W2lzSGFzaE1vZGUoKSA/ICdvbmhhc2hjaGFuZ2UnIDogJ29ucG9wc3RhdGUnXSA9IG9uVVJMQ2hhbmdlO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFN0YXRlcygpIHtcbiAgICB2YXIgc3RhdGVBcnJheSA9IHV0aWwub2JqZWN0VG9BcnJheShzdGF0ZXMpO1xuXG4gICAgYWRkRGVmYXVsdFN0YXRlcyhzdGF0ZUFycmF5KTtcblxuICAgIGVhY2hSb290U3RhdGUoZnVuY3Rpb24gKG5hbWUsIHN0YXRlKSB7XG4gICAgICBzdGF0ZS5pbml0KHJvdXRlciwgbmFtZSk7XG4gICAgfSk7XG5cbiAgICBhc3NlcnRQYXRoVW5pcXVlbmVzcyhzdGF0ZUFycmF5KTtcblxuICAgIGxlYWZTdGF0ZXMgPSByZWdpc3RlckxlYWZTdGF0ZXMoc3RhdGVBcnJheSwge30pO1xuXG4gICAgYXNzZXJ0Tm9BbWJpZ3VvdXNQYXRocygpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXNzZXJ0UGF0aFVuaXF1ZW5lc3Moc3RhdGVzKSB7XG4gICAgdmFyIHBhdGhzID0ge307XG5cbiAgICBzdGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmIChwYXRoc1tzdGF0ZS5wYXRoXSkge1xuICAgICAgICB2YXIgZnVsbFBhdGhzID0gc3RhdGVzLm1hcChmdW5jdGlvbiAocykge1xuICAgICAgICAgIHJldHVybiBzLmZ1bGxQYXRoKCkgfHwgJ2VtcHR5JztcbiAgICAgICAgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVHdvIHNpYmxpbmcgc3RhdGVzIGhhdmUgdGhlIHNhbWUgcGF0aCAoJyArIGZ1bGxQYXRocyArICcpJyk7XG4gICAgICB9XG5cbiAgICAgIHBhdGhzW3N0YXRlLnBhdGhdID0gMTtcbiAgICAgIGFzc2VydFBhdGhVbmlxdWVuZXNzKHN0YXRlLmNoaWxkcmVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzc2VydE5vQW1iaWd1b3VzUGF0aHMoKSB7XG4gICAgdmFyIHBhdGhzID0ge307XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIGxlYWZTdGF0ZXMpIHtcbiAgICAgIHZhciBwYXRoID0gdXRpbC5ub3JtYWxpemVQYXRoUXVlcnkobGVhZlN0YXRlc1tuYW1lXS5mdWxsUGF0aCgpKTtcbiAgICAgIGlmIChwYXRoc1twYXRoXSkgdGhyb3cgbmV3IEVycm9yKCdBbWJpZ3VvdXMgc3RhdGUgcGF0aHM6ICcgKyBwYXRoKTtcbiAgICAgIHBhdGhzW3BhdGhdID0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGREZWZhdWx0U3RhdGVzKHN0YXRlcykge1xuICAgIHN0YXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgdmFyIGNoaWxkcmVuID0gdXRpbC5vYmplY3RUb0FycmF5KHN0YXRlLnN0YXRlcyk7XG5cbiAgICAgIC8vIFRoaXMgaXMgYSBwYXJlbnQgc3RhdGU6IEFkZCBhIGRlZmF1bHQgc3RhdGUgdG8gaXQgaWYgdGhlcmUgaXNuJ3QgYWxyZWFkeSBvbmVcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgYWRkRGVmYXVsdFN0YXRlcyhjaGlsZHJlbik7XG5cbiAgICAgICAgdmFyIGhhc0RlZmF1bHRTdGF0ZSA9IGNoaWxkcmVuLnJlZHVjZShmdW5jdGlvbiAocmVzdWx0LCBzdGF0ZSkge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5wYXRoID09ICcnIHx8IHJlc3VsdDtcbiAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIGlmIChoYXNEZWZhdWx0U3RhdGUpIHJldHVybjtcblxuICAgICAgICB2YXIgZGVmYXVsdFN0YXRlID0gU3RhdGUoeyB1cmk6ICcnIH0pO1xuICAgICAgICBzdGF0ZS5zdGF0ZXMuX2RlZmF1bHRfID0gZGVmYXVsdFN0YXRlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZWFjaFJvb3RTdGF0ZShjYWxsYmFjaykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gc3RhdGVzKSB7XG4gICAgICBjYWxsYmFjayhuYW1lLCBzdGF0ZXNbbmFtZV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyTGVhZlN0YXRlcyhzdGF0ZXMsIGxlYWZTdGF0ZXMpIHtcbiAgICByZXR1cm4gc3RhdGVzLnJlZHVjZShmdW5jdGlvbiAobGVhZlN0YXRlcywgc3RhdGUpIHtcbiAgICAgIGlmIChzdGF0ZS5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiByZWdpc3RlckxlYWZTdGF0ZXMoc3RhdGUuY2hpbGRyZW4sIGxlYWZTdGF0ZXMpO2Vsc2Uge1xuICAgICAgICBsZWFmU3RhdGVzW3N0YXRlLmZ1bGxOYW1lXSA9IHN0YXRlO1xuICAgICAgICBzdGF0ZS5wYXRocyA9IHV0aWwucGFyc2VQYXRocyhzdGF0ZS5mdWxsUGF0aCgpKTtcbiAgICAgICAgcmV0dXJuIGxlYWZTdGF0ZXM7XG4gICAgICB9XG4gICAgfSwgbGVhZlN0YXRlcyk7XG4gIH1cblxuICAvKlxuICAqIFJlcXVlc3QgYSBwcm9ncmFtbWF0aWMgc3RhdGUgY2hhbmdlLlxuICAqXG4gICogVHdvIG5vdGF0aW9ucyBhcmUgc3VwcG9ydGVkOlxuICAqIHRyYW5zaXRpb25UbygnbXkudGFyZ2V0LnN0YXRlJywge2lkOiAzMywgZmlsdGVyOiAnZGVzYyd9KVxuICAqIHRyYW5zaXRpb25UbygndGFyZ2V0LzMzP2ZpbHRlcj1kZXNjJylcbiAgKi9cbiAgZnVuY3Rpb24gdHJhbnNpdGlvblRvKHBhdGhRdWVyeU9yTmFtZSkge1xuICAgIHZhciBuYW1lID0gbGVhZlN0YXRlc1twYXRoUXVlcnlPck5hbWVdO1xuICAgIHZhciBwYXJhbXMgPSAobmFtZSA/IGFyZ3VtZW50c1sxXSA6IG51bGwpIHx8IHt9O1xuICAgIHZhciBhY2MgPSBuYW1lID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzFdO1xuXG4gICAgbG9nZ2VyLmxvZygnQ2hhbmdpbmcgc3RhdGUgdG8gezB9JywgcGF0aFF1ZXJ5T3JOYW1lIHx8ICdcIlwiJyk7XG5cbiAgICB1cmxDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICBpZiAobmFtZSkgc2V0U3RhdGVCeU5hbWUobmFtZSwgcGFyYW1zLCBhY2MpO2Vsc2Ugc2V0U3RhdGVGb3JQYXRoUXVlcnkocGF0aFF1ZXJ5T3JOYW1lLCBhY2MpO1xuICB9XG5cbiAgLypcbiAgKiBBdHRlbXB0IHRvIG5hdmlnYXRlIHRvICdzdGF0ZU5hbWUnIHdpdGggaXRzIHByZXZpb3VzIHBhcmFtcyBvclxuICAqIGZhbGxiYWNrIHRvIHRoZSBkZWZhdWx0UGFyYW1zIHBhcmFtZXRlciBpZiB0aGUgc3RhdGUgd2FzIG5ldmVyIGVudGVyZWQuXG4gICovXG4gIGZ1bmN0aW9uIGJhY2tUbyhzdGF0ZU5hbWUsIGRlZmF1bHRQYXJhbXMsIGFjYykge1xuICAgIHZhciBwYXJhbXMgPSBsZWFmU3RhdGVzW3N0YXRlTmFtZV0ubGFzdFBhcmFtcyB8fCBkZWZhdWx0UGFyYW1zO1xuICAgIHRyYW5zaXRpb25UbyhzdGF0ZU5hbWUsIHBhcmFtcywgYWNjKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFN0YXRlRm9yUGF0aFF1ZXJ5KHBhdGhRdWVyeSwgYWNjKSB7XG4gICAgdmFyIHN0YXRlLCBwYXJhbXMsIF9zdGF0ZSwgX3BhcmFtcztcblxuICAgIGN1cnJlbnRQYXRoUXVlcnkgPSB1dGlsLm5vcm1hbGl6ZVBhdGhRdWVyeShwYXRoUXVlcnkpO1xuXG4gICAgdmFyIHBxID0gY3VycmVudFBhdGhRdWVyeS5zcGxpdCgnPycpO1xuICAgIHZhciBwYXRoID0gcHFbMF07XG4gICAgdmFyIHF1ZXJ5ID0gcHFbMV07XG4gICAgdmFyIHBhdGhzID0gdXRpbC5wYXJzZVBhdGhzKHBhdGgpO1xuICAgIHZhciBxdWVyeVBhcmFtcyA9IHV0aWwucGFyc2VRdWVyeVBhcmFtcyhxdWVyeSk7XG5cbiAgICBmb3IgKHZhciBuYW1lIGluIGxlYWZTdGF0ZXMpIHtcbiAgICAgIF9zdGF0ZSA9IGxlYWZTdGF0ZXNbbmFtZV07XG4gICAgICBfcGFyYW1zID0gX3N0YXRlLm1hdGNoZXMocGF0aHMpO1xuXG4gICAgICBpZiAoX3BhcmFtcykge1xuICAgICAgICBzdGF0ZSA9IF9zdGF0ZTtcbiAgICAgICAgcGFyYW1zID0gdXRpbC5tZXJnZU9iamVjdHMoX3BhcmFtcywgcXVlcnlQYXJhbXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUpIHNldFN0YXRlKHN0YXRlLCBwYXJhbXMsIGFjYyk7ZWxzZSBub3RGb3VuZChjdXJyZW50UGF0aFF1ZXJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFN0YXRlQnlOYW1lKG5hbWUsIHBhcmFtcywgYWNjKSB7XG4gICAgdmFyIHN0YXRlID0gbGVhZlN0YXRlc1tuYW1lXTtcblxuICAgIGlmICghc3RhdGUpIHJldHVybiBub3RGb3VuZChuYW1lKTtcblxuICAgIHZhciBwYXRoUXVlcnkgPSBpbnRlcnBvbGF0ZShzdGF0ZSwgcGFyYW1zKTtcbiAgICBzZXRTdGF0ZUZvclBhdGhRdWVyeShwYXRoUXVlcnksIGFjYyk7XG4gIH1cblxuICAvKlxuICAqIEFkZCBhIG5ldyByb290IHN0YXRlIHRvIHRoZSByb3V0ZXIuXG4gICogVGhlIG5hbWUgbXVzdCBiZSB1bmlxdWUgYW1vbmcgcm9vdCBzdGF0ZXMuXG4gICovXG4gIGZ1bmN0aW9uIGFkZFN0YXRlKG5hbWUsIHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlc1tuYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdBIHN0YXRlIGFscmVhZHkgZXhpc3QgaW4gdGhlIHJvdXRlciB3aXRoIHRoZSBuYW1lICcgKyBuYW1lKTtcblxuICAgIHN0YXRlID0gc3RhdGVUcmVlKHN0YXRlKTtcblxuICAgIHN0YXRlc1tuYW1lXSA9IHN0YXRlO1xuXG4gICAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgICBzdGF0ZS5pbml0KHJvdXRlciwgbmFtZSk7XG4gICAgICByZWdpc3RlckxlYWZTdGF0ZXMoeyBfOiBzdGF0ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm91dGVyO1xuICB9XG5cbiAgLypcbiAgKiBSZWFkIHRoZSBwYXRoL3F1ZXJ5IGZyb20gdGhlIFVSTC5cbiAgKi9cbiAgZnVuY3Rpb24gdXJsUGF0aFF1ZXJ5KCkge1xuICAgIHZhciBoYXNoU2xhc2ggPSBsb2NhdGlvbi5ocmVmLmluZGV4T2YoaGFzaFNsYXNoU3RyaW5nKTtcbiAgICB2YXIgcGF0aFF1ZXJ5O1xuXG4gICAgaWYgKGhhc2hTbGFzaCA+IC0xKSBwYXRoUXVlcnkgPSBsb2NhdGlvbi5ocmVmLnNsaWNlKGhhc2hTbGFzaCArIGhhc2hTbGFzaFN0cmluZy5sZW5ndGgpO2Vsc2UgaWYgKGlzSGFzaE1vZGUoKSkgcGF0aFF1ZXJ5ID0gJy8nO2Vsc2UgcGF0aFF1ZXJ5ID0gKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKS5zbGljZSgxKTtcblxuICAgIHJldHVybiB1dGlsLm5vcm1hbGl6ZVBhdGhRdWVyeShwYXRoUXVlcnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNIYXNoTW9kZSgpIHtcbiAgICByZXR1cm4gb3B0aW9ucy51cmxTeW5jID09ICdoYXNoJztcbiAgfVxuXG4gIC8qXG4gICogQ29tcHV0ZSBhIGxpbmsgdGhhdCBjYW4gYmUgdXNlZCBpbiBhbmNob3JzJyBocmVmIGF0dHJpYnV0ZXNcbiAgKiBmcm9tIGEgc3RhdGUgbmFtZSBhbmQgYSBsaXN0IG9mIHBhcmFtcywgYS5rLmEgcmV2ZXJzZSByb3V0aW5nLlxuICAqL1xuICBmdW5jdGlvbiBsaW5rKHN0YXRlTmFtZSwgcGFyYW1zKSB7XG4gICAgdmFyIHN0YXRlID0gbGVhZlN0YXRlc1tzdGF0ZU5hbWVdO1xuICAgIGlmICghc3RhdGUpIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgc3RhdGUgJyArIHN0YXRlTmFtZSk7XG5cbiAgICB2YXIgaW50ZXJwb2xhdGVkID0gaW50ZXJwb2xhdGUoc3RhdGUsIHBhcmFtcyk7XG4gICAgdmFyIHVyaSA9IHV0aWwubm9ybWFsaXplUGF0aFF1ZXJ5KGludGVycG9sYXRlZCk7XG5cbiAgICByZXR1cm4gaXNIYXNoTW9kZSgpID8gJyMnICsgb3B0aW9ucy5oYXNoUHJlZml4ICsgdXJpIDogdXJpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJwb2xhdGUoc3RhdGUsIHBhcmFtcykge1xuICAgIHZhciBlbmNvZGVkUGFyYW1zID0ge307XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgICBlbmNvZGVkUGFyYW1zW2tleV0gPSBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZS5pbnRlcnBvbGF0ZShlbmNvZGVkUGFyYW1zKTtcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSByb3V0ZXIuXG4gICovXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnQoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTdGF0ZSAmJiBjdXJyZW50U3RhdGUuYXNQdWJsaWM7XG4gIH1cblxuICAvKlxuICAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcHJldmlvdXMgc3RhdGUgb2YgdGhlIHJvdXRlclxuICAqIG9yIG51bGwgaWYgdGhlIHJvdXRlciBpcyBzdGlsbCBpbiBpdHMgaW5pdGlhbCBzdGF0ZS5cbiAgKi9cbiAgZnVuY3Rpb24gZ2V0UHJldmlvdXMoKSB7XG4gICAgcmV0dXJuIHByZXZpb3VzU3RhdGUgJiYgcHJldmlvdXNTdGF0ZS5hc1B1YmxpYztcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyB0aGUgZGlmZiBiZXR3ZWVuIHRoZSBjdXJyZW50IHBhcmFtcyBhbmQgdGhlIHByZXZpb3VzIG9uZXMuXG4gICovXG4gIGZ1bmN0aW9uIGdldFBhcmFtc0RpZmYoKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRQYXJhbXNEaWZmO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3RhdGVzUmVjKHN0YXRlcywgYWNjKSB7XG4gICAgYWNjLnB1c2guYXBwbHkoYWNjLCBzdGF0ZXMpO1xuICAgIHN0YXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgcmV0dXJuIGFsbFN0YXRlc1JlYyhzdGF0ZS5jaGlsZHJlbiwgYWNjKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWNjO1xuICB9XG5cbiAgZnVuY3Rpb24gYWxsU3RhdGVzKCkge1xuICAgIHJldHVybiBhbGxTdGF0ZXNSZWModXRpbC5vYmplY3RUb0FycmF5KHN0YXRlcyksIFtdKTtcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyB0aGUgc3RhdGUgb2JqZWN0IHRoYXQgd2FzIGJ1aWx0IHdpdGggdGhlIGdpdmVuIG9wdGlvbnMgb2JqZWN0IG9yIHRoYXQgaGFzIHRoZSBnaXZlbiBmdWxsTmFtZS5cbiAgKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgc3RhdGUgZG9lc24ndCBleGlzdC5cbiAgKi9cbiAgZnVuY3Rpb24gZmluZFN0YXRlKGJ5KSB7XG4gICAgdmFyIGZpbHRlckZuID0gKHR5cGVvZiBieSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoYnkpKSA9PT0gJ29iamVjdCcgPyBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIHJldHVybiBieSA9PT0gc3RhdGUub3B0aW9ucztcbiAgICB9IDogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICByZXR1cm4gYnkgPT09IHN0YXRlLmZ1bGxOYW1lO1xuICAgIH07XG5cbiAgICB2YXIgc3RhdGUgPSBhbGxTdGF0ZXMoKS5maWx0ZXIoZmlsdGVyRm4pWzBdO1xuICAgIHJldHVybiBzdGF0ZSAmJiBzdGF0ZS5hc1B1YmxpYztcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyB3aGV0aGVyIHRoZSByb3V0ZXIgaXMgZXhlY3V0aW5nIGl0cyBmaXJzdCB0cmFuc2l0aW9uLlxuICAqL1xuICBmdW5jdGlvbiBpc0ZpcnN0VHJhbnNpdGlvbigpIHtcbiAgICByZXR1cm4gcHJldmlvdXNTdGF0ZSA9PSBudWxsO1xuICB9XG5cbiAgLyogRmx1ZW50IEFQSSBhbGlhcyAqL1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICByb3V0ZXIudHJhbnNpdGlvbi5vbi5hcHBseShyb3V0ZXIudHJhbnNpdGlvbiwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcm91dGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhdGVUcmVlcyhzdGF0ZXMpIHtcbiAgICByZXR1cm4gdXRpbC5tYXBWYWx1ZXMoc3RhdGVzLCBzdGF0ZVRyZWUpO1xuICB9XG5cbiAgLypcbiAgKiBDcmVhdGVzIGFuIGludGVybmFsIFN0YXRlIG9iamVjdCBmcm9tIGEgc3BlY2lmaWNhdGlvbiBQT0pPLlxuICAqL1xuICBmdW5jdGlvbiBzdGF0ZVRyZWUoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuY2hpbGRyZW4pIHN0YXRlLmNoaWxkcmVuID0gc3RhdGVUcmVlcyhzdGF0ZS5jaGlsZHJlbik7XG4gICAgcmV0dXJuIFN0YXRlKHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvZ1N0YXRlVHJlZSgpIHtcbiAgICBpZiAoIWxvZ2dlci5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgaW5kZW50ID0gZnVuY3Rpb24gaW5kZW50KGxldmVsKSB7XG4gICAgICBpZiAobGV2ZWwgPT0gMCkgcmV0dXJuICcnO1xuICAgICAgcmV0dXJuIG5ldyBBcnJheSgyICsgKGxldmVsIC0gMSkgKiA0KS5qb2luKCcgJykgKyAn4pSA4pSAICc7XG4gICAgfTtcblxuICAgIHZhciBzdGF0ZVRyZWUgPSBmdW5jdGlvbiBzdGF0ZVRyZWUoc3RhdGUpIHtcbiAgICAgIHZhciBwYXRoID0gdXRpbC5ub3JtYWxpemVQYXRoUXVlcnkoc3RhdGUuZnVsbFBhdGgoKSk7XG4gICAgICB2YXIgcGF0aFN0ciA9IHN0YXRlLmNoaWxkcmVuLmxlbmd0aCA9PSAwID8gJyAoQCBwYXRoKScucmVwbGFjZSgncGF0aCcsIHBhdGgpIDogJyc7XG4gICAgICB2YXIgc3RyID0gaW5kZW50KHN0YXRlLnBhcmVudHMubGVuZ3RoKSArIHN0YXRlLm5hbWUgKyBwYXRoU3RyICsgJ1xcbic7XG4gICAgICByZXR1cm4gc3RyICsgc3RhdGUuY2hpbGRyZW4ubWFwKHN0YXRlVHJlZSkuam9pbignJyk7XG4gICAgfTtcblxuICAgIHZhciBtc2cgPSAnXFxuU3RhdGUgdHJlZVxcblxcbic7XG4gICAgbXNnICs9IHV0aWwub2JqZWN0VG9BcnJheShzdGF0ZXMpLm1hcChzdGF0ZVRyZWUpLmpvaW4oJycpO1xuICAgIG1zZyArPSAnXFxuJztcblxuICAgIGxvZ2dlci5sb2cobXNnKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBtZXRob2RzXG5cbiAgcm91dGVyLmNvbmZpZ3VyZSA9IGNvbmZpZ3VyZTtcbiAgcm91dGVyLmluaXQgPSBpbml0O1xuICByb3V0ZXIudHJhbnNpdGlvblRvID0gdHJhbnNpdGlvblRvO1xuICByb3V0ZXIuYmFja1RvID0gYmFja1RvO1xuICByb3V0ZXIuYWRkU3RhdGUgPSBhZGRTdGF0ZTtcbiAgcm91dGVyLmxpbmsgPSBsaW5rO1xuICByb3V0ZXIuY3VycmVudCA9IGdldEN1cnJlbnQ7XG4gIHJvdXRlci5wcmV2aW91cyA9IGdldFByZXZpb3VzO1xuICByb3V0ZXIuZmluZFN0YXRlID0gZmluZFN0YXRlO1xuICByb3V0ZXIuaXNGaXJzdFRyYW5zaXRpb24gPSBpc0ZpcnN0VHJhbnNpdGlvbjtcbiAgcm91dGVyLnBhcmFtc0RpZmYgPSBnZXRQYXJhbXNEaWZmO1xuICByb3V0ZXIub3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgcm91dGVyLnRyYW5zaXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHJvdXRlci5vbiA9IG9uO1xuXG4gIC8vIFVzZWQgZm9yIHRlc3RpbmcgcHVycG9zZXMgb25seVxuICByb3V0ZXIudXJsUGF0aFF1ZXJ5ID0gdXJsUGF0aFF1ZXJ5O1xuICByb3V0ZXIudGVybWluYXRlID0gdGVybWluYXRlO1xuXG4gIHV0aWwubWVyZ2VPYmplY3RzKGFwaSwgcm91dGVyKTtcblxuICByZXR1cm4gcm91dGVyO1xufVxuXG4vLyBMb2dnaW5nXG5cbnZhciBsb2dnZXIgPSB7XG4gIGxvZzogdXRpbC5ub29wLFxuICBlcnJvcjogdXRpbC5ub29wLFxuICBlbmFibGVkOiBmYWxzZVxufTtcblxuUm91dGVyLmVuYWJsZUxvZ3MgPSBmdW5jdGlvbiAoKSB7XG4gIGxvZ2dlci5lbmFibGVkID0gdHJ1ZTtcblxuICBsb2dnZXIubG9nID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBtZXNzYWdlID0gdXRpbC5tYWtlTWVzc2FnZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfTtcblxuICBsb2dnZXIuZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG5cbiAgICB2YXIgbWVzc2FnZSA9IHV0aWwubWFrZU1lc3NhZ2UuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FieXNzYS9saWIvUm91dGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgZm9yIChpID0gMTsgaSA8IGxlbjsgaSsrKVxuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICB2YXIgbTtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2Uge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIWVtaXR0ZXIuX2V2ZW50cyB8fCAhZW1pdHRlci5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IDA7XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24oZW1pdHRlci5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSAxO1xuICBlbHNlXG4gICAgcmV0ID0gZW1pdHRlci5fZXZlbnRzW3R5cGVdLmxlbmd0aDtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FieXNzYS9+L2V2ZW50cy9ldmVudHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4ndXNlIHN0cmljdCc7XG5cbnZhciByb3V0ZXI7XG5cbmZ1bmN0aW9uIG9uTW91c2VEb3duKGV2dCkge1xuICB2YXIgaHJlZiA9IGhyZWZGb3JFdmVudChldnQpO1xuXG4gIGlmIChocmVmICE9PSB1bmRlZmluZWQpIHJvdXRlci50cmFuc2l0aW9uVG8oaHJlZik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VDbGljayhldnQpIHtcbiAgdmFyIGhyZWYgPSBocmVmRm9yRXZlbnQoZXZ0KTtcblxuICBpZiAoaHJlZiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICByb3V0ZXIudHJhbnNpdGlvblRvKGhyZWYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhyZWZGb3JFdmVudChldnQpIHtcbiAgaWYgKGV2dC5kZWZhdWx0UHJldmVudGVkIHx8IGV2dC5tZXRhS2V5IHx8IGV2dC5jdHJsS2V5IHx8ICFpc0xlZnRCdXR0b24oZXZ0KSkgcmV0dXJuO1xuXG4gIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICB2YXIgYW5jaG9yID0gYW5jaG9yVGFyZ2V0KHRhcmdldCk7XG4gIGlmICghYW5jaG9yKSByZXR1cm47XG5cbiAgdmFyIGRhdGFOYXYgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdkYXRhLW5hdicpO1xuXG4gIGlmIChkYXRhTmF2ID09ICdpZ25vcmUnKSByZXR1cm47XG4gIGlmIChldnQudHlwZSA9PSAnbW91c2Vkb3duJyAmJiBkYXRhTmF2ICE9ICdtb3VzZWRvd24nKSByZXR1cm47XG5cbiAgdmFyIGhyZWYgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgaWYgKCFocmVmKSByZXR1cm47XG4gIGlmIChocmVmLmNoYXJBdCgwKSA9PSAnIycpIHtcbiAgICBpZiAocm91dGVyLm9wdGlvbnMudXJsU3luYyAhPSAnaGFzaCcpIHJldHVybjtcbiAgICBocmVmID0gaHJlZi5zbGljZSgxKTtcbiAgfVxuICBpZiAoYW5jaG9yLmdldEF0dHJpYnV0ZSgndGFyZ2V0JykgPT0gJ19ibGFuaycpIHJldHVybjtcbiAgaWYgKCFpc0xvY2FsTGluayhhbmNob3IpKSByZXR1cm47XG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgd2UgaGF2ZSBhIHZhbGlkIGhyZWYgdG8gZm9sbG93LlxuICAvLyBEaWQgdGhlIG5hdmlnYXRpb24gYWxyZWFkeSBvY2N1ciBvbiBtb3VzZWRvd24gdGhvdWdoP1xuICBpZiAoZXZ0LnR5cGUgPT0gJ2NsaWNrJyAmJiBkYXRhTmF2ID09ICdtb3VzZWRvd24nKSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcmV0dXJuIGhyZWY7XG59XG5cbmZ1bmN0aW9uIGlzTGVmdEJ1dHRvbihldnQpIHtcbiAgcmV0dXJuIGV2dC53aGljaCA9PSAxO1xufVxuXG5mdW5jdGlvbiBhbmNob3JUYXJnZXQodGFyZ2V0KSB7XG4gIHdoaWxlICh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0Lm5vZGVOYW1lID09ICdBJykgcmV0dXJuIHRhcmdldDtcbiAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0xvY2FsTGluayhhbmNob3IpIHtcbiAgdmFyIGhvc3RuYW1lID0gYW5jaG9yLmhvc3RuYW1lO1xuICB2YXIgcG9ydCA9IGFuY2hvci5wb3J0O1xuXG4gIC8vIElFMTAgY2FuIGxvc2UgdGhlIGhvc3RuYW1lL3BvcnQgcHJvcGVydHkgd2hlbiBzZXR0aW5nIGEgcmVsYXRpdmUgaHJlZiBmcm9tIEpTXG4gIGlmICghaG9zdG5hbWUpIHtcbiAgICB2YXIgdGVtcEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRlbXBBbmNob3IuaHJlZiA9IGFuY2hvci5ocmVmO1xuICAgIGhvc3RuYW1lID0gdGVtcEFuY2hvci5ob3N0bmFtZTtcbiAgICBwb3J0ID0gdGVtcEFuY2hvci5wb3J0O1xuICB9XG5cbiAgdmFyIHNhbWVIb3N0bmFtZSA9IGhvc3RuYW1lID09IGxvY2F0aW9uLmhvc3RuYW1lO1xuICB2YXIgc2FtZVBvcnQgPSAocG9ydCB8fCAnODAnKSA9PSAobG9jYXRpb24ucG9ydCB8fCAnODAnKTtcblxuICByZXR1cm4gc2FtZUhvc3RuYW1lICYmIHNhbWVQb3J0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGludGVyY2VwdEFuY2hvcnMoZm9yUm91dGVyKSB7XG4gIHJvdXRlciA9IGZvclJvdXRlcjtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Nb3VzZUNsaWNrKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYWJ5c3NhL2xpYi9hbmNob3JzLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxuJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBDcmVhdGVzIGEgbmV3IFN0YXRlV2l0aFBhcmFtcyBpbnN0YW5jZS5cbipcbiogU3RhdGVXaXRoUGFyYW1zIGlzIHRoZSBtZXJnZSBiZXR3ZWVuIGEgU3RhdGUgb2JqZWN0IChjcmVhdGVkIGFuZCBhZGRlZCB0byB0aGUgcm91dGVyIGJlZm9yZSBpbml0KVxuKiBhbmQgcGFyYW1zIChib3RoIHBhdGggYW5kIHF1ZXJ5IHBhcmFtcywgZXh0cmFjdGVkIGZyb20gdGhlIFVSTCBhZnRlciBpbml0KVxuKlxuKiBUaGlzIGlzIGFuIGludGVybmFsIG1vZGVsOyBUaGUgcHVibGljIG1vZGVsIGlzIHRoZSBhc1B1YmxpYyBwcm9wZXJ0eS5cbiovXG5cbmZ1bmN0aW9uIFN0YXRlV2l0aFBhcmFtcyhzdGF0ZSwgcGFyYW1zLCBwYXRoUXVlcnkpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0ZTogc3RhdGUsXG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICAgIGFzUHVibGljOiBtYWtlUHVibGljQVBJKHN0YXRlLCBwYXJhbXMsIHBhdGhRdWVyeSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZVB1YmxpY0FQSShzdGF0ZSwgcGFyYW1zLCBwYXRoUXVlcnkpIHtcblxuICAvKlxuICAqIFJldHVybnMgd2hldGhlciB0aGlzIHN0YXRlIG9yIGFueSBvZiBpdHMgcGFyZW50cyBoYXMgdGhlIGdpdmVuIGZ1bGxOYW1lLlxuICAqL1xuICBmdW5jdGlvbiBpc0luKGZ1bGxTdGF0ZU5hbWUpIHtcbiAgICB2YXIgY3VycmVudCA9IHN0YXRlO1xuICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICBpZiAoY3VycmVudC5mdWxsTmFtZSA9PSBmdWxsU3RhdGVOYW1lKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB1cmk6IHBhdGhRdWVyeSxcbiAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICBuYW1lOiBzdGF0ZSA/IHN0YXRlLm5hbWUgOiAnJyxcbiAgICBmdWxsTmFtZTogc3RhdGUgPyBzdGF0ZS5mdWxsTmFtZSA6ICcnLFxuICAgIGRhdGE6IHN0YXRlID8gc3RhdGUuZGF0YSA6IG51bGwsXG4gICAgaXNJbjogaXNJblxuICB9O1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLnN0YXRlICYmIHRoaXMuc3RhdGUuZnVsbE5hbWU7XG4gIHJldHVybiBuYW1lICsgJzonICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJhbXMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXRlV2l0aFBhcmFtcztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hYnlzc2EvbGliL1N0YXRlV2l0aFBhcmFtcy5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbid1c2Ugc3RyaWN0JztcblxuLypcbiogQ3JlYXRlIGEgbmV3IFRyYW5zaXRpb24gaW5zdGFuY2UuXG4qL1xuXG5mdW5jdGlvbiBUcmFuc2l0aW9uKGZyb21TdGF0ZVdpdGhQYXJhbXMsIHRvU3RhdGVXaXRoUGFyYW1zLCBwYXJhbXNEaWZmLCBhY2MsIHJvdXRlciwgbG9nZ2VyKSB7XG4gIHZhciByb290LCBlbnRlcnMsIGV4aXRzO1xuXG4gIHZhciBmcm9tU3RhdGUgPSBmcm9tU3RhdGVXaXRoUGFyYW1zICYmIGZyb21TdGF0ZVdpdGhQYXJhbXMuc3RhdGU7XG4gIHZhciB0b1N0YXRlID0gdG9TdGF0ZVdpdGhQYXJhbXMuc3RhdGU7XG4gIHZhciBwYXJhbXMgPSB0b1N0YXRlV2l0aFBhcmFtcy5wYXJhbXM7XG4gIHZhciBpc1VwZGF0ZSA9IGZyb21TdGF0ZSA9PSB0b1N0YXRlO1xuXG4gIHZhciB0cmFuc2l0aW9uID0ge1xuICAgIGZyb206IGZyb21TdGF0ZSxcbiAgICB0bzogdG9TdGF0ZSxcbiAgICB0b1BhcmFtczogcGFyYW1zLFxuICAgIGNhbmNlbDogY2FuY2VsLFxuICAgIGNhbmNlbGxlZDogZmFsc2UsXG4gICAgY3VycmVudFN0YXRlOiBmcm9tU3RhdGUsXG4gICAgcnVuOiBydW5cbiAgfTtcblxuICAvLyBUaGUgZmlyc3QgdHJhbnNpdGlvbiBoYXMgbm8gZnJvbVN0YXRlLlxuICBpZiAoZnJvbVN0YXRlKSByb290ID0gdHJhbnNpdGlvblJvb3QoZnJvbVN0YXRlLCB0b1N0YXRlLCBpc1VwZGF0ZSwgcGFyYW1zRGlmZik7XG5cbiAgdmFyIGluY2x1c2l2ZSA9ICFyb290IHx8IGlzVXBkYXRlO1xuICBleGl0cyA9IGZyb21TdGF0ZSA/IHRyYW5zaXRpb25TdGF0ZXMoZnJvbVN0YXRlLCByb290LCBpbmNsdXNpdmUpIDogW107XG4gIGVudGVycyA9IHRyYW5zaXRpb25TdGF0ZXModG9TdGF0ZSwgcm9vdCwgaW5jbHVzaXZlKS5yZXZlcnNlKCk7XG5cbiAgZnVuY3Rpb24gcnVuKCkge1xuICAgIHN0YXJ0VHJhbnNpdGlvbihlbnRlcnMsIGV4aXRzLCBwYXJhbXMsIHRyYW5zaXRpb24sIGlzVXBkYXRlLCBhY2MsIHJvdXRlciwgbG9nZ2VyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICB0cmFuc2l0aW9uLmNhbmNlbGxlZCA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gdHJhbnNpdGlvbjtcbn1cblxuZnVuY3Rpb24gc3RhcnRUcmFuc2l0aW9uKGVudGVycywgZXhpdHMsIHBhcmFtcywgdHJhbnNpdGlvbiwgaXNVcGRhdGUsIGFjYywgcm91dGVyLCBsb2dnZXIpIHtcbiAgYWNjID0gYWNjIHx8IHt9O1xuXG4gIHRyYW5zaXRpb24uZXhpdGluZyA9IHRydWU7XG4gIGV4aXRzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgaWYgKGlzVXBkYXRlICYmIHN0YXRlLnVwZGF0ZSkgcmV0dXJuO1xuICAgIHJ1blN0ZXAoc3RhdGUsICdleGl0JywgcGFyYW1zLCB0cmFuc2l0aW9uLCBhY2MsIHJvdXRlciwgbG9nZ2VyKTtcbiAgfSk7XG4gIHRyYW5zaXRpb24uZXhpdGluZyA9IGZhbHNlO1xuXG4gIGVudGVycy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIHZhciBmbiA9IGlzVXBkYXRlICYmIHN0YXRlLnVwZGF0ZSA/ICd1cGRhdGUnIDogJ2VudGVyJztcbiAgICBydW5TdGVwKHN0YXRlLCBmbiwgcGFyYW1zLCB0cmFuc2l0aW9uLCBhY2MsIHJvdXRlciwgbG9nZ2VyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJ1blN0ZXAoc3RhdGUsIHN0ZXBGbiwgcGFyYW1zLCB0cmFuc2l0aW9uLCBhY2MsIHJvdXRlciwgbG9nZ2VyKSB7XG4gIGlmICh0cmFuc2l0aW9uLmNhbmNlbGxlZCkgcmV0dXJuO1xuXG4gIGlmIChsb2dnZXIuZW5hYmxlZCkge1xuICAgIHZhciBjYXBpdGFsaXplZFN0ZXAgPSBzdGVwRm5bMF0udG9VcHBlckNhc2UoKSArIHN0ZXBGbi5zbGljZSgxKTtcbiAgICBsb2dnZXIubG9nKGNhcGl0YWxpemVkU3RlcCArICcgJyArIHN0YXRlLmZ1bGxOYW1lKTtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBzdGF0ZVtzdGVwRm5dKHBhcmFtcywgYWNjLCByb3V0ZXIpO1xuXG4gIGlmICh0cmFuc2l0aW9uLmNhbmNlbGxlZCkgcmV0dXJuO1xuXG4gIHRyYW5zaXRpb24uY3VycmVudFN0YXRlID0gc3RlcEZuID09ICdleGl0JyA/IHN0YXRlLnBhcmVudCA6IHN0YXRlO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qXG4qIFRoZSB0b3AtbW9zdCBjdXJyZW50IHN0YXRlJ3MgcGFyZW50IHRoYXQgbXVzdCBiZSBleGl0ZWQuXG4qL1xuZnVuY3Rpb24gdHJhbnNpdGlvblJvb3QoZnJvbVN0YXRlLCB0b1N0YXRlLCBpc1VwZGF0ZSwgcGFyYW1zRGlmZikge1xuICB2YXIgcm9vdCwgcGFyZW50LCBwYXJhbTtcblxuICAvLyBGb3IgYSBwYXJhbS1vbmx5IGNoYW5nZSwgdGhlIHJvb3QgaXMgdGhlIHRvcC1tb3N0IHN0YXRlIG93bmluZyB0aGUgcGFyYW0ocyksXG4gIGlmIChpc1VwZGF0ZSkge1xuICAgIFtmcm9tU3RhdGVdLmNvbmNhdChmcm9tU3RhdGUucGFyZW50cykucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgaWYgKHJvb3QpIHJldHVybjtcblxuICAgICAgZm9yIChwYXJhbSBpbiBwYXJhbXNEaWZmLmFsbCkge1xuICAgICAgICBpZiAocGFyZW50LnBhcmFtc1twYXJhbV0gfHwgcGFyZW50LnF1ZXJ5UGFyYW1zW3BhcmFtXSkge1xuICAgICAgICAgIHJvb3QgPSBwYXJlbnQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvLyBFbHNlLCB0aGUgcm9vdCBpcyB0aGUgY2xvc2VzdCBjb21tb24gcGFyZW50IG9mIHRoZSB0d28gc3RhdGVzLlxuICBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnJvbVN0YXRlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyZW50ID0gZnJvbVN0YXRlLnBhcmVudHNbaV07XG4gICAgICAgIGlmICh0b1N0YXRlLnBhcmVudHMuaW5kZXhPZihwYXJlbnQpID4gLTEpIHtcbiAgICAgICAgICByb290ID0gcGFyZW50O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIHJldHVybiByb290O1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU3RhdGVzKHN0YXRlLCByb290LCBpbmNsdXNpdmUpIHtcbiAgcm9vdCA9IHJvb3QgfHwgc3RhdGUucm9vdDtcblxuICB2YXIgcCA9IHN0YXRlLnBhcmVudHMsXG4gICAgICBlbmQgPSBNYXRoLm1pbihwLmxlbmd0aCwgcC5pbmRleE9mKHJvb3QpICsgKGluY2x1c2l2ZSA/IDEgOiAwKSk7XG5cbiAgcmV0dXJuIFtzdGF0ZV0uY29uY2F0KHAuc2xpY2UoMCwgZW5kKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9hYnlzc2EvbGliL1RyYW5zaXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbnZhciBQQVJBTVMgPSAvOlteXFxcXD9cXC9dKi9nO1xuXG4vKlxuKiBDcmVhdGVzIGEgbmV3IFN0YXRlIGluc3RhbmNlIGZyb20gYSB7dXJpLCBlbnRlciwgZXhpdCwgdXBkYXRlLCBkYXRhLCBjaGlsZHJlbn0gb2JqZWN0LlxuKiBUaGlzIGlzIHRoZSBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBvZiBhIHN0YXRlIHVzZWQgYnkgdGhlIHJvdXRlci5cbiovXG5mdW5jdGlvbiBTdGF0ZShvcHRpb25zKSB7XG4gIHZhciBzdGF0ZSA9IHsgb3B0aW9uczogb3B0aW9ucyB9LFxuICAgICAgc3RhdGVzID0gb3B0aW9ucy5jaGlsZHJlbjtcblxuICBzdGF0ZS5wYXRoID0gcGF0aEZyb21VUkkob3B0aW9ucy51cmkpO1xuICBzdGF0ZS5wYXJhbXMgPSBwYXJhbXNGcm9tVVJJKG9wdGlvbnMudXJpKTtcbiAgc3RhdGUucXVlcnlQYXJhbXMgPSBxdWVyeVBhcmFtc0Zyb21VUkkob3B0aW9ucy51cmkpO1xuICBzdGF0ZS5zdGF0ZXMgPSBzdGF0ZXM7XG5cbiAgc3RhdGUuZW50ZXIgPSBvcHRpb25zLmVudGVyIHx8IHV0aWwubm9vcDtcbiAgc3RhdGUudXBkYXRlID0gb3B0aW9ucy51cGRhdGU7XG4gIHN0YXRlLmV4aXQgPSBvcHRpb25zLmV4aXQgfHwgdXRpbC5ub29wO1xuXG4gIHN0YXRlLm93bkRhdGEgPSBvcHRpb25zLmRhdGEgfHwge307XG5cbiAgLypcbiAgKiBJbml0aWFsaXplIGFuZCBmcmVlemUgdGhpcyBzdGF0ZS5cbiAgKi9cbiAgZnVuY3Rpb24gaW5pdChyb3V0ZXIsIG5hbWUsIHBhcmVudCkge1xuICAgIHN0YXRlLnJvdXRlciA9IHJvdXRlcjtcbiAgICBzdGF0ZS5uYW1lID0gbmFtZTtcbiAgICBzdGF0ZS5pc0RlZmF1bHQgPSBuYW1lID09ICdfZGVmYXVsdF8nO1xuICAgIHN0YXRlLnBhcmVudCA9IHBhcmVudDtcbiAgICBzdGF0ZS5wYXJlbnRzID0gZ2V0UGFyZW50cygpO1xuICAgIHN0YXRlLnJvb3QgPSBzdGF0ZS5wYXJlbnQgPyBzdGF0ZS5wYXJlbnRzW3N0YXRlLnBhcmVudHMubGVuZ3RoIC0gMV0gOiBzdGF0ZTtcbiAgICBzdGF0ZS5jaGlsZHJlbiA9IHV0aWwub2JqZWN0VG9BcnJheShzdGF0ZXMpO1xuICAgIHN0YXRlLmZ1bGxOYW1lID0gZ2V0RnVsbE5hbWUoKTtcbiAgICBzdGF0ZS5hc1B1YmxpYyA9IG1ha2VQdWJsaWNBUEkoKTtcblxuICAgIGVhY2hDaGlsZFN0YXRlKGZ1bmN0aW9uIChuYW1lLCBjaGlsZFN0YXRlKSB7XG4gICAgICBjaGlsZFN0YXRlLmluaXQocm91dGVyLCBuYW1lLCBzdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAqIFRoZSBmdWxsIHBhdGgsIGNvbXBvc2VkIG9mIGFsbCB0aGUgaW5kaXZpZHVhbCBwYXRocyBvZiB0aGlzIHN0YXRlIGFuZCBpdHMgcGFyZW50cy5cbiAgKi9cbiAgZnVuY3Rpb24gZnVsbFBhdGgoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHN0YXRlLnBhdGgsXG4gICAgICAgIHN0YXRlUGFyZW50ID0gc3RhdGUucGFyZW50O1xuXG4gICAgd2hpbGUgKHN0YXRlUGFyZW50KSB7XG4gICAgICBpZiAoc3RhdGVQYXJlbnQucGF0aCkgcmVzdWx0ID0gc3RhdGVQYXJlbnQucGF0aCArICcvJyArIHJlc3VsdDtcbiAgICAgIHN0YXRlUGFyZW50ID0gc3RhdGVQYXJlbnQucGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKlxuICAqIFRoZSBsaXN0IG9mIGFsbCBwYXJlbnRzLCBzdGFydGluZyBmcm9tIHRoZSBjbG9zZXN0IG9uZXMuXG4gICovXG4gIGZ1bmN0aW9uIGdldFBhcmVudHMoKSB7XG4gICAgdmFyIHBhcmVudHMgPSBbXSxcbiAgICAgICAgcGFyZW50ID0gc3RhdGUucGFyZW50O1xuXG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRzO1xuICB9XG5cbiAgLypcbiAgKiBUaGUgZnVsbHkgcXVhbGlmaWVkIG5hbWUgb2YgdGhpcyBzdGF0ZS5cbiAgKiBlLmcgZ3JhbnBhcmVudE5hbWUucGFyZW50TmFtZS5uYW1lXG4gICovXG4gIGZ1bmN0aW9uIGdldEZ1bGxOYW1lKCkge1xuICAgIHZhciByZXN1bHQgPSBzdGF0ZS5wYXJlbnRzLnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChhY2MsIHBhcmVudCkge1xuICAgICAgcmV0dXJuIGFjYyArIHBhcmVudC5uYW1lICsgJy4nO1xuICAgIH0sICcnKSArIHN0YXRlLm5hbWU7XG5cbiAgICByZXR1cm4gc3RhdGUuaXNEZWZhdWx0ID8gcmVzdWx0LnJlcGxhY2UoJy5fZGVmYXVsdF8nLCAnJykgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBhbGxRdWVyeVBhcmFtcygpIHtcbiAgICByZXR1cm4gc3RhdGUucGFyZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGFyZW50KSB7XG4gICAgICByZXR1cm4gdXRpbC5tZXJnZU9iamVjdHMoYWNjLCBwYXJlbnQucXVlcnlQYXJhbXMpO1xuICAgIH0sIHV0aWwuY29weU9iamVjdChzdGF0ZS5xdWVyeVBhcmFtcykpO1xuICB9XG5cbiAgLypcbiAgKiBHZXQgb3IgU2V0IHNvbWUgYXJiaXRyYXJ5IGRhdGEgYnkga2V5IG9uIHRoaXMgc3RhdGUuXG4gICogY2hpbGQgc3RhdGVzIGhhdmUgYWNjZXNzIHRvIHRoZWlyIHBhcmVudHMnIGRhdGEuXG4gICpcbiAgKiBUaGlzIGNhbiBiZSB1c2VmdWwgd2hlbiB1c2luZyBleHRlcm5hbCBtb2RlbHMvc2VydmljZXNcbiAgKiBhcyBhIG1lYW4gdG8gY29tbXVuaWNhdGUgYmV0d2VlbiBzdGF0ZXMgaXMgbm90IGRlc2lyZWQuXG4gICovXG4gIGZ1bmN0aW9uIGRhdGEoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdGF0ZS5vd25EYXRhW2tleV0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudFN0YXRlID0gc3RhdGU7XG5cbiAgICB3aGlsZSAoY3VycmVudFN0YXRlLm93bkRhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmIGN1cnJlbnRTdGF0ZS5wYXJlbnQpIHtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRTdGF0ZS5wYXJlbnQ7XG4gICAgfXJldHVybiBjdXJyZW50U3RhdGUub3duRGF0YVtrZXldO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVB1YmxpY0FQSSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogc3RhdGUubmFtZSxcbiAgICAgIGZ1bGxOYW1lOiBzdGF0ZS5mdWxsTmFtZSxcbiAgICAgIHBhcmVudDogc3RhdGUucGFyZW50ICYmIHN0YXRlLnBhcmVudC5hc1B1YmxpYyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZWFjaENoaWxkU3RhdGUoY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHN0YXRlcykge1xuICAgICAgY2FsbGJhY2sobmFtZSwgc3RhdGVzW25hbWVdKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAqIFJldHVybnMgd2hldGhlciB0aGlzIHN0YXRlIG1hdGNoZXMgdGhlIHBhc3NlZCBwYXRoIEFycmF5LlxuICAqIEluIGNhc2Ugb2YgYSBtYXRjaCwgdGhlIGFjdHVhbCBwYXJhbSB2YWx1ZXMgYXJlIHJldHVybmVkLlxuICAqL1xuICBmdW5jdGlvbiBtYXRjaGVzKHBhdGhzKSB7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIHZhciBub25SZXN0U3RhdGVQYXRocyA9IHN0YXRlLnBhdGhzLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgcmV0dXJuIHBbcC5sZW5ndGggLSAxXSAhPSAnKic7XG4gICAgfSk7XG5cbiAgICAvKiBUaGlzIHN0YXRlIGhhcyBtb3JlIHBhdGhzIHRoYW4gdGhlIHBhc3NlZCBwYXRocywgaXQgY2Fubm90IGJlIGEgbWF0Y2ggKi9cbiAgICBpZiAobm9uUmVzdFN0YXRlUGF0aHMubGVuZ3RoID4gcGF0aHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvKiBDaGVja3MgaWYgdGhlIHBhdGhzIG1hdGNoIG9uZSBieSBvbmUgKi9cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGF0aCA9IHBhdGhzW2ldO1xuICAgICAgdmFyIHRoYXRQYXRoID0gc3RhdGUucGF0aHNbaV07XG5cbiAgICAgIC8qIFRoaXMgc3RhdGUgaGFzIGxlc3MgcGF0aHMgdGhhbiB0aGUgcGFzc2VkIHBhdGhzLCBpdCBjYW5ub3QgYmUgYSBtYXRjaCAqL1xuICAgICAgaWYgKCF0aGF0UGF0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB2YXIgaXNSZXN0ID0gdGhhdFBhdGhbdGhhdFBhdGgubGVuZ3RoIC0gMV0gPT0gJyonO1xuICAgICAgaWYgKGlzUmVzdCkge1xuICAgICAgICB2YXIgbmFtZSA9IHBhcmFtTmFtZSh0aGF0UGF0aCk7XG4gICAgICAgIHBhcmFtc1tuYW1lXSA9IHBhdGhzLnNsaWNlKGkpLmpvaW4oJy8nKTtcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgIH1cblxuICAgICAgdmFyIGlzRHluYW1pYyA9IHRoYXRQYXRoWzBdID09ICc6JztcbiAgICAgIGlmIChpc0R5bmFtaWMpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBwYXJhbU5hbWUodGhhdFBhdGgpO1xuICAgICAgICBwYXJhbXNbbmFtZV0gPSBwYXRoO1xuICAgICAgfSBlbHNlIGlmICh0aGF0UGF0aCAhPSBwYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qXG4gICogUmV0dXJucyBhIFVSSSBidWlsdCBmcm9tIHRoaXMgc3RhdGUgYW5kIHRoZSBwYXNzZWQgcGFyYW1zLlxuICAqL1xuICBmdW5jdGlvbiBpbnRlcnBvbGF0ZShwYXJhbXMpIHtcbiAgICB2YXIgcGF0aCA9IHN0YXRlLmZ1bGxQYXRoKCkucmVwbGFjZShQQVJBTVMsIGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gcGFyYW1zW3BhcmFtTmFtZShwKV0gfHwgJyc7XG4gICAgfSk7XG5cbiAgICB2YXIgcXVlcnlQYXJhbXMgPSBhbGxRdWVyeVBhcmFtcygpO1xuICAgIHZhciBwYXNzZWRRdWVyeVBhcmFtcyA9IE9iamVjdC5rZXlzKHBhcmFtcykuZmlsdGVyKGZ1bmN0aW9uIChwKSB7XG4gICAgICByZXR1cm4gcXVlcnlQYXJhbXNbcF07XG4gICAgfSk7XG5cbiAgICB2YXIgcXVlcnkgPSBwYXNzZWRRdWVyeVBhcmFtcy5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgIHJldHVybiBwICsgJz0nICsgcGFyYW1zW3BdO1xuICAgIH0pLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBwYXRoICsgKHF1ZXJ5Lmxlbmd0aCA/ICc/JyArIHF1ZXJ5IDogJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHN0YXRlLmZ1bGxOYW1lO1xuICB9XG5cbiAgc3RhdGUuaW5pdCA9IGluaXQ7XG4gIHN0YXRlLmZ1bGxQYXRoID0gZnVsbFBhdGg7XG4gIHN0YXRlLmFsbFF1ZXJ5UGFyYW1zID0gYWxsUXVlcnlQYXJhbXM7XG4gIHN0YXRlLm1hdGNoZXMgPSBtYXRjaGVzO1xuICBzdGF0ZS5pbnRlcnBvbGF0ZSA9IGludGVycG9sYXRlO1xuICBzdGF0ZS5kYXRhID0gZGF0YTtcbiAgc3RhdGUudG9TdHJpbmcgPSB0b1N0cmluZztcblxuICByZXR1cm4gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHBhcmFtTmFtZShwYXJhbSkge1xuICByZXR1cm4gcGFyYW1bcGFyYW0ubGVuZ3RoIC0gMV0gPT0gJyonID8gcGFyYW0uc3Vic3RyKDEpLnNsaWNlKDAsIC0xKSA6IHBhcmFtLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gcGF0aEZyb21VUkkodXJpKSB7XG4gIHJldHVybiAodXJpIHx8ICcnKS5zcGxpdCgnPycpWzBdO1xufVxuXG5mdW5jdGlvbiBwYXJhbXNGcm9tVVJJKHVyaSkge1xuICB2YXIgbWF0Y2hlcyA9IFBBUkFNUy5leGVjKHVyaSk7XG4gIHJldHVybiBtYXRjaGVzID8gdXRpbC5hcnJheVRvT2JqZWN0KG1hdGNoZXMubWFwKHBhcmFtTmFtZSkpIDoge307XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5UGFyYW1zRnJvbVVSSSh1cmkpIHtcbiAgdmFyIHF1ZXJ5ID0gKHVyaSB8fCAnJykuc3BsaXQoJz8nKVsxXTtcbiAgcmV0dXJuIHF1ZXJ5ID8gdXRpbC5hcnJheVRvT2JqZWN0KHF1ZXJ5LnNwbGl0KCcmJykpIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhdGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYWJ5c3NhL2xpYi9TdGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLyogUmVwcmVzZW50cyB0aGUgcHVibGljIEFQSSBvZiB0aGUgbGFzdCBpbnN0YW5jaWF0ZWQgcm91dGVyOyBVc2VmdWwgdG8gYnJlYWsgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGJldHdlZW4gcm91dGVyIGFuZCBpdHMgc3RhdGVzICovXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FieXNzYS9saWIvYXBpLmpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFwaSA9IHJlcXVpcmUoJy4vYXBpJyk7XG5cbi8qIFdyYXBzIGEgdGhlbm5hYmxlL3Byb21pc2UgYW5kIG9ubHkgcmVzb2x2ZSBpdCBpZiB0aGUgcm91dGVyIGRpZG4ndCB0cmFuc2l0aW9uIHRvIGFub3RoZXIgc3RhdGUgaW4gdGhlIG1lYW50aW1lICovXG5mdW5jdGlvbiBhc3luYyh3cmFwcGVkKSB7XG4gIHZhciBQcm9taXNlSW1wbCA9IGFzeW5jLlByb21pc2UgfHwgUHJvbWlzZTtcbiAgdmFyIGZpcmUgPSB0cnVlO1xuXG4gIGFwaS50cmFuc2l0aW9uLm9uY2UoJ3N0YXJ0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmlyZSA9IGZhbHNlO1xuICB9KTtcblxuICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgd3JhcHBlZC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKGZpcmUpIHJlc29sdmUodmFsdWUpO1xuICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChmaXJlKSByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2FieXNzYS9saWIvYXN5bmMuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgYWJ5c3NhXzEgPSByZXF1aXJlKCdhYnlzc2EnKTtcbnZhciBkb21wdGV1c2VfMSA9IHJlcXVpcmUoJ2RvbXB0ZXVzZScpO1xudmFyIGFjdGlvbl8xID0gcmVxdWlyZSgnLi9hY3Rpb24nKTtcbnZhciBpbmRleF8xID0gcmVxdWlyZSgnLi9pbmRleCcpO1xudmFyIGJsdWVfMSA9IHJlcXVpcmUoJy4vYmx1ZScpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZG9tcHRldXNlXzEuY29tcG9uZW50KHtcbiAgICBrZXk6ICdhcHAnLFxuICAgIHB1bGxTdGF0ZTogcHVsbFN0YXRlLFxuICAgIHJlbmRlcjogcmVuZGVyXG59KTtcbmZ1bmN0aW9uIHB1bGxTdGF0ZShzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvdW50OiBzdGF0ZS5ibHVlLmNvdW50LFxuICAgICAgICByb3V0ZTogc3RhdGUucm91dGUuZnVsbE5hbWVcbiAgICB9O1xufVxuZnVuY3Rpb24gcmVuZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHJldHVybiBkb21wdGV1c2VfMS5oKCdkaXYnLCBbXG4gICAgICAgIGRvbXB0ZXVzZV8xLmgoJ2hlYWRlcicsIFtcbiAgICAgICAgICAgIGRvbXB0ZXVzZV8xLmgoJ2EnLCB7IGF0dHJzOiB7IGhyZWY6IGFieXNzYV8xLmFwaS5saW5rKCdhcHAuaW5kZXgnKSwgJ2RhdGEtbmF2JzogJ21vdXNlZG93bicgfSB9LCAnSW5kZXgnKSxcbiAgICAgICAgICAgIGRvbXB0ZXVzZV8xLmgoJ2EnLCB7IGF0dHJzOiB7IGhyZWY6IGFieXNzYV8xLmFwaS5saW5rKCdhcHAuYmx1ZScsIHsgaWQ6IDMzIH0pLCAnZGF0YS1uYXYnOiAnbW91c2Vkb3duJyB9IH0sICdCbHVlJyksXG4gICAgICAgICAgICBTdHJpbmcoc3RhdGUuY291bnQpXG4gICAgICAgIF0pLFxuICAgICAgICBkb21wdGV1c2VfMS5oKCdtYWluJywgZ2V0Q2hpbGRyZW4oc3RhdGUucm91dGUpKVxuICAgIF0pO1xufVxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW4ocm91dGUpIHtcbiAgICBpZiAocm91dGUgPT09ICdhcHAuaW5kZXgnKVxuICAgICAgICByZXR1cm4gW2luZGV4XzEuZGVmYXVsdCgpXTtcbiAgICBpZiAocm91dGUuaW5kZXhPZignYXBwLmJsdWUnKSA9PT0gMClcbiAgICAgICAgcmV0dXJuIFtibHVlXzEuZGVmYXVsdCgpXTtcbn1cbnNldEludGVydmFsKGFjdGlvbl8xLmluY3JlbWVudEJsdWUsIDI1MDApO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9hcHAudHNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZmx1eHhfMSA9IHJlcXVpcmUoJ2ZsdXh4Jyk7XG5leHBvcnRzLmluY3JlbWVudEJsdWUgPSBmbHV4eF8xLkFjdGlvbignaW5jcmVtZW50Qmx1ZScpO1xuZXhwb3J0cy5yb3V0ZUNoYW5nZWQgPSBmbHV4eF8xLkFjdGlvbigncm91dGVDaGFuZ2VkJyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2FjdGlvbi50c1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBkb21wdGV1c2VfMSA9IHJlcXVpcmUoJ2RvbXB0ZXVzZScpO1xudmFyIGFuaW1hdGlvbl8xID0gcmVxdWlyZSgnLi9hbmltYXRpb24nKTtcbmZ1bmN0aW9uIGRlZmF1bHRfMSgpIHtcbiAgICByZXR1cm4gZG9tcHRldXNlXzEuaCgnaDEnLCB7IGhvb2s6IGFuaW1hdGlvbl8xLmNvbnRlbnRBbmltYXRpb24gfSwgJ0luZGV4Jyk7XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG47XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2luZGV4LnRzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIGdzYXBfMSA9IHJlcXVpcmUoJy4vZ3NhcCcpO1xudmFyIGFieXNzYV8xID0gcmVxdWlyZSgnYWJ5c3NhJyk7XG5leHBvcnRzLmNvbnRlbnRBbmltYXRpb24gPSB7XG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoXywgdm5vZGUpIHtcbiAgICAgICAgaWYgKCF2bm9kZS5lbG0gfHwgYWJ5c3NhXzEuYXBpLmlzRmlyc3RUcmFuc2l0aW9uKCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZub2RlLmVsbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBnc2FwXzEuVHdlZW5MaXRlLmZyb21Ubyh2bm9kZS5lbG0sIDAuMiwgeyBjc3M6IHsgb3BhY2l0eTogMCB9IH0sIHsgY3NzOiB7IG9wYWNpdHk6IDEgfSwgZGVsYXk6IDAuMjIgfSkuZXZlbnRDYWxsYmFjaygnb25TdGFydCcsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZub2RlLmVsbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnZGlzcGxheScpOyB9KTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHZub2RlLCBjYikge1xuICAgICAgICBpZiAoIXZub2RlLmVsbSlcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIGdzYXBfMS5Ud2VlbkxpdGUuZnJvbVRvKHZub2RlLmVsbSwgMC4yLCB7IGNzczogeyBvcGFjaXR5OiAxIH0gfSwgeyBjc3M6IHsgb3BhY2l0eTogMCB9IH0pLmV2ZW50Q2FsbGJhY2soJ29uQ29tcGxldGUnLCBjYik7XG4gICAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvYW5pbWF0aW9uLnRzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuLyoqKiBJTVBPUlRTIEZST00gaW1wb3J0cy1sb2FkZXIgKioqL1xudmFyIGRlZmluZSA9IGZhbHNlO1xucmVxdWlyZSgnZ3NhcC9zcmMvdW5jb21wcmVzc2VkL3BsdWdpbnMvQ1NTUGx1Z2luJyk7XG5yZXF1aXJlKCdnc2FwL3NyYy91bmNvbXByZXNzZWQvVHdlZW5MaXRlJyk7XG5leHBvcnRzLlR3ZWVuTGl0ZSA9IHdpbmRvdy5Ud2VlbkxpdGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2dzYXAudHNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqKiBJTVBPUlRTIEZST00gaW1wb3J0cy1sb2FkZXIgKioqL1xudmFyIGRlZmluZSA9IGZhbHNlO1xuXG4vKiFcbiAqIFZFUlNJT046IDEuMTguMlxuICogREFURTogMjAxNS0xMi0yMlxuICogVVBEQVRFUyBBTkQgRE9DUyBBVDogaHR0cDovL2dyZWVuc29jay5jb21cbiAqXG4gKiBAbGljZW5zZSBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxNiwgR3JlZW5Tb2NrLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVGhpcyB3b3JrIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIGF0IGh0dHA6Ly9ncmVlbnNvY2suY29tL3N0YW5kYXJkLWxpY2Vuc2Ugb3IgZm9yXG4gKiBDbHViIEdyZWVuU29jayBtZW1iZXJzLCB0aGUgc29mdHdhcmUgYWdyZWVtZW50IHRoYXQgd2FzIGlzc3VlZCB3aXRoIHlvdXIgbWVtYmVyc2hpcC5cbiAqIFxuICogQGF1dGhvcjogSmFjayBEb3lsZSwgamFja0BncmVlbnNvY2suY29tXG4gKi9cbnZhciBfZ3NTY29wZSA9ICh0eXBlb2YobW9kdWxlKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YoZ2xvYmFsKSAhPT0gXCJ1bmRlZmluZWRcIikgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdzsgLy9oZWxwcyBlbnN1cmUgY29tcGF0aWJpbGl0eSB3aXRoIEFNRC9SZXF1aXJlSlMgYW5kIENvbW1vbkpTL05vZGVcbihfZ3NTY29wZS5fZ3NRdWV1ZSB8fCAoX2dzU2NvcGUuX2dzUXVldWUgPSBbXSkpLnB1c2goIGZ1bmN0aW9uKCkge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdF9nc1Njb3BlLl9nc0RlZmluZShcInBsdWdpbnMuQ1NTUGx1Z2luXCIsIFtcInBsdWdpbnMuVHdlZW5QbHVnaW5cIixcIlR3ZWVuTGl0ZVwiXSwgZnVuY3Rpb24oVHdlZW5QbHVnaW4sIFR3ZWVuTGl0ZSkge1xuXG5cdFx0LyoqIEBjb25zdHJ1Y3RvciAqKi9cblx0XHR2YXIgQ1NTUGx1Z2luID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFR3ZWVuUGx1Z2luLmNhbGwodGhpcywgXCJjc3NcIik7XG5cdFx0XHRcdHRoaXMuX292ZXJ3cml0ZVByb3BzLmxlbmd0aCA9IDA7XG5cdFx0XHRcdHRoaXMuc2V0UmF0aW8gPSBDU1NQbHVnaW4ucHJvdG90eXBlLnNldFJhdGlvOyAvL3NwZWVkIG9wdGltaXphdGlvbiAoYXZvaWQgcHJvdG90eXBlIGxvb2t1cCBvbiB0aGlzIFwiaG90XCIgbWV0aG9kKVxuXHRcdFx0fSxcblx0XHRcdF9nbG9iYWxzID0gX2dzU2NvcGUuX2dzRGVmaW5lLmdsb2JhbHMsXG5cdFx0XHRfaGFzUHJpb3JpdHksIC8vdHVybnMgdHJ1ZSB3aGVuZXZlciBhIENTU1Byb3BUd2VlbiBpbnN0YW5jZSBpcyBjcmVhdGVkIHRoYXQgaGFzIGEgcHJpb3JpdHkgb3RoZXIgdGhhbiAwLiBUaGlzIGhlbHBzIHVzIGRpc2Nlcm4gd2hldGhlciBvciBub3Qgd2Ugc2hvdWxkIHNwZW5kIHRoZSB0aW1lIG9yZ2FuaXppbmcgdGhlIGxpbmtlZCBsaXN0IG9yIG5vdCBhZnRlciBhIENTU1BsdWdpbidzIF9vbkluaXRUd2VlbigpIG1ldGhvZCBpcyBjYWxsZWQuXG5cdFx0XHRfc3VmZml4TWFwLCAvL3dlIHNldCB0aGlzIGluIF9vbkluaXRUd2VlbigpIGVhY2ggdGltZSBhcyBhIHdheSB0byBoYXZlIGEgcGVyc2lzdGVudCB2YXJpYWJsZSB3ZSBjYW4gdXNlIGluIG90aGVyIG1ldGhvZHMgbGlrZSBfcGFyc2UoKSB3aXRob3V0IGhhdmluZyB0byBwYXNzIGl0IGFyb3VuZCBhcyBhIHBhcmFtZXRlciBhbmQgd2Uga2VlcCBfcGFyc2UoKSBkZWNvdXBsZWQgZnJvbSBhIHBhcnRpY3VsYXIgQ1NTUGx1Z2luIGluc3RhbmNlXG5cdFx0XHRfY3MsIC8vY29tcHV0ZWQgc3R5bGUgKHdlIHN0b3JlIHRoaXMgaW4gYSBzaGFyZWQgdmFyaWFibGUgdG8gY29uc2VydmUgbWVtb3J5IGFuZCBtYWtlIG1pbmlmaWNhdGlvbiB0aWdodGVyXG5cdFx0XHRfb3ZlcndyaXRlUHJvcHMsIC8vYWxpYXMgdG8gdGhlIGN1cnJlbnRseSBpbnN0YW50aWF0aW5nIENTU1BsdWdpbidzIF9vdmVyd3JpdGVQcm9wcyBhcnJheS4gV2UgdXNlIHRoaXMgY2xvc3VyZSBpbiBvcmRlciB0byBhdm9pZCBoYXZpbmcgdG8gcGFzcyBhIHJlZmVyZW5jZSBhcm91bmQgZnJvbSBtZXRob2QgdG8gbWV0aG9kIGFuZCBhaWQgaW4gbWluaWZpY2F0aW9uLlxuXHRcdFx0X3NwZWNpYWxQcm9wcyA9IHt9LFxuXHRcdFx0cCA9IENTU1BsdWdpbi5wcm90b3R5cGUgPSBuZXcgVHdlZW5QbHVnaW4oXCJjc3NcIik7XG5cblx0XHRwLmNvbnN0cnVjdG9yID0gQ1NTUGx1Z2luO1xuXHRcdENTU1BsdWdpbi52ZXJzaW9uID0gXCIxLjE4LjJcIjtcblx0XHRDU1NQbHVnaW4uQVBJID0gMjtcblx0XHRDU1NQbHVnaW4uZGVmYXVsdFRyYW5zZm9ybVBlcnNwZWN0aXZlID0gMDtcblx0XHRDU1NQbHVnaW4uZGVmYXVsdFNrZXdUeXBlID0gXCJjb21wZW5zYXRlZFwiO1xuXHRcdENTU1BsdWdpbi5kZWZhdWx0U21vb3RoT3JpZ2luID0gdHJ1ZTtcblx0XHRwID0gXCJweFwiOyAvL3dlJ2xsIHJldXNlIHRoZSBcInBcIiB2YXJpYWJsZSB0byBrZWVwIGZpbGUgc2l6ZSBkb3duXG5cdFx0Q1NTUGx1Z2luLnN1ZmZpeE1hcCA9IHt0b3A6cCwgcmlnaHQ6cCwgYm90dG9tOnAsIGxlZnQ6cCwgd2lkdGg6cCwgaGVpZ2h0OnAsIGZvbnRTaXplOnAsIHBhZGRpbmc6cCwgbWFyZ2luOnAsIHBlcnNwZWN0aXZlOnAsIGxpbmVIZWlnaHQ6XCJcIn07XG5cblxuXHRcdHZhciBfbnVtRXhwID0gLyg/OlxcZHxcXC1cXGR8XFwuXFxkfFxcLVxcLlxcZCkrL2csXG5cdFx0XHRfcmVsTnVtRXhwID0gLyg/OlxcZHxcXC1cXGR8XFwuXFxkfFxcLVxcLlxcZHxcXCs9XFxkfFxcLT1cXGR8XFwrPS5cXGR8XFwtPVxcLlxcZCkrL2csXG5cdFx0XHRfdmFsdWVzRXhwID0gLyg/OlxcKz18XFwtPXxcXC18XFxiKVtcXGRcXC1cXC5dK1thLXpBLVowLTldKig/OiV8XFxiKS9naSwgLy9maW5kcyBhbGwgdGhlIHZhbHVlcyB0aGF0IGJlZ2luIHdpdGggbnVtYmVycyBvciArPSBvciAtPSBhbmQgdGhlbiBhIG51bWJlci4gSW5jbHVkZXMgc3VmZml4ZXMuIFdlIHVzZSB0aGlzIHRvIHNwbGl0IGNvbXBsZXggdmFsdWVzIGFwYXJ0IGxpa2UgXCIxcHggNXB4IDIwcHggcmdiKDI1NSwxMDIsNTEpXCJcblx0XHRcdF9OYU5FeHAgPSAvKD8hWystXT9cXGQqXFwuP1xcZCt8WystXXxlWystXVxcZCspW14wLTldL2csIC8vYWxzbyBhbGxvd3Mgc2NpZW50aWZpYyBub3RhdGlvbiBhbmQgZG9lc24ndCBraWxsIHRoZSBsZWFkaW5nIC0vKyBpbiAtPSBhbmQgKz1cblx0XHRcdF9zdWZmaXhFeHAgPSAvKD86XFxkfFxcLXxcXCt8PXwjfFxcLikqL2csXG5cdFx0XHRfb3BhY2l0eUV4cCA9IC9vcGFjaXR5ICo9ICooW14pXSopL2ksXG5cdFx0XHRfb3BhY2l0eVZhbEV4cCA9IC9vcGFjaXR5OihbXjtdKikvaSxcblx0XHRcdF9hbHBoYUZpbHRlckV4cCA9IC9hbHBoYVxcKG9wYWNpdHkgKj0uKz9cXCkvaSxcblx0XHRcdF9yZ2Joc2xFeHAgPSAvXihyZ2J8aHNsKS8sXG5cdFx0XHRfY2Fwc0V4cCA9IC8oW0EtWl0pL2csXG5cdFx0XHRfY2FtZWxFeHAgPSAvLShbYS16XSkvZ2ksXG5cdFx0XHRfdXJsRXhwID0gLyheKD86dXJsXFwoXFxcInx1cmxcXCgpKXwoPzooXFxcIlxcKSkkfFxcKSQpL2dpLCAvL2ZvciBwdWxsaW5nIG91dCB1cmxzIGZyb20gdXJsKC4uLikgb3IgdXJsKFwiLi4uXCIpIHN0cmluZ3MgKHNvbWUgYnJvd3NlcnMgd3JhcCB1cmxzIGluIHF1b3Rlcywgc29tZSBkb24ndCB3aGVuIHJlcG9ydGluZyB0aGluZ3MgbGlrZSBiYWNrZ3JvdW5kSW1hZ2UpXG5cdFx0XHRfY2FtZWxGdW5jID0gZnVuY3Rpb24ocywgZykgeyByZXR1cm4gZy50b1VwcGVyQ2FzZSgpOyB9LFxuXHRcdFx0X2hvcml6RXhwID0gLyg/OkxlZnR8UmlnaHR8V2lkdGgpL2ksXG5cdFx0XHRfaWVHZXRNYXRyaXhFeHAgPSAvKE0xMXxNMTJ8TTIxfE0yMik9W1xcZFxcLVxcLmVdKy9naSxcblx0XHRcdF9pZVNldE1hdHJpeEV4cCA9IC9wcm9naWRcXDpEWEltYWdlVHJhbnNmb3JtXFwuTWljcm9zb2Z0XFwuTWF0cml4XFwoLis/XFwpL2ksXG5cdFx0XHRfY29tbWFzT3V0c2lkZVBhcmVuRXhwID0gLywoPz1bXlxcKV0qKD86XFwofCQpKS9naSwgLy9maW5kcyBhbnkgY29tbWFzIHRoYXQgYXJlIG5vdCB3aXRoaW4gcGFyZW50aGVzaXNcblx0XHRcdF9ERUcyUkFEID0gTWF0aC5QSSAvIDE4MCxcblx0XHRcdF9SQUQyREVHID0gMTgwIC8gTWF0aC5QSSxcblx0XHRcdF9mb3JjZVBUID0ge30sXG5cdFx0XHRfZG9jID0gZG9jdW1lbnQsXG5cdFx0XHRfY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIF9kb2MuY3JlYXRlRWxlbWVudE5TID8gX2RvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCIsIHR5cGUpIDogX2RvYy5jcmVhdGVFbGVtZW50KHR5cGUpO1xuXHRcdFx0fSxcblx0XHRcdF90ZW1wRGl2ID0gX2NyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG5cdFx0XHRfdGVtcEltZyA9IF9jcmVhdGVFbGVtZW50KFwiaW1nXCIpLFxuXHRcdFx0X2ludGVybmFscyA9IENTU1BsdWdpbi5faW50ZXJuYWxzID0ge19zcGVjaWFsUHJvcHM6X3NwZWNpYWxQcm9wc30sIC8vcHJvdmlkZXMgYSBob29rIHRvIGEgZmV3IGludGVybmFsIG1ldGhvZHMgdGhhdCB3ZSBuZWVkIHRvIGFjY2VzcyBmcm9tIGluc2lkZSBvdGhlciBwbHVnaW5zXG5cdFx0XHRfYWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LFxuXHRcdFx0X2F1dG9Sb3VuZCxcblx0XHRcdF9yZXFTYWZhcmlGaXgsIC8vd2Ugd29uJ3QgYXBwbHkgdGhlIFNhZmFyaSB0cmFuc2Zvcm0gZml4IHVudGlsIHdlIGFjdHVhbGx5IGNvbWUgYWNyb3NzIGEgdHdlZW4gdGhhdCBhZmZlY3RzIGEgdHJhbnNmb3JtIHByb3BlcnR5ICh0byBtYWludGFpbiBiZXN0IHBlcmZvcm1hbmNlKS5cblxuXHRcdFx0X2lzU2FmYXJpLFxuXHRcdFx0X2lzRmlyZWZveCwgLy9GaXJlZm94IGhhcyBhIGJ1ZyB0aGF0IGNhdXNlcyAzRCB0cmFuc2Zvcm1lZCBlbGVtZW50cyB0byByYW5kb21seSBkaXNhcHBlYXIgdW5sZXNzIGEgcmVwYWludCBpcyBmb3JjZWQgYWZ0ZXIgZWFjaCB1cGRhdGUgb24gZWFjaCBlbGVtZW50LlxuXHRcdFx0X2lzU2FmYXJpTFQ2LCAvL1NhZmFyaSAoYW5kIEFuZHJvaWQgNCB3aGljaCB1c2VzIGEgZmxhdm9yIG9mIFNhZmFyaSkgaGFzIGEgYnVnIHRoYXQgcHJldmVudHMgY2hhbmdlcyB0byBcInRvcFwiIGFuZCBcImxlZnRcIiBwcm9wZXJ0aWVzIGZyb20gcmVuZGVyaW5nIHByb3Blcmx5IGlmIGNoYW5nZWQgb24gdGhlIHNhbWUgZnJhbWUgYXMgYSB0cmFuc2Zvcm0gVU5MRVNTIHdlIHNldCB0aGUgZWxlbWVudCdzIFdlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eSB0byBoaWRkZW4gKHdlaXJkLCBJIGtub3cpLiBEb2luZyB0aGlzIGZvciBBbmRyb2lkIDMgYW5kIGVhcmxpZXIgc2VlbXMgdG8gYWN0dWFsbHkgY2F1c2Ugb3RoZXIgcHJvYmxlbXMsIHRob3VnaCAoZnVuISlcblx0XHRcdF9pZVZlcnMsXG5cdFx0XHRfc3VwcG9ydHNPcGFjaXR5ID0gKGZ1bmN0aW9uKCkgeyAvL3dlIHNldCBfaXNTYWZhcmksIF9pZVZlcnMsIF9pc0ZpcmVmb3gsIGFuZCBfc3VwcG9ydHNPcGFjaXR5IGFsbCBpbiBvbmUgZnVuY3Rpb24gaGVyZSB0byByZWR1Y2UgZmlsZSBzaXplIHNsaWdodGx5LCBlc3BlY2lhbGx5IGluIHRoZSBtaW5pZmllZCB2ZXJzaW9uLlxuXHRcdFx0XHR2YXIgaSA9IF9hZ2VudC5pbmRleE9mKFwiQW5kcm9pZFwiKSxcblx0XHRcdFx0XHRhID0gX2NyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXHRcdFx0XHRfaXNTYWZhcmkgPSAoX2FnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT09IC0xICYmIF9hZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpID09PSAtMSAmJiAoaSA9PT0gLTEgfHwgTnVtYmVyKF9hZ2VudC5zdWJzdHIoaSs4LCAxKSkgPiAzKSk7XG5cdFx0XHRcdF9pc1NhZmFyaUxUNiA9IChfaXNTYWZhcmkgJiYgKE51bWJlcihfYWdlbnQuc3Vic3RyKF9hZ2VudC5pbmRleE9mKFwiVmVyc2lvbi9cIikrOCwgMSkpIDwgNikpO1xuXHRcdFx0XHRfaXNGaXJlZm94ID0gKF9hZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPT0gLTEpO1xuXHRcdFx0XHRpZiAoKC9NU0lFIChbMC05XXsxLH1bXFwuMC05XXswLH0pLykuZXhlYyhfYWdlbnQpIHx8ICgvVHJpZGVudFxcLy4qcnY6KFswLTldezEsfVtcXC4wLTldezAsfSkvKS5leGVjKF9hZ2VudCkpIHtcblx0XHRcdFx0XHRfaWVWZXJzID0gcGFyc2VGbG9hdCggUmVnRXhwLiQxICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGEuc3R5bGUuY3NzVGV4dCA9IFwidG9wOjFweDtvcGFjaXR5Oi41NTtcIjtcblx0XHRcdFx0cmV0dXJuIC9eMC41NS8udGVzdChhLnN0eWxlLm9wYWNpdHkpO1xuXHRcdFx0fSgpKSxcblx0XHRcdF9nZXRJRU9wYWNpdHkgPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHJldHVybiAoX29wYWNpdHlFeHAudGVzdCggKCh0eXBlb2YodikgPT09IFwic3RyaW5nXCIpID8gdiA6ICh2LmN1cnJlbnRTdHlsZSA/IHYuY3VycmVudFN0eWxlLmZpbHRlciA6IHYuc3R5bGUuZmlsdGVyKSB8fCBcIlwiKSApID8gKCBwYXJzZUZsb2F0KCBSZWdFeHAuJDEgKSAvIDEwMCApIDogMSk7XG5cdFx0XHR9LFxuXHRcdFx0X2xvZyA9IGZ1bmN0aW9uKHMpIHsvL2ZvciBsb2dnaW5nIG1lc3NhZ2VzLCBidXQgaW4gYSB3YXkgdGhhdCB3b24ndCB0aHJvdyBlcnJvcnMgaW4gb2xkIHZlcnNpb25zIG9mIElFLlxuXHRcdFx0XHRpZiAod2luZG93LmNvbnNvbGUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0X3ByZWZpeENTUyA9IFwiXCIsIC8vdGhlIG5vbi1jYW1lbENhc2UgdmVuZG9yIHByZWZpeCBsaWtlIFwiLW8tXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIG9yIFwiLXdlYmtpdC1cIlxuXHRcdFx0X3ByZWZpeCA9IFwiXCIsIC8vY2FtZWxDYXNlIHZlbmRvciBwcmVmaXggbGlrZSBcIk9cIiwgXCJtc1wiLCBcIldlYmtpdFwiLCBvciBcIk1velwiLlxuXG5cdFx0XHQvLyBAcHJpdmF0ZSBmZWVkIGluIGEgY2FtZWxDYXNlIHByb3BlcnR5IG5hbWUgbGlrZSBcInRyYW5zZm9ybVwiIGFuZCBpdCB3aWxsIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyB2YWxpZCBhcy1pcyBvciBpZiBpdCBuZWVkcyBhIHZlbmRvciBwcmVmaXguIEl0IHJldHVybnMgdGhlIGNvcnJlY3RlZCBjYW1lbENhc2UgcHJvcGVydHkgbmFtZSAoaS5lLiBcIldlYmtpdFRyYW5zZm9ybVwiIG9yIFwiTW96VHJhbnNmb3JtXCIgb3IgXCJ0cmFuc2Zvcm1cIiBvciBudWxsIGlmIG5vIHN1Y2ggcHJvcGVydHkgaXMgZm91bmQsIGxpa2UgaWYgdGhlIGJyb3dzZXIgaXMgSUU4IG9yIGJlZm9yZSwgXCJ0cmFuc2Zvcm1cIiB3b24ndCBiZSBmb3VuZCBhdCBhbGwpXG5cdFx0XHRfY2hlY2tQcm9wUHJlZml4ID0gZnVuY3Rpb24ocCwgZSkge1xuXHRcdFx0XHRlID0gZSB8fCBfdGVtcERpdjtcblx0XHRcdFx0dmFyIHMgPSBlLnN0eWxlLFxuXHRcdFx0XHRcdGEsIGk7XG5cdFx0XHRcdGlmIChzW3BdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gcDtcblx0XHRcdFx0fVxuXHRcdFx0XHRwID0gcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHAuc3Vic3RyKDEpO1xuXHRcdFx0XHRhID0gW1wiT1wiLFwiTW96XCIsXCJtc1wiLFwiTXNcIixcIldlYmtpdFwiXTtcblx0XHRcdFx0aSA9IDU7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSAmJiBzW2FbaV0rcF0gPT09IHVuZGVmaW5lZCkgeyB9XG5cdFx0XHRcdGlmIChpID49IDApIHtcblx0XHRcdFx0XHRfcHJlZml4ID0gKGkgPT09IDMpID8gXCJtc1wiIDogYVtpXTtcblx0XHRcdFx0XHRfcHJlZml4Q1NTID0gXCItXCIgKyBfcHJlZml4LnRvTG93ZXJDYXNlKCkgKyBcIi1cIjtcblx0XHRcdFx0XHRyZXR1cm4gX3ByZWZpeCArIHA7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9LFxuXG5cdFx0XHRfZ2V0Q29tcHV0ZWRTdHlsZSA9IF9kb2MuZGVmYXVsdFZpZXcgPyBfZG9jLmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUgOiBmdW5jdGlvbigpIHt9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwcml2YXRlIFJldHVybnMgdGhlIGNzcyBzdHlsZSBmb3IgYSBwYXJ0aWN1bGFyIHByb3BlcnR5IG9mIGFuIGVsZW1lbnQuIEZvciBleGFtcGxlLCB0byBnZXQgd2hhdGV2ZXIgdGhlIGN1cnJlbnQgXCJsZWZ0XCIgY3NzIHZhbHVlIGZvciBhbiBlbGVtZW50IHdpdGggYW4gSUQgb2YgXCJteUVsZW1lbnRcIiwgeW91IGNvdWxkIGRvOlxuXHRcdFx0ICogdmFyIGN1cnJlbnRMZWZ0ID0gQ1NTUGx1Z2luLmdldFN0eWxlKCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RWxlbWVudFwiKSwgXCJsZWZ0XCIpO1xuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7IU9iamVjdH0gdCBUYXJnZXQgZWxlbWVudCB3aG9zZSBzdHlsZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBxdWVyeVxuXHRcdFx0ICogQHBhcmFtIHshc3RyaW5nfSBwIFByb3BlcnR5IG5hbWUgKGxpa2UgXCJsZWZ0XCIgb3IgXCJ0b3BcIiBvciBcIm1hcmdpblRvcFwiLCBldGMuKVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3Q9fSBjcyBDb21wdXRlZCBzdHlsZSBvYmplY3QuIFRoaXMganVzdCBwcm92aWRlcyBhIHdheSB0byBzcGVlZCBwcm9jZXNzaW5nIGlmIHlvdSdyZSBnb2luZyB0byBnZXQgc2V2ZXJhbCBwcm9wZXJ0aWVzIG9uIHRoZSBzYW1lIGVsZW1lbnQgaW4gcXVpY2sgc3VjY2Vzc2lvbiAtIHlvdSBjYW4gcmV1c2UgdGhlIHJlc3VsdCBvZiB0aGUgZ2V0Q29tcHV0ZWRTdHlsZSgpIGNhbGwuXG5cdFx0XHQgKiBAcGFyYW0ge2Jvb2xlYW49fSBjYWxjIElmIHRydWUsIHRoZSB2YWx1ZSB3aWxsIG5vdCBiZSByZWFkIGRpcmVjdGx5IGZyb20gdGhlIGVsZW1lbnQncyBcInN0eWxlXCIgcHJvcGVydHkgKGlmIGl0IGV4aXN0cyB0aGVyZSksIGJ1dCBpbnN0ZWFkIHRoZSBnZXRDb21wdXRlZFN0eWxlKCkgcmVzdWx0IHdpbGwgYmUgdXNlZC4gVGhpcyBjYW4gYmUgdXNlZnVsIHdoZW4geW91IHdhbnQgdG8gZW5zdXJlIHRoYXQgdGhlIGJyb3dzZXIgaXRzZWxmIGlzIGludGVycHJldGluZyB0aGUgdmFsdWUuXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZz19IGRmbHQgRGVmYXVsdCB2YWx1ZSB0aGF0IHNob3VsZCBiZSByZXR1cm5lZCBpbiB0aGUgcGxhY2Ugb2YgbnVsbCwgXCJub25lXCIsIFwiYXV0b1wiIG9yIFwiYXV0byBhdXRvXCIuXG5cdFx0XHQgKiBAcmV0dXJuIHs/c3RyaW5nfSBUaGUgY3VycmVudCBwcm9wZXJ0eSB2YWx1ZVxuXHRcdFx0ICovXG5cdFx0XHRfZ2V0U3R5bGUgPSBDU1NQbHVnaW4uZ2V0U3R5bGUgPSBmdW5jdGlvbih0LCBwLCBjcywgY2FsYywgZGZsdCkge1xuXHRcdFx0XHR2YXIgcnY7XG5cdFx0XHRcdGlmICghX3N1cHBvcnRzT3BhY2l0eSkgaWYgKHAgPT09IFwib3BhY2l0eVwiKSB7IC8vc2V2ZXJhbCB2ZXJzaW9ucyBvZiBJRSBkb24ndCB1c2UgdGhlIHN0YW5kYXJkIFwib3BhY2l0eVwiIHByb3BlcnR5IC0gdGhleSB1c2UgdGhpbmdzIGxpa2UgZmlsdGVyOmFscGhhKG9wYWNpdHk9NTApLCBzbyB3ZSBwYXJzZSB0aGF0IGhlcmUuXG5cdFx0XHRcdFx0cmV0dXJuIF9nZXRJRU9wYWNpdHkodCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFjYWxjICYmIHQuc3R5bGVbcF0pIHtcblx0XHRcdFx0XHRydiA9IHQuc3R5bGVbcF07XG5cdFx0XHRcdH0gZWxzZSBpZiAoKGNzID0gY3MgfHwgX2dldENvbXB1dGVkU3R5bGUodCkpKSB7XG5cdFx0XHRcdFx0cnYgPSBjc1twXSB8fCBjcy5nZXRQcm9wZXJ0eVZhbHVlKHApIHx8IGNzLmdldFByb3BlcnR5VmFsdWUocC5yZXBsYWNlKF9jYXBzRXhwLCBcIi0kMVwiKS50b0xvd2VyQ2FzZSgpKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0LmN1cnJlbnRTdHlsZSkge1xuXHRcdFx0XHRcdHJ2ID0gdC5jdXJyZW50U3R5bGVbcF07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIChkZmx0ICE9IG51bGwgJiYgKCFydiB8fCBydiA9PT0gXCJub25lXCIgfHwgcnYgPT09IFwiYXV0b1wiIHx8IHJ2ID09PSBcImF1dG8gYXV0b1wiKSkgPyBkZmx0IDogcnY7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwcml2YXRlIFBhc3MgdGhlIHRhcmdldCBlbGVtZW50LCB0aGUgcHJvcGVydHkgbmFtZSwgdGhlIG51bWVyaWMgdmFsdWUsIGFuZCB0aGUgc3VmZml4IChsaWtlIFwiJVwiLCBcImVtXCIsIFwicHhcIiwgZXRjLikgYW5kIGl0IHdpbGwgc3BpdCBiYWNrIHRoZSBlcXVpdmFsZW50IHBpeGVsIG51bWJlci5cblx0XHRcdCAqIEBwYXJhbSB7IU9iamVjdH0gdCBUYXJnZXQgZWxlbWVudFxuXHRcdFx0ICogQHBhcmFtIHshc3RyaW5nfSBwIFByb3BlcnR5IG5hbWUgKGxpa2UgXCJsZWZ0XCIsIFwidG9wXCIsIFwibWFyZ2luTGVmdFwiLCBldGMuKVxuXHRcdFx0ICogQHBhcmFtIHshbnVtYmVyfSB2IFZhbHVlXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZz19IHNmeCBTdWZmaXggKGxpa2UgXCJweFwiIG9yIFwiJVwiIG9yIFwiZW1cIilcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlY3Vyc2UgSWYgdHJ1ZSwgdGhlIGNhbGwgaXMgYSByZWN1cnNpdmUgb25lLiBJbiBzb21lIGJyb3dzZXJzIChsaWtlIElFNy84KSwgb2NjYXNpb25hbGx5IHRoZSB2YWx1ZSBpc24ndCBhY2N1cmF0ZWx5IHJlcG9ydGVkIGluaXRpYWxseSwgYnV0IGlmIHdlIHJ1biB0aGUgZnVuY3Rpb24gYWdhaW4gaXQgd2lsbCB0YWtlIGVmZmVjdC5cblx0XHRcdCAqIEByZXR1cm4ge251bWJlcn0gdmFsdWUgaW4gcGl4ZWxzXG5cdFx0XHQgKi9cblx0XHRcdF9jb252ZXJ0VG9QaXhlbHMgPSBfaW50ZXJuYWxzLmNvbnZlcnRUb1BpeGVscyA9IGZ1bmN0aW9uKHQsIHAsIHYsIHNmeCwgcmVjdXJzZSkge1xuXHRcdFx0XHRpZiAoc2Z4ID09PSBcInB4XCIgfHwgIXNmeCkgeyByZXR1cm4gdjsgfVxuXHRcdFx0XHRpZiAoc2Z4ID09PSBcImF1dG9cIiB8fCAhdikgeyByZXR1cm4gMDsgfVxuXHRcdFx0XHR2YXIgaG9yaXogPSBfaG9yaXpFeHAudGVzdChwKSxcblx0XHRcdFx0XHRub2RlID0gdCxcblx0XHRcdFx0XHRzdHlsZSA9IF90ZW1wRGl2LnN0eWxlLFxuXHRcdFx0XHRcdG5lZyA9ICh2IDwgMCksXG5cdFx0XHRcdFx0cGl4LCBjYWNoZSwgdGltZTtcblx0XHRcdFx0aWYgKG5lZykge1xuXHRcdFx0XHRcdHYgPSAtdjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoc2Z4ID09PSBcIiVcIiAmJiBwLmluZGV4T2YoXCJib3JkZXJcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0cGl4ID0gKHYgLyAxMDApICogKGhvcml6ID8gdC5jbGllbnRXaWR0aCA6IHQuY2xpZW50SGVpZ2h0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdHlsZS5jc3NUZXh0ID0gXCJib3JkZXI6MCBzb2xpZCByZWQ7cG9zaXRpb246XCIgKyBfZ2V0U3R5bGUodCwgXCJwb3NpdGlvblwiKSArIFwiO2xpbmUtaGVpZ2h0OjA7XCI7XG5cdFx0XHRcdFx0aWYgKHNmeCA9PT0gXCIlXCIgfHwgIW5vZGUuYXBwZW5kQ2hpbGQgfHwgc2Z4LmNoYXJBdCgwKSA9PT0gXCJ2XCIgfHwgc2Z4ID09PSBcInJlbVwiKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gdC5wYXJlbnROb2RlIHx8IF9kb2MuYm9keTtcblx0XHRcdFx0XHRcdGNhY2hlID0gbm9kZS5fZ3NDYWNoZTtcblx0XHRcdFx0XHRcdHRpbWUgPSBUd2VlbkxpdGUudGlja2VyLmZyYW1lO1xuXHRcdFx0XHRcdFx0aWYgKGNhY2hlICYmIGhvcml6ICYmIGNhY2hlLnRpbWUgPT09IHRpbWUpIHsgLy9wZXJmb3JtYW5jZSBvcHRpbWl6YXRpb246IHdlIHJlY29yZCB0aGUgd2lkdGggb2YgZWxlbWVudHMgYWxvbmcgd2l0aCB0aGUgdGlja2VyIGZyYW1lIHNvIHRoYXQgd2UgY2FuIHF1aWNrbHkgZ2V0IGl0IGFnYWluIG9uIHRoZSBzYW1lIHRpY2sgKHNlZW1zIHJlbGF0aXZlbHkgc2FmZSB0byBhc3N1bWUgaXQgd291bGRuJ3QgY2hhbmdlIG9uIHRoZSBzYW1lIHRpY2spXG5cdFx0XHRcdFx0XHRcdHJldHVybiBjYWNoZS53aWR0aCAqIHYgLyAxMDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzdHlsZVsoaG9yaXogPyBcIndpZHRoXCIgOiBcImhlaWdodFwiKV0gPSB2ICsgc2Z4O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzdHlsZVsoaG9yaXogPyBcImJvcmRlckxlZnRXaWR0aFwiIDogXCJib3JkZXJUb3BXaWR0aFwiKV0gPSB2ICsgc2Z4O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRub2RlLmFwcGVuZENoaWxkKF90ZW1wRGl2KTtcblx0XHRcdFx0XHRwaXggPSBwYXJzZUZsb2F0KF90ZW1wRGl2Wyhob3JpeiA/IFwib2Zmc2V0V2lkdGhcIiA6IFwib2Zmc2V0SGVpZ2h0XCIpXSk7XG5cdFx0XHRcdFx0bm9kZS5yZW1vdmVDaGlsZChfdGVtcERpdik7XG5cdFx0XHRcdFx0aWYgKGhvcml6ICYmIHNmeCA9PT0gXCIlXCIgJiYgQ1NTUGx1Z2luLmNhY2hlV2lkdGhzICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0Y2FjaGUgPSBub2RlLl9nc0NhY2hlID0gbm9kZS5fZ3NDYWNoZSB8fCB7fTtcblx0XHRcdFx0XHRcdGNhY2hlLnRpbWUgPSB0aW1lO1xuXHRcdFx0XHRcdFx0Y2FjaGUud2lkdGggPSBwaXggLyB2ICogMTAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocGl4ID09PSAwICYmICFyZWN1cnNlKSB7XG5cdFx0XHRcdFx0XHRwaXggPSBfY29udmVydFRvUGl4ZWxzKHQsIHAsIHYsIHNmeCwgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBuZWcgPyAtcGl4IDogcGl4O1xuXHRcdFx0fSxcblx0XHRcdF9jYWxjdWxhdGVPZmZzZXQgPSBfaW50ZXJuYWxzLmNhbGN1bGF0ZU9mZnNldCA9IGZ1bmN0aW9uKHQsIHAsIGNzKSB7IC8vZm9yIGZpZ3VyaW5nIG91dCBcInRvcFwiIG9yIFwibGVmdFwiIGluIHB4IHdoZW4gaXQncyBcImF1dG9cIi4gV2UgbmVlZCB0byBmYWN0b3IgaW4gbWFyZ2luIHdpdGggdGhlIG9mZnNldExlZnQvb2Zmc2V0VG9wXG5cdFx0XHRcdGlmIChfZ2V0U3R5bGUodCwgXCJwb3NpdGlvblwiLCBjcykgIT09IFwiYWJzb2x1dGVcIikgeyByZXR1cm4gMDsgfVxuXHRcdFx0XHR2YXIgZGltID0gKChwID09PSBcImxlZnRcIikgPyBcIkxlZnRcIiA6IFwiVG9wXCIpLFxuXHRcdFx0XHRcdHYgPSBfZ2V0U3R5bGUodCwgXCJtYXJnaW5cIiArIGRpbSwgY3MpO1xuXHRcdFx0XHRyZXR1cm4gdFtcIm9mZnNldFwiICsgZGltXSAtIChfY29udmVydFRvUGl4ZWxzKHQsIHAsIHBhcnNlRmxvYXQodiksIHYucmVwbGFjZShfc3VmZml4RXhwLCBcIlwiKSkgfHwgMCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBAcHJpdmF0ZSByZXR1cm5zIGF0IG9iamVjdCBjb250YWluaW5nIEFMTCBvZiB0aGUgc3R5bGUgcHJvcGVydGllcyBpbiBjYW1lbENhc2UgYW5kIHRoZWlyIGFzc29jaWF0ZWQgdmFsdWVzLlxuXHRcdFx0X2dldEFsbFN0eWxlcyA9IGZ1bmN0aW9uKHQsIGNzKSB7XG5cdFx0XHRcdHZhciBzID0ge30sXG5cdFx0XHRcdFx0aSwgdHIsIHA7XG5cdFx0XHRcdGlmICgoY3MgPSBjcyB8fCBfZ2V0Q29tcHV0ZWRTdHlsZSh0LCBudWxsKSkpIHtcblx0XHRcdFx0XHRpZiAoKGkgPSBjcy5sZW5ndGgpKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0cCA9IGNzW2ldO1xuXHRcdFx0XHRcdFx0XHRpZiAocC5pbmRleE9mKFwiLXRyYW5zZm9ybVwiKSA9PT0gLTEgfHwgX3RyYW5zZm9ybVByb3BDU1MgPT09IHApIHsgLy9Tb21lIHdlYmtpdCBicm93c2VycyBkdXBsaWNhdGUgdHJhbnNmb3JtIHZhbHVlcywgb25lIG5vbi1wcmVmaXhlZCBhbmQgb25lIHByZWZpeGVkIChcInRyYW5zZm9ybVwiIGFuZCBcIldlYmtpdFRyYW5zZm9ybVwiKSwgc28gd2UgbXVzdCB3ZWVkIG91dCB0aGUgZXh0cmEgb25lIGhlcmUuXG5cdFx0XHRcdFx0XHRcdFx0c1twLnJlcGxhY2UoX2NhbWVsRXhwLCBfY2FtZWxGdW5jKV0gPSBjcy5nZXRQcm9wZXJ0eVZhbHVlKHApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHsgLy9zb21lIGJyb3dzZXJzIGJlaGF2ZSBkaWZmZXJlbnRseSAtIGNzLmxlbmd0aCBpcyBhbHdheXMgMCwgc28gd2UgbXVzdCBkbyBhIGZvci4uLmluIGxvb3AuXG5cdFx0XHRcdFx0XHRmb3IgKGkgaW4gY3MpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGkuaW5kZXhPZihcIlRyYW5zZm9ybVwiKSA9PT0gLTEgfHwgX3RyYW5zZm9ybVByb3AgPT09IGkpIHsgLy9Tb21lIHdlYmtpdCBicm93c2VycyBkdXBsaWNhdGUgdHJhbnNmb3JtIHZhbHVlcywgb25lIG5vbi1wcmVmaXhlZCBhbmQgb25lIHByZWZpeGVkIChcInRyYW5zZm9ybVwiIGFuZCBcIldlYmtpdFRyYW5zZm9ybVwiKSwgc28gd2UgbXVzdCB3ZWVkIG91dCB0aGUgZXh0cmEgb25lIGhlcmUuXG5cdFx0XHRcdFx0XHRcdFx0c1tpXSA9IGNzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKChjcyA9IHQuY3VycmVudFN0eWxlIHx8IHQuc3R5bGUpKSB7XG5cdFx0XHRcdFx0Zm9yIChpIGluIGNzKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGkpID09PSBcInN0cmluZ1wiICYmIHNbaV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRzW2kucmVwbGFjZShfY2FtZWxFeHAsIF9jYW1lbEZ1bmMpXSA9IGNzW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIV9zdXBwb3J0c09wYWNpdHkpIHtcblx0XHRcdFx0XHRzLm9wYWNpdHkgPSBfZ2V0SUVPcGFjaXR5KHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRyID0gX2dldFRyYW5zZm9ybSh0LCBjcywgZmFsc2UpO1xuXHRcdFx0XHRzLnJvdGF0aW9uID0gdHIucm90YXRpb247XG5cdFx0XHRcdHMuc2tld1ggPSB0ci5za2V3WDtcblx0XHRcdFx0cy5zY2FsZVggPSB0ci5zY2FsZVg7XG5cdFx0XHRcdHMuc2NhbGVZID0gdHIuc2NhbGVZO1xuXHRcdFx0XHRzLnggPSB0ci54O1xuXHRcdFx0XHRzLnkgPSB0ci55O1xuXHRcdFx0XHRpZiAoX3N1cHBvcnRzM0QpIHtcblx0XHRcdFx0XHRzLnogPSB0ci56O1xuXHRcdFx0XHRcdHMucm90YXRpb25YID0gdHIucm90YXRpb25YO1xuXHRcdFx0XHRcdHMucm90YXRpb25ZID0gdHIucm90YXRpb25ZO1xuXHRcdFx0XHRcdHMuc2NhbGVaID0gdHIuc2NhbGVaO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzLmZpbHRlcnMpIHtcblx0XHRcdFx0XHRkZWxldGUgcy5maWx0ZXJzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQHByaXZhdGUgYW5hbHl6ZXMgdHdvIHN0eWxlIG9iamVjdHMgKGFzIHJldHVybmVkIGJ5IF9nZXRBbGxTdHlsZXMoKSkgYW5kIG9ubHkgbG9va3MgZm9yIGRpZmZlcmVuY2VzIGJldHdlZW4gdGhlbSB0aGF0IGNvbnRhaW4gdHdlZW5hYmxlIHZhbHVlcyAobGlrZSBhIG51bWJlciBvciBjb2xvcikuIEl0IHJldHVybnMgYW4gb2JqZWN0IHdpdGggYSBcImRpZnNcIiBwcm9wZXJ0eSB3aGljaCByZWZlcnMgdG8gYW4gb2JqZWN0IGNvbnRhaW5pbmcgb25seSB0aG9zZSBpc29sYXRlZCBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgZm9yIHR3ZWVuaW5nLCBhbmQgYSBcImZpcnN0TVBUXCIgcHJvcGVydHkgd2hpY2ggcmVmZXJzIHRvIHRoZSBmaXJzdCBNaW5pUHJvcFR3ZWVuIGluc3RhbmNlIGluIGEgbGlua2VkIGxpc3QgdGhhdCByZWNvcmRlZCBhbGwgdGhlIHN0YXJ0aW5nIHZhbHVlcyBvZiB0aGUgZGlmZmVyZW50IHByb3BlcnRpZXMgc28gdGhhdCB3ZSBjYW4gcmV2ZXJ0IHRvIHRoZW0gYXQgdGhlIGVuZCBvciBiZWdpbm5pbmcgb2YgdGhlIHR3ZWVuIC0gd2UgZG9uJ3Qgd2FudCB0aGUgY2FzY2FkaW5nIHRvIGdldCBtZXNzZWQgdXAuIFRoZSBmb3JjZUxvb2t1cCBwYXJhbWV0ZXIgaXMgYW4gb3B0aW9uYWwgZ2VuZXJpYyBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHRoYXQgc2hvdWxkIGJlIGZvcmNlZCBpbnRvIHRoZSByZXN1bHRzIC0gdGhpcyBpcyBuZWNlc3NhcnkgZm9yIGNsYXNzTmFtZSB0d2VlbnMgdGhhdCBhcmUgb3ZlcndyaXRpbmcgb3RoZXJzIGJlY2F1c2UgaW1hZ2luZSBhIHNjZW5hcmlvIHdoZXJlIGEgcm9sbG92ZXIvcm9sbG91dCBhZGRzL3JlbW92ZXMgYSBjbGFzcyBhbmQgdGhlIHVzZXIgc3dpcGVzIHRoZSBtb3VzZSBvdmVyIHRoZSB0YXJnZXQgU1VQRVIgZmFzdCwgdGh1cyBub3RoaW5nIGFjdHVhbGx5IGNoYW5nZWQgeWV0IGFuZCB0aGUgc3Vic2VxdWVudCBjb21wYXJpc29uIG9mIHRoZSBwcm9wZXJ0aWVzIHdvdWxkIGluZGljYXRlIHRoZXkgbWF0Y2ggKGVzcGVjaWFsbHkgd2hlbiBweCByb3VuZGluZyBpcyB0YWtlbiBpbnRvIGNvbnNpZGVyYXRpb24pLCB0aHVzIG5vIHR3ZWVuaW5nIGlzIG5lY2Vzc2FyeSBldmVuIHRob3VnaCBpdCBTSE9VTEQgdHdlZW4gYW5kIHJlbW92ZSB0aG9zZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSB0d2VlbiAob3RoZXJ3aXNlIHRoZSBpbmxpbmUgc3R5bGVzIHdpbGwgY29udGFtaW5hdGUgdGhpbmdzKS4gU2VlIHRoZSBjbGFzc05hbWUgU3BlY2lhbFByb3AgY29kZSBmb3IgZGV0YWlscy5cblx0XHRcdF9jc3NEaWYgPSBmdW5jdGlvbih0LCBzMSwgczIsIHZhcnMsIGZvcmNlTG9va3VwKSB7XG5cdFx0XHRcdHZhciBkaWZzID0ge30sXG5cdFx0XHRcdFx0c3R5bGUgPSB0LnN0eWxlLFxuXHRcdFx0XHRcdHZhbCwgcCwgbXB0O1xuXHRcdFx0XHRmb3IgKHAgaW4gczIpIHtcblx0XHRcdFx0XHRpZiAocCAhPT0gXCJjc3NUZXh0XCIpIGlmIChwICE9PSBcImxlbmd0aFwiKSBpZiAoaXNOYU4ocCkpIGlmIChzMVtwXSAhPT0gKHZhbCA9IHMyW3BdKSB8fCAoZm9yY2VMb29rdXAgJiYgZm9yY2VMb29rdXBbcF0pKSBpZiAocC5pbmRleE9mKFwiT3JpZ2luXCIpID09PSAtMSkgaWYgKHR5cGVvZih2YWwpID09PSBcIm51bWJlclwiIHx8IHR5cGVvZih2YWwpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRkaWZzW3BdID0gKHZhbCA9PT0gXCJhdXRvXCIgJiYgKHAgPT09IFwibGVmdFwiIHx8IHAgPT09IFwidG9wXCIpKSA/IF9jYWxjdWxhdGVPZmZzZXQodCwgcCkgOiAoKHZhbCA9PT0gXCJcIiB8fCB2YWwgPT09IFwiYXV0b1wiIHx8IHZhbCA9PT0gXCJub25lXCIpICYmIHR5cGVvZihzMVtwXSkgPT09IFwic3RyaW5nXCIgJiYgczFbcF0ucmVwbGFjZShfTmFORXhwLCBcIlwiKSAhPT0gXCJcIikgPyAwIDogdmFsOyAvL2lmIHRoZSBlbmRpbmcgdmFsdWUgaXMgZGVmYXVsdGluZyAoXCJcIiBvciBcImF1dG9cIiksIHdlIGNoZWNrIHRoZSBzdGFydGluZyB2YWx1ZSBhbmQgaWYgaXQgY2FuIGJlIHBhcnNlZCBpbnRvIGEgbnVtYmVyIChhIHN0cmluZyB3aGljaCBjb3VsZCBoYXZlIGEgc3VmZml4IHRvbywgbGlrZSA3MDBweCksIHRoZW4gd2Ugc3dhcCBpbiAwIGZvciBcIlwiIG9yIFwiYXV0b1wiIHNvIHRoYXQgdGhpbmdzIGFjdHVhbGx5IHR3ZWVuLlxuXHRcdFx0XHRcdFx0aWYgKHN0eWxlW3BdICE9PSB1bmRlZmluZWQpIHsgLy9mb3IgY2xhc3NOYW1lIHR3ZWVucywgd2UgbXVzdCByZW1lbWJlciB3aGljaCBwcm9wZXJ0aWVzIGFscmVhZHkgZXhpc3RlZCBpbmxpbmUgLSB0aGUgb25lcyB0aGF0IGRpZG4ndCBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIHRoZSB0d2VlbiBpc24ndCBpbiBwcm9ncmVzcyBiZWNhdXNlIHRoZXkgd2VyZSBvbmx5IGludHJvZHVjZWQgdG8gZmFjaWxpdGF0ZSB0aGUgdHJhbnNpdGlvbiBiZXR3ZWVuIGNsYXNzZXMuXG5cdFx0XHRcdFx0XHRcdG1wdCA9IG5ldyBNaW5pUHJvcFR3ZWVuKHN0eWxlLCBwLCBzdHlsZVtwXSwgbXB0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHZhcnMpIHtcblx0XHRcdFx0XHRmb3IgKHAgaW4gdmFycykgeyAvL2NvcHkgcHJvcGVydGllcyAoZXhjZXB0IGNsYXNzTmFtZSlcblx0XHRcdFx0XHRcdGlmIChwICE9PSBcImNsYXNzTmFtZVwiKSB7XG5cdFx0XHRcdFx0XHRcdGRpZnNbcF0gPSB2YXJzW3BdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4ge2RpZnM6ZGlmcywgZmlyc3RNUFQ6bXB0fTtcblx0XHRcdH0sXG5cdFx0XHRfZGltZW5zaW9ucyA9IHt3aWR0aDpbXCJMZWZ0XCIsXCJSaWdodFwiXSwgaGVpZ2h0OltcIlRvcFwiLFwiQm90dG9tXCJdfSxcblx0XHRcdF9tYXJnaW5zID0gW1wibWFyZ2luTGVmdFwiLFwibWFyZ2luUmlnaHRcIixcIm1hcmdpblRvcFwiLFwibWFyZ2luQm90dG9tXCJdLFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwcml2YXRlIEdldHMgdGhlIHdpZHRoIG9yIGhlaWdodCBvZiBhbiBlbGVtZW50XG5cdFx0XHQgKiBAcGFyYW0geyFPYmplY3R9IHQgVGFyZ2V0IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7IXN0cmluZ30gcCBQcm9wZXJ0eSBuYW1lIChcIndpZHRoXCIgb3IgXCJoZWlnaHRcIilcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PX0gY3MgQ29tcHV0ZWQgc3R5bGUgb2JqZWN0IChpZiBvbmUgZXhpc3RzKS4gSnVzdCBhIHNwZWVkIG9wdGltaXphdGlvbi5cblx0XHRcdCAqIEByZXR1cm4ge251bWJlcn0gRGltZW5zaW9uIChpbiBwaXhlbHMpXG5cdFx0XHQgKi9cblx0XHRcdF9nZXREaW1lbnNpb24gPSBmdW5jdGlvbih0LCBwLCBjcykge1xuXHRcdFx0XHR2YXIgdiA9IHBhcnNlRmxvYXQoKHAgPT09IFwid2lkdGhcIikgPyB0Lm9mZnNldFdpZHRoIDogdC5vZmZzZXRIZWlnaHQpLFxuXHRcdFx0XHRcdGEgPSBfZGltZW5zaW9uc1twXSxcblx0XHRcdFx0XHRpID0gYS5sZW5ndGg7XG5cdFx0XHRcdGNzID0gY3MgfHwgX2dldENvbXB1dGVkU3R5bGUodCwgbnVsbCk7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdHYgLT0gcGFyc2VGbG9hdCggX2dldFN0eWxlKHQsIFwicGFkZGluZ1wiICsgYVtpXSwgY3MsIHRydWUpICkgfHwgMDtcblx0XHRcdFx0XHR2IC09IHBhcnNlRmxvYXQoIF9nZXRTdHlsZSh0LCBcImJvcmRlclwiICsgYVtpXSArIFwiV2lkdGhcIiwgY3MsIHRydWUpICkgfHwgMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdjtcblx0XHRcdH0sXG5cblx0XHRcdC8vIEBwcml2YXRlIFBhcnNlcyBwb3NpdGlvbi1yZWxhdGVkIGNvbXBsZXggc3RyaW5ncyBsaWtlIFwidG9wIGxlZnRcIiBvciBcIjUwcHggMTBweFwiIG9yIFwiNzAlIDIwJVwiLCBldGMuIHdoaWNoIGFyZSB1c2VkIGZvciB0aGluZ3MgbGlrZSB0cmFuc2Zvcm1PcmlnaW4gb3IgYmFja2dyb3VuZFBvc2l0aW9uLiBPcHRpb25hbGx5IGRlY29yYXRlcyBhIHN1cHBsaWVkIG9iamVjdCAocmVjT2JqKSB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczogXCJveFwiIChvZmZzZXRYKSwgXCJveVwiIChvZmZzZXRZKSwgXCJveHBcIiAoaWYgdHJ1ZSwgXCJveFwiIGlzIGEgcGVyY2VudGFnZSBub3QgYSBwaXhlbCB2YWx1ZSksIGFuZCBcIm94eVwiIChpZiB0cnVlLCBcIm95XCIgaXMgYSBwZXJjZW50YWdlIG5vdCBhIHBpeGVsIHZhbHVlKVxuXHRcdFx0X3BhcnNlUG9zaXRpb24gPSBmdW5jdGlvbih2LCByZWNPYmopIHtcblx0XHRcdFx0aWYgKHYgPT09IFwiY29udGFpblwiIHx8IHYgPT09IFwiYXV0b1wiIHx8IHYgPT09IFwiYXV0byBhdXRvXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gdiArIFwiIFwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh2ID09IG51bGwgfHwgdiA9PT0gXCJcIikgeyAvL25vdGU6IEZpcmVmb3ggdXNlcyBcImF1dG8gYXV0b1wiIGFzIGRlZmF1bHQgd2hlcmVhcyBDaHJvbWUgdXNlcyBcImF1dG9cIi5cblx0XHRcdFx0XHR2ID0gXCIwIDBcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHR2YXIgYSA9IHYuc3BsaXQoXCIgXCIpLFxuXHRcdFx0XHRcdHggPSAodi5pbmRleE9mKFwibGVmdFwiKSAhPT0gLTEpID8gXCIwJVwiIDogKHYuaW5kZXhPZihcInJpZ2h0XCIpICE9PSAtMSkgPyBcIjEwMCVcIiA6IGFbMF0sXG5cdFx0XHRcdFx0eSA9ICh2LmluZGV4T2YoXCJ0b3BcIikgIT09IC0xKSA/IFwiMCVcIiA6ICh2LmluZGV4T2YoXCJib3R0b21cIikgIT09IC0xKSA/IFwiMTAwJVwiIDogYVsxXTtcblx0XHRcdFx0aWYgKHkgPT0gbnVsbCkge1xuXHRcdFx0XHRcdHkgPSAoeCA9PT0gXCJjZW50ZXJcIikgPyBcIjUwJVwiIDogXCIwXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoeSA9PT0gXCJjZW50ZXJcIikge1xuXHRcdFx0XHRcdHkgPSBcIjUwJVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh4ID09PSBcImNlbnRlclwiIHx8IChpc05hTihwYXJzZUZsb2F0KHgpKSAmJiAoeCArIFwiXCIpLmluZGV4T2YoXCI9XCIpID09PSAtMSkpIHsgLy9yZW1lbWJlciwgdGhlIHVzZXIgY291bGQgZmxpcC1mbG9wIHRoZSB2YWx1ZXMgYW5kIHNheSBcImJvdHRvbSBjZW50ZXJcIiBvciBcImNlbnRlciBib3R0b21cIiwgZXRjLiBcImNlbnRlclwiIGlzIGFtYmlndW91cyBiZWNhdXNlIGl0IGNvdWxkIGJlIHVzZWQgdG8gZGVzY3JpYmUgaG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCwgaGVuY2UgdGhlIGlzTmFOKCkuIElmIHRoZXJlJ3MgYW4gXCI9XCIgc2lnbiBpbiB0aGUgdmFsdWUsIGl0J3MgcmVsYXRpdmUuXG5cdFx0XHRcdFx0eCA9IFwiNTAlXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0diA9IHggKyBcIiBcIiArIHkgKyAoKGEubGVuZ3RoID4gMikgPyBcIiBcIiArIGFbMl0gOiBcIlwiKTtcblx0XHRcdFx0aWYgKHJlY09iaikge1xuXHRcdFx0XHRcdHJlY09iai5veHAgPSAoeC5pbmRleE9mKFwiJVwiKSAhPT0gLTEpO1xuXHRcdFx0XHRcdHJlY09iai5veXAgPSAoeS5pbmRleE9mKFwiJVwiKSAhPT0gLTEpO1xuXHRcdFx0XHRcdHJlY09iai5veHIgPSAoeC5jaGFyQXQoMSkgPT09IFwiPVwiKTtcblx0XHRcdFx0XHRyZWNPYmoub3lyID0gKHkuY2hhckF0KDEpID09PSBcIj1cIik7XG5cdFx0XHRcdFx0cmVjT2JqLm94ID0gcGFyc2VGbG9hdCh4LnJlcGxhY2UoX05hTkV4cCwgXCJcIikpO1xuXHRcdFx0XHRcdHJlY09iai5veSA9IHBhcnNlRmxvYXQoeS5yZXBsYWNlKF9OYU5FeHAsIFwiXCIpKTtcblx0XHRcdFx0XHRyZWNPYmoudiA9IHY7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlY09iaiB8fCB2O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAcHJpdmF0ZSBUYWtlcyBhbiBlbmRpbmcgdmFsdWUgKHR5cGljYWxseSBhIHN0cmluZywgYnV0IGNhbiBiZSBhIG51bWJlcikgYW5kIGEgc3RhcnRpbmcgdmFsdWUgYW5kIHJldHVybnMgdGhlIGNoYW5nZSBiZXR3ZWVuIHRoZSB0d28sIGxvb2tpbmcgZm9yIHJlbGF0aXZlIHZhbHVlIGluZGljYXRvcnMgbGlrZSArPSBhbmQgLT0gYW5kIGl0IGFsc28gaWdub3JlcyBzdWZmaXhlcyAoYnV0IG1ha2Ugc3VyZSB0aGUgZW5kaW5nIHZhbHVlIHN0YXJ0cyB3aXRoIGEgbnVtYmVyIG9yICs9Ly09IGFuZCB0aGF0IHRoZSBzdGFydGluZyB2YWx1ZSBpcyBhIE5VTUJFUiEpXG5cdFx0XHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKX0gZSBFbmQgdmFsdWUgd2hpY2ggaXMgdHlwaWNhbGx5IGEgc3RyaW5nLCBidXQgY291bGQgYmUgYSBudW1iZXJcblx0XHRcdCAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmcpfSBiIEJlZ2lubmluZyB2YWx1ZSB3aGljaCBpcyB0eXBpY2FsbHkgYSBzdHJpbmcgYnV0IGNvdWxkIGJlIGEgbnVtYmVyXG5cdFx0XHQgKiBAcmV0dXJuIHtudW1iZXJ9IEFtb3VudCBvZiBjaGFuZ2UgYmV0d2VlbiB0aGUgYmVnaW5uaW5nIGFuZCBlbmRpbmcgdmFsdWVzIChyZWxhdGl2ZSB2YWx1ZXMgdGhhdCBoYXZlIGEgXCIrPVwiIG9yIFwiLT1cIiBhcmUgcmVjb2duaXplZClcblx0XHRcdCAqL1xuXHRcdFx0X3BhcnNlQ2hhbmdlID0gZnVuY3Rpb24oZSwgYikge1xuXHRcdFx0XHRyZXR1cm4gKHR5cGVvZihlKSA9PT0gXCJzdHJpbmdcIiAmJiBlLmNoYXJBdCgxKSA9PT0gXCI9XCIpID8gcGFyc2VJbnQoZS5jaGFyQXQoMCkgKyBcIjFcIiwgMTApICogcGFyc2VGbG9hdChlLnN1YnN0cigyKSkgOiBwYXJzZUZsb2F0KGUpIC0gcGFyc2VGbG9hdChiKTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQHByaXZhdGUgVGFrZXMgYSB2YWx1ZSBhbmQgYSBkZWZhdWx0IG51bWJlciwgY2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyByZWxhdGl2ZSwgbnVsbCwgb3IgbnVtZXJpYyBhbmQgc3BpdHMgYmFjayBhIG5vcm1hbGl6ZWQgbnVtYmVyIGFjY29yZGluZ2x5LiBQcmltYXJpbHkgdXNlZCBpbiB0aGUgX3BhcnNlVHJhbnNmb3JtKCkgZnVuY3Rpb24uXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gdiBWYWx1ZSB0byBiZSBwYXJzZWRcblx0XHRcdCAqIEBwYXJhbSB7IW51bWJlcn0gZCBEZWZhdWx0IHZhbHVlICh3aGljaCBpcyBhbHNvIHVzZWQgZm9yIHJlbGF0aXZlIGNhbGN1bGF0aW9ucyBpZiBcIis9XCIgb3IgXCItPVwiIGlzIGZvdW5kIGluIHRoZSBmaXJzdCBwYXJhbWV0ZXIpXG5cdFx0XHQgKiBAcmV0dXJuIHtudW1iZXJ9IFBhcnNlZCB2YWx1ZVxuXHRcdFx0ICovXG5cdFx0XHRfcGFyc2VWYWwgPSBmdW5jdGlvbih2LCBkKSB7XG5cdFx0XHRcdHJldHVybiAodiA9PSBudWxsKSA/IGQgOiAodHlwZW9mKHYpID09PSBcInN0cmluZ1wiICYmIHYuY2hhckF0KDEpID09PSBcIj1cIikgPyBwYXJzZUludCh2LmNoYXJBdCgwKSArIFwiMVwiLCAxMCkgKiBwYXJzZUZsb2F0KHYuc3Vic3RyKDIpKSArIGQgOiBwYXJzZUZsb2F0KHYpO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAcHJpdmF0ZSBUcmFuc2xhdGVzIHN0cmluZ3MgbGlrZSBcIjQwZGVnXCIgb3IgXCI0MFwiIG9yIDQwcmFkXCIgb3IgXCIrPTQwZGVnXCIgb3IgXCIyNzBfc2hvcnRcIiBvciBcIi05MF9jd1wiIG9yIFwiKz00NV9jY3dcIiB0byBhIG51bWVyaWMgcmFkaWFuIGFuZ2xlLiBPZiBjb3Vyc2UgYSBzdGFydGluZy9kZWZhdWx0IHZhbHVlIG11c3QgYmUgZmVkIGluIHRvbyBzbyB0aGF0IHJlbGF0aXZlIHZhbHVlcyBjYW4gYmUgY2FsY3VsYXRlZCBwcm9wZXJseS5cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSB2IFZhbHVlIHRvIGJlIHBhcnNlZFxuXHRcdFx0ICogQHBhcmFtIHshbnVtYmVyfSBkIERlZmF1bHQgdmFsdWUgKHdoaWNoIGlzIGFsc28gdXNlZCBmb3IgcmVsYXRpdmUgY2FsY3VsYXRpb25zIGlmIFwiKz1cIiBvciBcIi09XCIgaXMgZm91bmQgaW4gdGhlIGZpcnN0IHBhcmFtZXRlcilcblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nPX0gcCBwcm9wZXJ0eSBuYW1lIGZvciBkaXJlY3Rpb25hbEVuZCAob3B0aW9uYWwgLSBvbmx5IHVzZWQgd2hlbiB0aGUgcGFyc2VkIHZhbHVlIGlzIGRpcmVjdGlvbmFsIChcIl9zaG9ydFwiLCBcIl9jd1wiLCBvciBcIl9jY3dcIiBzdWZmaXgpLiBXZSBuZWVkIGEgd2F5IHRvIHN0b3JlIHRoZSB1bmNvbXBlbnNhdGVkIHZhbHVlIHNvIHRoYXQgYXQgdGhlIGVuZCBvZiB0aGUgdHdlZW4sIHdlIHNldCBpdCB0byBleGFjdGx5IHdoYXQgd2FzIHJlcXVlc3RlZCB3aXRoIG5vIGRpcmVjdGlvbmFsIGNvbXBlbnNhdGlvbikuIFByb3BlcnR5IG5hbWUgd291bGQgYmUgXCJyb3RhdGlvblwiLCBcInJvdGF0aW9uWFwiLCBvciBcInJvdGF0aW9uWVwiXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdD19IGRpcmVjdGlvbmFsRW5kIEFuIG9iamVjdCB0aGF0IHdpbGwgc3RvcmUgdGhlIHJhdyBlbmQgdmFsdWVzIGZvciBkaXJlY3Rpb25hbCBhbmdsZXMgKFwiX3Nob3J0XCIsIFwiX2N3XCIsIG9yIFwiX2Njd1wiIHN1ZmZpeCkuIFdlIG5lZWQgYSB3YXkgdG8gc3RvcmUgdGhlIHVuY29tcGVuc2F0ZWQgdmFsdWUgc28gdGhhdCBhdCB0aGUgZW5kIG9mIHRoZSB0d2Vlbiwgd2Ugc2V0IGl0IHRvIGV4YWN0bHkgd2hhdCB3YXMgcmVxdWVzdGVkIHdpdGggbm8gZGlyZWN0aW9uYWwgY29tcGVuc2F0aW9uLlxuXHRcdFx0ICogQHJldHVybiB7bnVtYmVyfSBwYXJzZWQgYW5nbGUgaW4gcmFkaWFuc1xuXHRcdFx0ICovXG5cdFx0XHRfcGFyc2VBbmdsZSA9IGZ1bmN0aW9uKHYsIGQsIHAsIGRpcmVjdGlvbmFsRW5kKSB7XG5cdFx0XHRcdHZhciBtaW4gPSAwLjAwMDAwMSxcblx0XHRcdFx0XHRjYXAsIHNwbGl0LCBkaWYsIHJlc3VsdCwgaXNSZWxhdGl2ZTtcblx0XHRcdFx0aWYgKHYgPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mKHYpID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gdjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjYXAgPSAzNjA7XG5cdFx0XHRcdFx0c3BsaXQgPSB2LnNwbGl0KFwiX1wiKTtcblx0XHRcdFx0XHRpc1JlbGF0aXZlID0gKHYuY2hhckF0KDEpID09PSBcIj1cIik7XG5cdFx0XHRcdFx0ZGlmID0gKGlzUmVsYXRpdmUgPyBwYXJzZUludCh2LmNoYXJBdCgwKSArIFwiMVwiLCAxMCkgKiBwYXJzZUZsb2F0KHNwbGl0WzBdLnN1YnN0cigyKSkgOiBwYXJzZUZsb2F0KHNwbGl0WzBdKSkgKiAoKHYuaW5kZXhPZihcInJhZFwiKSA9PT0gLTEpID8gMSA6IF9SQUQyREVHKSAtIChpc1JlbGF0aXZlID8gMCA6IGQpO1xuXHRcdFx0XHRcdGlmIChzcGxpdC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGlmIChkaXJlY3Rpb25hbEVuZCkge1xuXHRcdFx0XHRcdFx0XHRkaXJlY3Rpb25hbEVuZFtwXSA9IGQgKyBkaWY7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodi5pbmRleE9mKFwic2hvcnRcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGRpZiA9IGRpZiAlIGNhcDtcblx0XHRcdFx0XHRcdFx0aWYgKGRpZiAhPT0gZGlmICUgKGNhcCAvIDIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGlmID0gKGRpZiA8IDApID8gZGlmICsgY2FwIDogZGlmIC0gY2FwO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodi5pbmRleE9mKFwiX2N3XCIpICE9PSAtMSAmJiBkaWYgPCAwKSB7XG5cdFx0XHRcdFx0XHRcdGRpZiA9ICgoZGlmICsgY2FwICogOTk5OTk5OTk5OSkgJSBjYXApIC0gKChkaWYgLyBjYXApIHwgMCkgKiBjYXA7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHYuaW5kZXhPZihcImNjd1wiKSAhPT0gLTEgJiYgZGlmID4gMCkge1xuXHRcdFx0XHRcdFx0XHRkaWYgPSAoKGRpZiAtIGNhcCAqIDk5OTk5OTk5OTkpICUgY2FwKSAtICgoZGlmIC8gY2FwKSB8IDApICogY2FwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXN1bHQgPSBkICsgZGlmO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZXN1bHQgPCBtaW4gJiYgcmVzdWx0ID4gLW1pbikge1xuXHRcdFx0XHRcdHJlc3VsdCA9IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHRcdH0sXG5cblx0XHRcdF9jb2xvckxvb2t1cCA9IHthcXVhOlswLDI1NSwyNTVdLFxuXHRcdFx0XHRsaW1lOlswLDI1NSwwXSxcblx0XHRcdFx0c2lsdmVyOlsxOTIsMTkyLDE5Ml0sXG5cdFx0XHRcdGJsYWNrOlswLDAsMF0sXG5cdFx0XHRcdG1hcm9vbjpbMTI4LDAsMF0sXG5cdFx0XHRcdHRlYWw6WzAsMTI4LDEyOF0sXG5cdFx0XHRcdGJsdWU6WzAsMCwyNTVdLFxuXHRcdFx0XHRuYXZ5OlswLDAsMTI4XSxcblx0XHRcdFx0d2hpdGU6WzI1NSwyNTUsMjU1XSxcblx0XHRcdFx0ZnVjaHNpYTpbMjU1LDAsMjU1XSxcblx0XHRcdFx0b2xpdmU6WzEyOCwxMjgsMF0sXG5cdFx0XHRcdHllbGxvdzpbMjU1LDI1NSwwXSxcblx0XHRcdFx0b3JhbmdlOlsyNTUsMTY1LDBdLFxuXHRcdFx0XHRncmF5OlsxMjgsMTI4LDEyOF0sXG5cdFx0XHRcdHB1cnBsZTpbMTI4LDAsMTI4XSxcblx0XHRcdFx0Z3JlZW46WzAsMTI4LDBdLFxuXHRcdFx0XHRyZWQ6WzI1NSwwLDBdLFxuXHRcdFx0XHRwaW5rOlsyNTUsMTkyLDIwM10sXG5cdFx0XHRcdGN5YW46WzAsMjU1LDI1NV0sXG5cdFx0XHRcdHRyYW5zcGFyZW50OlsyNTUsMjU1LDI1NSwwXX0sXG5cblx0XHRcdF9odWUgPSBmdW5jdGlvbihoLCBtMSwgbTIpIHtcblx0XHRcdFx0aCA9IChoIDwgMCkgPyBoICsgMSA6IChoID4gMSkgPyBoIC0gMSA6IGg7XG5cdFx0XHRcdHJldHVybiAoKCgoaCAqIDYgPCAxKSA/IG0xICsgKG0yIC0gbTEpICogaCAqIDYgOiAoaCA8IDAuNSkgPyBtMiA6IChoICogMyA8IDIpID8gbTEgKyAobTIgLSBtMSkgKiAoMiAvIDMgLSBoKSAqIDYgOiBtMSkgKiAyNTUpICsgMC41KSB8IDA7XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwcml2YXRlIFBhcnNlcyBhIGNvbG9yIChsaWtlICM5RjAsICNGRjk5MDAsIHJnYigyNTUsNTEsMTUzKSBvciBoc2woMTA4LCA1MCUsIDEwJSkpIGludG8gYW4gYXJyYXkgd2l0aCAzIGVsZW1lbnRzIGZvciByZWQsIGdyZWVuLCBhbmQgYmx1ZSBvciBpZiB0b0hTTCBwYXJhbWV0ZXIgaXMgdHJ1ZSwgaXQgd2lsbCBwb3B1bGF0ZSB0aGUgYXJyYXkgd2l0aCBodWUsIHNhdHVyYXRpb24sIGFuZCBsaWdodG5lc3MgdmFsdWVzLiBJZiBhIHJlbGF0aXZlIHZhbHVlIGlzIGZvdW5kIGluIGFuIGhzbCgpIG9yIGhzbGEoKSBzdHJpbmcsIGl0IHdpbGwgcHJlc2VydmUgdGhvc2UgcmVsYXRpdmUgcHJlZml4ZXMgYW5kIGFsbCB0aGUgdmFsdWVzIGluIHRoZSBhcnJheSB3aWxsIGJlIHN0cmluZ3MgaW5zdGVhZCBvZiBudW1iZXJzIChpbiBhbGwgb3RoZXIgY2FzZXMgaXQgd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCBudW1iZXJzKS5cblx0XHRcdCAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpfSB2IFRoZSB2YWx1ZSB0aGUgc2hvdWxkIGJlIHBhcnNlZCB3aGljaCBjb3VsZCBiZSBhIHN0cmluZyBsaWtlICM5RjAgb3IgcmdiKDI1NSwxMDIsNTEpIG9yIHJnYmEoMjU1LDAsMCwwLjUpIG9yIGl0IGNvdWxkIGJlIGEgbnVtYmVyIGxpa2UgMHhGRjAwQ0Mgb3IgZXZlbiBhIG5hbWVkIGNvbG9yIGxpa2UgcmVkLCBibHVlLCBwdXJwbGUsIGV0Yy5cblx0XHRcdCAqIEBwYXJhbSB7KGJvb2xlYW4pfSB0b0hTTCBJZiB0cnVlLCBhbiBoc2woKSBvciBoc2xhKCkgdmFsdWUgd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIHJnYigpIG9yIHJnYmEoKVxuXHRcdFx0ICogQHJldHVybiB7QXJyYXkuPG51bWJlcj59IEFuIGFycmF5IGNvbnRhaW5pbmcgcmVkLCBncmVlbiwgYW5kIGJsdWUgKGFuZCBvcHRpb25hbGx5IGFscGhhKSBpbiB0aGF0IG9yZGVyLCBvciBpZiB0aGUgdG9IU0wgcGFyYW1ldGVyIHdhcyB0cnVlLCB0aGUgYXJyYXkgd2lsbCBjb250YWluIGh1ZSwgc2F0dXJhdGlvbiBhbmQgbGlnaHRuZXNzIChhbmQgb3B0aW9uYWxseSBhbHBoYSkgaW4gdGhhdCBvcmRlci4gQWx3YXlzIG51bWJlcnMgdW5sZXNzIHRoZXJlJ3MgYSByZWxhdGl2ZSBwcmVmaXggZm91bmQgaW4gYW4gaHNsKCkgb3IgaHNsYSgpIHN0cmluZyBhbmQgdG9IU0wgaXMgdHJ1ZS5cblx0XHRcdCAqL1xuXHRcdFx0X3BhcnNlQ29sb3IgPSBDU1NQbHVnaW4ucGFyc2VDb2xvciA9IGZ1bmN0aW9uKHYsIHRvSFNMKSB7XG5cdFx0XHRcdHZhciBhLCByLCBnLCBiLCBoLCBzLCBsLCBtYXgsIG1pbiwgZCwgd2FzSFNMO1xuXHRcdFx0XHRpZiAoIXYpIHtcblx0XHRcdFx0XHRhID0gX2NvbG9yTG9va3VwLmJsYWNrO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZih2KSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdGEgPSBbdiA+PiAxNiwgKHYgPj4gOCkgJiAyNTUsIHYgJiAyNTVdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh2LmNoYXJBdCh2Lmxlbmd0aCAtIDEpID09PSBcIixcIikgeyAvL3NvbWV0aW1lcyBhIHRyYWlsaW5nIGNvbW1hIGlzIGluY2x1ZGVkIGFuZCB3ZSBzaG91bGQgY2hvcCBpdCBvZmYgKHR5cGljYWxseSBmcm9tIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgdmFsdWVzIGxpa2UgYSB0ZXh0U2hhZG93OlwiMnB4IDJweCAycHggYmx1ZSwgNXB4IDVweCA1cHggcmdiKDI1NSwwLDApXCIgLSBpbiB0aGlzIGV4YW1wbGUgXCJibHVlLFwiIGhhcyBhIHRyYWlsaW5nIGNvbW1hLiBXZSBjb3VsZCBzdHJpcCBpdCBvdXQgaW5zaWRlIHBhcnNlQ29tcGxleCgpIGJ1dCB3ZSdkIG5lZWQgdG8gZG8gaXQgdG8gdGhlIGJlZ2lubmluZyBhbmQgZW5kaW5nIHZhbHVlcyBwbHVzIGl0IHdvdWxkbid0IHByb3ZpZGUgcHJvdGVjdGlvbiBmcm9tIG90aGVyIHBvdGVudGlhbCBzY2VuYXJpb3MgbGlrZSBpZiB0aGUgdXNlciBwYXNzZXMgaW4gYSBzaW1pbGFyIHZhbHVlLlxuXHRcdFx0XHRcdFx0diA9IHYuc3Vic3RyKDAsIHYubGVuZ3RoIC0gMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChfY29sb3JMb29rdXBbdl0pIHtcblx0XHRcdFx0XHRcdGEgPSBfY29sb3JMb29rdXBbdl07XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2LmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcblx0XHRcdFx0XHRcdGlmICh2Lmxlbmd0aCA9PT0gNCkgeyAvL2ZvciBzaG9ydGhhbmQgbGlrZSAjOUYwXG5cdFx0XHRcdFx0XHRcdHIgPSB2LmNoYXJBdCgxKTtcblx0XHRcdFx0XHRcdFx0ZyA9IHYuY2hhckF0KDIpO1xuXHRcdFx0XHRcdFx0XHRiID0gdi5jaGFyQXQoMyk7XG5cdFx0XHRcdFx0XHRcdHYgPSBcIiNcIiArIHIgKyByICsgZyArIGcgKyBiICsgYjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHYgPSBwYXJzZUludCh2LnN1YnN0cigxKSwgMTYpO1xuXHRcdFx0XHRcdFx0YSA9IFt2ID4+IDE2LCAodiA+PiA4KSAmIDI1NSwgdiAmIDI1NV07XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2LnN1YnN0cigwLCAzKSA9PT0gXCJoc2xcIikge1xuXHRcdFx0XHRcdFx0YSA9IHdhc0hTTCA9IHYubWF0Y2goX251bUV4cCk7XG5cdFx0XHRcdFx0XHRpZiAoIXRvSFNMKSB7XG5cdFx0XHRcdFx0XHRcdGggPSAoTnVtYmVyKGFbMF0pICUgMzYwKSAvIDM2MDtcblx0XHRcdFx0XHRcdFx0cyA9IE51bWJlcihhWzFdKSAvIDEwMDtcblx0XHRcdFx0XHRcdFx0bCA9IE51bWJlcihhWzJdKSAvIDEwMDtcblx0XHRcdFx0XHRcdFx0ZyA9IChsIDw9IDAuNSkgPyBsICogKHMgKyAxKSA6IGwgKyBzIC0gbCAqIHM7XG5cdFx0XHRcdFx0XHRcdHIgPSBsICogMiAtIGc7XG5cdFx0XHRcdFx0XHRcdGlmIChhLmxlbmd0aCA+IDMpIHtcblx0XHRcdFx0XHRcdFx0XHRhWzNdID0gTnVtYmVyKHZbM10pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGFbMF0gPSBfaHVlKGggKyAxIC8gMywgciwgZyk7XG5cdFx0XHRcdFx0XHRcdGFbMV0gPSBfaHVlKGgsIHIsIGcpO1xuXHRcdFx0XHRcdFx0XHRhWzJdID0gX2h1ZShoIC0gMSAvIDMsIHIsIGcpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh2LmluZGV4T2YoXCI9XCIpICE9PSAtMSkgeyAvL2lmIHJlbGF0aXZlIHZhbHVlcyBhcmUgZm91bmQsIGp1c3QgcmV0dXJuIHRoZSByYXcgc3RyaW5ncyB3aXRoIHRoZSByZWxhdGl2ZSBwcmVmaXhlcyBpbiBwbGFjZS5cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHYubWF0Y2goX3JlbE51bUV4cCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGEgPSB2Lm1hdGNoKF9udW1FeHApIHx8IF9jb2xvckxvb2t1cC50cmFuc3BhcmVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YVswXSA9IE51bWJlcihhWzBdKTtcblx0XHRcdFx0XHRhWzFdID0gTnVtYmVyKGFbMV0pO1xuXHRcdFx0XHRcdGFbMl0gPSBOdW1iZXIoYVsyXSk7XG5cdFx0XHRcdFx0aWYgKGEubGVuZ3RoID4gMykge1xuXHRcdFx0XHRcdFx0YVszXSA9IE51bWJlcihhWzNdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRvSFNMICYmICF3YXNIU0wpIHtcblx0XHRcdFx0XHRyID0gYVswXSAvIDI1NTtcblx0XHRcdFx0XHRnID0gYVsxXSAvIDI1NTtcblx0XHRcdFx0XHRiID0gYVsyXSAvIDI1NTtcblx0XHRcdFx0XHRtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcblx0XHRcdFx0XHRtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcblx0XHRcdFx0XHRsID0gKG1heCArIG1pbikgLyAyO1xuXHRcdFx0XHRcdGlmIChtYXggPT09IG1pbikge1xuXHRcdFx0XHRcdFx0aCA9IHMgPSAwO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkID0gbWF4IC0gbWluO1xuXHRcdFx0XHRcdFx0cyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuXHRcdFx0XHRcdFx0aCA9IChtYXggPT09IHIpID8gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCkgOiAobWF4ID09PSBnKSA/IChiIC0gcikgLyBkICsgMiA6IChyIC0gZykgLyBkICsgNDtcblx0XHRcdFx0XHRcdGggKj0gNjA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGFbMF0gPSAoaCArIDAuNSkgfCAwO1xuXHRcdFx0XHRcdGFbMV0gPSAocyAqIDEwMCArIDAuNSkgfCAwO1xuXHRcdFx0XHRcdGFbMl0gPSAobCAqIDEwMCArIDAuNSkgfCAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0fSxcblx0XHRcdF9mb3JtYXRDb2xvcnMgPSBmdW5jdGlvbihzLCB0b0hTTCkge1xuXHRcdFx0XHR2YXIgY29sb3JzID0gcy5tYXRjaChfY29sb3JFeHApIHx8IFtdLFxuXHRcdFx0XHRcdGNoYXJJbmRleCA9IDAsXG5cdFx0XHRcdFx0cGFyc2VkID0gY29sb3JzLmxlbmd0aCA/IFwiXCIgOiBzLFxuXHRcdFx0XHRcdGksIGNvbG9yLCB0ZW1wO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY29sb3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29sb3IgPSBjb2xvcnNbaV07XG5cdFx0XHRcdFx0dGVtcCA9IHMuc3Vic3RyKGNoYXJJbmRleCwgcy5pbmRleE9mKGNvbG9yLCBjaGFySW5kZXgpLWNoYXJJbmRleCk7XG5cdFx0XHRcdFx0Y2hhckluZGV4ICs9IHRlbXAubGVuZ3RoICsgY29sb3IubGVuZ3RoO1xuXHRcdFx0XHRcdGNvbG9yID0gX3BhcnNlQ29sb3IoY29sb3IsIHRvSFNMKTtcblx0XHRcdFx0XHRpZiAoY29sb3IubGVuZ3RoID09PSAzKSB7XG5cdFx0XHRcdFx0XHRjb2xvci5wdXNoKDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwYXJzZWQgKz0gdGVtcCArICh0b0hTTCA/IFwiaHNsYShcIiArIGNvbG9yWzBdICsgXCIsXCIgKyBjb2xvclsxXSArIFwiJSxcIiArIGNvbG9yWzJdICsgXCIlLFwiICsgY29sb3JbM10gOiBcInJnYmEoXCIgKyBjb2xvci5qb2luKFwiLFwiKSkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcGFyc2VkO1xuXHRcdFx0fSxcblx0XHRcdF9jb2xvckV4cCA9IFwiKD86XFxcXGIoPzooPzpyZ2J8cmdiYXxoc2x8aHNsYSlcXFxcKC4rP1xcXFwpKXxcXFxcQiMoPzpbMC05YS1mXXszfSl7MSwyfVxcXFxiXCI7IC8vd2UnbGwgZHluYW1pY2FsbHkgYnVpbGQgdGhpcyBSZWd1bGFyIEV4cHJlc3Npb24gdG8gY29uc2VydmUgZmlsZSBzaXplLiBBZnRlciBidWlsZGluZyBpdCwgaXQgd2lsbCBiZSBhYmxlIHRvIGZpbmQgcmdiKCksIHJnYmEoKSwgIyAoaGV4YWRlY2ltYWwpLCBhbmQgbmFtZWQgY29sb3IgdmFsdWVzIGxpa2UgcmVkLCBibHVlLCBwdXJwbGUsIGV0Yy5cblxuXHRcdGZvciAocCBpbiBfY29sb3JMb29rdXApIHtcblx0XHRcdF9jb2xvckV4cCArPSBcInxcIiArIHAgKyBcIlxcXFxiXCI7XG5cdFx0fVxuXHRcdF9jb2xvckV4cCA9IG5ldyBSZWdFeHAoX2NvbG9yRXhwK1wiKVwiLCBcImdpXCIpO1xuXG5cdFx0Q1NTUGx1Z2luLmNvbG9yU3RyaW5nRmlsdGVyID0gZnVuY3Rpb24oYSkge1xuXHRcdFx0dmFyIGNvbWJpbmVkID0gYVswXSArIGFbMV0sXG5cdFx0XHRcdHRvSFNMO1xuXHRcdFx0X2NvbG9yRXhwLmxhc3RJbmRleCA9IDA7XG5cdFx0XHRpZiAoX2NvbG9yRXhwLnRlc3QoY29tYmluZWQpKSB7XG5cdFx0XHRcdHRvSFNMID0gKGNvbWJpbmVkLmluZGV4T2YoXCJoc2woXCIpICE9PSAtMSB8fCBjb21iaW5lZC5pbmRleE9mKFwiaHNsYShcIikgIT09IC0xKTtcblx0XHRcdFx0YVswXSA9IF9mb3JtYXRDb2xvcnMoYVswXSwgdG9IU0wpO1xuXHRcdFx0XHRhWzFdID0gX2Zvcm1hdENvbG9ycyhhWzFdLCB0b0hTTCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmICghVHdlZW5MaXRlLmRlZmF1bHRTdHJpbmdGaWx0ZXIpIHtcblx0XHRcdFR3ZWVuTGl0ZS5kZWZhdWx0U3RyaW5nRmlsdGVyID0gQ1NTUGx1Z2luLmNvbG9yU3RyaW5nRmlsdGVyO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIEBwcml2YXRlIFJldHVybnMgYSBmb3JtYXR0ZXIgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRha2luZyBhIHN0cmluZyAob3IgbnVtYmVyIGluIHNvbWUgY2FzZXMpIGFuZCByZXR1cm5pbmcgYSBjb25zaXN0ZW50bHkgZm9ybWF0dGVkIG9uZSBpbiB0ZXJtcyBvZiBkZWxpbWl0ZXJzLCBxdWFudGl0eSBvZiB2YWx1ZXMsIGV0Yy4gRm9yIGV4YW1wbGUsIHdlIG1heSBnZXQgYm94U2hhZG93IHZhbHVlcyBkZWZpbmVkIGFzIFwiMHB4IHJlZFwiIG9yIFwiMHB4IDBweCAxMHB4IHJnYigyNTUsMCwwKVwiIG9yIFwiMHB4IDBweCAyMHB4IDIwcHggI0YwMFwiIGFuZCB3ZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHdoYXQgd2UgZ2V0IGJhY2sgaXMgZGVzY3JpYmVkIHdpdGggNCBudW1iZXJzIGFuZCBhIGNvbG9yLiBUaGlzIGFsbG93cyB1cyB0byBmZWVkIGl0IGludG8gdGhlIF9wYXJzZUNvbXBsZXgoKSBtZXRob2QgYW5kIHNwbGl0IHRoZSB2YWx1ZXMgdXAgYXBwcm9wcmlhdGVseS4gVGhlIG5lYXQgdGhpbmcgYWJvdXQgdGhpcyBfZ2V0Rm9ybWF0dGVyKCkgZnVuY3Rpb24gaXMgdGhhdCB0aGUgZGZsdCBkZWZpbmVzIGEgcGF0dGVybiBhcyB3ZWxsIGFzIGEgZGVmYXVsdCwgc28gZm9yIGV4YW1wbGUsIF9nZXRGb3JtYXR0ZXIoXCIwcHggMHB4IDBweCAwcHggIzc3N1wiLCB0cnVlKSBub3Qgb25seSBzZXRzIHRoZSBkZWZhdWx0IGFzIDBweCBmb3IgYWxsIGRpc3RhbmNlcyBhbmQgIzc3NyBmb3IgdGhlIGNvbG9yLCBidXQgYWxzbyBzZXRzIHRoZSBwYXR0ZXJuIHN1Y2ggdGhhdCA0IG51bWJlcnMgYW5kIGEgY29sb3Igd2lsbCBhbHdheXMgZ2V0IHJldHVybmVkLlxuXHRcdCAqIEBwYXJhbSB7IXN0cmluZ30gZGZsdCBUaGUgZGVmYXVsdCB2YWx1ZSBhbmQgcGF0dGVybiB0byBmb2xsb3cuIFNvIFwiMHB4IDBweCAwcHggMHB4ICM3NzdcIiB3aWxsIGVuc3VyZSB0aGF0IDQgbnVtYmVycyBhbmQgYSBjb2xvciB3aWxsIGFsd2F5cyBnZXQgcmV0dXJuZWQuXG5cdFx0ICogQHBhcmFtIHtib29sZWFuPX0gY2xyIElmIHRydWUsIHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHNlYXJjaGVkIGZvciBjb2xvci1yZWxhdGVkIGRhdGEuIEZvciBleGFtcGxlLCBib3hTaGFkb3cgdmFsdWVzIHR5cGljYWxseSBjb250YWluIGEgY29sb3Igd2hlcmVhcyBib3JkZXJSYWRpdXMgZG9uJ3QuXG5cdFx0ICogQHBhcmFtIHtib29sZWFuPX0gY29sbGFwc2libGUgSWYgdHJ1ZSwgdGhlIHZhbHVlIGlzIGEgdG9wL2xlZnQvcmlnaHQvYm90dG9tIHN0eWxlIG9uZSB0aGF0IGFjdHMgbGlrZSBtYXJnaW4gb3IgcGFkZGluZywgd2hlcmUgaWYgb25seSBvbmUgdmFsdWUgaXMgcmVjZWl2ZWQsIGl0J3MgdXNlZCBmb3IgYWxsIDQ7IGlmIDIgYXJlIHJlY2VpdmVkLCB0aGUgZmlyc3QgaXMgZHVwbGljYXRlZCBmb3IgM3JkIChib3R0b20pIGFuZCB0aGUgMm5kIGlzIGR1cGxpY2F0ZWQgZm9yIHRoZSA0dGggc3BvdCAobGVmdCksIGV0Yy5cblx0XHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gZm9ybWF0dGVyIGZ1bmN0aW9uXG5cdFx0ICovXG5cdFx0dmFyIF9nZXRGb3JtYXR0ZXIgPSBmdW5jdGlvbihkZmx0LCBjbHIsIGNvbGxhcHNpYmxlLCBtdWx0aSkge1xuXHRcdFx0XHRpZiAoZGZsdCA9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHYpIHtyZXR1cm4gdjt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBkQ29sb3IgPSBjbHIgPyAoZGZsdC5tYXRjaChfY29sb3JFeHApIHx8IFtcIlwiXSlbMF0gOiBcIlwiLFxuXHRcdFx0XHRcdGRWYWxzID0gZGZsdC5zcGxpdChkQ29sb3IpLmpvaW4oXCJcIikubWF0Y2goX3ZhbHVlc0V4cCkgfHwgW10sXG5cdFx0XHRcdFx0cGZ4ID0gZGZsdC5zdWJzdHIoMCwgZGZsdC5pbmRleE9mKGRWYWxzWzBdKSksXG5cdFx0XHRcdFx0c2Z4ID0gKGRmbHQuY2hhckF0KGRmbHQubGVuZ3RoIC0gMSkgPT09IFwiKVwiKSA/IFwiKVwiIDogXCJcIixcblx0XHRcdFx0XHRkZWxpbSA9IChkZmx0LmluZGV4T2YoXCIgXCIpICE9PSAtMSkgPyBcIiBcIiA6IFwiLFwiLFxuXHRcdFx0XHRcdG51bVZhbHMgPSBkVmFscy5sZW5ndGgsXG5cdFx0XHRcdFx0ZFNmeCA9IChudW1WYWxzID4gMCkgPyBkVmFsc1swXS5yZXBsYWNlKF9udW1FeHAsIFwiXCIpIDogXCJcIixcblx0XHRcdFx0XHRmb3JtYXR0ZXI7XG5cdFx0XHRcdGlmICghbnVtVmFscykge1xuXHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbih2KSB7cmV0dXJuIHY7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2xyKSB7XG5cdFx0XHRcdFx0Zm9ybWF0dGVyID0gZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdFx0dmFyIGNvbG9yLCB2YWxzLCBpLCBhO1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZih2KSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdFx0XHR2ICs9IGRTZng7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG11bHRpICYmIF9jb21tYXNPdXRzaWRlUGFyZW5FeHAudGVzdCh2KSkge1xuXHRcdFx0XHRcdFx0XHRhID0gdi5yZXBsYWNlKF9jb21tYXNPdXRzaWRlUGFyZW5FeHAsIFwifFwiKS5zcGxpdChcInxcIik7XG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0YVtpXSA9IGZvcm1hdHRlcihhW2ldKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gYS5qb2luKFwiLFwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbG9yID0gKHYubWF0Y2goX2NvbG9yRXhwKSB8fCBbZENvbG9yXSlbMF07XG5cdFx0XHRcdFx0XHR2YWxzID0gdi5zcGxpdChjb2xvcikuam9pbihcIlwiKS5tYXRjaChfdmFsdWVzRXhwKSB8fCBbXTtcblx0XHRcdFx0XHRcdGkgPSB2YWxzLmxlbmd0aDtcblx0XHRcdFx0XHRcdGlmIChudW1WYWxzID4gaS0tKSB7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICgrK2kgPCBudW1WYWxzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFsc1tpXSA9IGNvbGxhcHNpYmxlID8gdmFsc1soKChpIC0gMSkgLyAyKSB8IDApXSA6IGRWYWxzW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gcGZ4ICsgdmFscy5qb2luKGRlbGltKSArIGRlbGltICsgY29sb3IgKyBzZnggKyAodi5pbmRleE9mKFwiaW5zZXRcIikgIT09IC0xID8gXCIgaW5zZXRcIiA6IFwiXCIpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmV0dXJuIGZvcm1hdHRlcjtcblxuXHRcdFx0XHR9XG5cdFx0XHRcdGZvcm1hdHRlciA9IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0XHR2YXIgdmFscywgYSwgaTtcblx0XHRcdFx0XHRpZiAodHlwZW9mKHYpID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdFx0XHR2ICs9IGRTZng7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChtdWx0aSAmJiBfY29tbWFzT3V0c2lkZVBhcmVuRXhwLnRlc3QodikpIHtcblx0XHRcdFx0XHRcdGEgPSB2LnJlcGxhY2UoX2NvbW1hc091dHNpZGVQYXJlbkV4cCwgXCJ8XCIpLnNwbGl0KFwifFwiKTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGFbaV0gPSBmb3JtYXR0ZXIoYVtpXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gYS5qb2luKFwiLFwiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFscyA9IHYubWF0Y2goX3ZhbHVlc0V4cCkgfHwgW107XG5cdFx0XHRcdFx0aSA9IHZhbHMubGVuZ3RoO1xuXHRcdFx0XHRcdGlmIChudW1WYWxzID4gaS0tKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAoKytpIDwgbnVtVmFscykge1xuXHRcdFx0XHRcdFx0XHR2YWxzW2ldID0gY29sbGFwc2libGUgPyB2YWxzWygoKGkgLSAxKSAvIDIpIHwgMCldIDogZFZhbHNbaV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBwZnggKyB2YWxzLmpvaW4oZGVsaW0pICsgc2Z4O1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXR1cm4gZm9ybWF0dGVyO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAcHJpdmF0ZSByZXR1cm5zIGEgZm9ybWF0dGVyIGZ1bmN0aW9uIHRoYXQncyB1c2VkIGZvciBlZGdlLXJlbGF0ZWQgdmFsdWVzIGxpa2UgbWFyZ2luVG9wLCBtYXJnaW5MZWZ0LCBwYWRkaW5nQm90dG9tLCBwYWRkaW5nUmlnaHQsIGV0Yy4gSnVzdCBwYXNzIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMgcmVsYXRlZCB0byB0aGUgZWRnZXMuXG5cdFx0XHQgKiBAcGFyYW0geyFzdHJpbmd9IHByb3BzIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgcHJvcGVydHkgbmFtZXMgaW4gb3JkZXIgZnJvbSB0b3AgdG8gbGVmdCwgbGlrZSBcIm1hcmdpblRvcCxtYXJnaW5SaWdodCxtYXJnaW5Cb3R0b20sbWFyZ2luTGVmdFwiXG5cdFx0XHQgKiBAcmV0dXJuIHtGdW5jdGlvbn0gYSBmb3JtYXR0ZXIgZnVuY3Rpb25cblx0XHRcdCAqL1xuXHRcdFx0X2dldEVkZ2VQYXJzZXIgPSBmdW5jdGlvbihwcm9wcykge1xuXHRcdFx0XHRwcm9wcyA9IHByb3BzLnNwbGl0KFwiLFwiKTtcblx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4sIHZhcnMpIHtcblx0XHRcdFx0XHR2YXIgYSA9IChlICsgXCJcIikuc3BsaXQoXCIgXCIpLFxuXHRcdFx0XHRcdFx0aTtcblx0XHRcdFx0XHR2YXJzID0ge307XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyc1twcm9wc1tpXV0gPSBhW2ldID0gYVtpXSB8fCBhWygoKGkgLSAxKSAvIDIpID4+IDApXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGNzc3AucGFyc2UodCwgdmFycywgcHQsIHBsdWdpbik7XG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXG5cdFx0XHQvLyBAcHJpdmF0ZSB1c2VkIHdoZW4gb3RoZXIgcGx1Z2lucyBtdXN0IHR3ZWVuIHZhbHVlcyBmaXJzdCwgbGlrZSBCZXppZXJQbHVnaW4gb3IgVGhyb3dQcm9wc1BsdWdpbiwgZXRjLiBUaGF0IHBsdWdpbidzIHNldFJhdGlvKCkgZ2V0cyBjYWxsZWQgZmlyc3Qgc28gdGhhdCB0aGUgdmFsdWVzIGFyZSB1cGRhdGVkLCBhbmQgdGhlbiB3ZSBsb29wIHRocm91Z2ggdGhlIE1pbmlQcm9wVHdlZW5zICB3aGljaCBoYW5kbGUgY29weWluZyB0aGUgdmFsdWVzIGludG8gdGhlaXIgYXBwcm9wcmlhdGUgc2xvdHMgc28gdGhhdCB0aGV5IGNhbiB0aGVuIGJlIGFwcGxpZWQgY29ycmVjdGx5IGluIHRoZSBtYWluIENTU1BsdWdpbiBzZXRSYXRpbygpIG1ldGhvZC4gUmVtZW1iZXIsIHdlIHR5cGljYWxseSBjcmVhdGUgYSBwcm94eSBvYmplY3QgdGhhdCBoYXMgYSBidW5jaCBvZiB1bmlxdWVseS1uYW1lZCBwcm9wZXJ0aWVzIHRoYXQgd2UgZmVlZCB0byB0aGUgc3ViLXBsdWdpbiBhbmQgaXQgZG9lcyBpdHMgbWFnaWMgbm9ybWFsbHksIGFuZCB0aGVuIHdlIG11c3QgaW50ZXJwcmV0IHRob3NlIHZhbHVlcyBhbmQgYXBwbHkgdGhlbSB0byB0aGUgY3NzIGJlY2F1c2Ugb2Z0ZW4gbnVtYmVycyBtdXN0IGdldCBjb21iaW5lZC9jb25jYXRlbmF0ZWQsIHN1ZmZpeGVzIGFkZGVkLCBldGMuIHRvIHdvcmsgd2l0aCBjc3MsIGxpa2UgYm94U2hhZG93IGNvdWxkIGhhdmUgNCB2YWx1ZXMgcGx1cyBhIGNvbG9yLlxuXHRcdFx0X3NldFBsdWdpblJhdGlvID0gX2ludGVybmFscy5fc2V0UGx1Z2luUmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHRoaXMucGx1Z2luLnNldFJhdGlvKHYpO1xuXHRcdFx0XHR2YXIgZCA9IHRoaXMuZGF0YSxcblx0XHRcdFx0XHRwcm94eSA9IGQucHJveHksXG5cdFx0XHRcdFx0bXB0ID0gZC5maXJzdE1QVCxcblx0XHRcdFx0XHRtaW4gPSAwLjAwMDAwMSxcblx0XHRcdFx0XHR2YWwsIHB0LCBpLCBzdHIsIHA7XG5cdFx0XHRcdHdoaWxlIChtcHQpIHtcblx0XHRcdFx0XHR2YWwgPSBwcm94eVttcHQudl07XG5cdFx0XHRcdFx0aWYgKG1wdC5yKSB7XG5cdFx0XHRcdFx0XHR2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh2YWwgPCBtaW4gJiYgdmFsID4gLW1pbikge1xuXHRcdFx0XHRcdFx0dmFsID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bXB0LnRbbXB0LnBdID0gdmFsO1xuXHRcdFx0XHRcdG1wdCA9IG1wdC5fbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZC5hdXRvUm90YXRlKSB7XG5cdFx0XHRcdFx0ZC5hdXRvUm90YXRlLnJvdGF0aW9uID0gcHJveHkucm90YXRpb247XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9hdCB0aGUgZW5kLCB3ZSBtdXN0IHNldCB0aGUgQ1NTUHJvcFR3ZWVuJ3MgXCJlXCIgKGVuZCkgdmFsdWUgZHluYW1pY2FsbHkgaGVyZSBiZWNhdXNlIHRoYXQncyB3aGF0IGlzIHVzZWQgaW4gdGhlIGZpbmFsIHNldFJhdGlvKCkgbWV0aG9kLiBTYW1lIGZvciBcImJcIiBhdCB0aGUgYmVnaW5uaW5nLlxuXHRcdFx0XHRpZiAodiA9PT0gMSB8fCB2ID09PSAwKSB7XG5cdFx0XHRcdFx0bXB0ID0gZC5maXJzdE1QVDtcblx0XHRcdFx0XHRwID0gKHYgPT09IDEpID8gXCJlXCIgOiBcImJcIjtcblx0XHRcdFx0XHR3aGlsZSAobXB0KSB7XG5cdFx0XHRcdFx0XHRwdCA9IG1wdC50O1xuXHRcdFx0XHRcdFx0aWYgKCFwdC50eXBlKSB7XG5cdFx0XHRcdFx0XHRcdHB0W3BdID0gcHQucyArIHB0LnhzMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocHQudHlwZSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0XHRzdHIgPSBwdC54czAgKyBwdC5zICsgcHQueHMxO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAxOyBpIDwgcHQubDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0c3RyICs9IHB0W1wieG5cIitpXSArIHB0W1wieHNcIisoaSsxKV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cHRbcF0gPSBzdHI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtcHQgPSBtcHQuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIEBwcml2YXRlIEBjb25zdHJ1Y3RvciBVc2VkIGJ5IGEgZmV3IFNwZWNpYWxQcm9wcyB0byBob2xkIGltcG9ydGFudCB2YWx1ZXMgZm9yIHByb3hpZXMuIEZvciBleGFtcGxlLCBfcGFyc2VUb1Byb3h5KCkgY3JlYXRlcyBhIE1pbmlQcm9wVHdlZW4gaW5zdGFuY2UgZm9yIGVhY2ggcHJvcGVydHkgdGhhdCBtdXN0IGdldCB0d2VlbmVkIG9uIHRoZSBwcm94eSwgYW5kIHdlIHJlY29yZCB0aGUgb3JpZ2luYWwgcHJvcGVydHkgbmFtZSBhcyB3ZWxsIGFzIHRoZSB1bmlxdWUgb25lIHdlIGNyZWF0ZSBmb3IgdGhlIHByb3h5LCBwbHVzIHdoZXRoZXIgb3Igbm90IHRoZSB2YWx1ZSBuZWVkcyB0byBiZSByb3VuZGVkIHBsdXMgdGhlIG9yaWdpbmFsIHZhbHVlLlxuXHRcdFx0ICogQHBhcmFtIHshT2JqZWN0fSB0IHRhcmdldCBvYmplY3Qgd2hvc2UgcHJvcGVydHkgd2UncmUgdHdlZW5pbmcgKG9mdGVuIGEgQ1NTUHJvcFR3ZWVuKVxuXHRcdFx0ICogQHBhcmFtIHshc3RyaW5nfSBwIHByb3BlcnR5IG5hbWVcblx0XHRcdCAqIEBwYXJhbSB7KG51bWJlcnxzdHJpbmd8b2JqZWN0KX0gdiB2YWx1ZVxuXHRcdFx0ICogQHBhcmFtIHtNaW5pUHJvcFR3ZWVuPX0gbmV4dCBuZXh0IE1pbmlQcm9wVHdlZW4gaW4gdGhlIGxpbmtlZCBsaXN0XG5cdFx0XHQgKiBAcGFyYW0ge2Jvb2xlYW49fSByIGlmIHRydWUsIHRoZSB0d2VlbmVkIHZhbHVlIHNob3VsZCBiZSByb3VuZGVkIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcblx0XHRcdCAqL1xuXHRcdFx0TWluaVByb3BUd2VlbiA9IGZ1bmN0aW9uKHQsIHAsIHYsIG5leHQsIHIpIHtcblx0XHRcdFx0dGhpcy50ID0gdDtcblx0XHRcdFx0dGhpcy5wID0gcDtcblx0XHRcdFx0dGhpcy52ID0gdjtcblx0XHRcdFx0dGhpcy5yID0gcjtcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHRuZXh0Ll9wcmV2ID0gdGhpcztcblx0XHRcdFx0XHR0aGlzLl9uZXh0ID0gbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAcHJpdmF0ZSBNb3N0IG90aGVyIHBsdWdpbnMgKGxpa2UgQmV6aWVyUGx1Z2luIGFuZCBUaHJvd1Byb3BzUGx1Z2luIGFuZCBvdGhlcnMpIGNhbiBvbmx5IHR3ZWVuIG51bWVyaWMgdmFsdWVzLCBidXQgQ1NTUGx1Z2luIG11c3QgYWNjb21tb2RhdGUgc3BlY2lhbCB2YWx1ZXMgdGhhdCBoYXZlIGEgYnVuY2ggb2YgZXh0cmEgZGF0YSAobGlrZSBhIHN1ZmZpeCBvciBzdHJpbmdzIGJldHdlZW4gbnVtZXJpYyB2YWx1ZXMsIGV0Yy4pLiBGb3IgZXhhbXBsZSwgYm94U2hhZG93IGhhcyB2YWx1ZXMgbGlrZSBcIjEwcHggMTBweCAyMHB4IDMwcHggcmdiKDI1NSwwLDApXCIgd2hpY2ggd291bGQgdXR0ZXJseSBjb25mdXNlIG90aGVyIHBsdWdpbnMuIFRoaXMgbWV0aG9kIGFsbG93cyB1cyB0byBzcGxpdCB0aGF0IGRhdGEgYXBhcnQgYW5kIGdyYWIgb25seSB0aGUgbnVtZXJpYyBkYXRhIGFuZCBhdHRhY2ggaXQgdG8gdW5pcXVlbHktbmFtZWQgcHJvcGVydGllcyBvZiBhIGdlbmVyaWMgcHJveHkgb2JqZWN0ICh7fSkgc28gdGhhdCB3ZSBjYW4gZmVlZCB0aGF0IHRvIHZpcnR1YWxseSBhbnkgcGx1Z2luIHRvIGhhdmUgdGhlIG51bWJlcnMgdHdlZW5lZC4gSG93ZXZlciwgd2UgbXVzdCBhbHNvIGtlZXAgdHJhY2sgb2Ygd2hpY2ggcHJvcGVydGllcyBmcm9tIHRoZSBwcm94eSBnbyB3aXRoIHdoaWNoIENTU1Byb3BUd2VlbiB2YWx1ZXMgYW5kIGluc3RhbmNlcy4gU28gd2UgY3JlYXRlIGEgbGlua2VkIGxpc3Qgb2YgTWluaVByb3BUd2VlbnMuIEVhY2ggb25lIHJlY29yZHMgYSB0YXJnZXQgKHRoZSBvcmlnaW5hbCBDU1NQcm9wVHdlZW4pLCBwcm9wZXJ0eSAobGlrZSBcInNcIiBvciBcInhuMVwiIG9yIFwieG4yXCIpIHRoYXQgd2UncmUgdHdlZW5pbmcgYW5kIHRoZSB1bmlxdWUgcHJvcGVydHkgbmFtZSB0aGF0IHdhcyB1c2VkIGZvciB0aGUgcHJveHkgKGxpa2UgXCJib3hTaGFkb3dfeG4xXCIgYW5kIFwiYm94U2hhZG93X3huMlwiKSBhbmQgd2hldGhlciBvciBub3QgdGhleSBuZWVkIHRvIGJlIHJvdW5kZWQuIFRoYXQgd2F5LCBpbiB0aGUgX3NldFBsdWdpblJhdGlvKCkgbWV0aG9kIHdlIGNhbiBzaW1wbHkgY29weSB0aGUgdmFsdWVzIG92ZXIgZnJvbSB0aGUgcHJveHkgdG8gdGhlIENTU1Byb3BUd2VlbiBpbnN0YW5jZShzKS4gVGhlbiwgd2hlbiB0aGUgbWFpbiBDU1NQbHVnaW4gc2V0UmF0aW8oKSBtZXRob2QgcnVucyBhbmQgYXBwbGllcyB0aGUgQ1NTUHJvcFR3ZWVuIHZhbHVlcyBhY2NvcmRpbmdseSwgdGhleSdyZSB1cGRhdGVkIG5pY2VseS4gU28gdGhlIGV4dGVybmFsIHBsdWdpbiB0d2VlbnMgdGhlIG51bWJlcnMsIF9zZXRQbHVnaW5SYXRpbygpIGNvcGllcyB0aGVtIG92ZXIsIGFuZCBzZXRSYXRpbygpIGFjdHMgbm9ybWFsbHksIGFwcGx5aW5nIGNzcy1zcGVjaWZpYyB2YWx1ZXMgdG8gdGhlIGVsZW1lbnQuXG5cdFx0XHQgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IGhhcyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG5cdFx0XHQgKiAgLSBwcm94eTogYSBnZW5lcmljIG9iamVjdCBjb250YWluaW5nIHRoZSBzdGFydGluZyB2YWx1ZXMgZm9yIGFsbCB0aGUgcHJvcGVydGllcyB0aGF0IHdpbGwgYmUgdHdlZW5lZCBieSB0aGUgZXh0ZXJuYWwgcGx1Z2luLiAgVGhpcyBpcyB3aGF0IHdlIGZlZWQgdG8gdGhlIGV4dGVybmFsIF9vbkluaXRUd2VlbigpIGFzIHRoZSB0YXJnZXRcblx0XHRcdCAqICAtIGVuZDogYSBnZW5lcmljIG9iamVjdCBjb250YWluaW5nIHRoZSBlbmRpbmcgdmFsdWVzIGZvciBhbGwgdGhlIHByb3BlcnRpZXMgdGhhdCB3aWxsIGJlIHR3ZWVuZWQgYnkgdGhlIGV4dGVybmFsIHBsdWdpbi4gVGhpcyBpcyB3aGF0IHdlIGZlZWQgdG8gdGhlIGV4dGVybmFsIHBsdWdpbidzIF9vbkluaXRUd2VlbigpIGFzIHRoZSBkZXN0aW5hdGlvbiB2YWx1ZXNcblx0XHRcdCAqICAtIGZpcnN0TVBUOiB0aGUgZmlyc3QgTWluaVByb3BUd2VlbiBpbiB0aGUgbGlua2VkIGxpc3Rcblx0XHRcdCAqICAtIHB0OiB0aGUgZmlyc3QgQ1NTUHJvcFR3ZWVuIGluIHRoZSBsaW5rZWQgbGlzdCB0aGF0IHdhcyBjcmVhdGVkIHdoZW4gcGFyc2luZy4gSWYgc2hhbGxvdyBpcyB0cnVlLCB0aGlzIGxpbmtlZCBsaXN0IHdpbGwgTk9UIGF0dGFjaCB0byB0aGUgb25lIHBhc3NlZCBpbnRvIHRoZSBfcGFyc2VUb1Byb3h5KCkgYXMgdGhlIFwicHRcIiAoNHRoKSBwYXJhbWV0ZXIuXG5cdFx0XHQgKiBAcGFyYW0geyFPYmplY3R9IHQgdGFyZ2V0IG9iamVjdCB0byBiZSB0d2VlbmVkXG5cdFx0XHQgKiBAcGFyYW0geyEoT2JqZWN0fHN0cmluZyl9IHZhcnMgdGhlIG9iamVjdCBjb250YWluaW5nIHRoZSBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdHdlZW5pbmcgdmFsdWVzICh0eXBpY2FsbHkgdGhlIGVuZC9kZXN0aW5hdGlvbiB2YWx1ZXMpIHRoYXQgc2hvdWxkIGJlIHBhcnNlZFxuXHRcdFx0ICogQHBhcmFtIHshQ1NTUGx1Z2lufSBjc3NwIFRoZSBDU1NQbHVnaW4gaW5zdGFuY2Vcblx0XHRcdCAqIEBwYXJhbSB7Q1NTUHJvcFR3ZWVuPX0gcHQgdGhlIG5leHQgQ1NTUHJvcFR3ZWVuIGluIHRoZSBsaW5rZWQgbGlzdFxuXHRcdFx0ICogQHBhcmFtIHtUd2VlblBsdWdpbj19IHBsdWdpbiB0aGUgZXh0ZXJuYWwgVHdlZW5QbHVnaW4gaW5zdGFuY2UgdGhhdCB3aWxsIGJlIGhhbmRsaW5nIHR3ZWVuaW5nIHRoZSBudW1lcmljIHZhbHVlc1xuXHRcdFx0ICogQHBhcmFtIHtib29sZWFuPX0gc2hhbGxvdyBpZiB0cnVlLCB0aGUgcmVzdWx0aW5nIGxpbmtlZCBsaXN0IGZyb20gdGhlIHBhcnNlIHdpbGwgTk9UIGJlIGF0dGFjaGVkIHRvIHRoZSBDU1NQcm9wVHdlZW4gdGhhdCB3YXMgcGFzc2VkIGluIGFzIHRoZSBcInB0XCIgKDR0aCkgcGFyYW1ldGVyLlxuXHRcdFx0ICogQHJldHVybiBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6IHByb3h5LCBlbmQsIGZpcnN0TVBULCBhbmQgcHQgKHNlZSBhYm92ZSBmb3IgZGVzY3JpcHRpb25zKVxuXHRcdFx0ICovXG5cdFx0XHRfcGFyc2VUb1Byb3h5ID0gX2ludGVybmFscy5fcGFyc2VUb1Byb3h5ID0gZnVuY3Rpb24odCwgdmFycywgY3NzcCwgcHQsIHBsdWdpbiwgc2hhbGxvdykge1xuXHRcdFx0XHR2YXIgYnB0ID0gcHQsXG5cdFx0XHRcdFx0c3RhcnQgPSB7fSxcblx0XHRcdFx0XHRlbmQgPSB7fSxcblx0XHRcdFx0XHR0cmFuc2Zvcm0gPSBjc3NwLl90cmFuc2Zvcm0sXG5cdFx0XHRcdFx0b2xkRm9yY2UgPSBfZm9yY2VQVCxcblx0XHRcdFx0XHRpLCBwLCB4cCwgbXB0LCBmaXJzdFBUO1xuXHRcdFx0XHRjc3NwLl90cmFuc2Zvcm0gPSBudWxsO1xuXHRcdFx0XHRfZm9yY2VQVCA9IHZhcnM7XG5cdFx0XHRcdHB0ID0gZmlyc3RQVCA9IGNzc3AucGFyc2UodCwgdmFycywgcHQsIHBsdWdpbik7XG5cdFx0XHRcdF9mb3JjZVBUID0gb2xkRm9yY2U7XG5cdFx0XHRcdC8vYnJlYWsgb2ZmIGZyb20gdGhlIGxpbmtlZCBsaXN0IHNvIHRoZSBuZXcgb25lcyBhcmUgaXNvbGF0ZWQuXG5cdFx0XHRcdGlmIChzaGFsbG93KSB7XG5cdFx0XHRcdFx0Y3NzcC5fdHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXHRcdFx0XHRcdGlmIChicHQpIHtcblx0XHRcdFx0XHRcdGJwdC5fcHJldiA9IG51bGw7XG5cdFx0XHRcdFx0XHRpZiAoYnB0Ll9wcmV2KSB7XG5cdFx0XHRcdFx0XHRcdGJwdC5fcHJldi5fbmV4dCA9IG51bGw7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHdoaWxlIChwdCAmJiBwdCAhPT0gYnB0KSB7XG5cdFx0XHRcdFx0aWYgKHB0LnR5cGUgPD0gMSkge1xuXHRcdFx0XHRcdFx0cCA9IHB0LnA7XG5cdFx0XHRcdFx0XHRlbmRbcF0gPSBwdC5zICsgcHQuYztcblx0XHRcdFx0XHRcdHN0YXJ0W3BdID0gcHQucztcblx0XHRcdFx0XHRcdGlmICghc2hhbGxvdykge1xuXHRcdFx0XHRcdFx0XHRtcHQgPSBuZXcgTWluaVByb3BUd2VlbihwdCwgXCJzXCIsIHAsIG1wdCwgcHQucik7XG5cdFx0XHRcdFx0XHRcdHB0LmMgPSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHB0LnR5cGUgPT09IDEpIHtcblx0XHRcdFx0XHRcdFx0aSA9IHB0Lmw7XG5cdFx0XHRcdFx0XHRcdHdoaWxlICgtLWkgPiAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0eHAgPSBcInhuXCIgKyBpO1xuXHRcdFx0XHRcdFx0XHRcdHAgPSBwdC5wICsgXCJfXCIgKyB4cDtcblx0XHRcdFx0XHRcdFx0XHRlbmRbcF0gPSBwdC5kYXRhW3hwXTtcblx0XHRcdFx0XHRcdFx0XHRzdGFydFtwXSA9IHB0W3hwXTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIXNoYWxsb3cpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1wdCA9IG5ldyBNaW5pUHJvcFR3ZWVuKHB0LCB4cCwgcCwgbXB0LCBwdC5yeHBbeHBdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4ge3Byb3h5OnN0YXJ0LCBlbmQ6ZW5kLCBmaXJzdE1QVDptcHQsIHB0OmZpcnN0UFR9O1xuXHRcdFx0fSxcblxuXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogQGNvbnN0cnVjdG9yIEVhY2ggcHJvcGVydHkgdGhhdCBpcyB0d2VlbmVkIGhhcyBhdCBsZWFzdCBvbmUgQ1NTUHJvcFR3ZWVuIGFzc29jaWF0ZWQgd2l0aCBpdC4gVGhlc2UgaW5zdGFuY2VzIHN0b3JlIGltcG9ydGFudCBpbmZvcm1hdGlvbiBsaWtlIHRoZSB0YXJnZXQsIHByb3BlcnR5LCBzdGFydGluZyB2YWx1ZSwgYW1vdW50IG9mIGNoYW5nZSwgZXRjLiBUaGV5IGNhbiBhbHNvIG9wdGlvbmFsbHkgaGF2ZSBhIG51bWJlciBvZiBcImV4dHJhXCIgc3RyaW5ncyBhbmQgbnVtZXJpYyB2YWx1ZXMgbmFtZWQgeHMxLCB4bjEsIHhzMiwgeG4yLCB4czMsIHhuMywgZXRjLiB3aGVyZSBcInNcIiBpbmRpY2F0ZXMgc3RyaW5nIGFuZCBcIm5cIiBpbmRpY2F0ZXMgbnVtYmVyLiBUaGVzZSBjYW4gYmUgcGllY2VkIHRvZ2V0aGVyIGluIGEgY29tcGxleC12YWx1ZSB0d2VlbiAodHlwZToxKSB0aGF0IGhhcyBhbHRlcm5hdGluZyB0eXBlcyBvZiBkYXRhIGxpa2UgYSBzdHJpbmcsIG51bWJlciwgc3RyaW5nLCBudW1iZXIsIGV0Yy4gRm9yIGV4YW1wbGUsIGJveFNoYWRvdyBjb3VsZCBiZSBcIjVweCA1cHggOHB4IHJnYigxMDIsIDEwMiwgNTEpXCIuIEluIHRoYXQgdmFsdWUsIHRoZXJlIGFyZSA2IG51bWJlcnMgdGhhdCBtYXkgbmVlZCB0byB0d2VlbiBhbmQgdGhlbiBwaWVjZWQgYmFjayB0b2dldGhlciBpbnRvIGEgc3RyaW5nIGFnYWluIHdpdGggc3BhY2VzLCBzdWZmaXhlcywgZXRjLiB4czAgaXMgc3BlY2lhbCBpbiB0aGF0IGl0IHN0b3JlcyB0aGUgc3VmZml4IGZvciBzdGFuZGFyZCAodHlwZTowKSB0d2VlbnMsIC1PUi0gdGhlIGZpcnN0IHN0cmluZyAocHJlZml4KSBpbiBhIGNvbXBsZXgtdmFsdWUgKHR5cGU6MSkgQ1NTUHJvcFR3ZWVuIC1PUi0gaXQgY2FuIGJlIHRoZSBub24tdHdlZW5pbmcgdmFsdWUgaW4gYSB0eXBlOi0xIENTU1Byb3BUd2Vlbi4gV2UgZG8gdGhpcyB0byBjb25zZXJ2ZSBtZW1vcnkuXG5cdFx0XHQgKiBDU1NQcm9wVHdlZW5zIGhhdmUgdGhlIGZvbGxvd2luZyBvcHRpb25hbCBwcm9wZXJ0aWVzIGFzIHdlbGwgKG5vdCBkZWZpbmVkIHRocm91Z2ggdGhlIGNvbnN0cnVjdG9yKTpcblx0XHRcdCAqICAtIGw6IExlbmd0aCBpbiB0ZXJtcyBvZiB0aGUgbnVtYmVyIG9mIGV4dHJhIHByb3BlcnRpZXMgdGhhdCB0aGUgQ1NTUHJvcFR3ZWVuIGhhcyAoZGVmYXVsdDogMCkuIEZvciBleGFtcGxlLCBmb3IgYSBib3hTaGFkb3cgd2UgbWF5IG5lZWQgdG8gdHdlZW4gNSBudW1iZXJzIGluIHdoaWNoIGNhc2UgbCB3b3VsZCBiZSA1OyBLZWVwIGluIG1pbmQgdGhhdCB0aGUgc3RhcnQvZW5kIHZhbHVlcyBmb3IgdGhlIGZpcnN0IG51bWJlciB0aGF0J3MgdHdlZW5lZCBhcmUgYWx3YXlzIHN0b3JlZCBpbiB0aGUgcyBhbmQgYyBwcm9wZXJ0aWVzIHRvIGNvbnNlcnZlIG1lbW9yeS4gQWxsIGFkZGl0aW9uYWwgdmFsdWVzIHRoZXJlYWZ0ZXIgYXJlIHN0b3JlZCBpbiB4bjEsIHhuMiwgZXRjLlxuXHRcdFx0ICogIC0geGZpcnN0OiBUaGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IHN1Yi1DU1NQcm9wVHdlZW5zIHRoYXQgYXJlIHR3ZWVuaW5nIHByb3BlcnRpZXMgb2YgdGhpcyBpbnN0YW5jZS4gRm9yIGV4YW1wbGUsIHdlIG1heSBzcGxpdCB1cCBhIGJveFNoYWRvdyB0d2VlbiBzbyB0aGF0IHRoZXJlJ3MgYSBtYWluIENTU1Byb3BUd2VlbiBvZiB0eXBlOjEgdGhhdCBoYXMgdmFyaW91cyB4cyogYW5kIHhuKiB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBoLXNoYWRvdywgdi1zaGFkb3csIGJsdXIsIGNvbG9yLCBldGMuIFRoZW4gd2Ugc3Bhd24gYSBDU1NQcm9wVHdlZW4gZm9yIGVhY2ggb2YgdGhvc2UgdGhhdCBoYXMgYSBoaWdoZXIgcHJpb3JpdHkgYW5kIHJ1bnMgQkVGT1JFIHRoZSBtYWluIENTU1Byb3BUd2VlbiBzbyB0aGF0IHRoZSB2YWx1ZXMgYXJlIGFsbCBzZXQgYnkgdGhlIHRpbWUgaXQgbmVlZHMgdG8gcmUtYXNzZW1ibGUgdGhlbS4gVGhlIHhmaXJzdCBnaXZlcyB1cyBhbiBlYXN5IHdheSB0byBpZGVudGlmeSB0aGUgZmlyc3Qgb25lIGluIHRoYXQgY2hhaW4gd2hpY2ggdHlwaWNhbGx5IGVuZHMgYXQgdGhlIG1haW4gb25lIChiZWNhdXNlIHRoZXkncmUgYWxsIHByZXBlbmRlIHRvIHRoZSBsaW5rZWQgbGlzdClcblx0XHRcdCAqICAtIHBsdWdpbjogVGhlIFR3ZWVuUGx1Z2luIGluc3RhbmNlIHRoYXQgd2lsbCBoYW5kbGUgdGhlIHR3ZWVuaW5nIG9mIGFueSBjb21wbGV4IHZhbHVlcy4gRm9yIGV4YW1wbGUsIHNvbWV0aW1lcyB3ZSBkb24ndCB3YW50IHRvIHVzZSBub3JtYWwgc3VidHdlZW5zIChsaWtlIHhmaXJzdCByZWZlcnMgdG8pIHRvIHR3ZWVuIHRoZSB2YWx1ZXMgLSB3ZSBtaWdodCB3YW50IFRocm93UHJvcHNQbHVnaW4gb3IgQmV6aWVyUGx1Z2luIHNvbWUgb3RoZXIgcGx1Z2luIHRvIGRvIHRoZSBhY3R1YWwgdHdlZW5pbmcsIHNvIHdlIGNyZWF0ZSBhIHBsdWdpbiBpbnN0YW5jZSBhbmQgc3RvcmUgYSByZWZlcmVuY2UgaGVyZS4gV2UgbmVlZCB0aGlzIHJlZmVyZW5jZSBzbyB0aGF0IGlmIHdlIGdldCBhIHJlcXVlc3QgdG8gcm91bmQgdmFsdWVzIG9yIGRpc2FibGUgYSB0d2Vlbiwgd2UgY2FuIHBhc3MgYWxvbmcgdGhhdCByZXF1ZXN0LlxuXHRcdFx0ICogIC0gZGF0YTogQXJiaXRyYXJ5IGRhdGEgdGhhdCBuZWVkcyB0byBiZSBzdG9yZWQgd2l0aCB0aGUgQ1NTUHJvcFR3ZWVuLiBUeXBpY2FsbHkgaWYgd2UncmUgZ29pbmcgdG8gaGF2ZSBhIHBsdWdpbiBoYW5kbGUgdGhlIHR3ZWVuaW5nIG9mIGEgY29tcGxleC12YWx1ZSB0d2Vlbiwgd2UgY3JlYXRlIGEgZ2VuZXJpYyBvYmplY3QgdGhhdCBzdG9yZXMgdGhlIEVORCB2YWx1ZXMgdGhhdCB3ZSdyZSB0d2VlbmluZyB0byBhbmQgdGhlIENTU1Byb3BUd2VlbidzIHhzMSwgeHMyLCBldGMuIGhhdmUgdGhlIHN0YXJ0aW5nIHZhbHVlcy4gV2Ugc3RvcmUgdGhhdCBvYmplY3QgYXMgZGF0YS4gVGhhdCB3YXksIHdlIGNhbiBzaW1wbHkgcGFzcyB0aGF0IG9iamVjdCB0byB0aGUgcGx1Z2luIGFuZCB1c2UgdGhlIENTU1Byb3BUd2VlbiBhcyB0aGUgdGFyZ2V0LlxuXHRcdFx0ICogIC0gc2V0UmF0aW86IE9ubHkgdXNlZCBmb3IgdHlwZToyIHR3ZWVucyB0aGF0IHJlcXVpcmUgY3VzdG9tIGZ1bmN0aW9uYWxpdHkuIEluIHRoaXMgY2FzZSwgd2UgY2FsbCB0aGUgQ1NTUHJvcFR3ZWVuJ3Mgc2V0UmF0aW8oKSBtZXRob2QgYW5kIHBhc3MgdGhlIHJhdGlvIGVhY2ggdGltZSB0aGUgdHdlZW4gdXBkYXRlcy4gVGhpcyBpc24ndCBxdWl0ZSBhcyBlZmZpY2llbnQgYXMgZG9pbmcgdGhpbmdzIGRpcmVjdGx5IGluIHRoZSBDU1NQbHVnaW4ncyBzZXRSYXRpbygpIG1ldGhvZCwgYnV0IGl0J3MgdmVyeSBjb252ZW5pZW50IGFuZCBmbGV4aWJsZS5cblx0XHRcdCAqIEBwYXJhbSB7IU9iamVjdH0gdCBUYXJnZXQgb2JqZWN0IHdob3NlIHByb3BlcnR5IHdpbGwgYmUgdHdlZW5lZC4gT2Z0ZW4gYSBET00gZWxlbWVudCwgYnV0IG5vdCBhbHdheXMuIEl0IGNvdWxkIGJlIGFueXRoaW5nLlxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IHAgUHJvcGVydHkgdG8gdHdlZW4gKG5hbWUpLiBGb3IgZXhhbXBsZSwgdG8gdHdlZW4gZWxlbWVudC53aWR0aCwgcCB3b3VsZCBiZSBcIndpZHRoXCIuXG5cdFx0XHQgKiBAcGFyYW0ge251bWJlcn0gcyBTdGFydGluZyBudW1lcmljIHZhbHVlXG5cdFx0XHQgKiBAcGFyYW0ge251bWJlcn0gYyBDaGFuZ2UgaW4gbnVtZXJpYyB2YWx1ZSBvdmVyIHRoZSBjb3Vyc2Ugb2YgdGhlIGVudGlyZSB0d2Vlbi4gRm9yIGV4YW1wbGUsIGlmIGVsZW1lbnQud2lkdGggc3RhcnRzIGF0IDUgYW5kIHNob3VsZCBlbmQgYXQgMTAwLCBjIHdvdWxkIGJlIDk1LlxuXHRcdFx0ICogQHBhcmFtIHtDU1NQcm9wVHdlZW49fSBuZXh0IFRoZSBuZXh0IENTU1Byb3BUd2VlbiBpbiB0aGUgbGlua2VkIGxpc3QuIElmIG9uZSBpcyBkZWZpbmVkLCB3ZSB3aWxsIGRlZmluZSBpdHMgX3ByZXYgYXMgdGhlIG5ldyBpbnN0YW5jZSwgYW5kIHRoZSBuZXcgaW5zdGFuY2UncyBfbmV4dCB3aWxsIGJlIHBvaW50ZWQgYXQgaXQuXG5cdFx0XHQgKiBAcGFyYW0ge251bWJlcj19IHR5cGUgVGhlIHR5cGUgb2YgQ1NTUHJvcFR3ZWVuIHdoZXJlIC0xID0gYSBub24tdHdlZW5pbmcgdmFsdWUsIDAgPSBhIHN0YW5kYXJkIHNpbXBsZSB0d2VlbiwgMSA9IGEgY29tcGxleCB2YWx1ZSAobGlrZSBvbmUgdGhhdCBoYXMgbXVsdGlwbGUgbnVtYmVycyBpbiBhIGNvbW1hLSBvciBzcGFjZS1kZWxpbWl0ZWQgc3RyaW5nIGxpa2UgYm9yZGVyOlwiMXB4IHNvbGlkIHJlZFwiKSwgYW5kIDIgPSBvbmUgdGhhdCB1c2VzIGEgY3VzdG9tIHNldFJhdGlvIGZ1bmN0aW9uIHRoYXQgZG9lcyBhbGwgb2YgdGhlIHdvcmsgb2YgYXBwbHlpbmcgdGhlIHZhbHVlcyBvbiBlYWNoIHVwZGF0ZS5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nPX0gbiBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciBvdmVyd3JpdGluZyBwdXJwb3NlcyB3aGljaCBpcyB0eXBpY2FsbHkgdGhlIHNhbWUgYXMgcCBidXQgbm90IGFsd2F5cy4gRm9yIGV4YW1wbGUsIHdlIG1heSBuZWVkIHRvIGNyZWF0ZSBhIHN1YnR3ZWVuIGZvciB0aGUgMm5kIHBhcnQgb2YgYSBcImNsaXA6cmVjdCguLi4pXCIgdHdlZW4gaW4gd2hpY2ggY2FzZSBcInBcIiBtaWdodCBiZSB4czEgYnV0IFwiblwiIGlzIHN0aWxsIFwiY2xpcFwiXG5cdFx0XHQgKiBAcGFyYW0ge2Jvb2xlYW49fSByIElmIHRydWUsIHRoZSB2YWx1ZShzKSBzaG91bGQgYmUgcm91bmRlZFxuXHRcdFx0ICogQHBhcmFtIHtudW1iZXI9fSBwciBQcmlvcml0eSBpbiB0aGUgbGlua2VkIGxpc3Qgb3JkZXIuIEhpZ2hlciBwcmlvcml0eSBDU1NQcm9wVHdlZW5zIHdpbGwgYmUgdXBkYXRlZCBiZWZvcmUgbG93ZXIgcHJpb3JpdHkgb25lcy4gVGhlIGRlZmF1bHQgcHJpb3JpdHkgaXMgMC5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nPX0gYiBCZWdpbm5pbmcgdmFsdWUuIFdlIHN0b3JlIHRoaXMgdG8gZW5zdXJlIHRoYXQgaXQgaXMgRVhBQ1RMWSB3aGF0IGl0IHdhcyB3aGVuIHRoZSB0d2VlbiBiZWdhbiB3aXRob3V0IGFueSByaXNrIG9mIGludGVycHJldGF0aW9uIGlzc3Vlcy5cblx0XHRcdCAqIEBwYXJhbSB7c3RyaW5nPX0gZSBFbmRpbmcgdmFsdWUuIFdlIHN0b3JlIHRoaXMgdG8gZW5zdXJlIHRoYXQgaXQgaXMgRVhBQ1RMWSB3aGF0IHRoZSB1c2VyIGRlZmluZWQgYXQgdGhlIGVuZCBvZiB0aGUgdHdlZW4gd2l0aG91dCBhbnkgcmlzayBvZiBpbnRlcnByZXRhdGlvbiBpc3N1ZXMuXG5cdFx0XHQgKi9cblx0XHRcdENTU1Byb3BUd2VlbiA9IF9pbnRlcm5hbHMuQ1NTUHJvcFR3ZWVuID0gZnVuY3Rpb24odCwgcCwgcywgYywgbmV4dCwgdHlwZSwgbiwgciwgcHIsIGIsIGUpIHtcblx0XHRcdFx0dGhpcy50ID0gdDsgLy90YXJnZXRcblx0XHRcdFx0dGhpcy5wID0gcDsgLy9wcm9wZXJ0eVxuXHRcdFx0XHR0aGlzLnMgPSBzOyAvL3N0YXJ0aW5nIHZhbHVlXG5cdFx0XHRcdHRoaXMuYyA9IGM7IC8vY2hhbmdlIHZhbHVlXG5cdFx0XHRcdHRoaXMubiA9IG4gfHwgcDsgLy9uYW1lIHRoYXQgdGhpcyBDU1NQcm9wVHdlZW4gc2hvdWxkIGJlIGFzc29jaWF0ZWQgdG8gKHVzdWFsbHkgdGhlIHNhbWUgYXMgcCwgYnV0IG5vdCBhbHdheXMgLSBuIGlzIHdoYXQgb3ZlcndyaXRpbmcgbG9va3MgYXQpXG5cdFx0XHRcdGlmICghKHQgaW5zdGFuY2VvZiBDU1NQcm9wVHdlZW4pKSB7XG5cdFx0XHRcdFx0X292ZXJ3cml0ZVByb3BzLnB1c2godGhpcy5uKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnIgPSByOyAvL3JvdW5kIChib29sZWFuKVxuXHRcdFx0XHR0aGlzLnR5cGUgPSB0eXBlIHx8IDA7IC8vMCA9IG5vcm1hbCB0d2VlbiwgLTEgPSBub24tdHdlZW5pbmcgKGluIHdoaWNoIGNhc2UgeHMwIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgdGFyZ2V0J3MgcHJvcGVydHksIGxpa2UgdHAudFt0cC5wXSA9IHRwLnhzMCksIDEgPSBjb21wbGV4LXZhbHVlIFNwZWNpYWxQcm9wLCAyID0gY3VzdG9tIHNldFJhdGlvKCkgdGhhdCBkb2VzIGFsbCB0aGUgd29ya1xuXHRcdFx0XHRpZiAocHIpIHtcblx0XHRcdFx0XHR0aGlzLnByID0gcHI7XG5cdFx0XHRcdFx0X2hhc1ByaW9yaXR5ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmIgPSAoYiA9PT0gdW5kZWZpbmVkKSA/IHMgOiBiO1xuXHRcdFx0XHR0aGlzLmUgPSAoZSA9PT0gdW5kZWZpbmVkKSA/IHMgKyBjIDogZTtcblx0XHRcdFx0aWYgKG5leHQpIHtcblx0XHRcdFx0XHR0aGlzLl9uZXh0ID0gbmV4dDtcblx0XHRcdFx0XHRuZXh0Ll9wcmV2ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSxcblxuXHRcdFx0X2FkZE5vblR3ZWVuaW5nTnVtZXJpY1BUID0gZnVuY3Rpb24odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBuZXh0LCBvdmVyd3JpdGVQcm9wKSB7IC8vY2xlYW5zIHVwIHNvbWUgY29kZSByZWR1bmRhbmNpZXMgYW5kIGhlbHBzIG1pbmlmaWNhdGlvbi4gSnVzdCBhIGZhc3Qgd2F5IHRvIGFkZCBhIE5VTUVSSUMgbm9uLXR3ZWVuaW5nIENTU1Byb3BUd2VlblxuXHRcdFx0XHR2YXIgcHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHRhcmdldCwgcHJvcCwgc3RhcnQsIGVuZCAtIHN0YXJ0LCBuZXh0LCAtMSwgb3ZlcndyaXRlUHJvcCk7XG5cdFx0XHRcdHB0LmIgPSBzdGFydDtcblx0XHRcdFx0cHQuZSA9IHB0LnhzMCA9IGVuZDtcblx0XHRcdFx0cmV0dXJuIHB0O1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUYWtlcyBhIHRhcmdldCwgdGhlIGJlZ2lubmluZyB2YWx1ZSBhbmQgZW5kaW5nIHZhbHVlIChhcyBzdHJpbmdzKSBhbmQgcGFyc2VzIHRoZW0gaW50byBhIENTU1Byb3BUd2VlbiAocG9zc2libHkgd2l0aCBjaGlsZCBDU1NQcm9wVHdlZW5zKSB0aGF0IGFjY29tbW9kYXRlcyBtdWx0aXBsZSBudW1iZXJzLCBjb2xvcnMsIGNvbW1hLWRlbGltaXRlZCB2YWx1ZXMsIGV0Yy4gRm9yIGV4YW1wbGU6XG5cdFx0XHQgKiBzcC5wYXJzZUNvbXBsZXgoZWxlbWVudCwgXCJib3hTaGFkb3dcIiwgXCI1cHggMTBweCAyMHB4IHJnYigyNTUsMTAyLDUxKVwiLCBcIjBweCAwcHggMHB4IHJlZFwiLCB0cnVlLCBcIjBweCAwcHggMHB4IHJnYigwLDAsMCwwKVwiLCBwdCk7XG5cdFx0XHQgKiBJdCB3aWxsIHdhbGsgdGhyb3VnaCB0aGUgYmVnaW5uaW5nIGFuZCBlbmRpbmcgdmFsdWVzICh3aGljaCBzaG91bGQgYmUgaW4gdGhlIHNhbWUgZm9ybWF0IHdpdGggdGhlIHNhbWUgbnVtYmVyIGFuZCB0eXBlIG9mIHZhbHVlcykgYW5kIGZpZ3VyZSBvdXQgd2hpY2ggcGFydHMgYXJlIG51bWJlcnMsIHdoYXQgc3RyaW5ncyBzZXBhcmF0ZSB0aGUgbnVtZXJpYy90d2VlbmFibGUgdmFsdWVzLCBhbmQgdGhlbiBjcmVhdGUgdGhlIENTU1Byb3BUd2VlbnMgYWNjb3JkaW5nbHkuIElmIGEgcGx1Z2luIGlzIGRlZmluZWQsIG5vIGNoaWxkIENTU1Byb3BUd2VlbnMgd2lsbCBiZSBjcmVhdGVkLiBJbnN0ZWFkLCB0aGUgZW5kaW5nIHZhbHVlcyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgXCJkYXRhXCIgcHJvcGVydHkgb2YgdGhlIHJldHVybmVkIENTU1Byb3BUd2VlbiBsaWtlOiB7czotNSwgeG4xOi0xMCwgeG4yOi0yMCwgeG4zOjI1NSwgeG40OjAsIHhuNTowfSBzbyB0aGF0IGl0IGNhbiBiZSBmZWQgdG8gYW55IG90aGVyIHBsdWdpbiBhbmQgaXQnbGwgYmUgcGxhaW4gbnVtZXJpYyB0d2VlbnMgYnV0IHRoZSByZWNvbXBvc2l0aW9uIG9mIHRoZSBjb21wbGV4IHZhbHVlIHdpbGwgYmUgaGFuZGxlZCBpbnNpZGUgQ1NTUGx1Z2luJ3Mgc2V0UmF0aW8oKS5cblx0XHRcdCAqIElmIGEgc2V0UmF0aW8gaXMgZGVmaW5lZCwgdGhlIHR5cGUgb2YgdGhlIENTU1Byb3BUd2VlbiB3aWxsIGJlIHNldCB0byAyIGFuZCByZWNvbXBvc2l0aW9uIG9mIHRoZSB2YWx1ZXMgd2lsbCBiZSB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhhdCBtZXRob2QuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHshT2JqZWN0fSB0IFRhcmdldCB3aG9zZSBwcm9wZXJ0eSB3aWxsIGJlIHR3ZWVuZWRcblx0XHRcdCAqIEBwYXJhbSB7IXN0cmluZ30gcCBQcm9wZXJ0eSB0aGF0IHdpbGwgYmUgdHdlZW5lZCAoaXRzIG5hbWUsIGxpa2UgXCJsZWZ0XCIgb3IgXCJiYWNrZ3JvdW5kQ29sb3JcIiBvciBcImJveFNoYWRvd1wiKVxuXHRcdFx0ICogQHBhcmFtIHtzdHJpbmd9IGIgQmVnaW5uaW5nIHZhbHVlXG5cdFx0XHQgKiBAcGFyYW0ge3N0cmluZ30gZSBFbmRpbmcgdmFsdWVcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY2xycyBJZiB0cnVlLCB0aGUgdmFsdWUgY291bGQgY29udGFpbiBhIGNvbG9yIHZhbHVlIGxpa2UgXCJyZ2IoMjU1LDAsMClcIiBvciBcIiNGMDBcIiBvciBcInJlZFwiLiBUaGUgZGVmYXVsdCBpcyBmYWxzZSwgc28gbm8gY29sb3JzIHdpbGwgYmUgcmVjb2duaXplZCAoYSBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb24pXG5cdFx0XHQgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyfE9iamVjdCl9IGRmbHQgVGhlIGRlZmF1bHQgYmVnaW5uaW5nIHZhbHVlIHRoYXQgc2hvdWxkIGJlIHVzZWQgaWYgbm8gdmFsaWQgYmVnaW5uaW5nIHZhbHVlIGlzIGRlZmluZWQgb3IgaWYgdGhlIG51bWJlciBvZiB2YWx1ZXMgaW5zaWRlIHRoZSBjb21wbGV4IGJlZ2lubmluZyBhbmQgZW5kaW5nIHZhbHVlcyBkb24ndCBtYXRjaFxuXHRcdFx0ICogQHBhcmFtIHs/Q1NTUHJvcFR3ZWVufSBwdCBDU1NQcm9wVHdlZW4gaW5zdGFuY2UgdGhhdCBpcyB0aGUgY3VycmVudCBoZWFkIG9mIHRoZSBsaW5rZWQgbGlzdCAod2UnbGwgcHJlcGVuZCB0byB0aGlzKS5cblx0XHRcdCAqIEBwYXJhbSB7bnVtYmVyPX0gcHIgUHJpb3JpdHkgaW4gdGhlIGxpbmtlZCBsaXN0IG9yZGVyLiBIaWdoZXIgcHJpb3JpdHkgcHJvcGVydGllcyB3aWxsIGJlIHVwZGF0ZWQgYmVmb3JlIGxvd2VyIHByaW9yaXR5IG9uZXMuIFRoZSBkZWZhdWx0IHByaW9yaXR5IGlzIDAuXG5cdFx0XHQgKiBAcGFyYW0ge1R3ZWVuUGx1Z2luPX0gcGx1Z2luIElmIGEgcGx1Z2luIHNob3VsZCBoYW5kbGUgdGhlIHR3ZWVuaW5nIG9mIGV4dHJhIHByb3BlcnRpZXMsIHBhc3MgdGhlIHBsdWdpbiBpbnN0YW5jZSBoZXJlLiBJZiBvbmUgaXMgZGVmaW5lZCwgdGhlbiBOTyBzdWJ0d2VlbnMgd2lsbCBiZSBjcmVhdGVkIGZvciBhbnkgZXh0cmEgcHJvcGVydGllcyAodGhlIHByb3BlcnRpZXMgd2lsbCBiZSBjcmVhdGVkIC0ganVzdCBub3QgYWRkaXRpb25hbCBDU1NQcm9wVHdlZW4gaW5zdGFuY2VzIHRvIHR3ZWVuIHRoZW0pIGJlY2F1c2UgdGhlIHBsdWdpbiBpcyBleHBlY3RlZCB0byBkbyBzby4gSG93ZXZlciwgdGhlIGVuZCB2YWx1ZXMgV0lMTCBiZSBwb3B1bGF0ZWQgaW4gdGhlIFwiZGF0YVwiIHByb3BlcnR5LCBsaWtlIHtzOjEwMCwgeG4xOjUwLCB4bjI6MzAwfVxuXHRcdFx0ICogQHBhcmFtIHtmdW5jdGlvbihudW1iZXIpPX0gc2V0UmF0aW8gSWYgdmFsdWVzIHNob3VsZCBiZSBzZXQgaW4gYSBjdXN0b20gZnVuY3Rpb24gaW5zdGVhZCBvZiBiZWluZyBwaWVjZWQgdG9nZXRoZXIgaW4gYSB0eXBlOjEgKGNvbXBsZXgtdmFsdWUpIENTU1Byb3BUd2VlbiwgZGVmaW5lIHRoYXQgY3VzdG9tIGZ1bmN0aW9uIGhlcmUuXG5cdFx0XHQgKiBAcmV0dXJuIHtDU1NQcm9wVHdlZW59IFRoZSBmaXJzdCBDU1NQcm9wVHdlZW4gaW4gdGhlIGxpbmtlZCBsaXN0IHdoaWNoIGluY2x1ZGVzIHRoZSBuZXcgb25lKHMpIGFkZGVkIGJ5IHRoZSBwYXJzZUNvbXBsZXgoKSBjYWxsLlxuXHRcdFx0ICovXG5cdFx0XHRfcGFyc2VDb21wbGV4ID0gQ1NTUGx1Z2luLnBhcnNlQ29tcGxleCA9IGZ1bmN0aW9uKHQsIHAsIGIsIGUsIGNscnMsIGRmbHQsIHB0LCBwciwgcGx1Z2luLCBzZXRSYXRpbykge1xuXHRcdFx0XHQvL0RFQlVHOiBfbG9nKFwicGFyc2VDb21wbGV4OiBcIitwK1wiLCBiOiBcIitiK1wiLCBlOiBcIitlKTtcblx0XHRcdFx0YiA9IGIgfHwgZGZsdCB8fCBcIlwiO1xuXHRcdFx0XHRwdCA9IG5ldyBDU1NQcm9wVHdlZW4odCwgcCwgMCwgMCwgcHQsIChzZXRSYXRpbyA/IDIgOiAxKSwgbnVsbCwgZmFsc2UsIHByLCBiLCBlKTtcblx0XHRcdFx0ZSArPSBcIlwiOyAvL2Vuc3VyZXMgaXQncyBhIHN0cmluZ1xuXHRcdFx0XHR2YXIgYmEgPSBiLnNwbGl0KFwiLCBcIikuam9pbihcIixcIikuc3BsaXQoXCIgXCIpLCAvL2JlZ2lubmluZyBhcnJheVxuXHRcdFx0XHRcdGVhID0gZS5zcGxpdChcIiwgXCIpLmpvaW4oXCIsXCIpLnNwbGl0KFwiIFwiKSwgLy9lbmRpbmcgYXJyYXlcblx0XHRcdFx0XHRsID0gYmEubGVuZ3RoLFxuXHRcdFx0XHRcdGF1dG9Sb3VuZCA9IChfYXV0b1JvdW5kICE9PSBmYWxzZSksXG5cdFx0XHRcdFx0aSwgeGksIG5pLCBidiwgZXYsIGJudW1zLCBlbnVtcywgYm4sIGhhc0FscGhhLCB0ZW1wLCBjdiwgc3RyLCB1c2VIU0w7XG5cdFx0XHRcdGlmIChlLmluZGV4T2YoXCIsXCIpICE9PSAtMSB8fCBiLmluZGV4T2YoXCIsXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdGJhID0gYmEuam9pbihcIiBcIikucmVwbGFjZShfY29tbWFzT3V0c2lkZVBhcmVuRXhwLCBcIiwgXCIpLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0XHRlYSA9IGVhLmpvaW4oXCIgXCIpLnJlcGxhY2UoX2NvbW1hc091dHNpZGVQYXJlbkV4cCwgXCIsIFwiKS5zcGxpdChcIiBcIik7XG5cdFx0XHRcdFx0bCA9IGJhLmxlbmd0aDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobCAhPT0gZWEubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Ly9ERUJVRzogX2xvZyhcIm1pc21hdGNoZWQgZm9ybWF0dGluZyBkZXRlY3RlZCBvbiBcIiArIHAgKyBcIiAoXCIgKyBiICsgXCIgdnMgXCIgKyBlICsgXCIpXCIpO1xuXHRcdFx0XHRcdGJhID0gKGRmbHQgfHwgXCJcIikuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdGwgPSBiYS5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHQucGx1Z2luID0gcGx1Z2luO1xuXHRcdFx0XHRwdC5zZXRSYXRpbyA9IHNldFJhdGlvO1xuXHRcdFx0XHRfY29sb3JFeHAubGFzdEluZGV4ID0gMDtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdFx0XHRcdGJ2ID0gYmFbaV07XG5cdFx0XHRcdFx0ZXYgPSBlYVtpXTtcblx0XHRcdFx0XHRibiA9IHBhcnNlRmxvYXQoYnYpO1xuXHRcdFx0XHRcdC8vaWYgdGhlIHZhbHVlIGJlZ2lucyB3aXRoIGEgbnVtYmVyIChtb3N0IGNvbW1vbikuIEl0J3MgZmluZSBpZiBpdCBoYXMgYSBzdWZmaXggbGlrZSBweFxuXHRcdFx0XHRcdGlmIChibiB8fCBibiA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cHQuYXBwZW5kWHRyYShcIlwiLCBibiwgX3BhcnNlQ2hhbmdlKGV2LCBibiksIGV2LnJlcGxhY2UoX3JlbE51bUV4cCwgXCJcIiksIChhdXRvUm91bmQgJiYgZXYuaW5kZXhPZihcInB4XCIpICE9PSAtMSksIHRydWUpO1xuXG5cdFx0XHRcdFx0Ly9pZiB0aGUgdmFsdWUgaXMgYSBjb2xvclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoY2xycyAmJiBfY29sb3JFeHAudGVzdChidikpIHtcblx0XHRcdFx0XHRcdHN0ciA9IGV2LmNoYXJBdChldi5sZW5ndGggLSAxKSA9PT0gXCIsXCIgPyBcIiksXCIgOiBcIilcIjsgLy9pZiB0aGVyZSdzIGEgY29tbWEgYXQgdGhlIGVuZCwgcmV0YWluIGl0LlxuXHRcdFx0XHRcdFx0dXNlSFNMID0gKGV2LmluZGV4T2YoXCJoc2xcIikgIT09IC0xICYmIF9zdXBwb3J0c09wYWNpdHkpO1xuXHRcdFx0XHRcdFx0YnYgPSBfcGFyc2VDb2xvcihidiwgdXNlSFNMKTtcblx0XHRcdFx0XHRcdGV2ID0gX3BhcnNlQ29sb3IoZXYsIHVzZUhTTCk7XG5cdFx0XHRcdFx0XHRoYXNBbHBoYSA9IChidi5sZW5ndGggKyBldi5sZW5ndGggPiA2KTtcblx0XHRcdFx0XHRcdGlmIChoYXNBbHBoYSAmJiAhX3N1cHBvcnRzT3BhY2l0eSAmJiBldlszXSA9PT0gMCkgeyAvL29sZGVyIHZlcnNpb25zIG9mIElFIGRvbid0IHN1cHBvcnQgcmdiYSgpLCBzbyBpZiB0aGUgZGVzdGluYXRpb24gYWxwaGEgaXMgMCwganVzdCB1c2UgXCJ0cmFuc3BhcmVudFwiIGZvciB0aGUgZW5kIGNvbG9yXG5cdFx0XHRcdFx0XHRcdHB0W1wieHNcIiArIHB0LmxdICs9IHB0LmwgPyBcIiB0cmFuc3BhcmVudFwiIDogXCJ0cmFuc3BhcmVudFwiO1xuXHRcdFx0XHRcdFx0XHRwdC5lID0gcHQuZS5zcGxpdChlYVtpXSkuam9pbihcInRyYW5zcGFyZW50XCIpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKCFfc3VwcG9ydHNPcGFjaXR5KSB7IC8vb2xkIHZlcnNpb25zIG9mIElFIGRvbid0IHN1cHBvcnQgcmdiYSgpLlxuXHRcdFx0XHRcdFx0XHRcdGhhc0FscGhhID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKHVzZUhTTCkge1xuXHRcdFx0XHRcdFx0XHRcdHB0LmFwcGVuZFh0cmEoKGhhc0FscGhhID8gXCJoc2xhKFwiIDogXCJoc2woXCIpLCBidlswXSwgX3BhcnNlQ2hhbmdlKGV2WzBdLCBidlswXSksIFwiLFwiLCBmYWxzZSwgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRYdHJhKFwiXCIsIGJ2WzFdLCBfcGFyc2VDaGFuZ2UoZXZbMV0sIGJ2WzFdKSwgXCIlLFwiLCBmYWxzZSlcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRYdHJhKFwiXCIsIGJ2WzJdLCBfcGFyc2VDaGFuZ2UoZXZbMl0sIGJ2WzJdKSwgKGhhc0FscGhhID8gXCIlLFwiIDogXCIlXCIgKyBzdHIpLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0cHQuYXBwZW5kWHRyYSgoaGFzQWxwaGEgPyBcInJnYmEoXCIgOiBcInJnYihcIiksIGJ2WzBdLCBldlswXSAtIGJ2WzBdLCBcIixcIiwgdHJ1ZSwgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRYdHJhKFwiXCIsIGJ2WzFdLCBldlsxXSAtIGJ2WzFdLCBcIixcIiwgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdC5hcHBlbmRYdHJhKFwiXCIsIGJ2WzJdLCBldlsyXSAtIGJ2WzJdLCAoaGFzQWxwaGEgPyBcIixcIiA6IHN0ciksIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGhhc0FscGhhKSB7XG5cdFx0XHRcdFx0XHRcdFx0YnYgPSAoYnYubGVuZ3RoIDwgNCkgPyAxIDogYnZbM107XG5cdFx0XHRcdFx0XHRcdFx0cHQuYXBwZW5kWHRyYShcIlwiLCBidiwgKChldi5sZW5ndGggPCA0KSA/IDEgOiBldlszXSkgLSBidiwgc3RyLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF9jb2xvckV4cC5sYXN0SW5kZXggPSAwOyAvL290aGVyd2lzZSB0aGUgdGVzdCgpIG9uIHRoZSBSZWdFeHAgY291bGQgbW92ZSB0aGUgbGFzdEluZGV4IGFuZCB0YWludCBmdXR1cmUgcmVzdWx0cy5cblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRibnVtcyA9IGJ2Lm1hdGNoKF9udW1FeHApOyAvL2dldHMgZWFjaCBncm91cCBvZiBudW1iZXJzIGluIHRoZSBiZWdpbm5pbmcgdmFsdWUgc3RyaW5nIGFuZCBkcm9wcyB0aGVtIGludG8gYW4gYXJyYXlcblxuXHRcdFx0XHRcdFx0Ly9pZiBubyBudW1iZXIgaXMgZm91bmQsIHRyZWF0IGl0IGFzIGEgbm9uLXR3ZWVuaW5nIHZhbHVlIGFuZCBqdXN0IGFwcGVuZCB0aGUgc3RyaW5nIHRvIHRoZSBjdXJyZW50IHhzLlxuXHRcdFx0XHRcdFx0aWYgKCFibnVtcykge1xuXHRcdFx0XHRcdFx0XHRwdFtcInhzXCIgKyBwdC5sXSArPSBwdC5sID8gXCIgXCIgKyBldiA6IGV2O1xuXG5cdFx0XHRcdFx0XHQvL2xvb3AgdGhyb3VnaCBhbGwgdGhlIG51bWJlcnMgdGhhdCBhcmUgZm91bmQgYW5kIGNvbnN0cnVjdCB0aGUgZXh0cmEgdmFsdWVzIG9uIHRoZSBwdC5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGVudW1zID0gZXYubWF0Y2goX3JlbE51bUV4cCk7IC8vZ2V0IGVhY2ggZ3JvdXAgb2YgbnVtYmVycyBpbiB0aGUgZW5kIHZhbHVlIHN0cmluZyBhbmQgZHJvcCB0aGVtIGludG8gYW4gYXJyYXkuIFdlIGFsbG93IHJlbGF0aXZlIHZhbHVlcyB0b28sIGxpa2UgKz01MCBvciAtPS41XG5cdFx0XHRcdFx0XHRcdGlmICghZW51bXMgfHwgZW51bXMubGVuZ3RoICE9PSBibnVtcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHQvL0RFQlVHOiBfbG9nKFwibWlzbWF0Y2hlZCBmb3JtYXR0aW5nIGRldGVjdGVkIG9uIFwiICsgcCArIFwiIChcIiArIGIgKyBcIiB2cyBcIiArIGUgKyBcIilcIik7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHB0O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdG5pID0gMDtcblx0XHRcdFx0XHRcdFx0Zm9yICh4aSA9IDA7IHhpIDwgYm51bXMubGVuZ3RoOyB4aSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3YgPSBibnVtc1t4aV07XG5cdFx0XHRcdFx0XHRcdFx0dGVtcCA9IGJ2LmluZGV4T2YoY3YsIG5pKTtcblx0XHRcdFx0XHRcdFx0XHRwdC5hcHBlbmRYdHJhKGJ2LnN1YnN0cihuaSwgdGVtcCAtIG5pKSwgTnVtYmVyKGN2KSwgX3BhcnNlQ2hhbmdlKGVudW1zW3hpXSwgY3YpLCBcIlwiLCAoYXV0b1JvdW5kICYmIGJ2LnN1YnN0cih0ZW1wICsgY3YubGVuZ3RoLCAyKSA9PT0gXCJweFwiKSwgKHhpID09PSAwKSk7XG5cdFx0XHRcdFx0XHRcdFx0bmkgPSB0ZW1wICsgY3YubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHB0W1wieHNcIiArIHB0LmxdICs9IGJ2LnN1YnN0cihuaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vaWYgdGhlcmUgYXJlIHJlbGF0aXZlIHZhbHVlcyAoXCIrPVwiIG9yIFwiLT1cIiBwcmVmaXgpLCB3ZSBuZWVkIHRvIGFkanVzdCB0aGUgZW5kaW5nIHZhbHVlIHRvIGVsaW1pbmF0ZSB0aGUgcHJlZml4ZXMgYW5kIGNvbWJpbmUgdGhlIHZhbHVlcyBwcm9wZXJseS5cblx0XHRcdFx0aWYgKGUuaW5kZXhPZihcIj1cIikgIT09IC0xKSBpZiAocHQuZGF0YSkge1xuXHRcdFx0XHRcdHN0ciA9IHB0LnhzMCArIHB0LmRhdGEucztcblx0XHRcdFx0XHRmb3IgKGkgPSAxOyBpIDwgcHQubDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRzdHIgKz0gcHRbXCJ4c1wiICsgaV0gKyBwdC5kYXRhW1wieG5cIiArIGldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdC5lID0gc3RyICsgcHRbXCJ4c1wiICsgaV07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFwdC5sKSB7XG5cdFx0XHRcdFx0cHQudHlwZSA9IC0xO1xuXHRcdFx0XHRcdHB0LnhzMCA9IHB0LmU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHB0LnhmaXJzdCB8fCBwdDtcblx0XHRcdH0sXG5cdFx0XHRpID0gOTtcblxuXG5cdFx0cCA9IENTU1Byb3BUd2Vlbi5wcm90b3R5cGU7XG5cdFx0cC5sID0gcC5wciA9IDA7IC8vbGVuZ3RoIChudW1iZXIgb2YgZXh0cmEgcHJvcGVydGllcyBsaWtlIHhuMSwgeG4yLCB4bjMsIGV0Yy5cblx0XHR3aGlsZSAoLS1pID4gMCkge1xuXHRcdFx0cFtcInhuXCIgKyBpXSA9IDA7XG5cdFx0XHRwW1wieHNcIiArIGldID0gXCJcIjtcblx0XHR9XG5cdFx0cC54czAgPSBcIlwiO1xuXHRcdHAuX25leHQgPSBwLl9wcmV2ID0gcC54Zmlyc3QgPSBwLmRhdGEgPSBwLnBsdWdpbiA9IHAuc2V0UmF0aW8gPSBwLnJ4cCA9IG51bGw7XG5cblxuXHRcdC8qKlxuXHRcdCAqIEFwcGVuZHMgYW5kIGV4dHJhIHR3ZWVuaW5nIHZhbHVlIHRvIGEgQ1NTUHJvcFR3ZWVuIGFuZCBhdXRvbWF0aWNhbGx5IG1hbmFnZXMgYW55IHByZWZpeCBhbmQgc3VmZml4IHN0cmluZ3MuIFRoZSBmaXJzdCBleHRyYSB2YWx1ZSBpcyBzdG9yZWQgaW4gdGhlIHMgYW5kIGMgb2YgdGhlIG1haW4gQ1NTUHJvcFR3ZWVuIGluc3RhbmNlLCBidXQgdGhlcmVhZnRlciBhbnkgZXh0cmFzIGFyZSBzdG9yZWQgaW4gdGhlIHhuMSwgeG4yLCB4bjMsIGV0Yy4gVGhlIHByZWZpeGVzIGFuZCBzdWZmaXhlcyBhcmUgc3RvcmVkIGluIHRoZSB4czAsIHhzMSwgeHMyLCBldGMuIHByb3BlcnRpZXMuIEZvciBleGFtcGxlLCBpZiBJIHdhbGsgdGhyb3VnaCBhIGNsaXAgdmFsdWUgbGlrZSBcInJlY3QoMTBweCwgNXB4LCAwcHgsIDIwcHgpXCIsIHRoZSB2YWx1ZXMgd291bGQgYmUgc3RvcmVkIGxpa2UgdGhpczpcblx0XHQgKiB4czA6XCJyZWN0KFwiLCBzOjEwLCB4czE6XCJweCwgXCIsIHhuMTo1LCB4czI6XCJweCwgXCIsIHhuMjowLCB4czM6XCJweCwgXCIsIHhuMzoyMCwgeG40OlwicHgpXCJcblx0XHQgKiBBbmQgdGhleSdkIGFsbCBnZXQgam9pbmVkIHRvZ2V0aGVyIHdoZW4gdGhlIENTU1BsdWdpbiByZW5kZXJzIChpbiB0aGUgc2V0UmF0aW8oKSBtZXRob2QpLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nPX0gcGZ4IFByZWZpeCAoaWYgYW55KVxuXHRcdCAqIEBwYXJhbSB7IW51bWJlcn0gcyBTdGFydGluZyB2YWx1ZVxuXHRcdCAqIEBwYXJhbSB7IW51bWJlcn0gYyBDaGFuZ2UgaW4gbnVtZXJpYyB2YWx1ZSBvdmVyIHRoZSBjb3Vyc2Ugb2YgdGhlIGVudGlyZSB0d2Vlbi4gRm9yIGV4YW1wbGUsIGlmIHRoZSBzdGFydCBpcyA1IGFuZCB0aGUgZW5kIGlzIDEwMCwgdGhlIGNoYW5nZSB3b3VsZCBiZSA5NS5cblx0XHQgKiBAcGFyYW0ge3N0cmluZz19IHNmeCBTdWZmaXggKGlmIGFueSlcblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW49fSByIFJvdW5kIChpZiB0cnVlKS5cblx0XHQgKiBAcGFyYW0ge2Jvb2xlYW49fSBwYWQgSWYgdHJ1ZSwgdGhpcyBleHRyYSB2YWx1ZSBzaG91bGQgYmUgc2VwYXJhdGVkIGJ5IHRoZSBwcmV2aW91cyBvbmUgYnkgYSBzcGFjZS4gSWYgdGhlcmUgaXMgbm8gcHJldmlvdXMgZXh0cmEgYW5kIHBhZCBpcyB0cnVlLCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgZHJvcCB0aGUgc3BhY2UuXG5cdFx0ICogQHJldHVybiB7Q1NTUHJvcFR3ZWVufSByZXR1cm5zIGl0c2VsZiBzbyB0aGF0IG11bHRpcGxlIG1ldGhvZHMgY2FuIGJlIGNoYWluZWQgdG9nZXRoZXIuXG5cdFx0ICovXG5cdFx0cC5hcHBlbmRYdHJhID0gZnVuY3Rpb24ocGZ4LCBzLCBjLCBzZngsIHIsIHBhZCkge1xuXHRcdFx0dmFyIHB0ID0gdGhpcyxcblx0XHRcdFx0bCA9IHB0Lmw7XG5cdFx0XHRwdFtcInhzXCIgKyBsXSArPSAocGFkICYmIGwpID8gXCIgXCIgKyBwZnggOiBwZnggfHwgXCJcIjtcblx0XHRcdGlmICghYykgaWYgKGwgIT09IDAgJiYgIXB0LnBsdWdpbikgeyAvL3R5cGljYWxseSB3ZSdsbCBjb21iaW5lIG5vbi1jaGFuZ2luZyB2YWx1ZXMgcmlnaHQgaW50byB0aGUgeHMgdG8gb3B0aW1pemUgcGVyZm9ybWFuY2UsIGJ1dCB3ZSBkb24ndCBjb21iaW5lIHRoZW0gd2hlbiB0aGVyZSdzIGEgcGx1Z2luIHRoYXQgd2lsbCBiZSB0d2VlbmluZyB0aGUgdmFsdWVzIGJlY2F1c2UgaXQgbWF5IGRlcGVuZCBvbiB0aGUgdmFsdWVzIGJlaW5nIHNwbGl0IGFwYXJ0LCBsaWtlIGZvciBhIGJlemllciwgaWYgYSB2YWx1ZSBkb2Vzbid0IGNoYW5nZSBiZXR3ZWVuIHRoZSBmaXJzdCBhbmQgc2Vjb25kIGl0ZXJhdGlvbiBidXQgdGhlbiBpdCBkb2VzIG9uIHRoZSAzcmQsIHdlJ2xsIHJ1biBpbnRvIHRyb3VibGUgYmVjYXVzZSB0aGVyZSdzIG5vIHhuIHNsb3QgZm9yIHRoYXQgdmFsdWUhXG5cdFx0XHRcdHB0W1wieHNcIiArIGxdICs9IHMgKyAoc2Z4IHx8IFwiXCIpO1xuXHRcdFx0XHRyZXR1cm4gcHQ7XG5cdFx0XHR9XG5cdFx0XHRwdC5sKys7XG5cdFx0XHRwdC50eXBlID0gcHQuc2V0UmF0aW8gPyAyIDogMTtcblx0XHRcdHB0W1wieHNcIiArIHB0LmxdID0gc2Z4IHx8IFwiXCI7XG5cdFx0XHRpZiAobCA+IDApIHtcblx0XHRcdFx0cHQuZGF0YVtcInhuXCIgKyBsXSA9IHMgKyBjO1xuXHRcdFx0XHRwdC5yeHBbXCJ4blwiICsgbF0gPSByOyAvL3JvdW5kIGV4dHJhIHByb3BlcnR5ICh3ZSBuZWVkIHRvIHRhcCBpbnRvIHRoaXMgaW4gdGhlIF9wYXJzZVRvUHJveHkoKSBtZXRob2QpXG5cdFx0XHRcdHB0W1wieG5cIiArIGxdID0gcztcblx0XHRcdFx0aWYgKCFwdC5wbHVnaW4pIHtcblx0XHRcdFx0XHRwdC54Zmlyc3QgPSBuZXcgQ1NTUHJvcFR3ZWVuKHB0LCBcInhuXCIgKyBsLCBzLCBjLCBwdC54Zmlyc3QgfHwgcHQsIDAsIHB0Lm4sIHIsIHB0LnByKTtcblx0XHRcdFx0XHRwdC54Zmlyc3QueHMwID0gMDsgLy9qdXN0IHRvIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSBzdGF5cyBudW1lcmljIHdoaWNoIGhlbHBzIG1vZGVybiBicm93c2VycyBzcGVlZCB1cCBwcm9jZXNzaW5nLiBSZW1lbWJlciwgaW4gdGhlIHNldFJhdGlvKCkgbWV0aG9kLCB3ZSBkbyBwdC50W3B0LnBdID0gdmFsICsgcHQueHMwIHNvIGlmIHB0LnhzMCBpcyBcIlwiICh0aGUgZGVmYXVsdCksIGl0J2xsIGNhc3QgdGhlIGVuZCB2YWx1ZSBhcyBhIHN0cmluZy4gV2hlbiBhIHByb3BlcnR5IGlzIGEgbnVtYmVyIHNvbWV0aW1lcyBhbmQgYSBzdHJpbmcgc29tZXRpbWVzLCBpdCBwcmV2ZW50cyB0aGUgY29tcGlsZXIgZnJvbSBsb2NraW5nIGluIHRoZSBkYXRhIHR5cGUsIHNsb3dpbmcgdGhpbmdzIGRvd24gc2xpZ2h0bHkuXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHB0O1xuXHRcdFx0fVxuXHRcdFx0cHQuZGF0YSA9IHtzOnMgKyBjfTtcblx0XHRcdHB0LnJ4cCA9IHt9O1xuXHRcdFx0cHQucyA9IHM7XG5cdFx0XHRwdC5jID0gYztcblx0XHRcdHB0LnIgPSByO1xuXHRcdFx0cmV0dXJuIHB0O1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBAY29uc3RydWN0b3IgQSBTcGVjaWFsUHJvcCBpcyBiYXNpY2FsbHkgYSBjc3MgcHJvcGVydHkgdGhhdCBuZWVkcyB0byBiZSB0cmVhdGVkIGluIGEgbm9uLXN0YW5kYXJkIHdheSwgbGlrZSBpZiBpdCBtYXkgY29udGFpbiBhIGNvbXBsZXggdmFsdWUgbGlrZSBib3hTaGFkb3c6XCI1cHggMTBweCAxNXB4IHJnYigyNTUsIDEwMiwgNTEpXCIgb3IgaWYgaXQgaXMgYXNzb2NpYXRlZCB3aXRoIGFub3RoZXIgcGx1Z2luIGxpa2UgVGhyb3dQcm9wc1BsdWdpbiBvciBCZXppZXJQbHVnaW4uIEV2ZXJ5IFNwZWNpYWxQcm9wIGlzIGFzc29jaWF0ZWQgd2l0aCBhIHBhcnRpY3VsYXIgcHJvcGVydHkgbmFtZSBsaWtlIFwiYm94U2hhZG93XCIgb3IgXCJ0aHJvd1Byb3BzXCIgb3IgXCJiZXppZXJcIiBhbmQgaXQgd2lsbCBpbnRlcmNlcHQgdGhvc2UgdmFsdWVzIGluIHRoZSB2YXJzIG9iamVjdCB0aGF0J3MgcGFzc2VkIHRvIHRoZSBDU1NQbHVnaW4gYW5kIGhhbmRsZSB0aGVtIGFjY29yZGluZ2x5LlxuXHRcdCAqIEBwYXJhbSB7IXN0cmluZ30gcCBQcm9wZXJ0eSBuYW1lIChsaWtlIFwiYm94U2hhZG93XCIgb3IgXCJ0aHJvd1Byb3BzXCIpXG5cdFx0ICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zIEFuIG9iamVjdCBjb250YWluaW5nIGFueSBvZiB0aGUgZm9sbG93aW5nIGNvbmZpZ3VyYXRpb24gb3B0aW9uczpcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAtIGRlZmF1bHRWYWx1ZTogdGhlIGRlZmF1bHQgdmFsdWVcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAtIHBhcnNlcjogQSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgYXNzb2NpYXRlZCBwcm9wZXJ0eSBuYW1lIGlzIGZvdW5kIGluIHRoZSB2YXJzLiBUaGlzIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBDU1NQcm9wVHdlZW4gaW5zdGFuY2UgYW5kIGl0IHNob3VsZCBlbnN1cmUgdGhhdCBpdCBpcyBwcm9wZXJseSBpbnNlcnRlZCBpbnRvIHRoZSBsaW5rZWQgbGlzdC4gSXQgd2lsbCByZWNlaXZlIDQgcGFyYW10ZXJzOiAxKSBUaGUgdGFyZ2V0LCAyKSBUaGUgdmFsdWUgZGVmaW5lZCBpbiB0aGUgdmFycywgMykgVGhlIENTU1BsdWdpbiBpbnN0YW5jZSAod2hvc2UgX2ZpcnN0UFQgc2hvdWxkIGJlIHVzZWQgZm9yIHRoZSBsaW5rZWQgbGlzdCksIGFuZCA0KSBBIGNvbXB1dGVkIHN0eWxlIG9iamVjdCBpZiBvbmUgd2FzIGNhbGN1bGF0ZWQgKHRoaXMgaXMgYSBzcGVlZCBvcHRpbWl6YXRpb24gdGhhdCBhbGxvd3MgcmV0cmlldmFsIG9mIHN0YXJ0aW5nIHZhbHVlcyBxdWlja2VyKVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgIC0gZm9ybWF0dGVyOiBhIGZ1bmN0aW9uIHRoYXQgZm9ybWF0cyBhbnkgdmFsdWUgcmVjZWl2ZWQgZm9yIHRoaXMgc3BlY2lhbCBwcm9wZXJ0eSAoZm9yIGV4YW1wbGUsIGJveFNoYWRvdyBjb3VsZCB0YWtlIFwiNXB4IDVweCByZWRcIiBhbmQgZm9ybWF0IGl0IHRvIFwiNXB4IDVweCAwcHggMHB4IHJlZFwiIHNvIHRoYXQgYm90aCB0aGUgYmVnaW5uaW5nIGFuZCBlbmRpbmcgdmFsdWVzIGhhdmUgYSBjb21tb24gb3JkZXIgYW5kIHF1YW50aXR5IG9mIHZhbHVlcy4pXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgLSBwcmVmaXg6IGlmIHRydWUsIHdlJ2xsIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0aGlzIHByb3BlcnR5IHJlcXVpcmVzIGEgdmVuZG9yIHByZWZpeCAobGlrZSBXZWJraXQgb3IgTW96IG9yIG1zIG9yIE8pXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgLSBjb2xvcjogc2V0IHRoaXMgdG8gdHJ1ZSBpZiB0aGUgdmFsdWUgZm9yIHRoaXMgU3BlY2lhbFByb3AgbWF5IGNvbnRhaW4gY29sb3ItcmVsYXRlZCB2YWx1ZXMgbGlrZSByZ2IoKSwgcmdiYSgpLCBldGMuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgLSBwcmlvcml0eTogcHJpb3JpdHkgaW4gdGhlIGxpbmtlZCBsaXN0IG9yZGVyLiBIaWdoZXIgcHJpb3JpdHkgU3BlY2lhbFByb3BzIHdpbGwgYmUgdXBkYXRlZCBiZWZvcmUgbG93ZXIgcHJpb3JpdHkgb25lcy4gVGhlIGRlZmF1bHQgcHJpb3JpdHkgaXMgMC5cblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAtIG11bHRpOiBpZiB0cnVlLCB0aGUgZm9ybWF0dGVyIHNob3VsZCBhY2NvbW1vZGF0ZSBhIGNvbW1hLWRlbGltaXRlZCBsaXN0IG9mIHZhbHVlcywgbGlrZSBib3hTaGFkb3cgY291bGQgaGF2ZSBtdWx0aXBsZSBib3hTaGFkb3dzIGxpc3RlZCBvdXQuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgLSBjb2xsYXBzaWJsZTogaWYgdHJ1ZSwgdGhlIGZvcm1hdHRlciBzaG91bGQgdHJlYXQgdGhlIHZhbHVlIGxpa2UgaXQncyBhIHRvcC9yaWdodC9ib3R0b20vbGVmdCB2YWx1ZSB0aGF0IGNvdWxkIGJlIGNvbGxhcHNlZCwgbGlrZSBcIjVweFwiIHdvdWxkIGFwcGx5IHRvIGFsbCwgXCI1cHgsIDEwcHhcIiB3b3VsZCB1c2UgNXB4IGZvciB0b3AvYm90dG9tIGFuZCAxMHB4IGZvciByaWdodC9sZWZ0LCBldGMuXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgLSBrZXl3b3JkOiBhIHNwZWNpYWwga2V5d29yZCB0aGF0IGNhbiBbb3B0aW9uYWxseV0gYmUgZm91bmQgaW5zaWRlIHRoZSB2YWx1ZSAobGlrZSBcImluc2V0XCIgZm9yIGJveFNoYWRvdykuIFRoaXMgYWxsb3dzIHVzIHRvIHZhbGlkYXRlIGJlZ2lubmluZy9lbmRpbmcgdmFsdWVzIHRvIG1ha2Ugc3VyZSB0aGV5IG1hdGNoIChpZiB0aGUga2V5d29yZCBpcyBmb3VuZCBpbiBvbmUsIGl0J2xsIGJlIGFkZGVkIHRvIHRoZSBvdGhlciBmb3IgY29uc2lzdGVuY3kgYnkgZGVmYXVsdCkuXG5cdFx0ICovXG5cdFx0dmFyIFNwZWNpYWxQcm9wID0gZnVuY3Rpb24ocCwgb3B0aW9ucykge1xuXHRcdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHRcdFx0dGhpcy5wID0gb3B0aW9ucy5wcmVmaXggPyBfY2hlY2tQcm9wUHJlZml4KHApIHx8IHAgOiBwO1xuXHRcdFx0XHRfc3BlY2lhbFByb3BzW3BdID0gX3NwZWNpYWxQcm9wc1t0aGlzLnBdID0gdGhpcztcblx0XHRcdFx0dGhpcy5mb3JtYXQgPSBvcHRpb25zLmZvcm1hdHRlciB8fCBfZ2V0Rm9ybWF0dGVyKG9wdGlvbnMuZGVmYXVsdFZhbHVlLCBvcHRpb25zLmNvbG9yLCBvcHRpb25zLmNvbGxhcHNpYmxlLCBvcHRpb25zLm11bHRpKTtcblx0XHRcdFx0aWYgKG9wdGlvbnMucGFyc2VyKSB7XG5cdFx0XHRcdFx0dGhpcy5wYXJzZSA9IG9wdGlvbnMucGFyc2VyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuY2xycyA9IG9wdGlvbnMuY29sb3I7XG5cdFx0XHRcdHRoaXMubXVsdGkgPSBvcHRpb25zLm11bHRpO1xuXHRcdFx0XHR0aGlzLmtleXdvcmQgPSBvcHRpb25zLmtleXdvcmQ7XG5cdFx0XHRcdHRoaXMuZGZsdCA9IG9wdGlvbnMuZGVmYXVsdFZhbHVlO1xuXHRcdFx0XHR0aGlzLnByID0gb3B0aW9ucy5wcmlvcml0eSB8fCAwO1xuXHRcdFx0fSxcblxuXHRcdFx0Ly9zaG9ydGN1dCBmb3IgY3JlYXRpbmcgYSBuZXcgU3BlY2lhbFByb3AgdGhhdCBjYW4gYWNjZXB0IG11bHRpcGxlIHByb3BlcnRpZXMgYXMgYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCAoaGVscHMgbWluaWZpY2F0aW9uKS4gZGZsdCBjYW4gYmUgYW4gYXJyYXkgZm9yIG11bHRpcGxlIHZhbHVlcyAod2UgZG9uJ3QgZG8gYSBjb21tYS1kZWxpbWl0ZWQgbGlzdCBiZWNhdXNlIHRoZSBkZWZhdWx0IHZhbHVlIG1heSBjb250YWluIGNvbW1hcywgbGlrZSByZWN0KDBweCwwcHgsMHB4LDBweCkpLiBXZSBhdHRhY2ggdGhpcyBtZXRob2QgdG8gdGhlIFNwZWNpYWxQcm9wIGNsYXNzL29iamVjdCBpbnN0ZWFkIG9mIHVzaW5nIGEgcHJpdmF0ZSBfY3JlYXRlU3BlY2lhbFByb3AoKSBtZXRob2Qgc28gdGhhdCB3ZSBjYW4gdGFwIGludG8gaXQgZXh0ZXJuYWxseSBpZiBuZWNlc3NhcnksIGxpa2UgZnJvbSBhbm90aGVyIHBsdWdpbi5cblx0XHRcdF9yZWdpc3RlckNvbXBsZXhTcGVjaWFsUHJvcCA9IF9pbnRlcm5hbHMuX3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wID0gZnVuY3Rpb24ocCwgb3B0aW9ucywgZGVmYXVsdHMpIHtcblx0XHRcdFx0aWYgKHR5cGVvZihvcHRpb25zKSAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdG9wdGlvbnMgPSB7cGFyc2VyOmRlZmF1bHRzfTsgLy90byBtYWtlIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGggb2xkZXIgdmVyc2lvbnMgb2YgQmV6aWVyUGx1Z2luIGFuZCBUaHJvd1Byb3BzUGx1Z2luXG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGEgPSBwLnNwbGl0KFwiLFwiKSxcblx0XHRcdFx0XHRkID0gb3B0aW9ucy5kZWZhdWx0VmFsdWUsXG5cdFx0XHRcdFx0aSwgdGVtcDtcblx0XHRcdFx0ZGVmYXVsdHMgPSBkZWZhdWx0cyB8fCBbZF07XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5wcmVmaXggPSAoaSA9PT0gMCAmJiBvcHRpb25zLnByZWZpeCk7XG5cdFx0XHRcdFx0b3B0aW9ucy5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0c1tpXSB8fCBkO1xuXHRcdFx0XHRcdHRlbXAgPSBuZXcgU3BlY2lhbFByb3AoYVtpXSwgb3B0aW9ucyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8vY3JlYXRlcyBhIHBsYWNlaG9sZGVyIHNwZWNpYWwgcHJvcCBmb3IgYSBwbHVnaW4gc28gdGhhdCB0aGUgcHJvcGVydHkgZ2V0cyBjYXVnaHQgdGhlIGZpcnN0IHRpbWUgYSB0d2VlbiBvZiBpdCBpcyBhdHRlbXB0ZWQsIGFuZCBhdCB0aGF0IHRpbWUgaXQgbWFrZXMgdGhlIHBsdWdpbiByZWdpc3RlciBpdHNlbGYsIHRodXMgdGFraW5nIG92ZXIgZm9yIGFsbCBmdXR1cmUgdHdlZW5zIG9mIHRoYXQgcHJvcGVydHkuIFRoaXMgYWxsb3dzIHVzIHRvIG5vdCBtYW5kYXRlIHRoYXQgdGhpbmdzIGxvYWQgaW4gYSBwYXJ0aWN1bGFyIG9yZGVyIGFuZCBpdCBhbHNvIGFsbG93cyB1cyB0byBsb2coKSBhbiBlcnJvciB0aGF0IGluZm9ybXMgdGhlIHVzZXIgd2hlbiB0aGV5IGF0dGVtcHQgdG8gdHdlZW4gYW4gZXh0ZXJuYWwgcGx1Z2luLXJlbGF0ZWQgcHJvcGVydHkgd2l0aG91dCBsb2FkaW5nIGl0cyAuanMgZmlsZS5cblx0XHRcdF9yZWdpc3RlclBsdWdpblByb3AgPSBmdW5jdGlvbihwKSB7XG5cdFx0XHRcdGlmICghX3NwZWNpYWxQcm9wc1twXSkge1xuXHRcdFx0XHRcdHZhciBwbHVnaW5OYW1lID0gcC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHAuc3Vic3RyKDEpICsgXCJQbHVnaW5cIjtcblx0XHRcdFx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AocCwge3BhcnNlcjpmdW5jdGlvbih0LCBlLCBwLCBjc3NwLCBwdCwgcGx1Z2luLCB2YXJzKSB7XG5cdFx0XHRcdFx0XHR2YXIgcGx1Z2luQ2xhc3MgPSBfZ2xvYmFscy5jb20uZ3JlZW5zb2NrLnBsdWdpbnNbcGx1Z2luTmFtZV07XG5cdFx0XHRcdFx0XHRpZiAoIXBsdWdpbkNsYXNzKSB7XG5cdFx0XHRcdFx0XHRcdF9sb2coXCJFcnJvcjogXCIgKyBwbHVnaW5OYW1lICsgXCIganMgZmlsZSBub3QgbG9hZGVkLlwiKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHB0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cGx1Z2luQ2xhc3MuX2Nzc1JlZ2lzdGVyKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gX3NwZWNpYWxQcm9wc1twXS5wYXJzZSh0LCBlLCBwLCBjc3NwLCBwdCwgcGx1Z2luLCB2YXJzKTtcblx0XHRcdFx0XHR9fSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblxuXHRcdHAgPSBTcGVjaWFsUHJvcC5wcm90b3R5cGU7XG5cblx0XHQvKipcblx0XHQgKiBBbGlhcyBmb3IgX3BhcnNlQ29tcGxleCgpIHRoYXQgYXV0b21hdGljYWxseSBwbHVncyBpbiBjZXJ0YWluIHZhbHVlcyBmb3IgdGhpcyBTcGVjaWFsUHJvcCwgbGlrZSBpdHMgcHJvcGVydHkgbmFtZSwgd2hldGhlciBvciBub3QgY29sb3JzIHNob3VsZCBiZSBzZW5zZWQsIHRoZSBkZWZhdWx0IHZhbHVlLCBhbmQgcHJpb3JpdHkuIEl0IGFsc28gbG9va3MgZm9yIGFueSBrZXl3b3JkIHRoYXQgdGhlIFNwZWNpYWxQcm9wIGRlZmluZXMgKGxpa2UgXCJpbnNldFwiIGZvciBib3hTaGFkb3cpIGFuZCBlbnN1cmVzIHRoYXQgdGhlIGJlZ2lubmluZyBhbmQgZW5kaW5nIHZhbHVlcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiB2YWx1ZXMgZm9yIFNwZWNpYWxQcm9wcyB3aGVyZSBtdWx0aSBpcyB0cnVlIChsaWtlIGJveFNoYWRvdyBhbmQgdGV4dFNoYWRvdyBjYW4gaGF2ZSBhIGNvbW1hLWRlbGltaXRlZCBsaXN0KVxuXHRcdCAqIEBwYXJhbSB7IU9iamVjdH0gdCB0YXJnZXQgZWxlbWVudFxuXHRcdCAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXJ8b2JqZWN0KX0gYiBiZWdpbm5pbmcgdmFsdWVcblx0XHQgKiBAcGFyYW0geyhzdHJpbmd8bnVtYmVyfG9iamVjdCl9IGUgZW5kaW5nIChkZXN0aW5hdGlvbikgdmFsdWVcblx0XHQgKiBAcGFyYW0ge0NTU1Byb3BUd2Vlbj19IHB0IG5leHQgQ1NTUHJvcFR3ZWVuIGluIHRoZSBsaW5rZWQgbGlzdFxuXHRcdCAqIEBwYXJhbSB7VHdlZW5QbHVnaW49fSBwbHVnaW4gSWYgYW5vdGhlciBwbHVnaW4gd2lsbCBiZSB0d2VlbmluZyB0aGUgY29tcGxleCB2YWx1ZSwgdGhhdCBUd2VlblBsdWdpbiBpbnN0YW5jZSBnb2VzIGhlcmUuXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbj19IHNldFJhdGlvIElmIGEgY3VzdG9tIHNldFJhdGlvKCkgbWV0aG9kIHNob3VsZCBiZSB1c2VkIHRvIGhhbmRsZSB0aGlzIGNvbXBsZXggdmFsdWUsIHRoYXQgZ29lcyBoZXJlLlxuXHRcdCAqIEByZXR1cm4ge0NTU1Byb3BUd2Vlbj19IEZpcnN0IENTU1Byb3BUd2VlbiBpbiB0aGUgbGlua2VkIGxpc3Rcblx0XHQgKi9cblx0XHRwLnBhcnNlQ29tcGxleCA9IGZ1bmN0aW9uKHQsIGIsIGUsIHB0LCBwbHVnaW4sIHNldFJhdGlvKSB7XG5cdFx0XHR2YXIga3dkID0gdGhpcy5rZXl3b3JkLFxuXHRcdFx0XHRpLCBiYSwgZWEsIGwsIGJpLCBlaTtcblx0XHRcdC8vaWYgdGhpcyBTcGVjaWFsUHJvcCdzIHZhbHVlIGNhbiBjb250YWluIGEgY29tbWEtZGVsaW1pdGVkIGxpc3Qgb2YgdmFsdWVzIChsaWtlIGJveFNoYWRvdyBvciB0ZXh0U2hhZG93KSwgd2UgbXVzdCBwYXJzZSB0aGVtIGluIGEgc3BlY2lhbCB3YXksIGFuZCBsb29rIGZvciBhIGtleXdvcmQgKGxpa2UgXCJpbnNldFwiIGZvciBib3hTaGFkb3cpIGFuZCBlbnN1cmUgdGhhdCB0aGUgYmVnaW5uaW5nIGFuZCBlbmRpbmcgQk9USCBoYXZlIGl0IGlmIHRoZSBlbmQgZGVmaW5lcyBpdCBhcyBzdWNoLiBXZSBhbHNvIG11c3QgZW5zdXJlIHRoYXQgdGhlcmUgYXJlIGFuIGVxdWFsIG51bWJlciBvZiB2YWx1ZXMgc3BlY2lmaWVkICh3ZSBjYW4ndCB0d2VlbiAxIGJveFNoYWRvdyB0byAzIGZvciBleGFtcGxlKVxuXHRcdFx0aWYgKHRoaXMubXVsdGkpIGlmIChfY29tbWFzT3V0c2lkZVBhcmVuRXhwLnRlc3QoZSkgfHwgX2NvbW1hc091dHNpZGVQYXJlbkV4cC50ZXN0KGIpKSB7XG5cdFx0XHRcdGJhID0gYi5yZXBsYWNlKF9jb21tYXNPdXRzaWRlUGFyZW5FeHAsIFwifFwiKS5zcGxpdChcInxcIik7XG5cdFx0XHRcdGVhID0gZS5yZXBsYWNlKF9jb21tYXNPdXRzaWRlUGFyZW5FeHAsIFwifFwiKS5zcGxpdChcInxcIik7XG5cdFx0XHR9IGVsc2UgaWYgKGt3ZCkge1xuXHRcdFx0XHRiYSA9IFtiXTtcblx0XHRcdFx0ZWEgPSBbZV07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZWEpIHtcblx0XHRcdFx0bCA9IChlYS5sZW5ndGggPiBiYS5sZW5ndGgpID8gZWEubGVuZ3RoIDogYmEubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdFx0YiA9IGJhW2ldID0gYmFbaV0gfHwgdGhpcy5kZmx0O1xuXHRcdFx0XHRcdGUgPSBlYVtpXSA9IGVhW2ldIHx8IHRoaXMuZGZsdDtcblx0XHRcdFx0XHRpZiAoa3dkKSB7XG5cdFx0XHRcdFx0XHRiaSA9IGIuaW5kZXhPZihrd2QpO1xuXHRcdFx0XHRcdFx0ZWkgPSBlLmluZGV4T2Yoa3dkKTtcblx0XHRcdFx0XHRcdGlmIChiaSAhPT0gZWkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGVpID09PSAtMSkgeyAvL2lmIHRoZSBrZXl3b3JkIGlzbid0IGluIHRoZSBlbmQgdmFsdWUsIHJlbW92ZSBpdCBmcm9tIHRoZSBiZWdpbm5pbmcgb25lLlxuXHRcdFx0XHRcdFx0XHRcdGJhW2ldID0gYmFbaV0uc3BsaXQoa3dkKS5qb2luKFwiXCIpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGJpID09PSAtMSkgeyAvL2lmIHRoZSBrZXl3b3JkIGlzbid0IGluIHRoZSBiZWdpbm5pbmcsIGFkZCBpdC5cblx0XHRcdFx0XHRcdFx0XHRiYVtpXSArPSBcIiBcIiArIGt3ZDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRiID0gYmEuam9pbihcIiwgXCIpO1xuXHRcdFx0XHRlID0gZWEuam9pbihcIiwgXCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF9wYXJzZUNvbXBsZXgodCwgdGhpcy5wLCBiLCBlLCB0aGlzLmNscnMsIHRoaXMuZGZsdCwgcHQsIHRoaXMucHIsIHBsdWdpbiwgc2V0UmF0aW8pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBBY2NlcHRzIGEgdGFyZ2V0IGFuZCBlbmQgdmFsdWUgYW5kIHNwaXRzIGJhY2sgYSBDU1NQcm9wVHdlZW4gdGhhdCBoYXMgYmVlbiBpbnNlcnRlZCBpbnRvIHRoZSBDU1NQbHVnaW4ncyBsaW5rZWQgbGlzdCBhbmQgY29uZm9ybXMgd2l0aCBhbGwgdGhlIGNvbnZlbnRpb25zIHdlIHVzZSBpbnRlcm5hbGx5LCBsaWtlIHR5cGU6LTEsIDAsIDEsIG9yIDIsIHNldHRpbmcgdXAgYW55IGV4dHJhIHByb3BlcnR5IHR3ZWVucywgcHJpb3JpdHksIGV0Yy4gRm9yIGV4YW1wbGUsIGlmIHdlIGhhdmUgYSBib3hTaGFkb3cgU3BlY2lhbFByb3AgYW5kIGNhbGw6XG5cdFx0ICogdGhpcy5fZmlyc3RQVCA9IHNwLnBhcnNlKGVsZW1lbnQsIFwiNXB4IDEwcHggMjBweCByZ2IoMjU1MCwxMDIsNTEpXCIsIFwiYm94U2hhZG93XCIsIHRoaXMpO1xuXHRcdCAqIEl0IHNob3VsZCBmaWd1cmUgb3V0IHRoZSBzdGFydGluZyB2YWx1ZSBvZiB0aGUgZWxlbWVudCdzIGJveFNoYWRvdywgY29tcGFyZSBpdCB0byB0aGUgcHJvdmlkZWQgZW5kIHZhbHVlIGFuZCBjcmVhdGUgYWxsIHRoZSBuZWNlc3NhcnkgQ1NTUHJvcFR3ZWVucyBvZiB0aGUgYXBwcm9wcmlhdGUgdHlwZXMgdG8gdHdlZW4gdGhlIGJveFNoYWRvdy4gVGhlIENTU1Byb3BUd2VlbiB0aGF0IGdldHMgc3BpdCBiYWNrIHNob3VsZCBhbHJlYWR5IGJlIGluc2VydGVkIGludG8gdGhlIGxpbmtlZCBsaXN0ICh0aGUgNHRoIHBhcmFtZXRlciBpcyB0aGUgY3VycmVudCBoZWFkLCBzbyBwcmVwZW5kIHRvIHRoYXQpLlxuXHRcdCAqIEBwYXJhbSB7IU9iamVjdH0gdCBUYXJnZXQgb2JqZWN0IHdob3NlIHByb3BlcnR5IGlzIGJlaW5nIHR3ZWVuZWRcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZSBFbmQgdmFsdWUgYXMgcHJvdmlkZWQgaW4gdGhlIHZhcnMgb2JqZWN0ICh0eXBpY2FsbHkgYSBzdHJpbmcsIGJ1dCBub3QgYWx3YXlzIC0gbGlrZSBhIHRocm93UHJvcHMgd291bGQgYmUgYW4gb2JqZWN0KS5cblx0XHQgKiBAcGFyYW0geyFzdHJpbmd9IHAgUHJvcGVydHkgbmFtZVxuXHRcdCAqIEBwYXJhbSB7IUNTU1BsdWdpbn0gY3NzcCBUaGUgQ1NTUGx1Z2luIGluc3RhbmNlIHRoYXQgc2hvdWxkIGJlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHR3ZWVuLlxuXHRcdCAqIEBwYXJhbSB7P0NTU1Byb3BUd2Vlbn0gcHQgVGhlIENTU1Byb3BUd2VlbiB0aGF0IGlzIHRoZSBjdXJyZW50IGhlYWQgb2YgdGhlIGxpbmtlZCBsaXN0ICh3ZSdsbCBwcmVwZW5kIHRvIGl0KVxuXHRcdCAqIEBwYXJhbSB7VHdlZW5QbHVnaW49fSBwbHVnaW4gSWYgYSBwbHVnaW4gd2lsbCBiZSB1c2VkIHRvIHR3ZWVuIHRoZSBwYXJzZWQgdmFsdWUsIHRoaXMgaXMgdGhlIHBsdWdpbiBpbnN0YW5jZS5cblx0XHQgKiBAcGFyYW0ge09iamVjdD19IHZhcnMgT3JpZ2luYWwgdmFycyBvYmplY3QgdGhhdCBjb250YWlucyB0aGUgZGF0YSBmb3IgcGFyc2luZy5cblx0XHQgKiBAcmV0dXJuIHtDU1NQcm9wVHdlZW59IFRoZSBmaXJzdCBDU1NQcm9wVHdlZW4gaW4gdGhlIGxpbmtlZCBsaXN0IHdoaWNoIGluY2x1ZGVzIHRoZSBuZXcgb25lKHMpIGFkZGVkIGJ5IHRoZSBwYXJzZSgpIGNhbGwuXG5cdFx0ICovXG5cdFx0cC5wYXJzZSA9IGZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4sIHZhcnMpIHtcblx0XHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcGxleCh0LnN0eWxlLCB0aGlzLmZvcm1hdChfZ2V0U3R5bGUodCwgdGhpcy5wLCBfY3MsIGZhbHNlLCB0aGlzLmRmbHQpKSwgdGhpcy5mb3JtYXQoZSksIHB0LCBwbHVnaW4pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBSZWdpc3RlcnMgYSBzcGVjaWFsIHByb3BlcnR5IHRoYXQgc2hvdWxkIGJlIGludGVyY2VwdGVkIGZyb20gYW55IFwiY3NzXCIgb2JqZWN0cyBkZWZpbmVkIGluIHR3ZWVucy4gVGhpcyBhbGxvd3MgeW91IHRvIGhhbmRsZSB0aGVtIGhvd2V2ZXIgeW91IHdhbnQgd2l0aG91dCBDU1NQbHVnaW4gZG9pbmcgaXQgZm9yIHlvdS4gVGhlIDJuZCBwYXJhbWV0ZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIDMgcGFyYW1ldGVyczpcblx0XHQgKiAgMSkgVGFyZ2V0IG9iamVjdCB3aG9zZSBwcm9wZXJ0eSBzaG91bGQgYmUgdHdlZW5lZCAodHlwaWNhbGx5IGEgRE9NIGVsZW1lbnQpXG5cdFx0ICogIDIpIFRoZSBlbmQvZGVzdGluYXRpb24gdmFsdWUgKGNvdWxkIGJlIGEgc3RyaW5nLCBudW1iZXIsIG9iamVjdCwgb3Igd2hhdGV2ZXIgeW91IHdhbnQpXG5cdFx0ICogIDMpIFRoZSB0d2VlbiBpbnN0YW5jZSAoeW91IHByb2JhYmx5IGRvbid0IG5lZWQgdG8gd29ycnkgYWJvdXQgdGhpcywgYnV0IGl0IGNhbiBiZSB1c2VmdWwgZm9yIGxvb2tpbmcgdXAgaW5mb3JtYXRpb24gbGlrZSB0aGUgZHVyYXRpb24pXG5cdFx0ICpcblx0XHQgKiBUaGVuLCB5b3VyIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBlYWNoIHRpbWUgdGhlIHR3ZWVuIGdldHMgcmVuZGVyZWQsIHBhc3NpbmcgYSBudW1lcmljIFwicmF0aW9cIiBwYXJhbWV0ZXIgdG8geW91ciBmdW5jdGlvbiB0aGF0IGluZGljYXRlcyB0aGUgY2hhbmdlIGZhY3RvciAodXN1YWxseSBiZXR3ZWVuIDAgYW5kIDEpLiBGb3IgZXhhbXBsZTpcblx0XHQgKlxuXHRcdCAqIENTU1BsdWdpbi5yZWdpc3RlclNwZWNpYWxQcm9wKFwibXlDdXN0b21Qcm9wXCIsIGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUsIHR3ZWVuKSB7XG5cdFx0ICogICAgICB2YXIgc3RhcnQgPSB0YXJnZXQuc3R5bGUud2lkdGg7XG5cdFx0ICogICAgICByZXR1cm4gZnVuY3Rpb24ocmF0aW8pIHtcblx0XHQgKiAgICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gKHN0YXJ0ICsgdmFsdWUgKiByYXRpbykgKyBcInB4XCI7XG5cdFx0ICogICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0IHdpZHRoIHRvIFwiICsgdGFyZ2V0LnN0eWxlLndpZHRoKTtcblx0XHQgKiAgICAgICAgICB9XG5cdFx0ICogfSwgMCk7XG5cdFx0ICpcblx0XHQgKiBUaGVuLCB3aGVuIEkgZG8gdGhpcyB0d2VlbiwgaXQgd2lsbCB0cmlnZ2VyIG15IHNwZWNpYWwgcHJvcGVydHk6XG5cdFx0ICpcblx0XHQgKiBUd2VlbkxpdGUudG8oZWxlbWVudCwgMSwge2Nzczp7bXlDdXN0b21Qcm9wOjEwMH19KTtcblx0XHQgKlxuXHRcdCAqIEluIHRoZSBleGFtcGxlLCBvZiBjb3Vyc2UsIHdlJ3JlIGp1c3QgY2hhbmdpbmcgdGhlIHdpZHRoLCBidXQgeW91IGNhbiBkbyBhbnl0aGluZyB5b3Ugd2FudC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZSBQcm9wZXJ0eSBuYW1lIChvciBjb21tYS1kZWxpbWl0ZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcykgdGhhdCBzaG91bGQgYmUgaW50ZXJjZXB0ZWQgYW5kIGhhbmRsZWQgYnkgeW91ciBmdW5jdGlvbi4gRm9yIGV4YW1wbGUsIGlmIEkgZGVmaW5lIFwibXlDdXN0b21Qcm9wXCIsIHRoZW4gaXQgd291bGQgaGFuZGxlIHRoYXQgcG9ydGlvbiBvZiB0aGUgZm9sbG93aW5nIHR3ZWVuOiBUd2VlbkxpdGUudG8oZWxlbWVudCwgMSwge2Nzczp7bXlDdXN0b21Qcm9wOjEwMH19KVxuXHRcdCAqIEBwYXJhbSB7IWZ1bmN0aW9uKE9iamVjdCwgT2JqZWN0LCBPYmplY3QsIHN0cmluZyk6ZnVuY3Rpb24obnVtYmVyKX0gb25Jbml0VHdlZW4gVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiBhIHR3ZWVuIG9mIHRoaXMgc3BlY2lhbCBwcm9wZXJ0eSBpcyBwZXJmb3JtZWQuIFRoZSBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgNCBwYXJhbWV0ZXJzOiAxKSBUYXJnZXQgb2JqZWN0IHRoYXQgc2hvdWxkIGJlIHR3ZWVuZWQsIDIpIFZhbHVlIHRoYXQgd2FzIHBhc3NlZCB0byB0aGUgdHdlZW4sIDMpIFRoZSB0d2VlbiBpbnN0YW5jZSBpdHNlbGYgKHJhcmVseSB1c2VkKSwgYW5kIDQpIFRoZSBwcm9wZXJ0eSBuYW1lIHRoYXQncyBiZWluZyB0d2VlbmVkLiBZb3VyIGZ1bmN0aW9uIHNob3VsZCByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgb24gZXZlcnkgdXBkYXRlIG9mIHRoZSB0d2Vlbi4gVGhhdCBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgYSBzaW5nbGUgcGFyYW1ldGVyIHRoYXQgaXMgYSBcImNoYW5nZSBmYWN0b3JcIiB2YWx1ZSAodHlwaWNhbGx5IGJldHdlZW4gMCBhbmQgMSkgaW5kaWNhdGluZyB0aGUgYW1vdW50IG9mIGNoYW5nZSBhcyBhIHJhdGlvLiBZb3UgY2FuIHVzZSB0aGlzIHRvIGRldGVybWluZSBob3cgdG8gc2V0IHRoZSB2YWx1ZXMgYXBwcm9wcmlhdGVseSBpbiB5b3VyIGZ1bmN0aW9uLlxuXHRcdCAqIEBwYXJhbSB7bnVtYmVyPX0gcHJpb3JpdHkgUHJpb3JpdHkgdGhhdCBoZWxwcyB0aGUgZW5naW5lIGRldGVybWluZSB0aGUgb3JkZXIgaW4gd2hpY2ggdG8gc2V0IHRoZSBwcm9wZXJ0aWVzIChkZWZhdWx0OiAwKS4gSGlnaGVyIHByaW9yaXR5IHByb3BlcnRpZXMgd2lsbCBiZSB1cGRhdGVkIGJlZm9yZSBsb3dlciBwcmlvcml0eSBvbmVzLlxuXHRcdCAqL1xuXHRcdENTU1BsdWdpbi5yZWdpc3RlclNwZWNpYWxQcm9wID0gZnVuY3Rpb24obmFtZSwgb25Jbml0VHdlZW4sIHByaW9yaXR5KSB7XG5cdFx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AobmFtZSwge3BhcnNlcjpmdW5jdGlvbih0LCBlLCBwLCBjc3NwLCBwdCwgcGx1Z2luLCB2YXJzKSB7XG5cdFx0XHRcdHZhciBydiA9IG5ldyBDU1NQcm9wVHdlZW4odCwgcCwgMCwgMCwgcHQsIDIsIHAsIGZhbHNlLCBwcmlvcml0eSk7XG5cdFx0XHRcdHJ2LnBsdWdpbiA9IHBsdWdpbjtcblx0XHRcdFx0cnYuc2V0UmF0aW8gPSBvbkluaXRUd2Vlbih0LCBlLCBjc3NwLl90d2VlbiwgcCk7XG5cdFx0XHRcdHJldHVybiBydjtcblx0XHRcdH0sIHByaW9yaXR5OnByaW9yaXR5fSk7XG5cdFx0fTtcblxuXG5cblxuXG5cblx0XHQvL3RyYW5zZm9ybS1yZWxhdGVkIG1ldGhvZHMgYW5kIHByb3BlcnRpZXNcblx0XHRDU1NQbHVnaW4udXNlU1ZHVHJhbnNmb3JtQXR0ciA9IF9pc1NhZmFyaSB8fCBfaXNGaXJlZm94OyAvL1NhZmFyaSBhbmQgRmlyZWZveCBib3RoIGhhdmUgc29tZSByZW5kZXJpbmcgYnVncyB3aGVuIGFwcGx5aW5nIENTUyB0cmFuc2Zvcm1zIHRvIFNWRyBlbGVtZW50cywgc28gZGVmYXVsdCB0byB1c2luZyB0aGUgXCJ0cmFuc2Zvcm1cIiBhdHRyaWJ1dGUgaW5zdGVhZCAodXNlcnMgY2FuIG92ZXJyaWRlIHRoaXMpLlxuXHRcdHZhciBfdHJhbnNmb3JtUHJvcHMgPSAoXCJzY2FsZVgsc2NhbGVZLHNjYWxlWix4LHkseixza2V3WCxza2V3WSxyb3RhdGlvbixyb3RhdGlvblgscm90YXRpb25ZLHBlcnNwZWN0aXZlLHhQZXJjZW50LHlQZXJjZW50XCIpLnNwbGl0KFwiLFwiKSxcblx0XHRcdF90cmFuc2Zvcm1Qcm9wID0gX2NoZWNrUHJvcFByZWZpeChcInRyYW5zZm9ybVwiKSwgLy90aGUgSmF2YXNjcmlwdCAoY2FtZWxDYXNlKSB0cmFuc2Zvcm0gcHJvcGVydHksIGxpa2UgbXNUcmFuc2Zvcm0sIFdlYmtpdFRyYW5zZm9ybSwgTW96VHJhbnNmb3JtLCBvciBPVHJhbnNmb3JtLlxuXHRcdFx0X3RyYW5zZm9ybVByb3BDU1MgPSBfcHJlZml4Q1NTICsgXCJ0cmFuc2Zvcm1cIixcblx0XHRcdF90cmFuc2Zvcm1PcmlnaW5Qcm9wID0gX2NoZWNrUHJvcFByZWZpeChcInRyYW5zZm9ybU9yaWdpblwiKSxcblx0XHRcdF9zdXBwb3J0czNEID0gKF9jaGVja1Byb3BQcmVmaXgoXCJwZXJzcGVjdGl2ZVwiKSAhPT0gbnVsbCksXG5cdFx0XHRUcmFuc2Zvcm0gPSBfaW50ZXJuYWxzLlRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLnBlcnNwZWN0aXZlID0gcGFyc2VGbG9hdChDU1NQbHVnaW4uZGVmYXVsdFRyYW5zZm9ybVBlcnNwZWN0aXZlKSB8fCAwO1xuXHRcdFx0XHR0aGlzLmZvcmNlM0QgPSAoQ1NTUGx1Z2luLmRlZmF1bHRGb3JjZTNEID09PSBmYWxzZSB8fCAhX3N1cHBvcnRzM0QpID8gZmFsc2UgOiBDU1NQbHVnaW4uZGVmYXVsdEZvcmNlM0QgfHwgXCJhdXRvXCI7XG5cdFx0XHR9LFxuXHRcdFx0X1NWR0VsZW1lbnQgPSB3aW5kb3cuU1ZHRWxlbWVudCxcblx0XHRcdF91c2VTVkdUcmFuc2Zvcm1BdHRyLFxuXHRcdFx0Ly9Tb21lIGJyb3dzZXJzIChsaWtlIEZpcmVmb3ggYW5kIElFKSBkb24ndCBob25vciB0cmFuc2Zvcm0tb3JpZ2luIHByb3Blcmx5IGluIFNWRyBlbGVtZW50cywgc28gd2UgbmVlZCB0byBtYW51YWxseSBhZGp1c3QgdGhlIG1hdHJpeCBhY2NvcmRpbmdseS4gV2UgZmVhdHVyZSBkZXRlY3QgaGVyZSByYXRoZXIgdGhhbiBhbHdheXMgZG9pbmcgdGhlIGNvbnZlcnNpb24gZm9yIGNlcnRhaW4gYnJvd3NlcnMgYmVjYXVzZSB0aGV5IG1heSBmaXggdGhlIHByb2JsZW0gYXQgc29tZSBwb2ludCBpbiB0aGUgZnV0dXJlLlxuXG5cdFx0XHRfY3JlYXRlU1ZHID0gZnVuY3Rpb24odHlwZSwgY29udGFpbmVyLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHZhciBlbGVtZW50ID0gX2RvYy5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCB0eXBlKSxcblx0XHRcdFx0XHRyZWcgPSAvKFthLXpdKShbQS1aXSkvZyxcblx0XHRcdFx0XHRwO1xuXHRcdFx0XHRmb3IgKHAgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlTlMobnVsbCwgcC5yZXBsYWNlKHJlZywgXCIkMS0kMlwiKS50b0xvd2VyQ2FzZSgpLCBhdHRyaWJ1dGVzW3BdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cdFx0XHRcdHJldHVybiBlbGVtZW50O1xuXHRcdFx0fSxcblx0XHRcdF9kb2NFbGVtZW50ID0gX2RvYy5kb2N1bWVudEVsZW1lbnQsXG5cdFx0XHRfZm9yY2VTVkdUcmFuc2Zvcm1BdHRyID0gKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvL0lFIGFuZCBBbmRyb2lkIHN0b2NrIGRvbid0IHN1cHBvcnQgQ1NTIHRyYW5zZm9ybXMgb24gU1ZHIGVsZW1lbnRzLCBzbyB3ZSBtdXN0IHdyaXRlIHRoZW0gdG8gdGhlIFwidHJhbnNmb3JtXCIgYXR0cmlidXRlLiBXZSBwb3B1bGF0ZSB0aGlzIHZhcmlhYmxlIGluIHRoZSBfcGFyc2VUcmFuc2Zvcm0oKSBtZXRob2QsIGFuZCBvbmx5IGlmL3doZW4gd2UgY29tZSBhY3Jvc3MgYW4gU1ZHIGVsZW1lbnRcblx0XHRcdFx0dmFyIGZvcmNlID0gX2llVmVycyB8fCAoL0FuZHJvaWQvaS50ZXN0KF9hZ2VudCkgJiYgIXdpbmRvdy5jaHJvbWUpLFxuXHRcdFx0XHRcdHN2ZywgcmVjdCwgd2lkdGg7XG5cdFx0XHRcdGlmIChfZG9jLmNyZWF0ZUVsZW1lbnROUyAmJiAhZm9yY2UpIHsgLy9JRTggYW5kIGVhcmxpZXIgZG9lc24ndCBzdXBwb3J0IFNWRyBhbnl3YXlcblx0XHRcdFx0XHRzdmcgPSBfY3JlYXRlU1ZHKFwic3ZnXCIsIF9kb2NFbGVtZW50KTtcblx0XHRcdFx0XHRyZWN0ID0gX2NyZWF0ZVNWRyhcInJlY3RcIiwgc3ZnLCB7d2lkdGg6MTAwLCBoZWlnaHQ6NTAsIHg6MTAwfSk7XG5cdFx0XHRcdFx0d2lkdGggPSByZWN0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXHRcdFx0XHRcdHJlY3Quc3R5bGVbX3RyYW5zZm9ybU9yaWdpblByb3BdID0gXCI1MCUgNTAlXCI7XG5cdFx0XHRcdFx0cmVjdC5zdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSBcInNjYWxlWCgwLjUpXCI7XG5cdFx0XHRcdFx0Zm9yY2UgPSAod2lkdGggPT09IHJlY3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggJiYgIShfaXNGaXJlZm94ICYmIF9zdXBwb3J0czNEKSk7IC8vbm90ZTogRmlyZWZveCBmYWlscyB0aGUgdGVzdCBldmVuIHRob3VnaCBpdCBkb2VzIHN1cHBvcnQgQ1NTIHRyYW5zZm9ybXMgaW4gM0QuIFNpbmNlIHdlIGNhbid0IHB1c2ggM0Qgc3R1ZmYgaW50byB0aGUgdHJhbnNmb3JtIGF0dHJpYnV0ZSwgd2UgZm9yY2UgRmlyZWZveCB0byBwYXNzIHRoZSB0ZXN0IGhlcmUgKGFzIGxvbmcgYXMgaXQgZG9lcyB0cnVseSBzdXBwb3J0IDNEKS5cblx0XHRcdFx0XHRfZG9jRWxlbWVudC5yZW1vdmVDaGlsZChzdmcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmb3JjZTtcblx0XHRcdH0pKCksXG5cdFx0XHRfcGFyc2VTVkdPcmlnaW4gPSBmdW5jdGlvbihlLCBsb2NhbCwgZGVjb3JhdGVlLCBhYnNvbHV0ZSwgc21vb3RoT3JpZ2luKSB7XG5cdFx0XHRcdHZhciB0bSA9IGUuX2dzVHJhbnNmb3JtLFxuXHRcdFx0XHRcdG0gPSBfZ2V0TWF0cml4KGUsIHRydWUpLFxuXHRcdFx0XHRcdHYsIHgsIHksIHhPcmlnaW4sIHlPcmlnaW4sIGEsIGIsIGMsIGQsIHR4LCB0eSwgZGV0ZXJtaW5hbnQsIHhPcmlnaW5PbGQsIHlPcmlnaW5PbGQ7XG5cdFx0XHRcdGlmICh0bSkge1xuXHRcdFx0XHRcdHhPcmlnaW5PbGQgPSB0bS54T3JpZ2luOyAvL3JlY29yZCB0aGUgb3JpZ2luYWwgdmFsdWVzIGJlZm9yZSB3ZSBhbHRlciB0aGVtLlxuXHRcdFx0XHRcdHlPcmlnaW5PbGQgPSB0bS55T3JpZ2luO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghYWJzb2x1dGUgfHwgKHYgPSBhYnNvbHV0ZS5zcGxpdChcIiBcIikpLmxlbmd0aCA8IDIpIHtcblx0XHRcdFx0XHRiID0gZS5nZXRCQm94KCk7XG5cdFx0XHRcdFx0bG9jYWwgPSBfcGFyc2VQb3NpdGlvbihsb2NhbCkuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdHYgPSBbKGxvY2FsWzBdLmluZGV4T2YoXCIlXCIpICE9PSAtMSA/IHBhcnNlRmxvYXQobG9jYWxbMF0pIC8gMTAwICogYi53aWR0aCA6IHBhcnNlRmxvYXQobG9jYWxbMF0pKSArIGIueCxcblx0XHRcdFx0XHRcdCAobG9jYWxbMV0uaW5kZXhPZihcIiVcIikgIT09IC0xID8gcGFyc2VGbG9hdChsb2NhbFsxXSkgLyAxMDAgKiBiLmhlaWdodCA6IHBhcnNlRmxvYXQobG9jYWxbMV0pKSArIGIueV07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGVjb3JhdGVlLnhPcmlnaW4gPSB4T3JpZ2luID0gcGFyc2VGbG9hdCh2WzBdKTtcblx0XHRcdFx0ZGVjb3JhdGVlLnlPcmlnaW4gPSB5T3JpZ2luID0gcGFyc2VGbG9hdCh2WzFdKTtcblx0XHRcdFx0aWYgKGFic29sdXRlICYmIG0gIT09IF9pZGVudGl0eTJETWF0cml4KSB7IC8vaWYgc3ZnT3JpZ2luIGlzIGJlaW5nIHNldCwgd2UgbXVzdCBpbnZlcnQgdGhlIG1hdHJpeCBhbmQgZGV0ZXJtaW5lIHdoZXJlIHRoZSBhYnNvbHV0ZSBwb2ludCBpcywgZmFjdG9yaW5nIGluIHRoZSBjdXJyZW50IHRyYW5zZm9ybXMuIE90aGVyd2lzZSwgdGhlIHN2Z09yaWdpbiB3b3VsZCBiZSBiYXNlZCBvbiB0aGUgZWxlbWVudCdzIG5vbi10cmFuc2Zvcm1lZCBwb3NpdGlvbiBvbiB0aGUgY2FudmFzLlxuXHRcdFx0XHRcdGEgPSBtWzBdO1xuXHRcdFx0XHRcdGIgPSBtWzFdO1xuXHRcdFx0XHRcdGMgPSBtWzJdO1xuXHRcdFx0XHRcdGQgPSBtWzNdO1xuXHRcdFx0XHRcdHR4ID0gbVs0XTtcblx0XHRcdFx0XHR0eSA9IG1bNV07XG5cdFx0XHRcdFx0ZGV0ZXJtaW5hbnQgPSAoYSAqIGQgLSBiICogYyk7XG5cdFx0XHRcdFx0eCA9IHhPcmlnaW4gKiAoZCAvIGRldGVybWluYW50KSArIHlPcmlnaW4gKiAoLWMgLyBkZXRlcm1pbmFudCkgKyAoKGMgKiB0eSAtIGQgKiB0eCkgLyBkZXRlcm1pbmFudCk7XG5cdFx0XHRcdFx0eSA9IHhPcmlnaW4gKiAoLWIgLyBkZXRlcm1pbmFudCkgKyB5T3JpZ2luICogKGEgLyBkZXRlcm1pbmFudCkgLSAoKGEgKiB0eSAtIGIgKiB0eCkgLyBkZXRlcm1pbmFudCk7XG5cdFx0XHRcdFx0eE9yaWdpbiA9IGRlY29yYXRlZS54T3JpZ2luID0gdlswXSA9IHg7XG5cdFx0XHRcdFx0eU9yaWdpbiA9IGRlY29yYXRlZS55T3JpZ2luID0gdlsxXSA9IHk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRtKSB7IC8vYXZvaWQganVtcCB3aGVuIHRyYW5zZm9ybU9yaWdpbiBpcyBjaGFuZ2VkIC0gYWRqdXN0IHRoZSB4L3kgdmFsdWVzIGFjY29yZGluZ2x5XG5cdFx0XHRcdFx0aWYgKHNtb290aE9yaWdpbiB8fCAoc21vb3RoT3JpZ2luICE9PSBmYWxzZSAmJiBDU1NQbHVnaW4uZGVmYXVsdFNtb290aE9yaWdpbiAhPT0gZmFsc2UpKSB7XG5cdFx0XHRcdFx0XHR4ID0geE9yaWdpbiAtIHhPcmlnaW5PbGQ7XG5cdFx0XHRcdFx0XHR5ID0geU9yaWdpbiAtIHlPcmlnaW5PbGQ7XG5cdFx0XHRcdFx0XHQvL29yaWdpbmFsbHksIHdlIHNpbXBseSBhZGp1c3RlZCB0aGUgeCBhbmQgeSB2YWx1ZXMsIGJ1dCB0aGF0IHdvdWxkIGNhdXNlIHByb2JsZW1zIGlmLCBmb3IgZXhhbXBsZSwgeW91IGNyZWF0ZWQgYSByb3RhdGlvbmFsIHR3ZWVuIHBhcnQtd2F5IHRocm91Z2ggYW4geC95IHR3ZWVuLiBNYW5hZ2luZyB0aGUgb2Zmc2V0IGluIGEgc2VwYXJhdGUgdmFyaWFibGUgZ2l2ZXMgdXMgdWx0aW1hdGUgZmxleGliaWxpdHkuXG5cdFx0XHRcdFx0XHQvL3RtLnggLT0geCAtICh4ICogbVswXSArIHkgKiBtWzJdKTtcblx0XHRcdFx0XHRcdC8vdG0ueSAtPSB5IC0gKHggKiBtWzFdICsgeSAqIG1bM10pO1xuXHRcdFx0XHRcdFx0dG0ueE9mZnNldCArPSAoeCAqIG1bMF0gKyB5ICogbVsyXSkgLSB4O1xuXHRcdFx0XHRcdFx0dG0ueU9mZnNldCArPSAoeCAqIG1bMV0gKyB5ICogbVszXSkgLSB5O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0bS54T2Zmc2V0ID0gdG0ueU9mZnNldCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGUuc2V0QXR0cmlidXRlKFwiZGF0YS1zdmctb3JpZ2luXCIsIHYuam9pbihcIiBcIikpO1xuXHRcdFx0fSxcblx0XHRcdF9pc1NWRyA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0cmV0dXJuICEhKF9TVkdFbGVtZW50ICYmIHR5cGVvZihlLmdldEJCb3gpID09PSBcImZ1bmN0aW9uXCIgJiYgZS5nZXRDVE0gJiYgKCFlLnBhcmVudE5vZGUgfHwgKGUucGFyZW50Tm9kZS5nZXRCQm94ICYmIGUucGFyZW50Tm9kZS5nZXRDVE0pKSk7XG5cdFx0XHR9LFxuXHRcdFx0X2lkZW50aXR5MkRNYXRyaXggPSBbMSwwLDAsMSwwLDBdLFxuXHRcdFx0X2dldE1hdHJpeCA9IGZ1bmN0aW9uKGUsIGZvcmNlMkQpIHtcblx0XHRcdFx0dmFyIHRtID0gZS5fZ3NUcmFuc2Zvcm0gfHwgbmV3IFRyYW5zZm9ybSgpLFxuXHRcdFx0XHRcdHJuZCA9IDEwMDAwMCxcblx0XHRcdFx0XHRpc0RlZmF1bHQsIHMsIG0sIG4sIGRlYztcblx0XHRcdFx0aWYgKF90cmFuc2Zvcm1Qcm9wKSB7XG5cdFx0XHRcdFx0cyA9IF9nZXRTdHlsZShlLCBfdHJhbnNmb3JtUHJvcENTUywgbnVsbCwgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoZS5jdXJyZW50U3R5bGUpIHtcblx0XHRcdFx0XHQvL2ZvciBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgd2UgbmVlZCB0byBpbnRlcnByZXQgdGhlIGZpbHRlciBwb3J0aW9uIHRoYXQgaXMgaW4gdGhlIGZvcm1hdDogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0Lk1hdHJpeChNMTE9Ni4xMjMyMzM5OTU3MzY3NjZlLTE3LCBNMTI9LTEsIE0yMT0xLCBNMjI9Ni4xMjMyMzM5OTU3MzY3NjZlLTE3LCBzaXppbmdNZXRob2Q9J2F1dG8gZXhwYW5kJykgTm90aWNlIHRoYXQgd2UgbmVlZCB0byBzd2FwIGIgYW5kIGMgY29tcGFyZWQgdG8gYSBub3JtYWwgbWF0cml4LlxuXHRcdFx0XHRcdHMgPSBlLmN1cnJlbnRTdHlsZS5maWx0ZXIubWF0Y2goX2llR2V0TWF0cml4RXhwKTtcblx0XHRcdFx0XHRzID0gKHMgJiYgcy5sZW5ndGggPT09IDQpID8gW3NbMF0uc3Vic3RyKDQpLCBOdW1iZXIoc1syXS5zdWJzdHIoNCkpLCBOdW1iZXIoc1sxXS5zdWJzdHIoNCkpLCBzWzNdLnN1YnN0cig0KSwgKHRtLnggfHwgMCksICh0bS55IHx8IDApXS5qb2luKFwiLFwiKSA6IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXNEZWZhdWx0ID0gKCFzIHx8IHMgPT09IFwibm9uZVwiIHx8IHMgPT09IFwibWF0cml4KDEsIDAsIDAsIDEsIDAsIDApXCIpO1xuXHRcdFx0XHRpZiAodG0uc3ZnIHx8IChlLmdldEJCb3ggJiYgX2lzU1ZHKGUpKSkge1xuXHRcdFx0XHRcdGlmIChpc0RlZmF1bHQgJiYgKGUuc3R5bGVbX3RyYW5zZm9ybVByb3BdICsgXCJcIikuaW5kZXhPZihcIm1hdHJpeFwiKSAhPT0gLTEpIHsgLy9zb21lIGJyb3dzZXJzIChsaWtlIENocm9tZSA0MCkgZG9uJ3QgY29ycmVjdGx5IHJlcG9ydCB0cmFuc2Zvcm1zIHRoYXQgYXJlIGFwcGxpZWQgaW5saW5lIG9uIGFuIFNWRyBlbGVtZW50ICh0aGV5IGRvbid0IGdldCBpbmNsdWRlZCBpbiB0aGUgY29tcHV0ZWQgc3R5bGUpLCBzbyB3ZSBkb3VibGUtY2hlY2sgaGVyZSBhbmQgYWNjZXB0IG1hdHJpeCB2YWx1ZXNcblx0XHRcdFx0XHRcdHMgPSBlLnN0eWxlW190cmFuc2Zvcm1Qcm9wXTtcblx0XHRcdFx0XHRcdGlzRGVmYXVsdCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG0gPSBlLmdldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcblx0XHRcdFx0XHRpZiAoaXNEZWZhdWx0ICYmIG0pIHtcblx0XHRcdFx0XHRcdGlmIChtLmluZGV4T2YoXCJtYXRyaXhcIikgIT09IC0xKSB7IC8vanVzdCBpbiBjYXNlIHRoZXJlJ3MgYSBcInRyYW5zZm9ybVwiIHZhbHVlIHNwZWNpZmllZCBhcyBhbiBhdHRyaWJ1dGUgaW5zdGVhZCBvZiBDU1Mgc3R5bGUuIEFjY2VwdCBlaXRoZXIgYSBtYXRyaXgoKSBvciBzaW1wbGUgdHJhbnNsYXRlKCkgdmFsdWUgdGhvdWdoLlxuXHRcdFx0XHRcdFx0XHRzID0gbTtcblx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0ID0gMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAobS5pbmRleE9mKFwidHJhbnNsYXRlXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRzID0gXCJtYXRyaXgoMSwwLDAsMSxcIiArIG0ubWF0Y2goLyg/OlxcLXxcXGIpW1xcZFxcLVxcLmVdK1xcYi9naSkuam9pbihcIixcIikgKyBcIilcIjtcblx0XHRcdFx0XHRcdFx0aXNEZWZhdWx0ID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzRGVmYXVsdCkge1xuXHRcdFx0XHRcdHJldHVybiBfaWRlbnRpdHkyRE1hdHJpeDtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL3NwbGl0IHRoZSBtYXRyaXggdmFsdWVzIG91dCBpbnRvIGFuIGFycmF5IChtIGZvciBtYXRyaXgpXG5cdFx0XHRcdG0gPSAocyB8fCBcIlwiKS5tYXRjaCgvKD86XFwtfFxcYilbXFxkXFwtXFwuZV0rXFxiL2dpKSB8fCBbXTtcblx0XHRcdFx0aSA9IG0ubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRuID0gTnVtYmVyKG1baV0pO1xuXHRcdFx0XHRcdG1baV0gPSAoZGVjID0gbiAtIChuIHw9IDApKSA/ICgoZGVjICogcm5kICsgKGRlYyA8IDAgPyAtMC41IDogMC41KSkgfCAwKSAvIHJuZCArIG4gOiBuOyAvL2NvbnZlcnQgc3RyaW5ncyB0byBOdW1iZXJzIGFuZCByb3VuZCB0byA1IGRlY2ltYWwgcGxhY2VzIHRvIGF2b2lkIGlzc3VlcyB3aXRoIHRpbnkgbnVtYmVycy4gUm91Z2hseSAyMHggZmFzdGVyIHRoYW4gTnVtYmVyLnRvRml4ZWQoKS4gV2UgYWxzbyBtdXN0IG1ha2Ugc3VyZSB0byByb3VuZCBiZWZvcmUgZGl2aWRpbmcgc28gdGhhdCB2YWx1ZXMgbGlrZSAwLjk5OTk5OTk5OTkgYmVjb21lIDEgdG8gYXZvaWQgZ2xpdGNoZXMgaW4gYnJvd3NlciByZW5kZXJpbmcgYW5kIGludGVycHJldGF0aW9uIG9mIGZsaXBwZWQvcm90YXRlZCAzRCBtYXRyaWNlcy4gQW5kIGRvbid0IGp1c3QgbXVsdGlwbHkgdGhlIG51bWJlciBieSBybmQsIGZsb29yIGl0LCBhbmQgdGhlbiBkaXZpZGUgYnkgcm5kIGJlY2F1c2UgdGhlIGJpdHdpc2Ugb3BlcmF0aW9ucyBtYXggb3V0IGF0IGEgMzItYml0IHNpZ25lZCBpbnRlZ2VyLCB0aHVzIGl0IGNvdWxkIGdldCBjbGlwcGVkIGF0IGEgcmVsYXRpdmVseSBsb3cgdmFsdWUgKGxpa2UgMjIsMDAwLjAwMDAwIGZvciBleGFtcGxlKS5cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gKGZvcmNlMkQgJiYgbS5sZW5ndGggPiA2KSA/IFttWzBdLCBtWzFdLCBtWzRdLCBtWzVdLCBtWzEyXSwgbVsxM11dIDogbTtcblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogUGFyc2VzIHRoZSB0cmFuc2Zvcm0gdmFsdWVzIGZvciBhbiBlbGVtZW50LCByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggeCwgeSwgeiwgc2NhbGVYLCBzY2FsZVksIHNjYWxlWiwgcm90YXRpb24sIHJvdGF0aW9uWCwgcm90YXRpb25ZLCBza2V3WCwgYW5kIHNrZXdZIHByb3BlcnRpZXMuIE5vdGU6IGJ5IGRlZmF1bHQgKGZvciBwZXJmb3JtYW5jZSByZWFzb25zKSwgYWxsIHNrZXdpbmcgaXMgY29tYmluZWQgaW50byBza2V3WCBhbmQgcm90YXRpb24gYnV0IHNrZXdZIHN0aWxsIGhhcyBhIHBsYWNlIGluIHRoZSB0cmFuc2Zvcm0gb2JqZWN0IHNvIHRoYXQgd2UgY2FuIHJlY29yZCBob3cgbXVjaCBvZiB0aGUgc2tldyBpcyBhdHRyaWJ1dGVkIHRvIHNrZXdYIHZzIHNrZXdZLiBSZW1lbWJlciwgYSBza2V3WSBvZiAxMCBsb29rcyB0aGUgc2FtZSBhcyBhIHJvdGF0aW9uIG9mIDEwIGFuZCBza2V3WCBvZiAtMTAuXG5cdFx0XHQgKiBAcGFyYW0geyFPYmplY3R9IHQgdGFyZ2V0IGVsZW1lbnRcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0PX0gY3MgY29tcHV0ZWQgc3R5bGUgb2JqZWN0IChvcHRpb25hbClcblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbj19IHJlYyBpZiB0cnVlLCB0aGUgdHJhbnNmb3JtIHZhbHVlcyB3aWxsIGJlIHJlY29yZGVkIHRvIHRoZSB0YXJnZXQgZWxlbWVudCdzIF9nc1RyYW5zZm9ybSBvYmplY3QsIGxpa2UgdGFyZ2V0Ll9nc1RyYW5zZm9ybSA9IHt4OjAsIHk6MCwgejowLCBzY2FsZVg6MS4uLn1cblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbj19IHBhcnNlIGlmIHRydWUsIHdlJ2xsIGlnbm9yZSBhbnkgX2dzVHJhbnNmb3JtIHZhbHVlcyB0aGF0IGFscmVhZHkgZXhpc3Qgb24gdGhlIGVsZW1lbnQsIGFuZCBmb3JjZSBhIHJlcGFyc2luZyBvZiB0aGUgY3NzIChjYWxjdWxhdGVkIHN0eWxlKVxuXHRcdFx0ICogQHJldHVybiB7b2JqZWN0fSBvYmplY3QgY29udGFpbmluZyBhbGwgb2YgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0aWVzL3ZhbHVlcyBsaWtlIHt4OjAsIHk6MCwgejowLCBzY2FsZVg6MS4uLn1cblx0XHRcdCAqL1xuXHRcdFx0X2dldFRyYW5zZm9ybSA9IF9pbnRlcm5hbHMuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24odCwgY3MsIHJlYywgcGFyc2UpIHtcblx0XHRcdFx0aWYgKHQuX2dzVHJhbnNmb3JtICYmIHJlYyAmJiAhcGFyc2UpIHtcblx0XHRcdFx0XHRyZXR1cm4gdC5fZ3NUcmFuc2Zvcm07IC8vaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBoYXMgYSBfZ3NUcmFuc2Zvcm0sIHVzZSB0aGF0LiBOb3RlOiBzb21lIGJyb3dzZXJzIGRvbid0IGFjY3VyYXRlbHkgcmV0dXJuIHRoZSBjYWxjdWxhdGVkIHN0eWxlIGZvciB0aGUgdHJhbnNmb3JtIChwYXJ0aWN1bGFybHkgZm9yIFNWRyksIHNvIGl0J3MgYWxtb3N0IGFsd2F5cyBzYWZlc3QgdG8ganVzdCB1c2UgdGhlIHZhbHVlcyB3ZSd2ZSBhbHJlYWR5IGFwcGxpZWQgcmF0aGVyIHRoYW4gcmUtcGFyc2luZyB0aGluZ3MuXG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHRtID0gcmVjID8gdC5fZ3NUcmFuc2Zvcm0gfHwgbmV3IFRyYW5zZm9ybSgpIDogbmV3IFRyYW5zZm9ybSgpLFxuXHRcdFx0XHRcdGludlggPSAodG0uc2NhbGVYIDwgMCksIC8vaW4gb3JkZXIgdG8gaW50ZXJwcmV0IHRoaW5ncyBwcm9wZXJseSwgd2UgbmVlZCB0byBrbm93IGlmIHRoZSB1c2VyIGFwcGxpZWQgYSBuZWdhdGl2ZSBzY2FsZVggcHJldmlvdXNseSBzbyB0aGF0IHdlIGNhbiBhZGp1c3QgdGhlIHJvdGF0aW9uIGFuZCBza2V3WCBhY2NvcmRpbmdseS4gT3RoZXJ3aXNlLCBpZiB3ZSBhbHdheXMgaW50ZXJwcmV0IGEgZmxpcHBlZCBtYXRyaXggYXMgYWZmZWN0aW5nIHNjYWxlWSBhbmQgdGhlIHVzZXIgb25seSB3YW50cyB0byB0d2VlbiB0aGUgc2NhbGVYIG9uIG11bHRpcGxlIHNlcXVlbnRpYWwgdHdlZW5zLCBpdCB3b3VsZCBrZWVwIHRoZSBuZWdhdGl2ZSBzY2FsZVkgd2l0aG91dCB0aGF0IGJlaW5nIHRoZSB1c2VyJ3MgaW50ZW50LlxuXHRcdFx0XHRcdG1pbiA9IDAuMDAwMDIsXG5cdFx0XHRcdFx0cm5kID0gMTAwMDAwLFxuXHRcdFx0XHRcdHpPcmlnaW4gPSBfc3VwcG9ydHMzRCA/IHBhcnNlRmxvYXQoX2dldFN0eWxlKHQsIF90cmFuc2Zvcm1PcmlnaW5Qcm9wLCBjcywgZmFsc2UsIFwiMCAwIDBcIikuc3BsaXQoXCIgXCIpWzJdKSB8fCB0bS56T3JpZ2luICB8fCAwIDogMCxcblx0XHRcdFx0XHRkZWZhdWx0VHJhbnNmb3JtUGVyc3BlY3RpdmUgPSBwYXJzZUZsb2F0KENTU1BsdWdpbi5kZWZhdWx0VHJhbnNmb3JtUGVyc3BlY3RpdmUpIHx8IDAsXG5cdFx0XHRcdFx0bSwgaSwgc2NhbGVYLCBzY2FsZVksIHJvdGF0aW9uLCBza2V3WDtcblxuXHRcdFx0XHR0bS5zdmcgPSAhISh0LmdldEJCb3ggJiYgX2lzU1ZHKHQpKTtcblx0XHRcdFx0aWYgKHRtLnN2Zykge1xuXHRcdFx0XHRcdF9wYXJzZVNWR09yaWdpbih0LCBfZ2V0U3R5bGUodCwgX3RyYW5zZm9ybU9yaWdpblByb3AsIF9jcywgZmFsc2UsIFwiNTAlIDUwJVwiKSArIFwiXCIsIHRtLCB0LmdldEF0dHJpYnV0ZShcImRhdGEtc3ZnLW9yaWdpblwiKSk7XG5cdFx0XHRcdFx0X3VzZVNWR1RyYW5zZm9ybUF0dHIgPSBDU1NQbHVnaW4udXNlU1ZHVHJhbnNmb3JtQXR0ciB8fCBfZm9yY2VTVkdUcmFuc2Zvcm1BdHRyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG0gPSBfZ2V0TWF0cml4KHQpO1xuXHRcdFx0XHRpZiAobSAhPT0gX2lkZW50aXR5MkRNYXRyaXgpIHtcblxuXHRcdFx0XHRcdGlmIChtLmxlbmd0aCA9PT0gMTYpIHtcblx0XHRcdFx0XHRcdC8vd2UnbGwgb25seSBsb29rIGF0IHRoZXNlIHBvc2l0aW9uLXJlbGF0ZWQgNiB2YXJpYWJsZXMgZmlyc3QgYmVjYXVzZSBpZiB4L3kveiBhbGwgbWF0Y2gsIGl0J3MgcmVsYXRpdmVseSBzYWZlIHRvIGFzc3VtZSB3ZSBkb24ndCBuZWVkIHRvIHJlLXBhcnNlIGV2ZXJ5dGhpbmcgd2hpY2ggcmlza3MgbG9zaW5nIGltcG9ydGFudCByb3RhdGlvbmFsIGluZm9ybWF0aW9uIChsaWtlIHJvdGF0aW9uWDoxODAgcGx1cyByb3RhdGlvblk6MTgwIHdvdWxkIGxvb2sgdGhlIHNhbWUgYXMgcm90YXRpb246MTgwIC0gdGhlcmUncyBubyB3YXkgdG8ga25vdyBmb3Igc3VyZSB3aGljaCBkaXJlY3Rpb24gd2FzIHRha2VuIGJhc2VkIHNvbGVseSBvbiB0aGUgbWF0cml4M2QoKSB2YWx1ZXMpXG5cdFx0XHRcdFx0XHR2YXIgYTExID0gbVswXSwgYTIxID0gbVsxXSwgYTMxID0gbVsyXSwgYTQxID0gbVszXSxcblx0XHRcdFx0XHRcdFx0YTEyID0gbVs0XSwgYTIyID0gbVs1XSwgYTMyID0gbVs2XSwgYTQyID0gbVs3XSxcblx0XHRcdFx0XHRcdFx0YTEzID0gbVs4XSwgYTIzID0gbVs5XSwgYTMzID0gbVsxMF0sXG5cdFx0XHRcdFx0XHRcdGExNCA9IG1bMTJdLCBhMjQgPSBtWzEzXSwgYTM0ID0gbVsxNF0sXG5cdFx0XHRcdFx0XHRcdGE0MyA9IG1bMTFdLFxuXHRcdFx0XHRcdFx0XHRhbmdsZSA9IE1hdGguYXRhbjIoYTMyLCBhMzMpLFxuXHRcdFx0XHRcdFx0XHR0MSwgdDIsIHQzLCB0NCwgY29zLCBzaW47XG5cblx0XHRcdFx0XHRcdC8vd2UgbWFudWFsbHkgY29tcGVuc2F0ZSBmb3Igbm9uLXplcm8geiBjb21wb25lbnQgb2YgdHJhbnNmb3JtT3JpZ2luIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gU2FmYXJpXG5cdFx0XHRcdFx0XHRpZiAodG0uek9yaWdpbikge1xuXHRcdFx0XHRcdFx0XHRhMzQgPSAtdG0uek9yaWdpbjtcblx0XHRcdFx0XHRcdFx0YTE0ID0gYTEzKmEzNC1tWzEyXTtcblx0XHRcdFx0XHRcdFx0YTI0ID0gYTIzKmEzNC1tWzEzXTtcblx0XHRcdFx0XHRcdFx0YTM0ID0gYTMzKmEzNCt0bS56T3JpZ2luLW1bMTRdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dG0ucm90YXRpb25YID0gYW5nbGUgKiBfUkFEMkRFRztcblx0XHRcdFx0XHRcdC8vcm90YXRpb25YXG5cdFx0XHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRcdFx0Y29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcblx0XHRcdFx0XHRcdFx0c2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcblx0XHRcdFx0XHRcdFx0dDEgPSBhMTIqY29zK2ExMypzaW47XG5cdFx0XHRcdFx0XHRcdHQyID0gYTIyKmNvcythMjMqc2luO1xuXHRcdFx0XHRcdFx0XHR0MyA9IGEzMipjb3MrYTMzKnNpbjtcblx0XHRcdFx0XHRcdFx0YTEzID0gYTEyKi1zaW4rYTEzKmNvcztcblx0XHRcdFx0XHRcdFx0YTIzID0gYTIyKi1zaW4rYTIzKmNvcztcblx0XHRcdFx0XHRcdFx0YTMzID0gYTMyKi1zaW4rYTMzKmNvcztcblx0XHRcdFx0XHRcdFx0YTQzID0gYTQyKi1zaW4rYTQzKmNvcztcblx0XHRcdFx0XHRcdFx0YTEyID0gdDE7XG5cdFx0XHRcdFx0XHRcdGEyMiA9IHQyO1xuXHRcdFx0XHRcdFx0XHRhMzIgPSB0Mztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vcm90YXRpb25ZXG5cdFx0XHRcdFx0XHRhbmdsZSA9IE1hdGguYXRhbjIoLWEzMSwgYTMzKTtcblx0XHRcdFx0XHRcdHRtLnJvdGF0aW9uWSA9IGFuZ2xlICogX1JBRDJERUc7XG5cdFx0XHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRcdFx0Y29zID0gTWF0aC5jb3MoLWFuZ2xlKTtcblx0XHRcdFx0XHRcdFx0c2luID0gTWF0aC5zaW4oLWFuZ2xlKTtcblx0XHRcdFx0XHRcdFx0dDEgPSBhMTEqY29zLWExMypzaW47XG5cdFx0XHRcdFx0XHRcdHQyID0gYTIxKmNvcy1hMjMqc2luO1xuXHRcdFx0XHRcdFx0XHR0MyA9IGEzMSpjb3MtYTMzKnNpbjtcblx0XHRcdFx0XHRcdFx0YTIzID0gYTIxKnNpbithMjMqY29zO1xuXHRcdFx0XHRcdFx0XHRhMzMgPSBhMzEqc2luK2EzMypjb3M7XG5cdFx0XHRcdFx0XHRcdGE0MyA9IGE0MSpzaW4rYTQzKmNvcztcblx0XHRcdFx0XHRcdFx0YTExID0gdDE7XG5cdFx0XHRcdFx0XHRcdGEyMSA9IHQyO1xuXHRcdFx0XHRcdFx0XHRhMzEgPSB0Mztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vcm90YXRpb25aXG5cdFx0XHRcdFx0XHRhbmdsZSA9IE1hdGguYXRhbjIoYTIxLCBhMTEpO1xuXHRcdFx0XHRcdFx0dG0ucm90YXRpb24gPSBhbmdsZSAqIF9SQUQyREVHO1xuXHRcdFx0XHRcdFx0aWYgKGFuZ2xlKSB7XG5cdFx0XHRcdFx0XHRcdGNvcyA9IE1hdGguY29zKC1hbmdsZSk7XG5cdFx0XHRcdFx0XHRcdHNpbiA9IE1hdGguc2luKC1hbmdsZSk7XG5cdFx0XHRcdFx0XHRcdGExMSA9IGExMSpjb3MrYTEyKnNpbjtcblx0XHRcdFx0XHRcdFx0dDIgPSBhMjEqY29zK2EyMipzaW47XG5cdFx0XHRcdFx0XHRcdGEyMiA9IGEyMSotc2luK2EyMipjb3M7XG5cdFx0XHRcdFx0XHRcdGEzMiA9IGEzMSotc2luK2EzMipjb3M7XG5cdFx0XHRcdFx0XHRcdGEyMSA9IHQyO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAodG0ucm90YXRpb25YICYmIE1hdGguYWJzKHRtLnJvdGF0aW9uWCkgKyBNYXRoLmFicyh0bS5yb3RhdGlvbikgPiAzNTkuOSkgeyAvL3doZW4gcm90YXRpb25ZIGlzIHNldCwgaXQgd2lsbCBvZnRlbiBiZSBwYXJzZWQgYXMgMTgwIGRlZ3JlZXMgZGlmZmVyZW50IHRoYW4gaXQgc2hvdWxkIGJlLCBhbmQgcm90YXRpb25YIGFuZCByb3RhdGlvbiBib3RoIGJlaW5nIDE4MCAoaXQgbG9va3MgdGhlIHNhbWUpLCBzbyB3ZSBhZGp1c3QgZm9yIHRoYXQgaGVyZS5cblx0XHRcdFx0XHRcdFx0dG0ucm90YXRpb25YID0gdG0ucm90YXRpb24gPSAwO1xuXHRcdFx0XHRcdFx0XHR0bS5yb3RhdGlvblkgPSAxODAgLSB0bS5yb3RhdGlvblk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRtLnNjYWxlWCA9ICgoTWF0aC5zcXJ0KGExMSAqIGExMSArIGEyMSAqIGEyMSkgKiBybmQgKyAwLjUpIHwgMCkgLyBybmQ7XG5cdFx0XHRcdFx0XHR0bS5zY2FsZVkgPSAoKE1hdGguc3FydChhMjIgKiBhMjIgKyBhMjMgKiBhMjMpICogcm5kICsgMC41KSB8IDApIC8gcm5kO1xuXHRcdFx0XHRcdFx0dG0uc2NhbGVaID0gKChNYXRoLnNxcnQoYTMyICogYTMyICsgYTMzICogYTMzKSAqIHJuZCArIDAuNSkgfCAwKSAvIHJuZDtcblx0XHRcdFx0XHRcdHRtLnNrZXdYID0gMDtcblx0XHRcdFx0XHRcdHRtLnBlcnNwZWN0aXZlID0gYTQzID8gMSAvICgoYTQzIDwgMCkgPyAtYTQzIDogYTQzKSA6IDA7XG5cdFx0XHRcdFx0XHR0bS54ID0gYTE0O1xuXHRcdFx0XHRcdFx0dG0ueSA9IGEyNDtcblx0XHRcdFx0XHRcdHRtLnogPSBhMzQ7XG5cdFx0XHRcdFx0XHRpZiAodG0uc3ZnKSB7XG5cdFx0XHRcdFx0XHRcdHRtLnggLT0gdG0ueE9yaWdpbiAtICh0bS54T3JpZ2luICogYTExIC0gdG0ueU9yaWdpbiAqIGExMik7XG5cdFx0XHRcdFx0XHRcdHRtLnkgLT0gdG0ueU9yaWdpbiAtICh0bS55T3JpZ2luICogYTIxIC0gdG0ueE9yaWdpbiAqIGEyMik7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKCghX3N1cHBvcnRzM0QgfHwgcGFyc2UgfHwgIW0ubGVuZ3RoIHx8IHRtLnggIT09IG1bNF0gfHwgdG0ueSAhPT0gbVs1XSB8fCAoIXRtLnJvdGF0aW9uWCAmJiAhdG0ucm90YXRpb25ZKSkgJiYgISh0bS54ICE9PSB1bmRlZmluZWQgJiYgX2dldFN0eWxlKHQsIFwiZGlzcGxheVwiLCBjcykgPT09IFwibm9uZVwiKSkgeyAvL3NvbWV0aW1lcyBhIDYtZWxlbWVudCBtYXRyaXggaXMgcmV0dXJuZWQgZXZlbiB3aGVuIHdlIHBlcmZvcm1lZCAzRCB0cmFuc2Zvcm1zLCBsaWtlIGlmIHJvdGF0aW9uWCBhbmQgcm90YXRpb25ZIGFyZSAxODAuIEluIGNhc2VzIGxpa2UgdGhpcywgd2Ugc3RpbGwgbmVlZCB0byBob25vciB0aGUgM0QgdHJhbnNmb3Jtcy4gSWYgd2UganVzdCByZWx5IG9uIHRoZSAyRCBpbmZvLCBpdCBjb3VsZCBhZmZlY3QgaG93IHRoZSBkYXRhIGlzIGludGVycHJldGVkLCBsaWtlIHNjYWxlWSBtaWdodCBnZXQgc2V0IHRvIC0xIG9yIHJvdGF0aW9uIGNvdWxkIGdldCBvZmZzZXQgYnkgMTgwIGRlZ3JlZXMuIEZvciBleGFtcGxlLCBkbyBhIFR3ZWVuTGl0ZS50byhlbGVtZW50LCAxLCB7Y3NzOntyb3RhdGlvblg6MTgwLCByb3RhdGlvblk6MTgwfX0pIGFuZCB0aGVuIGxhdGVyLCBUd2VlbkxpdGUudG8oZWxlbWVudCwgMSwge2Nzczp7cm90YXRpb25YOjB9fSkgYW5kIHdpdGhvdXQgdGhpcyBjb25kaXRpb25hbCBsb2dpYyBpbiBwbGFjZSwgaXQnZCBqdW1wIHRvIGEgc3RhdGUgb2YgYmVpbmcgdW5yb3RhdGVkIHdoZW4gdGhlIDJuZCB0d2VlbiBzdGFydHMuIFRoZW4gYWdhaW4sIHdlIG5lZWQgdG8gaG9ub3IgdGhlIGZhY3QgdGhhdCB0aGUgdXNlciBDT1VMRCBhbHRlciB0aGUgdHJhbnNmb3JtcyBvdXRzaWRlIG9mIENTU1BsdWdpbiwgbGlrZSBieSBtYW51YWxseSBhcHBseWluZyBuZXcgY3NzLCBzbyB3ZSB0cnkgdG8gc2Vuc2UgdGhhdCBieSBsb29raW5nIGF0IHggYW5kIHkgYmVjYXVzZSBpZiB0aG9zZSBjaGFuZ2VkLCB3ZSBrbm93IHRoZSBjaGFuZ2VzIHdlcmUgbWFkZSBvdXRzaWRlIENTU1BsdWdpbiBhbmQgd2UgZm9yY2UgYSByZWludGVycHJldGF0aW9uIG9mIHRoZSBtYXRyaXggdmFsdWVzLiBBbHNvLCBpbiBXZWJraXQgYnJvd3NlcnMsIGlmIHRoZSBlbGVtZW50J3MgXCJkaXNwbGF5XCIgaXMgXCJub25lXCIsIGl0cyBjYWxjdWxhdGVkIHN0eWxlIHZhbHVlIHdpbGwgYWx3YXlzIHJldHVybiBlbXB0eSwgc28gaWYgd2UndmUgYWxyZWFkeSByZWNvcmRlZCB0aGUgdmFsdWVzIGluIHRoZSBfZ3NUcmFuc2Zvcm0gb2JqZWN0LCB3ZSdsbCBqdXN0IHJlbHkgb24gdGhvc2UuXG5cdFx0XHRcdFx0XHR2YXIgayA9IChtLmxlbmd0aCA+PSA2KSxcblx0XHRcdFx0XHRcdFx0YSA9IGsgPyBtWzBdIDogMSxcblx0XHRcdFx0XHRcdFx0YiA9IG1bMV0gfHwgMCxcblx0XHRcdFx0XHRcdFx0YyA9IG1bMl0gfHwgMCxcblx0XHRcdFx0XHRcdFx0ZCA9IGsgPyBtWzNdIDogMTtcblx0XHRcdFx0XHRcdHRtLnggPSBtWzRdIHx8IDA7XG5cdFx0XHRcdFx0XHR0bS55ID0gbVs1XSB8fCAwO1xuXHRcdFx0XHRcdFx0c2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpO1xuXHRcdFx0XHRcdFx0c2NhbGVZID0gTWF0aC5zcXJ0KGQgKiBkICsgYyAqIGMpO1xuXHRcdFx0XHRcdFx0cm90YXRpb24gPSAoYSB8fCBiKSA/IE1hdGguYXRhbjIoYiwgYSkgKiBfUkFEMkRFRyA6IHRtLnJvdGF0aW9uIHx8IDA7IC8vbm90ZTogaWYgc2NhbGVYIGlzIDAsIHdlIGNhbm5vdCBhY2N1cmF0ZWx5IG1lYXN1cmUgcm90YXRpb24uIFNhbWUgZm9yIHNrZXdYIHdpdGggYSBzY2FsZVkgb2YgMC4gVGhlcmVmb3JlLCB3ZSBkZWZhdWx0IHRvIHRoZSBwcmV2aW91c2x5IHJlY29yZGVkIHZhbHVlIChvciB6ZXJvIGlmIHRoYXQgZG9lc24ndCBleGlzdCkuXG5cdFx0XHRcdFx0XHRza2V3WCA9IChjIHx8IGQpID8gTWF0aC5hdGFuMihjLCBkKSAqIF9SQUQyREVHICsgcm90YXRpb24gOiB0bS5za2V3WCB8fCAwO1xuXHRcdFx0XHRcdFx0aWYgKE1hdGguYWJzKHNrZXdYKSA+IDkwICYmIE1hdGguYWJzKHNrZXdYKSA8IDI3MCkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaW52WCkge1xuXHRcdFx0XHRcdFx0XHRcdHNjYWxlWCAqPSAtMTtcblx0XHRcdFx0XHRcdFx0XHRza2V3WCArPSAocm90YXRpb24gPD0gMCkgPyAxODAgOiAtMTgwO1xuXHRcdFx0XHRcdFx0XHRcdHJvdGF0aW9uICs9IChyb3RhdGlvbiA8PSAwKSA/IDE4MCA6IC0xODA7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0c2NhbGVZICo9IC0xO1xuXHRcdFx0XHRcdFx0XHRcdHNrZXdYICs9IChza2V3WCA8PSAwKSA/IDE4MCA6IC0xODA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRtLnNjYWxlWCA9IHNjYWxlWDtcblx0XHRcdFx0XHRcdHRtLnNjYWxlWSA9IHNjYWxlWTtcblx0XHRcdFx0XHRcdHRtLnJvdGF0aW9uID0gcm90YXRpb247XG5cdFx0XHRcdFx0XHR0bS5za2V3WCA9IHNrZXdYO1xuXHRcdFx0XHRcdFx0aWYgKF9zdXBwb3J0czNEKSB7XG5cdFx0XHRcdFx0XHRcdHRtLnJvdGF0aW9uWCA9IHRtLnJvdGF0aW9uWSA9IHRtLnogPSAwO1xuXHRcdFx0XHRcdFx0XHR0bS5wZXJzcGVjdGl2ZSA9IGRlZmF1bHRUcmFuc2Zvcm1QZXJzcGVjdGl2ZTtcblx0XHRcdFx0XHRcdFx0dG0uc2NhbGVaID0gMTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICh0bS5zdmcpIHtcblx0XHRcdFx0XHRcdFx0dG0ueCAtPSB0bS54T3JpZ2luIC0gKHRtLnhPcmlnaW4gKiBhICsgdG0ueU9yaWdpbiAqIGMpO1xuXHRcdFx0XHRcdFx0XHR0bS55IC09IHRtLnlPcmlnaW4gLSAodG0ueE9yaWdpbiAqIGIgKyB0bS55T3JpZ2luICogZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRtLnpPcmlnaW4gPSB6T3JpZ2luO1xuXHRcdFx0XHRcdC8vc29tZSBicm93c2VycyBoYXZlIGEgaGFyZCB0aW1lIHdpdGggdmVyeSBzbWFsbCB2YWx1ZXMgbGlrZSAyLjQ0OTI5MzU5ODI5NDcwNjRlLTE2IChub3RpY2UgdGhlIFwiZS1cIiB0b3dhcmRzIHRoZSBlbmQpIGFuZCB3b3VsZCByZW5kZXIgdGhlIG9iamVjdCBzbGlnaHRseSBvZmYuIFNvIHdlIHJvdW5kIHRvIDAgaW4gdGhlc2UgY2FzZXMuIFRoZSBjb25kaXRpb25hbCBsb2dpYyBoZXJlIGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgTWF0aC5hYnMoKS4gQWxzbywgYnJvd3NlcnMgdGVuZCB0byByZW5kZXIgYSBTTElHSFRMWSByb3RhdGVkIG9iamVjdCBpbiBhIGZ1enp5IHdheSwgc28gd2UgbmVlZCB0byBzbmFwIHRvIGV4YWN0bHkgMCB3aGVuIGFwcHJvcHJpYXRlLlxuXHRcdFx0XHRcdGZvciAoaSBpbiB0bSkge1xuXHRcdFx0XHRcdFx0aWYgKHRtW2ldIDwgbWluKSBpZiAodG1baV0gPiAtbWluKSB7XG5cdFx0XHRcdFx0XHRcdHRtW2ldID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9ERUJVRzogX2xvZyhcInBhcnNlZCByb3RhdGlvbiBvZiBcIiArIHQuZ2V0QXR0cmlidXRlKFwiaWRcIikrXCI6IFwiKyh0bS5yb3RhdGlvblgpK1wiLCBcIisodG0ucm90YXRpb25ZKStcIiwgXCIrKHRtLnJvdGF0aW9uKStcIiwgc2NhbGU6IFwiK3RtLnNjYWxlWCtcIiwgXCIrdG0uc2NhbGVZK1wiLCBcIit0bS5zY2FsZVorXCIsIHBvc2l0aW9uOiBcIit0bS54K1wiLCBcIit0bS55K1wiLCBcIit0bS56K1wiLCBwZXJzcGVjdGl2ZTogXCIrdG0ucGVyc3BlY3RpdmUrIFwiLCBvcmlnaW46IFwiKyB0bS54T3JpZ2luKyBcIixcIisgdG0ueU9yaWdpbik7XG5cdFx0XHRcdGlmIChyZWMpIHtcblx0XHRcdFx0XHR0Ll9nc1RyYW5zZm9ybSA9IHRtOyAvL3JlY29yZCB0byB0aGUgb2JqZWN0J3MgX2dzVHJhbnNmb3JtIHdoaWNoIHdlIHVzZSBzbyB0aGF0IHR3ZWVucyBjYW4gY29udHJvbCBpbmRpdmlkdWFsIHByb3BlcnRpZXMgaW5kZXBlbmRlbnRseSAod2UgbmVlZCBhbGwgdGhlIHByb3BlcnRpZXMgdG8gYWNjdXJhdGVseSByZWNvbXBvc2UgdGhlIG1hdHJpeCBpbiB0aGUgc2V0UmF0aW8oKSBtZXRob2QpXG5cdFx0XHRcdFx0aWYgKHRtLnN2ZykgeyAvL2lmIHdlJ3JlIHN1cHBvc2VkIHRvIGFwcGx5IHRyYW5zZm9ybXMgdG8gdGhlIFNWRyBlbGVtZW50J3MgXCJ0cmFuc2Zvcm1cIiBhdHRyaWJ1dGUsIG1ha2Ugc3VyZSB0aGVyZSBhcmVuJ3QgYW55IENTUyB0cmFuc2Zvcm1zIGFwcGxpZWQgb3IgdGhleSdsbCBvdmVycmlkZSB0aGUgYXR0cmlidXRlIG9uZXMuIEFsc28gY2xlYXIgdGhlIHRyYW5zZm9ybSBhdHRyaWJ1dGUgaWYgd2UncmUgdXNpbmcgQ1NTLCBqdXN0IHRvIGJlIGNsZWFuLlxuXHRcdFx0XHRcdFx0aWYgKF91c2VTVkdUcmFuc2Zvcm1BdHRyICYmIHQuc3R5bGVbX3RyYW5zZm9ybVByb3BdKSB7XG5cdFx0XHRcdFx0XHRcdFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCgwLjAwMSwgZnVuY3Rpb24oKXsgLy9pZiB3ZSBhcHBseSB0aGlzIHJpZ2h0IGF3YXkgKGJlZm9yZSBhbnl0aGluZyBoYXMgcmVuZGVyZWQpLCB3ZSByaXNrIHRoZXJlIGJlaW5nIG5vIHRyYW5zZm9ybXMgZm9yIGEgYnJpZWYgbW9tZW50IGFuZCBpdCBhbHNvIGludGVyZmVyZXMgd2l0aCBhZGp1c3RpbmcgdGhlIHRyYW5zZm9ybU9yaWdpbiBpbiBhIHR3ZWVuIHdpdGggaW1tZWRpYXRlUmVuZGVyOnRydWUgKGl0J2QgdHJ5IHJlYWRpbmcgdGhlIG1hdHJpeCBhbmQgaXQgd291bGRuJ3QgaGF2ZSB0aGUgYXBwcm9wcmlhdGUgZGF0YSBpbiBwbGFjZSBiZWNhdXNlIHdlIGp1c3QgcmVtb3ZlZCBpdCkuXG5cdFx0XHRcdFx0XHRcdFx0X3JlbW92ZVByb3AodC5zdHlsZSwgX3RyYW5zZm9ybVByb3ApO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIV91c2VTVkdUcmFuc2Zvcm1BdHRyICYmIHQuZ2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIpKSB7XG5cdFx0XHRcdFx0XHRcdFR3ZWVuTGl0ZS5kZWxheWVkQ2FsbCgwLjAwMSwgZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0XHR0LnJlbW92ZUF0dHJpYnV0ZShcInRyYW5zZm9ybVwiKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0bTtcblx0XHRcdH0sXG5cblx0XHRcdC8vZm9yIHNldHRpbmcgMkQgdHJhbnNmb3JtcyBpbiBJRTYsIElFNywgYW5kIElFOCAobXVzdCB1c2UgYSBcImZpbHRlclwiIHRvIGVtdWxhdGUgdGhlIGJlaGF2aW9yIG9mIG1vZGVybiBkYXkgYnJvd3NlciB0cmFuc2Zvcm1zKVxuXHRcdFx0X3NldElFVHJhbnNmb3JtUmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHZhciB0ID0gdGhpcy5kYXRhLCAvL3JlZmVycyB0byB0aGUgZWxlbWVudCdzIF9nc1RyYW5zZm9ybSBvYmplY3Rcblx0XHRcdFx0XHRhbmcgPSAtdC5yb3RhdGlvbiAqIF9ERUcyUkFELFxuXHRcdFx0XHRcdHNrZXcgPSBhbmcgKyB0LnNrZXdYICogX0RFRzJSQUQsXG5cdFx0XHRcdFx0cm5kID0gMTAwMDAwLFxuXHRcdFx0XHRcdGEgPSAoKE1hdGguY29zKGFuZykgKiB0LnNjYWxlWCAqIHJuZCkgfCAwKSAvIHJuZCxcblx0XHRcdFx0XHRiID0gKChNYXRoLnNpbihhbmcpICogdC5zY2FsZVggKiBybmQpIHwgMCkgLyBybmQsXG5cdFx0XHRcdFx0YyA9ICgoTWF0aC5zaW4oc2tldykgKiAtdC5zY2FsZVkgKiBybmQpIHwgMCkgLyBybmQsXG5cdFx0XHRcdFx0ZCA9ICgoTWF0aC5jb3Moc2tldykgKiB0LnNjYWxlWSAqIHJuZCkgfCAwKSAvIHJuZCxcblx0XHRcdFx0XHRzdHlsZSA9IHRoaXMudC5zdHlsZSxcblx0XHRcdFx0XHRjcyA9IHRoaXMudC5jdXJyZW50U3R5bGUsXG5cdFx0XHRcdFx0ZmlsdGVycywgdmFsO1xuXHRcdFx0XHRpZiAoIWNzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhbCA9IGI7IC8vanVzdCBmb3Igc3dhcHBpbmcgdGhlIHZhcmlhYmxlcyBhbiBpbnZlcnRpbmcgdGhlbSAocmV1c2VkIFwidmFsXCIgdG8gYXZvaWQgY3JlYXRpbmcgYW5vdGhlciB2YXJpYWJsZSBpbiBtZW1vcnkpLiBJRSdzIGZpbHRlciBtYXRyaXggdXNlcyBhIG5vbi1zdGFuZGFyZCBtYXRyaXggY29uZmlndXJhdGlvbiAoYW5nbGUgZ29lcyB0aGUgb3Bwb3NpdGUgd2F5LCBhbmQgYiBhbmQgYyBhcmUgcmV2ZXJzZWQgYW5kIGludmVydGVkKVxuXHRcdFx0XHRiID0gLWM7XG5cdFx0XHRcdGMgPSAtdmFsO1xuXHRcdFx0XHRmaWx0ZXJzID0gY3MuZmlsdGVyO1xuXHRcdFx0XHRzdHlsZS5maWx0ZXIgPSBcIlwiOyAvL3JlbW92ZSBmaWx0ZXJzIHNvIHRoYXQgd2UgY2FuIGFjY3VyYXRlbHkgbWVhc3VyZSBvZmZzZXRXaWR0aC9vZmZzZXRIZWlnaHRcblx0XHRcdFx0dmFyIHcgPSB0aGlzLnQub2Zmc2V0V2lkdGgsXG5cdFx0XHRcdFx0aCA9IHRoaXMudC5vZmZzZXRIZWlnaHQsXG5cdFx0XHRcdFx0Y2xpcCA9IChjcy5wb3NpdGlvbiAhPT0gXCJhYnNvbHV0ZVwiKSxcblx0XHRcdFx0XHRtID0gXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuTWF0cml4KE0xMT1cIiArIGEgKyBcIiwgTTEyPVwiICsgYiArIFwiLCBNMjE9XCIgKyBjICsgXCIsIE0yMj1cIiArIGQsXG5cdFx0XHRcdFx0b3ggPSB0LnggKyAodyAqIHQueFBlcmNlbnQgLyAxMDApLFxuXHRcdFx0XHRcdG95ID0gdC55ICsgKGggKiB0LnlQZXJjZW50IC8gMTAwKSxcblx0XHRcdFx0XHRkeCwgZHk7XG5cblx0XHRcdFx0Ly9pZiB0cmFuc2Zvcm1PcmlnaW4gaXMgYmVpbmcgdXNlZCwgYWRqdXN0IHRoZSBvZmZzZXQgeCBhbmQgeVxuXHRcdFx0XHRpZiAodC5veCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0ZHggPSAoKHQub3hwKSA/IHcgKiB0Lm94ICogMC4wMSA6IHQub3gpIC0gdyAvIDI7XG5cdFx0XHRcdFx0ZHkgPSAoKHQub3lwKSA/IGggKiB0Lm95ICogMC4wMSA6IHQub3kpIC0gaCAvIDI7XG5cdFx0XHRcdFx0b3ggKz0gZHggLSAoZHggKiBhICsgZHkgKiBiKTtcblx0XHRcdFx0XHRveSArPSBkeSAtIChkeCAqIGMgKyBkeSAqIGQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFjbGlwKSB7XG5cdFx0XHRcdFx0bSArPSBcIiwgc2l6aW5nTWV0aG9kPSdhdXRvIGV4cGFuZCcpXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZHggPSAodyAvIDIpO1xuXHRcdFx0XHRcdGR5ID0gKGggLyAyKTtcblx0XHRcdFx0XHQvL3RyYW5zbGF0ZSB0byBlbnN1cmUgdGhhdCB0cmFuc2Zvcm1hdGlvbnMgb2NjdXIgYXJvdW5kIHRoZSBjb3JyZWN0IG9yaWdpbiAoZGVmYXVsdCBpcyBjZW50ZXIpLlxuXHRcdFx0XHRcdG0gKz0gXCIsIER4PVwiICsgKGR4IC0gKGR4ICogYSArIGR5ICogYikgKyBveCkgKyBcIiwgRHk9XCIgKyAoZHkgLSAoZHggKiBjICsgZHkgKiBkKSArIG95KSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmaWx0ZXJzLmluZGV4T2YoXCJEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5NYXRyaXgoXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdHN0eWxlLmZpbHRlciA9IGZpbHRlcnMucmVwbGFjZShfaWVTZXRNYXRyaXhFeHAsIG0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHN0eWxlLmZpbHRlciA9IG0gKyBcIiBcIiArIGZpbHRlcnM7IC8vd2UgbXVzdCBhbHdheXMgcHV0IHRoZSB0cmFuc2Zvcm0vbWF0cml4IEZJUlNUIChiZWZvcmUgYWxwaGEob3BhY2l0eT14eCkpIHRvIGF2b2lkIGFuIElFIGJ1ZyB0aGF0IHNsaWNlcyBwYXJ0IG9mIHRoZSBvYmplY3Qgd2hlbiByb3RhdGlvbiBpcyBhcHBsaWVkIHdpdGggYWxwaGEuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL2F0IHRoZSBlbmQgb3IgYmVnaW5uaW5nIG9mIHRoZSB0d2VlbiwgaWYgdGhlIG1hdHJpeCBpcyBub3JtYWwgKDEsIDAsIDAsIDEpIGFuZCBvcGFjaXR5IGlzIDEwMCAob3IgZG9lc24ndCBleGlzdCksIHJlbW92ZSB0aGUgZmlsdGVyIHRvIGltcHJvdmUgYnJvd3NlciBwZXJmb3JtYW5jZS5cblx0XHRcdFx0aWYgKHYgPT09IDAgfHwgdiA9PT0gMSkgaWYgKGEgPT09IDEpIGlmIChiID09PSAwKSBpZiAoYyA9PT0gMCkgaWYgKGQgPT09IDEpIGlmICghY2xpcCB8fCBtLmluZGV4T2YoXCJEeD0wLCBEeT0wXCIpICE9PSAtMSkgaWYgKCFfb3BhY2l0eUV4cC50ZXN0KGZpbHRlcnMpIHx8IHBhcnNlRmxvYXQoUmVnRXhwLiQxKSA9PT0gMTAwKSBpZiAoZmlsdGVycy5pbmRleE9mKFwiZ3JhZGllbnQoXCIgJiYgZmlsdGVycy5pbmRleE9mKFwiQWxwaGFcIikpID09PSAtMSkge1xuXHRcdFx0XHRcdHN0eWxlLnJlbW92ZUF0dHJpYnV0ZShcImZpbHRlclwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vd2UgbXVzdCBzZXQgdGhlIG1hcmdpbnMgQUZURVIgYXBwbHlpbmcgdGhlIGZpbHRlciBpbiBvcmRlciB0byBhdm9pZCBzb21lIGJ1Z3MgaW4gSUU4IHRoYXQgY291bGQgKGluIHJhcmUgc2NlbmFyaW9zKSBjYXVzZSB0aGVtIHRvIGJlIGlnbm9yZWQgaW50ZXJtaXR0ZW50bHkgKHZpYnJhdGlvbikuXG5cdFx0XHRcdGlmICghY2xpcCkge1xuXHRcdFx0XHRcdHZhciBtdWx0ID0gKF9pZVZlcnMgPCA4KSA/IDEgOiAtMSwgLy9pbiBJbnRlcm5ldCBFeHBsb3JlciA3IGFuZCBiZWZvcmUsIHRoZSBib3ggbW9kZWwgaXMgYnJva2VuLCBjYXVzaW5nIHRoZSBicm93c2VyIHRvIHRyZWF0IHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIGFjdHVhbCByb3RhdGVkIGZpbHRlcmVkIGltYWdlIGFzIHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIGJveCBpdHNlbGYsIGJ1dCBNaWNyb3NvZnQgY29ycmVjdGVkIHRoYXQgaW4gSUU4LiBXZSBtdXN0IHVzZSBhIG5lZ2F0aXZlIG9mZnNldCBpbiBJRTggb24gdGhlIHJpZ2h0L2JvdHRvbVxuXHRcdFx0XHRcdFx0bWFyZywgcHJvcCwgZGlmO1xuXHRcdFx0XHRcdGR4ID0gdC5pZU9mZnNldFggfHwgMDtcblx0XHRcdFx0XHRkeSA9IHQuaWVPZmZzZXRZIHx8IDA7XG5cdFx0XHRcdFx0dC5pZU9mZnNldFggPSBNYXRoLnJvdW5kKCh3IC0gKChhIDwgMCA/IC1hIDogYSkgKiB3ICsgKGIgPCAwID8gLWIgOiBiKSAqIGgpKSAvIDIgKyBveCk7XG5cdFx0XHRcdFx0dC5pZU9mZnNldFkgPSBNYXRoLnJvdW5kKChoIC0gKChkIDwgMCA/IC1kIDogZCkgKiBoICsgKGMgPCAwID8gLWMgOiBjKSAqIHcpKSAvIDIgKyBveSk7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdFx0XHRcdFx0cHJvcCA9IF9tYXJnaW5zW2ldO1xuXHRcdFx0XHRcdFx0bWFyZyA9IGNzW3Byb3BdO1xuXHRcdFx0XHRcdFx0Ly93ZSBuZWVkIHRvIGdldCB0aGUgY3VycmVudCBtYXJnaW4gaW4gY2FzZSBpdCBpcyBiZWluZyB0d2VlbmVkIHNlcGFyYXRlbHkgKHdlIHdhbnQgdG8gcmVzcGVjdCB0aGF0IHR3ZWVuJ3MgY2hhbmdlcylcblx0XHRcdFx0XHRcdHZhbCA9IChtYXJnLmluZGV4T2YoXCJweFwiKSAhPT0gLTEpID8gcGFyc2VGbG9hdChtYXJnKSA6IF9jb252ZXJ0VG9QaXhlbHModGhpcy50LCBwcm9wLCBwYXJzZUZsb2F0KG1hcmcpLCBtYXJnLnJlcGxhY2UoX3N1ZmZpeEV4cCwgXCJcIikpIHx8IDA7XG5cdFx0XHRcdFx0XHRpZiAodmFsICE9PSB0W3Byb3BdKSB7XG5cdFx0XHRcdFx0XHRcdGRpZiA9IChpIDwgMikgPyAtdC5pZU9mZnNldFggOiAtdC5pZU9mZnNldFk7IC8vaWYgYW5vdGhlciB0d2VlbiBpcyBjb250cm9sbGluZyBhIG1hcmdpbiwgd2UgY2Fubm90IG9ubHkgYXBwbHkgdGhlIGRpZmZlcmVuY2UgaW4gdGhlIGllT2Zmc2V0cywgc28gd2UgZXNzZW50aWFsbHkgemVyby1vdXQgdGhlIGR4IGFuZCBkeSBoZXJlIGluIHRoYXQgY2FzZS4gV2UgcmVjb3JkIHRoZSBtYXJnaW4ocykgbGF0ZXIgc28gdGhhdCB3ZSBjYW4ga2VlcCBjb21wYXJpbmcgdGhlbSwgbWFraW5nIHRoaXMgY29kZSB2ZXJ5IGZsZXhpYmxlLlxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZGlmID0gKGkgPCAyKSA/IGR4IC0gdC5pZU9mZnNldFggOiBkeSAtIHQuaWVPZmZzZXRZO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c3R5bGVbcHJvcF0gPSAodFtwcm9wXSA9IE1hdGgucm91bmQoIHZhbCAtIGRpZiAqICgoaSA9PT0gMCB8fCBpID09PSAyKSA/IDEgOiBtdWx0KSApKSArIFwicHhcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qIHRyYW5zbGF0ZXMgYSBzdXBlciBzbWFsbCBkZWNpbWFsIHRvIGEgc3RyaW5nIFdJVEhPVVQgc2NpZW50aWZpYyBub3RhdGlvblxuXHRcdFx0X3NhZmVEZWNpbWFsID0gZnVuY3Rpb24obikge1xuXHRcdFx0XHR2YXIgcyA9IChuIDwgMCA/IC1uIDogbikgKyBcIlwiLFxuXHRcdFx0XHRcdGEgPSBzLnNwbGl0KFwiZS1cIik7XG5cdFx0XHRcdHJldHVybiAobiA8IDAgPyBcIi0wLlwiIDogXCIwLlwiKSArIG5ldyBBcnJheShwYXJzZUludChhWzFdLCAxMCkgfHwgMCkuam9pbihcIjBcIikgKyBhWzBdLnNwbGl0KFwiLlwiKS5qb2luKFwiXCIpO1xuXHRcdFx0fSxcblx0XHRcdCovXG5cblx0XHRcdF9zZXRUcmFuc2Zvcm1SYXRpbyA9IF9pbnRlcm5hbHMuc2V0M0RUcmFuc2Zvcm1SYXRpbyA9IF9pbnRlcm5hbHMuc2V0VHJhbnNmb3JtUmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHZhciB0ID0gdGhpcy5kYXRhLCAvL3JlZmVycyB0byB0aGUgZWxlbWVudCdzIF9nc1RyYW5zZm9ybSBvYmplY3Rcblx0XHRcdFx0XHRzdHlsZSA9IHRoaXMudC5zdHlsZSxcblx0XHRcdFx0XHRhbmdsZSA9IHQucm90YXRpb24sXG5cdFx0XHRcdFx0cm90YXRpb25YID0gdC5yb3RhdGlvblgsXG5cdFx0XHRcdFx0cm90YXRpb25ZID0gdC5yb3RhdGlvblksXG5cdFx0XHRcdFx0c3ggPSB0LnNjYWxlWCxcblx0XHRcdFx0XHRzeSA9IHQuc2NhbGVZLFxuXHRcdFx0XHRcdHN6ID0gdC5zY2FsZVosXG5cdFx0XHRcdFx0eCA9IHQueCxcblx0XHRcdFx0XHR5ID0gdC55LFxuXHRcdFx0XHRcdHogPSB0LnosXG5cdFx0XHRcdFx0aXNTVkcgPSB0LnN2Zyxcblx0XHRcdFx0XHRwZXJzcGVjdGl2ZSA9IHQucGVyc3BlY3RpdmUsXG5cdFx0XHRcdFx0Zm9yY2UzRCA9IHQuZm9yY2UzRCxcblx0XHRcdFx0XHRhMTEsIGExMiwgYTEzLCBhMjEsIGEyMiwgYTIzLCBhMzEsIGEzMiwgYTMzLCBhNDEsIGE0MiwgYTQzLFxuXHRcdFx0XHRcdHpPcmlnaW4sIG1pbiwgY29zLCBzaW4sIHQxLCB0MiwgdHJhbnNmb3JtLCBjb21tYSwgemVybywgc2tldywgcm5kO1xuXHRcdFx0XHQvL2NoZWNrIHRvIHNlZSBpZiB3ZSBzaG91bGQgcmVuZGVyIGFzIDJEIChhbmQgU1ZHcyBtdXN0IHVzZSAyRCB3aGVuIF91c2VTVkdUcmFuc2Zvcm1BdHRyIGlzIHRydWUpXG5cdFx0XHRcdGlmICgoKCgodiA9PT0gMSB8fCB2ID09PSAwKSAmJiBmb3JjZTNEID09PSBcImF1dG9cIiAmJiAodGhpcy50d2Vlbi5fdG90YWxUaW1lID09PSB0aGlzLnR3ZWVuLl90b3RhbER1cmF0aW9uIHx8ICF0aGlzLnR3ZWVuLl90b3RhbFRpbWUpKSB8fCAhZm9yY2UzRCkgJiYgIXogJiYgIXBlcnNwZWN0aXZlICYmICFyb3RhdGlvblkgJiYgIXJvdGF0aW9uWCAmJiBzeiA9PT0gMSkgfHwgKF91c2VTVkdUcmFuc2Zvcm1BdHRyICYmIGlzU1ZHKSB8fCAhX3N1cHBvcnRzM0QpIHsgLy9vbiB0aGUgZmluYWwgcmVuZGVyICh3aGljaCBjb3VsZCBiZSAwIGZvciBhIGZyb20gdHdlZW4pLCBpZiB0aGVyZSBhcmUgbm8gM0QgYXNwZWN0cywgcmVuZGVyIGluIDJEIHRvIGZyZWUgdXAgbWVtb3J5IGFuZCBpbXByb3ZlIHBlcmZvcm1hbmNlIGVzcGVjaWFsbHkgb24gbW9iaWxlIGRldmljZXMuIENoZWNrIHRoZSB0d2VlbidzIHRvdGFsVGltZS90b3RhbER1cmF0aW9uIHRvbyBpbiBvcmRlciB0byBtYWtlIHN1cmUgaXQgZG9lc24ndCBoYXBwZW4gYmV0d2VlbiByZXBlYXRzIGlmIGl0J3MgYSByZXBlYXRpbmcgdHdlZW4uXG5cblx0XHRcdFx0XHQvLzJEXG5cdFx0XHRcdFx0aWYgKGFuZ2xlIHx8IHQuc2tld1ggfHwgaXNTVkcpIHtcblx0XHRcdFx0XHRcdGFuZ2xlICo9IF9ERUcyUkFEO1xuXHRcdFx0XHRcdFx0c2tldyA9IHQuc2tld1ggKiBfREVHMlJBRDtcblx0XHRcdFx0XHRcdHJuZCA9IDEwMDAwMDtcblx0XHRcdFx0XHRcdGExMSA9IE1hdGguY29zKGFuZ2xlKSAqIHN4O1xuXHRcdFx0XHRcdFx0YTIxID0gTWF0aC5zaW4oYW5nbGUpICogc3g7XG5cdFx0XHRcdFx0XHRhMTIgPSBNYXRoLnNpbihhbmdsZSAtIHNrZXcpICogLXN5O1xuXHRcdFx0XHRcdFx0YTIyID0gTWF0aC5jb3MoYW5nbGUgLSBza2V3KSAqIHN5O1xuXHRcdFx0XHRcdFx0aWYgKHNrZXcgJiYgdC5za2V3VHlwZSA9PT0gXCJzaW1wbGVcIikgeyAvL2J5IGRlZmF1bHQsIHdlIGNvbXBlbnNhdGUgc2tld2luZyBvbiB0aGUgb3RoZXIgYXhpcyB0byBtYWtlIGl0IGxvb2sgbW9yZSBuYXR1cmFsLCBidXQgeW91IGNhbiBzZXQgdGhlIHNrZXdUeXBlIHRvIFwic2ltcGxlXCIgdG8gdXNlIHRoZSB1bmNvbXBlbnNhdGVkIHNrZXdpbmcgdGhhdCBDU1MgZG9lc1xuXHRcdFx0XHRcdFx0XHR0MSA9IE1hdGgudGFuKHNrZXcpO1xuXHRcdFx0XHRcdFx0XHR0MSA9IE1hdGguc3FydCgxICsgdDEgKiB0MSk7XG5cdFx0XHRcdFx0XHRcdGExMiAqPSB0MTtcblx0XHRcdFx0XHRcdFx0YTIyICo9IHQxO1xuXHRcdFx0XHRcdFx0XHRpZiAodC5za2V3WSkge1xuXHRcdFx0XHRcdFx0XHRcdGExMSAqPSB0MTtcblx0XHRcdFx0XHRcdFx0XHRhMjEgKj0gdDE7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChpc1NWRykge1xuXHRcdFx0XHRcdFx0XHR4ICs9IHQueE9yaWdpbiAtICh0LnhPcmlnaW4gKiBhMTEgKyB0LnlPcmlnaW4gKiBhMTIpICsgdC54T2Zmc2V0O1xuXHRcdFx0XHRcdFx0XHR5ICs9IHQueU9yaWdpbiAtICh0LnhPcmlnaW4gKiBhMjEgKyB0LnlPcmlnaW4gKiBhMjIpICsgdC55T2Zmc2V0O1xuXHRcdFx0XHRcdFx0XHRpZiAoX3VzZVNWR1RyYW5zZm9ybUF0dHIgJiYgKHQueFBlcmNlbnQgfHwgdC55UGVyY2VudCkpIHsgLy9UaGUgU1ZHIHNwZWMgZG9lc24ndCBzdXBwb3J0IHBlcmNlbnRhZ2UtYmFzZWQgdHJhbnNsYXRpb24gaW4gdGhlIFwidHJhbnNmb3JtXCIgYXR0cmlidXRlLCBzbyB3ZSBtZXJnZSBpdCBpbnRvIHRoZSBtYXRyaXggdG8gc2ltdWxhdGUgaXQuXG5cdFx0XHRcdFx0XHRcdFx0bWluID0gdGhpcy50LmdldEJCb3goKTtcblx0XHRcdFx0XHRcdFx0XHR4ICs9IHQueFBlcmNlbnQgKiAwLjAxICogbWluLndpZHRoO1xuXHRcdFx0XHRcdFx0XHRcdHkgKz0gdC55UGVyY2VudCAqIDAuMDEgKiBtaW4uaGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdG1pbiA9IDAuMDAwMDAxO1xuXHRcdFx0XHRcdFx0XHRpZiAoeCA8IG1pbikgaWYgKHggPiAtbWluKSB7XG5cdFx0XHRcdFx0XHRcdFx0eCA9IDA7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKHkgPCBtaW4pIGlmICh5ID4gLW1pbikge1xuXHRcdFx0XHRcdFx0XHRcdHkgPSAwO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0cmFuc2Zvcm0gPSAoKChhMTEgKiBybmQpIHwgMCkgLyBybmQpICsgXCIsXCIgKyAoKChhMjEgKiBybmQpIHwgMCkgLyBybmQpICsgXCIsXCIgKyAoKChhMTIgKiBybmQpIHwgMCkgLyBybmQpICsgXCIsXCIgKyAoKChhMjIgKiBybmQpIHwgMCkgLyBybmQpICsgXCIsXCIgKyB4ICsgXCIsXCIgKyB5ICsgXCIpXCI7XG5cdFx0XHRcdFx0XHRpZiAoaXNTVkcgJiYgX3VzZVNWR1RyYW5zZm9ybUF0dHIpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy50LnNldEF0dHJpYnV0ZShcInRyYW5zZm9ybVwiLCBcIm1hdHJpeChcIiArIHRyYW5zZm9ybSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvL3NvbWUgYnJvd3NlcnMgaGF2ZSBhIGhhcmQgdGltZSB3aXRoIHZlcnkgc21hbGwgdmFsdWVzIGxpa2UgMi40NDkyOTM1OTgyOTQ3MDY0ZS0xNiAobm90aWNlIHRoZSBcImUtXCIgdG93YXJkcyB0aGUgZW5kKSBhbmQgd291bGQgcmVuZGVyIHRoZSBvYmplY3Qgc2xpZ2h0bHkgb2ZmLiBTbyB3ZSByb3VuZCB0byA1IGRlY2ltYWwgcGxhY2VzLlxuXHRcdFx0XHRcdFx0XHRzdHlsZVtfdHJhbnNmb3JtUHJvcF0gPSAoKHQueFBlcmNlbnQgfHwgdC55UGVyY2VudCkgPyBcInRyYW5zbGF0ZShcIiArIHQueFBlcmNlbnQgKyBcIiUsXCIgKyB0LnlQZXJjZW50ICsgXCIlKSBtYXRyaXgoXCIgOiBcIm1hdHJpeChcIikgKyB0cmFuc2Zvcm07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9ICgodC54UGVyY2VudCB8fCB0LnlQZXJjZW50KSA/IFwidHJhbnNsYXRlKFwiICsgdC54UGVyY2VudCArIFwiJSxcIiArIHQueVBlcmNlbnQgKyBcIiUpIG1hdHJpeChcIiA6IFwibWF0cml4KFwiKSArIHN4ICsgXCIsMCwwLFwiICsgc3kgKyBcIixcIiArIHggKyBcIixcIiArIHkgKyBcIilcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKF9pc0ZpcmVmb3gpIHsgLy9GaXJlZm94IGhhcyBhIGJ1ZyAoYXQgbGVhc3QgaW4gdjI1KSB0aGF0IGNhdXNlcyBpdCB0byByZW5kZXIgdGhlIHRyYW5zcGFyZW50IHBhcnQgb2YgMzItYml0IFBORyBpbWFnZXMgYXMgYmxhY2sgd2hlbiBkaXNwbGF5ZWQgaW5zaWRlIGFuIGlmcmFtZSBhbmQgdGhlIDNEIHNjYWxlIGlzIHZlcnkgc21hbGwgYW5kIGRvZXNuJ3QgY2hhbmdlIHN1ZmZpY2llbnRseSBlbm91Z2ggYmV0d2VlbiByZW5kZXJzIChsaWtlIGlmIHlvdSB1c2UgYSBQb3dlcjQuZWFzZUluT3V0IHRvIHNjYWxlIGZyb20gMCB0byAxIHdoZXJlIHRoZSBiZWdpbm5pbmcgdmFsdWVzIG9ubHkgY2hhbmdlIGEgdGlueSBhbW91bnQgdG8gYmVnaW4gdGhlIHR3ZWVuIGJlZm9yZSBhY2NlbGVyYXRpbmcpLiBJbiB0aGlzIGNhc2UsIHdlIGZvcmNlIHRoZSBzY2FsZSB0byBiZSAwLjAwMDAyIGluc3RlYWQgd2hpY2ggaXMgdmlzdWFsbHkgdGhlIHNhbWUgYnV0IHdvcmtzIGFyb3VuZCB0aGUgRmlyZWZveCBpc3N1ZS5cblx0XHRcdFx0XHRtaW4gPSAwLjAwMDE7XG5cdFx0XHRcdFx0aWYgKHN4IDwgbWluICYmIHN4ID4gLW1pbikge1xuXHRcdFx0XHRcdFx0c3ggPSBzeiA9IDAuMDAwMDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChzeSA8IG1pbiAmJiBzeSA+IC1taW4pIHtcblx0XHRcdFx0XHRcdHN5ID0gc3ogPSAwLjAwMDAyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocGVyc3BlY3RpdmUgJiYgIXQueiAmJiAhdC5yb3RhdGlvblggJiYgIXQucm90YXRpb25ZKSB7IC8vRmlyZWZveCBoYXMgYSBidWcgdGhhdCBjYXVzZXMgZWxlbWVudHMgdG8gaGF2ZSBhbiBvZGQgc3VwZXItdGhpbiwgYnJva2VuL2RvdHRlZCBibGFjayBib3JkZXIgb24gZWxlbWVudHMgdGhhdCBoYXZlIGEgcGVyc3BlY3RpdmUgc2V0IGJ1dCBhcmVuJ3QgdXRpbGl6aW5nIDNEIHNwYWNlIChubyByb3RhdGlvblgsIHJvdGF0aW9uWSwgb3IgeikuXG5cdFx0XHRcdFx0XHRwZXJzcGVjdGl2ZSA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChhbmdsZSB8fCB0LnNrZXdYKSB7XG5cdFx0XHRcdFx0YW5nbGUgKj0gX0RFRzJSQUQ7XG5cdFx0XHRcdFx0Y29zID0gYTExID0gTWF0aC5jb3MoYW5nbGUpO1xuXHRcdFx0XHRcdHNpbiA9IGEyMSA9IE1hdGguc2luKGFuZ2xlKTtcblx0XHRcdFx0XHRpZiAodC5za2V3WCkge1xuXHRcdFx0XHRcdFx0YW5nbGUgLT0gdC5za2V3WCAqIF9ERUcyUkFEO1xuXHRcdFx0XHRcdFx0Y29zID0gTWF0aC5jb3MoYW5nbGUpO1xuXHRcdFx0XHRcdFx0c2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXHRcdFx0XHRcdFx0aWYgKHQuc2tld1R5cGUgPT09IFwic2ltcGxlXCIpIHsgLy9ieSBkZWZhdWx0LCB3ZSBjb21wZW5zYXRlIHNrZXdpbmcgb24gdGhlIG90aGVyIGF4aXMgdG8gbWFrZSBpdCBsb29rIG1vcmUgbmF0dXJhbCwgYnV0IHlvdSBjYW4gc2V0IHRoZSBza2V3VHlwZSB0byBcInNpbXBsZVwiIHRvIHVzZSB0aGUgdW5jb21wZW5zYXRlZCBza2V3aW5nIHRoYXQgQ1NTIGRvZXNcblx0XHRcdFx0XHRcdFx0dDEgPSBNYXRoLnRhbih0LnNrZXdYICogX0RFRzJSQUQpO1xuXHRcdFx0XHRcdFx0XHR0MSA9IE1hdGguc3FydCgxICsgdDEgKiB0MSk7XG5cdFx0XHRcdFx0XHRcdGNvcyAqPSB0MTtcblx0XHRcdFx0XHRcdFx0c2luICo9IHQxO1xuXHRcdFx0XHRcdFx0XHRpZiAodC5za2V3WSkge1xuXHRcdFx0XHRcdFx0XHRcdGExMSAqPSB0MTtcblx0XHRcdFx0XHRcdFx0XHRhMjEgKj0gdDE7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YTEyID0gLXNpbjtcblx0XHRcdFx0XHRhMjIgPSBjb3M7XG5cblx0XHRcdFx0fSBlbHNlIGlmICghcm90YXRpb25ZICYmICFyb3RhdGlvblggJiYgc3ogPT09IDEgJiYgIXBlcnNwZWN0aXZlICYmICFpc1NWRykgeyAvL2lmIHdlJ3JlIG9ubHkgdHJhbnNsYXRpbmcgYW5kL29yIDJEIHNjYWxpbmcsIHRoaXMgaXMgZmFzdGVyLi4uXG5cdFx0XHRcdFx0c3R5bGVbX3RyYW5zZm9ybVByb3BdID0gKCh0LnhQZXJjZW50IHx8IHQueVBlcmNlbnQpID8gXCJ0cmFuc2xhdGUoXCIgKyB0LnhQZXJjZW50ICsgXCIlLFwiICsgdC55UGVyY2VudCArIFwiJSkgdHJhbnNsYXRlM2QoXCIgOiBcInRyYW5zbGF0ZTNkKFwiKSArIHggKyBcInB4LFwiICsgeSArIFwicHgsXCIgKyB6ICtcInB4KVwiICsgKChzeCAhPT0gMSB8fCBzeSAhPT0gMSkgPyBcIiBzY2FsZShcIiArIHN4ICsgXCIsXCIgKyBzeSArIFwiKVwiIDogXCJcIik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGExMSA9IGEyMiA9IDE7XG5cdFx0XHRcdFx0YTEyID0gYTIxID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBLRVkgIElOREVYICAgQUZGRUNUU1xuXHRcdFx0XHQvLyBhMTEgIDAgICAgICAgcm90YXRpb24sIHJvdGF0aW9uWSwgc2NhbGVYXG5cdFx0XHRcdC8vIGEyMSAgMSAgICAgICByb3RhdGlvbiwgcm90YXRpb25ZLCBzY2FsZVhcblx0XHRcdFx0Ly8gYTMxICAyICAgICAgIHJvdGF0aW9uWSwgc2NhbGVYXG5cdFx0XHRcdC8vIGE0MSAgMyAgICAgICByb3RhdGlvblksIHNjYWxlWFxuXHRcdFx0XHQvLyBhMTIgIDQgICAgICAgcm90YXRpb24sIHNrZXdYLCByb3RhdGlvblgsIHNjYWxlWVxuXHRcdFx0XHQvLyBhMjIgIDUgICAgICAgcm90YXRpb24sIHNrZXdYLCByb3RhdGlvblgsIHNjYWxlWVxuXHRcdFx0XHQvLyBhMzIgIDYgICAgICAgcm90YXRpb25YLCBzY2FsZVlcblx0XHRcdFx0Ly8gYTQyICA3ICAgICAgIHJvdGF0aW9uWCwgc2NhbGVZXG5cdFx0XHRcdC8vIGExMyAgOCAgICAgICByb3RhdGlvblksIHJvdGF0aW9uWCwgc2NhbGVaXG5cdFx0XHRcdC8vIGEyMyAgOSAgICAgICByb3RhdGlvblksIHJvdGF0aW9uWCwgc2NhbGVaXG5cdFx0XHRcdC8vIGEzMyAgMTAgICAgICByb3RhdGlvblksIHJvdGF0aW9uWCwgc2NhbGVaXG5cdFx0XHRcdC8vIGE0MyAgMTEgICAgICByb3RhdGlvblksIHJvdGF0aW9uWCwgcGVyc3BlY3RpdmUsIHNjYWxlWlxuXHRcdFx0XHQvLyBhMTQgIDEyICAgICAgeCwgek9yaWdpbiwgc3ZnT3JpZ2luXG5cdFx0XHRcdC8vIGEyNCAgMTMgICAgICB5LCB6T3JpZ2luLCBzdmdPcmlnaW5cblx0XHRcdFx0Ly8gYTM0ICAxNCAgICAgIHosIHpPcmlnaW5cblx0XHRcdFx0Ly8gYTQ0ICAxNVxuXHRcdFx0XHQvLyByb3RhdGlvbjogTWF0aC5hdGFuMihhMjEsIGExMSlcblx0XHRcdFx0Ly8gcm90YXRpb25ZOiBNYXRoLmF0YW4yKGExMywgYTMzKSAob3IgTWF0aC5hdGFuMihhMTMsIGExMSkpXG5cdFx0XHRcdC8vIHJvdGF0aW9uWDogTWF0aC5hdGFuMihhMzIsIGEzMylcblx0XHRcdFx0YTMzID0gMTtcblx0XHRcdFx0YTEzID0gYTIzID0gYTMxID0gYTMyID0gYTQxID0gYTQyID0gMDtcblx0XHRcdFx0YTQzID0gKHBlcnNwZWN0aXZlKSA/IC0xIC8gcGVyc3BlY3RpdmUgOiAwO1xuXHRcdFx0XHR6T3JpZ2luID0gdC56T3JpZ2luO1xuXHRcdFx0XHRtaW4gPSAwLjAwMDAwMTsgLy90aHJlc2hvbGQgYmVsb3cgd2hpY2ggYnJvd3NlcnMgdXNlIHNjaWVudGlmaWMgbm90YXRpb24gd2hpY2ggd29uJ3Qgd29yay5cblx0XHRcdFx0Y29tbWEgPSBcIixcIjtcblx0XHRcdFx0emVybyA9IFwiMFwiO1xuXHRcdFx0XHRhbmdsZSA9IHJvdGF0aW9uWSAqIF9ERUcyUkFEO1xuXHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0XHRcdFx0c2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXHRcdFx0XHRcdGEzMSA9IC1zaW47XG5cdFx0XHRcdFx0YTQxID0gYTQzKi1zaW47XG5cdFx0XHRcdFx0YTEzID0gYTExKnNpbjtcblx0XHRcdFx0XHRhMjMgPSBhMjEqc2luO1xuXHRcdFx0XHRcdGEzMyA9IGNvcztcblx0XHRcdFx0XHRhNDMgKj0gY29zO1xuXHRcdFx0XHRcdGExMSAqPSBjb3M7XG5cdFx0XHRcdFx0YTIxICo9IGNvcztcblx0XHRcdFx0fVxuXHRcdFx0XHRhbmdsZSA9IHJvdGF0aW9uWCAqIF9ERUcyUkFEO1xuXHRcdFx0XHRpZiAoYW5nbGUpIHtcblx0XHRcdFx0XHRjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG5cdFx0XHRcdFx0c2luID0gTWF0aC5zaW4oYW5nbGUpO1xuXHRcdFx0XHRcdHQxID0gYTEyKmNvcythMTMqc2luO1xuXHRcdFx0XHRcdHQyID0gYTIyKmNvcythMjMqc2luO1xuXHRcdFx0XHRcdGEzMiA9IGEzMypzaW47XG5cdFx0XHRcdFx0YTQyID0gYTQzKnNpbjtcblx0XHRcdFx0XHRhMTMgPSBhMTIqLXNpbithMTMqY29zO1xuXHRcdFx0XHRcdGEyMyA9IGEyMiotc2luK2EyMypjb3M7XG5cdFx0XHRcdFx0YTMzID0gYTMzKmNvcztcblx0XHRcdFx0XHRhNDMgPSBhNDMqY29zO1xuXHRcdFx0XHRcdGExMiA9IHQxO1xuXHRcdFx0XHRcdGEyMiA9IHQyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChzeiAhPT0gMSkge1xuXHRcdFx0XHRcdGExMyo9c3o7XG5cdFx0XHRcdFx0YTIzKj1zejtcblx0XHRcdFx0XHRhMzMqPXN6O1xuXHRcdFx0XHRcdGE0Myo9c3o7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHN5ICE9PSAxKSB7XG5cdFx0XHRcdFx0YTEyKj1zeTtcblx0XHRcdFx0XHRhMjIqPXN5O1xuXHRcdFx0XHRcdGEzMio9c3k7XG5cdFx0XHRcdFx0YTQyKj1zeTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoc3ggIT09IDEpIHtcblx0XHRcdFx0XHRhMTEqPXN4O1xuXHRcdFx0XHRcdGEyMSo9c3g7XG5cdFx0XHRcdFx0YTMxKj1zeDtcblx0XHRcdFx0XHRhNDEqPXN4O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHpPcmlnaW4gfHwgaXNTVkcpIHtcblx0XHRcdFx0XHRpZiAoek9yaWdpbikge1xuXHRcdFx0XHRcdFx0eCArPSBhMTMqLXpPcmlnaW47XG5cdFx0XHRcdFx0XHR5ICs9IGEyMyotek9yaWdpbjtcblx0XHRcdFx0XHRcdHogKz0gYTMzKi16T3JpZ2luK3pPcmlnaW47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChpc1NWRykgeyAvL2R1ZSB0byBidWdzIGluIHNvbWUgYnJvd3NlcnMsIHdlIG5lZWQgdG8gbWFuYWdlIHRoZSB0cmFuc2Zvcm0tb3JpZ2luIG9mIFNWRyBtYW51YWxseVxuXHRcdFx0XHRcdFx0eCArPSB0LnhPcmlnaW4gLSAodC54T3JpZ2luICogYTExICsgdC55T3JpZ2luICogYTEyKSArIHQueE9mZnNldDtcblx0XHRcdFx0XHRcdHkgKz0gdC55T3JpZ2luIC0gKHQueE9yaWdpbiAqIGEyMSArIHQueU9yaWdpbiAqIGEyMikgKyB0LnlPZmZzZXQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh4IDwgbWluICYmIHggPiAtbWluKSB7XG5cdFx0XHRcdFx0XHR4ID0gemVybztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHkgPCBtaW4gJiYgeSA+IC1taW4pIHtcblx0XHRcdFx0XHRcdHkgPSB6ZXJvO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoeiA8IG1pbiAmJiB6ID4gLW1pbikge1xuXHRcdFx0XHRcdFx0eiA9IDA7IC8vZG9uJ3QgdXNlIHN0cmluZyBiZWNhdXNlIHdlIGNhbGN1bGF0ZSBwZXJzcGVjdGl2ZSBsYXRlciBhbmQgbmVlZCB0aGUgbnVtYmVyLlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vb3B0aW1pemVkIHdheSBvZiBjb25jYXRlbmF0aW5nIGFsbCB0aGUgdmFsdWVzIGludG8gYSBzdHJpbmcuIElmIHdlIGRvIGl0IGFsbCBpbiBvbmUgc2hvdCwgaXQncyBzbG93ZXIgYmVjYXVzZSBvZiB0aGUgd2F5IGJyb3dzZXJzIGhhdmUgdG8gY3JlYXRlIHRlbXAgc3RyaW5ncyBhbmQgdGhlIHdheSBpdCBhZmZlY3RzIG1lbW9yeS4gSWYgd2UgZG8gaXQgcGllY2UtYnktcGllY2Ugd2l0aCArPSwgaXQncyBhIGJpdCBzbG93ZXIgdG9vLiBXZSBmb3VuZCB0aGF0IGRvaW5nIGl0IGluIHRoZXNlIHNpemVkIGNodW5rcyB3b3JrcyBiZXN0IG92ZXJhbGw6XG5cdFx0XHRcdHRyYW5zZm9ybSA9ICgodC54UGVyY2VudCB8fCB0LnlQZXJjZW50KSA/IFwidHJhbnNsYXRlKFwiICsgdC54UGVyY2VudCArIFwiJSxcIiArIHQueVBlcmNlbnQgKyBcIiUpIG1hdHJpeDNkKFwiIDogXCJtYXRyaXgzZChcIik7XG5cdFx0XHRcdHRyYW5zZm9ybSArPSAoKGExMSA8IG1pbiAmJiBhMTEgPiAtbWluKSA/IHplcm8gOiBhMTEpICsgY29tbWEgKyAoKGEyMSA8IG1pbiAmJiBhMjEgPiAtbWluKSA/IHplcm8gOiBhMjEpICsgY29tbWEgKyAoKGEzMSA8IG1pbiAmJiBhMzEgPiAtbWluKSA/IHplcm8gOiBhMzEpO1xuXHRcdFx0XHR0cmFuc2Zvcm0gKz0gY29tbWEgKyAoKGE0MSA8IG1pbiAmJiBhNDEgPiAtbWluKSA/IHplcm8gOiBhNDEpICsgY29tbWEgKyAoKGExMiA8IG1pbiAmJiBhMTIgPiAtbWluKSA/IHplcm8gOiBhMTIpICsgY29tbWEgKyAoKGEyMiA8IG1pbiAmJiBhMjIgPiAtbWluKSA/IHplcm8gOiBhMjIpO1xuXHRcdFx0XHRpZiAocm90YXRpb25YIHx8IHJvdGF0aW9uWSB8fCBzeiAhPT0gMSkgeyAvL3BlcmZvcm1hbmNlIG9wdGltaXphdGlvbiAob2Z0ZW4gdGhlcmUncyBubyByb3RhdGlvblggb3Igcm90YXRpb25ZLCBzbyB3ZSBjYW4gc2tpcCB0aGVzZSBjYWxjdWxhdGlvbnMpXG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9IGNvbW1hICsgKChhMzIgPCBtaW4gJiYgYTMyID4gLW1pbikgPyB6ZXJvIDogYTMyKSArIGNvbW1hICsgKChhNDIgPCBtaW4gJiYgYTQyID4gLW1pbikgPyB6ZXJvIDogYTQyKSArIGNvbW1hICsgKChhMTMgPCBtaW4gJiYgYTEzID4gLW1pbikgPyB6ZXJvIDogYTEzKTtcblx0XHRcdFx0XHR0cmFuc2Zvcm0gKz0gY29tbWEgKyAoKGEyMyA8IG1pbiAmJiBhMjMgPiAtbWluKSA/IHplcm8gOiBhMjMpICsgY29tbWEgKyAoKGEzMyA8IG1pbiAmJiBhMzMgPiAtbWluKSA/IHplcm8gOiBhMzMpICsgY29tbWEgKyAoKGE0MyA8IG1pbiAmJiBhNDMgPiAtbWluKSA/IHplcm8gOiBhNDMpICsgY29tbWE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dHJhbnNmb3JtICs9IFwiLDAsMCwwLDAsMSwwLFwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRyYW5zZm9ybSArPSB4ICsgY29tbWEgKyB5ICsgY29tbWEgKyB6ICsgY29tbWEgKyAocGVyc3BlY3RpdmUgPyAoMSArICgteiAvIHBlcnNwZWN0aXZlKSkgOiAxKSArIFwiKVwiO1xuXG5cdFx0XHRcdHN0eWxlW190cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblx0XHRcdH07XG5cblx0XHRwID0gVHJhbnNmb3JtLnByb3RvdHlwZTtcblx0XHRwLnggPSBwLnkgPSBwLnogPSBwLnNrZXdYID0gcC5za2V3WSA9IHAucm90YXRpb24gPSBwLnJvdGF0aW9uWCA9IHAucm90YXRpb25ZID0gcC56T3JpZ2luID0gcC54UGVyY2VudCA9IHAueVBlcmNlbnQgPSBwLnhPZmZzZXQgPSBwLnlPZmZzZXQgPSAwO1xuXHRcdHAuc2NhbGVYID0gcC5zY2FsZVkgPSBwLnNjYWxlWiA9IDE7XG5cblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJ0cmFuc2Zvcm0sc2NhbGUsc2NhbGVYLHNjYWxlWSxzY2FsZVoseCx5LHoscm90YXRpb24scm90YXRpb25YLHJvdGF0aW9uWSxyb3RhdGlvblosc2tld1gsc2tld1ksc2hvcnRSb3RhdGlvbixzaG9ydFJvdGF0aW9uWCxzaG9ydFJvdGF0aW9uWSxzaG9ydFJvdGF0aW9uWix0cmFuc2Zvcm1PcmlnaW4sc3ZnT3JpZ2luLHRyYW5zZm9ybVBlcnNwZWN0aXZlLGRpcmVjdGlvbmFsUm90YXRpb24scGFyc2VUcmFuc2Zvcm0sZm9yY2UzRCxza2V3VHlwZSx4UGVyY2VudCx5UGVyY2VudCxzbW9vdGhPcmlnaW5cIiwge3BhcnNlcjpmdW5jdGlvbih0LCBlLCBwLCBjc3NwLCBwdCwgcGx1Z2luLCB2YXJzKSB7XG5cdFx0XHRpZiAoY3NzcC5fbGFzdFBhcnNlZFRyYW5zZm9ybSA9PT0gdmFycykgeyByZXR1cm4gcHQ7IH0gLy9vbmx5IG5lZWQgdG8gcGFyc2UgdGhlIHRyYW5zZm9ybSBvbmNlLCBhbmQgb25seSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBpdC5cblx0XHRcdGNzc3AuX2xhc3RQYXJzZWRUcmFuc2Zvcm0gPSB2YXJzO1xuXHRcdFx0dmFyIG9yaWdpbmFsR1NUcmFuc2Zvcm0gPSB0Ll9nc1RyYW5zZm9ybSxcblx0XHRcdFx0c3R5bGUgPSB0LnN0eWxlLFxuXHRcdFx0XHRtaW4gPSAwLjAwMDAwMSxcblx0XHRcdFx0aSA9IF90cmFuc2Zvcm1Qcm9wcy5sZW5ndGgsXG5cdFx0XHRcdHYgPSB2YXJzLFxuXHRcdFx0XHRlbmRSb3RhdGlvbnMgPSB7fSxcblx0XHRcdFx0dHJhbnNmb3JtT3JpZ2luU3RyaW5nID0gXCJ0cmFuc2Zvcm1PcmlnaW5cIixcblx0XHRcdFx0bTEsIG0yLCBza2V3WSwgY29weSwgb3JpZywgaGFzM0QsIGhhc0NoYW5nZSwgZHIsIHgsIHk7XG5cdFx0XHRpZiAodmFycy5kaXNwbGF5KSB7IC8vaWYgdGhlIHVzZXIgaXMgc2V0dGluZyBkaXNwbGF5IGR1cmluZyB0aGlzIHR3ZWVuLCBpdCBtYXkgbm90IGJlIGluc3RhbnRpYXRlZCB5ZXQgYnV0IHdlIG11c3QgZm9yY2UgaXQgaGVyZSBpbiBvcmRlciB0byBnZXQgYWNjdXJhdGUgcmVhZGluZ3MuIElmIGRpc3BsYXkgaXMgXCJub25lXCIsIHNvbWUgYnJvd3NlcnMgcmVmdXNlIHRvIHJlcG9ydCB0aGUgdHJhbnNmb3JtIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuXHRcdFx0XHRjb3B5ID0gX2dldFN0eWxlKHQsIFwiZGlzcGxheVwiKTtcblx0XHRcdFx0c3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0XHRcdFx0bTEgPSBfZ2V0VHJhbnNmb3JtKHQsIF9jcywgdHJ1ZSwgdmFycy5wYXJzZVRyYW5zZm9ybSk7XG5cdFx0XHRcdHN0eWxlLmRpc3BsYXkgPSBjb3B5O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bTEgPSBfZ2V0VHJhbnNmb3JtKHQsIF9jcywgdHJ1ZSwgdmFycy5wYXJzZVRyYW5zZm9ybSk7XG5cdFx0XHR9XG5cdFx0XHRjc3NwLl90cmFuc2Zvcm0gPSBtMTtcblx0XHRcdGlmICh0eXBlb2Yodi50cmFuc2Zvcm0pID09PSBcInN0cmluZ1wiICYmIF90cmFuc2Zvcm1Qcm9wKSB7IC8vZm9yIHZhbHVlcyBsaWtlIHRyYW5zZm9ybTpcInJvdGF0ZSg2MGRlZykgc2NhbGUoMC41LCAwLjgpXCJcblx0XHRcdFx0Y29weSA9IF90ZW1wRGl2LnN0eWxlOyAvL2Rvbid0IHVzZSB0aGUgb3JpZ2luYWwgdGFyZ2V0IGJlY2F1c2UgaXQgbWlnaHQgYmUgU1ZHIGluIHdoaWNoIGNhc2Ugc29tZSBicm93c2VycyBkb24ndCByZXBvcnQgY29tcHV0ZWQgc3R5bGUgY29ycmVjdGx5LlxuXHRcdFx0XHRjb3B5W190cmFuc2Zvcm1Qcm9wXSA9IHYudHJhbnNmb3JtO1xuXHRcdFx0XHRjb3B5LmRpc3BsYXkgPSBcImJsb2NrXCI7IC8vaWYgZGlzcGxheSBpcyBcIm5vbmVcIiwgdGhlIGJyb3dzZXIgb2Z0ZW4gcmVmdXNlcyB0byByZXBvcnQgdGhlIHRyYW5zZm9ybSBwcm9wZXJ0aWVzIGNvcnJlY3RseS5cblx0XHRcdFx0Y29weS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblx0XHRcdFx0X2RvYy5ib2R5LmFwcGVuZENoaWxkKF90ZW1wRGl2KTtcblx0XHRcdFx0bTIgPSBfZ2V0VHJhbnNmb3JtKF90ZW1wRGl2LCBudWxsLCBmYWxzZSk7XG5cdFx0XHRcdF9kb2MuYm9keS5yZW1vdmVDaGlsZChfdGVtcERpdik7XG5cdFx0XHRcdGlmICghbTIucGVyc3BlY3RpdmUpIHtcblx0XHRcdFx0XHRtMi5wZXJzcGVjdGl2ZSA9IG0xLnBlcnNwZWN0aXZlOyAvL3R3ZWVuaW5nIHRvIG5vIHBlcnNwZWN0aXZlIGdpdmVzIHZlcnkgdW5pbnR1aXRpdmUgcmVzdWx0cyAtIGp1c3Qga2VlcCB0aGUgc2FtZSBwZXJzcGVjdGl2ZSBpbiB0aGF0IGNhc2UuXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHYueFBlcmNlbnQgIT0gbnVsbCkge1xuXHRcdFx0XHRcdG0yLnhQZXJjZW50ID0gX3BhcnNlVmFsKHYueFBlcmNlbnQsIG0xLnhQZXJjZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodi55UGVyY2VudCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0bTIueVBlcmNlbnQgPSBfcGFyc2VWYWwodi55UGVyY2VudCwgbTEueVBlcmNlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZih2KSA9PT0gXCJvYmplY3RcIikgeyAvL2ZvciB2YWx1ZXMgbGlrZSBzY2FsZVgsIHNjYWxlWSwgcm90YXRpb24sIHgsIHksIHNrZXdYLCBhbmQgc2tld1kgb3IgdHJhbnNmb3JtOnsuLi59IChvYmplY3QpXG5cdFx0XHRcdG0yID0ge3NjYWxlWDpfcGFyc2VWYWwoKHYuc2NhbGVYICE9IG51bGwpID8gdi5zY2FsZVggOiB2LnNjYWxlLCBtMS5zY2FsZVgpLFxuXHRcdFx0XHRcdHNjYWxlWTpfcGFyc2VWYWwoKHYuc2NhbGVZICE9IG51bGwpID8gdi5zY2FsZVkgOiB2LnNjYWxlLCBtMS5zY2FsZVkpLFxuXHRcdFx0XHRcdHNjYWxlWjpfcGFyc2VWYWwodi5zY2FsZVosIG0xLnNjYWxlWiksXG5cdFx0XHRcdFx0eDpfcGFyc2VWYWwodi54LCBtMS54KSxcblx0XHRcdFx0XHR5Ol9wYXJzZVZhbCh2LnksIG0xLnkpLFxuXHRcdFx0XHRcdHo6X3BhcnNlVmFsKHYueiwgbTEueiksXG5cdFx0XHRcdFx0eFBlcmNlbnQ6X3BhcnNlVmFsKHYueFBlcmNlbnQsIG0xLnhQZXJjZW50KSxcblx0XHRcdFx0XHR5UGVyY2VudDpfcGFyc2VWYWwodi55UGVyY2VudCwgbTEueVBlcmNlbnQpLFxuXHRcdFx0XHRcdHBlcnNwZWN0aXZlOl9wYXJzZVZhbCh2LnRyYW5zZm9ybVBlcnNwZWN0aXZlLCBtMS5wZXJzcGVjdGl2ZSl9O1xuXHRcdFx0XHRkciA9IHYuZGlyZWN0aW9uYWxSb3RhdGlvbjtcblx0XHRcdFx0aWYgKGRyICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mKGRyKSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdFx0Zm9yIChjb3B5IGluIGRyKSB7XG5cdFx0XHRcdFx0XHRcdHZbY29weV0gPSBkcltjb3B5XTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0di5yb3RhdGlvbiA9IGRyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mKHYueCkgPT09IFwic3RyaW5nXCIgJiYgdi54LmluZGV4T2YoXCIlXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdG0yLnggPSAwO1xuXHRcdFx0XHRcdG0yLnhQZXJjZW50ID0gX3BhcnNlVmFsKHYueCwgbTEueFBlcmNlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Yodi55KSA9PT0gXCJzdHJpbmdcIiAmJiB2LnkuaW5kZXhPZihcIiVcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0bTIueSA9IDA7XG5cdFx0XHRcdFx0bTIueVBlcmNlbnQgPSBfcGFyc2VWYWwodi55LCBtMS55UGVyY2VudCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRtMi5yb3RhdGlvbiA9IF9wYXJzZUFuZ2xlKChcInJvdGF0aW9uXCIgaW4gdikgPyB2LnJvdGF0aW9uIDogKFwic2hvcnRSb3RhdGlvblwiIGluIHYpID8gdi5zaG9ydFJvdGF0aW9uICsgXCJfc2hvcnRcIiA6IChcInJvdGF0aW9uWlwiIGluIHYpID8gdi5yb3RhdGlvblogOiBtMS5yb3RhdGlvbiwgbTEucm90YXRpb24sIFwicm90YXRpb25cIiwgZW5kUm90YXRpb25zKTtcblx0XHRcdFx0aWYgKF9zdXBwb3J0czNEKSB7XG5cdFx0XHRcdFx0bTIucm90YXRpb25YID0gX3BhcnNlQW5nbGUoKFwicm90YXRpb25YXCIgaW4gdikgPyB2LnJvdGF0aW9uWCA6IChcInNob3J0Um90YXRpb25YXCIgaW4gdikgPyB2LnNob3J0Um90YXRpb25YICsgXCJfc2hvcnRcIiA6IG0xLnJvdGF0aW9uWCB8fCAwLCBtMS5yb3RhdGlvblgsIFwicm90YXRpb25YXCIsIGVuZFJvdGF0aW9ucyk7XG5cdFx0XHRcdFx0bTIucm90YXRpb25ZID0gX3BhcnNlQW5nbGUoKFwicm90YXRpb25ZXCIgaW4gdikgPyB2LnJvdGF0aW9uWSA6IChcInNob3J0Um90YXRpb25ZXCIgaW4gdikgPyB2LnNob3J0Um90YXRpb25ZICsgXCJfc2hvcnRcIiA6IG0xLnJvdGF0aW9uWSB8fCAwLCBtMS5yb3RhdGlvblksIFwicm90YXRpb25ZXCIsIGVuZFJvdGF0aW9ucyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bTIuc2tld1ggPSAodi5za2V3WCA9PSBudWxsKSA/IG0xLnNrZXdYIDogX3BhcnNlQW5nbGUodi5za2V3WCwgbTEuc2tld1gpO1xuXG5cdFx0XHRcdC8vbm90ZTogZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMsIHdlIGNvbWJpbmUgYWxsIHNrZXdpbmcgaW50byB0aGUgc2tld1ggYW5kIHJvdGF0aW9uIHZhbHVlcywgaWdub3Jpbmcgc2tld1kgYnV0IHdlIG11c3Qgc3RpbGwgcmVjb3JkIGl0IHNvIHRoYXQgd2UgY2FuIGRpc2Nlcm4gaG93IG11Y2ggb2YgdGhlIG92ZXJhbGwgc2tldyBpcyBhdHRyaWJ1dGVkIHRvIHNrZXdYIHZzLiBza2V3WS4gT3RoZXJ3aXNlLCBpZiB0aGUgc2tld1kgd291bGQgYWx3YXlzIGFjdCByZWxhdGl2ZSAodHdlZW4gc2tld1kgdG8gMTBkZWcsIGZvciBleGFtcGxlLCBtdWx0aXBsZSB0aW1lcyBhbmQgaWYgd2UgYWx3YXlzIGNvbWJpbmUgdGhpbmdzIGludG8gc2tld1gsIHdlIGNhbid0IHJlbWVtYmVyIHRoYXQgc2tld1kgd2FzIDEwIGZyb20gbGFzdCB0aW1lKS4gUmVtZW1iZXIsIGEgc2tld1kgb2YgMTAgZGVncmVlcyBsb29rcyB0aGUgc2FtZSBhcyBhIHJvdGF0aW9uIG9mIDEwIGRlZ3JlZXMgcGx1cyBhIHNrZXdYIG9mIC0xMCBkZWdyZWVzLlxuXHRcdFx0XHRtMi5za2V3WSA9ICh2LnNrZXdZID09IG51bGwpID8gbTEuc2tld1kgOiBfcGFyc2VBbmdsZSh2LnNrZXdZLCBtMS5za2V3WSk7XG5cdFx0XHRcdGlmICgoc2tld1kgPSBtMi5za2V3WSAtIG0xLnNrZXdZKSkge1xuXHRcdFx0XHRcdG0yLnNrZXdYICs9IHNrZXdZO1xuXHRcdFx0XHRcdG0yLnJvdGF0aW9uICs9IHNrZXdZO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoX3N1cHBvcnRzM0QgJiYgdi5mb3JjZTNEICE9IG51bGwpIHtcblx0XHRcdFx0bTEuZm9yY2UzRCA9IHYuZm9yY2UzRDtcblx0XHRcdFx0aGFzQ2hhbmdlID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0bTEuc2tld1R5cGUgPSB2LnNrZXdUeXBlIHx8IG0xLnNrZXdUeXBlIHx8IENTU1BsdWdpbi5kZWZhdWx0U2tld1R5cGU7XG5cblx0XHRcdGhhczNEID0gKG0xLmZvcmNlM0QgfHwgbTEueiB8fCBtMS5yb3RhdGlvblggfHwgbTEucm90YXRpb25ZIHx8IG0yLnogfHwgbTIucm90YXRpb25YIHx8IG0yLnJvdGF0aW9uWSB8fCBtMi5wZXJzcGVjdGl2ZSk7XG5cdFx0XHRpZiAoIWhhczNEICYmIHYuc2NhbGUgIT0gbnVsbCkge1xuXHRcdFx0XHRtMi5zY2FsZVogPSAxOyAvL25vIG5lZWQgdG8gdHdlZW4gc2NhbGVaLlxuXHRcdFx0fVxuXG5cdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0cCA9IF90cmFuc2Zvcm1Qcm9wc1tpXTtcblx0XHRcdFx0b3JpZyA9IG0yW3BdIC0gbTFbcF07XG5cdFx0XHRcdGlmIChvcmlnID4gbWluIHx8IG9yaWcgPCAtbWluIHx8IHZbcF0gIT0gbnVsbCB8fCBfZm9yY2VQVFtwXSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0aGFzQ2hhbmdlID0gdHJ1ZTtcblx0XHRcdFx0XHRwdCA9IG5ldyBDU1NQcm9wVHdlZW4obTEsIHAsIG0xW3BdLCBvcmlnLCBwdCk7XG5cdFx0XHRcdFx0aWYgKHAgaW4gZW5kUm90YXRpb25zKSB7XG5cdFx0XHRcdFx0XHRwdC5lID0gZW5kUm90YXRpb25zW3BdOyAvL2RpcmVjdGlvbmFsIHJvdGF0aW9ucyB0eXBpY2FsbHkgaGF2ZSBjb21wZW5zYXRlZCB2YWx1ZXMgZHVyaW5nIHRoZSB0d2VlbiwgYnV0IHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZXkgZW5kIGF0IGV4YWN0bHkgd2hhdCB0aGUgdXNlciByZXF1ZXN0ZWRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQueHMwID0gMDsgLy9lbnN1cmVzIHRoZSB2YWx1ZSBzdGF5cyBudW1lcmljIGluIHNldFJhdGlvKClcblx0XHRcdFx0XHRwdC5wbHVnaW4gPSBwbHVnaW47XG5cdFx0XHRcdFx0Y3NzcC5fb3ZlcndyaXRlUHJvcHMucHVzaChwdC5uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRvcmlnID0gdi50cmFuc2Zvcm1PcmlnaW47XG5cdFx0XHRpZiAobTEuc3ZnICYmIChvcmlnIHx8IHYuc3ZnT3JpZ2luKSkge1xuXHRcdFx0XHR4ID0gbTEueE9mZnNldDsgLy93aGVuIHdlIGNoYW5nZSB0aGUgb3JpZ2luLCBpbiBvcmRlciB0byBwcmV2ZW50IHRoaW5ncyBmcm9tIGp1bXBpbmcgd2UgYWRqdXN0IHRoZSB4L3kgc28gd2UgbXVzdCByZWNvcmQgdGhvc2UgaGVyZSBzbyB0aGF0IHdlIGNhbiBjcmVhdGUgUHJvcFR3ZWVucyBmb3IgdGhlbSBhbmQgZmxpcCB0aGVtIGF0IHRoZSBzYW1lIHRpbWUgYXMgdGhlIG9yaWdpblxuXHRcdFx0XHR5ID0gbTEueU9mZnNldDtcblx0XHRcdFx0X3BhcnNlU1ZHT3JpZ2luKHQsIF9wYXJzZVBvc2l0aW9uKG9yaWcpLCBtMiwgdi5zdmdPcmlnaW4sIHYuc21vb3RoT3JpZ2luKTtcblx0XHRcdFx0cHQgPSBfYWRkTm9uVHdlZW5pbmdOdW1lcmljUFQobTEsIFwieE9yaWdpblwiLCAob3JpZ2luYWxHU1RyYW5zZm9ybSA/IG0xIDogbTIpLnhPcmlnaW4sIG0yLnhPcmlnaW4sIHB0LCB0cmFuc2Zvcm1PcmlnaW5TdHJpbmcpOyAvL25vdGU6IGlmIHRoZXJlIHdhc24ndCBhIHRyYW5zZm9ybU9yaWdpbiBkZWZpbmVkIHlldCwganVzdCBzdGFydCB3aXRoIHRoZSBkZXN0aW5hdGlvbiBvbmU7IGl0J3Mgd2FzdGVmdWwgb3RoZXJ3aXNlLCBhbmQgaXQgY2F1c2VzIHByb2JsZW1zIHdpdGggZnJvbVRvKCkgdHdlZW5zLiBGb3IgZXhhbXBsZSwgVHdlZW5MaXRlLnRvKFwiI3doZWVsXCIsIDMsIHtyb3RhdGlvbjoxODAsIHRyYW5zZm9ybU9yaWdpbjpcIjUwJSA1MCVcIiwgZGVsYXk6MX0pOyBUd2VlbkxpdGUuZnJvbVRvKFwiI3doZWVsXCIsIDMsIHtzY2FsZTowLjUsIHRyYW5zZm9ybU9yaWdpbjpcIjUwJSA1MCVcIn0sIHtzY2FsZToxLCBkZWxheToyfSk7IHdvdWxkIGNhdXNlIGEganVtcCB3aGVuIHRoZSBmcm9tIHZhbHVlcyByZXZlcnQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgMm5kIHR3ZWVuLlxuXHRcdFx0XHRwdCA9IF9hZGROb25Ud2VlbmluZ051bWVyaWNQVChtMSwgXCJ5T3JpZ2luXCIsIChvcmlnaW5hbEdTVHJhbnNmb3JtID8gbTEgOiBtMikueU9yaWdpbiwgbTIueU9yaWdpbiwgcHQsIHRyYW5zZm9ybU9yaWdpblN0cmluZyk7XG5cdFx0XHRcdGlmICh4ICE9PSBtMS54T2Zmc2V0IHx8IHkgIT09IG0xLnlPZmZzZXQpIHtcblx0XHRcdFx0XHRwdCA9IF9hZGROb25Ud2VlbmluZ051bWVyaWNQVChtMSwgXCJ4T2Zmc2V0XCIsIChvcmlnaW5hbEdTVHJhbnNmb3JtID8geCA6IG0xLnhPZmZzZXQpLCBtMS54T2Zmc2V0LCBwdCwgdHJhbnNmb3JtT3JpZ2luU3RyaW5nKTtcblx0XHRcdFx0XHRwdCA9IF9hZGROb25Ud2VlbmluZ051bWVyaWNQVChtMSwgXCJ5T2Zmc2V0XCIsIChvcmlnaW5hbEdTVHJhbnNmb3JtID8geSA6IG0xLnlPZmZzZXQpLCBtMS55T2Zmc2V0LCBwdCwgdHJhbnNmb3JtT3JpZ2luU3RyaW5nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvcmlnID0gX3VzZVNWR1RyYW5zZm9ybUF0dHIgPyBudWxsIDogXCIwcHggMHB4XCI7IC8vY2VydGFpbiBicm93c2VycyAobGlrZSBmaXJlZm94KSBjb21wbGV0ZWx5IGJvdGNoIHRyYW5zZm9ybS1vcmlnaW4sIHNvIHdlIG11c3QgcmVtb3ZlIGl0IHRvIHByZXZlbnQgaXQgZnJvbSBjb250YW1pbmF0aW5nIHRyYW5zZm9ybXMuIFdlIG1hbmFnZSBpdCBvdXJzZWx2ZXMgd2l0aCB4T3JpZ2luIGFuZCB5T3JpZ2luXG5cdFx0XHR9XG5cdFx0XHRpZiAob3JpZyB8fCAoX3N1cHBvcnRzM0QgJiYgaGFzM0QgJiYgbTEuek9yaWdpbikpIHsgLy9pZiBhbnl0aGluZyAzRCBpcyBoYXBwZW5pbmcgYW5kIHRoZXJlJ3MgYSB0cmFuc2Zvcm1PcmlnaW4gd2l0aCBhIHogY29tcG9uZW50IHRoYXQncyBub24temVybywgd2UgbXVzdCBlbnN1cmUgdGhhdCB0aGUgdHJhbnNmb3JtT3JpZ2luJ3Mgei1jb21wb25lbnQgaXMgc2V0IHRvIDAgc28gdGhhdCB3ZSBjYW4gbWFudWFsbHkgZG8gdGhvc2UgY2FsY3VsYXRpb25zIHRvIGdldCBhcm91bmQgU2FmYXJpIGJ1Z3MuIEV2ZW4gaWYgdGhlIHVzZXIgZGlkbid0IHNwZWNpZmljYWxseSBkZWZpbmUgYSBcInRyYW5zZm9ybU9yaWdpblwiIGluIHRoaXMgcGFydGljdWxhciB0d2VlbiAobWF5YmUgdGhleSBkaWQgaXQgdmlhIGNzcyBkaXJlY3RseSkuXG5cdFx0XHRcdGlmIChfdHJhbnNmb3JtUHJvcCkge1xuXHRcdFx0XHRcdGhhc0NoYW5nZSA9IHRydWU7XG5cdFx0XHRcdFx0cCA9IF90cmFuc2Zvcm1PcmlnaW5Qcm9wO1xuXHRcdFx0XHRcdG9yaWcgPSAob3JpZyB8fCBfZ2V0U3R5bGUodCwgcCwgX2NzLCBmYWxzZSwgXCI1MCUgNTAlXCIpKSArIFwiXCI7IC8vY2FzdCBhcyBzdHJpbmcgdG8gYXZvaWQgZXJyb3JzXG5cdFx0XHRcdFx0cHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHN0eWxlLCBwLCAwLCAwLCBwdCwgLTEsIHRyYW5zZm9ybU9yaWdpblN0cmluZyk7XG5cdFx0XHRcdFx0cHQuYiA9IHN0eWxlW3BdO1xuXHRcdFx0XHRcdHB0LnBsdWdpbiA9IHBsdWdpbjtcblx0XHRcdFx0XHRpZiAoX3N1cHBvcnRzM0QpIHtcblx0XHRcdFx0XHRcdGNvcHkgPSBtMS56T3JpZ2luO1xuXHRcdFx0XHRcdFx0b3JpZyA9IG9yaWcuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdFx0bTEuek9yaWdpbiA9ICgob3JpZy5sZW5ndGggPiAyICYmICEoY29weSAhPT0gMCAmJiBvcmlnWzJdID09PSBcIjBweFwiKSkgPyBwYXJzZUZsb2F0KG9yaWdbMl0pIDogY29weSkgfHwgMDsgLy9TYWZhcmkgZG9lc24ndCBoYW5kbGUgdGhlIHogcGFydCBvZiB0cmFuc2Zvcm1PcmlnaW4gY29ycmVjdGx5LCBzbyB3ZSdsbCBtYW51YWxseSBoYW5kbGUgaXQgaW4gdGhlIF9zZXQzRFRyYW5zZm9ybVJhdGlvKCkgbWV0aG9kLlxuXHRcdFx0XHRcdFx0cHQueHMwID0gcHQuZSA9IG9yaWdbMF0gKyBcIiBcIiArIChvcmlnWzFdIHx8IFwiNTAlXCIpICsgXCIgMHB4XCI7IC8vd2UgbXVzdCBkZWZpbmUgYSB6IHZhbHVlIG9mIDBweCBzcGVjaWZpY2FsbHkgb3RoZXJ3aXNlIGlPUyA1IFNhZmFyaSB3aWxsIHN0aWNrIHdpdGggdGhlIG9sZCBvbmUgKGlmIG9uZSB3YXMgZGVmaW5lZCkhXG5cdFx0XHRcdFx0XHRwdCA9IG5ldyBDU1NQcm9wVHdlZW4obTEsIFwiek9yaWdpblwiLCAwLCAwLCBwdCwgLTEsIHB0Lm4pOyAvL3dlIG11c3QgY3JlYXRlIGEgQ1NTUHJvcFR3ZWVuIGZvciB0aGUgX2dzVHJhbnNmb3JtLnpPcmlnaW4gc28gdGhhdCBpdCBnZXRzIHJlc2V0IHByb3Blcmx5IGF0IHRoZSBiZWdpbm5pbmcgaWYgdGhlIHR3ZWVuIHJ1bnMgYmFja3dhcmQgKGFzIG9wcG9zZWQgdG8ganVzdCBzZXR0aW5nIG0xLnpPcmlnaW4gaGVyZSlcblx0XHRcdFx0XHRcdHB0LmIgPSBjb3B5O1xuXHRcdFx0XHRcdFx0cHQueHMwID0gcHQuZSA9IG0xLnpPcmlnaW47XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHB0LnhzMCA9IHB0LmUgPSBvcmlnO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vZm9yIG9sZGVyIHZlcnNpb25zIG9mIElFICg2LTgpLCB3ZSBuZWVkIHRvIG1hbnVhbGx5IGNhbGN1bGF0ZSB0aGluZ3MgaW5zaWRlIHRoZSBzZXRSYXRpbygpIGZ1bmN0aW9uLiBXZSByZWNvcmQgb3JpZ2luIHggYW5kIHkgKG94IGFuZCBveSkgYW5kIHdoZXRoZXIgb3Igbm90IHRoZSB2YWx1ZXMgYXJlIHBlcmNlbnRhZ2VzIChveHAgYW5kIG95cCkuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X3BhcnNlUG9zaXRpb24ob3JpZyArIFwiXCIsIG0xKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGhhc0NoYW5nZSkge1xuXHRcdFx0XHRjc3NwLl90cmFuc2Zvcm1UeXBlID0gKCEobTEuc3ZnICYmIF91c2VTVkdUcmFuc2Zvcm1BdHRyKSAmJiAoaGFzM0QgfHwgdGhpcy5fdHJhbnNmb3JtVHlwZSA9PT0gMykpID8gMyA6IDI7IC8vcXVpY2tlciB0aGFuIGNhbGxpbmcgY3NzcC5fZW5hYmxlVHJhbnNmb3JtcygpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHB0O1xuXHRcdH0sIHByZWZpeDp0cnVlfSk7XG5cblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJib3hTaGFkb3dcIiwge2RlZmF1bHRWYWx1ZTpcIjBweCAwcHggMHB4IDBweCAjOTk5XCIsIHByZWZpeDp0cnVlLCBjb2xvcjp0cnVlLCBtdWx0aTp0cnVlLCBrZXl3b3JkOlwiaW5zZXRcIn0pO1xuXG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiYm9yZGVyUmFkaXVzXCIsIHtkZWZhdWx0VmFsdWU6XCIwcHhcIiwgcGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4pIHtcblx0XHRcdGUgPSB0aGlzLmZvcm1hdChlKTtcblx0XHRcdHZhciBwcm9wcyA9IFtcImJvcmRlclRvcExlZnRSYWRpdXNcIixcImJvcmRlclRvcFJpZ2h0UmFkaXVzXCIsXCJib3JkZXJCb3R0b21SaWdodFJhZGl1c1wiLFwiYm9yZGVyQm90dG9tTGVmdFJhZGl1c1wiXSxcblx0XHRcdFx0c3R5bGUgPSB0LnN0eWxlLFxuXHRcdFx0XHRlYTEsIGksIGVzMiwgYnMyLCBicywgZXMsIGJuLCBlbiwgdywgaCwgZXNmeCwgYnNmeCwgcmVsLCBobiwgdm4sIGVtO1xuXHRcdFx0dyA9IHBhcnNlRmxvYXQodC5vZmZzZXRXaWR0aCk7XG5cdFx0XHRoID0gcGFyc2VGbG9hdCh0Lm9mZnNldEhlaWdodCk7XG5cdFx0XHRlYTEgPSBlLnNwbGl0KFwiIFwiKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyAvL2lmIHdlJ3JlIGRlYWxpbmcgd2l0aCBwZXJjZW50YWdlcywgd2UgbXVzdCBjb252ZXJ0IHRoaW5ncyBzZXBhcmF0ZWx5IGZvciB0aGUgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgYXhpcyFcblx0XHRcdFx0aWYgKHRoaXMucC5pbmRleE9mKFwiYm9yZGVyXCIpKSB7IC8vb2xkZXIgYnJvd3NlcnMgdXNlZCBhIHByZWZpeFxuXHRcdFx0XHRcdHByb3BzW2ldID0gX2NoZWNrUHJvcFByZWZpeChwcm9wc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnMgPSBiczIgPSBfZ2V0U3R5bGUodCwgcHJvcHNbaV0sIF9jcywgZmFsc2UsIFwiMHB4XCIpO1xuXHRcdFx0XHRpZiAoYnMuaW5kZXhPZihcIiBcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0YnMyID0gYnMuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdGJzID0gYnMyWzBdO1xuXHRcdFx0XHRcdGJzMiA9IGJzMlsxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlcyA9IGVzMiA9IGVhMVtpXTtcblx0XHRcdFx0Ym4gPSBwYXJzZUZsb2F0KGJzKTtcblx0XHRcdFx0YnNmeCA9IGJzLnN1YnN0cigoYm4gKyBcIlwiKS5sZW5ndGgpO1xuXHRcdFx0XHRyZWwgPSAoZXMuY2hhckF0KDEpID09PSBcIj1cIik7XG5cdFx0XHRcdGlmIChyZWwpIHtcblx0XHRcdFx0XHRlbiA9IHBhcnNlSW50KGVzLmNoYXJBdCgwKStcIjFcIiwgMTApO1xuXHRcdFx0XHRcdGVzID0gZXMuc3Vic3RyKDIpO1xuXHRcdFx0XHRcdGVuICo9IHBhcnNlRmxvYXQoZXMpO1xuXHRcdFx0XHRcdGVzZnggPSBlcy5zdWJzdHIoKGVuICsgXCJcIikubGVuZ3RoIC0gKGVuIDwgMCA/IDEgOiAwKSkgfHwgXCJcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRlbiA9IHBhcnNlRmxvYXQoZXMpO1xuXHRcdFx0XHRcdGVzZnggPSBlcy5zdWJzdHIoKGVuICsgXCJcIikubGVuZ3RoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZXNmeCA9PT0gXCJcIikge1xuXHRcdFx0XHRcdGVzZnggPSBfc3VmZml4TWFwW3BdIHx8IGJzZng7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGVzZnggIT09IGJzZngpIHtcblx0XHRcdFx0XHRobiA9IF9jb252ZXJ0VG9QaXhlbHModCwgXCJib3JkZXJMZWZ0XCIsIGJuLCBic2Z4KTsgLy9ob3Jpem9udGFsIG51bWJlciAod2UgdXNlIGEgYm9ndXMgXCJib3JkZXJMZWZ0XCIgcHJvcGVydHkganVzdCBiZWNhdXNlIHRoZSBfY29udmVydFRvUGl4ZWxzKCkgbWV0aG9kIHNlYXJjaGVzIGZvciB0aGUga2V5d29yZHMgXCJMZWZ0XCIsIFwiUmlnaHRcIiwgXCJUb3BcIiwgYW5kIFwiQm90dG9tXCIgdG8gZGV0ZXJtaW5lIG9mIGl0J3MgYSBob3Jpem9udGFsIG9yIHZlcnRpY2FsIHByb3BlcnR5LCBhbmQgd2UgbmVlZCBcImJvcmRlclwiIGluIHRoZSBuYW1lIHNvIHRoYXQgaXQga25vd3MgaXQgc2hvdWxkIG1lYXN1cmUgcmVsYXRpdmUgdG8gdGhlIGVsZW1lbnQgaXRzZWxmLCBub3QgaXRzIHBhcmVudC5cblx0XHRcdFx0XHR2biA9IF9jb252ZXJ0VG9QaXhlbHModCwgXCJib3JkZXJUb3BcIiwgYm4sIGJzZngpOyAvL3ZlcnRpY2FsIG51bWJlclxuXHRcdFx0XHRcdGlmIChlc2Z4ID09PSBcIiVcIikge1xuXHRcdFx0XHRcdFx0YnMgPSAoaG4gLyB3ICogMTAwKSArIFwiJVwiO1xuXHRcdFx0XHRcdFx0YnMyID0gKHZuIC8gaCAqIDEwMCkgKyBcIiVcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGVzZnggPT09IFwiZW1cIikge1xuXHRcdFx0XHRcdFx0ZW0gPSBfY29udmVydFRvUGl4ZWxzKHQsIFwiYm9yZGVyTGVmdFwiLCAxLCBcImVtXCIpO1xuXHRcdFx0XHRcdFx0YnMgPSAoaG4gLyBlbSkgKyBcImVtXCI7XG5cdFx0XHRcdFx0XHRiczIgPSAodm4gLyBlbSkgKyBcImVtXCI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJzID0gaG4gKyBcInB4XCI7XG5cdFx0XHRcdFx0XHRiczIgPSB2biArIFwicHhcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHJlbCkge1xuXHRcdFx0XHRcdFx0ZXMgPSAocGFyc2VGbG9hdChicykgKyBlbikgKyBlc2Z4O1xuXHRcdFx0XHRcdFx0ZXMyID0gKHBhcnNlRmxvYXQoYnMyKSArIGVuKSArIGVzZng7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHB0ID0gX3BhcnNlQ29tcGxleChzdHlsZSwgcHJvcHNbaV0sIGJzICsgXCIgXCIgKyBiczIsIGVzICsgXCIgXCIgKyBlczIsIGZhbHNlLCBcIjBweFwiLCBwdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcHQ7XG5cdFx0fSwgcHJlZml4OnRydWUsIGZvcm1hdHRlcjpfZ2V0Rm9ybWF0dGVyKFwiMHB4IDBweCAwcHggMHB4XCIsIGZhbHNlLCB0cnVlKX0pO1xuXHRcdF9yZWdpc3RlckNvbXBsZXhTcGVjaWFsUHJvcChcImJhY2tncm91bmRQb3NpdGlvblwiLCB7ZGVmYXVsdFZhbHVlOlwiMCAwXCIsIHBhcnNlcjpmdW5jdGlvbih0LCBlLCBwLCBjc3NwLCBwdCwgcGx1Z2luKSB7XG5cdFx0XHR2YXIgYnAgPSBcImJhY2tncm91bmQtcG9zaXRpb25cIixcblx0XHRcdFx0Y3MgPSAoX2NzIHx8IF9nZXRDb21wdXRlZFN0eWxlKHQsIG51bGwpKSxcblx0XHRcdFx0YnMgPSB0aGlzLmZvcm1hdCggKChjcykgPyBfaWVWZXJzID8gY3MuZ2V0UHJvcGVydHlWYWx1ZShicCArIFwiLXhcIikgKyBcIiBcIiArIGNzLmdldFByb3BlcnR5VmFsdWUoYnAgKyBcIi15XCIpIDogY3MuZ2V0UHJvcGVydHlWYWx1ZShicCkgOiB0LmN1cnJlbnRTdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YICsgXCIgXCIgKyB0LmN1cnJlbnRTdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25ZKSB8fCBcIjAgMFwiKSwgLy9JbnRlcm5ldCBFeHBsb3JlciBkb2Vzbid0IHJlcG9ydCBiYWNrZ3JvdW5kLXBvc2l0aW9uIGNvcnJlY3RseSAtIHdlIG11c3QgcXVlcnkgYmFja2dyb3VuZC1wb3NpdGlvbi14IGFuZCBiYWNrZ3JvdW5kLXBvc2l0aW9uLXkgYW5kIGNvbWJpbmUgdGhlbSAoZXZlbiBpbiBJRTEwKS4gQmVmb3JlIElFOSwgd2UgbXVzdCBkbyB0aGUgc2FtZSB3aXRoIHRoZSBjdXJyZW50U3R5bGUgb2JqZWN0IGFuZCB1c2UgY2FtZWxDYXNlXG5cdFx0XHRcdGVzID0gdGhpcy5mb3JtYXQoZSksXG5cdFx0XHRcdGJhLCBlYSwgaSwgcGN0LCBvdmVybGFwLCBzcmM7XG5cdFx0XHRpZiAoKGJzLmluZGV4T2YoXCIlXCIpICE9PSAtMSkgIT09IChlcy5pbmRleE9mKFwiJVwiKSAhPT0gLTEpKSB7XG5cdFx0XHRcdHNyYyA9IF9nZXRTdHlsZSh0LCBcImJhY2tncm91bmRJbWFnZVwiKS5yZXBsYWNlKF91cmxFeHAsIFwiXCIpO1xuXHRcdFx0XHRpZiAoc3JjICYmIHNyYyAhPT0gXCJub25lXCIpIHtcblx0XHRcdFx0XHRiYSA9IGJzLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0XHRlYSA9IGVzLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0XHRfdGVtcEltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTsgLy9zZXQgdGhlIHRlbXAgSU1HJ3Mgc3JjIHRvIHRoZSBiYWNrZ3JvdW5kLWltYWdlIHNvIHRoYXQgd2UgY2FuIG1lYXN1cmUgaXRzIHdpZHRoL2hlaWdodFxuXHRcdFx0XHRcdGkgPSAyO1xuXHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0YnMgPSBiYVtpXTtcblx0XHRcdFx0XHRcdHBjdCA9IChicy5pbmRleE9mKFwiJVwiKSAhPT0gLTEpO1xuXHRcdFx0XHRcdFx0aWYgKHBjdCAhPT0gKGVhW2ldLmluZGV4T2YoXCIlXCIpICE9PSAtMSkpIHtcblx0XHRcdFx0XHRcdFx0b3ZlcmxhcCA9IChpID09PSAwKSA/IHQub2Zmc2V0V2lkdGggLSBfdGVtcEltZy53aWR0aCA6IHQub2Zmc2V0SGVpZ2h0IC0gX3RlbXBJbWcuaGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHRiYVtpXSA9IHBjdCA/IChwYXJzZUZsb2F0KGJzKSAvIDEwMCAqIG92ZXJsYXApICsgXCJweFwiIDogKHBhcnNlRmxvYXQoYnMpIC8gb3ZlcmxhcCAqIDEwMCkgKyBcIiVcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnMgPSBiYS5qb2luKFwiIFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wbGV4KHQuc3R5bGUsIGJzLCBlcywgcHQsIHBsdWdpbik7XG5cdFx0fSwgZm9ybWF0dGVyOl9wYXJzZVBvc2l0aW9ufSk7XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiYmFja2dyb3VuZFNpemVcIiwge2RlZmF1bHRWYWx1ZTpcIjAgMFwiLCBmb3JtYXR0ZXI6X3BhcnNlUG9zaXRpb259KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJwZXJzcGVjdGl2ZVwiLCB7ZGVmYXVsdFZhbHVlOlwiMHB4XCIsIHByZWZpeDp0cnVlfSk7XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwicGVyc3BlY3RpdmVPcmlnaW5cIiwge2RlZmF1bHRWYWx1ZTpcIjUwJSA1MCVcIiwgcHJlZml4OnRydWV9KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJ0cmFuc2Zvcm1TdHlsZVwiLCB7cHJlZml4OnRydWV9KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJiYWNrZmFjZVZpc2liaWxpdHlcIiwge3ByZWZpeDp0cnVlfSk7XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwidXNlclNlbGVjdFwiLCB7cHJlZml4OnRydWV9KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJtYXJnaW5cIiwge3BhcnNlcjpfZ2V0RWRnZVBhcnNlcihcIm1hcmdpblRvcCxtYXJnaW5SaWdodCxtYXJnaW5Cb3R0b20sbWFyZ2luTGVmdFwiKX0pO1xuXHRcdF9yZWdpc3RlckNvbXBsZXhTcGVjaWFsUHJvcChcInBhZGRpbmdcIiwge3BhcnNlcjpfZ2V0RWRnZVBhcnNlcihcInBhZGRpbmdUb3AscGFkZGluZ1JpZ2h0LHBhZGRpbmdCb3R0b20scGFkZGluZ0xlZnRcIil9KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJjbGlwXCIsIHtkZWZhdWx0VmFsdWU6XCJyZWN0KDBweCwwcHgsMHB4LDBweClcIiwgcGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4pe1xuXHRcdFx0dmFyIGIsIGNzLCBkZWxpbTtcblx0XHRcdGlmIChfaWVWZXJzIDwgOSkgeyAvL0lFOCBhbmQgZWFybGllciBkb24ndCByZXBvcnQgYSBcImNsaXBcIiB2YWx1ZSBpbiB0aGUgY3VycmVudFN0eWxlIC0gaW5zdGVhZCwgdGhlIHZhbHVlcyBhcmUgc3BsaXQgYXBhcnQgaW50byBjbGlwVG9wLCBjbGlwUmlnaHQsIGNsaXBCb3R0b20sIGFuZCBjbGlwTGVmdC4gQWxzbywgaW4gSUU3IGFuZCBlYXJsaWVyLCB0aGUgdmFsdWVzIGluc2lkZSByZWN0KCkgYXJlIHNwYWNlLWRlbGltaXRlZCwgbm90IGNvbW1hLWRlbGltaXRlZC5cblx0XHRcdFx0Y3MgPSB0LmN1cnJlbnRTdHlsZTtcblx0XHRcdFx0ZGVsaW0gPSBfaWVWZXJzIDwgOCA/IFwiIFwiIDogXCIsXCI7XG5cdFx0XHRcdGIgPSBcInJlY3QoXCIgKyBjcy5jbGlwVG9wICsgZGVsaW0gKyBjcy5jbGlwUmlnaHQgKyBkZWxpbSArIGNzLmNsaXBCb3R0b20gKyBkZWxpbSArIGNzLmNsaXBMZWZ0ICsgXCIpXCI7XG5cdFx0XHRcdGUgPSB0aGlzLmZvcm1hdChlKS5zcGxpdChcIixcIikuam9pbihkZWxpbSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRiID0gdGhpcy5mb3JtYXQoX2dldFN0eWxlKHQsIHRoaXMucCwgX2NzLCBmYWxzZSwgdGhpcy5kZmx0KSk7XG5cdFx0XHRcdGUgPSB0aGlzLmZvcm1hdChlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLnBhcnNlQ29tcGxleCh0LnN0eWxlLCBiLCBlLCBwdCwgcGx1Z2luKTtcblx0XHR9fSk7XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwidGV4dFNoYWRvd1wiLCB7ZGVmYXVsdFZhbHVlOlwiMHB4IDBweCAwcHggIzk5OVwiLCBjb2xvcjp0cnVlLCBtdWx0aTp0cnVlfSk7XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiYXV0b1JvdW5kLHN0cmljdFVuaXRzXCIsIHtwYXJzZXI6ZnVuY3Rpb24odCwgZSwgcCwgY3NzcCwgcHQpIHtyZXR1cm4gcHQ7fX0pOyAvL2p1c3Qgc28gdGhhdCB3ZSBjYW4gaWdub3JlIHRoZXNlIHByb3BlcnRpZXMgKG5vdCB0d2VlbiB0aGVtKVxuXHRcdF9yZWdpc3RlckNvbXBsZXhTcGVjaWFsUHJvcChcImJvcmRlclwiLCB7ZGVmYXVsdFZhbHVlOlwiMHB4IHNvbGlkICMwMDBcIiwgcGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucGFyc2VDb21wbGV4KHQuc3R5bGUsIHRoaXMuZm9ybWF0KF9nZXRTdHlsZSh0LCBcImJvcmRlclRvcFdpZHRoXCIsIF9jcywgZmFsc2UsIFwiMHB4XCIpICsgXCIgXCIgKyBfZ2V0U3R5bGUodCwgXCJib3JkZXJUb3BTdHlsZVwiLCBfY3MsIGZhbHNlLCBcInNvbGlkXCIpICsgXCIgXCIgKyBfZ2V0U3R5bGUodCwgXCJib3JkZXJUb3BDb2xvclwiLCBfY3MsIGZhbHNlLCBcIiMwMDBcIikpLCB0aGlzLmZvcm1hdChlKSwgcHQsIHBsdWdpbik7XG5cdFx0XHR9LCBjb2xvcjp0cnVlLCBmb3JtYXR0ZXI6ZnVuY3Rpb24odikge1xuXHRcdFx0XHR2YXIgYSA9IHYuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRyZXR1cm4gYVswXSArIFwiIFwiICsgKGFbMV0gfHwgXCJzb2xpZFwiKSArIFwiIFwiICsgKHYubWF0Y2goX2NvbG9yRXhwKSB8fCBbXCIjMDAwXCJdKVswXTtcblx0XHRcdH19KTtcblx0XHRfcmVnaXN0ZXJDb21wbGV4U3BlY2lhbFByb3AoXCJib3JkZXJXaWR0aFwiLCB7cGFyc2VyOl9nZXRFZGdlUGFyc2VyKFwiYm9yZGVyVG9wV2lkdGgsYm9yZGVyUmlnaHRXaWR0aCxib3JkZXJCb3R0b21XaWR0aCxib3JkZXJMZWZ0V2lkdGhcIil9KTsgLy9GaXJlZm94IGRvZXNuJ3QgcGljayB1cCBvbiBib3JkZXJXaWR0aCBzZXQgaW4gc3R5bGUgc2hlZXRzIChvbmx5IGlubGluZSkuXG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiZmxvYXQsY3NzRmxvYXQsc3R5bGVGbG9hdFwiLCB7cGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4pIHtcblx0XHRcdHZhciBzID0gdC5zdHlsZSxcblx0XHRcdFx0cHJvcCA9IChcImNzc0Zsb2F0XCIgaW4gcykgPyBcImNzc0Zsb2F0XCIgOiBcInN0eWxlRmxvYXRcIjtcblx0XHRcdHJldHVybiBuZXcgQ1NTUHJvcFR3ZWVuKHMsIHByb3AsIDAsIDAsIHB0LCAtMSwgcCwgZmFsc2UsIDAsIHNbcHJvcF0sIGUpO1xuXHRcdH19KTtcblxuXHRcdC8vb3BhY2l0eS1yZWxhdGVkXG5cdFx0dmFyIF9zZXRJRU9wYWNpdHlSYXRpbyA9IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0dmFyIHQgPSB0aGlzLnQsIC8vcmVmZXJzIHRvIHRoZSBlbGVtZW50J3Mgc3R5bGUgcHJvcGVydHlcblx0XHRcdFx0XHRmaWx0ZXJzID0gdC5maWx0ZXIgfHwgX2dldFN0eWxlKHRoaXMuZGF0YSwgXCJmaWx0ZXJcIikgfHwgXCJcIixcblx0XHRcdFx0XHR2YWwgPSAodGhpcy5zICsgdGhpcy5jICogdikgfCAwLFxuXHRcdFx0XHRcdHNraXA7XG5cdFx0XHRcdGlmICh2YWwgPT09IDEwMCkgeyAvL2ZvciBvbGRlciB2ZXJzaW9ucyBvZiBJRSB0aGF0IG5lZWQgdG8gdXNlIGEgZmlsdGVyIHRvIGFwcGx5IG9wYWNpdHksIHdlIHNob3VsZCByZW1vdmUgdGhlIGZpbHRlciBpZiBvcGFjaXR5IGhpdHMgMSBpbiBvcmRlciB0byBpbXByb3ZlIHBlcmZvcm1hbmNlLCBidXQgbWFrZSBzdXJlIHRoZXJlIGlzbid0IGEgdHJhbnNmb3JtIChtYXRyaXgpIG9yIGdyYWRpZW50IGluIHRoZSBmaWx0ZXJzLlxuXHRcdFx0XHRcdGlmIChmaWx0ZXJzLmluZGV4T2YoXCJhdHJpeChcIikgPT09IC0xICYmIGZpbHRlcnMuaW5kZXhPZihcInJhZGllbnQoXCIpID09PSAtMSAmJiBmaWx0ZXJzLmluZGV4T2YoXCJvYWRlcihcIikgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0LnJlbW92ZUF0dHJpYnV0ZShcImZpbHRlclwiKTtcblx0XHRcdFx0XHRcdHNraXAgPSAoIV9nZXRTdHlsZSh0aGlzLmRhdGEsIFwiZmlsdGVyXCIpKTsgLy9pZiBhIGNsYXNzIGlzIGFwcGxpZWQgdGhhdCBoYXMgYW4gYWxwaGEgZmlsdGVyLCBpdCB3aWxsIHRha2UgZWZmZWN0ICh3ZSBkb24ndCB3YW50IHRoYXQpLCBzbyByZS1hcHBseSBvdXIgYWxwaGEgZmlsdGVyIGluIHRoYXQgY2FzZS4gV2UgbXVzdCBmaXJzdCByZW1vdmUgaXQgYW5kIHRoZW4gY2hlY2suXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHQuZmlsdGVyID0gZmlsdGVycy5yZXBsYWNlKF9hbHBoYUZpbHRlckV4cCwgXCJcIik7XG5cdFx0XHRcdFx0XHRza2lwID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFza2lwKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMueG4xKSB7XG5cdFx0XHRcdFx0XHR0LmZpbHRlciA9IGZpbHRlcnMgPSBmaWx0ZXJzIHx8IChcImFscGhhKG9wYWNpdHk9XCIgKyB2YWwgKyBcIilcIik7IC8vd29ya3MgYXJvdW5kIGJ1ZyBpbiBJRTcvOCB0aGF0IHByZXZlbnRzIGNoYW5nZXMgdG8gXCJ2aXNpYmlsaXR5XCIgZnJvbSBiZWluZyBhcHBsaWVkIHByb3Blcmx5IGlmIHRoZSBmaWx0ZXIgaXMgY2hhbmdlZCB0byBhIGRpZmZlcmVudCBhbHBoYSBvbiB0aGUgc2FtZSBmcmFtZS5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGZpbHRlcnMuaW5kZXhPZihcInBhY2l0eVwiKSA9PT0gLTEpIHsgLy9vbmx5IHVzZWQgaWYgYnJvd3NlciBkb2Vzbid0IHN1cHBvcnQgdGhlIHN0YW5kYXJkIG9wYWNpdHkgc3R5bGUgcHJvcGVydHkgKElFIDcgYW5kIDgpLiBXZSBvbWl0IHRoZSBcIk9cIiB0byBhdm9pZCBjYXNlLXNlbnNpdGl2aXR5IGlzc3Vlc1xuXHRcdFx0XHRcdFx0aWYgKHZhbCAhPT0gMCB8fCAhdGhpcy54bjEpIHsgLy9idWdzIGluIElFNy84IHdvbid0IHJlbmRlciB0aGUgZmlsdGVyIHByb3Blcmx5IGlmIG9wYWNpdHkgaXMgQURERUQgb24gdGhlIHNhbWUgZnJhbWUvcmVuZGVyIGFzIFwidmlzaWJpbGl0eVwiIGNoYW5nZXMgKHRoaXMueG4xIGlzIDEgaWYgdGhpcyB0d2VlbiBpcyBhbiBcImF1dG9BbHBoYVwiIHR3ZWVuKVxuXHRcdFx0XHRcdFx0XHR0LmZpbHRlciA9IGZpbHRlcnMgKyBcIiBhbHBoYShvcGFjaXR5PVwiICsgdmFsICsgXCIpXCI7IC8vd2Ugcm91bmQgdGhlIHZhbHVlIGJlY2F1c2Ugb3RoZXJ3aXNlLCBidWdzIGluIElFNy84IGNhbiBwcmV2ZW50IFwidmlzaWJpbGl0eVwiIGNoYW5nZXMgZnJvbSBiZWluZyBhcHBsaWVkIHByb3Blcmx5LlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0LmZpbHRlciA9IGZpbHRlcnMucmVwbGFjZShfb3BhY2l0eUV4cCwgXCJvcGFjaXR5PVwiICsgdmFsKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwib3BhY2l0eSxhbHBoYSxhdXRvQWxwaGFcIiwge2RlZmF1bHRWYWx1ZTpcIjFcIiwgcGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0LCBwbHVnaW4pIHtcblx0XHRcdHZhciBiID0gcGFyc2VGbG9hdChfZ2V0U3R5bGUodCwgXCJvcGFjaXR5XCIsIF9jcywgZmFsc2UsIFwiMVwiKSksXG5cdFx0XHRcdHN0eWxlID0gdC5zdHlsZSxcblx0XHRcdFx0aXNBdXRvQWxwaGEgPSAocCA9PT0gXCJhdXRvQWxwaGFcIik7XG5cdFx0XHRpZiAodHlwZW9mKGUpID09PSBcInN0cmluZ1wiICYmIGUuY2hhckF0KDEpID09PSBcIj1cIikge1xuXHRcdFx0XHRlID0gKChlLmNoYXJBdCgwKSA9PT0gXCItXCIpID8gLTEgOiAxKSAqIHBhcnNlRmxvYXQoZS5zdWJzdHIoMikpICsgYjtcblx0XHRcdH1cblx0XHRcdGlmIChpc0F1dG9BbHBoYSAmJiBiID09PSAxICYmIF9nZXRTdHlsZSh0LCBcInZpc2liaWxpdHlcIiwgX2NzKSA9PT0gXCJoaWRkZW5cIiAmJiBlICE9PSAwKSB7IC8vaWYgdmlzaWJpbGl0eSBpcyBpbml0aWFsbHkgc2V0IHRvIFwiaGlkZGVuXCIsIHdlIHNob3VsZCBpbnRlcnByZXQgdGhhdCBhcyBpbnRlbnQgdG8gbWFrZSBvcGFjaXR5IDAgKGEgY29udmVuaWVuY2UpXG5cdFx0XHRcdGIgPSAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKF9zdXBwb3J0c09wYWNpdHkpIHtcblx0XHRcdFx0cHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHN0eWxlLCBcIm9wYWNpdHlcIiwgYiwgZSAtIGIsIHB0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHB0ID0gbmV3IENTU1Byb3BUd2VlbihzdHlsZSwgXCJvcGFjaXR5XCIsIGIgKiAxMDAsIChlIC0gYikgKiAxMDAsIHB0KTtcblx0XHRcdFx0cHQueG4xID0gaXNBdXRvQWxwaGEgPyAxIDogMDsgLy93ZSBuZWVkIHRvIHJlY29yZCB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIGFuIGF1dG9BbHBoYSBzbyB0aGF0IGluIHRoZSBzZXRSYXRpbygpLCB3ZSBrbm93IHRvIGR1cGxpY2F0ZSB0aGUgc2V0dGluZyBvZiB0aGUgYWxwaGEgaW4gb3JkZXIgdG8gd29yayBhcm91bmQgYSBidWcgaW4gSUU3IGFuZCBJRTggdGhhdCBwcmV2ZW50cyBjaGFuZ2VzIHRvIFwidmlzaWJpbGl0eVwiIGZyb20gdGFraW5nIGVmZmVjdCBpZiB0aGUgZmlsdGVyIGlzIGNoYW5nZWQgdG8gYSBkaWZmZXJlbnQgYWxwaGEob3BhY2l0eSkgYXQgdGhlIHNhbWUgdGltZS4gU2V0dGluZyBpdCB0byB0aGUgU0FNRSB2YWx1ZSBmaXJzdCwgdGhlbiB0aGUgbmV3IHZhbHVlIHdvcmtzIGFyb3VuZCB0aGUgSUU3LzggYnVnLlxuXHRcdFx0XHRzdHlsZS56b29tID0gMTsgLy9oZWxwcyBjb3JyZWN0IGFuIElFIGlzc3VlLlxuXHRcdFx0XHRwdC50eXBlID0gMjtcblx0XHRcdFx0cHQuYiA9IFwiYWxwaGEob3BhY2l0eT1cIiArIHB0LnMgKyBcIilcIjtcblx0XHRcdFx0cHQuZSA9IFwiYWxwaGEob3BhY2l0eT1cIiArIChwdC5zICsgcHQuYykgKyBcIilcIjtcblx0XHRcdFx0cHQuZGF0YSA9IHQ7XG5cdFx0XHRcdHB0LnBsdWdpbiA9IHBsdWdpbjtcblx0XHRcdFx0cHQuc2V0UmF0aW8gPSBfc2V0SUVPcGFjaXR5UmF0aW87XG5cdFx0XHR9XG5cdFx0XHRpZiAoaXNBdXRvQWxwaGEpIHsgLy93ZSBoYXZlIHRvIGNyZWF0ZSB0aGUgXCJ2aXNpYmlsaXR5XCIgUHJvcFR3ZWVuIGFmdGVyIHRoZSBvcGFjaXR5IG9uZSBpbiB0aGUgbGlua2VkIGxpc3Qgc28gdGhhdCB0aGV5IHJ1biBpbiB0aGUgb3JkZXIgdGhhdCB3b3JrcyBwcm9wZXJseSBpbiBJRTggYW5kIGVhcmxpZXJcblx0XHRcdFx0cHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHN0eWxlLCBcInZpc2liaWxpdHlcIiwgMCwgMCwgcHQsIC0xLCBudWxsLCBmYWxzZSwgMCwgKChiICE9PSAwKSA/IFwiaW5oZXJpdFwiIDogXCJoaWRkZW5cIiksICgoZSA9PT0gMCkgPyBcImhpZGRlblwiIDogXCJpbmhlcml0XCIpKTtcblx0XHRcdFx0cHQueHMwID0gXCJpbmhlcml0XCI7XG5cdFx0XHRcdGNzc3AuX292ZXJ3cml0ZVByb3BzLnB1c2gocHQubik7XG5cdFx0XHRcdGNzc3AuX292ZXJ3cml0ZVByb3BzLnB1c2gocCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcHQ7XG5cdFx0fX0pO1xuXG5cblx0XHR2YXIgX3JlbW92ZVByb3AgPSBmdW5jdGlvbihzLCBwKSB7XG5cdFx0XHRcdGlmIChwKSB7XG5cdFx0XHRcdFx0aWYgKHMucmVtb3ZlUHJvcGVydHkpIHtcblx0XHRcdFx0XHRcdGlmIChwLnN1YnN0cigwLDIpID09PSBcIm1zXCIgfHwgcC5zdWJzdHIoMCw2KSA9PT0gXCJ3ZWJraXRcIikgeyAvL01pY3Jvc29mdCBhbmQgc29tZSBXZWJraXQgYnJvd3NlcnMgZG9uJ3QgY29uZm9ybSB0byB0aGUgc3RhbmRhcmQgb2YgY2FwaXRhbGl6aW5nIHRoZSBmaXJzdCBwcmVmaXggY2hhcmFjdGVyLCBzbyB3ZSBhZGp1c3Qgc28gdGhhdCB3aGVuIHdlIHByZWZpeCB0aGUgY2FwcyB3aXRoIGEgZGFzaCwgaXQncyBjb3JyZWN0IChvdGhlcndpc2UgaXQnZCBiZSBcIm1zLXRyYW5zZm9ybVwiIGluc3RlYWQgb2YgXCItbXMtdHJhbnNmb3JtXCIgZm9yIElFOSwgZm9yIGV4YW1wbGUpXG5cdFx0XHRcdFx0XHRcdHAgPSBcIi1cIiArIHA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzLnJlbW92ZVByb3BlcnR5KHAucmVwbGFjZShfY2Fwc0V4cCwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG5cdFx0XHRcdFx0fSBlbHNlIHsgLy9ub3RlOiBvbGQgdmVyc2lvbnMgb2YgSUUgdXNlIFwicmVtb3ZlQXR0cmlidXRlKClcIiBpbnN0ZWFkIG9mIFwicmVtb3ZlUHJvcGVydHkoKVwiXG5cdFx0XHRcdFx0XHRzLnJlbW92ZUF0dHJpYnV0ZShwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRfc2V0Q2xhc3NOYW1lUmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHRoaXMudC5fZ3NDbGFzc1BUID0gdGhpcztcblx0XHRcdFx0aWYgKHYgPT09IDEgfHwgdiA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCAodiA9PT0gMCkgPyB0aGlzLmIgOiB0aGlzLmUpO1xuXHRcdFx0XHRcdHZhciBtcHQgPSB0aGlzLmRhdGEsIC8vZmlyc3QgTWluaVByb3BUd2VlblxuXHRcdFx0XHRcdFx0cyA9IHRoaXMudC5zdHlsZTtcblx0XHRcdFx0XHR3aGlsZSAobXB0KSB7XG5cdFx0XHRcdFx0XHRpZiAoIW1wdC52KSB7XG5cdFx0XHRcdFx0XHRcdF9yZW1vdmVQcm9wKHMsIG1wdC5wKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNbbXB0LnBdID0gbXB0LnY7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtcHQgPSBtcHQuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh2ID09PSAxICYmIHRoaXMudC5fZ3NDbGFzc1BUID09PSB0aGlzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnQuX2dzQ2xhc3NQVCA9IG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSAhPT0gdGhpcy5lKSB7XG5cdFx0XHRcdFx0dGhpcy50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiY2xhc3NOYW1lXCIsIHtwYXJzZXI6ZnVuY3Rpb24odCwgZSwgcCwgY3NzcCwgcHQsIHBsdWdpbiwgdmFycykge1xuXHRcdFx0dmFyIGIgPSB0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIsIC8vZG9uJ3QgdXNlIHQuY2xhc3NOYW1lIGJlY2F1c2UgaXQgZG9lc24ndCB3b3JrIGNvbnNpc3RlbnRseSBvbiBTVkcgZWxlbWVudHM7IGdldEF0dHJpYnV0ZShcImNsYXNzXCIpIGFuZCBzZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB2YWx1ZVwiKSBpcyBtb3JlIHJlbGlhYmxlLlxuXHRcdFx0XHRjc3NUZXh0ID0gdC5zdHlsZS5jc3NUZXh0LFxuXHRcdFx0XHRkaWZEYXRhLCBicywgY25wdCwgY25wdExvb2t1cCwgbXB0O1xuXHRcdFx0cHQgPSBjc3NwLl9jbGFzc05hbWVQVCA9IG5ldyBDU1NQcm9wVHdlZW4odCwgcCwgMCwgMCwgcHQsIDIpO1xuXHRcdFx0cHQuc2V0UmF0aW8gPSBfc2V0Q2xhc3NOYW1lUmF0aW87XG5cdFx0XHRwdC5wciA9IC0xMTtcblx0XHRcdF9oYXNQcmlvcml0eSA9IHRydWU7XG5cdFx0XHRwdC5iID0gYjtcblx0XHRcdGJzID0gX2dldEFsbFN0eWxlcyh0LCBfY3MpO1xuXHRcdFx0Ly9pZiB0aGVyZSdzIGEgY2xhc3NOYW1lIHR3ZWVuIGFscmVhZHkgb3BlcmF0aW5nIG9uIHRoZSB0YXJnZXQsIGZvcmNlIGl0IHRvIGl0cyBlbmQgc28gdGhhdCB0aGUgbmVjZXNzYXJ5IGlubGluZSBzdHlsZXMgYXJlIHJlbW92ZWQgYW5kIHRoZSBjbGFzcyBuYW1lIGlzIGFwcGxpZWQgYmVmb3JlIHdlIGRldGVybWluZSB0aGUgZW5kIHN0YXRlICh3ZSBkb24ndCB3YW50IGlubGluZSBzdHlsZXMgaW50ZXJmZXJpbmcgdGhhdCB3ZXJlIHRoZXJlIGp1c3QgZm9yIGNsYXNzLXNwZWNpZmljIHZhbHVlcylcblx0XHRcdGNucHQgPSB0Ll9nc0NsYXNzUFQ7XG5cdFx0XHRpZiAoY25wdCkge1xuXHRcdFx0XHRjbnB0TG9va3VwID0ge307XG5cdFx0XHRcdG1wdCA9IGNucHQuZGF0YTsgLy9maXJzdCBNaW5pUHJvcFR3ZWVuIHdoaWNoIHN0b3JlcyB0aGUgaW5saW5lIHN0eWxlcyAtIHdlIG5lZWQgdG8gZm9yY2UgdGhlc2Ugc28gdGhhdCB0aGUgaW5saW5lIHN0eWxlcyBkb24ndCBjb250YW1pbmF0ZSB0aGluZ3MuIE90aGVyd2lzZSwgdGhlcmUncyBhIHNtYWxsIGNoYW5jZSB0aGF0IGEgdHdlZW4gY291bGQgc3RhcnQgYW5kIHRoZSBpbmxpbmUgdmFsdWVzIG1hdGNoIHRoZSBkZXN0aW5hdGlvbiB2YWx1ZXMgYW5kIHRoZXkgbmV2ZXIgZ2V0IGNsZWFuZWQuXG5cdFx0XHRcdHdoaWxlIChtcHQpIHtcblx0XHRcdFx0XHRjbnB0TG9va3VwW21wdC5wXSA9IDE7XG5cdFx0XHRcdFx0bXB0ID0gbXB0Ll9uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNucHQuc2V0UmF0aW8oMSk7XG5cdFx0XHR9XG5cdFx0XHR0Ll9nc0NsYXNzUFQgPSBwdDtcblx0XHRcdHB0LmUgPSAoZS5jaGFyQXQoMSkgIT09IFwiPVwiKSA/IGUgOiBiLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFxzKlxcXFxiXCIgKyBlLnN1YnN0cigyKSArIFwiXFxcXGJcIiksIFwiXCIpICsgKChlLmNoYXJBdCgwKSA9PT0gXCIrXCIpID8gXCIgXCIgKyBlLnN1YnN0cigyKSA6IFwiXCIpO1xuXHRcdFx0dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBwdC5lKTtcblx0XHRcdGRpZkRhdGEgPSBfY3NzRGlmKHQsIGJzLCBfZ2V0QWxsU3R5bGVzKHQpLCB2YXJzLCBjbnB0TG9va3VwKTtcblx0XHRcdHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYik7XG5cdFx0XHRwdC5kYXRhID0gZGlmRGF0YS5maXJzdE1QVDtcblx0XHRcdHQuc3R5bGUuY3NzVGV4dCA9IGNzc1RleHQ7IC8vd2UgcmVjb3JkZWQgY3NzVGV4dCBiZWZvcmUgd2Ugc3dhcHBlZCBjbGFzc2VzIGFuZCByYW4gX2dldEFsbFN0eWxlcygpIGJlY2F1c2UgaW4gY2FzZXMgd2hlbiBhIGNsYXNzTmFtZSB0d2VlbiBpcyBvdmVyd3JpdHRlbiwgd2UgcmVtb3ZlIGFsbCB0aGUgcmVsYXRlZCB0d2VlbmluZyBwcm9wZXJ0aWVzIGZyb20gdGhhdCBjbGFzcyBjaGFuZ2UgKG90aGVyd2lzZSBjbGFzcy1zcGVjaWZpYyBzdHVmZiBjYW4ndCBvdmVycmlkZSBwcm9wZXJ0aWVzIHdlJ3ZlIGRpcmVjdGx5IHNldCBvbiB0aGUgdGFyZ2V0J3Mgc3R5bGUgb2JqZWN0IGR1ZSB0byBzcGVjaWZpY2l0eSkuXG5cdFx0XHRwdCA9IHB0LnhmaXJzdCA9IGNzc3AucGFyc2UodCwgZGlmRGF0YS5kaWZzLCBwdCwgcGx1Z2luKTsgLy93ZSByZWNvcmQgdGhlIENTU1Byb3BUd2VlbiBhcyB0aGUgeGZpcnN0IHNvIHRoYXQgd2UgY2FuIGhhbmRsZSBvdmVyd3JpdGluZyBwcm9wZXJ0bHkgKGlmIFwiY2xhc3NOYW1lXCIgZ2V0cyBvdmVyd3JpdHRlbiwgd2UgbXVzdCBraWxsIGFsbCB0aGUgcHJvcGVydGllcyBhc3NvY2lhdGVkIHdpdGggdGhlIGNsYXNzTmFtZSBwYXJ0IG9mIHRoZSB0d2Vlbiwgc28gd2UgY2FuIGxvb3AgdGhyb3VnaCBmcm9tIHhmaXJzdCB0byB0aGUgcHQgaXRzZWxmKVxuXHRcdFx0cmV0dXJuIHB0O1xuXHRcdH19KTtcblxuXG5cdFx0dmFyIF9zZXRDbGVhclByb3BzUmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRpZiAodiA9PT0gMSB8fCB2ID09PSAwKSBpZiAodGhpcy5kYXRhLl90b3RhbFRpbWUgPT09IHRoaXMuZGF0YS5fdG90YWxEdXJhdGlvbiAmJiB0aGlzLmRhdGEuZGF0YSAhPT0gXCJpc0Zyb21TdGFydFwiKSB7IC8vdGhpcy5kYXRhIHJlZmVycyB0byB0aGUgdHdlZW4uIE9ubHkgY2xlYXIgYXQgdGhlIEVORCBvZiB0aGUgdHdlZW4gKHJlbWVtYmVyLCBmcm9tKCkgdHdlZW5zIG1ha2UgdGhlIHJhdGlvIGdvIGZyb20gMSB0byAwLCBzbyB3ZSBjYW4ndCBqdXN0IGNoZWNrIHRoYXQgYW5kIGlmIHRoZSB0d2VlbiBpcyB0aGUgemVyby1kdXJhdGlvbiBvbmUgdGhhdCdzIGNyZWF0ZWQgaW50ZXJuYWxseSB0byByZW5kZXIgdGhlIHN0YXJ0aW5nIHZhbHVlcyBpbiBhIGZyb20oKSB0d2VlbiwgaWdub3JlIHRoYXQgYmVjYXVzZSBvdGhlcndpc2UsIGZvciBleGFtcGxlLCBmcm9tKC4uLntoZWlnaHQ6MTAwLCBjbGVhclByb3BzOlwiaGVpZ2h0XCIsIGRlbGF5OjF9KSB3b3VsZCB3aXBlIHRoZSBoZWlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdHdlZW4gYW5kIGFmdGVyIDEgc2Vjb25kLCBpdCdkIGtpY2sgYmFjayBpbikuXG5cdFx0XHRcdHZhciBzID0gdGhpcy50LnN0eWxlLFxuXHRcdFx0XHRcdHRyYW5zZm9ybVBhcnNlID0gX3NwZWNpYWxQcm9wcy50cmFuc2Zvcm0ucGFyc2UsXG5cdFx0XHRcdFx0YSwgcCwgaSwgY2xlYXJUcmFuc2Zvcm0sIHRyYW5zZm9ybTtcblx0XHRcdFx0aWYgKHRoaXMuZSA9PT0gXCJhbGxcIikge1xuXHRcdFx0XHRcdHMuY3NzVGV4dCA9IFwiXCI7XG5cdFx0XHRcdFx0Y2xlYXJUcmFuc2Zvcm0gPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGEgPSB0aGlzLmUuc3BsaXQoXCIgXCIpLmpvaW4oXCJcIikuc3BsaXQoXCIsXCIpO1xuXHRcdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRcdHAgPSBhW2ldO1xuXHRcdFx0XHRcdFx0aWYgKF9zcGVjaWFsUHJvcHNbcF0pIHtcblx0XHRcdFx0XHRcdFx0aWYgKF9zcGVjaWFsUHJvcHNbcF0ucGFyc2UgPT09IHRyYW5zZm9ybVBhcnNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xlYXJUcmFuc2Zvcm0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHAgPSAocCA9PT0gXCJ0cmFuc2Zvcm1PcmlnaW5cIikgPyBfdHJhbnNmb3JtT3JpZ2luUHJvcCA6IF9zcGVjaWFsUHJvcHNbcF0ucDsgLy9lbnN1cmVzIHRoYXQgc3BlY2lhbCBwcm9wZXJ0aWVzIHVzZSB0aGUgcHJvcGVyIGJyb3dzZXItc3BlY2lmaWMgcHJvcGVydHkgbmFtZSwgbGlrZSBcInNjYWxlWFwiIG1pZ2h0IGJlIFwiLXdlYmtpdC10cmFuc2Zvcm1cIiBvciBcImJveFNoYWRvd1wiIG1pZ2h0IGJlIFwiLW1vei1ib3gtc2hhZG93XCJcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0X3JlbW92ZVByb3AocywgcCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjbGVhclRyYW5zZm9ybSkge1xuXHRcdFx0XHRcdF9yZW1vdmVQcm9wKHMsIF90cmFuc2Zvcm1Qcm9wKTtcblx0XHRcdFx0XHR0cmFuc2Zvcm0gPSB0aGlzLnQuX2dzVHJhbnNmb3JtO1xuXHRcdFx0XHRcdGlmICh0cmFuc2Zvcm0pIHtcblx0XHRcdFx0XHRcdGlmICh0cmFuc2Zvcm0uc3ZnKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXN2Zy1vcmlnaW5cIik7XG5cdFx0XHRcdFx0XHRcdHRoaXMudC5yZW1vdmVBdHRyaWJ1dGUoXCJ0cmFuc2Zvcm1cIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy50Ll9nc1RyYW5zZm9ybTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXHRcdH07XG5cdFx0X3JlZ2lzdGVyQ29tcGxleFNwZWNpYWxQcm9wKFwiY2xlYXJQcm9wc1wiLCB7cGFyc2VyOmZ1bmN0aW9uKHQsIGUsIHAsIGNzc3AsIHB0KSB7XG5cdFx0XHRwdCA9IG5ldyBDU1NQcm9wVHdlZW4odCwgcCwgMCwgMCwgcHQsIDIpO1xuXHRcdFx0cHQuc2V0UmF0aW8gPSBfc2V0Q2xlYXJQcm9wc1JhdGlvO1xuXHRcdFx0cHQuZSA9IGU7XG5cdFx0XHRwdC5wciA9IC0xMDtcblx0XHRcdHB0LmRhdGEgPSBjc3NwLl90d2Vlbjtcblx0XHRcdF9oYXNQcmlvcml0eSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gcHQ7XG5cdFx0fX0pO1xuXG5cdFx0cCA9IFwiYmV6aWVyLHRocm93UHJvcHMscGh5c2ljc1Byb3BzLHBoeXNpY3MyRFwiLnNwbGl0KFwiLFwiKTtcblx0XHRpID0gcC5sZW5ndGg7XG5cdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0X3JlZ2lzdGVyUGx1Z2luUHJvcChwW2ldKTtcblx0XHR9XG5cblxuXG5cblxuXG5cblxuXHRcdHAgPSBDU1NQbHVnaW4ucHJvdG90eXBlO1xuXHRcdHAuX2ZpcnN0UFQgPSBwLl9sYXN0UGFyc2VkVHJhbnNmb3JtID0gcC5fdHJhbnNmb3JtID0gbnVsbDtcblxuXHRcdC8vZ2V0cyBjYWxsZWQgd2hlbiB0aGUgdHdlZW4gcmVuZGVycyBmb3IgdGhlIGZpcnN0IHRpbWUuIFRoaXMga2lja3MgZXZlcnl0aGluZyBvZmYsIHJlY29yZGluZyBzdGFydC9lbmQgdmFsdWVzLCBldGMuXG5cdFx0cC5fb25Jbml0VHdlZW4gPSBmdW5jdGlvbih0YXJnZXQsIHZhcnMsIHR3ZWVuKSB7XG5cdFx0XHRpZiAoIXRhcmdldC5ub2RlVHlwZSkgeyAvL2NzcyBpcyBvbmx5IGZvciBkb20gZWxlbWVudHNcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0dGhpcy5fdHdlZW4gPSB0d2Vlbjtcblx0XHRcdHRoaXMuX3ZhcnMgPSB2YXJzO1xuXHRcdFx0X2F1dG9Sb3VuZCA9IHZhcnMuYXV0b1JvdW5kO1xuXHRcdFx0X2hhc1ByaW9yaXR5ID0gZmFsc2U7XG5cdFx0XHRfc3VmZml4TWFwID0gdmFycy5zdWZmaXhNYXAgfHwgQ1NTUGx1Z2luLnN1ZmZpeE1hcDtcblx0XHRcdF9jcyA9IF9nZXRDb21wdXRlZFN0eWxlKHRhcmdldCwgXCJcIik7XG5cdFx0XHRfb3ZlcndyaXRlUHJvcHMgPSB0aGlzLl9vdmVyd3JpdGVQcm9wcztcblx0XHRcdHZhciBzdHlsZSA9IHRhcmdldC5zdHlsZSxcblx0XHRcdFx0diwgcHQsIHB0MiwgZmlyc3QsIGxhc3QsIG5leHQsIHpJbmRleCwgdHB0LCB0aHJlZUQ7XG5cdFx0XHRpZiAoX3JlcVNhZmFyaUZpeCkgaWYgKHN0eWxlLnpJbmRleCA9PT0gXCJcIikge1xuXHRcdFx0XHR2ID0gX2dldFN0eWxlKHRhcmdldCwgXCJ6SW5kZXhcIiwgX2NzKTtcblx0XHRcdFx0aWYgKHYgPT09IFwiYXV0b1wiIHx8IHYgPT09IFwiXCIpIHtcblx0XHRcdFx0XHQvL2NvcnJlY3RzIGEgYnVnIGluIFtub24tQW5kcm9pZF0gU2FmYXJpIHRoYXQgcHJldmVudHMgaXQgZnJvbSByZXBhaW50aW5nIGVsZW1lbnRzIGluIHRoZWlyIG5ldyBwb3NpdGlvbnMgaWYgdGhleSBkb24ndCBoYXZlIGEgekluZGV4IHNldC4gV2UgYWxzbyBjYW4ndCBqdXN0IGFwcGx5IHRoaXMgaW5zaWRlIF9wYXJzZVRyYW5zZm9ybSgpIGJlY2F1c2UgYW55dGhpbmcgdGhhdCdzIG1vdmVkIGluIGFueSB3YXkgKGxpa2UgdXNpbmcgXCJsZWZ0XCIgb3IgXCJ0b3BcIiBpbnN0ZWFkIG9mIHRyYW5zZm9ybXMgbGlrZSBcInhcIiBhbmQgXCJ5XCIpIGNhbiBiZSBhZmZlY3RlZCwgc28gaXQgaXMgYmVzdCB0byBlbnN1cmUgdGhhdCBhbnl0aGluZyB0aGF0J3MgdHdlZW5pbmcgaGFzIGEgei1pbmRleC4gU2V0dGluZyBcIldlYmtpdFBlcnNwZWN0aXZlXCIgdG8gYSBub24temVybyB2YWx1ZSB3b3JrZWQgdG9vIGV4Y2VwdCB0aGF0IG9uIGlPUyBTYWZhcmkgdGhpbmdzIHdvdWxkIGZsaWNrZXIgcmFuZG9tbHkuIFBsdXMgekluZGV4IGlzIGxlc3MgbWVtb3J5LWludGVuc2l2ZS5cblx0XHRcdFx0XHR0aGlzLl9hZGRMYXp5U2V0KHN0eWxlLCBcInpJbmRleFwiLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mKHZhcnMpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdGZpcnN0ID0gc3R5bGUuY3NzVGV4dDtcblx0XHRcdFx0diA9IF9nZXRBbGxTdHlsZXModGFyZ2V0LCBfY3MpO1xuXHRcdFx0XHRzdHlsZS5jc3NUZXh0ID0gZmlyc3QgKyBcIjtcIiArIHZhcnM7XG5cdFx0XHRcdHYgPSBfY3NzRGlmKHRhcmdldCwgdiwgX2dldEFsbFN0eWxlcyh0YXJnZXQpKS5kaWZzO1xuXHRcdFx0XHRpZiAoIV9zdXBwb3J0c09wYWNpdHkgJiYgX29wYWNpdHlWYWxFeHAudGVzdCh2YXJzKSkge1xuXHRcdFx0XHRcdHYub3BhY2l0eSA9IHBhcnNlRmxvYXQoIFJlZ0V4cC4kMSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhcnMgPSB2O1xuXHRcdFx0XHRzdHlsZS5jc3NUZXh0ID0gZmlyc3Q7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YXJzLmNsYXNzTmFtZSkgeyAvL2NsYXNzTmFtZSB0d2VlbnMgd2lsbCBjb21iaW5lIGFueSBkaWZmZXJlbmNlcyB0aGV5IGZpbmQgaW4gdGhlIGNzcyB3aXRoIHRoZSB2YXJzIHRoYXQgYXJlIHBhc3NlZCBpbiwgc28ge2NsYXNzTmFtZTpcIm15Q2xhc3NcIiwgc2NhbGU6MC41LCBsZWZ0OjIwfSB3b3VsZCB3b3JrLlxuXHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQgPSBfc3BlY2lhbFByb3BzLmNsYXNzTmFtZS5wYXJzZSh0YXJnZXQsIHZhcnMuY2xhc3NOYW1lLCBcImNsYXNzTmFtZVwiLCB0aGlzLCBudWxsLCBudWxsLCB2YXJzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2ZpcnN0UFQgPSBwdCA9IHRoaXMucGFyc2UodGFyZ2V0LCB2YXJzLCBudWxsKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3RyYW5zZm9ybVR5cGUpIHtcblx0XHRcdFx0dGhyZWVEID0gKHRoaXMuX3RyYW5zZm9ybVR5cGUgPT09IDMpO1xuXHRcdFx0XHRpZiAoIV90cmFuc2Zvcm1Qcm9wKSB7XG5cdFx0XHRcdFx0c3R5bGUuem9vbSA9IDE7IC8vaGVscHMgY29ycmVjdCBhbiBJRSBpc3N1ZS5cblx0XHRcdFx0fSBlbHNlIGlmIChfaXNTYWZhcmkpIHtcblx0XHRcdFx0XHRfcmVxU2FmYXJpRml4ID0gdHJ1ZTtcblx0XHRcdFx0XHQvL2lmIHpJbmRleCBpc24ndCBzZXQsIGlPUyBTYWZhcmkgZG9lc24ndCByZXBhaW50IHRoaW5ncyBjb3JyZWN0bHkgc29tZXRpbWVzIChzZWVtaW5nbHkgYXQgcmFuZG9tKS5cblx0XHRcdFx0XHRpZiAoc3R5bGUuekluZGV4ID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHR6SW5kZXggPSBfZ2V0U3R5bGUodGFyZ2V0LCBcInpJbmRleFwiLCBfY3MpO1xuXHRcdFx0XHRcdFx0aWYgKHpJbmRleCA9PT0gXCJhdXRvXCIgfHwgekluZGV4ID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2FkZExhenlTZXQoc3R5bGUsIFwiekluZGV4XCIsIDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL1NldHRpbmcgV2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5IGNvcnJlY3RzIDMgYnVnczpcblx0XHRcdFx0XHQvLyAxKSBbbm9uLUFuZHJvaWRdIFNhZmFyaSBza2lwcyByZW5kZXJpbmcgY2hhbmdlcyB0byBcInRvcFwiIGFuZCBcImxlZnRcIiB0aGF0IGFyZSBtYWRlIG9uIHRoZSBzYW1lIGZyYW1lL3JlbmRlciBhcyBhIHRyYW5zZm9ybSB1cGRhdGUuXG5cdFx0XHRcdFx0Ly8gMikgaU9TIFNhZmFyaSBzb21ldGltZXMgbmVnbGVjdHMgdG8gcmVwYWludCBlbGVtZW50cyBpbiB0aGVpciBuZXcgcG9zaXRpb25zLiBTZXR0aW5nIFwiV2Via2l0UGVyc3BlY3RpdmVcIiB0byBhIG5vbi16ZXJvIHZhbHVlIHdvcmtlZCB0b28gZXhjZXB0IHRoYXQgb24gaU9TIFNhZmFyaSB0aGluZ3Mgd291bGQgZmxpY2tlciByYW5kb21seS5cblx0XHRcdFx0XHQvLyAzKSBTYWZhcmkgc29tZXRpbWVzIGRpc3BsYXllZCBvZGQgYXJ0aWZhY3RzIHdoZW4gdHdlZW5pbmcgdGhlIHRyYW5zZm9ybSAob3IgV2Via2l0VHJhbnNmb3JtKSBwcm9wZXJ0eSwgbGlrZSBnaG9zdHMgb2YgdGhlIGVkZ2VzIG9mIHRoZSBlbGVtZW50IHJlbWFpbmVkLiBEZWZpbml0ZWx5IGEgYnJvd3NlciBidWcuXG5cdFx0XHRcdFx0Ly9Ob3RlOiB3ZSBhbGxvdyB0aGUgdXNlciB0byBvdmVycmlkZSB0aGUgYXV0by1zZXR0aW5nIGJ5IGRlZmluaW5nIFdlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eSBpbiB0aGUgdmFycyBvZiB0aGUgdHdlZW4uXG5cdFx0XHRcdFx0aWYgKF9pc1NhZmFyaUxUNikge1xuXHRcdFx0XHRcdFx0dGhpcy5fYWRkTGF6eVNldChzdHlsZSwgXCJXZWJraXRCYWNrZmFjZVZpc2liaWxpdHlcIiwgdGhpcy5fdmFycy5XZWJraXRCYWNrZmFjZVZpc2liaWxpdHkgfHwgKHRocmVlRCA/IFwidmlzaWJsZVwiIDogXCJoaWRkZW5cIikpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRwdDIgPSBwdDtcblx0XHRcdFx0d2hpbGUgKHB0MiAmJiBwdDIuX25leHQpIHtcblx0XHRcdFx0XHRwdDIgPSBwdDIuX25leHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dHB0ID0gbmV3IENTU1Byb3BUd2Vlbih0YXJnZXQsIFwidHJhbnNmb3JtXCIsIDAsIDAsIG51bGwsIDIpO1xuXHRcdFx0XHR0aGlzLl9saW5rQ1NTUCh0cHQsIG51bGwsIHB0Mik7XG5cdFx0XHRcdHRwdC5zZXRSYXRpbyA9IF90cmFuc2Zvcm1Qcm9wID8gX3NldFRyYW5zZm9ybVJhdGlvIDogX3NldElFVHJhbnNmb3JtUmF0aW87XG5cdFx0XHRcdHRwdC5kYXRhID0gdGhpcy5fdHJhbnNmb3JtIHx8IF9nZXRUcmFuc2Zvcm0odGFyZ2V0LCBfY3MsIHRydWUpO1xuXHRcdFx0XHR0cHQudHdlZW4gPSB0d2Vlbjtcblx0XHRcdFx0dHB0LnByID0gLTE7IC8vZW5zdXJlcyB0aGF0IHRoZSB0cmFuc2Zvcm1zIGdldCBhcHBsaWVkIGFmdGVyIHRoZSBjb21wb25lbnRzIGFyZSB1cGRhdGVkLlxuXHRcdFx0XHRfb3ZlcndyaXRlUHJvcHMucG9wKCk7IC8vd2UgZG9uJ3Qgd2FudCB0byBmb3JjZSB0aGUgb3ZlcndyaXRlIG9mIGFsbCBcInRyYW5zZm9ybVwiIHR3ZWVucyBvZiB0aGUgdGFyZ2V0IC0gd2Ugb25seSBjYXJlIGFib3V0IGluZGl2aWR1YWwgdHJhbnNmb3JtIHByb3BlcnRpZXMgbGlrZSBzY2FsZVgsIHJvdGF0aW9uLCBldGMuIFRoZSBDU1NQcm9wVHdlZW4gY29uc3RydWN0b3IgYXV0b21hdGljYWxseSBhZGRzIHRoZSBwcm9wZXJ0eSB0byBfb3ZlcndyaXRlUHJvcHMgd2hpY2ggaXMgd2h5IHdlIG5lZWQgdG8gcG9wKCkgaGVyZS5cblx0XHRcdH1cblxuXHRcdFx0aWYgKF9oYXNQcmlvcml0eSkge1xuXHRcdFx0XHQvL3Jlb3JkZXJzIHRoZSBsaW5rZWQgbGlzdCBpbiBvcmRlciBvZiBwciAocHJpb3JpdHkpXG5cdFx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHRcdG5leHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0XHRwdDIgPSBmaXJzdDtcblx0XHRcdFx0XHR3aGlsZSAocHQyICYmIHB0Mi5wciA+IHB0LnByKSB7XG5cdFx0XHRcdFx0XHRwdDIgPSBwdDIuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgocHQuX3ByZXYgPSBwdDIgPyBwdDIuX3ByZXYgOiBsYXN0KSkge1xuXHRcdFx0XHRcdFx0cHQuX3ByZXYuX25leHQgPSBwdDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Zmlyc3QgPSBwdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKChwdC5fbmV4dCA9IHB0MikpIHtcblx0XHRcdFx0XHRcdHB0Mi5fcHJldiA9IHB0O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsYXN0ID0gcHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHB0ID0gbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9maXJzdFBUID0gZmlyc3Q7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXG5cblx0XHRwLnBhcnNlID0gZnVuY3Rpb24odGFyZ2V0LCB2YXJzLCBwdCwgcGx1Z2luKSB7XG5cdFx0XHR2YXIgc3R5bGUgPSB0YXJnZXQuc3R5bGUsXG5cdFx0XHRcdHAsIHNwLCBibiwgZW4sIGJzLCBlcywgYnNmeCwgZXNmeCwgaXNTdHIsIHJlbDtcblx0XHRcdGZvciAocCBpbiB2YXJzKSB7XG5cdFx0XHRcdGVzID0gdmFyc1twXTsgLy9lbmRpbmcgdmFsdWUgc3RyaW5nXG5cdFx0XHRcdHNwID0gX3NwZWNpYWxQcm9wc1twXTsgLy9TcGVjaWFsUHJvcCBsb29rdXAuXG5cdFx0XHRcdGlmIChzcCkge1xuXHRcdFx0XHRcdHB0ID0gc3AucGFyc2UodGFyZ2V0LCBlcywgcCwgdGhpcywgcHQsIHBsdWdpbiwgdmFycyk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRicyA9IF9nZXRTdHlsZSh0YXJnZXQsIHAsIF9jcykgKyBcIlwiO1xuXHRcdFx0XHRcdGlzU3RyID0gKHR5cGVvZihlcykgPT09IFwic3RyaW5nXCIpO1xuXHRcdFx0XHRcdGlmIChwID09PSBcImNvbG9yXCIgfHwgcCA9PT0gXCJmaWxsXCIgfHwgcCA9PT0gXCJzdHJva2VcIiB8fCBwLmluZGV4T2YoXCJDb2xvclwiKSAhPT0gLTEgfHwgKGlzU3RyICYmIF9yZ2Joc2xFeHAudGVzdChlcykpKSB7IC8vT3BlcmEgdXNlcyBiYWNrZ3JvdW5kOiB0byBkZWZpbmUgY29sb3Igc29tZXRpbWVzIGluIGFkZGl0aW9uIHRvIGJhY2tncm91bmRDb2xvcjpcblx0XHRcdFx0XHRcdGlmICghaXNTdHIpIHtcblx0XHRcdFx0XHRcdFx0ZXMgPSBfcGFyc2VDb2xvcihlcyk7XG5cdFx0XHRcdFx0XHRcdGVzID0gKChlcy5sZW5ndGggPiAzKSA/IFwicmdiYShcIiA6IFwicmdiKFwiKSArIGVzLmpvaW4oXCIsXCIpICsgXCIpXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRwdCA9IF9wYXJzZUNvbXBsZXgoc3R5bGUsIHAsIGJzLCBlcywgdHJ1ZSwgXCJ0cmFuc3BhcmVudFwiLCBwdCwgMCwgcGx1Z2luKTtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNTdHIgJiYgKGVzLmluZGV4T2YoXCIgXCIpICE9PSAtMSB8fCBlcy5pbmRleE9mKFwiLFwiKSAhPT0gLTEpKSB7XG5cdFx0XHRcdFx0XHRwdCA9IF9wYXJzZUNvbXBsZXgoc3R5bGUsIHAsIGJzLCBlcywgdHJ1ZSwgbnVsbCwgcHQsIDAsIHBsdWdpbik7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ym4gPSBwYXJzZUZsb2F0KGJzKTtcblx0XHRcdFx0XHRcdGJzZnggPSAoYm4gfHwgYm4gPT09IDApID8gYnMuc3Vic3RyKChibiArIFwiXCIpLmxlbmd0aCkgOiBcIlwiOyAvL3JlbWVtYmVyLCBicyBjb3VsZCBiZSBub24tbnVtZXJpYyBsaWtlIFwibm9ybWFsXCIgZm9yIGZvbnRXZWlnaHQsIHNvIHdlIHNob3VsZCBkZWZhdWx0IHRvIGEgYmxhbmsgc3VmZml4IGluIHRoYXQgY2FzZS5cblxuXHRcdFx0XHRcdFx0aWYgKGJzID09PSBcIlwiIHx8IGJzID09PSBcImF1dG9cIikge1xuXHRcdFx0XHRcdFx0XHRpZiAocCA9PT0gXCJ3aWR0aFwiIHx8IHAgPT09IFwiaGVpZ2h0XCIpIHtcblx0XHRcdFx0XHRcdFx0XHRibiA9IF9nZXREaW1lbnNpb24odGFyZ2V0LCBwLCBfY3MpO1xuXHRcdFx0XHRcdFx0XHRcdGJzZnggPSBcInB4XCI7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAocCA9PT0gXCJsZWZ0XCIgfHwgcCA9PT0gXCJ0b3BcIikge1xuXHRcdFx0XHRcdFx0XHRcdGJuID0gX2NhbGN1bGF0ZU9mZnNldCh0YXJnZXQsIHAsIF9jcyk7XG5cdFx0XHRcdFx0XHRcdFx0YnNmeCA9IFwicHhcIjtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRibiA9IChwICE9PSBcIm9wYWNpdHlcIikgPyAwIDogMTtcblx0XHRcdFx0XHRcdFx0XHRic2Z4ID0gXCJcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZWwgPSAoaXNTdHIgJiYgZXMuY2hhckF0KDEpID09PSBcIj1cIik7XG5cdFx0XHRcdFx0XHRpZiAocmVsKSB7XG5cdFx0XHRcdFx0XHRcdGVuID0gcGFyc2VJbnQoZXMuY2hhckF0KDApICsgXCIxXCIsIDEwKTtcblx0XHRcdFx0XHRcdFx0ZXMgPSBlcy5zdWJzdHIoMik7XG5cdFx0XHRcdFx0XHRcdGVuICo9IHBhcnNlRmxvYXQoZXMpO1xuXHRcdFx0XHRcdFx0XHRlc2Z4ID0gZXMucmVwbGFjZShfc3VmZml4RXhwLCBcIlwiKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGVuID0gcGFyc2VGbG9hdChlcyk7XG5cdFx0XHRcdFx0XHRcdGVzZnggPSBpc1N0ciA/IGVzLnJlcGxhY2UoX3N1ZmZpeEV4cCwgXCJcIikgOiBcIlwiO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoZXNmeCA9PT0gXCJcIikge1xuXHRcdFx0XHRcdFx0XHRlc2Z4ID0gKHAgaW4gX3N1ZmZpeE1hcCkgPyBfc3VmZml4TWFwW3BdIDogYnNmeDsgLy9wb3B1bGF0ZSB0aGUgZW5kIHN1ZmZpeCwgcHJpb3JpdGl6aW5nIHRoZSBtYXAsIHRoZW4gaWYgbm9uZSBpcyBmb3VuZCwgdXNlIHRoZSBiZWdpbm5pbmcgc3VmZml4LlxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRlcyA9IChlbiB8fCBlbiA9PT0gMCkgPyAocmVsID8gZW4gKyBibiA6IGVuKSArIGVzZnggOiB2YXJzW3BdOyAvL2Vuc3VyZXMgdGhhdCBhbnkgKz0gb3IgLT0gcHJlZml4ZXMgYXJlIHRha2VuIGNhcmUgb2YuIFJlY29yZCB0aGUgZW5kIHZhbHVlIGJlZm9yZSBub3JtYWxpemluZyB0aGUgc3VmZml4IGJlY2F1c2Ugd2UgYWx3YXlzIHdhbnQgdG8gZW5kIHRoZSB0d2VlbiBvbiBleGFjdGx5IHdoYXQgdGhleSBpbnRlbmRlZCBldmVuIGlmIGl0IGRvZXNuJ3QgbWF0Y2ggdGhlIGJlZ2lubmluZyB2YWx1ZSdzIHN1ZmZpeC5cblxuXHRcdFx0XHRcdFx0Ly9pZiB0aGUgYmVnaW5uaW5nL2VuZGluZyBzdWZmaXhlcyBkb24ndCBtYXRjaCwgbm9ybWFsaXplIHRoZW0uLi5cblx0XHRcdFx0XHRcdGlmIChic2Z4ICE9PSBlc2Z4KSBpZiAoZXNmeCAhPT0gXCJcIikgaWYgKGVuIHx8IGVuID09PSAwKSBpZiAoYm4pIHsgLy9ub3RlOiBpZiB0aGUgYmVnaW5uaW5nIHZhbHVlIChibikgaXMgMCwgd2UgZG9uJ3QgbmVlZCB0byBjb252ZXJ0IHVuaXRzIVxuXHRcdFx0XHRcdFx0XHRibiA9IF9jb252ZXJ0VG9QaXhlbHModGFyZ2V0LCBwLCBibiwgYnNmeCk7XG5cdFx0XHRcdFx0XHRcdGlmIChlc2Z4ID09PSBcIiVcIikge1xuXHRcdFx0XHRcdFx0XHRcdGJuIC89IF9jb252ZXJ0VG9QaXhlbHModGFyZ2V0LCBwLCAxMDAsIFwiJVwiKSAvIDEwMDtcblx0XHRcdFx0XHRcdFx0XHRpZiAodmFycy5zdHJpY3RVbml0cyAhPT0gdHJ1ZSkgeyAvL3NvbWUgYnJvd3NlcnMgcmVwb3J0IG9ubHkgXCJweFwiIHZhbHVlcyBpbnN0ZWFkIG9mIGFsbG93aW5nIFwiJVwiIHdpdGggZ2V0Q29tcHV0ZWRTdHlsZSgpLCBzbyB3ZSBhc3N1bWUgdGhhdCBpZiB3ZSdyZSB0d2VlbmluZyB0byBhICUsIHdlIHNob3VsZCBzdGFydCB0aGVyZSB0b28gdW5sZXNzIHN0cmljdFVuaXRzOnRydWUgaXMgZGVmaW5lZC4gVGhpcyBhcHByb2FjaCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciByZXNwb25zaXZlIGRlc2lnbnMgdGhhdCB1c2UgZnJvbSgpIHR3ZWVucy5cblx0XHRcdFx0XHRcdFx0XHRcdGJzID0gYm4gKyBcIiVcIjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0fSBlbHNlIGlmIChlc2Z4ID09PSBcImVtXCIgfHwgZXNmeCA9PT0gXCJyZW1cIiB8fCBlc2Z4ID09PSBcInZ3XCIgfHwgZXNmeCA9PT0gXCJ2aFwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ym4gLz0gX2NvbnZlcnRUb1BpeGVscyh0YXJnZXQsIHAsIDEsIGVzZngpO1xuXG5cdFx0XHRcdFx0XHRcdC8vb3RoZXJ3aXNlIGNvbnZlcnQgdG8gcGl4ZWxzLlxuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGVzZnggIT09IFwicHhcIikge1xuXHRcdFx0XHRcdFx0XHRcdGVuID0gX2NvbnZlcnRUb1BpeGVscyh0YXJnZXQsIHAsIGVuLCBlc2Z4KTtcblx0XHRcdFx0XHRcdFx0XHRlc2Z4ID0gXCJweFwiOyAvL3dlIGRvbid0IHVzZSBic2Z4IGFmdGVyIHRoaXMsIHNvIHdlIGRvbid0IG5lZWQgdG8gc2V0IGl0IHRvIHB4IHRvby5cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAocmVsKSBpZiAoZW4gfHwgZW4gPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRlcyA9IChlbiArIGJuKSArIGVzZng7IC8vdGhlIGNoYW5nZXMgd2UgbWFkZSBhZmZlY3QgcmVsYXRpdmUgY2FsY3VsYXRpb25zLCBzbyBhZGp1c3QgdGhlIGVuZCB2YWx1ZSBoZXJlLlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChyZWwpIHtcblx0XHRcdFx0XHRcdFx0ZW4gKz0gYm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICgoYm4gfHwgYm4gPT09IDApICYmIChlbiB8fCBlbiA9PT0gMCkpIHsgLy9mYXN0ZXIgdGhhbiBpc05hTigpLiBBbHNvLCBwcmV2aW91c2x5IHdlIHJlcXVpcmVkIGVuICE9PSBibiBidXQgdGhhdCBkb2Vzbid0IHJlYWxseSBnYWluIG11Y2ggcGVyZm9ybWFuY2UgYW5kIGl0IHByZXZlbnRzIF9wYXJzZVRvUHJveHkoKSBmcm9tIHdvcmtpbmcgcHJvcGVybHkgaWYgYmVnaW5uaW5nIGFuZCBlbmRpbmcgdmFsdWVzIG1hdGNoIGJ1dCBuZWVkIHRvIGdldCB0d2VlbmVkIGJ5IGFuIGV4dGVybmFsIHBsdWdpbiBhbnl3YXkuIEZvciBleGFtcGxlLCBhIGJlemllciB0d2VlbiB3aGVyZSB0aGUgdGFyZ2V0IHN0YXJ0cyBhdCBsZWZ0OjAgYW5kIGhhcyB0aGVzZSBwb2ludHM6IFt7bGVmdDo1MH0se2xlZnQ6MH1dIHdvdWxkbid0IHdvcmsgcHJvcGVybHkgYmVjYXVzZSB3aGVuIHBhcnNpbmcgdGhlIGxhc3QgcG9pbnQsIGl0J2QgbWF0Y2ggdGhlIGZpcnN0IChjdXJyZW50KSBvbmUgYW5kIGEgbm9uLXR3ZWVuaW5nIENTU1Byb3BUd2VlbiB3b3VsZCBiZSByZWNvcmRlZCB3aGVuIHdlIGFjdHVhbGx5IG5lZWQgYSBub3JtYWwgdHdlZW4gKHR5cGU6MCkgc28gdGhhdCB0aGluZ3MgZ2V0IHVwZGF0ZWQgZHVyaW5nIHRoZSB0d2VlbiBwcm9wZXJseS5cblx0XHRcdFx0XHRcdFx0cHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHN0eWxlLCBwLCBibiwgZW4gLSBibiwgcHQsIDAsIHAsIChfYXV0b1JvdW5kICE9PSBmYWxzZSAmJiAoZXNmeCA9PT0gXCJweFwiIHx8IHAgPT09IFwiekluZGV4XCIpKSwgMCwgYnMsIGVzKTtcblx0XHRcdFx0XHRcdFx0cHQueHMwID0gZXNmeDtcblx0XHRcdFx0XHRcdFx0Ly9ERUJVRzogX2xvZyhcInR3ZWVuIFwiK3ArXCIgZnJvbSBcIitwdC5iK1wiIChcIitibitlc2Z4K1wiKSB0byBcIitwdC5lK1wiIHdpdGggc3VmZml4OiBcIitwdC54czApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChzdHlsZVtwXSA9PT0gdW5kZWZpbmVkIHx8ICFlcyAmJiAoZXMgKyBcIlwiID09PSBcIk5hTlwiIHx8IGVzID09IG51bGwpKSB7XG5cdFx0XHRcdFx0XHRcdF9sb2coXCJpbnZhbGlkIFwiICsgcCArIFwiIHR3ZWVuIHZhbHVlOiBcIiArIHZhcnNbcF0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cHQgPSBuZXcgQ1NTUHJvcFR3ZWVuKHN0eWxlLCBwLCBlbiB8fCBibiB8fCAwLCAwLCBwdCwgLTEsIHAsIGZhbHNlLCAwLCBicywgZXMpO1xuXHRcdFx0XHRcdFx0XHRwdC54czAgPSAoZXMgPT09IFwibm9uZVwiICYmIChwID09PSBcImRpc3BsYXlcIiB8fCBwLmluZGV4T2YoXCJTdHlsZVwiKSAhPT0gLTEpKSA/IGJzIDogZXM7IC8vaW50ZXJtZWRpYXRlIHZhbHVlIHNob3VsZCB0eXBpY2FsbHkgYmUgc2V0IGltbWVkaWF0ZWx5IChlbmQgdmFsdWUpIGV4Y2VwdCBmb3IgXCJkaXNwbGF5XCIgb3IgdGhpbmdzIGxpa2UgYm9yZGVyVG9wU3R5bGUsIGJvcmRlckJvdHRvbVN0eWxlLCBldGMuIHdoaWNoIHNob3VsZCB1c2UgdGhlIGJlZ2lubmluZyB2YWx1ZSBkdXJpbmcgdGhlIHR3ZWVuLlxuXHRcdFx0XHRcdFx0XHQvL0RFQlVHOiBfbG9nKFwibm9uLXR3ZWVuaW5nIHZhbHVlIFwiK3ArXCI6IFwiK3B0LnhzMCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwbHVnaW4pIGlmIChwdCAmJiAhcHQucGx1Z2luKSB7XG5cdFx0XHRcdFx0cHQucGx1Z2luID0gcGx1Z2luO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcHQ7XG5cdFx0fTtcblxuXG5cdFx0Ly9nZXRzIGNhbGxlZCBldmVyeSB0aW1lIHRoZSB0d2VlbiB1cGRhdGVzLCBwYXNzaW5nIHRoZSBuZXcgcmF0aW8gKHR5cGljYWxseSBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMSwgYnV0IG5vdCBhbHdheXMgKGZvciBleGFtcGxlLCBpZiBhbiBFbGFzdGljLmVhc2VPdXQgaXMgdXNlZCwgdGhlIHZhbHVlIGNhbiBqdW1wIGFib3ZlIDEgbWlkLXR3ZWVuKS4gSXQgd2lsbCBhbHdheXMgc3RhcnQgYW5kIDAgYW5kIGVuZCBhdCAxLlxuXHRcdHAuc2V0UmF0aW8gPSBmdW5jdGlvbih2KSB7XG5cdFx0XHR2YXIgcHQgPSB0aGlzLl9maXJzdFBULFxuXHRcdFx0XHRtaW4gPSAwLjAwMDAwMSxcblx0XHRcdFx0dmFsLCBzdHIsIGk7XG5cdFx0XHQvL2F0IHRoZSBlbmQgb2YgdGhlIHR3ZWVuLCB3ZSBzZXQgdGhlIHZhbHVlcyB0byBleGFjdGx5IHdoYXQgd2UgcmVjZWl2ZWQgaW4gb3JkZXIgdG8gbWFrZSBzdXJlIG5vbi10d2VlbmluZyB2YWx1ZXMgKGxpa2UgXCJwb3NpdGlvblwiIG9yIFwiZmxvYXRcIiBvciB3aGF0ZXZlcikgYXJlIHNldCBhbmQgc28gdGhhdCBpZiB0aGUgYmVnaW5uaW5nL2VuZGluZyBzdWZmaXhlcyAodW5pdHMpIGRpZG4ndCBtYXRjaCBhbmQgd2Ugbm9ybWFsaXplZCB0byBweCwgdGhlIHZhbHVlIHRoYXQgdGhlIHVzZXIgcGFzc2VkIGluIGlzIHVzZWQgaGVyZS4gV2UgY2hlY2sgdG8gc2VlIGlmIHRoZSB0d2VlbiBpcyBhdCBpdHMgYmVnaW5uaW5nIGluIGNhc2UgaXQncyBhIGZyb20oKSB0d2VlbiBpbiB3aGljaCBjYXNlIHRoZSByYXRpbyB3aWxsIGFjdHVhbGx5IGdvIGZyb20gMSB0byAwIG92ZXIgdGhlIGNvdXJzZSBvZiB0aGUgdHdlZW4gKGJhY2t3YXJkcykuXG5cdFx0XHRpZiAodiA9PT0gMSAmJiAodGhpcy5fdHdlZW4uX3RpbWUgPT09IHRoaXMuX3R3ZWVuLl9kdXJhdGlvbiB8fCB0aGlzLl90d2Vlbi5fdGltZSA9PT0gMCkpIHtcblx0XHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdFx0aWYgKHB0LnR5cGUgIT09IDIpIHtcblx0XHRcdFx0XHRcdGlmIChwdC5yICYmIHB0LnR5cGUgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHZhbCA9IE1hdGgucm91bmQocHQucyArIHB0LmMpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIXB0LnR5cGUpIHtcblx0XHRcdFx0XHRcdFx0XHRwdC50W3B0LnBdID0gdmFsICsgcHQueHMwO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHB0LnR5cGUgPT09IDEpIHsgLy9jb21wbGV4IHZhbHVlIChvbmUgdGhhdCB0eXBpY2FsbHkgaGFzIG11bHRpcGxlIG51bWJlcnMgaW5zaWRlIGEgc3RyaW5nLCBsaWtlIFwicmVjdCg1cHgsMTBweCwyMHB4LDI1cHgpXCJcblx0XHRcdFx0XHRcdFx0XHRpID0gcHQubDtcblx0XHRcdFx0XHRcdFx0XHRzdHIgPSBwdC54czAgKyB2YWwgKyBwdC54czE7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMTsgaSA8IHB0Lmw7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RyICs9IHB0W1wieG5cIitpXSArIHB0W1wieHNcIisoaSsxKV07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSBzdHI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSBwdC5lO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwdC5zZXRSYXRpbyh2KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKHYgfHwgISh0aGlzLl90d2Vlbi5fdGltZSA9PT0gdGhpcy5fdHdlZW4uX2R1cmF0aW9uIHx8IHRoaXMuX3R3ZWVuLl90aW1lID09PSAwKSB8fCB0aGlzLl90d2Vlbi5fcmF3UHJldlRpbWUgPT09IC0wLjAwMDAwMSkge1xuXHRcdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0XHR2YWwgPSBwdC5jICogdiArIHB0LnM7XG5cdFx0XHRcdFx0aWYgKHB0LnIpIHtcblx0XHRcdFx0XHRcdHZhbCA9IE1hdGgucm91bmQodmFsKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbCA8IG1pbikgaWYgKHZhbCA+IC1taW4pIHtcblx0XHRcdFx0XHRcdHZhbCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghcHQudHlwZSkge1xuXHRcdFx0XHRcdFx0cHQudFtwdC5wXSA9IHZhbCArIHB0LnhzMDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHB0LnR5cGUgPT09IDEpIHsgLy9jb21wbGV4IHZhbHVlIChvbmUgdGhhdCB0eXBpY2FsbHkgaGFzIG11bHRpcGxlIG51bWJlcnMgaW5zaWRlIGEgc3RyaW5nLCBsaWtlIFwicmVjdCg1cHgsMTBweCwyMHB4LDI1cHgpXCJcblx0XHRcdFx0XHRcdGkgPSBwdC5sO1xuXHRcdFx0XHRcdFx0aWYgKGkgPT09IDIpIHtcblx0XHRcdFx0XHRcdFx0cHQudFtwdC5wXSA9IHB0LnhzMCArIHZhbCArIHB0LnhzMSArIHB0LnhuMSArIHB0LnhzMjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaSA9PT0gMykge1xuXHRcdFx0XHRcdFx0XHRwdC50W3B0LnBdID0gcHQueHMwICsgdmFsICsgcHQueHMxICsgcHQueG4xICsgcHQueHMyICsgcHQueG4yICsgcHQueHMzO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChpID09PSA0KSB7XG5cdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSBwdC54czAgKyB2YWwgKyBwdC54czEgKyBwdC54bjEgKyBwdC54czIgKyBwdC54bjIgKyBwdC54czMgKyBwdC54bjMgKyBwdC54czQ7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGkgPT09IDUpIHtcblx0XHRcdFx0XHRcdFx0cHQudFtwdC5wXSA9IHB0LnhzMCArIHZhbCArIHB0LnhzMSArIHB0LnhuMSArIHB0LnhzMiArIHB0LnhuMiArIHB0LnhzMyArIHB0LnhuMyArIHB0LnhzNCArIHB0LnhuNCArIHB0LnhzNTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHN0ciA9IHB0LnhzMCArIHZhbCArIHB0LnhzMTtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMTsgaSA8IHB0Lmw7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdHN0ciArPSBwdFtcInhuXCIraV0gKyBwdFtcInhzXCIrKGkrMSldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSBzdHI7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHB0LnR5cGUgPT09IC0xKSB7IC8vbm9uLXR3ZWVuaW5nIHZhbHVlXG5cdFx0XHRcdFx0XHRwdC50W3B0LnBdID0gcHQueHMwO1xuXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwdC5zZXRSYXRpbykgeyAvL2N1c3RvbSBzZXRSYXRpbygpIGZvciB0aGluZ3MgbGlrZSBTcGVjaWFsUHJvcHMsIGV4dGVybmFsIHBsdWdpbnMsIGV0Yy5cblx0XHRcdFx0XHRcdHB0LnNldFJhdGlvKHYpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdCA9IHB0Ll9uZXh0O1xuXHRcdFx0XHR9XG5cblx0XHRcdC8vaWYgdGhlIHR3ZWVuIGlzIHJldmVyc2VkIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZywgd2UgbmVlZCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCB2YWx1ZXMgd2hpY2ggbWF5IGhhdmUgZGlmZmVyZW50IHVuaXRzIChsaWtlICUgaW5zdGVhZCBvZiBweCBvciBlbSBvciB3aGF0ZXZlcikuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0XHRpZiAocHQudHlwZSAhPT0gMikge1xuXHRcdFx0XHRcdFx0cHQudFtwdC5wXSA9IHB0LmI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHB0LnNldFJhdGlvKHYpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdCA9IHB0Ll9uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogRm9yY2VzIHJlbmRlcmluZyBvZiB0aGUgdGFyZ2V0J3MgdHJhbnNmb3JtcyAocm90YXRpb24sIHNjYWxlLCBldGMuKSB3aGVuZXZlciB0aGUgQ1NTUGx1Z2luJ3Mgc2V0UmF0aW8oKSBpcyBjYWxsZWQuXG5cdFx0ICogQmFzaWNhbGx5LCB0aGlzIHRlbGxzIHRoZSBDU1NQbHVnaW4gdG8gY3JlYXRlIGEgQ1NTUHJvcFR3ZWVuICh0eXBlIDIpIGFmdGVyIGluc3RhbnRpYXRpb24gdGhhdCBydW5zIGxhc3QgaW4gdGhlIGxpbmtlZFxuXHRcdCAqIGxpc3QgYW5kIGNhbGxzIHRoZSBhcHByb3ByaWF0ZSAoM0Qgb3IgMkQpIHJlbmRlcmluZyBmdW5jdGlvbi4gV2Ugc2VwYXJhdGUgdGhpcyBpbnRvIGl0cyBvd24gbWV0aG9kIHNvIHRoYXQgd2UgY2FuIGNhbGxcblx0XHQgKiBpdCBmcm9tIG90aGVyIHBsdWdpbnMgbGlrZSBCZXppZXJQbHVnaW4gaWYsIGZvciBleGFtcGxlLCBpdCBuZWVkcyB0byBhcHBseSBhbiBhdXRvUm90YXRpb24gYW5kIHRoaXMgQ1NTUGx1Z2luXG5cdFx0ICogZG9lc24ndCBoYXZlIGFueSB0cmFuc2Zvcm0tcmVsYXRlZCBwcm9wZXJ0aWVzIG9mIGl0cyBvd24uIFlvdSBjYW4gY2FsbCB0aGlzIG1ldGhvZCBhcyBtYW55IHRpbWVzIGFzIHlvdVxuXHRcdCAqIHdhbnQgYW5kIGl0IHdvbid0IGNyZWF0ZSBkdXBsaWNhdGUgQ1NTUHJvcFR3ZWVucy5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdGhyZWVEIGlmIHRydWUsIGl0IHNob3VsZCBhcHBseSAzRCB0d2VlbnMgKG90aGVyd2lzZSwganVzdCAyRCBvbmVzIGFyZSBmaW5lIGFuZCB0eXBpY2FsbHkgZmFzdGVyKVxuXHRcdCAqL1xuXHRcdHAuX2VuYWJsZVRyYW5zZm9ybXMgPSBmdW5jdGlvbih0aHJlZUQpIHtcblx0XHRcdHRoaXMuX3RyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybSB8fCBfZ2V0VHJhbnNmb3JtKHRoaXMuX3RhcmdldCwgX2NzLCB0cnVlKTsgLy9lbnN1cmVzIHRoYXQgdGhlIGVsZW1lbnQgaGFzIGEgX2dzVHJhbnNmb3JtIHByb3BlcnR5IHdpdGggdGhlIGFwcHJvcHJpYXRlIHZhbHVlcy5cblx0XHRcdHRoaXMuX3RyYW5zZm9ybVR5cGUgPSAoISh0aGlzLl90cmFuc2Zvcm0uc3ZnICYmIF91c2VTVkdUcmFuc2Zvcm1BdHRyKSAmJiAodGhyZWVEIHx8IHRoaXMuX3RyYW5zZm9ybVR5cGUgPT09IDMpKSA/IDMgOiAyO1xuXHRcdH07XG5cblx0XHR2YXIgbGF6eVNldCA9IGZ1bmN0aW9uKHYpIHtcblx0XHRcdHRoaXMudFt0aGlzLnBdID0gdGhpcy5lO1xuXHRcdFx0dGhpcy5kYXRhLl9saW5rQ1NTUCh0aGlzLCB0aGlzLl9uZXh0LCBudWxsLCB0cnVlKTsgLy93ZSBwdXJwb3NlZnVsbHkga2VlcCB0aGlzLl9uZXh0IGV2ZW4gdGhvdWdoIGl0J2QgbWFrZSBzZW5zZSB0byBudWxsIGl0LCBidXQgdGhpcyBpcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiwgYXMgdGhpcyBoYXBwZW5zIGR1cmluZyB0aGUgd2hpbGUgKHB0KSB7fSBsb29wIGluIHNldFJhdGlvKCkgYXQgdGhlIGJvdHRvbSBvZiB3aGljaCBpdCBzZXRzIHB0ID0gcHQuX25leHQsIHNvIGlmIHdlIG51bGwgaXQsIHRoZSBsaW5rZWQgbGlzdCB3aWxsIGJlIGJyb2tlbiBpbiB0aGF0IGxvb3AuXG5cdFx0fTtcblx0XHQvKiogQHByaXZhdGUgR2l2ZXMgdXMgYSB3YXkgdG8gc2V0IGEgdmFsdWUgb24gdGhlIGZpcnN0IHJlbmRlciAoYW5kIG9ubHkgdGhlIGZpcnN0IHJlbmRlcikuICoqL1xuXHRcdHAuX2FkZExhenlTZXQgPSBmdW5jdGlvbih0LCBwLCB2KSB7XG5cdFx0XHR2YXIgcHQgPSB0aGlzLl9maXJzdFBUID0gbmV3IENTU1Byb3BUd2Vlbih0LCBwLCAwLCAwLCB0aGlzLl9maXJzdFBULCAyKTtcblx0XHRcdHB0LmUgPSB2O1xuXHRcdFx0cHQuc2V0UmF0aW8gPSBsYXp5U2V0O1xuXHRcdFx0cHQuZGF0YSA9IHRoaXM7XG5cdFx0fTtcblxuXHRcdC8qKiBAcHJpdmF0ZSAqKi9cblx0XHRwLl9saW5rQ1NTUCA9IGZ1bmN0aW9uKHB0LCBuZXh0LCBwcmV2LCByZW1vdmUpIHtcblx0XHRcdGlmIChwdCkge1xuXHRcdFx0XHRpZiAobmV4dCkge1xuXHRcdFx0XHRcdG5leHQuX3ByZXYgPSBwdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHQuX25leHQpIHtcblx0XHRcdFx0XHRwdC5fbmV4dC5fcHJldiA9IHB0Ll9wcmV2O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwdC5fcHJldikge1xuXHRcdFx0XHRcdHB0Ll9wcmV2Ll9uZXh0ID0gcHQuX25leHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fZmlyc3RQVCA9PT0gcHQpIHtcblx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0cmVtb3ZlID0gdHJ1ZTsgLy9qdXN0IHRvIHByZXZlbnQgcmVzZXR0aW5nIHRoaXMuX2ZpcnN0UFQgNSBsaW5lcyBkb3duIGluIGNhc2UgcHQuX25leHQgaXMgbnVsbC4gKG9wdGltaXplZCBmb3Igc3BlZWQpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByZXYpIHtcblx0XHRcdFx0XHRwcmV2Ll9uZXh0ID0gcHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIXJlbW92ZSAmJiB0aGlzLl9maXJzdFBUID09PSBudWxsKSB7XG5cdFx0XHRcdFx0dGhpcy5fZmlyc3RQVCA9IHB0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHB0Ll9uZXh0ID0gbmV4dDtcblx0XHRcdFx0cHQuX3ByZXYgPSBwcmV2O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHB0O1xuXHRcdH07XG5cblx0XHQvL3dlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgaWYgYWxwaGEgb3IgYXV0b0FscGhhIGlzIGtpbGxlZCwgb3BhY2l0eSBpcyB0b28uIEFuZCBhdXRvQWxwaGEgYWZmZWN0cyB0aGUgXCJ2aXNpYmlsaXR5XCIgcHJvcGVydHkuXG5cdFx0cC5fa2lsbCA9IGZ1bmN0aW9uKGxvb2t1cCkge1xuXHRcdFx0dmFyIGNvcHkgPSBsb29rdXAsXG5cdFx0XHRcdHB0LCBwLCB4Zmlyc3Q7XG5cdFx0XHRpZiAobG9va3VwLmF1dG9BbHBoYSB8fCBsb29rdXAuYWxwaGEpIHtcblx0XHRcdFx0Y29weSA9IHt9O1xuXHRcdFx0XHRmb3IgKHAgaW4gbG9va3VwKSB7IC8vY29weSB0aGUgbG9va3VwIHNvIHRoYXQgd2UncmUgbm90IGNoYW5naW5nIHRoZSBvcmlnaW5hbCB3aGljaCBtYXkgYmUgcGFzc2VkIGVsc2V3aGVyZS5cblx0XHRcdFx0XHRjb3B5W3BdID0gbG9va3VwW3BdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvcHkub3BhY2l0eSA9IDE7XG5cdFx0XHRcdGlmIChjb3B5LmF1dG9BbHBoYSkge1xuXHRcdFx0XHRcdGNvcHkudmlzaWJpbGl0eSA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChsb29rdXAuY2xhc3NOYW1lICYmIChwdCA9IHRoaXMuX2NsYXNzTmFtZVBUKSkgeyAvL2ZvciBjbGFzc05hbWUgdHdlZW5zLCB3ZSBuZWVkIHRvIGtpbGwgYW55IGFzc29jaWF0ZWQgQ1NTUHJvcFR3ZWVucyB0b287IGEgbGlua2VkIGxpc3Qgc3RhcnRzIGF0IHRoZSBjbGFzc05hbWUncyBcInhmaXJzdFwiLlxuXHRcdFx0XHR4Zmlyc3QgPSBwdC54Zmlyc3Q7XG5cdFx0XHRcdGlmICh4Zmlyc3QgJiYgeGZpcnN0Ll9wcmV2KSB7XG5cdFx0XHRcdFx0dGhpcy5fbGlua0NTU1AoeGZpcnN0Ll9wcmV2LCBwdC5fbmV4dCwgeGZpcnN0Ll9wcmV2Ll9wcmV2KTsgLy9icmVhayBvZmYgdGhlIHByZXZcblx0XHRcdFx0fSBlbHNlIGlmICh4Zmlyc3QgPT09IHRoaXMuX2ZpcnN0UFQpIHtcblx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQuX25leHQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHB0Ll9uZXh0KSB7XG5cdFx0XHRcdFx0dGhpcy5fbGlua0NTU1AocHQuX25leHQsIHB0Ll9uZXh0Ll9uZXh0LCB4Zmlyc3QuX3ByZXYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2NsYXNzTmFtZVBUID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBUd2VlblBsdWdpbi5wcm90b3R5cGUuX2tpbGwuY2FsbCh0aGlzLCBjb3B5KTtcblx0XHR9O1xuXG5cblxuXHRcdC8vdXNlZCBieSBjYXNjYWRlVG8oKSBmb3IgZ2F0aGVyaW5nIGFsbCB0aGUgc3R5bGUgcHJvcGVydGllcyBvZiBlYWNoIGNoaWxkIGVsZW1lbnQgaW50byBhbiBhcnJheSBmb3IgY29tcGFyaXNvbi5cblx0XHR2YXIgX2dldENoaWxkU3R5bGVzID0gZnVuY3Rpb24oZSwgcHJvcHMsIHRhcmdldHMpIHtcblx0XHRcdFx0dmFyIGNoaWxkcmVuLCBpLCBjaGlsZCwgdHlwZTtcblx0XHRcdFx0aWYgKGUuc2xpY2UpIHtcblx0XHRcdFx0XHRpID0gZS5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRfZ2V0Q2hpbGRTdHlsZXMoZVtpXSwgcHJvcHMsIHRhcmdldHMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2hpbGRyZW4gPSBlLmNoaWxkTm9kZXM7XG5cdFx0XHRcdGkgPSBjaGlsZHJlbi5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdGNoaWxkID0gY2hpbGRyZW5baV07XG5cdFx0XHRcdFx0dHlwZSA9IGNoaWxkLnR5cGU7XG5cdFx0XHRcdFx0aWYgKGNoaWxkLnN0eWxlKSB7XG5cdFx0XHRcdFx0XHRwcm9wcy5wdXNoKF9nZXRBbGxTdHlsZXMoY2hpbGQpKTtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRzKSB7XG5cdFx0XHRcdFx0XHRcdHRhcmdldHMucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgodHlwZSA9PT0gMSB8fCB0eXBlID09PSA5IHx8IHR5cGUgPT09IDExKSAmJiBjaGlsZC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0X2dldENoaWxkU3R5bGVzKGNoaWxkLCBwcm9wcywgdGFyZ2V0cyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogVHlwaWNhbGx5IG9ubHkgdXNlZnVsIGZvciBjbGFzc05hbWUgdHdlZW5zIHRoYXQgbWF5IGFmZmVjdCBjaGlsZCBlbGVtZW50cywgdGhpcyBtZXRob2QgY3JlYXRlcyBhIFR3ZWVuTGl0ZVxuXHRcdCAqIGFuZCB0aGVuIGNvbXBhcmVzIHRoZSBzdHlsZSBwcm9wZXJ0aWVzIG9mIGFsbCB0aGUgdGFyZ2V0J3MgY2hpbGQgZWxlbWVudHMgYXQgdGhlIHR3ZWVuJ3Mgc3RhcnQgYW5kIGVuZCwgYW5kXG5cdFx0ICogaWYgYW55IGFyZSBkaWZmZXJlbnQsIGl0IGFsc28gY3JlYXRlcyB0d2VlbnMgZm9yIHRob3NlIGFuZCByZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgQUxMIG9mIHRoZSByZXN1bHRpbmdcblx0XHQgKiB0d2VlbnMgKHNvIHRoYXQgeW91IGNhbiBlYXNpbHkgYWRkKCkgdGhlbSB0byBhIFRpbWVsaW5lTGl0ZSwgZm9yIGV4YW1wbGUpLiBUaGUgcmVhc29uIHRoaXMgZnVuY3Rpb25hbGl0eSBpc1xuXHRcdCAqIHdyYXBwZWQgaW50byBhIHNlcGFyYXRlIHN0YXRpYyBtZXRob2Qgb2YgQ1NTUGx1Z2luIGluc3RlYWQgb2YgYmVpbmcgaW50ZWdyYXRlZCBpbnRvIGFsbCByZWd1bGFyIGNsYXNzTmFtZSB0d2VlbnNcblx0XHQgKiBpcyBiZWNhdXNlIGl0IGNyZWF0ZXMgZW50aXJlbHkgbmV3IHR3ZWVucyB0aGF0IG1heSBoYXZlIGNvbXBsZXRlbHkgZGlmZmVyZW50IHRhcmdldHMgdGhhbiB0aGUgb3JpZ2luYWwgdHdlZW4sXG5cdFx0ICogc28gaWYgdGhleSB3ZXJlIGFsbCBsdW1wZWQgaW50byB0aGUgb3JpZ2luYWwgdHdlZW4gaW5zdGFuY2UsIGl0IHdvdWxkIGJlIGluY29uc2lzdGVudCB3aXRoIHRoZSByZXN0IG9mIHRoZSBBUElcblx0XHQgKiBhbmQgaXQgd291bGQgY3JlYXRlIG90aGVyIHByb2JsZW1zLiBGb3IgZXhhbXBsZTpcblx0XHQgKiAgLSBJZiBJIGNyZWF0ZSBhIHR3ZWVuIG9mIGVsZW1lbnRBLCB0aGF0IHR3ZWVuIGluc3RhbmNlIG1heSBzdWRkZW5seSBjaGFuZ2UgaXRzIHRhcmdldCB0byBpbmNsdWRlIDUwIG90aGVyIGVsZW1lbnRzICh1bmludHVpdGl2ZSBpZiBJIHNwZWNpZmljYWxseSBkZWZpbmVkIHRoZSB0YXJnZXQgSSB3YW50ZWQpXG5cdFx0ICogIC0gV2UgY2FuJ3QganVzdCBjcmVhdGUgbmV3IGluZGVwZW5kZW50IHR3ZWVucyBiZWNhdXNlIG90aGVyd2lzZSwgd2hhdCBoYXBwZW5zIGlmIHRoZSBvcmlnaW5hbC9wYXJlbnQgdHdlZW4gaXMgcmV2ZXJzZWQgb3IgcGF1c2Ugb3IgZHJvcHBlZCBpbnRvIGEgVGltZWxpbmVMaXRlIGZvciB0aWdodCBjb250cm9sPyBZb3UnZCBleHBlY3QgdGhhdCB0d2VlbidzIGJlaGF2aW9yIHRvIGFmZmVjdCBhbGwgdGhlIG90aGVycy5cblx0XHQgKiAgLSBBbmFseXppbmcgZXZlcnkgc3R5bGUgcHJvcGVydHkgb2YgZXZlcnkgY2hpbGQgYmVmb3JlIGFuZCBhZnRlciB0aGUgdHdlZW4gaXMgYW4gZXhwZW5zaXZlIG9wZXJhdGlvbiB3aGVuIHRoZXJlIGFyZSBtYW55IGNoaWxkcmVuLCBzbyB0aGlzIGJlaGF2aW9yIHNob3VsZG4ndCBiZSBpbXBvc2VkIG9uIGFsbCBjbGFzc05hbWUgdHdlZW5zIGJ5IGRlZmF1bHQsIGVzcGVjaWFsbHkgc2luY2UgaXQncyBwcm9iYWJseSByYXJlIHRoYXQgdGhpcyBleHRyYSBmdW5jdGlvbmFsaXR5IGlzIG5lZWRlZC5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgb2JqZWN0IHRvIGJlIHR3ZWVuZWRcblx0XHQgKiBAcGFyYW0ge251bWJlcn0gRHVyYXRpb24gaW4gc2Vjb25kcyAob3IgZnJhbWVzIGZvciBmcmFtZXMtYmFzZWQgdHdlZW5zKVxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgZW5kIHZhbHVlcywgbGlrZSB7Y2xhc3NOYW1lOlwibmV3Q2xhc3NcIiwgZWFzZTpMaW5lYXIuZWFzZU5vbmV9XG5cdFx0ICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIFR3ZWVuTGl0ZSBpbnN0YW5jZXNcblx0XHQgKi9cblx0XHRDU1NQbHVnaW4uY2FzY2FkZVRvID0gZnVuY3Rpb24odGFyZ2V0LCBkdXJhdGlvbiwgdmFycykge1xuXHRcdFx0dmFyIHR3ZWVuID0gVHdlZW5MaXRlLnRvKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpLFxuXHRcdFx0XHRyZXN1bHRzID0gW3R3ZWVuXSxcblx0XHRcdFx0YiA9IFtdLFxuXHRcdFx0XHRlID0gW10sXG5cdFx0XHRcdHRhcmdldHMgPSBbXSxcblx0XHRcdFx0X3Jlc2VydmVkUHJvcHMgPSBUd2VlbkxpdGUuX2ludGVybmFscy5yZXNlcnZlZFByb3BzLFxuXHRcdFx0XHRpLCBkaWZzLCBwLCBmcm9tO1xuXHRcdFx0dGFyZ2V0ID0gdHdlZW4uX3RhcmdldHMgfHwgdHdlZW4udGFyZ2V0O1xuXHRcdFx0X2dldENoaWxkU3R5bGVzKHRhcmdldCwgYiwgdGFyZ2V0cyk7XG5cdFx0XHR0d2Vlbi5yZW5kZXIoZHVyYXRpb24sIHRydWUsIHRydWUpO1xuXHRcdFx0X2dldENoaWxkU3R5bGVzKHRhcmdldCwgZSk7XG5cdFx0XHR0d2Vlbi5yZW5kZXIoMCwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHR0d2Vlbi5fZW5hYmxlZCh0cnVlKTtcblx0XHRcdGkgPSB0YXJnZXRzLmxlbmd0aDtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRkaWZzID0gX2Nzc0RpZih0YXJnZXRzW2ldLCBiW2ldLCBlW2ldKTtcblx0XHRcdFx0aWYgKGRpZnMuZmlyc3RNUFQpIHtcblx0XHRcdFx0XHRkaWZzID0gZGlmcy5kaWZzO1xuXHRcdFx0XHRcdGZvciAocCBpbiB2YXJzKSB7XG5cdFx0XHRcdFx0XHRpZiAoX3Jlc2VydmVkUHJvcHNbcF0pIHtcblx0XHRcdFx0XHRcdFx0ZGlmc1twXSA9IHZhcnNbcF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZyb20gPSB7fTtcblx0XHRcdFx0XHRmb3IgKHAgaW4gZGlmcykge1xuXHRcdFx0XHRcdFx0ZnJvbVtwXSA9IGJbaV1bcF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlc3VsdHMucHVzaChUd2VlbkxpdGUuZnJvbVRvKHRhcmdldHNbaV0sIGR1cmF0aW9uLCBmcm9tLCBkaWZzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHRzO1xuXHRcdH07XG5cblx0XHRUd2VlblBsdWdpbi5hY3RpdmF0ZShbQ1NTUGx1Z2luXSk7XG5cdFx0cmV0dXJuIENTU1BsdWdpbjtcblxuXHR9LCB0cnVlKTtcblx0XG59KTsgaWYgKF9nc1Njb3BlLl9nc0RlZmluZSkgeyBfZ3NTY29wZS5fZ3NRdWV1ZS5wb3AoKSgpOyB9XG5cbi8vZXhwb3J0IHRvIEFNRC9SZXF1aXJlSlMgYW5kIENvbW1vbkpTL05vZGUgKHByZWN1cnNvciB0byBmdWxsIG1vZHVsYXIgYnVpbGQgc3lzdGVtIGNvbWluZyBhdCBhIGxhdGVyIGRhdGUpXG4oZnVuY3Rpb24obmFtZSkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIGdldEdsb2JhbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiAoX2dzU2NvcGUuR3JlZW5Tb2NrR2xvYmFscyB8fCBfZ3NTY29wZSlbbmFtZV07XG5cdH07XG5cdGlmICh0eXBlb2YoZGVmaW5lKSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHsgLy9BTURcblx0XHRkZWZpbmUoW1wiVHdlZW5MaXRlXCJdLCBnZXRHbG9iYWwpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZihtb2R1bGUpICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7IC8vbm9kZVxuXHRcdHJlcXVpcmUoXCIuLi9Ud2VlbkxpdGUuanNcIik7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBnZXRHbG9iYWwoKTtcblx0fVxufShcIkNTU1BsdWdpblwiKSk7XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2dzYXAvc3JjL3VuY29tcHJlc3NlZC9wbHVnaW5zL0NTU1BsdWdpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG52YXIgZGVmaW5lID0gZmFsc2U7XG5cbi8qIVxuICogVkVSU0lPTjogMS4xOC4yXG4gKiBEQVRFOiAyMDE1LTEyLTIyXG4gKiBVUERBVEVTIEFORCBET0NTIEFUOiBodHRwOi8vZ3JlZW5zb2NrLmNvbVxuICpcbiAqIEBsaWNlbnNlIENvcHlyaWdodCAoYykgMjAwOC0yMDE2LCBHcmVlblNvY2suIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBUaGlzIHdvcmsgaXMgc3ViamVjdCB0byB0aGUgdGVybXMgYXQgaHR0cDovL2dyZWVuc29jay5jb20vc3RhbmRhcmQtbGljZW5zZSBvciBmb3JcbiAqIENsdWIgR3JlZW5Tb2NrIG1lbWJlcnMsIHRoZSBzb2Z0d2FyZSBhZ3JlZW1lbnQgdGhhdCB3YXMgaXNzdWVkIHdpdGggeW91ciBtZW1iZXJzaGlwLlxuICogXG4gKiBAYXV0aG9yOiBKYWNrIERveWxlLCBqYWNrQGdyZWVuc29jay5jb21cbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgbW9kdWxlTmFtZSkge1xuXG5cdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFx0dmFyIF9nbG9iYWxzID0gd2luZG93LkdyZWVuU29ja0dsb2JhbHMgPSB3aW5kb3cuR3JlZW5Tb2NrR2xvYmFscyB8fCB3aW5kb3c7XG5cdFx0aWYgKF9nbG9iYWxzLlR3ZWVuTGl0ZSkge1xuXHRcdFx0cmV0dXJuOyAvL2luIGNhc2UgdGhlIGNvcmUgc2V0IG9mIGNsYXNzZXMgaXMgYWxyZWFkeSBsb2FkZWQsIGRvbid0IGluc3RhbnRpYXRlIHR3aWNlLlxuXHRcdH1cblx0XHR2YXIgX25hbWVzcGFjZSA9IGZ1bmN0aW9uKG5zKSB7XG5cdFx0XHRcdHZhciBhID0gbnMuc3BsaXQoXCIuXCIpLFxuXHRcdFx0XHRcdHAgPSBfZ2xvYmFscywgaTtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRwW2FbaV1dID0gcCA9IHBbYVtpXV0gfHwge307XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHA7XG5cdFx0XHR9LFxuXHRcdFx0Z3MgPSBfbmFtZXNwYWNlKFwiY29tLmdyZWVuc29ja1wiKSxcblx0XHRcdF90aW55TnVtID0gMC4wMDAwMDAwMDAxLFxuXHRcdFx0X3NsaWNlID0gZnVuY3Rpb24oYSkgeyAvL2Rvbid0IHVzZSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0YXJnZXQsIDApIGJlY2F1c2UgdGhhdCBkb2Vzbid0IHdvcmsgaW4gSUU4IHdpdGggYSBOb2RlTGlzdCB0aGF0J3MgcmV0dXJuZWQgYnkgcXVlcnlTZWxlY3RvckFsbCgpXG5cdFx0XHRcdHZhciBiID0gW10sXG5cdFx0XHRcdFx0bCA9IGEubGVuZ3RoLFxuXHRcdFx0XHRcdGk7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgIT09IGw7IGIucHVzaChhW2krK10pKSB7fVxuXHRcdFx0XHRyZXR1cm4gYjtcblx0XHRcdH0sXG5cdFx0XHRfZW1wdHlGdW5jID0gZnVuY3Rpb24oKSB7fSxcblx0XHRcdF9pc0FycmF5ID0gKGZ1bmN0aW9uKCkgeyAvL3dvcmtzIGFyb3VuZCBpc3N1ZXMgaW4gaWZyYW1lIGVudmlyb25tZW50cyB3aGVyZSB0aGUgQXJyYXkgZ2xvYmFsIGlzbid0IHNoYXJlZCwgdGh1cyBpZiB0aGUgb2JqZWN0IG9yaWdpbmF0ZXMgaW4gYSBkaWZmZXJlbnQgd2luZG93L2lmcmFtZSwgXCIob2JqIGluc3RhbmNlb2YgQXJyYXkpXCIgd2lsbCBldmFsdWF0ZSBmYWxzZS4gV2UgYWRkZWQgc29tZSBzcGVlZCBvcHRpbWl6YXRpb25zIHRvIGF2b2lkIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCgpIHVubGVzcyBpdCdzIGFic29sdXRlbHkgbmVjZXNzYXJ5IGJlY2F1c2UgaXQncyBWRVJZIHNsb3cgKGxpa2UgMjB4IHNsb3dlcilcblx0XHRcdFx0dmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxcblx0XHRcdFx0XHRhcnJheSA9IHRvU3RyaW5nLmNhbGwoW10pO1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9iaiAhPSBudWxsICYmIChvYmogaW5zdGFuY2VvZiBBcnJheSB8fCAodHlwZW9mKG9iaikgPT09IFwib2JqZWN0XCIgJiYgISFvYmoucHVzaCAmJiB0b1N0cmluZy5jYWxsKG9iaikgPT09IGFycmF5KSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KCkpLFxuXHRcdFx0YSwgaSwgcCwgX3RpY2tlciwgX3RpY2tlckFjdGl2ZSxcblx0XHRcdF9kZWZMb29rdXAgPSB7fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHRcdCAqIERlZmluZXMgYSBHcmVlblNvY2sgY2xhc3MsIG9wdGlvbmFsbHkgd2l0aCBhbiBhcnJheSBvZiBkZXBlbmRlbmNpZXMgdGhhdCBtdXN0IGJlIGluc3RhbnRpYXRlZCBmaXJzdCBhbmQgcGFzc2VkIGludG8gdGhlIGRlZmluaXRpb24uXG5cdFx0XHQgKiBUaGlzIGFsbG93cyB1c2VycyB0byBsb2FkIEdyZWVuU29jayBKUyBmaWxlcyBpbiBhbnkgb3JkZXIgZXZlbiBpZiB0aGV5IGhhdmUgaW50ZXJkZXBlbmRlbmNpZXMgKGxpa2UgQ1NTUGx1Z2luIGV4dGVuZHMgVHdlZW5QbHVnaW4gd2hpY2ggaXNcblx0XHRcdCAqIGluc2lkZSBUd2VlbkxpdGUuanMsIGJ1dCBpZiBDU1NQbHVnaW4gaXMgbG9hZGVkIGZpcnN0LCBpdCBzaG91bGQgd2FpdCB0byBydW4gaXRzIGNvZGUgdW50aWwgVHdlZW5MaXRlLmpzIGxvYWRzIGFuZCBpbnN0YW50aWF0ZXMgVHdlZW5QbHVnaW5cblx0XHRcdCAqIGFuZCB0aGVuIHBhc3MgVHdlZW5QbHVnaW4gdG8gQ1NTUGx1Z2luJ3MgZGVmaW5pdGlvbikuIFRoaXMgaXMgYWxsIGRvbmUgYXV0b21hdGljYWxseSBhbmQgaW50ZXJuYWxseS5cblx0XHRcdCAqXG5cdFx0XHQgKiBFdmVyeSBkZWZpbml0aW9uIHdpbGwgYmUgYWRkZWQgdG8gYSBcImNvbS5ncmVlbnNvY2tcIiBnbG9iYWwgb2JqZWN0ICh0eXBpY2FsbHkgd2luZG93LCBidXQgaWYgYSB3aW5kb3cuR3JlZW5Tb2NrR2xvYmFscyBvYmplY3QgaXMgZm91bmQsXG5cdFx0XHQgKiBpdCB3aWxsIGdvIHRoZXJlIGFzIG9mIHYxLjcpLiBGb3IgZXhhbXBsZSwgVHdlZW5MaXRlIHdpbGwgYmUgZm91bmQgYXQgd2luZG93LmNvbS5ncmVlbnNvY2suVHdlZW5MaXRlIGFuZCBzaW5jZSBpdCdzIGEgZ2xvYmFsIGNsYXNzIHRoYXQgc2hvdWxkIGJlIGF2YWlsYWJsZSBhbnl3aGVyZSxcblx0XHRcdCAqIGl0IGlzIEFMU08gcmVmZXJlbmNlZCBhdCB3aW5kb3cuVHdlZW5MaXRlLiBIb3dldmVyIHNvbWUgY2xhc3NlcyBhcmVuJ3QgY29uc2lkZXJlZCBnbG9iYWwsIGxpa2UgdGhlIGJhc2UgY29tLmdyZWVuc29jay5jb3JlLkFuaW1hdGlvbiBjbGFzcywgc29cblx0XHRcdCAqIHRob3NlIHdpbGwgb25seSBiZSBhdCB0aGUgcGFja2FnZSBsaWtlIHdpbmRvdy5jb20uZ3JlZW5zb2NrLmNvcmUuQW5pbWF0aW9uLiBBZ2FpbiwgaWYgeW91IGRlZmluZSBhIEdyZWVuU29ja0dsb2JhbHMgb2JqZWN0IG9uIHRoZSB3aW5kb3csIGV2ZXJ5dGhpbmdcblx0XHRcdCAqIGdldHMgdHVja2VkIG5lYXRseSBpbnNpZGUgdGhlcmUgaW5zdGVhZCBvZiBvbiB0aGUgd2luZG93IGRpcmVjdGx5LiBUaGlzIGFsbG93cyB5b3UgdG8gZG8gYWR2YW5jZWQgdGhpbmdzIGxpa2UgbG9hZCBtdWx0aXBsZSB2ZXJzaW9ucyBvZiBHcmVlblNvY2tcblx0XHRcdCAqIGZpbGVzIGFuZCBwdXQgdGhlbSBpbnRvIGRpc3RpbmN0IG9iamVjdHMgKGltYWdpbmUgYSBiYW5uZXIgYWQgdXNlcyBhIG5ld2VyIHZlcnNpb24gYnV0IHRoZSBtYWluIHNpdGUgdXNlcyBhbiBvbGRlciBvbmUpLiBJbiB0aGF0IGNhc2UsIHlvdSBjb3VsZFxuXHRcdFx0ICogc2FuZGJveCB0aGUgYmFubmVyIG9uZSBsaWtlOlxuXHRcdFx0ICpcblx0XHRcdCAqIDxzY3JpcHQ+XG5cdFx0XHQgKiAgICAgdmFyIGdzID0gd2luZG93LkdyZWVuU29ja0dsb2JhbHMgPSB7fTsgLy90aGUgbmV3ZXIgdmVyc2lvbiB3ZSdyZSBhYm91dCB0byBsb2FkIGNvdWxkIG5vdyBiZSByZWZlcmVuY2VkIGluIGEgXCJnc1wiIG9iamVjdCwgbGlrZSBncy5Ud2VlbkxpdGUudG8oLi4uKS4gVXNlIHdoYXRldmVyIGFsaWFzIHlvdSB3YW50IGFzIGxvbmcgYXMgaXQncyB1bmlxdWUsIFwiZ3NcIiBvciBcImJhbm5lclwiIG9yIHdoYXRldmVyLlxuXHRcdFx0ICogPC9zY3JpcHQ+XG5cdFx0XHQgKiA8c2NyaXB0IHNyYz1cImpzL2dyZWVuc29jay92MS43L1R3ZWVuTWF4LmpzXCI+PC9zY3JpcHQ+XG5cdFx0XHQgKiA8c2NyaXB0PlxuXHRcdFx0ICogICAgIHdpbmRvdy5HcmVlblNvY2tHbG9iYWxzID0gd2luZG93Ll9nc1F1ZXVlID0gd2luZG93Ll9nc0RlZmluZSA9IG51bGw7IC8vcmVzZXQgaXQgYmFjayB0byBudWxsIChhbG9uZyB3aXRoIHRoZSBzcGVjaWFsIF9nc1F1ZXVlIHZhcmlhYmxlKSBzbyB0aGF0IHRoZSBuZXh0IGxvYWQgb2YgVHdlZW5NYXggYWZmZWN0cyB0aGUgd2luZG93IGFuZCB3ZSBjYW4gcmVmZXJlbmNlIHRoaW5ncyBkaXJlY3RseSBsaWtlIFR3ZWVuTGl0ZS50byguLi4pXG5cdFx0XHQgKiA8L3NjcmlwdD5cblx0XHRcdCAqIDxzY3JpcHQgc3JjPVwianMvZ3JlZW5zb2NrL3YxLjYvVHdlZW5NYXguanNcIj48L3NjcmlwdD5cblx0XHRcdCAqIDxzY3JpcHQ+XG5cdFx0XHQgKiAgICAgZ3MuVHdlZW5MaXRlLnRvKC4uLik7IC8vd291bGQgdXNlIHYxLjdcblx0XHRcdCAqICAgICBUd2VlbkxpdGUudG8oLi4uKTsgLy93b3VsZCB1c2UgdjEuNlxuXHRcdFx0ICogPC9zY3JpcHQ+XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHshc3RyaW5nfSBucyBUaGUgbmFtZXNwYWNlIG9mIHRoZSBjbGFzcyBkZWZpbml0aW9uLCBsZWF2aW5nIG9mZiBcImNvbS5ncmVlbnNvY2suXCIgYXMgdGhhdCdzIGFzc3VtZWQuIEZvciBleGFtcGxlLCBcIlR3ZWVuTGl0ZVwiIG9yIFwicGx1Z2lucy5DU1NQbHVnaW5cIiBvciBcImVhc2luZy5CYWNrXCIuXG5cdFx0XHQgKiBAcGFyYW0geyFBcnJheS48c3RyaW5nPn0gZGVwZW5kZW5jaWVzIEFuIGFycmF5IG9mIGRlcGVuZGVuY2llcyAoZGVzY3JpYmVkIGFzIHRoZWlyIG5hbWVzcGFjZXMgbWludXMgXCJjb20uZ3JlZW5zb2NrLlwiIHByZWZpeCkuIEZvciBleGFtcGxlIFtcIlR3ZWVuTGl0ZVwiLFwicGx1Z2lucy5Ud2VlblBsdWdpblwiLFwiY29yZS5BbmltYXRpb25cIl1cblx0XHRcdCAqIEBwYXJhbSB7IWZ1bmN0aW9uKCk6T2JqZWN0fSBmdW5jIFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgYW5kIHBhc3NlZCB0aGUgcmVzb2x2ZWQgZGVwZW5kZW5jaWVzIHdoaWNoIHdpbGwgcmV0dXJuIHRoZSBhY3R1YWwgY2xhc3MgZm9yIHRoaXMgZGVmaW5pdGlvbi5cblx0XHRcdCAqIEBwYXJhbSB7Ym9vbGVhbj19IGdsb2JhbCBJZiB0cnVlLCB0aGUgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgZ2xvYmFsIHNjb3BlICh0eXBpY2FsbHkgd2luZG93IHVubGVzcyB5b3UgZGVmaW5lIGEgd2luZG93LkdyZWVuU29ja0dsb2JhbHMgb2JqZWN0KVxuXHRcdFx0ICovXG5cdFx0XHREZWZpbml0aW9uID0gZnVuY3Rpb24obnMsIGRlcGVuZGVuY2llcywgZnVuYywgZ2xvYmFsKSB7XG5cdFx0XHRcdHRoaXMuc2MgPSAoX2RlZkxvb2t1cFtuc10pID8gX2RlZkxvb2t1cFtuc10uc2MgOiBbXTsgLy9zdWJjbGFzc2VzXG5cdFx0XHRcdF9kZWZMb29rdXBbbnNdID0gdGhpcztcblx0XHRcdFx0dGhpcy5nc0NsYXNzID0gbnVsbDtcblx0XHRcdFx0dGhpcy5mdW5jID0gZnVuYztcblx0XHRcdFx0dmFyIF9jbGFzc2VzID0gW107XG5cdFx0XHRcdHRoaXMuY2hlY2sgPSBmdW5jdGlvbihpbml0KSB7XG5cdFx0XHRcdFx0dmFyIGkgPSBkZXBlbmRlbmNpZXMubGVuZ3RoLFxuXHRcdFx0XHRcdFx0bWlzc2luZyA9IGksXG5cdFx0XHRcdFx0XHRjdXIsIGEsIG4sIGNsLCBoYXNNb2R1bGU7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRpZiAoKGN1ciA9IF9kZWZMb29rdXBbZGVwZW5kZW5jaWVzW2ldXSB8fCBuZXcgRGVmaW5pdGlvbihkZXBlbmRlbmNpZXNbaV0sIFtdKSkuZ3NDbGFzcykge1xuXHRcdFx0XHRcdFx0XHRfY2xhc3Nlc1tpXSA9IGN1ci5nc0NsYXNzO1xuXHRcdFx0XHRcdFx0XHRtaXNzaW5nLS07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGluaXQpIHtcblx0XHRcdFx0XHRcdFx0Y3VyLnNjLnB1c2godGhpcyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtaXNzaW5nID09PSAwICYmIGZ1bmMpIHtcblx0XHRcdFx0XHRcdGEgPSAoXCJjb20uZ3JlZW5zb2NrLlwiICsgbnMpLnNwbGl0KFwiLlwiKTtcblx0XHRcdFx0XHRcdG4gPSBhLnBvcCgpO1xuXHRcdFx0XHRcdFx0Y2wgPSBfbmFtZXNwYWNlKGEuam9pbihcIi5cIikpW25dID0gdGhpcy5nc0NsYXNzID0gZnVuYy5hcHBseShmdW5jLCBfY2xhc3Nlcyk7XG5cblx0XHRcdFx0XHRcdC8vZXhwb3J0cyB0byBtdWx0aXBsZSBlbnZpcm9ubWVudHNcblx0XHRcdFx0XHRcdGlmIChnbG9iYWwpIHtcblx0XHRcdFx0XHRcdFx0X2dsb2JhbHNbbl0gPSBjbDsgLy9wcm92aWRlcyBhIHdheSB0byBhdm9pZCBnbG9iYWwgbmFtZXNwYWNlIHBvbGx1dGlvbi4gQnkgZGVmYXVsdCwgdGhlIG1haW4gY2xhc3NlcyBsaWtlIFR3ZWVuTGl0ZSwgUG93ZXIxLCBTdHJvbmcsIGV0Yy4gYXJlIGFkZGVkIHRvIHdpbmRvdyB1bmxlc3MgYSBHcmVlblNvY2tHbG9iYWxzIGlzIGRlZmluZWQuIFNvIGlmIHlvdSB3YW50IHRvIGhhdmUgdGhpbmdzIGFkZGVkIHRvIGEgY3VzdG9tIG9iamVjdCBpbnN0ZWFkLCBqdXN0IGRvIHNvbWV0aGluZyBsaWtlIHdpbmRvdy5HcmVlblNvY2tHbG9iYWxzID0ge30gYmVmb3JlIGxvYWRpbmcgYW55IEdyZWVuU29jayBmaWxlcy4gWW91IGNhbiBldmVuIHNldCB1cCBhbiBhbGlhcyBsaWtlIHdpbmRvdy5HcmVlblNvY2tHbG9iYWxzID0gd2luZG93cy5ncyA9IHt9IHNvIHRoYXQgeW91IGNhbiBhY2Nlc3MgZXZlcnl0aGluZyBsaWtlIGdzLlR3ZWVuTGl0ZS4gQWxzbyByZW1lbWJlciB0aGF0IEFMTCBjbGFzc2VzIGFyZSBhZGRlZCB0byB0aGUgd2luZG93LmNvbS5ncmVlbnNvY2sgb2JqZWN0IChpbiB0aGVpciByZXNwZWN0aXZlIHBhY2thZ2VzLCBsaWtlIGNvbS5ncmVlbnNvY2suZWFzaW5nLlBvd2VyMSwgY29tLmdyZWVuc29jay5Ud2VlbkxpdGUsIGV0Yy4pXG5cdFx0XHRcdFx0XHRcdGhhc01vZHVsZSA9ICh0eXBlb2YobW9kdWxlKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyk7XG5cdFx0XHRcdFx0XHRcdGlmICghaGFzTW9kdWxlICYmIHR5cGVvZihkZWZpbmUpID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCl7IC8vQU1EXG5cdFx0XHRcdFx0XHRcdFx0ZGVmaW5lKCh3aW5kb3cuR3JlZW5Tb2NrQU1EUGF0aCA/IHdpbmRvdy5HcmVlblNvY2tBTURQYXRoICsgXCIvXCIgOiBcIlwiKSArIG5zLnNwbGl0KFwiLlwiKS5wb3AoKSwgW10sIGZ1bmN0aW9uKCkgeyByZXR1cm4gY2w7IH0pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG5zID09PSBtb2R1bGVOYW1lICYmIGhhc01vZHVsZSl7IC8vbm9kZVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5leHBvcnRzID0gY2w7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLnNjLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2NbaV0uY2hlY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMuY2hlY2sodHJ1ZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvL3VzZWQgdG8gY3JlYXRlIERlZmluaXRpb24gaW5zdGFuY2VzICh3aGljaCBiYXNpY2FsbHkgcmVnaXN0ZXJzIGEgY2xhc3MgdGhhdCBoYXMgZGVwZW5kZW5jaWVzKS5cblx0XHRcdF9nc0RlZmluZSA9IHdpbmRvdy5fZ3NEZWZpbmUgPSBmdW5jdGlvbihucywgZGVwZW5kZW5jaWVzLCBmdW5jLCBnbG9iYWwpIHtcblx0XHRcdFx0cmV0dXJuIG5ldyBEZWZpbml0aW9uKG5zLCBkZXBlbmRlbmNpZXMsIGZ1bmMsIGdsb2JhbCk7XG5cdFx0XHR9LFxuXG5cdFx0XHQvL2EgcXVpY2sgd2F5IHRvIGNyZWF0ZSBhIGNsYXNzIHRoYXQgZG9lc24ndCBoYXZlIGFueSBkZXBlbmRlbmNpZXMuIFJldHVybnMgdGhlIGNsYXNzLCBidXQgZmlyc3QgcmVnaXN0ZXJzIGl0IGluIHRoZSBHcmVlblNvY2sgbmFtZXNwYWNlIHNvIHRoYXQgb3RoZXIgY2xhc3NlcyBjYW4gZ3JhYiBpdCAob3RoZXIgY2xhc3NlcyBtaWdodCBiZSBkZXBlbmRlbnQgb24gdGhlIGNsYXNzKS5cblx0XHRcdF9jbGFzcyA9IGdzLl9jbGFzcyA9IGZ1bmN0aW9uKG5zLCBmdW5jLCBnbG9iYWwpIHtcblx0XHRcdFx0ZnVuYyA9IGZ1bmMgfHwgZnVuY3Rpb24oKSB7fTtcblx0XHRcdFx0X2dzRGVmaW5lKG5zLCBbXSwgZnVuY3Rpb24oKXsgcmV0dXJuIGZ1bmM7IH0sIGdsb2JhbCk7XG5cdFx0XHRcdHJldHVybiBmdW5jO1xuXHRcdFx0fTtcblxuXHRcdF9nc0RlZmluZS5nbG9iYWxzID0gX2dsb2JhbHM7XG5cblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWFzZVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cdFx0dmFyIF9iYXNlUGFyYW1zID0gWzAsIDAsIDEsIDFdLFxuXHRcdFx0X2JsYW5rQXJyYXkgPSBbXSxcblx0XHRcdEVhc2UgPSBfY2xhc3MoXCJlYXNpbmcuRWFzZVwiLCBmdW5jdGlvbihmdW5jLCBleHRyYVBhcmFtcywgdHlwZSwgcG93ZXIpIHtcblx0XHRcdFx0dGhpcy5fZnVuYyA9IGZ1bmM7XG5cdFx0XHRcdHRoaXMuX3R5cGUgPSB0eXBlIHx8IDA7XG5cdFx0XHRcdHRoaXMuX3Bvd2VyID0gcG93ZXIgfHwgMDtcblx0XHRcdFx0dGhpcy5fcGFyYW1zID0gZXh0cmFQYXJhbXMgPyBfYmFzZVBhcmFtcy5jb25jYXQoZXh0cmFQYXJhbXMpIDogX2Jhc2VQYXJhbXM7XG5cdFx0XHR9LCB0cnVlKSxcblx0XHRcdF9lYXNlTWFwID0gRWFzZS5tYXAgPSB7fSxcblx0XHRcdF9lYXNlUmVnID0gRWFzZS5yZWdpc3RlciA9IGZ1bmN0aW9uKGVhc2UsIG5hbWVzLCB0eXBlcywgY3JlYXRlKSB7XG5cdFx0XHRcdHZhciBuYSA9IG5hbWVzLnNwbGl0KFwiLFwiKSxcblx0XHRcdFx0XHRpID0gbmEubGVuZ3RoLFxuXHRcdFx0XHRcdHRhID0gKHR5cGVzIHx8IFwiZWFzZUluLGVhc2VPdXQsZWFzZUluT3V0XCIpLnNwbGl0KFwiLFwiKSxcblx0XHRcdFx0XHRlLCBuYW1lLCBqLCB0eXBlO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRuYW1lID0gbmFbaV07XG5cdFx0XHRcdFx0ZSA9IGNyZWF0ZSA/IF9jbGFzcyhcImVhc2luZy5cIituYW1lLCBudWxsLCB0cnVlKSA6IGdzLmVhc2luZ1tuYW1lXSB8fCB7fTtcblx0XHRcdFx0XHRqID0gdGEubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICgtLWogPiAtMSkge1xuXHRcdFx0XHRcdFx0dHlwZSA9IHRhW2pdO1xuXHRcdFx0XHRcdFx0X2Vhc2VNYXBbbmFtZSArIFwiLlwiICsgdHlwZV0gPSBfZWFzZU1hcFt0eXBlICsgbmFtZV0gPSBlW3R5cGVdID0gZWFzZS5nZXRSYXRpbyA/IGVhc2UgOiBlYXNlW3R5cGVdIHx8IG5ldyBlYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0cCA9IEVhc2UucHJvdG90eXBlO1xuXHRcdHAuX2NhbGNFbmQgPSBmYWxzZTtcblx0XHRwLmdldFJhdGlvID0gZnVuY3Rpb24ocCkge1xuXHRcdFx0aWYgKHRoaXMuX2Z1bmMpIHtcblx0XHRcdFx0dGhpcy5fcGFyYW1zWzBdID0gcDtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2Z1bmMuYXBwbHkobnVsbCwgdGhpcy5fcGFyYW1zKTtcblx0XHRcdH1cblx0XHRcdHZhciB0ID0gdGhpcy5fdHlwZSxcblx0XHRcdFx0cHcgPSB0aGlzLl9wb3dlcixcblx0XHRcdFx0ciA9ICh0ID09PSAxKSA/IDEgLSBwIDogKHQgPT09IDIpID8gcCA6IChwIDwgMC41KSA/IHAgKiAyIDogKDEgLSBwKSAqIDI7XG5cdFx0XHRpZiAocHcgPT09IDEpIHtcblx0XHRcdFx0ciAqPSByO1xuXHRcdFx0fSBlbHNlIGlmIChwdyA9PT0gMikge1xuXHRcdFx0XHRyICo9IHIgKiByO1xuXHRcdFx0fSBlbHNlIGlmIChwdyA9PT0gMykge1xuXHRcdFx0XHRyICo9IHIgKiByICogcjtcblx0XHRcdH0gZWxzZSBpZiAocHcgPT09IDQpIHtcblx0XHRcdFx0ciAqPSByICogciAqIHIgKiByO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICh0ID09PSAxKSA/IDEgLSByIDogKHQgPT09IDIpID8gciA6IChwIDwgMC41KSA/IHIgLyAyIDogMSAtIChyIC8gMik7XG5cdFx0fTtcblxuXHRcdC8vY3JlYXRlIGFsbCB0aGUgc3RhbmRhcmQgZWFzZXMgbGlrZSBMaW5lYXIsIFF1YWQsIEN1YmljLCBRdWFydCwgUXVpbnQsIFN0cm9uZywgUG93ZXIwLCBQb3dlcjEsIFBvd2VyMiwgUG93ZXIzLCBhbmQgUG93ZXI0IChlYWNoIHdpdGggZWFzZUluLCBlYXNlT3V0LCBhbmQgZWFzZUluT3V0KVxuXHRcdGEgPSBbXCJMaW5lYXJcIixcIlF1YWRcIixcIkN1YmljXCIsXCJRdWFydFwiLFwiUXVpbnQsU3Ryb25nXCJdO1xuXHRcdGkgPSBhLmxlbmd0aDtcblx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdHAgPSBhW2ldK1wiLFBvd2VyXCIraTtcblx0XHRcdF9lYXNlUmVnKG5ldyBFYXNlKG51bGwsbnVsbCwxLGkpLCBwLCBcImVhc2VPdXRcIiwgdHJ1ZSk7XG5cdFx0XHRfZWFzZVJlZyhuZXcgRWFzZShudWxsLG51bGwsMixpKSwgcCwgXCJlYXNlSW5cIiArICgoaSA9PT0gMCkgPyBcIixlYXNlTm9uZVwiIDogXCJcIikpO1xuXHRcdFx0X2Vhc2VSZWcobmV3IEVhc2UobnVsbCxudWxsLDMsaSksIHAsIFwiZWFzZUluT3V0XCIpO1xuXHRcdH1cblx0XHRfZWFzZU1hcC5saW5lYXIgPSBncy5lYXNpbmcuTGluZWFyLmVhc2VJbjtcblx0XHRfZWFzZU1hcC5zd2luZyA9IGdzLmVhc2luZy5RdWFkLmVhc2VJbk91dDsgLy9mb3IgalF1ZXJ5IGZvbGtzXG5cblxuLypcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEV2ZW50RGlzcGF0Y2hlclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cdFx0dmFyIEV2ZW50RGlzcGF0Y2hlciA9IF9jbGFzcyhcImV2ZW50cy5FdmVudERpc3BhdGNoZXJcIiwgZnVuY3Rpb24odGFyZ2V0KSB7XG5cdFx0XHR0aGlzLl9saXN0ZW5lcnMgPSB7fTtcblx0XHRcdHRoaXMuX2V2ZW50VGFyZ2V0ID0gdGFyZ2V0IHx8IHRoaXM7XG5cdFx0fSk7XG5cdFx0cCA9IEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGU7XG5cblx0XHRwLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHVzZVBhcmFtLCBwcmlvcml0eSkge1xuXHRcdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdFx0dmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0sXG5cdFx0XHRcdGluZGV4ID0gMCxcblx0XHRcdFx0bGlzdGVuZXIsIGk7XG5cdFx0XHRpZiAobGlzdCA9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IGxpc3QgPSBbXTtcblx0XHRcdH1cblx0XHRcdGkgPSBsaXN0Lmxlbmd0aDtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRsaXN0ZW5lciA9IGxpc3RbaV07XG5cdFx0XHRcdGlmIChsaXN0ZW5lci5jID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci5zID09PSBzY29wZSkge1xuXHRcdFx0XHRcdGxpc3Quc3BsaWNlKGksIDEpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGluZGV4ID09PSAwICYmIGxpc3RlbmVyLnByIDwgcHJpb3JpdHkpIHtcblx0XHRcdFx0XHRpbmRleCA9IGkgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRsaXN0LnNwbGljZShpbmRleCwgMCwge2M6Y2FsbGJhY2ssIHM6c2NvcGUsIHVwOnVzZVBhcmFtLCBwcjpwcmlvcml0eX0pO1xuXHRcdFx0aWYgKHRoaXMgPT09IF90aWNrZXIgJiYgIV90aWNrZXJBY3RpdmUpIHtcblx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHAucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXSwgaTtcblx0XHRcdGlmIChsaXN0KSB7XG5cdFx0XHRcdGkgPSBsaXN0Lmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGxpc3RbaV0uYyA9PT0gY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdGxpc3Quc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRwLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbih0eXBlKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXSxcblx0XHRcdFx0aSwgdCwgbGlzdGVuZXI7XG5cdFx0XHRpZiAobGlzdCkge1xuXHRcdFx0XHRpID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdHQgPSB0aGlzLl9ldmVudFRhcmdldDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0bGlzdGVuZXIgPSBsaXN0W2ldO1xuXHRcdFx0XHRcdGlmIChsaXN0ZW5lcikge1xuXHRcdFx0XHRcdFx0aWYgKGxpc3RlbmVyLnVwKSB7XG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyLmMuY2FsbChsaXN0ZW5lci5zIHx8IHQsIHt0eXBlOnR5cGUsIHRhcmdldDp0fSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lci5jLmNhbGwobGlzdGVuZXIucyB8fCB0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUaWNrZXJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuIFx0XHR2YXIgX3JlcUFuaW1GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG5cdFx0XHRfY2FuY2VsQW5pbUZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lLFxuXHRcdFx0X2dldFRpbWUgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHtyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7fSxcblx0XHRcdF9sYXN0VXBkYXRlID0gX2dldFRpbWUoKTtcblxuXHRcdC8vbm93IHRyeSB0byBkZXRlcm1pbmUgdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhbmQgY2FuY2VsQW5pbWF0aW9uRnJhbWUgZnVuY3Rpb25zIGFuZCBpZiBub25lIGFyZSBmb3VuZCwgd2UnbGwgdXNlIGEgc2V0VGltZW91dCgpL2NsZWFyVGltZW91dCgpIHBvbHlmaWxsLlxuXHRcdGEgPSBbXCJtc1wiLFwibW96XCIsXCJ3ZWJraXRcIixcIm9cIl07XG5cdFx0aSA9IGEubGVuZ3RoO1xuXHRcdHdoaWxlICgtLWkgPiAtMSAmJiAhX3JlcUFuaW1GcmFtZSkge1xuXHRcdFx0X3JlcUFuaW1GcmFtZSA9IHdpbmRvd1thW2ldICsgXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG5cdFx0XHRfY2FuY2VsQW5pbUZyYW1lID0gd2luZG93W2FbaV0gKyBcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdIHx8IHdpbmRvd1thW2ldICsgXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG5cdFx0fVxuXG5cdFx0X2NsYXNzKFwiVGlja2VyXCIsIGZ1bmN0aW9uKGZwcywgdXNlUkFGKSB7XG5cdFx0XHR2YXIgX3NlbGYgPSB0aGlzLFxuXHRcdFx0XHRfc3RhcnRUaW1lID0gX2dldFRpbWUoKSxcblx0XHRcdFx0X3VzZVJBRiA9ICh1c2VSQUYgIT09IGZhbHNlICYmIF9yZXFBbmltRnJhbWUpID8gXCJhdXRvXCIgOiBmYWxzZSxcblx0XHRcdFx0X2xhZ1RocmVzaG9sZCA9IDUwMCxcblx0XHRcdFx0X2FkanVzdGVkTGFnID0gMzMsXG5cdFx0XHRcdF90aWNrV29yZCA9IFwidGlja1wiLCAvL2hlbHBzIHJlZHVjZSBnYyBidXJkZW5cblx0XHRcdFx0X2ZwcywgX3JlcSwgX2lkLCBfZ2FwLCBfbmV4dFRpbWUsXG5cdFx0XHRcdF90aWNrID0gZnVuY3Rpb24obWFudWFsKSB7XG5cdFx0XHRcdFx0dmFyIGVsYXBzZWQgPSBfZ2V0VGltZSgpIC0gX2xhc3RVcGRhdGUsXG5cdFx0XHRcdFx0XHRvdmVybGFwLCBkaXNwYXRjaDtcblx0XHRcdFx0XHRpZiAoZWxhcHNlZCA+IF9sYWdUaHJlc2hvbGQpIHtcblx0XHRcdFx0XHRcdF9zdGFydFRpbWUgKz0gZWxhcHNlZCAtIF9hZGp1c3RlZExhZztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X2xhc3RVcGRhdGUgKz0gZWxhcHNlZDtcblx0XHRcdFx0XHRfc2VsZi50aW1lID0gKF9sYXN0VXBkYXRlIC0gX3N0YXJ0VGltZSkgLyAxMDAwO1xuXHRcdFx0XHRcdG92ZXJsYXAgPSBfc2VsZi50aW1lIC0gX25leHRUaW1lO1xuXHRcdFx0XHRcdGlmICghX2ZwcyB8fCBvdmVybGFwID4gMCB8fCBtYW51YWwgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdF9zZWxmLmZyYW1lKys7XG5cdFx0XHRcdFx0XHRfbmV4dFRpbWUgKz0gb3ZlcmxhcCArIChvdmVybGFwID49IF9nYXAgPyAwLjAwNCA6IF9nYXAgLSBvdmVybGFwKTtcblx0XHRcdFx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG1hbnVhbCAhPT0gdHJ1ZSkgeyAvL21ha2Ugc3VyZSB0aGUgcmVxdWVzdCBpcyBtYWRlIGJlZm9yZSB3ZSBkaXNwYXRjaCB0aGUgXCJ0aWNrXCIgZXZlbnQgc28gdGhhdCB0aW1pbmcgaXMgbWFpbnRhaW5lZC4gT3RoZXJ3aXNlLCBpZiBwcm9jZXNzaW5nIHRoZSBcInRpY2tcIiByZXF1aXJlcyBhIGJ1bmNoIG9mIHRpbWUgKGxpa2UgMTVtcykgYW5kIHdlJ3JlIHVzaW5nIGEgc2V0VGltZW91dCgpIHRoYXQncyBiYXNlZCBvbiAxNi43bXMsIGl0J2QgdGVjaG5pY2FsbHkgdGFrZSAzMS43bXMgYmV0d2VlbiBmcmFtZXMgb3RoZXJ3aXNlLlxuXHRcdFx0XHRcdFx0X2lkID0gX3JlcShfdGljayk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChkaXNwYXRjaCkge1xuXHRcdFx0XHRcdFx0X3NlbGYuZGlzcGF0Y2hFdmVudChfdGlja1dvcmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0RXZlbnREaXNwYXRjaGVyLmNhbGwoX3NlbGYpO1xuXHRcdFx0X3NlbGYudGltZSA9IF9zZWxmLmZyYW1lID0gMDtcblx0XHRcdF9zZWxmLnRpY2sgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0X3RpY2sodHJ1ZSk7XG5cdFx0XHR9O1xuXG5cdFx0XHRfc2VsZi5sYWdTbW9vdGhpbmcgPSBmdW5jdGlvbih0aHJlc2hvbGQsIGFkanVzdGVkTGFnKSB7XG5cdFx0XHRcdF9sYWdUaHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgKDEgLyBfdGlueU51bSk7IC8vemVybyBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgYXMgYmFzaWNhbGx5IHVubGltaXRlZFxuXHRcdFx0XHRfYWRqdXN0ZWRMYWcgPSBNYXRoLm1pbihhZGp1c3RlZExhZywgX2xhZ1RocmVzaG9sZCwgMCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRfc2VsZi5zbGVlcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoX2lkID09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFfdXNlUkFGIHx8ICFfY2FuY2VsQW5pbUZyYW1lKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KF9pZCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0X2NhbmNlbEFuaW1GcmFtZShfaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9yZXEgPSBfZW1wdHlGdW5jO1xuXHRcdFx0XHRfaWQgPSBudWxsO1xuXHRcdFx0XHRpZiAoX3NlbGYgPT09IF90aWNrZXIpIHtcblx0XHRcdFx0XHRfdGlja2VyQWN0aXZlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdF9zZWxmLndha2UgPSBmdW5jdGlvbihzZWFtbGVzcykge1xuXHRcdFx0XHRpZiAoX2lkICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0X3NlbGYuc2xlZXAoKTtcblx0XHRcdFx0fSBlbHNlIGlmIChzZWFtbGVzcykge1xuXHRcdFx0XHRcdF9zdGFydFRpbWUgKz0gLV9sYXN0VXBkYXRlICsgKF9sYXN0VXBkYXRlID0gX2dldFRpbWUoKSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoX3NlbGYuZnJhbWUgPiAxMCkgeyAvL2Rvbid0IHRyaWdnZXIgbGFnU21vb3RoaW5nIGlmIHdlJ3JlIGp1c3Qgd2FraW5nIHVwLCBhbmQgbWFrZSBzdXJlIHRoYXQgYXQgbGVhc3QgMTAgZnJhbWVzIGhhdmUgZWxhcHNlZCBiZWNhdXNlIG9mIHRoZSBpT1MgYnVnIHRoYXQgd2Ugd29yayBhcm91bmQgYmVsb3cgd2l0aCB0aGUgMS41LXNlY29uZCBzZXRUaW1vdXQoKS5cblx0XHRcdFx0XHRfbGFzdFVwZGF0ZSA9IF9nZXRUaW1lKCkgLSBfbGFnVGhyZXNob2xkICsgNTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfcmVxID0gKF9mcHMgPT09IDApID8gX2VtcHR5RnVuYyA6ICghX3VzZVJBRiB8fCAhX3JlcUFuaW1GcmFtZSkgPyBmdW5jdGlvbihmKSB7IHJldHVybiBzZXRUaW1lb3V0KGYsICgoX25leHRUaW1lIC0gX3NlbGYudGltZSkgKiAxMDAwICsgMSkgfCAwKTsgfSA6IF9yZXFBbmltRnJhbWU7XG5cdFx0XHRcdGlmIChfc2VsZiA9PT0gX3RpY2tlcikge1xuXHRcdFx0XHRcdF90aWNrZXJBY3RpdmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aWNrKDIpO1xuXHRcdFx0fTtcblxuXHRcdFx0X3NlbGYuZnBzID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF9mcHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0X2ZwcyA9IHZhbHVlO1xuXHRcdFx0XHRfZ2FwID0gMSAvIChfZnBzIHx8IDYwKTtcblx0XHRcdFx0X25leHRUaW1lID0gdGhpcy50aW1lICsgX2dhcDtcblx0XHRcdFx0X3NlbGYud2FrZSgpO1xuXHRcdFx0fTtcblxuXHRcdFx0X3NlbGYudXNlUkFGID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIF91c2VSQUY7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3NlbGYuc2xlZXAoKTtcblx0XHRcdFx0X3VzZVJBRiA9IHZhbHVlO1xuXHRcdFx0XHRfc2VsZi5mcHMoX2Zwcyk7XG5cdFx0XHR9O1xuXHRcdFx0X3NlbGYuZnBzKGZwcyk7XG5cblx0XHRcdC8vYSBidWcgaW4gaU9TIDYgU2FmYXJpIG9jY2FzaW9uYWxseSBwcmV2ZW50cyB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZyb20gd29ya2luZyBpbml0aWFsbHksIHNvIHdlIHVzZSBhIDEuNS1zZWNvbmQgdGltZW91dCB0aGF0IGF1dG9tYXRpY2FsbHkgZmFsbHMgYmFjayB0byBzZXRUaW1lb3V0KCkgaWYgaXQgc2Vuc2VzIHRoaXMgY29uZGl0aW9uLlxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKF91c2VSQUYgPT09IFwiYXV0b1wiICYmIF9zZWxmLmZyYW1lIDwgNSAmJiBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgIT09IFwiaGlkZGVuXCIpIHtcblx0XHRcdFx0XHRfc2VsZi51c2VSQUYoZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCAxNTAwKTtcblx0XHR9KTtcblxuXHRcdHAgPSBncy5UaWNrZXIucHJvdG90eXBlID0gbmV3IGdzLmV2ZW50cy5FdmVudERpc3BhdGNoZXIoKTtcblx0XHRwLmNvbnN0cnVjdG9yID0gZ3MuVGlja2VyO1xuXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBBbmltYXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBBbmltYXRpb24gPSBfY2xhc3MoXCJjb3JlLkFuaW1hdGlvblwiLCBmdW5jdGlvbihkdXJhdGlvbiwgdmFycykge1xuXHRcdFx0XHR0aGlzLnZhcnMgPSB2YXJzID0gdmFycyB8fCB7fTtcblx0XHRcdFx0dGhpcy5fZHVyYXRpb24gPSB0aGlzLl90b3RhbER1cmF0aW9uID0gZHVyYXRpb24gfHwgMDtcblx0XHRcdFx0dGhpcy5fZGVsYXkgPSBOdW1iZXIodmFycy5kZWxheSkgfHwgMDtcblx0XHRcdFx0dGhpcy5fdGltZVNjYWxlID0gMTtcblx0XHRcdFx0dGhpcy5fYWN0aXZlID0gKHZhcnMuaW1tZWRpYXRlUmVuZGVyID09PSB0cnVlKTtcblx0XHRcdFx0dGhpcy5kYXRhID0gdmFycy5kYXRhO1xuXHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICh2YXJzLnJldmVyc2VkID09PSB0cnVlKTtcblxuXHRcdFx0XHRpZiAoIV9yb290VGltZWxpbmUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFfdGlja2VyQWN0aXZlKSB7IC8vc29tZSBicm93c2VycyAobGlrZSBpT1MgNiBTYWZhcmkpIHNodXQgZG93biBKYXZhU2NyaXB0IGV4ZWN1dGlvbiB3aGVuIHRoZSB0YWIgaXMgZGlzYWJsZWQgYW5kIHRoZXkgW29jY2FzaW9uYWxseV0gbmVnbGVjdCB0byBzdGFydCB1cCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgYWdhaW4gd2hlbiByZXR1cm5pbmcgLSB0aGlzIGNvZGUgZW5zdXJlcyB0aGF0IHRoZSBlbmdpbmUgc3RhcnRzIHVwIGFnYWluIHByb3Blcmx5LlxuXHRcdFx0XHRcdF90aWNrZXIud2FrZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHRsID0gdGhpcy52YXJzLnVzZUZyYW1lcyA/IF9yb290RnJhbWVzVGltZWxpbmUgOiBfcm9vdFRpbWVsaW5lO1xuXHRcdFx0XHR0bC5hZGQodGhpcywgdGwuX3RpbWUpO1xuXG5cdFx0XHRcdGlmICh0aGlzLnZhcnMucGF1c2VkKSB7XG5cdFx0XHRcdFx0dGhpcy5wYXVzZWQodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0X3RpY2tlciA9IEFuaW1hdGlvbi50aWNrZXIgPSBuZXcgZ3MuVGlja2VyKCk7XG5cdFx0cCA9IEFuaW1hdGlvbi5wcm90b3R5cGU7XG5cdFx0cC5fZGlydHkgPSBwLl9nYyA9IHAuX2luaXR0ZWQgPSBwLl9wYXVzZWQgPSBmYWxzZTtcblx0XHRwLl90b3RhbFRpbWUgPSBwLl90aW1lID0gMDtcblx0XHRwLl9yYXdQcmV2VGltZSA9IC0xO1xuXHRcdHAuX25leHQgPSBwLl9sYXN0ID0gcC5fb25VcGRhdGUgPSBwLl90aW1lbGluZSA9IHAudGltZWxpbmUgPSBudWxsO1xuXHRcdHAuX3BhdXNlZCA9IGZhbHNlO1xuXG5cblx0XHQvL3NvbWUgYnJvd3NlcnMgKGxpa2UgaU9TKSBvY2Nhc2lvbmFsbHkgZHJvcCB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGV2ZW50IHdoZW4gdGhlIHVzZXIgc3dpdGNoZXMgdG8gYSBkaWZmZXJlbnQgdGFiIGFuZCB0aGVuIGNvbWVzIGJhY2sgYWdhaW4sIHNvIHdlIHVzZSBhIDItc2Vjb25kIHNldFRpbWVvdXQoKSB0byBzZW5zZSBpZi93aGVuIHRoYXQgY29uZGl0aW9uIG9jY3VycyBhbmQgdGhlbiB3YWtlKCkgdGhlIHRpY2tlci5cblx0XHR2YXIgX2NoZWNrVGltZW91dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoX3RpY2tlckFjdGl2ZSAmJiBfZ2V0VGltZSgpIC0gX2xhc3RVcGRhdGUgPiAyMDAwKSB7XG5cdFx0XHRcdFx0X3RpY2tlci53YWtlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2V0VGltZW91dChfY2hlY2tUaW1lb3V0LCAyMDAwKTtcblx0XHRcdH07XG5cdFx0X2NoZWNrVGltZW91dCgpO1xuXG5cblx0XHRwLnBsYXkgPSBmdW5jdGlvbihmcm9tLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0aWYgKGZyb20gIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLnNlZWsoZnJvbSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQoZmFsc2UpLnBhdXNlZChmYWxzZSk7XG5cdFx0fTtcblxuXHRcdHAucGF1c2UgPSBmdW5jdGlvbihhdFRpbWUsIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRpZiAoYXRUaW1lICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5zZWVrKGF0VGltZSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucGF1c2VkKHRydWUpO1xuXHRcdH07XG5cblx0XHRwLnJlc3VtZSA9IGZ1bmN0aW9uKGZyb20sIHN1cHByZXNzRXZlbnRzKSB7XG5cdFx0XHRpZiAoZnJvbSAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuc2Vlayhmcm9tLCBzdXBwcmVzc0V2ZW50cyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXVzZWQoZmFsc2UpO1xuXHRcdH07XG5cblx0XHRwLnNlZWsgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0cmV0dXJuIHRoaXMudG90YWxUaW1lKE51bWJlcih0aW1lKSwgc3VwcHJlc3NFdmVudHMgIT09IGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5yZXN0YXJ0ID0gZnVuY3Rpb24oaW5jbHVkZURlbGF5LCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQoZmFsc2UpLnBhdXNlZChmYWxzZSkudG90YWxUaW1lKGluY2x1ZGVEZWxheSA/IC10aGlzLl9kZWxheSA6IDAsIChzdXBwcmVzc0V2ZW50cyAhPT0gZmFsc2UpLCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cC5yZXZlcnNlID0gZnVuY3Rpb24oZnJvbSwgc3VwcHJlc3NFdmVudHMpIHtcblx0XHRcdGlmIChmcm9tICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5zZWVrKChmcm9tIHx8IHRoaXMudG90YWxEdXJhdGlvbigpKSwgc3VwcHJlc3NFdmVudHMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMucmV2ZXJzZWQodHJ1ZSkucGF1c2VkKGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5yZW5kZXIgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpIHtcblx0XHRcdC8vc3R1YiAtIHdlIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGluIHN1YmNsYXNzZXMuXG5cdFx0fTtcblxuXHRcdHAuaW52YWxpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5fdGltZSA9IHRoaXMuX3RvdGFsVGltZSA9IDA7XG5cdFx0XHR0aGlzLl9pbml0dGVkID0gdGhpcy5fZ2MgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gLTE7XG5cdFx0XHRpZiAodGhpcy5fZ2MgfHwgIXRoaXMudGltZWxpbmUpIHtcblx0XHRcdFx0dGhpcy5fZW5hYmxlZCh0cnVlKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLmlzQWN0aXZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdGwgPSB0aGlzLl90aW1lbGluZSwgLy90aGUgMiByb290IHRpbWVsaW5lcyB3b24ndCBoYXZlIGEgX3RpbWVsaW5lOyB0aGV5J3JlIGFsd2F5cyBhY3RpdmUuXG5cdFx0XHRcdHN0YXJ0VGltZSA9IHRoaXMuX3N0YXJ0VGltZSxcblx0XHRcdFx0cmF3VGltZTtcblx0XHRcdHJldHVybiAoIXRsIHx8ICghdGhpcy5fZ2MgJiYgIXRoaXMuX3BhdXNlZCAmJiB0bC5pc0FjdGl2ZSgpICYmIChyYXdUaW1lID0gdGwucmF3VGltZSgpKSA+PSBzdGFydFRpbWUgJiYgcmF3VGltZSA8IHN0YXJ0VGltZSArIHRoaXMudG90YWxEdXJhdGlvbigpIC8gdGhpcy5fdGltZVNjYWxlKSk7XG5cdFx0fTtcblxuXHRcdHAuX2VuYWJsZWQgPSBmdW5jdGlvbiAoZW5hYmxlZCwgaWdub3JlVGltZWxpbmUpIHtcblx0XHRcdGlmICghX3RpY2tlckFjdGl2ZSkge1xuXHRcdFx0XHRfdGlja2VyLndha2UoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2djID0gIWVuYWJsZWQ7XG5cdFx0XHR0aGlzLl9hY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XG5cdFx0XHRpZiAoaWdub3JlVGltZWxpbmUgIT09IHRydWUpIHtcblx0XHRcdFx0aWYgKGVuYWJsZWQgJiYgIXRoaXMudGltZWxpbmUpIHtcblx0XHRcdFx0XHR0aGlzLl90aW1lbGluZS5hZGQodGhpcywgdGhpcy5fc3RhcnRUaW1lIC0gdGhpcy5fZGVsYXkpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFlbmFibGVkICYmIHRoaXMudGltZWxpbmUpIHtcblx0XHRcdFx0XHR0aGlzLl90aW1lbGluZS5fcmVtb3ZlKHRoaXMsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXG5cdFx0cC5fa2lsbCA9IGZ1bmN0aW9uKHZhcnMsIHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2VuYWJsZWQoZmFsc2UsIGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5raWxsID0gZnVuY3Rpb24odmFycywgdGFyZ2V0KSB7XG5cdFx0XHR0aGlzLl9raWxsKHZhcnMsIHRhcmdldCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5fdW5jYWNoZSA9IGZ1bmN0aW9uKGluY2x1ZGVTZWxmKSB7XG5cdFx0XHR2YXIgdHdlZW4gPSBpbmNsdWRlU2VsZiA/IHRoaXMgOiB0aGlzLnRpbWVsaW5lO1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdHR3ZWVuLl9kaXJ0eSA9IHRydWU7XG5cdFx0XHRcdHR3ZWVuID0gdHdlZW4udGltZWxpbmU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5fc3dhcFNlbGZJblBhcmFtcyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuXHRcdFx0dmFyIGkgPSBwYXJhbXMubGVuZ3RoLFxuXHRcdFx0XHRjb3B5ID0gcGFyYW1zLmNvbmNhdCgpO1xuXHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdGlmIChwYXJhbXNbaV0gPT09IFwie3NlbGZ9XCIpIHtcblx0XHRcdFx0XHRjb3B5W2ldID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNvcHk7XG5cdFx0fTtcblxuXHRcdHAuX2NhbGxiYWNrID0gZnVuY3Rpb24odHlwZSkge1xuXHRcdFx0dmFyIHYgPSB0aGlzLnZhcnM7XG5cdFx0XHR2W3R5cGVdLmFwcGx5KHZbdHlwZSArIFwiU2NvcGVcIl0gfHwgdi5jYWxsYmFja1Njb3BlIHx8IHRoaXMsIHZbdHlwZSArIFwiUGFyYW1zXCJdIHx8IF9ibGFua0FycmF5KTtcblx0XHR9O1xuXG4vLy0tLS1BbmltYXRpb24gZ2V0dGVycy9zZXR0ZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRwLmV2ZW50Q2FsbGJhY2sgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgcGFyYW1zLCBzY29wZSkge1xuXHRcdFx0aWYgKCh0eXBlIHx8IFwiXCIpLnN1YnN0cigwLDIpID09PSBcIm9uXCIpIHtcblx0XHRcdFx0dmFyIHYgPSB0aGlzLnZhcnM7XG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZbdHlwZV07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhbGxiYWNrID09IG51bGwpIHtcblx0XHRcdFx0XHRkZWxldGUgdlt0eXBlXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2W3R5cGVdID0gY2FsbGJhY2s7XG5cdFx0XHRcdFx0dlt0eXBlICsgXCJQYXJhbXNcIl0gPSAoX2lzQXJyYXkocGFyYW1zKSAmJiBwYXJhbXMuam9pbihcIlwiKS5pbmRleE9mKFwie3NlbGZ9XCIpICE9PSAtMSkgPyB0aGlzLl9zd2FwU2VsZkluUGFyYW1zKHBhcmFtcykgOiBwYXJhbXM7XG5cdFx0XHRcdFx0dlt0eXBlICsgXCJTY29wZVwiXSA9IHNjb3BlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlID09PSBcIm9uVXBkYXRlXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9vblVwZGF0ZSA9IGNhbGxiYWNrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5kZWxheSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2RlbGF5O1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lLnNtb290aENoaWxkVGltaW5nKSB7XG5cdFx0XHRcdHRoaXMuc3RhcnRUaW1lKCB0aGlzLl9zdGFydFRpbWUgKyB2YWx1ZSAtIHRoaXMuX2RlbGF5ICk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9kZWxheSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuZHVyYXRpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuX2RpcnR5ID0gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kdXJhdGlvbjtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gdGhpcy5fdG90YWxEdXJhdGlvbiA9IHZhbHVlO1xuXHRcdFx0dGhpcy5fdW5jYWNoZSh0cnVlKTsgLy90cnVlIGluIGNhc2UgaXQncyBhIFR3ZWVuTWF4IG9yIFRpbWVsaW5lTWF4IHRoYXQgaGFzIGEgcmVwZWF0IC0gd2UnbGwgbmVlZCB0byByZWZyZXNoIHRoZSB0b3RhbER1cmF0aW9uLlxuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lLnNtb290aENoaWxkVGltaW5nKSBpZiAodGhpcy5fdGltZSA+IDApIGlmICh0aGlzLl90aW1lIDwgdGhpcy5fZHVyYXRpb24pIGlmICh2YWx1ZSAhPT0gMCkge1xuXHRcdFx0XHR0aGlzLnRvdGFsVGltZSh0aGlzLl90b3RhbFRpbWUgKiAodmFsdWUgLyB0aGlzLl9kdXJhdGlvbiksIHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAudG90YWxEdXJhdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuXHRcdFx0cmV0dXJuICghYXJndW1lbnRzLmxlbmd0aCkgPyB0aGlzLl90b3RhbER1cmF0aW9uIDogdGhpcy5kdXJhdGlvbih2YWx1ZSk7XG5cdFx0fTtcblxuXHRcdHAudGltZSA9IGZ1bmN0aW9uKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl90aW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2RpcnR5KSB7XG5cdFx0XHRcdHRoaXMudG90YWxEdXJhdGlvbigpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMudG90YWxUaW1lKCh2YWx1ZSA+IHRoaXMuX2R1cmF0aW9uKSA/IHRoaXMuX2R1cmF0aW9uIDogdmFsdWUsIHN1cHByZXNzRXZlbnRzKTtcblx0XHR9O1xuXG5cdFx0cC50b3RhbFRpbWUgPSBmdW5jdGlvbih0aW1lLCBzdXBwcmVzc0V2ZW50cywgdW5jYXBwZWQpIHtcblx0XHRcdGlmICghX3RpY2tlckFjdGl2ZSkge1xuXHRcdFx0XHRfdGlja2VyLndha2UoKTtcblx0XHRcdH1cblx0XHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fdG90YWxUaW1lO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lKSB7XG5cdFx0XHRcdGlmICh0aW1lIDwgMCAmJiAhdW5jYXBwZWQpIHtcblx0XHRcdFx0XHR0aW1lICs9IHRoaXMudG90YWxEdXJhdGlvbigpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLl90aW1lbGluZS5zbW9vdGhDaGlsZFRpbWluZykge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9kaXJ0eSkge1xuXHRcdFx0XHRcdFx0dGhpcy50b3RhbER1cmF0aW9uKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciB0b3RhbER1cmF0aW9uID0gdGhpcy5fdG90YWxEdXJhdGlvbixcblx0XHRcdFx0XHRcdHRsID0gdGhpcy5fdGltZWxpbmU7XG5cdFx0XHRcdFx0aWYgKHRpbWUgPiB0b3RhbER1cmF0aW9uICYmICF1bmNhcHBlZCkge1xuXHRcdFx0XHRcdFx0dGltZSA9IHRvdGFsRHVyYXRpb247XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9ICh0aGlzLl9wYXVzZWQgPyB0aGlzLl9wYXVzZVRpbWUgOiB0bC5fdGltZSkgLSAoKCF0aGlzLl9yZXZlcnNlZCA/IHRpbWUgOiB0b3RhbER1cmF0aW9uIC0gdGltZSkgLyB0aGlzLl90aW1lU2NhbGUpO1xuXHRcdFx0XHRcdGlmICghdGwuX2RpcnR5KSB7IC8vZm9yIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50LiBJZiB0aGUgcGFyZW50J3MgY2FjaGUgaXMgYWxyZWFkeSBkaXJ0eSwgaXQgYWxyZWFkeSB0b29rIGNhcmUgb2YgbWFya2luZyB0aGUgYW5jZXN0b3JzIGFzIGRpcnR5IHRvbywgc28gc2tpcCB0aGUgZnVuY3Rpb24gY2FsbCBoZXJlLlxuXHRcdFx0XHRcdFx0dGhpcy5fdW5jYWNoZShmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vaW4gY2FzZSBhbnkgb2YgdGhlIGFuY2VzdG9yIHRpbWVsaW5lcyBoYWQgY29tcGxldGVkIGJ1dCBzaG91bGQgbm93IGJlIGVuYWJsZWQsIHdlIHNob3VsZCByZXNldCB0aGVpciB0b3RhbFRpbWUoKSB3aGljaCB3aWxsIGFsc28gZW5zdXJlIHRoYXQgdGhleSdyZSBsaW5lZCB1cCBwcm9wZXJseSBhbmQgZW5hYmxlZC4gU2tpcCBmb3IgYW5pbWF0aW9ucyB0aGF0IGFyZSBvbiB0aGUgcm9vdCAod2FzdGVmdWwpLiBFeGFtcGxlOiBhIFRpbWVsaW5lTGl0ZS5leHBvcnRSb290KCkgaXMgcGVyZm9ybWVkIHdoZW4gdGhlcmUncyBhIHBhdXNlZCB0d2VlbiBvbiB0aGUgcm9vdCwgdGhlIGV4cG9ydCB3aWxsIG5vdCBjb21wbGV0ZSB1bnRpbCB0aGF0IHR3ZWVuIGlzIHVucGF1c2VkLCBidXQgaW1hZ2luZSBhIGNoaWxkIGdldHMgcmVzdGFydGVkIGxhdGVyLCBhZnRlciBhbGwgW3VucGF1c2VkXSB0d2VlbnMgaGF2ZSBjb21wbGV0ZWQuIFRoZSBzdGFydFRpbWUgb2YgdGhhdCBjaGlsZCB3b3VsZCBnZXQgcHVzaGVkIG91dCwgYnV0IG9uZSBvZiB0aGUgYW5jZXN0b3JzIG1heSBoYXZlIGNvbXBsZXRlZC5cblx0XHRcdFx0XHRpZiAodGwuX3RpbWVsaW5lKSB7XG5cdFx0XHRcdFx0XHR3aGlsZSAodGwuX3RpbWVsaW5lKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0bC5fdGltZWxpbmUuX3RpbWUgIT09ICh0bC5fc3RhcnRUaW1lICsgdGwuX3RvdGFsVGltZSkgLyB0bC5fdGltZVNjYWxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGwudG90YWxUaW1lKHRsLl90b3RhbFRpbWUsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHRsID0gdGwuX3RpbWVsaW5lO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fZ2MpIHtcblx0XHRcdFx0XHR0aGlzLl9lbmFibGVkKHRydWUsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fdG90YWxUaW1lICE9PSB0aW1lIHx8IHRoaXMuX2R1cmF0aW9uID09PSAwKSB7XG5cdFx0XHRcdFx0aWYgKF9sYXp5VHdlZW5zLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0X2xhenlSZW5kZXIoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXIodGltZSwgc3VwcHJlc3NFdmVudHMsIGZhbHNlKTtcblx0XHRcdFx0XHRpZiAoX2xhenlUd2VlbnMubGVuZ3RoKSB7IC8vaW4gY2FzZSByZW5kZXJpbmcgY2F1c2VkIGFueSB0d2VlbnMgdG8gbGF6eS1pbml0LCB3ZSBzaG91bGQgcmVuZGVyIHRoZW0gYmVjYXVzZSB0eXBpY2FsbHkgd2hlbiBzb21lb25lIGNhbGxzIHNlZWsoKSBvciB0aW1lKCkgb3IgcHJvZ3Jlc3MoKSwgdGhleSBleHBlY3QgYW4gaW1tZWRpYXRlIHJlbmRlci5cblx0XHRcdFx0XHRcdF9sYXp5UmVuZGVyKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5wcm9ncmVzcyA9IHAudG90YWxQcm9ncmVzcyA9IGZ1bmN0aW9uKHZhbHVlLCBzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0dmFyIGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbigpO1xuXHRcdFx0cmV0dXJuICghYXJndW1lbnRzLmxlbmd0aCkgPyAoZHVyYXRpb24gPyB0aGlzLl90aW1lIC8gZHVyYXRpb24gOiB0aGlzLnJhdGlvKSA6IHRoaXMudG90YWxUaW1lKGR1cmF0aW9uICogdmFsdWUsIHN1cHByZXNzRXZlbnRzKTtcblx0XHR9O1xuXG5cdFx0cC5zdGFydFRpbWUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9zdGFydFRpbWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAodmFsdWUgIT09IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHRoaXMudGltZWxpbmUpIGlmICh0aGlzLnRpbWVsaW5lLl9zb3J0Q2hpbGRyZW4pIHtcblx0XHRcdFx0XHR0aGlzLnRpbWVsaW5lLmFkZCh0aGlzLCB2YWx1ZSAtIHRoaXMuX2RlbGF5KTsgLy9lbnN1cmVzIHRoYXQgYW55IG5lY2Vzc2FyeSByZS1zZXF1ZW5jaW5nIG9mIEFuaW1hdGlvbnMgaW4gdGhlIHRpbWVsaW5lIG9jY3VycyB0byBtYWtlIHN1cmUgdGhlIHJlbmRlcmluZyBvcmRlciBpcyBjb3JyZWN0LlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5lbmRUaW1lID0gZnVuY3Rpb24oaW5jbHVkZVJlcGVhdHMpIHtcblx0XHRcdHJldHVybiB0aGlzLl9zdGFydFRpbWUgKyAoKGluY2x1ZGVSZXBlYXRzICE9IGZhbHNlKSA/IHRoaXMudG90YWxEdXJhdGlvbigpIDogdGhpcy5kdXJhdGlvbigpKSAvIHRoaXMuX3RpbWVTY2FsZTtcblx0XHR9O1xuXG5cdFx0cC50aW1lU2NhbGUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl90aW1lU2NhbGU7XG5cdFx0XHR9XG5cdFx0XHR2YWx1ZSA9IHZhbHVlIHx8IF90aW55TnVtOyAvL2Nhbid0IGFsbG93IHplcm8gYmVjYXVzZSBpdCdsbCB0aHJvdyB0aGUgbWF0aCBvZmZcblx0XHRcdGlmICh0aGlzLl90aW1lbGluZSAmJiB0aGlzLl90aW1lbGluZS5zbW9vdGhDaGlsZFRpbWluZykge1xuXHRcdFx0XHR2YXIgcGF1c2VUaW1lID0gdGhpcy5fcGF1c2VUaW1lLFxuXHRcdFx0XHRcdHQgPSAocGF1c2VUaW1lIHx8IHBhdXNlVGltZSA9PT0gMCkgPyBwYXVzZVRpbWUgOiB0aGlzLl90aW1lbGluZS50b3RhbFRpbWUoKTtcblx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdCAtICgodCAtIHRoaXMuX3N0YXJ0VGltZSkgKiB0aGlzLl90aW1lU2NhbGUgLyB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl90aW1lU2NhbGUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzLl91bmNhY2hlKGZhbHNlKTtcblx0XHR9O1xuXG5cdFx0cC5yZXZlcnNlZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3JldmVyc2VkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHZhbHVlICE9IHRoaXMuX3JldmVyc2VkKSB7XG5cdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gdmFsdWU7XG5cdFx0XHRcdHRoaXMudG90YWxUaW1lKCgodGhpcy5fdGltZWxpbmUgJiYgIXRoaXMuX3RpbWVsaW5lLnNtb290aENoaWxkVGltaW5nKSA/IHRoaXMudG90YWxEdXJhdGlvbigpIC0gdGhpcy5fdG90YWxUaW1lIDogdGhpcy5fdG90YWxUaW1lKSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5wYXVzZWQgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9wYXVzZWQ7XG5cdFx0XHR9XG5cdFx0XHR2YXIgdGwgPSB0aGlzLl90aW1lbGluZSxcblx0XHRcdFx0cmF3LCBlbGFwc2VkO1xuXHRcdFx0aWYgKHZhbHVlICE9IHRoaXMuX3BhdXNlZCkgaWYgKHRsKSB7XG5cdFx0XHRcdGlmICghX3RpY2tlckFjdGl2ZSAmJiAhdmFsdWUpIHtcblx0XHRcdFx0XHRfdGlja2VyLndha2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyYXcgPSB0bC5yYXdUaW1lKCk7XG5cdFx0XHRcdGVsYXBzZWQgPSByYXcgLSB0aGlzLl9wYXVzZVRpbWU7XG5cdFx0XHRcdGlmICghdmFsdWUgJiYgdGwuc21vb3RoQ2hpbGRUaW1pbmcpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgKz0gZWxhcHNlZDtcblx0XHRcdFx0XHR0aGlzLl91bmNhY2hlKGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9wYXVzZVRpbWUgPSB2YWx1ZSA/IHJhdyA6IG51bGw7XG5cdFx0XHRcdHRoaXMuX3BhdXNlZCA9IHZhbHVlO1xuXHRcdFx0XHR0aGlzLl9hY3RpdmUgPSB0aGlzLmlzQWN0aXZlKCk7XG5cdFx0XHRcdGlmICghdmFsdWUgJiYgZWxhcHNlZCAhPT0gMCAmJiB0aGlzLl9pbml0dGVkICYmIHRoaXMuZHVyYXRpb24oKSkge1xuXHRcdFx0XHRcdHJhdyA9IHRsLnNtb290aENoaWxkVGltaW5nID8gdGhpcy5fdG90YWxUaW1lIDogKHJhdyAtIHRoaXMuX3N0YXJ0VGltZSkgLyB0aGlzLl90aW1lU2NhbGU7XG5cdFx0XHRcdFx0dGhpcy5yZW5kZXIocmF3LCAocmF3ID09PSB0aGlzLl90b3RhbFRpbWUpLCB0cnVlKTsgLy9pbiBjYXNlIHRoZSB0YXJnZXQncyBwcm9wZXJ0aWVzIGNoYW5nZWQgdmlhIHNvbWUgb3RoZXIgdHdlZW4gb3IgbWFudWFsIHVwZGF0ZSBieSB0aGUgdXNlciwgd2Ugc2hvdWxkIGZvcmNlIGEgcmVuZGVyLlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fZ2MgJiYgIXZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuX2VuYWJsZWQodHJ1ZSwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogU2ltcGxlVGltZWxpbmVcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBTaW1wbGVUaW1lbGluZSA9IF9jbGFzcyhcImNvcmUuU2ltcGxlVGltZWxpbmVcIiwgZnVuY3Rpb24odmFycykge1xuXHRcdFx0QW5pbWF0aW9uLmNhbGwodGhpcywgMCwgdmFycyk7XG5cdFx0XHR0aGlzLmF1dG9SZW1vdmVDaGlsZHJlbiA9IHRoaXMuc21vb3RoQ2hpbGRUaW1pbmcgPSB0cnVlO1xuXHRcdH0pO1xuXG5cdFx0cCA9IFNpbXBsZVRpbWVsaW5lLnByb3RvdHlwZSA9IG5ldyBBbmltYXRpb24oKTtcblx0XHRwLmNvbnN0cnVjdG9yID0gU2ltcGxlVGltZWxpbmU7XG5cdFx0cC5raWxsKCkuX2djID0gZmFsc2U7XG5cdFx0cC5fZmlyc3QgPSBwLl9sYXN0ID0gcC5fcmVjZW50ID0gbnVsbDtcblx0XHRwLl9zb3J0Q2hpbGRyZW4gPSBmYWxzZTtcblxuXHRcdHAuYWRkID0gcC5pbnNlcnQgPSBmdW5jdGlvbihjaGlsZCwgcG9zaXRpb24sIGFsaWduLCBzdGFnZ2VyKSB7XG5cdFx0XHR2YXIgcHJldlR3ZWVuLCBzdDtcblx0XHRcdGNoaWxkLl9zdGFydFRpbWUgPSBOdW1iZXIocG9zaXRpb24gfHwgMCkgKyBjaGlsZC5fZGVsYXk7XG5cdFx0XHRpZiAoY2hpbGQuX3BhdXNlZCkgaWYgKHRoaXMgIT09IGNoaWxkLl90aW1lbGluZSkgeyAvL3dlIG9ubHkgYWRqdXN0IHRoZSBfcGF1c2VUaW1lIGlmIGl0IHdhc24ndCBpbiB0aGlzIHRpbWVsaW5lIGFscmVhZHkuIFJlbWVtYmVyLCBzb21ldGltZXMgYSB0d2VlbiB3aWxsIGJlIGluc2VydGVkIGFnYWluIGludG8gdGhlIHNhbWUgdGltZWxpbmUgd2hlbiBpdHMgc3RhcnRUaW1lIGlzIGNoYW5nZWQgc28gdGhhdCB0aGUgdHdlZW5zIGluIHRoZSBUaW1lbGluZUxpdGUvTWF4IGFyZSByZS1vcmRlcmVkIHByb3Blcmx5IGluIHRoZSBsaW5rZWQgbGlzdCAoc28gZXZlcnl0aGluZyByZW5kZXJzIGluIHRoZSBwcm9wZXIgb3JkZXIpLlxuXHRcdFx0XHRjaGlsZC5fcGF1c2VUaW1lID0gY2hpbGQuX3N0YXJ0VGltZSArICgodGhpcy5yYXdUaW1lKCkgLSBjaGlsZC5fc3RhcnRUaW1lKSAvIGNoaWxkLl90aW1lU2NhbGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNoaWxkLnRpbWVsaW5lKSB7XG5cdFx0XHRcdGNoaWxkLnRpbWVsaW5lLl9yZW1vdmUoY2hpbGQsIHRydWUpOyAvL3JlbW92ZXMgZnJvbSBleGlzdGluZyB0aW1lbGluZSBzbyB0aGF0IGl0IGNhbiBiZSBwcm9wZXJseSBhZGRlZCB0byB0aGlzIG9uZS5cblx0XHRcdH1cblx0XHRcdGNoaWxkLnRpbWVsaW5lID0gY2hpbGQuX3RpbWVsaW5lID0gdGhpcztcblx0XHRcdGlmIChjaGlsZC5fZ2MpIHtcblx0XHRcdFx0Y2hpbGQuX2VuYWJsZWQodHJ1ZSwgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRwcmV2VHdlZW4gPSB0aGlzLl9sYXN0O1xuXHRcdFx0aWYgKHRoaXMuX3NvcnRDaGlsZHJlbikge1xuXHRcdFx0XHRzdCA9IGNoaWxkLl9zdGFydFRpbWU7XG5cdFx0XHRcdHdoaWxlIChwcmV2VHdlZW4gJiYgcHJldlR3ZWVuLl9zdGFydFRpbWUgPiBzdCkge1xuXHRcdFx0XHRcdHByZXZUd2VlbiA9IHByZXZUd2Vlbi5fcHJldjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByZXZUd2Vlbikge1xuXHRcdFx0XHRjaGlsZC5fbmV4dCA9IHByZXZUd2Vlbi5fbmV4dDtcblx0XHRcdFx0cHJldlR3ZWVuLl9uZXh0ID0gY2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjaGlsZC5fbmV4dCA9IHRoaXMuX2ZpcnN0O1xuXHRcdFx0XHR0aGlzLl9maXJzdCA9IGNoaWxkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNoaWxkLl9uZXh0KSB7XG5cdFx0XHRcdGNoaWxkLl9uZXh0Ll9wcmV2ID0gY2hpbGQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9sYXN0ID0gY2hpbGQ7XG5cdFx0XHR9XG5cdFx0XHRjaGlsZC5fcHJldiA9IHByZXZUd2Vlbjtcblx0XHRcdHRoaXMuX3JlY2VudCA9IGNoaWxkO1xuXHRcdFx0aWYgKHRoaXMuX3RpbWVsaW5lKSB7XG5cdFx0XHRcdHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0cC5fcmVtb3ZlID0gZnVuY3Rpb24odHdlZW4sIHNraXBEaXNhYmxlKSB7XG5cdFx0XHRpZiAodHdlZW4udGltZWxpbmUgPT09IHRoaXMpIHtcblx0XHRcdFx0aWYgKCFza2lwRGlzYWJsZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9lbmFibGVkKGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0d2Vlbi5fcHJldikge1xuXHRcdFx0XHRcdHR3ZWVuLl9wcmV2Ll9uZXh0ID0gdHdlZW4uX25leHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5fZmlyc3QgPT09IHR3ZWVuKSB7XG5cdFx0XHRcdFx0dGhpcy5fZmlyc3QgPSB0d2Vlbi5fbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHdlZW4uX25leHQpIHtcblx0XHRcdFx0XHR0d2Vlbi5fbmV4dC5fcHJldiA9IHR3ZWVuLl9wcmV2O1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3QgPT09IHR3ZWVuKSB7XG5cdFx0XHRcdFx0dGhpcy5fbGFzdCA9IHR3ZWVuLl9wcmV2O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHR3ZWVuLl9uZXh0ID0gdHdlZW4uX3ByZXYgPSB0d2Vlbi50aW1lbGluZSA9IG51bGw7XG5cdFx0XHRcdGlmICh0d2VlbiA9PT0gdGhpcy5fcmVjZW50KSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVjZW50ID0gdGhpcy5fbGFzdDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdHRoaXMuX3VuY2FjaGUodHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cblx0XHRwLnJlbmRlciA9IGZ1bmN0aW9uKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuXHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fZmlyc3QsXG5cdFx0XHRcdG5leHQ7XG5cdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gdGhpcy5fcmF3UHJldlRpbWUgPSB0aW1lO1xuXHRcdFx0d2hpbGUgKHR3ZWVuKSB7XG5cdFx0XHRcdG5leHQgPSB0d2Vlbi5fbmV4dDsgLy9yZWNvcmQgaXQgaGVyZSBiZWNhdXNlIHRoZSB2YWx1ZSBjb3VsZCBjaGFuZ2UgYWZ0ZXIgcmVuZGVyaW5nLi4uXG5cdFx0XHRcdGlmICh0d2Vlbi5fYWN0aXZlIHx8ICh0aW1lID49IHR3ZWVuLl9zdGFydFRpbWUgJiYgIXR3ZWVuLl9wYXVzZWQpKSB7XG5cdFx0XHRcdFx0aWYgKCF0d2Vlbi5fcmV2ZXJzZWQpIHtcblx0XHRcdFx0XHRcdHR3ZWVuLnJlbmRlcigodGltZSAtIHR3ZWVuLl9zdGFydFRpbWUpICogdHdlZW4uX3RpbWVTY2FsZSwgc3VwcHJlc3NFdmVudHMsIGZvcmNlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKCgoIXR3ZWVuLl9kaXJ0eSkgPyB0d2Vlbi5fdG90YWxEdXJhdGlvbiA6IHR3ZWVuLnRvdGFsRHVyYXRpb24oKSkgLSAoKHRpbWUgLSB0d2Vlbi5fc3RhcnRUaW1lKSAqIHR3ZWVuLl90aW1lU2NhbGUpLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0d2VlbiA9IG5leHQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHAucmF3VGltZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCFfdGlja2VyQWN0aXZlKSB7XG5cdFx0XHRcdF90aWNrZXIud2FrZSgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXMuX3RvdGFsVGltZTtcblx0XHR9O1xuXG4vKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVHdlZW5MaXRlXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblx0XHR2YXIgVHdlZW5MaXRlID0gX2NsYXNzKFwiVHdlZW5MaXRlXCIsIGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpIHtcblx0XHRcdFx0QW5pbWF0aW9uLmNhbGwodGhpcywgZHVyYXRpb24sIHZhcnMpO1xuXHRcdFx0XHR0aGlzLnJlbmRlciA9IFR3ZWVuTGl0ZS5wcm90b3R5cGUucmVuZGVyOyAvL3NwZWVkIG9wdGltaXphdGlvbiAoYXZvaWQgcHJvdG90eXBlIGxvb2t1cCBvbiB0aGlzIFwiaG90XCIgbWV0aG9kKVxuXG5cdFx0XHRcdGlmICh0YXJnZXQgPT0gbnVsbCkge1xuXHRcdFx0XHRcdHRocm93IFwiQ2Fubm90IHR3ZWVuIGEgbnVsbCB0YXJnZXQuXCI7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnRhcmdldCA9IHRhcmdldCA9ICh0eXBlb2YodGFyZ2V0KSAhPT0gXCJzdHJpbmdcIikgPyB0YXJnZXQgOiBUd2VlbkxpdGUuc2VsZWN0b3IodGFyZ2V0KSB8fCB0YXJnZXQ7XG5cblx0XHRcdFx0dmFyIGlzU2VsZWN0b3IgPSAodGFyZ2V0LmpxdWVyeSB8fCAodGFyZ2V0Lmxlbmd0aCAmJiB0YXJnZXQgIT09IHdpbmRvdyAmJiB0YXJnZXRbMF0gJiYgKHRhcmdldFswXSA9PT0gd2luZG93IHx8ICh0YXJnZXRbMF0ubm9kZVR5cGUgJiYgdGFyZ2V0WzBdLnN0eWxlICYmICF0YXJnZXQubm9kZVR5cGUpKSkpLFxuXHRcdFx0XHRcdG92ZXJ3cml0ZSA9IHRoaXMudmFycy5vdmVyd3JpdGUsXG5cdFx0XHRcdFx0aSwgdGFyZywgdGFyZ2V0cztcblxuXHRcdFx0XHR0aGlzLl9vdmVyd3JpdGUgPSBvdmVyd3JpdGUgPSAob3ZlcndyaXRlID09IG51bGwpID8gX292ZXJ3cml0ZUxvb2t1cFtUd2VlbkxpdGUuZGVmYXVsdE92ZXJ3cml0ZV0gOiAodHlwZW9mKG92ZXJ3cml0ZSkgPT09IFwibnVtYmVyXCIpID8gb3ZlcndyaXRlID4+IDAgOiBfb3ZlcndyaXRlTG9va3VwW292ZXJ3cml0ZV07XG5cblx0XHRcdFx0aWYgKChpc1NlbGVjdG9yIHx8IHRhcmdldCBpbnN0YW5jZW9mIEFycmF5IHx8ICh0YXJnZXQucHVzaCAmJiBfaXNBcnJheSh0YXJnZXQpKSkgJiYgdHlwZW9mKHRhcmdldFswXSkgIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0XHR0aGlzLl90YXJnZXRzID0gdGFyZ2V0cyA9IF9zbGljZSh0YXJnZXQpOyAgLy9kb24ndCB1c2UgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGFyZ2V0LCAwKSBiZWNhdXNlIHRoYXQgZG9lc24ndCB3b3JrIGluIElFOCB3aXRoIGEgTm9kZUxpc3QgdGhhdCdzIHJldHVybmVkIGJ5IHF1ZXJ5U2VsZWN0b3JBbGwoKVxuXHRcdFx0XHRcdHRoaXMuX3Byb3BMb29rdXAgPSBbXTtcblx0XHRcdFx0XHR0aGlzLl9zaWJsaW5ncyA9IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnID0gdGFyZ2V0c1tpXTtcblx0XHRcdFx0XHRcdGlmICghdGFyZykge1xuXHRcdFx0XHRcdFx0XHR0YXJnZXRzLnNwbGljZShpLS0sIDEpO1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mKHRhcmcpID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdHRhcmcgPSB0YXJnZXRzW2ktLV0gPSBUd2VlbkxpdGUuc2VsZWN0b3IodGFyZyk7IC8vaW4gY2FzZSBpdCdzIGFuIGFycmF5IG9mIHN0cmluZ3Ncblx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZih0YXJnKSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdFx0XHRcdHRhcmdldHMuc3BsaWNlKGkrMSwgMSk7IC8vdG8gYXZvaWQgYW4gZW5kbGVzcyBsb29wIChjYW4ndCBpbWFnaW5lIHdoeSB0aGUgc2VsZWN0b3Igd291bGQgcmV0dXJuIGEgc3RyaW5nLCBidXQganVzdCBpbiBjYXNlKVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0YXJnLmxlbmd0aCAmJiB0YXJnICE9PSB3aW5kb3cgJiYgdGFyZ1swXSAmJiAodGFyZ1swXSA9PT0gd2luZG93IHx8ICh0YXJnWzBdLm5vZGVUeXBlICYmIHRhcmdbMF0uc3R5bGUgJiYgIXRhcmcubm9kZVR5cGUpKSkgeyAvL2luIGNhc2UgdGhlIHVzZXIgaXMgcGFzc2luZyBpbiBhbiBhcnJheSBvZiBzZWxlY3RvciBvYmplY3RzIChsaWtlIGpRdWVyeSBvYmplY3RzKSwgd2UgbmVlZCB0byBjaGVjayBvbmUgbW9yZSBsZXZlbCBhbmQgcHVsbCB0aGluZ3Mgb3V0IGlmIG5lY2Vzc2FyeS4gQWxzbyBub3RlIHRoYXQgPHNlbGVjdD4gZWxlbWVudHMgcGFzcyBhbGwgdGhlIGNyaXRlcmlhIHJlZ2FyZGluZyBsZW5ndGggYW5kIHRoZSBmaXJzdCBjaGlsZCBoYXZpbmcgc3R5bGUsIHNvIHdlIG11c3QgYWxzbyBjaGVjayB0byBlbnN1cmUgdGhlIHRhcmdldCBpc24ndCBhbiBIVE1MIG5vZGUgaXRzZWxmLlxuXHRcdFx0XHRcdFx0XHR0YXJnZXRzLnNwbGljZShpLS0sIDEpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl90YXJnZXRzID0gdGFyZ2V0cyA9IHRhcmdldHMuY29uY2F0KF9zbGljZSh0YXJnKSk7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5fc2libGluZ3NbaV0gPSBfcmVnaXN0ZXIodGFyZywgdGhpcywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0aWYgKG92ZXJ3cml0ZSA9PT0gMSkgaWYgKHRoaXMuX3NpYmxpbmdzW2ldLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRcdFx0X2FwcGx5T3ZlcndyaXRlKHRhcmcsIHRoaXMsIG51bGwsIDEsIHRoaXMuX3NpYmxpbmdzW2ldKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9wcm9wTG9va3VwID0ge307XG5cdFx0XHRcdFx0dGhpcy5fc2libGluZ3MgPSBfcmVnaXN0ZXIodGFyZ2V0LCB0aGlzLCBmYWxzZSk7XG5cdFx0XHRcdFx0aWYgKG92ZXJ3cml0ZSA9PT0gMSkgaWYgKHRoaXMuX3NpYmxpbmdzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRcdF9hcHBseU92ZXJ3cml0ZSh0YXJnZXQsIHRoaXMsIG51bGwsIDEsIHRoaXMuX3NpYmxpbmdzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMudmFycy5pbW1lZGlhdGVSZW5kZXIgfHwgKGR1cmF0aW9uID09PSAwICYmIHRoaXMuX2RlbGF5ID09PSAwICYmIHRoaXMudmFycy5pbW1lZGlhdGVSZW5kZXIgIT09IGZhbHNlKSkge1xuXHRcdFx0XHRcdHRoaXMuX3RpbWUgPSAtX3RpbnlOdW07IC8vZm9yY2VzIGEgcmVuZGVyIHdpdGhvdXQgaGF2aW5nIHRvIHNldCB0aGUgcmVuZGVyKCkgXCJmb3JjZVwiIHBhcmFtZXRlciB0byB0cnVlIGJlY2F1c2Ugd2Ugd2FudCB0byBhbGxvdyBsYXp5aW5nIGJ5IGRlZmF1bHQgKHVzaW5nIHRoZSBcImZvcmNlXCIgcGFyYW1ldGVyIGFsd2F5cyBmb3JjZXMgYW4gaW1tZWRpYXRlIGZ1bGwgcmVuZGVyKVxuXHRcdFx0XHRcdHRoaXMucmVuZGVyKC10aGlzLl9kZWxheSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpLFxuXHRcdFx0X2lzU2VsZWN0b3IgPSBmdW5jdGlvbih2KSB7XG5cdFx0XHRcdHJldHVybiAodiAmJiB2Lmxlbmd0aCAmJiB2ICE9PSB3aW5kb3cgJiYgdlswXSAmJiAodlswXSA9PT0gd2luZG93IHx8ICh2WzBdLm5vZGVUeXBlICYmIHZbMF0uc3R5bGUgJiYgIXYubm9kZVR5cGUpKSk7IC8vd2UgY2Fubm90IGNoZWNrIFwibm9kZVR5cGVcIiBpZiB0aGUgdGFyZ2V0IGlzIHdpbmRvdyBmcm9tIHdpdGhpbiBhbiBpZnJhbWUsIG90aGVyd2lzZSBpdCB3aWxsIHRyaWdnZXIgYSBzZWN1cml0eSBlcnJvciBpbiBzb21lIGJyb3dzZXJzIGxpa2UgRmlyZWZveC5cblx0XHRcdH0sXG5cdFx0XHRfYXV0b0NTUyA9IGZ1bmN0aW9uKHZhcnMsIHRhcmdldCkge1xuXHRcdFx0XHR2YXIgY3NzID0ge30sXG5cdFx0XHRcdFx0cDtcblx0XHRcdFx0Zm9yIChwIGluIHZhcnMpIHtcblx0XHRcdFx0XHRpZiAoIV9yZXNlcnZlZFByb3BzW3BdICYmICghKHAgaW4gdGFyZ2V0KSB8fCBwID09PSBcInRyYW5zZm9ybVwiIHx8IHAgPT09IFwieFwiIHx8IHAgPT09IFwieVwiIHx8IHAgPT09IFwid2lkdGhcIiB8fCBwID09PSBcImhlaWdodFwiIHx8IHAgPT09IFwiY2xhc3NOYW1lXCIgfHwgcCA9PT0gXCJib3JkZXJcIikgJiYgKCFfcGx1Z2luc1twXSB8fCAoX3BsdWdpbnNbcF0gJiYgX3BsdWdpbnNbcF0uX2F1dG9DU1MpKSkgeyAvL25vdGU6IDxpbWc+IGVsZW1lbnRzIGNvbnRhaW4gcmVhZC1vbmx5IFwieFwiIGFuZCBcInlcIiBwcm9wZXJ0aWVzLiBXZSBzaG91bGQgYWxzbyBwcmlvcml0aXplIGVkaXRpbmcgY3NzIHdpZHRoL2hlaWdodCByYXRoZXIgdGhhbiB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMuXG5cdFx0XHRcdFx0XHRjc3NbcF0gPSB2YXJzW3BdO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHZhcnNbcF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHZhcnMuY3NzID0gY3NzO1xuXHRcdFx0fTtcblxuXHRcdHAgPSBUd2VlbkxpdGUucHJvdG90eXBlID0gbmV3IEFuaW1hdGlvbigpO1xuXHRcdHAuY29uc3RydWN0b3IgPSBUd2VlbkxpdGU7XG5cdFx0cC5raWxsKCkuX2djID0gZmFsc2U7XG5cbi8vLS0tLVR3ZWVuTGl0ZSBkZWZhdWx0cywgb3ZlcndyaXRlIG1hbmFnZW1lbnQsIGFuZCByb290IHVwZGF0ZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0cC5yYXRpbyA9IDA7XG5cdFx0cC5fZmlyc3RQVCA9IHAuX3RhcmdldHMgPSBwLl9vdmVyd3JpdHRlblByb3BzID0gcC5fc3RhcnRBdCA9IG51bGw7XG5cdFx0cC5fbm90aWZ5UGx1Z2luc09mRW5hYmxlZCA9IHAuX2xhenkgPSBmYWxzZTtcblxuXHRcdFR3ZWVuTGl0ZS52ZXJzaW9uID0gXCIxLjE4LjJcIjtcblx0XHRUd2VlbkxpdGUuZGVmYXVsdEVhc2UgPSBwLl9lYXNlID0gbmV3IEVhc2UobnVsbCwgbnVsbCwgMSwgMSk7XG5cdFx0VHdlZW5MaXRlLmRlZmF1bHRPdmVyd3JpdGUgPSBcImF1dG9cIjtcblx0XHRUd2VlbkxpdGUudGlja2VyID0gX3RpY2tlcjtcblx0XHRUd2VlbkxpdGUuYXV0b1NsZWVwID0gMTIwO1xuXHRcdFR3ZWVuTGl0ZS5sYWdTbW9vdGhpbmcgPSBmdW5jdGlvbih0aHJlc2hvbGQsIGFkanVzdGVkTGFnKSB7XG5cdFx0XHRfdGlja2VyLmxhZ1Ntb290aGluZyh0aHJlc2hvbGQsIGFkanVzdGVkTGFnKTtcblx0XHR9O1xuXG5cdFx0VHdlZW5MaXRlLnNlbGVjdG9yID0gd2luZG93LiQgfHwgd2luZG93LmpRdWVyeSB8fCBmdW5jdGlvbihlKSB7XG5cdFx0XHR2YXIgc2VsZWN0b3IgPSB3aW5kb3cuJCB8fCB3aW5kb3cualF1ZXJ5O1xuXHRcdFx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0XHRcdFR3ZWVuTGl0ZS5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXHRcdFx0XHRyZXR1cm4gc2VsZWN0b3IoZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKHR5cGVvZihkb2N1bWVudCkgPT09IFwidW5kZWZpbmVkXCIpID8gZSA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlKSA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKChlLmNoYXJBdCgwKSA9PT0gXCIjXCIpID8gZS5zdWJzdHIoMSkgOiBlKSk7XG5cdFx0fTtcblxuXHRcdHZhciBfbGF6eVR3ZWVucyA9IFtdLFxuXHRcdFx0X2xhenlMb29rdXAgPSB7fSxcblx0XHRcdF9udW1iZXJzRXhwID0gLyg/OigtfC09fFxcKz0pP1xcZCpcXC4/XFxkKig/OmVbXFwtK10/XFxkKyk/KVswLTldL2lnLFxuXHRcdFx0Ly9fbm9uTnVtYmVyc0V4cCA9IC8oPzooW1xcLStdKD8hKFxcZHw9KSkpfFteXFxkXFwtKz1lXXwoZSg/IVtcXC0rXVtcXGRdKSkpKy9pZyxcblx0XHRcdF9zZXRSYXRpbyA9IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0dmFyIHB0ID0gdGhpcy5fZmlyc3RQVCxcblx0XHRcdFx0XHRtaW4gPSAwLjAwMDAwMSxcblx0XHRcdFx0XHR2YWw7XG5cdFx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHRcdHZhbCA9ICFwdC5ibG9iID8gcHQuYyAqIHYgKyBwdC5zIDogdiA/IHRoaXMuam9pbihcIlwiKSA6IHRoaXMuc3RhcnQ7XG5cdFx0XHRcdFx0aWYgKHB0LnIpIHtcblx0XHRcdFx0XHRcdHZhbCA9IE1hdGgucm91bmQodmFsKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHZhbCA8IG1pbikgaWYgKHZhbCA+IC1taW4pIHsgLy9wcmV2ZW50cyBpc3N1ZXMgd2l0aCBjb252ZXJ0aW5nIHZlcnkgc21hbGwgbnVtYmVycyB0byBzdHJpbmdzIGluIHRoZSBicm93c2VyXG5cdFx0XHRcdFx0XHR2YWwgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIXB0LmYpIHtcblx0XHRcdFx0XHRcdHB0LnRbcHQucF0gPSB2YWw7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwdC5mcCkge1xuXHRcdFx0XHRcdFx0cHQudFtwdC5wXShwdC5mcCwgdmFsKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cHQudFtwdC5wXSh2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwdCA9IHB0Ll9uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ly9jb21wYXJlcyB0d28gc3RyaW5ncyAoc3RhcnQvZW5kKSwgZmluZHMgdGhlIG51bWJlcnMgdGhhdCBhcmUgZGlmZmVyZW50IGFuZCBzcGl0cyBiYWNrIGFuIGFycmF5IHJlcHJlc2VudGluZyB0aGUgd2hvbGUgdmFsdWUgYnV0IHdpdGggdGhlIGNoYW5naW5nIHZhbHVlcyBpc29sYXRlZCBhcyBlbGVtZW50cy4gRm9yIGV4YW1wbGUsIFwicmdiKDAsMCwwKVwiIGFuZCBcInJnYigxMDAsNTAsMClcIiB3b3VsZCBiZWNvbWUgW1wicmdiKFwiLCAwLCBcIixcIiwgNTAsIFwiLDApXCJdLiBOb3RpY2UgaXQgbWVyZ2VzIHRoZSBwYXJ0cyB0aGF0IGFyZSBpZGVudGljYWwgKHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbikuIFRoZSBhcnJheSBhbHNvIGhhcyBhIGxpbmtlZCBsaXN0IG9mIFByb3BUd2VlbnMgYXR0YWNoZWQgc3RhcnRpbmcgd2l0aCBfZmlyc3RQVCB0aGF0IGNvbnRhaW4gdGhlIHR3ZWVuaW5nIGRhdGEgKHQsIHAsIHMsIGMsIGYsIGV0Yy4pLiBJdCBhbHNvIHN0b3JlcyB0aGUgc3RhcnRpbmcgdmFsdWUgYXMgYSBcInN0YXJ0XCIgcHJvcGVydHkgc28gdGhhdCB3ZSBjYW4gcmV2ZXJ0IHRvIGl0IGlmL3doZW4gbmVjZXNzYXJ5LCBsaWtlIHdoZW4gYSB0d2VlbiByZXdpbmRzIGZ1bGx5LiBJZiB0aGUgcXVhbnRpdHkgb2YgbnVtYmVycyBkaWZmZXJzIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCBlbmQsIGl0IHdpbGwgYWx3YXlzIHByaW9yaXRpemUgdGhlIGVuZCB2YWx1ZShzKS4gVGhlIHB0IHBhcmFtZXRlciBpcyBvcHRpb25hbCAtIGl0J3MgZm9yIGEgUHJvcFR3ZWVuIHRoYXQgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgZW5kIG9mIHRoZSBsaW5rZWQgbGlzdCBhbmQgaXMgdHlwaWNhbGx5IGZvciBhY3R1YWxseSBzZXR0aW5nIHRoZSB2YWx1ZSBhZnRlciBhbGwgb2YgdGhlIGVsZW1lbnRzIGhhdmUgYmVlbiB1cGRhdGVkICh3aXRoIGFycmF5LmpvaW4oXCJcIikpLlxuXHRcdFx0X2Jsb2JEaWYgPSBmdW5jdGlvbihzdGFydCwgZW5kLCBmaWx0ZXIsIHB0KSB7XG5cdFx0XHRcdHZhciBhID0gW3N0YXJ0LCBlbmRdLFxuXHRcdFx0XHRcdGNoYXJJbmRleCA9IDAsXG5cdFx0XHRcdFx0cyA9IFwiXCIsXG5cdFx0XHRcdFx0Y29sb3IgPSAwLFxuXHRcdFx0XHRcdHN0YXJ0TnVtcywgZW5kTnVtcywgbnVtLCBpLCBsLCBub25OdW1iZXJzLCBjdXJyZW50TnVtO1xuXHRcdFx0XHRhLnN0YXJ0ID0gc3RhcnQ7XG5cdFx0XHRcdGlmIChmaWx0ZXIpIHtcblx0XHRcdFx0XHRmaWx0ZXIoYSk7IC8vcGFzcyBhbiBhcnJheSB3aXRoIHRoZSBzdGFydGluZyBhbmQgZW5kaW5nIHZhbHVlcyBhbmQgbGV0IHRoZSBmaWx0ZXIgZG8gd2hhdGV2ZXIgaXQgbmVlZHMgdG8gdGhlIHZhbHVlcy5cblx0XHRcdFx0XHRzdGFydCA9IGFbMF07XG5cdFx0XHRcdFx0ZW5kID0gYVsxXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhLmxlbmd0aCA9IDA7XG5cdFx0XHRcdHN0YXJ0TnVtcyA9IHN0YXJ0Lm1hdGNoKF9udW1iZXJzRXhwKSB8fCBbXTtcblx0XHRcdFx0ZW5kTnVtcyA9IGVuZC5tYXRjaChfbnVtYmVyc0V4cCkgfHwgW107XG5cdFx0XHRcdGlmIChwdCkge1xuXHRcdFx0XHRcdHB0Ll9uZXh0ID0gbnVsbDtcblx0XHRcdFx0XHRwdC5ibG9iID0gMTtcblx0XHRcdFx0XHRhLl9maXJzdFBUID0gcHQ7IC8vYXBwbHkgbGFzdCBpbiB0aGUgbGlua2VkIGxpc3QgKHdoaWNoIG1lYW5zIGluc2VydGluZyBpdCBmaXJzdClcblx0XHRcdFx0fVxuXHRcdFx0XHRsID0gZW5kTnVtcy5sZW5ndGg7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRjdXJyZW50TnVtID0gZW5kTnVtc1tpXTtcblx0XHRcdFx0XHRub25OdW1iZXJzID0gZW5kLnN1YnN0cihjaGFySW5kZXgsIGVuZC5pbmRleE9mKGN1cnJlbnROdW0sIGNoYXJJbmRleCktY2hhckluZGV4KTtcblx0XHRcdFx0XHRzICs9IChub25OdW1iZXJzIHx8ICFpKSA/IG5vbk51bWJlcnMgOiBcIixcIjsgLy9ub3RlOiBTVkcgc3BlYyBhbGxvd3Mgb21pc3Npb24gb2YgY29tbWEvc3BhY2Ugd2hlbiBhIG5lZ2F0aXZlIHNpZ24gaXMgd2VkZ2VkIGJldHdlZW4gdHdvIG51bWJlcnMsIGxpa2UgMi41LTUuMyBpbnN0ZWFkIG9mIDIuNSwtNS4zIGJ1dCB3aGVuIHR3ZWVuaW5nLCB0aGUgbmVnYXRpdmUgdmFsdWUgbWF5IHN3aXRjaCB0byBwb3NpdGl2ZSwgc28gd2UgaW5zZXJ0IHRoZSBjb21tYSBqdXN0IGluIGNhc2UuXG5cdFx0XHRcdFx0Y2hhckluZGV4ICs9IG5vbk51bWJlcnMubGVuZ3RoO1xuXHRcdFx0XHRcdGlmIChjb2xvcikgeyAvL3NlbnNlIHJnYmEoKSB2YWx1ZXMgYW5kIHJvdW5kIHRoZW0uXG5cdFx0XHRcdFx0XHRjb2xvciA9IChjb2xvciArIDEpICUgNTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5vbk51bWJlcnMuc3Vic3RyKC01KSA9PT0gXCJyZ2JhKFwiKSB7XG5cdFx0XHRcdFx0XHRjb2xvciA9IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjdXJyZW50TnVtID09PSBzdGFydE51bXNbaV0gfHwgc3RhcnROdW1zLmxlbmd0aCA8PSBpKSB7XG5cdFx0XHRcdFx0XHRzICs9IGN1cnJlbnROdW07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChzKSB7XG5cdFx0XHRcdFx0XHRcdGEucHVzaChzKTtcblx0XHRcdFx0XHRcdFx0cyA9IFwiXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRudW0gPSBwYXJzZUZsb2F0KHN0YXJ0TnVtc1tpXSk7XG5cdFx0XHRcdFx0XHRhLnB1c2gobnVtKTtcblx0XHRcdFx0XHRcdGEuX2ZpcnN0UFQgPSB7X25leHQ6IGEuX2ZpcnN0UFQsIHQ6YSwgcDogYS5sZW5ndGgtMSwgczpudW0sIGM6KChjdXJyZW50TnVtLmNoYXJBdCgxKSA9PT0gXCI9XCIpID8gcGFyc2VJbnQoY3VycmVudE51bS5jaGFyQXQoMCkgKyBcIjFcIiwgMTApICogcGFyc2VGbG9hdChjdXJyZW50TnVtLnN1YnN0cigyKSkgOiAocGFyc2VGbG9hdChjdXJyZW50TnVtKSAtIG51bSkpIHx8IDAsIGY6MCwgcjooY29sb3IgJiYgY29sb3IgPCA0KX07XG5cdFx0XHRcdFx0XHQvL25vdGU6IHdlIGRvbid0IHNldCBfcHJldiBiZWNhdXNlIHdlJ2xsIG5ldmVyIG5lZWQgdG8gcmVtb3ZlIGluZGl2aWR1YWwgUHJvcFR3ZWVucyBmcm9tIHRoaXMgbGlzdC5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2hhckluZGV4ICs9IGN1cnJlbnROdW0ubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHMgKz0gZW5kLnN1YnN0cihjaGFySW5kZXgpO1xuXHRcdFx0XHRpZiAocykge1xuXHRcdFx0XHRcdGEucHVzaChzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhLnNldFJhdGlvID0gX3NldFJhdGlvO1xuXHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdH0sXG5cdFx0XHQvL25vdGU6IFwiZnVuY1BhcmFtXCIgaXMgb25seSBuZWNlc3NhcnkgZm9yIGZ1bmN0aW9uLWJhc2VkIGdldHRlcnMvc2V0dGVycyB0aGF0IHJlcXVpcmUgYW4gZXh0cmEgcGFyYW1ldGVyIGxpa2UgZ2V0QXR0cmlidXRlKFwid2lkdGhcIikgYW5kIHNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHZhbHVlKS4gSW4gdGhpcyBleGFtcGxlLCBmdW5jUGFyYW0gd291bGQgYmUgXCJ3aWR0aFwiLiBVc2VkIGJ5IEF0dHJQbHVnaW4gZm9yIGV4YW1wbGUuXG5cdFx0XHRfYWRkUHJvcFR3ZWVuID0gZnVuY3Rpb24odGFyZ2V0LCBwcm9wLCBzdGFydCwgZW5kLCBvdmVyd3JpdGVQcm9wLCByb3VuZCwgZnVuY1BhcmFtLCBzdHJpbmdGaWx0ZXIpIHtcblx0XHRcdFx0dmFyIHMgPSAoc3RhcnQgPT09IFwiZ2V0XCIpID8gdGFyZ2V0W3Byb3BdIDogc3RhcnQsXG5cdFx0XHRcdFx0dHlwZSA9IHR5cGVvZih0YXJnZXRbcHJvcF0pLFxuXHRcdFx0XHRcdGlzUmVsYXRpdmUgPSAodHlwZW9mKGVuZCkgPT09IFwic3RyaW5nXCIgJiYgZW5kLmNoYXJBdCgxKSA9PT0gXCI9XCIpLFxuXHRcdFx0XHRcdHB0ID0ge3Q6dGFyZ2V0LCBwOnByb3AsIHM6cywgZjoodHlwZSA9PT0gXCJmdW5jdGlvblwiKSwgcGc6MCwgbjpvdmVyd3JpdGVQcm9wIHx8IHByb3AsIHI6cm91bmQsIHByOjAsIGM6aXNSZWxhdGl2ZSA/IHBhcnNlSW50KGVuZC5jaGFyQXQoMCkgKyBcIjFcIiwgMTApICogcGFyc2VGbG9hdChlbmQuc3Vic3RyKDIpKSA6IChwYXJzZUZsb2F0KGVuZCkgLSBzKSB8fCAwfSxcblx0XHRcdFx0XHRibG9iLCBnZXR0ZXJOYW1lO1xuXHRcdFx0XHRpZiAodHlwZSAhPT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRcdGlmICh0eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgc3RhcnQgPT09IFwiZ2V0XCIpIHtcblx0XHRcdFx0XHRcdGdldHRlck5hbWUgPSAoKHByb3AuaW5kZXhPZihcInNldFwiKSB8fCB0eXBlb2YodGFyZ2V0W1wiZ2V0XCIgKyBwcm9wLnN1YnN0cigzKV0pICE9PSBcImZ1bmN0aW9uXCIpID8gcHJvcCA6IFwiZ2V0XCIgKyBwcm9wLnN1YnN0cigzKSk7XG5cdFx0XHRcdFx0XHRwdC5zID0gcyA9IGZ1bmNQYXJhbSA/IHRhcmdldFtnZXR0ZXJOYW1lXShmdW5jUGFyYW0pIDogdGFyZ2V0W2dldHRlck5hbWVdKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0eXBlb2YocykgPT09IFwic3RyaW5nXCIgJiYgKGZ1bmNQYXJhbSB8fCBpc05hTihzKSkpIHtcblx0XHRcdFx0XHRcdC8vYSBibG9iIChzdHJpbmcgdGhhdCBoYXMgbXVsdGlwbGUgbnVtYmVycyBpbiBpdClcblx0XHRcdFx0XHRcdHB0LmZwID0gZnVuY1BhcmFtO1xuXHRcdFx0XHRcdFx0YmxvYiA9IF9ibG9iRGlmKHMsIGVuZCwgc3RyaW5nRmlsdGVyIHx8IFR3ZWVuTGl0ZS5kZWZhdWx0U3RyaW5nRmlsdGVyLCBwdCk7XG5cdFx0XHRcdFx0XHRwdCA9IHt0OmJsb2IsIHA6XCJzZXRSYXRpb1wiLCBzOjAsIGM6MSwgZjoyLCBwZzowLCBuOm92ZXJ3cml0ZVByb3AgfHwgcHJvcCwgcHI6MH07IC8vXCIyXCIgaW5kaWNhdGVzIGl0J3MgYSBCbG9iIHByb3BlcnR5IHR3ZWVuLiBOZWVkZWQgZm9yIFJvdW5kUHJvcHNQbHVnaW4gZm9yIGV4YW1wbGUuXG5cdFx0XHRcdFx0fSBlbHNlIGlmICghaXNSZWxhdGl2ZSkge1xuXHRcdFx0XHRcdFx0cHQucyA9IHBhcnNlRmxvYXQocyk7XG5cdFx0XHRcdFx0XHRwdC5jID0gKHBhcnNlRmxvYXQoZW5kKSAtIHB0LnMpIHx8IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChwdC5jKSB7IC8vb25seSBhZGQgaXQgdG8gdGhlIGxpbmtlZCBsaXN0IGlmIHRoZXJlJ3MgYSBjaGFuZ2UuXG5cdFx0XHRcdFx0aWYgKChwdC5fbmV4dCA9IHRoaXMuX2ZpcnN0UFQpKSB7XG5cdFx0XHRcdFx0XHRwdC5fbmV4dC5fcHJldiA9IHB0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQ7XG5cdFx0XHRcdFx0cmV0dXJuIHB0O1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0X2ludGVybmFscyA9IFR3ZWVuTGl0ZS5faW50ZXJuYWxzID0ge2lzQXJyYXk6X2lzQXJyYXksIGlzU2VsZWN0b3I6X2lzU2VsZWN0b3IsIGxhenlUd2VlbnM6X2xhenlUd2VlbnMsIGJsb2JEaWY6X2Jsb2JEaWZ9LCAvL2dpdmVzIHVzIGEgd2F5IHRvIGV4cG9zZSBjZXJ0YWluIHByaXZhdGUgdmFsdWVzIHRvIG90aGVyIEdyZWVuU29jayBjbGFzc2VzIHdpdGhvdXQgY29udGFtaW5hdGluZyB0aGEgbWFpbiBUd2VlbkxpdGUgb2JqZWN0LlxuXHRcdFx0X3BsdWdpbnMgPSBUd2VlbkxpdGUuX3BsdWdpbnMgPSB7fSxcblx0XHRcdF90d2Vlbkxvb2t1cCA9IF9pbnRlcm5hbHMudHdlZW5Mb29rdXAgPSB7fSxcblx0XHRcdF90d2Vlbkxvb2t1cE51bSA9IDAsXG5cdFx0XHRfcmVzZXJ2ZWRQcm9wcyA9IF9pbnRlcm5hbHMucmVzZXJ2ZWRQcm9wcyA9IHtlYXNlOjEsIGRlbGF5OjEsIG92ZXJ3cml0ZToxLCBvbkNvbXBsZXRlOjEsIG9uQ29tcGxldGVQYXJhbXM6MSwgb25Db21wbGV0ZVNjb3BlOjEsIHVzZUZyYW1lczoxLCBydW5CYWNrd2FyZHM6MSwgc3RhcnRBdDoxLCBvblVwZGF0ZToxLCBvblVwZGF0ZVBhcmFtczoxLCBvblVwZGF0ZVNjb3BlOjEsIG9uU3RhcnQ6MSwgb25TdGFydFBhcmFtczoxLCBvblN0YXJ0U2NvcGU6MSwgb25SZXZlcnNlQ29tcGxldGU6MSwgb25SZXZlcnNlQ29tcGxldGVQYXJhbXM6MSwgb25SZXZlcnNlQ29tcGxldGVTY29wZToxLCBvblJlcGVhdDoxLCBvblJlcGVhdFBhcmFtczoxLCBvblJlcGVhdFNjb3BlOjEsIGVhc2VQYXJhbXM6MSwgeW95bzoxLCBpbW1lZGlhdGVSZW5kZXI6MSwgcmVwZWF0OjEsIHJlcGVhdERlbGF5OjEsIGRhdGE6MSwgcGF1c2VkOjEsIHJldmVyc2VkOjEsIGF1dG9DU1M6MSwgbGF6eToxLCBvbk92ZXJ3cml0ZToxLCBjYWxsYmFja1Njb3BlOjEsIHN0cmluZ0ZpbHRlcjoxfSxcblx0XHRcdF9vdmVyd3JpdGVMb29rdXAgPSB7bm9uZTowLCBhbGw6MSwgYXV0bzoyLCBjb25jdXJyZW50OjMsIGFsbE9uU3RhcnQ6NCwgcHJlZXhpc3Rpbmc6NSwgXCJ0cnVlXCI6MSwgXCJmYWxzZVwiOjB9LFxuXHRcdFx0X3Jvb3RGcmFtZXNUaW1lbGluZSA9IEFuaW1hdGlvbi5fcm9vdEZyYW1lc1RpbWVsaW5lID0gbmV3IFNpbXBsZVRpbWVsaW5lKCksXG5cdFx0XHRfcm9vdFRpbWVsaW5lID0gQW5pbWF0aW9uLl9yb290VGltZWxpbmUgPSBuZXcgU2ltcGxlVGltZWxpbmUoKSxcblx0XHRcdF9uZXh0R0NGcmFtZSA9IDMwLFxuXHRcdFx0X2xhenlSZW5kZXIgPSBfaW50ZXJuYWxzLmxhenlSZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGkgPSBfbGF6eVR3ZWVucy5sZW5ndGgsXG5cdFx0XHRcdFx0dHdlZW47XG5cdFx0XHRcdF9sYXp5TG9va3VwID0ge307XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdHR3ZWVuID0gX2xhenlUd2VlbnNbaV07XG5cdFx0XHRcdFx0aWYgKHR3ZWVuICYmIHR3ZWVuLl9sYXp5ICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0dHdlZW4ucmVuZGVyKHR3ZWVuLl9sYXp5WzBdLCB0d2Vlbi5fbGF6eVsxXSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR0d2Vlbi5fbGF6eSA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRfbGF6eVR3ZWVucy5sZW5ndGggPSAwO1xuXHRcdFx0fTtcblxuXHRcdF9yb290VGltZWxpbmUuX3N0YXJ0VGltZSA9IF90aWNrZXIudGltZTtcblx0XHRfcm9vdEZyYW1lc1RpbWVsaW5lLl9zdGFydFRpbWUgPSBfdGlja2VyLmZyYW1lO1xuXHRcdF9yb290VGltZWxpbmUuX2FjdGl2ZSA9IF9yb290RnJhbWVzVGltZWxpbmUuX2FjdGl2ZSA9IHRydWU7XG5cdFx0c2V0VGltZW91dChfbGF6eVJlbmRlciwgMSk7IC8vb24gc29tZSBtb2JpbGUgZGV2aWNlcywgdGhlcmUgaXNuJ3QgYSBcInRpY2tcIiBiZWZvcmUgY29kZSBydW5zIHdoaWNoIG1lYW5zIGFueSBsYXp5IHJlbmRlcnMgd291bGRuJ3QgcnVuIGJlZm9yZSB0aGUgbmV4dCBvZmZpY2lhbCBcInRpY2tcIi5cblxuXHRcdEFuaW1hdGlvbi5fdXBkYXRlUm9vdCA9IFR3ZWVuTGl0ZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGksIGEsIHA7XG5cdFx0XHRcdGlmIChfbGF6eVR3ZWVucy5sZW5ndGgpIHsgLy9pZiBjb2RlIGlzIHJ1biBvdXRzaWRlIG9mIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgbG9vcCwgdGhlcmUgbWF5IGJlIHR3ZWVucyBxdWV1ZWQgQUZURVIgdGhlIGVuZ2luZSByZWZyZXNoZWQsIHNvIHdlIG5lZWQgdG8gZW5zdXJlIGFueSBwZW5kaW5nIHJlbmRlcnMgb2NjdXIgYmVmb3JlIHdlIHJlZnJlc2ggYWdhaW4uXG5cdFx0XHRcdFx0X2xhenlSZW5kZXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfcm9vdFRpbWVsaW5lLnJlbmRlcigoX3RpY2tlci50aW1lIC0gX3Jvb3RUaW1lbGluZS5fc3RhcnRUaW1lKSAqIF9yb290VGltZWxpbmUuX3RpbWVTY2FsZSwgZmFsc2UsIGZhbHNlKTtcblx0XHRcdFx0X3Jvb3RGcmFtZXNUaW1lbGluZS5yZW5kZXIoKF90aWNrZXIuZnJhbWUgLSBfcm9vdEZyYW1lc1RpbWVsaW5lLl9zdGFydFRpbWUpICogX3Jvb3RGcmFtZXNUaW1lbGluZS5fdGltZVNjYWxlLCBmYWxzZSwgZmFsc2UpO1xuXHRcdFx0XHRpZiAoX2xhenlUd2VlbnMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0X2xhenlSZW5kZXIoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoX3RpY2tlci5mcmFtZSA+PSBfbmV4dEdDRnJhbWUpIHsgLy9kdW1wIGdhcmJhZ2UgZXZlcnkgMTIwIGZyYW1lcyBvciB3aGF0ZXZlciB0aGUgdXNlciBzZXRzIFR3ZWVuTGl0ZS5hdXRvU2xlZXAgdG9cblx0XHRcdFx0XHRfbmV4dEdDRnJhbWUgPSBfdGlja2VyLmZyYW1lICsgKHBhcnNlSW50KFR3ZWVuTGl0ZS5hdXRvU2xlZXAsIDEwKSB8fCAxMjApO1xuXHRcdFx0XHRcdGZvciAocCBpbiBfdHdlZW5Mb29rdXApIHtcblx0XHRcdFx0XHRcdGEgPSBfdHdlZW5Mb29rdXBbcF0udHdlZW5zO1xuXHRcdFx0XHRcdFx0aSA9IGEubGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhW2ldLl9nYykge1xuXHRcdFx0XHRcdFx0XHRcdGEuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoYS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIF90d2Vlbkxvb2t1cFtwXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly9pZiB0aGVyZSBhcmUgbm8gbW9yZSB0d2VlbnMgaW4gdGhlIHJvb3QgdGltZWxpbmVzLCBvciBpZiB0aGV5J3JlIGFsbCBwYXVzZWQsIG1ha2UgdGhlIF90aW1lciBzbGVlcCB0byByZWR1Y2UgbG9hZCBvbiB0aGUgQ1BVIHNsaWdodGx5XG5cdFx0XHRcdFx0cCA9IF9yb290VGltZWxpbmUuX2ZpcnN0O1xuXHRcdFx0XHRcdGlmICghcCB8fCBwLl9wYXVzZWQpIGlmIChUd2VlbkxpdGUuYXV0b1NsZWVwICYmICFfcm9vdEZyYW1lc1RpbWVsaW5lLl9maXJzdCAmJiBfdGlja2VyLl9saXN0ZW5lcnMudGljay5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRcdHdoaWxlIChwICYmIHAuX3BhdXNlZCkge1xuXHRcdFx0XHRcdFx0XHRwID0gcC5fbmV4dDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmICghcCkge1xuXHRcdFx0XHRcdFx0XHRfdGlja2VyLnNsZWVwKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0X3RpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCBBbmltYXRpb24uX3VwZGF0ZVJvb3QpO1xuXG5cdFx0dmFyIF9yZWdpc3RlciA9IGZ1bmN0aW9uKHRhcmdldCwgdHdlZW4sIHNjcnViKSB7XG5cdFx0XHRcdHZhciBpZCA9IHRhcmdldC5fZ3NUd2VlbklELCBhLCBpO1xuXHRcdFx0XHRpZiAoIV90d2Vlbkxvb2t1cFtpZCB8fCAodGFyZ2V0Ll9nc1R3ZWVuSUQgPSBpZCA9IFwidFwiICsgKF90d2Vlbkxvb2t1cE51bSsrKSldKSB7XG5cdFx0XHRcdFx0X3R3ZWVuTG9va3VwW2lkXSA9IHt0YXJnZXQ6dGFyZ2V0LCB0d2VlbnM6W119O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0d2Vlbikge1xuXHRcdFx0XHRcdGEgPSBfdHdlZW5Mb29rdXBbaWRdLnR3ZWVucztcblx0XHRcdFx0XHRhWyhpID0gYS5sZW5ndGgpXSA9IHR3ZWVuO1xuXHRcdFx0XHRcdGlmIChzY3J1Yikge1xuXHRcdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhW2ldID09PSB0d2Vlbikge1xuXHRcdFx0XHRcdFx0XHRcdGEuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBfdHdlZW5Mb29rdXBbaWRdLnR3ZWVucztcblx0XHRcdH0sXG5cdFx0XHRfb25PdmVyd3JpdGUgPSBmdW5jdGlvbihvdmVyd3JpdHRlblR3ZWVuLCBvdmVyd3JpdGluZ1R3ZWVuLCB0YXJnZXQsIGtpbGxlZFByb3BzKSB7XG5cdFx0XHRcdHZhciBmdW5jID0gb3ZlcndyaXR0ZW5Ud2Vlbi52YXJzLm9uT3ZlcndyaXRlLCByMSwgcjI7XG5cdFx0XHRcdGlmIChmdW5jKSB7XG5cdFx0XHRcdFx0cjEgPSBmdW5jKG92ZXJ3cml0dGVuVHdlZW4sIG92ZXJ3cml0aW5nVHdlZW4sIHRhcmdldCwga2lsbGVkUHJvcHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZ1bmMgPSBUd2VlbkxpdGUub25PdmVyd3JpdGU7XG5cdFx0XHRcdGlmIChmdW5jKSB7XG5cdFx0XHRcdFx0cjIgPSBmdW5jKG92ZXJ3cml0dGVuVHdlZW4sIG92ZXJ3cml0aW5nVHdlZW4sIHRhcmdldCwga2lsbGVkUHJvcHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAocjEgIT09IGZhbHNlICYmIHIyICE9PSBmYWxzZSk7XG5cdFx0XHR9LFxuXHRcdFx0X2FwcGx5T3ZlcndyaXRlID0gZnVuY3Rpb24odGFyZ2V0LCB0d2VlbiwgcHJvcHMsIG1vZGUsIHNpYmxpbmdzKSB7XG5cdFx0XHRcdHZhciBpLCBjaGFuZ2VkLCBjdXJUd2VlbiwgbDtcblx0XHRcdFx0aWYgKG1vZGUgPT09IDEgfHwgbW9kZSA+PSA0KSB7XG5cdFx0XHRcdFx0bCA9IHNpYmxpbmdzLmxlbmd0aDtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoKGN1clR3ZWVuID0gc2libGluZ3NbaV0pICE9PSB0d2Vlbikge1xuXHRcdFx0XHRcdFx0XHRpZiAoIWN1clR3ZWVuLl9nYykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjdXJUd2Vlbi5fa2lsbChudWxsLCB0YXJnZXQsIHR3ZWVuKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG1vZGUgPT09IDUpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vTk9URTogQWRkIDAuMDAwMDAwMDAwMSB0byBvdmVyY29tZSBmbG9hdGluZyBwb2ludCBlcnJvcnMgdGhhdCBjYW4gY2F1c2UgdGhlIHN0YXJ0VGltZSB0byBiZSBWRVJZIHNsaWdodGx5IG9mZiAod2hlbiBhIHR3ZWVuJ3MgdGltZSgpIGlzIHNldCBmb3IgZXhhbXBsZSlcblx0XHRcdFx0dmFyIHN0YXJ0VGltZSA9IHR3ZWVuLl9zdGFydFRpbWUgKyBfdGlueU51bSxcblx0XHRcdFx0XHRvdmVybGFwcyA9IFtdLFxuXHRcdFx0XHRcdG9Db3VudCA9IDAsXG5cdFx0XHRcdFx0emVyb0R1ciA9ICh0d2Vlbi5fZHVyYXRpb24gPT09IDApLFxuXHRcdFx0XHRcdGdsb2JhbFN0YXJ0O1xuXHRcdFx0XHRpID0gc2libGluZ3MubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoKGN1clR3ZWVuID0gc2libGluZ3NbaV0pID09PSB0d2VlbiB8fCBjdXJUd2Vlbi5fZ2MgfHwgY3VyVHdlZW4uX3BhdXNlZCkge1xuXHRcdFx0XHRcdFx0Ly9pZ25vcmVcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGN1clR3ZWVuLl90aW1lbGluZSAhPT0gdHdlZW4uX3RpbWVsaW5lKSB7XG5cdFx0XHRcdFx0XHRnbG9iYWxTdGFydCA9IGdsb2JhbFN0YXJ0IHx8IF9jaGVja092ZXJsYXAodHdlZW4sIDAsIHplcm9EdXIpO1xuXHRcdFx0XHRcdFx0aWYgKF9jaGVja092ZXJsYXAoY3VyVHdlZW4sIGdsb2JhbFN0YXJ0LCB6ZXJvRHVyKSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRvdmVybGFwc1tvQ291bnQrK10gPSBjdXJUd2Vlbjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKGN1clR3ZWVuLl9zdGFydFRpbWUgPD0gc3RhcnRUaW1lKSBpZiAoY3VyVHdlZW4uX3N0YXJ0VGltZSArIGN1clR3ZWVuLnRvdGFsRHVyYXRpb24oKSAvIGN1clR3ZWVuLl90aW1lU2NhbGUgPiBzdGFydFRpbWUpIGlmICghKCh6ZXJvRHVyIHx8ICFjdXJUd2Vlbi5faW5pdHRlZCkgJiYgc3RhcnRUaW1lIC0gY3VyVHdlZW4uX3N0YXJ0VGltZSA8PSAwLjAwMDAwMDAwMDIpKSB7XG5cdFx0XHRcdFx0XHRvdmVybGFwc1tvQ291bnQrK10gPSBjdXJUd2Vlbjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpID0gb0NvdW50O1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRjdXJUd2VlbiA9IG92ZXJsYXBzW2ldO1xuXHRcdFx0XHRcdGlmIChtb2RlID09PSAyKSBpZiAoY3VyVHdlZW4uX2tpbGwocHJvcHMsIHRhcmdldCwgdHdlZW4pKSB7XG5cdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG1vZGUgIT09IDIgfHwgKCFjdXJUd2Vlbi5fZmlyc3RQVCAmJiBjdXJUd2Vlbi5faW5pdHRlZCkpIHtcblx0XHRcdFx0XHRcdGlmIChtb2RlICE9PSAyICYmICFfb25PdmVyd3JpdGUoY3VyVHdlZW4sIHR3ZWVuKSkge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjdXJUd2Vlbi5fZW5hYmxlZChmYWxzZSwgZmFsc2UpKSB7IC8vaWYgYWxsIHByb3BlcnR5IHR3ZWVucyBoYXZlIGJlZW4gb3ZlcndyaXR0ZW4sIGtpbGwgdGhlIHR3ZWVuLlxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGNoYW5nZWQ7XG5cdFx0XHR9LFxuXHRcdFx0X2NoZWNrT3ZlcmxhcCA9IGZ1bmN0aW9uKHR3ZWVuLCByZWZlcmVuY2UsIHplcm9EdXIpIHtcblx0XHRcdFx0dmFyIHRsID0gdHdlZW4uX3RpbWVsaW5lLFxuXHRcdFx0XHRcdHRzID0gdGwuX3RpbWVTY2FsZSxcblx0XHRcdFx0XHR0ID0gdHdlZW4uX3N0YXJ0VGltZTtcblx0XHRcdFx0d2hpbGUgKHRsLl90aW1lbGluZSkge1xuXHRcdFx0XHRcdHQgKz0gdGwuX3N0YXJ0VGltZTtcblx0XHRcdFx0XHR0cyAqPSB0bC5fdGltZVNjYWxlO1xuXHRcdFx0XHRcdGlmICh0bC5fcGF1c2VkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gLTEwMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGwgPSB0bC5fdGltZWxpbmU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dCAvPSB0cztcblx0XHRcdFx0cmV0dXJuICh0ID4gcmVmZXJlbmNlKSA/IHQgLSByZWZlcmVuY2UgOiAoKHplcm9EdXIgJiYgdCA9PT0gcmVmZXJlbmNlKSB8fCAoIXR3ZWVuLl9pbml0dGVkICYmIHQgLSByZWZlcmVuY2UgPCAyICogX3RpbnlOdW0pKSA/IF90aW55TnVtIDogKCh0ICs9IHR3ZWVuLnRvdGFsRHVyYXRpb24oKSAvIHR3ZWVuLl90aW1lU2NhbGUgLyB0cykgPiByZWZlcmVuY2UgKyBfdGlueU51bSkgPyAwIDogdCAtIHJlZmVyZW5jZSAtIF90aW55TnVtO1xuXHRcdFx0fTtcblxuXG4vLy0tLS0gVHdlZW5MaXRlIGluc3RhbmNlIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdHAuX2luaXQgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB2ID0gdGhpcy52YXJzLFxuXHRcdFx0XHRvcCA9IHRoaXMuX292ZXJ3cml0dGVuUHJvcHMsXG5cdFx0XHRcdGR1ciA9IHRoaXMuX2R1cmF0aW9uLFxuXHRcdFx0XHRpbW1lZGlhdGUgPSAhIXYuaW1tZWRpYXRlUmVuZGVyLFxuXHRcdFx0XHRlYXNlID0gdi5lYXNlLFxuXHRcdFx0XHRpLCBpbml0UGx1Z2lucywgcHQsIHAsIHN0YXJ0VmFycztcblx0XHRcdGlmICh2LnN0YXJ0QXQpIHtcblx0XHRcdFx0aWYgKHRoaXMuX3N0YXJ0QXQpIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LnJlbmRlcigtMSwgdHJ1ZSk7IC8vaWYgd2UndmUgcnVuIGEgc3RhcnRBdCBwcmV2aW91c2x5ICh3aGVuIHRoZSB0d2VlbiBpbnN0YW50aWF0ZWQpLCB3ZSBzaG91bGQgcmV2ZXJ0IGl0IHNvIHRoYXQgdGhlIHZhbHVlcyByZS1pbnN0YW50aWF0ZSBjb3JyZWN0bHkgcGFydGljdWxhcmx5IGZvciByZWxhdGl2ZSB0d2VlbnMuIFdpdGhvdXQgdGhpcywgYSBUd2VlbkxpdGUuZnJvbVRvKG9iaiwgMSwge3g6XCIrPTEwMFwifSwge3g6XCItPTEwMFwifSksIGZvciBleGFtcGxlLCB3b3VsZCBhY3R1YWxseSBqdW1wIHRvICs9MjAwIGJlY2F1c2UgdGhlIHN0YXJ0QXQgd291bGQgcnVuIHR3aWNlLCBkb3VibGluZyB0aGUgcmVsYXRpdmUgY2hhbmdlLlxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQua2lsbCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXJ0VmFycyA9IHt9O1xuXHRcdFx0XHRmb3IgKHAgaW4gdi5zdGFydEF0KSB7IC8vY29weSB0aGUgcHJvcGVydGllcy92YWx1ZXMgaW50byBhIG5ldyBvYmplY3QgdG8gYXZvaWQgY29sbGlzaW9ucywgbGlrZSB2YXIgdG8gPSB7eDowfSwgZnJvbSA9IHt4OjUwMH07IHRpbWVsaW5lLmZyb21UbyhlLCAxLCBmcm9tLCB0bykuZnJvbVRvKGUsIDEsIHRvLCBmcm9tKTtcblx0XHRcdFx0XHRzdGFydFZhcnNbcF0gPSB2LnN0YXJ0QXRbcF07XG5cdFx0XHRcdH1cblx0XHRcdFx0c3RhcnRWYXJzLm92ZXJ3cml0ZSA9IGZhbHNlO1xuXHRcdFx0XHRzdGFydFZhcnMuaW1tZWRpYXRlUmVuZGVyID0gdHJ1ZTtcblx0XHRcdFx0c3RhcnRWYXJzLmxhenkgPSAoaW1tZWRpYXRlICYmIHYubGF6eSAhPT0gZmFsc2UpO1xuXHRcdFx0XHRzdGFydFZhcnMuc3RhcnRBdCA9IHN0YXJ0VmFycy5kZWxheSA9IG51bGw7IC8vbm8gbmVzdGluZyBvZiBzdGFydEF0IG9iamVjdHMgYWxsb3dlZCAob3RoZXJ3aXNlIGl0IGNvdWxkIGNhdXNlIGFuIGluZmluaXRlIGxvb3ApLlxuXHRcdFx0XHR0aGlzLl9zdGFydEF0ID0gVHdlZW5MaXRlLnRvKHRoaXMudGFyZ2V0LCAwLCBzdGFydFZhcnMpO1xuXHRcdFx0XHRpZiAoaW1tZWRpYXRlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3RpbWUgPiAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9zdGFydEF0ID0gbnVsbDsgLy90d2VlbnMgdGhhdCByZW5kZXIgaW1tZWRpYXRlbHkgKGxpa2UgbW9zdCBmcm9tKCkgYW5kIGZyb21UbygpIHR3ZWVucykgc2hvdWxkbid0IHJldmVydCB3aGVuIHRoZWlyIHBhcmVudCB0aW1lbGluZSdzIHBsYXloZWFkIGdvZXMgYmFja3dhcmQgcGFzdCB0aGUgc3RhcnRUaW1lIGJlY2F1c2UgdGhlIGluaXRpYWwgcmVuZGVyIGNvdWxkIGhhdmUgaGFwcGVuZWQgYW55dGltZSBhbmQgaXQgc2hvdWxkbid0IGJlIGRpcmVjdGx5IGNvcnJlbGF0ZWQgdG8gdGhpcyB0d2VlbidzIHN0YXJ0VGltZS4gSW1hZ2luZSBzZXR0aW5nIHVwIGEgY29tcGxleCBhbmltYXRpb24gd2hlcmUgdGhlIGJlZ2lubmluZyBzdGF0ZXMgb2YgdmFyaW91cyBvYmplY3RzIGFyZSByZW5kZXJlZCBpbW1lZGlhdGVseSBidXQgdGhlIHR3ZWVuIGRvZXNuJ3QgaGFwcGVuIGZvciBxdWl0ZSBzb21lIHRpbWUgLSBpZiB3ZSByZXZlcnQgdG8gdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcyBzb29uIGFzIHRoZSBwbGF5aGVhZCBnb2VzIGJhY2t3YXJkIHBhc3QgdGhlIHR3ZWVuJ3Mgc3RhcnRUaW1lLCBpdCB3aWxsIHRocm93IHRoaW5ncyBvZmYgdmlzdWFsbHkuIFJldmVyc2lvbiBzaG91bGQgb25seSBoYXBwZW4gaW4gVGltZWxpbmVMaXRlL01heCBpbnN0YW5jZXMgd2hlcmUgaW1tZWRpYXRlUmVuZGVyIHdhcyBmYWxzZSAod2hpY2ggaXMgdGhlIGRlZmF1bHQgaW4gdGhlIGNvbnZlbmllbmNlIG1ldGhvZHMgbGlrZSBmcm9tKCkpLlxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoZHVyICE9PSAwKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47IC8vd2Ugc2tpcCBpbml0aWFsaXphdGlvbiBoZXJlIHNvIHRoYXQgb3ZlcndyaXRpbmcgZG9lc24ndCBvY2N1ciB1bnRpbCB0aGUgdHdlZW4gYWN0dWFsbHkgYmVnaW5zLiBPdGhlcndpc2UsIGlmIHlvdSBjcmVhdGUgc2V2ZXJhbCBpbW1lZGlhdGVSZW5kZXI6dHJ1ZSB0d2VlbnMgb2YgdGhlIHNhbWUgdGFyZ2V0L3Byb3BlcnRpZXMgdG8gZHJvcCBpbnRvIGEgVGltZWxpbmVMaXRlIG9yIFRpbWVsaW5lTWF4LCB0aGUgbGFzdCBvbmUgY3JlYXRlZCB3b3VsZCBvdmVyd3JpdGUgdGhlIGZpcnN0IG9uZXMgYmVjYXVzZSB0aGV5IGRpZG4ndCBnZXQgcGxhY2VkIGludG8gdGhlIHRpbWVsaW5lIHlldCBiZWZvcmUgdGhlIGZpcnN0IHJlbmRlciBvY2N1cnMgYW5kIGtpY2tzIGluIG92ZXJ3cml0aW5nLlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh2LnJ1bkJhY2t3YXJkcyAmJiBkdXIgIT09IDApIHtcblx0XHRcdFx0Ly9mcm9tKCkgdHdlZW5zIG11c3QgYmUgaGFuZGxlZCB1bmlxdWVseTogdGhlaXIgYmVnaW5uaW5nIHZhbHVlcyBtdXN0IGJlIHJlbmRlcmVkIGJ1dCB3ZSBkb24ndCB3YW50IG92ZXJ3cml0aW5nIHRvIG9jY3VyIHlldCAod2hlbiB0aW1lIGlzIHN0aWxsIDApLiBXYWl0IHVudGlsIHRoZSB0d2VlbiBhY3R1YWxseSBiZWdpbnMgYmVmb3JlIGRvaW5nIGFsbCB0aGUgcm91dGluZXMgbGlrZSBvdmVyd3JpdGluZy4gQXQgdGhhdCB0aW1lLCB3ZSBzaG91bGQgcmVuZGVyIGF0IHRoZSBFTkQgb2YgdGhlIHR3ZWVuIHRvIGVuc3VyZSB0aGF0IHRoaW5ncyBpbml0aWFsaXplIGNvcnJlY3RseSAocmVtZW1iZXIsIGZyb20oKSB0d2VlbnMgZ28gYmFja3dhcmRzKVxuXHRcdFx0XHRpZiAodGhpcy5fc3RhcnRBdCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQucmVuZGVyKC0xLCB0cnVlKTtcblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LmtpbGwoKTtcblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0ID0gbnVsbDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fdGltZSAhPT0gMCkgeyAvL2luIHJhcmUgY2FzZXMgKGxpa2UgaWYgYSBmcm9tKCkgdHdlZW4gcnVucyBhbmQgdGhlbiBpcyBpbnZhbGlkYXRlKCktZWQpLCBpbW1lZGlhdGVSZW5kZXIgY291bGQgYmUgdHJ1ZSBidXQgdGhlIGluaXRpYWwgZm9yY2VkLXJlbmRlciBnZXRzIHNraXBwZWQsIHNvIHRoZXJlJ3Mgbm8gbmVlZCB0byBmb3JjZSB0aGUgcmVuZGVyIGluIHRoaXMgY29udGV4dCB3aGVuIHRoZSBfdGltZSBpcyBncmVhdGVyIHRoYW4gMFxuXHRcdFx0XHRcdFx0aW1tZWRpYXRlID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHB0ID0ge307XG5cdFx0XHRcdFx0Zm9yIChwIGluIHYpIHsgLy9jb3B5IHByb3BzIGludG8gYSBuZXcgb2JqZWN0IGFuZCBza2lwIGFueSByZXNlcnZlZCBwcm9wcywgb3RoZXJ3aXNlIG9uQ29tcGxldGUgb3Igb25VcGRhdGUgb3Igb25TdGFydCBjb3VsZCBmaXJlLiBXZSBzaG91bGQsIGhvd2V2ZXIsIHBlcm1pdCBhdXRvQ1NTIHRvIGdvIHRocm91Z2guXG5cdFx0XHRcdFx0XHRpZiAoIV9yZXNlcnZlZFByb3BzW3BdIHx8IHAgPT09IFwiYXV0b0NTU1wiKSB7XG5cdFx0XHRcdFx0XHRcdHB0W3BdID0gdltwXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHQub3ZlcndyaXRlID0gMDtcblx0XHRcdFx0XHRwdC5kYXRhID0gXCJpc0Zyb21TdGFydFwiOyAvL3dlIHRhZyB0aGUgdHdlZW4gd2l0aCBhcyBcImlzRnJvbVN0YXJ0XCIgc28gdGhhdCBpZiBbaW5zaWRlIGEgcGx1Z2luXSB3ZSBuZWVkIHRvIG9ubHkgZG8gc29tZXRoaW5nIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuLCB3ZSBoYXZlIGEgd2F5IG9mIGlkZW50aWZ5aW5nIHRoaXMgdHdlZW4gYXMgbWVyZWx5IHRoZSBvbmUgdGhhdCdzIHNldHRpbmcgdGhlIGJlZ2lubmluZyB2YWx1ZXMgZm9yIGEgXCJmcm9tKClcIiB0d2Vlbi4gRm9yIGV4YW1wbGUsIGNsZWFyUHJvcHMgaW4gQ1NTUGx1Z2luIHNob3VsZCBvbmx5IGdldCBhcHBsaWVkIGF0IHRoZSB2ZXJ5IEVORCBvZiBhIHR3ZWVuIGFuZCB3aXRob3V0IHRoaXMgdGFnLCBmcm9tKC4uLntoZWlnaHQ6MTAwLCBjbGVhclByb3BzOlwiaGVpZ2h0XCIsIGRlbGF5OjF9KSB3b3VsZCB3aXBlIHRoZSBoZWlnaHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgdHdlZW4gYW5kIGFmdGVyIDEgc2Vjb25kLCBpdCdkIGtpY2sgYmFjayBpbi5cblx0XHRcdFx0XHRwdC5sYXp5ID0gKGltbWVkaWF0ZSAmJiB2LmxhenkgIT09IGZhbHNlKTtcblx0XHRcdFx0XHRwdC5pbW1lZGlhdGVSZW5kZXIgPSBpbW1lZGlhdGU7IC8vemVyby1kdXJhdGlvbiB0d2VlbnMgcmVuZGVyIGltbWVkaWF0ZWx5IGJ5IGRlZmF1bHQsIGJ1dCBpZiB3ZSdyZSBub3Qgc3BlY2lmaWNhbGx5IGluc3RydWN0ZWQgdG8gcmVuZGVyIHRoaXMgdHdlZW4gaW1tZWRpYXRlbHksIHdlIHNob3VsZCBza2lwIHRoaXMgYW5kIG1lcmVseSBfaW5pdCgpIHRvIHJlY29yZCB0aGUgc3RhcnRpbmcgdmFsdWVzIChyZW5kZXJpbmcgdGhlbSBpbW1lZGlhdGVseSB3b3VsZCBwdXNoIHRoZW0gdG8gY29tcGxldGlvbiB3aGljaCBpcyB3YXN0ZWZ1bCBpbiB0aGF0IGNhc2UgLSB3ZSdkIGhhdmUgdG8gcmVuZGVyKC0xKSBpbW1lZGlhdGVseSBhZnRlcilcblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0ID0gVHdlZW5MaXRlLnRvKHRoaXMudGFyZ2V0LCAwLCBwdCk7XG5cdFx0XHRcdFx0aWYgKCFpbW1lZGlhdGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQuX2luaXQoKTsgLy9lbnN1cmVzIHRoYXQgdGhlIGluaXRpYWwgdmFsdWVzIGFyZSByZWNvcmRlZFxuXHRcdFx0XHRcdFx0dGhpcy5fc3RhcnRBdC5fZW5hYmxlZChmYWxzZSk7IC8vbm8gbmVlZCB0byBoYXZlIHRoZSB0d2VlbiByZW5kZXIgb24gdGhlIG5leHQgY3ljbGUuIERpc2FibGUgaXQgYmVjYXVzZSB3ZSdsbCBhbHdheXMgbWFudWFsbHkgY29udHJvbCB0aGUgcmVuZGVycyBvZiB0aGUgX3N0YXJ0QXQgdHdlZW4uXG5cdFx0XHRcdFx0XHRpZiAodGhpcy52YXJzLmltbWVkaWF0ZVJlbmRlcikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9zdGFydEF0ID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX3RpbWUgPT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX2Vhc2UgPSBlYXNlID0gKCFlYXNlKSA/IFR3ZWVuTGl0ZS5kZWZhdWx0RWFzZSA6IChlYXNlIGluc3RhbmNlb2YgRWFzZSkgPyBlYXNlIDogKHR5cGVvZihlYXNlKSA9PT0gXCJmdW5jdGlvblwiKSA/IG5ldyBFYXNlKGVhc2UsIHYuZWFzZVBhcmFtcykgOiBfZWFzZU1hcFtlYXNlXSB8fCBUd2VlbkxpdGUuZGVmYXVsdEVhc2U7XG5cdFx0XHRpZiAodi5lYXNlUGFyYW1zIGluc3RhbmNlb2YgQXJyYXkgJiYgZWFzZS5jb25maWcpIHtcblx0XHRcdFx0dGhpcy5fZWFzZSA9IGVhc2UuY29uZmlnLmFwcGx5KGVhc2UsIHYuZWFzZVBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9lYXNlVHlwZSA9IHRoaXMuX2Vhc2UuX3R5cGU7XG5cdFx0XHR0aGlzLl9lYXNlUG93ZXIgPSB0aGlzLl9lYXNlLl9wb3dlcjtcblx0XHRcdHRoaXMuX2ZpcnN0UFQgPSBudWxsO1xuXG5cdFx0XHRpZiAodGhpcy5fdGFyZ2V0cykge1xuXHRcdFx0XHRpID0gdGhpcy5fdGFyZ2V0cy5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdGlmICggdGhpcy5faW5pdFByb3BzKCB0aGlzLl90YXJnZXRzW2ldLCAodGhpcy5fcHJvcExvb2t1cFtpXSA9IHt9KSwgdGhpcy5fc2libGluZ3NbaV0sIChvcCA/IG9wW2ldIDogbnVsbCkpICkge1xuXHRcdFx0XHRcdFx0aW5pdFBsdWdpbnMgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5pdFBsdWdpbnMgPSB0aGlzLl9pbml0UHJvcHModGhpcy50YXJnZXQsIHRoaXMuX3Byb3BMb29rdXAsIHRoaXMuX3NpYmxpbmdzLCBvcCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpbml0UGx1Z2lucykge1xuXHRcdFx0XHRUd2VlbkxpdGUuX29uUGx1Z2luRXZlbnQoXCJfb25Jbml0QWxsUHJvcHNcIiwgdGhpcyk7IC8vcmVvcmRlcnMgdGhlIGFycmF5IGluIG9yZGVyIG9mIHByaW9yaXR5LiBVc2VzIGEgc3RhdGljIFR3ZWVuUGx1Z2luIG1ldGhvZCBpbiBvcmRlciB0byBtaW5pbWl6ZSBmaWxlIHNpemUgaW4gVHdlZW5MaXRlXG5cdFx0XHR9XG5cdFx0XHRpZiAob3ApIGlmICghdGhpcy5fZmlyc3RQVCkgaWYgKHR5cGVvZih0aGlzLnRhcmdldCkgIT09IFwiZnVuY3Rpb25cIikgeyAvL2lmIGFsbCB0d2VlbmluZyBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBvdmVyd3JpdHRlbiwga2lsbCB0aGUgdHdlZW4uIElmIHRoZSB0YXJnZXQgaXMgYSBmdW5jdGlvbiwgaXQncyBwcm9iYWJseSBhIGRlbGF5ZWRDYWxsIHNvIGxldCBpdCBsaXZlLlxuXHRcdFx0XHR0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodi5ydW5CYWNrd2FyZHMpIHtcblx0XHRcdFx0cHQgPSB0aGlzLl9maXJzdFBUO1xuXHRcdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0XHRwdC5zICs9IHB0LmM7XG5cdFx0XHRcdFx0cHQuYyA9IC1wdC5jO1xuXHRcdFx0XHRcdHB0ID0gcHQuX25leHQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX29uVXBkYXRlID0gdi5vblVwZGF0ZTtcblx0XHRcdHRoaXMuX2luaXR0ZWQgPSB0cnVlO1xuXHRcdH07XG5cblx0XHRwLl9pbml0UHJvcHMgPSBmdW5jdGlvbih0YXJnZXQsIHByb3BMb29rdXAsIHNpYmxpbmdzLCBvdmVyd3JpdHRlblByb3BzKSB7XG5cdFx0XHR2YXIgcCwgaSwgaW5pdFBsdWdpbnMsIHBsdWdpbiwgcHQsIHY7XG5cdFx0XHRpZiAodGFyZ2V0ID09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX2xhenlMb29rdXBbdGFyZ2V0Ll9nc1R3ZWVuSURdKSB7XG5cdFx0XHRcdF9sYXp5UmVuZGVyKCk7IC8vaWYgb3RoZXIgdHdlZW5zIG9mIHRoZSBzYW1lIHRhcmdldCBoYXZlIHJlY2VudGx5IGluaXR0ZWQgYnV0IGhhdmVuJ3QgcmVuZGVyZWQgeWV0LCB3ZSd2ZSBnb3QgdG8gZm9yY2UgdGhlIHJlbmRlciBzbyB0aGF0IHRoZSBzdGFydGluZyB2YWx1ZXMgYXJlIGNvcnJlY3QgKGltYWdpbmUgcG9wdWxhdGluZyBhIHRpbWVsaW5lIHdpdGggYSBidW5jaCBvZiBzZXF1ZW50aWFsIHR3ZWVucyBhbmQgdGhlbiBqdW1waW5nIHRvIHRoZSBlbmQpXG5cdFx0XHR9XG5cblx0XHRcdGlmICghdGhpcy52YXJzLmNzcykgaWYgKHRhcmdldC5zdHlsZSkgaWYgKHRhcmdldCAhPT0gd2luZG93ICYmIHRhcmdldC5ub2RlVHlwZSkgaWYgKF9wbHVnaW5zLmNzcykgaWYgKHRoaXMudmFycy5hdXRvQ1NTICE9PSBmYWxzZSkgeyAvL2l0J3Mgc28gY29tbW9uIHRvIHVzZSBUd2VlbkxpdGUvTWF4IHRvIGFuaW1hdGUgdGhlIGNzcyBvZiBET00gZWxlbWVudHMsIHdlIGFzc3VtZSB0aGF0IGlmIHRoZSB0YXJnZXQgaXMgYSBET00gZWxlbWVudCwgdGhhdCdzIHdoYXQgaXMgaW50ZW5kZWQgKGEgY29udmVuaWVuY2Ugc28gdGhhdCB1c2VycyBkb24ndCBoYXZlIHRvIHdyYXAgdGhpbmdzIGluIGNzczp7fSwgYWx0aG91Z2ggd2Ugc3RpbGwgcmVjb21tZW5kIGl0IGZvciBhIHNsaWdodCBwZXJmb3JtYW5jZSBib29zdCBhbmQgYmV0dGVyIHNwZWNpZmljaXR5KS4gTm90ZTogd2UgY2Fubm90IGNoZWNrIFwibm9kZVR5cGVcIiBvbiB0aGUgd2luZG93IGluc2lkZSBhbiBpZnJhbWUuXG5cdFx0XHRcdF9hdXRvQ1NTKHRoaXMudmFycywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHRcdGZvciAocCBpbiB0aGlzLnZhcnMpIHtcblx0XHRcdFx0diA9IHRoaXMudmFyc1twXTtcblx0XHRcdFx0aWYgKF9yZXNlcnZlZFByb3BzW3BdKSB7XG5cdFx0XHRcdFx0aWYgKHYpIGlmICgodiBpbnN0YW5jZW9mIEFycmF5KSB8fCAodi5wdXNoICYmIF9pc0FycmF5KHYpKSkgaWYgKHYuam9pbihcIlwiKS5pbmRleE9mKFwie3NlbGZ9XCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0dGhpcy52YXJzW3BdID0gdiA9IHRoaXMuX3N3YXBTZWxmSW5QYXJhbXModiwgdGhpcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAoX3BsdWdpbnNbcF0gJiYgKHBsdWdpbiA9IG5ldyBfcGx1Z2luc1twXSgpKS5fb25Jbml0VHdlZW4odGFyZ2V0LCB0aGlzLnZhcnNbcF0sIHRoaXMpKSB7XG5cblx0XHRcdFx0XHQvL3QgLSB0YXJnZXQgXHRcdFtvYmplY3RdXG5cdFx0XHRcdFx0Ly9wIC0gcHJvcGVydHkgXHRcdFtzdHJpbmddXG5cdFx0XHRcdFx0Ly9zIC0gc3RhcnRcdFx0XHRbbnVtYmVyXVxuXHRcdFx0XHRcdC8vYyAtIGNoYW5nZVx0XHRbbnVtYmVyXVxuXHRcdFx0XHRcdC8vZiAtIGlzRnVuY3Rpb25cdFtib29sZWFuXVxuXHRcdFx0XHRcdC8vbiAtIG5hbWVcdFx0XHRbc3RyaW5nXVxuXHRcdFx0XHRcdC8vcGcgLSBpc1BsdWdpbiBcdFtib29sZWFuXVxuXHRcdFx0XHRcdC8vcHIgLSBwcmlvcml0eVx0XHRbbnVtYmVyXVxuXHRcdFx0XHRcdHRoaXMuX2ZpcnN0UFQgPSBwdCA9IHtfbmV4dDp0aGlzLl9maXJzdFBULCB0OnBsdWdpbiwgcDpcInNldFJhdGlvXCIsIHM6MCwgYzoxLCBmOjEsIG46cCwgcGc6MSwgcHI6cGx1Z2luLl9wcmlvcml0eX07XG5cdFx0XHRcdFx0aSA9IHBsdWdpbi5fb3ZlcndyaXRlUHJvcHMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0cHJvcExvb2t1cFtwbHVnaW4uX292ZXJ3cml0ZVByb3BzW2ldXSA9IHRoaXMuX2ZpcnN0UFQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwbHVnaW4uX3ByaW9yaXR5IHx8IHBsdWdpbi5fb25Jbml0QWxsUHJvcHMpIHtcblx0XHRcdFx0XHRcdGluaXRQbHVnaW5zID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHBsdWdpbi5fb25EaXNhYmxlIHx8IHBsdWdpbi5fb25FbmFibGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX25vdGlmeVBsdWdpbnNPZkVuYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAocHQuX25leHQpIHtcblx0XHRcdFx0XHRcdHB0Ll9uZXh0Ll9wcmV2ID0gcHQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJvcExvb2t1cFtwXSA9IF9hZGRQcm9wVHdlZW4uY2FsbCh0aGlzLCB0YXJnZXQsIHAsIFwiZ2V0XCIsIHYsIHAsIDAsIG51bGwsIHRoaXMudmFycy5zdHJpbmdGaWx0ZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvdmVyd3JpdHRlblByb3BzKSBpZiAodGhpcy5fa2lsbChvdmVyd3JpdHRlblByb3BzLCB0YXJnZXQpKSB7IC8vYW5vdGhlciB0d2VlbiBtYXkgaGF2ZSB0cmllZCB0byBvdmVyd3JpdGUgcHJvcGVydGllcyBvZiB0aGlzIHR3ZWVuIGJlZm9yZSBpbml0KCkgd2FzIGNhbGxlZCAobGlrZSBpZiB0d28gdHdlZW5zIHN0YXJ0IGF0IHRoZSBzYW1lIHRpbWUsIHRoZSBvbmUgY3JlYXRlZCBzZWNvbmQgd2lsbCBydW4gZmlyc3QpXG5cdFx0XHRcdHJldHVybiB0aGlzLl9pbml0UHJvcHModGFyZ2V0LCBwcm9wTG9va3VwLCBzaWJsaW5ncywgb3ZlcndyaXR0ZW5Qcm9wcyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fb3ZlcndyaXRlID4gMSkgaWYgKHRoaXMuX2ZpcnN0UFQpIGlmIChzaWJsaW5ncy5sZW5ndGggPiAxKSBpZiAoX2FwcGx5T3ZlcndyaXRlKHRhcmdldCwgdGhpcywgcHJvcExvb2t1cCwgdGhpcy5fb3ZlcndyaXRlLCBzaWJsaW5ncykpIHtcblx0XHRcdFx0dGhpcy5fa2lsbChwcm9wTG9va3VwLCB0YXJnZXQpO1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5faW5pdFByb3BzKHRhcmdldCwgcHJvcExvb2t1cCwgc2libGluZ3MsIG92ZXJ3cml0dGVuUHJvcHMpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2ZpcnN0UFQpIGlmICgodGhpcy52YXJzLmxhenkgIT09IGZhbHNlICYmIHRoaXMuX2R1cmF0aW9uKSB8fCAodGhpcy52YXJzLmxhenkgJiYgIXRoaXMuX2R1cmF0aW9uKSkgeyAvL3plcm8gZHVyYXRpb24gdHdlZW5zIGRvbid0IGxhenkgcmVuZGVyIGJ5IGRlZmF1bHQ7IGV2ZXJ5dGhpbmcgZWxzZSBkb2VzLlxuXHRcdFx0XHRfbGF6eUxvb2t1cFt0YXJnZXQuX2dzVHdlZW5JRF0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGluaXRQbHVnaW5zO1xuXHRcdH07XG5cblx0XHRwLnJlbmRlciA9IGZ1bmN0aW9uKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSkge1xuXHRcdFx0dmFyIHByZXZUaW1lID0gdGhpcy5fdGltZSxcblx0XHRcdFx0ZHVyYXRpb24gPSB0aGlzLl9kdXJhdGlvbixcblx0XHRcdFx0cHJldlJhd1ByZXZUaW1lID0gdGhpcy5fcmF3UHJldlRpbWUsXG5cdFx0XHRcdGlzQ29tcGxldGUsIGNhbGxiYWNrLCBwdCwgcmF3UHJldlRpbWU7XG5cdFx0XHRpZiAodGltZSA+PSBkdXJhdGlvbiAtIDAuMDAwMDAwMSkgeyAvL3RvIHdvcmsgYXJvdW5kIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgbWF0aCBhcnRpZmFjdHMuXG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHRoaXMuX3RpbWUgPSBkdXJhdGlvbjtcblx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuX2NhbGNFbmQgPyB0aGlzLl9lYXNlLmdldFJhdGlvKDEpIDogMTtcblx0XHRcdFx0aWYgKCF0aGlzLl9yZXZlcnNlZCApIHtcblx0XHRcdFx0XHRpc0NvbXBsZXRlID0gdHJ1ZTtcblx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25Db21wbGV0ZVwiO1xuXHRcdFx0XHRcdGZvcmNlID0gKGZvcmNlIHx8IHRoaXMuX3RpbWVsaW5lLmF1dG9SZW1vdmVDaGlsZHJlbik7IC8vb3RoZXJ3aXNlLCBpZiB0aGUgYW5pbWF0aW9uIGlzIHVucGF1c2VkL2FjdGl2YXRlZCBhZnRlciBpdCdzIGFscmVhZHkgZmluaXNoZWQsIGl0IGRvZXNuJ3QgZ2V0IHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50IHRpbWVsaW5lLlxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChkdXJhdGlvbiA9PT0gMCkgaWYgKHRoaXMuX2luaXR0ZWQgfHwgIXRoaXMudmFycy5sYXp5IHx8IGZvcmNlKSB7IC8vemVyby1kdXJhdGlvbiB0d2VlbnMgYXJlIHRyaWNreSBiZWNhdXNlIHdlIG11c3QgZGlzY2VybiB0aGUgbW9tZW50dW0vZGlyZWN0aW9uIG9mIHRpbWUgaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHN0YXJ0aW5nIHZhbHVlcyBzaG91bGQgYmUgcmVuZGVyZWQgb3IgdGhlIGVuZGluZyB2YWx1ZXMuIElmIHRoZSBcInBsYXloZWFkXCIgb2YgaXRzIHRpbWVsaW5lIGdvZXMgcGFzdCB0aGUgemVyby1kdXJhdGlvbiB0d2VlbiBpbiB0aGUgZm9yd2FyZCBkaXJlY3Rpb24gb3IgbGFuZHMgZGlyZWN0bHkgb24gaXQsIHRoZSBlbmQgdmFsdWVzIHNob3VsZCBiZSByZW5kZXJlZCwgYnV0IGlmIHRoZSB0aW1lbGluZSdzIFwicGxheWhlYWRcIiBtb3ZlcyBwYXN0IGl0IGluIHRoZSBiYWNrd2FyZCBkaXJlY3Rpb24gKGZyb20gYSBwb3N0aXRpdmUgdGltZSB0byBhIG5lZ2F0aXZlIHRpbWUpLCB0aGUgc3RhcnRpbmcgdmFsdWVzIG11c3QgYmUgcmVuZGVyZWQuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3N0YXJ0VGltZSA9PT0gdGhpcy5fdGltZWxpbmUuX2R1cmF0aW9uKSB7IC8vaWYgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuIGlzIGF0IHRoZSBWRVJZIGVuZCBvZiBhIHRpbWVsaW5lIGFuZCB0aGF0IHRpbWVsaW5lIHJlbmRlcnMgYXQgaXRzIGVuZCwgaXQgd2lsbCB0eXBpY2FsbHkgYWRkIGEgdGlueSBiaXQgb2YgY3VzaGlvbiB0byB0aGUgcmVuZGVyIHRpbWUgdG8gcHJldmVudCByb3VuZGluZyBlcnJvcnMgZnJvbSBnZXR0aW5nIGluIHRoZSB3YXkgb2YgdHdlZW5zIHJlbmRlcmluZyB0aGVpciBWRVJZIGVuZC4gSWYgd2UgdGhlbiByZXZlcnNlKCkgdGhhdCB0aW1lbGluZSwgdGhlIHplcm8tZHVyYXRpb24gdHdlZW4gd2lsbCB0cmlnZ2VyIGl0cyBvblJldmVyc2VDb21wbGV0ZSBldmVuIHRob3VnaCB0ZWNobmljYWxseSB0aGUgcGxheWhlYWQgZGlkbid0IHBhc3Mgb3ZlciBpdCBhZ2Fpbi4gSXQncyBhIHZlcnkgc3BlY2lmaWMgZWRnZSBjYXNlIHdlIG11c3QgYWNjb21tb2RhdGUuXG5cdFx0XHRcdFx0XHR0aW1lID0gMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHByZXZSYXdQcmV2VGltZSA8IDAgfHwgKHRpbWUgPD0gMCAmJiB0aW1lID49IC0wLjAwMDAwMDEpIHx8IChwcmV2UmF3UHJldlRpbWUgPT09IF90aW55TnVtICYmIHRoaXMuZGF0YSAhPT0gXCJpc1BhdXNlXCIpKSBpZiAocHJldlJhd1ByZXZUaW1lICE9PSB0aW1lKSB7IC8vbm90ZTogd2hlbiB0aGlzLmRhdGEgaXMgXCJpc1BhdXNlXCIsIGl0J3MgYSBjYWxsYmFjayBhZGRlZCBieSBhZGRQYXVzZSgpIG9uIGEgdGltZWxpbmUgdGhhdCB3ZSBzaG91bGQgbm90IGJlIHRyaWdnZXJlZCB3aGVuIExFQVZJTkcgaXRzIGV4YWN0IHN0YXJ0IHRpbWUuIEluIG90aGVyIHdvcmRzLCB0bC5hZGRQYXVzZSgxKS5wbGF5KDEpIHNob3VsZG4ndCBwYXVzZS5cblx0XHRcdFx0XHRcdGZvcmNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmIChwcmV2UmF3UHJldlRpbWUgPiBfdGlueU51bSkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwib25SZXZlcnNlQ29tcGxldGVcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fcmF3UHJldlRpbWUgPSByYXdQcmV2VGltZSA9ICghc3VwcHJlc3NFdmVudHMgfHwgdGltZSB8fCBwcmV2UmF3UHJldlRpbWUgPT09IHRpbWUpID8gdGltZSA6IF90aW55TnVtOyAvL3doZW4gdGhlIHBsYXloZWFkIGFycml2ZXMgYXQgRVhBQ1RMWSB0aW1lIDAgKHJpZ2h0IG9uIHRvcCkgb2YgYSB6ZXJvLWR1cmF0aW9uIHR3ZWVuLCB3ZSBuZWVkIHRvIGRpc2Nlcm4gaWYgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIHNvIHRoYXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgYWdhaW4gKG5leHQgdGltZSksIGl0J2xsIHRyaWdnZXIgdGhlIGNhbGxiYWNrLiBJZiBldmVudHMgYXJlIE5PVCBzdXBwcmVzc2VkLCBvYnZpb3VzbHkgdGhlIGNhbGxiYWNrIHdvdWxkIGJlIHRyaWdnZXJlZCBpbiB0aGlzIHJlbmRlci4gQmFzaWNhbGx5LCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUgZWl0aGVyIHdoZW4gdGhlIHBsYXloZWFkIEFSUklWRVMgb3IgTEVBVkVTIHRoaXMgZXhhY3Qgc3BvdCwgbm90IGJvdGguIEltYWdpbmUgZG9pbmcgYSB0aW1lbGluZS5zZWVrKDApIGFuZCB0aGVyZSdzIGEgY2FsbGJhY2sgdGhhdCBzaXRzIGF0IDAuIFNpbmNlIGV2ZW50cyBhcmUgc3VwcHJlc3NlZCBvbiB0aGF0IHNlZWsoKSBieSBkZWZhdWx0LCBub3RoaW5nIHdpbGwgZmlyZSwgYnV0IHdoZW4gdGhlIHBsYXloZWFkIG1vdmVzIG9mZiBvZiB0aGF0IHBvc2l0aW9uLCB0aGUgY2FsbGJhY2sgc2hvdWxkIGZpcmUuIFRoaXMgYmVoYXZpb3IgaXMgd2hhdCBwZW9wbGUgaW50dWl0aXZlbHkgZXhwZWN0LiBXZSBzZXQgdGhlIF9yYXdQcmV2VGltZSB0byBiZSBhIHByZWNpc2UgdGlueSBudW1iZXIgdG8gaW5kaWNhdGUgdGhpcyBzY2VuYXJpbyByYXRoZXIgdGhhbiB1c2luZyBhbm90aGVyIHByb3BlcnR5L3ZhcmlhYmxlIHdoaWNoIHdvdWxkIGluY3JlYXNlIG1lbW9yeSB1c2FnZS4gVGhpcyB0ZWNobmlxdWUgaXMgbGVzcyByZWFkYWJsZSwgYnV0IG1vcmUgZWZmaWNpZW50LlxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSBpZiAodGltZSA8IDAuMDAwMDAwMSkgeyAvL3RvIHdvcmsgYXJvdW5kIG9jY2FzaW9uYWwgZmxvYXRpbmcgcG9pbnQgbWF0aCBhcnRpZmFjdHMsIHJvdW5kIHN1cGVyIHNtYWxsIHZhbHVlcyB0byAwLlxuXHRcdFx0XHR0aGlzLl90b3RhbFRpbWUgPSB0aGlzLl90aW1lID0gMDtcblx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuX2NhbGNFbmQgPyB0aGlzLl9lYXNlLmdldFJhdGlvKDApIDogMDtcblx0XHRcdFx0aWYgKHByZXZUaW1lICE9PSAwIHx8IChkdXJhdGlvbiA9PT0gMCAmJiBwcmV2UmF3UHJldlRpbWUgPiAwKSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrID0gXCJvblJldmVyc2VDb21wbGV0ZVwiO1xuXHRcdFx0XHRcdGlzQ29tcGxldGUgPSB0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGltZSA8IDApIHtcblx0XHRcdFx0XHR0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFx0XHRpZiAoZHVyYXRpb24gPT09IDApIGlmICh0aGlzLl9pbml0dGVkIHx8ICF0aGlzLnZhcnMubGF6eSB8fCBmb3JjZSkgeyAvL3plcm8tZHVyYXRpb24gdHdlZW5zIGFyZSB0cmlja3kgYmVjYXVzZSB3ZSBtdXN0IGRpc2Nlcm4gdGhlIG1vbWVudHVtL2RpcmVjdGlvbiBvZiB0aW1lIGluIG9yZGVyIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBzdGFydGluZyB2YWx1ZXMgc2hvdWxkIGJlIHJlbmRlcmVkIG9yIHRoZSBlbmRpbmcgdmFsdWVzLiBJZiB0aGUgXCJwbGF5aGVhZFwiIG9mIGl0cyB0aW1lbGluZSBnb2VzIHBhc3QgdGhlIHplcm8tZHVyYXRpb24gdHdlZW4gaW4gdGhlIGZvcndhcmQgZGlyZWN0aW9uIG9yIGxhbmRzIGRpcmVjdGx5IG9uIGl0LCB0aGUgZW5kIHZhbHVlcyBzaG91bGQgYmUgcmVuZGVyZWQsIGJ1dCBpZiB0aGUgdGltZWxpbmUncyBcInBsYXloZWFkXCIgbW92ZXMgcGFzdCBpdCBpbiB0aGUgYmFja3dhcmQgZGlyZWN0aW9uIChmcm9tIGEgcG9zdGl0aXZlIHRpbWUgdG8gYSBuZWdhdGl2ZSB0aW1lKSwgdGhlIHN0YXJ0aW5nIHZhbHVlcyBtdXN0IGJlIHJlbmRlcmVkLlxuXHRcdFx0XHRcdFx0aWYgKHByZXZSYXdQcmV2VGltZSA+PSAwICYmICEocHJldlJhd1ByZXZUaW1lID09PSBfdGlueU51bSAmJiB0aGlzLmRhdGEgPT09IFwiaXNQYXVzZVwiKSkge1xuXHRcdFx0XHRcdFx0XHRmb3JjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IHJhd1ByZXZUaW1lID0gKCFzdXBwcmVzc0V2ZW50cyB8fCB0aW1lIHx8IHByZXZSYXdQcmV2VGltZSA9PT0gdGltZSkgPyB0aW1lIDogX3RpbnlOdW07IC8vd2hlbiB0aGUgcGxheWhlYWQgYXJyaXZlcyBhdCBFWEFDVExZIHRpbWUgMCAocmlnaHQgb24gdG9wKSBvZiBhIHplcm8tZHVyYXRpb24gdHdlZW4sIHdlIG5lZWQgdG8gZGlzY2VybiBpZiBldmVudHMgYXJlIHN1cHByZXNzZWQgc28gdGhhdCB3aGVuIHRoZSBwbGF5aGVhZCBtb3ZlcyBhZ2FpbiAobmV4dCB0aW1lKSwgaXQnbGwgdHJpZ2dlciB0aGUgY2FsbGJhY2suIElmIGV2ZW50cyBhcmUgTk9UIHN1cHByZXNzZWQsIG9idmlvdXNseSB0aGUgY2FsbGJhY2sgd291bGQgYmUgdHJpZ2dlcmVkIGluIHRoaXMgcmVuZGVyLiBCYXNpY2FsbHksIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZSBlaXRoZXIgd2hlbiB0aGUgcGxheWhlYWQgQVJSSVZFUyBvciBMRUFWRVMgdGhpcyBleGFjdCBzcG90LCBub3QgYm90aC4gSW1hZ2luZSBkb2luZyBhIHRpbWVsaW5lLnNlZWsoMCkgYW5kIHRoZXJlJ3MgYSBjYWxsYmFjayB0aGF0IHNpdHMgYXQgMC4gU2luY2UgZXZlbnRzIGFyZSBzdXBwcmVzc2VkIG9uIHRoYXQgc2VlaygpIGJ5IGRlZmF1bHQsIG5vdGhpbmcgd2lsbCBmaXJlLCBidXQgd2hlbiB0aGUgcGxheWhlYWQgbW92ZXMgb2ZmIG9mIHRoYXQgcG9zaXRpb24sIHRoZSBjYWxsYmFjayBzaG91bGQgZmlyZS4gVGhpcyBiZWhhdmlvciBpcyB3aGF0IHBlb3BsZSBpbnR1aXRpdmVseSBleHBlY3QuIFdlIHNldCB0aGUgX3Jhd1ByZXZUaW1lIHRvIGJlIGEgcHJlY2lzZSB0aW55IG51bWJlciB0byBpbmRpY2F0ZSB0aGlzIHNjZW5hcmlvIHJhdGhlciB0aGFuIHVzaW5nIGFub3RoZXIgcHJvcGVydHkvdmFyaWFibGUgd2hpY2ggd291bGQgaW5jcmVhc2UgbWVtb3J5IHVzYWdlLiBUaGlzIHRlY2huaXF1ZSBpcyBsZXNzIHJlYWRhYmxlLCBidXQgbW9yZSBlZmZpY2llbnQuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghdGhpcy5faW5pdHRlZCkgeyAvL2lmIHdlIHJlbmRlciB0aGUgdmVyeSBiZWdpbm5pbmcgKHRpbWUgPT0gMCkgb2YgYSBmcm9tVG8oKSwgd2UgbXVzdCBmb3JjZSB0aGUgcmVuZGVyIChub3JtYWwgdHdlZW5zIHdvdWxkbid0IG5lZWQgdG8gcmVuZGVyIGF0IGEgdGltZSBvZiAwIHdoZW4gdGhlIHByZXZUaW1lIHdhcyBhbHNvIDApLiBUaGlzIGlzIGFsc28gbWFuZGF0b3J5IHRvIG1ha2Ugc3VyZSBvdmVyd3JpdGluZyBraWNrcyBpbiBpbW1lZGlhdGVseS5cblx0XHRcdFx0XHRmb3JjZSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3RvdGFsVGltZSA9IHRoaXMuX3RpbWUgPSB0aW1lO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9lYXNlVHlwZSkge1xuXHRcdFx0XHRcdHZhciByID0gdGltZSAvIGR1cmF0aW9uLCB0eXBlID0gdGhpcy5fZWFzZVR5cGUsIHBvdyA9IHRoaXMuX2Vhc2VQb3dlcjtcblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gMSB8fCAodHlwZSA9PT0gMyAmJiByID49IDAuNSkpIHtcblx0XHRcdFx0XHRcdHIgPSAxIC0gcjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHR5cGUgPT09IDMpIHtcblx0XHRcdFx0XHRcdHIgKj0gMjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHBvdyA9PT0gMSkge1xuXHRcdFx0XHRcdFx0ciAqPSByO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocG93ID09PSAyKSB7XG5cdFx0XHRcdFx0XHRyICo9IHIgKiByO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAocG93ID09PSAzKSB7XG5cdFx0XHRcdFx0XHRyICo9IHIgKiByICogcjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvdyA9PT0gNCkge1xuXHRcdFx0XHRcdFx0ciAqPSByICogciAqIHIgKiByO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlID09PSAxKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJhdGlvID0gMSAtIHI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0eXBlID09PSAyKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJhdGlvID0gcjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRpbWUgLyBkdXJhdGlvbiA8IDAuNSkge1xuXHRcdFx0XHRcdFx0dGhpcy5yYXRpbyA9IHIgLyAyO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJhdGlvID0gMSAtIChyIC8gMik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuZ2V0UmF0aW8odGltZSAvIGR1cmF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdGltZSA9PT0gcHJldlRpbWUgJiYgIWZvcmNlKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuX2luaXR0ZWQpIHtcblx0XHRcdFx0dGhpcy5faW5pdCgpO1xuXHRcdFx0XHRpZiAoIXRoaXMuX2luaXR0ZWQgfHwgdGhpcy5fZ2MpIHsgLy9pbW1lZGlhdGVSZW5kZXIgdHdlZW5zIHR5cGljYWxseSB3b24ndCBpbml0aWFsaXplIHVudGlsIHRoZSBwbGF5aGVhZCBhZHZhbmNlcyAoX3RpbWUgaXMgZ3JlYXRlciB0aGFuIDApIGluIG9yZGVyIHRvIGVuc3VyZSB0aGF0IG92ZXJ3cml0aW5nIG9jY3VycyBwcm9wZXJseS4gQWxzbywgaWYgYWxsIG9mIHRoZSB0d2VlbmluZyBwcm9wZXJ0aWVzIGhhdmUgYmVlbiBvdmVyd3JpdHRlbiAod2hpY2ggd291bGQgY2F1c2UgX2djIHRvIGJlIHRydWUsIGFzIHNldCBpbiBfaW5pdCgpKSwgd2Ugc2hvdWxkbid0IGNvbnRpbnVlIG90aGVyd2lzZSBhbiBvblN0YXJ0IGNhbGxiYWNrIGNvdWxkIGJlIGNhbGxlZCBmb3IgZXhhbXBsZS5cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gZWxzZSBpZiAoIWZvcmNlICYmIHRoaXMuX2ZpcnN0UFQgJiYgKCh0aGlzLnZhcnMubGF6eSAhPT0gZmFsc2UgJiYgdGhpcy5fZHVyYXRpb24pIHx8ICh0aGlzLnZhcnMubGF6eSAmJiAhdGhpcy5fZHVyYXRpb24pKSkge1xuXHRcdFx0XHRcdHRoaXMuX3RpbWUgPSB0aGlzLl90b3RhbFRpbWUgPSBwcmV2VGltZTtcblx0XHRcdFx0XHR0aGlzLl9yYXdQcmV2VGltZSA9IHByZXZSYXdQcmV2VGltZTtcblx0XHRcdFx0XHRfbGF6eVR3ZWVucy5wdXNoKHRoaXMpO1xuXHRcdFx0XHRcdHRoaXMuX2xhenkgPSBbdGltZSwgc3VwcHJlc3NFdmVudHNdO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL19lYXNlIGlzIGluaXRpYWxseSBzZXQgdG8gZGVmYXVsdEVhc2UsIHNvIG5vdyB0aGF0IGluaXQoKSBoYXMgcnVuLCBfZWFzZSBpcyBzZXQgcHJvcGVybHkgYW5kIHdlIG5lZWQgdG8gcmVjYWxjdWxhdGUgdGhlIHJhdGlvLiBPdmVyYWxsIHRoaXMgaXMgZmFzdGVyIHRoYW4gdXNpbmcgY29uZGl0aW9uYWwgbG9naWMgZWFybGllciBpbiB0aGUgbWV0aG9kIHRvIGF2b2lkIGhhdmluZyB0byBzZXQgcmF0aW8gdHdpY2UgYmVjYXVzZSB3ZSBvbmx5IGluaXQoKSBvbmNlIGJ1dCByZW5kZXJUaW1lKCkgZ2V0cyBjYWxsZWQgVkVSWSBmcmVxdWVudGx5LlxuXHRcdFx0XHRpZiAodGhpcy5fdGltZSAmJiAhaXNDb21wbGV0ZSkge1xuXHRcdFx0XHRcdHRoaXMucmF0aW8gPSB0aGlzLl9lYXNlLmdldFJhdGlvKHRoaXMuX3RpbWUgLyBkdXJhdGlvbik7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXNDb21wbGV0ZSAmJiB0aGlzLl9lYXNlLl9jYWxjRW5kKSB7XG5cdFx0XHRcdFx0dGhpcy5yYXRpbyA9IHRoaXMuX2Vhc2UuZ2V0UmF0aW8oKHRoaXMuX3RpbWUgPT09IDApID8gMCA6IDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fbGF6eSAhPT0gZmFsc2UpIHsgLy9pbiBjYXNlIGEgbGF6eSByZW5kZXIgaXMgcGVuZGluZywgd2Ugc2hvdWxkIGZsdXNoIGl0IGJlY2F1c2UgdGhlIG5ldyByZW5kZXIgaXMgb2NjdXJyaW5nIG5vdyAoaW1hZ2luZSBhIGxhenkgdHdlZW4gaW5zdGFudGlhdGluZyBhbmQgdGhlbiBpbW1lZGlhdGVseSB0aGUgdXNlciBjYWxscyB0d2Vlbi5zZWVrKHR3ZWVuLmR1cmF0aW9uKCkpLCBza2lwcGluZyB0byB0aGUgZW5kIC0gdGhlIGVuZCByZW5kZXIgd291bGQgYmUgZm9yY2VkLCBhbmQgdGhlbiBpZiB3ZSBkaWRuJ3QgZmx1c2ggdGhlIGxhenkgcmVuZGVyLCBpdCdkIGZpcmUgQUZURVIgdGhlIHNlZWsoKSwgcmVuZGVyaW5nIGl0IGF0IHRoZSB3cm9uZyB0aW1lLlxuXHRcdFx0XHR0aGlzLl9sYXp5ID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXRoaXMuX2FjdGl2ZSkgaWYgKCF0aGlzLl9wYXVzZWQgJiYgdGhpcy5fdGltZSAhPT0gcHJldlRpbWUgJiYgdGltZSA+PSAwKSB7XG5cdFx0XHRcdHRoaXMuX2FjdGl2ZSA9IHRydWU7ICAvL3NvIHRoYXQgaWYgdGhlIHVzZXIgcmVuZGVycyBhIHR3ZWVuIChhcyBvcHBvc2VkIHRvIHRoZSB0aW1lbGluZSByZW5kZXJpbmcgaXQpLCB0aGUgdGltZWxpbmUgaXMgZm9yY2VkIHRvIHJlLXJlbmRlciBhbmQgYWxpZ24gaXQgd2l0aCB0aGUgcHJvcGVyIHRpbWUvZnJhbWUgb24gdGhlIG5leHQgcmVuZGVyaW5nIGN5Y2xlLiBNYXliZSB0aGUgdHdlZW4gYWxyZWFkeSBmaW5pc2hlZCBidXQgdGhlIHVzZXIgbWFudWFsbHkgcmUtcmVuZGVycyBpdCBhcyBoYWxmd2F5IGRvbmUuXG5cdFx0XHR9XG5cdFx0XHRpZiAocHJldlRpbWUgPT09IDApIHtcblx0XHRcdFx0aWYgKHRoaXMuX3N0YXJ0QXQpIHtcblx0XHRcdFx0XHRpZiAodGltZSA+PSAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LnJlbmRlcih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIWNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjayA9IFwiX2R1bW15R1NcIjsgLy9pZiBubyBjYWxsYmFjayBpcyBkZWZpbmVkLCB1c2UgYSBkdW1teSB2YWx1ZSBqdXN0IHNvIHRoYXQgdGhlIGNvbmRpdGlvbiBhdCB0aGUgZW5kIGV2YWx1YXRlcyBhcyB0cnVlIGJlY2F1c2UgX3N0YXJ0QXQgc2hvdWxkIHJlbmRlciBBRlRFUiB0aGUgbm9ybWFsIHJlbmRlciBsb29wIHdoZW4gdGhlIHRpbWUgaXMgbmVnYXRpdmUuIFdlIGNvdWxkIGhhbmRsZSB0aGlzIGluIGEgbW9yZSBpbnR1aXRpdmUgd2F5LCBvZiBjb3Vyc2UsIGJ1dCB0aGUgcmVuZGVyIGxvb3AgaXMgdGhlIE1PU1QgaW1wb3J0YW50IHRoaW5nIHRvIG9wdGltaXplLCBzbyB0aGlzIHRlY2huaXF1ZSBhbGxvd3MgdXMgdG8gYXZvaWQgYWRkaW5nIGV4dHJhIGNvbmRpdGlvbmFsIGxvZ2ljIGluIGEgaGlnaC1mcmVxdWVuY3kgYXJlYS5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMudmFycy5vblN0YXJ0KSBpZiAodGhpcy5fdGltZSAhPT0gMCB8fCBkdXJhdGlvbiA9PT0gMCkgaWYgKCFzdXBwcmVzc0V2ZW50cykge1xuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrKFwib25TdGFydFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cHQgPSB0aGlzLl9maXJzdFBUO1xuXHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdGlmIChwdC5mKSB7XG5cdFx0XHRcdFx0cHQudFtwdC5wXShwdC5jICogdGhpcy5yYXRpbyArIHB0LnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHB0LnRbcHQucF0gPSBwdC5jICogdGhpcy5yYXRpbyArIHB0LnM7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHQgPSBwdC5fbmV4dDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX29uVXBkYXRlKSB7XG5cdFx0XHRcdGlmICh0aW1lIDwgMCkgaWYgKHRoaXMuX3N0YXJ0QXQgJiYgdGltZSAhPT0gLTAuMDAwMSkgeyAvL2lmIHRoZSB0d2VlbiBpcyBwb3NpdGlvbmVkIGF0IHRoZSBWRVJZIGJlZ2lubmluZyAoX3N0YXJ0VGltZSAwKSBvZiBpdHMgcGFyZW50IHRpbWVsaW5lLCBpdCdzIGlsbGVnYWwgZm9yIHRoZSBwbGF5aGVhZCB0byBnbyBiYWNrIGZ1cnRoZXIsIHNvIHdlIHNob3VsZCBub3QgcmVuZGVyIHRoZSByZWNvcmRlZCBzdGFydEF0IHZhbHVlcy5cblx0XHRcdFx0XHR0aGlzLl9zdGFydEF0LnJlbmRlcih0aW1lLCBzdXBwcmVzc0V2ZW50cywgZm9yY2UpOyAvL25vdGU6IGZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3ZSB0dWNrIHRoaXMgY29uZGl0aW9uYWwgbG9naWMgaW5zaWRlIGxlc3MgdHJhdmVsZWQgYXJlYXMgKG1vc3QgdHdlZW5zIGRvbid0IGhhdmUgYW4gb25VcGRhdGUpLiBXZSdkIGp1c3QgaGF2ZSBpdCBhdCB0aGUgZW5kIGJlZm9yZSB0aGUgb25Db21wbGV0ZSwgYnV0IHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHVwZGF0ZWQgYmVmb3JlIGFueSBvblVwZGF0ZSBpcyBjYWxsZWQsIHNvIHdlIEFMU08gcHV0IGl0IGhlcmUgYW5kIHRoZW4gaWYgaXQncyBub3QgY2FsbGVkLCB3ZSBkbyBzbyBsYXRlciBuZWFyIHRoZSBvbkNvbXBsZXRlLlxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghc3VwcHJlc3NFdmVudHMpIGlmICh0aGlzLl90aW1lICE9PSBwcmV2VGltZSB8fCBpc0NvbXBsZXRlKSB7XG5cdFx0XHRcdFx0dGhpcy5fY2FsbGJhY2soXCJvblVwZGF0ZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGNhbGxiYWNrKSBpZiAoIXRoaXMuX2djIHx8IGZvcmNlKSB7IC8vY2hlY2sgX2djIGJlY2F1c2UgdGhlcmUncyBhIGNoYW5jZSB0aGF0IGtpbGwoKSBjb3VsZCBiZSBjYWxsZWQgaW4gYW4gb25VcGRhdGVcblx0XHRcdFx0aWYgKHRpbWUgPCAwICYmIHRoaXMuX3N0YXJ0QXQgJiYgIXRoaXMuX29uVXBkYXRlICYmIHRpbWUgIT09IC0wLjAwMDEpIHsgLy8tMC4wMDAxIGlzIGEgc3BlY2lhbCB2YWx1ZSB0aGF0IHdlIHVzZSB3aGVuIGxvb3BpbmcgYmFjayB0byB0aGUgYmVnaW5uaW5nIG9mIGEgcmVwZWF0ZWQgVGltZWxpbmVNYXgsIGluIHdoaWNoIGNhc2Ugd2Ugc2hvdWxkbid0IHJlbmRlciB0aGUgX3N0YXJ0QXQgdmFsdWVzLlxuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0QXQucmVuZGVyKHRpbWUsIHN1cHByZXNzRXZlbnRzLCBmb3JjZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGlzQ29tcGxldGUpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fdGltZWxpbmUuYXV0b1JlbW92ZUNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9lbmFibGVkKGZhbHNlLCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghc3VwcHJlc3NFdmVudHMgJiYgdGhpcy52YXJzW2NhbGxiYWNrXSkge1xuXHRcdFx0XHRcdHRoaXMuX2NhbGxiYWNrKGNhbGxiYWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZHVyYXRpb24gPT09IDAgJiYgdGhpcy5fcmF3UHJldlRpbWUgPT09IF90aW55TnVtICYmIHJhd1ByZXZUaW1lICE9PSBfdGlueU51bSkgeyAvL3RoZSBvbkNvbXBsZXRlIG9yIG9uUmV2ZXJzZUNvbXBsZXRlIGNvdWxkIHRyaWdnZXIgbW92ZW1lbnQgb2YgdGhlIHBsYXloZWFkIGFuZCBmb3IgemVyby1kdXJhdGlvbiB0d2VlbnMgKHdoaWNoIG11c3QgZGlzY2VybiBkaXJlY3Rpb24pIHRoYXQgbGFuZCBkaXJlY3RseSBiYWNrIG9uIHRoZWlyIHN0YXJ0IHRpbWUsIHdlIGRvbid0IHdhbnQgdG8gZmlyZSBhZ2FpbiBvbiB0aGUgbmV4dCByZW5kZXIuIFRoaW5rIG9mIHNldmVyYWwgYWRkUGF1c2UoKSdzIGluIGEgdGltZWxpbmUgdGhhdCBmb3JjZXMgdGhlIHBsYXloZWFkIHRvIGEgY2VydGFpbiBzcG90LCBidXQgd2hhdCBpZiBpdCdzIGFscmVhZHkgcGF1c2VkIGFuZCBhbm90aGVyIHR3ZWVuIGlzIHR3ZWVuaW5nIHRoZSBcInRpbWVcIiBvZiB0aGUgdGltZWxpbmU/IEVhY2ggdGltZSBpdCBtb3ZlcyBbZm9yd2FyZF0gcGFzdCB0aGF0IHNwb3QsIGl0IHdvdWxkIG1vdmUgYmFjaywgYW5kIHNpbmNlIHN1cHByZXNzRXZlbnRzIGlzIHRydWUsIGl0J2QgcmVzZXQgX3Jhd1ByZXZUaW1lIHRvIF90aW55TnVtIHNvIHRoYXQgd2hlbiBpdCBiZWdpbnMgYWdhaW4sIHRoZSBjYWxsYmFjayB3b3VsZCBmaXJlIChzbyB1bHRpbWF0ZWx5IGl0IGNvdWxkIGJvdW5jZSBiYWNrIGFuZCBmb3J0aCBkdXJpbmcgdGhhdCB0d2VlbikuIEFnYWluLCB0aGlzIGlzIGEgdmVyeSB1bmNvbW1vbiBzY2VuYXJpbywgYnV0IHBvc3NpYmxlIG5vbmV0aGVsZXNzLlxuXHRcdFx0XHRcdHRoaXMuX3Jhd1ByZXZUaW1lID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRwLl9raWxsID0gZnVuY3Rpb24odmFycywgdGFyZ2V0LCBvdmVyd3JpdGluZ1R3ZWVuKSB7XG5cdFx0XHRpZiAodmFycyA9PT0gXCJhbGxcIikge1xuXHRcdFx0XHR2YXJzID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdGlmICh2YXJzID09IG51bGwpIGlmICh0YXJnZXQgPT0gbnVsbCB8fCB0YXJnZXQgPT09IHRoaXMudGFyZ2V0KSB7XG5cdFx0XHRcdHRoaXMuX2xhenkgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2VuYWJsZWQoZmFsc2UsIGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdHRhcmdldCA9ICh0eXBlb2YodGFyZ2V0KSAhPT0gXCJzdHJpbmdcIikgPyAodGFyZ2V0IHx8IHRoaXMuX3RhcmdldHMgfHwgdGhpcy50YXJnZXQpIDogVHdlZW5MaXRlLnNlbGVjdG9yKHRhcmdldCkgfHwgdGFyZ2V0O1xuXHRcdFx0dmFyIHNpbXVsdGFuZW91c092ZXJ3cml0ZSA9IChvdmVyd3JpdGluZ1R3ZWVuICYmIHRoaXMuX3RpbWUgJiYgb3ZlcndyaXRpbmdUd2Vlbi5fc3RhcnRUaW1lID09PSB0aGlzLl9zdGFydFRpbWUgJiYgdGhpcy5fdGltZWxpbmUgPT09IG92ZXJ3cml0aW5nVHdlZW4uX3RpbWVsaW5lKSxcblx0XHRcdFx0aSwgb3ZlcndyaXR0ZW5Qcm9wcywgcCwgcHQsIHByb3BMb29rdXAsIGNoYW5nZWQsIGtpbGxQcm9wcywgcmVjb3JkLCBraWxsZWQ7XG5cdFx0XHRpZiAoKF9pc0FycmF5KHRhcmdldCkgfHwgX2lzU2VsZWN0b3IodGFyZ2V0KSkgJiYgdHlwZW9mKHRhcmdldFswXSkgIT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0aSA9IHRhcmdldC5sZW5ndGg7XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9raWxsKHZhcnMsIHRhcmdldFtpXSwgb3ZlcndyaXRpbmdUd2VlbikpIHtcblx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKHRoaXMuX3RhcmdldHMpIHtcblx0XHRcdFx0XHRpID0gdGhpcy5fdGFyZ2V0cy5sZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0ID09PSB0aGlzLl90YXJnZXRzW2ldKSB7XG5cdFx0XHRcdFx0XHRcdHByb3BMb29rdXAgPSB0aGlzLl9wcm9wTG9va3VwW2ldIHx8IHt9O1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9vdmVyd3JpdHRlblByb3BzID0gdGhpcy5fb3ZlcndyaXR0ZW5Qcm9wcyB8fCBbXTtcblx0XHRcdFx0XHRcdFx0b3ZlcndyaXR0ZW5Qcm9wcyA9IHRoaXMuX292ZXJ3cml0dGVuUHJvcHNbaV0gPSB2YXJzID8gdGhpcy5fb3ZlcndyaXR0ZW5Qcm9wc1tpXSB8fCB7fSA6IFwiYWxsXCI7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICh0YXJnZXQgIT09IHRoaXMudGFyZ2V0KSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHByb3BMb29rdXAgPSB0aGlzLl9wcm9wTG9va3VwO1xuXHRcdFx0XHRcdG92ZXJ3cml0dGVuUHJvcHMgPSB0aGlzLl9vdmVyd3JpdHRlblByb3BzID0gdmFycyA/IHRoaXMuX292ZXJ3cml0dGVuUHJvcHMgfHwge30gOiBcImFsbFwiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHByb3BMb29rdXApIHtcblx0XHRcdFx0XHRraWxsUHJvcHMgPSB2YXJzIHx8IHByb3BMb29rdXA7XG5cdFx0XHRcdFx0cmVjb3JkID0gKHZhcnMgIT09IG92ZXJ3cml0dGVuUHJvcHMgJiYgb3ZlcndyaXR0ZW5Qcm9wcyAhPT0gXCJhbGxcIiAmJiB2YXJzICE9PSBwcm9wTG9va3VwICYmICh0eXBlb2YodmFycykgIT09IFwib2JqZWN0XCIgfHwgIXZhcnMuX3RlbXBLaWxsKSk7IC8vX3RlbXBLaWxsIGlzIGEgc3VwZXItc2VjcmV0IHdheSB0byBkZWxldGUgYSBwYXJ0aWN1bGFyIHR3ZWVuaW5nIHByb3BlcnR5IGJ1dCBOT1QgaGF2ZSBpdCByZW1lbWJlcmVkIGFzIGFuIG9mZmljaWFsIG92ZXJ3cml0dGVuIHByb3BlcnR5IChsaWtlIGluIEJlemllclBsdWdpbilcblx0XHRcdFx0XHRpZiAob3ZlcndyaXRpbmdUd2VlbiAmJiAoVHdlZW5MaXRlLm9uT3ZlcndyaXRlIHx8IHRoaXMudmFycy5vbk92ZXJ3cml0ZSkpIHtcblx0XHRcdFx0XHRcdGZvciAocCBpbiBraWxsUHJvcHMpIHtcblx0XHRcdFx0XHRcdFx0aWYgKHByb3BMb29rdXBbcF0pIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIWtpbGxlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0a2lsbGVkID0gW107XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGtpbGxlZC5wdXNoKHApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoKGtpbGxlZCB8fCAhdmFycykgJiYgIV9vbk92ZXJ3cml0ZSh0aGlzLCBvdmVyd3JpdGluZ1R3ZWVuLCB0YXJnZXQsIGtpbGxlZCkpIHsgLy9pZiB0aGUgb25PdmVyd3JpdGUgcmV0dXJuZWQgZmFsc2UsIHRoYXQgbWVhbnMgdGhlIHVzZXIgd2FudHMgdG8gb3ZlcnJpZGUgdGhlIG92ZXJ3cml0aW5nIChjYW5jZWwgaXQpLlxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Zm9yIChwIGluIGtpbGxQcm9wcykge1xuXHRcdFx0XHRcdFx0aWYgKChwdCA9IHByb3BMb29rdXBbcF0pKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChzaW11bHRhbmVvdXNPdmVyd3JpdGUpIHsgLy9pZiBhbm90aGVyIHR3ZWVuIG92ZXJ3cml0ZXMgdGhpcyBvbmUgYW5kIHRoZXkgYm90aCBzdGFydCBhdCBleGFjdGx5IHRoZSBzYW1lIHRpbWUsIHlldCB0aGlzIHR3ZWVuIGhhcyBhbHJlYWR5IHJlbmRlcmVkIG9uY2UgKGZvciBleGFtcGxlLCBhdCAwLjAwMSkgYmVjYXVzZSBpdCdzIGZpcnN0IGluIHRoZSBxdWV1ZSwgd2Ugc2hvdWxkIHJldmVydCB0aGUgdmFsdWVzIHRvIHdoZXJlIHRoZXkgd2VyZSBhdCAwIHNvIHRoYXQgdGhlIHN0YXJ0aW5nIHZhbHVlcyBhcmVuJ3QgY29udGFtaW5hdGVkIG9uIHRoZSBvdmVyd3JpdGluZyB0d2Vlbi5cblx0XHRcdFx0XHRcdFx0XHRpZiAocHQuZikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHQudFtwdC5wXShwdC5zKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHQudFtwdC5wXSA9IHB0LnM7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChwdC5wZyAmJiBwdC50Ll9raWxsKGtpbGxQcm9wcykpIHtcblx0XHRcdFx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTsgLy9zb21lIHBsdWdpbnMgbmVlZCB0byBiZSBub3RpZmllZCBzbyB0aGV5IGNhbiBwZXJmb3JtIGNsZWFudXAgdGFza3MgZmlyc3Rcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIXB0LnBnIHx8IHB0LnQuX292ZXJ3cml0ZVByb3BzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChwdC5fcHJldikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHQuX3ByZXYuX25leHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHB0ID09PSB0aGlzLl9maXJzdFBUKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmIChwdC5fbmV4dCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cHQuX25leHQuX3ByZXYgPSBwdC5fcHJldjtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cHQuX25leHQgPSBwdC5fcHJldiA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHByb3BMb29rdXBbcF07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAocmVjb3JkKSB7XG5cdFx0XHRcdFx0XHRcdG92ZXJ3cml0dGVuUHJvcHNbcF0gPSAxO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIXRoaXMuX2ZpcnN0UFQgJiYgdGhpcy5faW5pdHRlZCkgeyAvL2lmIGFsbCB0d2VlbmluZyBwcm9wZXJ0aWVzIGFyZSBraWxsZWQsIGtpbGwgdGhlIHR3ZWVuLiBXaXRob3V0IHRoaXMgbGluZSwgaWYgdGhlcmUncyBhIHR3ZWVuIHdpdGggbXVsdGlwbGUgdGFyZ2V0cyBhbmQgdGhlbiB5b3Uga2lsbFR3ZWVuc09mKCkgZWFjaCB0YXJnZXQgaW5kaXZpZHVhbGx5LCB0aGUgdHdlZW4gd291bGQgdGVjaG5pY2FsbHkgc3RpbGwgcmVtYWluIGFjdGl2ZSBhbmQgZmlyZSBpdHMgb25Db21wbGV0ZSBldmVuIHRob3VnaCB0aGVyZSBhcmVuJ3QgYW55IG1vcmUgcHJvcGVydGllcyB0d2VlbmluZy5cblx0XHRcdFx0XHRcdHRoaXMuX2VuYWJsZWQoZmFsc2UsIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGFuZ2VkO1xuXHRcdH07XG5cblx0XHRwLmludmFsaWRhdGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICh0aGlzLl9ub3RpZnlQbHVnaW5zT2ZFbmFibGVkKSB7XG5cdFx0XHRcdFR3ZWVuTGl0ZS5fb25QbHVnaW5FdmVudChcIl9vbkRpc2FibGVcIiwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9maXJzdFBUID0gdGhpcy5fb3ZlcndyaXR0ZW5Qcm9wcyA9IHRoaXMuX3N0YXJ0QXQgPSB0aGlzLl9vblVwZGF0ZSA9IG51bGw7XG5cdFx0XHR0aGlzLl9ub3RpZnlQbHVnaW5zT2ZFbmFibGVkID0gdGhpcy5fYWN0aXZlID0gdGhpcy5fbGF6eSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fcHJvcExvb2t1cCA9ICh0aGlzLl90YXJnZXRzKSA/IHt9IDogW107XG5cdFx0XHRBbmltYXRpb24ucHJvdG90eXBlLmludmFsaWRhdGUuY2FsbCh0aGlzKTtcblx0XHRcdGlmICh0aGlzLnZhcnMuaW1tZWRpYXRlUmVuZGVyKSB7XG5cdFx0XHRcdHRoaXMuX3RpbWUgPSAtX3RpbnlOdW07IC8vZm9yY2VzIGEgcmVuZGVyIHdpdGhvdXQgaGF2aW5nIHRvIHNldCB0aGUgcmVuZGVyKCkgXCJmb3JjZVwiIHBhcmFtZXRlciB0byB0cnVlIGJlY2F1c2Ugd2Ugd2FudCB0byBhbGxvdyBsYXp5aW5nIGJ5IGRlZmF1bHQgKHVzaW5nIHRoZSBcImZvcmNlXCIgcGFyYW1ldGVyIGFsd2F5cyBmb3JjZXMgYW4gaW1tZWRpYXRlIGZ1bGwgcmVuZGVyKVxuXHRcdFx0XHR0aGlzLnJlbmRlcigtdGhpcy5fZGVsYXkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblxuXHRcdHAuX2VuYWJsZWQgPSBmdW5jdGlvbihlbmFibGVkLCBpZ25vcmVUaW1lbGluZSkge1xuXHRcdFx0aWYgKCFfdGlja2VyQWN0aXZlKSB7XG5cdFx0XHRcdF90aWNrZXIud2FrZSgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVuYWJsZWQgJiYgdGhpcy5fZ2MpIHtcblx0XHRcdFx0dmFyIHRhcmdldHMgPSB0aGlzLl90YXJnZXRzLFxuXHRcdFx0XHRcdGk7XG5cdFx0XHRcdGlmICh0YXJnZXRzKSB7XG5cdFx0XHRcdFx0aSA9IHRhcmdldHMubGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fc2libGluZ3NbaV0gPSBfcmVnaXN0ZXIodGFyZ2V0c1tpXSwgdGhpcywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3NpYmxpbmdzID0gX3JlZ2lzdGVyKHRoaXMudGFyZ2V0LCB0aGlzLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0QW5pbWF0aW9uLnByb3RvdHlwZS5fZW5hYmxlZC5jYWxsKHRoaXMsIGVuYWJsZWQsIGlnbm9yZVRpbWVsaW5lKTtcblx0XHRcdGlmICh0aGlzLl9ub3RpZnlQbHVnaW5zT2ZFbmFibGVkKSBpZiAodGhpcy5fZmlyc3RQVCkge1xuXHRcdFx0XHRyZXR1cm4gVHdlZW5MaXRlLl9vblBsdWdpbkV2ZW50KChlbmFibGVkID8gXCJfb25FbmFibGVcIiA6IFwiX29uRGlzYWJsZVwiKSwgdGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXG4vLy0tLS1Ud2VlbkxpdGUgc3RhdGljIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFR3ZWVuTGl0ZS50byA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpIHtcblx0XHRcdHJldHVybiBuZXcgVHdlZW5MaXRlKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpO1xuXHRcdH07XG5cblx0XHRUd2VlbkxpdGUuZnJvbSA9IGZ1bmN0aW9uKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpIHtcblx0XHRcdHZhcnMucnVuQmFja3dhcmRzID0gdHJ1ZTtcblx0XHRcdHZhcnMuaW1tZWRpYXRlUmVuZGVyID0gKHZhcnMuaW1tZWRpYXRlUmVuZGVyICE9IGZhbHNlKTtcblx0XHRcdHJldHVybiBuZXcgVHdlZW5MaXRlKHRhcmdldCwgZHVyYXRpb24sIHZhcnMpO1xuXHRcdH07XG5cblx0XHRUd2VlbkxpdGUuZnJvbVRvID0gZnVuY3Rpb24odGFyZ2V0LCBkdXJhdGlvbiwgZnJvbVZhcnMsIHRvVmFycykge1xuXHRcdFx0dG9WYXJzLnN0YXJ0QXQgPSBmcm9tVmFycztcblx0XHRcdHRvVmFycy5pbW1lZGlhdGVSZW5kZXIgPSAodG9WYXJzLmltbWVkaWF0ZVJlbmRlciAhPSBmYWxzZSAmJiBmcm9tVmFycy5pbW1lZGlhdGVSZW5kZXIgIT0gZmFsc2UpO1xuXHRcdFx0cmV0dXJuIG5ldyBUd2VlbkxpdGUodGFyZ2V0LCBkdXJhdGlvbiwgdG9WYXJzKTtcblx0XHR9O1xuXG5cdFx0VHdlZW5MaXRlLmRlbGF5ZWRDYWxsID0gZnVuY3Rpb24oZGVsYXksIGNhbGxiYWNrLCBwYXJhbXMsIHNjb3BlLCB1c2VGcmFtZXMpIHtcblx0XHRcdHJldHVybiBuZXcgVHdlZW5MaXRlKGNhbGxiYWNrLCAwLCB7ZGVsYXk6ZGVsYXksIG9uQ29tcGxldGU6Y2FsbGJhY2ssIG9uQ29tcGxldGVQYXJhbXM6cGFyYW1zLCBjYWxsYmFja1Njb3BlOnNjb3BlLCBvblJldmVyc2VDb21wbGV0ZTpjYWxsYmFjaywgb25SZXZlcnNlQ29tcGxldGVQYXJhbXM6cGFyYW1zLCBpbW1lZGlhdGVSZW5kZXI6ZmFsc2UsIGxhenk6ZmFsc2UsIHVzZUZyYW1lczp1c2VGcmFtZXMsIG92ZXJ3cml0ZTowfSk7XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5zZXQgPSBmdW5jdGlvbih0YXJnZXQsIHZhcnMpIHtcblx0XHRcdHJldHVybiBuZXcgVHdlZW5MaXRlKHRhcmdldCwgMCwgdmFycyk7XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5nZXRUd2VlbnNPZiA9IGZ1bmN0aW9uKHRhcmdldCwgb25seUFjdGl2ZSkge1xuXHRcdFx0aWYgKHRhcmdldCA9PSBudWxsKSB7IHJldHVybiBbXTsgfVxuXHRcdFx0dGFyZ2V0ID0gKHR5cGVvZih0YXJnZXQpICE9PSBcInN0cmluZ1wiKSA/IHRhcmdldCA6IFR3ZWVuTGl0ZS5zZWxlY3Rvcih0YXJnZXQpIHx8IHRhcmdldDtcblx0XHRcdHZhciBpLCBhLCBqLCB0O1xuXHRcdFx0aWYgKChfaXNBcnJheSh0YXJnZXQpIHx8IF9pc1NlbGVjdG9yKHRhcmdldCkpICYmIHR5cGVvZih0YXJnZXRbMF0pICE9PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdGkgPSB0YXJnZXQubGVuZ3RoO1xuXHRcdFx0XHRhID0gW107XG5cdFx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRcdGEgPSBhLmNvbmNhdChUd2VlbkxpdGUuZ2V0VHdlZW5zT2YodGFyZ2V0W2ldLCBvbmx5QWN0aXZlKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aSA9IGEubGVuZ3RoO1xuXHRcdFx0XHQvL25vdyBnZXQgcmlkIG9mIGFueSBkdXBsaWNhdGVzICh0d2VlbnMgb2YgYXJyYXlzIG9mIG9iamVjdHMgY291bGQgY2F1c2UgZHVwbGljYXRlcylcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0dCA9IGFbaV07XG5cdFx0XHRcdFx0aiA9IGk7XG5cdFx0XHRcdFx0d2hpbGUgKC0taiA+IC0xKSB7XG5cdFx0XHRcdFx0XHRpZiAodCA9PT0gYVtqXSkge1xuXHRcdFx0XHRcdFx0XHRhLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGEgPSBfcmVnaXN0ZXIodGFyZ2V0KS5jb25jYXQoKTtcblx0XHRcdFx0aSA9IGEubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoLS1pID4gLTEpIHtcblx0XHRcdFx0XHRpZiAoYVtpXS5fZ2MgfHwgKG9ubHlBY3RpdmUgJiYgIWFbaV0uaXNBY3RpdmUoKSkpIHtcblx0XHRcdFx0XHRcdGEuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGE7XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5raWxsVHdlZW5zT2YgPSBUd2VlbkxpdGUua2lsbERlbGF5ZWRDYWxsc1RvID0gZnVuY3Rpb24odGFyZ2V0LCBvbmx5QWN0aXZlLCB2YXJzKSB7XG5cdFx0XHRpZiAodHlwZW9mKG9ubHlBY3RpdmUpID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdHZhcnMgPSBvbmx5QWN0aXZlOyAvL2ZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSAoYmVmb3JlIFwib25seUFjdGl2ZVwiIHBhcmFtZXRlciB3YXMgaW5zZXJ0ZWQpXG5cdFx0XHRcdG9ubHlBY3RpdmUgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBhID0gVHdlZW5MaXRlLmdldFR3ZWVuc09mKHRhcmdldCwgb25seUFjdGl2ZSksXG5cdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRhW2ldLl9raWxsKHZhcnMsIHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXG5cbi8qXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUd2VlblBsdWdpbiAgIChjb3VsZCBlYXNpbHkgYmUgc3BsaXQgb3V0IGFzIGEgc2VwYXJhdGUgZmlsZS9jbGFzcywgYnV0IGluY2x1ZGVkIGZvciBlYXNlIG9mIHVzZSAoc28gdGhhdCBwZW9wbGUgZG9uJ3QgbmVlZCB0byBpbmNsdWRlIGFub3RoZXIgc2NyaXB0IGNhbGwgYmVmb3JlIGxvYWRpbmcgcGx1Z2lucyB3aGljaCBpcyBlYXN5IHRvIGZvcmdldClcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXHRcdHZhciBUd2VlblBsdWdpbiA9IF9jbGFzcyhcInBsdWdpbnMuVHdlZW5QbHVnaW5cIiwgZnVuY3Rpb24ocHJvcHMsIHByaW9yaXR5KSB7XG5cdFx0XHRcdFx0dGhpcy5fb3ZlcndyaXRlUHJvcHMgPSAocHJvcHMgfHwgXCJcIikuc3BsaXQoXCIsXCIpO1xuXHRcdFx0XHRcdHRoaXMuX3Byb3BOYW1lID0gdGhpcy5fb3ZlcndyaXRlUHJvcHNbMF07XG5cdFx0XHRcdFx0dGhpcy5fcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdFx0XHRcdHRoaXMuX3N1cGVyID0gVHdlZW5QbHVnaW4ucHJvdG90eXBlO1xuXHRcdFx0XHR9LCB0cnVlKTtcblxuXHRcdHAgPSBUd2VlblBsdWdpbi5wcm90b3R5cGU7XG5cdFx0VHdlZW5QbHVnaW4udmVyc2lvbiA9IFwiMS4xOC4wXCI7XG5cdFx0VHdlZW5QbHVnaW4uQVBJID0gMjtcblx0XHRwLl9maXJzdFBUID0gbnVsbDtcblx0XHRwLl9hZGRUd2VlbiA9IF9hZGRQcm9wVHdlZW47XG5cdFx0cC5zZXRSYXRpbyA9IF9zZXRSYXRpbztcblxuXHRcdHAuX2tpbGwgPSBmdW5jdGlvbihsb29rdXApIHtcblx0XHRcdHZhciBhID0gdGhpcy5fb3ZlcndyaXRlUHJvcHMsXG5cdFx0XHRcdHB0ID0gdGhpcy5fZmlyc3RQVCxcblx0XHRcdFx0aTtcblx0XHRcdGlmIChsb29rdXBbdGhpcy5fcHJvcE5hbWVdICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb3ZlcndyaXRlUHJvcHMgPSBbXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGkgPSBhLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKC0taSA+IC0xKSB7XG5cdFx0XHRcdFx0aWYgKGxvb2t1cFthW2ldXSAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRhLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHRpZiAobG9va3VwW3B0Lm5dICE9IG51bGwpIHtcblx0XHRcdFx0XHRpZiAocHQuX25leHQpIHtcblx0XHRcdFx0XHRcdHB0Ll9uZXh0Ll9wcmV2ID0gcHQuX3ByZXY7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwdC5fcHJldikge1xuXHRcdFx0XHRcdFx0cHQuX3ByZXYuX25leHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0XHRcdHB0Ll9wcmV2ID0gbnVsbDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2ZpcnN0UFQgPT09IHB0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9maXJzdFBUID0gcHQuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHB0ID0gcHQuX25leHQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblxuXHRcdHAuX3JvdW5kUHJvcHMgPSBmdW5jdGlvbihsb29rdXAsIHZhbHVlKSB7XG5cdFx0XHR2YXIgcHQgPSB0aGlzLl9maXJzdFBUO1xuXHRcdFx0d2hpbGUgKHB0KSB7XG5cdFx0XHRcdGlmIChsb29rdXBbdGhpcy5fcHJvcE5hbWVdIHx8IChwdC5uICE9IG51bGwgJiYgbG9va3VwWyBwdC5uLnNwbGl0KHRoaXMuX3Byb3BOYW1lICsgXCJfXCIpLmpvaW4oXCJcIikgXSkpIHsgLy9zb21lIHByb3BlcnRpZXMgdGhhdCBhcmUgdmVyeSBwbHVnaW4tc3BlY2lmaWMgYWRkIGEgcHJlZml4IG5hbWVkIGFmdGVyIHRoZSBfcHJvcE5hbWUgcGx1cyBhbiB1bmRlcnNjb3JlLCBzbyB3ZSBuZWVkIHRvIGlnbm9yZSB0aGF0IGV4dHJhIHN0dWZmIGhlcmUuXG5cdFx0XHRcdFx0cHQuciA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHB0ID0gcHQuX25leHQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdFR3ZWVuTGl0ZS5fb25QbHVnaW5FdmVudCA9IGZ1bmN0aW9uKHR5cGUsIHR3ZWVuKSB7XG5cdFx0XHR2YXIgcHQgPSB0d2Vlbi5fZmlyc3RQVCxcblx0XHRcdFx0Y2hhbmdlZCwgcHQyLCBmaXJzdCwgbGFzdCwgbmV4dDtcblx0XHRcdGlmICh0eXBlID09PSBcIl9vbkluaXRBbGxQcm9wc1wiKSB7XG5cdFx0XHRcdC8vc29ydHMgdGhlIFByb3BUd2VlbiBsaW5rZWQgbGlzdCBpbiBvcmRlciBvZiBwcmlvcml0eSBiZWNhdXNlIHNvbWUgcGx1Z2lucyBuZWVkIHRvIHJlbmRlciBlYXJsaWVyL2xhdGVyIHRoYW4gb3RoZXJzLCBsaWtlIE1vdGlvbkJsdXJQbHVnaW4gYXBwbGllcyBpdHMgZWZmZWN0cyBhZnRlciBhbGwgeC95L2FscGhhIHR3ZWVucyBoYXZlIHJlbmRlcmVkIG9uIGVhY2ggZnJhbWUuXG5cdFx0XHRcdHdoaWxlIChwdCkge1xuXHRcdFx0XHRcdG5leHQgPSBwdC5fbmV4dDtcblx0XHRcdFx0XHRwdDIgPSBmaXJzdDtcblx0XHRcdFx0XHR3aGlsZSAocHQyICYmIHB0Mi5wciA+IHB0LnByKSB7XG5cdFx0XHRcdFx0XHRwdDIgPSBwdDIuX25leHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgocHQuX3ByZXYgPSBwdDIgPyBwdDIuX3ByZXYgOiBsYXN0KSkge1xuXHRcdFx0XHRcdFx0cHQuX3ByZXYuX25leHQgPSBwdDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Zmlyc3QgPSBwdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKChwdC5fbmV4dCA9IHB0MikpIHtcblx0XHRcdFx0XHRcdHB0Mi5fcHJldiA9IHB0O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRsYXN0ID0gcHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHB0ID0gbmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRwdCA9IHR3ZWVuLl9maXJzdFBUID0gZmlyc3Q7XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAocHQpIHtcblx0XHRcdFx0aWYgKHB0LnBnKSBpZiAodHlwZW9mKHB0LnRbdHlwZV0pID09PSBcImZ1bmN0aW9uXCIpIGlmIChwdC50W3R5cGVdKCkpIHtcblx0XHRcdFx0XHRjaGFuZ2VkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwdCA9IHB0Ll9uZXh0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNoYW5nZWQ7XG5cdFx0fTtcblxuXHRcdFR3ZWVuUGx1Z2luLmFjdGl2YXRlID0gZnVuY3Rpb24ocGx1Z2lucykge1xuXHRcdFx0dmFyIGkgPSBwbHVnaW5zLmxlbmd0aDtcblx0XHRcdHdoaWxlICgtLWkgPiAtMSkge1xuXHRcdFx0XHRpZiAocGx1Z2luc1tpXS5BUEkgPT09IFR3ZWVuUGx1Z2luLkFQSSkge1xuXHRcdFx0XHRcdF9wbHVnaW5zWyhuZXcgcGx1Z2luc1tpXSgpKS5fcHJvcE5hbWVdID0gcGx1Z2luc1tpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblxuXHRcdC8vcHJvdmlkZXMgYSBtb3JlIGNvbmNpc2Ugd2F5IHRvIGRlZmluZSBwbHVnaW5zIHRoYXQgaGF2ZSBubyBkZXBlbmRlbmNpZXMgYmVzaWRlcyBUd2VlblBsdWdpbiBhbmQgVHdlZW5MaXRlLCB3cmFwcGluZyBjb21tb24gYm9pbGVycGxhdGUgc3R1ZmYgaW50byBvbmUgZnVuY3Rpb24gKGFkZGVkIGluIDEuOS4wKS4gWW91IGRvbid0IE5FRUQgdG8gdXNlIHRoaXMgdG8gZGVmaW5lIGEgcGx1Z2luIC0gdGhlIG9sZCB3YXkgc3RpbGwgd29ya3MgYW5kIGNhbiBiZSB1c2VmdWwgaW4gY2VydGFpbiAocmFyZSkgc2l0dWF0aW9ucy5cblx0XHRfZ3NEZWZpbmUucGx1Z2luID0gZnVuY3Rpb24oY29uZmlnKSB7XG5cdFx0XHRpZiAoIWNvbmZpZyB8fCAhY29uZmlnLnByb3BOYW1lIHx8ICFjb25maWcuaW5pdCB8fCAhY29uZmlnLkFQSSkgeyB0aHJvdyBcImlsbGVnYWwgcGx1Z2luIGRlZmluaXRpb24uXCI7IH1cblx0XHRcdHZhciBwcm9wTmFtZSA9IGNvbmZpZy5wcm9wTmFtZSxcblx0XHRcdFx0cHJpb3JpdHkgPSBjb25maWcucHJpb3JpdHkgfHwgMCxcblx0XHRcdFx0b3ZlcndyaXRlUHJvcHMgPSBjb25maWcub3ZlcndyaXRlUHJvcHMsXG5cdFx0XHRcdG1hcCA9IHtpbml0OlwiX29uSW5pdFR3ZWVuXCIsIHNldDpcInNldFJhdGlvXCIsIGtpbGw6XCJfa2lsbFwiLCByb3VuZDpcIl9yb3VuZFByb3BzXCIsIGluaXRBbGw6XCJfb25Jbml0QWxsUHJvcHNcIn0sXG5cdFx0XHRcdFBsdWdpbiA9IF9jbGFzcyhcInBsdWdpbnMuXCIgKyBwcm9wTmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BOYW1lLnN1YnN0cigxKSArIFwiUGx1Z2luXCIsXG5cdFx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRUd2VlblBsdWdpbi5jYWxsKHRoaXMsIHByb3BOYW1lLCBwcmlvcml0eSk7XG5cdFx0XHRcdFx0XHR0aGlzLl9vdmVyd3JpdGVQcm9wcyA9IG92ZXJ3cml0ZVByb3BzIHx8IFtdO1xuXHRcdFx0XHRcdH0sIChjb25maWcuZ2xvYmFsID09PSB0cnVlKSksXG5cdFx0XHRcdHAgPSBQbHVnaW4ucHJvdG90eXBlID0gbmV3IFR3ZWVuUGx1Z2luKHByb3BOYW1lKSxcblx0XHRcdFx0cHJvcDtcblx0XHRcdHAuY29uc3RydWN0b3IgPSBQbHVnaW47XG5cdFx0XHRQbHVnaW4uQVBJID0gY29uZmlnLkFQSTtcblx0XHRcdGZvciAocHJvcCBpbiBtYXApIHtcblx0XHRcdFx0aWYgKHR5cGVvZihjb25maWdbcHJvcF0pID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRwW21hcFtwcm9wXV0gPSBjb25maWdbcHJvcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdFBsdWdpbi52ZXJzaW9uID0gY29uZmlnLnZlcnNpb247XG5cdFx0XHRUd2VlblBsdWdpbi5hY3RpdmF0ZShbUGx1Z2luXSk7XG5cdFx0XHRyZXR1cm4gUGx1Z2luO1xuXHRcdH07XG5cblxuXHRcdC8vbm93IHJ1biB0aHJvdWdoIGFsbCB0aGUgZGVwZW5kZW5jaWVzIGRpc2NvdmVyZWQgYW5kIGlmIGFueSBhcmUgbWlzc2luZywgbG9nIHRoYXQgdG8gdGhlIGNvbnNvbGUgYXMgYSB3YXJuaW5nLiBUaGlzIGlzIHdoeSBpdCdzIGJlc3QgdG8gaGF2ZSBUd2VlbkxpdGUgbG9hZCBsYXN0IC0gaXQgY2FuIGNoZWNrIGFsbCB0aGUgZGVwZW5kZW5jaWVzIGZvciB5b3UuXG5cdFx0YSA9IHdpbmRvdy5fZ3NRdWV1ZTtcblx0XHRpZiAoYSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0YVtpXSgpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChwIGluIF9kZWZMb29rdXApIHtcblx0XHRcdFx0aWYgKCFfZGVmTG9va3VwW3BdLmZ1bmMpIHtcblx0XHRcdFx0XHR3aW5kb3cuY29uc29sZS5sb2coXCJHU0FQIGVuY291bnRlcmVkIG1pc3NpbmcgZGVwZW5kZW5jeTogY29tLmdyZWVuc29jay5cIiArIHApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X3RpY2tlckFjdGl2ZSA9IGZhbHNlOyAvL2Vuc3VyZXMgdGhhdCB0aGUgZmlyc3Qgb2ZmaWNpYWwgYW5pbWF0aW9uIGZvcmNlcyBhIHRpY2tlci50aWNrKCkgdG8gdXBkYXRlIHRoZSB0aW1lIHdoZW4gaXQgaXMgaW5zdGFudGlhdGVkXG5cbn0pKCh0eXBlb2YobW9kdWxlKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cyAmJiB0eXBlb2YoZ2xvYmFsKSAhPT0gXCJ1bmRlZmluZWRcIikgPyBnbG9iYWwgOiB0aGlzIHx8IHdpbmRvdywgXCJUd2VlbkxpdGVcIik7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9nc2FwL3NyYy91bmNvbXByZXNzZWQvVHdlZW5MaXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIGFieXNzYV8xID0gcmVxdWlyZSgnYWJ5c3NhJyk7XG52YXIgZG9tcHRldXNlXzEgPSByZXF1aXJlKCdkb21wdGV1c2UnKTtcbnZhciBhbmltYXRpb25fMSA9IHJlcXVpcmUoJy4vYW5pbWF0aW9uJyk7XG52YXIgZ3JlZW5fMSA9IHJlcXVpcmUoJy4vZ3JlZW4nKTtcbnZhciByZWRfMSA9IHJlcXVpcmUoJy4vcmVkJyk7XG52YXIgYWN0aW9uXzEgPSByZXF1aXJlKCcuL2FjdGlvbicpO1xuZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgIHJldHVybiBkb21wdGV1c2VfMS5jb21wb25lbnQoe1xuICAgICAgICBrZXk6ICdibHVlJyxcbiAgICAgICAgcHVsbFN0YXRlOiBwdWxsU3RhdGUsXG4gICAgICAgIHJlbmRlcjogcmVuZGVyXG4gICAgfSk7XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0XzE7XG47XG5mdW5jdGlvbiBwdWxsU3RhdGUoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb3VudDogc3RhdGUuYmx1ZS5jb3VudCxcbiAgICAgICAgcmVkQ291bnQ6IHN0YXRlLmJsdWUucmVkLmNvdW50LFxuICAgICAgICByb3V0ZTogc3RhdGUucm91dGUuZnVsbE5hbWUsXG4gICAgICAgIGlkOiBzdGF0ZS5yb3V0ZS5wYXJhbXNbJ2lkJ11cbiAgICB9O1xufVxuZnVuY3Rpb24gcmVuZGVyKG9wdGlvbnMpIHtcbiAgICB2YXIgc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgIHZhciBpZCA9IHN0YXRlLmlkLCByb3V0ZSA9IHN0YXRlLnJvdXRlO1xuICAgIHJldHVybiBkb21wdGV1c2VfMS5oKCdkaXYjYmx1ZScsIHsgaG9vazogYW5pbWF0aW9uXzEuY29udGVudEFuaW1hdGlvbiB9LCBbXG4gICAgICAgIGRvbXB0ZXVzZV8xLmgoJ2gxJywgJ0JsdWUgc2NyZWVuJyksXG4gICAgICAgIGRvbXB0ZXVzZV8xLmgoJ2EnLCB7IGF0dHJzOiB7IGhyZWY6IGFieXNzYV8xLmFwaS5saW5rKCdhcHAuYmx1ZS5ncmVlbicsIHsgaWQ6IGlkIH0pLCAnZGF0YS1uYXYnOiAnbW91c2Vkb3duJyB9IH0sICdHcmVlbicpLFxuICAgICAgICBkb21wdGV1c2VfMS5oKCdhJywgeyBhdHRyczogeyBocmVmOiBhYnlzc2FfMS5hcGkubGluaygnYXBwLmJsdWUucmVkJywgeyBpZDogaWQgfSksICdkYXRhLW5hdic6ICdtb3VzZWRvd24nIH0gfSwgJ1JlZCcpLFxuICAgICAgICBkb21wdGV1c2VfMS5oKCdkaXYuaW5jcmVtZW50JywgW1xuICAgICAgICAgICAgJ0NvdW50OiAnICsgc3RhdGUuY291bnQsXG4gICAgICAgICAgICBkb21wdGV1c2VfMS5oKCdidXR0b24nLCB7IG9uOiB7IGNsaWNrOiBhY3Rpb25fMS5pbmNyZW1lbnRCbHVlIH0gfSwgJ0luY3JlbWVudCcpXG4gICAgICAgIF0pLFxuICAgICAgICBkb21wdGV1c2VfMS5oKCdzZWN0aW9uJywgZ2V0Q2hpbGRyZW4oc3RhdGUpKVxuICAgIF0pO1xufVxuZnVuY3Rpb24gZ2V0Q2hpbGRyZW4oc3RhdGUpIHtcbiAgICB2YXIgcm91dGUgPSBzdGF0ZS5yb3V0ZSwgcmVkQ291bnQgPSBzdGF0ZS5yZWRDb3VudDtcbiAgICBpZiAocm91dGUgPT09ICdhcHAuYmx1ZScpXG4gICAgICAgIHJldHVybiBbZG9tcHRldXNlXzEuaCgnc3BhbicsIHsgaG9vazogYW5pbWF0aW9uXzEuY29udGVudEFuaW1hdGlvbiB9LCAnSSBhbSBibHVlJyldO1xuICAgIGlmIChyb3V0ZSA9PT0gJ2FwcC5ibHVlLmdyZWVuJylcbiAgICAgICAgcmV0dXJuIFtncmVlbl8xLmRlZmF1bHQoKV07XG4gICAgaWYgKHJvdXRlID09PSAnYXBwLmJsdWUucmVkJylcbiAgICAgICAgcmV0dXJuIFtyZWRfMS5kZWZhdWx0KHsgb3BlbmVkQnlEZWZhdWx0OiB0cnVlIH0pLCByZWRfMS5kZWZhdWx0KCldO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9ibHVlLnRzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIGRvbXB0ZXVzZV8xID0gcmVxdWlyZSgnZG9tcHRldXNlJyk7XG52YXIgYW5pbWF0aW9uXzEgPSByZXF1aXJlKCcuL2FuaW1hdGlvbicpO1xuZnVuY3Rpb24gZGVmYXVsdF8xKCkge1xuICAgIHJldHVybiBkb21wdGV1c2VfMS5jb21wb25lbnQoe1xuICAgICAgICBrZXk6ICdncmVlbicsXG4gICAgICAgIHB1bGxTdGF0ZTogcHVsbFN0YXRlLFxuICAgICAgICByZW5kZXI6IHJlbmRlclxuICAgIH0pO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuZnVuY3Rpb24gcHVsbFN0YXRlKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IHN0YXRlLnJvdXRlLnBhcmFtc1snaWQnXVxuICAgIH07XG59XG5mdW5jdGlvbiByZW5kZXIob3B0aW9ucykge1xuICAgIHZhciBpZCA9IG9wdGlvbnMuc3RhdGUuaWQ7XG4gICAgcmV0dXJuIGRvbXB0ZXVzZV8xLmgoJ2RpdiNncmVlbicsIHsgaG9vazogYW5pbWF0aW9uXzEuY29udGVudEFuaW1hdGlvbiB9LCBcIkdyZWVuIChyb3V0ZSBpZCA9IFwiICsgaWQgKyBcIilcIik7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2dyZWVuLnRzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIGltbXVwZGF0ZV8xID0gcmVxdWlyZSgnaW1tdXBkYXRlJyk7XG52YXIgZmx1eHhfMSA9IHJlcXVpcmUoJ2ZsdXh4Jyk7XG52YXIgZG9tcHRldXNlXzEgPSByZXF1aXJlKCdkb21wdGV1c2UnKTtcbnZhciBhbmltYXRpb25fMSA9IHJlcXVpcmUoJy4vYW5pbWF0aW9uJyk7XG5mdW5jdGlvbiBkZWZhdWx0XzEocHJvcHMpIHtcbiAgICByZXR1cm4gZG9tcHRldXNlXzEuY29tcG9uZW50KHtcbiAgICAgICAga2V5OiAncmVkJyxcbiAgICAgICAgbG9jYWxTdG9yZTogbG9jYWxTdG9yZSxcbiAgICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgICByZW5kZXI6IHJlbmRlclxuICAgIH0pO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdF8xO1xuO1xuZnVuY3Rpb24gbG9jYWxTdG9yZShfYSkge1xuICAgIHZhciBvcGVuZWRCeURlZmF1bHQgPSBfYS5vcGVuZWRCeURlZmF1bHQ7XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHsgb3BlbmVkOiBvcGVuZWRCeURlZmF1bHQgfTtcbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgICAgdG9nZ2xlOiBmbHV4eF8xLkFjdGlvbigndG9nZ2xlJylcbiAgICB9O1xuICAgIHZhciBzdG9yZSA9IGZsdXh4XzEuTG9jYWxTdG9yZShpbml0aWFsU3RhdGUsIGZ1bmN0aW9uIChvbikge1xuICAgICAgICBvbihhY3Rpb25zLnRvZ2dsZSwgZnVuY3Rpb24gKHN0YXRlKSB7IHJldHVybiBpbW11cGRhdGVfMS5kZWZhdWx0KHN0YXRlLCB7IG9wZW5lZDogIXN0YXRlLm9wZW5lZCB9KTsgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgc3RvcmU6IHN0b3JlLCBhY3Rpb25zOiBhY3Rpb25zIH07XG59XG5mdW5jdGlvbiByZW5kZXIob3B0aW9ucykge1xuICAgIHZhciBvcGVuZWQgPSBvcHRpb25zLmxvY2FsU3RhdGUub3BlbmVkLCBhY3Rpb25zID0gb3B0aW9ucy5hY3Rpb25zO1xuICAgIHJldHVybiBkb21wdGV1c2VfMS5oKCdkaXYucmVkJywgeyBob29rOiBhbmltYXRpb25fMS5jb250ZW50QW5pbWF0aW9uLCBjbGFzczogeyBvcGVuZWQ6IG9wZW5lZCB9IH0sIFtcbiAgICAgICAgZG9tcHRldXNlXzEuaCgnYnV0dG9uJywgeyBvbjogeyBjbGljazogb25DbGljayhhY3Rpb25zKSB9IH0sICdUb2dnbGUnKVxuICAgIF0pO1xufVxuZnVuY3Rpb24gb25DbGljayhhY3Rpb25zKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFjdGlvbnMudG9nZ2xlKCk7IH07XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3JlZC50c1xuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5kZWZhdWx0ID0gdXBkYXRlO1xuZXhwb3J0cy51cGRhdGVLZXkgPSB1cGRhdGVLZXk7XG5leHBvcnRzLnJlcGxhY2UgPSByZXBsYWNlO1xuZnVuY3Rpb24gdXBkYXRlKGhvc3QsIHNwZWMpIHtcbiAgLy8gSWYgYW55IG9mIHRoZSBicmFuY2hlcyBvZiBhbiBvYmplY3QgY2hhbmdlZCwgdGhlbiB0aGFuIG9iamVjdCBjaGFuZ2VkIHRvbzogY2xvbmUgaXQuXG4gIC8vIFRoZSB0eXBlIG9mIHRoZSBjb3B5IGlzIGluZmVycmVkLlxuICB2YXIgY29weSA9IGhvc3QgPyBBcnJheS5pc0FycmF5KGhvc3QpID8gaG9zdC5zbGljZSgpIDogY2xvbmUoaG9zdCkgOiBBcnJheS5pc0FycmF5KHNwZWMpID8gW10gOiB7fTtcblxuICBmb3IgKHZhciBrZXkgaW4gc3BlYykge1xuICAgIHZhciBzcGVjVmFsdWUgPSBzcGVjW2tleV07XG5cbiAgICBpZiAoc3BlY1ZhbHVlID09PSBERUxFVEUpIHtcbiAgICAgIEFycmF5LmlzQXJyYXkoY29weSkgPyBjb3B5LnNwbGljZShrZXksIDEpIDogZGVsZXRlIGNvcHlba2V5XTtcbiAgICB9XG4gICAgLy8gVGhlIHNwZWMgY29udGludWVzIGRlZXBlclxuICAgIGVsc2UgaWYgKGlzT2JqZWN0KHNwZWNWYWx1ZSkpIHtcbiAgICAgICAgY29weVtrZXldID0gdXBkYXRlKGNvcHlba2V5XSwgc3BlY1ZhbHVlKTtcbiAgICAgIH1cbiAgICAgIC8vIExlYWYgdXBkYXRlXG4gICAgICBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV3VmFsdWUgPSB0eXBlb2Ygc3BlY1ZhbHVlID09PSAnZnVuY3Rpb24nID8gc3BlY1ZhbHVlKGNvcHlba2V5XSkgOiBzcGVjVmFsdWU7XG5cbiAgICAgICAgICBjb3B5W2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvcHk7XG59XG5cbi8vIFNpbmdsZSBwYXRoIHN0cmluZyB1cGRhdGUgbGlrZTogdXBkYXRlKG9iaiwgJ3BhdGgxLnBhdGgyLm5hbWUnLCAnSm9obicpO1xuZnVuY3Rpb24gdXBkYXRlS2V5KGhvc3QsIGtleVBhdGgsIHZhbHVlKSB7XG4gIHZhciBwYXRocyA9IGtleVBhdGguc3BsaXQoJy4nKTtcbiAgdmFyIHNwZWMgPSB7fTtcbiAgdmFyIGN1cnJlbnRPYmogPSBzcGVjO1xuXG4gIHBhdGhzLmZvckVhY2goZnVuY3Rpb24gKHBhdGgsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID09PSBwYXRocy5sZW5ndGggLSAxKSBjdXJyZW50T2JqW3BhdGhdID0gdmFsdWU7ZWxzZSBjdXJyZW50T2JqW3BhdGhdID0gY3VycmVudE9iaiA9IHt9O1xuICB9KTtcblxuICByZXR1cm4gdXBkYXRlKGhvc3QsIHNwZWMpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh4KSB7XG4gIHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoeCkpID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh4KTtcbn1cblxudmFyIERFTEVURSA9IGV4cG9ydHMuREVMRVRFID0ge307XG5cbmZ1bmN0aW9uIHJlcGxhY2UodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2ltbXVwZGF0ZS9saWIvaW1tdXBkYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xudmFyIGZsdXh4XzEgPSByZXF1aXJlKCdmbHV4eCcpO1xudmFyIGltbXVwZGF0ZV8xID0gcmVxdWlyZSgnaW1tdXBkYXRlJyk7XG52YXIgYWN0aW9uXzEgPSByZXF1aXJlKCcuL2FjdGlvbicpO1xuO1xudmFyIGluaXRpYWxTdGF0ZSA9IHtcbiAgICBibHVlOiB7IGNvdW50OiAwLCByZWQ6IHsgY291bnQ6IDAgfSB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmx1eHhfMS5HbG9iYWxTdG9yZShpbml0aWFsU3RhdGUsIGZ1bmN0aW9uIChvbikge1xuICAgIG9uKGFjdGlvbl8xLmluY3JlbWVudEJsdWUsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gaW1tdXBkYXRlXzEuZGVmYXVsdChzdGF0ZSwgeyBibHVlOiB7IGNvdW50OiBmdW5jdGlvbiAoYykgeyByZXR1cm4gYyArIDE7IH0gfSB9KTtcbiAgICB9KTtcbiAgICBvbihhY3Rpb25fMS5yb3V0ZUNoYW5nZWQsIGZ1bmN0aW9uIChzdGF0ZSwgcm91dGUpIHtcbiAgICAgICAgcmV0dXJuIGltbXVwZGF0ZV8xLmRlZmF1bHQoc3RhdGUsIHsgcm91dGU6IHJvdXRlIH0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3N0b3JlLnRzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=