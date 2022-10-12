import satori from 'satori';
import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Resvg } from '@resvg/resvg-js';

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
      React.createElement('img', {
        src: 'data:image/png;base64,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',
        width: 21,
        height: 23,
      }),
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

const generateSVG = async (text, width, height) => {
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
    },
  );

  return svg;
};

const convertToPng = (svg, width) => {
  const resvg = new Resvg(svg, {
    background: 'white',
    fitTo: {
      mode: 'width',
      value: width,
    },
    font: {
      fontFiles: [join(process.cwd(), 'public/fonts', 'Roboto-Regular.ttf')],
      loadSystemFonts: false,
      defaultFontFamily: 'Roboto',
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
};

export default async (request, response) => {
  const { text = 'Hello! I\'m Bruno', width = 800, height = 418 } = request.query;

  const svg = await generateSVG(text, width, height);
  const png = convertToPng(svg, width);

  return response
    .setHeader('Content-Type', 'image/png')
    .setHeader(
      'Cache-Control',
      'public, immutable, no-transform, max-age=31536000',
    )
    .send(png);
};
