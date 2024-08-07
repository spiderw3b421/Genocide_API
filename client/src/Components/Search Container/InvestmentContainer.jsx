import { SelectOption } from "../index";
import { Form, useSubmit, Link } from "react-router-dom";
import { INVESTMENTS, STATES } from "../../../../Utils/Constants/constants";
import Wrapper from "../../Wrappers/SearchContainer/investmentSearch";

const SearchContainer = () => {
  const submit = useSubmit();

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search investment groups</h5>
        <div className="form-center">
          <SelectOption
            labelText="investments"
            name="investment"
            list={["all", ...Object.values(INVESTMENTS)]}
            defaultValue="investments"
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <SelectOption
            labelText="state"
            name="state"
            list={["all", ...Object.values(STATES)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
        <Link
          to="/dashboard/investment/browse-all-groups"
          className="btn form-btn delete-btn"
        >
          Reset Search Values
        </Link>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
