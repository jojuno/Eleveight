using SocialMediaApp132.Models.Domain.Utilities;
using SocialMediaApp132.Models.Responses;
using SocialMediaApp132.Models.Requests.App;
using SocialMediaApp132.Services;
using SocialMediaApp132.Services.App;
using SocialMediaApp132.Services.Utilities;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace SocialMediaApp132.Web.Controllers.Api.Common
{

    [RoutePrefix("api/search")]
    public class SearchBarController : ApiController
    {
        private ISearchBarResultsService _searchBarResultsService;
        private IAppLogService _appLogService;
        private IUserService _userService;

        public SearchBarController(ISearchBarResultsService searchBarResultsService, IAppLogService appLogService, IUserService userService)
        {
            _searchBarResultsService = searchBarResultsService;
            _userService = userService;
            _appLogService = appLogService;
        }

        [Route("{query}/{pageNumber:int}"), HttpGet]
        public IHttpActionResult GetByQueryAndPageNumber(string query, int pageNumber = 1)
        {
            try
            {
                ItemsResponse<SearchBarResult> response = new ItemsResponse<SearchBarResult>();
                response.Items = _searchBarResultsService.ReadByQueryAndPageNumber(query, pageNumber);
                return Ok(response);
            }
            catch (Exception ex)
            {

                int currentUser = _userService.GetCurrentUserId();
                _appLogService.Insert(new AppLogAddRequest
                {
                    AppLogTypeId = 1,
                    Message = ex.Message,
                    StackTrace = ex.StackTrace,
                    Title = "Error in " + GetType().Name + " " + System.Reflection.MethodBase.GetCurrentMethod().Name,
                    UserBaseId = currentUser
                });

                return BadRequest(ex.Message);
            }
        }
    }
}
