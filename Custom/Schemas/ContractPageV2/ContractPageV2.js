define("ContractPageV2", ["css!OmniContractHintCSS"], function() {
	return {
		entitySchemaName: "Contract",
		attributes: {
			"ContractHint": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: ""
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			testOnClick: function(){
				
			},
			
			onEntityInitialized: function(){
				this.callParent(arguments);
				
				this.setContractHint("приложите документ<br>приложите документ")
			},
			
			setContractHint: function(innerHTML) {
				var el = document.getElementById("contract-hint-content");
				
				el.innerHTML = innerHTML;
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "ContractHint",
				"values": {
					"itemType": Terrasoft.ViewItemType.COMPONENT,
					"className": "Terrasoft.HtmlControl",
					"html": "<span id=\"contract-hint\" class=\"contract-hint\"><div id=\"contract-hint-content\" class=\"contract-hint-content\"></div></span>",
					selectors: {
						wrapEl: ".contract-hint"
					},
					"enabled": true,
					"visible": true,
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "CreatedByaf73e68a-af7d-4831-806b-c5832f9489ed",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "CreatedBy"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "Amount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Parent",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "move",
				"name": "Parent",
				"parentName": "ContractConnectionsBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Order",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "ContractPassportTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "ContractVisaTab",
				"values": {
					"order": 3
				}
			},
			{
				"operation": "merge",
				"name": "NotesAndFilesTab",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "move",
				"name": "Type",
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "move",
				"name": "State",
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "move",
				"name": "OurCompany",
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "move",
				"name": "SupplierBillingInfo",
				"parentName": "group_gridLayout",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_DIFF*/
	};
});
