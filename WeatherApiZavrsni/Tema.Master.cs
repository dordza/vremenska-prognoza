using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WeatherApiZavrsni
{
    public partial class Mas : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var currentPage = Request.Url.Segments[Request.Url.Segments.Length - 1];


            if (currentPage == "Default.aspx")
            {
                BtnTableVrijeme.Visible = true;
                searchDiv.Visible = true;
            }
            else
            {
                BtnTableVrijeme.Visible = false;
                searchDiv.Visible = false;
                BtnBack.HRef = "Default.aspx";
            }


            if (Session["korisnik"] != null)
            {
                BtnPrijava.Visible = false;
                BtnOdjava.Visible = true;
            }
            else
            {
                BtnPrijava.Visible = true;
                BtnOdjava.Visible = false;
            }
        }

        protected void BtnOdjava_Click(object sender, EventArgs e)
        {
            Session.RemoveAll();
            BtnPrijava.Visible = true;
            BtnOdjava.Visible = false;
        }

        protected void BtnPrijava_Click(object sender, EventArgs e)
        {
            Response.Redirect("Login.aspx");
        }
    }
}