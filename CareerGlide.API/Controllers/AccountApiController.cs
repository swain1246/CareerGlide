using System.ComponentModel.DataAnnotations;
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
    [Route("api/auth")]
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
                    var mailResponse = await _accountService.SendOTPVerifyMail(entity.Email);


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

        [HttpPost("CompanyRegistration")]

        public async Task<IActionResult> CompanyRegistration([FromBody] CompanyRegistationEntity entity)
        {
            if (entity == null)
            {
                return BadRequest(new { Message = "Invalid registration data." });
            }
            try
            {
                var response = await _accountService.CompanyRegister(entity);
                if (response.Success)
                {
                    var mailResponse = await _accountService.SendOTPVerifyMail(entity.LoginEmail);

                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error registering Company: {ex.Message}" });
            }
        }


        [HttpPost("MentorRegistration")]

        public async Task<IActionResult> MentorRegistration([FromBody] MentorRegisterEntity entity)
        {
            if (entity == null)
            {
                return BadRequest(new { Message = "Invalid registration data." });
            }
            try
            {
                var response = await _accountService.MentorRegister(entity);
                if (response.Success)
                {
                    var mailResponse = await _accountService.SendOTPVerifyMail(entity.Email);

                    return Ok(response);
                }
                else
                {
                    return BadRequest(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error registering Company: {ex.Message}" });
            }
        }


        [HttpPost("ResendOTP")]
        public async Task<IActionResult> ReSendOTP([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")]
                                           string Email)
        {
            //if (!ModelState.IsValid)
            //{
            //    var errors = ModelState
            //        .Where(kvp => kvp.Value.Errors.Count > 0)
            //        .ToDictionary(
            //            kvp => kvp.Key,
            //            kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
            //        );

            //    return BadRequest(new ApiResponse<object>(errors, "Validation Failed", false));
            //}
            var responce = await _accountService.SendOTPVerifyMail(Email);
            if (responce.Success)
            {
                return Ok(new ApiResponse<string>(null,"Email Send Successfully",true));
            }
            return Ok(new ApiResponse<string>(null, "Error while sending mail", false));
        }




        [HttpPost("VerifyRegisterOTP")]
        public async Task<IActionResult> VerifyRegisterOTP([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")]
                                           string Email, [FromQuery, Required(ErrorMessage = "OTP is required.")] int OTP)
        {

            var Response = await _accountService.VerifyRegisterMail(Email, OTP);

                return Ok(Response);
        }



        [HttpPost("Login")]
        public async Task<IActionResult> CheckLogin([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")]
                                           string Email, [FromQuery, Required(ErrorMessage = "Password is required.")] string Password)
        {

            // Validate Password
            var passwordErrors = ValidationHelper.ValidatePassword(Password).ToList();
            if (passwordErrors.Any())
            {
                // Combine all password validation errors into a single message
                var combinedErrors = string.Join(" | ", passwordErrors.Select(e => e.ErrorMessage));
                return BadRequest(new ApiResponse<string>(null, combinedErrors, false));
            }

            var response = await _accountService.CheckLogin(Email,Password);
            if (response.Success)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]); // Use a strong secret key

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, Convert.ToString(Email)) }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                response.Data.UserToken = tokenString;
                if (response.Data.StatusCode == 200)
                {
                    return Ok(response.Data);
                }
                else
                {
                    UnAuthLogin ErResult = new UnAuthLogin
                    {
                        StatusCode = response.Data.StatusCode,
                        Message = response.Data.Message
                    };
                    return Ok(ErResult);
                }
            }
            return Unauthorized(new ApiResponse<LoginEntity>
            {
                Success = false,
                Message = response.Message,
                Data = null
            });

        }

        //----------------
        // Send Forgot Password Mail API
        //----------------

        [HttpPost("SendForgotPasswordMail")]
        public async Task<IActionResult> SendForgotPasswordMail([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")] string Email)
        {
            if (string.IsNullOrEmpty(Email))
            {
                return BadRequest(new { Message = "Email is required." });
            }
            try
            {
                var response = await _accountService.SendForgotPassOTPVerifyMail(Email);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error sending forgot password mail: {ex.Message}" });
            }
        }

        //----------------
        // Verify Forgot Password OTP
        //----------------

        [HttpPost("VerifyForgotPasswordOTP")]

        public async Task<IActionResult> VerifyForgotPasswordOTP([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")] string Email, int OTP)
        {
            if (string.IsNullOrEmpty(Email) || OTP <= 0)
            {
                return BadRequest(new { Message = "Invalid email or OTP." });
            }
            try
            {
                var response = await _accountService.VerifyForgotPasswordOTP(Email, OTP);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error verifying forgot password OTP: {ex.Message}" });
            }
        }

        //---------------
        // Reset Password
        //---------------

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromQuery, Required(ErrorMessage = "Email is required.")]
                                           [EmailAddress(ErrorMessage = "Invalid email format.")] string Email,
                                            [FromQuery, Required(ErrorMessage = "Password is required.")] string NewPassword)
        {
            var passwordErrors = ValidationHelper.ValidatePassword(NewPassword).ToList();
            if (passwordErrors.Any())
            {
                // Combine all password validation errors into a single message
                var combinedErrors = string.Join(" | ", passwordErrors.Select(e => e.ErrorMessage));
                return BadRequest(new ApiResponse<string>(null, combinedErrors, false));
            }
            try
            {
                var response = await _accountService.ResetPassword(Email, NewPassword);
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
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error resetting password: {ex.Message}" });
            }
        }
    }
}
