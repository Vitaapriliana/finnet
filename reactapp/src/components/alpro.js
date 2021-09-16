import React from "react";

class alpro extends React.Component {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h2>Alpro Critical</h2>
        </div>
        <div class="container">
          <div class="row g-0">
            <div class="table-responsive">
              <div class="table-responsive">
                <table class="table table-bordered table-light border-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Lorem</th>
                      <th scope="col">Ipsum</th>
                      <th scope="col">Dolor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Sit</td>
                      <td>Amet</td>
                      <td>Consectetur</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Adipisicing</td>
                      <td>Elit</td>
                      <td>Sint</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Hic</td>
                      <td>Temporibus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default alpro;
