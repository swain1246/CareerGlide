using System.ComponentModel.DataAnnotations;

namespace CareerGlide.API.Entity
{
    public class ValidationHelper
    {
        public static IEnumerable<ValidationResult> ValidateEmailDomain(string email, string[] allowedDomains, string fieldName = "Email")
        {   
            if (!string.IsNullOrWhiteSpace(email))
            {
                var domain = email.Split('@').LastOrDefault();
                if (domain == null || !allowedDomains.Contains(domain))
                {
                    yield return new ValidationResult(
                        $"Email must be from one of the following domains: {string.Join(", ", allowedDomains)}",
                        new[] { fieldName });
                }
            }
        }

        public static IEnumerable<ValidationResult> ValidatePassword(string password, string fieldName = "Password")
        {
            var specialChars = "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~";

            if (string.IsNullOrWhiteSpace(password))
                yield break;

            if (password.Length < 8)
                yield return new ValidationResult("Password must be at least 8 characters long", new[] { fieldName });

            if (!password.Any(char.IsDigit))
                yield return new ValidationResult("Password must contain at least one digit", new[] { fieldName });

            if (!password.Any(char.IsUpper))
                yield return new ValidationResult("Password must contain at least one uppercase letter", new[] { fieldName });

            if (!password.Any(char.IsLower))
                yield return new ValidationResult("Password must contain at least one lowercase letter", new[] { fieldName });

            if (!password.Any(c => specialChars.Contains(c)))
                yield return new ValidationResult("Password must contain at least one special character", new[] { fieldName });
        }



        public static IEnumerable<ValidationResult> ValidateName(string name, string fieldName)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                yield return new ValidationResult($"{fieldName} is required.", new[] { fieldName });
                yield break;
            }

            if (name.Length < 2)
            {
                yield return new ValidationResult($"{fieldName} must be at least 2 characters long.", new[] { fieldName });
            }

            if (!name.All(char.IsLetter))
            {
                yield return new ValidationResult($"{fieldName} must contain only letters.", new[] { fieldName });
            }
        }
    }
}
