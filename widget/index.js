window.COUNTER_OFFER = {}

const makeIframeContent = (target) => {
  const host = target.dataset.host
  const iframeJsPath = target.dataset.iframe || `${host}/js/iframe.umd.js`
  const cssPath = `${host}/js/style.css`
  return `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="${cssPath}">
    <base target="_parent" />
    <link>
  </head>
  <body>
    <div id="root"></div>
    <script src="${iframeJsPath}" type="module">
    </script>
  </body>
</html>`
}

let singleTonIframe
function createIframe(target) {
  if (!singleTonIframe) {
    singleTonIframe = document.createElement('iframe')
    listenEvent(singleTonIframe, target)
  }
  // srcdoc dosen't work on IE11
  singleTonIframe.srcdoc = makeIframeContent(target)
  singleTonIframe.style.width = '100%'
  singleTonIframe.style.border = '0'

  return singleTonIframe
}

function postMessage(event, data) {
  if (singleTonIframe) {
    singleTonIframe.contentWindow.postMessage(
      JSON.stringify({
        from: 'counter-offer',
        event,
        data,
      }),
    )
  }
}

function listenEvent(iframe, target) {
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const onMessage = (e) => {
    try {
      const msg = JSON.parse(e.data)
      if (msg.from === 'counter-offer') {
        switch (msg.event) {
          case 'onload':
            {
              if (target.dataset.theme === 'auto') {
                postMessage(
                  'setTheme',
                  darkModeQuery.matches ? 'dark' : 'light',
                )
              }
            }
            break
          case 'resize':
            {
              iframe.style.height = msg.data + 'px'
            }
            break
        }
      }
    } catch (e) {}
  }

  window.addEventListener('message', onMessage)

  function onChangeColorScheme(e) {
    const isDarkMode = e.matches
    if (target.dataset.theme === 'auto') {
      postMessage('setTheme', isDarkMode ? 'dark' : 'light')
    }
  }

  darkModeQuery.addEventListener('change', onChangeColorScheme)

  return () => {
    darkModeQuery.removeEventListener('change', onChangeColorScheme)
    window.removeEventListener('message', onMessage)
  }
}

function render(target) {
  if (target) {
    target.innerHTML = ''
    const iframe = createIframe(target)
    target.appendChild(iframe)
  }
}

// deprecated
window.renderCounter_Offer = render

window.COUNTER_OFFER.renderTo = render

window.COUNTER_OFFER.setTheme = function (theme) {
  postMessage('setTheme', theme)
}

function initial() {
  let target

  if (window.counter_offerElementId) {
    target = document.querySelector(`#${window.counter_offerElementId}`)
  } else if (document.querySelector('#counter-offer_window')) {
    target = document.querySelector('#counter-offer_window')
  }

  if (window.COUNTER_OFFER_PREVENT_INITIAL_RENDER === true) {
  } else {
    if (target) {
      render(target)
    }
  }
}

// initialize
window.COUNTER_OFFER.initial = initial

initial()
