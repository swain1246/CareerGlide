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
        /// Optional HTTP status code.
        /// </summary>
        public int StatusCode { get; set; }

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
            StatusCode = 200;
        }

        /// <summary>
        /// Constructor for custom response.
        /// </summary>
        public ApiResponse(T data, string message, bool success, int statusCode = 200)
        {
            Success = success;
            Message = message;
            Data = data;
            StatusCode = statusCode;
        }
    }
}
