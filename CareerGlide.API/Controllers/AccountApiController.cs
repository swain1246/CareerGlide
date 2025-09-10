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
        private readonly IHostEnvironment _env;

        public AccountApiController(AccountService accountService, IConfiguration configuration, IHostEnvironment env)
        {
            this._accountService = accountService;
            this._configuration = configuration;
            _env = env;
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

                    var postResponce = new PostRegistrationSendentity
                    {
                        Email = response.Data.Email
                    };


                    return Ok(new ApiResponse<PostRegistrationSendentity>
                    {
                        Success = true,
                        Data = postResponce,
                        Message = "Email Send Successfully",
                        StatusCode = 200
                    });
                }

                return BadRequest(new ApiResponse<string>
                {
                    Success= false,
                    StatusCode = response.StatusCode,
                    Message = response.Message,
                    Data = null
                });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error registering student: {ex.Message}" });
            }
        }

        [HttpPost("CompanyRegister")]

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

                    var postResponce = new PostRegistrationSendentity
                    {
                        Email = response.Data.Email
                    };


                    return Ok(new ApiResponse<PostRegistrationSendentity>
                    {
                        Success = true,
                        Data = postResponce,
                        Message = "Email Send Successfully",
                        StatusCode = 200
                    });
                }
                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    StatusCode = response.StatusCode,
                    Message = response.Message,
                    Data = null
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Message = $"Error registering Company: {ex.Message}" });
            }
        }


        [HttpPost("MentorRegister")]

        public async Task<IActionResult> MentorRegistration([FromBody] MentorRegisterEntity entity)
        {
            if (entity == null)
            {
                return BadRequest(new { Message = "Invalid registration data." });
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var response = await _accountService.MentorRegister(entity);
                if (response.Success)
                {
                    var mailResponse = await _accountService.SendOTPVerifyMail(entity.Email);

                    var postResponce = new PostRegistrationSendentity
                    {
                        Email = response.Data.Email
                    };


                    return Ok(new ApiResponse<PostRegistrationSendentity>
                    {
                        Success = true,
                        Data = postResponce,
                        Message = "Email Send Successfully",
                        StatusCode = 200
                    });
                }
                return BadRequest(new ApiResponse<string>
                {
                    Success = false,
                    StatusCode = response.StatusCode,
                    Message = response.Message,
                    Data = null
                });
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
        public async Task<IActionResult> VerifyRegisterOTP([FromBody] VerifyOTP entity)
        {

            var Response = await _accountService.VerifyRegisterMail(entity);

                return Ok(Response);
        }



        /// Login 
        /// 

        [HttpPost("Login")]
        public async Task<IActionResult> CheckLogin([FromBody] CheckLogin entity)
        {

            var response = await _accountService.CheckLogin(entity);
            
            if(response.Data.StatusCode == 200)
            {
                // Create JWT Token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

                var claims = new[]
                {
                    new Claim("email", entity.Email),
                    new Claim("userId", response.Data.UserId.ToString()) // <-- Add userId here
                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                // Set token in HttpOnly cookie
                //var cookieOptions = new CookieOptions
                //{
                //    HttpOnly = true,
                //    Secure = true, // true if using HTTPS
                //    SameSite = SameSiteMode.None, // Important for cross-origin
                //    Expires = DateTime.UtcNow.AddMinutes(30)
                //};

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,                           // protect against JS access
                    Secure = !_env.IsDevelopment(),            // only true in production (Render uses HTTPS)
                    SameSite = _env.IsDevelopment()
                                ? SameSiteMode.Lax             // dev: works with localhost:3000 → localhost:5000
                                : SameSiteMode.None,           // prod: required for cross-site cookies
                    Expires = DateTime.UtcNow.AddDays(1)
                };



                Response.Cookies.Append("CareerGlideToken", tokenString, cookieOptions);

                response.Data.UserToken = tokenString;

                    return Ok(response);
            }



            return Unauthorized(new ApiResponse<string>
            {
                Success = false,
                StatusCode = response.Data.StatusCode,
                Message = response.Data.Message,
                Data = null,

            });

        }

        //--------------------
        // Logout User
        // -------------------

        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            // Remove the JWT token from the cookie by setting an expired cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true, // true if using HTTPS
                SameSite = SameSiteMode.None, // Same as login
                Expires = DateTime.UtcNow.AddDays(-1) // Set to past to expire it
            };

            Response.Cookies.Append("CareerGlideToken", "", cookieOptions);

            return Ok(new
            {
                StatusCode = 200,
                Message = "Logout successful"
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

        public async Task<IActionResult> VerifyForgotPasswordOTP([FromBody] VerifyOTP entity)
        {
            try
            {
                var response = await _accountService.VerifyForgotPasswordOTP(entity);
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

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ForgotPassword entity)
        {

            try
            {
                var response = await _accountService.ResetPassword(entity);
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
