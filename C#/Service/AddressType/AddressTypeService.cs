using Eleveight.Models.Domain.Common;
using Eleveight.Models.Requests.Common;
using Eleveight.Services.Tools;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Eleveight.Services.Common
{
    public class AddressTypeService : BaseService, IAddressTypeService
    {
        public List<AddressType> ReadAll()
        {
            List<AddressType> list = new List<AddressType>();
            DataProvider.ExecuteCmd("dbo.AddressType_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    list.Add(DataMapper<AddressType>.Instance.MapToObject(reader));
                }
                );
            return list;
        }

        public AddressType ReadById(int id)
        {
            AddressType addressType = new AddressType();
            DataProvider.ExecuteCmd("dbo.AddressType_SelectById",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", id);
                },
                singleRecordMapper: (IDataReader reader, short resultSet) =>
                {
                    addressType = DataMapper<AddressType>.Instance.MapToObject(reader);
                });
            return addressType;
        }

        public int Insert(AddressTypeAddRequest model)
        {
            int returnValue = 0;

            DataProvider.ExecuteNonQuery("dbo.AddressType_Insert",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@TypeName", model.TypeName);
                    inputs.AddWithValue("@TypeDescription", model.TypeDescription);
                    SqlParameter idOut = new SqlParameter("@Id", 0);
                    idOut.Direction = ParameterDirection.Output;

                    inputs.Add(idOut);
                },
                returnParameters: (SqlParameterCollection inputs) =>
                {
                    int.TryParse(inputs["@Id"].Value.ToString(), out returnValue);
                });
            return returnValue;
        }

        public void Update(AddressTypeUpdateRequest model)
        {
            DataProvider.ExecuteNonQuery("dbo.AddressType_Update",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@TypeName", model.TypeName);
                    inputs.AddWithValue("@TypeDescription", model.TypeDescription);
                    inputs.AddWithValue("@Id", model.Id);
                }
            );
        }

        public void DeleteById(int id)
        {
            DataProvider.ExecuteNonQuery("dbo.AddressType_Delete",
                inputParamMapper: (SqlParameterCollection inputs) =>
                {
                    inputs.AddWithValue("@Id", id);
                });
        }
    }
}