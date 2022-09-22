(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/Http/interceptor.ts":
/*!*********************************!*\
  !*** ./src/Http/interceptor.ts ***!
  \*********************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Interceptor = /** @class */ (function () {
    function Interceptor(context) {
        this.context = context;
        context.autoConfigure();
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.context.all$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(10)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeMap"])(function (ctx) {
            console.log('TCL: Interceptor -> ctx.antiForgeryToken -------------->', ctx.antiForgeryToken);
            var newReq = req.clone({
                setHeaders: {
                    ModuleId: _this.context._moduleId.toString(),
                    TabId: ctx.tabId.toString(),
                    RequestVerificationToken: ctx.antiForgeryToken,
                    userid: _this.context._userId,
                    portalid: _this.context._portalId,
                    locale: _this.context._locale,
                    'X-Debugging-Hint': 'bootstrapped by bbAngular, 2SXC, OPSI',
                }
            });
            return next.handle(newReq);
        }));
    };
    Interceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__["Context"]])
    ], Interceptor);
    return Interceptor;
}());



/***/ }),

/***/ "./src/Service/DNN/context.service.ts":
/*!********************************************!*\
  !*** ./src/Service/DNN/context.service.ts ***!
  \********************************************/
/*! exports provided: Context */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
/* harmony import */ var _dev_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dev-context */ "./src/Service/DNN/dev-context.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var Context = /** @class */ (function () {
    function Context(devSettings) {
        this.devSettings = devSettings;
        // todo: probably should set the replay-buffer to 1 for all the following, but must test!
        // private cbIdSubject = new ReplaySubject<number>(1);
        this.tidSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.afTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this._properties = {};
        this._moduleId = "";
        this._userId = "";
        this._portalId = "";
        this._locale = "";
        this.tabId$ = this.tidSubject.asObservable();
        this.antiForgeryToken$ = this.afTokenSubject.asObservable();
        this.all$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.tabId$, // wait for tabId
        this.antiForgeryToken$) // wait for security token
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return ({
            tabId: res[0],
            antiForgeryToken: res[1]
        }); }));
        var MODULE = 'RAINBOW_TimeTable';
        // Dev settings with minimal ignore settings.
        this.devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);
        if (window && window[MODULE]) {
            this._properties = window[MODULE];
            console.log('​-----------------------------------------------------------------------');
            console.log('​DnnContextService -> constructor -> this._properties', this._properties);
            console.log('​-----------------------------------------------------------------------');
        }
        else {
            console.log('----------------------');
            console.log('ERROR: Missing window[MODULE] for DNN');
            console.log('----------------------');
        }
    }
    Context.prototype.autoConfigure = function () {
        var _this = this;
        this._moduleId = this._properties.ModuleId;
        this._userId = this._properties.UserId;
        this._portalId = this._properties.PortalId;
        this._locale = this._properties.locale;
        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
            // Run timer till sf is ready, but max for a second.
            var t_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(0, 100)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(10))
                .subscribe(function (x) {
                // This must be accessed after a delay, as the SF is not ready yet.
                var sf = window.$.ServicesFramework();
                console.log('TCL: ----------------------------');
                console.log('TCL: autoConfigure -> sf', sf);
                console.log('TCL: ----------------------------');
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                    t_1.unsubscribe();
                    _this.tidSubject.next(sf.getTabId());
                    _this.afTokenSubject.next(sf.getAntiForgeryValue());
                }
                else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                }
            });
            return;
        }
        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error("\n                DNN Services Framework is missing, and it's not allowed according to devSettings.\n                Either set devSettings to ignore this, or ensure it's there");
        }
        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    };
    Context = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        __metadata("design:paramtypes", [_dev_context__WEBPACK_IMPORTED_MODULE_0__["DevContext"]])
    ], Context);
    return Context;
}());



/***/ }),

/***/ "./src/Service/DNN/dev-context.ts":
/*!****************************************!*\
  !*** ./src/Service/DNN/dev-context.ts ***!
  \****************************************/
/*! exports provided: DevContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevContext", function() { return DevContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DevContext = /** @class */ (function () {
    function DevContext() {
        this.ignoreMissing$2sxc = false;
        this.ignoreMissingServicesFramework = false;
        this.forceUse = false;
        this.moduleId = 0;
        this.tabId = 0;
        this.path = '/';
    }
    DevContext = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], DevContext);
    return DevContext;
}());



/***/ }),

/***/ "./src/Service/demo.service.ts":
/*!*************************************!*\
  !*** ./src/Service/demo.service.ts ***!
  \*************************************/
/*! exports provided: DemoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoService", function() { return DemoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DemoService = /** @class */ (function () {
    function DemoService(context, http) {
        this.context = context;
        this.http = http;
        //this._routingWebAPI = "/DesktopModules/Angular6Demo/API/"
        this._routingWebAPI = this.context._properties.routingWebAPI;
    }
    DemoService.prototype.getStagingOutputList = function () {
        var webAPIName = "item/HelloWorld";
        var getUrl = this._routingWebAPI + webAPIName;
        console.log('​---------------------------------');
        console.log('​StagingService -> getUrl', getUrl);
        console.log('​---------------------------------');
        return this.http.get(getUrl);
    };
    DemoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DemoService);
    return DemoService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-main-page></app-main-page>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(context, _demoService) {
        this.context = context;
        this._demoService = _demoService;
        this.title = 'template Angular for DNN7-DNN8-DNN9';
        this.webapiResult = '';
        context.autoConfigure();
    }
    AppComponent.prototype.getDataFromWebAPI = function () {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            text: 'Test click!',
            type: 'success',
        });
        this._demoService.getStagingOutputList().subscribe(function (data) {
            _this.webapiResult = data;
            console.log('​---------------------------------');
            console.log('Call webapi data -> data: ', data);
            console.log('​---------------------------------');
        }, function (err) {
            if (err.error instanceof Error) {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
            else {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
        });
    };
    AppComponent.prototype.log = function (par) {
        return JSON.stringify(par).toString();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__["DemoService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/angular-material-module */ "./src/app/modules/angular-material-module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _opening_time_opening_time_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./opening-time/opening-time.component */ "./src/app/opening-time/opening-time.component.ts");
/* harmony import */ var _specific_date_specific_date_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./specific-date/specific-date.component */ "./src/app/specific-date/specific-date.component.ts");
/* harmony import */ var _festivity_festivity_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./festivity/festivity.component */ "./src/app/festivity/festivity.component.ts");
/* harmony import */ var _main_page_main_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main-page/main-page.component */ "./src/app/main-page/main-page.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _Http_interceptor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Http/interceptor */ "./src/Http/interceptor.ts");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dialog/add-edit/add-edit.component */ "./src/app/dialog/add-edit/add-edit.component.ts");
/* harmony import */ var _dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./dialog/festivity-d/festivity-d.component */ "./src/app/dialog/festivity-d/festivity-d.component.ts");
/* harmony import */ var _dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dialog/add-edit-specific/add-edit-specific.component */ "./src/app/dialog/add-edit-specific/add-edit-specific.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            entryComponents: [
                _dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_14__["AddEditComponent"], _dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_15__["FestivityDComponent"], _dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_16__["AddEditSpecificComponent"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                _opening_time_opening_time_component__WEBPACK_IMPORTED_MODULE_3__["OpeningTimeComponent"],
                _specific_date_specific_date_component__WEBPACK_IMPORTED_MODULE_4__["SpecificDateComponent"],
                _festivity_festivity_component__WEBPACK_IMPORTED_MODULE_5__["FestivityComponent"],
                _main_page_main_page_component__WEBPACK_IMPORTED_MODULE_6__["MainPageComponent"],
                _dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_14__["AddEditComponent"], _dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_14__["AddEditComponent"], _dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_16__["AddEditSpecificComponent"], _dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_15__["FestivityDComponent"], _dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_16__["AddEditSpecificComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
                _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_0__["AngularMaterialModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
            ],
            providers: [
                _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_12__["Context"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HTTP_INTERCEPTORS"],
                    useClass: _Http_interceptor__WEBPACK_IMPORTED_MODULE_10__["Interceptor"],
                    multi: true
                },
                _Service_demo_service__WEBPACK_IMPORTED_MODULE_11__["DemoService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dialog/add-edit-specific/add-edit-specific.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/dialog/add-edit-specific/add-edit-specific.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n.vertical-center {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  right: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.totheright {\n  margin: 0;\n  position: absolute;\n  top: -10%;\n  right: 70%;\n}\n\n.border{\n  border-radius: 4px !important;\n}\n\n"

/***/ }),

/***/ "./src/app/dialog/add-edit-specific/add-edit-specific.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/dialog/add-edit-specific/add-edit-specific.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Edit\" : \"Add a  \"}} Specific Date </h1>\n<form [formGroup]=\"buForm\" class=\"container\">\n\n\n\n  <mat-form-field style='margin-bottom: 30px;' appearance=\"fill\">\n    <mat-label>Choose a date</mat-label>\n    <input matInput [matDatepicker]=\"picker\" formControlName=\"date\">\n    <mat-hint>MM/DD/YYYY</mat-hint>\n    <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n    <mat-datepicker #picker></mat-datepicker>\n  </mat-form-field>\n\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>First Period</mat-label>\n    <div>\n      <input matInput type=\"time\" formControlName=\"time1\" >\n    </div>\n  </mat-form-field>\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <div>\n      <input matInput type=\"time\" formControlName=\"time2\" >\n    </div>\n\n  </mat-form-field>\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Second Period</mat-label>\n    <input matInput type=\"time\" formControlName=\"time3\" >\n\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <div>\n      <input matInput type=\"time\" formControlName=\"time4\" >\n    </div>\n\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button mat-raised-button type=\"button\" (click)=\"onCloseClick()\">Chiudi</button>\n    <button mat-raised-button type=\"submit\" color=\"primary\" disabled=\"{{disable===true}}\" (click)=\"onSaveClick()\" >Salva</button>\n  </div>\n</form>\n\n\n"

/***/ }),

/***/ "./src/app/dialog/add-edit-specific/add-edit-specific.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/dialog/add-edit-specific/add-edit-specific.component.ts ***!
  \*************************************************************************/
/*! exports provided: AddEditSpecificComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditSpecificComponent", function() { return AddEditSpecificComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/api.service */ "./src/app/service/api.service.ts");
/* harmony import */ var src_app_entity_GOrariDateEntity_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/entity/GOrariDateEntity.entity */ "./src/app/entity/GOrariDateEntity.entity.ts");
/* harmony import */ var src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/validation/date.validation */ "./src/app/validation/date.validation.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var AddEditSpecificComponent = /** @class */ (function () {
    function AddEditSpecificComponent(_apiservice, formBuilder, dialog, data, selfDialogRef) {
        this._apiservice = _apiservice;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.selfDialogRef = selfDialogRef;
        this.type = 2;
        this.displayedColumns = ["date"];
        this.orarioEdit = new src_app_entity_GOrariDateEntity_entity__WEBPACK_IMPORTED_MODULE_6__["EOGOrariDateEntity"]();
        this.disable = false;
        this.isEdit = false;
        this.listdate = [];
        this.error = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.listCurrentSpecificDate = [];
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    AddEditSpecificComponent.prototype.ngOnInit = function () {
        console.log("listCurrentSpecificDate", this.listCurrentSpecificDate);
        this.createForm();
        this.initAllData();
    };
    AddEditSpecificComponent.prototype.initAllData = function () {
        var _this = this;
        this._apiservice
            .ListGorariDate(this.type, this.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            _this.listdate = res;
            _this.initFormValues();
        }, function (err) {
            console.log("err", err);
        });
    };
    AddEditSpecificComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            date: [""],
            time1: [""],
            time2: [""],
            time3: [""],
            time4: [""],
        }, { validators: [
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])('time1', 'time2'),
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])('time3', 'time4'),
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])('time2', 'time3')
            ] });
    };
    AddEditSpecificComponent.prototype.initFormValues = function () {
        if (this.isEdit) {
            this.buForm.patchValue({
                date: this.orarioEdit.date,
                time1: this.orarioEdit.time1 ? this.getStringInputFromda(new Date(this.orarioEdit.time1)) : null,
                time2: this.orarioEdit.time2 ? this.getStringInputFromda(new Date(this.orarioEdit.time2)) : null,
                time3: this.orarioEdit.time3 ? this.getStringInputFromda(new Date(this.orarioEdit.time3)) : null,
                time4: this.orarioEdit.time4 ? this.getStringInputFromda(new Date(this.orarioEdit.time4)) : null,
            });
            //add
        }
        else {
            this.orarioEdit.type = this.type;
            this.orarioEdit.tabellaid = this.id;
            this.orarioEdit.tabella = "T_Fonti_Int";
        }
    };
    AddEditSpecificComponent.prototype.getStringInputFromda = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var res = hours.toString().padStart(2, "0") +
            ":" +
            minutes.toString().padStart(2, "0");
        console.log("getStringInputFromDate", res);
        return res;
    };
    AddEditSpecificComponent.prototype.specificDateAlreadyExist = function () {
        var _this = this;
        var found = this.listCurrentSpecificDate.find(function (x) {
            return _this.checkCurrentDate(x);
        });
        if (found) {
            return true;
        }
        else {
            return false;
        }
    };
    AddEditSpecificComponent.prototype.checkCurrentDate = function (x) {
        return (new Date(x.date).getDate() == this.orarioEdit.date.getDate() &&
            new Date(x.date).getFullYear() == this.orarioEdit.date.getFullYear() &&
            new Date(x.date).getMonth() == this.orarioEdit.date.getMonth() &&
            x.id != this.orarioEdit.id);
    };
    AddEditSpecificComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddEditSpecificComponent.prototype.onSaveClick = function () {
        var _this = this;
        this.orarioEdit = __assign({}, this.orarioEdit, this.buForm.value, { type: this.type, tabellaid: this.id });
        var b = (this.orarioEdit.time1 = this.buForm.get("time1").value);
        var c = (this.orarioEdit.time2 = this.buForm.get("time2").value);
        var f = (this.orarioEdit.time3 = this.buForm.get("time3").value);
        var d = (this.orarioEdit.time4 = this.buForm.get("time4").value);
        var e = (this.orarioEdit.date = this.buForm.get("date").value);
        if (b && f && d && c !== null) {
            var myArray = b.split(":");
            var date = new Date();
            var hour = date.setHours(myArray[0]);
            var min = date.setMinutes(myArray[1]);
            var sec = date.setSeconds(0);
            var myArray1 = c.split(":");
            var date1 = new Date();
            var hour1 = date1.setHours(myArray1[0]);
            var min1 = date1.setMinutes(myArray1[1]);
            var sec1 = date1.setSeconds(0);
            var myArray2 = f.split(":");
            var date2 = new Date();
            var hour2 = date2.setHours(myArray2[0]);
            var min2 = date2.setMinutes(myArray2[1]);
            var sec2 = date2.setSeconds(0);
            var myArray3 = d.split(":");
            var date3 = new Date();
            var hour3 = date3.setHours(myArray3[0]);
            var min3 = date3.setMinutes(myArray3[1]);
            var sec3 = date3.setSeconds(0);
        }
        // if (this.specificDateAlreadyExist()) {
        //   console.log("ALREADY EXISTS");
        //   //SWAL
        //   return;
        // }
        this._apiservice
            .SetOrariDate(this.orarioEdit)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            _this.selfDialogRef.close();
        }, function (err) {
            console.log("err", err);
            _this.disable = false;
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AddEditSpecificComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AddEditSpecificComponent.prototype, "type", void 0);
    AddEditSpecificComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-edit-specific",
            template: __webpack_require__(/*! ./add-edit-specific.component.html */ "./src/app/dialog/add-edit-specific/add-edit-specific.component.html"),
            styles: [__webpack_require__(/*! ./add-edit-specific.component.css */ "./src/app/dialog/add-edit-specific/add-edit-specific.component.css")],
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddEditSpecificComponent);
    return AddEditSpecificComponent;
}());



/***/ }),

/***/ "./src/app/dialog/add-edit/add-edit.component.css":
/*!********************************************************!*\
  !*** ./src/app/dialog/add-edit/add-edit.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-center {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  right: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.totheright {\n  margin: 0;\n  position: absolute;\n  top: -10%;\n  right: 70%;\n}\n\n.border{\n  border-radius: 4px !important;\n}\n\n.inline {\n  display: inline-block;\n}\n\n.form-control.ng-touched.ng-invalid {\n  border:1px solid red;\n }\n\n.form-control.ng-touched.ng-valid {\n  border:1px solid green;\n }\n\n.margin-small{\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: center;\n}\n"

/***/ }),

/***/ "./src/app/dialog/add-edit/add-edit.component.html":
/*!*********************************************************!*\
  !*** ./src/app/dialog/add-edit/add-edit.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title >{{ isEdit ? \"Edit \" +data.d :\"Add an \"}}  Opening Time</h1>\n <form [formGroup]=\"buForm\" class=\"container\" >\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\" >\n    <mat-label>First Period</mat-label>\n    <div>\n      <input matInput type=\"time\"\n       formControlName=\"dalle_1\" class=\"null\"\n>\n    </div>\n    <mat-error *ngIf=\"this.buForm.get('dalle_1').errors?.dateLessThan\">\n      Should be earlier date.\n  </mat-error>\n  </mat-form-field>\n  <!-- <small [class.d-none]=\"this.buForm.get('dalle_1').valid || this.buForm.get('dalle_1').untouched\" class=\"text-danger margin-small\">Pls Insert a time</small> -->\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <div>\n      <input matInput type=\"time\"\n       formControlName=\"alle_1\"\n       class=\"null\"\n      >\n\n\n    </div>\n  </mat-form-field>\n  <!-- <small [class.d-none]=\"this.buForm.get('alle_1').valid || this.buForm.get('alle_1').untouched\" class=\"text-danger margin-small\">Pls Insert a time</small> -->\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\" >\n    <mat-label>Second Period</mat-label>\n    <div>\n      <input matInput type=\"time\"\n       formControlName=\"dalle_2\"\n       class=\"null\"\n >\n    </div>\n    <mat-error *ngIf=\"this.buForm.get('dalle_2').errors?.dateLessThan\">\n      Should be earlier date.\n  </mat-error>\n  </mat-form-field>\n  <!-- <small [class.d-none]=\"this.buForm.get('dalle_2').valid || this.buForm.get('dalle_2').untouched\" class=\"text-danger margin-small\">Pls Insert a time</small> -->\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <div>\n      <input matInput type=\"time\"\n       formControlName=\"alle_2\"\n   >\n\n    </div>\n   </mat-form-field>\n   <!-- <small [class.d-none]=\"this.buForm.get('alle_2').valid || this.buForm.get('alle_2').untouched\" class=\"text-danger margin-small\">Pls Insert a time</small> -->\n\n\n\n  <div mat-dialog-actions align=\"end\">\n    <button mat-raised-button type=\"button\" (click)=\"onCloseClick()\">Chiudi</button>\n    <button mat-raised-button type=\"submit\" color=\"primary\" disabled=\"{{disable===true}}\" (click)=\"onSaveClick()\">Salva</button>\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/dialog/add-edit/add-edit.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/dialog/add-edit/add-edit.component.ts ***!
  \*******************************************************/
/*! exports provided: AddEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditComponent", function() { return AddEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/api.service */ "./src/app/service/api.service.ts");
/* harmony import */ var src_app_entity_GOrariEntity_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/entity/GOrariEntity.entity */ "./src/app/entity/GOrariEntity.entity.ts");
/* harmony import */ var src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/validation/date.validation */ "./src/app/validation/date.validation.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var AddEditComponent = /** @class */ (function () {
    function AddEditComponent(_apiservice, formBuilder, data, selfDialogRef) {
        this._apiservice = _apiservice;
        this.formBuilder = formBuilder;
        this.data = data;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
        this.listgorari = [];
        this.listg = [];
        this.entity = new src_app_entity_GOrariEntity_entity__WEBPACK_IMPORTED_MODULE_6__["EOGOrariEntity"]();
        this.error = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.listCurrentOpeningTime = [];
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    AddEditComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.initAllData();
    };
    AddEditComponent.prototype.initAllData = function () {
        var _this = this;
        this._apiservice
            .Listgorari(this.type, this.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            _this.listg = res;
            _this.initFormValues();
        }, function (err) {
            console.log("err", err);
        });
    };
    AddEditComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            dalle_1: [""],
            alle_1: [""],
            dalle_2: [""],
            alle_2: [""],
        }, {
            validators: [
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])("dalle_1", "alle_1"),
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])("dalle_2", "alle_2"),
                Object(src_app_validation_date_validation__WEBPACK_IMPORTED_MODULE_7__["dateLessThan"])("alle_1", "dalle_2"),
            ],
        });
    };
    AddEditComponent.prototype.initFormValues = function () {
        if (this.isEdit) {
            this.buForm.patchValue({
                dalle_1: this.orarioEdit.dalle_1
                    ? this.getStringInputFromda(new Date(this.orarioEdit.dalle_1)) : null,
                // : new Date().setHours(0,0,0,0),
                alle_1: this.orarioEdit.alle_1
                    ? this.getStringInputFromda(new Date(this.orarioEdit.alle_1))
                    : null,
                dalle_2: this.orarioEdit.dalle_2
                    ? this.getStringInputFromda(new Date(this.orarioEdit.dalle_2))
                    : null,
                alle_2: this.orarioEdit.alle_2
                    ? this.getStringInputFromda(new Date(this.orarioEdit.alle_2))
                    : null,
            });
        }
    };
    AddEditComponent.prototype.getStringInputFromda = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var res = hours.toString().padStart(2, "0") +
            ":" +
            minutes.toString().padStart(2, "0");
        console.log("getStringInputFromDate", res);
        return res;
    };
    AddEditComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddEditComponent.prototype.onSaveClick = function () {
        var _this = this;
        this.orarioEdit = __assign({}, this.orarioEdit, this.buForm.value, { type: this.type, tabellaid: this.id });
        var f = (this.orarioEdit.alle_1 = this.buForm.get("alle_1").value);
        var b = (this.orarioEdit.dalle_1 = this.buForm.get("dalle_1").value);
        var c = (this.orarioEdit.dalle_2 = this.buForm.get("dalle_2").value);
        var d = (this.orarioEdit.alle_2 = this.buForm.get("alle_2").value);
        if (d && f && b && c !== null) {
            var myArray = b.split(":");
            var date = new Date();
            var hour = date.setHours(myArray[0]);
            var min = date.setMinutes(myArray[1]);
            var sec = date.setSeconds(0);
            var myArray1 = f.split(":");
            var date1 = new Date();
            var hour1 = date1.setHours(myArray1[0]);
            var min1 = date1.setMinutes(myArray1[1]);
            var sec1 = date1.setSeconds(0);
            var myArray2 = c.split(":");
            var date2 = new Date();
            var hour2 = date2.setHours(myArray2[0]);
            var min2 = date2.setMinutes(myArray2[1]);
            var sec2 = date2.setSeconds(0);
            var myArray3 = d.split(":");
            var date3 = new Date();
            var hour3 = date3.setHours(myArray3[0]);
            var min3 = date3.setMinutes(myArray3[1]);
            var sec3 = date3.setSeconds(0);
        }
        this._apiservice
            .Setgorari(this.orarioEdit)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            _this.selfDialogRef.close();
        }, function (err) {
            console.log("err", err);
            _this.disable = false;
        });
    };
    AddEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-edit",
            template: __webpack_require__(/*! ./add-edit.component.html */ "./src/app/dialog/add-edit/add-edit.component.html"),
            styles: [__webpack_require__(/*! ./add-edit.component.css */ "./src/app/dialog/add-edit/add-edit.component.css")],
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], Object, _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddEditComponent);
    return AddEditComponent;
}());



/***/ }),

/***/ "./src/app/dialog/festivity-d/festivity-d.component.css":
/*!**************************************************************!*\
  !*** ./src/app/dialog/festivity-d/festivity-d.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".vertical-center {\n  margin: 0;\n  position: absolute;\n  top: 40%;\n  right: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.totheright {\n  margin: 0;\n  position: absolute;\n  top: -10%;\n  right: 70%;\n}\n\n.border{\n  border-radius: 4px !important;\n}\n\ntable{\nwidth: 100%;\n}\n\n"

/***/ }),

/***/ "./src/app/dialog/festivity-d/festivity-d.component.html":
/*!***************************************************************!*\
  !*** ./src/app/dialog/festivity-d/festivity-d.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica\" : \"Aggiungi una \"}}  Opening Time</h1>\n<form [formGroup]=\"buForm\" class=\"container\" (submit)=\"submitForm()\" >\n\n\n   <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Day </mat-label>\n    <div>\n      <input matInput type=\"number\" formControlName=\"giorno\" required>\n    </div>\n  </mat-form-field>\n\n\n\n  <mat-form-field appearance=\"fill\">\n    <mat-label>Select a month</mat-label>\n    <select matNativeControl formControlName=\"mese\" required>\n      <option value=\"01\">January</option>\n      <option value=\"02\">February</option>\n      <option value=\"03\">March</option>\n      <option value=\"04\">April</option>\n      <option value=\"05\">May</option>\n      <option value=\"06\">June</option>\n      <option value=\"07\">July</option>\n      <option value=\"08\">August</option>\n      <option value=\"09\">September</option>\n      <option value=\"10\">October</option>\n      <option value=\"11\">November</option>\n      <option value=\"12\">December</option>\n\n    </select>\n  </mat-form-field>\n\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Year </mat-label>\n    <div>\n      <input matInput type=\"number\"  formControlName=\"anno\" >\n    </div>\n\n  </mat-form-field>\n\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\" >\n    <mat-label>Description</mat-label>\n    <input matInput type=\"text\" formControlName=\"descrizione\" required >\n  </mat-form-field>\n\n  <span class=\"text-danger\"\n *ngIf=\"(buForm.controls.descrizione.touched || submitted)\n   && buForm.controls.descrizione.errors?.required\">\n  description is required\n    </span>\n\n\n  <div mat-dialog-actions align=\"end\">\n    <button mat-raised-button type=\"button\" (click)=\"onCloseClick()\">Chiudi</button>\n    <button mat-raised-button type=\"submit\" color=\"primary\" disabled=\"{{disable===true}}\"> Salva</button>\n  </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/dialog/festivity-d/festivity-d.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/dialog/festivity-d/festivity-d.component.ts ***!
  \*************************************************************/
/*! exports provided: FestivityDComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FestivityDComponent", function() { return FestivityDComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/api.service */ "./src/app/service/api.service.ts");
/* harmony import */ var src_app_entity_GFestivitaEntity_entity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/entity/GFestivitaEntity.entity */ "./src/app/entity/GFestivitaEntity.entity.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var FestivityDComponent = /** @class */ (function () {
    function FestivityDComponent(_apiservice, formBuilder, data, selfDialogRef) {
        this._apiservice = _apiservice;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.orarioEdit = new src_app_entity_GFestivitaEntity_entity__WEBPACK_IMPORTED_MODULE_6__["EOGFestivitaEntity"]();
        this.disable = false;
        this.isEdit = false;
        this.type = 1;
        this.id = 82007;
        this.listFestivity = [];
        this.entity = new src_app_entity_GFestivitaEntity_entity__WEBPACK_IMPORTED_MODULE_6__["EOGFestivitaEntity"]();
        this.error = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"]();
        this.submitted = false;
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    FestivityDComponent.prototype.ngOnInit = function () {
        this.createForm();
        console.log("orarioEdit", this.orarioEdit);
        this.initFormValues();
    };
    FestivityDComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            giorno: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            mese: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            anno: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null),
            descrizione: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
        });
    };
    FestivityDComponent.prototype.initFormValues = function () {
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.orarioEdit, { anno: +this.orarioEdit.anno }));
        }
    };
    Object.defineProperty(FestivityDComponent.prototype, "month", {
        get: function () {
            return this.buForm.get("mese");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FestivityDComponent.prototype, "day", {
        get: function () {
            return this.buForm.get("giorno");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FestivityDComponent.prototype, "year", {
        get: function () {
            return this.buForm.get("anno");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FestivityDComponent.prototype, "description", {
        get: function () {
            return this.buForm.get("descrizione");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FestivityDComponent.prototype, "isLeap", {
        get: function () {
            var year;
            if (year % 4 === 0) {
                if (year % 100 === 0) {
                    if (year % 400 == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    FestivityDComponent.prototype.validateDate = function () {
        if (this.year.value === null &&
            this.month.value === 2 &&
            this.day.value === 29) {
            alert("The year is not Specified, You can't insert 29 February");
            console.log("err");
        }
        else if (this.year.value === !this.isLeap &&
            this.month.value === 9 &&
            this.day.value === 31) {
            alert("This is the Leap Year, you cant insert september 31 st");
            this.disable = false;
        }
    };
    FestivityDComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    FestivityDComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.isEdit) {
            this.orarioEdit = __assign({}, this.orarioEdit, this.buForm.value);
        }
        else {
            this.orarioEdit.type = this.type;
            this.orarioEdit.tabellaid = this.id;
            this.orarioEdit.nome_tabella = "T_Clienti";
        }
        var b = (this.orarioEdit.giorno = this.buForm.get("giorno").value.toString().padStart(2, "0"));
        var f = (this.orarioEdit.mese = this.buForm.get("mese").value);
        var c = (this.orarioEdit.anno = this.buForm.get("anno").value);
        var d = (this.orarioEdit.descrizione = this.buForm.get("descrizione").value);
        this._apiservice
            .SetFestivity(this.orarioEdit)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["takeUntil"])(this._unsubscribeAll))
            .subscribe(function (res) {
            _this.selfDialogRef.close();
        }, function (err) {
            console.log("err", err);
            _this.disable = false;
        });
    };
    FestivityDComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-festivity-d",
            template: __webpack_require__(/*! ./festivity-d.component.html */ "./src/app/dialog/festivity-d/festivity-d.component.html"),
            styles: [__webpack_require__(/*! ./festivity-d.component.css */ "./src/app/dialog/festivity-d/festivity-d.component.css")],
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_service_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], Object, _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], FestivityDComponent);
    return FestivityDComponent;
}());



/***/ }),

/***/ "./src/app/entity/GFestivitaEntity.entity.ts":
/*!***************************************************!*\
  !*** ./src/app/entity/GFestivitaEntity.entity.ts ***!
  \***************************************************/
/*! exports provided: GFestivitaEntity, EOGFestivitaEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GFestivitaEntity", function() { return GFestivitaEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOGFestivitaEntity", function() { return EOGFestivitaEntity; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GFestivitaEntity = /** @class */ (function () {
    function GFestivitaEntity() {
    }
    return GFestivitaEntity;
}());

var EOGFestivitaEntity = /** @class */ (function (_super) {
    __extends(EOGFestivitaEntity, _super);
    function EOGFestivitaEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EOGFestivitaEntity;
}(GFestivitaEntity));



/***/ }),

/***/ "./src/app/entity/GOrariDateEntity.entity.ts":
/*!***************************************************!*\
  !*** ./src/app/entity/GOrariDateEntity.entity.ts ***!
  \***************************************************/
/*! exports provided: GOrariDateEntity, EOGOrariDateEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOrariDateEntity", function() { return GOrariDateEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOGOrariDateEntity", function() { return EOGOrariDateEntity; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GOrariDateEntity = /** @class */ (function () {
    function GOrariDateEntity() {
    }
    return GOrariDateEntity;
}());

var EOGOrariDateEntity = /** @class */ (function (_super) {
    __extends(EOGOrariDateEntity, _super);
    function EOGOrariDateEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EOGOrariDateEntity;
}(GOrariDateEntity));



/***/ }),

/***/ "./src/app/entity/GOrariEntity.entity.ts":
/*!***********************************************!*\
  !*** ./src/app/entity/GOrariEntity.entity.ts ***!
  \***********************************************/
/*! exports provided: GOrariEntity, EOGOrariEntity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GOrariEntity", function() { return GOrariEntity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOGOrariEntity", function() { return EOGOrariEntity; });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GOrariEntity = /** @class */ (function () {
    function GOrariEntity() {
    }
    return GOrariEntity;
}());

var EOGOrariEntity = /** @class */ (function (_super) {
    __extends(EOGOrariEntity, _super);
    function EOGOrariEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EOGOrariEntity;
}(GOrariEntity));



/***/ }),

/***/ "./src/app/festivity/festivity.component.css":
/*!***************************************************!*\
  !*** ./src/app/festivity/festivity.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\n.container-btn {\n  display: flex;\n  flex-direction: row-reverse;\n  margin-block: 20px;\n}\n"

/***/ }),

/***/ "./src/app/festivity/festivity.component.html":
/*!****************************************************!*\
  !*** ./src/app/festivity/festivity.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-accordion>\n  <mat-expansion-panel\n    (opened)=\"panelOpenState = true\"\n    (closed)=\"panelOpenState = false\"\n  >\n    <mat-expansion-panel-header>\n      <mat-panel-title> Festivity </mat-panel-title>\n      <mat-panel-description> </mat-panel-description>\n    </mat-expansion-panel-header>\n\n    <div class=\"container-btn\">\n      <button\n        type=\"button\"\n        style=\"font-size: large\"\n        mat-raised-button\n        color=\"primary\"\n        (click)=\"onClickAdd()\"\n      >\n        <mat-icon class=\"plus\">+</mat-icon>\n        Add\n      </button>\n    </div>\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"day\">\n        <th mat-header-cell *matHeaderCellDef>Day</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.giorno }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"month\">\n        <th mat-header-cell *matHeaderCellDef>Month</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.mese }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"year\">\n        <th mat-header-cell *matHeaderCellDef>Year</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.anno }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Description</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.descrizione }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"add\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <div class=\"container-btn\">\n            <button\n              type=\"button\"\n              style=\"font-size: large\"\n              mat-raised-button\n              color=\"primary\"\n              (click)=\"onClickAdd()\"\n            >\n              <mat-icon class=\"plus\">+</mat-icon>\n              Add\n            </button>\n          </div>\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef>Edit</th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n            mat-mini-fab\n            color=\"primary\"\n            type=\"button\"\n            matTooltip=\"Edit\"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>mode_edit</mat-icon>\n          </button>\n          {{ element.edit }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n            mat-mini-fab\n            color=\"primary\"\n            type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n          {{ element.delete }}\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </mat-expansion-panel>\n</mat-accordion>\n"

/***/ }),

/***/ "./src/app/festivity/festivity.component.ts":
/*!**************************************************!*\
  !*** ./src/app/festivity/festivity.component.ts ***!
  \**************************************************/
/*! exports provided: FestivityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FestivityComponent", function() { return FestivityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog/festivity-d/festivity-d.component */ "./src/app/dialog/festivity-d/festivity-d.component.ts");
/* harmony import */ var _service_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/api.service */ "./src/app/service/api.service.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FestivityComponent = /** @class */ (function () {
    function FestivityComponent(dialog, _apiservice) {
        this.dialog = dialog;
        this._apiservice = _apiservice;
        this.displayedColumns = [
            "day",
            "month",
            "year",
            "description",
            "edit",
            "delete",
        ];
        this.panelOpenState = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.listfestivity = [];
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    FestivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiservice
            .ListFestivity(this.type, this.id)
            .subscribe(function (res) {
            _this.dataSource.data = res;
        });
    };
    FestivityComponent.prototype.onDelete = function (item) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            title: "Elimina Product ",
            text: "Stai per eliminare ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        }).then(function (result) {
            if (result.value) {
                _this._apiservice
                    .DFestivity(item.id)
                    .subscribe(function (item) {
                    _this._apiservice
                        .ListFestivity(_this.type, _this.id)
                        .subscribe(function (res) {
                        _this.dataSource.data = res;
                    });
                });
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    title: "The product has been Deleted!",
                    type: "success",
                });
                _this._apiservice
                    .ListFestivity(_this.type, _this.id)
                    .subscribe(function (res) {
                    _this.dataSource.data = res;
                });
            }
        });
    };
    FestivityComponent.prototype.onClickAdd = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_4__["FestivityDComponent"], {
            width: "40vw",
        });
        dialogRef.componentInstance.isEdit = false;
        dialogRef.componentInstance.type = this.type;
        dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .ListFestivity(_this.type, _this.id)
                .subscribe(function (res) {
                _this.dataSource.data = res;
            });
        });
    };
    FestivityComponent.prototype.onClickEdit = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_festivity_d_festivity_d_component__WEBPACK_IMPORTED_MODULE_4__["FestivityDComponent"], {
            width: "50vw",
        });
        dialogRef.componentInstance.orarioEdit = __assign({}, element);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.type = this.type;
        dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .ListFestivity(_this.type, _this.id)
                .subscribe(function (res) {
                _this.dataSource.data = res;
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FestivityComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], FestivityComponent.prototype, "type", void 0);
    FestivityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-festivity",
            template: __webpack_require__(/*! ./festivity.component.html */ "./src/app/festivity/festivity.component.html"),
            styles: [__webpack_require__(/*! ./festivity.component.css */ "./src/app/festivity/festivity.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _service_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"]])
    ], FestivityComponent);
    return FestivityComponent;
}());



/***/ }),

/***/ "./src/app/main-page/main-page.component.css":
/*!***************************************************!*\
  !*** ./src/app/main-page/main-page.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field + .mat-form-field {\n  margin-left: 8px;\n}\n"

/***/ }),

/***/ "./src/app/main-page/main-page.component.html":
/*!****************************************************!*\
  !*** ./src/app/main-page/main-page.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-opening-time [id]=\"id\" [type]=\"type\" *ngIf=\"findSection(1)\"></app-opening-time>\n\n<app-specific-date [id]=\"id\" [type]=\"type\" *ngIf=\"findSection(2)\"></app-specific-date>\n\n<app-festivity [id]=\"id\" [type]=\"type\" *ngIf=\"findSection(3)\"></app-festivity>\n"

/***/ }),

/***/ "./src/app/main-page/main-page.component.ts":
/*!**************************************************!*\
  !*** ./src/app/main-page/main-page.component.ts ***!
  \**************************************************/
/*! exports provided: MainPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainPageComponent", function() { return MainPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _service_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/api.service */ "./src/app/service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MainPageComponent = /** @class */ (function () {
    function MainPageComponent(dialog, _apiservice) {
        this.dialog = dialog;
        this._apiservice = _apiservice;
        this.listsections = [];
    }
    MainPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.id = this.route.snapshot.paramMap.get('id');
        this.id = parseInt(window.location.href.toLowerCase().split("&id=")[1].trim(), 10);
        this.type = parseInt(window.location.href.toLowerCase().split("?type=")[1].split("&")[0].trim(), 10);
        this._apiservice
            .ListSections(this.type)
            .subscribe(function (res) {
            _this.listsections = res;
        });
    };
    MainPageComponent.prototype.findSection = function (sectionId) {
        var found = this.listsections.find(function (f) { return f === sectionId; });
        return found
            ? true : false;
    };
    MainPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-main-page",
            template: __webpack_require__(/*! ./main-page.component.html */ "./src/app/main-page/main-page.component.html"),
            styles: [__webpack_require__(/*! ./main-page.component.css */ "./src/app/main-page/main-page.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _service_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], MainPageComponent);
    return MainPageComponent;
}());



/***/ }),

/***/ "./src/app/modules/angular-material-module.ts":
/*!****************************************************!*\
  !*** ./src/app/modules/angular-material-module.ts ***!
  \****************************************************/
/*! exports provided: AngularMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialModule", function() { return AngularMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"]
            ],
            declarations: [],
            providers: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
            ]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());



/***/ }),

/***/ "./src/app/opening-time/opening-time.component.css":
/*!*********************************************************!*\
  !*** ./src/app/opening-time/opening-time.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\n"

/***/ }),

/***/ "./src/app/opening-time/opening-time.component.html":
/*!**********************************************************!*\
  !*** ./src/app/opening-time/opening-time.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-accordion>\n  <mat-expansion-panel\n    (opened)=\"panelOpenState = true\"\n    (closed)=\"panelOpenState = false\"\n  >\n    <mat-expansion-panel-header>\n      <mat-panel-title> Opening Time </mat-panel-title>\n      <mat-panel-description>\n      </mat-panel-description>\n    </mat-expansion-panel-header>\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n\n      <ng-container matColumnDef=\"day\">\n        <th mat-header-cell *matHeaderCellDef>Day</th>\n        <td mat-cell *matCellDef=\"let element\">\n      <!-- {{   element.period_id|date:'EEEE'}} -->\n      {{  getDayInWeek( element.period_id)}}\n\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"firstperiod\">\n        <th mat-header-cell *matHeaderCellDef>First Period</th>\n        <td mat-cell *matCellDef=\"let element\">\n\n          {{ element.dalle_1|date: 'h:mm a'}}   - {{ element.alle_1|date: 'h:mm a'}}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"secondperiod\">\n        <th mat-header-cell *matHeaderCellDef>Second period</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.dalle_2|date: 'h:mm a'}}   - {{ element.alle_2|date: 'h:mm a'}}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-mini-fab color=\"primary\"  type=\"button\" matTooltip=\"Edit\" (click)=\"onClickEdit(element)\" >\n            <mat-icon>mode_edit</mat-icon>\n          </button>\n          {{ element.edit }}\n        </td>\n      </ng-container>\n\n\n\n\n\n\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </mat-expansion-panel>\n</mat-accordion>\n"

/***/ }),

/***/ "./src/app/opening-time/opening-time.component.ts":
/*!********************************************************!*\
  !*** ./src/app/opening-time/opening-time.component.ts ***!
  \********************************************************/
/*! exports provided: OpeningTimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpeningTimeComponent", function() { return OpeningTimeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _service_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/api.service */ "./src/app/service/api.service.ts");
/* harmony import */ var _dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog/add-edit/add-edit.component */ "./src/app/dialog/add-edit/add-edit.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OpeningTimeComponent = /** @class */ (function () {
    function OpeningTimeComponent(dialog, _apiservice) {
        this.dialog = dialog;
        this._apiservice = _apiservice;
        this.displayedColumns = ["day", "firstperiod", "secondperiod", "edit"];
        this.panelOpenState = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.listgorari = [];
        this.listdate = [];
        this.listfestivity = [];
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    OpeningTimeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiservice
            .Listgorari(this.type, this.id)
            .subscribe(function (res) {
            _this.dataSource.data = res;
            console.log("opening", res);
        });
    };
    OpeningTimeComponent.prototype.getDayInWeek = function (day) {
        var dayString = "";
        switch (day) {
            case 1:
                dayString = "Monday";
                break;
            case 2:
                dayString = "Tuesday";
                break;
            case 3:
                dayString = "Wednesday";
                break;
            case 4:
                dayString = "Thursday";
                break;
            case 5:
                dayString = "Friday";
                break;
            case 6:
                dayString = "Saturday";
                break;
            case 7:
                dayString = "Sunday";
                break;
            case 8:
                dayString = "Holidays";
                break;
        }
        return dayString;
    };
    OpeningTimeComponent.prototype.onClickEdit = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_add_edit_add_edit_component__WEBPACK_IMPORTED_MODULE_4__["AddEditComponent"], {
            width: "50vw",
            data: {
                d: this.getDayInWeek(element.period_id),
            },
        });
        dialogRef.componentInstance.orarioEdit = __assign({}, element);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.type = this.type;
        dialogRef.componentInstance.id = this.id;
        console.log('thisId', this.id);
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .Listgorari(_this.type, _this.id)
                .subscribe(function (res) {
                _this.dataSource.data = res;
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OpeningTimeComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OpeningTimeComponent.prototype, "id", void 0);
    OpeningTimeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-opening-time",
            template: __webpack_require__(/*! ./opening-time.component.html */ "./src/app/opening-time/opening-time.component.html"),
            styles: [__webpack_require__(/*! ./opening-time.component.css */ "./src/app/opening-time/opening-time.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _service_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]])
    ], OpeningTimeComponent);
    return OpeningTimeComponent;
}());



/***/ }),

/***/ "./src/app/service/api.service.ts":
/*!****************************************!*\
  !*** ./src/app/service/api.service.ts ***!
  \****************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ApiService = /** @class */ (function () {
    function ApiService(context, httpClient, snackbar) {
        this.context = context;
        this.httpClient = httpClient;
        this.snackbar = snackbar;
        this.listgorari = "GOrari/list";
        this.listfestivity = "gfestivita/list";
        this.listdate = "goraridate/list";
        this.deletedate = "goraridate/delete";
        this.setgorari = "gorari/set";
        this.setgoraridate = "goraridate/set";
        this.setfestivity = "gfestivita/set";
        this.deletefestivity = "gfestivita/delete";
        this.listSections = "Application/ListTimetableSectionsByType";
        this.api_uri = this.context._properties.routingWebAPI;
    }
    ApiService.prototype.Listgorari = function (type, id) {
        var _this = this;
        return this.httpClient
            .get("" + this.api_uri + this.listgorari + "?Type=" + type + "&Id=" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.ListFestivity = function (type, id) {
        var _this = this;
        return this.httpClient
            .get("" + this.api_uri + this.listfestivity + "?Type=" + type + "&Id=" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.ListGorariDate = function (type, id) {
        var _this = this;
        return this.httpClient
            .get("" + this.api_uri + this.listdate + "?Type=" + type + "&Id=" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.ListSections = function (type) {
        var _this = this;
        return this.httpClient
            .get("" + this.api_uri + this.listSections + "?Type=" + type)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            console.log("hello time table", data);
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.Setgorari = function (entity) {
        var _this = this;
        var params;
        params = JSON.stringify(entity);
        return this.httpClient
            .post("" + this.api_uri + this.setgorari, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.SetOrariDate = function (entity) {
        var _this = this;
        var params;
        params = JSON.stringify(entity);
        return this.httpClient
            .post("" + this.api_uri + this.setgoraridate, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.SetFestivity = function (entity) {
        var _this = this;
        var params;
        params = JSON.stringify(entity);
        return this.httpClient
            .post("" + this.api_uri + this.setfestivity, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.DGOrariDate = function (id) {
        var _this = this;
        var params;
        params = JSON.stringify(id);
        return this.httpClient
            .post("" + this.api_uri + this.deletedate, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    ApiService.prototype.DFestivity = function (id) {
        var _this = this;
        var params;
        params = JSON.stringify(id);
        return this.httpClient
            .post("" + this.api_uri + this.deletefestivity, params)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (data) {
            return JSON.parse(data);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) {
            return _this.handleError(err);
        }));
    };
    //UTILITY
    ApiService.prototype.handleError = function (err) {
        if (err.status !== 404) {
            this.openErrorSnackbar(err);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err);
        }
        else {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(null);
        }
    };
    ApiService.prototype.openErrorSnackbar = function (err) {
        if (err.status !== 404) {
            var errorMessage = err && err.message
                ? err.message
                : "Errors have occurred. Please try again later.";
            this.snackbar.open(errorMessage, null, { duration: 6000 });
        }
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root",
        }),
        __metadata("design:paramtypes", [src_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_5__["Context"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/specific-date/specific-date.component.css":
/*!***********************************************************!*\
  !*** ./src/app/specific-date/specific-date.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width:100%\n}\n.container-btn {\n  display: flex;\n  flex-direction: row-reverse;\n  margin-block: 20px;\n}\n"

/***/ }),

/***/ "./src/app/specific-date/specific-date.component.html":
/*!************************************************************!*\
  !*** ./src/app/specific-date/specific-date.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<mat-accordion>\n  <mat-expansion-panel\n    (opened)=\"panelOpenState = true\"\n    (closed)=\"panelOpenState = false\"\n  >\n    <mat-expansion-panel-header>\n      <mat-panel-title> Specific Date </mat-panel-title>\n      <mat-panel-description>\n      </mat-panel-description>\n    </mat-expansion-panel-header>\n\n    <div class=\"container-btn\">\n      <button  type=\"button\" style=\"font-size: large\" mat-raised-button color=\"primary\" (click)=\"onClickAdd()\">\n        <mat-icon class=\"plus\">+</mat-icon>\n        Add\n      </button>\n    </div>\n\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n\n      <ng-container matColumnDef=\"date\">\n        <th mat-header-cell *matHeaderCellDef>Date</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.date| date:  'dd/MM/yyyy'}}\n\n\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"firstperiod\">\n        <th mat-header-cell *matHeaderCellDef>First Period</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.time1|date: 'hh:mm a'}}   - {{ element.time2|date: 'hh:mm a'}}\n        </td>\n      </ng-container>\n\n\n      <ng-container matColumnDef=\"secondperiod\">\n        <th mat-header-cell *matHeaderCellDef>Second Period</th>\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.time3|date: 'hh:mm a'}}   - {{ element.time4|date: 'hh:mm a'}}\n        </td>\n      </ng-container>\n\n\n      <!-- <div class=\"container-btn\">\n        <button  type=\"button\" style=\"font-size: large\" mat-raised-button color=\"primary\" >\n          <mat-icon class=\"plus\">+</mat-icon>\n          Add\n        </button>\n      </div> -->\n\n      <!-- <ng-container matColumnDef=\"add\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n      <div class=\"container-btn\">\n        <button  type=\"button\" style=\"font-size: large\" mat-raised-button color=\"primary\" (click)=\"onClickAdd()\" >\n          <mat-icon class=\"plus\">+</mat-icon>\n          Add\n        </button>\n      </div>\n    </td>\n  </ng-container> -->\n\n      <ng-container matColumnDef=\"edi\">\n        <th mat-header-cell *matHeaderCellDef>Edit</th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button mat-mini-fab color=\"primary\"  type=\"button\" matTooltip=\"Edit\" (click)=\"onClickEdit(element)\">\n            <mat-icon>mode_edit</mat-icon>\n          </button>\n          {{ element.edi }}\n        </td>\n      </ng-container>\n\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n\n          <button mat-mini-fab color=\"primary\"  type=\"button\" matTooltip=\"Delete\"  (click)=\"onDelete(element)\">\n            <mat-icon>delete</mat-icon>\n          </button>\n          {{ element.delete }}\n\n        </td>\n      </ng-container>\n\n\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </mat-expansion-panel>\n</mat-accordion>\n"

/***/ }),

/***/ "./src/app/specific-date/specific-date.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/specific-date/specific-date.component.ts ***!
  \**********************************************************/
/*! exports provided: SpecificDateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecificDateComponent", function() { return SpecificDateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialog/add-edit-specific/add-edit-specific.component */ "./src/app/dialog/add-edit-specific/add-edit-specific.component.ts");
/* harmony import */ var _service_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../service/api.service */ "./src/app/service/api.service.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SpecificDateComponent = /** @class */ (function () {
    function SpecificDateComponent(dialog, _apiservice) {
        this.dialog = dialog;
        this._apiservice = _apiservice;
        this.displayedColumns = [
            "date",
            "firstperiod",
            "secondperiod",
            "edi",
            "delete",
        ];
        this.panelOpenState = false;
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.listdate = [];
        this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    SpecificDateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._apiservice
            .ListGorariDate(this.type, this.id)
            .subscribe(function (res) {
            _this.dataSource.data = res;
        });
    };
    SpecificDateComponent.prototype.onDelete = function (item) {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            title: "Elimina Product ",
            text: "Stai per eliminare ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        }).then(function (result) {
            if (result.value) {
                _this._apiservice
                    .DGOrariDate(item.id)
                    .subscribe(function (item) {
                    _this._apiservice
                        .ListGorariDate(_this.type, _this.id)
                        .subscribe(function (res) {
                        _this.dataSource.data = res;
                    });
                });
                sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
                    title: "The product has been Deleted!",
                    type: "success",
                });
                _this._apiservice
                    .ListGorariDate(_this.type, _this.id)
                    .subscribe(function (res) {
                    _this.dataSource.data = res;
                });
            }
        });
    };
    SpecificDateComponent.prototype.onClickAdd = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_4__["AddEditSpecificComponent"], {
            width: "40vw",
        });
        dialogRef.componentInstance.isEdit = false;
        dialogRef.componentInstance.type = this.type;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.listCurrentSpecificDate = this.dataSource.data;
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .ListGorariDate(_this.type, _this.id)
                .subscribe(function (res) {
                _this.dataSource.data = res;
            });
        });
    };
    SpecificDateComponent.prototype.onClickEdit = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(_dialog_add_edit_specific_add_edit_specific_component__WEBPACK_IMPORTED_MODULE_4__["AddEditSpecificComponent"], {
            width: "50vw",
        });
        dialogRef.componentInstance.orarioEdit = __assign({}, element);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.type = this.type;
        dialogRef.componentInstance.listCurrentSpecificDate = this.dataSource.data;
        dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            _this._apiservice
                .ListGorariDate(_this.type, _this.id)
                .subscribe(function (res) {
                _this.dataSource.data = res;
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SpecificDateComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], SpecificDateComponent.prototype, "id", void 0);
    SpecificDateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-specific-date",
            template: __webpack_require__(/*! ./specific-date.component.html */ "./src/app/specific-date/specific-date.component.html"),
            styles: [__webpack_require__(/*! ./specific-date.component.css */ "./src/app/specific-date/specific-date.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _service_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"]])
    ], SpecificDateComponent);
    return SpecificDateComponent;
}());



/***/ }),

/***/ "./src/app/validation/date.validation.ts":
/*!***********************************************!*\
  !*** ./src/app/validation/date.validation.ts ***!
  \***********************************************/
/*! exports provided: dateLessThan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateLessThan", function() { return dateLessThan; });
function dateLessThan(firstDateField, secondDateField) {
    return function (form) {
        var firstDateValue = form.get(firstDateField).value;
        var secondDateValue = form.get(secondDateField).value;
        if (!firstDateValue || (!secondDateValue)) {
            return { missing: true };
        }
        var myArray1 = firstDateValue.split(":");
        var firstDate = new Date();
        firstDate.setHours(+myArray1[0]);
        firstDate.setMinutes(+myArray1[1]);
        firstDate.setSeconds(0);
        var myArray2 = secondDateValue.split(":");
        var secondDate = new Date();
        secondDate.setHours(+myArray2[0]);
        secondDate.setMinutes(+myArray2[1]);
        secondDate.setSeconds(0);
        if (firstDate >= secondDate) {
            var err = { dateLessThan: true };
            form.get(firstDateField).setErrors(err);
            return err;
        }
        else {
            var dateLessError = form.get(firstDateField).hasError("dateLessThan");
            if (dateLessError) {
                delete form.get(firstDateField).errors["dateLessThan"];
                form.get(firstDateField).updateValueAndValidity();
            }
        }
    };
}


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\maryam.alimohammadi\Desktop\timetable\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map