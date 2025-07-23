using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;

namespace CareerGlide.API.Services
{
    public class StudentProfileService
    {
        private readonly GenericRepository _genericRepository;

        public StudentProfileService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// Get Student Profile Details
        /// </summary>
        ///

        public async Task<ApiResponse<string>> GetStudentProfileDetails(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int){Value=UserId}
                };

                var result = await _genericRepository.GetAsync<dynamic>("GetStudentProfileDetails", parameters);

                if(result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student Profile Details Retrive Successfully",
                        Data = result.JsonResult,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Error to load student profile details",
                        Data = result.JsonResult,
                        StatusCode = 400
                    };
                }
            }catch(Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while Getting Student Profile Details: {ex.Message}",
                    StatusCode = 500
                };
            }
        }


        /// <summary>
        /// Update Student Profile Hero Section
        /// </summary>
        ///

        public async Task<ApiResponse<string>> UpdateStudentProfileHero(StudentProfileHeroEntity entity)
        {
            try
            {
                var parameter = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = entity.UserId },
                    new SqlParameter("@FirstName", SqlDbType.Text) { Value = entity.FirstName },
                    new SqlParameter("@LastName", SqlDbType.Text) { Value = entity.LastName },
                    new SqlParameter("@Gender", SqlDbType.Text) { Value = entity.Gender },
                    new SqlParameter("@DateOfBirth", SqlDbType.Date) { Value = entity.DateOfBirth },
                    new SqlParameter("@Email", SqlDbType.Text) { Value = entity.Email },
                    new SqlParameter("@PhoneNo", SqlDbType.Text) { Value = entity.PhoneNumber },
                    new SqlParameter("@RegistrationNo", SqlDbType.Text) { Value = entity.RegistrationNumber },
                    new SqlParameter("@CurrentLocation", SqlDbType.Text) { Value = entity.CurrentLocation },
                    new SqlParameter("@ProfileSummary", SqlDbType.Text) { Value = entity.ProfileSummery },
                };
                var result = await _genericRepository.GetAsync<dynamic>("UpdateStudentProfileHero", parameter);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student hero section updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to update student hero section.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while updating student hero section: {ex.Message}",
                    StatusCode = 500
                };
            }
        }


        /// <summary>
        /// Student Education Add and Update
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AddEUpdateStudentEducation(StudentEducationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int) { Value = entity.Id },
                    new SqlParameter("@UserId",SqlDbType.Int) { Value = entity.UserId },
                    new SqlParameter("@Qualification",SqlDbType.Text) { Value = entity.Qualification },
                    new SqlParameter("@ExaminationBoard",SqlDbType.Text) { Value = entity.ExaminationBoard },
                    new SqlParameter("@MediumOfStudy",SqlDbType.Text) { Value = entity.MediumOfStudy },
                    new SqlParameter("@PassingYear",SqlDbType.Int) { Value = entity.PassingYear },
                    new SqlParameter("@CourseName",SqlDbType.Text) { Value = entity.CourseName },
                    new SqlParameter("@Specialization",SqlDbType.Text) { Value = entity.Specialization },
                    new SqlParameter("@CollegeName",SqlDbType.Text) { Value = entity.CollegeName },
                    new SqlParameter("@StartDate",SqlDbType.Date) { Value = entity.StartDate },
                    new SqlParameter("@EndDate",SqlDbType.Date) { Value = entity.EndDate },
                    new SqlParameter("@Percentage",SqlDbType.Decimal) { Value = entity.Percentage },

                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateStudentEducation", parameters);

                if (result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student education added successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student education updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to add/edit student education.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while adding/editing student education: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        // <summary>
        /// Add Update Student Certification
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AddUpdateStudentCertification(StudentCertificationEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int) { Value = entity.Id },
                    new SqlParameter("@UserId",SqlDbType.Int) { Value = entity.UserId },
                    new SqlParameter("@CertificationName",SqlDbType.Text) { Value = entity.CertificationName },
                    new SqlParameter("@CertificationId",SqlDbType.Text) { Value = entity.CertificationId },
                    new SqlParameter("@IssuedBy",SqlDbType.Text) { Value = entity.IssuedBy },
                    new SqlParameter("@IssueDate",SqlDbType.Date) { Value = entity.IssueDate },
                    new SqlParameter("@CertificateUrl",SqlDbType.Text) { Value = entity.CertificateUrl }
                };
                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateStudentCertifications", parameters);
                if (result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student certification added successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student certification updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to add/edit student certification.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while adding/editing student certification: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Add Update Student Intership
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AddUpdateStudentIntership(StudentInternshipEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int) { Value = entity.Id },
                    new SqlParameter("@UserId",SqlDbType.Int) { Value = entity.UserId },
                    new SqlParameter("@CompanyName",SqlDbType.Text) { Value = entity.CompanyName },
                    new SqlParameter("@Designation",SqlDbType.Text) { Value = entity.Designation },
                    new SqlParameter("@InternShipDuration",SqlDbType.Int) { Value = entity.InternshipDuration },
                    new SqlParameter("@ProjectName",SqlDbType.Text) { Value = entity.ProjectName },
                    new SqlParameter("@Skills",SqlDbType.Text) { Value = entity.Skills },
                    //new SqlParameter("@StartDate",SqlDbType.Date) { Value = entity.StartDate },
                    //new SqlParameter("@EndDate",SqlDbType.Date) { Value = entity.EndDate },
                    new SqlParameter("@Description",SqlDbType.Text) { Value = entity.Description },
                    new SqlParameter("@ProjectUrl",SqlDbType.Text) { Value = entity.ProjectUrl },
                };
                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateStudentInternships", parameters);
                if (result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student internship added successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student internship updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to add/edit student internship.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while adding/editing student internship: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Add update Student Project
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> AddUpdateStudentProject(StudentProjectEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int) { Value = entity.Id },
                    new SqlParameter("@UserId",SqlDbType.Int) { Value = entity.UserId },
                    new SqlParameter("@ProjectName",SqlDbType.Text) { Value = entity.ProjectName },
                    new SqlParameter("@ProjectDuration",SqlDbType.Int) { Value = entity.ProjectDuration },
                    new SqlParameter("@Description",SqlDbType.Text) { Value = entity.Description},
                    new SqlParameter("@Skills",SqlDbType.Text) { Value = entity.Skills },
                    new SqlParameter("@ProjectUrl",SqlDbType.Text) { Value = entity.ProjectUrl}
                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateStudentProjects", parameters);
                if (result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student project added successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student project updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to add/edit student project.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while adding/editing student project: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Update Student Profile Skills
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateStudentProfileSkills(int userId, string skills)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
                    new SqlParameter("@Skills", SqlDbType.Text) { Value = skills }
                };
                var result = await _genericRepository.GetAsync<dynamic>("UpdateStudentProfileSkills", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student skills updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to update student skills.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while updating student skills: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Update Student Resume
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateStudentResume(int UserId, string ResumePath)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@ResumePath", SqlDbType.Text) { Value = ResumePath }
                };
                var result = await _genericRepository.GetAsync<dynamic>("UpdateStudentResume", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student resume updated successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to update student resume.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while updating student resume: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        #region Delete
        /// <summary>
        /// Delete Student Education
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteStudentEducation(int id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteStudentEducation", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student education deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete student education.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting student education: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Delete student certification
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteStudentCertification(int id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteStudentCertificate", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student certification deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete student certification.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting student certification: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Delete Student Internship
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteStudentInternship(int id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteStudentInternship", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student internship deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete student internship.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting student internship: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Delete Student Project
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteStudentProject(int id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteStudentProject", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student project deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete student project.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting student project: {ex.Message}",
                    StatusCode = 500
                };
            }
        }


        /// <summary>
        /// Delete Student Resume
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> DeleteStudentResume(int userId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteStudentResume", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Student resume deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete student resume.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting student resume: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        #endregion
    }
}
