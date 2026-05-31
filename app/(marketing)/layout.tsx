import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CustomCursor } from "@/components/marketing/custom-cursor";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <MarketingNavbar />
      <main>{children}</main>
      <MarketingFooter />
    </>
  );
}
