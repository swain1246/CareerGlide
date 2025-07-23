namespace CareerGlide.API.Entity
{
    public class StudentProfileEntity
    {
    }

    public class StudentProfileHeroEntity
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string  RegistrationNumber { get; set; }
        public string CurrentLocation { get; set; }
        public string ProfileSummery { get; set; }
    }

    public class StudentEducationEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Qualification { get; set; }
        //--
        public string? ExaminationBoard { get; set; } = null;
        public string? MediumOfStudy { get; set; } = null;
        public int? PassingYear { get; set; } = null;

        //--
        public string? CourseName { get; set; } = null;
        public string? Specialization { get; set; } = null;
        public string? CollegeName { get; set; } = null;
        public DateOnly? StartDate { get; set; } = null;
        public DateOnly? EndDate { get; set; } = null;


        public decimal Percentage { get; set; }
    }

    public class StudentCertificationEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string CertificationName { get; set; }
        public string CertificationId { get; set; }
        public string? IssuedBy { get; set; }
        public DateOnly? IssueDate { get; set; }
        public string? CertificateUrl { get; set; }
    }

    public class StudentProjectEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ProjectName { get; set; }
        public int ProjectDuration { get; set; }
        public string? Description { get; set; } = null;
        public string Skills { get; set; }
        public string? ProjectUrl { get; set; } = null;
    }

    public class StudentInternshipEntity
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public int InternshipDuration { get; set; }
        public string ProjectName { get; set; }
        public string Skills { get; set; }
        //public DateOnly? StartDate { get; set; } = null;
        //public DateOnly? EndDate { get; set; } = null;
        public string? Description { get; set; }
        public string? ProjectUrl { get; set; }
    }
}
