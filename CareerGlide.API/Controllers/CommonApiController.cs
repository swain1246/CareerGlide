using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CareerGlide.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonApiController : ControllerBase
    {
        private readonly CommonService _commonService;
        public CommonApiController(CommonService commonService)
        {
            this._commonService = commonService;
        }
        /// <summary>
        /// Bind Technical Stacks
        /// </summary>
        /// 
        [HttpGet("BindTechnicalStacks")]
        public async Task<IActionResult> BindTechnicalStacks(string MentorshipType)
        {
            var response = await _commonService.BindTechnicalStacks(MentorshipType);
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
