import * as React from 'react'
import NextHead from 'next/head'

export function Head(props: {
  title: string
}) {
  return (
    <>
      <NextHead>
        <meta name="title" content="Counter Offer - Lightweight, privacy-first, open-source offer system" />
        <meta name="description" content="Counter-offer an open-source, lightweight (~5kb gzipped), privacy-first product offer application. It's super easy to use and integrate with your existed website" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://counter-offer.com/" />
        <meta property="og:title" content="Cusdis - Lightweight, privacy-first, open-source comment system" />
        <meta property="og:description" content="Counter-offer an open-source, lightweight (~5kb gzipped), privacy-first product offer application. It's super easy to use and integrate with your existed website" />
        <meta property="og:image" content="https://cusdis.com/images/og.png" />
        <title>
          {props.title}
        </title>
      </NextHead>
    </>
  )
}