using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Dapper.SqlMapper;

namespace CareerGlide.API.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentProfileApiController : ControllerBase
    {
        private readonly StudentProfileService _studentProfileService;

        public StudentProfileApiController(StudentProfileService studentProfileService)
        {
            this._studentProfileService = studentProfileService;
        }

        /// <summary>
        ///  Get Student Profile Details
        /// </summary>
        /// 

        [HttpGet("GetStudentProfileDetails")]
        public async Task<IActionResult> GetStudentProfileDetails()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _studentProfileService.GetStudentProfileDetails(userId);
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
        ///  Update Student Hero Section
        /// </summary>
        /// 

        [HttpPost("UpdateStudentProfileHero")]
        public async Task<IActionResult> UpdateStudentProfileHero([FromBody] StudentProfileHeroEntity entity)
        {
            if (entity == null)
            {
                return BadRequest("Invalid student hero section data.");
            }

            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.UpdateStudentProfileHero(userId,entity);
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
        /// Add Update Student Education
        /// </summary>
        /// 

        [HttpPost("AddUpdateStudentEducation")]
        public async Task<IActionResult> AddUpdateStudentEducation([FromBody] StudentEducationEntity entity)
        {
            if (entity == null)
            {
                return BadRequest("Invalid student education data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            var response = await _studentProfileService.AddEUpdateStudentEducation(userId,entity);
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
        /// Add Update student Sertification
        /// </summary>
        /// 

        [HttpPost("AddUpdateStudentCertification")]
        public async Task<IActionResult> AddUpdateStudentCertification([FromBody] StudentCertificationEntity entity)
        {
            if (entity == null)
            {
                return BadRequest("Invalid student certification data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.AddUpdateStudentCertification(userId,entity);
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
        /// Add update student Intership
        /// </summary>
        /// 

        [HttpPost("AddUpdateStudentInternship")]
        public async Task<IActionResult> AddUpdateStudentInternship([FromBody] StudentInternshipEntity entity)
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
            var response = await _studentProfileService.AddUpdateStudentIntership(userId,entity);
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
        /// Add Update student Project
        /// </summary>
        /// 

        [HttpPost("AddUpdateStudentProject")]
        public async Task<IActionResult> AddUpdateStudentProject([FromBody] StudentProjectEntity entity)
        {
            if (entity == null)
            {
                return BadRequest("Invalid student project data.");
            }
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.AddUpdateStudentProject(userId,entity);
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
        /// Update Student Profile Skills
        /// </summary>
        /// 

        [HttpPost("UpdateStudentProfileSkills")]
        public async Task<IActionResult> UpdateStudentProfileSkills( string Skills)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.UpdateStudentProfileSkills(userId, Skills);
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
        /// Update Resume Path
        /// </summary>
        /// 

        [HttpPost("UpdateStudentResume")]
        public async Task<IActionResult> UpdateStudentResume( string ResumePath)
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.UpdateStudentResume(userId, ResumePath);
            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }


        #region
        /// <summary>
        /// Delete student education
        /// </summary>
        /// 

        [HttpDelete("DeleteStudentEducation/{id}")]
        public async Task<IActionResult> DeleteStudentEducation(int id)
        {
            var response = await _studentProfileService.DeleteStudentEducation(id);
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
        /// Delete Student Certification
        /// </summary>
        /// 

        [HttpDelete("DeleteStudentCertification/{id}")]
        public async Task<IActionResult> DeleteStudentCertification(int id)
        {
            var response = await _studentProfileService.DeleteStudentCertification(id);
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
        /// Delete Student Internship
        /// </summary>
        /// 

        [HttpDelete("DeleteStudentInternship/{id}")]
        public async Task<IActionResult> DeleteStudentInternship(int id)
        {
            var response = await _studentProfileService.DeleteStudentInternship(id);
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
        /// Delete Student Project
        /// </summary>
        /// 

        [HttpDelete("DeleteStudentProject/{id}")]
        public async Task<IActionResult> DeleteStudentProject(int id)
        {
            var response = await _studentProfileService.DeleteStudentProject(id);
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
        /// Delete Student Resumr
        /// </summary>
        /// 

        [HttpDelete("DeleteStudentResume")]
        public async Task<IActionResult> DeleteStudentResume()
        {
            var userIdClaim = User.FindFirst("userId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }
            var response = await _studentProfileService.DeleteStudentResume(userId);
            if (response.Success)
            {
                return Ok(response);
            }
            else
            {
                return StatusCode(response.StatusCode, response.Message);
            }
        }
        #endregion
    }
}
