namespace CareerGlide.API.Entity
{
    public class CompanyActivityEntity
    {
    }

    public class JobPostEntity
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Requirments { get; set; }
        public string Type { get; set; }
        public string Location { get; set; }
        public string Mode { get; set; }
        public string ExperienceLevel { get; set; }
        public string SkillsRequired { get; set; }
        public string? StipendOrSalary { get; set; }
        public DateOnly? ApplyDeadline { get; set; }
        public int? VacancyCount { get; set; }
    }
}
