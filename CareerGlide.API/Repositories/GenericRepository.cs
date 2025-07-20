using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;

namespace CareerGlide.API.Repositories
{
    public class GenericRepository
    {
        private readonly string _connectionString;

        public GenericRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private IDbConnection CreateConnection()
        {
            try
            {
                var connection = new SqlConnection(_connectionString);
                connection.Open();
                return connection;
            }
            catch (Exception ex)
            {
                throw new Exception("Error while creating database connection: " + ex.Message, ex);
            }
        }

        /// <summary>
        /// Executes a stored procedure that returns multiple records.
        /// </summary>
        public async Task<IEnumerable<T>> GetAllAsync<T>(string storedProcedure, SqlParameter[] parameters = null)
        {
            try
            {
                using var connection = CreateConnection();
                var dynamicParams = ConvertToDynamicParameters(parameters);
                return await connection.QueryAsync<T>(storedProcedure, dynamicParams, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing QueryAsync for {storedProcedure}: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Executes a stored procedure that returns a single record.
        /// </summary>
        public async Task<T> GetAsync<T>(string storedProcedure, SqlParameter[] parameters = null)
        {
            try
            {
                using var connection = CreateConnection();
                var dynamicParams = ConvertToDynamicParameters(parameters);
                return await connection.QueryFirstOrDefaultAsync<T>(storedProcedure, dynamicParams, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing QuerySingleAsync for {storedProcedure}: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Executes a stored procedure that does not return any records.
        /// </summary>
        public async Task<int> ExecuteAsync(string storedProcedure, SqlParameter[] parameters = null)
        {
            try
            {
                using var connection = CreateConnection();
                var dynamicParams = ConvertToDynamicParameters(parameters);
                return await connection.ExecuteAsync(storedProcedure, dynamicParams, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing ExecuteAsync for {storedProcedure}: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Executes a stored procedure and returns a DataTable.
        /// </summary>
        public async Task<DataTable> ExecuteDataTableAsync(string procedureName, SqlParameter[] parameters, int commandTimeout = 30)
        {
            DataTable dataTable = new DataTable();

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand(procedureName, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.CommandTimeout = commandTimeout; // Set timeout

                        if (parameters != null)
                            command.Parameters.AddRange(parameters);

                        await connection.OpenAsync();

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(dataTable);
                        }
                    }
                }
                return dataTable;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing ExecuteDataTableAsync for {procedureName}: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Executes a stored procedure and returns a DataSet.
        /// </summary>
        public async Task<DataSet> ExecuteDataSetAsync(string procedureName, SqlParameter[] parameters, int commandTimeout = 30)
        {
            DataSet dataSet = new DataSet();

            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand(procedureName, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.CommandTimeout = commandTimeout; // Set timeout

                        if (parameters != null)
                            command.Parameters.AddRange(parameters);

                        await connection.OpenAsync();

                        using (SqlDataAdapter adapter = new SqlDataAdapter(command))
                        {
                            adapter.Fill(dataSet);
                        }
                    }
                }
                return dataSet;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error executing ExecuteDataSetAsync for {procedureName}: {ex.Message}", ex);
            }
        }

        /// <summary>
        /// Converts an array of SqlParameters to Dapper's DynamicParameters.
        /// </summary>
        private DynamicParameters ConvertToDynamicParameters(SqlParameter[] sqlParameters)
        {
            var dapperParams = new DynamicParameters();

            try
            {
                if (sqlParameters != null)
                {
                    foreach (var param in sqlParameters)
                    {
                        dapperParams.Add(param.ParameterName, param.Value, param.DbType, param.Direction);
                    }
                }
                return dapperParams;
            }
            catch (Exception ex)
            {
                throw new Exception("Error converting SqlParameters to DynamicParameters: " + ex.Message, ex);
            }
        }
    }
}
