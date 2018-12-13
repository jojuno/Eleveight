using System;

namespace SocialMediaApp132.Models.Domain.Utilities
{
    public class SearchBarResult
    {
        public string SearchResultTitle { get; set; }
        public int Id { get; set; }
        public string ResultDescription { get; set; }
        public string ResultType { get; set; }
        public string AvatarUrl { get; set; }
        public string ResultUrl { get; set; }
        public int PageCount { get; set; }
        public int RecordCount { get; set; }
    }
}
