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

        public async Task<ApiResponse<string>> UploadProfileImage(int userId, IFormFile file)
        {
            try
            {
                // folder where profile images will be stored
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "profileImages");

                if (!Directory.Exists(uploadPath))
                    Directory.CreateDirectory(uploadPath);

                // Check if a previous file exists for this user (search by UserId.*)
                var existingFile = Directory.GetFiles(uploadPath, $"{userId}_*").FirstOrDefault();
                if (existingFile != null)
                {
                    File.Delete(existingFile); // delete old profile image
                }

                // Create unique filename -> userId_timestamp.extension
                var fileExtension = Path.GetExtension(file.FileName);
                var fileName = $"{userId}_{DateTime.Now.Ticks}{fileExtension}";
                var filePath = Path.Combine(uploadPath, fileName);

                // Save new file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Save relative path to DB (not physical path)
                var relativePath = $"/uploads/profileImages/{fileName}";

                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
                    new SqlParameter("@ProfileImageUrl", SqlDbType.NVarChar, 500) { Value = relativePath }
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateUserProfilePicture", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Profile image uploaded successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to Update User Profile Image", false, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while uploading profile image: {ex.Message}", false, 500);
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
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "profileImages");

                if (Directory.Exists(uploadPath))
                {
                    var existingFile = Directory.GetFiles(uploadPath, $"{UserId}_*").FirstOrDefault();
                    if (existingFile != null)
                    {
                        File.Delete(existingFile); // delete old profile image
                    }
                }

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

        ///<summary>
        ///Change Password
        ///</summary>
        ///

        public async Task<ApiResponse<string>> ChangePassword(int UserId, ChangePasswordEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]{
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@CurrentPassword", SqlDbType.Text) { Value = entity.CurrentPassword },
                    new SqlParameter("@NewPassword", SqlDbType.Text) { Value = entity.NewPassword },
                };

                var result = await _genericRepository.GetAsync<dynamic>("ChangePassword", parameters);

                if(result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, result.Message, true, 200);
                }
                else if (result.IsSuccess == -1)
                {
                    return new ApiResponse<string>(null, result.Message, false, 400);
                }
                return new ApiResponse<string>(null, "Failed to change the password", false, 400);

            }
            catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error While change password : {ex.Message}", false, 500);
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

        public async Task<ApiResponse<UserDetailsEntity>> GetUserDetails(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                };

                var result = await _genericRepository.GetAsync<UserDetailsEntity>("GetUserDetails", parameters);

                if (result != null)
                {
                    return new ApiResponse<UserDetailsEntity>(result, "User Details Retrived Successfully",true,200);
                }

                return new ApiResponse<UserDetailsEntity>(null, "Failed to getting user Details", false, 400);
            }catch(Exception ex)
            {
                return new ApiResponse<UserDetailsEntity>(null, $"Error while Getting the user Details: {ex.Message}", false, 500);
            }
        }
    }
}
