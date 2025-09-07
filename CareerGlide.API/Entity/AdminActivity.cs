namespace CareerGlide.API.Entity
{
    public class AdminActivity
    {
    }

    public class UserListEntity
    {
        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public string ProfileImageUrl { get; set; }
        public string Name { get; set; }
        public string Institute_Company { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public int TotalUsers { get; set; }
    }
}
