sap.ui.define([
    'DemoUXapp/controller/BaseController'
], function (BaseController) {
    "use strict";

    var Controller = BaseController.extend("DemoUXapp.controller.MainNavigation.EmployeeDetails",{
        onInit: function(){
			var oRouter = this.getRouter();

			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
            
            //Model Setting
            var sURL = "/";
            var amodel = new sap.ui.model.odata.ODataModel(sURL, true);
            this.getView().setModel(amodel);
      }
    });

    return Controller;
});