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
    }
}
