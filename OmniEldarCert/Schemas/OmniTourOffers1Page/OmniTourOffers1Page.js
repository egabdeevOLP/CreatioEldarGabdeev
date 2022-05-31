define("OmniTourOffers1Page", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "OmniTourOffers",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"OmniSchema5cfd9a6aDetail90f31dcf": {
				"schemaName": "OmniSchema5cfd9a6aDetail",
				"entitySchemaName": "OmniTour",
				"filter": {
					"detailColumn": "OmniOmniTourOffers",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"OmniOwner": {
				"68457b4f-c21f-4c0e-a04b-54449beec2c9": {
					"uId": "68457b4f-c21f-4c0e-a04b-54449beec2c9",
					"enabled": true,
					"removed": false,
					"ruleType": 1,
					"baseAttributePatch": "Type",
					"comparisonType": 3,
					"autoClean": false,
					"autocomplete": false,
					"type": 0,
					"value": "60733efc-f36b-1410-a883-16d83cab0980",
					"dataValueType": 10
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		messages: {
                "OmniToursCreated": {
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    "direction": Terrasoft.MessageDirectionType.SUBSCRIBE
                }
            },
		methods: {
			callOmniCreateToursProcess: function(tourOfferId) {
				if(this.Ext.isEmpty(tourOfferId))
					return;
				
                var contactParameter = this.get("PrimaryContact");
                var args = {
                    sysProcessName: "OmniCreateTours",
                    parameters: {
                        OmniTourOfferId: tourOfferId
                    }
                };
                ProcessModuleUtilities.executeProcess(args);
            },
			
			createTours: function(){
				this.callOmniCreateToursProcess(this.get("Id"));
			},
			
			getActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getButtonMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));
                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": {bindTo: "Resources.Strings.OmniCreateTours"},
                    "Tag": "createTours",
                    "Enabled": true
                }));
                return actionMenuItems;
            },
			
			init: function() {
				this.callParent(arguments);
				this.sandbox.registerMessages(this.messages);
				this.sandbox.subscribe("OmniToursCreated", this.onOmniToursCreated, this);
			},
			
			onOmniToursCreated: function(){
				console.log("Получено сообщение OmniToursCreated");
				this.reloadEntity();
			},
			
			asyncValidate: function(callback, scope) {
				this.callParent([function(response) {
					if (!this.validateResponse(response)) {
						return;
					}
					Terrasoft.chain(
						function(next) {
							this.validateMaxToursNumber(function(response) {
								if (this.validateResponse(response)) {
									next();
								}
							}, this);
						},
						function(next) {
							callback.call(scope, response);
							next();
						}, this);
				}, this]);
			},
			
			validateMaxToursNumber: function(callback, scope) {
				var tourOfferPeridicity = scope.get("OmniPeriodicity");
				var notValidate = scope.Ext.isEmpty(tourOfferPeridicity) ||
					(!scope.Ext.isEmpty(tourOfferPeridicity) && tourOfferPeridicity.value !== "787b9af7-eb03-465b-a4fe-072804f4e000");
				
				if(notValidate){
					callback.call(scope, {success: true});
					return;
				}
				
				scope.Terrasoft.SysSettings.querySysSettingsItem("OmniNumberOfActiveDailyTours",
					function(number) {
						var esq = scope.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "OmniTourOffers"});

						esq.filters.addItem(
							scope.Terrasoft.createColumnFilterWithParameter(
								scope.Terrasoft.ComparisonType.EQUAL, "OmniPeriodicity", tourOfferPeridicity));

						esq.getEntityCollection(function(response) {
							var result = {success: true};
							if (response.success && response.collection.getCount() >= number) {
								var currentId = scope.get("Id");
								var lastTourChanging = false;
								
								response.collection.each(function(item){
									if(item.get("Id") == currentId)
										lastTourChanging = true;
								});
								
								if(!lastTourChanging){
									result.message = scope.get("Resources.Strings.OmniMaxNumberOfToursValidationMessage") + " " + number;
									result.success = false;
								}
							}
							callback.call(scope || scope, result);
						}, scope);
					}, scope)
			},
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "OmniNamea26278dd-57e3-4d4c-bd41-6bd0a73abbda",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "OmniName",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING04996e71-3f2b-4323-ae83-688754e1e94a",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "OmniCode",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OmniComment38fdd708-bb7a-440e-a158-ac85103a8dde",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "OmniComment"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OmniMainInfo",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.OmniMainInfoTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OmniMainInfoGroupc7b9a2db",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.OmniMainInfoGroupc7b9a2dbGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "OmniMainInfo",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OmniMainInfoGridLayout000ead8c",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "OmniMainInfoGroupc7b9a2db",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OmniOwnere28c4b6b-cab4-43ec-9965-7f1a28352d3f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "OmniMainInfoGridLayout000ead8c"
					},
					"bindTo": "OmniOwner"
				},
				"parentName": "OmniMainInfoGridLayout000ead8c",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "OmniPeriodicityb7dab127-9549-456c-8218-a9548d5ba5f9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "OmniMainInfoGridLayout000ead8c"
					},
					"bindTo": "OmniPeriodicity"
				},
				"parentName": "OmniMainInfoGridLayout000ead8c",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OmniActive3a39ffd1-8b3a-4bdc-a841-562ecc309b50",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "OmniMainInfoGridLayout000ead8c"
					},
					"bindTo": "OmniActive"
				},
				"parentName": "OmniMainInfoGridLayout000ead8c",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "OmniSchema5cfd9a6aDetail90f31dcf",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "OmniMainInfo",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
