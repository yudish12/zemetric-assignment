import { useEffect, useState } from "react";
import FormRow from "../components/Form-components/FormRow";
import { useAuthContext } from "../context/hooks";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    phoneNumber: "",
    password: "",
    name: "",
  });

  const { name, password, phoneNumber } = formdata;
  const [loading, setLoading] = useState(false);
  const { signupFunc, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    await signupFunc(phoneNumber, password, name);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="login-section">
      <h2 className="login-title text-3xl font-semibold">
        Signup with phone number to view stats
      </h2>
      <div className="login-container">
        <form className="form">
          <FormRow
            value={name}
            handleChange={handleChange}
            type="text"
            name="name"
            labelText="Name"
          />
          <FormRow
            value={phoneNumber}
            handleChange={handleChange}
            type="text"
            name="phoneNumber"
            labelText="Phone Number"
          />
          <FormRow
            value={password}
            handleChange={handleChange}
            type="password"
            name="password"
            labelText="Password"
          />
        </form>
        <div className="w-full flex flex-col justify-center">
          <button
            onClick={handleSignup}
            className="form-btn flex gap-3 items-center justify-center"
          >
            Signup
            {loading && (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </button>
          <span className="text-primary text-sm text-center mx-auto mt-2">
            {" "}
            Already have an account?
            <a href="/login" className="font-semibold hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Signup;
