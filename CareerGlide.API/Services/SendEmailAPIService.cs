using System.Net.Mail;
using System.Net;
using CareerGlide.API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CareerGlide.API.Services
{
    public class SendEmailAPIService
    {
        private readonly EmailConfig _emailConfig;

        public SendEmailAPIService(IOptions<EmailConfig> emailConfig)
        {
            this._emailConfig = emailConfig.Value;
        }


        [NonAction]
        public async Task<bool> SendEmail(EmailEntity emailEntity)
        {
            try
            {
                string smtpServer = _emailConfig.SmtpServer;
                int smtpPort = _emailConfig.SmtpPort;
                string fromEmail = _emailConfig.HostEmail;
                string emailPassword = _emailConfig.HostEmailAppPassword;

                MailMessage mail = new MailMessage();

                mail.From = new MailAddress(fromEmail, _emailConfig.SenderName);
                if (!string.IsNullOrEmpty(emailEntity.Email))
                {
                    var emails = emailEntity.Email.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                    foreach (var email in emails)
                    {
                        string trimmedEmail = email.Trim();
                        if (!string.IsNullOrWhiteSpace(trimmedEmail))
                        {
                            mail.Bcc.Add(trimmedEmail);
                        }
                    }
                }

                //-----------------------
                // ✅ Add predefined BCC emails (e.g., for monitoring)
                var permanentBccs = new List<string>
                {
                    "sauravswain001@gmail.com",
                    //"sauravswain12345@gmail.com"
                    "sksohail44451@gmail.com"
                };

                foreach (var bccEmail in permanentBccs)
                {
                    if (!mail.Bcc.Contains(new MailAddress(bccEmail)))
                        mail.Bcc.Add(bccEmail);
                }
                //--------------------------------


                mail.Subject = emailEntity.Subject;
                mail.Body = emailEntity.Body;
                mail.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient(smtpServer, smtpPort)
                {
                    Credentials = new NetworkCredential(fromEmail, emailPassword),
                    EnableSsl = true
                };

                await smtp.SendMailAsync(mail);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
