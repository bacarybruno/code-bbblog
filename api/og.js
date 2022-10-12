import satori from 'satori';
import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';

const createMarkup = (text) => {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: '-.02em',
        fontWeight: 700,
        background: 'white',
      }
    },
    React.createElement(
      'div',
      {
        style: {
          left: 24,
          top: 24,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center'
        }
      },
      '👨🏽‍💻',
      React.createElement(
        'span',
        {
          style: {
            marginLeft: 8,
            fontSize: 20,
            fontFamily: 'Roboto',
          }
        },
        'bacarybruno.com'
      )
    ),
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px 50px',
          margin: '0 42px',
          fontSize: 40,
          width: 'auto',
          maxWidth: 550,
          textAlign: 'center',
          backgroundColor: '#007acc',
          color: 'white',
          lineHeight: 1.4,
          fontFamily: 'Roboto',
        }
      },
      text
    )
  );
};

export default async (request, response) => {
  const { text = 'Hello! I\'m Bruno', width = 600, height = 400 } = request.query;
  const fontPath = join(process.cwd(), 'public/fonts', 'Roboto-Regular.ttf');
  const fontData = readFileSync(fontPath);

  const svg = await satori(
    createMarkup(text),
    {
      width,
      height,
      fonts: [
        {
          name: 'Roboto',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
      graphemeImages: {
        '👨🏽‍💻': 'https://bacarybruno.com/favicon.svg?v=1',
      },
    }
  );

  return response
    .setHeader('Content-Type', 'image/svg+xml')
    .setHeader(
      'Cache-Control',
      'public, immutable, no-transform, max-age=31536000',
    )
    .send(svg);
};
