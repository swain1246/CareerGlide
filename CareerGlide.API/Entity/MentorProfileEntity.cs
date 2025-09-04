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

    public class MentorEducationModel
    {
        public int Id { get; set; }
        public string Qualification { get; set; }

        // for X and XII
        public string? ExaminationBoard { get; set; }
        public string? SchoolName { get; set; }
        public int? PassingYear { get; set; }

        // for except qualification
        public string? CourseName { get; set; }
        public string? Specialization { get; set; }
        public string? CollegeName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        // common
        public decimal Percentage { get; set; }
    }

    public class MentorProfessionEntity
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public string EmploymentType { get; set; }
        public DateOnly JoiningDate { get; set; }
        public int CurrentlyWorking { get; set; }
        public int YearsOfExperience { get; set; }
        public string Skills { get; set; }
        public string? Description { get; set; }
    }

    public class MentorTypesEntity
    {
        public int Id { get; set; }
        public string MentorType { get; set; }
        public byte IsActive { get; set; }
        public string PreferredTime { get; set; }
        public string SkillsStacks { get; set; }
    }
}
