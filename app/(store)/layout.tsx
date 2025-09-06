import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/layout/footer";
import { SplashScreen } from "@/components/layout/splash-screen";
import { AutoLogout } from "@/components/layout/auto-logout";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <div className="">{children}</div>
      <Footer />
      <AutoLogout />
    </>
  );
}
