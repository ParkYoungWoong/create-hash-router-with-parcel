export const createHashRouter = payload => {
  const { el, notFoundComponent, routes } = payload
  
  const appEl = document.querySelector(el)
  const pageNotFound = { component: notFoundComponent }
  const lastCommentNodeInHead = document.createComment('Dynamic Imports!')
  document.head.append(lastCommentNodeInHead)
  
  async function render() {
    let page = routes.find(page => page.path === location.hash)
    page = page || pageNotFound
    removeDynamicImportTags(page)
    const component = await page.component()
    appEl.innerHTML = component.default
    loopDynamicImportTags(tag => {
      page._dynamicImportTags = page._dynamicImportTags || []
      page._dynamicImportTags.push(tag)
    })
  }
  function removeDynamicImportTags(page) {
    loopDynamicImportTags(tag => {
      tag.remove()
    })
    page._dynamicImportTags?.forEach(tag => document.head.append(tag))
  }
  function loopDynamicImportTags(callback) {
    let nextSibling = lastCommentNodeInHead.nextSibling
    while (nextSibling) {
      const copyNextSibling = nextSibling
      nextSibling = nextSibling.nextSibling
      switch (copyNextSibling.nodeName) {
        case 'SCRIPT':
        case 'LINK':
          callback(copyNextSibling)
      }
    }
  }
  
  window.addEventListener('hashchange', render)
  render()
}