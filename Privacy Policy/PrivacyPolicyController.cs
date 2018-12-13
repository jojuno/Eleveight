using SocialMediaApp132.Models.Domain.PrivacyPolicies;
using SocialMediaApp132.Models.Requests.PrivacyPolicies;
using SocialMediaApp132.Models.Responses;
using SocialMediaApp132.Services.PrivacyPolicies;
using System;
using System.Web.Http;

namespace SocialMediaApp132.Web.Controllers.Api.PrivacyPolicies
{
    [RoutePrefix("api/PrivacyPolicies")]
    public class PrivacyPolicyController : ApiController
    {
        private IPrivacyPolicyService _privacyPolicyService;

        public PrivacyPolicyController(IPrivacyPolicyService privacyPolicyService, IPrivacyPolicyService service)
        {
            _privacyPolicyService = privacyPolicyService;
        }

        [Route(), HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll()
        {
            try
            {
                ItemsResponse<PrivacyPolicy> response = new ItemsResponse<PrivacyPolicy>();
                response.Items = _privacyPolicyService.ReadAll();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}"), HttpGet]
        public IHttpActionResult GetById(int id)
        {
            try
            {
                ItemResponse<PrivacyPolicy> response = new ItemResponse<PrivacyPolicy>
                {
                    Item = _privacyPolicyService.ReadById(id)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route(), HttpPost]
        public IHttpActionResult Post(PrivacyPolicyAddRequest model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                ItemResponse<int> response = new ItemResponse<int>
                {
                    Item = _privacyPolicyService.Insert(model)
                };
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}"), HttpPut]
        public IHttpActionResult Put(PrivacyPolicyUpdateRequest model)
        {
            try
            {
                _privacyPolicyService.Update(model);
                return Ok(new SuccessResponse());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}"), HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                _privacyPolicyService.DeleteById(id);
                return Ok(new SuccessResponse());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
