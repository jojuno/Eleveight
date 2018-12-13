using System.ComponentModel.DataAnnotations;

namespace SocialMediaApp132.Models.Requests.Utilities
{
    public class ContactUsAddRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string SubjectId { get; set; }

        [Required]
        public string Message { get; set; }
    }
}
