<script>
  import { onMount, setContext } from 'svelte'
  import axios from 'redaxios'
  import Comment from './components/Comment.svelte'
  import Reply from './components/Reply.svelte'
  import { t } from './i18n'

  export let attrs
  export let commentsResult

  let page = 1

  let loadingComments = true

  let message = ''

  let error


  const api = axios.create({
    baseURL: attrs.host,
  })

  setContext('api', api)
  setContext('attrs', attrs)
  setContext('refresh', getComments)
  setContext('setMessage', setMessage)

  async function getComments(p = 1) {
    loadingComments = true
    try {
      const res = await api.get(`/api/open/comments`, {
        headers: {
          'x-timezone-offset': -new Date().getTimezoneOffset(),
        },
        params: {
          page: p,
          appId: attrs.appId,
          pageId: attrs.pageId,
        },
      })
      commentsResult = res.data.data
    } catch (e) {
      error = e
    } finally {
      loadingComments = false
    }
  }

  function onClickPage(p) {
    page = p
    getComments(p)
  }

  onMount(() => {
    getComments()
  })

</script>

    <Reply />

    <div class="my-8" />

    <div class="mt-4">
      {#if loadingComments}
        <div class="text-gray-900 dark:text-gray-100">
          {t('loading')}...
        </div>
      {:else}
        {#each commentsResult.data as comment (comment.id)}
          <Comment {comment} firstFloor={true} />
        {/each}
        {#if commentsResult.pageCount > 1}
          <div>
            {#each Array(commentsResult.pageCount) as _, index}
              <button
                class="px-2 py-1 text-sm mr-2 dark:text-gray-200"
                class:underline={page === index + 1}
                on:click={(_) => onClickPage(index + 1)}>{index + 1}</button
              >
            {/each}
          </div>
        {/if}
      {/if}
    </div>

    <div class="my-8" />

    <div class="text-center text-sm text-gray-900 dark:text-gray-100">
      <a class="underline " href="https://counter-offer.com">{t('powered_by')}</a>
    </div>
