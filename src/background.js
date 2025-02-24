import {
  switchToolbar,
  getBookmarkBars,
  CURRENT_BOOKMARK_FOLDER_ID,
  initState
} from '@/bookmarkState'
import {
  listenStoreChange
} from '@/bookmarkStorage'

let bookmarkToolbarsFolders = []

// ==== BUTTON ACTION ==== //
async function switchToNextBar () {
  // Reload bars in case a new folder has been created
  await loadExistingBars()

  const currentBarIndex = bookmarkToolbarsFolders.findIndex(bar => bar.id === CURRENT_BOOKMARK_FOLDER_ID.value)
  const nextBarIndex = (currentBarIndex + 1) % bookmarkToolbarsFolders.length
  const nextBar = bookmarkToolbarsFolders[nextBarIndex]

  return switchToolbar(nextBar.id)
}

function listenerToStoreChanges () {
  listenStoreChange(({ currentToolbar }) => {
    CURRENT_BOOKMARK_FOLDER_ID.value = currentToolbar.newValue
  })

  browser.commands.onCommand.addListener(function (command) {
    switch (command) {
      case 'next_bar':
        switchToNextBar()
        break
      default:
        break
    }
  })
}

/** Load existing bookmark toolbars */
function loadExistingBars () {
  return getBookmarkBars().then((bars) => {
    bookmarkToolbarsFolders = bars
  })
}

/** ENTRY POINT */
async function startExtension () {
  await initState()
  listenerToStoreChanges()

  await loadExistingBars()
}

startExtension()
