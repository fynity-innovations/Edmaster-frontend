export const metadata = {
  title: "Under Maintenance — EdMaster",
  description: "We'll be back soon.",
}

export default function MaintenancePage() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "'Inter', 'Segoe UI', sans-serif",
          color: "#fff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              background: "linear-gradient(90deg, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            EdMaster
          </div>

          <div
            style={{
              width: 64,
              height: 64,
              margin: "1.5rem auto",
              border: "4px solid rgba(99,102,241,0.3)",
              borderTopColor: "#6366f1",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />

          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              margin: "1rem 0 0.5rem",
            }}
          >
            Under Maintenance
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: 420,
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            We&apos;re making improvements to serve you better.
            <br />
            We&apos;ll be back shortly!
          </p>

          <a
            href="mailto:support@edmaster.ai"
            style={{
              display: "inline-block",
              padding: "0.6rem 1.4rem",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: "0.5rem",
              color: "#a78bfa",
              textDecoration: "none",
              fontSize: "0.9rem",
            }}
          >
            Contact Support
          </a>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </body>
    </html>
  )
}
