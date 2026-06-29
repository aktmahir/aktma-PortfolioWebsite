import { motion } from 'framer-motion';

const symbols = ['{ }', '< />', '[ ]', '( )', '=>', '&&', '||', '??', '!', ';'];

export default function TechConstellation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {symbols.map((symbol, i) => (
        <motion.span
          key={i}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * -200],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-2xl font-mono text-primary-400"
        >
          {symbol}
        </motion.span>
      ))}
    </div>
  );
}
