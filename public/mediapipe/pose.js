(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';

    function aa(a) { var c = 0; return function() { return c < a.length ? { done: !1, value: a[c++] } : { done: !0 } } }

    function A(a) { var c = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator]; return c ? c.call(a) : { next: aa(a) } }

    function ba(a) {
        if (!(a instanceof Array)) {
            a = A(a);
            for (var c, b = []; !(c = a.next()).done;) b.push(c.value);
            a = b
        }
        return a
    }
    var F = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, c, b) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[c] = b.value;
        return a
    };

    function ca(a) { a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global]; for (var c = 0; c < a.length; ++c) { var b = a[c]; if (b && b.Math == Math) return b } throw Error("Cannot find global object"); }
    var G = ca(this);

    function H(a, c) {
        if (c) a: {
            var b = G;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var f = a[d];
                if (!(f in b)) break a;
                b = b[f]
            }
            a = a[a.length - 1];d = b[a];c = c(d);c != d && null != c && F(b, a, { configurable: !0, writable: !0, value: c })
        }
    }
    var I;
    if ("function" == typeof Object.setPrototypeOf) I = Object.setPrototypeOf;
    else {
        var J;
        a: {
            var fa = { a: !0 },
                ha = {};
            try {
                ha.__proto__ = fa;
                J = ha.a;
                break a
            } catch (a) {}
            J = !1
        }
        I = J ? function(a, c) { a.__proto__ = c; if (a.__proto__ !== c) throw new TypeError(a + " is not extensible"); return a } : null
    }
    var ia = I;

    function K() {
        this.l = !1;
        this.h = null;
        this.j = void 0;
        this.g = 1;
        this.s = this.m = 0;
        this.i = null
    }

    function O(a) {
        if (a.l) throw new TypeError("Generator is already running");
        a.l = !0
    }
    K.prototype.o = function(a) { this.j = a };

    function P(a, c) {
        a.i = { J: c, K: !0 };
        a.g = a.m || a.s
    }
    K.prototype.return = function(a) {
        this.i = { return: a };
        this.g = this.s
    };

    function Q(a, c, b) { a.g = b; return { value: c } }

    function ja(a) {
        this.g = new K;
        this.h = a
    }

    function ka(a, c) {
        O(a.g);
        var b = a.g.h;
        if (b) return la(a, "return" in b ? b["return"] : function(d) { return { value: d, done: !0 } }, c, a.g.return);
        a.g.return(c);
        return U(a)
    }

    function la(a, c, b, d) {
        try { var f = c.call(a.g.h, b); if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object"); if (!f.done) return a.g.l = !1, f; var k = f.value } catch (e) { return a.g.h = null, P(a.g, e), U(a) }
        a.g.h = null;
        d.call(a.g, k);
        return U(a)
    }

    function U(a) {
        for (; a.g.g;) try { var c = a.h(a.g); if (c) return a.g.l = !1, { value: c.value, done: !1 } } catch (b) { a.g.j = void 0, P(a.g, b) }
        a.g.l = !1;
        if (a.g.i) {
            c = a.g.i;
            a.g.i = null;
            if (c.K) throw c.J;
            return { value: c.return, done: !0 }
        }
        return { value: void 0, done: !0 }
    }

    function ma(a) {
        this.next = function(c) {
            O(a.g);
            a.g.h ? c = la(a, a.g.h.next, c, a.g.o) : (a.g.o(c), c = U(a));
            return c
        };
        this.throw = function(c) {
            O(a.g);
            a.g.h ? c = la(a, a.g.h["throw"], c, a.g.o) : (P(a.g, c), c = U(a));
            return c
        };
        this.return = function(c) { return ka(a, c) };
        this[Symbol.iterator] = function() { return this }
    }

    function V(a, c) {
        c = new ma(new ja(c));
        ia && a.prototype && ia(c, a.prototype);
        return c
    }
    H("Symbol", function(a) {
        function c(f) { if (this instanceof c) throw new TypeError("Symbol is not a constructor"); return new b("jscomp_symbol_" + (f || "") + "_" + d++, f) }

        function b(f, k) {
            this.g = f;
            F(this, "description", { configurable: !0, writable: !0, value: k })
        }
        if (a) return a;
        b.prototype.toString = function() { return this.g };
        var d = 0;
        return c
    });
    H("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), b = 0; b < c.length; b++) { var d = G[c[b]]; "function" === typeof d && "function" != typeof d.prototype[a] && F(d.prototype, a, { configurable: !0, writable: !0, value: function() { return oa(aa(this)) } }) }
        return a
    });

    function oa(a) {
        a = { next: a };
        a[Symbol.iterator] = function() { return this };
        return a
    }
    var pa = "function" == typeof Object.assign ? Object.assign : function(a, c) {
        for (var b = 1; b < arguments.length; b++) {
            var d = arguments[b];
            if (d)
                for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f])
        }
        return a
    };
    H("Object.assign", function(a) { return a || pa });
    H("Promise", function(a) {
        function c(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var g = this.j();
            try { e(g.resolve, g.reject) } catch (h) { g.reject(h) }
        }

        function b() { this.g = null }

        function d(e) { return e instanceof c ? e : new c(function(g) { g(e) }) }
        if (a) return a;
        b.prototype.h = function(e) {
            if (null == this.g) {
                this.g = [];
                var g = this;
                this.i(function() { g.l() })
            }
            this.g.push(e)
        };
        var f = G.setTimeout;
        b.prototype.i = function(e) { f(e, 0) };
        b.prototype.l = function() {
            for (; this.g && this.g.length;) {
                var e = this.g;
                this.g = [];
                for (var g = 0; g < e.length; ++g) {
                    var h =
                        e[g];
                    e[g] = null;
                    try { h() } catch (l) { this.j(l) }
                }
            }
            this.g = null
        };
        b.prototype.j = function(e) { this.i(function() { throw e; }) };
        c.prototype.j = function() {
            function e(l) { return function(n) { h || (h = !0, l.call(g, n)) } }
            var g = this,
                h = !1;
            return { resolve: e(this.C), reject: e(this.l) }
        };
        c.prototype.C = function(e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof c) this.H(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var g = null != e;
                        break a;
                    case "function":
                        g = !0;
                        break a;
                    default:
                        g = !1
                }
                g ? this.B(e) : this.m(e)
            }
        };
        c.prototype.B = function(e) { var g = void 0; try { g = e.then } catch (h) { this.l(h); return } "function" == typeof g ? this.I(g, e) : this.m(e) };
        c.prototype.l = function(e) { this.s(2, e) };
        c.prototype.m = function(e) { this.s(1, e) };
        c.prototype.s = function(e, g) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + g + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = g;
            2 === this.h && this.G();
            this.A()
        };
        c.prototype.G = function() {
            var e = this;
            f(function() { if (e.F()) { var g = G.console; "undefined" !== typeof g && g.error(e.i) } }, 1)
        };
        c.prototype.F =
            function() {
                if (this.o) return !1;
                var e = G.CustomEvent,
                    g = G.Event,
                    h = G.dispatchEvent;
                if ("undefined" === typeof h) return !0;
                "function" === typeof e ? e = new e("unhandledrejection", { cancelable: !0 }) : "function" === typeof g ? e = new g("unhandledrejection", { cancelable: !0 }) : (e = G.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
                e.promise = this;
                e.reason = this.i;
                return h(e)
            };
        c.prototype.A = function() {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) k.h(this.g[e]);
                this.g = null
            }
        };
        var k = new b;
        c.prototype.H =
            function(e) {
                var g = this.j();
                e.D(g.resolve, g.reject)
            };
        c.prototype.I = function(e, g) { var h = this.j(); try { e.call(g, h.resolve, h.reject) } catch (l) { h.reject(l) } };
        c.prototype.then = function(e, g) {
            function h(q, p) { return "function" == typeof q ? function(u) { try { l(q(u)) } catch (r) { n(r) } } : p }
            var l, n, y = new c(function(q, p) {
                l = q;
                n = p
            });
            this.D(h(e, l), h(g, n));
            return y
        };
        c.prototype.catch = function(e) { return this.then(void 0, e) };
        c.prototype.D = function(e, g) {
            function h() {
                switch (l.h) {
                    case 1:
                        e(l.i);
                        break;
                    case 2:
                        g(l.i);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            l.h);
                }
            }
            var l = this;
            null == this.g ? k.h(h) : this.g.push(h);
            this.o = !0
        };
        c.resolve = d;
        c.reject = function(e) { return new c(function(g, h) { h(e) }) };
        c.race = function(e) { return new c(function(g, h) { for (var l = A(e), n = l.next(); !n.done; n = l.next()) d(n.value).D(g, h) }) };
        c.all = function(e) {
            var g = A(e),
                h = g.next();
            return h.done ? d([]) : new c(function(l, n) {
                function y(u) {
                    return function(r) {
                        q[u] = r;
                        p--;
                        0 == p && l(q)
                    }
                }
                var q = [],
                    p = 0;
                do q.push(void 0), p++, d(h.value).D(y(q.length - 1), n), h = g.next(); while (!h.done)
            })
        };
        return c
    });

    function qa(a, c) {
        a instanceof String && (a += "");
        var b = 0,
            d = !1,
            f = {
                next: function() {
                    if (!d && b < a.length) { var k = b++; return { value: c(k, a[k]), done: !1 } }
                    d = !0;
                    return { done: !0, value: void 0 }
                }
            };
        f[Symbol.iterator] = function() { return f };
        return f
    }
    H("Array.prototype.keys", function(a) { return a ? a : function() { return qa(this, function(c) { return c }) } });
    var ra = this || self;

    function W(a, c) {
        a = a.split(".");
        var b = ra;
        a[0] in b || "undefined" == typeof b.execScript || b.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === c ? b[d] && b[d] !== Object.prototype[d] ? b = b[d] : b = b[d] = {} : b[d] = c
    };

    function X(a, c) {
        var b = void 0;
        return new(b || (b = Promise))(function(d, f) {
            function k(h) { try { g(c.next(h)) } catch (l) { f(l) } }

            function e(h) { try { g(c["throw"](h)) } catch (l) { f(l) } }

            function g(h) { h.done ? d(h.value) : (new b(function(l) { l(h.value) })).then(k, e) }
            g((c = c.apply(a, void 0)).next())
        })
    };

    function sa(a, c, b) {
        b = a.createShader(0 === b ? a.VERTEX_SHADER : a.FRAGMENT_SHADER);
        a.shaderSource(b, c);
        a.compileShader(b);
        if (!a.getShaderParameter(b, a.COMPILE_STATUS)) throw Error("Could not compile WebGL shader.\n\n" + a.getShaderInfoLog(b));
        return b
    };

    function ta(a, c) {
        this.g = a;
        this.i = c;
        this.j = 0
    }

    function ua(a, c) {
        var b = a.i;
        if (void 0 === a.l) {
            var d = sa(b, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", 0),
                f = sa(b, "\n  precision highp float;\n  varying vec2 vTex;\n  uniform sampler2D sampler0;\n  void main(){\n    gl_FragColor = texture2D(sampler0, vTex);\n  }", 1),
                k = b.createProgram();
            b.attachShader(k, d);
            b.attachShader(k, f);
            b.linkProgram(k);
            if (!b.getProgramParameter(k, b.LINK_STATUS)) throw Error("Could not compile WebGL program.\n\n" +
                b.getProgramInfoLog(k));
            d = a.l = k;
            b.useProgram(d);
            f = b.getUniformLocation(d, "sampler0");
            a.h = { v: b.getAttribLocation(d, "aVertex"), u: b.getAttribLocation(d, "aTex"), N: f };
            a.o = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.o);
            b.enableVertexAttribArray(a.h.v);
            b.vertexAttribPointer(a.h.v, 2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            a.m = b.createBuffer();
            b.bindBuffer(b.ARRAY_BUFFER, a.m);
            b.enableVertexAttribArray(a.h.u);
            b.vertexAttribPointer(a.h.u,
                2, b.FLOAT, !1, 0, 0);
            b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), b.STATIC_DRAW);
            b.bindBuffer(b.ARRAY_BUFFER, null);
            b.uniform1i(f, 0)
        }
        d = a.h;
        b.useProgram(a.l);
        b.canvas.width = c.width;
        b.canvas.height = c.height;
        b.viewport(0, 0, c.width, c.height);
        b.activeTexture(b.TEXTURE0);
        a.g.bindTexture2d(c.glName);
        b.enableVertexAttribArray(d.v);
        b.bindBuffer(b.ARRAY_BUFFER, a.o);
        b.vertexAttribPointer(d.v, 2, b.FLOAT, !1, 0, 0);
        b.enableVertexAttribArray(d.u);
        b.bindBuffer(b.ARRAY_BUFFER, a.m);
        b.vertexAttribPointer(d.u,
            2, b.FLOAT, !1, 0, 0);
        b.bindFramebuffer(b.DRAW_FRAMEBUFFER, null);
        b.drawArrays(b.TRIANGLE_FAN, 0, 4);
        b.disableVertexAttribArray(d.v);
        b.disableVertexAttribArray(d.u);
        b.bindBuffer(b.ARRAY_BUFFER, null);
        a.g.bindTexture2d(0)
    };
    var va = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);

    function wa(a, c) { return c + a }

    function xa(a, c) { window[a] = c }

    function ya(a) {
        var c = document.createElement("script");
        c.setAttribute("src", a);
        c.setAttribute("crossorigin", "anonymous");
        document.body.appendChild(c);
        return new Promise(function(b) { c.addEventListener("load", function() { b() }, !1) })
    }

    function za(a) {
        for (var c = [], b = a.size(), d = 0; d < b; ++d) {
            var f = a.get(d);
            c.push({ x: f.x, y: f.y, z: f.z, visibility: f.hasVisibility ? f.visibility : void 0 })
        }
        return c
    }

    function Aa(a, c, b) {
        this.graph = a;
        this.locateFile = c;
        this.g = b
    }
    Aa.prototype.toArrayBuffer = function() {
        return X(this, function c() {
            var b = this,
                d;
            return V(c, function(f) { return 1 == f.g ? (b.graph.url ? f = Q(f, fetch(b.locateFile(b.graph.url, b.g)), 3) : (f.g = 2, f = void 0), f) : 2 != f.g && (d = f.j, d.body) ? f.return(d.arrayBuffer()) : f.return(new ArrayBuffer(0)) })
        })
    };

    function Ba() {
        return X(this, function c() {
            return V(c, function(b) {
                switch (b.g) {
                    case 1:
                        return b.m = 2, Q(b, WebAssembly.instantiate(va), 4);
                    case 4:
                        b.g = 3;
                        b.m = 0;
                        break;
                    case 2:
                        return b.m = 0, b.i = null, b.return(!1);
                    case 3:
                        return b.return(!0)
                }
            })
        })
    }

    function Y(a) {
        this.h = a;
        this.listeners = {};
        this.B = {};
        this.j = {};
        this.o = this.C = !0;
        this.A = Promise.resolve();
        this.locateFile = a && a.locateFile || wa;
        if ("object" === typeof window) a = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
        else if ("undefined" !== typeof location) a = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
        else throw Error("solutions can only be loaded on a web page or in a web worker");
        this.F = a
    }
    Y.prototype.close = function() { this.i && this.i.delete(); return Promise.resolve() };

    function Ca(a) {
        return X(a, function b() {
            var d = this,
                f, k, e, g, h, l, n, y, q;
            return V(b, function(p) {
                switch (p.g) {
                    case 1:
                        f = d;
                        if (!d.C) return p.return();
                        xa("createMediapipeSolutionsWasm", { locateFile: d.locateFile });
                        xa("createMediapipeSolutionsPackedAssets", { locateFile: d.locateFile });
                        k = d.h.files || [];
                        return Q(p, Ba(), 2);
                    case 2:
                        return e = p.j, Q(p, Promise.all(k.map(function(u) { return void 0 === u.simd || u.simd && e || !u.simd && !e ? ya(f.locateFile(u.url, f.F)) : Promise.resolve() })), 3);
                    case 3:
                        return g = window.createMediapipeSolutionsWasm,
                            h = window.createMediapipeSolutionsPackedAssets, Q(p, g(h), 4);
                    case 4:
                        return d.g = p.j, d.m = document.createElement("canvas"), d.g.canvas = d.m, d.g.createContext(d.m, !0, !0, {}), d.i = new d.g.SolutionWasm, l = new Aa(d.h.graph, d.locateFile, d.F), Q(p, d.loadGraph(l), 5);
                    case 5:
                        if (d.h.listeners)
                            for (n = A(d.h.listeners), y = n.next(); !y.done; y = n.next()) q = y.value, Da(d, q);
                        d.C = !1;
                        p.g = 0
                }
            })
        })
    }
    Y.prototype.setOptions = function(a) {
        if (this.h.options) {
            for (var c = [], b = A(Object.keys(a)), d = b.next(); !d.done; d = b.next()) {
                var f = d.value;
                (d = this.h.options[f]) && d.graphOptionXref && (f = { valueNumber: 0 === d.type ? a[f] : 0, valueBoolean: 1 === d.type ? a[f] : !1 }, d = Object.assign(Object.assign(Object.assign({}, { calculatorName: "", calculatorIndex: 0 }), d.graphOptionXref), f), c.push(d))
            }
            0 !== c.length && (this.o = !0, this.s = c)
        }
    };

    function Ea(a) {
        return X(a, function b() {
            var d = this,
                f, k, e, g, h;
            return V(b, function(l) {
                if (!d.o) return l.return();
                f = d.m.getContext("webgl2");
                if (!f) return alert("Failed to create WebGL canvas context when passing video frame."), l.return();
                d.l = f;
                if (d.s) {
                    k = new d.g.GraphOptionChangeRequestList;
                    e = A(d.s);
                    for (g = e.next(); !g.done; g = e.next()) h = g.value, k.push_back(h);
                    d.i.changeOptions(k);
                    k.delete();
                    d.s = void 0
                }
                d.o = !1;
                l.g = 0
            })
        })
    }
    Y.prototype.initialize = function() { return X(this, function c() { var b = this; return V(c, function(d) { return 1 == d.g ? Q(d, Ca(b), 2) : Q(d, Ea(b), 0) }) }) };
    Y.prototype.loadGraph = function(a) {
        return X(this, function b() {
            var d, f = this;
            return V(b, function(k) {
                if (1 == k.g) return Q(k, a.toArrayBuffer(), 2);
                d = k.j;
                f.i.loadGraph(d);
                k.g = 0
            })
        })
    };
    Y.prototype.send = function(a, c) {
        return X(this, function d() {
            var f = this,
                k, e, g, h, l, n, y, q;
            return V(d, function(p) {
                if (1 == p.g) {
                    if (!f.h.inputs) return p.return();
                    k = 1E3 * (c || performance.now());
                    return Q(p, f.A, 2)
                }
                if (3 != p.g) return Q(p, f.initialize(), 3);
                e = new f.g.PacketDataList;
                g = A(Object.keys(a));
                for (h = g.next(); !h.done; h = g.next())
                    if (l = h.value, n = f.h.inputs[l]) {
                        a: {
                            var u = a[l];
                            switch (n.type) {
                                case "video":
                                    var r = f.B[n.stream];
                                    r || (r = new ta(f.g, f.l), f.B[n.stream] = r);
                                    0 === r.j && (r.j = r.g.createTexture());
                                    if (u instanceof HTMLVideoElement) {
                                        var t =
                                            u.videoWidth;
                                        var B = u.videoHeight
                                    } else u instanceof HTMLImageElement ? (t = u.naturalWidth, B = u.naturalHeight) : (t = u.width, B = u.height);
                                    B = { glName: r.j, width: t, height: B };
                                    t = r.i;
                                    t.canvas.width = B.width;
                                    t.canvas.height = B.height;
                                    t.activeTexture(t.TEXTURE0);
                                    r.g.bindTexture2d(r.j);
                                    t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, u);
                                    r.g.bindTexture2d(0);
                                    r = B;
                                    break a;
                                default:
                                    r = {}
                            }
                        }
                        y = r;q = n.stream;e.pushTexture2d(Object.assign(Object.assign({}, y), { stream: q, timestamp: k }))
                    }
                f.i.send(e);
                e.delete();
                p.g = 0
            })
        })
    };

    function Fa(a, c, b) {
        if (b.isNumber()) return b.getNumber();
        if (b.isRect()) return b.getRect();
        if (b.isLandmarks()) return b.getLandmarks();
        if (b.isLandmarksList()) return b.getLandmarksList();
        if (b.isClassificationsList()) return b.getClassificationsList();
        if (b.isObjectDetectionList()) return b.getObjectDetectionList();
        if (b.isTexture2d()) {
            var d = a.j[c];
            d || (d = new ta(a.g, a.l), a.j[c] = d);
            a = d;
            b = b.getTexture2d();
            ua(a, b);
            return a.i.canvas
        }
    }

    function Da(a, c) {
        for (var b = c.name || "$", d = [].concat(ba(c.wants)), f = new a.g.StringList, k = A(c.wants), e = k.next(); !e.done; e = k.next()) f.push_back(e.value);
        k = a.g.PacketListener.implement({
            onResults: function(g) {
                return X(a, function l() {
                    var n, y, q = this,
                        p, u, r;
                    return V(l, function(t) {
                        if (1 == t.g) {
                            n = {};
                            for (y = 0; y < c.wants.length; ++y) n[d[y]] = g.get(y);
                            var B;
                            if (B = c.outs) {
                                for (var D = {}, na = A(Object.keys(B)), x = na.next(); !x.done; x = na.next()) {
                                    x = x.value;
                                    var C = B[x];
                                    if ("string" === typeof C) D[x] = Fa(q, x, n[C]);
                                    else {
                                        var v = n[C.stream];
                                        if (void 0 !== v) {
                                            if ("detection_list" === C.type) {
                                                var m = v.getRectList(),
                                                    z = v.getLandmarksList();
                                                console.log(v, m, z);
                                                v = [];
                                                if (m)
                                                    for (var w = 0; w < m.size(); ++w) {
                                                        var E = { L: m.get(w), M: za(z.get(w)) };
                                                        console.log(E);
                                                        v.push(E)
                                                    }
                                                D[x] = v
                                            } else if ("landmarks" === C.type) m = v.getLandmarks(), D[x] = m ? za(m) : void 0;
                                            else if ("landmarks_list" === C.type) {
                                                if (m = v.getLandmarksList()) {
                                                    z = [];
                                                    v = m.size();
                                                    for (w = 0; w < v; ++w) E = m.get(w), z.push(za(E));
                                                    m = z
                                                } else m = void 0;
                                                D[x] = m
                                            } else if ("rect_list" === C.type) {
                                                if (m = v.getRectList()) {
                                                    z = [];
                                                    v = m.size();
                                                    for (w = 0; w <
                                                        v; ++w) E = m.get(w), z.push(E);
                                                    m = z
                                                } else m = void 0;
                                                D[x] = m
                                            } else if ("classifications_list" === C.type) {
                                                if (m = v.getClassificationsList()) {
                                                    z = [];
                                                    v = m.size();
                                                    for (w = 0; w < v; ++w) {
                                                        var M = m.get(w);
                                                        E = z;
                                                        for (var da = E.push, S = [], T = M.size(), N = 0; N < T; ++N) {
                                                            var R = M.get(N);
                                                            S.push({ index: R.index, score: R.score, label: R.label })
                                                        }
                                                        da.call(E, S)
                                                    }
                                                    m = z
                                                } else m = void 0;
                                                D[x] = m
                                            } else if ("object_detection_list" === C.type) {
                                                if (m = v.getObjectDetectionList()) {
                                                    z = [];
                                                    v = m.size();
                                                    for (w = 0; w < v; ++w) {
                                                        M = m.get(w);
                                                        E = z;
                                                        da = E.push;
                                                        S = M.id;
                                                        T = M.keypoints;
                                                        N = [];
                                                        R = T.size();
                                                        for (var ea =
                                                                0; ea < R; ++ea) {
                                                            var L = T.get(ea);
                                                            N.push({ id: L.id, point3d: { x: L.point3d.x, y: L.point3d.y, z: L.point3d.z }, point2d: { x: L.point2d.x, y: L.point2d.y, depth: L.point2d.depth } })
                                                        }
                                                        da.call(E, { id: S, keypoints: N, visibility: M.visibility })
                                                    }
                                                    m = z
                                                } else m = void 0;
                                                D[x] = m
                                            } else if ("texture" === C.type) m = q.j[x], m || (m = new ta(q.g, q.l), q.j[x] = m), z = v.getTexture2d(), ua(m, z), D[x] = m.i.canvas;
                                            else throw Error("Unknown output config type: '" + C.type + "'");
                                            C.transform && D[x] && (D[x] = C.transform(D[x]))
                                        }
                                    }
                                }
                                B = D
                            } else B = n;
                            p = B;
                            (u = q.listeners[b]) ? t = Q(t, q.A,
                                3): (t.g = 0, t = void 0);
                            return t
                        }
                        if (r = u(p)) return q.A = r, t.return(r);
                        t.g = 0
                    })
                })
            }
        });
        a.i.attachMultiListener(f, k);
        f.delete()
    }
    Y.prototype.onResults = function(a, c) { this.listeners[c || "$"] = a };
    W("Solution", Y);
    W("OptionType", { NUMBER: 0, BOOL: 1, 0: "NUMBER", 1: "BOOL" });

    function Z(a) {
        a = a || {};
        this.g = new Y({
            locateFile: a.locateFile,
            files: [{ url: "pose_solution_packed_assets_loader.js" }, { simd: !1, url: "pose_solution_wasm_bin.js" }, { simd: !0, url: "pose_solution_simd_wasm_bin.js" }],
            graph: { url: "pose_web.binarypb" },
            listeners: [{ wants: ["pose_landmarks", "image_transformed"], outs: { image: "image_transformed", poseLandmarks: { type: "landmarks", stream: "pose_landmarks" } } }],
            inputs: { image: { type: "video", stream: "input_frames_gpu" } },
            options: {
                selfieMode: {
                    type: 1,
                    graphOptionXref: {
                        calculatorType: "GlScalerCalculator",
                        calculatorIndex: 1,
                        fieldName: "flip_horizontal"
                    }
                },
                upperBodyOnly: { type: 1, graphOptionXref: { calculatorType: "ConstantSidePacketCalculator", calculatorName: "ConstantSidePacketCalculatorUpperBodyOnly", fieldName: "bool_value" } },
                smoothLandmarks: { type: 1, graphOptionXref: { calculatorType: "ConstantSidePacketCalculator", calculatorName: "ConstantSidePacketCalculatorSmoothLandmarks", fieldName: "bool_value" } },
                minDetectionConfidence: {
                    type: 0,
                    graphOptionXref: {
                        calculatorType: "TensorsToDetectionsCalculator",
                        calculatorName: "poselandmarkgpu__posedetectiongpu__TensorsToDetectionsCalculator",
                        fieldName: "min_score_thresh"
                    }
                },
                minTrackingConfidence: { type: 0, graphOptionXref: { calculatorType: "ThresholdingCalculator", calculatorName: "poselandmarkgpu__poselandmarkbyroigpu__ThresholdingCalculator", fieldName: "threshold" } }
            }
        })
    }
    Z.prototype.close = function() { this.g.close(); return Promise.resolve() };
    Z.prototype.onResults = function(a) { this.g.onResults(a) };
    Z.prototype.initialize = function() { return X(this, function c() { var b = this; return V(c, function(d) { return Q(d, b.g.initialize(), 0) }) }) };
    Z.prototype.send = function(a, c) { return X(this, function d() { var f = this; return V(d, function(k) { return Q(k, f.g.send(a, c), 0) }) }) };
    Z.prototype.setOptions = function(a) { this.g.setOptions(a) };
    W("Pose", Z);
    W("POSE_CONNECTIONS", [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 7],
        [0, 4],
        [4, 5],
        [5, 6],
        [6, 8],
        [9, 10],
        [11, 12],
        [11, 13],
        [13, 15],
        [15, 17],
        [15, 19],
        [15, 21],
        [17, 19],
        [12, 14],
        [14, 16],
        [16, 18],
        [16, 20],
        [16, 22],
        [18, 20],
        [11, 23],
        [12, 24],
        [23, 24],
        [23, 25],
        [24, 26],
        [25, 27],
        [26, 28],
        [27, 29],
        [28, 30],
        [29, 31],
        [30, 32],
        [27, 31],
        [28, 32]
    ]);
    W("POSE_LANDMARKS", { NOSE: 0, LEFT_EYE_INNER: 1, LEFT_EYE: 2, LEFT_EYE_OUTER: 3, RIGHT_EYE_INNER: 4, RIGHT_EYE: 5, RIGHT_EYE_OUTER: 6, LEFT_EAR: 7, RIGHT_EAR: 8, LEFT_RIGHT: 9, RIGHT_LEFT: 10, LEFT_SHOULDER: 11, RIGHT_SHOULDER: 12, LEFT_ELBOW: 13, RIGHT_ELBOW: 14, LEFT_WRIST: 15, RIGHT_WRIST: 16, LEFT_PINKY: 17, RIGHT_PINKY: 18, LEFT_INDEX: 19, RIGHT_INDEX: 20, LEFT_THUMB: 21, RIGHT_THUMB: 22, LEFT_HIP: 23, RIGHT_HIP: 24, LEFT_KNEE: 25, RIGHT_KNEE: 26, LEFT_ANKLE: 27, RIGHT_ANKLE: 28, LEFT_HEEL: 29, RIGHT_HEEL: 30, LEFT_FOOT_INDEX: 31, RIGHT_FOOT_INDEX: 32 });
    W("POSE_LANDMARKS_LEFT", { LEFT_EYE_INNER: 1, LEFT_EYE: 2, LEFT_EYE_OUTER: 3, LEFT_EAR: 7, LEFT_RIGHT: 9, LEFT_SHOULDER: 11, LEFT_ELBOW: 13, LEFT_WRIST: 15, LEFT_PINKY: 17, LEFT_INDEX: 19, LEFT_THUMB: 21, LEFT_HIP: 23, LEFT_KNEE: 25, LEFT_ANKLE: 27, LEFT_HEEL: 29, LEFT_FOOT_INDEX: 31 });
    W("POSE_LANDMARKS_RIGHT", { RIGHT_EYE_INNER: 4, RIGHT_EYE: 5, RIGHT_EYE_OUTER: 6, RIGHT_EAR: 8, RIGHT_LEFT: 10, RIGHT_SHOULDER: 12, RIGHT_ELBOW: 14, RIGHT_WRIST: 16, RIGHT_PINKY: 18, RIGHT_INDEX: 20, RIGHT_THUMB: 22, RIGHT_HIP: 24, RIGHT_KNEE: 26, RIGHT_ANKLE: 28, RIGHT_HEEL: 30, RIGHT_FOOT_INDEX: 32 });
    W("POSE_LANDMARKS_NEUTRAL", { NOSE: 0 });
}).call(this);