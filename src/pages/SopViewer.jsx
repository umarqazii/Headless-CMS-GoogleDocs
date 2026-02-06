import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchDocContent } from '../utils/googleDocs';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

export default function SopViewer() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDocContent(id).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 1. EXTRACT TITLE
      let title = 'SOP Protocols';
      const titleEl = doc.querySelector('h1, h2, h3, span[style*="font-size: 26pt"]');
      if (titleEl) {
        title = titleEl.textContent;
        titleEl.remove();
      }

      // 2. EXTRACT CONTENT
      // We grab paragraphs and list items, cleaning empty ones
      const rawNodes = doc.querySelectorAll('p, li');
      const items = Array.from(rawNodes).reduce((acc, node) => {
        const textContent = node.textContent.trim();
        if (!textContent) return acc;
        acc.push(node.innerHTML);
        return acc;
      }, []);

      setData({ title, items });
    });
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  if (!data) return <div className="container text-tech-green animate-pulse font-mono">Initializing Uplink...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <Link 
        to="/" 
        className="back-link font-mono text-sm mb-10 inline-block"
      >
        ← BACK TO GRID
      </Link>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-tech-green to-tech-cyan mb-12 border-b border-gray-800 pb-4 font-mono tracking-tighter"
      >
        {data.title}
      </motion.h1>

      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {data.items.map((htmlContent, index) => (
          <motion.li 
            key={index} 
            variants={itemVariants}
            className="flex items-start gap-3 p-3 border-l-2 border-transparent hover:border-tech-green transition-all bg-gray-900/20 hover:bg-gray-900/40"
          >
            {/* The Content */}
            <div 
  className="sop-text font-mono text-sm md:text-base leading-relaxed"
  dangerouslySetInnerHTML={{ 
    __html: DOMPurify.sanitize(htmlContent, {
      FORBID_TAGS: ['style'], // Remove Google's global style block
      ADD_ATTR: ['style'],    // BUT keep inline styles on spans!
    }) 
  }} 
/>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}