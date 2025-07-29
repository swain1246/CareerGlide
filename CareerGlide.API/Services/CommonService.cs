using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class CommonService
    {
        private readonly GenericRepository _genericRepository;

        public CommonService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// BindTechnicalStacks
        /// </summary>
        /// 

        public async Task<ApiResponse<IEnumerable<BindTechnicalStacks>>> BindTechnicalStacks(string MentorshipType)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@MentorshipType", SqlDbType.Text) { Value = MentorshipType }
                };

                var result = await _genericRepository.GetAllAsync<BindTechnicalStacks>("BindTechnicalStacks",parameters);
                if (result != null)
                {
                    return new ApiResponse<IEnumerable<BindTechnicalStacks>>(result, "Technical stacks bound successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<IEnumerable<BindTechnicalStacks>>(null, "No technical stacks found for the given mentorship type.", false, 404);
                }
            }   
            catch (Exception ex)
            {
                return new ApiResponse<IEnumerable<BindTechnicalStacks>>(null, $"Error while binding technical stacks: {ex.Message}", false, 500);
            }
        }


    }
}
