using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace API.ViewModels
{
    public class AuthorVm
    {

        public Models.Author_Item AuthorItem { get; set; }
        public List<Models.Author_Item> AuthorItems { get; set; }

        public void Initialise()
        {
            if (AuthorItems == null)
                AuthorItems = new List<Models.Author_Item>();

            var dbCon = new DbContext.DatabaseContext();

            using (SqlConnection conn = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("Author_Items", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Models.Author_Item auth = new Models.Author_Item();

                    auth.AuthorId = int.Parse(reader["AuthorId"].ToString());
                    auth.Name = reader["Name"].ToString();
                    auth.Surname = reader["Surname"].ToString();
                    auth.CreatedDate = DateTime.Parse(reader["CreatedDate"].ToString());
                    auth.IsActive = bool.Parse(reader["IsActive"].ToString());

                    AuthorItems.Add(auth);
                }
            }
        }


        public void LoadItem(int authorId)
        {

            if (AuthorItem == null)
                AuthorItem = new Models.Author_Item { AuthorId = 0, IsActive = true };


            string query = "Author_Item";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@AuthorId", SqlDbType.NVarChar).Value = Convert.ToInt32(authorId);
                con.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        AuthorItem.AuthorId = Convert.ToInt32(reader[0]);
                        AuthorItem.Name = reader[1].ToString();
                        AuthorItem.Surname = reader[2].ToString();
                        AuthorItem.CreatedDate = DateTime.Parse(reader[3].ToString());
                        AuthorItem.IsActive = bool.Parse(reader[4].ToString());

                    }
                    reader.Close();
                    con.Close();
                }
            }

        }


        public void Upsert()
        {

            string query = "Author_Upsert";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@AuthorId", SqlDbType.Int).Value = Convert.ToInt32(AuthorItem.AuthorId);
                cmd.Parameters.Add("@Name", SqlDbType.VarChar, 50).Value = AuthorItem.Name;
                cmd.Parameters.Add("@Surname", SqlDbType.VarChar, 50).Value = AuthorItem.Surname;
                cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = AuthorItem.IsActive;

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        public void DeleteItem(int authorId)
        {
            string query = "Author_Delete";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@AuthorId", SqlDbType.NVarChar).Value = Convert.ToInt32(authorId);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}
