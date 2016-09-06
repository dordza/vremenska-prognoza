using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace WeatherApiZavrsni
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["korisnik"] != null) //ako je već ulogiran, ne može pristupiti stranici
            {
                Response.Redirect("~/Default.aspx");
            }

            error.InnerText = "";
        }


        protected void BtnPrijava_Click(object sender, EventArgs e)
        {
            string connStr = ConfigurationManager.ConnectionStrings["VrijemeDBCN"].ConnectionString;

            SqlConnection con = new SqlConnection(connStr);

            SqlCommand cmd = new SqlCommand("SELECT * FROM Korisnici WHERE KorisnikIme = @ime");
            var korIme = TBKorIme.Text;
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
                        MD5 md5Hash = MD5.Create();
                        if (Hash.VerifyMd5Hash(md5Hash, TBKorLoz.Text, reader["Lozinka"].ToString()))
                        {
                            Session["korisnik"] = korIme;
                            Response.Redirect("~/Default.aspx");
                        }
                        else
                        {
                            error.InnerText = "Neispravna lozinka!";
                        }

                    }
                }
                else
                {
                    error.InnerText = "Nepostojeći korisnik";
                }

                con.Close();
            }
        }

        protected void BtnRegister_Click(object sender, EventArgs e)
        {
            var connStr = ConfigurationManager.ConnectionStrings["VrijemeDBCN"].ConnectionString;
            var con = new SqlConnection(connStr);
            var cmd = new SqlCommand("INSERT INTO Korisnici VALUES(@ime, @lozinka, @email, @gradTekst, @gradLokacija)");
            var md5Hash = MD5.Create();

            cmd.CommandType = CommandType.Text;
            cmd.Parameters.AddWithValue("@ime", TBIme.Text);
            cmd.Parameters.AddWithValue("@email", TBEmail.Text);
            cmd.Parameters.AddWithValue("@lozinka", Hash.GetMd5Hash(md5Hash, TBLozinka.Text));
            cmd.Parameters.AddWithValue("@gradTekst", "Split, Hrvatska");
            cmd.Parameters.AddWithValue("@gradLokacija", "/q/HR/Split");
            cmd.Connection = con;
            con.Open();
            cmd.ExecuteNonQuery();
            con.Close();
        }

        protected void TBIme_OnTextChanged(object sender, EventArgs e)
        {
            //provjera postoji li taj korisnik
        }



    }
}