import Utama from "./components/main";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              Beranda
            </a>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link" href="#">
                  Jadwal
                </a>
                <a class="nav-item nav-link" href="#">
                  IIS
                </a>
                <a class="nav-item nav-link" href="#">
                  Incident
                </a>
                <a class="nav-item nav-link" href="#">
                  Contact
                </a>
                <a class="nav-item nav-link" href="/alpro">
                  Alpro Critical
                </a>
              </div>
            </div>
          </div>
        </nav>
          <Utama />
      </div>
      
    );
  }
}

export default App;
