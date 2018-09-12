using Eleveight.Models.Domain.PrivacyPolicies;
using Eleveight.Models.Requests.PrivacyPolicies;
using System.Collections.Generic;

namespace Eleveight.Services.PrivacyPolicies
{
    public interface IPrivacyPolicyService
    {
        List<PrivacyPolicy> ReadAll();

        PrivacyPolicy ReadById(int id);

        int Insert(PrivacyPolicyAddRequest model);

        void Update(PrivacyPolicyUpdateRequest model);

        void DeleteById(int id);
    }
}