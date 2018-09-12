using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.PrivacyPolicies
{
    public class PrivacyPolicyAddRequest
    {
        [Required]
        public string Heading { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public int DisplayOrder { get; set; }
    }
}