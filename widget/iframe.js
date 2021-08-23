import Widget from './Widget.svelte'

window.COUNTER_OFFER = {}

const parent = window.parent
const target = document.querySelector('#root')

const dataset = window.__DATA__
const widget = new Widget({
  target,
  props: {
    attrs: dataset,
  },
})

requestResize()

function requestResize() {
  postMessage('resize', document.documentElement.offsetHeight)
}

const resizeObserve = new MutationObserver(() => {
  requestResize()
})

resizeObserve.observe(target, {
  childList: true,
  subtree: true
})
