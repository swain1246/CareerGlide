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

        public async Task<ApiResponse<PostRegisterEntity>> StudentRegister(StudentRegisterEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserType", SqlDbType.Int) { Value = entity.UserType },
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@Password", SqlDbType.Text) { Value = entity.Password },
                    new SqlParameter("@FirstName", SqlDbType.Text) { Value = entity.FirstName },
                    new SqlParameter("@lastName", SqlDbType.Text) { Value = entity.LastName },
                    new SqlParameter("@Dob", SqlDbType.Date) { Value = entity.DateOfBirth },
                    new SqlParameter("@Gender", SqlDbType.Text) { Value = entity.Gender },
                    new SqlParameter("@College", SqlDbType.Text) { Value = entity.College },
                    new SqlParameter("@Degree", SqlDbType.Text) { Value = entity.Degree },
                    new SqlParameter("@YearOfPassing", SqlDbType.Int) { Value = entity.YearOfPassing },
                };

                var result = await _genericRepository.GetAsync<PostRegisterEntity>("StudentRegistration", parameters);
                if (result.IsSuccess == -1)
                {
                    return new ApiResponse<PostRegisterEntity>(null, "Email Already Exists", false);
                }
                else if (result.IsSuccess == 1)
                {
                    return new ApiResponse<PostRegisterEntity>(result, "User Created Successfully", true);
                }
                else
                {
                    return new ApiResponse<PostRegisterEntity>(null, "User Creation Failed", false);
                }

            }
            catch (Exception ex)
            {
                return new ApiResponse<PostRegisterEntity>(null, $"Error registering student: {ex.Message}", false);
            }
        }

        public async Task<ApiResponse<LoginEntity>> CheckLogin(LoginEntity entity)
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
                return new ApiResponse<LoginEntity>(null, $"Error Login : {ex.Message}", false);
            }
        }

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
                return new ApiResponse<string>(null, $"Error Sending Mail : {ex.Message}", false);
            }
        }

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
                    return new ApiResponse<string>(null,result.Message,false);
                }
                else
                {
                    return new ApiResponse<string>(null,"Somthing went Wrong", false);
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error While Verify OTP: {ex.Message}", false);
            }
        }
    }
}
