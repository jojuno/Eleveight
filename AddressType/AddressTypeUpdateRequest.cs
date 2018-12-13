using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.Common
{
    public class AddressTypeUpdateRequest : AddressTypeAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
