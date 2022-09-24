(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{214:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return s}));var o=n(1),r=n(9),i=(n(0),n(240)),a={id:"best-practices",last_modified_on:"2022-09-24",title:"Best practices",description:"Best practices for writing code on top of gnet."},c={id:"tutorial/best-practices",title:"Best practices",description:"Best practices for writing code on top of gnet.",source:"@site/docs/tutorial/best-practices.md",permalink:"/docs/tutorial/best-practices",editUrl:"https://github.com/panjf2000/gnet/edit/master/website/docs/tutorial/best-practices.md",sidebar:"docs",previous:{title:"Quickstart",permalink:"/docs/quickstart"},next:{title:"Benchmark",permalink:"/docs/benchmark"}},l=[{value:"Never run blocking code in OnTraffic(), OnOpen() and OnClose()",id:"never-run-blocking-code-in-ontraffic-onopen-and-onclose",children:[]},{value:"Either loop read data in OnTraffic() or invoke c.Wake() regularly",id:"either-loop-read-data-in-ontraffic-or-invoke-cwake-regularly",children:[]},{value:"Leverage Conn.Context() to monopolize data instead of sharing it across connections",id:"leverage-conncontext-to-monopolize-data-instead-of-sharing-it-across-connections",children:[]},{value:"Enable poll_opt mode to boost performance",id:"enable-poll_opt-mode-to-boost-performance",children:[]},{value:"To be continued",id:"to-be-continued",children:[]}],p={rightToc:l};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(o.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h3",{id:"never-run-blocking-code-in-ontraffic-onopen-and-onclose"},"Never run blocking code in OnTraffic(), OnOpen() and OnClose()"),Object(i.b)("p",null,"The above three event handlers (callbacks) are executed in event-loops, therefore, running blocking code in them blocks event-loops, which means that the subsequent tasks will have to wait for the preceding blocking event handlers to complete before they get executed. "),Object(i.b)("p",null,"To avoid blocking event-loops, asynchronize your blocking code, for example by starting a goroutine with your blocking code and invoking c.AsyncWrite() or c.AsyncWritev() to send response data to the peer endpoint."),Object(i.b)("p",null,"If you're not familiar with how gnet works, go back and read ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://gnet.host/docs/about/overview/#networking-model-of-multiple-threadsgoroutines"}),"this"),"."),Object(i.b)("h3",{id:"either-loop-read-data-in-ontraffic-or-invoke-cwake-regularly"},"Either loop read data in OnTraffic() or invoke c.Wake() regularly"),Object(i.b)("p",null,"Despite the fact that gnet leverages epoll/kqueue with level-triggered mode under the hook, OnTraffic() won't be invoked constantly even though there is data left in the inbound buffer of a connection."),Object(i.b)("p",null,"Thus, you should loop call c.Read()/c.Peek()/c.Next() for a connection in OnTraffic() to drain the inbound buffer of incoming data, but if you don't, then make sure you call c.Wake() periodically, otherwise you may never get a chance to read the rest of the data sent by the peer endpoint (client or server) unless the peer endpoint sends new data over."),Object(i.b)("h3",{id:"leverage-conncontext-to-monopolize-data-instead-of-sharing-it-across-connections"},"Leverage Conn.Context() to monopolize data instead of sharing it across connections"),Object(i.b)("p",null,"It's recommended to use Conn.Context() to store necessary resource for each connection, so that each connection can take advantage of its exclusive resource, avoiding the contention of single resource across connections."),Object(i.b)("h3",{id:"enable-poll_opt-mode-to-boost-performance"},"Enable poll_opt mode to boost performance"),Object(i.b)("p",null,"By default, ",Object(i.b)("inlineCode",{parentName:"p"},"gnet")," utilizes the standard package ",Object(i.b)("inlineCode",{parentName:"p"},"golang.org/x/sys/unix")," to implement pollers with ",Object(i.b)("inlineCode",{parentName:"p"},"epoll")," or ",Object(i.b)("inlineCode",{parentName:"p"},"kqueue"),", where a HASH map of ",Object(i.b)("inlineCode",{parentName:"p"},"fd->conn")," is introduced to help retrieve connections by file descriptors returned from pollers, but now the user can run ",Object(i.b)("inlineCode",{parentName:"p"},"go build")," with build tags ",Object(i.b)("inlineCode",{parentName:"p"},"poll_opt"),", like this: ",Object(i.b)("inlineCode",{parentName:"p"},"go build -tags=poll_opt"),", and ",Object(i.b)("inlineCode",{parentName:"p"},"gnet")," then switch to the optimized implementations of pollers that invoke the system calls of ",Object(i.b)("inlineCode",{parentName:"p"},"epoll")," or ",Object(i.b)("inlineCode",{parentName:"p"},"kqueue")," directly and add file descriptors to the interest list along with storing the corresponding connection pointers into ",Object(i.b)("inlineCode",{parentName:"p"},"epoll_data")," or ",Object(i.b)("inlineCode",{parentName:"p"},"kevent"),", in which case ",Object(i.b)("inlineCode",{parentName:"p"},"gnet")," can get rid of the HASH MAP of ",Object(i.b)("inlineCode",{parentName:"p"},"fd->conn")," and regain each connection pointer by the conversion of ",Object(i.b)("inlineCode",{parentName:"p"},"void*")," pointer in the I/O event-looping. In theory, it ought to achieve a higher performance with this optimization. "),Object(i.b)("p",null,"See ",Object(i.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/panjf2000/gnet/pull/230"}),"#230")," for code details."),Object(i.b)("h3",{id:"to-be-continued"},"To be continued"))}s.isMDXComponent=!0},240:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return f}));var o=n(0),r=n.n(o);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},d=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(n),u=o,f=d["".concat(a,".").concat(u)]||d[u]||b[u]||i;return n?r.a.createElement(f,c({ref:t},p,{components:n})):r.a.createElement(f,c({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var p=2;p<i;p++)a[p]=n[p];return r.a.createElement.apply(null,a)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);