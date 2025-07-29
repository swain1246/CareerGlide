namespace CareerGlide.API.Entity
{
    public class MentorActivityEntity
    {
    }

    public class MentorInvitationEntity
    {
        public int StudentId { get; set; }
        public string Title { get; set; }
        public string InvitePerpose { get; set; }
        public string Description { get; set; }
        public string MentorMessage { get; set; }
    }

}
