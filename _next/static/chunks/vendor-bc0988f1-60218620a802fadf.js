"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7883],{34135:function(e,t,n){var i=n(94689);t.Z={read:function(e){return{"GIF Version":function(e){if(6>e.byteLength)return;let t=(0,i.oH)(e,3,3);return{value:t,description:t}}(e),"Image Width":function(e){if(8>e.byteLength)return;let t=e.getUint16(6,!0);return{value:t,description:`${t}px`}}(e),"Image Height":function(e){if(10>e.byteLength)return;let t=e.getUint16(8,!0);return{value:t,description:`${t}px`}}(e),"Global Color Map":function(e){if(11>e.byteLength)return;let t=(128&e.getUint8(10))>>>7;return{value:t,description:1===t?"Yes":"No"}}(e),"Bits Per Pixel":function(e){if(11>e.byteLength)return;let t=(7&e.getUint8(10))+1;return{value:t,description:`${t} ${1===t?"bit":"bits"}`}}(e),"Color Resolution Depth":function(e){if(11>e.byteLength)return;let t=((112&e.getUint8(10))>>>4)+1;return{value:t,description:`${t} ${1===t?"bit":"bits"}`}}(e)}}}},75471:function(e,t,n){n.d(t,{Z:function(){return u}});var i=n(94689);let r={desc:{name:"ICC Description"},cprt:{name:"ICC Copyright"},dmdd:{name:"ICC Device Model Description"},vued:{name:"ICC Viewing Conditions Description"},dmnd:{name:"ICC Device Manufacturer for Display"},tech:{name:"Technology"}},f={4:{name:"Preferred CMM type",value:(e,t)=>(0,i.oH)(e,t,4),description:e=>null!==e?o(e):""},8:{name:"Profile Version",value:(e,t)=>e.getUint8(t).toString(10)+"."+(e.getUint8(t+1)>>4).toString(10)+"."+(e.getUint8(t+1)%16).toString(10)},12:{name:"Profile/Device class",value:(e,t)=>(0,i.oH)(e,t,4),description:e=>{switch(e.toLowerCase()){case"scnr":return"Input Device profile";case"mntr":return"Display Device profile";case"prtr":return"Output Device profile";case"link":return"DeviceLink profile";case"abst":return"Abstract profile";case"spac":return"ColorSpace profile";case"nmcl":return"NamedColor profile";case"cenc":return"ColorEncodingSpace profile";case"mid ":return"MultiplexIdentification profile";case"mlnk":return"MultiplexLink profile";case"mvis":return"MultiplexVisualization profile";default:return e}}},16:{name:"Color Space",value:(e,t)=>(0,i.oH)(e,t,4)},20:{name:"Connection Space",value:(e,t)=>(0,i.oH)(e,t,4)},24:{name:"ICC Profile Date",value:(e,t)=>(function(e,t){let n=e.getUint16(t),i=e.getUint16(t+2)-1,r=e.getUint16(t+4);return new Date(Date.UTC(n,i,r,e.getUint16(t+6),e.getUint16(t+8),e.getUint16(t+10)))})(e,t).toISOString()},36:{name:"ICC Signature",value:(e,t)=>{var n;return n=e.buffer.slice(t,t+4),String.fromCharCode.apply(null,new Uint8Array(n))}},40:{name:"Primary Platform",value:(e,t)=>(0,i.oH)(e,t,4),description:e=>o(e)},48:{name:"Device Manufacturer",value:(e,t)=>(0,i.oH)(e,t,4),description:e=>o(e)},52:{name:"Device Model Number",value:(e,t)=>(0,i.oH)(e,t,4)},64:{name:"Rendering Intent",value:(e,t)=>e.getUint32(t),description:e=>{switch(e){case 0:return"Perceptual";case 1:return"Relative Colorimetric";case 2:return"Saturation";case 3:return"Absolute Colorimetric";default:return e}}},80:{name:"Profile Creator",value:(e,t)=>(0,i.oH)(e,t,4)}};function o(e){switch(e.toLowerCase()){case"appl":return"Apple";case"adbe":return"Adobe";case"msft":return"Microsoft";case"sunw":return"Sun Microsystems";case"sgi":return"Silicon Graphics";case"tgnt":return"Taligent";default:return e}}var u={read:function(e,t,n){return n&&t[0].compressionMethod!==i.p4?function(e,t){if(t[0].compressionMethod!==i.Nf)return{};let n=new DataView(e.buffer.slice(t[0].offset,t[0].offset+t[0].length));return(0,i.Lj)(n,t[0].compressionMethod,"utf-8","dataview").then(s).catch(()=>({}))}(e,t):function(e,t){try{let n=t.reduce((e,t)=>e+t.length,0),i=new Uint8Array(n),r=0,f=Array.isArray(e)?new DataView(Uint8Array.from(e).buffer).buffer:e.buffer;for(let e=1;e<=t.length;e++){let n=t.find(t=>t.chunkNumber===e);if(!n)throw Error(`ICC chunk ${e} not found`);let o=f.slice(n.offset,n.offset+n.length),u=new Uint8Array(o);i.set(u,r),r+=u.length}return s(new DataView(i.buffer))}catch(e){return{}}}(e,t)}};function s(e){let t=e.buffer,n=e.getUint32();if(e.byteLength!==n)throw Error("ICC profile length not matching");if(e.length<84)throw Error("ICC profile too short");let r={},o=Object.keys(f);for(let t=0;t<o.length;t++){let n=o[t],i=f[n],u=i.value(e,parseInt(n,10)),s=u;i.description&&(s=i.description(u)),r[i.name]={value:u,description:s}}if("acsp"!==l(t.slice(36,40)))throw Error("ICC profile: missing signature");if(t.length<132)return r;let u=e.getUint32(128),s=132;for(let n=0;n<u;n++){var a;if(a=s,t.length<a+12)break;let n=(0,i.oH)(e,s,4),f=e.getUint32(s+4),o=e.getUint32(s+8);if(f>t.length)break;let u=(0,i.oH)(e,f,4);if("desc"===u){let i=e.getUint32(f+8);if(i>o)return r;c(r,n,l(t.slice(f+12,f+i+11)))}else if("mluc"===u){let t=e.getUint32(f+8),o=e.getUint32(f+12),u=f+16,s=[];for(let n=0;n<t;n++){let t=(0,i.oH)(e,u+0,2),n=(0,i.oH)(e,u+2,2),r=e.getUint32(u+4),l=e.getUint32(u+8),c=(0,i.cs)(e,f+l,r);s.push({languageCode:t,countryCode:n,text:c}),u+=o}if(1===t)c(r,n,s[0].text);else{let e={};for(let t=0;t<s.length;t++)e[`${s[t].languageCode}-${s[t].countryCode}`]=s[t].text;c(r,n,e)}}else"text"===u?c(r,n,l(t.slice(f+8,f+o-7))):"sig "===u&&c(r,n,l(t.slice(f+8,f+12)));s+=12}return r}function l(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function c(e,t,n){r[t]?e[r[t].name]={value:n,description:n}:e[t]={value:n,description:n}}},64851:function(e,t,n){n.d(t,{Gj:function(){return o},Ic:function(){return s},Jn:function(){return g},ZN:function(){return d},a0:function(){return a},oT:function(){return h},vx:function(){return l},z_:function(){return p},zi:function(){return u}});var i=n(94689),r=n(96532);t.ZP={isPngFile:function(e){return!!e&&(0,i.oH)(e,0,f.length)===f},findPngOffsets:function(e,t){let n={hasAppMarkers:!1},m=f.length;for(;m+4+o<=e.byteLength;){var U,C,I,x,y;if(r.Z.USE_PNG_FILE&&(U=m,"IHDR"===(0,i.oH)(e,U+s,o)))n.hasAppMarkers=!0,n.pngHeaderOffset=m+l;else if(r.Z.USE_XMP&&(C=m,(0,i.oH)(e,C+s,o)===g&&(0,i.oH)(e,C+l,c.length)===c)){let t=function(e,t){t+=l+c.length+1+1;let n=0;for(;n<2&&t<e.byteLength;)0===e.getUint8(t)&&n++,t++;if(!(n<2))return t}(e,m);void 0!==t&&(n.hasAppMarkers=!0,n.xmpChunks=[{dataOffset:t,length:e.getUint32(m+u)-(t-(m+l))}])}else if(function(e,t,n){let r=(0,i.oH)(e,t+s,o);return r===a||r===g||r===p&&n}(e,m,t)){n.hasAppMarkers=!0;let t=(0,i.oH)(e,m+s,o);n.pngTextChunks||(n.pngTextChunks=[]),n.pngTextChunks.push({length:e.getUint32(m+u),type:t,offset:m+l})}else if(I=m,"eXIf"===(0,i.oH)(e,I+s,o))n.hasAppMarkers=!0,n.tiffHeaderOffset=m+l;else if(r.Z.USE_ICC&&t&&(x=m,"iCCP"===(0,i.oH)(e,x+s,o))){n.hasAppMarkers=!0;let t=e.getUint32(m+u),r=m+l,{profileName:f,compressionMethod:o,compressedProfileOffset:s}=function(e,t){let n=(0,i.o7)(e,t);return t+=n.length+1,{profileName:n,compressionMethod:e.getUint8(t),compressedProfileOffset:t+=1}}(e,r);n.iccChunks||(n.iccChunks=[]),n.iccChunks.push({offset:s,length:t-(s-r),chunkNumber:1,chunksTotal:1,profileName:f,compressionMethod:o})}else y=m,[h,d].includes((0,i.oH)(e,y+s,o))&&(n.hasAppMarkers=!0,n.pngChunkOffsets||(n.pngChunkOffsets=[]),n.pngChunkOffsets.push(m+u));m+=e.getUint32(m+u)+4+o+4}return n}};let f="\x89PNG\r\n\x1a\n",o=4,u=0,s=4,l=8,c="XML:com.adobe.xmp\0",a="tEXt",g="iTXt",p="zTXt",h="pHYs",d="tIME"},12630:function(e,t,n){n.d(t,{Z:function(){return M}});var i=n(96532),r=n(84014),f={isTiffFile:function(e){return!!e&&e.byteLength>=4&&function(e){let t=e.getUint16(0)===r.Z.LITTLE_ENDIAN;return 42===e.getUint16(2,t)}(e)},findTiffOffsets:function(){return i.Z.USE_EXIF?{hasAppMarkers:!0,tiffHeaderOffset:0}:{}}},o=n(94689),u={isJpegFile:function(e){return!!e&&e.byteLength>=2&&65496===e.getUint16(0)},findJpegOffsets:function(e){let t,n,r,f,u,U,C,I,x,y=2;for(;y+4+5<=e.byteLength;){var b,v,E,S,O;if(i.Z.USE_FILE&&(b=y,65472===e.getUint16(b)))t=e.getUint16(y+2),n=y+2;else if(i.Z.USE_FILE&&(v=y,65474===e.getUint16(v)))t=e.getUint16(y+2),r=y+2;else if(i.Z.USE_JFIF&&function(e,t){let n=g.length;return 65504===e.getUint16(t)&&(0,o.oH)(e,t+4,n)===g&&0===e.getUint8(t+4+n)}(e,y))t=e.getUint16(y+2),f=y+2;else if(i.Z.USE_EXIF&&function(e,t){let n=p.length;return 65505===e.getUint16(t)&&(0,o.oH)(e,t+4,n)===p&&0===e.getUint8(t+4+n)}(e,y))t=e.getUint16(y+2),u=y+10;else if(i.Z.USE_XMP&&(E=y,65505===e.getUint16(E)&&function(e,t){let n=h.length;return(0,o.oH)(e,t+4,n)===h}(e,E)))C||(C=[]),t=e.getUint16(y+2),C.push({dataOffset:y+33,length:t-31});else if(i.Z.USE_XMP&&(S=y,65505===e.getUint16(S)&&function(e,t){let n=d.length;return(0,o.oH)(e,t+4,n)===d}(e,S)))C||(C=[]),t=e.getUint16(y+2),C.push({dataOffset:y+79,length:t-77});else if(i.Z.USE_IPTC&&function(e,t){let n=m.length;return 65517===e.getUint16(t)&&(0,o.oH)(e,t+4,n)===m&&0===e.getUint8(t+4+n)}(e,y))t=e.getUint16(y+2),U=y+18;else if(i.Z.USE_ICC&&function(e,t){let n=s.length;return 65506===e.getUint16(t)&&(0,o.oH)(e,t+4,n)===s}(e,y)){t=e.getUint16(y+2);let n=y+18,i=t-16,r=e.getUint8(y+l),f=e.getUint8(y+c);I||(I=[]),I.push({offset:n,length:i,chunkNumber:r,chunksTotal:f})}else if(i.Z.USE_MPF&&function(e,t){let n=a.length;return 65506===e.getUint16(t)&&(0,o.oH)(e,t+4,n)===a}(e,y))t=e.getUint16(y+2),x=y+8;else if(function(e,t){let n=e.getUint16(t);return n>=65504&&n<=65519||65534===n||65472===n||65474===n||65476===n||65499===n||65501===n||65498===n}(e,y))t=e.getUint16(y+2);else{if(O=y,65535===e.getUint16(O)){y++;continue}break}y+=2+t}return{hasAppMarkers:y>2,fileDataOffset:n||r,jfifDataOffset:f,tiffHeaderOffset:u,iptcDataOffset:U,xmpChunks:C,iccChunks:I,mpfDataOffset:x}}};let s="ICC_PROFILE\0",l=4+s.length,c=l+1,a="MPF\0",g="JFIF",p="Exif",h="http://ns.adobe.com/xap/1.0/\0",d="http://ns.adobe.com/xmp/extension/\0",m="Photoshop 3.0";var U=n(64851);function C(e,t,n){return 4===n?e.getUint32(t):8===n?(console.warn("This file uses an 8-bit offset which is currently not supported by ExifReader. Contact the maintainer to get it fixed."),e.getUint32(t+4)):0}function I(e,t){var n;let{length:i,contentOffset:r}=function(e,t){let n=e.getUint32(t);return 0===n?{length:e.byteLength-t,contentOffset:t+4+4}:1===n&&0===e.getUint32(t+8)?{length:e.getUint32(t+12),contentOffset:t+4+4+8}:{length:n,contentOffset:t+4+4}}(e,t);if(i<8)return;let f=e.getUint32(t+4);if(1718909296===f)return{type:"ftyp",majorBrand:(0,o.oH)(e,r,4),length:i};if(1768977008===f)return{type:"iprp",subBoxes:b(e,r,i-(r-t)),length:i};if(1768973167===f)return{type:"ipco",properties:b(e,r,i-(r-t)),length:i};if(1668246642===f)return{type:"colr",icc:function(e,t){let n=(0,o.oH)(e,t,4);if("prof"===n||"rICC"===n)return{offset:t+4,length:e.getUint32(t+4),chunkNumber:1,chunksTotal:1}}(e,r),length:i};let u=e.getUint8(r);return 1835365473===f?{type:"meta",subBoxes:b(e,(n=r+1)+3,i-(n+3-t)),length:i}:1768714083===f?function(e,t,n,i){var r;let{offsets:f,sizes:o}=function(e,t){let n={item:{dataReferenceIndex:2,extentCount:2,extent:{}}};e<2?(n.itemCount=2,n.item.itemId=2):2===e&&(n.itemCount=4,n.item.itemId=4),1===e||2===e?n.item.constructionMethod=2:n.item.constructionMethod=0;let i={offsetSize:t,lengthSize:t,baseOffsetSize:t+1,indexSize:t+1};return i.itemCount=t+2,i.items=i.itemCount+n.itemCount,i.item={itemId:0},i.item.constructionMethod=i.item.itemId+n.item.itemId,i.item.dataReferenceIndex=i.item.constructionMethod+n.item.constructionMethod,{offsets:i,sizes:n}}(t,n+3),u=e.getUint8(f.offsetSize)>>4;o.item.extent.extentOffset=u;let s=15&e.getUint8(f.lengthSize);o.item.extent.extentLength=s;let l=e.getUint8(f.baseOffsetSize)>>4;o.item.baseOffset=l;let c=function(e,t,n){if(1===n||2===n)return 15&e.getUint8(t)}(e,f.indexSize,t);o.item.extent.extentIndex=void 0!==c?c:0;let a=(r=f.itemCount,t<2?e.getUint16(r):2===t?e.getUint32(r):void 0);return{type:"iloc",items:function(e,t,n,i,r,f,o,u){if(void 0===u)return[];let s=[],l=n.items;for(let n=0;n<u;n++){var c;let n={extents:[]};n.itemId=(c=l,t<2?e.getUint16(c):2===t?e.getUint32(c):void 0),l+=i.item.itemId,n.constructionMethod=1===t||2===t?15&e.getUint16(l):void 0,l+=i.item.constructionMethod,n.dataReferenceIndex=e.getUint16(l),l+=i.item.dataReferenceIndex,n.baseOffset=C(e,l,i.item.baseOffset),l+=i.item.baseOffset,n.extentCount=e.getUint16(l),l+=i.item.extentCount;for(let u=0;u<n.extentCount;u++){let u={};u.extentIndex=function(e,t,n,i){if((1===t||2===t)&&i>0)return C(e,n,i)}(e,t,l,o),l+=i.item.extent.extentIndex,u.extentOffset=C(e,l,r),l+=i.item.extent.extentOffset,u.extentLength=C(e,l,f),l+=i.item.extent.extentLength,n.extents.push(u)}s.push(n)}return s}(e,t,f,o,u,s,c,a),length:i}}(e,u,r+1,i):1768517222===f?function(e,t,n,i,r){let{offsets:f}=function(e,t){let n={entryCount:t+3},i={};return 0===e?i.entryCount=2:i.entryCount=4,n.itemInfos=n.entryCount+i.entryCount,{offsets:n}}(n,i);return{type:"iinf",itemInfos:b(e,f.itemInfos,r-(f.itemInfos-t)),length:r}}(e,t,u,r+1,i):1768842853===f?function(e,t,n,i,r){i+=3;let f={type:"infe",length:r};return(0===n||1===n)&&(f.itemId=e.getUint16(i),i+=2,f.itemProtectionIndex=e.getUint16(i),i+=2,f.itemName=(0,o.o7)(e,i),i+=f.itemName.length+1),n>=2&&(2===n?(f.itemId=e.getUint16(i),i+=2):3===n&&(f.itemId=e.getUint32(i),i+=4),f.itemProtectionIndex=e.getUint16(i),i+=2,f.itemType=e.getUint32(i),i+=4,f.itemName=(0,o.o7)(e,i),i+=f.itemName.length+1,1835625829===f.itemType?(f.contentType=(0,o.o7)(e,i),t+r>(i+=f.contentType.length+1)&&(f.contentEncoding=(0,o.o7)(e,i),i+=f.contentEncoding.length+1)):1970432288===f.itemType&&(f.itemUri=(0,o.o7)(e,i),i+=f.itemUri.length+1)),f}(e,t,u,r+1,i):{type:void 0,length:i}}function x(e){if(i.Z.USE_EXIF||i.Z.USE_XMP||i.Z.USE_ICC){let t={},n=function(e){let t=0;for(;t+4+4<=e.byteLength;){let n=I(e,t);if(void 0===n)break;if("meta"===n.type)return n;t+=n.length}}(e);return n?(i.Z.USE_EXIF&&(t.tiffHeaderOffset=function(e,t){try{let n=t.subBoxes.find(e=>"iinf"===e.type).itemInfos.find(e=>1165519206===e.itemType).itemId,i=y(t,n),r=i.baseOffset+i.extents[0].extentOffset;return r+4+e.getUint32(r)}catch(e){return}}(e,n)),i.Z.USE_XMP&&(t.xmpChunks=function(e){try{let t=e.subBoxes.find(e=>"iinf"===e.type).itemInfos.find(e=>1835625829===e.itemType&&"application/rdf+xml"===e.contentType).itemId,n=y(e,t),i=y(e,t).extents[0];return[{dataOffset:n.baseOffset+i.extentOffset,length:i.extentLength}]}catch(e){return}}(n)),i.Z.USE_ICC&&(t.iccChunks=function(e){try{let t=e.subBoxes.find(e=>"iprp"===e.type).subBoxes.find(e=>"ipco"===e.type).properties.find(e=>"colr"===e.type).icc;if(t)return[t]}catch(e){}}(n)),t.hasAppMarkers=void 0!==t.tiffHeaderOffset||void 0!==t.xmpChunks||void 0!==t.iccChunks,t):{hasAppMarkers:!1}}return{}}function y(e,t){return e.subBoxes.find(e=>"iloc"===e.type).items.find(e=>e.itemId===t)}function b(e,t,n){let i=[1165519206,1835625829],r=[],f=t;for(;f<t+n;){let t=I(e,f);if(void 0===t)break;void 0!==t.type&&(void 0===t.itemType||-1!==i.indexOf(t.itemType))&&r.push(t),f+=t.length}return r}var v={isHeicFile:function(e){if(!e)return!1;try{let t=I(e,0);return t&&-1!==["heic","heix","hevc","hevx","heim","heis","hevm","hevs","mif1"].indexOf(t.majorBrand)}catch(e){return!1}},findHeicOffsets:function(e){return x(e)}},E={isAvifFile:function(e){if(!e)return!1;try{let t=I(e,0);return t&&"avif"===t.majorBrand}catch(e){return!1}},findAvifOffsets:function(e){return x(e)}},S={isWebpFile:function(e){let t="RIFF",n="WEBP";return!!e&&(0,o.oH)(e,0,t.length)===t&&(0,o.oH)(e,8,n.length)===n},findOffsets:function(e){let t,n,r,f;let u="Exif\0\0",s=12,l=!1;for(;s+8<e.byteLength;){let c=(0,o.oH)(e,s,4),a=e.getUint32(s+4,!0);i.Z.USE_EXIF&&"EXIF"===c?(l=!0,t=(0,o.oH)(e,s+8,u.length)===u?s+8+u.length:s+8):i.Z.USE_XMP&&"XMP "===c?(l=!0,n=[{dataOffset:s+8,length:a}]):i.Z.USE_ICC&&"ICCP"===c?(l=!0,r=[{offset:s+8,length:a,chunkNumber:1,chunksTotal:1}]):"VP8X"===c&&(l=!0,f=s+8),s+=8+(a%2==0?a:a+1)}return{hasAppMarkers:l,tiffHeaderOffset:t,xmpChunks:n,iccChunks:r,vp8xChunkOffset:f}}},O={isGifFile:function(e){return!!e&&H.includes((0,o.oH)(e,0,6))},findOffsets:function(){return{gifHeaderOffset:0}}};let H=["GIF87a","GIF89a"];var k=n(13777),M={parseAppMarkers:function(e,t){if(i.Z.USE_TIFF&&f.isTiffFile(e))return P(f.findTiffOffsets(),"tiff","TIFF");if(i.Z.USE_JPEG&&u.isJpegFile(e))return P(u.findJpegOffsets(e),"jpeg","JPEG");if(i.Z.USE_PNG&&U.ZP.isPngFile(e))return P(U.ZP.findPngOffsets(e,t),"png","PNG");if(i.Z.USE_HEIC&&v.isHeicFile(e))return P(v.findHeicOffsets(e),"heic","HEIC");if(i.Z.USE_AVIF&&E.isAvifFile(e))return P(E.findAvifOffsets(e),"avif","AVIF");if(i.Z.USE_WEBP&&S.isWebpFile(e))return P(S.findOffsets(e),"webp","WebP");if(i.Z.USE_GIF&&O.isGifFile(e))return P(O.findOffsets(e),"gif","GIF");if(i.Z.USE_XMP&&k.Z.isXMLFile(e))return P(k.Z.findOffsets(e),"xml","XML");throw Error("Invalid image format")}};function P(e,t,n){return(0,o.wB)({},e,{fileType:{value:t,description:n}})}}}]);