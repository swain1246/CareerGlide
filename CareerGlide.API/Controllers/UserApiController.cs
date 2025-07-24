using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public async Task<IActionResult> UpdateUserProfileImage(int UserId, string ProfileImageUrl)
        {
            if (UserId <= 0 || string.IsNullOrEmpty(ProfileImageUrl))
            {
                return BadRequest("Invalid user ID or profile image URL.");
            }
            var response = await _userService.UpdateUserProfileImage(UserId, ProfileImageUrl);
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

        [HttpDelete("DeleteUserProfileImage/{UserId}")]
        public async Task<IActionResult> DeleteUserProfileImage(int UserId)
        {
            if (UserId <= 0)
            {
                return BadRequest("Invalid user ID.");
            }
            var response = await _userService.DeleteUserProfileImage(UserId);
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

    }
}
