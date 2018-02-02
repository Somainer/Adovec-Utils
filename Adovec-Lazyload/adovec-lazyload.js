;(function(window, undefined){
    let _ = {
        isProto(obj, clsStr){
            //DO not use it.
            return ({}).toString.call(obj) === `[object ${clsStr}]`;
        },
        isInstanceOf(obj, cls){
            let isProto = this.isProto;
            if(isProto(cls, "Function")) return cls.name ? isProto(obj, cls.name):cls(obj);
            return isProto(cls, "String")?isProto(obj, cls):cls.some(c => this.isInstanceOf(obj, c));
        },
        isClassOf(cls){
            return obj => this.isInstanceOf(cls, obj);
        },
        extend(){
            let isInstanceOf = this.isInstanceOf.bind(this);
            let extend = this.extend.bind(this);
            var index = 0,isDeep = false,obj,copy,destination,source,i;
            if(isInstanceOf(arguments[0], Boolean)) {
                index = 1
                isDeep = arguments[0]
            }
            for(i = arguments.length - 1;i>index;i--) {
                destination = arguments[i - 1]
                source = arguments[i]
                if(isInstanceOf(source, [Object, Array])) {
                    //console.log(source)
                    for(var property in source) {
                        obj = source[property]
                        if(isDeep && isInstanceOf(obj, [Object, Array])) {
                            copy = isInstanceOf(obj, Object) ? {} : []
                            var extended = extend(isDeep,copy,obj)
                            destination[property] = extended 
                        }else {
                            destination[property] = source[property]
                        }
                    }
                } else {
                    destination = source
                }
            }
            return destination;
        },
        deepExtend(...args){
            return this.extend(true, ...args);
        },
        render(template, context, delim){
            const funcTemplate = expr => `with(data || {}) {return (${expr});}`;
            return template.replace(new RegExp((delim || ["{{", "}}"]).join("\\s*?(.*?)\\s*?"), "gm"), (_, expr) => (new Function("data", funcTemplate(expr)))(context));
        },
        partition(arr, cond){
            let res=[[],[]];
            arr.forEach(v => res[cond(v)^1].push(v));
            return res;
        },
        debounce(func, delay){
            let tmr;
            return (...args) => {
                clearTimeout(tmr);
                tmr = setTimeout(() => func(...args), delay);
            }
        },
        throttle(func, threshold){
            let last=0, tmr;
            return (...args) => {
                let now = new Date;
                clearTimeout(tmr);
                if(now - last < threshold){
                    tmr = setTimeout(() => func(...args), threshold);
                } else {
                    last = now;
                    func(...args);
                }
            }
        }
    };
    let AdovecLazyLoad = function(opts){
        let defaults = {
            load: true,
            placeHolder: "",
            renderPlaceHolder: false,
            selector: "img",
            changePlaceHolder: true,
            prefix: "adovec",
            onscrolledimg: null,
            delim: ["{{", "}}"],
            throttleRate: 200
        };
        this.alive = false;
        let options = this.options = _.deepExtend({}, defaults, opts);
        this.setOption = function(o){
            this.options = _.deepExtend({}, defaults, opts);
            return this;
        }
        this.load = function(){
            this.alive && this.destroy();
            this.alive = true;
            this.pics = document.querySelectorAll(options.selector);
            if(this.options.changePlaceHolder){
                this.pics.forEach(e => {
                    let attr = options.prefix+"-src";
                    e.getAttribute(attr) || e.setAttribute(attr, e.src);
                    e.src = options.changePlaceHolder?_.render(options.placeHolder, e, options.delim):options.placeHolder;
                });
            }
            this.handler();
            addEventListener("scroll", this.handler);
        }
        this.handler = _.throttle(function(e){
            let curY = document.documentElement.scrollTop + window.innerHeight;
            return (new Promise(resolve => {
                resolve(_.partition(this.pics, e => curY >= e.y));
            })).then(([scrolled, remain]) => {
                scrolled.forEach(e => e.src = e.getAttribute(this.options.prefix+"-src") || e.src);
                return this.pics = remain;
            }).then(e => (e.length||this.destroy(), e)).then(imgs => this.options.onscrolledimg && this.options.onscrolledimg(imgs));
        }.bind(this), options.throttleRate);
        this.destroy = function(){
            this.alive = false;
            removeEventListener("scroll", this.handler);
        }
        this.options.load && this.load();
        
    };
    AdovecLazyLoad.of = function(o){
        return new AdovecLazyLoad(o);
    }
    AdovecLazyLoad.utils = _;
    window.AdovecLazyLoad = AdovecLazyLoad;
})(window);