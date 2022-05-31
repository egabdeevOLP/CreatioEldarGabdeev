define("OmniTourOffersd05696a5Section", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "OmniTourOffers",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
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
				var entity = this.getEntity();
				
				if(this.Ext.isEmpty(entity))
					return;
				
				this.callOmniCreateToursProcess(entity.get("Id"));
			},
			
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": {bindTo: "Resources.Strings.OmniCreateTours"},
					"Click": {bindTo: "createTours"},
					"Enabled": true
				}));
				return actionMenuItems;
			}
		}
	};
});
