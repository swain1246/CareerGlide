using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentActivityApiController : ControllerBase
    {
        private readonly StudentActivityService _studentActivityService;

        public StudentActivityApiController(StudentActivityService studentActivityService)
        {
            this._studentActivityService = studentActivityService;
        }

        /// <summary>
        /// Get Student Dashboard Data
        /// </summary>
        /// 

        [HttpGet("GetStudentDashboardData")]
        public async Task<IActionResult> GetStudentDashboardData()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentActivityService.GetStudentDashboardData(userId);
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
        /// Apply Job
        /// </summary>
        /// 

        [HttpPost("ApplyJob")]
        public async Task<IActionResult> ApplyJob([FromBody] JobApplicationEntity entity)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentActivityService.ApplyJob(userId, entity);
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
        /// Accept or Reject Invitation.
        /// </summary>
        /// 

        [HttpPost("AcceptRejectInvitation")]
        public async Task<IActionResult> AcceptRejectInvitation(int InvitationId, string Status)
        {
            var response = await _studentActivityService.AcceptRejectInvitation(InvitationId, Status);
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
        /// ViewMentorProfile
        /// </summary>
        /// 

        [HttpGet("ViewMentorProfile")]
        public async Task<IActionResult> ViewMentorProfile(int MentorId)
        {
            var response = await _studentActivityService.ViewMentorProfile(MentorId);
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
        /// AddUpdateMentershipRequest
        ///  </summary>
        ///

        [HttpPost("AddUpdateMentorshipRequest")]
        public async Task<IActionResult> AddUpdateMentorshipRequest([FromBody] AddUpdateMentershipRequest entity)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentActivityService.AddUpdateMentershipRequest(userId, entity);
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
        /// Get Mentors Invitations
        /// </summary>
        /// 

        [HttpGet("GetMentorsInvitations")]
        public async Task<IActionResult> GetMentorsInvitations()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentActivityService.GetMentorInvitations(userId);
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
        /// Get Mentership Request
        /// </summary>
        /// 

        [HttpGet("GetMentorshipRequest")]
        public async Task<IActionResult> GetMentorshipRequest()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentActivityService.GetMentorshipRequest(userId);
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
