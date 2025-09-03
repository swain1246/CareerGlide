namespace CareerGlide.API.Entity
{
    public class MentorProfileEntity
    {
    }

    public class MentorProfileHero
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Designation { get; set; }
        public string CompanyName { get; set; }
        public int ExperienceYears { get; set; }
        public string bio { get; set; }
        public string CurrentLocation { get; set; }
    }
}
