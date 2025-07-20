using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountApiController(AccountService accountService)
        {
            this._accountService = accountService;
        }

        [HttpPost("StudentRegister")]
        public async Task<IActionResult> StudentRegister([FromBody] StudentRegisterEntity entity)
        {
            if (entity == null)
            {
                return BadRequest(new { Message = "Invalid registration data." });
            }
            try
            {
                var response = await _accountService.StudentRegister(entity);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error registering student: {ex.Message}" });
            }
        }
    }
}
