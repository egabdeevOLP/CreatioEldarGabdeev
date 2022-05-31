 namespace Terrasoft.Configuration.OmniTourOffersServiceNamespace
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using Terrasoft.Core;
    using Terrasoft.Web.Common;
    using Terrasoft.Core.Entities;
	using Terrasoft.Core.DB;
    using System.Data;
    using Newtonsoft.Json;
    using System.Collections.Generic;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class OmniSuperService: BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public void SuperMethod(string code) 
		{
			Select select = new Select(UserConnection);
		}
	}
}