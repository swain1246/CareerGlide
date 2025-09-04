using System.Data;
using CareerGlide.API.Entity;
using CareerGlide.API.Repositories;
using Microsoft.Data.SqlClient;
using Microsoft.Identity.Client;

namespace CareerGlide.API.Services
{
    public class MentorProfileService
    {
        private readonly GenericRepository _genericRepository;

        public MentorProfileService(GenericRepository genericRepository)
        {
            this._genericRepository = genericRepository;
        }

        /// <summary>
        /// Get Mentor Profile Details
        /// </summary>
        ///

        public async Task<ApiResponse<string>> GetMentorProfileDetails(int UserId)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int){Value=UserId}
                };

                var result = await _genericRepository.GetAsync<dynamic>("GetMentorProfileDetails", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Mentor Profile Details Retrive Successfully",
                        Data = result.JsonResult,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Error to load mentor profile details",
                        Data = null,
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while Getting Mentor Profile Details: {ex.Message}",
                    StatusCode = 500
                };
            }
        }

        /// <summary>
        /// Update Mentor Profile Hero
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateMentorProfileHero(int UserId, MentorProfileHero Entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId",SqlDbType.Int){Value=UserId},
                    new SqlParameter("@FirstName",SqlDbType.Text){Value=Entity.FirstName},
                    new SqlParameter("@LastName",SqlDbType.Text){Value=Entity.LastName},
                    new SqlParameter("@Email",SqlDbType.Text){Value=Entity.Email},
                    new SqlParameter("@PhoneNo",SqlDbType.Text){Value=Entity.PhoneNo},
                    new SqlParameter("@Gender",SqlDbType.Text){Value=Entity.Gender},
                    new SqlParameter("@DateOfBirth",SqlDbType.Date){Value=Entity.DateOfBirth},
                    new SqlParameter("@Designation",SqlDbType.Text){Value=Entity.Designation},
                    new SqlParameter("@CompanyName",SqlDbType.Text){Value=Entity.CompanyName},
                    new SqlParameter("@ExperienceYears",SqlDbType.Int){Value=Entity.ExperienceYears},
                    new SqlParameter("@bio",SqlDbType.Text){Value=Entity.bio},
                    new SqlParameter("@CurrentLocation",SqlDbType.Text){Value=Entity.CurrentLocation},
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateMentorProfileHero", parameters);

                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Mentor Profile Hero updated successful", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to update mentor profile hero", false, 400);

            }catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while updating mentor profile hero : {ex.Message}", false, 500);
            }
        }

        /// <summary>
        /// Update mentor skills
        /// </summary>
        /// 

        public async Task<ApiResponse<string>> UpdateMentorSkills(int UserId, string Skills)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = UserId },
                    new SqlParameter("@Skills", SqlDbType.Text) { Value = Skills },
                };

                var result = await _genericRepository.GetAsync<dynamic>("UpdateMentorSkills", parameters);

                if (result != null && result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Mentor skills updated successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to update mentor skills", false, 400);
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while updating mentor skills: {ex.Message}", false, 500);
            }
        }

        ///<summary>
        ///Add update mentor education
        ///</summary>
        ///

        public async Task<ApiResponse<string>> AddUpdateMentorEducation(int userId, MentorEducationModel entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                     new SqlParameter("@Id",SqlDbType.Int) { Value = entity.Id },
                    new SqlParameter("@UserId",SqlDbType.Int) { Value = userId },
                    new SqlParameter("@Qualification",SqlDbType.Text) { Value = entity.Qualification },
                    new SqlParameter("@ExaminationBoard",SqlDbType.Text) { Value = entity.ExaminationBoard },
                    new SqlParameter("@SchoolName",SqlDbType.Text) { Value = entity.SchoolName },
                    new SqlParameter("@PassingYear",SqlDbType.Int) { Value = entity.PassingYear },
                    new SqlParameter("@CourseName",SqlDbType.Text) { Value = entity.CourseName },
                    new SqlParameter("@Specialization",SqlDbType.Text) { Value = entity.Specialization },
                    new SqlParameter("@CollegeName",SqlDbType.Text) { Value = entity.CollegeName },
                    new SqlParameter("@StartDate",SqlDbType.Date) { Value = entity.StartDate },
                    new SqlParameter("@EndDate",SqlDbType.Date) { Value = entity.EndDate },
                    new SqlParameter("@Percentage",SqlDbType.Decimal) { Value = entity.Percentage },
                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateMentorEducation", parameters);

                if(result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>(null, "Mentor education added successfully", true, 200);
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>(null, "Mentor education updated successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to add/Update mentor education", false, 400);
            }
            catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error whiel Add/Update mentor education: {ex.Message}", false, 500);
            }
        }

        ///<summary>
        ///Add Update mentor professional details
        ///</summary>
        ///

        public async Task<ApiResponse<string>> AddUpdateMentorPerfessionalDetails(int UserId, MentorProfessionEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int){Value=entity.Id},
                    new SqlParameter("@UserId",SqlDbType.Int){Value=UserId},
                    new SqlParameter("@CompanyName",SqlDbType.Text){Value=entity.CompanyName},
                    new SqlParameter("@Designation",SqlDbType.Text){Value=entity.Designation},
                    new SqlParameter("@EmploymentType",SqlDbType.Text){Value=entity.EmploymentType},
                    new SqlParameter("@JoiningDate",SqlDbType.Date){Value=entity.JoiningDate},
                    new SqlParameter("@CurrentlyWorking",SqlDbType.Int){Value=entity.CurrentlyWorking},
                    new SqlParameter("@YearsOfExperience",SqlDbType.Int){Value=entity.YearsOfExperience},
                    new SqlParameter("@Skills",SqlDbType.Text){Value=entity.Skills},
                    new SqlParameter("@Description",SqlDbType.Text){Value=entity.Description},
                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateMentorProfessionalDetails", parameters);

                if(result.IsSuccess == 1 && entity.Id <= 0)
                {
                    return new ApiResponse<string>(null, "Mentor Perfessional Details added successfully", true, 200);
                }
                else if (result.IsSuccess == 1 && entity.Id > 0)
                {
                    return new ApiResponse<string>(null, "Mentor Perfessional Details updated successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to add/update mentor perfessional details", false, 400);
            }
            catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while add/update mentor perfessional details :{ex.Message}", false, 500);
            }
        }


        ///<summary>
        ///Active Inactive MentorTypes
        ///</summary>
        ///

        public async Task<ApiResponse<string>> ActiveInactiveMentorTypes(int Id,int UserId, byte IsActive)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int){Value=Id},
                    new SqlParameter("@UserId",SqlDbType.Int){Value=UserId},
                    new SqlParameter("@IsActive",SqlDbType.Bit){Value=IsActive},
                };

                var result = await _genericRepository.GetAsync<dynamic>("ActiveInactiveMentorType", parameters);

                if(result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Mentor Types Inactive successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to active/inactive mentor types", false, 400);

            }catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while active/inactive mentor types", false, 500);
            }
        }

        ///<summary>
        ///Add Update Mentor Types
        ///</summary>
        ///

        public async Task<ApiResponse<string>> AddUpdateMentorTypes(int UserId, MentorTypesEntity entity)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id",SqlDbType.Int){Value=entity.Id},
                    new SqlParameter("@UserId",SqlDbType.Int){Value=UserId},
                    new SqlParameter("@MentorType",SqlDbType.Text){Value=entity.MentorType},
                    new SqlParameter("@IsActive",SqlDbType.Bit){Value=entity.IsActive},
                    new SqlParameter("@PreferredTime",SqlDbType.Text){Value=entity.PreferredTime},
                    new SqlParameter("@SkillsStacks",SqlDbType.Text){Value=entity.SkillsStacks},
                };

                var result = await _genericRepository.GetAsync<dynamic>("AddUpdateMentorsTypeDetail", parameters);

                if(result.IsSuccess == 1)
                {
                    return new ApiResponse<string>(null, "Mentor type updated successfully", true, 200);
                }

                return new ApiResponse<string>(null, "Failed to update mentor types", false, 400);

            }catch(Exception ex)
            {
                return new ApiResponse<string>(null, $"Error while add/update mentor types :{ex.Message}", false, 500);
            }
        }

        ///<summary>
        ///Delete Mentor PerfessionalDetails
        ///</summary>
        ///

        public async Task<ApiResponse<string>> DeleteMentorPerfessionalDetails(int Id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = Id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteMentorProfessionalDetails", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Mentor perfessioanl detail deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete mentor perfessional detail.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting perfessonal details: {ex.Message}",
                    StatusCode = 500
                };
            } 
        }

        ///<summary>
        ///Delete mentor Education
        ///</summary>
        ///

        public async Task<ApiResponse<string>> DeleteMentorEducation(int Id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("@Id", SqlDbType.Int) { Value = Id }
                };
                var result = await _genericRepository.GetAsync<dynamic>("DeleteMentorEducation", parameters);
                if (result.IsSuccess == 1)
                {
                    return new ApiResponse<string>
                    {
                        Success = true,
                        Message = "Mentor education deleted successfully.",
                        Data = null,
                        StatusCode = 200
                    };
                }
                else
                {
                    return new ApiResponse<string>
                    {
                        Success = false,
                        Message = "Failed to delete mentor education.",
                        StatusCode = 400
                    };
                }
            }
            catch (Exception ex)
            {
                return new ApiResponse<string>
                {
                    Success = false,
                    Message = $"Error while deleting mentor education: {ex.Message}",
                    StatusCode = 500
                };
            }
        }
    
    }
}
