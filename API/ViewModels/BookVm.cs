using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;

namespace API.ViewModels
{
    public class BookVm
    {
        public Models.Book_Item BookItem { get; set; }
        public List<Models.Book_Item> BookItems { get; set; }
        public List<Models.Author_Item> AuthorLookup { get; set; }

        public void Initialise()
        {
            if (BookItems == null)
                BookItems = new List<Models.Book_Item>();

            using (SqlConnection conn = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            {
                SqlCommand cmd = new SqlCommand("Book_Items", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Models.Book_Item book = new Models.Book_Item();

                    book.BookId = int.Parse(reader["BookId"].ToString());
                    book.AuthorId = int.Parse(reader["AuthorId"].ToString());
                    book.Title = reader["Title"].ToString();
                    book.Category = reader["Category"].ToString();
                    book.MainCharactor = reader["MainCharactor"].ToString();
                    book.Price = double.Parse(reader["Price"].ToString());
                    book.IsAvailable = bool.Parse(reader["IsAvailable"].ToString());

                    BookItems.Add(book);
                }
            }
        }

        public void LoadItem(int bookId)
        {

            if (BookItem == null)
                BookItem = new Models.Book_Item { BookId = 0, AuthorId = 0, Price = 0.0, IsAvailable = false };

            string query = "Book_Item";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@BookId", SqlDbType.NVarChar).Value = Convert.ToInt32(bookId);
                con.Open();

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        BookItem.BookId = Convert.ToInt32(reader[0]);
                        BookItem.AuthorId = Convert.ToInt32(reader[1]);
                        BookItem.Category = reader[2].ToString();
                        BookItem.MainCharactor = reader[3].ToString();
                        BookItem.Title = reader[4].ToString();
                        //  BookItem.ReleaseDate = DateTime.Parse(reader[5].ToString());
                        BookItem.CreatedDate = DateTime.Parse(reader[6].ToString());
                        BookItem.Price = Double.Parse(reader[7].ToString());
                        BookItem.IsAvailable = bool.Parse(reader[8].ToString());
                    }
                    LoadAuthorLookup(); // we'll use this as a dropdown 

                    reader.Close();
                    con.Close();
                }
            }
        }

        public void LoadAuthorLookup()
        {
            if (AuthorLookup == null)
                AuthorLookup = new List<Models.Author_Item>();
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
                    AuthorLookup.Add(auth);
                }
            }
        }


        public void Upsert()
        {
            string query = "Book_Upsert";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add("@BookId", SqlDbType.Int).Value = Convert.ToInt32(BookItem.BookId);
                cmd.Parameters.Add("@AuthorId", SqlDbType.Int).Value = Convert.ToInt32(BookItem.AuthorId);
                cmd.Parameters.Add("@Title", SqlDbType.VarChar, 50).Value = BookItem.Title;
                cmd.Parameters.Add("@Category", SqlDbType.VarChar, 50).Value = BookItem.Category;
                cmd.Parameters.Add("@Price", SqlDbType.Money).Value = BookItem.Price;
                cmd.Parameters.Add("@IsAvailable", SqlDbType.Bit).Value = BookItem.IsAvailable;

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        public void DeleteRecord(int bookId)
        {
            string query = "Book_Delete";

            using (SqlConnection con = new SqlConnection(new DbContext.DatabaseContext().ConnectionString))
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@BookId", SqlDbType.NVarChar).Value = Convert.ToInt32(bookId);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }




    }
}
