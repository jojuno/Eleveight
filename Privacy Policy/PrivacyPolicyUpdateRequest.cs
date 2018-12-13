using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp132.Models.Requests.PrivacyPolicies
{
    public class PrivacyPolicyUpdateRequest : PrivacyPolicyAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
