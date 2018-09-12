using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.Common
{
    public class LanguageTypeAddRequest
    {
        [Required]
        public string TypeName { get; set; }

        [Required]
        public string TypeDescription { get; set; }
    }
}