using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace LocalDb
{
    public class DbContext
    {
        public List<Author> Items { get; set; }

        public void ConnectToDb()
        {
            string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB;AttachDbFilename=C:\Users\Savva\source\repos\CodingAssessment\LocalDb\AssessmentDb.mdf;Integrated Security=True";
            string sql = "SELECT * FROM Author";
            Items = new List<Author>();

            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            SqlCommand cmd = new SqlCommand(sql, con);


            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    Author auth = new Author();

                    auth.AuthorId = int.Parse(reader["AuthorId"].ToString());
                    auth.Name = reader["Name"].ToString();
                    auth.Surname = reader["Surname"].ToString();
                    auth.CreatedDate = DateTime.Parse(reader["CreatedDate"].ToString());
                    auth.IsActive = bool.Parse(reader["IsActive"].ToString());

                    Items.Add(auth);
                }
            }
            //cmd.CommandType = CommandType.StoredProcedure;
            //cmd.CommandText = "Author_Items";
            // cmd.Parameters.Add("@EmployeeID", SqlDbType.Int).Value = txtID.Text.Trim();
            //  cmd.Connection = con;
            try
            {
                //  con.Open();
            }

            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

    }


    public class Author
    {

        public int AuthorId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }

    }
}
