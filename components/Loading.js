import Script from "next/script";


export default function Loading() {
  return (
    <>
      <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
      <div className="flex flex-col justify-center items-center h-[100vh] z-20">
        <lord-icon
          src="https://cdn.lordicon.com/yeallgsa.json"
          trigger="loop"
          colors="primary:#ddf75f,secondary:#ffffff"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="text-[19px] text-[#ddf75f] mt-2">otona-no-kotobadzukai</div>
      </div>
    </>
  );
}
