using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/company")]
    [ApiController]
    public class CompanyActivityApiController : ControllerBase
    {
        private readonly CompanyActivityService _companyActivityService;

        public CompanyActivityApiController(CompanyActivityService companyActivityService)
        {
            this._companyActivityService = companyActivityService;
        }

        /// <summary>
        /// Add or Update Job Post
        /// </summary>
        /// 

        [HttpPost("AddUpdateJobPost")]
        public async Task<IActionResult> AddUpdateJobPost([FromBody] JobPostEntity entity)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _companyActivityService.AddUpdateJobPost(userId, entity);
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
