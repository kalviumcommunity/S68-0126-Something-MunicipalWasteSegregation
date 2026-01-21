'use client';

export default function GlobalError() {
  return (
    <html lang="en">
      <body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>500</h1>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#374151', marginBottom: '1rem' }}>
            Something went wrong!
          </h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
            An unexpected error occurred. Please try again.
          </p>
        </div>
      </body>
    </html>
  );
}
