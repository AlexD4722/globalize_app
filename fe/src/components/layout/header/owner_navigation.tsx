import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import {
  ChevronRight,
  CloseToMenuAltTransition,
  MenuToCloseAltTransition,
} from "@/components/svg";
import Button from "@/components/button/classic-button";
import { useRouter } from "next/router";
export const links = [
  { href: "/owner/app", label: "Today", title: "today" },
  { href: "/owner/app/listings", label: "Listings", title: "listings" },
  {
    href: "/owner/app/reservation",
    label: "Reservation",
    title: "reservation",
  },
];

export const account = [
  { href: "/owner/app", label: "Your profile", title: "proflie" },
  { href: "/owner/app/listings", label: "Account settings", title: "settings" },
];

export const dropdowns = [
  {
    name: "Menu",
    dlinks: [
      {
        href: "/owner/app/reservations",
        label: "Reservations",
        title: "reservations",
      },
      { href: "/owner/app/insights", label: "Insights", title: "insights" },
    ],
  },
];

interface NCTProps {
  setNavigation: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: boolean;
}
export type NCTRef = HTMLDivElement;

const NavComplexTrigger = forwardRef<NCTRef, NCTProps>(
  function NavComplexTrigger(props, ref) {
    const { setNavigation, navigation } = props;

    return (
      <>
        <div
          ref={ref}
          className="relative xs:flex items-center justify-center z-[30] lg:hidden"
        >
          <button
            onClick={() => {
              setNavigation(!navigation);
            }}
            className={clsx(
              `xl:text-[23px] xl:p-[8px] xl:mx-[3px] xs:text-[1.38rem] xs:mx-1 xs:p-[0.5rem] 
                border border-borderDefault rounded-full duration-300
                xl:hover:bg-fontColor xl:hover:text-bgColor
                hover:cursor-pointer 
                active:scale-110`,
              navigation ? "!bg-fontColor text-bgColor" : "glass text-fontColor"
            )}
          >
            <span>
              {!navigation ? (
                <CloseToMenuAltTransition />
              ) : (
                <MenuToCloseAltTransition />
              )}
            </span>
          </button>
        </div>
      </>
    );
  }
);

export const NavComplex = ({ navigation, setNavigation }: NCTProps) => {

  const router = useRouter();
  const nav = useRef<HTMLElement>(null);
  let flag: RegExpMatchArray | null;
  const navTrigger = useRef<HTMLDivElement>(null);

  const navItemClick = (link: string) => {
    setNavigation(false);
    router.push({
      pathname: link,
    });
  };
  const handleLogout = () => {

  };
  const close = useCallback(() => {
    setNavigation(false);
  }, [setNavigation]);

  const handler = useCallback(
    (e: MouseEvent) => {
      if (!nav.current?.contains(e.target as HTMLElement)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handler);
  }, [handler]);

  return (
    <nav ref={nav}>
      <NavComplexTrigger
        ref={navTrigger}
        setNavigation={setNavigation}
        navigation={navigation}
      />

      <nav
        className={`overflow-y-scroll overflow-x-hidden transition-transform duration-[690ms] leading-[1.25] tracking-wide z-[25] bg-white
            xl:fixed xl:w-[40vw] xl:text-[45px]
            lg:text-[2.5rem]
            xs:fixed xs:right-0 xs:top-0 xs:h-[100dvh] xs:w-[100svw] xs:text-[1.25rem] 
            ${
              !navigation
                ? `translate-x-[100%] pointer-events-none`
                : "pointer-events-auto"
            }
            `}
      >
        <div className="lg:h-[80px] xs:h-[150px] w-full sticky"></div>

        <div className="px-[10%]">
          <span className="block text-[0.75rem] uppercase text-grey mx-2 tracking-[0.125rem] py-1 mb-2">
            MENU
          </span>
        </div>

        <div className="flex flex-col my-4 w-full px-[10%]">
          {links.map((l, i) => {
            flag = router.asPath.split("?")[0]!.match(new RegExp(l.title, "g"));

            return (
              <span
                onClick={() => {
                  navItemClick(l.href);
                }}
                key={l.label}
                className={clsx("mx-2 py-2 hover:cursor-pointer")}
              >
                <span>{l.label}</span>
              </span>
            );
          })}

          {dropdowns.map((d) => {
            return d.dlinks.map((l) => {
              return (
                <span
                  onClick={() => {
                    navItemClick(l.href);
                  }}
                  key={l.label}
                  className={clsx("mx-2 py-2 hover:cursor-pointer")}
                >
                  <span>{l.label}</span>
                </span>
              );
            });
          })}
        </div>

        <div className="my-10 mx-[10%] border-b border-borderDefault h-[1px]"></div>

        <div className="px-[10%]">
          <span className="block text-[0.75rem] uppercase text-grey mx-2 tracking-[0.125rem] py-1 mb-2">
            Account
          </span>
        </div>

        <div className="flex flex-col my-4 w-full px-[10%]">
          {account.map((l, i) => {
            flag = router.asPath.split("?")[0]!.match(new RegExp(l.title, "g"));

            return (
              <span
                onClick={() => {
                  navItemClick(l.href);
                }}
                key={l.label}
                className={clsx("mx-2 py-2 hover:cursor-pointer")}
              >
                <span>{l.label}</span>
              </span>
            );
          })}
        </div>

        <div className="my-10 mx-[10%] border-b border-borderDefault h-[1px]"></div>

        <div className="w-full px-[10%]">
          <Button intent={"secondary"} className="w-full" rounded={"regular"} onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </nav>
    </nav>
  );
};

//-------------------------------------------------------------------------------------------------------

export const NavSimple = ({ className = "" }: { className?: string }) => {
  const router = useRouter();
  const clickAudio = useRef<HTMLAudioElement>(null);
  let flag: boolean;
  const [layoutBlur, setLayoutBlur] = useState(false);

  const linkClick = (href: string) => {
    router.push({
      pathname: href,
    });
  };

  return (
    <>
      <div
        style={{
          opacity: layoutBlur ? 0.75 : 0,
          pointerEvents: layoutBlur ? "auto" : "none",
        }}
        className="xl:block xs:hidden fixed top-0 left-0 w-screen h-screen duration-300 select-none"
      />

      <div
        className={`${className} xl:flex xs:hidden mr-2 z-1 duration-300 transition-opacity`}
      >
        <div className={`grid grid-flow-col gap-[4px] overflow-hidden`}>
          {links.map((l) => {
            flag = router.asPath.split("?")[0] === l.href;

            return (
              <div key={l.label}>
                <span
                  onClick={() => {
                    linkClick(l.href);
                  }}
                  title={l.label}
                  className={`relative flex justify-center items-center overflow-hidden rounded`}
                >
                  <span
                    className={`block relative z-30 duration-500 transition-transform select-none
                            xl:px-[12px]
                            xs:px-3 lg:py-[9px] xs:py-[0.69rem] 
                            hover:cursor-pointer hover:elevation-color-2 rounded-xl
                            `}
                  >
                    <span className={` ${flag && "border-b border-theme"} `}>
                      {l.label.charAt(0).toUpperCase() + l.label.slice(1)}
                    </span>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
        {dropdowns.map((d) => {
          return (
            <DropdownSimple
              key={d.name}
              dropdown={d}
              setLayoutBlur={setLayoutBlur}
            />
          );
        })}
      </div>
    </>
  );
};

const DropdownSimple = ({ dropdown, setLayoutBlur }: any) => {
  const { name, dlinks } = dropdown;
  const [active, setActive] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  let flag: boolean;

  const open = useCallback(() => {
    setActive(true);
    setLayoutBlur(true);
  }, [setActive, setLayoutBlur]);

  const close = useCallback(() => {
    setActive(false);
    setLayoutBlur(false);
  }, [setActive, setLayoutBlur]);

  const click = () => {
    if (!active) {
      open();
    } else {
      close();
    }
  };

  const handler = useCallback(
    (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as HTMLElement)) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handler);
  }, [handler]);

  return (
    <>
      <div
        ref={dropdownRef}
        className="relative lg:ml-[4px] xs:ml-2 hover:cursor-pointer"
      >
        <button
          type="button"
          className={`relative select-none active:scale-110 duration-200`}
          onClick={click}
        >
          <span
            className={`absolute bottom-0 left-0 h-full w-full rounded-2xl ${
              active ? "border border-borderDefault elevation-shadow-1" : ""
            }`}
          />
          <span className="flex items-center xl:px-[12px] xs:px-3 lg:py-[9px] xs:py-[0.69rem]">
            <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            <span className="ml-1 relative">
              <ChevronRight className="rotate-90" />
            </span>
          </span>
        </button>

        <div
          className={`absolute w-auto pt-2 top-full right-0
                ${
                  active
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5 select-none pointer-events-none"
                }
                `}
        >
          <div
            className={`border border-borderDefault elevation-shadow-1 rounded-xl bg-white overflow-hidden`}
          >
            {dlinks.map((dl: any) => {
              flag = router.asPath === dl.href;

              return (
                <div
                  key={dl.label}
                  className="text-right select-none
                                border-b border-borderDefault 
                                last:border-none
                                "
                >
                  <span
                    className={`inline-block p-3 w-full relative
                                    hover:cursor-pointer hover:elevation-color-2 duration-200
                                    `}
                  >
                    <span>
                      {dl.label.charAt(0).toUpperCase() + dl.label.slice(1)}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
