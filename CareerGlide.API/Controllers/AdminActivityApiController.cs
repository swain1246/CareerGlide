using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminActivityApiController : ControllerBase
    {
        private readonly AdminActivityService _adminActivityService;

        public AdminActivityApiController(AdminActivityService adminActivityService)
        {
            this._adminActivityService = adminActivityService;
        }

        ///<summary>
        ///Get users list
        ///</summary>
        ///

        [HttpGet("GetUsersList")]
        public async Task<IActionResult> GetUsersList([FromQuery] PaginationEntity entity)
        {
            var response = await _adminActivityService.GetUserList(entity);

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
