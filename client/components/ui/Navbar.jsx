"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState here
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
import { leaveGame } from "@/actions/leaveGame";

export default function Navbar({ username }) {
  const pathname = usePathname();
  const router = useRouter();

  const isInLobby = pathname?.startsWith("/lobby/");
  const lobbyID = isInLobby ? pathname.split("/")[2] : null;
  const [menuOpen, setMenuOpen] = useState(false); // State for the burger menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  useEffect(() => {
    const handleBeforeUnload = (_event) => {
      if (isInLobby && lobbyID) {
        navigator.sendBeacon(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/lobbies/${lobbyID}`,
          JSON.stringify({ lobbyId: lobbyID })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isInLobby, lobbyID]);

  const handleNavigation = async (href) => {
    if (isInLobby && lobbyID) {
      const confirmLeave = window.confirm(
        "Are you sure you want to leave the game?"
      );
      if (!confirmLeave) {
        return;
      } else {
        await leaveGame(lobbyID);
        router.push(href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="select-none w-full px-4 py-3 bg-white shadow flex items-center justify-between">
      <div className="flex items-center">
        <span
          onClick={() => handleNavigation("/")}
          className="text-xl font-bold text-gray-900 cursor-pointer"
        >
          YatzyOnline
        </span>
        {username && (
          <span
            className="ml-4 text-sm font-medium text-gray-800"
            style={{ transform: "translateY(1px)" }}
          >
            {`Welcome, ${username}`}
          </span>
        )}
      </div>

      <div className="space-x-2 hidden md:flex items-center">
        {username ? (
          <>
            <Button
              className={pathname === "/" ? "underline" : ""}
              variant="ghost"
              onClick={() => handleNavigation("/")}
            >
              Lobbies
            </Button>
            <Button
              className={pathname?.startsWith("/stats") ? "underline" : ""}
              variant="ghost"
              onClick={() => handleNavigation("/stats")}
            >
              Stats
            </Button>
            <Button
              className={pathname?.startsWith("/profile") ? "underline" : ""}
              variant="ghost"
              onClick={() => handleNavigation("/profile")}
            >
              Profile
            </Button>
            <Button
              onClick={async () => {
                if (isInLobby) {
                  const confirmLeave = window.confirm(
                    "Are you sure you want to leave the game?"
                  );
                  if (!confirmLeave) {
                    return;
                  } else {
                    await logout();
                    router.push("/");
                  }
                } else {
                  await logout();
                  router.push("/");
                }
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              className={pathname === "/" ? "underline" : ""}
              variant="ghost"
              onClick={() => handleNavigation("/")}
            >
              Lobbies
            </Button>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="outline" className="icon" onClick={toggleMenu}>
          ☰
        </Button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 space-y-2">
          {username ? (
            <>
              <Button
                className={pathname === "/" ? "underline" : ""}
                variant="ghost"
                onClick={() => {
                  toggleMenu();
                  handleNavigation("/");
                }}
              >
                Lobbies
              </Button>
              <Button
                className={pathname?.startsWith("/stats") ? "underline" : ""}
                variant="ghost"
                onClick={() => {
                  toggleMenu();
                  handleNavigation("/stats");
                }}
              >
                Stats
              </Button>
              <Button
                className={pathname?.startsWith("/profile") ? "underline" : ""}
                variant="ghost"
                onClick={() => {
                  toggleMenu();
                  handleNavigation("/profile");
                }}
              >
                Profile
              </Button>
              <Button
                onClick={async () => {
                  toggleMenu();
                  if (isInLobby) {
                    const confirmLeave = window.confirm(
                      "Are you sure you want to leave the game?"
                    );
                    if (!confirmLeave) {
                      return;
                    } else {
                      await logout();
                      router.push("/");
                    }
                  } else {
                    await logout();
                    router.push("/");
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className={pathname === "/" ? "underline" : ""}
                variant="ghost"
                onClick={() => {
                  toggleMenu();
                  handleNavigation("/");
                }}
              >
                Lobbies
              </Button>
              <Link href="/login">
                <Button onClick={toggleMenu}>Login</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
