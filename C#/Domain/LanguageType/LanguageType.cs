using System;

namespace SocialMediaApp132.Models.Domain.Common
{
    public class LanguageType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public string TypeDescription { get; set; }
        public Boolean CanDelete { get; set; }
    }
}
