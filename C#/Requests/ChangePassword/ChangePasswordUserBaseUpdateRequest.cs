using System.ComponentModel.DataAnnotations;

namespace Eleveight.Models.Requests.ChangePassword
{
    public class ChangePasswordUserBaseUpdateRequest
    {
        [Required]
        public string OldPassword { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public int CurrentUserBaseId { get; set; }
    }
}
