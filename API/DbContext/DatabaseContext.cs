using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using LocalDb;
using System.Data;

namespace API.DbContext
{
    public class DatabaseContext
    {
        public string ConnectionString { get; set; }
        public DatabaseContext()
        {
            ConnectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Savva\source\repos\CodingAssessment\LocalDb\AssessmentDb.mdf;Integrated Security=True";
        }
    }
}
