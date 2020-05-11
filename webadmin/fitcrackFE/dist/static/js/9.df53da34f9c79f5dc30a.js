webpackJsonp([9],{487:function(t,e,n){"use strict";function a(t){n(897),n(899)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(659),r=n(901),o=n(39),s=a,l=o(i.a,r.a,!1,s,"data-v-1cafc421",null);e.default=l.exports},497:function(t,e,n){"use strict";e.a={name:"FcTile",props:{title:String,loading:Boolean,icon:String}}},499:function(t,e,n){"use strict";var a=n(497),i=n(501),r=n(39),o=r(a.a,i.a,!1,null,null,null);e.a=o.exports},500:function(t,e,n){t.exports={default:n(506),__esModule:!0}},501:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"mx-auto",attrs:{flat:""}},[n("v-card-title",[t.icon?n("v-icon",{attrs:{left:""}},[t._v("\n      "+t._s(t.icon)+"\n    ")]):t._e(),t._v("\n    "+t._s(t.title)+"\n  ")],1),t._v(" "),n("v-card-text",{staticClass:"contentFcTile"},[t.loading?n("v-skeleton-loader",{staticClass:"mx-auto",attrs:{type:"article"}}):t._t("default")],2)],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},502:function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(503),r=a(i),o=n(500),s=a(o);e.default=function(){function t(t,e){var n=[],a=!0,i=!1,r=void 0;try{for(var o,l=(0,s.default)(t);!(a=(o=l.next()).done)&&(n.push(o.value),!e||n.length!==e);a=!0);}catch(t){i=!0,r=t}finally{try{!a&&l.return&&l.return()}finally{if(i)throw r}}return n}return function(e,n){if(Array.isArray(e))return e;if((0,r.default)(Object(e)))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},503:function(t,e,n){t.exports={default:n(504),__esModule:!0}},504:function(t,e,n){n(188),n(40),t.exports=n(505)},505:function(t,e,n){var a=n(41),i=n(3)("iterator"),r=n(8);t.exports=n(2).isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||r.hasOwnProperty(a(e))}},506:function(t,e,n){n(188),n(40),t.exports=n(507)},507:function(t,e,n){var a=n(5),i=n(42);t.exports=n(2).getIterator=function(t){var e=i(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return a(e.call(t))}},510:function(t,e,n){"use strict";var a=n(517),i=n.n(a),r=n(500),o=n.n(r),s=n(502),l=n.n(s);e.a={name:"FileUploader",props:{multiple:Boolean,url:{type:String,default:this.$serverAddr},noUpload:Boolean,label:{type:String,default:"Select files"},args:{type:Object,default:function(){}}},data:function(){return{selectedFiles:[],files:null,progress:0,showProgress:!1,fileUploaded:!1}},computed:{overSizeLimit:function(){return this.selectedFiles.some(function(t){return t.size>2e9})}},methods:{uploadChange:function(t){this.progress=Math.round(100*t.loaded/t.total),console.log(this.progress)},fileChange:function(t){this.files=new FormData,this.selectedFiles=[];for(var e=0;e<t.length;e++)this.selectedFiles.push({name:t[e].name,type:t[e].type||"n/a",size:t[e].size,modified:t[e].lastModifiedDate?t[e].lastModifiedDate.toLocaleDateString():"n/a"}),this.files.append("file",t[e],t[e].name);if(this.args){var n=!0,a=!1,r=void 0;try{for(var s,c=o()(i()(this.args));!(n=(s=c.next()).done);n=!0){var d=s.value,u=l()(d,2),f=u[0],v=u[1];this.files.append(f,v)}}catch(t){a=!0,r=t}finally{try{!n&&c.return&&c.return()}finally{if(a)throw r}}}this.fileUploaded=!1,this.progress=0,this.$emit("filesChanged",t)},upload:function(){var t=this;this.showProgress=!0;var e={withCredentials:!0,headers:{"Content-type":"multipart/form-data"},onUploadProgress:this.uploadChange};this.axios.post(this.url,this.files,e).then(function(e){t.fileUploaded=!0,t.$emit("uploadComplete",e.data),t.files=null}).catch(function(t){console.log(t)})}}}},516:function(t,e,n){"use strict";e.a={props:{selectAll:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}}},data:function(){return{items:[],loading:!1,search:"",selected:[]}},mounted:function(){this.getData(),this.value&&(this.selected=this.value)},methods:{getData:function(){console.error("Selector component missing getData method")},updateSelected:function(){this.$emit("input",this.selected)}},watch:{value:function(t){this.selected=t}}}},517:function(t,e,n){t.exports={default:n(518),__esModule:!0}},518:function(t,e,n){n(519),t.exports=n(2).Object.entries},519:function(t,e,n){var a=n(6),i=n(520)(!0);a(a.S,"Object",{entries:function(t){return i(t)}})},520:function(t,e,n){var a=n(23),i=n(24),r=n(190).f;t.exports=function(t){return function(e){for(var n,o=i(e),s=a(o),l=s.length,c=0,d=[];l>c;)r.call(o,n=s[c++])&&d.push(t?[n,o[n]]:o[n]);return d}}},522:function(t,e,n){"use strict";function a(t){n(523)}var i=n(510),r=n(525),o=n(39),s=a,l=o(i.a,r.a,!1,s,"data-v-1c1e87be",null);e.a=l.exports},523:function(t,e,n){var a=n(524);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(462)("60faad44",a,!0,{})},524:function(t,e,n){e=t.exports=n(461)(!0),e.push([t.i,".uploadInput[data-v-1c1e87be]{max-width:250px}.form[data-v-1c1e87be]{max-width:100%;text-align:center}.uploadButton[data-v-1c1e87be]{margin-top:15px}.spacer[data-v-1c1e87be]{width:10px}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/fileUploader/fileUploader.vue"],names:[],mappings:"AACA,8BACE,eAAiB,CAClB,AACD,uBACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,+BACE,eAAiB,CAClB,AACD,yBACE,UAAY,CACb",file:"fileUploader.vue",sourcesContent:["\n.uploadInput[data-v-1c1e87be] {\n  max-width: 250px;\n}\n.form[data-v-1c1e87be] {\n  max-width: 100%;\n  text-align: center;\n}\n.uploadButton[data-v-1c1e87be] {\n  margin-top: 15px;\n}\n.spacer[data-v-1c1e87be] {\n  width: 10px;\n}\n"],sourceRoot:""}])},525:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pt-0 mt-0"},[t.overSizeLimit?n("v-alert",{attrs:{type:"error",tile:""}},[t._v("\n    Maximum size of uploaded file is 2 GB.\n  ")]):t._e(),t._v(" "),n("form",{staticClass:"form pa-2",attrs:{enctype:"multipart/form-data"}},[n("v-file-input",{staticClass:"mr-2",attrs:{outlined:"",chips:"","show-size":"",label:t.label,name:"file",multiple:t.multiple},on:{change:t.fileChange}}),t._v(" "),t.noUpload?t._e():n("v-btn",{attrs:{color:"primary",outlined:"",disabled:null===t.files||t.overSizeLimit},on:{click:function(e){return t.upload()}}},[t._v("\n      Upload\n      "),n("v-icon",{attrs:{right:""}},[t._v("\n        mdi-upload\n      ")])],1)],1),t._v(" "),n("v-progress-linear",{attrs:{query:!0,active:t.showProgress,color:"primary"},model:{value:t.progress,callback:function(e){t.progress=e},expression:"progress"}})],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},551:function(t,e,n){"use strict";var a=n(554),i=n(577),r=n(39),o=r(a.a,i.a,!1,null,null,null);e.a=o.exports},554:function(t,e,n){"use strict";var a=n(516);e.a={name:"DictionarySelector",mixins:[a.a],data:function(){return{headers:[{text:"Name",align:"start",value:"name"},{text:"Keyspace",value:"keyspace",align:"end"},{text:"Time",value:"time",align:"end"}]}},methods:{getData:function(){var t=this;this.loading=!0,this.axios.get(this.$serverAddr+"/dictionary").then(function(e){t.items=e.data.items,t.loading=!1})}}}},577:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search,"item-key":"id","show-select":"","single-select":!t.selectAll},on:{input:t.updateSelected},scopedSlots:t._u([{key:"item.name",fn:function(e){var a=e.item;return[n("router-link",{attrs:{to:{name:"dictionaryDetail",params:{id:a.id}}}},[t._v("\n      "+t._s(a.name)+"\n      "),n("v-icon",{attrs:{small:"",color:"primary"}},[t._v("\n        mdi-open-in-new\n      ")])],1)]}},{key:"item.time",fn:function(e){var n=e.item;return[t._v("\n    "+t._s(t.$moment(n.time).format("DD.MM.YYYY HH:mm"))+"\n  ")]}}]),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})},i=[],r={render:a,staticRenderFns:i};e.a=r},578:function(t,e,n){"use strict";var a=n(551),i=n(522);e.a={components:{dictSelector:a.a,fileUploader:i.a},props:{value:Boolean,title:{type:String,default:"Upload or make from dictionary"},uploadUrl:{type:String,default:"#"},working:Boolean},data:function(){return{active:null,newName:"",customName:!1,selectedDict:[]}},computed:{open:{get:function(){return this.value},set:function(t){this.$emit("input",t)}}},watch:{selectedDict:function(t){0==this.newName.length&&(this.customName=!1),t.length>0&&!this.customName&&(this.newName=t[0].name)}},methods:{fileUploaded:function(){this.$emit("fileUploaded"),this.open=!1},dictionarySelected:function(){this.$emit("dictionarySelected",this.selectedDict[0].id,this.newName)}}}},590:function(t,e,n){"use strict";var a=n(578),i=n(591),r=n(39),o=r(a.a,i.a,!1,null,null,null);e.a=o.exports},591:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{"max-width":"600"},model:{value:t.open,callback:function(e){t.open=e},expression:"open"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v("\n      "+t._s(t.title)+"\n    ")]),t._v(" "),n("v-tabs",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[n("v-tab",{attrs:{ripple:""}},[t._v("\n        Upload file\n      ")]),t._v(" "),n("v-tab",{attrs:{ripple:""}},[t._v("\n        Make from dictionary\n      ")]),t._v(" "),n("v-tab-item",[n("v-card",{attrs:{text:""}},[n("file-uploader",{attrs:{url:t.uploadUrl},on:{uploadComplete:t.fileUploaded}})],1)],1),t._v(" "),n("v-tab-item",[t.working?n("div",{staticClass:"text-center"},[n("v-progress-circular",{staticClass:"ma-5",attrs:{size:"50",width:3,indeterminate:"",color:"primary"}})],1):n("v-card",{attrs:{flat:""}},[n("dict-selector",{model:{value:t.selectedDict,callback:function(e){t.selectedDict=e},expression:"selectedDict"}}),t._v(" "),n("v-card-actions",[n("v-text-field",{staticClass:"mr-2",attrs:{outlined:"",dense:"","hide-details":"",label:"Name"},on:{input:function(e){t.customName=!0}},model:{value:t.newName,callback:function(e){t.newName=e},expression:"newName"}}),t._v(" "),n("v-btn",{attrs:{color:"primary",outlined:"",disabled:0==t.selectedDict.length||""===t.newName},on:{click:t.dictionarySelected}},[t._v("\n              Make from dictionary\n            ")])],1)],1)],1)],1)],1)],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},659:function(t,e,n){"use strict";var a=n(499),i=n(590);e.a={name:"MarkovView",components:{fileCreator:i.a,"fc-tile":a.a},data:function(){return{working:!1,dialog:!1,loading:!1,headers:[{text:"Name",align:"start",value:"name"},{text:"Added",value:"time",align:"end"},{text:"Actions",value:"actions",align:"end",sortable:!1}],markovChains:[]}},mounted:function(){this.loadMarkovChains()},methods:{loadMarkovChains:function(){var t=this;this.dialog=!1,this.loading=!0,this.axios.get(this.$serverAddr+"/markovChains",{}).then(function(e){t.markovChains=e.data,t.loading=!1})},makeHcStatFromDictionary:function(t,e){var n=this;this.working=!0,this.axios.post(this.$serverAddr+"/markovChains/makeFromDictionary",{dictionary_id:t,name:e}).then(function(t){n.working=!1,n.dialog=!1,n.loadMarkovChains()}).catch(function(t){n.working=!1})},deleteMarkov:function(t){var e=this;this.$root.$confirm("Delete","This will remove "+t.name+" from your Markov chains. Are you sure?").then(function(n){e.loading=!0,e.axios.delete(e.$serverAddr+"/markovChains/"+t.id).then(function(t){e.loadMarkovChains()})})}}}},897:function(t,e,n){var a=n(898);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(462)("353d21f2",a,!0,{})},898:function(t,e,n){e=t.exports=n(461)(!0),e.push([t.i,".noEvent[data-v-1cafc421]{pointer-events:none;display:inline-block}.dz-message[data-v-1cafc421]{cursor:pointer;text-align:center}.max500[data-v-1cafc421]{max-width:600px}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/markovChains/markovView.vue"],names:[],mappings:"AACA,0BACE,oBAAqB,AACrB,oBAAsB,CACvB,AACD,6BACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,yBACE,eAAiB,CAClB",file:"markovView.vue",sourcesContent:["\n.noEvent[data-v-1cafc421] {\n  pointer-events: none;\n  display: inline-block;\n}\n.dz-message[data-v-1cafc421] {\n  cursor: pointer;\n  text-align: center;\n}\n.max500[data-v-1cafc421] {\n  max-width: 600px;\n}\n\n"],sourceRoot:""}])},899:function(t,e,n){var a=n(900);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(462)("047818f5",a,!0,{})},900:function(t,e,n){e=t.exports=n(461)(!0),e.push([t.i,".selectedDict{background:rgba(37,157,173,.85)!important;color:#fff}.selectedDict a{color:#fff}.clickable{cursor:pointer}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/markovChains/markovView.vue"],names:[],mappings:"AACA,cACE,0CAAgD,AAChD,UAAa,CACd,AACD,gBACE,UAAa,CACd,AACD,WACE,cAAgB,CACjB",file:"markovView.vue",sourcesContent:["\n.selectedDict {\n  background: rgba(37, 157, 173, 0.85) !important;\n  color: white;\n}\n.selectedDict a {\n  color: white;\n}\n.clickable {\n  cursor: pointer;\n}\n"],sourceRoot:""}])},901:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"max500"},[n("fc-tile",{staticClass:"ma-2",attrs:{title:"Markov chains",icon:t.$route.meta.icon}},[n("v-alert",{staticClass:"mb-0",attrs:{tile:"",text:"",type:"warning"}},[t._v("\n      Markov files must have a .hcstat extension.\n    ")]),t._v(" "),n("v-data-table",{attrs:{headers:t.headers,items:t.markovChains.items,loading:t.loading,"footer-props":{itemsPerPageOptions:[10,25,50],itemsPerPageText:"Hcstats per page"}},scopedSlots:t._u([{key:"item.time",fn:function(e){var n=e.item;return[t._v("\n        "+t._s(t.$moment(n.time).format("DD.MM.YYYY HH:mm"))+"\n      ")]}},{key:"item.actions",fn:function(e){var a=e.item;return[n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("a",t._g({attrs:{href:t.$serverAddr+"/markovChains/"+a.id,target:"_blank",download:""}},i),[n("v-btn",{attrs:{icon:""}},[n("v-icon",[t._v("mdi-file-download-outline")])],1)],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Download")])]),t._v(" "),n("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-btn",t._g({attrs:{icon:""},on:{click:function(e){return t.deleteMarkov(a)}}},i),[n("v-icon",{attrs:{color:"error"}},[t._v("\n                mdi-delete-outline\n              ")])],1)]}}],null,!0)},[t._v(" "),n("span",[t._v("Delete")])])]}}])}),t._v(" "),n("div",{staticClass:"text-right pa-3"},[n("v-btn",{staticClass:"d-inline-block",attrs:{color:"primary",text:"",outlined:""},nativeOn:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[t._v("\n        Add new\n      ")])],1)],1),t._v(" "),n("file-creator",{attrs:{title:"Add new HcStat","upload-url":this.$serverAddr+"/pcfg/add",working:t.working},on:{fileUploaded:t.loadMarkovChains,dictionarySelected:t.makeHcStatFromDictionary},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}})],1)},i=[],r={render:a,staticRenderFns:i};e.a=r}});
//# sourceMappingURL=9.df53da34f9c79f5dc30a.js.map