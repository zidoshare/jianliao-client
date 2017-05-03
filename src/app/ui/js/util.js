const Http = require('./Http')
const Util = {
  isDOM: (obj) => (
    (typeof obj === 'object') ? (obj instanceof HTMLElement) : (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName)
  ),
  isArray: function(obj) {
    return obj && typeof obj === 'object' &&
      Array == obj.constructor
  },
  inArray: function(list, obj) {
    if (!Util.isArray(list))
      return false
    for (var i = 0; i < list.length; i++) {
      if (obj == list[i])
        return true
    }
    return false
  },
  isNodeList: function(nodeList) {
    return nodeList instanceof NodeList
  },
  NodeListToArray: function(nodeList) {
    if (Util.isNodeList(nodeList)) {
      var list = []
      for (var i = 0; i < nodeList.length; i++) {
        var element = nodeList[i];
        list.push(element)
      }
      return list
    }
    return nodeList
  },
  domInArray: function(list, dom) {
    if (!Util.isArray(list))
      return false
    if (!Util.isDOM(dom))
      return false
    for (var i = 0; i < list.length; i++) {
      if (!Util.isDOM(list[i]))
        continue
      if (dom.id == list[i].id)
        return true
    }
    return false
  },

  /**
   * 为元素绑定事件
   * target:DOM节点、css选择器、由DOM节点组成的数组、由css选择器组成的数组
   * eventName:事件名
   * func:回调函数
   * container:（可选）当明确知道绑定目标为多个时，应该将此值设置为公用父节点，可大幅优化性能,可以是dom节点或者css选择器
   */
  bind: (target, eventName, func, container) => {
    var list = []
    if (Util.isArray(target))
      list = target
    else
      list[0] = target
    var domList = []
    list.map((value, index) => {
      var dom = null
      if (Util.isDOM(value))
        dom = value
      else
        dom = document.querySelectorAll(value)
      var doms = Util.NodeListToArray(dom)
      if (Util.isArray(doms))
        domList.splice(0, 0, ...doms)
      else
        domList.push(doms)
    })
    if (container == null || target == container) {
      domList.map((d) => {
        d.addEventListener(eventName, (e) => {
          func(e.target)
          e.stopPropagation()
        })
      })
      return
    }
    var containerDom = null
    if (Util.isDOM(container))
      containerDom = container
    else
      containerDom = document.querySelector(container)
    containerDom['on' + eventName] = (event) => {
      var e = event || window.event,
        eventTarget = e.target || e.srcElement,
        result = true;
      if (!Util.inArray(domList, eventTarget)) {
        (function() {
          if (eventTarget == null) {
            e.stopPropagation()
            return
          }
          eventTarget = eventTarget.parentNode
          if (eventTarget == containerDom)
            return
          if (!Util.inArray(domList, eventTarget)) {
            arguments.callee()
          } else
            func(eventTarget)
          e.stopPropagation()
        })()
      }
    }
  },
  hasClass: function(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  addClass: function(obj, cls) {
    if (!Util.hasClass(obj, cls))
      obj.className += " " + cls;
  },
  removeClass: function(obj, cls) {
    if (Util.hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, ' ');
    }
  },
  toggleClass: function(obj, cls) {
    if (Util.hasClass(obj, cls)) {
      Util.removeClass(obj, cls);
    } else {
      Util.addClass(obj, cls);
    }
  },
  isUrl: function(url) {
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
      + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      + "|" // 允许IP和DOMAIN（域名）
      + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
      + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
      + "[a-z]{2,6})" // first level domain- .com or .museum
      + "(:[0-9]{1,4})?" // 端口- :80
      + "((/?)|" // a slash isn't required if there is no file name
      + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"
    return new RegExp(strRegex).test(url)
  },
  get: function(url, params, headers) {
    if (!Util.isUrl(url))
      url = 'http://localhost:8000' + url
    if (params) {
      let paramsArray = [];
      //encodeURIComponent
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return new Promise(function(resolve, reject) {
      fetch(url, {
          method: 'GET',
          headers: headers || Http.getHeaders,
          credentials: 'include',
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject({
              status: response.status
            })
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject({
            status: -1
          });
        })
    })
  },
  post: function(url, params, headers) {
    if (!Util.isUrl(url)) {
      url = 'http://localhost:8000' + url
    }
    let data = ''
      //encodeURIComponent
    if (params) {
      let paramsArray = []
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      data += paramsArray.join('&')
    }
    return new Promise(function(resolve, reject) {
      fetch(url, {
          method: 'POST',
          headers: headers || Http.dataHeaders,
          body: data,
          credentials: 'include',
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.err(response)
            reject({
              status: response.status
            })
          }
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject({
            status: -1
          });
        })
    })
  },
  autoRefresh: function(dom, ...args) {
    var i = 0
    console.log(args)
    function animation() {
      if (i >= args.length)
        i = 0
      dom.innerHTML = args[i++]
      if(dom == null){
        console.log('stop')
        return
      }
      window.requestAnimationFrame(animation)
    }
    animation()
  }
}



module.exports = Util