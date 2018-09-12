using Eleveight.Models.Domain.App;
using Eleveight.Models.Requests.App;
using System.Collections.Generic;

namespace Eleveight.Services.App
{
    public interface IAppLogService
    {
        int Insert(AppLogAddRequest model);

        List<AppLog> ReadAll(int pageSize, int pageNumber, int appLogTypeId);

        AppLog ReadById(int id);
    }
}