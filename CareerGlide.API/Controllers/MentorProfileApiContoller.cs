using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/mentor")]
    [ApiController]
    public class MentorProfileApiContoller : ControllerBase
    {
        private readonly MentorProfileService _mentorProfileService;

        public MentorProfileApiContoller(MentorProfileService mentorProfileService)
        {
            this._mentorProfileService = mentorProfileService;
        }

        /// <summary>
        /// Update mentor profile hero
        /// </summary>
        /// 

        [HttpPost("UpdateMentorProfileHero")]
        public async Task<IActionResult> UpdateMentorProfileHero([FromBody] MentorProfileHero entity)
        {
            if (entity == null)
            {
                return BadRequest("Invalid student internship data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _mentorProfileService.UpdateMentorProfileHero(userId, entity);
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
