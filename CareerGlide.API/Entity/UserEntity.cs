namespace CareerGlide.API.Entity
{
    public class UserEntity
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class UserDetailsEntity
    {
        public int UserTypeId { get; set; }
        public string UserName { get; set; }
        public string ProfileImageUrl { get; set; }
    }
}
