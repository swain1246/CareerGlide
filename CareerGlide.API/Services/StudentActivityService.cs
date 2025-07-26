using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class StudentActivityService
    {
        private readonly GenericRepository _genericRepository;

        public StudentActivityService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }


        /// <summary>
        /// Get Student Dashboard Data
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> GetStudentDashboardData(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId }
                };
                var result = await _genericRepository.GetAsync<dynamic>("GetStudentDashBoard", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(result.JsonResult, "Student dashboard data retrieved successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "No data found for the student.", false, 404);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while retrieving student dashboard data: {ex.Message}", false, 500);
            }
        }

        /// <summary>
        /// Add Job Application
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> ApplyJob(int UserId, JobApplicationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@JobId",SqlDbType.Int){ Value = entity.JobId},
                    new SqlParameter("@StudentFullName",SqlDbType.Text){ Value = entity.FullName},
                    new SqlParameter("@StudentEmail",SqlDbType.Text){ Value = entity.Email},
                    new SqlParameter("@StudentPhoneNumber",SqlDbType.Text){ Value = entity.PhoneNumber},
                    new SqlParameter("@ResumePath",SqlDbType.Text){ Value = entity.ResumePath},
                    new SqlParameter("@CoverLetter",SqlDbType.Text){ Value = entity.CoverLetter},
                };

                var result = await _genericRepository.GetAsync<dynamic>("ApplyJobs", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Job application submitted successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to apply for the job.", false, 400);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while appliy job : {ex.Message}", false,500);
            }
        }

        /// <summary>
        /// Accept or Reject Invitation
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AcceptRejectInvitation( int InvitationId, string Status)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@InvitationId", SqlDbType.Int) { Value = InvitationId },
                    new SqlParameter("@Status", SqlDbType.Bit) { Value = Status }
                };
                var result = await _genericRepository.GetAsync<dynamic>("AcceptRejectInvitation", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Invitation response recorded successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to record invitation response.", false, 400);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while accepting/rejecting invitation: {ex.Message}", false, 500);
            }
        }

    }
}
