﻿using Eleveight.Models.Domain.Tools;
using Eleveight.Models.Requests.Utilities;
using Eleveight.Models.Responses;
using Eleveight.Services.Tools;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Eleveight.Services.App;

namespace Eleveight.Web.Controllers.Api.Utilities
{

    [RoutePrefix("api/utilities/contactUs")]
    public class ContactUsController : ApiController
    {
        private IEmailMessenger _emailMessenger;

        public ContactUsController(IEmailMessenger emailMessenger)
        {
            _emailMessenger = emailMessenger;
        }

        [Route(), HttpPost]
        public IHttpActionResult Post(ContactUsAddRequest model)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                ItemResponse<int> response = new ItemResponse<int>();

                Email eml = new Email();

                MessageAddress msgAdd = new MessageAddress
                {
                    Email = AppSettingDictionary.Instance.appSettings["gmailAccount"],
                    Name = model.FirstName
                };

                List<MessageAddress> list = new List<MessageAddress>
                    {
                        msgAdd
                    };
                string subject = "";
                if (model.SubjectId == "0")
                {
                    subject = "Student";
                }
                else if (model.SubjectId == "1")
                {
                    subject = "School";
                }
                else
                {
                    subject = "Other";
                }

                eml.To = list;
                eml.FromAddress = model.Email;
                eml.FromName = model.FirstName + " " + model.LastName;
                eml.Subject = subject;
                eml.PlainTextBody = model.Message;

                _emailMessenger.SendMail(eml);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}