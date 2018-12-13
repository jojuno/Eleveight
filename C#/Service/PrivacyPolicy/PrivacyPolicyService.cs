using SocialMediaApp132.Models.Domain.PrivacyPolicies;
using SocialMediaApp132.Models.Requests.PrivacyPolicies;
using SocialMediaApp132.Services.Tools;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

//folder name can't be the same as the domain file name

namespace SocialMediaApp132.Services.PrivacyPolicies
{
    public class PrivacyPolicyService : BaseService, IPrivacyPolicyService
    {
        public List<PrivacyPolicy> ReadAll()
        {
            List<PrivacyPolicy> list = new List<PrivacyPolicy>();
            DataProvider.ExecuteCmd("dbo.PrivacyPolicy_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    list.Add(DataMapper<PrivacyPolicy>.Instance.MapToObject(reader));
                });
            return list;
        }

        public PrivacyPolicy ReadById(int id)
        {
            PrivacyPolicy privacyPolicy = new PrivacyPolicy();
            DataProvider.ExecuteCmd("dbo.PrivacyPolicy_SelectById",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", id);
                },
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    privacyPolicy = DataMapper<PrivacyPolicy>.Instance.MapToObject(reader);
                });
            return privacyPolicy;
        }

        public int Insert(PrivacyPolicyAddRequest model)
        {
            int returnValue = 0;
            DataProvider.ExecuteNonQuery("dbo.PrivacyPolicy_Insert",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Heading", model.Heading);
                    inputs.AddWithValue("@Body", model.Body);
                    inputs.AddWithValue("@DisplayOrder", model.DisplayOrder);
                    SqlParameter idOut = new SqlParameter("@Id", 0);
                    idOut.Direction = ParameterDirection.Output;
                    inputs.Add(idOut);
                },
                returnParameters: (SqlParameterCollection inputs) =>
                {
                    int.TryParse(inputs["@Id"].Value.ToString(), out returnValue);
                });
            return returnValue;
        }

        public void Update(PrivacyPolicyUpdateRequest model)
        {
            DataProvider.ExecuteNonQuery("dbo.PrivacyPolicy_Update",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", model.Id);
                    inputs.AddWithValue("@Heading", model.Heading);
                    inputs.AddWithValue("@Body", model.Body);
                    inputs.AddWithValue("@DisplayOrder", model.DisplayOrder);
                }
            );
        }

        public void DeleteById(int id)
        {
            DataProvider.ExecuteNonQuery("dbo.PrivacyPolicy_Delete",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", id);
                });
        }
    }
}
