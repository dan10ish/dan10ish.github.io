(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7030],{39200:function(e){e.exports=function(e){return{name:"Tagger Script",contains:[{className:"comment",begin:/\$noop\(/,end:/\)/,contains:[{begin:/\\[()]/},{begin:/\(/,end:/\)/,contains:[{begin:/\\[()]/},"self"]}],relevance:10},{className:"keyword",begin:/\$[_a-zA-Z0-9]+(?=\()/},{className:"variable",begin:/%[_a-zA-Z0-9:]+%/},{className:"symbol",begin:/\\[\\nt$%,()]/},{className:"symbol",begin:/\\u[a-fA-F0-9]{4}/}]}}},70890:function(e){e.exports=function(e){return{name:"Test Anything Protocol",case_insensitive:!0,contains:[e.HASH_COMMENT_MODE,{className:"meta",variants:[{begin:"^TAP version (\\d+)$"},{begin:"^1\\.\\.(\\d+)$"}]},{begin:/---$/,end:"\\.\\.\\.$",subLanguage:"yaml",relevance:0},{className:"number",begin:" (\\d+) "},{className:"symbol",variants:[{begin:"^ok"},{begin:"^not ok"}]}]}}},81439:function(e){e.exports=function(e){let n=e.regex,a=/[a-zA-Z_][a-zA-Z0-9_]*/,t={className:"number",variants:[e.BINARY_NUMBER_MODE,e.C_NUMBER_MODE]};return{name:"Tcl",aliases:["tk"],keywords:["after","append","apply","array","auto_execok","auto_import","auto_load","auto_mkindex","auto_mkindex_old","auto_qualify","auto_reset","bgerror","binary","break","catch","cd","chan","clock","close","concat","continue","dde","dict","encoding","eof","error","eval","exec","exit","expr","fblocked","fconfigure","fcopy","file","fileevent","filename","flush","for","foreach","format","gets","glob","global","history","http","if","incr","info","interp","join","lappend|10","lassign|10","lindex|10","linsert|10","list","llength|10","load","lrange|10","lrepeat|10","lreplace|10","lreverse|10","lsearch|10","lset|10","lsort|10","mathfunc","mathop","memory","msgcat","namespace","open","package","parray","pid","pkg::create","pkg_mkIndex","platform","platform::shell","proc","puts","pwd","read","refchan","regexp","registry","regsub|10","rename","return","safe","scan","seek","set","socket","source","split","string","subst","switch","tcl_endOfWord","tcl_findLibrary","tcl_startOfNextWord","tcl_startOfPreviousWord","tcl_wordBreakAfter","tcl_wordBreakBefore","tcltest","tclvars","tell","time","tm","trace","unknown","unload","unset","update","uplevel","upvar","variable","vwait","while"],contains:[e.COMMENT(";[ \\t]*#","$"),e.COMMENT("^[ \\t]*#","$"),{beginKeywords:"proc",end:"[\\{]",excludeEnd:!0,contains:[{className:"title",begin:"[ \\t\\n\\r]+(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",end:"[ \\t\\n\\r]",endsWithParent:!0,excludeEnd:!0}]},{className:"variable",variants:[{begin:n.concat(/\$/,n.optional(/::/),a,"(::",a,")*")},{begin:"\\$\\{(::)?[a-zA-Z_]((::)?[a-zA-Z0-9_])*",end:"\\}",contains:[t]}]},{className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[e.inherit(e.QUOTE_STRING_MODE,{illegal:null})]},t]}}},15942:function(e){e.exports=function(e){let n=["bool","byte","i16","i32","i64","double","string","binary"];return{name:"Thrift",keywords:{keyword:["namespace","const","typedef","struct","enum","service","exception","void","oneway","set","list","map","required","optional"],type:n,literal:"true false"},contains:[e.QUOTE_STRING_MODE,e.NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"class",beginKeywords:"struct enum service exception",end:/\{/,illegal:/\n/,contains:[e.inherit(e.TITLE_MODE,{starts:{endsWithParent:!0,excludeEnd:!0}})]},{begin:"\\b(set|list|map)\\s*<",keywords:{type:[...n,"set","list","map"]},end:">",contains:["self"]}]}}},1342:function(e){e.exports=function(e){let n={className:"number",begin:"[1-9][0-9]*",relevance:0},a={className:"symbol",begin:":[^\\]]+"},t={className:"built_in",begin:"(AI|AO|DI|DO|F|RI|RO|UI|UO|GI|GO|SI|SO)\\[",end:"\\]",contains:["self",n,e.QUOTE_STRING_MODE,a]};return{name:"TP",keywords:{keyword:["ABORT","ACC","ADJUST","AND","AP_LD","BREAK","CALL","CNT","COL","CONDITION","CONFIG","DA","DB","DIV","DETECT","ELSE","END","ENDFOR","ERR_NUM","ERROR_PROG","FINE","FOR","GP","GUARD","INC","IF","JMP","LINEAR_MAX_SPEED","LOCK","MOD","MONITOR","OFFSET","Offset","OR","OVERRIDE","PAUSE","PREG","PTH","RT_LD","RUN","SELECT","SKIP","Skip","TA","TB","TO","TOOL_OFFSET","Tool_Offset","UF","UT","UFRAME_NUM","UTOOL_NUM","UNLOCK","WAIT","X","Y","Z","W","P","R","STRLEN","SUBSTR","FINDSTR","VOFFSET","PROG","ATTR","MN","POS"],literal:["ON","OFF","max_speed","LPOS","JPOS","ENABLE","DISABLE","START","STOP","RESET"]},contains:[{className:"built_in",begin:"(AR|P|PAYLOAD|PR|R|SR|RSR|LBL|VR|UALM|MESSAGE|UTOOL|UFRAME|TIMER|TIMER_OVERFLOW|JOINT_MAX_SPEED|RESUME_PROG|DIAG_REC)\\[",end:"\\]",contains:["self",n,a]},t,{className:"keyword",begin:"/(PROG|ATTR|MN|POS|END)\\b"},{className:"keyword",begin:"(CALL|RUN|POINT_LOGIC|LBL)\\b"},{className:"keyword",begin:"\\b(ACC|CNT|Skip|Offset|PSPD|RT_LD|AP_LD|Tool_Offset)"},{className:"number",begin:"\\d+(sec|msec|mm/sec|cm/min|inch/min|deg/sec|mm|in|cm)?\\b",relevance:0},e.COMMENT("//","[;$]"),e.COMMENT("!","[;$]"),e.COMMENT("--eg:","$"),e.QUOTE_STRING_MODE,{className:"string",begin:"'",end:"'"},e.C_NUMBER_MODE,{className:"variable",begin:"\\$[A-Za-z0-9_]+"}]}}},59166:function(e){e.exports=function(e){let n=e.regex,a=["absolute_url","asset|0","asset_version","attribute","block","constant","controller|0","country_timezones","csrf_token","cycle","date","dump","expression","form|0","form_end","form_errors","form_help","form_label","form_rest","form_row","form_start","form_widget","html_classes","include","is_granted","logout_path","logout_url","max","min","parent","path|0","random","range","relative_path","render","render_esi","source","template_from_string","url|0"],t=["apply","autoescape","block","cache","deprecated","do","embed","extends","filter","flush","for","form_theme","from","if","import","include","macro","sandbox","set","stopwatch","trans","trans_default_domain","transchoice","use","verbatim","with"];t=t.concat(t.map(e=>`end${e}`));let s={scope:"string",variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/}]},r={scope:"number",match:/\d+/},i={beginKeywords:a.join(" "),keywords:{name:a},relevance:0,contains:[{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:[s,r]}]},c={match:/\|(?=[A-Za-z_]+:?)/,beginScope:"punctuation",relevance:0,contains:[{match:/[A-Za-z_]+:?/,keywords:["abs","abbr_class","abbr_method","batch","capitalize","column","convert_encoding","country_name","currency_name","currency_symbol","data_uri","date","date_modify","default","escape","file_excerpt","file_link","file_relative","filter","first","format","format_args","format_args_as_text","format_currency","format_date","format_datetime","format_file","format_file_from_text","format_number","format_time","html_to_markdown","humanize","inky_to_html","inline_css","join","json_encode","keys","language_name","last","length","locale_name","lower","map","markdown","markdown_to_html","merge","nl2br","number_format","raw","reduce","replace","reverse","round","slice","slug","sort","spaceless","split","striptags","timezone_name","title","trans","transchoice","trim","u|0","upper","url_encode","yaml_dump","yaml_encode"]}]},o=(e,{relevance:a})=>({beginScope:{1:"template-tag",3:"name"},relevance:a||2,endScope:"template-tag",begin:[/\{%/,/\s*/,n.either(...e)],end:/%\}/,keywords:"in",contains:[c,i,s,r]}),l=o(t,{relevance:2}),m=o([/[a-z_]+/],{relevance:1});return{name:"Twig",aliases:["craftcms"],case_insensitive:!0,subLanguage:"xml",contains:[e.COMMENT(/\{#/,/#\}/),l,m,{className:"template-variable",begin:/\{\{/,end:/\}\}/,contains:["self",c,i,s,r]}]}}},14361:function(e){let n="[A-Za-z$_][0-9A-Za-z$_]*",a=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],t=["true","false","null","undefined","NaN","Infinity"],s=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],r=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],i=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],o=[].concat(i,s,r);e.exports=function(e){let l=function(e){var l;let m=e.regex,d=(e,{after:n})=>{let a="</"+e[0].slice(1);return -1!==e.input.indexOf(a,n)},b=/<[A-Za-z0-9\\._:-]+/,u=/\/[A-Za-z0-9\\._:-]+>|\/>/,_={$pattern:n,keyword:a,literal:t,built_in:o,"variable.language":c},g="[0-9](_?[0-9])*",f=`\\.(${g})`,E="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",p={className:"number",variants:[{begin:`(\\b(${E})((${f})|\\.)?|(${f}))[eE][+-]?(${g})\\b`},{begin:`\\b(${E})\\b((${f})\\b|\\.)?|(${f})\\b`},{begin:"\\\b(0|[1-9](_?[0-9])*)n\\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},N={className:"subst",begin:"\\$\\{",end:"\\}",keywords:_,contains:[]},A={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,N],subLanguage:"xml"}},y={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,N],subLanguage:"css"}},O={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,N],subLanguage:"graphql"}},h={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,N]},R={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},S=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,A,y,O,h,{match:/\$\d+/},p];N.contains=S.concat({begin:/\{/,end:/\}/,keywords:_,contains:["self"].concat(S)});let T=[].concat(R,N.contains),v=T.concat([{begin:/(\s*)\(/,end:/\)/,keywords:_,contains:["self"].concat(T)}]),k={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:_,contains:v},w={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,m.concat(n,"(",m.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},M={relevance:0,match:m.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...s,...r]}},x={match:m.concat(/\b/,(l=[...i,"super","import"].map(e=>`${e}\\s*\\(`),m.concat("(?!",l.join("|"),")")),n,m.lookahead(/\s*\(/)),className:"title.function",relevance:0},I={begin:m.concat(/\./,m.lookahead(m.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",D={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,m.lookahead(C)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[k]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:_,exports:{PARAMS_CONTAINS:v,CLASS_REFERENCE:M},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,A,y,O,h,R,{match:/\$\d+/},p,M,{className:"attr",begin:n+m.lookahead(":"),relevance:0},D,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[R,e.REGEXP_MODE,{className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:_,contains:v}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:b,"on:begin":(e,n)=>{let a;let t=e[0].length+e.index,s=e.input[t];if("<"===s||","===s){n.ignoreMatch();return}">"!==s||d(e,{after:t})||n.ignoreMatch();let r=e.input.substring(t);if((a=r.match(/^\s*=/))||(a=r.match(/^\s+extends\s+/))&&0===a.index){n.ignoreMatch();return}},end:u}],subLanguage:"xml",contains:[{begin:b,end:u,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[k],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[k,e.inherit(e.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[k]},x,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},w,{match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},k]},{match:/\$[(.]/}]}}(e),m=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],d={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},b={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:m},contains:[l.exports.CLASS_REFERENCE]},u={$pattern:n,keyword:a.concat(["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"]),literal:t,built_in:o.concat(m),"variable.language":c},_={className:"meta",begin:"@"+n},g=(e,n,a)=>{let t=e.contains.findIndex(e=>e.label===n);if(-1===t)throw Error("can not find mode to replace");e.contains.splice(t,1,a)};Object.assign(l.keywords,u),l.exports.PARAMS_CONTAINS.push(_);let f=l.contains.find(e=>"attr"===e.className);return l.exports.PARAMS_CONTAINS.push([l.exports.CLASS_REFERENCE,f]),l.contains=l.contains.concat([_,d,b]),g(l,"shebang",e.SHEBANG()),g(l,"use_strict",{className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/}),l.contains.find(e=>"func.def"===e.label).relevance=0,Object.assign(l,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),l}}}]);