using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class MentorActivityService
    {
        private readonly GenericRepository _genericRepository;

        public MentorActivityService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// Send Invitation
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> SendInvitation(int UserId, MentorInvitationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@StudentId", SqlDbType.Int) { Value = entity.StudentId },
                    new SqlParameter("@ProjectTitle", SqlDbType.Text) { Value = entity.ProjectTitle }, 
                    new SqlParameter("@Description", SqlDbType.Text) { Value = entity.Description }, 
                    new SqlParameter("@MessageFromMentor", SqlDbType.Text) { Value = entity.Notes }, 
                };
                var result = await _genericRepository.GetAsync<dynamic>("SendInvitations", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Invitation sent successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to send invitation.", false, 400);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while sending notification: {ex.Message}", false, 500);
            }
        }

        /// <summary>
        /// Active and inactive Invitations
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> ChangeInvitationStatus( int InvitationId, bool isActive)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@InvitationId", SqlDbType.Int) { Value = InvitationId },
                    new SqlParameter("@IsActive", SqlDbType.Bit) { Value = isActive }
                };
                var result = await _genericRepository.GetAsync<dynamic>("ActiveInActiveInvitations", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Invitation status updated successfully.", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to update invitation status.", false, 400);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while changing invitation status: {ex.Message}", false, 500);
            }
        }
    }
}
