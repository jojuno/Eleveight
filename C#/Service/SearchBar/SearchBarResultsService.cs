using Eleveight.Models.Domain.Utilities;
using Eleveight.Models.Requests.Utilities;
using Eleveight.Services.Tools;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Eleveight.Services.Utilities;

namespace Eleveight.Services.Utilities
{
    public class SearchBarResultsService : BaseService, ISearchBarResultsService
    {

        public List<SearchBarResult> ReadByQueryAndPageNumber(string searchText, int pageNumber)
        {
            List<SearchBarResult> list = new List<SearchBarResult>();
            DataProvider.ExecuteCmd("dbo.SearchBar_GetAll",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@SearchText", searchText);
                    inputs.AddWithValue("@PageNumber", pageNumber);
                },
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    list.Add(DataMapper<SearchBarResult>.Instance.MapToObject(reader));
                });
            return list;
        }
    }
}
