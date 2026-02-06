import React from 'react';
import { motion } from 'framer-motion';

// Added optional children to PageWrapper to resolve "missing children" prop errors in some TypeScript environments
const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="w-full"
    >
        {children}
    </motion.div>
);

export default PageWrapper;
