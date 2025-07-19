using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Dapper;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class UserService
    {
        private readonly GenericRepository _genericRepository;

        public UserService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        public async Task<ApiResponse<IEnumerable<UserEntity>>> GetUsersData()
        {
            try
            {
                var result = await _genericRepository.GetAllAsync<UserEntity>("GetUserList");

                if (result == null || !result.Any())
                {
                    return new ApiResponse<IEnumerable<UserEntity>>(null, "No users found.", false);
                }
                else
                {
                    return new ApiResponse<IEnumerable<UserEntity>>(result, "Users retrieved successfully.");
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<UserEntity>>(null, $"Error retrieving users: {ex.Message}", false);
            }
        }
    }
}
