<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WeatherApiZavrsni.Login" MasterPageFile="~/Tema.Master" %>

<asp:Content ID="headLogin" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="Content/stylelogin.css" />
</asp:Content>
<asp:Content ID="main" ContentPlaceHolderID="MainContent" runat="server">
    <section class="user" id="login">
        <div class="container">
            <div class="login-page">
                <div class="form">
                    <asp:Panel ID="PanelLogin" runat="server" DefaultButton="BtnPrijava">
                        <div id="prijava" class="login-form toggle">
                            <asp:TextBox ID="TBKorIme" placeholder="Korisničko ime" runat="server"></asp:TextBox>
                            <asp:TextBox ID="TBKorLoz" placeholder="Lozinka" TextMode="Password" runat="server" ></asp:TextBox>
                            <asp:Button ID="BtnPrijava" runat="server" Text="PRIJAVA" OnClick="BtnPrijava_Click" />
                            <p class="message">Niste registrirani? <a href="#">Napravite račun</a></p>
                        </div>
                        <div class="errors">
                            <p id="error" class="error" runat="server"></p>
                        </div>
                    </asp:Panel>
                    <asp:Panel ID="PanelRegistracija" runat="server" DefaultButton="BtnRegister">
                        <div id="registracija" class="register-form toggle">
                            <asp:TextBox ID="TBIme" placeholder="Korisničko ime" OnTextChanged="TBIme_OnTextChanged" runat="server"></asp:TextBox>
                            <asp:TextBox ID="TBEmail" placeholder="Adresa e-pošte" TextMode="Email" runat="server"></asp:TextBox>
                            <asp:TextBox ID="TBLozinka" placeholder="Lozinka" TextMode="Password" runat="server"></asp:TextBox>
                            <asp:TextBox ID="TBGrad" placeholder="Omiljeni Grad" runat="server"></asp:TextBox>
                            <asp:Button ID="BtnRegister" runat="server" Text="REGISTRIRAJTE SE" OnClick="BtnRegister_Click" />
                            <p class="message">Registrirani ste? <a href="#">Prijavite se</a></p>
                        </div>
                        <div class="errors">
                            <p id="P1" runat="server"></p><!--napraviti validaciju kod registracije-->
                        </div>
                    </asp:Panel>
                </div>
            </div>
        </div>
    </section>
</asp:Content>

