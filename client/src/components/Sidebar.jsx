import ltv_banner from "../assets/icons/ltv_banner.svg";

export default function Sidebar() {
  return (
    <div id="sidebarContainer">
      <nav id="sidebar">
        <div id="head">
          <img src={ltv_banner} />
        </div>
      </nav>
      <nav id="fakeSidebar"></nav>
    </div>
  );
}
