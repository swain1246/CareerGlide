using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserApiController : ControllerBase
    {
        private readonly UserService _userService;

        public UserApiController(UserService userService)
        {
            this._userService = userService;
        }

        [HttpGet("GetUsersData")]
        public async Task<IActionResult> GetUsersData()
        {
            try
            {
                var response = await _userService.GetUsersData();
                if (response.Success)
                {
                    return Ok(response);
                }
                else
                {
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error retrieving users: {ex.Message}" });
            }
        }
    }
}
