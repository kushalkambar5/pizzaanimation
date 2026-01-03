
import React, { useRef, useEffect, useState } from 'react';

const ImageSequence = ({ progress, activeVariant }) => {
    const canvasRef = useRef(null);
    const [decoder, setDecoder] = useState(null);
    const [imageTrack, setImageTrack] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize Decoder
    useEffect(() => {
        if (!activeVariant.sequencePath) return;

        let isCancelled = false;
        setLoading(true);
        setError(null);
        setDecoder(null);
        setImageTrack(null);

        const initDecoder = async () => {
            try {
                const response = await fetch(activeVariant.sequencePath);
                if (!response.ok) throw new Error('Failed to fetch sequence');

                const data = await response.body;

                // ImageDecoder requires a stream or specific chunk type. 
                // For simpler implementation with fetch, we can use the stream directly if supported,
                // or buffer it. transformStream is needed for ImageDecoder usually? 
                // Actually: new ImageDecoder({ data: stream, type: 'image/webp' })

                if (!window.ImageDecoder) {
                    throw new Error('ImageDecoder API not supported in this browser.');
                }

                const imageDecoder = new window.ImageDecoder({
                    data: data,
                    type: 'image/webp'
                });

                // Wait for metadata to get track info
                await imageDecoder.tracks.ready;
                const track = imageDecoder.tracks.selectedTrack;

                if (!isCancelled) {
                    setDecoder(imageDecoder);
                    setImageTrack(track);
                    setLoading(false);
                }

            } catch (err) {
                console.error("Decoder Init Error:", err);
                if (!isCancelled) setError(err.message);
                setLoading(false);
            }
        };

        initDecoder();

        return () => {
            isCancelled = true;
        };
    }, [activeVariant.sequencePath]);

    // Render loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !decoder || !imageTrack) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;

        // Calculate current frame
        // Tracks usually have frameCount. simpler: activeVariant.frameCount
        // But track.frameCount might be available if fully parsed. 
        // Let's rely on user provided count or track.frameCount if available.
        const totalFrames = imageTrack.frameCount || activeVariant.frameCount;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(progress * totalFrames)
        );

        let renderTask = null;

        const renderFrame = async () => {
            try {
                const result = await decoder.decode({ frameIndex });

                // Clear
                ctx.clearRect(0, 0, width, height);

                // Draw
                const image = result.image; // VideoFrame object

                // Calculate cover aspect ratio
                const scale = Math.max(width / image.displayWidth, height / image.displayHeight);
                const drawWidth = image.displayWidth * scale;
                const drawHeight = image.displayHeight * scale;
                const x = (width - drawWidth) / 2;
                const y = (height - drawHeight) / 2;

                ctx.drawImage(image, x, y, drawWidth, drawHeight);

                image.close(); // Important to release memory!
            } catch (err) {
                // Frame not ready or decode error (common if index out of bounds)
            }
        };

        renderFrame();

        // Note: We are ignoring race conditions of multiple renders for simplicity in this prototype.
        // In production, tracking the 'pending' promise and cancelling/ignoring stale ones is better.

    }, [progress, decoder, imageTrack, activeVariant.frameCount]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set actual pixel density for sharpness? For now standard.
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="image-sequence-canvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    width: '100%',
                    height: '100%',
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.5s ease'
                }}
            />
            {error && (
                <div style={{ position: 'fixed', top: '10px', right: '10px', color: 'red', zIndex: 9999 }}>
                    ImageDecoder Error: {error}
                </div>
            )}
        </>
    );
};

export default ImageSequence;

