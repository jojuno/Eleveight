using SocialMediaApp132.Models.Domain.Utilities;
using SocialMediaApp132.Models.Requests.Utilities;
using SocialMediaApp132.Services.Tools;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using SocialMediaApp132.Services.Utilities;

namespace SocialMediaApp132.Services.Utilities
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
