(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9754],{75457:function(e){e.exports=function(e){return{name:"Coq",keywords:{keyword:["_|0","as","at","cofix","else","end","exists","exists2","fix","for","forall","fun","if","IF","in","let","match","mod","Prop","return","Set","then","Type","using","where","with","Abort","About","Add","Admit","Admitted","All","Arguments","Assumptions","Axiom","Back","BackTo","Backtrack","Bind","Blacklist","Canonical","Cd","Check","Class","Classes","Close","Coercion","Coercions","CoFixpoint","CoInductive","Collection","Combined","Compute","Conjecture","Conjectures","Constant","constr","Constraint","Constructors","Context","Corollary","CreateHintDb","Cut","Declare","Defined","Definition","Delimit","Dependencies","Dependent","Derive","Drop","eauto","End","Equality","Eval","Example","Existential","Existentials","Existing","Export","exporting","Extern","Extract","Extraction","Fact","Field","Fields","File","Fixpoint","Focus","for","From","Function","Functional","Generalizable","Global","Goal","Grab","Grammar","Graph","Guarded","Heap","Hint","HintDb","Hints","Hypotheses","Hypothesis","ident","Identity","If","Immediate","Implicit","Import","Include","Inductive","Infix","Info","Initial","Inline","Inspect","Instance","Instances","Intro","Intros","Inversion","Inversion_clear","Language","Left","Lemma","Let","Libraries","Library","Load","LoadPath","Local","Locate","Ltac","ML","Mode","Module","Modules","Monomorphic","Morphism","Next","NoInline","Notation","Obligation","Obligations","Opaque","Open","Optimize","Options","Parameter","Parameters","Parametric","Path","Paths","pattern","Polymorphic","Preterm","Print","Printing","Program","Projections","Proof","Proposition","Pwd","Qed","Quit","Rec","Record","Recursive","Redirect","Relation","Remark","Remove","Require","Reserved","Reset","Resolve","Restart","Rewrite","Right","Ring","Rings","Save","Scheme","Scope","Scopes","Script","Search","SearchAbout","SearchHead","SearchPattern","SearchRewrite","Section","Separate","Set","Setoid","Show","Solve","Sorted","Step","Strategies","Strategy","Structure","SubClass","Table","Tables","Tactic","Term","Test","Theorem","Time","Timeout","Transparent","Type","Typeclasses","Types","Undelimit","Undo","Unfocus","Unfocused","Unfold","Universe","Universes","Unset","Unshelve","using","Variable","Variables","Variant","Verbose","Visibility","where","with"],built_in:["abstract","absurd","admit","after","apply","as","assert","assumption","at","auto","autorewrite","autounfold","before","bottom","btauto","by","case","case_eq","cbn","cbv","change","classical_left","classical_right","clear","clearbody","cofix","compare","compute","congruence","constr_eq","constructor","contradict","contradiction","cut","cutrewrite","cycle","decide","decompose","dependent","destruct","destruction","dintuition","discriminate","discrR","do","double","dtauto","eapply","eassumption","eauto","ecase","econstructor","edestruct","ediscriminate","eelim","eexact","eexists","einduction","einjection","eleft","elim","elimtype","enough","equality","erewrite","eright","esimplify_eq","esplit","evar","exact","exactly_once","exfalso","exists","f_equal","fail","field","field_simplify","field_simplify_eq","first","firstorder","fix","fold","fourier","functional","generalize","generalizing","gfail","give_up","has_evar","hnf","idtac","in","induction","injection","instantiate","intro","intro_pattern","intros","intuition","inversion","inversion_clear","is_evar","is_var","lapply","lazy","left","lia","lra","move","native_compute","nia","nsatz","omega","once","pattern","pose","progress","proof","psatz","quote","record","red","refine","reflexivity","remember","rename","repeat","replace","revert","revgoals","rewrite","rewrite_strat","right","ring","ring_simplify","rtauto","set","setoid_reflexivity","setoid_replace","setoid_rewrite","setoid_symmetry","setoid_transitivity","shelve","shelve_unifiable","simpl","simple","simplify_eq","solve","specialize","split","split_Rabs","split_Rmult","stepl","stepr","subst","sum","swap","symmetry","tactic","tauto","time","timeout","top","transitivity","trivial","try","tryif","unfold","unify","until","using","vm_compute","with"]},contains:[e.QUOTE_STRING_MODE,e.COMMENT("\\(\\*","\\*\\)"),e.C_NUMBER_MODE,{className:"type",excludeBegin:!0,begin:"\\|\\s*",end:"\\w+"},{begin:/[-=]>/}]}}},76619:function(e){e.exports=function(e){return{name:"Cach\xe9 Object Script",case_insensitive:!0,aliases:["cls"],keywords:"property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii",contains:[{className:"number",begin:"\\b(\\d+(\\.\\d*)?|\\.\\d+)",relevance:0},{className:"string",variants:[{begin:'"',end:'"',contains:[{begin:'""',relevance:0}]}]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"comment",begin:/;/,end:"$",relevance:0},{className:"built_in",begin:/(?:\$\$?|\.\.)\^?[a-zA-Z]+/},{className:"built_in",begin:/\$\$\$[a-zA-Z]+/},{className:"built_in",begin:/%[a-z]+(?:\.[a-z]+)*/},{className:"symbol",begin:/\^%?[a-zA-Z][\w]*/},{className:"keyword",begin:/##class|##super|#define|#dim/},{begin:/&sql\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,subLanguage:"sql"},{begin:/&(js|jscript|javascript)</,end:/>/,excludeBegin:!0,excludeEnd:!0,subLanguage:"javascript"},{begin:/&html<\s*</,end:/>\s*>/,subLanguage:"xml"}]}}},41871:function(e){e.exports=function(e){let t=e.regex,i=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),n="decltype\\(auto\\)",a="[a-zA-Z_]\\w*::",r="(?!struct)("+n+"|"+t.optional(a)+"[a-zA-Z_]\\w*"+t.optional("<[^<>]+>")+")",o={className:"type",begin:"\\b[a-z\\d_]*_t\\b"},s={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",end:"'",illegal:"."},e.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},l={className:"number",variants:[{begin:"[+-]?(?:(?:[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"},{begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"}],relevance:0},c={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},e.inherit(s,{className:"string"}),{className:"string",begin:/<.*?>/},i,e.C_BLOCK_COMMENT_MODE]},d={className:"title",begin:t.optional(a)+e.IDENT_RE,relevance:0},m=t.optional(a)+e.IDENT_RE+"\\s*\\(",g={type:["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],keyword:["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","private","protected","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq"],literal:["NULL","false","nullopt","nullptr","true"],built_in:["_Pragma"],_type_hints:["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"]},b={className:"function.dispatch",relevance:0,keywords:{_hint:["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"]},begin:t.concat(/\b/,/(?!decltype)/,/(?!if)/,/(?!for)/,/(?!switch)/,/(?!while)/,e.IDENT_RE,t.lookahead(/(<[^<>]+>|)\s*\(/))},p=[b,c,o,i,e.C_BLOCK_COMMENT_MODE,l,s],u={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:g,contains:p.concat([{begin:/\(/,end:/\)/,keywords:g,contains:p.concat(["self"]),relevance:0}]),relevance:0},f={className:"function",begin:"("+r+"[\\*&\\s]+)+"+m,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:g,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:n,keywords:g,relevance:0},{begin:m,returnBegin:!0,contains:[d],relevance:0},{begin:/::/,relevance:0},{begin:/:/,endsWithParent:!0,contains:[s,l]},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,keywords:g,relevance:0,contains:[i,e.C_BLOCK_COMMENT_MODE,s,l,o,{begin:/\(/,end:/\)/,keywords:g,relevance:0,contains:["self",i,e.C_BLOCK_COMMENT_MODE,s,l,o]}]},o,i,e.C_BLOCK_COMMENT_MODE,c]};return{name:"C++",aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:g,illegal:"</",classNameAliases:{"function.dispatch":"built_in"},contains:[].concat(u,f,b,p,[c,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",end:">",keywords:g,contains:["self",o]},{begin:e.IDENT_RE+"::",keywords:g},{match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],className:{1:"keyword",3:"title.class"}}])}}},74537:function(e){e.exports=function(e){let t="group clone ms master location colocation order fencing_topology rsc_ticket acl_target acl_group user role tag xml";return{name:"crmsh",aliases:["crm","pcmk"],case_insensitive:!0,keywords:{keyword:"params meta operations op rule attributes utilization read write deny defined not_defined in_range date spec in ref reference attribute type xpath version and or lt gt tag lte gte eq ne \\ number string",literal:"Master Started Slave Stopped start promote demote stop monitor true false"},contains:[e.HASH_COMMENT_MODE,{beginKeywords:"node",starts:{end:"\\s*([\\w_-]+:)?",starts:{className:"title",end:"\\s*[\\$\\w_][\\w_-]*"}}},{beginKeywords:"primitive rsc_template",starts:{className:"title",end:"\\s*[\\$\\w_][\\w_-]*",starts:{end:"\\s*@?[\\w_][\\w_\\.:-]*"}}},{begin:"\\b("+t.split(" ").join("|")+")\\s+",keywords:t,starts:{className:"title",end:"[\\$\\w_][\\w_-]*"}},{beginKeywords:"property rsc_defaults op_defaults",starts:{className:"title",end:"\\s*([\\w_-]+:)?"}},e.QUOTE_STRING_MODE,{className:"meta",begin:"(ocf|systemd|service|lsb):[\\w_:-]+",relevance:0},{className:"number",begin:"\\b\\d+(\\.\\d+)?(ms|s|h|m)?",relevance:0},{className:"literal",begin:"[-]?(infinity|inf)",relevance:0},{className:"attr",begin:/([A-Za-z$_#][\w_-]+)=/,relevance:0},{className:"tag",begin:"</?",end:"/?>",relevance:0}]}}},34652:function(e){e.exports=function(e){let t="(_?[ui](8|16|32|64|128))?",i="[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|[=!]~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~|]|//|//=|&[-+*]=?|&\\*\\*|\\[\\][=?]?",n="[A-Za-z_]\\w*(::\\w+)*(\\?|!)?",a={$pattern:"[a-zA-Z_]\\w*[!?=]?",keyword:"abstract alias annotation as as? asm begin break case class def do else elsif end ensure enum extend for fun if include instance_sizeof is_a? lib macro module next nil? of out pointerof private protected rescue responds_to? return require select self sizeof struct super then type typeof union uninitialized unless until verbatim when while with yield __DIR__ __END_LINE__ __FILE__ __LINE__",literal:"false nil true"},r={className:"subst",begin:/#\{/,end:/\}/,keywords:a},o={className:"template-variable",variants:[{begin:"\\{\\{",end:"\\}\\}"},{begin:"\\{%",end:"%\\}"}],keywords:a};function s(e,t){let i=[{begin:e,end:t}];return i[0].contains=i,i}let l={className:"string",contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:/'/,end:/'/},{begin:/"/,end:/"/},{begin:/`/,end:/`/},{begin:"%[Qwi]?\\(",end:"\\)",contains:s("\\(","\\)")},{begin:"%[Qwi]?\\[",end:"\\]",contains:s("\\[","\\]")},{begin:"%[Qwi]?\\{",end:/\}/,contains:s(/\{/,/\}/)},{begin:"%[Qwi]?<",end:">",contains:s("<",">")},{begin:"%[Qwi]?\\|",end:"\\|"},{begin:/<<-\w+$/,end:/^\s*\w+$/}],relevance:0},c={className:"string",variants:[{begin:"%q\\(",end:"\\)",contains:s("\\(","\\)")},{begin:"%q\\[",end:"\\]",contains:s("\\[","\\]")},{begin:"%q\\{",end:/\}/,contains:s(/\{/,/\}/)},{begin:"%q<",end:">",contains:s("<",">")},{begin:"%q\\|",end:"\\|"},{begin:/<<-'\w+'$/,end:/^\s*\w+$/}],relevance:0},d={begin:"(?!%\\})("+e.RE_STARTERS_RE+"|\\n|\\b(case|if|select|unless|until|when|while)\\b)\\s*",keywords:"case if select unless until when while",contains:[{className:"regexp",contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:"//[a-z]*",relevance:0},{begin:"/(?!\\/)",end:"/[a-z]*"}]}],relevance:0},m=[o,l,c,{className:"regexp",contains:[e.BACKSLASH_ESCAPE,r],variants:[{begin:"%r\\(",end:"\\)",contains:s("\\(","\\)")},{begin:"%r\\[",end:"\\]",contains:s("\\[","\\]")},{begin:"%r\\{",end:/\}/,contains:s(/\{/,/\}/)},{begin:"%r<",end:">",contains:s("<",">")},{begin:"%r\\|",end:"\\|"}],relevance:0},d,{className:"meta",begin:"@\\[",end:"\\]",contains:[e.inherit(e.QUOTE_STRING_MODE,{className:"string"})]},{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"},e.HASH_COMMENT_MODE,{className:"class",beginKeywords:"class module struct",end:"$|;",illegal:/=/,contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{begin:n}),{begin:"<"}]},{className:"class",beginKeywords:"lib enum union",end:"$|;",illegal:/=/,contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{begin:n})]},{beginKeywords:"annotation",end:"$|;",illegal:/=/,contains:[e.HASH_COMMENT_MODE,e.inherit(e.TITLE_MODE,{begin:n})],relevance:2},{className:"function",beginKeywords:"def",end:/\B\b/,contains:[e.inherit(e.TITLE_MODE,{begin:i,endsParent:!0})]},{className:"function",beginKeywords:"fun macro",end:/\B\b/,contains:[e.inherit(e.TITLE_MODE,{begin:i,endsParent:!0})],relevance:2},{className:"symbol",begin:e.UNDERSCORE_IDENT_RE+"(!|\\?)?:",relevance:0},{className:"symbol",begin:":",contains:[l,{begin:i}],relevance:0},{className:"number",variants:[{begin:"\\b0b([01_]+)"+t},{begin:"\\b0o([0-7_]+)"+t},{begin:"\\b0x([A-Fa-f0-9_]+)"+t},{begin:"\\b([1-9][0-9_]*[0-9]|[0-9])(\\.[0-9][0-9_]*)?([eE]_?[-+]?[0-9_]*)?(_?f(32|64))?(?!_)"},{begin:"\\b([1-9][0-9_]*|0)"+t}],relevance:0}];return r.contains=m,o.contains=m.slice(1),{name:"Crystal",aliases:["cr"],keywords:a,contains:m}}},76440:function(e){e.exports=function(e){let t={keyword:["abstract","as","base","break","case","catch","class","const","continue","do","else","event","explicit","extern","finally","fixed","for","foreach","goto","if","implicit","in","interface","internal","is","lock","namespace","new","operator","out","override","params","private","protected","public","readonly","record","ref","return","scoped","sealed","sizeof","stackalloc","static","struct","switch","this","throw","try","typeof","unchecked","unsafe","using","virtual","void","volatile","while"].concat(["add","alias","and","ascending","args","async","await","by","descending","dynamic","equals","file","from","get","global","group","init","into","join","let","nameof","not","notnull","on","or","orderby","partial","record","remove","required","scoped","select","set","unmanaged","value|0","var","when","where","with","yield"]),built_in:["bool","byte","char","decimal","delegate","double","dynamic","enum","float","int","long","nint","nuint","object","sbyte","short","string","ulong","uint","ushort"],literal:["default","false","null","true"]},i=e.inherit(e.TITLE_MODE,{begin:"[a-zA-Z](\\.?\\w)*"}),n={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},a={className:"string",begin:'@"',end:'"',contains:[{begin:'""'}]},r=e.inherit(a,{illegal:/\n/}),o={className:"subst",begin:/\{/,end:/\}/,keywords:t},s=e.inherit(o,{illegal:/\n/}),l={className:"string",begin:/\$"/,end:'"',illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},e.BACKSLASH_ESCAPE,s]},c={className:"string",begin:/\$@"/,end:'"',contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},o]},d=e.inherit(c,{illegal:/\n/,contains:[{begin:/\{\{/},{begin:/\}\}/},{begin:'""'},s]});o.contains=[c,l,a,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,n,e.C_BLOCK_COMMENT_MODE],s.contains=[d,l,r,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,n,e.inherit(e.C_BLOCK_COMMENT_MODE,{illegal:/\n/})];let m={variants:[{className:"string",begin:/"""("*)(?!")(.|\n)*?"""\1/,relevance:1},c,l,a,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},g={begin:"<",end:">",contains:[{beginKeywords:"in out"},i]},b=e.IDENT_RE+"(<"+e.IDENT_RE+"(\\s*,\\s*"+e.IDENT_RE+")*>)?(\\[\\])?",p={begin:"@"+e.IDENT_RE,relevance:0};return{name:"C#",aliases:["cs","c#"],keywords:t,illegal:/::/,contains:[e.COMMENT("///","$",{returnBegin:!0,contains:[{className:"doctag",variants:[{begin:"///",relevance:0},{begin:"<!--|-->"},{begin:"</?",end:">"}]}]}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"meta",begin:"#",end:"$",keywords:{keyword:"if else elif endif define undef warning error line region endregion pragma checksum"}},m,n,{beginKeywords:"class interface",relevance:0,end:/[{;=]/,illegal:/[^\s:,]/,contains:[{beginKeywords:"where class"},i,g,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"namespace",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[i,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{beginKeywords:"record",relevance:0,end:/[{;=]/,illegal:/[^\s:]/,contains:[i,g,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:"^\\s*\\[(?=[\\w])",excludeBegin:!0,end:"\\]",excludeEnd:!0,contains:[{className:"string",begin:/"/,end:/"/}]},{beginKeywords:"new return throw await else",relevance:0},{className:"function",begin:"("+b+"\\s+)+"+e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,end:/\s*[{;=]/,excludeEnd:!0,keywords:t,contains:[{beginKeywords:"public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",relevance:0},{begin:e.IDENT_RE+"\\s*(<[^=]+>\\s*)?\\(",returnBegin:!0,contains:[e.TITLE_MODE,g],relevance:0},{match:/\(\)/},{className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:t,relevance:0,contains:[m,n,e.C_BLOCK_COMMENT_MODE]},e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]},p]}}},1777:function(e){e.exports=function(e){return{name:"CSP",case_insensitive:!1,keywords:{$pattern:"[a-zA-Z][a-zA-Z0-9_-]*",keyword:["base-uri","child-src","connect-src","default-src","font-src","form-action","frame-ancestors","frame-src","img-src","manifest-src","media-src","object-src","plugin-types","report-uri","sandbox","script-src","style-src","trusted-types","unsafe-hashes","worker-src"]},contains:[{className:"string",begin:"'",end:"'"},{className:"attribute",begin:"^Content",end:":",excludeEnd:!0}]}}},48496:function(e){let t=e=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),i=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video","defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],n=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),a=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),r=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),o=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse();e.exports=function(e){let s=e.regex,l=t(e),c=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE];return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[l.BLOCK_COMMENT,{begin:/-(webkit|moz|ms|o)-(?=[a-z])/},l.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\.[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0},l.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+a.join("|")+")"},{begin:":(:)?("+r.join("|")+")"}]},l.CSS_VARIABLE,{className:"attribute",begin:"\\b("+o.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[l.BLOCK_COMMENT,l.HEXCOLOR,l.IMPORTANT,l.CSS_NUMBER_MODE,...c,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...c,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},l.FUNCTION_DISPATCH]},{begin:s.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:/@-?\w[\w]*(-\w+)*/},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:"and or not only",attribute:n.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...c,l.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+i.join("|")+")\\b"}]}}}}]);