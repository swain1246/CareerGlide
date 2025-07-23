using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class AccountService
    {
        private readonly GenericRepository _genericRepository;
        private readonly SendEmailAPIService _sendEmailAPIService;

        public AccountService(GenericRepository genericRepository, SendEmailAPIService sendEmailAPIService)
        {
            this._genericRepository = genericRepository;
            this._sendEmailAPIService = sendEmailAPIService;
        }

        // ---------
        // Student Registration
        // ---------

        public async Task<ApiResponse<PostRegisterEntity>> StudentRegister(StudentRegisterEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                    new SqlParameter("@FirstName", SqlDbType.Text) { Value = entity.FirstName },
                    new SqlParameter("@lastName", SqlDbType.Text) { Value = entity.LastName },
                    new SqlParameter("@Dob", SqlDbType.Date) { Value = entity.DateOfBirth },
                    new SqlParameter("@Gender", SqlDbType.Text) { Value = entity.Gender },
                    new SqlParameter("@College", SqlDbType.Text) { Value = entity.College },
                    new SqlParameter("@Degree", SqlDbType.Text) { Value = entity.Degree },
                    new SqlParameter("@RegistrationNo", SqlDbType.Text) { Value = entity.RegistrationNumber },
                    new SqlParameter("@YearOfPassing", SqlDbType.Int) { Value = entity.YearOfPassing },
                };

                var result = await _genericRepository.GetAsync<PostRegisterEntity>("StudentRegistration", parameters);

                if (result.IsSuccess == -1)
                {
                    return new ApiResponse<PostRegisterEntity>(null, result.Message, false,404);
                }
                else if (result.IsSuccess == 1)
                {
                    return new ApiResponse<PostRegisterEntity>(result, "User Created Successfully", true);
                }
                else
                {
                    return new ApiResponse<PostRegisterEntity>(null, "User Creation Failed", false,404);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<PostRegisterEntity>(null, $"Error registering student: {ex.Message}", false,500);
            }
        }

        // ---------
        // Mentor Registration
        // ---------

        public async Task<ApiResponse<PostRegisterEntity>> MentorRegister(MentorRegisterEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                    new SqlParameter("@FirstName", SqlDbType.Text) { Value = entity.FirstName },
                    new SqlParameter("@LastName", SqlDbType.Text) { Value = entity.LastName },
                    new SqlParameter("@PhoneNumber", SqlDbType.Text) { Value = entity.PhoneNumber },
                    new SqlParameter("@Designation", SqlDbType.Text) { Value = entity.Designation },
                    new SqlParameter("@CompanyName", SqlDbType.Text) { Value = entity.CompanyName },
                    new SqlParameter("@ExperienceYears", SqlDbType.Int) { Value = entity.ExperienceYears },
                    new SqlParameter("@Bio", SqlDbType.Text) { Value = entity.Bio },

                };

                var result = await _genericRepository.GetAsync<PostRegisterEntity>("MentorRegistration", parameters);
                if (result.IsSuccess == -1)
                {
                    return new ApiResponse<PostRegisterEntity>(null, result.Message, false, 404);
                }
                else if (result.IsSuccess == 1)
                {
                    return new ApiResponse<PostRegisterEntity>(result, "User Created Successfully", true);
                }
                else
                {
                    return new ApiResponse<PostRegisterEntity>(null, "User Creation Failed", false, 404);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<PostRegisterEntity>(null, $"Error registering student: {ex.Message}", false, 500);
            }
        }

        // ---------
        // Company Registration
        // ---------

        public async Task<ApiResponse<PostRegisterEntity>> CompanyRegister(CompanyRegistationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.LoginEmail },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                    new SqlParameter("@CompanyName", SqlDbType.Text) { Value = entity.CompanyName },
                    new SqlParameter("@ContactPersonName", SqlDbType.Text) { Value = entity.ContactPersonName },
                    new SqlParameter("@ContactPersonDesignation", SqlDbType.Text) { Value = entity.ContactPersionDesignation },
                    new SqlParameter("@SupportEmail", SqlDbType.Text) { Value = entity.SupportEmail },
                    new SqlParameter("@PhoneNumber", SqlDbType.Text) { Value = entity.PhoneNumber },
                    new SqlParameter("@Gstin", SqlDbType.Text) { Value = entity.GstIn },
                    new SqlParameter("@PanNumber", SqlDbType.Text) { Value = entity.PanNumber },
                    new SqlParameter("@WebsiteUrl", SqlDbType.Text) { Value = entity.Website },
                    new SqlParameter("@LinkedinUrl", SqlDbType.Text) { Value = entity.LinkedinUrl },
                    new SqlParameter("@Industry", SqlDbType.Text) { Value = entity.Industry },
                    new SqlParameter("@Location", SqlDbType.Text) { Value = entity.Location },
                };

                var result = await _genericRepository.GetAsync<PostRegisterEntity>("EmployeerRegistration", parameters);
                if (result.IsSuccess == -1)
                {
                    return new ApiResponse<PostRegisterEntity>(null, result.Message, false, 404);
                }
                else if (result.IsSuccess == 1)
                {
                    return new ApiResponse<PostRegisterEntity>(result, "User Created Successfully", true);
                }
                else
                {
                    return new ApiResponse<PostRegisterEntity>(null, "User Creation Failed", false, 404);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<PostRegisterEntity>(null, $"Error registering Company: {ex.Message}", false, 500);
            }
        }

        // ---------
        // Check User Login
        // ---------

        public async Task<ApiResponse<LoginEntity>> CheckLogin(CheckLogin entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                };

                var result = await _genericRepository.GetAsync<LoginEntity> ("CheckUserLogIn", parameters);

                    return new ApiResponse<LoginEntity>(result, "User LogIn Data", true);
            }
            catch (Exception ex)
            {
                return new ApiResponse<LoginEntity>(null, $"Error Login : {ex.Message}", false,500);
            }
        }

        // ---------
        // Send Regitration OTP Verification Mail
        // ---------

        public async Task<ApiResponse<string>> SendOTPVerifyMail(string Email)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = Email },
                };

                var result = await _genericRepository.GetAsync<EmailEntity>("SendMailForOtpVerification", parameters);
                await _sendEmailAPIService.SendEmail(result);
                return new ApiResponse<string>("Mail Sent sccessfully.");

            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error Sending Mail : {ex.Message}", false,500);
            }
        }

        // ---------
        // Verify OTP for Registration
        // ---------

        public async Task<ApiResponse<string>> VerifyRegisterMail(string Email, int OTP)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = Email },
                    new SqlParameter("@OTP", SqlDbType.Text) { Value = OTP },
                };  

                var result = await _genericRepository.GetAsync<dynamic>("VerifyOTPForRegistartion", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null,"OTP Verified...",true);
                }else if (result.IsSuccess == -1)
                {
                    return new ApiResponse<string>(null,result.Message,false, 404);
                }
                else
                {
                    return new ApiResponse<string>(null,"Somthing went Wrong", false, 404);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error While Verify OTP: {ex.Message}", false, 500);
            }
        }

        // ---------
        // Send Forgot Password OTP Verification Mail
        // ---------

        public async Task<ApiResponse<string>> SendForgotPassOTPVerifyMail(string Email)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = Email },
                };

                var result = await _genericRepository.GetAsync<EmailEntity>("SendMailForForgotPassword", parameters);
                if (result.StatusCode == 200)
                {
                    await _sendEmailAPIService.SendEmail(result);
                    return new ApiResponse<string>("Mail Sent sccessfully.");
                }
                else
                {
                    return new ApiResponse<string>(null,result.Message,false,result.StatusCode);
                }
                

            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error Sending Mail : {ex.Message}", false,500);
            }
        }

        // ---------
        // Verify OTP for Forgot Password
        // ---------

        public async Task<ApiResponse<string>> VerifyForgotPasswordOTP(string Email, int OTP)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = Email },
                    new SqlParameter("@OTP", SqlDbType.Text) { Value = OTP },
                };

                var result = await _genericRepository.GetAsync<dynamic>("VerifyOTPForForgotPassword", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "OTP Verified...", true);
                }
                else if (result.IsSuccess == -1)
                {
                    return new ApiResponse<string>(null, result.Message, false,404);
                }
                else
                {
                    return new ApiResponse<string>(null, "Somthing went Wrong", false,404);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error While Verify OTP: {ex.Message}", false,500);
            }
        }


        //-------------
        //Reset Password
        //--------------

        public async Task<ApiResponse<string>> ResetPassword(string Email,string Password)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Email", SqlDbType.Text) { Value = Email },
                    new SqlParameter("@NewPassword", SqlDbType.Text) { Value = Password },
                };

                var result = await _genericRepository.ExecuteAsync("ForgotPassword", parameters);

                return new ApiResponse<string>(null, "Password Reset Successfully", true);
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while reseting Password : {ex.Message}", false, 500);
            }
        }
    }
}
