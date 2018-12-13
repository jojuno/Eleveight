using SocialMediaApp132.Models.Domain.Common;
using SocialMediaApp132.Models.Requests.Common;
using System.Collections.Generic;

namespace SocialMediaApp132.Services.Common
{
    public interface IAddressTypeService
    {
        List<AddressType> ReadAll();

        AddressType ReadById(int id);

        int Insert(AddressTypeAddRequest model);

        void Update(AddressTypeUpdateRequest model);

        void DeleteById(int id);
    }
}
