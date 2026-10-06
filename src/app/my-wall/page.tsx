import { WallEmptyState, WallPage } from "@/components/WallPublicShell";

export default function Page() {
  return (
    <WallPage eyebrow="MY WALL" title="YOUR PLACE IN THE WALL" intro="Keep bookings, saved experiences, followed businesses, offers, visit history and relevant updates together.">
      <WallEmptyState label="MY WALL" title="Your Wall is private by design" body="You can browse the public Wall without an account. Sign-in becomes useful when you want the Wall to remember your activity." action="Explore The Wall" href="/" />
    </WallPage>
  );
}
