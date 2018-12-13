using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp132.Models.Requests.PrivacyPolicies
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
