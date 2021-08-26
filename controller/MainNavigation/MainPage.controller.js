sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function (Controller) {
    "use strict";

    var Controller = Controller.extend("DemoUXapp.controller.MainNavigation.MainPage", {

        onInit: function () {
            var oRouter = this.getRouter();

			oRouter.getRoute("MainPage").attachMatched(this._onRouteMatched, this);
            //Creating and starting MockServer
            jQuery.sap.require("sap.ui.app.MockServer");

            sap.ui.app.MockServer.config({
                autoRespond: true,
                autoRespondAfter: 0
            });

            // create mockserver
            var oMockServer = new sap.ui.app.MockServer({
                rootUri: "/"
            });

            // start and return
            oMockServer.simulate("localService/metadata.xml", "localService/mockdata");
            oMockServer.start();

            var sURL = "/";
            var amodel = new sap.ui.model.odata.ODataModel(sURL, true);
            var oModel = new sap.ui.model.json.JSONModel();
            var tModel = new sap.ui.model.json.JSONModel();
            amodel.read("/Employees", {
				success: function(oRetrievedResult) {
                    oModel.setData(oRetrievedResult.results.slice(0,3));
                    tModel.setData(oRetrievedResult.results);
				},
                error: function(oError) { /* do something */ }
              });      
              this.getView().setModel(oModel);
              this.getView().setModel(tModel, "totalData");
        },
        onPress: function (oEvent) {
            var oItem, oCtx, oAttr;
            oItem = oEvent.getSource();
            oCtx = oItem.getBindingContext();
            oAttr = oCtx.getProperty("EmployeeID");
            this.getRouter().navTo("employee", {
                employeeId: oAttr
            });
        },
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });

    return Controller;
});