import Head from "next/head";
import Link from "next/link";

export default function ({active="Home"}) {
  const navbarLinks = [{
    name: "Home",
    icon: "home",
    link: "/home"
  },{
    name: "Bill",
    icon: "receipt_long",
    link: "/bill"
  },{
    name: "Payment",
    icon: "qr_code",
    link: "/my-payment"
  },{
    name: "Setting",
    icon: "settings",
    link: "/setting"
  }]
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <div className="navbar-container">
        {
            navbarLinks.map((link) => {
                let color = link.name === active ? "#f3aa60" : "#cccccc"
                if(link.name === active) {
                  return (
                      <div key={link.name} className="flex flex-col items-center justify-center">
                          <span className={`material-symbols-outlined`}
                            style={{color:color}}>{link.icon}</span>
                          {/* <div className={`text-[12px]`} style={{color:color}}>{link.name}</div> */}
                      </div>
                  )
                }
                return (
                    <Link href={link.link} key={link.name} className="flex flex-col items-center justify-center cursor-pointer">
                        <span className={`material-symbols-outlined`}
                          style={{color:color}}>{link.icon}</span>
                        {/* <div className={`text-[12px]`} style={{color:color}}>{link.name}</div> */}
                    </Link>
                )
            })
        }
      </div>
    </>
  );
}
