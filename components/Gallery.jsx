"use client";

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';

const OptimizedImage = dynamic(() => import('./OptimizedImage'));

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const loadMoreRef = useRef(null);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      <div ref={ref} className="gallery-grid">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="gallery-item"
            onClick={() => handleImageClick(image)}
          >
            <OptimizedImage
              src={image.thumbnail}
              alt={image.alt}
              width={300}
              height={200}
              className="gallery-image"
              priority={index < 4}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <OptimizedImage
                src={selectedImage.fullSize}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="modal-image"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery; 