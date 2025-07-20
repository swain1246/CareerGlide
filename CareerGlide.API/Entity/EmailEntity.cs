namespace CareerGlide.API.Entity
{
    public class EmailEntity
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public int Count { get; set; }

        public byte[] AttachmentBytes { get; set; }
        public string AttachmentFileName { get; set; }
    }
}
