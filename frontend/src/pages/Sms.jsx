import { useState } from "react";
import FormRow from "../components/Form-components/FormRow";
import { Oval } from "react-loader-spinner";
import { sendSmsApi } from "../context/SmsContext/api";
import { useErrorContext } from "../context/hooks";

const Sms = () => {
  const [formdata, setFormdata] = useState({
    phoneNumber: "",
    message: "",
  });

  const { setErrorFunc, clearError } = useErrorContext();
  const { phoneNumber, message } = formdata;
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSms = async () => {
    setLoading(true);
    const resp = await sendSmsApi(phoneNumber, message);
    console.log(resp);
    setLoading(false);
    if (!resp.success) {
      setErrorFunc(resp);
    } else {
      clearError();
    }
  };

  return (
    <section className="login-section">
      <h2 className="login-title text-3xl font-semibold">SMS SENDING FORM</h2>
      <div className="login-container">
        <form className="form">
          <FormRow
            value={phoneNumber}
            handleChange={handleChange}
            type="text"
            name="phoneNumber"
            labelText="Phone Number"
          />
          <FormRow
            value={message}
            handleChange={handleChange}
            type="text"
            name="message"
            labelText="Message"
          />
        </form>
        <div className="w-full flex flex-col justify-center">
          <button
            onClick={handleSms}
            className="form-btn flex gap-3 items-center justify-center"
          >
            Send SMS
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
        </div>
      </div>
    </section>
  );
};

export default Sms;
