import { useState } from "react";
import Image from "next/image";
import { PowerIcon } from "../icons/PowerIcon";
import { useSIWE } from "@/hooks/sign-in/useSIWE";

interface WalletSidebarProps {
  onClose: () => void;
  address: string | null;
  krauseBalance: string;
  nftBalance: string;
  krauseCourtPiecesBalance: string;
  treasuryEthBalance: string;
  treasuryKrauseBalance: string;
  treasurySeedBalance: string;
  treasuryNftBalance: string;
}

type Section = "wallet" | "treasury" | "portfolio" | "links";

type AssetName =
  | "$KRAUSE"
  | "Genesis Tickets"
  | "Krause Court Pieces"
  | "ETH"
  | "$SEED"
  | "NFTs";

const WalletSidebar: React.FC<WalletSidebarProps> = ({
  onClose,
  address,
  krauseBalance,
  nftBalance,
  krauseCourtPiecesBalance,
  treasuryEthBalance,
  treasuryKrauseBalance,
  treasurySeedBalance,
  treasuryNftBalance,
}) => {
  const [activeSection, setActiveSection] = useState<Section>("wallet");
  const [expandedAsset, setExpandedAsset] = useState<string | null>(null);

  const formatNumber = (num: string) => {
    const parts = num.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const assetDescriptions: Record<AssetName, string> = {
    $KRAUSE:
      "Krause House's governance token used to vote on proposals.  5 million supply total.",
    "Genesis Tickets": "Original NFTs representing membership in Krause House.",
    "Krause Court Pieces":
      "NFTs representing ownership of virtual court pieces.",
    ETH: "Ethereum, the native cryptocurrency of the Ethereum blockchain.",
    $SEED:
      "Seed Club is a DAO accelerator that Krause House participated in.  $SEED is their governance token we received as part of this.",
    NFTs: "Non-fungible tokens owned by the Krause House treasury.",
  };

  const renderAssetItem = (
    item: { balance: string; name: AssetName },
    isWallet: boolean = true
  ) => (
    <div className="rounded-lg border border-gray-300 p-4">
      <p className="text-3xl font-bold">{formatNumber(item.balance)}</p>
      <p className="mb-2 text-gray-500">{item.name}</p>
      <p className="text-sm text-gray-600">{assetDescriptions[item.name]}</p>
      {isWallet && item.name !== "$KRAUSE" && (
        <div className="mt-2">
          <a
            href={`https://opensea.io/collection/${
              item.name === "Genesis Tickets"
                ? "krause-house-tickets"
                : "krausecourt"
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-black/10 p-2 text-sm">View on OpenSea</button>
          </a>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "wallet":
        return (
          <div className="mt-8 space-y-6">
            {[
              { balance: krauseBalance, name: "$KRAUSE" },
              { balance: nftBalance, name: "Genesis Tickets" },
              {
                balance: krauseCourtPiecesBalance,
                name: "Krause Court Pieces",
              },
            ].map((item) =>
              renderAssetItem(item as { balance: string; name: AssetName })
            )}
          </div>
        );
      case "treasury":
        return (
          <div className="mt-8 space-y-6">
            {[
              { balance: treasuryEthBalance, name: "ETH" },
              { balance: treasuryKrauseBalance, name: "$KRAUSE" },
              { balance: treasurySeedBalance, name: "$SEED" },
              { balance: treasuryNftBalance, name: "NFTs" },
            ].map((item) =>
              renderAssetItem(
                item as { balance: string; name: AssetName },
                false
              )
            )}
          </div>
        );
      case "portfolio":
        return (
          <div className="mt-8 space-y-6">
            <div className="rounded-lg border border-gray-300 p-4">
              <h3 className="mb-4 text-xl font-bold">Ball Hogs</h3>
              <p className="mb-4 text-gray-500">
                Krause House's first portfolio investment. The Ball Hogs are a
                part of the Big3, a 3v3 league started by Ice Cube, and coached
                by the legend Rick Barry.
              </p>
              <div className="space-y-2">
                <a
                  href="https://big3.com/teams/ball-hogs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-black/10 p-2 text-left text-sm">
                    Roster
                  </button>
                </a>
                <a
                  href="https://www.youtube.com/@BIG3_BallHogs/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-black/10 p-2 text-left text-sm">
                    Youtube
                  </button>
                </a>
                <a
                  href="https://www.ballhogs.club/collections/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-black/10 p-2 text-left text-sm">
                    Ball Hogs Merch
                  </button>
                </a>

                <a
                  href="https://www.ballhogs.club/collections/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <button className="w-full bg-black/10 p-2 text-left text-sm">
                    Get Tickets
                  </button>
                </a>
              </div>
            </div>
            {/* You can add more teams here in the future */}
          </div>
        );
      case "links":
        return (
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Governance",
                description: "Participate in Krause House decision-making",
                url: "https://snapshot.org/#/krausehouse.eth",
              },
              {
                title: "Discord",
                description: "Join our community chat",
                url: "https://discord.gg/wAjEq3CM",
              },
              {
                title: "Twitter",
                description: "Follow us on Twitter",
                url: "https://twitter.com/KrauseHouseDAO",
              },
              {
                title: "FAQ",
                description: "Learn more about Krause House",
                url: "https://docs.krausehouse.club",
              },
              {
                title: "Krause House Website",
                description: "Learn more about Krause House",
                url: "https://krausehouse.club",
              },
              {
                title: "Ball Hogs Website",
                description: "Learn more about the Ball Hogs",
                url: "https://www.ballhogs.club/",
              },
              {
                title: "Blog",
                description: "Read our latest updates and announcements",
                url: "https://krausehouse.mirror.xyz/",
              },
            ].map((link, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-300 p-4"
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-lg font-bold">{link.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {link.description}
                  </p>
                </a>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed bottom-0 right-0 top-0 z-50 h-full w-full overflow-y-auto rounded-lg border bg-base-200 p-4 md:m-2 md:w-96 md:border-black md:shadow-lg">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start">
          <a href="/" className="mr-4 mt-1">
            <Image src="/initials.svg" height={30} width={30} alt="Logo" />
          </a>
          <p>{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
        </div>
        <button onClick={onClose} className="text-gray-600">
          <PowerIcon strokeWidth={2} />
        </button>
      </div>

      <div className="mb-6 flex justify-between border-b border-gray-300">
        {(["wallet", "treasury", "portfolio", "links"] as Section[]).map(
          (section) => (
            <button
              key={section}
              className={`px-2 pb-2 pt-1 ${
                activeSection === section
                  ? "border-b-2 border-black font-bold"
                  : "text-gray-500"
              } ${section === "links" ? "md:hidden" : ""}`}
              onClick={() => setActiveSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          )
        )}
      </div>

      {renderContent()}
    </div>
  );
};

export default WalletSidebar;
