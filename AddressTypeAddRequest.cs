using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.Common
{
    public class AddressTypeAddRequest
    {
        [Required]
        public string TypeName { get; set; }

        [Required]
        public string TypeDescription { get; set; }
    }
}
