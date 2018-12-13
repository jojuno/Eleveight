using SocialMediaApp132.Models.Domain.Utilities;
using SocialMediaApp132.Models.Requests.Utilities;
using System.Collections.Generic;

namespace SocialMediaApp132.Services.Utilities
{
    public interface ISearchBarResultsService
    {
        List<SearchBarResult> ReadByQueryAndPageNumber(string searchText, int pageNumber);
    }
}
