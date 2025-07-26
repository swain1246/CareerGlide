namespace CareerGlide.API.Entity
{
    public class MentorActivityEntity
    {
    }

    public class MentorInvitationEntity
    {
        public int StudentId { get; set; }
        public string ProjectTitle { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
    }
}
