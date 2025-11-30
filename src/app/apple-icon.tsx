import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10b981',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          borderRadius: '20%',
        }}
      >
        {'</>'}
      </div>
    ),
    {
      ...size,
    }
  );
}
