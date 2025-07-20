using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CareerGlide.API.Entity;
using CareerGlide.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CareerGlide.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountApiController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly IConfiguration _configuration;

        public AccountApiController(AccountService accountService, IConfiguration configuration)
        {
            this._accountService = accountService;
            this._configuration = configuration;
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

        [HttpPost("CheckLogin")]
        public async Task<IActionResult> CheckLogin([FromBody] LoginEntity entity)
        {
            if (entity == null)
            {
                return BadRequest(new { Message = "Invalid login data." });
            }
            
            var response = await _accountService.CheckLogin(entity);
            if (response.Success)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]); // Use a strong secret key

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, Convert.ToString(entity.Email)) }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                response.Data.UserToken = tokenString;
                return Ok(response);
            }
            return Unauthorized(new ApiResponse<LoginEntity>
            {
                Success = false,
                Message = response.Message,
                Data = null
            });

        }
    }
}
