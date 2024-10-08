import Wrapper from "../../../Wrappers/UserGroup/SubGroup/viewCreatedSubgroup";
import customFetch from "../../../Utils/customFetch";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { SubgroupMembers } from "../../../Components/index";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const { data } = await customFetch.get(
      "/investment/user-group/view-created-subgroups"
    );

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const ViewSubgroups = () => {
  const { subgroups } = useLoaderData();
  const { groupId } = useParams();

  if (subgroups.length === 0) {
    return (
      <Wrapper>
        <h2 className="error-msg">no subgroups were created!</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="title">
        <h2>pick a group</h2>
      </div>
      <div className="title-underline"></div>
      <div className="section-center">
        {subgroups.map((item) => {
          const { _id, subgroupName, joinedBy, members, teamLeader } = item;
          return (
            <article key={_id} className="article">
              <div className="title">
                <h3>{subgroupName}</h3>
              </div>
              <p className="members">members:{`${joinedBy.length}`}</p>
              <SubgroupMembers
                members={members}
                subId={_id}
                teamLeader={teamLeader}
              />
              <Link
                to={`../select-members/${groupId}/${_id}`}
                className="btn btn-block"
              >
                assign members
              </Link>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default ViewSubgroups;
