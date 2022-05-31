  define("OpportunityActionsDashboard", ["ServiceHelper", "OmniOpportunityBaseStageControl"], function(ServiceHelper, BaseStageControl) {
	return {
		modules:{
			"BaseStageControl": "Terrasoft.controls.OmniOpportunityBaseStageControl"
		},
		mixins:{
			"BaseStageControl": "Terrasoft.controls.OmniOpportunityBaseStageControl"
		},
		attributes: {
			"MasterEntityId":{
				dataValueType: Terrasoft.DataValueType.GUID,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: null
			},
			"SaveMasterEntityMethod": {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			}
		},
		methods: {
			/**
			 * The callback function of the SaveRecord message.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			onMasterEntitySaved: function(callback, scope) {
				this.set("IsMasterEntityInitialized", true);
				Ext.callback(callback, scope || this);
				//this.reloadMasterEntityCard();
			},
			
			/**
			 * Publishes the SaveRecord message.
			 * @protected
			 * @param {Object} config for SaveRecord message.
			 * @param {Object} scope Execution context.
			 */
			saveMasterEntityBeforeValidation: function(config, scope) {
				const sandbox = this.sandbox;
				let callback = Ext.emptyFn;
				let contextForCallback = scope;
				if (config) {
					callback = config.callback || callback;
					contextForCallback = config.scope || contextForCallback;
					delete config.callback;
					delete config.scope;
				}
				const saveMasterEntityConfig = this.getSaveMasterEntityConfig(callback, contextForCallback);
				Ext.apply(saveMasterEntityConfig, config);
				//this._updateStateObject();
				sandbox.publish("SaveRecord", saveMasterEntityConfig, [sandbox.id]);
			},
			
			init: function(){
				this.callParent(arguments);
				this.set("MasterEntityId", this.getMasterEntityParameterValue("Id"));
				this.set("SaveMasterEntityMethod", this.saveMasterEntity.bind(this));
			},
			
			/*onActiveStageClick: function(oldValue, value, displayValue, scope) {
				console.log(BaseStageControl);
				var result = this.callParent(arguments);
				if(result){
					this.onValidateStageOnClick(oldValue, value, displayValue, scope);
				}
			},*/
			
			onShowInvalidInformationDialog: function(text){
				this.showInformationDialog(text);
			}
			
			/*onActionChanged: function(){
				const scope = this;
				var parentMethod = this.getParentMethod();
    			var parentArguments = arguments;
				
				this.validateOnStage(parentArguments[0], function() {
					parentMethod.apply(scope, parentArguments);
				}, scope);
			},*/
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "ActionsControl",
				"parentName": "HeaderContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.OmniOpportunityBaseStageControl",
					"saveMasterEntity":{
						"bindTo": "SaveMasterEntityMethod"
					},
					"masterEntityId": {
						"bindTo" : "MasterEntityId"
					},
					"activeStageId": {
						"bindTo": "ActiveActionId"
					},
					"stages": {
						"bindTo": "ActionsCollection"
					},
					"activeStageChanged": {
						"bindTo": "onActionChanged"
					},
					"activeStageClick": {
						"bindTo": "onActiveStageClick"
					},
					"showInvalidInformationDialog":{
						"bindTo": "onShowInvalidInformationDialog"
					},
				}
			},
		]/**SCHEMA_DIFF*/
	};
});