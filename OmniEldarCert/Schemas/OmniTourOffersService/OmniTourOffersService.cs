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
    public class OmniTourOffersService: BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public decimal GetToursSummaryPriceByCode(string code) {
			Guid? tourOfferId = GetTourOfferIdByCode(code);
			
			if(tourOfferId == null)
				return -1;
				
			decimal result = GetToursSummaryPriceByOfferId((Guid) tourOfferId);
			
            return result;
        }
		
		private Guid? GetTourOfferIdByCode(string code)
		{
			Select select = new Select(UserConnection);
			
			select
				.Column("Id")
				.From("OmniTourOffers")
					.Where("OmniCode").IsEqual(Column.Parameter(code));
					
			using (DBExecutor dbExecutor = UserConnection.EnsureDBConnection())
            {
                using (IDataReader dataReader = select.ExecuteReader(dbExecutor))
                {
                    if (dataReader.Read())
						return dataReader.GetGuid(0);
					else
						return null;
                }
            }
		}
		
		private decimal GetToursSummaryPriceByOfferId(Guid tourOfferId)
		{
			Select select = new Select(UserConnection);
			
			select
				.Column("OmniPriceFloat")
				.From("OmniTour")
					.Where("OmniOmniTourOffersId").IsEqual(Column.Parameter(tourOfferId));
			
			using (DBExecutor dbExecutor = UserConnection.EnsureDBConnection())
            {
                using (IDataReader dataReader = select.ExecuteReader(dbExecutor))
                {
					decimal sum = 0;
					//int count = 0;
                    while (dataReader.Read())
					{		
						sum += dataReader.GetDecimal(0);
						//count++;
					}
					//if(count == 0)
					//	return -1;
					return sum;
                }
            }
		}
    }
}