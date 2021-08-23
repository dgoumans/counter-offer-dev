<script>
  import { getContext } from 'svelte'
  import { t } from '../i18n'
  export let parentId

  // form data
  let offer = ''
  let email = ''

  let loading = false

  export let onSuccess

  const api = getContext('api')
  const setMessage = getContext('setMessage')
  const { appId, pageId, pageUrl, pageTitle } = getContext('attrs')
  const refresh = getContext('refresh')

  async function addOffer() {
    if (!offer) {
      alert(t('offer_is_required'))
      return
    }

    if (!email) {
      alert(t('email_is_required'))
      return
    }

    try {
      loading = true
      const res = await api.post('/api/open/offers', {
        appId,
        pageId,
        offer,
        email,
        pageUrl,
        pageTitle,
      })
      await refresh()
      teardown()
      setMessage(t('offer_has_been_sent'))
    } finally {
      loading = false
    }
  }

  function teardown() {
    offer = ''
    email = ''
    onSuccess && onSuccess()
  }

</script>

<div class="grid grid-cols-1 gap-4">
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="mb-2 block dark:text-gray-200" for="offer">{t('offer')}</label>
      <input
        name="offer"
        class="w-full p-2 border border-gray-200 bg-transparent dark:text-gray-100 dark:outline-none"
        type="text"
        bind:value={offer}
      />
    </div>
    <div>
      <label class="mb-2 block dark:text-gray-200" for="email">{t('email')}</label>
      <input
        name="email"
        class="w-full p-2 border border-gray-200 bg-transparent  dark:text-gray-100 dark:outline-none"
        type="email"
        bind:value={email}
      />
    </div>
  </div>
  
  <div>
    <button
      
      class="text-sm bg-gray-200 p-2 px-4 font-bold"
      class:cusdis-disabled={loading}
      on:click={addComment}>{loading ? t('sending') : t('post_offer')}</button
    >
  </div>
</div>

<style>
  /* textarea,
  input {
    width: 100%;
    border: 2px solid;
    color: var(--cusdis--color-text-default);
    border-color: var(--cusdis--color-input-border);
    background: none;
    padding: 0.5em;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    font-size: 1em;
  }

  textarea {
    height: 5em;
    outline: none;
  }

  .cusdis-disabled {
    background-color: var(--cusdis--color-btn-bg-disabled);
    cursor: not-allowed;
  }

  .cusdis-reply-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 0.5em;
  }

  @media only screen and (max-width: 767px) {
    .cusdis-reply-info {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-row-gap: 0.5em;
    }
  }

  .submit-btn {
    background-color: var(--cusdis--color-btn-bg-default);
    color: var(--cusdis--color-btn-text);
    border-radius: 0;
    border: var(--cusdis--color-btn-border);
    padding: 0.5em 1em;
    cursor: pointer;
    border-radius: 2px;
    font-family: inherit;
    font-size: 1em;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    font: inherit;
    font-weight: bold;
    align-items: center;
  }

  .cusdis-field {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  } */

</style>
