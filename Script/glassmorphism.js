!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : ("function" == typeof define && define.amd ? define([], t) : ("object" == typeof exports ? exports["@master/style"] = t() : e["@master/style"] = t()))
}(this, (function() {
    return (()=>{
        "use strict";
        var e = {
            d: (t,s)=>{
                for (var i in s)
                    e.o(s, i) && !e.o(t, i) && Object.defineProperty(t, i, {
                        enumerable: !0,
                        get: s[i]
                    })
            }
            ,
            o: (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
            r: e=>{
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
            }
        }
          , t = {};
        function s(e, t) {
            return e + ":" + (t.unit ? t.value + t.unit : t.value) + (t.important ? "!important" : "")
        }
        e.r(t),
        e.d(t, {
            Style: ()=>Style,
            StyleSheet: ()=>StyleSheet,
            sheets: ()=>z
        });
        const i = /^([+-.]?\d+(\.?\d+)?)(.*)?/;
        function n(e, t, s) {
            let n = ""
              , l = ""
              , r = "";
            if ("number" == typeof e)
                n = e,
                l = t || "";
            else {
                if (s) {
                    const [t,i] = e.split("/");
                    for (const e in s)
                        if (t.startsWith(e)) {
                            const s = t[e.length];
                            if (!s || "-" === s)
                                return n = "rgb(var(--" + t + ")" + (i ? "/" + i : "") + ")",
                                {
                                    value: n,
                                    unit: l,
                                    unitToken: r
                                }
                        }
                }
                if (t) {
                    const s = e.match(i);
                    if (s) {
                        if (e.includes("/")) {
                            const t = e.split("/");
                            return {
                                value: +t[0] / +t[1] * 100 + "%",
                                unit: l,
                                unitToken: r
                            }
                        }
                        return n = +s[1],
                        l = r = s[3] || "",
                        l || ("rem" !== t && "em" !== t || (n /= 16),
                        l = t || ""),
                        {
                            value: n,
                            unit: l,
                            unitToken: r
                        }
                    }
                }
                n = (-1 === e.indexOf("calc(") ? e : function(e) {
                    const t = e=>"+" === e || "-" === e || "*" === e || "/" === e;
                    let s, i = "", n = "", l = !1;
                    function r() {
                        s = null,
                        n = ""
                    }
                    for (let o = 0; o < e.length; o++) {
                        const c = e[o];
                        if ("(" === c || ")" === c)
                            l = ")" === c,
                            i += n + c,
                            r();
                        else if ("," === c)
                            i += n + c + " ",
                            r();
                        else {
                            switch (s) {
                            case 1:
                                break;
                            case 2:
                                if (t(c)) {
                                    i += n + " " + c + " ",
                                    r();
                                    continue
                                }
                                break;
                            default:
                                l && (n += " "),
                                isNaN(+c) ? t(c) || (s = 1) : s = 2
                            }
                            n += c
                        }
                    }
                    return n && (i += n),
                    i
                }(e)).replace(/\$\(((\w|-)+)\)/g, "var(--$1)")
            }
            return {
                value: n,
                unit: l,
                unitToken: r
            }
        }
        const l = [":disabled", ":active", ":focus", ":hover"]
          , r = [",", ".", "#", "[", "!", "*", ">", "+", "~", ":", "@"]
          , o = "undefined" != typeof document;
        let c;
        o && (c = document.createElement("style"),
        c.id = "master-styles");
        const a = "max-width"
          , h = "min-width"
          , f = "undefined" != typeof window
          , u = f ? window.MutationObserver : Object;
        class StyleSheet extends u {
            constructor(e) {
                if (super((e=>{
                    const t = {}
                      , s = []
                      , i = []
                      , n = []
                      , l = (e,t,s)=>{
                        for (let i = 0; i < e.length; i++) {
                            const n = e[i];
                            if (n.classList && !s.includes(n)) {
                                s.push(n),
                                n.classList.forEach((e=>{
                                    t ? o(e) : r(e)
                                }
                                ));
                                const e = n.children;
                                e.length && l(e, t, s)
                            }
                        }
                    }
                      , r = e=>{
                        e in t ? t[e]++ : t[e] = 1
                    }
                      , o = e=>{
                        e in t ? t[e]-- : t[e] = -1
                    }
                    ;
                    for (let t = 0; t < e.length; t++) {
                        const r = e[t]
                          , {addedNodes: o, removedNodes: c, type: a, target: h, oldValue: f} = r;
                        if ("attributes" === a) {
                            if (h.className === f || s.find((e=>e.target === h)))
                                continue;
                            s.push(r)
                        } else
                            o.length && l(o, !1, i),
                            c.length && l(c, !0, n)
                    }
                    if (s.length || Object.keys(t).length) {
                        for (const {oldValue: e, target: t} of s) {
                            if (i.includes(t) || n.includes(t))
                                continue;
                            const s = e ? e.split(" ") : []
                              , l = t.classList;
                            l.length && l.forEach((e=>{
                                s.includes(e) || r(e)
                            }
                            ));
                            for (const e of s)
                                l.contains(e) || o(e)
                        }
                        for (const e in t) {
                            const s = t[e]
                              , i = (this.countOfName[e] || 0) + s;
                            0 === i ? (delete this.countOfName[e],
                            this.delete(e)) : (e in this.countOfName || this.findAndInsert(e),
                            this.countOfName[e] = i)
                        }
                    }
                }
                )),
                this.container = e,
                this.styles = [],
                this.styleOfName = {},
                this.countOfName = {},
                o) {
                    if (e) {
                        const t = e.querySelector('[id="master-styles"]');
                        if (t) {
                            this.element = t;
                            const e = (t,s)=>{
                                if (t.selectorText) {
                                    const e = t.selectorText.split(", ")[0].split(" ");
                                    let i;
                                    for (let t = e.length - 1; t >= 0; t--) {
                                        const s = e[t];
                                        if ("." === s[0]) {
                                            i = s.slice(1);
                                            break
                                        }
                                    }
                                    let n = "";
                                    for (let e = 0; e < i.length; e++) {
                                        const t = i[e]
                                          , s = i[e + 1];
                                        if ("\\" === t) {
                                            if (e++,
                                            "\\" !== s) {
                                                n += s;
                                                continue
                                            }
                                        } else if (r.includes(t))
                                            break;
                                        n += t
                                    }
                                    if (!(n in this.styleOfName)) {
                                        const e = StyleSheet.findAndNew(n);
                                        e && (e.cssRule = null != s ? s : t,
                                        this.styles.push(e),
                                        this.styleOfName[e.name] = e)
                                    }
                                } else if (t.cssRules)
                                    for (let i = 0; i < t.cssRules.length; i++)
                                        e(t.cssRules[i], null != s ? s : t)
                            }
                            ;
                            e(t.sheet, void 0)
                        } else
                            this.element = c.cloneNode(),
                            null == e || e.prepend(this.element)
                    }
                    z.push(this)
                }
            }
            observe(e, t={
                subtree: !0,
                childList: !0
            }) {
                return t.subtree && e.querySelectorAll("[class]").forEach((e=>{
                    e.classList.forEach((e=>{
                        e in this.countOfName ? this.countOfName[e]++ : (this.countOfName[e] = 1,
                        this.findAndInsert(e))
                    }
                    ))
                }
                )),
                super.observe(e, Object.assign(Object.assign({}, t), {
                    attributes: !0,
                    attributeOldValue: !0,
                    attributeFilter: ["class"]
                })),
                this
            }
            disconnect() {
                super.disconnect(),
                this.styleOfName = {},
                this.countOfName = {},
                this.styles.length = 0;
                const e = this.element.sheet;
                for (let t = e.cssRules.length - 1; t >= 0; t--)
                    e.deleteRule(t)
            }
            static findAndNew(e) {
                for (const t of this.Styles) {
                    const s = t.match(e);
                    if (s)
                        return new t(e,s)
                }
            }
            static find(e) {
                for (const t of this.Styles) {
                    if (t.match(e))
                        return t
                }
            }
            static refresh() {
                for (const e of z)
                    e.refresh()
            }
            refresh() {
                if (!this.element)
                    return;
                const e = c.cloneNode();
                this.element.replaceWith(e),
                this.element = e,
                this.styles.length = 0,
                this.styleOfName = {};
                for (const e in this.countOfName)
                    this.findAndInsert(e)
            }
            destroy() {
                this.element.remove(),
                this.disconnect(),
                z.splice(z.indexOf(this), 1)
            }
            insert(e) {
                if (this.styleOfName[e.name])
                    return;
                const t = e.text;
                let s;
                const i = this.styles.length - 1
                  , n = e.media
                  , l = e.order
                  , r = e.prioritySelectorIndex
                  , o = e.hasWhere
                  , c = (e,t,s,i)=>{
                    let n, c, a = 0;
                    t && (a = e.findIndex(t)),
                    s && (c = e.findIndex(s)),
                    -1 === a && (a = e.length),
                    void 0 !== c && -1 !== c || (c = e.length),
                    n = e.slice(a, c);
                    for (let e = 0; e < n.length; e++) {
                        const t = n[e];
                        if (!(-1 === t.prioritySelectorIndex || i && i(t)) && (t.prioritySelectorIndex < r || t.prioritySelectorIndex === r && (o && !t.hasWhere || t.order >= l)))
                            return a + e
                    }
                    return a + n.length
                }
                ;
                if (n) {
                    const e = this.styles.findIndex((e=>e.media));
                    if (-1 !== e) {
                        const t = n.features[a]
                          , f = n.features[h];
                        if (t && f) {
                            const n = t.value - f.value;
                            for (let t = i; t >= e; t--) {
                                s = t;
                                const i = this.styles[t]
                                  , l = i.media
                                  , f = l.features[a]
                                  , u = l.features[h];
                                if (!f || !u) {
                                    s++;
                                    break
                                }
                                const d = f.value - u.value;
                                if (d === n) {
                                    if (o !== i.hasWhere)
                                        continue;
                                    if (-1 !== r) {
                                        const i = [this.styles[t]];
                                        for (let s = t - 1; s >= e; s--) {
                                            const e = this.styles[s];
                                            if (e.hasWhere !== o)
                                                break;
                                            const t = e.media
                                              , n = t.features[a]
                                              , l = t.features[h];
                                            if (!n || !l || n.value - l.value !== d)
                                                break;
                                            i.unshift(this.styles[s])
                                        }
                                        s = c(this.styles, (e=>e.media && -1 !== e.prioritySelectorIndex && e.media.features[h] && e.media.features[a]))
                                    }
                                    break
                                }
                                if (d > n)
                                    break
                            }
                        } else if (f)
                            for (let t = e; t <= i; t++) {
                                s = t;
                                const e = this.styles[t]
                                  , n = e.media
                                  , u = n.features[a]
                                  , d = n.features[h];
                                if (u) {
                                    if (d)
                                        break;
                                    continue
                                }
                                const m = null == d ? void 0 : d.value;
                                if (m === f.value) {
                                    if (!o && e.hasWhere) {
                                        s++;
                                        continue
                                    }
                                    if (-1 !== r)
                                        s = c(this.styles, (e=>e.media), (e=>e.media && -1 !== e.prioritySelectorIndex && e.media.features[h] && e.media.features[a]), (e=>!e.media.features[h] && !e.media.features[a]));
                                    else
                                        for (let e = t; e <= i; e++) {
                                            const t = this.styles[e]
                                              , i = t.media
                                              , n = i.features[h];
                                            if (!i.features[a]) {
                                                if (t.hasWhere !== o || n.value !== m || t.order >= l)
                                                    break;
                                                s = e + 1
                                            }
                                        }
                                    break
                                }
                                if (m > f.value)
                                    break;
                                s++
                            }
                        else if (t)
                            for (let n = i; n >= e; n--) {
                                s = n;
                                const i = this.styles[n]
                                  , f = i.media
                                  , u = f.features[a];
                                if (f.features[h])
                                    continue;
                                const d = null == u ? void 0 : u.value;
                                if (!d || d > t.value) {
                                    s++;
                                    break
                                }
                                if (d === t.value) {
                                    if (o && !i.hasWhere)
                                        continue;
                                    if (-1 !== r)
                                        s = c(this.styles, (e=>e.media), (e=>e.media && -1 !== e.prioritySelectorIndex && e.media.features[h] && e.media.features[a]), (e=>!e.media.features[h] && !e.media.features[a]));
                                    else {
                                        const t = [this.styles[n]];
                                        for (let s = n - 1; s >= e; s--) {
                                            const e = this.styles[s]
                                              , i = e.media
                                              , n = i.features[h]
                                              , l = i.features[a];
                                            if (!(n || l && l.value === d && e.hasWhere === o))
                                                break;
                                            t.unshift(e)
                                        }
                                        for (let e = 0; e < t.length; e++) {
                                            const i = t[e];
                                            if (!i.media.features[h]) {
                                                if (i.order >= l)
                                                    break;
                                                s = n - t.length + 2 + e
                                            }
                                        }
                                    }
                                    break
                                }
                            }
                    }
                    if (void 0 === s)
                        if (-1 === e)
                            s = i + 1;
                        else if (-1 !== r)
                            s = e + c(this.styles.slice(e), void 0, (e=>e.media.features[a] || e.media.features[h]));
                        else if (o) {
                            let t = e;
                            for (; t < this.styles.length; t++) {
                                const e = this.styles[t];
                                if (-1 !== e.prioritySelectorIndex || !e.hasWhere || e.order >= l) {
                                    s = t;
                                    break
                                }
                            }
                            void 0 === s && (s = t)
                        } else
                            for (let t = e; t <= i; t++) {
                                s = t;
                                const e = this.styles[t]
                                  , i = e.media;
                                if (-1 !== e.prioritySelectorIndex || i.features[a] || i.features[h])
                                    break;
                                if (e.hasWhere)
                                    s++;
                                else if (e.order >= l)
                                    break
                            }
                } else if (-1 === r)
                    if (o)
                        s = this.styles.findIndex((e=>!e.hasWhere || e.media || -1 !== e.prioritySelectorIndex || e.order >= l)),
                        -1 === s && (s = i + 1);
                    else {
                        let e = 0;
                        for (; e < this.styles.length; e++) {
                            const t = this.styles[e];
                            if (t.media || !t.hasWhere && (t.order >= l || -1 !== t.prioritySelectorIndex)) {
                                s = e;
                                break
                            }
                        }
                        void 0 === s && (s = e)
                    }
                else
                    s = c(this.styles, void 0, (e=>e.media));
                try {
                    if (this.element) {
                        const i = this.element.sheet;
                        i.insertRule(t, s),
                        e.cssRule = i.cssRules[s]
                    }
                    this.styles.splice(s, 0, e),
                    this.styleOfName[e.name] = e
                } catch (e) {}
            }
            delete(e) {
                const t = this.element.sheet
                  , s = e=>{
                    const s = this.styleOfName[e];
                    if (null == s ? void 0 : s.cssRule)
                        for (let e = 0; e < t.cssRules.length; e++) {
                            t.cssRules[e] === s.cssRule && (t.deleteRule(e),
                            this.styles.splice(e, 1),
                            delete this.styleOfName[s.name])
                        }
                }
                ;
                if (e in Style.classes)
                    for (const t of Style.classes[e])
                        t in this.countOfName || s(t);
                else
                    s(e)
            }
            findAndInsert(e) {
                const t = e=>{
                    const t = StyleSheet.findAndNew(e);
                    t && this.insert(t)
                }
                ;
                if (e in Style.classes)
                    for (const s of Style.classes[e])
                        t(s);
                else
                    t(e)
            }
        }
        function d(e) {
            const t = e.match(/.{1,2}/g);
            return [parseInt(t[0], 16), parseInt(t[1], 16), parseInt(t[2], 16)]
        }
        function m(e, t, s) {
            return ((1 << 24) + (e << 16) + (t << 8) + s).toString(16).slice(1)
        }
        StyleSheet.Styles = [],
        f && (window.MasterStyleSheet = StyleSheet);
        const p = "matches"
          , y = "semantics"
          , g = "symbol"
          , b = "max-width"
          , v = "min-width"
          , x = "motion"
          , k = "reduce"
          , O = "reduced-motion"
          , S = "::scrollbar"
          , N = "::slider-thumb"
          , w = "::slider-runnable-track"
          , j = "::search"
          , R = "::meter"
          , I = "::resizer"
          , W = "::progress"
          , E = "px"
          , A = ["!", "*", ">", "+", "~", ":", "[", "@", "_"]
          , T = [...A, void 0, "."]
          , M = {
            "(": ")",
            "'": "'"
        }
          , $ = new RegExp(S,"g")
          , _ = new RegExp(j,"g")
          , L = new RegExp(R,"g")
          , V = new RegExp(w,"g")
          , q = new RegExp(N,"g")
          , C = new RegExp(I,"g")
          , P = new RegExp(W,"g")
          , z = [];
        class Style {
            constructor(e, t) {
                this.name = e,
                this.matching = t,
                this.at = {},
                this.prioritySelectorIndex = -1;
                const i = this.constructor;
                if (void 0 === t && !(t = i.match(e)))
                    return;
                let r, o, {semantics: c, unit: a, colors: h, key: f, values: u, fixedSelector: d, colorful: m, breakpoints: T, mediaQueries: z} = i, Q = e;
                if (m || (h = null),
                t.origin === y)
                    r = t.value,
                    o = Q.slice(t.value.length),
                    this.value = c[t.value];
                else {
                    if (t.origin === p) {
                        const e = Q.indexOf(":");
                        this.prefix = Q.slice(0, e + 1),
                        this.prefix.includes("(") ? (this.prefix = void 0,
                        r = Q) : r = Q.slice(e + 1)
                    } else
                        t.origin === g && (this.symbol = Q[0],
                        r = Q.slice(1));
                    let e, s = "", i = [], l = 0;
                    !function t(o, c, f="") {
                        let u;
                        for (o && (")" === o && "$" === s.slice(-1) && (u = s.length - 1),
                        s += r[l++]); l < r.length; l++) {
                            const d = r[l];
                            if (d === o) {
                                s += d,
                                void 0 !== u && (s = s.slice(0, u) + s.slice(u).replace(/\$\((.*)\)/, "var(--$1)")),
                                c || ("'" === o ? i.push(s) : (e = n(s, a, h),
                                i.push(e.value + e.unit)),
                                f = "",
                                s = "");
                                break
                            }
                            if (d in M)
                                t(M[d], void 0 === c ? 0 : c + 1, f);
                            else if (";" !== d || "'" === o && "path" !== f) {
                                if (!o) {
                                    if ("." === d) {
                                        if (isNaN(+r[l + 1]))
                                            break;
                                        "-" === r[l - 1] && (s += "0")
                                    } else {
                                        if ("," === d) {
                                            e = n(s, a, h),
                                            i.push(e.value + e.unit, ","),
                                            s = "";
                                            continue
                                        }
                                        if ("#" === d && (s || i.length && ";" !== r[l - 1]) || A.includes(d))
                                            break
                                    }
                                    f += d
                                }
                                s += d
                            } else
                                o ? s += " " : (e = n(s, a, h),
                                i.push(e.value + e.unit),
                                s = "")
                        }
                    }(),
                    s && (e = n(s, a, h),
                    i.push(e.value + e.unit)),
                    o = r.slice(l),
                    1 === i.length ? e ? (this.value = e.value,
                    this.unit = e.unit) : (this.value = i[0],
                    this.unit = "") : this.value = i.join(" ")
                }
                o.includes(S) && (o = o.replace($, "::-webkit-scrollbar")),
                o.includes(j) && (o = o.replace(_, "::-webkit-search")),
                o.includes(N) && (o = o.replace(q, "::-webkit-slider-thumb")),
                o.includes(w) && (o = o.replace(V, "::-webkit-slider-runnable-track")),
                o.includes(R) && (o = o.replace(L, "::-webkit-meter")),
                o.includes(I) && (o = o.replace(C, "::-webkit-resizer")),
                o.includes(W) && (o = o.replace(P, "::-webkit-progress")),
                this.parseValue && (this.value = this.parseValue),
                u && this.value in u && (this.value = u[this.value]),
                "!" === o[0] && (this.important = !0,
                o = o.slice(1));
                const F = o.split("@");
                let B = F[0].replace(/\_/g, " ");
                if (B) {
                    this.hasWhere = B.includes(":where(");
                    for (let e = 0; e < l.length; e++)
                        if (B.includes(l[e])) {
                            this.prioritySelectorIndex = e;
                            break
                        }
                }
                this.selector = B;
                for (let e = 1; e < F.length; e++) {
                    const t = F[e];
                    if (t)
                        if (t.startsWith("dark") || t.startsWith("light"))
                            this.colorScheme = t;
                        else if ("rtl" === t || "ltr" === t)
                            this.direction = t;
                        else {
                            let e, s;
                            const i = t.indexOf("_");
                            if (-1 !== i)
                                e = t.slice(0, i),
                                s = t.slice(i);
                            else {
                                const i = t.indexOf("(");
                                -1 !== i && (e = t.slice(0, i),
                                s = t.slice(i))
                            }
                            if (!e) {
                                e = "media";
                                const i = [];
                                this.media = {
                                    token: t,
                                    features: {}
                                };
                                const l = t.split("&");
                                for (const e of l)
                                    if ("all" === e || "print" === e || "screen" === e || "speech" === e)
                                        this.media.type = e;
                                    else if ("🖨" === e)
                                        this.media.type = "print";
                                    else if ("landscape" === e || "portrait" === e)
                                        i.push("(orientation:" + e + ")");
                                    else if (e === x || e === O)
                                        i.push("(prefers-reduced-motion:" + (e === x ? "no-preference" : k) + ")");
                                    else if (e in z)
                                        i.push(z[e]);
                                    else {
                                        const t = {
                                            token: e
                                        };
                                        let s = ""
                                          , l = ""
                                          , r = 0;
                                        switch (e.startsWith("<=") ? (l = "<=",
                                        s = b) : e.startsWith(">=") || T[e] ? (l = ">=",
                                        s = v) : e.startsWith(">") ? (l = ">",
                                        s = v,
                                        r = .02) : e.startsWith("<") && (l = "<",
                                        s = b,
                                        r = -.02),
                                        s) {
                                        case b:
                                        case v:
                                            const o = l ? e.replace(l, "") : e
                                              , c = T[o];
                                            c ? Object.assign(t, n(c, E)) : Object.assign(t, n(o, E)),
                                            t.unit === E && (t.value += r),
                                            this.media.features[s] = t,
                                            i.push("(" + s + ":" + (t.value + t.unit) + ")")
                                        }
                                    }
                                s = "",
                                this.media.type && (s = this.media.type),
                                i.length && (s += (s ? " and " : "") + i.join(" and "))
                            }
                            s && (this.at[e] = s.replace(/\_/g, " "))
                        }
                }
                let D = "";
                this.colorScheme && (D += "." + this.colorScheme + " "),
                this.direction && (D += "[dir=" + this.direction + "] ");
                const G = (B ? B + " " : "") + (d || "");
                this.text = D + "." + CSS.escape(this.name) + G + (this.name in Style.relations ? Style.relations[this.name].map((e=>", " + D + "." + e + G)).join("") : "") + "{" + ("object" == typeof this.value ? Object.keys(this.value).map((e=>s(e, Object.assign(Object.assign({}, this), {
                    unit: "",
                    value: this.value[e]
                })))).join(";") : this.props ? Object.keys(this.props).map((e=>s(e, this.props[e]))).join(";") : s(f, this)) + "}";
                for (const e of Object.keys(this.at).sort(((e,t)=>"supports" === t ? -1 : 1)))
                    this.text = "@" + e + " " + this.at[e] + "{" + this.text + "}";
                void 0 === this.order && (this.order = 0)
            }
            static match(e) {
                if (this.semantics)
                    for (const t in this.semantics)
                        if (e === t || e.startsWith(t) && T.includes(e[t.length]))
                            return {
                                origin: y,
                                value: t
                            };
                return this.matches && this.matches.test(e) || this.colorStarts && (e.match("^" + this.colorStarts + "(#|(rgb|hsl)\\(.*\\))((?!;).)*$") || this.colorNames.length && e.match("^" + this.colorStarts + "(" + this.colorNames.join("|") + ")") && -1 === e.indexOf(";")) ? {
                    origin: p
                } : this.symbol && e.startsWith(this.symbol) ? {
                    origin: g
                } : this.key && e.startsWith(this.key + ":") ? {
                    origin: p
                } : void 0
            }
            static extend(e, t, s=!0) {
                if (!t)
                    return;
                const i = (e,s,i)=>{
                    var n;
                    for (const l in t) {
                        const r = t[l];
                        null == r ? l in e && (null == i || i(l),
                        delete e[l]) : e[l] = null !== (n = null == s ? void 0 : s(l, r)) && void 0 !== n ? n : r
                    }
                }
                ;
                switch (e) {
                case "classes":
                    i(this.classes, ((e,t)=>{
                        if (e in this.classes)
                            for (const t in this.relations) {
                                const s = this.relations[t]
                                  , i = s.indexOf(e);
                                -1 !== i && (s.length > 1 ? s.splice(i, 1) : delete this.relations[t])
                            }
                        const s = Array.isArray(t) ? t : t.replace(/(?:\n(?:\s*))+/g, " ").trim().split(" ");
                        for (const t of s)
                            t in this.relations ? this.relations[t].push(e) : this.relations[t] = [e];
                        return s
                    }
                    ), (e=>{
                        for (const t of this.classes[e]) {
                            const s = this.relations[t];
                            s.length > 1 ? s.splice(s.indexOf(e), 1) : delete this.relations[t]
                        }
                    }
                    ));
                    break;
                case "colors":
                    i(this.colors, ((e,t)=>{
                        const s = this.colorNames.indexOf(e);
                        -1 !== s ? null == F || F.deleteRule(s) : this.colorNames.push(e);
                        const i = {};
                        "string" == typeof t && (t = {
                            "": t
                        });
                        const n = ""in t;
                        n && (i[""] = d(t[""]).join(" "));
                        let l = !1;
                        for (const e in t)
                            if (e && +e >= 100) {
                                l = !0;
                                break
                            }
                        if (l)
                            for (const e in t)
                                i[e] = d(t[e]).join(" ");
                        else if (!n || Object.keys(t).length > 1) {
                            let e, s, n = 0, l = "0"in t ? d(t[0]) : [255, 255, 255];
                            const r = []
                              , o = ()=>{
                                const o = e - n
                                  , c = s.map(((e,t)=>(e - l[t]) / o));
                                for (const e of r) {
                                    const s = e - n
                                      , r = l.map(((e,t)=>Math.round(e + c[t] * s)));
                                    i[e] = r.join(" "),
                                    t[e] = m.call(this, ...r)
                                }
                            }
                            ;
                            for (let c = 1; c < 100; c++) {
                                const a = c % 2 == 0;
                                c in t ? (r.length ? (e = c,
                                s = d(t[c]),
                                o(),
                                r.length = 0,
                                l = s) : l = d(t[c]),
                                n = c,
                                a && (i[c] = l.join(" "))) : a && r.push(c)
                            }
                            r.length && (e = 100,
                            s = "100"in t ? d(t[100]) : [0, 0, 0],
                            o())
                        }
                        if (!n) {
                            const e = t[l ? "500" : "50"];
                            t[""] = e,
                            i[""] = d(e).join(" ")
                        }
                        return null == F || F.insertRule(function(e, t) {
                            let s = ":root{";
                            for (const i in t)
                                s += "--" + e + (i ? "-" + i : "") + ":" + t[i] + ";";
                            return s += "}",
                            s
                        }(e, i), -1 === s ? Object.keys(this.colors).length : s),
                        this.rgbColors[e] = i,
                        t
                    }
                    ), (e=>{
                        const t = this.colorNames.indexOf(e);
                        -1 !== t && this.colorNames.splice(t, 1),
                        null == F || F.deleteRule(t),
                        delete this.rgbColors[e]
                    }
                    ));
                    break;
                default:
                    let t = this[e];
                    t || (t = this[e] = {}),
                    i(t)
                }
                s && StyleSheet.refresh()
            }
        }
        let Q, F;
        if (Style.unit = "rem",
        Style.rgbColors = {},
        Style.mediaQueries = {},
        Style.sheets = z,
        Style.colors = {},
        Style.classes = {},
        Style.colorNames = [],
        Style.relations = {},
        "undefined" != typeof window && (window.MasterStyle = Style),
        "undefined" != typeof document) {
            const e = document.head.querySelector('[id="master-colors"]');
            if (e) {
                const t = document.head.querySelector('[name="master:colors"]');
                if (t && t.content) {
                    Q = e;
                    const s = {}
                      , i = t.content.split(",");
                    for (let e = 0; e < Q.sheet.cssRules.length; e++) {
                        const t = Q.sheet.cssRules[e].cssText.slice(8, -1).split(";").slice(0, -1);
                        if (t.length) {
                            const n = i[e]
                              , l = n.length + 2
                              , r = {};
                            for (const e of t) {
                                let[t,s] = e.split(":");
                                t = t.trim().slice(l),
                                t && (t = t.slice(1)),
                                r[t] = m.call(void 0, ...s.split(" ").map((e=>+e)))
                            }
                            s[n] = r
                        }
                    }
                    Style.extend("colors", s),
                    F = Q.sheet
                }
            }
            Q || (Q = document.createElement("style"),
            Q.id = "master-colors",
            document.head.prepend(Q),
            F = Q.sheet)
        }
        return t
    }
    )()
}
));


!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("@master/style")) : "function" == typeof define && define.amd ? define(["@master/style"], t) : "object" == typeof exports ? exports["@master/styles"] = t(require("@master/style")) : e["@master/styles"] = t(e["@master/style"])
}(this, (function(e) {
    return (()=>{
        "use strict";
        var t = {
            955: (e,t,s)=>{
                s.d(t, {
                    breakpoints: ()=>breakpoints
                });
                const breakpoints = {
                    "3xs": 360,
                    "2xs": 480,
                    xs: 600,
                    sm: 768,
                    md: 1024,
                    lg: 1280,
                    xl: 1440,
                    "2xl": 1600,
                    "3xl": 1920,
                    "4xl": 2560
                }
            }
            ,
            563: (e,t,s)=>{
                s.d(t, {
                    colors: ()=>colors
                });
                const colors = {
                    fade: {
                        10: "f4f4f6",
                        20: "c3c6cf",
                        30: "a6abb8",
                        40: "878d9f",
                        50: "63697c",
                        60: "4c515f",
                        70: "363944",
                        80: "24262d",
                        90: "131518"
                    },
                    gray: {
                        10: "f4f4f6",
                        20: "c6c6c8",
                        30: "aaaaac",
                        40: "8d8d8f",
                        50: "6a6a6c",
                        60: "515153",
                        70: "39393b",
                        80: "242424",
                        90: "151515"
                    },
                    brown: {
                        10: "f8f3f1",
                        20: "d8c2b8",
                        30: "c4a394",
                        40: "af836e",
                        50: "8a604c",
                        60: "6a4a3a",
                        70: "4b3429",
                        80: "31221b",
                        90: "1c130f"
                    },
                    orange: {
                        10: "fcf1e7",
                        20: "efbd92",
                        30: "e79855",
                        40: "d5731e",
                        50: "a15717",
                        60: "7c4312",
                        70: "582f0d",
                        80: "3a1f08",
                        90: "221205"
                    },
                    gold: {
                        10: "fff3da",
                        20: "ffba30",
                        30: "e89a00",
                        40: "c08000",
                        50: "906000",
                        60: "6e4900",
                        70: "4e3400",
                        80: "342300",
                        90: "1e1400"
                    },
                    yellow: {
                        10: "fff5ca",
                        20: "f0c100",
                        30: "d0a700",
                        40: "ac8a00",
                        50: "806700",
                        60: "634f00",
                        70: "473800",
                        80: "2f2500",
                        90: "1b1500"
                    },
                    grass: {
                        10: "ebfad4",
                        20: "92da1a",
                        30: "7dbc17",
                        40: "689c13",
                        50: "4e750e",
                        60: "3c5a0b",
                        70: "2a4008",
                        80: "1c2a05",
                        90: "101803"
                    },
                    green: {
                        10: "d5fde5",
                        20: "0be561",
                        30: "0ac553",
                        40: "08a345",
                        50: "067b34",
                        60: "055f28",
                        70: "03441d",
                        80: "022d13",
                        90: "011a0b"
                    },
                    beryl: {
                        10: "c9ffee",
                        20: "00e19c",
                        30: "00c387",
                        40: "00a170",
                        50: "007954",
                        60: "005d41",
                        70: "00432f",
                        80: "002b1f",
                        90: "001912"
                    },
                    teal: {
                        10: "c5fffb",
                        20: "00ddce",
                        30: "00bfb2",
                        40: "009f94",
                        50: "00776f",
                        60: "005b55",
                        70: "00413d",
                        80: "002b28",
                        90: "001918"
                    },
                    cyan: {
                        10: "dff8ff",
                        20: "3dd7ff",
                        30: "00b9e9",
                        40: "0099c1",
                        50: "007391",
                        60: "005973",
                        70: "003f51",
                        80: "002a35",
                        90: "00181f"
                    },
                    sky: {
                        10: "eaf6fe",
                        20: "8ccefa",
                        30: "4db3f7",
                        40: "0b92ee",
                        50: "086eb3",
                        60: "065489",
                        70: "043c61",
                        80: "032841",
                        90: "021726"
                    },
                    blue: {
                        10: "edf4fe",
                        20: "a5c7fd",
                        30: "81acf3",
                        40: "538cee",
                        50: "175fe9",
                        60: "1344c4",
                        70: "0d318d",
                        80: "09205e",
                        90: "051338"
                    },
                    indigo: {
                        10: "f1f2ff",
                        20: "bfc2f4",
                        30: "a1a5ee",
                        40: "7d84e8",
                        50: "5a5bd5",
                        60: "4835cc",
                        70: "332592",
                        80: "24195e",
                        90: "161031"
                    },
                    violet: {
                        10: "f5f1ff",
                        20: "d0bdfb",
                        30: "b89bf9",
                        40: "9e77f5",
                        50: "7949e5",
                        60: "641ed2",
                        70: "491595",
                        80: "310e63",
                        90: "1f0839"
                    },
                    purple: {
                        10: "f9f0ff",
                        20: "dcbaf6",
                        30: "ca96f1",
                        40: "b56cec",
                        50: "9832e4",
                        60: "7719bd",
                        70: "551287",
                        80: "390c5b",
                        90: "220736"
                    },
                    fuchsia: {
                        10: "feefff",
                        20: "f1b1f3",
                        30: "ea86ed",
                        40: "e04ee5",
                        50: "b61cbb",
                        60: "8e1691",
                        70: "68105f",
                        80: "470b3d",
                        90: "2b0720"
                    },
                    pink: {
                        10: "fff0f8",
                        20: "f7b2d6",
                        30: "f388c0",
                        40: "ee52a3",
                        50: "ca1473",
                        60: "9d1059",
                        70: "720c40",
                        80: "4c082b",
                        90: "2d0519"
                    },
                    crimson: {
                        10: "fff1f4",
                        20: "ffb1c6",
                        30: "f58ba7",
                        40: "ea5b82",
                        50: "ce1a4b",
                        60: "a20d35",
                        70: "780522",
                        80: "500317",
                        90: "33020f"
                    },
                    red: {
                        10: "fff1f1",
                        20: "fdb3b5",
                        30: "fa8b8d",
                        40: "eb5f63",
                        50: "d11a1e",
                        60: "a60708",
                        70: "780506",
                        80: "530001",
                        90: "350001"
                    },
                    black: "000000",
                    white: "ffffff"
                }
            }
            ,
            34: t=>{
                t.exports = e
            }
        }
          , s = {};
        function r(e) {
            var a = s[e];
            if (void 0 !== a)
                return a.exports;
            var l = s[e] = {
                exports: {}
            };
            return t[e](l, l.exports, r),
            l.exports
        }
        r.d = (e,t)=>{
            for (var s in t)
                r.o(t, s) && !r.o(e, s) && Object.defineProperty(e, s, {
                    enumerable: !0,
                    get: t[s]
                })
        }
        ,
        r.o = (e,t)=>Object.prototype.hasOwnProperty.call(e, t),
        r.r = e=>{
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ;
        var a = {};
        return (()=>{
            r.r(a),
            r.d(a, {
                Styles: ()=>Styles,
                breakpoints: ()=>breakpoints.breakpoints,
                colors: ()=>colors.colors,
                init: ()=>init
            });
            var e = r(34);
            const t = (...e)=>e.join("-")
              , s = "border"
              , l = "radius"
              , i = "margin"
              , n = "padding"
              , c = "font"
              , o = ","
              , d = "flow"
              , y = "template"
              , h = "column"
              , u = "columns"
              , x = "gap"
              , f = "row"
              , p = "rows"
              , m = "shadow"
              , b = "user"
              , g = "content"
              , k = "image"
              , S = "stroke"
              , v = "filter"
              , w = "blend"
              , j = "background"
              , O = "repeat"
              , $ = "color"
              , z = "scroll"
              , M = "animation"
              , N = "direction"
              , P = "mode"
              , q = "behavior"
              , V = t("overscroll", q)
              , C = "y"
              , Z = "x"
              , T = "height"
              , W = "width"
              , X = "max"
              , Y = "min"
              , _ = "block"
              , A = "inline"
              , B = "flex"
              , E = "grid"
              , F = "transition"
              , L = "origin"
              , R = "delay"
              , U = "rotate"
              , D = "deg"
              , G = "timing-function"
              , H = "duration"
              , I = "display"
              , J = "hidden"
              , K = "box"
              , Q = "fill"
              , ee = "clip"
              , te = "none"
              , se = "text"
              , re = "align"
              , ae = "transform"
              , le = "vertical"
              , ie = "word"
              , ne = "space"
              , ce = "decoration"
              , oe = "break"
              , de = "size"
              , ye = "auto"
              , he = "line"
              , ue = "object"
              , xe = "position"
              , fe = "rem"
              , pe = "style"
              , me = "smoothing"
              , be = "antialiased"
              , ge = "spacing"
              , ke = t("letter", ge)
              , Se = t(X, W)
              , ve = t(Y, W)
              , we = t(X, T)
              , je = t(Y, T)
              , Oe = "table"
              , $e = "list"
              , ze = "span"
              , Me = "justify"
              , Ne = "items"
              , Pe = "self"
              , qe = "place"
              , Ve = "type"
              , Ce = "offset"
              , Ze = "outline"
              , Te = "snap"
              , We = "shape"
              , Xe = "view"
              , Ye = "area"
              , _e = "start"
              , Ae = "blur"
              , Be = "drop"
              , Ee = {
                full: "100%",
                fit: t("fit", g),
                max: t(X, g),
                min: t(Y, g)
            };
            class Fe extends e.Style {
            }
            Fe.matches = /^f(ont)?:(thin|extralight|light|regular|medium|semibold|bold|extrabold|heavy)(?!;)/,
            Fe.key = t(c, "weight"),
            Fe.unit = "",
            Fe.values = {
                thin: 100,
                extralight: 200,
                light: 300,
                regular: 400,
                medium: 500,
                semibold: 600,
                bold: 700,
                extrabold: 800,
                heavy: 900
            };
            const Le = "var(--font-";
            class Re extends e.Style {
            }
            Re.matches = /^f(ont)?:(mono|sans|serif)(?!;)/,
            Re.key = t(c, "family"),
            Re.values = {
                mono: Le + "mono)",
                sans: Le + "sans)",
                serif: Le + "serif)"
            };
            class Ue extends e.Style {
            }
            Ue.matches = /^f(ont)?:([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$/,
            Ue.key = t(c, de);
            const De = "top"
              , Ge = "bottom"
              , He = "left"
              , Ie = "right"
              , Je = "l"
              , Ke = "r"
              , Qe = "t"
              , et = "b"
              , tt = "x"
              , st = "y";
            class rt extends e.Style {
                get props() {
                    const e = "m" === this.prefix[0] ? i : n
                      , s = t(e, He)
                      , r = t(e, Ie)
                      , a = t(e, De)
                      , l = t(e, Ge);
                    switch (this.prefix[1]) {
                    case tt:
                        return {
                            [s]: this,
                            [r]: this
                        };
                    case st:
                        return {
                            [a]: this,
                            [l]: this
                        };
                    case Je:
                        return {
                            [s]: this
                        };
                    case Ke:
                        return {
                            [r]: this
                        };
                    case Qe:
                        return {
                            [a]: this
                        };
                    case et:
                        return {
                            [l]: this
                        };
                    default:
                        return {
                            [e]: this
                        }
                    }
                }
                get order() {
                    return "p:" === this.prefix || "m:" === this.prefix ? -1 : 0
                }
            }
            rt.id = "spacing",
            rt.matches = /^[pm][xytblr]?:./;
            class at extends e.Style {
            }
            at.matches = /^w:./,
            at.key = W,
            at.values = Ee;
            class lt extends e.Style {
            }
            lt.matches = /^h:./,
            lt.key = T,
            lt.values = Ee;
            class it extends e.Style {
            }
            it.matches = /^min-w:./,
            it.key = ve,
            it.values = Ee;
            class nt extends e.Style {
            }
            nt.matches = /^min-h:./,
            nt.key = je,
            nt.values = Ee;
            class ct extends e.Style {
            }
            ct.matches = /^ls:./,
            ct.key = ke,
            ct.unit = "em";
            const ot = t("subpixel", be)
              , dt = t("-webkit-font", me)
              , yt = t("-moz-osxfont", me);
            class ht extends e.Style {
                get props() {
                    const e = {};
                    switch (this.value) {
                    case ot:
                        e[dt] = e[yt] = Object.assign(Object.assign({}, this), {
                            value: ye
                        });
                        break;
                    case be:
                        e[dt] = Object.assign(Object.assign({}, this), {
                            value: be
                        }),
                        e[yt] = Object.assign(Object.assign({}, this), {
                            value: "grayscale"
                        })
                    }
                    return e
                }
            }
            ht.id = "fontSmoothing",
            ht.matches = /^f(ont)?:(antialiased|subpixel-antialiased)(?!;)/,
            ht.unit = "";
            class ut extends e.Style {
            }
            ut.matches = /^f(ont)?:(normal|italic|oblique)(?!;)/,
            ut.key = t(c, pe),
            ut.unit = "deg";
            class xt extends e.Style {
            }
            xt.matches = /^f(ont)?:(ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions)(?!;)/,
            xt.key = t(c, "variant", "numeric");
            class ft extends e.Style {
            }
            ft.matches = /^lh:./,
            ft.key = t(he, T),
            ft.unit = "";
            class pt extends e.Style {
            }
            pt.matches = /^(object|obj):(contain|cover|fill|scale-down)/,
            pt.key = t(ue, "fit");
            class mt extends e.Style {
            }
            mt.matches = /^(object|obj):(top|bottom|right|left|center)/,
            mt.key = t(ue, xe);
            class bt extends e.Style {
            }
            bt.matches = /^t(ext)?:(justify|center|left|right|start|end)(?!;)/,
            bt.key = t(se, re);
            class gt extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            gt.matches = /^t(ext)?:(underline|line-through|overline)/,
            gt.key = t(se, ce),
            gt.colorful = !0;
            class kt extends e.Style {
            }
            kt.matches = /^t(ext)?:(uppercase|lowercase|capitalize)(?!;)/,
            kt.key = t(se, ae);
            class St extends e.Style {
            }
            St.matches = /^v:./,
            St.key = t(le, re);
            class vt extends e.Style {
                get props() {
                    return {
                        overflow: Object.assign(Object.assign({}, this), {
                            value: J
                        }),
                        display: Object.assign(Object.assign({}, this), {
                            value: "-webkit-box"
                        }),
                        "overflow-wrap": Object.assign(Object.assign({}, this), {
                            value: t(oe, ie)
                        }),
                        "text-overflow": Object.assign(Object.assign({}, this), {
                            value: "ellipsis"
                        }),
                        "-webkit-box-orient": Object.assign(Object.assign({}, this), {
                            value: le
                        }),
                        "-webkit-line-clamp": this
                    }
                }
            }
            vt.id = "lines",
            vt.matches = /^lines:./,
            vt.unit = "";
            class wt extends e.Style {
            }
            wt.matches = /^transform:((top|bottom|right|left|center)|\d)/,
            wt.key = t(ae, L),
            wt.unit = "px";
            class jt extends e.Style {
            }
            jt.matches = /^transform:(flat|preserve-3d)(?!;)/,
            jt.key = t(ae, pe);
            class Ot extends e.Style {
            }
            Ot.matches = /^transform:(content|border|fill|stroke|view)(?!;)/,
            Ot.key = t(ae, K),
            Ot.values = {
                content: t(g, K),
                border: t(s, K),
                fill: t(Q, K),
                stroke: t(S, K),
                view: t(Xe, K)
            };
            class $t extends e.Style {
                get parseValue() {
                    return this.value.replace(/(translate|scale|skew|rotate|perspective|matrix)(3d|[XYZ])?\((.*?)\)/g, ((e,t,s,r)=>{
                        let a, l;
                        switch (t) {
                        case "translate":
                            a = fe;
                            break;
                        case "skew":
                            a = D;
                            break;
                        case U:
                            "3d" === s && (l = !0),
                            a = D;
                            break;
                        default:
                            return e
                        }
                        const i = r.split(",");
                        return e.replace(r, i.map(((e,t)=>{
                            if (l && i.length - 1 !== t)
                                return e;
                            return Number.isNaN(+e) ? e : e / (a === fe ? 16 : 1) + a
                        }
                        )).join(","))
                    }
                    ))
                }
            }
            $t.matches = /^(translate|scale|skew|rotate|perspective|matrix)(3d|[XYZ])?\(/,
            $t.key = ae,
            $t.unit = "";
            class zt extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            zt.symbol = "~",
            zt.key = F;
            class Mt extends e.Style {
            }
            Mt.matches = /^~delay:./,
            Mt.key = t(F, R),
            Mt.unit = "ms";
            class Nt extends e.Style {
            }
            Nt.matches = /^~duration:./,
            Nt.key = t(F, H),
            Nt.unit = "ms";
            class Pt extends e.Style {
            }
            Pt.matches = /^~property:./,
            Pt.key = t(F, "property");
            class qt extends e.Style {
            }
            qt.matches = /^~easing:./,
            qt.key = t(F, G);
            class Vt extends e.Style {
            }
            Vt.matches = /^max-h:./,
            Vt.key = we,
            Vt.values = Ee;
            class Ct extends e.Style {
            }
            Ct.matches = /^max-w:./,
            Ct.key = Se,
            Ct.values = Ee;
            class Zt extends e.Style {
            }
            Zt.matches = /^d:./,
            Zt.key = I,
            Zt.semantics = {
                hidden: te,
                hide: te,
                block: _,
                table: Oe,
                flex: B,
                grid: E,
                contents: "contents",
                "inline-block": t(A, _),
                "inline-flex": t(A, B),
                "inline-grid": t(A, E),
                "inline-table": t(A, Oe)
            };
            class Tt extends e.Style {
            }
            Tt.matches = /^box:(content|border)(?!;)/,
            Tt.key = t(K, "sizing"),
            Tt.values = {
                content: t(g, K),
                border: t(s, K)
            };
            class Wt extends e.Style {
            }
            Wt.key = "opacity",
            Wt.unit = "";
            class Xt extends e.Style {
            }
            Xt.key = "visibility",
            Xt.semantics = {
                visible: "visible",
                invisible: J
            };
            class Yt extends e.Style {
            }
            Yt.key = "clear";
            class _t extends e.Style {
            }
            _t.key = "float";
            class At extends e.Style {
            }
            At.key = "isolation",
            At.semantics = {
                isolate: "isolate"
            };
            class Bt extends e.Style {
                get props() {
                    switch (this.prefix.slice(-2, -1)) {
                    case Z:
                        return {
                            "overflow-x": this
                        };
                    case C:
                        return {
                            "overflow-y": this
                        };
                    default:
                        return {
                            overflow: this
                        }
                    }
                }
                get order() {
                    switch (this.prefix.slice(-2, -1)) {
                    case Z:
                    case C:
                        return 0;
                    default:
                        return -1
                    }
                }
            }
            Bt.id = "overflow",
            Bt.matches = /^(overflow|ovf)(-x|-y)?:./;
            class Et extends e.Style {
                get props() {
                    switch (this.prefix.slice(-2, -1)) {
                    case Z:
                        return {
                            [t(V, Z)]: this
                        };
                    case C:
                        return {
                            [t(V, C)]: this
                        };
                    default:
                        return {
                            [V]: this
                        }
                    }
                }
            }
            Et.id = "overscrollBehavior",
            Et.matches = /^overscroll-behavior(?:-[xy])?:/;
            class Ft extends e.Style {
            }
            Ft.matches = /^z:./,
            Ft.key = "z-index",
            Ft.unit = "";
            class Lt extends e.Style {
            }
            Lt.matches = /^\@delay:./,
            Lt.key = t(M, R),
            Lt.unit = "ms";
            class Rt extends e.Style {
            }
            Rt.matches = /^\@direction:./,
            Rt.key = t(M, N);
            class Ut extends e.Style {
            }
            Ut.matches = /^\@fill-mode:./,
            Ut.key = t(M, Q, P);
            class Dt extends e.Style {
            }
            Dt.matches = /^\@iteration-count:./,
            Dt.key = t(M, "iteration", "count"),
            Dt.unit = "";
            class Gt extends e.Style {
            }
            Gt.matches = /^\@name:./,
            Gt.key = t(M, "name");
            class Ht extends e.Style {
            }
            Ht.matches = /^\@play-state:./,
            Ht.key = t(M, "play-state");
            class It extends e.Style {
            }
            It.matches = /^\@easing:./,
            It.key = t(M, G);
            class Jt extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            Jt.symbol = "@",
            Jt.key = M,
            Jt.unit = "";
            function Kt(e, t, r="") {
                r && (r = "-" + r);
                const a = "border-left" + r
                  , l = "border-right" + r
                  , i = "border-top" + r
                  , n = "border-bottom" + r;
                switch (/^b(order)?-?(.)?/.exec(e)[2]) {
                case tt:
                    return {
                        [a]: t,
                        [l]: t
                    };
                case st:
                    return {
                        [i]: t,
                        [n]: t
                    };
                case Je:
                    return {
                        [a]: t
                    };
                case Ke:
                    return {
                        [l]: t
                    };
                case Qe:
                    return {
                        [i]: t
                    };
                case et:
                    return {
                        [n]: t
                    };
                default:
                    return {
                        [s + r]: t
                    }
                }
            }
            class Qt extends e.Style {
                get props() {
                    return Kt(this.prefix, this, $)
                }
                get order() {
                    return this.prefix === t(s, $) + ":" || "b:" === this.prefix || "border:" === this.prefix ? -1 : 0
                }
            }
            Qt.id = "borderColor",
            Qt.matches = /^border(-(left|right|top|bottom))?-color:./,
            Qt.colorStarts = "b([xytblr]|(order(-(left|right|top|bottom))?))?:",
            Qt.colorful = !0;
            const es = t(s, De, He, l)
              , ts = t(s, De, Ie, l)
              , ss = t(s, Ge, He, l)
              , rs = t(s, Ge, Ie, l)
              , as = t(s, l)
              , ls = [es, ts, ss, rs];
            class is extends e.Style {
                get props() {
                    var e;
                    if (this.prefix) {
                        let e = "";
                        const t = this.prefix.split("-");
                        if (t.length > 1)
                            for (let s = 1; s < t.length - 1; s++)
                                e += t[s][0];
                        else
                            e = this.prefix.slice(1, -1);
                        switch (e) {
                        case Qe:
                            return {
                                [es]: this,
                                [ts]: this
                            };
                        case "tl":
                        case "lt":
                            return {
                                [es]: this
                            };
                        case "rt":
                        case "tr":
                            return {
                                [ts]: this
                            };
                        case et:
                            return {
                                [ss]: this,
                                [rs]: this
                            };
                        case "bl":
                        case "lb":
                            return {
                                [ss]: this
                            };
                        case "br":
                        case "rb":
                            return {
                                [rs]: this
                            };
                        case Je:
                            return {
                                [es]: this,
                                [ss]: this
                            };
                        case Ke:
                            return {
                                [ts]: this,
                                [rs]: this
                            };
                        default:
                            return {
                                [as]: this
                            }
                        }
                    }
                    const t = null === (e = this.prefix) || void 0 === e ? void 0 : e.slice(0, -1);
                    return {
                        [ls.includes(t) ? t : as]: this
                    }
                }
                get order() {
                    return this.prefix === t(s, l) + ":" || "r:" === this.prefix ? -1 : 0
                }
            }
            is.id = "borderRadius",
            is.matches = /^((r[tblr]?[tblr]?|border(-(top|bottom)-(left|right))?-radius):.)/,
            is.semantics = {
                rounded: "1e9em",
                round: "50%"
            };
            class ns extends e.Style {
                get props() {
                    return Kt(this.prefix, this, pe)
                }
                get order() {
                    return this.prefix === t(s, pe) + ":" || "b:" === this.prefix || "border:" === this.prefix ? -1 : 0
                }
            }
            ns.id = "borderStyle",
            ns.matches = /^(border(-(left|right|top|bottom))?-style:.|b([xytblr]|order(-(left|right|top|bottom))?)?:(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)(?!;))/;
            class cs extends e.Style {
                get props() {
                    return Kt(this.prefix, this, W)
                }
                get order() {
                    return this.prefix === t(s, W) + ":" || "b:" === this.prefix || "border:" === this.prefix ? -1 : 0
                }
            }
            cs.id = "borderWidth",
            cs.matches = /^(border(-(left|right|top|bottom))?-width:.|b([xytblr]|order(-(left|right|top|bottom))?)?:(([0-9]|(max|min|calc|clamp)\(.*\))|(max|min|calc|clamp)\(.*\))((?!;).)*$)/;
            class os extends e.Style {
                get props() {
                    return Kt(this.prefix, this)
                }
                get order() {
                    return "border:" === this.prefix || "b:" === this.prefix ? -2 : -1
                }
            }
            os.id = "border",
            os.matches = /^b([xytblr]?|order(-(left|right|top|bottom))?):./,
            os.colorful = !0;
            class ds extends e.Style {
            }
            ds.matches = /^(bg|background):(fixed|local|scroll)(?!;)/,
            ds.key = t(j, "attachment");
            class ys extends e.Style {
            }
            ys.key = t(j, w, P);
            class hs extends e.Style {
                get props() {
                    return {
                        "-webkit-background-clip": this,
                        "background-clip": this
                    }
                }
            }
            hs.matches = /^(bg|background):text(?!;)/,
            hs.key = t(j, ee);
            class us extends e.Style {
            }
            us.matches = /^(bg|background):transparent(?!;)/,
            us.colorStarts = "(bg|background):",
            us.key = t(j, $),
            us.unit = "",
            us.colorful = !0;
            class xs extends e.Style {
            }
            xs.matches = /^(bg|background):(content|border|padding)(?!;)/,
            xs.key = t(j, L),
            xs.values = {
                content: t(g, K),
                border: t(s, K),
                padding: t(n, K)
            };
            class fs extends e.Style {
            }
            fs.matches = /^(bg|background):(top|bottom|right|left|center)(?!;)/,
            fs.key = t(j, xe),
            fs.unit = "px";
            class ps extends e.Style {
            }
            ps.matches = /^(bg|background):(space|round|repeat|no-repeat|repeat-x|repeat-y)(?![;a-zA-Z])/,
            ps.key = t(j, O);
            class ms extends e.Style {
            }
            ms.matches = /^(bg|background):((auto|cover|contain)(?!;)|\.?\d((?!;).)*$)/,
            ms.key = t(j, de);
            class bs extends e.Style {
            }
            bs.matches = /^(bg|background):(url|linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|conic-gradient)\(.*\)((?!;).)*$/,
            bs.key = t(j, k);
            class gs extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            gs.matches = /^bg:./,
            gs.key = j,
            gs.colorful = !0;
            class ks extends e.Style {
            }
            ks.matches = /^blend:./,
            ks.key = t("mix", w, P);
            class Ss extends e.Style {
            }
            Ss.key = xe,
            Ss.values = {
                abs: "absolute",
                rel: "relative"
            },
            Ss.semantics = {
                static: "static",
                fixed: "fixed",
                abs: "absolute",
                rel: "relative",
                sticky: "sticky"
            };
            class vs extends e.Style {
                get props() {
                    const e = this.prefix.slice(0, -1);
                    switch (e) {
                    case De:
                    case He:
                    case Ie:
                    case Ge:
                        return {
                            [e]: this
                        };
                    case "center":
                        return {
                            left: this,
                            right: this,
                            "margin-left": Object.assign(Object.assign({}, this), {
                                unit: ""
                            }),
                            "margin-right": Object.assign(Object.assign({}, this), {
                                unit: ""
                            })
                        };
                    case "middle":
                        return {
                            top: this,
                            bottom: this,
                            "margin-top": Object.assign(Object.assign({}, this), {
                                unit: ""
                            }),
                            "margin-bottom": Object.assign(Object.assign({}, this), {
                                unit: ""
                            })
                        }
                    }
                }
            }
            function ws(e, t) {
                let s = ""
                  , r = 0;
                return function a(l, i) {
                    let n = "";
                    const c = i ? t(i) : ""
                      , o = ()=>{
                        n && (s += !c || Number.isNaN(+n) ? n : +n / (c === fe ? 16 : 1) + c,
                        n = "")
                    }
                    ;
                    for (; r < e.length; r++) {
                        const t = e[r];
                        if (t === l && ("'" !== l || ")" === e[r + 1])) {
                            o(),
                            s += t;
                            break
                        }
                        "," === t || " " === t ? (o(),
                        s += t) : n || "'" !== t ? n && "(" === t ? (s += n + t,
                        r++,
                        a(")", n),
                        n = "") : n += t : (s += t,
                        r++,
                        a(t),
                        n = "")
                    }
                    o()
                }(),
                s
            }
            vs.matches = /^(top|left|right|bottom|center|middle):./;
            class js extends e.Style {
                get props() {
                    return {
                        "backdrop-filter": this,
                        "-webkit-backdrop-filter": this
                    }
                }
                get parseValue() {
                    return ws(this.value, (e=>{
                        switch (e) {
                        case Ae:
                        case t(Be, m):
                            return fe;
                        case t("hue", U):
                            return D
                        }
                        return ""
                    }
                    ))
                }
            }
            js.matches = /^bd:./,
            js.key = t("backdrop", v);
            class Os extends e.Style {
            }
            Os.key = Q,
            Os.colorStarts = "fill:",
            Os.colorful = !0;
            class $s extends e.Style {
            }
            $s.key = S,
            $s.colorful = !0;
            class zs extends e.Style {
            }
            zs.matches = /^stroke:([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$/,
            zs.key = t(S, W);
            class Ms extends e.Style {
                get parseValue() {
                    return ws(this.value, (e=>{
                        switch (e) {
                        case Ae:
                        case t(Be, m):
                            return fe;
                        case t("hue", U):
                            return D
                        }
                        return ""
                    }
                    ))
                }
            }
            Ms.matches = /^(blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|opacity|saturate|sepia)\(/,
            Ms.key = v;
            class Ns extends e.Style {
            }
            Ns.key = "cursor";
            class Ps extends e.Style {
            }
            Ps.key = t("pointer", "events");
            class qs extends e.Style {
            }
            qs.key = "resize";
            class Vs extends e.Style {
            }
            Vs.key = t("touch", "action");
            class Cs extends e.Style {
                get props() {
                    return {
                        "user-drag": this,
                        "-webkit-user-drag": this
                    }
                }
            }
            Cs.key = t(b, "drag");
            class Zs extends e.Style {
                get props() {
                    return {
                        "user-select": this,
                        "-webkit-user-select": this
                    }
                }
            }
            Zs.key = t(b, "select");
            class Ts extends e.Style {
            }
            Ts.matches = /^s(?:hadow)?:./,
            Ts.key = t(K, m),
            Ts.colorful = !0;
            class Ws extends e.Style {
            }
            Ws.key = t(se, m);
            class Xs extends e.Style {
                get props() {
                    return {
                        "font-size": this,
                        "line-height": Object.assign(Object.assign({}, this), {
                            value: this.unit === fe ? this.value + .375 + this.unit : "calc(" + this.value + this.unit + " + .375rem)",
                            unit: ""
                        })
                    }
                }
            }
            Xs.id = "textSize",
            Xs.matches = /^t(ext)?:([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$/;
            class Ys extends e.Style {
            }
            Ys.key = t(ie, oe),
            Ys.unit = "",
            Ys.semantics = {
                "break-word": {
                    "overflow-wrap": t(oe, ie),
                    overflow: J
                }
            };
            class _s extends e.Style {
                get props() {
                    return {
                        [I]: Object.assign(Object.assign({}, this), {
                            value: E
                        }),
                        [t(E, y, u)]: Object.assign(Object.assign({}, this), {
                            value: "repeat(" + this.value + o + Y + "max(0" + ",1fr))"
                        })
                    }
                }
            }
            _s.matches = /^grid-cols:./,
            _s.key = t(E, u),
            _s.unit = "";
            class As extends e.Style {
                get props() {
                    return {
                        [I]: Object.assign(Object.assign({}, this), {
                            value: E
                        }),
                        [t(E, ye, d)]: Object.assign(Object.assign({}, this), {
                            value: h
                        }),
                        [t(E, y, p)]: Object.assign(Object.assign({}, this), {
                            value: "repeat(" + this.value + o + Y + "max(0" + ",1fr))"
                        })
                    }
                }
            }
            As.key = t(E, p),
            As.unit = "";
            class Bs extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
                get props() {
                    switch (this.prefix[4]) {
                    case Z:
                        return {
                            [t(h, x)]: this
                        };
                    case C:
                        return {
                            [t(f, x)]: this
                        };
                    default:
                        return {
                            [x]: this
                        }
                    }
                }
            }
            Bs.id = "gap",
            Bs.matches = /^gap(-x|-y)?:./;
            class Es extends e.Style {
            }
            Es.key = t(ie, ge);
            class Fs extends e.Style {
                get props() {
                    return {
                        ["--" + this.prefix.slice(1, -1)]: this
                    }
                }
            }
            Fs.id = "variable",
            Fs.matches = /^\$.+:./,
            Fs.unit = "";
            class Ls extends e.Style {
            }
            Ls.matches = /^aspect:./,
            Ls.key = t("aspect", "ratio"),
            Ls.unit = "",
            Ls.semantics = {
                square: "1/1",
                video: "16/9"
            };
            class Rs extends e.Style {
                get props() {
                    return {
                        "box-decoration-break": this,
                        "-webkit-box-decoration-break": this
                    }
                }
            }
            Rs.matches = /^box:(slice|clone)(?!;)/,
            Rs.key = t(K, ce, oe);
            class Us extends e.Style {
            }
            Us.key = t(oe, "after");
            class Ds extends e.Style {
            }
            Ds.key = t(oe, "before");
            class Gs extends e.Style {
            }
            Gs.key = t(oe, "inside");
            class Hs extends e.Style {
            }
            Hs.key = t(B, "shrink"),
            Hs.unit = "";
            class Is extends e.Style {
            }
            Is.matches = /^flex:((row|col|column)(-reverse)?)(?!;)/,
            Is.key = t(B, N),
            Is.values = {
                col: h,
                "col-reverse": t(h, "reverse")
            };
            class Js extends e.Style {
            }
            Js.key = t(B, "grow"),
            Js.unit = "";
            class Ks extends e.Style {
            }
            Ks.matches = /^flex:(wrap(-reverse)?|nowrap)(?!;)/,
            Ks.key = t(B, "wrap");
            class Qs extends e.Style {
            }
            Qs.key = t(B, "basis"),
            Qs.values = Ee;
            class er extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            er.key = B,
            er.unit = "";
            const tr = "999999";
            class sr extends e.Style {
            }
            sr.matches = /^o:./,
            sr.key = "order",
            sr.values = {
                first: "-999999",
                last: tr
            },
            sr.unit = "";
            class rr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
                get parseValue() {
                    return "span" === this.prefix.slice(-5, -1) && "auto" !== this.value ? "span " + this.value + "/" + "span " + this.value : this.value
                }
            }
            rr.matches = /^grid-col(-span)?:./,
            rr.key = t(E, h),
            rr.unit = "";
            class ar extends e.Style {
            }
            ar.matches = /^col-span:./,
            ar.key = t(h, ze);
            class lr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
                get parseValue() {
                    return "span" === this.prefix.slice(-5, -1) && "auto" !== this.value ? "span " + this.value + "/" + "span " + this.value : this.value
                }
            }
            lr.matches = /^grid-row-span:./,
            lr.key = t(E, f),
            lr.unit = "";
            class ir extends e.Style {
            }
            ir.matches = /^font-color:./,
            ir.colorStarts = "f(ont)?:",
            ir.colorful = !0,
            ir.key = $,
            ir.unit = "";
            class nr extends e.Style {
            }
            nr.matches = /^ac:./,
            nr.key = t(re, g);
            class cr extends e.Style {
            }
            cr.matches = /^ai:./,
            cr.key = t(re, Ne);
            class or extends e.Style {
            }
            or.matches = /^as:./,
            or.key = t(re, Pe);
            class dr extends e.Style {
            }
            dr.matches = /^grid-auto-cols:./,
            dr.key = t(E, ye, u),
            dr.values = {
                min: t(Y, g),
                max: t(X, g)
            };
            class yr extends e.Style {
            }
            yr.matches = /^grid-flow:./,
            yr.key = t(E, ye, d);
            class hr extends e.Style {
            }
            hr.key = t(E, ye, p),
            hr.values = {
                min: t(Y, g),
                max: t(X, g)
            };
            class ur extends e.Style {
            }
            ur.matches = /^jc:./,
            ur.key = t(Me, g);
            class xr extends e.Style {
            }
            xr.matches = /^ji:./,
            xr.key = t(Me, Ne);
            class fr extends e.Style {
            }
            fr.matches = /^js:./,
            fr.key = t(Me, Pe);
            class pr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            pr.key = t(qe, g);
            class mr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            mr.key = t(qe, Ne);
            class br extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            br.key = t(qe, Pe);
            class gr extends e.Style {
                get props() {
                    return {
                        [this.prefix.slice(0, -1)]: this
                    }
                }
                get order() {
                    return "padding:" === this.prefix ? -1 : 0
                }
            }
            gr.id = "padding",
            gr.matches = /^padding(?:-(?:left|right|top|bottom))?:./;
            class kr extends e.Style {
                get props() {
                    return {
                        [this.prefix.slice(0, -1)]: this
                    }
                }
                get order() {
                    return "margin:" === this.prefix ? -1 : 0
                }
            }
            kr.id = "margin",
            kr.matches = /^margin(-(left|right|top|bottom))?:./;
            class Sr extends e.Style {
            }
            Sr.matches = /^(text-(overflow|ovf):.|t(ext)?:(ellipsis|clip)(?!;))/,
            Sr.key = t(se, "overflow");
            class vr extends e.Style {
            }
            vr.matches = /^list-style:(inside|outside)(?!;)/,
            vr.key = t($e, pe, xe);
            class wr extends e.Style {
            }
            wr.matches = /^list-style:(none|disc|decimal)(?!;)/,
            wr.key = t($e, pe, Ve);
            class jr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            jr.key = t($e, pe);
            class Or extends e.Style {
            }
            Or.key = t(se, ce, $),
            Or.colorStarts = "text-decoration:",
            Or.colorful = !0;
            class $r extends e.Style {
            }
            $r.matches = /^t(ext)?:(solid|double|dotted|dashed|wavy)(?!;)/,
            $r.key = t(se, ce, pe);
            class zr extends e.Style {
            }
            zr.matches = /^text-decoration:(from-font(?!;)|([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$)/,
            zr.key = t(se, ce, "thickness"),
            zr.unit = "em";
            class Mr extends e.Style {
            }
            Mr.key = t(se, "indent");
            class Nr extends e.Style {
            }
            Nr.key = g;
            class Pr extends e.Style {
            }
            Pr.key = t(Ze, $),
            Pr.colorStarts = "outline:",
            Pr.colorful = !0;
            class qr extends e.Style {
            }
            qr.key = t(Ze, Ce);
            class Vr extends e.Style {
            }
            Vr.matches = /^outline:(none|dotted|dashed|solid|double|groove|ridge|inset|outset)(?!;)/,
            Vr.key = t(Ze, pe);
            class Cr extends e.Style {
            }
            Cr.matches = /^outline:([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$/,
            Cr.key = t(Ze, W);
            class Zr extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            Zr.key = Ze;
            class Tr extends e.Style {
            }
            Tr.matches = /^b(order)?:(collapse|separate)(?!;)/,
            Tr.key = t(s, "collapse");
            class Wr extends e.Style {
            }
            Wr.key = t(s, ge);
            class Xr extends e.Style {
            }
            Xr.key = t(Oe, "layout");
            class Yr extends e.Style {
            }
            Yr.key = t("accent", $),
            Yr.colorStarts = "accent:",
            Yr.colorful = !0;
            class _r extends e.Style {
            }
            _r.key = "appearance";
            class Ar extends e.Style {
            }
            Ar.key = t("caret", $),
            Ar.matches = /^caret:transparent(?!;)/,
            Ar.colorStarts = "caret:",
            Ar.colorful = !0;
            class Br extends e.Style {
            }
            Br.key = t(z, q);
            class Er extends e.Style {
                get props() {
                    if ("m" !== this.prefix.slice(-3, -2))
                        return {
                            [this.prefix.replace(/-m(?!argin)/, "-margin").slice(0, -1)]: this
                        };
                    {
                        const e = t(z, i) + "-"
                          , s = e + He
                          , r = e + Ie
                          , a = e + De
                          , l = e + Ge;
                        switch (this.prefix.slice(-2, -1)) {
                        case tt:
                            return {
                                [s]: this,
                                [r]: this
                            };
                        case st:
                            return {
                                [a]: this,
                                [l]: this
                            };
                        case Je:
                            return {
                                [s]: this
                            };
                        case Ke:
                            return {
                                [r]: this
                            };
                        case Qe:
                            return {
                                [a]: this
                            };
                        case et:
                            return {
                                [l]: this
                            }
                        }
                    }
                }
                get order() {
                    return this.prefix === t(z, i) + ":" || this.prefix === t(z, "m:") ? -1 : 0
                }
            }
            Er.id = "scrollMargin",
            Er.matches = /^scroll-m([xytblr]|argin(-(top|bottom|left|right))?)?:./;
            class Fr extends e.Style {
                get props() {
                    if ("p" !== this.prefix.slice(-3, -2))
                        return {
                            [this.prefix.replace(/-p(?!adding)/, "-padding").slice(0, -1)]: this
                        };
                    {
                        const e = t(z, n) + "-"
                          , s = e + He
                          , r = e + Ie
                          , a = e + De
                          , l = e + Ge;
                        switch (this.prefix.slice(-2, -1)) {
                        case tt:
                            return {
                                [s]: this,
                                [r]: this
                            };
                        case st:
                            return {
                                [a]: this,
                                [l]: this
                            };
                        case Je:
                            return {
                                [s]: this
                            };
                        case Ke:
                            return {
                                [r]: this
                            };
                        case Qe:
                            return {
                                [a]: this
                            };
                        case et:
                            return {
                                [l]: this
                            }
                        }
                    }
                }
                get order() {
                    return this.prefix === t(z, n) + ":" || this.prefix === t(z, "p:") ? -1 : 0
                }
            }
            Fr.id = "scrollPadding",
            Fr.matches = /^scroll-p([xytblr]|adding(-(top|bottom|left|right))?)?:./;
            class Lr extends e.Style {
            }
            Lr.matches = /^scroll-snap:(start|end|center)/,
            Lr.key = t(z, Te, re);
            class Rr extends e.Style {
            }
            Rr.matches = /^scroll-snap:(normal|always)(?!;)/,
            Rr.key = t(z, Te, "stop");
            class Ur extends e.Style {
            }
            Ur.matches = /^scroll-snap:(([xy]|block|inline|both)(;(proximity|mandatory))?)(?!;)/,
            Ur.key = t(z, Te, Ve);
            class Dr extends e.Style {
            }
            Dr.key = "will-change";
            class Gr extends e.Style {
            }
            Gr.key = t(se, "underline", Ce);
            class Hr extends e.Style {
                get props() {
                    return {
                        [this.prefix.slice(0, -1)]: this
                    }
                }
            }
            Hr.matches = /^(?:top|bottom|left|right):./,
            Hr.key = "inset",
            Hr.semantics = {
                center: {
                    left: 0,
                    right: 0,
                    "margin-left": ye,
                    "margin-right": ye
                },
                middle: {
                    top: 0,
                    bottom: 0,
                    "margin-top": ye,
                    "margin-bottom": ye
                }
            };
            class Ir extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            Ir.matches = /^(columns|cols):./,
            Ir.key = u,
            Ir.unit = "";
            class Jr extends e.Style {
            }
            Jr.key = t("white", ne),
            Jr.unit = "",
            Jr.semantics = {
                "break-spaces": {
                    "white-space": t(oe, ne) + "s"
                }
            };
            class Kr extends e.Style {
            }
            Kr.matches = /^t(ext)?:(mixed|upright|sideways-right|sideways|use-glyph-orientation)(?!;)/,
            Kr.key = t(se, "orientation");
            class Qr extends e.Style {
            }
            Qr.key = t("writing", P);
            class ea extends e.Style {
            }
            ea.key = "contain";
            class ta extends e.Style {
            }
            ta.matches = /^\@duration:./,
            ta.key = t(M, H),
            ta.unit = "ms";
            class sa extends e.Style {
            }
            sa.matches = /^t(ext)?:(optimizeSpeed|optimizeLegibility|geometricPrecision)(?!;)/,
            sa.key = t(se, "rendering");
            class ra extends e.Style {
            }
            ra.key = N;
            class aa extends e.Style {
            }
            aa.matches = /^t(ext)?:(none|underline|overline|line-through)(?!;)/,
            aa.key = t(se, ce, he);
            class la extends e.Style {
            }
            la.matches = /^grid-col-start:./,
            la.key = t(E, h, _e),
            la.unit = "";
            class ia extends e.Style {
            }
            ia.matches = /^list-style:(url|linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|conic-gradient)\(.*\)((?!;).)*$/,
            ia.key = t($e, pe, k);
            class na extends e.Style {
            }
            na.matches = /^shape:((margin|content|border|padding)(?!;)|(inset|circle|ellipse|polygon|url|linear-gradient)\(.*\)((?!;).)*$)/,
            na.key = t(We, "outside"),
            na.values = {
                content: t(g, K),
                border: t(s, K),
                padding: t(n, K),
                margin: t(i, K)
            };
            class ca extends e.Style {
            }
            ca.matches = /^shape:([0-9]|(max|min|calc|clamp)\(.*\))((?!;).)*$/,
            ca.key = t(We, i);
            class oa extends e.Style {
            }
            oa.key = t(We, k, "threshold"),
            oa.unit = "";
            class da extends e.Style {
            }
            da.matches = /^clip:./,
            da.key = t(ee, "path"),
            da.values = {
                content: t(g, K),
                border: t(s, K),
                padding: t(n, K),
                margin: t(i, K),
                fill: t(Q, K),
                stroke: t(S, K),
                view: t(Xe, K)
            };
            class ya extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            ya.key = E;
            class ha extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            ha.matches = /^f:./,
            ha.key = c,
            ha.unit = "",
            ha.colorful = !0;
            class ua extends e.Style {
            }
            ua.key = "quotes";
            class xa extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            xa.key = t(E, y);
            class fa extends e.Style {
            }
            fa.key = t(E, f, _e),
            fa.unit = "";
            class pa extends e.Style {
            }
            pa.key = t(E, y, Ye) + "s";
            class ma extends e.Style {
            }
            ma.matches = /^grid-template-cols:./,
            ma.key = t(E, y, u),
            ma.values = {
                min: t(Y, g),
                max: t(X, g)
            };
            class ba extends e.Style {
            }
            ba.key = t(E, y, p),
            ba.values = {
                min: t(Y, g),
                max: t(X, g)
            };
            class ga extends e.Style {
                constructor() {
                    super(...arguments),
                    this.order = -1
                }
            }
            ga.key = t(E, Ye),
            ga.unit = "";
            class ka extends e.Style {
            }
            ka.matches = /^grid-col-end:./,
            ka.key = t(E, h, "end"),
            ka.unit = "";
            class Sa extends e.Style {
            }
            Sa.key = t(E, f, "end"),
            Sa.unit = "";
            class va extends e.Style {
                get props() {
                    return {
                        "mask-image": this,
                        "-webkit-mask-image": this
                    }
                }
            }
            va.key = t("mask", k);
            class wa extends e.Style {
                get props() {
                    return {
                        "-webkit-text-fill-color": this
                    }
                }
            }
            wa.id = "textFillColor",
            wa.matches = /^text-fill-color:./,
            wa.colorStarts = "text-fill:",
            wa.colorful = !0;
            class ja extends e.Style {
                get props() {
                    return {
                        "-webkit-text-stroke": this
                    }
                }
            }
            ja.id = "textStroke",
            ja.matches = /^text-stroke:./;
            class Oa extends e.Style {
                get props() {
                    return {
                        "-webkit-text-stroke-width": this
                    }
                }
            }
            Oa.id = "textStrokeWidth",
            Oa.matches = /^text-stroke(:((thin|medium|thick)(?!;)|\.?\d((?!;).)*$)|-width:.)/;
            class $a extends e.Style {
                get props() {
                    return {
                        "-webkit-text-stroke-color": this
                    }
                }
            }
            $a.id = "textStrokeColor",
            $a.matches = /^text-stroke-color:./,
            $a.colorStarts = "text-stroke:",
            $a.colorful = !0;
            class za extends e.Style {
            }
            za.key = t(S, "dasharray");
            class Ma extends e.Style {
            }
            Ma.key = t(S, "dash") + Ce;
            class Na extends e.Style {
            }
            Na.key = "x",
            Na.unit = "";
            class Pa extends e.Style {
            }
            Pa.key = "y",
            Pa.unit = "";
            class qa extends e.Style {
            }
            qa.key = "cx",
            qa.unit = "";
            class Va extends e.Style {
            }
            Va.key = "cy",
            Va.unit = "";
            class Ca extends e.Style {
            }
            Ca.key = "rx",
            Ca.unit = "";
            class Za extends e.Style {
            }
            Za.key = "ry",
            Za.unit = "";
            class Ta extends e.Style {
            }
            Ta.key = t(s, k, "outset");
            class Wa extends e.Style {
            }
            Wa.matches = /^border-image:(?:stretch|repeat|round|space)(?:(?!;).)*$/,
            Wa.key = t(s, k, O);
            class Xa extends e.Style {
            }
            Xa.key = t(s, k, "slice"),
            Xa.unit = "";
            class Ya extends e.Style {
            }
            Ya.matches = /^border-image:(?:url|linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient|conic-gradient)\(.*\)(?:(?!;).)*$/,
            Ya.key = t(s, k, "source");
            class _a extends e.Style {
            }
            _a.matches = /^border-image:(?:\.?[0-9]|(max|min|calc|clamp)\(.*\))(?:(?!;).)*$/,
            _a.key = t(s, k, W);
            class Aa extends e.Style {
            }
            Aa.key = t(s, k),
            Aa.unit = "";
            var colors = r(563)
              , breakpoints = r(955);
            const Ba = "undefined" != typeof window
              , Styles = [Fs, Fe, Re, ir, rt, kr, gr, Ue, Qs, Ks, Js, Hs, Is, er, Zt, at, lt, it, nt, ea, Nr, ct, ht, ut, xt, ha, ft, pt, mt, bt, Or, $r, zr, aa, gt, Gr, Sr, Kr, kt, sa, Mr, St, Ir, Jr, Hr, vt, Vt, Ct, Tt, Wt, Xt, Yt, _t, At, Bt, Et, Ft, Ss, vs, Ns, Ps, qs, Vs, Ys, Es, Cs, Zs, Ws, Xs, wa, Oa, $a, ja, Ts, Xr, Ot, jt, wt, $t, Pt, qt, Nt, Mt, zt, Lt, Rt, ta, Ut, Dt, Gt, Ht, It, Jt, Qt, is, ns, cs, Tr, Wr, os, Ta, Wa, Xa, Ya, _a, Aa, ds, ys, hs, us, xs, fs, ps, ms, bs, gs, ks, js, Ms, Os, za, Ma, zs, $s, Na, Pa, qa, Va, Ca, Za, la, ka, rr, _s, fa, Sa, lr, As, dr, yr, hr, pa, ma, ba, xa, ga, ya, Bs, sr, Gs, Ds, Us, Rs, Ls, ar, nr, cr, or, ur, xr, fr, pr, mr, br, vr, wr, ia, jr, Pr, qr, Vr, Cr, Zr, Yr, _r, Ar, Br, Er, Fr, Lr, Rr, Ur, Dr, Qr, ra, na, ca, oa, da, ua, va]
              , Ea = Styles.get = e=>Styles.find((t=>{
                var s;
                return e === t.id || e === (null === (s = t.key) || void 0 === s ? void 0 : s.replace(/-./g, (e=>e[1].toUpperCase()))) || e === t.key
            }
            ));
            function init() {
                if (Ba) {
                    const t = new e.StyleSheet(document.head);
                    e.StyleSheet.root = t,
                    t.observe(document.documentElement)
                }
            }
            Styles.extend = (t,s,r=!0)=>{
                for (const e in s) {
                    const r = Ea(e);
                    if (r) {
                        const a = s[e];
                        r.extend(t, a)
                    }
                }
                r && e.StyleSheet.refresh()
            }
            ,
            e.Style.extend("colors", colors.colors, !1),
            e.Style.extend("breakpoints", breakpoints.breakpoints, !1),
            e.StyleSheet.Styles.push(...Styles);
            Ba && (window.initMasterStyles = init,
            window.MasterStyles = Styles,
            window.MasterStylesManual || init())
        }
        )(),
        a
    }
    )()
}
));