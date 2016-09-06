<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WeatherApiZavrsni.Prognoza" MasterPageFile="~/Tema.Master" %>

<asp:Content ID="headDefault" ContentPlaceHolderID="head" runat="server"> 
</asp:Content>

<asp:Content ID="main" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="intro-text">
                        <span id="locationName"class="skills"></span>
                        <br/>
                        <span id="currentTime"class="skills"></span>
                    </div>
                    <div id="graf_div"></div>
                </div>
            </div>
        </div>
    </header>
    <!-- Prognoza po satu -->
    <section id="detaljno">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2>Prognoza po satu</h2>
                </div>
            </div>
            <div class="row">
            </div>
        </div>
    </section>
</asp:Content>
