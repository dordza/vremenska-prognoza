using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Security.Cryptography;
using System.Web;
using System.Web.Services;

namespace WeatherApiZavrsni
{
    public partial class Prognoza : System.Web.UI.Page
    {

        public class Grad
        {
            public string Lokacija { get; set; }
            
            public string Tekst { get; set; }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Grad OmiljeniGrad ()
        {
           
            if (HttpContext.Current.Session["korsinik"] != null)
            {
                return CitajIzBaze();
            }
            else {
                var gradDefault = new Grad();
                gradDefault.Lokacija = "/q/HR/Split";
                gradDefault.Tekst = "Split, Hrvatska";
                return gradDefault;
            }
        }

        public static Grad CitajIzBaze()
        {
            var SqlGrad = new Grad();
            string korIme = HttpContext.Current.Session["korisnik"].ToString();
            string connStr = ConfigurationManager.ConnectionStrings["VrijemeDBCN"].ConnectionString;

            SqlConnection con = new SqlConnection(connStr);

            SqlCommand cmd = new SqlCommand("SELECT Lokacija, Lokacija_Tekst FROM Korisnici WHERE KorisnikIme = @ime");
            
            cmd.Parameters.AddWithValue("@ime", korIme);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            con.Open();
            using (SqlDataReader reader = cmd.ExecuteReader())
            {
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        SqlGrad.Lokacija = reader["Lokacija"].ToString();
                        SqlGrad.Tekst = reader["Lokacija_Tekst"].ToString();
                    }
                }
                else
                {
                    SqlGrad.Lokacija = "/q/HR/Split";
                    SqlGrad.Tekst = "Split, Hrvatska";
                }

                con.Close();
            }
            return SqlGrad;
        }


    }
}