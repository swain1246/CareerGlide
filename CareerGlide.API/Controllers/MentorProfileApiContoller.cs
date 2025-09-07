using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Dapper.SqlMapper;

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
        ///  Get Mentor Profile Details
        /// </summary>
        /// 

        [HttpGet("GetMentorProfileDetails")]
        public async Task<IActionResult> GetMentorProfileDetails()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _mentorProfileService.GetMentorProfileDetails(userId);
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

        /// <summary>
        /// Update mentor skills
        /// </summary>
        /// 

        [HttpPost("UpdateMentorSkills")]

        public async Task<IActionResult> UpdateMentorSkills(string Skills)
        {
            if (Skills == null)
            {
                return BadRequest("Invalid student internship data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _mentorProfileService.UpdateMentorSkills(userId, Skills);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        ///<summary>
        ///Add Update mentor education
        ///</summary>
        ///

        [HttpPost("AddUpdateMentorEducation")]
        public async Task<IActionResult> AddUpdateMentorEducation(MentorEducationModel entity)
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

            var response = await _mentorProfileService.AddUpdateMentorEducation(userId, entity);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        ///<summary>
        ///Add Update mentor perfessional details
        ///</summary>
        ///

        [HttpPost("AddUpdateMentorPerfessionalDetails")]
        public async Task<IActionResult> AddUpdateMentorPerfessionalDetails(MentorProfessionEntity entity)
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

            var response = await _mentorProfileService.AddUpdateMentorPerfessionalDetails(userId, entity);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        ///<summary>
        ///Active Inactive MentorTypes
        ///</summary>
        ///

        [HttpPost("ActiveInactiveMentorTypes")]
        public async Task<IActionResult> ActiveInactiveMentorTypes(int Id, byte IsActive)
        {
            if (Id == null || IsActive == null)
            {
                return BadRequest("Invalid student internship data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _mentorProfileService.ActiveInactiveMentorTypes(Id, userId, IsActive);

            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }

        ///<summary>
        ///add update mentor types
        ///</summary>
        ///

        [HttpPost("AddUpdateMentorTypes")]

        public async Task<IActionResult> AddUpdateMentorTypes(MentorTypesEntity entity)
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

            var response = await _mentorProfileService.AddUpdateMentorTypes(userId, entity);

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
        /// Delete mentor education
        /// </summary>
        /// 

        [HttpDelete("DeleteMentorEducation/{id}")]
        public async Task<IActionResult> DeleteMentorEducation(int id)
        {
            var response = await _mentorProfileService.DeleteMentorEducation(id);
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
        /// Delete mentor perfessional details
        /// </summary>
        /// 

        [HttpDelete("DeleteMentorPerfessionalDetail/{id}")]
        public async Task<IActionResult> DeleteMentorPerfessionalDetail(int id)
        {
            var response = await _mentorProfileService.DeleteMentorPerfessionalDetails(id);
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
