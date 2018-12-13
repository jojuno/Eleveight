using SocialMediaApp132.Models.Domain.PrivacyPolicies;
using SocialMediaApp132.Models.Requests.PrivacyPolicies;
using System.Collections.Generic;

namespace SocialMediaApp132.Services.PrivacyPolicies
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
