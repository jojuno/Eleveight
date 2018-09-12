using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.Common
{
    public class LanguageTypeUpdateRequest : LanguageTypeAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}