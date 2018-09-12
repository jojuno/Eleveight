using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.PrivacyPolicies
{
    public class PrivacyPolicyUpdateRequest : PrivacyPolicyAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}