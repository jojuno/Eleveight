using Eleveight.Models.Domain.Utilities;
using Eleveight.Models.Requests.Utilities;
using System.Collections.Generic;

namespace Eleveight.Services.Utilities
{
    public interface ISearchBarResultsService
    {
        List<SearchBarResult> ReadByQueryAndPageNumber(string searchText, int pageNumber);
    }
}
