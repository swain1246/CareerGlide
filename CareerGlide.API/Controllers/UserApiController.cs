using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Azure;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly UserService _userService;

        public UserApiController(UserService userService)
        {
            this._userService = userService;
        }

        /// <summary>
        /// Update User Profile Image
        /// </summary>  
        /// 

        [HttpPost("UploadProfileImage")]
        public async Task<IActionResult> UploadProfileImage(IFormFile file)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest(new { Message = "No file uploaded" });
            }

            var response = await _userService.UploadProfileImage(userId, file);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }


        /// <summary>
        /// Get User Profile Image
        /// </summary>
        /// 

        [HttpGet("GetProfileImage")]
        public IActionResult GetProfileImage(string fileName)
        {
            try
            {
                // 1. Validate filename input
                if (string.IsNullOrEmpty(fileName))
                {
                    return BadRequest(new { Message = "File name is required" });
                }

                // 2. Define folder path where images are stored
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

                // 3. Clean filename (remove any starting slash)
                fileName = fileName.TrimStart('/', '\\');

                // 4. Full file path
                string filePath = Path.Combine(folderPath, fileName);

                // 5. Check if file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { Message = "Image not found" });
                }

                // 6. Determine content type (only images allowed)
                string contentType = GetContentType(filePath);

                // 7. Return the file
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, contentType, Path.GetFileName(filePath));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Error retrieving image: {ex.Message}" });
            }
        }


        /// <summary>
        /// Delete User Profile Image
        /// </summary>
        /// 

        [HttpDelete("DeleteUserProfileImage")]
        public async Task<IActionResult> DeleteUserProfileImage()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _userService.DeleteUserProfileImage(userId);
            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }



        [HttpGet("read-token")]
        public IActionResult GetTokenFromCookie()
        {
            var email = User.FindFirst("email")?.Value;
            var userId = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(email))
                return Unauthorized("Email not found in token.");

            return Ok(new { Email = email, UserId = userId });
        }

        /// <summary>
        /// Delete User Account
        /// </summary>
        /// 

        [HttpDelete("DeleteAccount")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            try
            {
                var response = await _userService.DeleteUserAccount(userId);
                if (response.Success)
                {
                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error deleting account: {ex.Message}" });
            }
        }


        /// <summary>
        /// Count student profile view
        /// </summary>
        /// 

        [HttpPost("CountStudentProfileView")]
        public async Task<IActionResult> CountStudentProfileView(int StudentId)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _userService.CountStudentProfileView(userId, StudentId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        /// <summary>
        /// Get User Details
        /// </summary>
        /// 
        [HttpGet("GetUserDetails/{UserId}")]
        public async Task<IActionResult> GetUserDetails(int UserId)
        {
            var responce = await _userService.GetUserDetails(UserId);

            return Ok(responce);
        }




        // Helper to get content type
        private string GetContentType(string filePath)
        {
            var ext = Path.GetExtension(filePath).ToLowerInvariant();
            return ext switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".webp" => "image/webp",
                _ => "application/octet-stream" // fallback (but ideally block unsupported files)
            };
        }
    }
}
