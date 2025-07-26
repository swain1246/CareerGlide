using System.Data;
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

        /// <summary>
        /// Update User Profile Image
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateUserProfileImage(int UserId, string ProfileImageUrl)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int){Value = UserId },
                    new SqlParameter("@ProfileImageUrl", SqlDbType.Text){Value = ProfileImageUrl }
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateUserProfilePicture", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Profile image updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to Update User Profile Image",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = "An error occurred while updating the profile image: " + ex.Message,
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Delete User Profile Image
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteUserProfileImage(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int){Value = UserId }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteUserProfilePicture", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Profile image deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete user profile image.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = "An error occurred while deleting the profile image: " + ex.Message,
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Delete User Account
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteUserAccount(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteAllTypeUsers", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "User Account Deleted Successfully", true);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed to delete user account", false, 404);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error deleting user account: {ex.Message}", false, 500);
            }
        }

        /// <summary>
        /// Count Student Profile View
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> CountStudentProfileView(int UserId, int StudentId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@StudentId", SqlDbType.Int) { Value = StudentId },
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateStudentProfileViewCounts", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Student profile view counted", true, 200);
                }
                else
                {
                    return new ApiResponse<string>(null, "Failed ti count the student profile view count", false, 400);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while Count the Student Profile View : {ex.Message}", false, 500);
            }
        }
    }
}
