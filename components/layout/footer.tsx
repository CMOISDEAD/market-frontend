import { Logo } from "@/components/navbar/logo";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-dark-600 border-t border-input">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Premium streetwear since 2520
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h4 className="font-medium text-sm">Company</h4>
              <div className="flex flex-col items-center md:items-start space-y-1 text-xs">
                <span className="">About Us</span>
                <span className="">Contact</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <h4 className="font-medium text-sm">Support</h4>
              <div className="flex flex-col items-center md:items-start space-y-1 text-xs">
                <span className="">Size Guide</span>
                <span className="">Returns</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs">
              &copy; 2023 SDFM 2520. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
