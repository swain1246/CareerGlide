namespace CareerGlide.API.Entity
{
    public class StudentActivityEntity
    {
    }

    public class JobApplicationEntity
    {
        public int JobId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber{ get; set; }
        public string ResumePath { get; set; }
        public string CoverLetter { get; set; }
    }
}
