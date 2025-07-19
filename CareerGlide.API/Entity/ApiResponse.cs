namespace CareerGlide.API.Entity
{
    public class ApiResponse<T>
    {
        /// <summary>
        /// Indicates whether the request was successful.
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// Message describing the result of the request.
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The actual data returned by the request.
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// Default constructor.
        /// </summary>
        public ApiResponse() { }

        /// <summary>
        /// Constructor for successful response.
        /// </summary>
        public ApiResponse(T data, string message = "Request successful.")
        {
            Success = true;
            Message = message;
            Data = data;
        }

        /// <summary>
        /// Constructor for failed response.
        /// </summary>
        public ApiResponse(T data, string message, bool success)
        {
            Success = success;
            Message = message;
            Data = data;
        }
    }
}
