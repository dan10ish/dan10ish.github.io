(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2153],{51635:function(e){e.exports=function(e){return{name:"SubUnit",case_insensitive:!0,contains:[{className:"string",begin:"\\[\n(multipart)?",end:"\\]\n"},{className:"string",begin:"\\d{4}-\\d{2}-\\d{2}(\\s+)\\d{2}:\\d{2}:\\d{2}.\\d+Z"},{className:"string",begin:"(\\+|-)\\d+"},{className:"keyword",relevance:10,variants:[{begin:"^(test|testing|success|successful|failure|error|skip|xfail|uxsuccess)(:?)\\s+(test)?"},{begin:"^progress(:?)(\\s+)?(pop|push)?"},{begin:"^tags:"},{begin:"^time:"}]}]}}},39626:function(e){function n(e){return e?"string"==typeof e?e:e.source:null}function t(e){return a("(?=",e,")")}function a(...e){return e.map(e=>n(e)).join("")}function s(...e){return"("+(function(e){let n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e).capture?"":"?:")+e.map(e=>n(e)).join("|")+")"}let i=e=>a(/\b/,e,/\w$/.test(e)?/\b/:/\B/),c=["Protocol","Type"].map(i),u=["init","self"].map(i),r=["Any","Self"],o=["actor","any","associatedtype","async","await",/as\?/,/as!/,"as","borrowing","break","case","catch","class","consume","consuming","continue","convenience","copy","default","defer","deinit","didSet","distributed","do","dynamic","each","else","enum","extension","fallthrough",/fileprivate\(set\)/,"fileprivate","final","for","func","get","guard","if","import","indirect","infix",/init\?/,/init!/,"inout",/internal\(set\)/,"internal","in","is","isolated","nonisolated","lazy","let","macro","mutating","nonmutating",/open\(set\)/,"open","operator","optional","override","package","postfix","precedencegroup","prefix",/private\(set\)/,"private","protocol",/public\(set\)/,"public","repeat","required","rethrows","return","set","some","static","struct","subscript","super","switch","throws","throw",/try\?/,/try!/,"try","typealias",/unowned\(safe\)/,/unowned\(unsafe\)/,"unowned","var","weak","where","while","willSet"],l=["false","nil","true"],p=["assignment","associativity","higherThan","left","lowerThan","none","right"],m=["#colorLiteral","#column","#dsohandle","#else","#elseif","#endif","#error","#file","#fileID","#fileLiteral","#filePath","#function","#if","#imageLiteral","#keyPath","#line","#selector","#sourceLocation","#warning"],d=["abs","all","any","assert","assertionFailure","debugPrint","dump","fatalError","getVaList","isKnownUniquelyReferenced","max","min","numericCast","pointwiseMax","pointwiseMin","precondition","preconditionFailure","print","readLine","repeatElement","sequence","stride","swap","swift_unboxFromSwiftValueWithType","transcode","type","unsafeBitCast","unsafeDowncast","withExtendedLifetime","withUnsafeMutablePointer","withUnsafePointer","withVaList","withoutActuallyEscaping","zip"],b=s(/[/=\-+!*%<>&|^~?]/,/[\u00A1-\u00A7]/,/[\u00A9\u00AB]/,/[\u00AC\u00AE]/,/[\u00B0\u00B1]/,/[\u00B6\u00BB\u00BF\u00D7\u00F7]/,/[\u2016-\u2017]/,/[\u2020-\u2027]/,/[\u2030-\u203E]/,/[\u2041-\u2053]/,/[\u2055-\u205E]/,/[\u2190-\u23FF]/,/[\u2500-\u2775]/,/[\u2794-\u2BFF]/,/[\u2E00-\u2E7F]/,/[\u3001-\u3003]/,/[\u3008-\u3020]/,/[\u3030]/),F=s(b,/[\u0300-\u036F]/,/[\u1DC0-\u1DFF]/,/[\u20D0-\u20FF]/,/[\uFE00-\uFE0F]/,/[\uFE20-\uFE2F]/),h=a(b,F,"*"),f=s(/[a-zA-Z_]/,/[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/,/[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/,/[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/,/[\u1E00-\u1FFF]/,/[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/,/[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/,/[\u2C00-\u2DFF\u2E80-\u2FFF]/,/[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/,/[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/,/[\uFE47-\uFEFE\uFF00-\uFFFD]/),w=s(f,/\d/,/[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/),g=a(f,w,"*"),y=a(/[A-Z]/,w,"*"),v=["attached","autoclosure",a(/convention\(/,s("swift","block","c"),/\)/),"discardableResult","dynamicCallable","dynamicMemberLookup","escaping","freestanding","frozen","GKInspectable","IBAction","IBDesignable","IBInspectable","IBOutlet","IBSegueAction","inlinable","main","nonobjc","NSApplicationMain","NSCopying","NSManaged",a(/objc\(/,g,/\)/),"objc","objcMembers","propertyWrapper","requires_stored_property_inits","resultBuilder","Sendable","testable","UIApplicationMain","unchecked","unknown","usableFromInline","warn_unqualified_access"],E=["iOS","iOSApplicationExtension","macOS","macOSApplicationExtension","macCatalyst","macCatalystApplicationExtension","watchOS","watchOSApplicationExtension","tvOS","tvOSApplicationExtension","swift"];e.exports=function(e){let n={match:/\s+/,relevance:0},b=e.COMMENT("/\\*","\\*/",{contains:["self"]}),f=[e.C_LINE_COMMENT_MODE,b],k={match:[/\./,s(...c,...u)],className:{2:"keyword"}},A={match:a(/\./,s(...o)),relevance:0},N=o.filter(e=>"string"==typeof e).concat(["_|0"]),C={variants:[{className:"keyword",match:s(...o.filter(e=>"string"!=typeof e).concat(r).map(i),...u)}]},S={$pattern:s(/\b\w+/,/#\w+/),keyword:N.concat(m),literal:l},_=[k,A,C],B=[{match:a(/\./,s(...d)),relevance:0},{className:"built_in",match:a(/\b/,s(...d),/(?=\()/)}],D={match:/->/,relevance:0},x=[D,{className:"operator",relevance:0,variants:[{match:h},{match:`\\.(\\.|${F})+`}]}],M="([0-9]_*)+",$="([0-9a-fA-F]_*)+",L={className:"number",relevance:0,variants:[{match:`\\b(${M})(\\.(${M}))?([eE][+-]?(${M}))?\\b`},{match:`\\b0x(${$})(\\.(${$}))?([pP][+-]?(${M}))?\\b`},{match:/\b0o([0-7]_*)+\b/},{match:/\b0b([01]_*)+\b/}]},I=(e="")=>({className:"subst",variants:[{match:a(/\\/,e,/[0\\tnr"']/)},{match:a(/\\/,e,/u\{[0-9a-fA-F]{1,8}\}/)}]}),O=(e="")=>({className:"subst",match:a(/\\/,e,/[\t ]*(?:[\r\n]|\r\n)/)}),P=(e="")=>({className:"subst",label:"interpol",begin:a(/\\/,e,/\(/),end:/\)/}),K=(e="")=>({begin:a(e,/"""/),end:a(/"""/,e),contains:[I(e),O(e),P(e)]}),T=(e="")=>({begin:a(e,/"/),end:a(/"/,e),contains:[I(e),P(e)]}),j={className:"string",variants:[K(),K("#"),K("##"),K("###"),T(),T("#"),T("##"),T("###")]},z=[e.BACKSLASH_ESCAPE,{begin:/\[/,end:/\]/,relevance:0,contains:[e.BACKSLASH_ESCAPE]}],U=e=>{let n=a(e,/\//),t=a(/\//,e);return{begin:n,end:t,contains:[...z,{scope:"comment",begin:`#(?!.*${t})`,end:/$/}]}},Z={scope:"regexp",variants:[U("###"),U("##"),U("#"),{begin:/\/[^\s](?=[^/\n]*\/)/,end:/\//,contains:z}]},q={match:a(/`/,g,/`/)},V=[q,{className:"variable",match:/\$\d+/},{className:"variable",match:`\\$${w}+`}],W=[{match:/(@|#(un)?)available/,scope:"keyword",starts:{contains:[{begin:/\(/,end:/\)/,keywords:E,contains:[...x,L,j]}]}},{scope:"keyword",match:a(/@/,s(...v),t(s(/\(/,/\s+/)))},{scope:"meta",match:a(/@/,g)}],G={match:t(/\b[A-Z]/),relevance:0,contains:[{className:"type",match:a(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/,w,"+")},{className:"type",match:y,relevance:0},{match:/[?!]+/,relevance:0},{match:/\.\.\./,relevance:0},{match:a(/\s+&\s+/,t(y)),relevance:0}]},H={begin:/</,end:/>/,keywords:S,contains:[...f,..._,...W,D,G]};G.contains.push(H);let R={begin:/\(/,end:/\)/,relevance:0,keywords:S,contains:["self",{match:a(g,/\s*:/),keywords:"_|0",relevance:0},...f,Z,..._,...B,...x,L,j,...V,...W,G]},X={begin:/</,end:/>/,keywords:"repeat each",contains:[...f,G]},J={begin:/\(/,end:/\)/,keywords:S,contains:[{begin:s(t(a(g,/\s*:/)),t(a(g,/\s+/,g,/\s*:/))),end:/:/,relevance:0,contains:[{className:"keyword",match:/\b_\b/},{className:"params",match:g}]},...f,..._,...x,L,j,...W,G,R],endsParent:!0,illegal:/["']/},Q={match:[/(func|macro)/,/\s+/,s(q.match,g,h)],className:{1:"keyword",3:"title.function"},contains:[X,J,n],illegal:[/\[/,/%/]},Y={begin:[/precedencegroup/,/\s+/,y],className:{1:"keyword",3:"title"},contains:[G],keywords:[...p,...l],end:/}/},ee={begin:[/(struct|protocol|class|extension|enum|actor)/,/\s+/,g,/\s*/],beginScope:{1:"keyword",3:"title.class"},keywords:S,contains:[X,..._,{begin:/:/,end:/\{/,keywords:S,contains:[{scope:"title.class.inherited",match:y},..._],relevance:0}]};for(let e of j.variants){let n=e.contains.find(e=>"interpol"===e.label);n.keywords=S;let t=[..._,...B,...x,L,j,...V];n.contains=[...t,{begin:/\(/,end:/\)/,contains:["self",...t]}]}return{name:"Swift",keywords:S,contains:[...f,Q,{match:[/\b(?:subscript|init[?!]?)/,/\s*(?=[<(])/],className:{1:"keyword"},contains:[X,J,n],illegal:/\[|%/},{match:[/class\b/,/\s+/,/func\b/,/\s+/,/\b[A-Za-z_][A-Za-z0-9_]*\b/],scope:{1:"keyword",3:"keyword",5:"title.function"}},{match:[/class\b/,/\s+/,/var\b/],scope:{1:"keyword",3:"keyword"}},ee,{match:[/operator/,/\s+/,h],className:{1:"keyword",3:"title"}},Y,{beginKeywords:"import",end:/$/,contains:[...f],relevance:0},Z,..._,...B,...x,L,j,...V,...W,G,R]}}}}]);