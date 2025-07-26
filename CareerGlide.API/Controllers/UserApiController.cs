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
    [Authorize]
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

        [HttpPost("UpdateUserProfileImage")]
        public async Task<IActionResult> UpdateUserProfileImage( string ProfileImageUrl)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _userService.UpdateUserProfileImage(userId, ProfileImageUrl);
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

            var response = await _userService.CountStudentProfileView(userId,StudentId);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

    }
}
