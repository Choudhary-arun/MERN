import { useRef } from "react";

const Validate = () => {
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef(null));

  const handleInputChange = (index, value) => {
    if (value !== "" && inputRefs[index + 1]) {
      inputRefs[index + 1].current.focus();
    }
  };
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
        <div className="relative bg-blue-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400"></div>
            </div>

            <div>
              <form action="" method="post">
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-1">
                    {inputRefs.map((ref, index) => (
                      <div className="w-20 h-16" key={index}>
                        <input
                          ref={ref}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          maxLength="1"
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-green-600 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p> Resend
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Validate;
