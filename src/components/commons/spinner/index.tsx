import { Spinner } from "reactstrap";

const SpinnerComponent = function () {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-2 pb-2">
        <Spinner animation="border" color="dark" />
      </div>
    </>
  );
};

export default SpinnerComponent;
