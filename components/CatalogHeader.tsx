import React from "react";

interface CatalogHeaderProps {
  title: string;
  logo: string;
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({ title, logo }) => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
      backgroundImage: `
        linear-gradient(135deg, #2c3e50 0%, #1a252f 100%),
        radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: 'cover, 20px 20px',
      padding: '60px 24px',
      marginBottom: '48px',
      borderRadius: '0',
      textAlign: 'center',
      color: 'white',
      position: 'relative' as const,
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Wine Glass Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 24px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px'
        }}>
          🍷
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          letterSpacing: '4px',
          marginBottom: '16px',
          color: '#c7766a',
          fontFamily: 'Georgia, serif'
        }}>
          {title}
        </h1>

        <div style={{
          width: '120px',
          height: '2px',
          background: '#c7766a',
          margin: '0 auto 20px'
        }}></div>

        <p style={{
          fontSize: '18px',
          fontStyle: 'italic',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '20px',
          fontFamily: 'Georgia, serif'
        }}>
          Premium Wine Catalog
        </p>

        <p style={{
          fontSize: '15px',
          color: 'rgba(255, 255, 255, 0.7)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Discover our select collection of Chilean wines, each one carefully
          chosen to represent Chile's winemaking excellence.
        </p>
      </div>
    </header>
  );
};

export default CatalogHeader;
