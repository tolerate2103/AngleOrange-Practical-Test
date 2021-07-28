"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorListComponent = void 0;
var base_component_1 = require("../../framework/base/base.component");
var AllCriteria_1 = require("../../framework/criteria/AllCriteria");
var AuthorListComponent = /** @class */ (function (_super) {
    __extends(AuthorListComponent, _super);
    function AuthorListComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthorListComponent.prototype.ngOnInit = function () {
        this.IsLoading = true;
        this.Criteria = Object.assign(new AllCriteria_1.AllCriteria(), { Page: 1, PageSize: 50 });
        this.loadData();
    };
    AuthorListComponent.prototype.ngAfterViewInit = function () {
    };
    AuthorListComponent.prototype.loadData = function () {
        var _this = this;
        this.IsLoading = true;
        this.dc.post('api/Author/LoadItems', this.Criteria).subscribe(function (response) {
            _this.model = response;
            console.log(_this.model);
            _this.Criteria = _this.model.Criteria;
            _this.IsLoading = false;
        }, function (error) {
            console.error(error);
            _this.somethingWentWrong();
            _this.IsLoading = false;
        });
    };
    AuthorListComponent.prototype.next = function () {
        this.Criteria.Page++;
        this.loadData();
    };
    AuthorListComponent.prototype.previous = function () {
        if (this.Criteria.Page > 1) {
            this.Criteria.Page--;
            this.loadData();
        }
    };
    return AuthorListComponent;
}(base_component_1.BaseComponent));
exports.AuthorListComponent = AuthorListComponent;
//# sourceMappingURL=author-list.component.js.map