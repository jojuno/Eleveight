using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp132.Models.Requests.Common
{
    public class LanguageTypeUpdateRequest : LanguageTypeAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
