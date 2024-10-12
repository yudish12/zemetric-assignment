import { useEffect, useState } from "react";
import FormRow from "../components/Form-components/FormRow";
import { useAuthContext } from "../context/hooks";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormdata] = useState({
    phoneNumber: "",
    password: "",
  });

  const { phoneNumber, password } = formdata;
  const [loading, setLoading] = useState(false);
  const { loginFunc, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    await loginFunc(phoneNumber, password);
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
        Login with phone number to view stats
      </h2>
      <div className="login-container">
        <form className="form">
          <FormRow
            value={phoneNumber}
            handleChange={handleChange}
            type="text"
            name="phoneNumber"
            labelText="Enter Phone"
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
            onClick={handleLogin}
            className="form-btn flex gap-3 items-center justify-center"
          >
            Login
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
            Don&apos;t have an account?
            <a href="/signup" className="font-semibold hover:underline">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Login;
