(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1707],{38301:function(e){var n="[0-9](_*[0-9])*",a=`\\.(${n})`,t="[0-9a-fA-F](_*[0-9a-fA-F])*",s={className:"number",variants:[{begin:`(\\b(${n})((${a})|\\.)?|(${a}))[eE][+-]?(${n})[fFdD]?\\b`},{begin:`\\b(${n})((${a})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${a})[fFdD]?\\b`},{begin:`\\b(${n})[fFdD]\\b`},{begin:`\\b0[xX]((${t})\\.?|(${t})?\\.(${t}))[pP][+-]?(${n})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${t})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};e.exports=function(e){let n=e.regex,a="[\xc0-ʸa-zA-Z_$][\xc0-ʸa-zA-Z_$0-9]*",t=a+function e(n,a,t){return -1===t?"":n.replace(a,s=>e(n,a,t-1))}("(?:<"+a+"~~~(?:\\s*,\\s*"+a+"~~~)*>)?",/~~~/g,2),r={keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed","yield","permits","goto"],literal:["false","true","null"],type:["char","boolean","long","float","int","byte","short","double"],built_in:["super","this"]},c={className:"meta",begin:"@"+a,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]},i={className:"params",begin:/\(/,end:/\)/,keywords:r,relevance:0,contains:[e.C_BLOCK_COMMENT_MODE],endsParent:!0};return{name:"Java",aliases:["jsp"],keywords:r,illegal:/<\/|#/,contains:[e.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,className:"string",contains:[e.BACKSLASH_ESCAPE]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,a],className:{1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{begin:[n.concat(/(?!else)/,a),/\s+/,a,/\s+/,/=(?!=)/],className:{1:"type",3:"variable",5:"operator"}},{begin:[/record/,/\s+/,a],className:{1:"keyword",3:"title.class"},contains:[i,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"new throw return else",relevance:0},{begin:["(?:"+t+"\\s+)",e.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{2:"title.function"},keywords:r,contains:[{className:"params",begin:/\(/,end:/\)/,keywords:r,relevance:0,contains:[c,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,s,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},s,c]}}},46077:function(e){let n="[A-Za-z$_][0-9A-Za-z$_]*",a=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],t=["true","false","null","undefined","NaN","Infinity"],s=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],r=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],c=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],i=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],o=[].concat(c,s,r);e.exports=function(e){var l;let b=e.regex,d=(e,{after:n})=>{let a="</"+e[0].slice(1);return -1!==e.input.indexOf(a,n)},u=/<[A-Za-z0-9\\._:-]+/,g=/\/[A-Za-z0-9\\._:-]+>|\/>/,m={$pattern:n,keyword:a,literal:t,built_in:o,"variable.language":i},E="[0-9](_?[0-9])*",_=`\\.(${E})`,N="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",f={className:"number",variants:[{begin:`(\\b(${N})((${_})|\\.)?|(${_}))[eE][+-]?(${E})\\b`},{begin:`\\b(${N})\\b((${_})\\b|\\.)?|(${_})\\b`},{begin:"\\\b(0|[1-9](_?[0-9])*)n\\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:m,contains:[]},y={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},h={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},A={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},v={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},w={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},O=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,h,A,v,{match:/\$\d+/},f];p.contains=O.concat({begin:/\{/,end:/\}/,keywords:m,contains:["self"].concat(O)});let M=[].concat(w,p.contains),C=M.concat([{begin:/(\s*)\(/,end:/\)/,keywords:m,contains:["self"].concat(M)}]),S={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:m,contains:C},k={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,b.concat(n,"(",b.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},D={relevance:0,match:b.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...s,...r]}},T={match:b.concat(/\b/,(l=[...c,"super","import"].map(e=>`${e}\\s*\\(`),b.concat("(?!",l.join("|"),")")),n,b.lookahead(/\s*\(/)),className:"title.function",relevance:0},$={begin:b.concat(/\./,b.lookahead(b.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},I="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",R={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,b.lookahead(I)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[S]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:m,exports:{PARAMS_CONTAINS:C,CLASS_REFERENCE:D},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,h,A,v,w,{match:/\$\d+/},f,D,{className:"attr",begin:n+b.lookahead(":"),relevance:0},R,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[w,e.REGEXP_MODE,{className:"function",begin:I,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:m,contains:C}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:u,"on:begin":(e,n)=>{let a;let t=e[0].length+e.index,s=e.input[t];if("<"===s||","===s){n.ignoreMatch();return}">"!==s||d(e,{after:t})||n.ignoreMatch();let r=e.input.substring(t);if((a=r.match(/^\s*=/))||(a=r.match(/^\s+extends\s+/))&&0===a.index){n.ignoreMatch();return}},end:g}],subLanguage:"xml",contains:[{begin:u,end:g,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[S],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[S,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},$,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[S]},T,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},k,{match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},S]},{match:/\$[(.]/}]}}},50804:function(e){e.exports=function(e){return{name:"JBoss CLI",aliases:["wildfly-cli"],keywords:{$pattern:"[a-z-]+",keyword:"alias batch cd clear command connect connection-factory connection-info data-source deploy deployment-info deployment-overlay echo echo-dmr help history if jdbc-driver-info jms-queue|20 jms-topic|20 ls patch pwd quit read-attribute read-operation reload rollout-plan run-batch set shutdown try unalias undeploy unset version xa-data-source",literal:"true false"},contains:[e.HASH_COMMENT_MODE,e.QUOTE_STRING_MODE,{className:"params",begin:/--[\w\-=\/]+/},{className:"function",begin:/:[\w\-.]+/,relevance:0},{className:"string",begin:/\B([\/.])[\w\-.\/=]+/},{className:"params",begin:/\(/,end:/\)/,contains:[{begin:/[\w-]+ *=/,returnBegin:!0,relevance:0,contains:[{className:"attr",begin:/[\w-]+/}]}],relevance:0}]}}}}]);