using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class CompanyActivityService
    {
        private readonly GenericRepository _genericRepository;

        public CompanyActivityService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// Add Update Job Post
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AddUpdateJobPost(int UserId,JobPostEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@JobId", SqlDbType.Int) { Value = entity.JobId },
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@Title", SqlDbType.Text) { Value = entity.Title },
                    new SqlParameter("@Description", SqlDbType.Text) { Value = entity.Description },
                    new SqlParameter("@Requirments", SqlDbType.Text) { Value = entity.Requirments },
                    new SqlParameter("@Type", SqlDbType.Text) { Value = entity.Type },
                    new SqlParameter("@Location", SqlDbType.Text) { Value = entity.Location },
                    new SqlParameter("@Mode", SqlDbType.Text) { Value = entity.Mode },
                    new SqlParameter("@ExperienceLevel", SqlDbType.Text) { Value = entity.ExperienceLevel },
                    new SqlParameter("@SkillsRequired", SqlDbType.Text) { Value = entity.SkillsRequired },
                    new SqlParameter("@StipendOrSalary", SqlDbType.Text) { Value = (object)entity.StipendOrSalary ?? DBNull.Value },
                    new SqlParameter("@ApplyDeadline", SqlDbType.Date) { Value = (object)entity.ApplyDeadline ?? DBNull.Value },
                    new SqlParameter("@VacancyCount", SqlDbType.Int) { Value = entity.VacancyCount ?? (object)DBNull.Value }
                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateJobPost", parameters);

                if (result.IsSuccess == 1 && entity.JobId <= 0)
                {
                    return new ApiResponse<string>(null, "Job post added successfully.", true, 200);
                }
                else if (result.IsSuccess == 1 && entity.JobId > 0)
                {
                    return new ApiResponse<string>(null, "Job post updated successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to add/update job post.", false, 400);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while adding/updating job post: {ex.Message}", false, 500);
            }
        }
    }
}
