import { Component } from "react";
import axios from "axios";
import Script from "next/script";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, isSendError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (!this.state.isSendError) {
      this.setState({ isSendError: true, errorInfo, error });
      axios.post(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK, {
        embeds: [
          {
            title: `Frontend Error Alert!`,
            description: `Error: ${error.message}\n${JSON.stringify(errorInfo)
              .toString()
              .slice(0, 2000)}`,
            color: 15158332,
          },
        ],
      });
    }
  }

  render() {
    if (this.state.isSendError) {
      return (
        <>
          <Script src="https://cdn.lordicon.com/bhenfmcm.js" />
          <div className="flex flex-col justify-end items-center h-[50vh]">
            <lord-icon
              src="https://cdn.lordicon.com/yeallgsa.json"
              trigger="loop"
              colors="primary:#ddf75f,secondary:#ffffff"
              style={{ width: "150px", height: "150px" }}
            />
            <div className="text-[19px] text-[#ddf75f] mt-2">
              otona-no-kotobadzukai
            </div>
          </div>
          <div className="flex flex-col justify-center items-center h-[50vh]">
              <div className="text-[20px]">Something went wrong!</div>
              <div>{JSON.stringify(this.state.error)}</div>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
