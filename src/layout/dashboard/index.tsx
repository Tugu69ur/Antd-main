import { useState, useEffect, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ProLayout from "@ant-design/pro-layout";
import { Avatar } from "antd";
import auth from "api/auth";
import file from "api/file";
import { AuthContext } from "context/AuthContext";
import { AuthActionTypes } from "context/AuthContext/type";
import { BookOpen01, Logout01 } from "untitledui-js-base";
import menuData from "./menu";

const Logo = () => {
  return (
    <div className="w-[111px] h-[45px] mx-7">
      <img src="https://s3-alpha-sig.figma.com/img/52f7/fe30/72abb74b6e6fc522ba8ba393ec500a7e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mwz-9jhsvlbbVMpzfq~epx2O0h~YEP00Z8Pt3ukbqXm7cW046TzvnjrPmWe9T36IBVC3OFFHpGqIkbA9dqT9-J3bv7kE6Yyv9UhL03do0M1CX-sPRbzA1pVJ~7Pd5EZLtntaJ0YkOvBgwuvMpymHKQTE5NwWGoHFCbGwm2H6AHw~5GpEDPgwkdhUITujiNI8Wj0nl08jyZwDfhR4Zlpsz03tCsvygNKRruJQHAVuPHabYNUD09tLFWLMZ649qILss3gTBfzWpeoMm5JLFBZdpdNBDOjyk3ArHLVRyYvaW75L8GpC8rnHltEVS7yj7Pz0MEXKlgX5ovvBAofQ-x6ApA__" alt="" />
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const [user, dispatch] = useContext(AuthContext);
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ProLayout
      layout="top"
      title=""
      menuItemRender={(item, dom) => (
        <Link to={item.path as string} key={item.path} className="mr-6">
          {dom}
        </Link>
      )}
      logo={<Logo />}
      contentStyle={{
        margin: 0,
        background: "#E7EDEE",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
      menu={{
        request: async () => {
          return menuData;
        },
      }}
      location={{
        pathname: location.pathname,
      }}
      menuFooterRender={() => {
        if (user === null) {
          return (
            <div className="flex items-center justify-center p-4">
              <Logout01
                color="#fff"
                className="cursor-pointer"
                onClick={() => {
                  dispatch({ type: AuthActionTypes.LOGOUT });
                  auth.removeToken();
                }}
              />
            </div>
          );
        }

        return (
          <div className="m-4 flex flex-col gap-4 text-white font-semibold">
            {/* Time Display */}
            <div className="text-center text-sm mb-6">{currentTime}</div>

            {/* User Info */}
            {user?.user ? (
              <div className="flex items-center gap-3">
                <Avatar
                  size={30}
                  src={file.fileToUrl(user.user.profile?.physical_path)}
                  className="uppercase"
                >
                  {user.user.username?.substring(0, 2)}
                </Avatar>
                <div className="flex flex-col">
                  <div className="uppercase">{user.user.first_name}</div>
                  <div>{user.user.phone}</div>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}

            {/* Logout Button */}
            <Logout01
              color="#fff"
              className="cursor-pointer mt-4"
              onClick={() => {
                dispatch({ type: AuthActionTypes.LOGOUT });
                auth.removeToken();
              }}
            />
          </div>
        );
      }}
      token={{
        header: {
          colorMenuBackground: "#0000FF",
          colorTextMenu: "#B3B3B3",
          colorTextMenuSelected: "#fff",
          heightLayoutHeader: 80,
        },
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default DashboardLayout;
