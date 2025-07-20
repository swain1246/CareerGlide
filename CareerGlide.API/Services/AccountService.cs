using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class AccountService
    {
        private readonly GenericRepository _genericRepository;

        public AccountService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        public async Task<ApiResponse<string>> StudentRegister(StudentRegisterEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserType", SqlDbType.Int) { Value = entity.UserType },
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                    new SqlParameter("@FirstName", SqlDbType.Text) { Value = entity.FirstName },
                    new SqlParameter("@lastName", SqlDbType.Text) { Value = entity.LastName },
                    new SqlParameter("@Dob", SqlDbType.Date) { Value = entity.DateOfBirth },
                    new SqlParameter("@Gender", SqlDbType.Text) { Value = entity.Gender },
                    new SqlParameter("@College", SqlDbType.Text) { Value = entity.College },
                    new SqlParameter("@Degree", SqlDbType.Text) { Value = entity.Degree },
                    new SqlParameter("@YearOfPassing", SqlDbType.Int) { Value = entity.YearOfPassinf },
                };

                var result = await _genericRepository.GetAsync<dynamic>("UserRegistration", parameters);
                if (result.StatusCode == -1)
                {
                    return new ApiResponse<string>(null, result.Message, false);
                }
                else if (result.StatusCode == 1)
                {
                    return new ApiResponse<string>(null, "User Created Successfully", true);
                }
                else
                {
                    return new ApiResponse<string>(null, "User Creation Failed", false);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error registering student: {ex.Message}", false);
            }
        }
    }
}
