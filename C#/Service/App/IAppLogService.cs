using SocialMediaApp132.Models.Domain.App;
using SocialMediaApp132.Models.Requests.App;
using System.Collections.Generic;

namespace SocialMediaApp132.Services.App
{
    public interface IAppLogService
    {
        int Insert(AppLogAddRequest model);

        List<AppLog> ReadAll(int pageSize, int pageNumber, int appLogTypeId);

        AppLog ReadById(int id);
    }
}
