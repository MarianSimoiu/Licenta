import React from "react";
import "./MainMenu.css"

function MainScreen({uInfo}) {
  return (
    <div class="vertical-nav bg-white" id="sidebar">
  <div class="py-4 px-3 mb-4 bg-light">
    <div class="media d-flex align-items-center">
      <img src="https://bootstrapious.com/i/snippets/sn-v-nav/avatar.png" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm"></img>
      <div class="media-body">
        <h4 class="m-0">Jason Doe</h4>
        <p class="font-weight-light text-muted mb-0">Web developer</p>
      </div>
    </div>
  </div>

  <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Main</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic bg-light">
        <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
        Home
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
        About
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
        Services
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-picture-o mr-3 text-primary fa-fw"></i>
        Gallery
      </a>
    </li>
  </ul>

  <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Charts</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
        Area charts
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
        Bar charts
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-pie-chart mr-3 text-primary fa-fw"></i>
        Pie charts
      </a>
    </li>
    <li class="nav-item">
      <a href="#" class="nav-link text-dark font-italic">
        <i class="fa fa-line-chart mr-3 text-primary fa-fw"></i>
        Line charts
      </a>
    </li>
  </ul>
</div>
  );
}

export default MainScreen;