import FullPageLoader from "../components/Layout/FullpageLoader";
import { config } from "../config";
import { useAuthContext, useSmsContext } from "../context/hooks";

const Home = () => {
  const { user } = useAuthContext();
  const { loading, smsViolations, smsLogs, smsStats } = useSmsContext();

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <section className="h-full w-full">
      <h1 className="text-primaryDark text-center text-2xl font-semibold">
        {user?.phone_number}, SMS Statistics
      </h1>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <>
            <div className="mt-6 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
              <div className="animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
              <div className="animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
              <div className="animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 bg-white rounded-lg shadow-lg">
              <div className="animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 w-full max-w-sm p-4 h-48 border-2 border-gray-300 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl text-center font-semibold text-primary">
                Total SMS Till Now
              </h2>
              <div className="flex items-center mt-8 flex-col ">
                <span className="text-4xl font-semibold self-center">
                  {smsLogs?.length}{" "}
                </span>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 h-48 border-2 border-gray-300 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl text-center font-semibold text-primary">
                Total SMS Violations
              </h2>
              <div className="flex items-center mt-8 flex-col ">
                <span className="text-4xl font-semibold self-center">
                  {smsViolations?.length}{" "}
                </span>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 h-48 border-2 border-gray-300 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl text-center font-semibold text-primary">
                Total SMS Today
              </h2>
              <div className="flex items-center mt-8 flex-col ">
                <span className="text-4xl font-semibold self-center">
                  {smsStats?.totalSmsSentToday}{" "}
                </span>
              </div>
            </div>
            <div className="mt-6 w-full max-w-sm p-4 h-48 border-2 border-gray-300 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl text-center font-semibold text-primary">
                Total SMS in last 1 minute
              </h2>
              <div className="flex items-center mt-8 flex-col ">
                <span className="text-4xl font-semibold self-center">
                  {smsStats?.totalSmsSentLastMinute}{" "}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <h1 className="text-primaryDark mt-8 text-center text-2xl font-semibold">
        {user?.phone_number}, SMS Logs
      </h1>
      <div className="mt-6 w-full p-4 h-[270px] overflow-auto border-2 border-gray-300 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-0 flex-col">
          {smsLogs?.map((log, index) => (
            <div
              style={
                log.status === config.SMS_STATUSES.RATE_LIMITED
                  ? {
                      color: "red",
                    }
                  : { color: "green" }
              }
              key={index}
              className="flex mt-8 gap-4"
            >
              <span className="text-md font-semibold self-center">
                {log.phone_number}
              </span>
              <span className="text-md font-semibold self-center">
                {log.date}{" "}
              </span>
              <span className="text-md font-semibold self-center">
                {log.status}
              </span>
              <span className="text-md font-semibold self-center">
                {log.type}
              </span>
              <span className="text-md font-semibold self-center">
                {log.message}
              </span>
              <span className="text-md font-semibold self-center">
                {log.ip_address === "::1" ? "127.0.0.1" : log.ip_address}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
