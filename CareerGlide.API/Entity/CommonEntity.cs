namespace CareerGlide.API.Entity
{
    public class CommonEntity
    {
    }

    public class EmailConfig
    {
        public int SmtpPort { get; set; }
        public string SmtpServer { get; set; }
        public string HostEmail { get; set; }
        public string HostEmailAppPassword { get; set; }
        public string SenderName { get; set; }
    }

    public class BindTechnicalStacks
    {
        public int StackId { get; set; }
        public string StackName { get; set; }
    }
}
