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
        public string YearOfPassinf { get; set; }
    }
}
