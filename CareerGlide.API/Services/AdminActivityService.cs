using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class AdminActivityService
    {
        private readonly GenericRepository _genericRepository;

        public AdminActivityService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        ///<summary>
        ///Get User List
        ///</summary>
        ///

        public async Task<ApiResponse<IEnumerable<UserListEntity>>> GetUserList(PaginationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@PageNumber",SqlDbType.Int){Value=entity.PageNumber},
                    new SqlParameter("@PageSize",SqlDbType.Int){Value=entity.PageSize},
                    new SqlParameter("@UserType",SqlDbType.Int){Value=entity.UserType},
                };

                var result = await _genericRepository.GetAllAsync<UserListEntity>("GetUserList", parameters);

                if(result != null)
                {
                    return new ApiResponse<IEnumerable<UserListEntity>>(result, "User list retrive successfully", true, 200);
                }

                return new ApiResponse<IEnumerable<UserListEntity>>(null, "Failed to retrive users list", false, 400);

            }catch(Exception ex)
            {
                return new ApiResponse<IEnumerable<UserListEntity>>(null, $"Error while geting the user list :{ex.Message}", false, 500);
            }
        }
        
    }
}
