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

    public class ViewMentorProfile
    {
        public int MentorId { get; set; }
        public string? ProfileImagePath { get; set; }
        public string MentorName { get; set; }
        public string? Designation { get; set; }
        public string? Companyname { get; set; }
        public string? WorkAt { get; set; }
        public string? About { get; set; }
        public string? Experties { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? LinkedInUrl { get; set; }
        public string? Experience { get; set; }
    }

    public class AddUpdateMentershipRequest 
    {
        public int Id { get; set; }
        public int StackId { get; set; }
        public string MentoeshipType { get; set; }
        public string Description { get; set; }
    }

    public class GetInvitations
    {
        public int Id { get; set; }
        public int MentorId { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Name { get; set; }
        public string WorkAt { get; set; }
        public DateOnly SentDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string MentorMessage { get; set; }
    }

    public class GetMentorshipRequests
    {
        public int Id { get; set; }
        public int StackId { get; set; }
        public string StackName { get; set; }
        public string MentorshipType { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string AdminRemarks { get; set; }
        public DateTime RequestDate { get; set; }
    }
}
