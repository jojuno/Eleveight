using Eleveight.Models.Domain.Common;
using Eleveight.Models.Requests.Common;
using System.Collections.Generic;

namespace Eleveight.Services.Common
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