using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class MentorProfileService
    {
        private readonly GenericRepository _genericRepository;

        public MentorProfileService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// Update Mentor Profile Hero
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateMentorProfileHero(int UserId, MentorProfileHero Entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId",SqlDbType.Int){Value=UserId},
                    new SqlParameter("@FirstName",SqlDbType.Text){Value=Entity.FirstName},
                    new SqlParameter("@LastName",SqlDbType.Text){Value=Entity.LastName},
                    new SqlParameter("@Email",SqlDbType.Text){Value=Entity.Email},
                    new SqlParameter("@PhoneNo",SqlDbType.Text){Value=Entity.PhoneNo},
                    new SqlParameter("@Gender",SqlDbType.Text){Value=Entity.Gender},
                    new SqlParameter("@DateOfBirth",SqlDbType.Date){Value=Entity.DateOfBirth},
                    new SqlParameter("@Designation",SqlDbType.Text){Value=Entity.Designation},
                    new SqlParameter("@CompanyName",SqlDbType.Text){Value=Entity.CompanyName},
                    new SqlParameter("@ExperienceYears",SqlDbType.Int){Value=Entity.ExperienceYears},
                    new SqlParameter("@bio",SqlDbType.Text){Value=Entity.bio},
                    new SqlParameter("@CurrentLocation",SqlDbType.Text){Value=Entity.CurrentLocation},
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateMentorProfileHero", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Mentor Profile Hero updated successful", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to update mentor profile hero", false, 400);

            }catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while updating mentor profile hero : {ex.Message}", false, 500);
            }
        }
    }
}
