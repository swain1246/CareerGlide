using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/mentor")]
    [ApiController]
    public class MentorActivityApiController : ControllerBase
    {
        private readonly MentorActivityService _mentorActivityService;

        public MentorActivityApiController(MentorActivityService mentorActivityService)
        {
            this._mentorActivityService = mentorActivityService;
        }

        /// <summary>
        /// Send Invitation
        /// </summary>
        /// 

        [HttpPost("SendInvitation")]
        public async Task<IActionResult> SendInvitation([FromBody] MentorInvitationEntity entity)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _mentorActivityService.SendInvitation(userId, entity);
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
        /// Active and inactive Invitations
        /// </summary>
        /// 

        [HttpPost("ActiveInactiveInvitation")]
        public async Task<IActionResult> ChangeInvitationStatus(int InvitationId, bool isActive)
        {
            var response = await _mentorActivityService.ChangeInvitationStatus(InvitationId, isActive);
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
