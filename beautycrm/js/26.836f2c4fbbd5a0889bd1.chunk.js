(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{DyHA:function(e,t,n){"use strict";var o=n("UKBJ");n.n(o).a},UKBJ:function(e,t,n){},XK5d:function(e,t,n){"use strict";n.r(t);function o(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function a(e,t,n,o,s,i,r){try{var l=e[i](r),a=l.value}catch(e){return void n(e)}l.done?t(a):Promise.resolve(a).then(o,s)}function s(l){return function(){var e=this,r=arguments;return new Promise(function(t,n){var o=l.apply(e,r);function s(e){a(o,t,n,s,i,"next",e)}function i(e){a(o,t,n,s,i,"throw",e)}s(void 0)})}}var i,r,l,c,u={name:"staff-base",props:["name","clientsType"],data:function(){return{bottom:!1,load:!0,loading:!1,notClients:!1,notFound:!1,employees:[],count:0,categories:[{value:0,text:"Любой"}],positions:[{value:0,text:"Любой"}],modelEmployeesCategories:0,employeesPositions:0,modelEmployeesToName:"",queryArray:[],topScrollTable:0,fetchOnScroll:!1}},methods:{editClient:function(e){this.$router.push("/clients/base/".concat(e,"/edit/"))},bottomVisible:function(e){return e.scrollTop==e.scrollHeight-e.clientHeight},searchClients:(c=s(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.load=!0,this.$router.replace({query:this.queryObject}),e.prev=2,e.next=5,Vue.$fetch.get("/clients".concat(this.queryString));case 5:t=e.sent,this.employees=t.employees,this.employees.length?(this.notFound=!1,this.count=t.countClients):this.notFound=!0,this.load=!1,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0);case 13:case"end":return e.stop()}},e,this,[[2,10]])})),function(){return c.apply(this,arguments)}),addNewClient:function(){this.$store.commit("UPDATE_SCROLL_TABLE",0),this.$router.push("/clients/base/add")},addClients:(l=s(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,Vue.$fetch.get("/clients".concat(1<this.queryString.length?this.queryString+"&":"?","skip=").concat(this.clients.length));case 3:t=e.sent,console.log(t),this.clients=[].concat(o(this.clients),o(t.clients)),this.loading=!1;case 7:case"end":return e.stop()}},e,this)})),function(){return l.apply(this,arguments)}),scrollControll:function(e){this.topScrollTable=e.target.scrollTop,this.fetchOnScroll&&(this.bottom=this.bottomVisible(e.target))},resetFilter:function(){this.modelClientsToName="",this.modelClientsType=0,this.load=!0,this.notClients=!1,this.clientsnotFound=!1,this.searchClients()}},computed:{queryString:function(){var e="";return this.modelEmployeesToName&&(e+=e.length?"&":"",e+="name=".concat(this.modelEmployeesToName)),this.modelEmployeesCategories&&(e+=e.length?"&":"",e+="category=".concat(this.modelEmployeesCategories)),this.modelEmployeesPositions&&(e+=e.length?"&":"",e+="position=".concat(this.modelEmployeesPositions)),e.length?"?".concat(e):""},queryObject:function(){var e={};return this.modelEmployeesToName&&(e.name=this.modelEmployeesToName),this.modelEmployeesCategories&&(e.category="".concat(this.modelEmployeesCategories)),this.modelEmployeesPositions&&(e.position="".concat(this.modelEmployeesPositions)),e}},watch:{bottom:(r=s(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=7;break}if(this.fetchOnScroll=!1,t=!1,this.clients.length<this.countClients)return e.next=6,this.addClients();e.next=7;break;case 6:this.clients.length<this.countClients&&(this.fetchOnScroll=!0);case 7:case"end":return e.stop()}},e,this)})),function(e){return r.apply(this,arguments)})},activated:(i=s(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.$refs.wrapper.scrollTop=this.topScrollTable,Object.keys(this.$route.query).length&&(this.modelEmployeesToName=this.name||"",this.modelEmployeesCategories=parseInt(this.category),this.modelEmployeesPositions=parseInt(this.position)),JSON.stringify(this.$route.query)!==JSON.stringify(this.queryObject)&&this.$router.replace({query:this.queryObject}),e.prev=3,e.next=6,Vue.$fetch.get("/employees".concat(this.queryString));case 6:t=e.sent,console.log(t),this.clients=t.clients,this.countClients=t.countClients,this.employeesCategories=this.employeesCategories.concat(t.employeesCategories.map(function(e){return{text:e.name,value:e.clientTypeID}})),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(3),console.log(e.t0);case 16:if(this.clients.length){e.next=20;break}return Object.keys(this.queryObject).length?this.clientsnotFound=!0:this.notClients=!0,this.load=!1,e.abrupt("return");case 20:this.load=!1,this.$nextTick(function(){n.clients.length<n.countClients&&(n.fetchOnScroll=!0)});case 22:case"end":return e.stop()}},e,this,[[3,13]])})),function(){return i.apply(this,arguments)})},h=(n("DyHA"),n("KHd+")),p=Object(h.a)(u,function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("v-layout",{ref:"wrapper",staticClass:"overflow-y-auto content",class:{wrap:!n.$vuetify.breakpoint.xsOnly},attrs:{id:"scroll-target"}},[o("v-container",[o("v-row",[o("v-col",{attrs:{cols:"3",xs:"12"}},[o("v-text-field",{attrs:{label:"Имя или телефон","prepend-inner-icon":"search","clear-icon":"close",clearable:"",solo:"",dense:""},on:{input:n.searchEmployees},model:{value:n.modelEmployeesToName,callback:function(e){n.modelEmployeesToName="string"==typeof e?e.trim():e},expression:"modelEmployeesToName"}})],1),n._v(" "),o("v-col",{attrs:{cols:"2",xs:"12"}},[o("v-select",{attrs:{items:n.employeesCategories,label:"Категория услуги",solo:"",dense:""},on:{change:n.searchEmployees},model:{value:n.modelEmployeesCategories,callback:function(e){n.modelEmployeesCategories=n._n(e)},expression:"modelEmployeesCategories"}})],1),n._v(" "),o("v-col",{attrs:{cols:"2",xs:"12"}},[o("v-select",{attrs:{items:n.employeesPositions,label:"Должность",solo:"",dense:""},on:{change:n.searchEmployees},model:{value:n.modelEmployeesPositions,callback:function(e){n.modelEmployeesPositions=n._n(e)},expression:"modelEmployeesPositions"}})],1),n._v(" "),o("v-col",{attrs:{cols:"3","offset-sm":"3",xs:"12"}},[o("v-btn",{attrs:{large:"",dark:"",color:"primary darken",width:"100%"},on:{click:n.addNewClient}},[n._v("Добавить клиента\n                ")])],1)],1),n._v(" "),n.load?o("Loader"):n._e(),n._v(" "),o("v-row",[o("v-col",{attrs:{cols:"12"}},[o("v-card",[o("v-simple-table",{scopedSlots:n._u([{key:"default",fn:function(){return[n.$vuetify.breakpoint.xsOnly?n._e():o("thead",[o("tr",[o("th",{staticClass:"text-left"},[n._v("Имя")]),n._v(" "),o("th",{staticClass:"text-left"},[n._v("Телефон")]),n._v(" "),o("th",{staticClass:"text-left"},[n._v("\n                                        Категория клиента\n                                    ")])])]),n._v(" "),o("tbody",{directives:[{name:"scroll",rawName:"v-scroll:#scroll-target",value:n.scrollControll,expression:"scrollControll",arg:"#scroll-target"}]},[n._l(n.clients,function(t){return o("tr",{key:t.clientID,on:{click:function(e){return n.editClient(t.clientID)}}},[o("td",{class:{mobile:n.$vuetify.breakpoint.xsOnly}},[o("v-avatar",{class:{mobile:n.$vuetify.breakpoint.xsOnly},attrs:{size:"40",color:"blue lighten-2"}},[o("span",{staticClass:"white--text headline"},[n._v("\n                                                "+n._s(t.name[0])+"\n                                            ")])]),n._v(" "),n.$vuetify.breakpoint.xsOnly?n._e():[n._v("\n                                            "+n._s(t.name)+"\n                                        ")]],2),n._v(" "),n.$vuetify.breakpoint.xsOnly?[o("td",[o("div",{staticClass:"column-wrap-mobile"},[o("span",[n._v("\n                                                    "+n._s(t.name)+"\n                                                ")]),n._v(" "),o("span",[n._v("\n                                                    "+n._s(t.phone)+"\n                                                ")]),n._v(" "),o("span",[n._v("\n                                                    "+n._s(t.typeName)+"\n                                                ")])])])]:[o("td",[n._v(n._s(t.phone))]),n._v(" "),o("td",[n._v(n._s(t.typeName))])]],2)}),n._v(" "),n.loading?o("tr",[o("td",{attrs:{colspan:"3",align:"center"}},[o("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1)]):n._e()],2)]},proxy:!0}])})],1)],1)],1)],1)],1)},[],!1,null,"a2125e06",null);t.default=p.exports}}]);