using System;

namespace SocialMediaApp132.Models.Domain.PrivacyPolicies
{
    public class PrivacyPolicy
    {
        public int Id { get; set; }
        public string Heading { get; set; }
        public string Body { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
