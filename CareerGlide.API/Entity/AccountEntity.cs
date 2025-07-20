namespace CareerGlide.API.Entity
{
    public class AccountEntity
    {
    }

    public class StudentRegisterEntity
    {
        public int UserType { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string College { get; set; }
        public string Degree { get; set; }
        public string YearOfPassing { get; set; }
    }

    public class PostRegisterEntity
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public int IsSuccess { get; set; }
    }

    public class LoginEntity
    {
        public int UserTypeId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string StudentName { get; set; }
        public string CompaniName { get; set; }
        public string? UserToken { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }

    public class UnAuthLogin
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
