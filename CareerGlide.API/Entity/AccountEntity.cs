using System.ComponentModel.DataAnnotations;

namespace CareerGlide.API.Entity
{
    public class AccountEntity
    {
    }

    public class StudentRegisterEntity: IValidatableObject
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string College { get; set; }
        public string Degree { get; set; }
        public string RegistrationNumber { get; set; }
        public int YearOfPassing { get; set; }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //foreach (var error in ValidationHelper.ValidateEmailDomain(Email, new[] { "gmail.com", "example.com" }))
            //    yield return error;

            foreach (var error in ValidationHelper.ValidatePassword(Password))
                yield return error;

            foreach (var error in ValidationHelper.ValidateName(FirstName, "FirstName"))
                yield return error;

            foreach (var error in ValidationHelper.ValidateName(LastName, "LastName"))
                yield return error;
        }


    }

    public class CompanyRegistationEntity: IValidatableObject
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string LoginEmail { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string CompanyName { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactPersionDesignation { get; set; }
        public string SupportEmail { get; set; }
        public string PhoneNumber { get; set; }
        public string GstIn { get; set; }
        public string PanNumber { get; set; }
        public string Website { get; set; }
        public string Industry { get; set; }
        public string Location { get; set; }
        public string LinkedinUrl { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //foreach (var error in ValidationHelper.ValidateEmailDomain(LoginEmail, new[] { "gmail.com", "example.com" }))
            //    yield return error;

            foreach (var error in ValidationHelper.ValidatePassword(Password))
                yield return error;
        }
    }

    public class MentorRegisterEntity : IValidatableObject
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Designation { get; set; }
        public string CompanyName { get; set; }
        public int ExperienceYears { get; set; }
        public string Bio { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {

            foreach (var error in ValidationHelper.ValidatePassword(Password))
                yield return error;

            foreach (var error in ValidationHelper.ValidateName(FirstName, "FirstName"))
                yield return error;

            foreach (var error in ValidationHelper.ValidateName(LastName, "LastName"))
                yield return error;
        }
    }

    public class PostRegisterEntity
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public int IsSuccess { get; set; }
        public string Message { get; set; }
    }

    public class PostRegistrationSendentity
    {
        public string Email { get; set; }
    }

    public class CheckLogin 
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

    }

    public class LoginEntity
    {
        public int UserTypeId { get; set; }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string StudentName { get; set; }
        public string MentorName { get; set; }
        public string AdminName { get; set; }
        public string CompanyName { get; set; }
        public string ProfileImage { get; set; }
        public string? UserToken { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }

    public class UnAuthLogin
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }


    public class VerifyOTP
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        public int OTP { get; set; }
    }

    public class ForgotPassword : IValidatableObject
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string NewPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {

            foreach (var error in ValidationHelper.ValidatePassword(NewPassword))
                yield return error;

        }
    }


}
