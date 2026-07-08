"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CHECKPOINTS } from "@/lib/checkpoints";

interface StopInfo {
  place: string;
  scanAt: string;
  url: string;
}

export default function QrCodesPage() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    // window.location is only available client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrigin(window.location.origin);
  }, []);

  const stops: StopInfo[] = [
    {
      place: "Our Booth (start)",
      scanAt: "Place this QR code at our Booth to send students to Clue 1",
      url: `${origin}/`,
    },
    ...CHECKPOINTS.map((cp) => ({
      place: cp.place,
      scanAt: `Print and place at ${cp.place}`,
      url: `${origin}${cp.path}`,
    })),
  ];

  return (
    <div className="screen fade-pop">
      <div className="eyebrow">Organizer tool</div>
      <h1 className="h1-title" style={{ fontSize: 26, marginBottom: 8 }}>
        Printable QR codes
      </h1>
      <p className="subtitle" style={{ marginBottom: 24 }}>
        One code per stop. Students scan the Booth QR first, then follow the clues through the
        Library, Oval Building, MSB, Coffee Bar, and back to our Booth.
      </p>

      <div className="qr-grid">
        {stops.map((s) => (
          <div className="qr-card" key={s.url}>
            <div className="qr-shell">
              {s.url ? <QRCodeSVG value={s.url} size={168} /> : <div style={{ width: 168, height: 168 }} />}
            </div>
            <div className="qr-title">{s.place}</div>
            <div className="qr-url">{s.url || "loading..."}</div>
            <p style={{ fontSize: 12, color: "#8a8570", marginTop: 6 }}>{s.scanAt}</p>
          </div>
        ))}
      </div>

      <div className="footer-tiny">
        Deploy this app first, then reload this page so the QR codes point at your live URL.
      </div>
    </div>
  );
}
