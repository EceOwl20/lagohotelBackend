// server component olarak kalsın (BAŞINA "use client" EKLEME!)
import PanelClient from "./PanelClient";

export default function PanelLayout({ children }) {
  return <PanelClient>{children}</PanelClient>;
}