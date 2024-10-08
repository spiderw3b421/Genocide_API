import Wrapper from "../../../Wrappers/UserGroup/SubGroup/SubLayout";
import { Outlet, NavLink } from "react-router-dom";

const SubGroupLayout = () => {
  return (
    <Wrapper>
      <div className="nav">
        <NavLink className="link" to="../">
          Home
        </NavLink>
        <NavLink id="create-subgroup" className="link" to="create-subgroup">
          create subGroup
        </NavLink>
        <NavLink className="link" to="view-subgroups">
          view subGroups
        </NavLink>
      </div>
      <Outlet />
    </Wrapper>
  );
};
export default SubGroupLayout;
