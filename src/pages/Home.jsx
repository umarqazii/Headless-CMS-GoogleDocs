// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// REPLACE THESE WITH YOUR REAL GOOGLE DOC IDs
const tools = [
  { name: 'Photoshop', id: '1Z2IBDlBVATdINn8F4YiSdRAZURxNAwcChe11WeiEP5o', icon: '🎨' },
  { name: 'Canva', id: '1_g7V6ZaO04BXGePUWznNfuMbB9AUwZUzWFkVEGa1-Zg', icon: '✨' },
  { name: 'Figma', id: '1rTSF1DwWgciF2qfO47hLIuliWdMpBYs0IV-o7zgN06w', icon: '📐' },
];

export default function Home() {
  return (
    <div className="container">
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '40px' }} className="text-gradient">
        SOP DATABASE //
      </h1>
      
      {/* CSS GRID LAYOUT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {tools.map((tool, i) => (
          <Link key={tool.name} to={`/sop/${tool.id}`} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05, borderColor: 'var(--tech-green)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                height: '250px',
                border: '1px solid #333',
                borderRadius: '12px',
                padding: '24px',
                position: 'relative',
                background: 'rgba(26, 26, 26, 0.5)',
                backdropFilter: 'blur(5px)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              <h2 style={{ fontSize: '1.8rem', color: 'white', fontFamily: 'var(--font-mono)' }}>
                {tool.name}
              </h2>
              <p style={{ color: '#666', marginTop: '10px', fontSize: '0.9rem' }}>
                View Protocols &gt;&gt;
              </p>
              
              <div style={{ 
                position: 'absolute', 
                bottom: '20px', 
                right: '20px', 
                fontSize: '4rem', 
                opacity: 0.2 
              }}>
                {tool.icon}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}