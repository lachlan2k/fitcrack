webpackJsonp([12],{482:function(e,t,n){"use strict";function r(e){n(876),n(878)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(654),o=n(880),i=n(39),s=r,l=i(a.a,o.a,!1,s,"data-v-2abe0504",null);t.default=l.exports},497:function(e,t,n){"use strict";t.a={name:"FcTile",props:{title:String,loading:Boolean,icon:String}}},499:function(e,t,n){"use strict";var r=n(497),a=n(501),o=n(39),i=o(r.a,a.a,!1,null,null,null);t.a=i.exports},500:function(e,t,n){e.exports={default:n(506),__esModule:!0}},501:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"mx-auto",attrs:{flat:""}},[n("v-card-title",[e.icon?n("v-icon",{attrs:{left:""}},[e._v("\n      "+e._s(e.icon)+"\n    ")]):e._e(),e._v("\n    "+e._s(e.title)+"\n  ")],1),e._v(" "),n("v-card-text",{staticClass:"contentFcTile"},[e.loading?n("v-skeleton-loader",{staticClass:"mx-auto",attrs:{type:"article"}}):e._t("default")],2)],1)},a=[],o={render:r,staticRenderFns:a};t.a=o},502:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=n(503),o=r(a),i=n(500),s=r(i);t.default=function(){function e(e,t){var n=[],r=!0,a=!1,o=void 0;try{for(var i,l=(0,s.default)(e);!(r=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){a=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(a)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if((0,o.default)(Object(t)))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},503:function(e,t,n){e.exports={default:n(504),__esModule:!0}},504:function(e,t,n){n(188),n(40),e.exports=n(505)},505:function(e,t,n){var r=n(41),a=n(3)("iterator"),o=n(8);e.exports=n(2).isIterable=function(e){var t=Object(e);return void 0!==t[a]||"@@iterator"in t||o.hasOwnProperty(r(t))}},506:function(e,t,n){n(188),n(40),e.exports=n(507)},507:function(e,t,n){var r=n(5),a=n(42);e.exports=n(2).getIterator=function(e){var t=a(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},510:function(e,t,n){"use strict";var r=n(517),a=n.n(r),o=n(500),i=n.n(o),s=n(502),l=n.n(s);t.a={name:"FileUploader",props:{multiple:Boolean,url:{type:String,default:this.$serverAddr},noUpload:Boolean,label:{type:String,default:"Select files"},args:{type:Object,default:function(){}}},data:function(){return{selectedFiles:[],files:null,progress:0,showProgress:!1,fileUploaded:!1}},computed:{overSizeLimit:function(){return this.selectedFiles.some(function(e){return e.size>2e9})}},methods:{uploadChange:function(e){this.progress=Math.round(100*e.loaded/e.total),console.log(this.progress)},fileChange:function(e){this.files=new FormData,this.selectedFiles=[];for(var t=0;t<e.length;t++)this.selectedFiles.push({name:e[t].name,type:e[t].type||"n/a",size:e[t].size,modified:e[t].lastModifiedDate?e[t].lastModifiedDate.toLocaleDateString():"n/a"}),this.files.append("file",e[t],e[t].name);if(this.args){var n=!0,r=!1,o=void 0;try{for(var s,c=i()(a()(this.args));!(n=(s=c.next()).done);n=!0){var u=s.value,d=l()(u,2),f=d[0],p=d[1];this.files.append(f,p)}}catch(e){r=!0,o=e}finally{try{!n&&c.return&&c.return()}finally{if(r)throw o}}}this.fileUploaded=!1,this.progress=0,this.$emit("filesChanged",e)},upload:function(){var e=this;this.showProgress=!0;var t={withCredentials:!0,headers:{"Content-type":"multipart/form-data"},onUploadProgress:this.uploadChange};this.axios.post(this.url,this.files,t).then(function(t){e.fileUploaded=!0,e.$emit("uploadComplete",t.data),e.files=null}).catch(function(e){console.log(e)})}}}},517:function(e,t,n){e.exports={default:n(518),__esModule:!0}},518:function(e,t,n){n(519),e.exports=n(2).Object.entries},519:function(e,t,n){var r=n(6),a=n(520)(!0);r(r.S,"Object",{entries:function(e){return a(e)}})},520:function(e,t,n){var r=n(23),a=n(24),o=n(190).f;e.exports=function(e){return function(t){for(var n,i=a(t),s=r(i),l=s.length,c=0,u=[];l>c;)o.call(i,n=s[c++])&&u.push(e?[n,i[n]]:i[n]);return u}}},522:function(e,t,n){"use strict";function r(e){n(523)}var a=n(510),o=n(525),i=n(39),s=r,l=i(a.a,o.a,!1,s,"data-v-1c1e87be",null);t.a=l.exports},523:function(e,t,n){var r=n(524);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(462)("60faad44",r,!0,{})},524:function(e,t,n){t=e.exports=n(461)(!0),t.push([e.i,".uploadInput[data-v-1c1e87be]{max-width:250px}.form[data-v-1c1e87be]{max-width:100%;text-align:center}.uploadButton[data-v-1c1e87be]{margin-top:15px}.spacer[data-v-1c1e87be]{width:10px}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/fileUploader/fileUploader.vue"],names:[],mappings:"AACA,8BACE,eAAiB,CAClB,AACD,uBACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,+BACE,eAAiB,CAClB,AACD,yBACE,UAAY,CACb",file:"fileUploader.vue",sourcesContent:["\n.uploadInput[data-v-1c1e87be] {\n  max-width: 250px;\n}\n.form[data-v-1c1e87be] {\n  max-width: 100%;\n  text-align: center;\n}\n.uploadButton[data-v-1c1e87be] {\n  margin-top: 15px;\n}\n.spacer[data-v-1c1e87be] {\n  width: 10px;\n}\n"],sourceRoot:""}])},525:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"pt-0 mt-0"},[e.overSizeLimit?n("v-alert",{attrs:{type:"error",tile:""}},[e._v("\n    Maximum size of uploaded file is 2 GB.\n  ")]):e._e(),e._v(" "),n("form",{staticClass:"form pa-2",attrs:{enctype:"multipart/form-data"}},[n("v-file-input",{staticClass:"mr-2",attrs:{outlined:"",chips:"","show-size":"",label:e.label,name:"file",multiple:e.multiple},on:{change:e.fileChange}}),e._v(" "),e.noUpload?e._e():n("v-btn",{attrs:{color:"primary",outlined:"",disabled:null===e.files||e.overSizeLimit},on:{click:function(t){return e.upload()}}},[e._v("\n      Upload\n      "),n("v-icon",{attrs:{right:""}},[e._v("\n        mdi-upload\n      ")])],1)],1),e._v(" "),n("v-progress-linear",{attrs:{query:!0,active:e.showProgress,color:"primary"},model:{value:e.progress,callback:function(t){e.progress=t},expression:"progress"}})],1)},a=[],o={render:r,staticRenderFns:a};t.a=o},654:function(e,t,n){"use strict";var r=n(499),a=n(522);t.a={name:"RulesView",components:{FileUploader:a.a,"fc-tile":r.a},data:function(){return{loading:!1,rules:[],headers:[{text:"Name",align:"start",value:"name"},{text:"Count",value:"count",align:"end"},{text:"Added",value:"time",align:"end"},{text:"Actions",value:"actions",align:"end",sortable:!1}]}},mounted:function(){this.loadRules()},methods:{loadRules:function(){var e=this;this.loading=!0,this.axios.get(this.$serverAddr+"/rule",{}).then(function(t){e.rules=t.data,e.loading=!1})},deleteRule:function(e){var t=this;this.$root.$confirm("Delete","This will remove "+e.name+" from your rules. Are you sure?").then(function(n){t.loading=!0,t.axios.delete(t.$serverAddr+"/rule/"+e.id).then(function(e){t.loadRules()})})}}}},876:function(e,t,n){var r=n(877);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(462)("90fccd42",r,!0,{})},877:function(e,t,n){t=e.exports=n(461)(!0),t.push([e.i,".noEvent[data-v-2abe0504]{pointer-events:none;display:inline-block}.dz-message[data-v-2abe0504]{cursor:pointer;text-align:center}.max700[data-v-2abe0504]{max-width:700px}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/rule/rulesView.vue"],names:[],mappings:"AACA,0BACE,oBAAqB,AACrB,oBAAsB,CACvB,AACD,6BACE,eAAgB,AAChB,iBAAmB,CACpB,AACD,yBACE,eAAiB,CAClB",file:"rulesView.vue",sourcesContent:["\n.noEvent[data-v-2abe0504] {\n  pointer-events: none;\n  display: inline-block;\n}\n.dz-message[data-v-2abe0504] {\n  cursor: pointer;\n  text-align: center;\n}\n.max700[data-v-2abe0504] {\n  max-width: 700px;\n}\n\n"],sourceRoot:""}])},878:function(e,t,n){var r=n(879);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(462)("0db63125",r,!0,{})},879:function(e,t,n){t=e.exports=n(461)(!0),t.push([e.i,".selectedDict{background:rgba(37,157,173,.85)!important;color:#fff}.selectedDict a{color:#fff}.clickable{cursor:pointer}","",{version:3,sources:["/home/runner/work/fitcrack/fitcrack/webadmin/fitcrackFE/src/components/rule/rulesView.vue"],names:[],mappings:"AACA,cACE,0CAAgD,AAChD,UAAa,CACd,AACD,gBACE,UAAa,CACd,AACD,WACE,cAAgB,CACjB",file:"rulesView.vue",sourcesContent:["\n.selectedDict {\n  background: rgba(37, 157, 173, 0.85) !important;\n  color: white;\n}\n.selectedDict a {\n  color: white;\n}\n.clickable {\n  cursor: pointer;\n}\n"],sourceRoot:""}])},880:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"max700"},[n("fc-tile",{staticClass:"ma-2",attrs:{title:"Rules",icon:e.$route.meta.icon}},[n("v-alert",{staticClass:"mb-0",attrs:{tile:"",text:"",type:"warning"}},[e._v("\n      Rule files must have a .txt or .rule extension.\n    ")]),e._v(" "),n("v-data-table",{attrs:{headers:e.headers,items:e.rules.items,loading:e.loading,"footer-props":{itemsPerPageOptions:[10,25,50],itemsPerPageText:"Rules per page"}},scopedSlots:e._u([{key:"item.name",fn:function(t){var r=t.item;return[n("router-link",{attrs:{to:"rules/"+r.id}},[e._v("\n          "+e._s(r.name)+"\n        ")])]}},{key:"item.time",fn:function(t){var n=t.item;return[e._v("\n        "+e._s(e.$moment(n.time).format("DD.MM.YYYY HH:mm"))+"\n      ")]}},{key:"item.actions",fn:function(t){var r=t.item;return[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("a",e._g({attrs:{href:e.$serverAddr+"/rule/"+r.id+"/download",target:"_blank",download:""}},a),[n("v-btn",{attrs:{icon:""}},[n("v-icon",[e._v("mdi-file-download-outline")])],1)],1)]}}],null,!0)},[e._v(" "),n("span",[e._v("Download")])]),e._v(" "),n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-btn",e._g({attrs:{icon:""},on:{click:function(t){return e.deleteRule(r)}}},a),[n("v-icon",{attrs:{color:"error"}},[e._v("\n                mdi-delete-outline\n              ")])],1)]}}],null,!0)},[e._v(" "),n("span",[e._v("Delete")])])]}}])}),e._v(" "),n("v-divider"),e._v(" "),n("file-uploader",{attrs:{url:this.$serverAddr+"/rule"},on:{uploadComplete:e.loadRules}})],1)],1)},a=[],o={render:r,staticRenderFns:a};t.a=o}});
//# sourceMappingURL=12.1c10a1c07405abc322a2.js.map