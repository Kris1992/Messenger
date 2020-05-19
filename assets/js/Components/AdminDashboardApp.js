import React from 'react';

const AdminDashboardApp = () => {
  return (
    <React.Fragment>
      <div class="col-sm-12"><h2 class="text-green">Management</h2></div>
        <div class="col-sm-12 col-md-5 p-3 mx-auto  my-3 link-card">
            <a href="" class="stretched-link"><h4 class="text-green">Accounts</h4></a>
        </div>
        <div class="col-sm-12 col-md-5 p-3 mx-auto  my-3 link-card">
            <a href="" class="stretched-link"><h4 class="text-green">Activities</h4></a>
        </div>
        <div class="col-sm-12 col-md-5 p-3 mx-auto my-3 link-card">
            <a href="" class="stretched-link"><h4 class="text-green">Workouts</h4></a>
        </div>
      <div class="col-sm-12 col-md-5 p-3 mx-auto my-3 link-card">
        <a href="" class="stretched-link"><h4 class="text-green">Articles</h4></a>
      </div>
    </React.Fragment>
  );
}

export default AdminDashboardApp;
